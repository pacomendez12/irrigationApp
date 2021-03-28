import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Image } from "react-native";
import * as Progress from "react-native-progress";

import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";
import Potentiometer from "./Potentiometer/index";
import { getTimeFromSeconds } from "../util/time";

const seconds = [60, 120, 300, 600, 900, 1800, 3600, 5400, 7200, 9000];

export default function ValveCard({
  deviceName,
  remainingFromDevice,
}: {
  deviceName?: string;
  remainingFromDevice?: number | undefined;
}) {
  const [level, setLevel] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [irrigationTime, setIrrigationTime] = useState(0);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (isOn) {
      const totalTime = seconds[level];
      setIrrigationTime(totalTime);
      setRemaining(totalTime);
    } else {
      setIrrigationTime(0);
      setRemaining(0);
    }
  }, [isOn]);

  useEffect(() => {
    if (remainingFromDevice) {
      setRemaining(remainingFromDevice);
    }
  }, [remainingFromDevice]);

  useEffect(() => {
    if (remaining > 0) {
      const interval = setInterval(() => {
        setRemaining((remSecs) => remSecs - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    } else {
      setIsOn(false);
    }
  }, [remaining]);



  return (
    <View style={styles.container}>
      <View style={[styles.header]}>
        <Text style={styles.headerText} lightColor="#2f95dc" darkColor="white">
          {deviceName ?? "Válvula"}
        </Text>
      </View>
      <View style={styles.body}>
        <View
          style={{
            flexGrow: 0.3,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isOn ? (
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "cover",
                }}
                source={require("../assets/images/irrigating.gif")}
              />
            ) : (
              <Text
                style={{
                  backgroundColor: "#eee",
                  padding: 13,
                  borderRadius: 30,
                  color: "gray",
                }}
              >
                Apagado
              </Text>
            )}
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Potentiometer
            level={level}
            setLevel={setLevel}
            isOn={isOn}
            setIsOn={setIsOn}
          />
          <Text style={styles.timeText}>
            {getTimeFromSeconds(isOn ? remaining : seconds[level])}
          </Text>
          <View opacity={isOn ? 1 : 0}>
            <Progress.Bar
              progress={
                (isOn && irrigationTime > 0 && remaining / irrigationTime) || 0
              }
              width={170}
              borderWidth={0}
              height={3}
              unfilledColor="#eee"
              color="#2f95dc"
              animated
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  container: {
    alignItems: "center",
    margin: 6,
    padding: 10,
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  body: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    alignSelf: "stretch",
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  headerText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "left",
  },
  timeText: {
    marginBottom: 10,
    color: "gray",
    fontSize: 11
  },
});
