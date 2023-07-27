import React, { useState } from 'react'
import { StyleSheet, View, Button, TouchableOpacity, TextInput, Text, Modal } from 'react-native';
import { Formik, FieldArray } from 'formik';
import { recipeService } from '../services/RecipeService';
import { LinearGradient } from 'expo-linear-gradient';

export default function RecipeForm({ route, navigation }) {
    const [showAlert, setShowAlert] = useState(false);
    const { recipe } = route.params.Recipe;
    const isEdit = route.params.isEdit;
    const userId = recipe.userId;
    const instructions = recipe.instructions;
    const ingredients = recipe.ingredients;
    const name = recipe.name;
    const summary = recipe.summary;
    const id = recipe.id;
    const validate = (values) => {
        let errors = {};
        if (!values.name) {
            errors.name = "Cannot be blank";
        }
        if (values.instructions[0] === '') {
            errors.instructions = "Must have at least 1 instruction";
        }
        if (values.ingredients[0].name === '' || values.ingredients[0].amount === '') {
            errors.ingredients = "Must have at least 1 ingredient";
        }
        return errors;
    };

    function validateDelete(arrayToValidate, arrayHelpers, index) {
        // checking if > 1 as we already have initialized so current length is 1
        if (arrayToValidate.length > 1) {
            arrayHelpers.remove(index)
        }
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                //'#e1d9ff', '#cbbdff'
                colors={['#E0EAFC', '#CFDEF3']}
                style={styles.background}>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={showAlert}
                    onRequestClose={
                        () => setShowAlert(!showAlert)
                    }>
                    <View style={styles.modalView}>
                        <Text style={styles.baseText}>Recipe saved!</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Home', { navigation })} style={styles.appButtonHomeContainer}>
                            <Text style={styles.modalButtonText}>Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowAlert(!showAlert)} style={styles.appButtonContainer}>
                            <Text style={styles.modalButtonText}>New Recipe</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Formik
                    initialValues={{ id: id, userId: userId, name: name, summary: summary, instructions: instructions, ingredients: ingredients }}
                    validate={validate}
                    onSubmit={(values, actions) => {
                        if (isEdit) {
                            recipeService.updateRecipe(values, id).then(
                                (response) => {
                                    setShowAlert(true);
                                }
                            )
                                .catch((error) => {
                                    console.log(error);
                                });
                        } else {
                            recipeService.createRecipe(values).then(
                                (response) => {
                                    setShowAlert(true);
                                    actions.resetForm({});
                                }
                            )
                                .catch((error) => {
                                    console.log(error);
                                });
                        }
                    }}
                >{({ values, errors, handleChange, handleSubmit }) => (
                    <View>
                        <TextInput
                            style={styles.name}
                            value={values.name}
                            onChangeText={handleChange('name')}
                            placeholder="Name"
                        />
                        {errors.name ? <Text style={styles.error} >{errors.name}</Text> : null}
                        <TextInput
                            style={styles.summary}
                            value={values.summary}
                            multiline
                            onChangeText={handleChange('summary')}
                            placeholder="Summary"
                        />
                        <View style={styles.row}>

                            <FieldArray
                                name="ingredients"
                                render={arrayHelpers => (
                                    <View>
                                        {values.ingredients.map((item, index) => (
                                            <View style={styles.row} key={index}>
                                                <TextInput
                                                    style={styles.ingredientName}
                                                    value={item.name}
                                                    onChangeText={handleChange(`ingredients.${index}.name`)}
                                                    placeholder="Ingredient Name"
                                                />
                                                <TextInput
                                                    style={styles.ingredientAmount}
                                                    value={item.amount}
                                                    onChangeText={handleChange(`ingredients.${index}.amount`)}
                                                    placeholder="Amount"
                                                />
                                                <TouchableOpacity
                                                    onPress={() => arrayHelpers.insert(index+1, { name: '', amount: '', optional: false })}
                                                >
                                                    <Text style={styles.buttonAdd}>+</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => validateDelete(values.ingredients, arrayHelpers, index)}
                                                >
                                                    <Text style={styles.buttonX}>x</Text>
                                                </TouchableOpacity>
                                            </View>

                                        ))}

                                    </View>
                                )}
                            />
                        </View>
                        <View>
                            {errors.ingredients ? <Text style={styles.error} >{errors.ingredients}</Text> : null}
                        </View>
                        <FieldArray
                            name="instructions"
                            render={arrayHelpers => (
                                <View>
                                    {values.instructions.map((item, index) => (
                                        <View style={styles.row} key={index}>
                                            <TextInput
                                                style={styles.instruction}
                                                value={item}
                                                onChangeText={handleChange(`instructions.${index}`)}
                                                placeholder="Instruction"
                                            />
                                            <TouchableOpacity
                                                onPress={() => arrayHelpers.insert(index+1, '')}
                                            >
                                                <Text style={styles.buttonAdd}>+</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => validateDelete(values.instructions, arrayHelpers, index)}
                                            >
                                                <Text style={styles.buttonX}>x</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))}

                                </View>
                            )}
                        />
                        <View>
                            {errors.instructions ? <Text style={styles.error} >{errors.instructions}</Text> : null}
                        </View>
                        <TouchableOpacity onPress={handleSubmit} style={styles.appButtonContainerSubmit}>
                            <Text style={styles.modalButtonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                )}
                </Formik>
            </LinearGradient>

        </View>
    )
}

