/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { biometricLogin } from '../utils/biometricAuth';
import { getToken } from '../utils/secureStorage';
import { loginUser } from '../api/authService';
import LoadingButton from '../components/LoadingButton';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveToken } from '../utils/secureStorage';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('driver@gmail.com');
  const [password, setPassword] = useState('password123');
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const handleBiometric = async () => {
    const enabled = await AsyncStorage.getItem('biometric_enabled');

    if (enabled !== 'true') {
      Alert.alert('Fingerprint not enabled', 'Please login normally first.');
      return;
    }

    const success = await biometricLogin();

    if (success) {
      const token = await getToken();

      if (token) {
        login(token);
      } else {
        Alert.alert('Error', 'Token not found');
      }
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation', 'Email & Password required');
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(email, password);

      if (data.token) {
        const enabled = await AsyncStorage.getItem('biometric_enabled');

        // 🔥 already enabled → direct login
        if (enabled === 'true') {
          login(data.token);
          return;
        }

        // 🔥 first time ask user
        Alert.alert(
          'Enable Fingerprint Login',
          'Do you want to enable fingerprint login?',
          [
            {
              text: 'No',
              onPress: async () => {
                login(data.token);
              },
            },
            {
              text: 'Yes',
              onPress: async () => {
                await saveToken(data.token);
                await AsyncStorage.setItem('biometric_enabled', 'true');

                login(data.token);
              },
            },
          ],
        );
      }
    } catch (error) {
      Alert.alert('Login Failed', error.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     const checkLogin = async () => {
  //       const token = await getToken();
  //       if (token) navigation.replace('Dashboard');
  //     };

  //     checkLogin();
  //   }, [navigation]),
  // );

  // useEffect(() => {
  //   AsyncStorage.getItem('biometric_enabled').then(v =>
  //     setBiometricEnabled(v === 'true'),
  //   );
  // }, []);

  useEffect(() => {
    const checkBiometric = async () => {
      const enabled = await AsyncStorage.getItem('biometric_enabled');

      if (enabled === 'true') {
        handleBiometric();
      }
    };

    checkBiometric();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Access your secure dashboard</Text>

        <Text style={styles.label}>
          Email Address <Text style={styles.star}>*</Text>
        </Text>

        <TextInput
          placeholder="e.g., staff@tce.edu"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>
          Password <Text style={styles.star}>*</Text>
        </Text>

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="••••••••"
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secure}
          />
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Text style={{ fontSize: 18 }}>{secure ? '👁️' : '🙈'}</Text>
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity> */}
        <LoadingButton
          title="Sign In"
          loading={loading}
          onPress={handleLogin}
        />
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.or}>OR</Text>
          <View style={styles.line} />
        </View>
        <TouchableOpacity
          // disabled={!biometricEnabled}
          // style={[
          //   styles.fingerprintWrapper,
          //   !biometricEnabled && { opacity: 0.4 },
          // ]}
          style={[styles.fingerprintWrapper]}
          activeOpacity={0.85}
          onPress={handleBiometric}
        >
          <LinearGradient
            colors={['#5f2c82', '#49a09d']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fingerprintButton}
          >
            <View style={styles.iconCircle}>
              <Icon name="fingerprint" size={26} color="#5f2c82" />
            </View>

            <Text style={styles.fingerprintText}>Login with Fingerprint</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Not a member? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signup}>Signup</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          © 2026 TCE CSBS Department. All rights reserved.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B0000',
  },
  subtitle: {
    marginBottom: 20,
    color: '#555',
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: '600',
  },
  star: {
    color: 'red',
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
  },
  button: {
    backgroundColor: '#b30000',
    padding: 15,
    borderRadius: 8,
    marginTop: 25,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgot: {
    color: '#b30000',
    textAlign: 'right',
    marginTop: 15,
  },

  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  signupText: {
    color: '#333',
  },

  signup: {
    color: '#b30000',
    fontWeight: 'bold',
  },

  footer: {
    textAlign: 'center',
    marginTop: 25,
    fontSize: 12,
    color: '#888',
  },
  fingerprintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A6CF7',
    padding: 14,
    borderRadius: 10,
    marginTop: 15,
    elevation: 3,
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },

  or: {
    marginHorizontal: 10,
    color: '#888',
  },
  fingerprintWrapper: {
    marginTop: 20,
    borderRadius: 14,
    elevation: 6,
  },

  iconCircle: {
    backgroundColor: '#fff',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  fingerprintText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
