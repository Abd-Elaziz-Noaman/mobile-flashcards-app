import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { purple, white, gray, green } from "../utils/colors";


const QuizResuts = ({
  correctAnswerCounter,
  incorrectAnswerCounter,
  restartQuiz,
  navigation
}) => (
  <View style={styles.container}>
    <Text style={styles.header}>You scored</Text>
    <Text style={styles.result}>{`${Math.round(
      (correctAnswerCounter * 100) / (correctAnswerCounter + incorrectAnswerCounter)
    )} %`}</Text>
    <View style={styles.actions}>
      <TouchableOpacity style={[styles.btn, styles.btnText]} onPress={() => restartQuiz()}>
        <Text>Restart Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.btn, { backgroundColor: gray }]}
      >
        <Text style={styles.btnText}>Back to Deck</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: white
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  result: {
    fontSize: 70,
    color: purple,
    textAlign: "center"
  },
  actions: {
    marginTop: 50
  },
  btn: {
    borderRadius: 5,
    backgroundColor: green,
    margin: 10,
    padding: 15,
    width: 300
  },
  btnText: {
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold",
      color: white
  }
});

export default QuizResuts;