import React, { useEffect, useState } from "react";
import { Button, Text, View, FlatList } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import axios from "axios";
import Email from "./Email";
import { Card } from "react-native-paper";
import { processEmailsWithGranite } from "./granite";
// import * as AuthSession from "expo-auth-session";

export default function App() {
  const [gmails, setGmails] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [summary, setSummary] = useState("");

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

    // redirectUri: makeRedirectUri({
    //   native: 'your.app://redirect', // This is optional for bare workflow, Expo Go usually handles it
    // }),
    redirectUri: makeRedirectUri({ useProxy: false }),
  });
  // const router = useRouter();

  function parseQueryParams(url) {
    const hash = url.split("#")[1];
    const params = new URLSearchParams(hash);
    const result = {};
    for (const [key, value] of params.entries()) {
      result[key] = value;
    }
    return result;
  }

  // Handle the response
  useEffect(() => {
    if (window.opener) {
      const params = parseQueryParams(window.location.href);
      window.opener.postMessage(
        { type: "oauth-success", payload: params },
        "*"
      );
      window.close(); // Close the popup window after passing data
    } else {
      const handleMessage = (event) => {
        if (event.data?.type === "oauth-success") {
          const { access_token } = event.data.payload;
          console.log("Received token from popup:", access_token);
          fetchGmailSubjects(access_token); // call your function here
        }
      };

       window.addEventListener("message", handleMessage);

      // // Cleanup the event listener when component unmounts
       return () => {
         window.removeEventListener("message", handleMessage);
       };
    }
  }, []);

  // React.useEffect(() => {
  //   // console.log(response + "res here");
  //   // if (response?.type === "success") {
  //   //   console.log("called here 1");
  //   //   const { authentication } = response;
  //   //   console.log(authentication+"authentication")
  //   //   fetchGmailSubjects(authentication.accessToken);
  //   // }
  //   // if (response?.type === "success") {
  //   //   const { authentication } = response;
  //   //   fetchGmailSubjects(authentication.accessToken);
  //   //   // Close the popup if it's a popup window
  //   //   if (window.opener) {
  //   //     window.opener.postMessage({ type: "oauth-success", payload: response }, "*");
  //   //     window.close(); // Close the popup window
  //   //   }
  //   // } else if (response?.type === "dismiss") {
  //   //   // Alert.alert("Login Dismissed", "You closed the login popup before completing the login.");
  //   //   console.log(response)
  //   // }
  // }, [response]);

  async function fetchGmailSubjects(accessToken) {
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

      const messageIds = res.data.messages?.map((msg) => msg.id) || [];

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
          (header) => header.name === "Subject"
        )?.value;
        const from = headers.find((header) => header.name === "From")?.value;
        const to = headers.find((header) => header.name === "To")?.value;
        const body = mail.data.snippet; // Using snippet as email body
        const priority = headers.find((header) => header.name === "X-Priority")?.value || "Normal";

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

  const handleLogin = () => {
    promptAsync({ useProxy: false })
      .then((res) => console.log("Prompt result:", res))
      .catch((err) => console.error("Prompt error:", err));
  };

  const handleSummarizeEmails = async () => {
    try {
      if (gmails.length === 0) {
        console.warn("No emails available to summarize.");
        return;
      }

      const customPrompt = "Summarize the following emails:"; // You can customize this prompt
      console.log("Sending emails and prompt to Granite API...");

      const result = await processEmailsWithGranite(gmails, customPrompt);

      console.log("Summary received from Granite API:", result);
      setSummary(result);
    } catch (error) {
      console.error("Error summarizing emails:", error);
      alert("Failed to summarize emails. Please try again later.");
    }
  };

  const renderGmailCard = ({ item }) => (
    <Card style={{ margin: 10, padding: 10 }}>
      <Card.Title title={item.subject} subtitle={`From: ${item.from}`} />
      <Card.Content>
        <Text>To: {item.to}</Text>
        <Text>Body: {item.body}</Text>
        <Text>Priority: {item.priority}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Button
        title="Login with Google"
        disabled={!request}
        onPress={() => handleLogin()}
      />

      {gmails.length > 0 && (
        <FlatList
          data={gmails}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderGmailCard}
        />
      )}

      {gmails.length > 0 && (
        <Button
          title="Summarize Emails"
          onPress={handleSummarizeEmails}
        />
      )}

      {summary && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Summary:</Text>
          <Text>{summary}</Text>
        </View>
      )}
    </View>
  );
}
