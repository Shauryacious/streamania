import { PropsWithChildren, useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { Slot, Stack } from "expo-router";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { useAuth } from "./AuthProvider";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY); //public key

export default function ChatProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const { profile } = useAuth();

  if (!profile) {
    return null;
  }

  useEffect(() => {
    const conect = async () => {
      await client.connectUser(
        {
          id: profile.id,
          name: profile.full_name,
          image: "https://i.imgur.com/fR9Jz14.png",
        },
        client.devToken(profile.id) // "user_token"
      );
      setIsReady(true);

      // // CREATE A CHANNEL
      // const channel = client.channel("messaging", "the_park", {
      //   //channel type, channel id
      //   name: "The Park",
      // });
      // await channel.watch();
    };

    conect();

    return () => {
      if (isReady) {
        client.disconnectUser();
      }
      setIsReady(false);
    };
  }, [profile.id]);

  if (!isReady) {
    return (
      <View style={styles.ActivityLoaderContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
}

const styles = StyleSheet.create({
  ActivityLoaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
