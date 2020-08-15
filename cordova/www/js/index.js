document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    const GoMetroUma = cordova.require('gometro-uma-cordova.GoMetroUma');
    GoMetroUma.init("kLCHf0LqzG8LVaeEoA3PsqpgEmivYVDycoyGpw86q7NfwlUgxnlfkssVkLxgkf485VMXUYBtmxm1TLh9");

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}
