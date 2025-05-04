import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import Storage from "@/storage";

WebBrowser.maybeCompleteAuthSession();

export const LoginComponent = () => {
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "420316459798-o0oqhhdavpv1acjdtvik8dnclht0qfko.apps.googleusercontent.com",
    androidClientId:
      "420316459798-geiccdmd8uhghmftn5j3isofdjisikjp.apps.googleusercontent.com",
    // This is the Client ID from Google Cloud Console
    scopes: [
      "https://www.googleapis.com/auth/gmail.readonly",
      "profile",
      "email",
    ],
    redirectUri: makeRedirectUri({
      useProxy: Platform.select({
        web: false,
        default: true, // true for Expo Go (iOS/Android)
      }),
    }),
  });

  useEffect(() => {
    const checkToken = async () => {
      const token = await Storage.getItem("accessToken");
      if (token) {
        router.push("/home");
      }
    };
    checkToken();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      if (authentication?.accessToken) {
        saveUser(authentication);
      }
    }
  }, [response]);

  const saveUser = async (authData: any) => {
    await Storage.setItem("accessToken", authData.accessToken);
    router.push("/home");
  };

  const handleLogin = () => {
    promptAsync().catch((err) => console.error("Login error:", err));
  };

  return (
    <View
      style={{
        backgroundColor:"#fff",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding:30
      }}
    >
      <Text variant="headlineMedium" style={styles.title}>
        Welcome to
      </Text>
      <Text variant="headlineMedium" style={styles.title}>
        Personal Buddy
      </Text>
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleLogin}
      >
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { marginBottom: 20 ,
    textAlign:'center'
  },
  button: {
    marginVertical: 10,
  },
});
