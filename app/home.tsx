import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, FAB } from "react-native-paper";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Welcome Home
      </Text>

      <Button
        mode="outlined"
        icon="chevron-right"
        contentStyle={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
        }}
        style={styles.button}
        onPress={() => router.push("/tasks")}
      >
        Tasks
      </Button>

      <Button
        mode="outlined"
        icon="chevron-right"
        contentStyle={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
        }}
        style={styles.button}
        onPress={() => router.push("/upcoming")}
      >
        Upcoming Releases
      </Button>

      <FAB
        icon="cog-outline"
        style={styles.fab}
        onPress={() => router.push("/settings")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: { marginBottom: 40 },
  button: {
    marginVertical: 10,
    width: "100%",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
