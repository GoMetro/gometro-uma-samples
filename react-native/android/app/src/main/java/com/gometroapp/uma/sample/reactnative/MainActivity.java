package com.gometroapp.uma.sample.reactnative;

import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.gometroapp.mobile.android.logging.AndroidLogger;
import com.gometroapp.mobile.android.service.event.ActivityRefreshed;
import com.gometroapp.mobile.core.event.DeviceEventBus;
import com.gometroapp.mobile.core.logging.LoggerFactory;
import com.gometroapp.uma.GoMetroUma;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import expo.modules.splashscreen.SplashScreenImageResizeMode;
import expo.modules.splashscreen.singletons.SplashScreen;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // SplashScreen.show(...) has to be called after super.onCreate(...)
        // Below line is handled by '@expo/configure-splash-screen' command and it's discouraged to modify it manually
        SplashScreen.show(this, SplashScreenImageResizeMode.CONTAIN, ReactRootView.class, false);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "main";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }

    @Override
    protected void onResume() {
        super.onResume();

        GoMetroUma.initialise(
                this,
                BuildConfig.GOMETRO_UMA_USERNAME,
                BuildConfig.GOMETRO_UMA_PASSWORD
        );

        LoggerFactory.setLogger(new AndroidLogger(true, "GoMetroUma"));
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        GoMetroUma.onActivityResult(requestCode, resultCode, data);
    }
}
