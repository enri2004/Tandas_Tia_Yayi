import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { View, Text } from "react-native";


export default function Menu_Admin(){
    return(
            <Tabs
           screenOptions={{
headerShown:false,
tabBarShowLabel:false,

tabBarStyle:{
position:"absolute",
bottom:0,
height:72,
backgroundColor:"white",
borderRadius:16,
paddingBottom:10,
paddingTop:10
},

tabBarItemStyle:{
flex:1,
justifyContent:"center",
alignItems:"center"
}
}}
            >
                <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon:({focused})=>(
                        <View
                        style={{
                            flex:1,
                            flexDirection:"column",
                            justifyContent:"center",
                            alignItems:"center"
                        }
                        }
                        >
                           <Ionicons
                           name={focused ? "home":"home-outline"}
                           color={focused ? "#59008c":"gray"}
                           size={24}
                           />
                           <Text
                           style={{
                            color: focused ? "#59008c":"gray",
                            fontSize:12,
                            marginTop:4
                                                   }}
                           >
                            Home
                           </Text>
                           
                        </View>
                    )
                }}
                />

           

  <Tabs.Screen
                name="pagos"
                options={{
                tabBarIcon:({focused})=>(
                    <View style={{
                        flex:1,
                        justifyContent:"center",
                        alignItems:"center"
                    }}>
                        <Ionicons
                        name={focused ?"cash":"cash-outline"}
                        color={focused ?"#59008c":"gray"}
                        size={24}
                        />
                        <Text
                        style={{
                        color: focused ? "#59008c":"gray",
                        marginTop:4,
                        fontSize:12
                    }}
                        >
                            Pagos
                        </Text>
                    </View>
                )
                
                }}/>


     <Tabs.Screen
                name="crearTandas"
                options={{
                tabBarIcon:({focused})=>(
                    <View style={{
                        flex:1,
                        justifyContent:"center",
                        alignItems:"center"
                    }}>
                    <View style={{
                        top:-25,
                        justifyContent:"center",
                        alignItems:"center"
                    }}>

                    <View style={{
                        width:60,
                        height:60,
                        borderRadius:30,
                        backgroundColor:"#59008c",

                        justifyContent:"center",
                        alignItems:"center",

                        shadowColor:"#000",
                        shadowOffset:{width:0,height:4},
                        shadowOpacity:0.3,
                        shadowRadius:4,
                        elevation:6
                    }}>

                    <Ionicons
                    name="add"
                    size={30}
                    color="white"
                    />

                    </View>

                    </View> 
                    </View>
                )
                
                }}/>



                  <Tabs.Screen
                name="reportes"
                options={{
                tabBarIcon:({focused})=>(
                    <View style={{
                        flex:1,
                        justifyContent:"center",
                        alignItems:"center"
                    }}>
                        <Ionicons
                        name={focused ?"bar-chart":"bar-chart-outline"}
                        color={focused ?"#59008c":"gray"}
                        size={24}
                        />
                        <Text
                        style={{
                        color: focused ? "#59008c":"gray",
                        marginTop:4,
                        fontSize:12
                    }}
                        >
                            Reporte
                                                    </Text>
                    </View>
                )
                
                }}/>
                  <Tabs.Screen
                name="configuracion"
                options={{
                tabBarIcon:({focused})=>(
                    <View style={{
                        flex:1,
                        justifyContent:"center",
                        alignItems:"center"
                    }}>
                        <Ionicons
                        name={focused ?"person-circle":"person-circle-outline"}
                        color={focused ?"#59008c":"gray"}
                        size={24}
                        />
                        <Text
                        style={{
                        color: focused ? "#59008c":"gray",
                        marginTop:4,
                        fontSize:12
                    }}
                        >
                           Perfil
                        </Text>
                    </View>
                )
                
                }}/>

            </Tabs>
    )
}


