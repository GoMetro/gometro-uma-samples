package com.gometroapp.uma.sample;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.FileProvider;

import com.gometroapp.uma.client.GoMetroUma;
import com.gometroapp.uma.util.SentryEvents;

import java.io.File;
import java.util.Objects;

import io.reactivex.disposables.CompositeDisposable;

import static com.gometroapp.uma.sample.BuildConfig.APPLICATION_ID;

public final class MainActivity extends AppCompatActivity {
    private static final String TAG = "GoMetroUmaSample";

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
    }

    @Override
    public void onResume() {
        super.onResume();

        SentryEvents.captureMessage(getClass(), "onResume");

        // initialize the GoMetro SDK
        String mainActivityClass = MainActivity.class.getCanonicalName();
        mainActivityClass = mainActivityClass == null ? "" : mainActivityClass;

        this.disposable.add(
            this.goMetroUma
                .init(
                    this,
                    mainActivityClass,
                    "kLCHf0LqzG8LVaeEoA3PsqpgEmivYVDycoyGpw86q7NfwlUgxnlfkssVkLxgkf485VMXUYBtmxm1TLh9"
                )
                .subscribe(
                    (unit) -> Log.i(TAG, "SM and Mobidot SDKs started"),
                    (throwable) -> Log.e(TAG, Objects.requireNonNull(throwable.getMessage()))
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
}
