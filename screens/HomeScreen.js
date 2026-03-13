/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import AppHeader from '../components/AppHeader';
import SideBarPassenger from '../components/SideBarPassenger';
import SideBarSchool from '../components/SideBarSchool';
import MapView, { Marker } from 'react-native-maps';
import PassengerMode from '../components/PassengerMode';
import SchoolMode from '../components/SchoolMode';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
} from 'react-native';

export default function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [mode, setMode] = useState(null);
  const [tripStarted, setTripStarted] = useState(false);
  const [showModePopup, setShowModePopup] = useState(false);
  const [online, setOnline] = useState(false);

  const students = [
    { id: '1', name: 'Arun', status: 'Waiting' },
    { id: '2', name: 'Karthik', status: 'Waiting' },
    { id: '3', name: 'Priya', status: 'Waiting' },
  ];

  const [list, setList] = useState(students);

  const pickupStudent = id => {
    setList(prev =>
      prev.map(s => (s.id === id ? { ...s, status: 'Picked' } : s)),
    );
  };

  const dropStudent = id => {
    setList(prev =>
      prev.map(s => (s.id === id ? { ...s, status: 'Dropped' } : s)),
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* HEADER */}
      <AppHeader
        title="Driver Dashboard"
        onMenuPress={() => setMenuVisible(true)}
        showSwitch={online}
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
    {
!online && 
<MapView
        style={{ flex: 1, opacity: online ? 1 : 0.4 }}
        provider="google"
        showsUserLocation={true}
        initialRegion={{
          latitude: 13.0827,
          longitude: 80.2707,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />
}
      

      {/* SIDEBAR PASSENGER */}
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

      {/* MODE POPUP */}
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

      {/* PASSENGER MODE */}
      {mode === 'passenger' && <PassengerMode mode={mode} />}

      {/* SCHOOL MODE */}
      {mode === 'school' && (
        <SchoolMode
          tripStarted={tripStarted}
          setTripStarted={setTripStarted}
          list={list}
          pickupStudent={pickupStudent}
          dropStudent={dropStudent}
        />
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

  passengerBox: {
    marginTop: 20,
    alignItems: 'center',
  },

  tripBox: {
    marginTop: 20,
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  startBtn: {
    backgroundColor: '#2e7d32',
    padding: 10,
    borderRadius: 6,
  },

  studentCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 12,
    marginHorizontal: 20,
    elevation: 2,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  studentStatus: {
    marginTop: 4,
  },

  btnRow: {
    flexDirection: 'row',
    marginTop: 10,
  },

  pickBtn: {
    backgroundColor: '#2196f3',
    padding: 8,
    borderRadius: 6,
    marginRight: 10,
  },

  dropBtn: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 6,
  },

  btnText: {
    color: '#fff',
    textAlign: 'center',
  },

  offlineText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#717171ff',
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
