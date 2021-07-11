import React from "react";
import { StyleProp, ViewStyle, Switch } from "react-native";
import { Badge } from "react-native-paper";

import { Text, View } from "../Themed";
import { getTimeFromSeconds, getTimeFromSecondsShort } from "../../util/time";
import { Task } from "../../types";

import TypeIndicator from "./TaskTypeIndicator";
import styles from "./styles";

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
} from "../../constants";

export default function Item({
  task,
  containerStyle,
  toggleEnabled,
}: {
  task: Task;
  containerStyle: StyleProp<ViewStyle>;
  toggleEnabled: (task: Task) => void;
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.containerLeft}>
        <View style={styles.hourAndIndicator}>
          <Text style={styles.hourText}>
            {getTimeFromSecondsShort(task.time)}
          </Text>
          <TypeIndicator type={task?.schedule?.type} />
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            alignItems: "center",
          }}
        >
          {renderDaysBadges(task?.schedule?.occurrences)}
        </View>
      </View>
      <View style={styles.containerRight}>
        <View style={{ maxWidth: 65 }} >
          <Text style={{ color: 'gray', fontSize: 12 }}>
            {getTimeFromSeconds(12000)}
          </Text>
        </View>
        <Switch
          value={task?.enabled}
          trackColor={{ false: "#dfdfdf", true: "#2f95dc77" }}
          thumbColor="#2f95dc"
          onValueChange={() => {
            toggleEnabled(task);
          }}
        />
      </View>
    </View>
  );
}

function renderDaysBadges(daysFlags: number) {
  const totalDays = countDays(daysFlags);
  if (totalDays === 0) return null;

  const mapper = ["L", "M", "I", "J", "V", "S", "D"];
  const days = Object.keys(mapper).map((dayIdx: number) => {
    return ((daysFlags >> dayIdx) & 0x1) === 1;
  });

  return days.map((dayEnabled, idx) => {
    const style = dayEnabled
      ? { backgroundColor: "#2f95dc", color: "white" }
      : { backgroundColor: "#f2f2f2", color: "gray" };
    return (
      <View
        key={idx}
        style={{
          marginHorizontal: 1,
        }}
      >
        <Badge style={style}>{mapper[idx]}</Badge>
      </View>
    );
  });
}

function countDays(daysFlags: number) {
  let counter = 0;
  for (let i = 0; i < 8; i++) {
    if (((daysFlags >> i) & 0x1) === 1) counter++;
  }
  return counter;
}
