import React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SliderTool from '../tools/sliderTool'
import RadioButtonTool from '../tools/radioButtonsTool'
import NumericInputTool from '../tools/numberInputTool'
import { Actions } from 'react-native-router-flux';
import utilities from '../functions/utils'

import jsonData from '../data/hra/questions.json'
import config from '../data/hra/hraSettings.json'

/*
    filter sample:
    const sliderData = jsonData.filter(x => x.type === 'slider');
*/
var squenceImageskeyList = []

export default class hraQuestions extends React.Component {

    constructor(props) {      
        super(props);
        this.state = {
            checkIfHraIsStored: false,
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
            answersHra:[],
            StoredLanguageSetting: [],
            checkIfLanguageSettingIsStored: false,
            languageSetting: '',
            hra1:false
        
        };

        this.CheckIfKeyInStore = utilities.CheckIfKeyInStore.bind(this)
        this.getFromStoreAndSetInSate = utilities.getFromStoreAndSetInSate.bind(this)
        this.squenceImageskeyList = []
        this.extraText = null
        this.renderCounter = 0
        this.tempAnswersHra = []
        this.conditionalisedHraIds = []
        this.conditionalisedHra = []
        this.uniqueHraIds = [] 

    }

    async componentDidMount() {
        // Check for stored data and set in this.state is done right after component mounting

        // utilities.removeItemFromAsyncStorage('answersHra')
        await this.CheckIfKeyInStore('answersHra', 'checkIfHraIsStored').then( async () => {
            if (this.state.checkIfHraIsStored[0] == true ) {
                await this.getFromStoreAndSetInSate('answersHra').then(()=>{
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

    getCurrentQuestion = (object) => {
        this.tempAnswersHra.push(object)
        var lastDocId1 = this.state.data[this.state.data.length - 1].docId
        var lastDocId2 = conditionalisedHraIds[conditionalisedHraIds.length - 1]
        if ((object.id == lastDocId1) || (object.id == lastDocId2)) {
            this.showOutroHra(object.id)
        } else {
            this.showNextQuestion(object.id)

        }
    }

    async startHRA() {
        this.setState({
            introIsVisible:!this.state.introIsVisible,
            hra1:!this.state.hra1
        })
    }

    renderNextQuestion = (question) => {

        //Checking extra content keys conditions
        if (Object.keys(question).indexOf('extra')) { 
            var extraKeys = Object.keys(question).filter(function(key) {
                return key.indexOf('extra') > -1;
            });
            
            extraKeys.map((extraKey)=> {
                extraContentCondition = question[extraKey]['condition']
                queryItems = utilities.splitMulti(extraContentCondition, [' ', ':'])
                queryItems.map((queryItem)=>{ 
                    if (queryItem.indexOf('_')>-1) {
                        queryVariableName = queryItem
                        this.tempAnswersHra.map((answersHraItem) => {
                        if (queryVariableName == answersHraItem.variable) {
                            refQuery = String(queryVariableName + '=' + answersHraItem.value)
                            defQuery = String(extraContentCondition).replace(/\s+/g, '')
                            if (refQuery == defQuery) {
                                this.extraText = question[extraKey]['text'][this.state.languageSetting]
                                }
                            }       
                        })
                    }
                })       
            })
        }

        if (this.state.checkIfHraIsStored[0] == true) {
            this.state.answersHra[0].map((item) => { 
                if (item.id == question.docId) { 
                    question.storedValue = item.value 
                }
            }) 
        }
        
        let renderSequenceImagesList = []
        this.conditionalSequenceImgList = []
        config['settings']['sequenceImgList'].map((imageSource)=>{
            var key = Object.keys(imageSource)[0]
            
            // Matching possible conditions
            if (conditionalisedHra.filter((item) => item.variableName == key).length>0){
                if (key == conditionalisedHra.filter((item) => item.variableName == key)[0].variableName ) {
                    this.conditionalSequenceImgList.push(key)
                }
            }

            if (this.conditionalSequenceImgList.includes(key)) {
                if ((imageSource[key]['active'].length>10) || (imageSource[key]['inactive'].length>10)) {
                    if ((key == question.variableName) || (this.squenceImageskeyList.indexOf(key)> -1)) {
                        renderSequenceImagesList.push(String(imageSource[key]['active']))
                        this.squenceImageskeyList.push(key)
                    } else {
                        renderSequenceImagesList.push(String(imageSource[key]['inactive']))
                    }                
                }
            }

        })

        headerImgCheck = question.headerImg.length
        if (headerImgCheck>0) {
            var showHeaderImg = true
        } else {
            var showHeaderImg = false
        }

        if (question.type === 'slider') {

            return <SliderTool
                    storeKey='answersHra'
                    docId={question.docId}
                    key={question.docId}
                    variableName={question.variableName}
                    storedValue={question.storedValue}
                    headerImg={question.headerImg}
                    headerImgShow={showHeaderImg}
                    headerText={question.headerText[this.state.languageSetting]}
                    text={question.text[this.state.languageSetting]}
                    extraText={this.extraText}
                    labelLeft={question.labelLeft[this.state.languageSetting]}
                    labelRight={question.labelRight[this.state.languageSetting]}
                    sliderValue={question.sliderValue}
                    minimumValue={question.minimumValue}
                    maximumValue={question.maximumValue}
                    interval={question.interval}
                    sendCurrentQuestion={this.getCurrentQuestion}
                    nextButtonLabel={this.state.nextButtonLabel}
                    sequenceImg={renderSequenceImagesList}
                    />
        }    
        
        if (question.type === 'radioBotton') {

            return <RadioButtonTool
                    storeKey='answersHra'
                    docId={question.docId}
                    key={question.docId}
                    variableName={question.variableName}
                    storedValue={question.storedValue}
                    headerImg={question.headerImg}
                    headerImgShow={showHeaderImg}
                    headerText={question.headerText[this.state.languageSetting]}
                    text={question.text[this.state.languageSetting]}
                    options={question.options}
                    sendCurrentQuestion={this.getCurrentQuestion}
                    nextButtonLabel={this.state.nextButtonLabel}
                    />
        } 
        
        if (question.type === 'numberInput') {

            return <NumericInputTool
                    storeKey='answersHra'
                    docId={question.docId}
                    key={question.docId}
                    variableName={question.variableName}
                    storedValue={question.storedValue}
                    headerImg={question.headerImg}
                    headerImgShow={showHeaderImg}
                    headerText={question.headerText[this.state.languageSetting]}
                    text={question.text[this.state.languageSetting]}
                    totalHeight={question.totalHeight}
                    minValue={question.minValue}
                    maxValue={question.maxValue}
                    step={question.step}
                    initValue={question.initValue}
                    //Can be plus-minus with - [value] + or up-down with both aside the [value]
                    alterType={question.alterType}
                    sendCurrentQuestion={this.getCurrentQuestion}
                    nextButtonLabel={this.state.nextButtonLabel}
                    />
        } 
    }
 
    intro() {
        return (
            <View>
                <Text style={ styles.headerText }>{ this.state.introHeaderText }</Text>
                <Text style={ styles.text }>{ this.state.introBodyText }</Text>
                <TouchableOpacity style={styles.button} onPress={() => {  this.startHRA(); }}>
                    <Text style={styles.buttonText} >{ this.state.startButtonLabel }</Text>
                </TouchableOpacity>
            </View> 
        )
    }

    outro() {
        return (
            <View>
                <Text style={ styles.headerText }>{ this.state.outroHeaderText }</Text>
                <Text style={ styles.text }>{ this.state.outroHeaderText }</Text>
                <TouchableOpacity style={ styles.button } onPress={() => {  Actions.homeKey(); }}>
                    <Text style={ styles.buttonText } >{ this.state.backButtonLabel }</Text>
                </TouchableOpacity>
            </View> 
        )
    }

    showQuestion(id) {
        console.log("​hraQuestions -> showQuestion -> id", id)
        return this.renderNextQuestion(this.state.data.filter((item) => item.docId == id)[0])
    }

    showNextQuestion(id) {

        let number = Number(id.slice(3)) + 1
        let nextdocId = `${ 'hra' }${ number }`

        if (conditionalisedHraIds.length>0) {
            if (!conditionalisedHraIds.includes(nextdocId)) {
                nextdocId = `${ 'hra' }${ number + 1 }`
            }
        }

        /*  
            No need to preset the visibility in the this.state constructor.
            setState in this function takes care for that.
        */

        this.setState({
        [id]:!this.state[id],
        [nextdocId]:!this.state[nextdocId]
        })

        // if (this.state.data.length >= number ) {
        //     this.setState({
        //     [id]:!this.state[id],
        //     [nextdocId]:!this.state[nextdocId]
        //     })
        // }

        // if (this.state.data.length < number) {
        //     this.setState({
        //         [id]:!this.state[id],
        //         outroIsVisible:!this.state.outroIsVisible
        //     })
        // }

    }

    showOutroHra = (id) => {
        this.setState({
            [id]:!this.state[id],
            outroIsVisible:!this.state.outroIsVisible
        })
    }

    renderListofItems = () => {

        //Checking primairy condition
        conditionalisedHraIds = []
        conditionalisedHra = []

        this.state.data.map((item) => {
            this.tempAnswersHra.map((tempAnswer)=>{
                if (item['condition'].indexOf(tempAnswer.variable)> -1) {
                    refQuery = String(tempAnswer.variable + '=' + tempAnswer.value)
                    defQuery = String(item['condition']).replace(/\s+/g, '')
                    if (refQuery == defQuery) {
                        conditionalisedHraIds.push(item.docId)
                        console.log("​hraQuestions -> renderListofItems -> (refQuery == defQuery)", (refQuery == defQuery), item.docId)
                    }
                } 
                if  (item['condition'].length == 0) {
                    conditionalisedHraIds.push(item.docId)
                }
            })
        })

        this.uniqueHraIds = [...new Set(conditionalisedHraIds)];
        this.uniqueHraIds.map((id) => {            
            conditionalisedHra.push(this.state.data.filter((item) => item.docId == id)[0])
        })

        console.log("​hraQuestions -> renderListofItems -> conditionalisedHra.length", conditionalisedHra.length)

        if (conditionalisedHra.length === 0) {
            return ( this.state['hra1']? this.showQuestion('hra1') : null )
        } 
        if (conditionalisedHra.length > 0) {
            return conditionalisedHra.map((item) => {
                console.log("​hraQuestions -> renderListofItems -> item.docId", item.docId)
                return ( this.state[item.docId]? this.showQuestion(item.docId) : null )    
            })
        }
    }

    render() {

        return <ScrollView>

            { this.state.introIsVisible? this.intro() :null }

            { this.renderListofItems() }
            
            { this.state.outroIsVisible? this.outro() : null }

        </ScrollView>

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        marginLeft: 20,
        marginRight: 20,
        alignItems: "stretch",
        // justifyContent: "center",
        marginTop: 20
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
        backgroundColor: "#3b475b",
        height: 40
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center'
    }
})