import React from 'react'
import { Input } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function FormInput({
    iconName,
    iconColor,
    returnKeyType,
    keyboardType,
    name,
    placeholder,
    value,
    multiline,
    numberOfLines,
    label,
    ...rest
}) {
    return (
        <View style={styles.inputContainer}>
            <Input
                {...rest}
                leftIcon={<Ionicons name={iconName} size={28} color={iconColor} />}
                leftIconContainerStyle={styles.iconStyle}
                placeholderTextColor="grey"
                name={name}
                multiline={multiline}
                numberOfLines={numberOfLines}
                value={value}
                placeholder={placeholder}
                label={label}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        margin: 15
    },
    iconStyle: {
        marginRight: 10
    }
})
