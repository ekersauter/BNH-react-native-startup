import React from 'react';
import { StyleSheet, View, Text, TextInput, AppRegistry, } from 'react-native';
import utils from '../functions/utils'
import store from 'react-native-simple-store';

console.log('<<<< TESTSTORE fetchKeysAndValues: ', utils.fetchAllKeysAndValues())


class sandbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      testArray: [],
      TestStore: ''
    })

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
    this.getFromStoreAndSetInSate = utils.getFromStoreAndSetInSate.bind(this);
  }

  async componentDidMount(){

    await store.save('storeSave', {id: 'saveStore', value: 'saveStoreValue' }).then(() => {
      this.getFromStore().done()
    }).done()
    // this.setState({
    //   testArray: utils.getRandomDates(2)
    // });
    
    // utils.storeLocal('TestStore', 'test') 

    // console.log('Get from store: ', this.getFromStoreAndSetInSate('TestStore'))

  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  lapsList() {
    
    let testArray = []
    this.state.testArray.map((item) => { testArray.push(item.datetime) })
    return this.state.testArray.map((data, index) => {
      return (
        <View key={ 'v_ ' + index }><Text key='index'>{data.datetime}</Text></View>
      );
    })
   }


   async getFromStore(){
     let resultFromStore = await store.get('storeSave')
     console.log('TCL: sandbox -> getFromStore -> resultFromStore', resultFromStore);
     return <Text> { resultFromStore } </Text>
   }

  render() {

    return (
      <View>

          {/* { this.lapsList() } */}
          {/* { this.getFromStore() } */}

      </View>
      // <View style={styles.outerContainer}>
      //   <TextInput
      //     placeholder="one"
      //     blurOnSubmit={ false }
      //     onSubmitEditing={() => {
      //       this.focusNextField('two');
      //     }}
      //     returnKeyType={ "next" }
      //     style={styles.textInput}
      //     ref={ input => {
      //       this.inputs['one'] = input;
      //     }}
      //   />
      //   <TextInput
      //     placeholder="two"
      //     blurOnSubmit={ false }
      //     onSubmitEditing={() => {
      //       this.focusNextField('three');
      //     }}
      //     returnKeyType={ "next" }
      //     style={styles.textInput}
      //     ref={ input => {
      //       this.inputs['two'] = input;
      //     }}
      //   />
      //   <TextInput
      //     placeholder="three"
      //     blurOnSubmit={ false }
      //     onSubmitEditing={() => {
      //       this.focusNextField('four');
      //     }}
      //     returnKeyType={ "next" }
      //     style={styles.textInput}
      //     ref={ input => {
      //       this.inputs['three'] = input;
      //     }}
      //   />
      //   <TextInput
      //     placeholder="four"
      //     blurOnSubmit={ true }
      //     returnKeyType={ "done" }
      //     style={styles.textInput}
      //     ref={ input => {
      //       this.inputs['four'] = input;
      //     }}
      //   />
      // </View>
    );
  };
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    flexDirection: 'column',
  },
  textInput: {
    alignSelf: 'stretch',
    borderRadius: 5,
    borderWidth: 1,
    height: 44,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

export default sandbox;

AppRegistry.registerComponent('NextInput', () => sandbox);