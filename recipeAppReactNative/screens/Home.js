import React from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import RecipeItem from '../components/RecipeItem';
import { recipeService } from '../services/RecipeService';
import * as Constants from '../constants/Constants';
import { LinearGradient } from 'expo-linear-gradient';
import _ from 'lodash';

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { recipes: Array, isLoading: true, searchFilter: '', filteredRecipeList: Array };
    this.userId = Constants.userId;
    this.recipe = { userId: this.userId, ingredients: [{ name: '', amount: '', optional: false }], instructions: [''] };
  }

  updateSearch = (search) => {
      const recipes = this.state.recipes;
      if (search) {
        const filteredRecipes = 
          _.filter(recipes,function(item){
            return item.name.toLowerCase().indexOf(search.toLowerCase())>-1;
            });
 
        this.setState({isLoading: false, searchFilter: search, filteredRecipeList: filteredRecipes});
      } else {
        this.setState({isLoading: false, searchFilter: search, filteredRecipeList: recipes});
      }
  }

  fetchRecipes() {
    recipeService.fetchRecipes(this.userId)
      .then(data => this.setState({ recipes: data, isLoading: false, filteredRecipeList: data }));
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.fetchRecipes();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.fetchRecipes();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    const { recipes, isLoading, searchFilter, filteredRecipeList } = this.state;
    const filteredRecipes = recipes;
    const recipe = this.recipe;
    if (isLoading) {
      return (<Text>{'Loading...!'}</Text>)
    }
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#E0EAFC', '#CFDEF3']}
          style={styles.background}>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('RecipeForm', { Recipe: { recipe }, isEdit: false, });
          }
          } style={styles.button}>
            <Text style={styles.buttonText}>Create New</Text>
          </TouchableOpacity>
          <SearchBar
        placeholder="Search"
        lightTheme="true"
        round="true"
        onChangeText={this.updateSearch}
        value={searchFilter}
        />
          <FlatList data={filteredRecipeList}
            renderItem={({ item, index }) => (
              <RecipeItem name={item.name} date={item.date.substring(0, 10)} recipe={item} navigation={this.props.navigation} />
            )} />
        </LinearGradient>

      </View>
    )
  };
}

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1000,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'Menlo-Regular',
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  button: {
    elevation: 8,
    backgroundColor: "#b3b3ff",
    borderRadius: 10,
    borderWidth:2,
    borderColor:'#9999ff',
    width: 150,
    marginBottom: 15,
    marginTop: 15,
    marginLeft: 135,
    paddingVertical: 8,
    paddingHorizontal: 1
  },
  container: {
    flex: 1
  }
});