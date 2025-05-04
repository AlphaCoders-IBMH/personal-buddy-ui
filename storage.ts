import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Storage = {
  setItem: async (key: any, value: any) => {
    if (Platform.OS === "web") {
      await AsyncStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },
  getItem: async (key: any) => {
    if (Platform.OS === "web") {
      return await AsyncStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  },
  deleteItem: async (key: any) => {
    if (Platform.OS === "web") {
      await AsyncStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  },

  clearAll: async () => {
    if (Platform.OS === "web") {
      await AsyncStorage.clear();
    } else {
      const keys = await SecureStore.getAllKeysAsync();
      for (const key of keys) {
        await SecureStore.deleteItemAsync(key);
      }
    }
  },
};

export default Storage;
