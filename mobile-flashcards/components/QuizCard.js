import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { blue, white, gray, green } from "../utils/colors";

class QuizCard extends Component {
  state = {
    showAnswer: false
  };

  toggleCard = () => {
    this.setState(state => ({
        showAnswer: !state.showAnswer
    }));
  };

  render() {
    const { showAnswer } = this.state;
    const { card } = this.props;
    return (
      <View style={styles.container}>
        <View>
          {this.state.showAnswer ? (
            <Text style={styles.text}>{card.answer}</Text>
          ) : (
            <Text style={styles.text}>{card.question}</Text>
          )}
        </View>
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: gray }]}
            onPress={this.toggleCard}
          >
            <Text style={styles.btnText}>{`See ${showAnswer ? "Question" : "Answer"}`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: blue,
    padding: 30,
    width: 350,
    height: 250,
    borderRadius: 5,
    shadowRadius: 5,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 4,
      height: 5
    }
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: white
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

export default QuizCard;