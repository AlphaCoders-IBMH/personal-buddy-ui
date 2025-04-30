import React, { useState } from 'react';
import { Button, Text, View, FlatList } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import axios from 'axios';
import * as AuthSession from 'expo-auth-session';

export default function App() {
  const [subjects, setSubjects] = useState([]);
  const [userInfo, setUserInfo] = useState(null);


  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "420316459798-o0oqhhdavpv1acjdtvik8dnclht0qfko.apps.googleusercontent.com",
    androidClientId: "420316459798-geiccdmd8uhghmftn5j3isofdjisikjp.apps.googleusercontent.com",
    // This is the Client ID from Google Cloud Console
    scopes: ['https://www.googleapis.com/auth/gmail.readonly', 'profile', 'email'],

    // redirectUri: makeRedirectUri({
    //   native: 'your.app://redirect', // This is optional for bare workflow, Expo Go usually handles it
    // }),
  });

  React.useEffect(() => {
    console.log(response+"res here")
    if (response?.type === 'success') {
      console.log("called here 1")
      const { authentication } = response;
      fetchGmailSubjects(authentication.accessToken);
    }
  }, [response]);

  async function fetchGmailSubjects(accessToken) {
    try {
      const res = await axios.get('https://gmail.googleapis.com/gmail/v1/users/me/messages', {
        headers: { Authorization: `Bearer ${accessToken}`},
        params: { q: "is:unread" } // Query only unread mails
      });

      const messageIds = res.data.messages?.map(msg => msg.id) || [];

      const subjects = [];
      for (const id of messageIds) {
        const mail = await axios.get(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const headers = mail.data.payload.headers;
        const subject = headers.find(header => header.name === 'Subject')?.value;
        if (subject) subjects.push(subject);
      }
      console.log(subjects+" values here")
      setSubjects(subjects);

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Button title="Login with Google" disabled={!request} onPress={() => promptAsync()} />

      {subjects.length > 0 && (
        <FlatList
          data={subjects}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={{ margin: 10 }}>{item}</Text>}
        />
      )}
    </View>
  );
}



