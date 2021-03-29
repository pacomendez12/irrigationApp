import React, { useRef } from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import ActionSheet, { ActionSheetProps } from "react-native-actions-sheet";

import { Text, View } from "../components/Themed";

export default function TabTwoScreen() {
  const actionSheetRef = useRef<ActionSheetProps>();
  return (
    <View style={styles.container}>
      <FAB
        style={styles.fab}
        icon="plus"
        uppercase={false}
        onPress={() => {
          actionSheetRef.current?.setModalVisible();
        }}
      />
      <ActionSheet ref={actionSheetRef} gestureEnabled bounceOnOpen>
        <View
          style={{
            height: 160,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
        </View>
      </ActionSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  fab: {
    position: "absolute",
    backgroundColor: "#2f95dc",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
