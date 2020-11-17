import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { white, gray } from "../utils/colors";
import { clearLocalNotifications, setLocalNotifications } from "../utils/helpers";
import QuizCard from "./QuizCard";
import QuizCheck from "./QuizCheck";
import QuizResult from "./QuizResult";


const defaultState = {
  correctAnswerCount: 0,
  incorrectAnswerCount: 0,
  currentQuestionIndex: 0, // tracks which card is currently being shown
  showResults: false
};

class Quiz extends Component {
  static navigationOptions = ({ route }) => ({
    title: `${route.params.deck.title} Quiz`
  });

  state = defaultState;

  _getRemainingCountMessage = () => {
    const { correctAnswerCount, incorrectAnswerCount } = this.state;
    const remainingQuestions =
      this._getDeck().cards.length -
      (correctAnswerCount + incorrectAnswerCount + 1);
    return <Text>{`${remainingQuestions} Questions Remaining`}</Text>
  };

  _getDeck = () => {
    return this.props.route.params.deck;
  };

  restartQuiz = () => {
    this.setState(defaultState);
  };

 
  recordAnswer = knewAnswer => {
    // Update answer counter.
    let {
      correctAnswerCount,
      incorrectAnswerCount,
      showResults,
      currentQuestionIndex
    } = this.state;

    // Update the counter.
    if (knewAnswer) {
      correctAnswerCount++;
    } else {
      incorrectAnswerCount++;
    }

    // Flip Card
    const deck = this._getDeck();
    if (currentQuestionIndex === deck.cards.length - 1) {
      // time to show results.
      showResults = true;

      // if the User completed a quiz, disable today's notification.
      clearLocalNotifications();
      // Set tomorrow's notification.
      setLocalNotifications();
    } else {
      // show the next card.
      currentQuestionIndex++;
    }

    // Update the state with new values.
    this.setState(state => ({
      correctAnswerCount,
      incorrectAnswerCount,
      showResults,
      currentQuestionIndex
    }));
  };

  render() {
    const {
      correctAnswerCount,
      incorrectAnswerCount,
      currentQuestionIndex,
      showResults
    } = this.state;

    return !showResults ? (
      <View style={styles.container}>
        <QuizCard card={this._getDeck().cards[currentQuestionIndex]} />
        <Text style={styles.count}>{this._getRemainingCountMessage()}</Text>
        <QuizCheck recordAnswer={this.recordAnswer} />
      </View>
    ) : (
      <QuizResult
        correctAnswerCounter={correctAnswerCount}
        incorrectAnswerCounter={incorrectAnswerCount}
        restartQuiz={this.restartQuiz}
        navigation={this.props.navigation}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: white,
    padding: 10
  },
  count: {
    color: gray,
    fontSize: 20,
    marginTop: 10
  }
});

export default Quiz;