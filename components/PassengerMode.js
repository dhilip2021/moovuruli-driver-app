/* eslint-disable react-native/no-inline-styles */
import Geolocation from 'react-native-geolocation-service';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function PassengerMode({ mode }) {

  const mapRef = useRef(null);

  const [driverLocation, setDriverLocation] = useState({
    latitude: 13.0827,
    longitude: 80.2707,
  });

  const [heading, setHeading] = useState(0);
  const watchId = useRef(null);



  // start GPS tracking
  const startTracking = () => {

    Geolocation.getCurrentPosition(
      position => {

        const { latitude, longitude, heading } = position.coords;

        setDriverLocation({ latitude, longitude });

        setHeading(heading ? Number(heading) : 0);

      },
      error => console.log('GPS ERROR', error),
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );

    watchId.current = Geolocation.watchPosition(
      position => {

        const { latitude, longitude, heading } = position.coords;

        console.log("Driver Location:", latitude, longitude);

        setDriverLocation({
          latitude,
          longitude,
        });

        setHeading(heading ? Number(heading) : 0);

        // smooth map follow
        if (mapRef.current) {
          mapRef.current.animateCamera({
            center: {
              latitude,
              longitude,
            },
            zoom: 17,
          });
        }

      },
      error => console.log('Watch error', error),
      {
        enableHighAccuracy: true,
        distanceFilter: 5,
        interval: 3000,
        fastestInterval: 2000,
      }
    );
  };

useEffect(() => {

  const requestLocationPermission = async () => {

    try {

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        startTracking();
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

      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        provider="google"
        showsUserLocation
        followsUserLocation
        initialRegion={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >

        <Marker
          coordinate={driverLocation}
          rotation={heading}
          anchor={{ x: 0.5, y: 0.5 }}
        />

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