import React, { useState } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { Modal, Portal, Text, Button, TextInput } from "react-native-paper";
import CreateReminderComponent from "./CreateReminderComponent";

export default function ReminderBottomSheet({
  release,
  visible,
  hideModal,
}: any) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modal}
      >
        <CreateReminderComponent release={release} handleClose={hideModal} />
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
