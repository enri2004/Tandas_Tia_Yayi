import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//import { useColorScheme } from '@/hooks/use-color-scheme';

const {width, height} = Dimensions.get("window")


export default function TabLayout() {
  //const colorScheme = useColorScheme();

  return (
    
   <Tabs screenOptions={{
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
}}>
    <Tabs.Screen
    name="index"
    options={{
      headerShown: false,
      tabBarIcon:({focused})=>(
        <View style={{
          alignItems:"center",
          justifyContent:"center",
        }}>
          <Ionicons
          name={focused ? "home":"home-outline"}
          color={focused ? "#59008c":"gray"}
          size={24}
          />
          <Text
          style={
            {
              color: focused ? "#59008c":"gray",
              fontSize:12,
              marginTop:4,
            }
          }
          >
            Home
          </Text>
        </View>
  ),
    }}
    />

    <Tabs.Screen
    name='tandas'
    options={{
headerShown: false,
      tabBarIcon:({focused})=>(
      <View
      style={{
      alignItems:"center",
      justifyContent:"center",
      }}>
        <Ionicons
        name={focused ? "layers":"layers-outline"}
        color={focused ? "#59008c":"gray"}
        size={24}
        />
        <Text
        style={{
          color: focused ? "#59008c" : "gray",
          fontSize:12,
          marginTop:4,
        }}
        >
          Tandas
        </Text>
      </View>),
      }}
    />
     
    <Tabs.Screen
    name='pagos'
    options={{
      headerShown: false,
    tabBarIcon:({focused})=>(
      <View
      style={{
        alignContent:"center",
        justifyContent:"center",
      }}
      >
      <Ionicons
      name={ focused ? "card":"card-outline"}
      color={ focused ? "#59008c":"gray"}
      size={24}
        />

        <Text
        style={{
          color: focused ? "#59008c":"gray",
          fontSize:12,
          marginTop:4
        }}
        >
          Pagos
        </Text>
      </View>),
    }}
    />
      <Tabs.Screen
    name='chat'
    options={
      {
        tabBarIcon:({focused})=>(
          <View
          style={{
        alignItems:"center",
        justifyContent:"center",
      }}
          >
            <Ionicons 
            name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
            color={focused ? "#59008c": "gray"}
            size={24}
            />

            <Text
            style={{
              color: focused ? "#59008c": "gray",
              fontSize:12,
              marginTop:4
            }}
            >
            Chat
            </Text>
          </View>
        )
      }
    }
    
    
    />


    <Tabs.Screen
    name='Confi'
    options={
      {
        tabBarIcon:({focused})=>(
          <View
          style={{
        alignContent:"center",
        justifyContent:"center",
      }}
          >
            <Ionicons 
            name={focused ? "person-circle":"person-circle-outline"}
            color={focused ? "#59008c": "gray"}
            size={24}
            />

            <Text
            style={{
              color: focused ? "#59008c": "gray",
              fontSize:12,
              marginTop:4
            }}
            >
            Perfil
            </Text>
          </View>
        )
      }
    }
    
    
    />
  





   </Tabs> 
  );
}
