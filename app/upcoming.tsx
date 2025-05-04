import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import UpcomingComponent from "@/components/upcoming";
import { getJiraVersionList } from "@/api/graniteAPI";
import Storage from "@/storage";

export default function UpcomingScreen() {
  const router = useRouter();
  const [jiraData, setjiraData] = useState([])
  let token: any = null;

  const getData =async()=>{
    console.log("came here")
    const res = await getJiraVersionList();
    console.log(res)
    if(res){
        const data=res.graniteResp.results[0].generated_text
        const jsonData = JSON.parse(data);
        console.log(jsonData)
        setjiraData(jsonData)
    }else{
        setjiraData([])
    }
  }

  useEffect(() => {
    const checkToken = async () => {
        token = await Storage.getItem("accessToken");
        if (token) {
          getData();
        } else {
          await Storage.clearAll();
          router.push("/");
        }
      };
      checkToken();
    }, []);
  

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Upcoming Releases" />
      </Appbar.Header>

      <View style={styles.content}>
        <UpcomingComponent data={jiraData}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { backgroundColor: "#fff", flex: 1 },
});
