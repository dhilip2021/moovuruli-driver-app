/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

import Geolocation from 'react-native-geolocation-service';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { PermissionsAndroid } from 'react-native';

export default function PassengerMode({ mode }) {
  const [driverLocation, setDriverLocation] = useState({
    latitude: 13.0827,
    longitude: 80.2707,
  });
  const [heading, setHeading] = useState(0);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude, heading } = position.coords;

        setDriverLocation({
          latitude,
          longitude,
        });

        setHeading(heading ?? 0);
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);

      const fineGranted =
        granted['android.permission.ACCESS_FINE_LOCATION'] ===
        PermissionsAndroid.RESULTS.GRANTED;

      const coarseGranted =
        granted['android.permission.ACCESS_COARSE_LOCATION'] ===
        PermissionsAndroid.RESULTS.GRANTED;

      if (fineGranted || coarseGranted) {
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    let watchId;

    if (mode === 'passenger') {
      watchId = Geolocation.watchPosition(
        position => {
          const { latitude, longitude, heading } = position.coords;

          if (latitude && longitude) {
            setDriverLocation({ latitude, longitude });
          }

          setHeading(Number(heading) || 0);
        },
        error => {
          console.log('Location error:', error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 10,
          interval: 5000,
          fastestInterval: 2000,
        },
      );
    }

    return () => {
      if (watchId) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, [mode]);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        provider="google"
        showsUserLocation
        followsUserLocation
        region={{
          latitude: driverLocation?.latitude || 13.0827,
          longitude: driverLocation?.longitude || 80.2707,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
 {mode === 'passenger' &&
          driverLocation?.latitude &&
          driverLocation?.longitude && (
            <Marker
              coordinate={{
                latitude: driverLocation.latitude,
                longitude: driverLocation.longitude,
              }}
              rotation={Number(heading) || 0}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              {/* <Image
                source={AutoIcon}
                style={{ width: 40, height: 40, resizeMode: 'contain' }}
              /> */}
            </Marker>
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
