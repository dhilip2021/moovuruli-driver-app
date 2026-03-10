import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>

        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>

        {/* Logo */}
        {/* <Image
          source={require('../assets/logo.png')} // 🔥 replace with your logo path
          style={styles.logo}
          resizeMode="contain"
        /> */}

        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter your email to receive OTP
        </Text>

        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>

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
    borderRadius: 15,
    elevation: 6,
  },
  back: {
    color: '#333',
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#8B0000',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#b30000',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    textAlign: 'center',
    marginTop: 25,
    fontSize: 12,
    color: '#888',
  },
});