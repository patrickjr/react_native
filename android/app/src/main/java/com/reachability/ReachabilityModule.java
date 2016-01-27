package com.reachability;

import android.content.Intent;
import android.net.Uri;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.common.MapBuilder;


/**
 * {@link NativeModule} that allows JS to open the default browser
 * an url.
 */

public class ReachabilityModule extends ReactContextBaseJavaModule {
  ReactApplicationContext reactContext;

  public ReachabilityModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "ReachabilityAndroid";
  }

  @ReactMethod
  public void test(String hostName, Promise success) {
    ReachabilityManager test = new ReachabilityManager(hostName);
    success.resolve(test.isHostAvailable());
  }

}