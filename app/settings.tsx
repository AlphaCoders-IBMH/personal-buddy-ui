import React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Divider, List, Text } from "react-native-paper";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Settings" />
      </Appbar.Header>

      <View style={styles.content}>
        <List.Item
          title={"Signout"}
          onPress={() => router.push({ pathname: "/" })}
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
