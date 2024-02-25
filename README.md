# choose-health-th-frontend

Demo app featuring [React](https://react.dev/), [MaterialUI](https://mui.com/material-ui/) and [Vite](https://vitejs.dev/).

This app is the frontend for the [choose-health-th-api](https://github.com/flow-state-15/choose-health-th-api) deployed on [Heroku](https://www.heroku.com/home). 

To run this frontend locally, first clone the repo and `cd` into the root directory.
Install project dependencies with:

```bash
npm install && npm install -D
```

Now run the project by with the command `npm run dev`.

## Notes

This app connects to a Heroku Postgres database by default. However, you can run the app in a local environment by changing the host domain to your `localHost` port:

```js
// in src/utilities/wrappers/index.js

export function fetchFromAPI(segment, options) {
  return fetch(`http://localhost:<API_PORT_NUMBER>${segment}`,
...

```

Replace `<API_PORT_NUMBER>` with the port number the api repo is running on.

The [API repo](https://github.com/flow-state-15/choose-health-th-api) has separate startup instructions - if running this app locally, be sure to complete those before starting.

## Features

This website features a user dashboard and store page. Visitors (not logged in) can only visit the `/login` route, since the rest of the app is accessible only to `users`. Create a new user at `/login` to begin.

Once logged in you will be directed to the home page, where you have the option of purchasing a plan from the store. Once purchased, you will see your plan's details and steps in the User Dashboard.

A plan's steps must be completed incrementally and in order. Look out for alerts giving you more information when completing a plan step out of order.

A user has plan steps unique to them - one user's steps will never overlap with a separate user's steps, even though Plans are shared between all users.

Be informed of a user's purchase history through the Purchase History card at the bottom of the Dashboard.

A user may purchase any plan at any time, but can have only one Plan active at a time.

---

### Thanks for visiting this simple frontend demo!