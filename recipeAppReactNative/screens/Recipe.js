import { View, StyleSheet, Text, FlatList, TouchableOpacity, Modal } from 'react-native';
import { Tile, Card, ListItem, Badge } from 'react-native-elements';
import React, { useState } from 'react';
import { recipeService } from '../services/RecipeService';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Recipe({ route, navigation }) {
  const { recipe } = route.params;
  const [showAlert, setShowAlert] = useState(false);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={showDeletePrompt}
        onRequestClose={
          () => setShowDeletePrompt(!showDeletePrompt)
        }>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Are you sure you want to delete this recipe?</Text>
          <TouchableOpacity onPress={() => {
            recipeService.deleteRecipe(recipe.id)
              .then(() => {
                setShowDeletePrompt(!showDeletePrompt);
                setShowAlert(!showAlert);
              })
              .catch((error) => {
                console.log(error);
              });
          }} style={styles.appButtonDeleteModal}>
            <Text style={styles.modalButtonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowDeletePrompt(!showDeletePrompt)} style={styles.appButtonHomeContainer}>
            <Text style={styles.modalButtonText}>Never Mind!</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={showAlert}
        onRequestClose={
          () => setShowAlert(!showAlert)
        }>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Recipe Deleted!</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home', { navigation })} style={styles.appButtonHomeContainer}>
            <Text style={styles.modalButtonText}>Home</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.row}>
        <TouchableOpacity style={styles.appButtonEdit} onPress={() => {
          navigation.navigate('RecipeForm', { Recipe: {recipe}, isEdit:true });
        }}>
          <Icon 
            name="pencil"
            size={20}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.appButtonDelete} onPress={() => {
          setShowDeletePrompt(!showDeletePrompt);
        }}>
          <Icon
            name="trash-o"
            size={20}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <Tile
        height={230}
        imageSrc={require('../images/img3.jpg')}
        featured
        caption={
          <View>
          <View style={styles.inputWrap}>
            <Text style={styles.date}>
              {recipe.date}
            </Text>
          </View>
          <Text style={styles.name}>
            {recipe.name}
          </Text>
          <Text style={styles.baseText}>
            {recipe.summary}
          </Text>
        </View>
        }
      />
      <Card>
        <Card.Title style={styles.baseText}>Ingredients</Card.Title>
        <FlatList
          contentContainerStyle={styles.ingredientsStyles}
          data={recipe.ingredients}
          keyExtractor={item => item.name}
          renderItem={({ item, index }) => (
            <ListItem>
              <Badge
                value={item.amount}
                badgeStyle={{backgroundColor: '#9999ff'}}
                textStyle={styles.innerText}
                containerStyle={{ marginLeft: 20 }}
              />
              <ListItem.Title style={styles.baseText}>
                {item.name}
              </ListItem.Title>
            </ListItem>
          )}
        />
      </Card>
      <Card>
        <Card.Title style={styles.baseText}>Instructions</Card.Title>
        <FlatList
          keyExtractor={({ item, index }) => index.toString()}
          contentContainerStyle={styles.instructionsStyles}
          data={recipe.instructions}
          renderItem={({ item, index }) => (
            <ListItem>
              <ListItem.Title style={styles.baseText}>
                {`${index + 1}. ${item}`}
              </ListItem.Title>
            </ListItem>
          )}
        />
      </Card>

    </View>
  );
}

const styles = StyleSheet.create({
  appButtonHomeContainer: {
    elevation: 8,
    backgroundColor: "#b3b3ff",
    borderRadius: 10,
    width: 150,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth:2,
    borderColor:'#9999ff',
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  appButtonDeleteModal: {
    elevation: 8,
    backgroundColor: "#ecb3ff",
    borderRadius: 10,
    width: 150,
    borderRadius: 10,
    borderWidth:2,
    borderColor:'#9999ff',
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  appButtonDelete: {
    elevation: 8,
    backgroundColor: '#9999ff',
    borderRadius: 10,
    width: 41,
    height: 38,
    marginLeft: 2,
    marginTop: 5,
    marginBottom: 5,
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  appButtonEdit: {
    elevation: 8,
    backgroundColor: '#9999ff',
    borderRadius: 10,
    width: 41,
    height: 38,
    marginLeft: 325,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  baseText: {
    fontSize: 15,
    fontFamily: 'Menlo-Regular',
    marginBottom: 10,
    alignItems: 'center',
    textAlign: "center"
  },
  date: {
    color: 'black',
    textAlign: 'right',
    fontFamily: 'Menlo-Regular',
    fontSize: 13
  },
  innerText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Menlo-Regular',
    justifyContent: 'space-between'
  },
  ingredientsStyles: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  inputWrap: {
    width: 330
  },
  name: {
    color: 'black',
    fontFamily: 'Menlo-Regular',
    textAlign: "center",
    fontSize: 19,
    marginBottom:30
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap"
},
  instructionsStyles: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  modalView: {
    flex: 1,
    alignItems: "center",
    marginTop: 200,
    marginBottom: 300,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#e6e6ff',
    margin: 40,
    borderRadius: 30,
    padding: 40
  },
  modalButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    fontFamily: 'Menlo-Regular',
    alignSelf: "center",
    textTransform: "uppercase"
  },
  modalText: {
    fontSize: 20,
    marginBottom: 100,
    marginTop: 100,
    fontWeight: "bold",
    fontFamily: 'Menlo-Regular',
    textAlign: "center",
    color: "#6b6d70"
  }
});