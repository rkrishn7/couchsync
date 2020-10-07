# Playback Sync

A browser extension that enables you to sync videos from your favorite streaming platforms, across multiple devices.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

Even though we're building a browser extension, hot reloading makes it easy to inspect changes fast.<br />
Use this feature to facilitate rapid development.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the plugin using the bash file in `/scripts/build`.<br />
Under the hood, it uses `react-scripts` to build the project, but we need to take a few extra steps like renaming the root html file and setting env variables. <br />

After you've built the plugin, Take to the following steps to enable it in **Chrome**:

- Navigate to the [extensions](chrome://extensions) page
- Enable *Developer Mode* in the upper right hand corner of the page
- Click "Load Unpacked" to load the unpacked plugin build
- Open the *build* folder the script produced

That's it! You should see the plugin icon where the rest of the extensions live. If you need to build again, click the plugin's refresh button on the extensions page after doing so.

### `yarn eject`

**DO NOT USE THIS COMMAND**

I'm keeping the info here because I might want to modify the webpack config later, but there's no need to use this right now.

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
