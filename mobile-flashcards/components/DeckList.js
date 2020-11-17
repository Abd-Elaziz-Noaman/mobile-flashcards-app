import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { receive_Decks } from '../utils/api'
import { white, red } from '../utils/colors'
import { decks } from '../utils/helpers';
import DeckCard from './DeckCard'
import { deleteAllDecks } from '../utils/api'
// import CodePush from 'react-native-code-push'
// import {Restart} from 'fiction-expo-restart'


class DeckList extends Component {
    // state = {
    //     loading: false
    // }

    componentDidMount() {
        receive_Decks()
            .then(decks => 
                this.props.receiveDecks(decks)
            )
            // .then(this.setState({loading: true}))
    };

    resetDate = () => {
        deleteAllDecks()
            // .then(Restart())
            // .then(CodePush.restartApp())
            .then(alert("Please restart your app"))
    }

    render() {
        // const {loading} = this.state;
        const {decks} = this.props;
        console.log("decks", decks)

        // if (!loading) {
        //     return (
        //         <View>
        //             <ActivityIndicator size="large" color="tomato" />
        //         </View>
        //     )
        // }

        return Object.values(decks).length !== 0 ? (
            <View style={styles.container}>
                <TouchableOpacity 
                    onPress={this.resetDate}
                    style={styles.btn}
                >
                    <Text style={styles.btnText}>Reset All Decks</Text>
                </TouchableOpacity>
                <FlatList 
                    data={Object.values(decks)}
                    renderItem={({item}) => 
                    // console.log("item", item)
                    (
                        <DeckCard 
                            title = {[item.title]}
                            cardNums = {item.cards.length}
                            navigation = {this.props.navigation}
                        />
                    )}
                    keyExtractor={(item, index) => item.title}
                />
            </View>
        ) : (
            <View style={styles.empty}>
                <Text>You don't have any decks yet.</Text>
            </View>
        )
        
        
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    empty: {
        flex: 1,
        backgroundColor: white,
        justifyContent: "center",
        alignItems: "center"
    },
    btn: {
        borderRadius: 5,
        backgroundColor: red,
        margin: 2,
        marginBottom: 20,
        padding: 15,
        width: 350
    },
    btnText: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        color: white
    }
})


function mapStateToProps ( decks ) {
    console.log("My decks", decks)
    return {
        decks,
    }
};

function mapDispatchToProps (dispatch) {
    return {
        receiveDecks: (decks) => dispatch(receiveDecks(decks))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);




// Array.from(decks).map((deck) => {
//     return (
//         <View key={deck.title}>
//             <View>
//                 <Text>{deck.title}</Text>
//                 <Text>
//                     {deck.cards.length === 0 ? "No Cards" : deck.cards.length + "Cards"}
//                 </Text>
//                 <TouchableOpacity>
//                     <Text>Open Deck</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>