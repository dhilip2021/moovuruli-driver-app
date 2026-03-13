import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native";

export default function SchoolMode({
  tripStarted,
  setTripStarted,
  list,
  pickupStudent,
  dropStudent
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        School Trip: {tripStarted ? "Running" : "Not Started"}
      </Text>

      {!tripStarted && (
        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => setTripStarted(true)}
        >
          <Text style={styles.btnText}>Start Trip</Text>
        </TouchableOpacity>
      )}

      {tripStarted && (
        <FlatList
          data={list}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.studentCard}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.status}</Text>

              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.pickBtn}
                  onPress={() => pickupStudent(item.id)}
                >
                  <Text style={styles.btnText}>Pickup</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.dropBtn}
                  onPress={() => dropStudent(item.id)}
                >
                  <Text style={styles.btnText}>Drop</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 100,
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },

  startBtn: {
    backgroundColor: "#2e7d32",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10
  },

  studentCard: {
    backgroundColor: "#f4f4f4",
    padding: 10,
    borderRadius: 8,
    marginTop: 10
  },

  name: {
    fontSize: 16,
    fontWeight: "bold"
  },

  row: {
    flexDirection: "row",
    marginTop: 5
  },

  pickBtn: {
    backgroundColor: "#2196f3",
    padding: 8,
    borderRadius: 6,
    marginRight: 10
  },

  dropBtn: {
    backgroundColor: "#f44336",
    padding: 8,
    borderRadius: 6
  },

  btnText: {
    color: "#fff"
  }
});