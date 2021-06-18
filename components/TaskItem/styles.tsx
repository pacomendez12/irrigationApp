import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 100,
    borderBottomColor: "#cfcfcf",
    borderBottomWidth: 0.5,
  },
  containerLeft: {
    flex: 1,
    flexGrow: 7,
  },
  hourAndIndicator: {
    // flex: 1,
    flexDirection: "row",
  },
  containerRight: {
    flex: 1,
    flexGrow: 2,
    marginRight: 15,
  },
  hourText: {
    fontSize: 25,
  },
  occurrencesText: {
    color: "gray",
    fontSize: 16,
  },
});
