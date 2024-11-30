import React from "react";
import { View, Text } from "react-native";

function UserListItem({ user }) {
  return (
    <View style={{ padding: 15, backgroundColor: "white" }}>
      <Text style={{ fontWeight: "bold" }}>{user.full_name}</Text>
    </View>
  );
}

export default UserListItem;
