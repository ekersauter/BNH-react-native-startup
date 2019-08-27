import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground,Dimensions } from 'react-native';
// import { getStatusBarHeight } from 'react-native-status-bar-height';

import utilities from '../functions/utils'
import AwesomeButton from 'react-native-really-awesome-button/src/themes/c137';
import {Actions, ActionConst} from 'react-native-router-flux';
import globalSetup from '../data/globalSetup.json'
import homePageText from '../data/start/startViewTexts'

const globalLanguageSetting = globalSetup[0]['globalSetupLanguage']

let screenDimentions = Dimensions.get('window')
console.log('TCL: Dimensions.get(\'window\')', screenDimentions);
// console.log('getStatusBarHeight: ', getStatusBarHeight());

const getStatusBarHeight = 20

export default class HomePageScreen  extends Component {

  constructor(props){
    super(props);
    this.state ={ 
      checkIfIsRegistred: false,
      registred: [],
      StoredLanguageSetting: [],
      checkIfLanguageSettingIsStored: false,
      answersHra: [],
      checkIfHraIsStored: false,
      }
    this.CheckIfKeyInStore = utilities.CheckIfKeyInStore.bind(this)
    this.getFromStoreAndSetInSate = utilities.getFromStoreAndSetInSate.bind(this)
  }

  async componentDidMount(){
    await this.CheckIfKeyInStore('registred', 'checkIfIsRegistred').then( async () => {
        if (this.state.checkIfIsRegistred[0] == true ) {
          this.getFromStoreAndSetInSate('registred') 
        }
    }).done()
    await this.CheckIfKeyInStore('StoredLanguageSetting', 'checkIfLanguageSettingIsStored').then( async () => {
      if (this.state.checkIfLanguageSettingIsStored[0] == true ) {
          await this.getFromStoreAndSetInSate('StoredLanguageSetting').then(()=>{
            let languageSetting = utilities.getPropertyValueOfLastObjectInArray(this.state.StoredLanguageSetting, 'value')
            this.setState({ languageSetting: languageSetting.substring(0,2) })
        }).done()
      }
    })

    // utilities.removeItemFromAsyncStorage('answersHra')
    await this.CheckIfKeyInStore('answersHra', 'checkIfHraIsStored').then( async () => {
      if (this.state.checkIfHraIsStored[0] == true ) {
          await this.getFromStoreAndSetInSate('answersHra').then(()=>{
          })
      }
  })

  }

  showActionButtons() {
    if (this.state.checkIfLanguageSettingIsStored[0] == false) {
      return ( 
          <AwesomeButton style={styles.AwesomeButton} onPress={ () => Actions.userLanguageKey() } >
            Set Language
          </AwesomeButton>
      )
    } 
    if (this.state.checkIfIsRegistred[0] == false) {
      return ( 
          <AwesomeButton style={styles.AwesomeButton} onPress={ () => Actions.registerKey() } >
            register
          </AwesomeButton>
      )
    } 
    if (this.state.checkIfHraIsStored[0] == false) {
      return ( 
          <AwesomeButton style={styles.AwesomeButton} onPress={ () => Actions.hraQuestionsKey() } >
            Start profiling
          </AwesomeButton>
      )
    }

    if (this.state.checkIfHraIsStored[0] === true) {
      return ( 
          <AwesomeButton style={styles.AwesomeButton} onPress={ () => Actions.dashBoardVarsKey() } >
            Start Dashboard 
          </AwesomeButton>
      )
    }

  }


  render() {
    return (
        <View style={styles.container}>
          <ImageBackground 
            resizeMode="cover"
            style={styles.imageBackground} source={require('../images/assertief.png')}>
          
            { this.showActionButtons() }
          
            <Image style={styles.vitaly} source={require('../images/Vitaly.png')} />
          </ImageBackground>
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
    bottom: 0,
    flex: 1,
    height: '130%',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
  },
  imageBackground: {
    flex: 1,
    height: null,
    width: null,
  },
  welcome: {
    textAlignVertical: 'top',
    fontSize: 20,
    textAlign: 'center',
    padding: 20,
    lineHeight: 24,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  AwesomeButton: {
    left: (screenDimentions.width / 2) -90,
    top: 90 + getStatusBarHeight * 2,
  },
  buttonText: {
      color: '#fff',
      fontSize: 15,
      textAlign: 'center'
  },
  vitaly: {
    height: 80,
    width: 80,
    position: 'absolute',
    left: screenDimentions.width -80 -35,
    top: 40 + getStatusBarHeight * 2,

  }
});