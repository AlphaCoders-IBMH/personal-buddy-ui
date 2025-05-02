import React, { useState } from "react";
import { Platform, View } from "react-native";
import { Text, Button, TextInput, Card } from "react-native-paper";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";

export default function CreateReminderComponent({ release,handleClose }: any) {
  const [selectedRelease, setSelectedRelease] = useState(
    release?.version || "v1.3"
  );
  const [notificationTime, setNotificationTime] = useState("1 hour before");
  const [reminderType, setReminderType] = useState("Push");
  const [notes, setNotes] = useState("");
  const router = useRouter();

  const scheduleNotification = async () => {
    const triggerSeconds = notificationTime === "1 hour before" ? 3600 : 86400;

    if (Platform.OS === "web") {
      if (Notification.permission === "granted") {
        new Notification("JiraReleaseBuddy", {
          body:
            `Reminder: Release '${selectedRelease}' is scheduled soon!` +
            (notes ? `\nNotes: ${notes}` : ""),
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("JiraReleaseBuddy", {
              body:
                `Reminder: Release '${selectedRelease}' is scheduled soon!` +
                (notes ? `\nNotes: ${notes}` : ""),
            });
          }
        });
      }
    } else {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "JiraReleaseBuddy",
          body:
            `Reminder: Release '${selectedRelease}' is scheduled soon!` +
            (notes ? `\nNotes: ${notes}` : ""),
        },
        trigger: {
          type: "timeInterval",
          seconds: triggerSeconds,
          repeats: false,
        },
      });
    }

    // alert("Reminder scheduled successfully!");
    handleClose();
  };

  return (
    <View style={{ padding: 16 }}>
      <Text variant="titleLarge">Create Reminder</Text>
        <TextInput
          label="Select Release"
          value={selectedRelease}
          onChangeText={setSelectedRelease}
        />
        <TextInput
          label="Notification Time (e.g. 1 hour before)"
          value={notificationTime}
          onChangeText={setNotificationTime}
        />
        <TextInput
          label="Reminder Type (e.g. Push, Email, SMS)"
          value={reminderType}
          onChangeText={setReminderType}
        />
        <TextInput
          label="Notes (Optional)"
          value={notes}
          onChangeText={setNotes}
          multiline
        />
      <Button mode="contained" onPress={scheduleNotification}>
        Save Reminder
      </Button>
    </View>
  );
}
