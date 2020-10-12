const fs = require('fs-extra');
const paths = require('../config/paths');
const webpack = require('webpack');
const configFactory = require('../config/webpack.config');
const config = configFactory('development');

config.output.path = paths.appBuild;

webpack(config).watch({}, (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    copyPublicFolder();
  }
  console.error(
    stats.toString({
      chunks: false,
      colors: true
    })
  );
});

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
  // Rename HTML
  if (fs.existsSync(paths.appBuild + '/index.html'))
    fs.renameSync(paths.appBuild + '/index.html', paths.appBuild + '/popup.html');
}
