import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DashboardScreen from "../screens/DashboardScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator(){

  return(

    <Drawer.Navigator
      screenOptions={{
        headerStyle:{backgroundColor:"#8B0000"},
        headerTintColor:"#fff",
        drawerActiveTintColor:"#8B0000"
      }}
    >

      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
      />

    </Drawer.Navigator>

  )

}