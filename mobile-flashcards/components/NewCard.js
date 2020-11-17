import React, { Component } from "react";
import { connect } from "react-redux";
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
// import StyledButton from "./StyledButton";
import { white, gray, green } from "../utils/colors";
import { addCard } from "../actions";
import { add_Card } from "../utils/api";


class NewCard extends Component {
    state = {
        question: '',
        answer: ''
    };

    handleSubmit = () => {
        deckTitle = this.props.route.params.deckTitle;
        const { question, answer } = this.state;
    
        this.props.addCard(deckTitle, question, answer);
        add_Card(deckTitle, { question, answer });
    
        // Return to Deck Detail view.
        this.props.navigation.goBack();
    
        // Reset form for future use.
        this.setState({
          question: '',
          answer: ''
        });
    };

    render() {
        const { question, answer } = this.state;

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.block}>
                    <Text style={styles.inputLabel}>What is the question ?</Text>
                    <TextInput
                        style={styles.textInput}
                        value={question}
                        placeholder="Enter the question"
                        onChangeText={question => this.setState({ question })} 
                    />
                </View>
                <View style={styles.block}>
                    <Text style={styles.inputLabel}>What is the answer ?</Text>
                    <TextInput
                        style={styles.textInput}
                        value={answer}
                        placeholder="Enter the answer"
                        onChangeText={answer => this.setState({ answer })} 
                    />
                </View>
                <TouchableOpacity style={styles.btn} onPress={this.handleSubmit}>
                    <Text style={styles.btnText}>Add Card</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,  // !!
        justifyContent: "center",
        alignItems: "center"
    },
    block: {
        margin: 20,
        marginBottom: -30
    },
    inputLabel: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    textInput: {
        backgroundColor: white,
        width: 350,
        height: 50,
        fontSize: 20,
        padding: 10,
        borderRadius: 1,
        borderColor: gray,
        margin: 20
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
})

const mapDispatchToProps = dispatch => ({
    addCard: (deckId, question, answer) =>
      dispatch(addCard(deckId, question, answer))
});


export default connect(null, mapDispatchToProps)(NewCard);