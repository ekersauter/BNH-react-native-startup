'use strict';
import _ from 'lodash' 
import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View } from 'react-native';
import 'moment-timezone'
import moment from 'moment';
import Loader from '../screens/loader'

import store from 'react-native-simple-store';
import globalSetup from '../data/globalSetup.json'

import utilities from '../functions/utils'

const globalLanguageSetting = globalSetup[0]['globalSetupLanguage']


// console.log('Removing key answersHra: ', utilities.removeItemFromAsyncStorage('answersHra'))
// utilities.clearAsyncStorage()

export default class TestStore extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // testObjectKeyInStore: false,
      loading: false,
      keys: [],
      globalLanguageSettingFromJson: [],
      lastChangedDiffs: [],
      testObject: [],
      answersHra: [],
      loading: false,
      testStoreInState: false,
      stepCount: [],
    };

    //Take store functions from utilities and bind
    this.storeLocal = utilities.storeLocal.bind(this)
    this.getFromStoreAndSetInSate = utilities.getFromStoreAndSetInSate.bind(this)

  }

  async componentWillMount(){
    let now = new Date();
    await store.push('globalLanguageSettingFromJson', { value: globalLanguageSetting, datetime: now }).done()
    await store.get('globalLanguageSettingFromJson').then((res) =>  { 
        this.setState(prevState => ({
          globalLanguageSettingFromJson: [...prevState.globalLanguageSettingFromJson, res]
        }))
      }
    ).done()
    
    
    // await utilities.CheckIfKeyInStore('testObject', this.state.testObjectKeyInStore).done()  
    // console.log('TCL: TestStore -> asynccomponentDidMount -> utilities.getFromStore(testObject)', 
    // this.state.testObjectKeyInStore);
    // store.delete('testObject')
    let keyTestObject = 'testObject'
    let testObject = utilities.getRandomDates(40)
    this.storeLocal(keyTestObject, testObject)
    this.getFromStoreAndSetInSate(keyTestObject)


    //testHra If (part) of HRA is already filled in then get the data from local Store
    if (this.getFromStoreAndSetInSate('answersHra') !== null) {
      this.getFromStoreAndSetInSate('answersHra')
    }
    if (this.getFromStoreAndSetInSate('stepCount') !== null) {
      this.getFromStoreAndSetInSate('stepCount')
    }
    
  }

  getItemInfo(itemList) {


    let outputLenght = itemList.map((item) => { return item.length })[0]
    if (typeof outputLenght !== 'undefined') {

      let nowDatetime = moment()

      let firstObject = itemList.map((item) => { return item.slice(1) })[0]
      let firstDate = moment(firstObject[0]['datetime'])
      let firstValue = firstObject[0]['value']

      let nowToLastInputDaysDiff = nowDatetime.diff(firstDate, 'days')
      let nowToLastInputHoursDiff = nowDatetime.diff(firstDate, 'hours')

      let lastObject = itemList.map((item) => { return item.slice(-1) })[0]
      let lastDate = moment(lastObject[0]['datetime'])
      let lastValue = lastObject[0]['value']

      let firstObjectKeys = Object.keys(firstObject[0])

      let maxDayDiff = lastDate.diff(firstDate, 'days')
      let maxHoursDiff = lastDate.diff(firstDate, 'hours')

      let valueGrouping = utilities.groupBy(itemList[0], 'value')
      let keysValueGrouping = Object.keys(valueGrouping)
      let compareInput = []
      keysValueGrouping.map((key) => {
        compareInput.push( valueGrouping[key].slice(-1)[0])
      })
      let distinctValuesAndAmount = []
      let distinctValues = utilities.getDistinctValues(compareInput, 'value')
      distinctValues.map((item, index) => {
        let insert = ' ✔︎ Value ' + item + ' is recorded ' + valueGrouping[item].length + ' times.'
        distinctValuesAndAmount.push( insert )
      })
      let distinctValuesAndAmountDisplay = distinctValuesAndAmount.join('\n')
      let inputOrderedByDatetime =  utilities.orderBy(compareInput, 'datetime')
      let currentValue = inputOrderedByDatetime.slice(-1)[0].value
      let previousValue = inputOrderedByDatetime.slice(-2)[0].value
      let previousDatetime = moment(inputOrderedByDatetime.slice(-2)[0].datetime)
      let lastChangedDiff = utilities.returnDiff(nowDatetime, previousDatetime)
            
      return  <ScrollView style={ componentStyles.text }>
                <Text style={ componentStyles.dataLines }>
                  
                  Days since first input { nowToLastInputDaysDiff } {'\n'}
                  Hours since first input { nowToLastInputHoursDiff } {'\n'}
                  First date: { firstDate.toJSON().substring(0, 10) } holding value: { firstValue } {'\n'}
                  Last date: { lastDate.toJSON().substring(0, 10) } holding value: { lastValue } {'\n'}
                  This makes { maxDayDiff } day(s) or { maxHoursDiff } hours {'\n'} 
                  => Now there are { outputLenght } records {'\n'}
                  ---- Datakeys: {'\n'}
                  { ' ⦿ '} { firstObjectKeys.join(' ⦿ ') } {'\n'}
                  ---- Since last change: {'\n'}
                  {'\u2022'} { Object.keys(lastChangedDiff[0])[0] } = <Text style={{fontWeight: '800' }}> { lastChangedDiff[0][Object.keys(lastChangedDiff[0])[0]] } </Text> {'\n'}
                  {'\u2022'} { Object.keys(lastChangedDiff[1])[0] } = <Text style={{fontWeight: '800' }}> { lastChangedDiff[1][Object.keys(lastChangedDiff[1])[0]] } </Text>{'\n'}
                  {'\u2022'} { Object.keys(lastChangedDiff[2])[0] } = <Text style={{fontWeight: '800' }}> { lastChangedDiff[2][Object.keys(lastChangedDiff[2])[0]] } </Text>{'\n'}
                  {'\u2022'} { Object.keys(lastChangedDiff[3])[0] } = <Text style={{fontWeight: '800' }}> { lastChangedDiff[3][Object.keys(lastChangedDiff[3])[0]] } </Text>{'\n'}
                  ---- Different input values: {'\n'}
                  { distinctValuesAndAmountDisplay } {'\n'}
                  {'\u2022'} Current value: { currentValue } {'\n'}
                  {'\u2022'} Previous value: { previousValue } {'\n'}

                </Text> 
              </ScrollView>
    }
  }

  renderDiffList() {
    return this.state.lastChangedDiffs.map((item, index) => {
      <Text key={index}>{ item }</Text>
    })
  }

  loadingTimeout = () => {
    this.setState({
      loading: false,
    })
  }
 
  renderHra() {
    if (this.state.answersHra.length > 0) {
      return this.state.answersHra.map((array) => {
        return array.map((object, objectIndex) => {
          return Object.keys(object).map((key, keyindex) => {
            return <View style={{ backgroundColor: (objectIndex % 2 == 0) ? '#ecf0f1' : '#fff' }}>
                    <Text key={ objectIndex + keyindex }> { key + ': ' + object[key] }</Text>
                  </View>  
            })  
          })
        })
      }
  }

  render() {

    setTimeout(this.loadingTimeout, 1500)

    console.log(this.state.stepCount)

    return (
      <View>
        <Loader
          loading={this.state.loading} />
         
        <View style={componentStyles.header}>
          <Text style={componentStyles.headerText}> ➤➤ `HRA` in local storage  🏄‍♂️ </Text>
        </View>
          <ScrollView style={{ marginLeft: 10 }}>

            { this.renderHra() }
          
          </ScrollView> 

        <View style={componentStyles.header}>
          <Text style={componentStyles.headerText}> ➤➤ `{ this.state.dataStoreKey }` in local storage  🏄‍♂️ </Text>
        </View>
          <ScrollView>

              { this.getItemInfo(this.state.testObject) }
          
          </ScrollView>
      </View>
    );
  }

}

const componentStyles = StyleSheet.create({
  header: {
    backgroundColor: '#ccc',
    padding: 10
  },
  headerText: {
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text:{
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    borderBottomColor: 'black',
  },
  dataLines: {
    paddingLeft: 16,
    paddingTop: 16,
    marginBottom: 0,
    lineHeight: 20,
    backgroundColor: '#111',
    color: '#ccc',
    alignContent: 'flex-end',
  }
});