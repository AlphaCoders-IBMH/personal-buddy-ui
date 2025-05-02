import React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { useRouter } from "expo-router";
import TasksComponent from "@/components/tasks";

export default function TasksScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Tasks" />
      </Appbar.Header>
      <View style={styles.content}>
        <TasksComponent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { backgroundColor: "#fff", flex: 1 },
});
