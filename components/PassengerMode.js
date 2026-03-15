/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import Geolocation from 'react-native-geolocation-service';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Alert, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import DriverTracking from '../components/DriverTracking';

export default function PassengerMode({ mode }) {
  const mapRef = useRef(null);
  const watchId = useRef(null);

  const [driverLocation, setDriverLocation] = useState({
    latitude: 13.0827,
    longitude: 80.2707,
  });

  const [heading, setHeading] = useState(0);


const checkGPS = () => {
  RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
    interval: 10000,
    fastInterval: 5000,
  })
    .then(() => {
      console.log("GPS Enabled");
      startTracking();
    })
    .catch(err => {
      console.log("GPS not enabled", err);

      Alert.alert(
        "GPS Required",
        "Please enable location services to continue",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ]
      );
    });
};



  const startTracking = () => {
    watchId.current = Geolocation.watchPosition(
      position => {
        const { latitude, longitude, heading } = position.coords;

        console.log('GPS UPDATE:', latitude, longitude);

        const newLocation = {
          latitude,
          longitude,
        };

        setDriverLocation(newLocation);

        setHeading(typeof heading === 'number' ? heading : 0);

        if (mapRef.current) {
          mapRef.current.animateCamera({
            center: newLocation,
            zoom: 17,
          });
        }
      },
      error => {
        console.log('GPS ERROR:', error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 1,
        interval: 2000,
        fastestInterval: 1000,
        forceRequestLocation: true,
        showLocationDialog: true,
      },
    );
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]);

        if (
          granted['android.permission.ACCESS_FINE_LOCATION'] === 'granted' &&
          granted['android.permission.ACCESS_COARSE_LOCATION'] === 'granted'
        ) {
          console.log('Location Permission Granted');
          // startTracking();
checkGPS();
        } else {
          console.log('Location Permission Denied');
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (mode === 'passenger') {
      requestLocationPermission();
    }

    return () => {
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
      }
    };
  }, [mode]);

  return (
    <View style={{ flex: 1 }}>
    <DriverTracking />
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        provider="google"
        showsUserLocation={true}
        followsUserLocation={true}
        initialRegion={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {driverLocation && (
          <Marker
            coordinate={driverLocation}
            rotation={heading}
            anchor={{ x: 0.5, y: 0.5 }}
          />
        )}
      </MapView>

      <View style={styles.container}>
        <Text style={styles.title}>Passenger Mode Active</Text>
        <Text>Waiting for ride requests...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
