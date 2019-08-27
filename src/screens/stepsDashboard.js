import sort from 'immutable-sort'
import React from 'react'
import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native'
import moment from 'moment'
import utilities from '../functions/utils'
import BarChartHorizontalWithLabelsTool from '../tools/barChartTool'
import AreaStackWithAxisExample from '../tools/areaStack'
import AwesomeButton from 'react-native-really-awesome-button/src/themes/c137';
import settings from '../data/steps/Settings.json'

let screenDimentions = Dimensions.get('window')

export default class StepsDashBoard extends React.PureComponent {
    constructor(props) {      
        super(props);
        this.state = {
            checkIfStepsCountIsStored: false,
            stepsCount: [],
            cut_off: 0,
            goal: 4000,
            introIsVisible: true,
            outroIsVisible: false,
            headerImgVisible: false,
            barData: null,
            settings: settings,
            StoredLanguageSetting: [],
            checkIfLanguageSettingIsStored: false,
            languageSetting: '',
            StoredStepsGoal: [],
            checkIfStepsGoalIsStored: false,
            barData:[],
            barDataText:[],
            changeGoal: '',        
        };

        this.CheckIfKeyInStore = utilities.CheckIfKeyInStore.bind(this)
        this.getFromStoreAndSetInSate = utilities.getFromStoreAndSetInSate.bind(this)

    }

    async componentDidMount() {
        // Check for stored data and set in this.state is done right after component mounting

        // utilities.removeItemFromAsyncStorage('answersHra')
        await this.CheckIfKeyInStore('stepsCount', 'checkIfStepsCountIsStored').then( async () => {
            if (this.state.checkIfStepsCountIsStored[0] == true ) {
                await this.getFromStoreAndSetInSate('stepsCount').then(()=>{
                })
            }
        })

        await this.CheckIfKeyInStore('StoredLanguageSetting', 'checkIfLanguageSettingIsStored').then( async () => {
            if (this.state.checkIfLanguageSettingIsStored[0] == true ) {
                await this.getFromStoreAndSetInSate('StoredLanguageSetting').then(()=>{
                  let languageSetting = utilities.getPropertyValueOfLastObjectInArray(this.state.StoredLanguageSetting, 'value')
                  this.setState({ languageSetting: languageSetting.substring(0,2) })
              }).done()
            }
        })

        await this.CheckIfKeyInStore('StoredStepsGoal', 'checkIfStepsGoalIsStored').then( async () => {
            if (this.state.checkIfStepsGoalIsStored[0] == true ) {
                await this.getFromStoreAndSetInSate('StoredStepsGoal').then(()=>{
                  let StoredStepsGoal = utilities.getPropertyValueOfLastObjectInArray(this.state.StoredStepsGoal, 'value')
                  this.setState({ goal: StoredStepsGoal })
              }).done()
            }
        })

        this.provideBarData()
    }

    provideBarData(){

        barData = [0]
        barDataText = [0]
        if (this.state.stepsCount[0].length>0) {
            this.state.stepsCount[0].map((item) => {
                console.log("​StepsDashBoard -> provideBarData -> item", item)
                if (typeof item === 'object'){
                    barData = []
                    barDataText = []
                    item.map((subitem, index) =>{
                        console.log("​StepsDashBoard -> provideBarData -> subitem", subitem)
                        let stepCount = parseInt(subitem.value)
                        barData.push( Math.round((stepCount/this.state.goal)*100) )
                        barDataText.push( moment(subitem['end']).format('dddd') )                    
                    })
                }
            })
        }    
        
        if (barData.length > 4) {
            barData = barData.splice(barData.length -7 , 7)  
            barDataText = barDataText.splice(barDataText.length -7 , 7)    
            this.setState({
                barData: barData,
                barDataText: barDataText
            })    
        }
    }

    getBarData(){
        // console.log("​StepsDashBoard -> getBarData -> this.state.barData", this.state.barData)

        if (this.state.barData.length > 3) {
            return <BarChartHorizontalWithLabelsTool 
                data={ this.state.barData }
                dataText= { this.state.barDataText }
                cut_off={ this.state.cut_off }
            />
        }    
    }

    render() {        
        let ls =  [this.state.languageSetting]
               
        return  <View style={{ backgroundColor: '#000' }}>
                    
                    { this.getBarData() }

                    {/* <AreaStackWithAxisExample /> */}
                </View> 
        // return <BarChartHorizontalWithLabelsTool 
        //             data={ barDataList }
        //             cut_off={ this.state.cut_off }
        //             />            
    }
    
}

const styles = StyleSheet.create({
    barHeader: {
        marginTop: 14,
        fontSize: 8,
        textAlign: 'center',
        color: 'white',
    },
    AwesomeButton: {
        marginTop: 12,
        left: (screenDimentions.width / 2) -90,
    },
    textInput: { 
        left: (screenDimentions.width / 2) -90,
        height: 40,
        width: 190,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor:'white',
        padding: 0,
        marginTop: 10,
        borderRadius: 20,
        // textAlign: 'center',
        color: '#000',
        fontSize: 12
      },
  });