import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function UpcomingScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Upcoming Releases" />
      </Appbar.Header>

      <View style={styles.content}>
        <Text>List of upcoming releases</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
