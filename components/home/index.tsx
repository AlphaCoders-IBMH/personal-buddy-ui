import Storage from "@/storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Text,
  Button,
  FAB,
  ActivityIndicator,
  Appbar,
  Avatar,
} from "react-native-paper";
import axios from "axios";

export default function HomeComponent({ navigation }: any) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  let token: any = null;

  useEffect(() => {
    const checkToken = async () => {
      token = await Storage.getItem("accessToken");
      const userString = await Storage.getItem("user");
      if (userString) {
        setUser(JSON.parse(userString));
      } else {
        setUser(null);
      }
      console.log(user);
      if (token) {
        if (user == null) {
          getUserData(token);
        }
      } else {
        await Storage.clearAll();
        router.push("/");
      }
    };
    checkToken();
  }, []);

  const getUserData = async (token: any) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status == 200) {
        await Storage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
      } else {
        Storage.clearAll();
        router.push("/");
      }
    } catch (error) {
      Storage.clearAll();
      router.push("/");
    }
  };

  return (
    <View style={styles.container}>
      {user !== null ? (
        <>
          <Appbar.Header style={styles.header}>
            <Appbar.Content title="Personal Buddy" />
            {/* <Avatar.Image size={24} source={user ? user.picture : null} /> */}
            <Avatar.Text size={32} label={user.name[0]} />
          </Appbar.Header>
          <View style={styles.content}>
            <Text variant="headlineSmall" style={styles.title}>
              Good Morning <span style={{ fontWeight: "bold" }}>{user.name}</span> !
            </Text>
            <Text variant="bodyLarge">Here's your Summary - </Text>

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
        </>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: { padding: 10, borderBottomColor: "#ccc", borderBottomWidth: 1 },
  title: { marginBottom: 20 },
  desc: { marginBottom: 20 },
  content: {
    flex: 1,
    paddingTop: 40,
    paddingLeft:10,
    paddingRight:10
  },
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
