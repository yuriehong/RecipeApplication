import React, { setState, Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default function FormInputList({onChangeText, value}) {

  console.log("value is "+ value);
    if (value) {
      let test = Object.entries(value).map(([index, text]) => {
        console.log("index is "+ index);
        return (
          <input key={index} name={index} placeholder={index} value={text} onChange={onChangeText} />

        );
      });
      return (
  
          <View>
              <Text>hi</Text>
              <FlatList
            style={{flex:1}}
            data={value}
            renderItem={({item, index}) => {
                return (
                    <View
                    // style={{
                    //   height: 100,
                    //   backgroundColor: '#F0F0F0',
                    //   width: 300,
                    //   alignSelf: 'center',
                    //   margin: 10,
                    // }}
                  >
                    <TextInput
                      style={{
                        flex: 1,
                        backgroundColor: '#C0C0C0',
                      }}
                      onChangeText={text => onChangeText(text)}
                      value={value[index]}
                    />
                  </View>
                )}}
                />
              <form>{test}</form>
      </View> )
              
      }
      return (
  
        <View>
            <Text>hi</Text>
            </View>
            )
    }
   
            /*{ <FlatList
            style={{flex:1}}
            data={value}
            renderItem={({item, index}) => {
                return (
                    <View
                    // style={{
                    //   height: 100,
                    //   backgroundColor: '#F0F0F0',
                    //   width: 300,
                    //   alignSelf: 'center',
                    //   margin: 10,
                    // }}
                  >
                    <TextInput
                      style={{
                        flex: 1,
                        backgroundColor: '#C0C0C0',
                      }}
                      onChangeText={text => onChangeText(text, index)}
                      value={value[index]}
                    />
                  </View>
                );
              }}
            /> } */
  
