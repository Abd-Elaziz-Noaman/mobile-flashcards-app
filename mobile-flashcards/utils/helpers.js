import {AsyncStorage} from 'react-native'
import { startingDecks } from './api'
// import {Permissions, Notifications} from 'expo'
import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications'



export const decks = 

{
    React: {
      title: 'React',
      cards: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      cards: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
};


export function setStartingDecks (startDecks) {
  startingDecks(startDecks).then(console.log("Starting Decks set")).catch(err => console.log(err))
};


const NOTIFICATION_KEY = "flashcards:notifications";


export function clearLocalNotifications () {
  AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(
      Notifications.cancelAllScheduledNotificationsAsync()
    )
};

// dismissAllNotificationsAsync()


function createNotification () {
  return {
    title: 'Ready for some Quizzing?',
    body: "👋 Let's Do IT",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  };
};


export const setLocalNotifications = () => {  
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(18);
            tomorrow.setMinutes(1);
            
            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day"
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
      console.log('Notification Reset for tomrrow')
    });
};