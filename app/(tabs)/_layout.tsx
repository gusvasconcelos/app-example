import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome } from "@expo/vector-icons";
import { AuthGuard } from "@/components/AuthGuard";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthGuard>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="produtos"
          options={{
            title: "Produtos",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="list" size={28} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="entradas"
          options={{
            title: "Entradas",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="truck" size={28} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="saidas"
          options={{
            title: "Saídas",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="shopping-cart" size={28} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="relatorios"
          options={{
            title: "Relatórios",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="bar-chart" size={28} color={color} />
            ),
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}
