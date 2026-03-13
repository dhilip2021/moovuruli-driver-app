import React from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";

export default function AppHeader({
  title,
  onMenuPress,
  online,
  onToggleOnline,
  showSwitch = false
}) {
  return (
    <View style={styles.header}>

      {/* LEFT MENU */}
      <TouchableOpacity onPress={onMenuPress} style={styles.left}>
        <Text style={styles.menu}>☰</Text>
      </TouchableOpacity>

      {/* TITLE */}
      <Text style={styles.title}>{title}</Text>

      {/* RIGHT SIDE */}
      {showSwitch && (
        <View style={styles.right}>
          <Text style={styles.status}>
            {online ? "Online" : "Offline"}
          </Text>

          <Switch
            value={online}
            onValueChange={onToggleOnline}
          />
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  header:{
    height:60,
    backgroundColor:"#fff",
    justifyContent:"center",
    alignItems:"center",
    elevation:4
  },

  left:{
    position:"absolute",
    left:15
  },

  right:{
    position:"absolute",
    right:10,
    flexDirection:"row",
    alignItems:"center"
  },

  menu:{
    fontSize:24
  },

  title:{
    fontSize:18,
    fontWeight:"bold"
  },

  status:{
    marginRight:5
  }

});