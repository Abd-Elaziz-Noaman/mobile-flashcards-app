import React, { Component } from 'react'
import { 
    View, 
    TouchableOpacity, 
    Text, 
    StyleSheet 
} from 'react-native'
import { connect } from 'react-redux'
import { white , gray, green} from '../utils/colors'
// import { clearLocalNotifications, setLocalNotifications } from '../utils/helpers'


class DeckDetail extends Component {
    static navigationOptions = ({ route }) => ({
        title: route.params.deckTitle                     // ???????????????
    },
    console.log("title", title)
    );

    // startQuiz = (cards) => {
    //     if(cards.length === 0)
    //     {
    //       alert("This Deck has no cards, Wanna add a card ?")
    //     }
    //     else if(cards.length > 0){
    //     clearLocalNotifications()
    //       .then(setLocalNotifications)
    //     this.props.navigation.navigate('quiz', {deck})  
    //     } 
    // }

    render() {
        const { deck, navigation } = this.props;

        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.cardsNum}>
                        {deck.cards.length === 0 ? "No cards yet, let's add some" : deck.cards.length + "Cards"}
                    </Text>
                </View>
                <View style={{marginTop: 20}}>
                    {deck.cards.length !==0 && (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('quiz', {deck})
                            }}
                            style={styles.btn}
                        >
                            <Text style={styles.btnText}>Start Quiz</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity 
                        onPress={() => {
                            navigation.navigate("newCard", { deckTitle: deck.title })
                        }}
                        style={[styles.btn, {backgroundColor: deck.cards.length !==0 ? gray : green}]}
                    >
                        <Text style={styles.btnText}>Add Card</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        padding: 10,
        marginBottom: 5
    },
    cardsNum: {
        fontSize: 20,
        color: gray,
        textAlign: "center",
        marginBottom: 5
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

function mapStateToProps (state, { route }) {
    return {
        deck: state[route.params.deckTitle]
    }
    // console.log("deck", deck)
};

export default connect(mapStateToProps)(DeckDetail);