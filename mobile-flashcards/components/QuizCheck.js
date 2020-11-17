import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { green, red, white } from "../utils/colors";

const QuizCheck = ({ recordAnswer }) => (
  <View style={styles.container}>
    <Text style={styles.header}>How did you do in this question?</Text>
    <View style={styles.check}>
      <TouchableOpacity
        style={[styles.answerBtn, { backgroundColor: green }]}
        onPress={() => recordAnswer(true)}
      >
        <Text style={styles.btnText}>Correct</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.answerBtn, { backgroundColor: red }]}
        onPress={() => recordAnswer(false)}
      >
        <Text style={styles.btnText}>Incorrect</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  check: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },
  answerBtn: {
    padding: 20,
    margin: 10,
    width: 150,
    borderRadius: 5
  },
  btnText: {
    color: white,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default QuizCheck;