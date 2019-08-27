
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import utilities from '../functions/utils'
import AwesomeButton from 'react-native-really-awesome-button/src/themes/c137'
let screenDimentions = Dimensions.get('window')
const getStatusBarHeight = 20

export default class StoreBrowser extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        keys: [],
        globalLanguageSettingFromJson: [],
        lastChangedDiffs: [],
        testObject: [],
        answersHra: [],
        loading: false,
        testStoreInState: false,
        checkIfStepsCountIsStored: false,
        stepsCount: [],
      };
  
      //Take store functions from utilities and bind
      this.CheckIfKeyInStore = utilities.CheckIfKeyInStore.bind(this)
      this.getFromStoreAndSetInSate = utilities.getFromStoreAndSetInSate.bind(this)
  
    }
  
    async componentDidMount(){

        await this.CheckIfKeyInStore('stepsCount', 'checkIfStepsCountIsStored').then( async () => {
            if (this.state.checkIfStepsCountIsStored[0] == true ) {
                await this.getFromStoreAndSetInSate('stepsCount').then(()=>{
                })
            }
        })
        
        utilities.fetchAllKeysAndValues()
    }

    renderStepsCount() {
        if (this.state.checkIfStepsCountIsStored[0] == true) {
            return this.state.stepsCount[0].map((item, index) => {
                return <Text id={ index }>{ item.value  }</Text>
            })
        }
    }

    removeFromStore() {
        utilities.clearAsyncStorage()
    }

    removeFromStoreByKey(key) {
        utilities.removeItemFromAsyncStorage(key)
    }

    render() {
        return (
          <View>
                <AwesomeButton style={styles.AwesomeButton} onPress={ () => this.removeFromStore() } 
                >remove all from locaStorage 
                </AwesomeButton>
                <AwesomeButton style={styles.AwesomeButton} onPress={ () => this.removeFromStoreByKey('dashBoardVars') } 
                >remove dashBoardVars from locaStorage 
                </AwesomeButton>
            {/* { this.renderStepsCount() } */}
          </View>
        );
    }
    
}

const styles = StyleSheet.create({
    AwesomeButton: {
        left: (screenDimentions.width / 2) -90,
        top: 90 + getStatusBarHeight * 2,
    
      }
})