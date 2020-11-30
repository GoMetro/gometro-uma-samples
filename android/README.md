## GoMetro UMA SDK for Android Sample

### Build File

```groovy
...

repositories {
    ...

    maven { url "https://developer.gometroapp.com/nexus/repository/maven-public" }
}

dependencies {
    ...

    implementation "com.gometroapp.uma:gometro-uma-android:3.0.6"
    implementation "com.gometroapp.tracking:gometro-tracking-android:1.0.23"
    implementation "com.surveymonkey:surveymonkey-android-sdk:2.0.0"
    
    ...
}
```

### Permissions

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.gometroapp.uma.sample">

    <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.INTERNET" />

    ...

</manifest>
```

### Activating the SDK

```java
package com.gometroapp.uma.sample;

...

import com.gometroapp.uma.GoMetroUma;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onResume() {
        super.onResume();        
        ...        
        GoMetroUma.initialise(
            this,
            <gometro_uma_username>,
            <gometro_uma_password>
        );
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        ...
        GoMetroUma.onActivityResult(requestCode, resultCode, data);
    }
}
```

### Debug Logging

Debug logging is disabled by default in the SDK. In order to enable it, you can override the default
Android Logger and set it on the LoggerFactory.

```java
package com.gometroapp.uma.sample;
...
import com.gometroapp.mobile.android.logging.AndroidLogger;
import com.gometroapp.mobile.core.logging.LoggerFactory;
...

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onResume() {
        ...
        GoMetroUma.initialise(
            this,
            <gometro_uma_username>,
            <gometro_uma_password>
        );
        
        LoggerFactory.setLogger(new AndroidLogger(true, "GoMetroUma"));
        ...
    }
}
```
