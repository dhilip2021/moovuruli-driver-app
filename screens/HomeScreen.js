import React,{useState} from "react";
import {
View,
Text,
Switch,
StyleSheet,
TouchableOpacity,
FlatList,
Modal
} from "react-native";

export default function HomeScreen(){

const [online,setOnline]=useState(false)
const [mode,setMode]=useState(null)
const [tripStarted,setTripStarted]=useState(false)
const [showModePopup,setShowModePopup]=useState(false)

const students=[
{id:"1",name:"Arun",status:"Waiting"},
{id:"2",name:"Karthik",status:"Waiting"},
{id:"3",name:"Priya",status:"Waiting"}
]

const [list,setList]=useState(students)

const pickupStudent=(id)=>{

const updated=list.map((s)=>{
if(s.id===id){
return {...s,status:"Picked"}
}
return s
})

setList(updated)

}

const dropStudent=(id)=>{

const updated=list.map((s)=>{
if(s.id===id){
return {...s,status:"Dropped"}
}
return s
})

setList(updated)

}

return(

<View style={styles.container}>

{/* HEADER */}

<View style={styles.header}>

<Text style={styles.title}>Driver Dashboard</Text>

<View style={styles.row}>
<Text style={styles.status}>{online ? "Online" : "Offline"}</Text>

<Switch
value={online}
onValueChange={(val)=>{
setOnline(val)

if(val){
setShowModePopup(true)
}else{
setMode(null)
setTripStarted(false)
}
}}
/>

</View>

</View>


{/* MODE POPUP */}

<Modal
visible={showModePopup}
transparent
animationType="slide"
>

<View style={styles.popupContainer}>

<View style={styles.popup}>

<Text style={styles.popupTitle}>Select Work Mode</Text>

<TouchableOpacity
style={styles.modeBtn}
onPress={()=>{
setMode("passenger")
setShowModePopup(false)
}}
>

<Text style={styles.btnText}>Passenger Ride</Text>

</TouchableOpacity>

<TouchableOpacity
style={styles.modeBtn}
onPress={()=>{
setMode("school")
setShowModePopup(false)
}}
>

<Text style={styles.btnText}>School Trip</Text>

</TouchableOpacity>

</View>

</View>

</Modal>


{/* PASSENGER MODE */}

{mode==="passenger" && (

<View style={styles.passengerBox}>

<Text style={styles.sectionTitle}>Passenger Mode Active</Text>

<Text>Waiting for ride requests...</Text>

</View>

)}


{/* SCHOOL MODE */}

{mode==="school" && (

<View style={styles.tripBox}>

<Text style={styles.sectionTitle}>
School Trip: {tripStarted ? "Running" : "Not Started"}
</Text>

<TouchableOpacity
style={styles.startBtn}
onPress={()=>setTripStarted(true)}
>

<Text style={styles.btnText}>Start Trip</Text>

</TouchableOpacity>

</View>

)}


{tripStarted && mode==="school" && (

<FlatList
data={list}
keyExtractor={(item)=>item.id}
renderItem={({item})=>(

<View style={styles.studentCard}>

<Text style={styles.name}>{item.name}</Text>

<Text style={styles.studentStatus}>{item.status}</Text>

<View style={styles.btnRow}>

<TouchableOpacity
style={styles.pickBtn}
onPress={()=>pickupStudent(item.id)}
>

<Text style={styles.btnText}>Pickup</Text>

</TouchableOpacity>

<TouchableOpacity
style={styles.dropBtn}
onPress={()=>dropStudent(item.id)}
>

<Text style={styles.btnText}>Drop</Text>

</TouchableOpacity>

</View>

</View>

)}
/>

)}

</View>

)

}

const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f2f2f2"
},

header:{
padding:20,
backgroundColor:"#fff",
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center"
},

title:{
fontSize:20,
fontWeight:"bold"
},

row:{
flexDirection:"row",
alignItems:"center",
gap:10
},

status:{
fontSize:16
},

popupContainer:{
flex:1,
justifyContent:"center",
alignItems:"center",
backgroundColor:"rgba(0,0,0,0.4)"
},

popup:{
backgroundColor:"#fff",
padding:25,
borderRadius:10,
width:"80%"
},

popupTitle:{
fontSize:18,
fontWeight:"bold",
marginBottom:20,
textAlign:"center"
},

modeBtn:{
backgroundColor:"#2e7d32",
padding:12,
borderRadius:6,
marginBottom:10
},

tripBox:{
marginTop:30,
alignItems:"center"
},

passengerBox:{
marginTop:30,
alignItems:"center"
},

sectionTitle:{
fontSize:18,
fontWeight:"bold",
marginBottom:10
},

startBtn:{
backgroundColor:"#2e7d32",
padding:10,
borderRadius:6
},

studentCard:{
backgroundColor:"#fff",
padding:15,
borderRadius:8,
marginTop:15,
marginHorizontal:20
},

name:{
fontSize:18,
fontWeight:"bold"
},

studentStatus:{
marginTop:5
},

btnRow:{
flexDirection:"row",
marginTop:10,
gap:10
},

pickBtn:{
backgroundColor:"#2196f3",
padding:8,
borderRadius:6
},

dropBtn:{
backgroundColor:"#f44336",
padding:8,
borderRadius:6
},

btnText:{
color:"#fff",
textAlign:"center"
}

})