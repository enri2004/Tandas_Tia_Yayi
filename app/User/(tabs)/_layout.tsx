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

export default function TabLayout() {
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
        name="tandas"
        options={{
          title: "Tandas",
          tabBarIcon: ({ color, focused }) => (
            <TabItem
              color={color}
              label="Tandas"
              fontSize={labelSize}
              icon={
                <Ionicons
                  name={focused ? "layers" : "layers-outline"}
                  color={color}
                  size={iconSize}
                />
              }
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
              icon={<Ionicons name={focused ? "card" : "card-outline"} color={color} size={iconSize} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Solicitudes",
          tabBarIcon: ({ color, focused }) => (
            <TabItem
              color={color}
              label="Solicitudes"
              fontSize={labelSize}
              icon={
                <Ionicons
                  name={focused ? "mail-unread" : "mail-unread-outline"}
                  color={color}
                  size={iconSize}
                />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Confi"
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
