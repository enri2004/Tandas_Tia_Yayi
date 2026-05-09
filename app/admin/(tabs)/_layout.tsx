import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabItemProps = {
  color: string;
  icon: React.ReactNode;
  label: string;
  fontSize: number;
};

function TabItem({ color, icon, label, fontSize }: TabItemProps) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        minWidth: 54,
      }}
    >
      {icon}
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={{
          color,
          fontSize,
          marginTop: 2,
          textAlign: "center",
        }}
      >
        {label}
      </Text>
    </View>
  );
}

export default function Menu_Admin() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isSmall = width < 380;
  const tabHeight = (isSmall ? 78 : 72) + insets.bottom;
  const iconSize = isSmall ? 22 : 24;
  const labelSize = isSmall ? 10 : 12;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#59008c",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: tabHeight,
          paddingTop: 6,
          paddingBottom: Math.max(insets.bottom, 8),
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
        },
        tabBarItemStyle: {
          flex: 1,
          height: tabHeight - insets.bottom,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 4,
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
        sceneStyle: {
          backgroundColor: "#f5f6fa",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabItem
              color={color}
              label="Home"
              fontSize={labelSize}
              icon={<Ionicons name={focused ? "home" : "home-outline"} color={color} size={iconSize} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="pagos"
        options={{
          title: "Pagos",
          tabBarIcon: ({ color, focused }) => (
            <TabItem
              color={color}
              label="Pagos"
              fontSize={labelSize}
              icon={<Ionicons name={focused ? "cash" : "cash-outline"} color={color} size={iconSize} />}
            />
          ),
        }}
      />
     <Tabs.Screen
  name="crearTandas"
  options={{
    title: "Crear",
    tabBarIcon: ({ focused }) => (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: -50,
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 50,
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
          <Ionicons
            name="add"
            color="white"
            size={40}
          />
        </View>
      </View>
    ),
  }}
/>
      <Tabs.Screen
        name="reportes"
        options={{
          title: "Reporte",
          tabBarIcon: ({ color, focused }) => (
            <TabItem
              color={color}
              label="Reporte"
              fontSize={labelSize}
              icon={
                <Ionicons
                  name={focused ? "bar-chart" : "bar-chart-outline"}
                  color={color}
                  size={iconSize}
                />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="configuracion"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <TabItem
              color={color}
              label="Perfil"
              fontSize={labelSize}
              icon={
                <Ionicons
                  name={focused ? "person-circle" : "person-circle-outline"}
                  color={color}
                  size={iconSize}
                />
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}
