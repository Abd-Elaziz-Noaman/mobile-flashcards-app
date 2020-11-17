import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator, createStackNvigator } from '@react-navigation/stack'
import { FontAwesome, Ionicons, Entypo } from '@expo/vector-icons'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import DeckDetail from './components/DeckDetail'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'


const Tab = createBottomTabNavigator();

function Tabs () {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {

          if (route.name === 'deckList') {
            return <FontAwesome name="list" size={size} color={color} />;
          } else if (route.name === 'newDeck') {
            return <Entypo name="add-to-list" size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="deckList" component={DeckList} />
      <Tab.Screen name="newDeck" component={NewDeck} />
    </Tab.Navigator>
  )
}


const Stack = createStackNavigator()

function MainNavigator () {
  return (
    <Stack.Navigator>
      <Stack.Screen name="mainPage" component={Tabs} />
      <Stack.Screen name="deckDetail" component={DeckDetail} />
      <Stack.Screen name="newCard" component={NewCard} />
      <Stack.Screen name="quiz" component={Quiz} />
    </Stack.Navigator>
  )
}


export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)} >
        <NavigationContainer>
          <View style={{flex: 1}}>
            <MainNavigator />
          </View>
        </NavigationContainer>
      </Provider>
    );
  }
}
