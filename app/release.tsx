import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ReleaseDetailsComponent from '@/components/upcoming/ReleaseDetailsComponent';

export default function SettingsScreen() {
  const router = useRouter();
    const release = useLocalSearchParams();

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Release Details" />
      </Appbar.Header>

      <View style={styles.content}>
        <ReleaseDetailsComponent release={release}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, backgroundColor:"#fff" },
});