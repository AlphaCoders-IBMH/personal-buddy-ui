import { useRouter } from "expo-router";
import React, { Fragment, useState } from "react";
import { View } from "react-native";
import { Text, Button, Card, Divider } from "react-native-paper";
import CreateReminderComponent from "./CreateReminderComponent";
import ReminderBottomSheet from "./RemainderBottomSheet";

export default function ReleaseDetailsComponent({ release }: any) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [note, setNote] = useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <View style={{ padding: 16 }}>
      <Text variant="titleLarge">{release ? release.name : "-"}</Text>
      <Text variant="bodyMedium" style={{ marginVertical: 8 }}>
        Description : {release ? release.description : "-"}
      </Text>

      <Divider style={{ marginVertical: 12 }} />

      <Card style={{ padding: 16, marginBottom: 12 }}>
        <Text variant="titleSmall">Linked Jira Tickets</Text>
        {/* <Text>- JIRA-1234: Fix login</Text>
        <Text>- JIRA-2345: Update documentation</Text> */}
        {release ? (
          release.jiras.map((item: any, i: any) => (
            <Fragment key={i}>
              <View style={{ padding: 5,gap:5 }} key={i}>
                <Text>Name : {item.title}</Text>
                <Text>Description : {item.summary}</Text>
                {/* <Text>Assignee : {item.assignee}</Text> */}
              </View>
              {i !== release.jiras.length - 1 ? <Divider /> : <></>}
            </Fragment>
          ))
        ) : (
          <Text>No data Available</Text>
        )}
      </Card>

      {/* <Card style={{ padding: 16, marginBottom: 12 }}>
        <Text variant="titleSmall">Reminder Status</Text>
        <Text>Scheduled</Text>
      </Card> */}

      {/* <Button
        mode="contained"
        // onPress={() =>
        //   router.push({ pathname: "/create-reminder", params: release })
        // }
        onPress={showModal}
      >
        Set Reminder
      </Button>
      <ReminderBottomSheet
        release={release}
        visible={visible}
        hideModal={hideModal}
      /> */}
    </View>
  );
}
