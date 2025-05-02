import { useRouter } from "expo-router";
import React, { Fragment } from "react";
import { ScrollView } from "react-native";
import { Text, Button, FAB, Card, List, Divider } from "react-native-paper";

const releases = [
  { version: "v1.2", date: "April 10, 2024" },
  { version: "v1.2.5", date: "April 24, 2024" },
  { version: "v1.3", date: "May 2, 2024" },
];

export default function UpcomingComponent() {
  const router = useRouter();
  return (
    <ScrollView style={{ padding: 16 }}>
      <Text variant="titleMedium">Upcoming Releases</Text>
      <Card style={{ marginTop: 10, padding: 10 }}>
        {releases.map((rel, idx) => (
          <Fragment key={idx}>
            <List.Item
              key={idx}
              title={rel.version}
              description={rel.date}
              onPress={() =>
                router.push({ pathname: "/release", params: rel })
              }
              left={() => <List.Icon icon="calendar" />}
            />
            {idx !== releases.length - 1 ? <Divider /> : <></>}
          </Fragment>
        ))}
      </Card>
      <Card style={{ marginTop: 20, padding: 10 }}>
        <Text>2 active reminders today</Text>
      </Card>

      {/* <Button icon="plus" mode="contained" style={{ marginTop: 16 }} onPress={() => navigation.navigate('CreateReminder')}>
        Create Reminder
      </Button> */}

      <Button icon="sync" style={{ marginTop: 8 }} mode="outlined">
        Sync with Jira
      </Button>

      {/* <FAB
        icon="plus"
        style={{ position: 'absolute', right: 16, bottom: 16 }}
        onPress={() => navigation.navigate('CreateReminder')}
      /> */}
    </ScrollView>
  );
}
