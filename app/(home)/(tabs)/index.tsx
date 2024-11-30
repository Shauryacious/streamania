import { Image, StyleSheet, Platform, View, Text } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  Channel,
  ChannelList,
  Message,
  MessageInput,
  MessageList,
} from "stream-chat-expo";
import { useState } from "react";
import { Link, router, Stack } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function MainTabSceen() {
  const { user } = useAuth();

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link href={"/(home)/users"} asChild>
              <FontAwesome5
                name="user-plus"
                size={24}
                color="grey"
                style={{ marginHorizontal: 16 }}
              />
            </Link>
          ),
        }}
      />
      <ChannelList
        filters={{ members: { $in: [user?.id] } }}
        onSelect={(channel) => {
          router.push(`/channel/${channel.cid}`);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
