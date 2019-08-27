import React, { Component } from 'react'
import sort from 'immutable-sort'
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import ResponsiveImage from 'react-native-responsive-image'
import utilities from '../functions/utils'
import jsonData from '../data/dashboard/content.json'
import config from '../data/dashboard/Settings.json'
import TextInputSetup from '../setups/textinputsetup'


export default class App extends Component {

  constructor(props) {      
    super(props);
    this.state = {
        checkIfdashboardVarsIsStored: false,
        introIsVisible: true,
        outroIsVisible: false,
        headerImgVisible: false,
        data: jsonData,
        introHeaderText: '',
        introBodyText: '',
        outroHeaderText: '',
        outroBodyText: '',
        startButtonLabel: '',
        nextButtonLabel: '',
        backButtonLabel: '',
        dashBoardVars:[],
        StoredLanguageSetting: [],
        checkIfLanguageSettingIsStored: false,
        languageSetting: '',
        dashBoardVar1: false,
        dashBoardVar2: false,
        dashBoardVar3: false,    
    };

    this.CheckIfKeyInStore = utilities.CheckIfKeyInStore.bind(this)
    this.getFromStoreAndSetInSate = utilities.getFromStoreAndSetInSate.bind(this)

  }

  async componentDidMount() {
    // Check for stored data and set in this.state is done right after component mounting

    // utilities.removeItemFromAsyncStorage('answersHra')
    await this.CheckIfKeyInStore('dashBoardVars', 'checkIfdashboardVarsIsStored').then( async () => {
        if (this.state.checkIfdashboardVarsIsStored[0] == true ) {
            await this.getFromStoreAndSetInSate('dashBoardVars').then(()=>{
            })
        }
    })

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
  }

  getValuesToShow(){
    if ((this.state.checkIfdashboardVarsIsStored[0] == true) && (this.state.dashBoardVars.length > 0)) {
      
      let savedIds = utilities.getDistinctValues(this.state.dashBoardVars[0], 'id')
      let savedIdsCounted = utilities.countInArray(savedIds)
      // Getting all the values tied to the keys that are stored once or several times and push the values
      // to each saved key in a fresh created sortedValues object  
      let sortedValues = {}
      Object.keys(savedIdsCounted).map((key) => {
        sortedValues[key] = []
        this.state.dashBoardVars[0].map((item) => { 
          if (item.id == key) {
            sortedValues[key].push(item.value)
          }      
        }) 
      })

      // For the average is calculated for each key and 
      const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length
      let averageValues = {}
      Object.keys(savedIdsCounted).map((key) => {
        averageValues[key] = average(sortedValues[key])
      })

      // For the calculating the percentage
      let PercentageValues = {}
      Object.keys(averageValues).map((key) => {
        PercentageValues[key] = averageValues[key]*10
      })

      // let sum = Object.keys(averageValues).reduce((s,k) => s += averageValues[k], 0)
      // let PercentageValues = Object.keys(averageValues).map(k => ({[k] : (averageValues[k]/sum * 100).toFixed(2)}))

      let pic = {
        'pic0': 'http://www.pngall.com/wp-content/uploads/2016/06/Bart-Simpson-PNG-180x180.png',
        'pic1': 'http://www.pngall.com/wp-content/uploads/2016/06/Bart-Simpson-Free-Download-PNG.png',
        'pic2': 'http://www.pngall.com/wp-content/uploads/2016/06/Bart-Simpson-PNG-Image-180x180.png'
      }

      getObjectValuaByKey = (dataKey, textKey) => {
        return this.state.data.map((item) => {
          if (item.docId == dataKey) {
            return item[textKey][this.state.languageSetting]
          }
        })
      }
      
      getTimesOfInput = (index, key, dataKey) => {
        return this.state.data[index][dataKey][this.state.languageSetting] + ': ' + savedIdsCounted[key]
      }

      return sort(Object.keys(PercentageValues)).map((key, index) => {
              var percentage = Math.ceil(PercentageValues[key])
              var picSource = 'pic1'
              if (percentage>80){picSource = 'pic2'}
              if (percentage<50){picSource = 'pic0'}

          return  <View key={key} style={styles.canvasItem}>
                    <ResponsiveImage source={{ uri: pic[picSource] }} style={{margin: 6 }} initWidth='80' initHeight='80' />
                      <ProgressCircle percent={percentage} radius={30} borderWidth={8}
                        color="#3399FF" shadowColor="#999" bgColor="#2952a3" >
                      <Text style={{ fontSize: 14, color: '#fff' }}>{percentage+'%'}</Text> 
                    </ProgressCircle>
                    <Text>{ getObjectValuaByKey(key, 'dashBoardText') }</Text>
                    <Text style={ styles.dashBoardInputTimesText }>{
                       getTimesOfInput(index, key, 'dashBoardInputTimesText').toString().toUpperCase() }
                    </Text>
                  </View> 
      })          
    } 
  }

  render() {

    let pic5 = { uri: 'https://i.gifer.com/8uv3.gif' }
    
    return (
      <View style={styles.container}>

        <View style={styles.innerContainer}>

           {this.getValuesToShow()}

        </View>
        
        <View style={styles.innerContainer} >
           <Image source={ pic5 } style={{margin: 0, width: '100%', height: 200 }} /> 
        </View>
        <View style={styles.innerContainer}>
            <Text style={styles.canvas}>Footer canvas</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#F5FCFF',
  },
  innerContainer: { 
    alignItems: 'center', flex:0, flexDirection: 'row' },
  canvas: {
    flex: 1,
    margin: 0,
    backgroundColor: 'orange',
    margin: 0,
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 70,
  },
  canvasItem:{
      margin: 20,
      flex:1,
      alignItems: 'center',
  },
  dashBoardText: {
    fontSize:11,
    textAlign: 'center',
  },
  dashBoardInputTimesText: {
    fontSize: 8,
    textAlign: 'center',
  }
});