






/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AppHeader from '../components/AppHeader';
import Sidebar from '../components/Sidebar';
import MapView, { Marker } from 'react-native-maps';

export default function EarningsScreen() {
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

<Text style={styles.title}>Today's Earnings</Text>

<Text style={styles.amount}>₹850</Text>

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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
amount:{fontSize:40,fontWeight:"bold",marginTop:10},
  buttons: { flexDirection: 'row', gap: 20, marginTop: 20 },
});


