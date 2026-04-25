import { Tabs } from "expo-router";
import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useResponsive } from "../../../hooks/useResponsive";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { isSmallPhone, compactLabelSize } = useResponsive();
  const tabBarHeight = 60 + Math.max(insets.bottom, 10);
  const iconSize = isSmallPhone ? 22 : 24;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: tabBarHeight,
          paddingBottom: Math.max(insets.bottom, 10),
          paddingTop: 8,
          backgroundColor: "white",
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        sceneStyle: {
          paddingBottom: Math.max(insets.bottom, 8),
          backgroundColor: "#f5f6fa",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={focused ? "#59008c" : "gray"}
                size={iconSize}
              />
              <Text
                style={{
                  color: focused ? "#59008c" : "gray",
                  fontSize: compactLabelSize,
                  marginTop: 4,
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="tandas"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons
                name={focused ? "layers" : "layers-outline"}
                color={focused ? "#59008c" : "gray"}
                size={iconSize}
              />
              <Text
                style={{
                  color: focused ? "#59008c" : "gray",
                  fontSize: compactLabelSize,
                  marginTop: 4,
                }}
              >
                Tandas
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="pagos"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons
                name={focused ? "card" : "card-outline"}
                color={focused ? "#59008c" : "gray"}
                size={iconSize}
              />
              <Text
                style={{
                  color: focused ? "#59008c" : "gray",
                  fontSize: compactLabelSize,
                  marginTop: 4,
                }}
              >
                Pagos
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons
                name={focused ? "mail-unread" : "mail-unread-outline"}
                color={focused ? "#59008c" : "gray"}
                size={iconSize}
              />
              <Text
                style={{
                  color: focused ? "#59008c" : "gray",
                  fontSize: compactLabelSize,
                  marginTop: 4,
                }}
              >
                Solicitudes
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="Confi"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons
                name={focused ? "person-circle" : "person-circle-outline"}
                color={focused ? "#59008c" : "gray"}
                size={iconSize}
              />
              <Text
                style={{
                  color: focused ? "#59008c" : "gray",
                  fontSize: compactLabelSize,
                  marginTop: 4,
                }}
              >
                Perfil
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