const styles = StyleSheet.create({
    appButtonContainerSubmit: {
        elevation: 8,
        backgroundColor: "#b3b3ff",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#9999ff',
        width: 150,
        marginBottom: 15,
        marginTop: 15,
        marginLeft: 135,
        paddingVertical: 8,
        paddingHorizontal: 1
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#b3b3ff",
        borderRadius: 10,
        borderWidth:2,
        borderColor:'#9999ff',
        width: 150,
        marginBottom: 15,
        paddingVertical: 8,
        paddingHorizontal: 12
    },
    appButtonHomeContainer: {
        elevation: 8,
        backgroundColor: "#99b3ff",
        borderRadius: 10,
        borderWidth:2,
        borderColor:'#9999ff',
        borderRadius: 10,
        width: 150,
        marginBottom: 15,
        paddingVertical: 8,
        paddingHorizontal: 12
    },
    baseText: {
        fontSize: 20,
        marginBottom: 100,
        fontFamily: 'Menlo-Regular',
        marginTop: 100,
        fontWeight: "bold",
        color: "#6b6d70"
    },
    buttonAdd: {
        fontSize: 28,
        height: 27,
        marginTop: 21,
        marginLeft: 10,
        color: "#b066ff",
        fontFamily: 'Menlo-Bold',
    },
    buttonX: {
        fontSize: 22,
        height: 40,
        marginTop: 24,
        marginLeft: 11,
        color: "#ff0000",
        fontFamily: 'Menlo-Bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    container: {
        flex: 1,
        backgroundColor: '#ccddff'
    },
    date: {
        color: 'black',
        textAlign: 'right',
        fontSize: 13
    },
    error: {
        fontSize: 14,
        marginLeft: 13,
        marginTop: 1,
        color: "#e60000",
        fontFamily: 'Menlo-Regular'
    },
    name: {
        marginTop: 20,
        width: 400,
        height: 40,
        marginLeft: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        fontFamily: 'Menlo-Regular'
    },
    summary: {
        marginTop: 20,
        width: 400,
        height: 60,
        marginLeft: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        fontFamily: 'Menlo-Regular'
    },
    instruction: {
        marginTop: 20,
        width: 343,
        height: 40,
        marginLeft: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        fontFamily: 'Menlo-Regular',
        backgroundColor: '#ffffff',
    },
    ingredientName: {
        marginTop: 20,
        width: 233,
        height: 40,
        marginLeft: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        fontFamily: 'Menlo-Regular',
        backgroundColor: '#ffffff',
    },
    ingredientAmount: {
        marginTop: 20,
        width: 100,
        height: 40,
        marginLeft: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        fontFamily: 'Menlo-Regular',
        backgroundColor: '#ffffff',
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
        alignSelf: "center",
        textTransform: "uppercase",
        fontFamily: 'Menlo-Regular'
    },
    row: {
        flexDirection: "row",
        flexWrap: "nowrap",
    }
});