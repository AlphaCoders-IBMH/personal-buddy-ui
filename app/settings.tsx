import React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Divider, List, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import Storage from "@/storage";

export default function SettingsScreen() {
  const router = useRouter();

  const handleLogout =async()=>{
    await Storage.clearAll()
    router.push("/")
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Settings" />
      </Appbar.Header>

      <View style={styles.content}>
        <List.Item
          title={"Signout"}
          onPress={handleLogout}
          left={() => <List.Icon icon="logout" />}
        />
      </View>
      <Divider/>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, backgroundColor: "#fff",padding:16 },
});
