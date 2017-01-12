# Showtify

_A Spotify music player that connects you with the shows where you want to be_

## Running Locally

### Prerequisites
- [Node.js and npm](https://nodejs.org/en/)

### Installing

```sh
git clone https://github.com/jakepeyser/showtify.git
cd showtify
npm install
```

This will copy the project to your local machine and install all runtime dependencies, as well as Webpack build and Mocha/Chai/Enzyme/Nightwatch testing tools.

### Running the app

```sh
npm run build-dev
npm start
```

The first command will run Webpack, building the front end static files in development mode. The second command will run the http server. This setup simulates a production environment without the performance enhacements.

### Alternate development commands

- `npm run build-watch` - Build the front end app in "watch" mode, such that the build is re-run every time source files are updated and saved.
- `npm run hmr` - Serve the front end app from a dev-server running on `localhost:3000` so that static files can be hot-swapped without reloading the app. API calls are proxied to `8080`, so you still need the Node server running.
- `npm run dev` - Start the Node server in "watch" mode, so that it automatically restarts when source files are changed.

## Running in Prod

Running the application in Prod is similar to running it locally:

```sh
npm install
npm run build
npm start
```
