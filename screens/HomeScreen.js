import React, { useState } from 'react';
import AppHeader from '../components/AppHeader';
import SideBarPassenger from '../components/SideBarPassenger';
import SideBarSchool from '../components/SideBarSchool';
import MapView from 'react-native-maps';
import PassengerMode from '../components/PassengerMode';
import SchoolMode from '../components/SchoolMode';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

export default function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [mode, setMode] = useState(null);
  const [tripStarted, setTripStarted] = useState(false);
  const [showModePopup, setShowModePopup] = useState(false);
  const [online, setOnline] = useState(false);


  return (
    <View style={{ flex: 1 }}>
      
      <AppHeader
        title="Driver Dashboard"
        onMenuPress={() => setMenuVisible(true)}
        showSwitch={true}
        online={online}
        onToggleOnline={val => {
          setOnline(val);

          if (val) {
            setShowModePopup(true);
          } else {
            setMode(null);
            setTripStarted(false);
          }
        }}
      />

      {/* MAP ALWAYS RENDER */}
      <MapView
        style={{ flex: 1, opacity: online ? 1 : 0.4 }}
        provider="google"
        showsUserLocation
        initialRegion={{
          latitude: 13.0827,
          longitude: 80.2707,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />

      {/* SIDEBARS */}
      {mode === 'passenger' && (
        <SideBarPassenger
          visible={menuVisible}
          closeMenu={() => setMenuVisible(false)}
        />
      )}

      {mode === 'school' && (
        <SideBarSchool
          visible={menuVisible}
          closeMenu={() => setMenuVisible(false)}
        />
      )}

      {/* OFFLINE SCREEN */}
      {!online && (
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>You are Offline</Text>

          <TouchableOpacity
            style={styles.goOnlineBtn}
            onPress={() => {
              setOnline(true);
              setShowModePopup(true);
            }}
          >
            <Text style={styles.btnText}>Go Online</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* MODE SELECT POPUP */}
      <Modal visible={showModePopup} transparent animationType="slide">
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Select Work Mode</Text>

            <TouchableOpacity
              style={styles.modeBtn}
              onPress={() => {
                setMode('passenger');
                setShowModePopup(false);
              }}
            >
              <Text style={styles.btnText}>Passenger Ride</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modeBtn}
              onPress={() => {
                setMode('school');
                setShowModePopup(false);
              }}
            >
              <Text style={styles.btnText}>School Trip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODE COMPONENTS */}
      {mode === 'passenger' && <PassengerMode mode={mode} />}
      {mode === 'school' && (
        <SchoolMode tripStarted={tripStarted} setTripStarted={setTripStarted} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  popup: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    width: '80%',
  },

  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  modeBtn: {
    backgroundColor: '#2e7d32',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },

  btnText: {
    color: '#fff',
    textAlign: 'center',
  },

  offlineText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#717171',
  },

  goOnlineBtn: {
    backgroundColor: '#2e7d32',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },

  offlineContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});