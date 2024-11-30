import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { user } = useAuth();

  //   console.log(user);

  if (user) {
    return <Redirect href="/(home)" />;
  }
  return <Stack />;
}
