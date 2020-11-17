import {AsyncStorage} from 'react-native'
// import CodePush from 'react-native-code-push'

export const FLASHCARD_STORAGE_KEY = "flashcards:cards"


export function receive_Decks () {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
        .then(result => {
            const decks = JSON.parse(result)
            return decks;
        }).catch(err => console.log(err))
};

// export function receive_Decks () {
//     return AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(decks)).catch(err => console.log(err))
// };

export function add_Deck (deck) {
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
        [deck.title]: deck
    })).catch(err => console.log(err))
};


export function add_Card (d_title, card) {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(result => {
        const data = JSON.parse(result);

        data[d_title] = {
            ...data[d_title],
            cards: [
                ...data[d_title].cards,
                {
                    question: card.question,
                    answer: card.answer
                }
            ]
        };

        AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
    }).catch(err => console.log(err))
};

export function deleteAllDecks () {
    return AsyncStorage.clear()
};









/* 
import { AsyncStorage } from 'react-native'
import { decks } from './helpers'

export const FLASHCARD_STORAGE_KEY = "flashcards:cards"

export function startingDecks (deck) {
    return AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
        [deck.title]: deck
    })).catch(err => console.log(err))
};  

export function addDeck (deck) {
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
        [deck.title]: deck
    })).catch(err => console.log(err))
};

export function receive_Decks () {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
        .then(decks => Object.values(JSON.parse(decks))).catch(err => console.log(err))
};

export function addCard (title, card) {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(stringfied => {
        let Decks = JSON.parse(stringfied)
        let decksKeys = Object.keys(Decks)

        decksKeys.forEach(dKey => {
            let deck = Decks[dKey]
            
            if(deck.title === title) {
                deck.cards = [...deck.cards, card]
            }
        })

        AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(Decks)).catch(err => console.log(err))
        return Object.values(Decks)
    }).catch(err => console.log(err))
};

export function deleteAllDecks () {
    return AsyncStorage.clear()
};

*/