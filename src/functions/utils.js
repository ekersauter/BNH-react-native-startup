import React from 'react'
import { View, Text } from 'react-native' 
import ResponsiveImage from 'react-native-responsive-image'
import _ from 'lodash' 
import store from 'react-native-simple-store'
import { AsyncStorage } from 'react-native'

class utils extends React.Component {

  _retrieveData = async (KeyToGetValue) => {
    try {
      const value = await AsyncStorage.getItem(KeyToGetValue);
      if (value !== null) {
        // We have data!!
        return value
      }
     } catch (error) {
       // Error retrieving data
     }
  }


  async removeItemFromAsyncStorage(key) {
    await AsyncStorage.removeItem(key).then(() => { return true }).done()
  }

  clearAsyncStorage = async() => {
    AsyncStorage.clear();
}

  fetchAllKeysAndValues = async () => {
    await AsyncStorage.getAllKeys().then((keys) => { 
      keys.map((key) => {
         AsyncStorage.getItem(key).then((result) => { 
           console.log('\n', key, ': ', result) 
           return {key: result}
          })
      })
     })
  }

  // For checkking is key is in store and if so set a key defined in stateKey as true
  async CheckIfKeyInStore(KeyToCheck, stateKey){
    await AsyncStorage.getAllKeys().then((keys) => { 
      if (_.indexOf(keys, KeyToCheck) == -1) { 
        // console.log(stateKey + ' stored keys index: ' + _.indexOf(keys, KeyToCheck))
        this.setState(prevState => ({ [stateKey]: [...prevState[stateKey], false] }))
      } else {
        this.setState(prevState => ({ [stateKey]: [...prevState[stateKey], true] }))
      }
    })
  }

  fetchValuesByKey = async (queryKey) => {
    await AsyncStorage.getAllKeys().then((keys) => { 
      keys.map((key) => {
        if (key == queryKey) {
          returnList = []
         AsyncStorage.getItem(key).then((result) => { returnList.push({ [key]: result } ); console.log('\n', key, ': ', result) })
        }
      })
     })
     return returnList
  }
  
  getRandomDates = (amount) => {

    //First populate date list at random with starting date beginning of this year and current date as end
    let dateList = []
    let i = 0
    while (i<amount+1) {
      dateList.push(
        this.returnRandomDate(new Date(2018, 0, 1), new Date()).toJSON()
        )
      i++
    }

    //Order asc by date
    let sortedDateList = dateList.sort()
    let resultList = []

    //Populate the result with objects by iterating the ordered date list and taking the date as property and add a random value property.
    sortedDateList.map((item) => {
      resultList.push(
        { value: this.returnRandomNumber(10),
          datetime: item
        })
      i++
    })
    return resultList
  }

  returnRandomNumber = (maxNumber) => {
    return Math.floor(0 + Math.random()*(maxNumber+1 - 0))
  }
  
  returnRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  groupBy = (dataList, key) =>  {
    return _.groupBy(dataList, key)
    }

  
  orderBy = (dataList, key) => {
    return _.orderBy(dataList, key)
  }

  countInArray(array) {
    return _.countBy(array);
  }
  
  returnDiff = (maxDate, minDate) => {
    let returnList = []
    if (typeof maxDate === 'object' && maxDate !==null && typeof minDate === 'object' && minDate !==null) {
      returnList.push({minuntesDiff: maxDate.diff(minDate, 'minutes')})
      returnList.push({hoursDiff: maxDate.diff(minDate, 'hours')})
      returnList.push({daysDiff: maxDate.diff(minDate, 'days')})
      returnList.push({weeksDiff: maxDate.diff(minDate, 'weeks')})
      return returnList
    } else {
      returnList.push('No date object recieved') 
    }
  }
  
  getDistinctValues = (groupedDatalist, key) => {
    let distinctValueList = []
    groupedDatalist.map((item) => {
      distinctValueList.push(item[key])
    })
    return distinctValueList
  }

