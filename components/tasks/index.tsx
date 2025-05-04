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

export default function TasksComponent({ data = [] }) {
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
      <View style={{ padding: 5 }}>
        {data.length > 0 ? (
          data.map((taskItem: any, idx) => (
            <List.Item
              key={idx}
              title={() => (
                <Text
                  style={
                    checkedTasks.includes(idx)
                      ? styles.itemComplete
                      : styles.itemIncomplete
                  }
                >
                  {taskItem.title}
                </Text>
              )}
              left={() => (
                <Checkbox
                  status={checkedTasks.includes(idx) ? "checked" : "unchecked"}
                  onPress={() => toggleTask(idx)}
                />
              )}
            />
          ))
        ) : (
          <Text>Relax! While we compile your tasks for the day.</Text>
        )}
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
    flexWrap: "wrap",
    color: "#ccc",
  },
  itemIncomplete: {
    flexWrap: "wrap",
    color: "#000",
  },
});
