#!/usr/bin/env python3
"""Headless test of the walk apps: mocked tiles, mocked GPS, screenshots, console errors, print PDF."""
import asyncio, io, os, sys, json, subprocess, time, math
os.environ['PW_EXPERIMENTAL_SERVICE_WORKER_NETWORK_EVENTS'] = '1'
from PIL import Image, ImageDraw
from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, 'dist')
OUT = os.path.join(ROOT, 'test_out')
os.makedirs(OUT, exist_ok=True)
PORT = 8765

def tile_png(z, x, y, size=256):
    # a pale "map-like" placeholder with a grid and the tile id, so layout is visible
    im = Image.new('RGB', (size, size), (232, 238, 226))
    d = ImageDraw.Draw(im)
    for i in range(0, size, 32):
        d.line([(i, 0), (i, size)], fill=(214, 222, 208))
        d.line([(0, i), (size, i)], fill=(214, 222, 208))
    d.rectangle([0, 0, size-1, size-1], outline=(180, 190, 175))
    d.text((6, 6), f"{z}/{x}/{y}", fill=(120, 130, 120))
    b = io.BytesIO(); im.save(b, 'PNG'); return b.getvalue()

async def main():
    srv = subprocess.Popen([sys.executable, '-m', 'http.server', str(PORT), '--bind', '127.0.0.1'], cwd=DIST, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(0.8)
    tile_hits = {'n': 0}
    errors = []
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            iphone = p.devices['iPhone 11']
            ctx = await browser.new_context(**iphone, geolocation={'latitude': -41.2926744, 'longitude': 174.8018634, 'accuracy': 8}, permissions=['geolocation'], timezone_id='Pacific/Auckland')
            async def route_handler(route, request):
                url = request.url
                if 'localhost' in url or '127.0.0.1' in url:
                    await route.continue_(); return
                if any(h in url for h in ('linz.govt.nz', 'openstreetmap.org', 'opentopomap.org')):
                    parts = url.split('?')[0].rsplit('/', 3)
                    try:
                        z, x, y = int(parts[1]), int(parts[2]), int(parts[3].split('.')[0])
                    except Exception:
                        z, x, y = 0, 0, 0
                    tile_hits['n'] += 1
                    await route.fulfill(status=200, content_type='image/png', headers={'Access-Control-Allow-Origin': '*', 'Content-Type': 'image/png'}, body=tile_png(z, x, y)); return
                await route.abort()
            await ctx.route('**/*', route_handler)
            page = await ctx.new_page()
            page.on('console', lambda m: errors.append(('console', m.type, m.text)) if m.type in ('error', 'warning') else None)
            page.on('pageerror', lambda e: errors.append(('pageerror', str(e))))

            # ---------- test walk with the simulator ----------
            await page.goto(f'http://127.0.0.1:{PORT}/test_walk/?sim', wait_until='networkidle')
            await page.wait_for_timeout(800)
            await page.screenshot(path=f'{OUT}/test_walk_00_open.png')
            await page.click('#btnStart')
            await page.wait_for_timeout(400)
            await page.screenshot(path=f'{OUT}/test_walk_01_started.png')
            # walk along: at 0.35 of the route (past the crescent) -> expect milestone 1 reached
            await page.evaluate('SIM.set(350)')
            await page.wait_for_timeout(500)
            info = await page.evaluate('({checked: SIM.state.checked, passed: SIM.passedIndex(), along: SIM.state.along, buf: SIM.bufferInfo(), next: document.getElementById("nextName").textContent, meta: document.getElementById("nextMeta").textContent, buffer: document.getElementById("buffer").textContent})')
            print('test_walk @35%:', json.dumps(info, default=str))
            await page.screenshot(path=f'{OUT}/test_walk_02_mid.png')
            # jump start time back 50 min to simulate being late
            await page.evaluate('SIM.state.startAt = Date.now() - 50*60000; localStorage.setItem("walk:test_walk:startAt", SIM.state.startAt)')
            await page.evaluate('SIM.set(360)')
            await page.wait_for_timeout(400)
            info = await page.evaluate('({buf: SIM.bufferInfo(), buffer: document.getElementById("buffer").textContent, meta: document.getElementById("nextMeta").textContent})')
            print('test_walk late by ~30min:', json.dumps(info, default=str))
            await page.screenshot(path=f'{OUT}/test_walk_03_late.png')
            # off route
            await page.evaluate('SIM.setPos(-41.2860, 174.7960, 10)')
            await page.wait_for_timeout(400)
            print('banner:', await page.evaluate('document.getElementById("banner").className + " | " + document.getElementById("banner").textContent'))
            await page.screenshot(path=f'{OUT}/test_walk_04_offroute.png')
            # list sheet
            await page.click('#btnList'); await page.wait_for_timeout(300)
            await page.screenshot(path=f'{OUT}/test_walk_05_list.png')
            await page.click('[data-close=listSheet]')
            # menu + offline save
            await page.click('#menuBtn'); await page.wait_for_timeout(300)
            await page.screenshot(path=f'{OUT}/test_walk_06_menu.png')
            before = tile_hits['n']
            await page.click('#btnOffline')
            await page.wait_for_timeout(4000)
            print('offline button:', await page.evaluate('document.getElementById("btnOffline").textContent'), '| tiles fetched during save:', tile_hits['n'] - before)
            caches = await page.evaluate('caches.keys()')
            ntiles = await page.evaluate('caches.open("tiles-test_walk-v1").then(c=>c.keys()).then(k=>k.length)')
            print('caches:', caches, 'tiles cached:', ntiles)
            sw = await page.evaluate('navigator.serviceWorker.getRegistration().then(r => r ? (r.active ? "active" : "registered") : "none")')
            print('service worker:', sw)
            await page.click('[data-close=menuSheet]')
            # finish
            await page.evaluate('SIM.set(1000)'); await page.wait_for_timeout(400)
            await page.screenshot(path=f'{OUT}/test_walk_07_finish.png')
            print('finish:', await page.evaluate('document.getElementById("nextLabel").textContent + " / " + document.getElementById("nextName").textContent + " / " + document.getElementById("nextMeta").textContent'))
            # check-in link
            popup_url = {}
            async def on_popup(pp):
                popup_url['u'] = pp.url
            page.on('popup', on_popup)
            await page.click('#btnCheckin'); await page.wait_for_timeout(600)
            print('check-in url:', popup_url.get('u', '(none)')[:300])
            txt = await page.evaluate('''() => { const a = document.createElement('a'); const orig = HTMLElement.prototype.click; let got=null; HTMLElement.prototype.click = function(){ got = this.href; }; document.getElementById('btnCheckin').onclick(); HTMLElement.prototype.click = orig; return decodeURIComponent(got||''); }''')
            print('check-in text:', txt[:400])

            # ---------- main walk with real (mocked) geolocation, no sim ----------
            page2 = await ctx.new_page()
            page2.on('console', lambda m: errors.append(('console', m.type, m.text)) if m.type in ('error', 'warning') else None)
            page2.on('pageerror', lambda e: errors.append(('pageerror', str(e))))
            await page2.goto(f'http://127.0.0.1:{PORT}/freyja_walk/', wait_until='networkidle')
            await page2.wait_for_timeout(1200)
            await page2.screenshot(path=f'{OUT}/freyja_00_open.png')
            print('freyja gps line:', await page2.evaluate('document.getElementById("gps").textContent'))
            await page2.click('#btnStart'); await page2.wait_for_timeout(300)
            # move to near the Pou
            await ctx.set_geolocation({'latitude': -41.29175, 'longitude': 174.78660, 'accuracy': 6})
            await page2.wait_for_timeout(1500)
            await page2.screenshot(path=f'{OUT}/freyja_01_pou.png')
            print('freyja at pou:', await page2.evaluate('document.getElementById("nextName").textContent + " | " + document.getElementById("nextMeta").textContent + " | " + document.getElementById("buffer").textContent'))
            await page2.click('#btnList'); await page2.wait_for_timeout(300)
            await page2.screenshot(path=f'{OUT}/freyja_02_list.png', full_page=False)
            await page2.click('[data-close=listSheet]')
            await page2.click('#cAll'); await page2.wait_for_timeout(600)
            await page2.screenshot(path=f'{OUT}/freyja_03_whole.png')

            # ---------- print view ----------
            dctx = await browser.new_context(viewport={'width': 1300, 'height': 900}, timezone_id='Pacific/Auckland')
            await dctx.route('**/*', route_handler)
            page3 = await dctx.new_page()
            page3.on('console', lambda m: errors.append(('print console', m.type, m.text)) if m.type in ('error', 'warning') else None)
            page3.on('pageerror', lambda e: errors.append(('print pageerror', str(e))))
            await page3.goto(f'http://127.0.0.1:{PORT}/freyja_walk/print.html', wait_until='networkidle')
            await page3.wait_for_timeout(2500)
            print('print status:', await page3.evaluate('document.getElementById("status").textContent'), '| pages:', await page3.evaluate('document.querySelectorAll(".page").length'))
            await page3.screenshot(path=f'{OUT}/print_00_top.png')
            await page3.pdf(path=f'{OUT}/freyja_walk_sheets.pdf', format='A4', landscape=True, print_background=True, margin={'top': '8mm', 'bottom': '8mm', 'left': '8mm', 'right': '8mm'})
            page4 = await dctx.new_page()
            await page4.goto(f'http://127.0.0.1:{PORT}/test_walk/print.html', wait_until='networkidle')
            await page4.wait_for_timeout(2000)
            print('test print pages:', await page4.evaluate('document.querySelectorAll(".page").length'))
            await page4.pdf(path=f'{OUT}/test_walk_sheets.pdf', format='A4', landscape=True, print_background=True, margin={'top': '8mm', 'bottom': '8mm', 'left': '8mm', 'right': '8mm'})
            await browser.close()
    finally:
        srv.terminate()
    print('tile requests total:', tile_hits['n'])
    print('errors/warnings:', len(errors))
    for e in errors[:30]: print('  ', e)

asyncio.run(main())
