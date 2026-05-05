import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useResponsive } from "../../../hooks/useResponsive";

export default function Menu_Admin() {
  const insets = useSafeAreaInsets();
  const { isSmallPhone, compactLabelSize } = useResponsive();
  const tabBarHeight = (isSmallPhone ? 66 : 70) + Math.max(insets.bottom, 8);
  const iconSize = isSmallPhone ? 22 : 24;
  const labelWidth = isSmallPhone ? 56 : 64;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: tabBarHeight,
          paddingBottom: Math.max(insets.bottom, 8),
          paddingTop: 6,
          backgroundColor: "white",
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 2,
        },
        sceneStyle: {
          backgroundColor: "#f5f6fa",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={focused ? "#59008c" : "gray"}
                size={iconSize}
              />
              <Text
                numberOfLines={2}
                style={{
                  color: focused ? "#59008c" : "gray",
                  fontSize: compactLabelSize,
                  marginTop: 4,
                  width: labelWidth,
                  textAlign: "center",
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="pagos"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Ionicons
                name={focused ? "cash" : "cash-outline"}
                color={focused ? "#59008c" : "gray"}
                size={iconSize}
              />
              <Text
                numberOfLines={2}
                style={{
                  color: focused ? "#59008c" : "gray",
                  marginTop: 4,
                  fontSize: compactLabelSize,
                  width: labelWidth,
                  textAlign: "center",
                }}
              >
                Pagos
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="crearTandas"
        options={{
          tabBarIcon: () => (
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: -10 }}>
              <View
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 29,
                  backgroundColor: "#59008c",
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 6,
                }}
              >
                <Ionicons name="add" size={isSmallPhone ? 28 : 30} color="white" />
              </View>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="reportes"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Ionicons
                name={focused ? "bar-chart" : "bar-chart-outline"}
                color={focused ? "#59008c" : "gray"}
                size={iconSize}
              />
              <Text
                numberOfLines={2}
                style={{
                  color: focused ? "#59008c" : "gray",
                  marginTop: 4,
                  fontSize: compactLabelSize,
                  width: labelWidth,
                  textAlign: "center",
                }}
              >
                Reporte
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="configuracion"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Ionicons
                name={focused ? "person-circle" : "person-circle-outline"}
                color={focused ? "#59008c" : "gray"}
                size={iconSize}
              />
              <Text
                numberOfLines={2}
                style={{
                  color: focused ? "#59008c" : "gray",
                  marginTop: 4,
                  fontSize: compactLabelSize,
                  width: labelWidth,
                  textAlign: "center",
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
