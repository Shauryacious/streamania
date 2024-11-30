import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";

export default function UsersScreen() {
  const [users, setUsers] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      let { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .neq("id", user?.id); // Exclude current user

      if (error) {
        console.error("error", error);
        return;
      }
      setUsers(profiles);
    };

    fetchUsers();
  }, []);

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <Text>{item.full_name}</Text>}
    />
  );
}
