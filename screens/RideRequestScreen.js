import React from "react";
import {View,Text,Button,StyleSheet} from "react-native";

export default function RideRequestScreen(){

return(

<View style={styles.container}>

<Text style={styles.title}>New Ride Request</Text>

<Text>Pickup: Bus Stand</Text>
<Text>Drop: Railway Station</Text>
<Text>Distance: 3 km</Text>

<View style={styles.buttons}>

<Button title="Accept" />

<Button title="Reject" color="red"/>

</View>

</View>

)

}

const styles=StyleSheet.create({
container:{flex:1,justifyContent:"center",alignItems:"center"},
title:{fontSize:22,fontWeight:"bold"},
buttons:{flexDirection:"row",gap:20,marginTop:20}
})