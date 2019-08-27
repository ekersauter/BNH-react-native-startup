import React from "react"
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import AwesomeButton from 'react-native-really-awesome-button/src/themes/c137'

import NumberSlider from '../tools/numberSlider'

import { Actions } from 'react-native-router-flux'
import utilities from '../functions/utils'

import jsonData from '../data/dashboard/content.json'
import config from '../data/dashboard/Settings.json'


export default class dashBoardVars extends React.Component {

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
            isVisible: false
        
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

    renderNextDashboardVar = (dataItem) => {
        if ((this.state.checkIfdashboardVarsIsStored[0] == true) && (this.state.dashBoardVars.length > 0)) {
            this.state.dashBoardVars[0].map((dashboarVar) => { 
                if (dataItem.docId == dashboarVar.id) { 
                    dataItem.sliderValue = dashboarVar.value 
                }                
            }) 
        } 

        headerImgCheck = dataItem.headerImg.length
        if (headerImgCheck>0) {
            var showHeaderImg = true
        } else {
            var showHeaderImg = false
        } 

        if (dataItem.type === 'slider') {
            return  <NumberSlider
                    storeKey='dashBoardVars' 
                    docId={dataItem.docId}
                    key={dataItem.docId}
                    storedValue={dataItem.sliderValue}
                    headerImg={dataItem.headerImg}
                    headerImgShow={showHeaderImg}
                    headerText={dataItem.dashBoardText[this.state.languageSetting]}
                    text={dataItem.text[this.state.languageSetting]}
                    labelLeft={dataItem.labelLeft[this.state.languageSetting]}
                    labelRight={dataItem.labelRight[this.state.languageSetting]}
                    sliderValue={dataItem.sliderValue}
                    minimumValue={dataItem.minimumValue}
                    maximumValue={dataItem.maximumValue}
                    interval={dataItem.interval}
                    sendCurrentQuestion={this.getCurrentQuestion}
                    nextButtonLabel={dataItem.nextButtonLabel[this.state.languageSetting]}
                    buttonVisible={dataItem.buttonVisible}
                    />               
        }
    }

    renderListofItems = () => {
        // const sliderData = this.state.data.filter(x => x.docId === 'dashboardSliderVar0003');
		// console.log("​dashBoardVars -> renderListofItems -> sliderData", sliderData)
        return this.state.data.map((item) => {
            return  this.renderNextDashboardVar(item)
        })
    }

    render() {
        return  <View style={styles.main}>
                    <View style={styles.container}>
                        <ScrollView 
                            >

                            { this.renderListofItems() }

                        </ScrollView>
                    </View>
                </View>
                    
    }

} 

//StyleSheet.absoluteFill, is shortcut for 
const styles = StyleSheet.create({
    main: {
        flex: 1,
        // height: '100%'   
       },
    container: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        // alignItems: "stretch",
        // justifyContent: "center",
        marginTop: 0,
        // ...StyleSheet.absoluteFillObject,
        // height: '100%',
        // justifyContent: 'space-between'
    },
    headerText: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    text: {
        marginLeft: 20,
        marginRight: 20,
        fontSize: 16,
    },
    button: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 5,
        height: 40,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center'
    }
})
