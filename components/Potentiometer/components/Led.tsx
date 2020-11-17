import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../../Themed";

export default function Led({
  isActive = true,
  isOn = false,
  rotation = 0,
  x = 0,
  y = 0,
}: {
  isActive: boolean;
  isOn: boolean;
  rotation: number;
  x?: number;
  y?: number;
}) {
  return (
    <View
      style={[
        styles.led,
        {
          transform: [{ rotate: `${rotation}rad` }],
          top: y,
          left: x,
          backgroundColor: isActive ? (isOn ? "#00ccff" : "#164450") : "#eee",
        },
      ]}
    ></View>
  );
}

const LED_WIDTH = 4;
const LED_HEIGHT = 4;

const styles = StyleSheet.create({
  led: {
    width: LED_WIDTH,
    height: LED_HEIGHT,
    backgroundColor: "red",
    position: "absolute",
    borderRadius: LED_HEIGHT / 2,
  },
});

export { LED_HEIGHT, LED_WIDTH };
