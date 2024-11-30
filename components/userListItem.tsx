import { useAuth } from "@/providers/AuthProvider";
import { router } from "expo-router";
import React from "react";
import { View, Text, Pressable } from "react-native";
import { useChatContext } from "stream-chat-expo";

interface User {
  id: string;
  full_name: string;
}

function UserListItem({ user }: { user: User }) {
  const { client } = useChatContext();
  const { user: me } = useAuth();
  const onPress = async () => {
    if (!me) {
      console.error("User is not authenticated");
      return;
    }
    //Start a new chat with this user by creating a new channel
    // with the user's id as the channel id
    const channel = client.channel("messaging", {
      members: [me.id, user.id],
    });
    await channel.watch();
    router.replace(`(home)/channel/${channel.cid}`);
  };

  return (
    <Pressable
      onPress={onPress}
      style={{ padding: 15, backgroundColor: "white" }}
    >
      <Text style={{ fontWeight: "bold" }}>{user.full_name}</Text>
    </Pressable>
  );
}

export default UserListItem;
