import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, PanResponder } from "react-native";

import { View } from "../../Themed";
import Switch from "./switch";

const CONTAINER_SIZE = 120;
const BORDER_RADIUS = CONTAINER_SIZE / 2;
const CENTER_X = BORDER_RADIUS;
const CENTER_Y = CENTER_X;
const RADIUS = BORDER_RADIUS - 10;

const MIN_LEVEL = 0;
const MAX_LEVEL = 9;

export default function Knob({
  level,
  setLevel,
  isOn,
  setIsOn,
  isActive,
}: {
  level: number;
  setLevel: (level: number) => void;
  isOn: boolean;
  setIsOn: (value: boolean) => void;
  isActive: boolean;
}) {
  const enablePanResponder = useRef(isActive);

  useEffect(() => {
    enablePanResponder.current = isActive;
  }, [isActive]);

  const virtualRotation = useRef(level);
  let newLevel = level;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (!enablePanResponder.current) return;

        const { dx, dy } = gestureState;
        const position = dx > Math.abs(dy) ? dx : -dy;
        newLevel = Math.floor(position / 10) + virtualRotation.current;
        if (newLevel > MAX_LEVEL) {
          newLevel = MAX_LEVEL;
        }

        if (newLevel < MIN_LEVEL) {
          newLevel = MIN_LEVEL;
        }
        setLevel(newLevel);
      },
      onPanResponderRelease: () => {
        virtualRotation.current = newLevel;
      },
    })
  ).current;

  const deg = level * 30 + 135;
  const angle = (deg * Math.PI) / 180;

  const x = CENTER_X + Math.cos(angle) * RADIUS - 2;
  const y = CENTER_Y + Math.sin(angle) * RADIUS;

  return (
    <View style={styles.knob} {...panResponder.panHandlers}>
      <View
        style={[
          styles.knobDot,
          {
            top: y,
            left: x,
            backgroundColor: isActive ? "gray" : "#eee",
          },
        ]}
      />
      <Switch isOn={isOn} setIsOn={setIsOn} />
    </View>
  );
}

const styles = StyleSheet.create({
  knob: {
    position: "absolute",
    top: 15,
    left: 15,
    width: CONTAINER_SIZE,
    height: CONTAINER_SIZE,
    backgroundColor: "rgba(250,250,250,1)",
    borderRadius: BORDER_RADIUS,
    elevation: 5,
  },
  knobDot: {
    position: "absolute",
    height: 6,
    width: 6,
    borderRadius: 3,
  },
});
