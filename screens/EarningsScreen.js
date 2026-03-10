import React from "react";
import {View,Text,StyleSheet} from "react-native";

export default function EarningsScreen(){

return(

<View style={styles.container}>

<Text style={styles.title}>Today's Earnings</Text>

<Text style={styles.amount}>₹850</Text>

</View>

)

}

const styles=StyleSheet.create({
container:{flex:1,justifyContent:"center",alignItems:"center"},
title:{fontSize:22},
amount:{fontSize:40,fontWeight:"bold",marginTop:10}
})