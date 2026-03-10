import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import {
  setBiometricEnabled,
  getBiometricEnabled,
} from '../utils/biometricSettings';

export default function DashboardScreen() {
  const { logout } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [biometric, setBiometric] = useState(false);

  useEffect(() => {
    const loadSetting = async () => {
      const enabled = await getBiometricEnabled();
      setBiometric(enabled);
    };

    loadSetting();
  }, []);

  const toggleBiometric = async value => {
    setBiometric(value);
    await setBiometricEnabled(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* <Text style={styles.title}>Dashboard</Text> */}

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuOpen(!menuOpen)}
        >
          <Text style={styles.menu}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Card */}
      {menuOpen && (
        <View style={styles.menuCard}>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>🔐 Enable Biometric Login</Text>

            <Switch value={biometric} onValueChange={toggleBiometric} />
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>🚪 Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Welcome 👋</Text>

          <Text style={styles.welcomeText}>You are successfully logged in</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#8B0000',
  },

  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  menuButton: {
    padding: 8,
  },

  menu: {
    color: '#fff',
    fontSize: 24,
  },

  menuCard: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },

  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },

  menuText: {
    fontSize: 16,
    color: '#333',
  },

  logoutButton: {
    marginTop: 10,
    backgroundColor: '#8B0000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  welcomeCard: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
  },

  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
});
