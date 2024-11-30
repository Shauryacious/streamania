import { Redirect } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

function Home() {
  return <Redirect href="/(home)/(tabs)" />;
}

export default Home;
