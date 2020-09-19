package com.gometroapp.uma.sample;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import static android.Manifest.permission.ACCESS_COARSE_LOCATION;
import static android.Manifest.permission.ACCESS_FINE_LOCATION;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.core.content.FileProvider;

import com.gometroapp.uma.client.GoMetroUma;
import com.gometroapp.uma.util.SentryEvents;

import java.io.File;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;

import io.reactivex.disposables.CompositeDisposable;

import static android.content.pm.PackageManager.PERMISSION_GRANTED;
import static com.gometroapp.uma.sample.BuildConfig.APPLICATION_ID;

public final class MainActivity extends AppCompatActivity {
    private static final String TAG = "GoMetroUmaSample";

    private boolean isSdkInitialized = false;

    private GoMetroUma goMetroUma;
    private CompositeDisposable disposable = new CompositeDisposable();

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        SentryEvents.captureMessage(getClass(), "onCreate");

        setContentView(R.layout.activity_main);

        // get GoMetroUma instance
        this.goMetroUma = GoMetroUma.getInstance();
        ((Button) findViewById(R.id.share_logs))
            .setOnClickListener(this::shareLogs);
        ((Button) findViewById(R.id.refreshViewFeedback))
            .setOnClickListener(this::refreshViewFeedback);
    }

    private void refreshViewFeedback(View view) {
        refreshTextViews();
        updateLastRefresh();
    }

    @Override
    public void onResume() {
        super.onResume();
        if (this.goMetroUma == null) {
            this.goMetroUma = GoMetroUma.getInstance();
        }

        SentryEvents.captureMessage(getClass(), "onResume");

        // initialize the GoMetro SDK
        String mainActivityClass = MainActivity.class.getCanonicalName();
        mainActivityClass = mainActivityClass == null ? "" : mainActivityClass;
        Log.i(TAG, "On Resume");
        this.disposable.add(
            this.goMetroUma
                .init(
                    this,
                    mainActivityClass,
                    "kLCHf0LqzG8LVaeEoA3PsqpgEmivYVDycoyGpw86q7NfwlUgxnlfkssVkLxgkf485VMXUYBtmxm1TLh9"
                )
                .subscribe(
                    (unit) -> {
                        Log.i(TAG, "SM and Mobidot SDKs started");
                        this.isSdkInitialized = true;
                    },
                    (throwable) -> {
                        Log.e(TAG, Objects.requireNonNull(throwable.getMessage()));
                    }
                )
        );
    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        this.goMetroUma.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();

        SentryEvents.captureMessage(getClass(), "onDestroy");

        this.disposable.dispose();
    }

    private void shareLogs(View view) {

        Context context = getApplicationContext();
        File directory = context.getExternalFilesDir(Environment.DIRECTORY_MOVIES);

        String logcatFilename = "gometromove_sample.log";
        String logcatFilePath = directory + "/" + logcatFilename;

        try {
            Runtime.getRuntime().exec("logcat -d -f " + logcatFilePath);

            File file = new File(logcatFilePath);
            if (file.exists()) {
                Uri uri = FileProvider.getUriForFile(this, APPLICATION_ID + ".provider", file);
                Intent intent = new Intent(Intent.ACTION_SEND);
                intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                intent.setType("*/*");
                intent.putExtra(Intent.EXTRA_STREAM, uri);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

                startActivity(intent);
            }
        } catch (Exception exception) {
            Log.e(TAG, exception.getMessage(), exception);
        }
    }

    public void updateTextView(int id, String text) {
        TextView textView = (TextView) findViewById(id);
        textView.setText(text);
    }
    public void updateMobidotUserId() {
        String mobidotUser = this.goMetroUma.getMobidotUserid();
        updateTextView(R.id.mobidotUserId, "Mobidot User Id: " + mobidotUser);
    }

    public void updateFineFeedback() {
        String status = ContextCompat.checkSelfPermission(this, ACCESS_FINE_LOCATION) == PERMISSION_GRANTED ? "Granted" : "Not Granted";
        updateTextView(R.id.fineLocationPermission, "Fine Location Permission: " + status);
    }

    public void updateCoarseFeedback() {
        String status = ContextCompat.checkSelfPermission(this, ACCESS_COARSE_LOCATION) == PERMISSION_GRANTED ? "Granted" : "Not Granted";
        updateTextView(R.id.coarseLocationPermission, "Coarse Location Permission: " + status);
    }

    public void updateSensingStateFeedback() {
        if (! this.isSdkInitialized) return;

        String status = this.goMetroUma.getMeasuringState() ? "On" : "Off";
        updateTextView(R.id.sensingState, "Sensing State: " + status);
    }

    public void updateLastRefresh() {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
        String lastUpdate = df.format(new Date());
        updateTextView(R.id.lastRefresh, "Last Refresh: " + lastUpdate);
    }

    public void updateLastTrip() {
        String start = this.goMetroUma.getLastTripStart();
        String end = this.goMetroUma.getLastTripEnd();
        updateTextView(R.id.lastTripStart, "Last trip start: " + start);
        updateTextView(R.id.lastTripEnd, "Last trip end: " + end);
    }

    public void refreshTextViews() {
        updateCoarseFeedback();
        updateFineFeedback();
        updateMobidotUserId();
        updateSensingStateFeedback();
        updateLastTrip();
    }
}
