import { PropsWithChildren, useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { useAuth } from "./AuthProvider";
import { supabase } from "@/lib/supabase";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY); // public key

export default function ChatProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const { profile } = useAuth();

  useEffect(() => {
    const connect = async () => {
      if (!profile) return; // Safeguard in case profile is undefined

      const avatarUrl = supabase.storage
        .from("avatars")
        .getPublicUrl(profile.avatar_url);

      if (!avatarUrl.data?.publicUrl) {
        console.error("Error retrieving avatar URL");
        return;
      }

      try {
        await client.connectUser(
          {
            id: profile.id,
            name: profile.full_name,
            image: avatarUrl.data.publicUrl,
          },
          client.devToken(profile.id) // "user_token"
        );
        setIsReady(true);

        // Optionally create and watch a channel
        // const channel = client.channel("messaging", "the_park", { name: "The Park" });
        // await channel.watch();
      } catch (error) {
        console.error("Error connecting user to StreamChat", error);
      }
    };

    connect();

    return () => {
      if (isReady) {
        client.disconnectUser();
      }
      setIsReady(false);
    };
  }, [profile]);

  if (!profile || !isReady) {
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
