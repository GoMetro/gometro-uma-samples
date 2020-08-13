cordova.define("gometro-uma-cordova.GoMetroUma", function(require, exports, module) {

export const init = function(mobidotUsername, mobidotPassword, success, error) {
    cordova.exec(success, error, "GoMetroUma", "init", [mobidotUsername, mobidotPassword]);
};

});
