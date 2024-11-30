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
import { router } from "expo-router";

export default function MainTabSceen() {
  const [channel, setChannel] = useState();

  return (
    <>
      <ThemedView>
        <ThemedText style={styles.title}>Chats</ThemedText>
      </ThemedView>
      <ChannelList
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
