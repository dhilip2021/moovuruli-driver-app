import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native";

export default function LoadingButton({ title, loading, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={loading}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#b30000",
    padding: 15,
    borderRadius: 8,
    marginTop: 25,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});