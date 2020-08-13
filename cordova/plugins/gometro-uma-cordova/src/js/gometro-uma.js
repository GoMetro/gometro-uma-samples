
export const init = function(mobidotUsername, mobidotPassword, success, error) {
    cordova.exec(success, error, "GoMetroUma", "init", [mobidotUsername, mobidotPassword]);
};
