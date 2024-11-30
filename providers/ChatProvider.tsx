import { PropsWithChildren, useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { Slot, Stack } from "expo-router";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY); //public key

export default function ChatProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const conect = async () => {
      await client.connectUser(
        {
          id: "jlahey",
          name: "Jim Lahey",
          image: "https://i.imgur.com/fR9Jz14.png",
        },
        client.devToken("jlahey") // "user_token"
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
      client.disconnectUser();
      setIsReady(false);
    };
  }, []);

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
