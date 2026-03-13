/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AppHeader from '../components/AppHeader';
import Sidebar from '../components/Sidebar';
import MapView, { Marker } from 'react-native-maps';

export default function RideRequestScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <AppHeader
        title="Ride Requests"
        onMenuPress={() => setMenuVisible(true)}
      />
      <MapView
        style={{ flex: 1 }}
        provider="google"
        showsUserLocation={true}
        initialRegion={{
          latitude: 13.0827,
          longitude: 80.2707,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />

      <Sidebar visible={menuVisible} closeMenu={() => setMenuVisible(false)} />

      <View style={styles.container}>
        <Text style={styles.title}>New Ride Request</Text>

        <Text>Pickup: Bus Stand</Text>
        <Text>Drop: Railway Station</Text>
        <Text>Distance: 3 km</Text>

        <View style={styles.buttons}>
          <Button title="Accept" />

          <Button title="Reject" color="red" />
        </View>
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  buttons: { flexDirection: 'row', gap: 20, marginTop: 20 },
});
