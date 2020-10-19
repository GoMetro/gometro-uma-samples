package com.gometroapp.uma.sample;

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.gometroapp.mobile.android.logging.AndroidLogger;
import com.gometroapp.mobile.core.logging.LoggerFactory;
import com.gometroapp.uma.GoMetroUma;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
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
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        GoMetroUma.onActivityResult(requestCode, resultCode, data);
    }
}
