package com.gometroapp.uma.sample;

import com.gometroapp.mobile.android.logging.AndroidLogger;
import com.gometroapp.mobile.core.logging.Logger;

public final class DebugOverrideLogger implements Logger {

    private static final String TAG = "GoMetroUma";
    private final Logger delegate = new AndroidLogger(true, TAG);

    public DebugOverrideLogger() {
    }

    @Override
    public void debug(String message) {
        this.delegate.debug(message);
    }

    @Override
    public void debug(String format, Object... args) {
        this.delegate.debug(format, args);
    }

    @Override
    public void debug(String message, Throwable throwable) {
        this.delegate.debug(message, throwable);
    }

    @Override
    public void info(String message) {
        this.delegate.info(message);
    }

    @Override
    public void info(String message, Throwable throwable) {
        this.delegate.info(message, throwable);
    }

    @Override
    public void warn(String message) {
        this.delegate.warn(message);
    }

    @Override
    public void warn(String message, Throwable throwable) {
        this.delegate.warn(message, throwable);
    }

    @Override
    public void warn(Throwable throwable) {
        this.delegate.warn(throwable);
    }

    @Override
    public void error(String message) {
        this.delegate.error(message);
    }

    @Override
    public void error(String message, Throwable throwable) {
        this.delegate.error(message, throwable);
    }

    @Override
    public void error(Throwable throwable) {
        this.delegate.error(throwable);
    }
}
