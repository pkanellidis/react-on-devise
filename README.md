# Description

This repo provides a basic copy of Devise + Docker + React on Rails setup.

The base Devise controllers have been extended to support JSON responses and the views have been modified
to support React-On-Rails with Ant Design Components.

# How to run

- Install Docker on your machine
- Run `docker compose up --build` on the project's root dir

## Seeding data

Start the app using docker and run `docker compose exec rails-web-server bundle exec rake seed:dev`

# Remaining work

- Add tests. No tests were added as this was initially a project to see if this endeavor was reasonable.
- Standardize the dependency versions to avoid breaking changes
- Add CI pipeline

# Future work

- Implement Oath provider using doorkeeper
- Create new api controllers to handle the creation of access tokens
