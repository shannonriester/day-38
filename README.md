# Basic Build with NPM scripts
This is a project scaffolding and build tool for the TIY Austin Front-End Engineering course. Feel free to use and enjoy! Feedback and PRs welcome!

## Features
- A bare bones scaffolding for an SPA, without any libraries built in
- A static server for serving up your dev environment via http
- `app` directory for development, preloaded with an `index.html`, `scripts/entry.js`, `scss/main.scss` and `assets/`
- `dist` directory for deployable code
- es2015 and babel, including module syntax
- mocha test runner, for support testing modules and react components with es2015 and jsx syntax using enzyme and the chai assertion library
- sass (.scss)
- GeoLocation:
  - Only used when geolocation is successful
    - User must agree to retrieving position in order to successfully get current position
  - See `SessionModel.js` in app/scripts/Controllers
    - For calling the function, see


## Installation
- Clone this repo (or fork then clone, if you prefer)
- Remove the git history by running `rm -rf .git`
- Set up a new git repo
- Run `npm install`
- if you get permission errors you may need to run `sudo npm install` to install a couple global dependencies
- Additional Installations:
  - `npm install --save velocity-react`

## Use
- `npm install` will scaffold your project AND start the dev server
- `npm start` will start the dev server and watch for changes
- `npm test` will run any test files included in the test folder
- `npm run deploy` will push the content of `dist/` to gh-pages
- When the server is running, your site will be live on [http://localhost:8080/](http://localhost:8080/)

## Dependencies
- `sass` [install guide here](http://sass-lang.com/install)


//to do
- testing
- fix shake button if not logged in
- who voted on what in scrolling column (onclick) -- list of all the votes
  - move spotify link to modal view
- add 'then' and 'promise functionality' and explain about it in my readme
- swipe over/next on bandModal
- if logging in and change mind, your typed stuff is still saved
