import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import ResponsiveImage from 'react-native-responsive-image'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'

import utilities from '../functions/utils'

import globalSetup from '../data/globalSetup.json'
const globalLanguageSetting = globalSetup[0]['globalSetupLanguage']


export default class RadioButtons extends Component{

    constructor(props){
        super(props)
        this.state = {
          isVisible: false,
          headerImgVisible: this.props.headerImgShow,
          options: this.props.options,
          selectedValue: this.props.selectedValue,
          variableName: this.props.variableName
        }
        this.onSelect = this.onSelect.bind(this)
    }

    componentDidMount(){
        
        if (this.props.storedValue !== undefined) {
            this.setState({
                isVisible: !this.state.isVisible,
                selectedValue: this.props.storedValue
            })
        }
    }

    toggleNextButtonVisibility() {
      this.setState({
          isVisible: !this.state.isVisible
      })
    }

    showNextButton() {
        this.setState({isVisible: true})
    }

    async onSelect(index, value){
        storeKey = this.props.storeKey
        if (storeKey == null) { storeKey = 'answersHra' }
        this.setState({
        text: `Selected index: ${index} , value: ${value}`,
        selectedValue: value
        })
        let key = this.props.docId
        datetime = new Date().toJSON()
        utilities.pushToStore(storeKey, {id: key, variableName: this.state.variableName, datetime: datetime, value: value})
    }

    render(){

        let imageList = []
        imageList.push(<ResponsiveImage 
          key={this.props.headerImg} 
          source={{ uri: this.props.headerImg }} 
          initWidth='360' 
          initHeight='80'
          style={{ marginBottom: 20 }}
          />)

        return(
            <View style={styles.container}>
            
                { this.state.headerImgVisible? imageList[0] :null }
                
                <Text style={ styles.headerText }>{ this.props.headerText }</Text>
                <Text style={ styles.text }>
                    { this.props.text }
                </Text>

                <RadioGroup
                    onSelect = {(index, value) => {
                        this.onSelect(index, value); 
                        this.showNextButton();
                    }}
                    selectedIndex = { this.props.storedValue }
                >

                  { this.state.options.map((item, index) => {
                      const buttonLabel = item['label'][globalLanguageSetting]
                      return( <RadioButton value={item.value} key={index} >
                                <Text>{ buttonLabel } </Text>
                              </RadioButton> );
                  })}
                
                </RadioGroup>
                {this.state.isVisible
                    ? <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.props.sendCurrentQuestion({id: this.props.docId, variable: this.props.variableName, value: this.state.selectedValue })
                    }}>
                            <Text style={styles.buttonText} >{ this.props.nextButtonLabel }</Text>
                        </TouchableOpacity>
                    : null}
                <Text style={styles.text}>{this.state.text}</Text>
            </View>
        )
    }
}

let styles = StyleSheet.create({
  container: {
    flex: 0,
    marginLeft: 20,
    marginRight: 20,
    alignItems: "stretch",
    // justifyContent: "center",
    marginTop: 20
},
headerText: {
    fontSize: 20,
    fontWeight: 'bold',
},
text: {
    fontSize: 16,
  },
    button: {
        marginTop: 10,
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
    },
})
