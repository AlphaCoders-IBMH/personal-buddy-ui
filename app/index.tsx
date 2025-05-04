import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { LoginComponent } from "@/components/auth/LoginComponent";

export default function Index() {
  const router = useRouter();
  return (
    <LoginComponent/>
    
  );
}

const styles = StyleSheet.create({
  title: { marginBottom: 40 },
  button: {
    marginVertical: 10,
  }
});
