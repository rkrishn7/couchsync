# Playback Sync

A browser extension that enables you to sync videos from your favorite streaming platforms, across multiple devices.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn watch`

Runs the app in the development mode.<br />
You'll need to load the unpacked plugin into Chrome. Follow the steps in the **`yarn build`** section.<br />
After this, hot reloading should be enabled so simply make the changes you need and watch the magic happen!<br />
You might need to reload the page and/or close and open the extension popup again.<br />
This means you won't need to build the plugin and refresh everytime you make a change!<br />

You can thank me later 😁

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the plugin using the bash file in `/scripts/build`.<br />
Under the hood, it uses `react-scripts` to build the project, but we need to take a few extra steps like renaming the root html file and setting env variables. <br />

After you've built the plugin, Take to the following steps to enable it in **Chrome**:

- Navigate to the [extensions](chrome://extensions) page
- Enable *Developer Mode* in the upper right hand corner of the page
- Click "Load Unpacked" to load the unpacked plugin build (or load a bundled one)
- Open the *build* folder the script produced

That's it! You should see the plugin icon where the rest of the extensions live. You'll need to pin the plugin too see it on the extensions bar. If you need to build again, click the plugin's refresh button on the extensions page after doing so.

### `yarn eject`

**DO NOT USE THIS COMMAND**

I've already ejected to modify the webpack config, this command will do nothing.

### `yarn start`

Deprecated. Replaced with `yarn watch`.

## Developing

We're using [emotion](https://emotion.sh/docs/introduction) and [rebass](https://rebassjs.org/getting-started) to build components.<br />
rebass is a robust library that is easy to extend using emotion.<br />

**A few guidelines:**

- Please write all CSS in the Javascript files. emotion makes this easy.
- Add generic components to the `src/components/` folder.
- We'll be using [Redux](https://redux.js.org/) as our centralized state container. Please reduce boilerplate.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
