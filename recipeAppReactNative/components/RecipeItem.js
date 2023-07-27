import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

export default function RecipeItem({ navigation, name, date, recipe }) {
    // parsing out time
    date = date.substring(0,10);
    recipe.date = date;
    return (
        <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() =>
                navigation.navigate('Recipe', { recipe: recipe })
            }>
                    <Text style={styles.name}>
                        {name}
                    </Text>
                    <Text style={styles.date}>
                        {date}
                    </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#ccc",
        padding: 15
    },

    date: {
        marginTop: 5,
        fontFamily: 'Menlo-Regular',
        fontSize: 15,
        lineHeight: 21,
        color: '#708090',
        textAlign: "right",
        marginRight: 10
    },

    name: {
        marginTop: 5,
        fontFamily: 'Menlo-Regular',
        fontSize: 19,
        textAlign: "center",
        lineHeight: 21,
        color: '#708090'
    },
    button: {
        padding: 15, 
        alignItems: 'center', 
        borderRadius: 15,
        fontSize: 18,
        backgroundColor: '#ffffff',
        borderWidth:2,
        borderColor:'#9999ff'
    }
});