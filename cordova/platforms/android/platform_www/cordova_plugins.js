cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "gometro-uma-cordova.GoMetroUma",
      "file": "plugins/gometro-uma-cordova/src/js/gometro-uma.js",
      "pluginId": "gometro-uma-cordova",
      "clobbers": [
        "GoMetroUma"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "gometro-uma-cordova": "0.17.0"
  };
});