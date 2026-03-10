import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

export default function SignupScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secure1, setSecure1] = useState(true);
  const [secure2, setSecure2] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
 <ScrollView showsVerticalScrollIndicator={false}>
<View style={styles.card}>

        <Text style={styles.title}>Signup</Text>
        <Text style={styles.subtitle}>
          Create your account
        </Text>

        {/* Full Name */}
        <Text style={styles.label}>
          Full Name <Text style={styles.star}>*</Text>
        </Text>
        <TextInput
          placeholder="Enter your full name"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />

        {/* Email */}
        <Text style={styles.label}>
          Email <Text style={styles.star}>*</Text>
        </Text>
        <TextInput
          placeholder="staff@tce.edu"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password */}
        <Text style={styles.label}>
          Password <Text style={styles.star}>*</Text>
        </Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secure1}
          />
          <TouchableOpacity onPress={() => setSecure1(!secure1)}>
            <Text style={styles.eye}>
              {secure1 ? '👁️' : '🙈'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <Text style={styles.label}>
          Confirm Password <Text style={styles.star}>*</Text>
        </Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Confirm Password"
            style={styles.passwordInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={secure2}
          />
          <TouchableOpacity onPress={() => setSecure2(!secure2)}>
            <Text style={styles.eye}>
              {secure2 ? '👁️' : '🙈'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Send OTP Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>
            Already have account? 
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.login}> Login</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          © 2026 TCE CSBS Department. All rights reserved.
        </Text>

      </View>
</ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
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
  eye: {
    fontSize: 18,
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#333',
  },
  login: {
    color: '#b30000',
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    marginTop: 25,
    fontSize: 12,
    color: '#888',
  },
});