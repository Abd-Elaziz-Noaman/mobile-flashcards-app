import React, { Component } from 'react'
import { TouchableOpacity, 
    Text, 
    StyleSheet, 
    Platform ,
    KeyboardAvoidingView, 
    TextInput
} from 'react-native'
import { connect } from 'react-redux'
import { red, white } from '../utils/colors'
import { addDeck } from '../actions'
import { add_Deck } from '../utils/api'


function SubmitBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn}
            onPress={onPress}>
                <Text style={styles.submitBtnText}>ADD DECK</Text>
        </TouchableOpacity>
    )
};


class NewDeck extends Component {
    state = {
        deck: {
            title: '',
            cards: []
        }
    }

    handleInputChange = (input) => {
        let deck = {...this.state.deck}
        deck.title = input
        this.setState({deck: deck})
    };

    submitDeck = () => {
        const newDeck = {...this.state.deck}
        console.log("newDeck", newDeck)
        this.props.dispatch(addDeck(newDeck.title))
        this.props.navigation.navigate('deckList')
        add_Deck(newDeck)
        this.setState({deck: {
            title: '',
            cards: []
        }})
        console.log("Deck Input reset")
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <KeyboardAvoidingView behavior='padding' style={styles.row}>
                        <Text style={{fontSize:20,marginBottom:10}}>
                            What is the name of your new deck ?
                        </Text>
                        <TextInput onChangeText={this.handleInputChange} style={styles.input}/>
                        <SubmitBtn onPress={this.submitDeck} />
                </KeyboardAvoidingView>
                
                
            </KeyboardAvoidingView>
        )
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    row: {
        justifyContent:'center',
        flex: 1,
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#ededed',
        height: 50, 
        width: 280, 
        marginBottom: 20, 
        padding: 7,
        borderRadius: 5, 
        borderColor: red, 
        borderWidth: 1
    },
    iosBtn: {
        backgroundColor: red,
        padding: 10,
        width:170,
        height: 45,
        borderRadius: 7,
        marginLeft: 40,
        marginRight: 40,
    },
    androidBtn: {
        backgroundColor: red,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        marginRight:25,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
});


export default connect()(NewDeck);