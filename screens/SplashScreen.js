/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { getToken } from '../utils/secureStorage';

export default function SplashScreen() {
  const { login, stopLoading } = useContext(AuthContext);

  useEffect(() => {
    const checkLogin = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const token = await getToken();

      if (token) {
        login(token);
      } else {
        stopLoading();
      }
    };

    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Testing Devices</Text>
      <ActivityIndicator size="large" color="#8B0000" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B0000',
    marginBottom: 20,
  },

  text: {
    marginTop: 10,
    color: '#555',
  },
});
