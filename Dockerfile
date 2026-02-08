# syntax=docker/dockerfile:1
FROM ruby:3.2-slim

# System deps commonly needed by Jekyll + native gems
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /site

# Install bundler (optional, but keeps things consistent)
RUN gem install bundler

# ---- Bundle cache layer ----
# Copy only Gemfile* first so Docker can cache bundle install
COPY Gemfile Gemfile.lock* ./

# Install gems into a path we can keep between runs (inside image)
ENV BUNDLE_PATH=/usr/local/bundle \
    BUNDLE_JOBS=4 \
    BUNDLE_RETRY=3

RUN bundle install

# ---- App layer ----
# Now copy the rest of the site
COPY . .

EXPOSE 4000

# Default: serve site for dev (host 0.0.0.0 so it’s reachable from your machine)
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--watch", "--force_polling", "--config", "_config.yml,_config.dev.yml"]