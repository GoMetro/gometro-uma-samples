document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    const GoMetroUma = cordova.require('gometro-uma-cordova.GoMetroUma');
    GoMetroUma.init("gometro-android-idj39sme", "Uh0JcpyfE62ePx2asHUwoJx1As1TQy5k");

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}
