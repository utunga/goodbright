#  GoodBright (fork of Particle Jekyll Theme)

see https://goodbright.nz

## Running it locally

The site is built by GitHub Pages, so previewing it locally means running the
same `github-pages` gem bundle. Those gems need Ruby 3.x — the Ruby that ships
with macOS is 2.6 and will not install them — so everything runs in Docker
instead. You do not need Ruby or Jekyll installed on your machine.

**You do need Docker Desktop (or OrbStack) actually running.** That is the usual
reason these commands "don't work": if `docker info` errors out, nothing else
will succeed either. Start the app first, then:

```sh
make serve          # http://localhost:9021
```

The first run builds the Docker image (a few minutes — it installs the gem
bundle). After that it starts in a second or two. The site is mounted into the
container and Jekyll watches it, so edit a file, refresh the browser, done.
Ctrl-C stops it.

Other targets — `make` on its own lists them all:

| command | what it does |
| --- | --- |
| `make serve` | build the image if it's missing, then serve on port 9021 |
| `make serve PORT=9022` | same, on a different port |
| `make build` | one-off build into `./_site`, no server |
| `make preview` | serve an already-built `./_site` with python3, no Docker needed |
| `make stop` | stop a serve container that got left running |
| `make shell` | bash prompt inside the image, site mounted at `/site` |
| `make image` | force an image rebuild — needed after changing `Gemfile` or `Dockerfile` |
| `make clean` | delete `./_site` |
| `make clean-image` | delete the Docker image too |

### If something goes wrong

- **"Docker doesn't seem to be running"** — start Docker Desktop / OrbStack.
- **"Port 9021 is already in use"** — a previous serve is still going. Either
  `make stop`, or use another port with `make serve PORT=9022`.
- **Gem or bundler errors** — you changed the `Gemfile`; run `make image` to
  rebuild the bundle into the image.
- **A page 404s locally but the file exists** — check its front matter. Pages
  with a `permalink:` (e.g. `balaena_bay.html` → `/balaena_bay/`) are served at
  that path, not at the filename.

## Basic Setup

1. Fork this [repo](https://github.com/utunga/goodbright/fork)
2. Clone the repo you just forked.
3. Edit `_config.yml` to personalize your site.
4. `make serve` to preview (see above).

## Site and User Settings

Fill in  `_config.yml` to customize your site.

## Color and Particle Customization
- Color Customization
  - Edit the sass variables
- Particle Customization
  - Edit the json data in particle function in app.js
  - Refer to [Particle.js](https://github.com/VincentGarreau/particles.js/) for help

## License

This theme is free and open source software, distributed under the The MIT License. So feel free to use this Jekyll theme anyway you want.

## Credits

This theme was based on and designed with inspiration from these fine folks
- [Nathan Randecker](https://github.com/nrandecker/particle)
- [Willian Justen](https://github.com/willianjusten/will-jekyll-template)
- [Vincent Garreau](https://github.com/VincentGarreau/particles.js/)
