import React, { useRef, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { FAB } from "react-native-paper";
import ActionSheet, { ActionSheetProps } from "react-native-actions-sheet";
import { cloneDeep } from "lodash";

import { Text, View } from "../components/Themed";
import TaskItem from "../components/TaskItem";
import { Task } from "../types";
import {
  NONE,
  MONDAY,
  TUESDAY,
  WENDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
  ONE_TIME_EVENT,
  REPEAT_WEEK,
  REPEAT_BIWEEK,
  REPEAT_MONTH,
} from "../constants";

const mockTasks: Task[] = [
  {
    id: 1,
    time: 1480,
    schedule: {
      type: REPEAT_WEEK,
      occurrences: MONDAY | WENDNESDAY | FRIDAY,
    },
    enabled: true,
  },
  {
    id: 2,
    time: 480,
    schedule: {
      type: REPEAT_BIWEEK,
      occurrences: TUESDAY | THURSDAY,
    },
    enabled: true,
  },
  {
    id: 3,
    time: 72020,
    schedule: {
      type: ONE_TIME_EVENT,
      occurrences: NONE,
    },
    enabled: true,
  },
];

export default function TabTwoScreen() {
  const [tasks, setTasks] = useState(cloneDeep(mockTasks));

  const toggleEnabled = (task: Task) => {
    setTasks((tasks) => {
      return tasks.map((t) => {
        if (t === task) return { ...t, enabled: !t.enabled };
        return t;
      });
    });
  };

  const renderItem = ({ item }: { item: Task }) => {
    return (
      <TaskItem
        task={item}
        toggleEnabled={toggleEnabled}
        containerStyle={{
          marginLeft: 25,
        }}
      />
    );
  };

  const actionSheetRef = useRef<ActionSheetProps>();
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item: Task, index: number) => `${item?.id}`}
      />

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
    alignItems: "stretch",
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
