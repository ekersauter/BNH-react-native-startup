import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {Actions, ActionConst} from 'react-native-router-flux';
import utilities from '../functions/utils'
import AwesomeButton from 'react-native-really-awesome-button/src/themes/c137';

import RadioButtonTool from '../tools/radioButtonsTool'
import jsonSetup from '../data/globalSetup.json'
const globalSetupLanguage = jsonSetup[0]['globalSetupLanguage']
const availableLanguageOptions =jsonSetup[0]['availableLanguageOptions']
console.log('TCL: availableLanguageOptions', availableLanguageOptions.options);
const ios_blue = '#007AFF'


export default class userLanguageSetting extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            GlobalSettings: [],
            checkIfHraIsStored: false,
            showAlert: false,
            alertTitle:'',
            alertMessage: [],
            cancelText:'',
            confirmText:'',
            nextButtonLabel: 'CONFIRM',
            getCurrentQuestion: 'saveLanguageSetting',
            value: globalSetupLanguage,
        }
    }

    
    showAlert = () => {
        this.setState({
          showAlert: true
        })
      }
     
    hideAlert = () => {
        this.setState({
            showAlert: false
        })
    }


    render(){

        return  <View style={styles.container}>
                    <Text> { this.state.LastLanguage } </Text>
                    
                    <AwesomeButton style={{ margin:6 }} onPress={ () => this.showAlert() } > Selecteer </AwesomeButton>

                </View>    
    }
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      // backgroundColor: 'white',
      marginTop:20,
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 20,
      alignItems: 'center',
      justifyContent: 'center',
      },
    
      textInput: { 
        height: '60%',
        width: 460,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor:'white',
        padding: 4,
        marginTop: 10,
        borderRadius: 5,
      },
  
      button: {
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 5,
        backgroundColor: "#3b475b",
      },
      
      text: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        
      }
  
    })