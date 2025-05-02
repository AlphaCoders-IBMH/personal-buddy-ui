import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  Text,
  Checkbox,
  Button,
  FAB,
  Divider,
  Card,
  List,
} from "react-native-paper";

const tasks = [
  "Write project report",
  "Fix login issue",
  "Review pull request",
  "Update documentation",
  "Call with client",
];

export default function TasksComponent({ navigation }: any) {
  const [checkedTasks, setCheckedTasks] = React.useState<Number[]>([]);

  const toggleTask = (index: Number) => {
    setCheckedTasks((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text variant="titleMedium" style={{ marginTop: 16 }}>
        Today's Tasks
      </Text>
      <View style={{ padding:5 }}>
        {tasks.map((task, idx) => (
          <List.Item
            key={idx}
            title={task}
            titleStyle={
              checkedTasks.includes(idx)
                ? styles.itemComplete
                : styles.itemIncomplete
            }
            left={() => (
              <Checkbox
                status={checkedTasks.includes(idx) ? "checked" : "unchecked"}
                onPress={() => toggleTask(idx)}
              />
            )}
          />
        ))}
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button onPress={() => setCheckedTasks(tasks.map((_, i) => i))}>
          Mark all as done
        </Button>
        {/* <Button mode="outlined">Snooze task</Button> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  itemComplete: {
    color: "#ccc",
  },
  itemIncomplete: {
    color: "#000",
  },
});
