# Kitty sync server

Syncs Kitty between your phone and laptop whenever both are on your Tailscale network.
The server runs on the laptop, keeps a merged copy of your lists in
`~/.kitty-sync/` (plus a dated copy for each of the last 30 days in
`backups/`), and nothing goes anywhere else.

Needs Node 18 or newer. There's nothing to install.

## Why Tailscale

Kitty is served from `https://goodbright.nz`, and an https page may only talk
to a server with a certificate the phone trusts. Tailscale gives the laptop a
real HTTPS name (like `miles-macbook.tail1234.ts.net`) that works from the
phone whether you're on the same Wi-Fi or not, with nothing to install on the
phone except the Tailscale app. The sync server itself only listens on the
laptop (127.0.0.1); `tailscale serve` is the one door in, and only devices on
your tailnet can use it.

## One-time setup

1. Install Tailscale on the laptop and the phone (App Store / Play Store /
   tailscale.com/download) and sign in to the same account on both.
2. In the Tailscale admin console → **DNS**: make sure **MagicDNS** is on, and
   turn on **HTTPS Certificates**.
3. On the laptop, put HTTPS in front of the sync server. This persists across
   restarts:

   ```sh
   tailscale serve --bg 8787
   ```

   (On a Mac with the App Store version, the CLI is
   `/Applications/Tailscale.app/Contents/MacOS/Tailscale`.) It prints the
   address, e.g. `https://miles-macbook.tail1234.ts.net`.
4. Start the sync server (from the goodbright repo):

   ```sh
   node kitty/server/kitty-sync.js
   ```

   It prints that address and a pairing code valid for 10 minutes.
5. Check it from the phone: with Tailscale connected, open the address in the
   phone's browser. You should see "Kitty sync server … is running". The very
   first request can take a few seconds while Tailscale fetches the
   certificate.

## Pairing

**Pair the phone first.** The server starts empty, so the phone's lists go up
as they are with no questions asked.

In Kitty: menu ⋯ → **Sync with laptop** → enter the address and the code.

Type the address without `https://` if you like (e.g.
`miles-macbook.tail1234.ts.net`). Then pair Kitty in the laptop's browser the same way. Because the server
already has lists by then, Kitty asks which to keep. Choose **Use the
laptop's lists** (meaning the server's copy, which is the phone's). Every choice saves a copy of
that device's lists first (in localStorage, `kitty.data.before-sync-…`).

Restart the server to get a fresh code. Paired devices stay paired across
restarts. To unpair a device, delete its entry from `~/.kitty-sync/tokens.json`.

## Day to day

Leave the server running (or start it when you want to sync). Whenever Kitty
is open on a paired device, Tailscale is connected on it, and the laptop is
awake, changes flow both ways
within a second or so. The dot on the ⋯ button turns green after a successful
sync. Edits made while apart merge when you're next together:

- An edit on each side to different things: both kept.
- The same item edited on both: the later edit wins.
- Deleted on one side, edited on the other: the delete wins.
- The same text added on both: kept once.

## Options

```
--port 8787         port to listen on (match it in `tailscale serve`)
--data ~/.kitty-sync  where the lists, tokens and backups live
--name NAME         name shown in Kitty (default: the laptop's hostname)
--origin URL,URL    pages allowed to connect (default goodbright.nz)
--cert F --key F    serve HTTPS directly to the LAN with your own certificate
                    (e.g. from mkcert) instead of going through Tailscale
```

## Tests

```sh
node kitty/server/crdt.test.js
```
