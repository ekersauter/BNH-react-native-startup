/* 
  Source:
  https://www.npmjs.com/package/react-native-simple-radio-button
  https://github.com/moschan/react-native-simple-radio-button
*/

import React from 'react';
import { Text, View, ScrollView, Button, KeyboardAwareScrollView, StyleSheet } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel, updateIsActiveIndex } from 'react-native-simple-radio-button';
import AwesomeButton from 'react-native-really-awesome-button/src/themes/c137';


const buttonArr = [
    {
        label: "",
        value: ""
    },{
        label: "Z",
        value: "Z"
    }, {
        label: "M",
        value: "M"
    }, {
        label: "D",
        value: "D"
    }, {
        label: "W",
        value: "W"
    }, {
        label: "D",
        value: "D"
    }, {
        label: "V",
        value: "V"
    }, {
        label: "Z",
        value: "Z"
}
];

const setButtonInnerSize = 30;
const setButtunOuterSize = 36;
const docId = 'Hra/12345'
// const setButtonColor = 'rgb(92, 111, 142, 1)';

class RadioButtonTool extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
          stateIndex: 0,
          stateValue: 0,
          stateLabel: '',
          onClicked: false
        }
      }
    
    render() {
        return (
          <View style={ styles.container }>
            <Text style={ styles.header }>HEADER</Text>
            <Text style={ styles.body }>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          <RadioForm style={styles.RadioForm }
            formHorizontal={true}
            animation={false}  
          >
             {buttonArr.map((item, i) => {
               if (i>0)   
               return (
                 
                <RadioButton labelHorizontal={true} key={i} style={styles.RadioButton}>
                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                <RadioButtonInput
                  obj={item}
                  index={i}
                  isSelected={this.state.stateIndex === i}
                  onPress={(value, index) => {
                    this.setState({
                        stateIndex: index,
                        stateLabel: item.label,
                        stateValue: item.value,
                    })
                  }}
                  borderWidth={1}
                  buttonSize={setButtonInnerSize}
                  buttonOuterSize={setButtunOuterSize}
                  buttonStyle={{}}
                  buttonWrapStyle={{marginLeft: 10, marginTop: 15}}
                />
                <RadioButtonLabel
                  obj={item}
                  index={i}
                  labelHorizontal={true}
                  onPress={(value, index) => {
                    this.setState({
                        stateIndex: index,
                        stateLabel: item.label,
                        stateValue: item.value,
                    })
                  }}
                  labelStyle={{fontSize: 12, color: 'rgb(37, 38, 40)'}}
                  labelWrapStyle={{}}
                />
                </RadioButton>

               );
            })}
            
           </RadioForm>
           <View style={ styles.container }>
            <Text>selected: { docId } {buttonArr[this.state.stateIndex].label}: {buttonArr[this.state.stateIndex].value }</Text>
            <Button
              style={{fontSize: 20, borderColor: '#2196f3', borderWidth: 2, backgroundColor: '#ccc'}}
              
              onPress={() => {
                this.setState({
                    stateIndex: 0
                })
              }} 
              title='RESET'/>
           </View>
        </View>    
        )
      }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    alignItems: "stretch",
    // justifyContent: "center",
    marginTop: 20,
  },
    header: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'left',
    },
    body: {
      fontSize: 14,

    },
    RadioForm: {
      marginLeft:10,
      marginRight: 0,
      marginTop: 14,
    },
    RadioButton: {
    }
  });

export default RadioButtonTool;