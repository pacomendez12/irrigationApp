import * as React from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";

import ValveCard from "../components/ValveCard";
import Potentiometer from "../components/Potentiometer";
import { Text, View } from "../components/Themed";


export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ValveCard
          deviceName="Válvula 1"
        />
        <ValveCard
          deviceName="Válvula 2"
        />
        {/* <ValveCard
          deviceName="Valvula 3"
        />
        <ValveCard
          deviceName="Valvula 4"
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    flexDirection: "column",
    alignContent: "stretch",
    alignItems: "center",
    backgroundColor: "rgba(250,250,250,0.8)",
  },
  scrollView: {
    width: "100%",
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
});
