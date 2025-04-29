import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Appbar, Checkbox, Text } from "react-native-paper";
import { useRouter } from "expo-router";

export default function TasksScreen() {
  const router = useRouter();

  const [tasks, setTasks] = useState([
    { id: "1", title: "Task 1", completed: false },
    { id: "2", title: "Task 2", completed: false },
    { id: "3", title: "Task 3", completed: true },
    { id: "4", title: "Task 4", completed: false },
  ]);

  const toggleTask = (id: any) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Tasks" />
      </Appbar.Header>

      <View style={styles.content}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Checkbox.Item
              label={item.title}
              status={item.completed ? "checked" : "unchecked"}
              onPress={() => toggleTask(item.id)}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No tasks available</Text>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { backgroundColor:"#fff",flex:1 },
  list: {
    padding: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#888",
  },
});
