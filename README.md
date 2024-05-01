# Front-End React Application

A client-side application that guesses a GitHub user's favourite programming language. It handles invalid usernames, as well as GitHub accounts with no public repositories.

## Installation & Usage

1. Run `npm install` to install dependencies
1. Run `npm start` to launch a local environment
1. The website will be served at `http://localhost:3000`, but the website it's also live at http://github_fav_language.surge.sh/

## Deployment

Run `npm run deploy` - this script will execute:

1. `npm run build` to build the application
2. `node postbuild.js` to set the domain name with the CNAME file
3. `surge --project ./build` to deploy the build directory using [Surge](https://surge.sh/)
