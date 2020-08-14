package com.gometroapp.uma;

import android.app.Activity;
import android.content.Context;

import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.observers.DisposableSingleObserver;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;
import org.json.JSONArray;
import org.json.JSONException;

import android.util.Log;

import com.gometro.uma.client.GoMetroUma;

public class GoMetroUmaCordova extends CordovaPlugin {

    private static final String TAG = "GoMetroUma";

    private final GoMetroUma goMetroUma = GoMetroUma.Companion.getShared();
    private final CompositeDisposable disposable = new CompositeDisposable();

    private String mobidotUsername;
    private String mobidotPassword;

    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        Log.d(TAG, "Initializing GoMetro UMA");
    }

    public boolean execute(String action,
                           JSONArray args,
                           final CallbackContext callbackContext) throws JSONException {

        if (action.equals("init")) {
            this.mobidotUsername = args.getString(0);
            this.mobidotPassword = args.getString(1);

            callbackContext.sendPluginResult(new PluginResult(Status.OK));
        } else {
            callbackContext.sendPluginResult(new PluginResult(Status.ERROR, "not implemented"));
        }

        return true;
    }

    @Override
    public void onResume(boolean multitasking) {

        Activity activity = this.cordova.getActivity();
        Context context = activity.getApplicationContext();
        String className = activity.getClass().getCanonicalName();

        disposable.add(
            goMetroUma
                .init(
                    context,
                    className != null ? className : "",
                    this.mobidotUsername,
                    this.mobidotPassword
                )
                .subscribeWith(
                    new DisposableSingleObserver<Object>() {
                        @Override
                        public void onSuccess(Object object) {
                            // no return object
                        }

                        @Override
                        public void onError(Throwable e) {
                            String message = e.getMessage();
                            if (message != null) {
                                Log.e("GoMetroSDK", message);
                            }
                        }
                    }
                )
        );
    }

    @Override
    public void onRequestPermissionResult(int requestCode,
                                          String[] permissions,
                                          int[] grantResults) {

        goMetroUma.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    @Override
    public void onDestroy() {
        disposable.dispose();
    }
}