  storeInState = (key, valueObject) => {
    this.setState(prevState => ({
      [key]: [...prevState[key], valueObject]
    }))
  }

  getTypeOfKeyInStore(key) {
    return typeof store.get(key)
  }

  async storeLocal(key, valueObject) {
    await store.save(key, valueObject).done()
  }

  async pushToStore(key, valueObject) {
    await store.push(key, valueObject)
  }

  async getFromStore(key) {
    await store.get(key).then((result) => { 
      // console.log(typeof(result))
      if (result) { return result } else { return 'No data' } 
    })
  }

  async getFromStoreAndSetInSate(key){
    this.setState({loading:true})
    await store.get(key).then((result) => { 
      this.setState(prevState => ({
        [key]: [...prevState[key], result]
      }))
      // console.log(this.state[key])
     })
  }

  renderArray(toRender){
    return toRender.map((array) => {
      return array.map((item, index) => {
        return <Text key={index}> { item } </Text>
      })
    })
  }

  removeFromArray(array, index) {
    let newList = array.splice(index,1);
    this.setState({ [array]: newList} )
  }

  renderArrayOfObjects(toRender){
    return toRender.map((array) => {
      return array.map((object, objectIndex) => {
        return Object.keys(object).map((key, keyindex) => {
          // if ((key == 'email') || (key == 'birthyear')) {
            if (key == 'headerImg') {
              return <View key={ objectIndex + keyindex } style={{ padding: 4, backgroundColor: (objectIndex % 2 == 0) ? '#ecf0f1' : '#fff' }}>
                      <ResponsiveImage  key={ objectIndex + keyindex } source={{ uri: object[key] }} initWidth='360' initHeight='80' style={{ marginBottom: 20 }} />
                    </View>  

            } else {
            
            return <View key={ objectIndex + keyindex } style={{ padding: 4, backgroundColor: (objectIndex % 2 == 0) ? '#ecf0f1' : '#fff' }}>
                    <Text key={ objectIndex + keyindex }> { key + ': ' + object[key] }</Text>
                   </View>  
            }
         // }
        })  
      })
    })
  }

  getPropertyValueOfLastObjectInArray(objectArray, objectProperty){
    //Check for array nesting
    isArr = Object.prototype.toString.call(objectArray) == '[object Array]';
    if (isArr) {
      //Check if first item in objectArray is array
      firstItemisArr = Object.prototype.toString.call(objectArray[0]) == '[object Array]';
      if (firstItemisArr) {
        arrayLength = objectArray[0].length - 1
        LastObjectInArray = objectArray[0][arrayLength]
        console.log("​utils -> getPropertyValueOfLastObjectInArray -> LastObjectInArray[objectProperty]", LastObjectInArray[objectProperty])
        return LastObjectInArray[objectProperty]
      }
    } else {
      return 'Recieved no array'
    }
  }

  splitMulti(str, tokens){
    var tempChar = tokens[0]; // We can use the first token as a temporary join character
    for(var i = 1; i < tokens.length; i++){
        str = str.split(tokens[i]).join(tempChar);
    }
    str = str.split(tempChar);
    return str;
  }

  getRange(start, end){
		console.log("​utils -> getRange -> start", start, ' => ', end)
    data = [];
    _.times( end, function( n ){ 
      console.log("​utils -> getRange -> n", n)
      data.push( start ++ ) 
    } );
		
    return data
  }


}
const utilities = new utils
export default utilities


      // const nowDate = new Date().toJSON()
      // const currentDate = nowDate.substring(0, 10)
      // const dateA = moment(currentDate)
      // const dateB = moment('2018-08-31')
      // console.log('Diff in days: ', dateA.diff(dateB, 'days'))
      // console.log('Getting dayOfYearNumber: ', dateA.dayOfYear())
      // console.log('Getting weeknumber: ', dateB.week() )