package com.reactnativetutorial;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import android.location.Geocoder;
import android.location.Address;
import java.util.List;
import java.util.Locale;

public class GeoModule extends ReactContextBaseJavaModule {
  GeoModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  public String getName() {
    return "GeoModule";
  }

  @ReactMethod
  public void getCityName(double lat, double lng, Promise promise) {
    try {
      android.util.Log.d("GeoModule", "Getting city for: " + lat + ", " + lng);

      if (!Geocoder.isPresent()) {
        android.util.Log.e("GeoModule", "Geocoder not present");
        promise.resolve("Geocoder Not Available");
        return;
      }

      Geocoder geocoder = new Geocoder(getReactApplicationContext(), Locale.getDefault());
      List<Address> addresses = geocoder.getFromLocation(lat, lng, 1);

      if (addresses != null && !addresses.isEmpty()) {
        Address address = addresses.get(0);
        String city = address.getLocality();
        if (city == null)
          city = address.getSubAdminArea();
        if (city == null)
          city = address.getAdminArea();
        if (city == null)
          city = address.getFeatureName();

        android.util.Log.d("GeoModule", "Found city: " + city);
        promise.resolve(city != null ? city : "Unknown Location");
      } else {
        android.util.Log.w("GeoModule", "No address found");
        promise.resolve("Unknown Location");
      }
    } catch (Exception e) {
      android.util.Log.e("GeoModule", "Error: " + e.getMessage());
      promise.resolve("Geo Error: " + e.getMessage());
    }
  }
}
