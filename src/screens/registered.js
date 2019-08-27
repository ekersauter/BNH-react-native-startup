'use strict';
import React from 'react';
import { Keyboard, FlatList, ActivityIndicator, Text, View, TextInput,Button,StyleSheet,TouchableOpacity, ImageBackground  } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button/src/themes/c137';
import AwesomeAlert from 'react-native-awesome-alerts';
import {Actions, ActionConst} from 'react-native-router-flux';

import Bedrijven from '../data/bedrijfsCode.json';
/* https://medium.com/reactnative/tabbing-through-input-fields-ef283f923ab1
   And for KeyboardAvoidongView:
    https://github.com/APSL/react-native-keyboard-aware-scroll-view
*/

export default class registered extends React.Component {

    render() {
        return (
            <View style={styles.container}>
              <Text style={styles.welcome}>
                Let's start!
              </Text>
              <ImageBackground 
                style={{
                    flex: 1,
                    alignSelf: 'center',
                    width: '100%',
                    justifyContent: 'space-around',
                  }}
                source={require('../images/stress-visual_orig.png')} 
                resizeMode="contain"
                >
                </ImageBackground>  
                <View style={styles.textbox}>
                  <TouchableOpacity onPress={() => {
                        Keyboard.dismiss();
                        }}>
                        <View style={styles.button}>
                          <Text style={styles.text} onPress={()=> {Actions.hraQuestionsKey();}}>START HRA</Text>
                        </View>
                      </TouchableOpacity>
                  </View>
            </View>
            
        );
      }
}
const styles = StyleSheet.create({

    caption: {
      fontSize: 20,
      fontWeight: 'bold',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    button: {
        marginTop: 10,
        marginBottom: 30,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 5,
        backgroundColor: "#3b475b",
      }
  });