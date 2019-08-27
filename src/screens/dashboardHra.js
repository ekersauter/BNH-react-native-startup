import React, { Component } from 'react'
import { Constants, Svg } from 'expo';

import sort from 'immutable-sort'
import _ from 'lodash' 

import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import ResponsiveImage from 'react-native-responsive-image'
import utilities from '../functions/utils'
import jsonData from '../data/hra/questions.json'
import config from '../data/hra/hraSettings.json'


export default class dashBoardHra extends Component {

    constructor(props) {      
      super(props);
      this.state = {
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
          checkIfHraIsStored: false,
          answersHra:[],
          StoredLanguageSetting: [],
          checkIfLanguageSettingIsStored: false,
          languageSetting: '',
          dashBoardVar1: false,
          dashBoardVar2: false,
          dashBoardVar3: false,    
          dashBoardVar4: false,
          dashBoardVar5: false,    

      };
  
      this.CheckIfKeyInStore = utilities.CheckIfKeyInStore.bind(this)
      this.getFromStoreAndSetInSate = utilities.getFromStoreAndSetInSate.bind(this)
  
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

    renderSvgCircle(position, keyString) {
        if (position == 'TopRight') {
            return <Svg.Circle
                key={ 'circle' + keyString }
                cx={89}
                cy={14}
                r={10}
                strokeWidth={2.5}
                stroke="#ff8533"
                fill="#fff0e6"
                style={{ zIndex: 1000 }} />
        }
    }

    renderSvgIcon(position, keyString) {
        if (position == 'TopRight') {
            return <Svg.Text
                key={ 'icon' + keyString }
                cx={89}
                cy={14}
                r={10}
                strokeWidth={2.5}
                stroke="#ff8533"
                fill="#fff0e6"
                style={{ zIndex: 1000 }} />
        }
    }

    getValuesToShow(start, end, keyTail){
        imageRange = _.range(start, end + 1)

        let distinctVariableNames = []
        let renderSequenceImagesList = []
        if (this.state.checkIfHraIsStored[0] == true ) {
            this.state.answersHra.map((item)=>{
                item.map((subItem)=>{
                    distinctVariableNames.push(subItem.variableName)
                })
            })
            var uniqVarNames = [ ...new Set(distinctVariableNames) ]
            config['settings']['sequenceImgList'].map((imageSource)=>{
                var key = Object.keys(imageSource)[0]
                if (uniqVarNames.includes(key)) {
                    if ((imageSource[key]['active'].length>10) || (imageSource[key]['inactive'].length>10)) {
                        
                        renderSequenceImagesList.push(String(imageSource[key]['active']))
                                      
                    }
                }
            })

            return imageRange.map((index) => {
                imgSrc = renderSequenceImagesList[index]
                return  <View key={ 'view' + index + keyTail } style={styles.canvasItem}>
                    <View style={{ width: 100*imageRange.length }}>
                  <View style={ styles.progressiveCircle } style={{ left:100/imageRange.length, top:18 }}>
                  <ProgressCircle  percent={80} radius={15} borderWidth={5} color="#3399FF" shadowColor="#999"  >
                                    <Text style={{ fontSize: 8, color: '#000' }}>10%</Text> 
                                </ProgressCircle>
                                </View>     
                 <ResponsiveImage 
                                    key={ index + keyTail } 
                                    source={{ uri: imgSrc }} 
                                    initWidth='100' 
                                    initHeight='100' 
                                    style={ styles.responsiveImage }
                                    
                                />
                            {/* <Svg key={ 'svg' + index + keyTail } height={100} width={100}> */}
                               

                                {/* { this.renderSvgCircle(position='TopRight', keyString = index + keyTail) } */}
            
                                

                            {/* </Svg> */}
                            </View>
                        </View>
            })
        } 
    }

    render() {
        
        return (
          <View style={styles.container}> 
            <View style={styles.innerContainer} >    
               {this.getValuesToShow(0, 2, keyTail='_1')}
            </View>
            <View style={styles.innerContainer} >
               {this.getValuesToShow(3, 4, keyTail='_2')}
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
        flex: 0, 
        alignItems: 'center', 
        flexDirection: 'row',
        // height: 160
    },
    responsiveImage: { 
        // backgroundColor: '#ffe0cc', 
        marginBottom: 0
    },
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
    },
    poseView: {
        width:100,
        height:100,
    },
    progressiveCircle: {
        width: '100%',
        flex: 0, flexDirection: 'row', justifyContent: 'flex-end',
    }
});