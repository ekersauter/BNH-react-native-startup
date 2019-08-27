import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import utilities from '../functions/utils'
import AwesomeButton from 'react-native-really-awesome-button/src/themes/c137';
import { Actions } from 'react-native-router-flux';
import jsonData from '../data/steps/content.json'
import config from '../data/steps/Settings.json'
import ResponsiveImage from 'react-native-responsive-image'
import NumericInputTool from '../tools/numberInputTool'


let screenDimentions = Dimensions.get('window')

export default class PedometerSensor extends React.Component {
  constructor(props) {      
      super(props);
      this.state = {
      isPedometerAvailable: "checking",
      pastStepCount: 0,
      currentStepCount: 0,
      NumberOfXDaysInPast: 5,
      stepsMapping: [0, 1, 2, 3, 4, 5, 6],
      stepDataArray: [],
      stepsStoreKey: 'stepsCount',
      value: 0,
      StoredStepsGoal: [],
      checkIfStepsGoalIsStored: false,
      isVisible: false,
      data: jsonData,
      StoredLanguageSetting: [],
      checkIfLanguageSettingIsStored: false,
      languageSetting: '',
      introHeaderText: '',
      introBodyText: '',
      outroHeaderText: '',
      outroBodyText: '',
      startButtonLabel: '',
      nextButtonLabel: '',
      backButtonLabel: '',
    };

  this.CheckIfKeyInStore = utilities.CheckIfKeyInStore.bind(this)
  this.getFromStoreAndSetInSate = utilities.getFromStoreAndSetInSate.bind(this)

  }

  getSteps(NumberOfXDaysInPast){
    let start = new Date()
    let end = new Date()
    if (NumberOfXDaysInPast>0) {
      end.setDate(end.getDate() - NumberOfXDaysInPast )
    }
    end.setHours(0,0,0,0)
    start.setDate(start.getDate() - (NumberOfXDaysInPast + 1) )
    start.setHours(0,0,0,0)
    tempStepsArray = []
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        tempStepsArray.push({start: start, end: end, value:result.steps})
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
    this.setState({ stepDataArray: tempStepsArray }, async () => {
      // await AsyncStorage.setItem('steps', result.steps);
      // sendStepsToFirebase(result.steps);
  });
    utilities.pushToStore(this.state.stepsStoreKey, tempStepsArray)
		
  }

  async componentDidMount() {

    await this.CheckIfKeyInStore('StoredLanguageSetting', 'checkIfLanguageSettingIsStored').then( async () => {
      if (this.state.checkIfLanguageSettingIsStored[0] == true ) {
          await this.getFromStoreAndSetInSate('StoredLanguageSetting').then(()=>{
            let languageSetting = utilities.getPropertyValueOfLastObjectInArray(this.state.StoredLanguageSetting, 'value')
            this.setState({ 
              languageSetting: languageSetting.substring(0,2),
              introHeaderText: config['settings']['intro']['headerText'][languageSetting.substring(0,2)],
              introBodyText: config['settings']['intro']['text'][languageSetting.substring(0,2)],
              outroHeaderText: config['settings']['outro']['headerText'][languageSetting.substring(0,2)],
              outroBodyText: config['settings']['outro']['text'][languageSetting.substring(0,2)],
              startButtonLabel: config['settings']['startButtonLabel'][languageSetting.substring(0,2)],
              nextButtonLabel: config['settings']['nextButtonLabel'][languageSetting.substring(0,2)],
              backButtonLabel: config['settings']['backButtonLabel'][languageSetting.substring(0,2)],
            })
        }).done()
      }
    })
    //StoredStepsGoal is save tot store as array of object containing datetime and value
    await this.CheckIfKeyInStore('StoredStepsGoal', 'checkIfStepsGoalIsStored').then( async () => {

      if (this.state.checkIfStepsGoalIsStored[0] == true ) {
          await this.getFromStoreAndSetInSate('StoredStepsGoal').then(()=>{
            let Goal = utilities.getPropertyValueOfLastObjectInArray(this.state.StoredStepsGoal, 'value')
            this.setState({ value: Goal })
        }).done()
        
      }
  })

    this._subscribe()
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    // this._subscription = Pedometer.watchStepCount(result => {
    //   this.setState({
    //     currentStepCount: result.steps
    //   });
    // });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
        this.state.stepsMapping.map((item)=>{
          this.getSteps(item)
        })
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );
  }

  _unsubscribe = () => {
    
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };
q
  renderStepGoalInput(){
    
    let stepData = this.state.data[0]
    
    if (this.state.checkIfStepsGoalIsStored[0] == true) {
      this.state.StoredStepsGoal.map((item) => { 
          if (item.id == stepData.docId) { 
            stepData.storedValue = item.value 
          }
      }) 
    }

    if (this.state.data[0].type == 'numberInput') {
      let ls =  [this.state.languageSetting]     

      headerImgCheck = stepData.headerImg.length
          if (headerImgCheck>0) {
              var showHeaderImg = true
          } else {
              var showHeaderImg = false
          }
          
      return <View>
              <Text style={styles.barHeader}> 
                {   
                    String(this.state.data[0].textStart[ls] + 
                      stepData.initValue +  
                    this.state.data[0].textEnd[ls]).toUpperCase() 
                } 
              </Text>
      
              <NumericInputTool
                keyboardType={'numeric'}
                storeKey='StoredStepsGoal'
                docId={stepData.docId}
                storedValue={this.state.value}
                headerImg={stepData.headerImg}
                headerImgShow={true}
                initValue={stepData.initValue}
                headerText={stepData.headerText[ls]}
                text={stepData.text[ls]}
                totalHeight={stepData.totalHeight}
                minValue={stepData.minValue}
                maxValue={stepData.maxValue}
                step={stepData.step}
                nextButtonLabel={this.state.nextButtonLabel}
                headerImgVisible={showHeaderImg}
                sendCurrentQuestion={ () => Actions.StepsDashBoardKey() }
              />
            </View> 
    }
  } 


  render() {
    
    return (
      <View style={ styles.container }>

        <ResponsiveImage 
          source={{ uri: config['settings']['headerImg'] }} 
          initWidth='200' 
          initHeight='300'
          style={{ marginBottom: 20 }}
          resizeMode = 'cover'
          />

        { this.renderStepGoalInput() }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  AwesomeButton: {
    marginTop: 12,
},
textInput: { 
  height: 40,
  width: 190,
  borderColor: '#ccc',
  borderWidth: 1,
  backgroundColor:'white',
  textAlign: 'center',
  marginTop: 10,
  borderRadius: 20,
  // textAlign: 'center',
  color: '#000',
  fontSize: 12
},barHeader: {
  marginTop: 14,
  fontSize: 8,
  textAlign: 'center',
  color: 'black',
},
});

Expo.registerRootComponent(PedometerSensor);
