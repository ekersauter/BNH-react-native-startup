import React from 'react'
import { View, Text, StyleSheet, TextInput, Dimensions, Keyboard } from 'react-native'
import moment from 'moment'
import utilities from '../functions/utils'
import BarChartHorizontalWithLabelsTool from '../tools/barChartTool'
import AreaStackWithAxisExample from '../tools/areaStack'
import AwesomeButton from 'react-native-really-awesome-button/src/themes/c137';
import settings from '../data/steps/Settings.json'
import TextInputSetup from '../setups/textinputsetup'

let screenDimentions = Dimensions.get('window')

export default class BarChartHorizontalWithLabels extends React.PureComponent {
    constructor(props) {      
        super(props);
        this.state = {
            checkIfStepsCountIsStored: false,
            stepsCount: [0],
            cut_off: 0,
            goal: 6000,
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

        console.log('<><>this.state.settings', settings.settings.currentGoal.headerTextEnd)

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
    }

    changeGoal(){
        this.provideBarData()
    }

    provideBarData(){
        barData = [0]
        barDataText = [0]
        this.state.stepsCount.map((item) => {
            if (typeof item === 'object'){
                barData = []
                barDataText = []
                item[0].map((subitem, index) =>{

                    let stepCount = parseInt(subitem.value)
                    barData.push( Math.round((stepCount/this.state.goal)*100) )
                    barDataText.push( moment(subitem['end']).format('dddd') + ' | ' + this.state.goal )
                    
                })
            }
        })
        
        if (barData.length > 4) {
            barData = barData.splice(barData.length -4 , 4)  
            barDataText = barDataText.splice(barDataText.length -4 , 4)    
            this.setState({
                barData: barData,
                barDataText: barDataText
            })    
        }
    }

    getBarData(){
        if (this.state.barData.length > 3) {
            return <BarChartHorizontalWithLabelsTool 
                data={ this.state.barData }
                dataText= { this.state.barDataText }
                cut_off={ this.state.cut_off }
            />
        }    
    }

    componentWillUpdate(){
        if (this.state.barData.length > 0) {
            this.provideBarData()
            }
    }

    render() {
        
        console.log(this.state.goal)
        console.log(this.state.barData)


        let ls =  [this.state.languageSetting]
               
        return  <View style={{ backgroundColor: '#000', flex: 1, alignItems: 'center' }}>
                    <Text style={styles.barHeader}> 
                        {   
                            String(settings.settings.currentGoal.headerTextStart[ls] + 
                            this.state.goal +  
                            settings.settings.currentGoal.headerTextEnd[ls]).toUpperCase() 
                        } 
                    </Text>
                    <TextInputSetup
                        keyboardType={'numeric'}
                        placeholder={ settings.settings.NewGoal.placeHolder[ls] }
                        value={this.state.goal}
                        onChangeText={(value) => { 
                            this.setState({goal: value})
                            let storeKey = 'StoredStepsGoal'
                            let key = 'StepsGoal'
                            datetime = new Date().toJSON()
                            utilities.pushToStore(storeKey, {id: key, datetime: datetime, value: value}) 
                        }}
                    />
                    <AwesomeButton style={styles.AwesomeButton} onPress={ () => {Keyboard.dismiss(); 
                    this.changeGoal() }} >
                        { settings.settings.NewGoal.buttonLabel[ls] }
                    </AwesomeButton>
                    
                    { this.getBarData() }

                    <AreaStackWithAxisExample />
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
        // left: (screenDimentions.width / 2) -90,
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
        textAlign: 'center',
        color: '#000',
        fontSize: 12
      },
  });