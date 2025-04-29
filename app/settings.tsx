import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Settings" />
      </Appbar.Header>

      <View style={styles.content}>
        <Text>Settings page content</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
