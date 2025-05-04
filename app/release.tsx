import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Text } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import ReleaseDetailsComponent from "@/components/upcoming/ReleaseDetailsComponent";
import Storage from "@/storage";

export default function SettingsScreen() {
  const router = useRouter();
  const [data, setData] = useState(null)
  
const getData=async()=>{
    const release : any = await Storage.getItem("release");
    const temp = JSON.parse(release)
    console.log(temp)
    setData(temp)
}

  const goBack=()=>{
    Storage.deleteItem("release");
    router.back()
  }

  useEffect(()=>{
    getData();
  },[])

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Release Details" />
      </Appbar.Header>

      <View style={styles.content}>
        <ReleaseDetailsComponent release={data} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, backgroundColor: "#fff" },
});
