const fs = require('fs-extra');
const paths = require('../config/paths');
const webpack = require('webpack');
const configFactory = require('../config/webpack.config');
const config = configFactory('development');

config.output.path = paths.appBuild;
paths.publicUrl = paths.appBuild + '/';

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
  fs.renameSync(paths.appBuild + '/index.html', paths.appBuild + '/popup.html');
  // Rename JS files for consistency
  // I don't know why the chunks have different name for prod vs dev builds.
  // Not working because popup.html still references the old chunk. 
  // fs.renameSync(paths.appBuild + '/static/js/1.chunk.js', paths.appBuild + '/static/js/3.chunk.js');
  // fs.renameSync(paths.appBuild + '/static/js/1.chunk.js.map', paths.appBuild + '/static/js/3.chunk.js.map');
}
