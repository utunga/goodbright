#!/usr/bin/env python3
"""Check-in model tests: GPS gates, tick-only list, nudges, trail, check-in sheet. Headless, mocked tiles."""
import asyncio, io, os, sys, json, subprocess, time
os.environ['PW_EXPERIMENTAL_SERVICE_WORKER_NETWORK_EVENTS'] = '1'
from PIL import Image, ImageDraw
from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.abspath(__file__))
DIST = os.path.join(ROOT, 'dist')
OUT = os.path.join(ROOT, 'test_out')
os.makedirs(OUT, exist_ok=True)
PORT = 8766
FAILS = []

def check(name, cond, info=''):
    print(('  ok   ' if cond else '  FAIL ') + name + ('  ' + str(info) if info else ''))
    if not cond: FAILS.append(name)

def tile_png(size=256):
    im = Image.new('RGB', (size, size), (232, 238, 226)); d = ImageDraw.Draw(im)
    for i in range(0, size, 32): d.line([(i, 0), (i, size)], fill=(214, 222, 208)); d.line([(0, i), (size, i)], fill=(214, 222, 208))
    b = io.BytesIO(); im.save(b, 'PNG'); return b.getvalue()

async def main():
    srv = subprocess.Popen([sys.executable, '-m', 'http.server', str(PORT), '--bind', '127.0.0.1'], cwd=DIST, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(0.8)
    errors = []
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            iphone = p.devices['iPhone 11']
            ctx = await browser.new_context(**iphone, geolocation={'latitude': -41.2926744, 'longitude': 174.8018634, 'accuracy': 8}, permissions=['geolocation'], timezone_id='Pacific/Auckland')
            async def route_handler(route, request):
                url = request.url
                if 'localhost' in url or '127.0.0.1' in url: await route.continue_(); return
                if any(h in url for h in ('linz.govt.nz', 'openstreetmap.org', 'opentopomap.org', 'arcgisonline')):
                    await route.fulfill(status=200, content_type='image/png', headers={'Access-Control-Allow-Origin': '*'}, body=tile_png()); return
                await route.abort()
            await ctx.route('**/*', route_handler)
            page = await ctx.new_page()
            page.on('console', lambda m: errors.append(('console', m.type, m.text)) if m.type in ('error', 'warning') else None)
            page.on('pageerror', lambda e: errors.append(('pageerror', str(e))))
            page.on('dialog', lambda d: asyncio.ensure_future(d.accept()))
            await page.goto(f'http://127.0.0.1:{PORT}/test_walk/?sim', wait_until='networkidle')
            await page.wait_for_timeout(600)
            MS = await page.evaluate('SIM.MS.map(m => ({label:m.label, lat:m.lat, lng:m.lng, along:m.along}))')
            T0 = await page.evaluate('Date.now()')

            print('-- start')
            check('buffer pill lives in the card', await page.evaluate('!!document.querySelector("#card #buffer")'))
            await page.evaluate(f'SIM.setPos({MS[0]["lat"]}, {MS[0]["lng"]}, 8, {T0})')
            await page.click('#btnStart'); await page.wait_for_timeout(300)
            st = await page.evaluate('({checked: SIM.state.checked, trail: SIM.state.trail.length, next: SIM.nextIndex(), name: document.getElementById("nextName").textContent})')
            check('Start ticks Home and drops the first trail point', st['checked'] == [0] and st['trail'] == 1, st)
            check('next stop is The Crescent', st['next'] == 1 and st['name'] == 'The Crescent', st)
            await page.screenshot(path=f'{OUT}/ci_00_start.png')

            print('-- gates')
            # a rough fix 1 km up the road: dot moves, progress does not
            far = await page.evaluate('SIM.pointAt(1000)')
            before = await page.evaluate('SIM.state.along')
            await page.evaluate(f'SIM.setPos({far[0]}, {far[1]}, 140, {T0} + 60000)')
            st = await page.evaluate('({along: SIM.state.along, note: SIM.state.gpsNote, gps: document.getElementById("gps").textContent})')
            check('rough fix (±140 m) leaves progress alone', abs(st['along'] - before) < 1 and 'rough' in st['note'], st)
            # a clean fix 1 km ahead five seconds later: a jump at running speed, held
            await page.evaluate(f'SIM.setPos({far[0]}, {far[1]}, 10, {T0} + 65000)')
            st = await page.evaluate('({along: SIM.state.along, note: SIM.state.gpsNote})')
            check('clean fix jumping 1 km in 5 s is held', abs(st['along'] - before) < 1 and 'jump' in st['note'], st)
            # ...but if it holds for a minute, it is accepted
            await page.evaluate(f'SIM.setPos({far[0]}, {far[1]}, 10, {T0} + 130000)')
            st = await page.evaluate('({along: SIM.state.along, note: SIM.state.gpsNote})')
            check('a jump that holds 60 s is accepted', abs(st['along'] - 1000) < 30 and not st['note'], st)

            print('-- passed without checking in → nudge')
            # 1 km along is 230 m past The Crescent (770 m) → the app asks
            nd = await page.evaluate('({nd: SIM.nudgeFor(), cls: document.getElementById("nudge").className, txt: document.getElementById("nudgeText").textContent, next: SIM.nextIndex(), implied: SIM.impliedPassed(1)})')
            check('nudge: passed The Crescent?', nd['nd'] and nd['nd']['k'] == 1 and nd['nd']['kind'] == 'passed' and 'show' in nd['cls'] and 'Passed The Crescent' in nd['txt'], nd)
            check('list still says next stop = 1 (ticks own the list)', nd['next'] == 1, nd)
            check('Crescent shown grey (implied passed), not green', nd['implied'] is True, nd)
            meta = await page.evaluate('document.getElementById("nextMeta").textContent')
            check('card says it looks behind you', 'behind' in meta, meta)
            await page.screenshot(path=f'{OUT}/ci_01_nudge_passed.png')
            await page.click('#nudgeNo'); await page.wait_for_timeout(100)
            nd = await page.evaluate('({nd: SIM.nudgeFor(), snooze: Object.keys(SIM.state.snooze)})')
            check('"No" snoozes the question', nd['nd'] is None and nd['snooze'] == ['1'], nd)
            await page.evaluate('delete SIM.state.snooze[1]')
            await page.evaluate(f'SIM.setPos({far[0]}, {far[1]}, 10, {T0} + 140000)')
            await page.click('#nudgeYes'); await page.wait_for_timeout(100)
            st = await page.evaluate('({checked: SIM.state.checked, trail: SIM.state.trail.map(p => [p.ms, p.late, p.manual]), next: SIM.nextIndex(), cls: document.getElementById("nudge").className})')
            check('"I was there" ticks it late and moves on', st['checked'] == [0, 1] and st['trail'][-1] == [1, True, True] and st['next'] == 2 and st['cls'] == '', st)

            print('-- arrive at a milestone → nudge, and the check-in sheet')
            gs = MS[2]
            await page.evaluate(f'SIM.setPos({gs["lat"]+0.0002}, {gs["lng"]}, 9, {T0} + 400000)')
            nd = await page.evaluate('({nd: SIM.nudgeFor(), cls: document.getElementById("nudge").className, txt: document.getElementById("nudgeText").textContent, btn: document.getElementById("btnCheckin").textContent})')
            check('arrive nudge at Grass Street', nd['nd'] and nd['nd']['kind'] == 'arrive' and nd['nd']['k'] == 2 and 'arrive' in nd['cls'], nd)
            check('check-in button names the milestone', nd['btn'] == 'Check in at Grass Street', nd['btn'])
            await page.click('#btnCheckin'); await page.wait_for_timeout(200)
            sheet = await page.evaluate('({show: document.getElementById("ciSheet").className, chips: [...document.querySelectorAll("#ciChips .chip")].map(c => c.textContent + (c.classList.contains("on") ? " [on]" : "")), save: document.getElementById("ciSave").textContent, send: document.getElementById("ciSend").textContent})')
            check('sheet preselects Grass Street', 'show' in sheet['show'] and any('Grass Street' in c and '[on]' in c for c in sheet['chips']) and sheet['save'] == 'Save point at Grass Street', sheet)
            await page.screenshot(path=f'{OUT}/ci_02_sheet.png')
            # send: intercept the WhatsApp link
            href = await page.evaluate('''() => new Promise(res => { const orig = HTMLElement.prototype.click; HTMLElement.prototype.click = function(){ if (this.href) { HTMLElement.prototype.click = orig; res(decodeURIComponent(this.href)); } else orig.call(this); }; document.getElementById('ciSend').click(); })''')
            st = await page.evaluate('({checked: SIM.state.checked, trail: SIM.state.trail.map(p => [p.ms, p.sent]), next: SIM.nextIndex(), nudge: document.getElementById("nudge").className})')
            check('send ticks Grass Street, records sent, closes the nudge', st['checked'] == [0, 1, 2] and st['trail'][-1] == [2, True] and st['next'] == 3 and st['nudge'] == '', st)
            check('message says At milestone 2, Grass Street with plan time', 'At milestone 2, Grass Street (plan said' in href and 'maps.google.com' in href, href[:200])
            print('   ', href[:220])

            print('-- rough fix at a milestone: nothing preselected, she decides')
            pt = MS[3]
            await page.evaluate(f'SIM.setPos({pt["lat"]+0.0006}, {pt["lng"]}, 120, {T0} + 900000)')
            nd = await page.evaluate('({nd: SIM.nudgeFor(), btn: document.getElementById("btnCheckin").textContent})')
            check('no nudge and a plain button on a rough fix', nd['nd'] is None and nd['btn'] == 'Check in', nd)
            await page.click('#btnCheckin'); await page.wait_for_timeout(200)
            sheet = await page.evaluate('({chips: [...document.querySelectorAll("#ciChips .chip")].map(c => c.textContent + (c.classList.contains("on") ? " [on]" : "")), hint: document.getElementById("ciHint").textContent, save: document.getElementById("ciSave").textContent})')
            check('sheet offers The Point unselected with a rough-GPS hint', any('The Point' in c and '[on]' not in c for c in sheet['chips']) and 'rough' in sheet['hint'] and sheet['save'] == 'Save point', sheet)
            await page.screenshot(path=f'{OUT}/ci_03_sheet_rough.png')
            await page.click('#ciChips .chip'); await page.wait_for_timeout(100)
            save = await page.evaluate('document.getElementById("ciSave").textContent')
            check('tapping the chip names the button', save == 'Save point at The Point', save)
            await page.click('#ciSave'); await page.wait_for_timeout(200)
            st = await page.evaluate('({checked: SIM.state.checked, last: SIM.state.trail[SIM.state.trail.length-1], along: SIM.state.along})')
            check('manual tick at The Point, marked by hand, progress moved up to it', st['checked'] == [0, 1, 2, 3] and st['last']['ms'] == 3 and st['last']['manual'] and abs(st['along'] - MS[3]['along']) < 1, st)

            print('-- milestone list: I\'m here / undo')
            await page.click('#btnList'); await page.wait_for_timeout(200)
            rows = await page.evaluate('[...document.querySelectorAll("#listBody tr")].map(tr => tr.className + "|" + tr.querySelector(".b").textContent)')
            check('list: 0–3 checked with undo, 4 next with I\'m here', all('checked|undo' in r for r in rows[:4]) and rows[4].startswith("next|I'm here"), rows)
            await page.screenshot(path=f'{OUT}/ci_04_list.png')
            await page.click('#listBody [data-undo="3"]'); await page.wait_for_timeout(200)
            st = await page.evaluate('({checked: SIM.state.checked, trail: SIM.state.trail.map(p => p.ms)})')
            check('undo removes the tick and its trail point', st['checked'] == [0, 1, 2] and 3 not in st['trail'], st)
            await page.click('#listBody [data-here="3"]'); await page.wait_for_timeout(200)
            st = await page.evaluate('SIM.state.checked')
            check("I'm here re-ticks it", st == [0, 1, 2, 3], st)
            await page.click('[data-close=listSheet]')

            print('-- finish: Home again at the same spot as Home')
            await page.evaluate(f'SIM.setPos({MS[4]["lat"]}, {MS[4]["lng"]}, 7, {T0} + 1800000)')
            nd = await page.evaluate('({nd: SIM.nudgeFor(), txt: document.getElementById("nudgeText").textContent})')
            check('arrive nudge is for Home again, not Home', nd['nd'] and nd['nd']['k'] == 4 and 'Home again' in nd['txt'], nd)
            await page.click('#nudgeYes'); await page.wait_for_timeout(200)
            st = await page.evaluate('({label: document.getElementById("nextLabel").textContent, next: SIM.nextIndex(), trail: SIM.state.trail.length})')
            check('finished', st['label'] == 'Finished' and st['next'] is None, st)
            trail = await page.evaluate('SIM.trailText()')
            print('   trail text:\n     ' + trail.replace('\n', '\n     '))
            check('trail text has one line per check-in', trail.count('\n') == st['trail'], trail.count('\n'))
            await page.click('#cAll'); await page.wait_for_timeout(500)
            await page.screenshot(path=f'{OUT}/ci_05_finish_trail.png')
            n_trail_layers = await page.evaluate('document.querySelectorAll("path.leaflet-interactive").length')
            check('trail drawn (circle markers on the map)', n_trail_layers >= st['trail'], n_trail_layers)

            print('-- persistence: reload keeps ticks and trail')
            await page.reload(wait_until='networkidle'); await page.wait_for_timeout(500)
            st = await page.evaluate('({checked: SIM.state.checked, trail: SIM.state.trail.length, label: document.getElementById("nextLabel").textContent})')
            check('after reload', st['checked'] == [0, 1, 2, 3, 4] and st['trail'] >= 5 and st['label'] == 'Finished', st)

            print('-- Thursday replay: the loop walked backwards')
            await page.evaluate('localStorage.clear()'); await page.reload(wait_until='networkidle'); await page.wait_for_timeout(500)
            T1 = await page.evaluate('Date.now()')
            # 11:30 west end of Oriental Bay (off route), 11:38 foot of Grass St, 11:49 top of Grass St, 11:54 The Crescent
            fixes = [(-41.2905, 174.7927, 5, 0), (-41.29103, 174.79728, 6, 8*60), (-41.2903, 174.7990, 8, 19*60), (MS[1]['lat'], MS[1]['lng'], 7, 24*60)]
            await page.evaluate(f'SIM.setPos({fixes[0][0]}, {fixes[0][1]}, 5, {T1})')
            await page.click('#btnStart'); await page.wait_for_timeout(200)
            out = []
            for la, ln, acc, dt in fixes:
                await page.evaluate(f'SIM.setPos({la}, {ln}, {acc}, {T1} + {dt}*1000)')
                out.append(await page.evaluate('({along: Math.round(SIM.state.along||0), off: Math.round(SIM.state.off||0), next: SIM.nextIndex(), nudge: document.getElementById("nudgeText").textContent, shown: document.getElementById("nudge").className, banner: document.getElementById("banner").className ? document.getElementById("banner").textContent : ""})'))
            for o in out: print('   ', o)
            check('backwards walk: list never advanced on its own', all(o['next'] == 0 for o in out), [o['next'] for o in out])
            check('the only question asked is about Home (started away from it)', all(o['nudge'] == 'Passed Home without checking in?' for o in out), [o['nudge'] for o in out])
            check('off-route banner only at the beach', out[0]['banner'] and not out[1]['banner'] and not out[3]['banner'], [o['banner'] for o in out])
            # she checks in at Grass Street from the list (Home never ticked — she started away from home)
            await page.click('#btnList'); await page.wait_for_timeout(200)
            await page.click('#listBody [data-here="2"]'); await page.wait_for_timeout(200)
            await page.click('[data-close=listSheet]')
            st = await page.evaluate('({checked: SIM.state.checked, next: SIM.nextIndex(), implied0: SIM.impliedPassed(0), implied1: SIM.impliedPassed(1)})')
            check('tick at 2 implies 0 and 1 passed (grey), next = 3', st['checked'] == [2] and st['next'] == 3 and st['implied0'] and st['implied1'], st)
            await page.evaluate(f'SIM.setPos({fixes[3][0]}, {fixes[3][1]}, 7, {T1} + 24*60*1000)')
            st = await page.evaluate('({along: Math.round(SIM.state.along), off: Math.round(SIM.state.off), banner: document.getElementById("banner").textContent})')
            check('at the Crescent after ticking Grass St: progress held at the floor, not behind it', st['along'] >= MS[2]['along'] - 31, st)
            await page.screenshot(path=f'{OUT}/ci_06_backwards.png')

            print('-- freyja: a required check-in milestone ticks and sends in one tap')
            pf = await ctx.new_page()
            pf.on('console', lambda m: errors.append(('console', m.type, m.text)) if m.type in ('error', 'warning') else None)
            pf.on('pageerror', lambda e: errors.append(('pageerror', str(e))))
            pf.on('dialog', lambda d: asyncio.ensure_future(d.accept()))
            await pf.goto(f'http://127.0.0.1:{PORT}/freyja_walk/?sim', wait_until='networkidle'); await pf.wait_for_timeout(500)
            FM = await pf.evaluate('SIM.MS.map(m => ({label:m.label, lat:m.lat, lng:m.lng, checkin:m.checkin}))')
            req = [m['label'] for m in FM if m['checkin']]
            check('13 milestones ask for something', len(req) == 13 and FM[12]['checkin'] == 'call' and FM[16]['checkin'] == 'call' and FM[1]['checkin'] == 'test', req)
            T2 = await pf.evaluate('Date.now()')
            await pf.evaluate(f'SIM.setPos({FM[0]["lat"]}, {FM[0]["lng"]}, 6, {T2})'); await pf.click('#btnStart'); await pf.wait_for_timeout(200)
            # tick 1 and 2 by hand, then arrive at 3 (1 Kaiwharawhara Rd, a required check-in)
            await pf.evaluate('SIM.tick(1, {manual:true}); SIM.tick(2, {manual:true})')
            await pf.evaluate(f'SIM.setPos({FM[3]["lat"]}, {FM[3]["lng"]}, 7, {T2} + 2*3600*1000)')
            nd = await pf.evaluate('({txt: document.getElementById("nudgeText").textContent, yes: document.getElementById("nudgeYes").textContent, cls: document.getElementById("nudge").className, notes: document.getElementById("notes").textContent})')
            check('arrive nudge offers Check in & send', nd['yes'] == 'Check in & send' and 'arrive' in nd['cls'] and '1 Kaiwharawhara Rd' in nd['txt'], nd)
            href = await pf.evaluate('''() => new Promise(res => { const orig = HTMLElement.prototype.click; HTMLElement.prototype.click = function(){ if (this.href) { HTMLElement.prototype.click = orig; res(decodeURIComponent(this.href)); } else orig.call(this); }; document.getElementById('nudgeYes').click(); })''')
            st = await pf.evaluate('({checked: SIM.state.checked, last: SIM.state.trail[SIM.state.trail.length-1], next: SIM.nextIndex(), notes: document.getElementById("notes").textContent})')
            check('one tap: ticked, sent, WhatsApp opened with the milestone', st['checked'][-1] == 3 and st['last']['sent'] and 'At milestone 3, 1 Kaiwharawhara Rd' in href and st['next'] == 4, st)
            check('card shows what the next milestone wants', 'at Top of Winchester St' not in st['notes'] and 'Winchester' in await pf.evaluate('document.getElementById("nextName").textContent'), st['notes'])
            await pf.evaluate('SIM.tick(4, {manual:true}); SIM.render()')
            nxt = await pf.evaluate('document.getElementById("notes").textContent')
            check('next required stop is flagged on the card', 'Nicholson Road connect: send a check-in' in nxt, nxt)
            await pf.click('#btnList'); await pf.wait_for_timeout(200)
            n_ci = await pf.evaluate('document.querySelectorAll("#listBody .sub.ci").length')
            check('list shows 13 requirements', n_ci == 13, n_ci)
            await pf.screenshot(path=f'{OUT}/ci_07_freyja_list.png')
            await pf.click('[data-close=listSheet]')
            await browser.close()
    finally:
        srv.terminate()
    print('errors/warnings:', len(errors))
    for e in errors[:20]: print('  ', e)
    print('FAILURES:', FAILS if FAILS else 'none')
    return 1 if FAILS or errors else 0

sys.exit(asyncio.run(main()))
