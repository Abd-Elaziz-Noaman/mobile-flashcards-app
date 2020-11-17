import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white, gray } from '../utils/colors'


function DeckCard (props) {
    const { title, cardNums, navigation } = props;

    return (
        <View>
            <TouchableOpacity 
                style={styles.container}
                onPress={() => 
                    navigation.navigate("deckDetail", { deckTitle: title })
                }
            >
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.cardsNum}>
                    {cardNums === 0 ? "No Cards" : cardNums + "Cards"}
                </Text>
            </TouchableOpacity>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        justifyContent: "center",
        minHeight: 150,
        marginBottom: 10,
        padding: 20,
        borderRadius: 5,
        borderWidth: 2,        //test
        borderColor: gray
    },
    title: {
        fontSize: 30,
        textAlign: "center",
        marginBottom: 5
    },
    cardsNum: {
        fontSize: 20,
        textAlign: "center",
        color: gray,
        marginBottom: 5
    } 
});


export default DeckCard;