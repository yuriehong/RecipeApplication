import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Home from './screens/Home';
import Recipe from './screens/Recipe';
import RecipeItem from './components/RecipeItem';
import RecipeForm from './screens/RecipeForm';

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
          <Stack.Navigator>
          <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Recipe Book',   
          headerTitleStyle: styles.text}}
        />
          <Stack.Screen name="RecipeForm" component={RecipeForm} options={{ title: 'Recipe Form',  headerTitleStyle: styles.text }}></Stack.Screen>
          <Stack.Screen name="RecipeItem" component={RecipeItem} />
          <Stack.Screen name="Recipe" component={Recipe} options={{ title: 'Recipe',  headerTitleStyle: styles.text }}/>
        </Stack.Navigator>

      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#4d4dff',
    fontFamily: 'Menlo-Regular',
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
});

export default App;