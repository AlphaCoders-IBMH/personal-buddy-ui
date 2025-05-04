import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { useRouter } from "expo-router";
import TasksComponent from "@/components/tasks";
// import { getAccessToken, getGraniteFormat, askGranite } from "@/api/graniteAPI";
import axios from "axios";
import Storage from "@/storage";
import Email from "@/Email";
import { processEmailsWithGranite } from "@/api/graniteAPI";

export default function TasksScreen() {
  const router = useRouter();
  const [taskData, setTaskData] = useState([]);
  const [gmails, setGmails] = useState<Email[]>([]);
  let token: any = null;

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

  function isValidJSON(str: string) {
    try {
      const parsed = JSON.parse(str);
      return typeof parsed === "object" && parsed !== null;
    } catch (e) {
      return false;
    }
  }

  async function fetchGmailSubjects(accessToken: any) {
    try {
      console.log("Access Token:", accessToken);
      const res = await axios.get(
        "https://gmail.googleapis.com/gmail/v1/users/me/messages",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: { q: "is:unread" }, // Query only unread mails
        }
      );

      console.log(res.data.messages + "res here");

      const messageIds = res.data.messages?.map((msg: any) => msg.id) || [];

      const emails = [];
      for (const id of messageIds) {
        const mail = await axios.get(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        const headers = mail.data.payload.headers;
        const subject = headers.find(
          (header: any) => header.name === "Subject"
        )?.value;
        const from = headers.find(
          (header: any) => header.name === "From"
        )?.value;
        const to = headers.find((header: any) => header.name === "To")?.value;
        const body = mail.data.snippet; // Using snippet as email body
        const priority =
          headers.find((header: any) => header.name === "X-Priority")?.value ||
          "Normal";

        if (subject) {
          emails.push(new Email(subject, from, to, body, priority));
        }
      }

      console.log(emails + " email objects here");
      setGmails(emails);
    } catch (err) {
      console.error(err);
    }
  }

  const handleSummarizeEmails = async () => {
    try {
      if (gmails.length === 0) {
        console.warn("No emails available to summarize.");
        return;
      }

      console.log("Emails to summarize:", gmails);
      const customPrompt = 
    //   "Summarize the email body and provide 5 tasks in a JSON array format. Each task should include a 'title', 'description', and 'priority'.";
        // "Summarize the content of the email(s) and extract actionable tasks in a JSON array.Each task should include a 'title', 'description', and 'priority'."; // You can customize this prompt
        // `Summarize the emails and generate tasks in a JSON array format.Each task object should have only 'title'.`
"Summarize the email content and generate top 5 prioritized to-do list in JSON array format. Each task should include: 'title', 'description', 'priority' (High, Medium, Low), and 'dueDate' (if applicable). Ensure the JSON array is complete and well-formed."

      console.log("Sending emails and prompt to Granite API...");

      const result = await processEmailsWithGranite(gmails, customPrompt);

      console.log("Summary received from Granite API:", result);
      //   setTaskData(result);
      
          if (isValidJSON(result)) {
            console.log(JSON.parse(result));
            setTaskData(JSON.parse(result));
          }
       
    } catch (error) {
      console.error("Error summarizing emails:", error);
      alert("Failed to summarize emails. Please try again later.");
    }
  };

  const getData = async () => {
    // const accessToken = await getAccessToken();

    // const reqData = getGraniteFormat();
    // const res = await askGranite(reqData, accessToken);
    // console.log(res )
    // if (res) {
    //   if (res.results && res.results.length > 0) {
    //     const data = res.results[0];
    //     console.log(data)
    //     if (isValidJSON(data.generated_text)) {
    //         console.log(JSON.parse(data.generated_text))
    //       setTaskData(JSON.parse(data.generated_text));
    //     }
    //   }
    // }
    await fetchGmailSubjects(token);
  };

  useEffect(() => {
    if (gmails.length > 0) {
      handleSummarizeEmails();
    }
  }, [gmails]);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Tasks" />
      </Appbar.Header>
      <View style={styles.content}>
        <TasksComponent data={taskData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { backgroundColor: "#fff", flex: 1 },
});
