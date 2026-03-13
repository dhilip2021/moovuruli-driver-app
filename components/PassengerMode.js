/* eslint-disable react-native/no-inline-styles */
import Geolocation from 'react-native-geolocation-service';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function PassengerMode({ mode }) {

  const mapRef = useRef(null);
  const watchId = useRef(null);

  const [driverLocation, setDriverLocation] = useState({
    latitude: 13.0827,
    longitude: 80.2707,
  });

  const [heading, setHeading] = useState(0);

  const startTracking = () => {

    watchId.current = Geolocation.watchPosition(
      position => {

        const { latitude, longitude, heading } = position.coords;

        console.log("GPS UPDATE:", latitude, longitude);

        const newLocation = {
          latitude,
          longitude,
        };

        setDriverLocation(newLocation);

        setHeading(heading ? Number(heading) : 0);

        if (mapRef.current) {
          mapRef.current.animateCamera({
            center: newLocation,
            zoom: 17,
          });
        }

      },
      error => {
        console.log("GPS ERROR:", error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 1,
        interval: 2000,
        fastestInterval: 1000,
        forceRequestLocation: true,
        showLocationDialog: true,
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

          console.log("Location Permission Granted");

          startTracking();

        } else {

          console.log("Location Permission Denied");

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
        showsUserLocation={true}
        followsUserLocation={true}
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