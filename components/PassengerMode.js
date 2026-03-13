import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PassengerMode() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Passenger Mode Active</Text>
      <Text>Waiting for ride requests...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 100,
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  }
});