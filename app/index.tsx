import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import App from "../App";

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text variant="headlineMedium" style={styles.title}>
        Welcome to Personal Buddy
      </Text>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => router.push("/home")}
      >
        Login
      </Button>
      <App/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  title: { marginBottom: 40 },
  button: {
    marginVertical: 10,
  }
});
