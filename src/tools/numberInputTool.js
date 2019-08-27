import React from  'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground
  } from 'react-native'
import ResponsiveImage from 'react-native-responsive-image'
import NumericInput from 'react-native-numeric-input'
import utilities from '../functions/utils'


export default class NumericInputTool extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            value: null,
            initValue: null,
            isVisible: false,
            headerImgVisible: this.props.headerImgVisible,
            options: this.props.options,
            changeText:'',
            variableName: this.props.variableName
        }

        this.onSelect = this.onSelect.bind(this)

    }

    componentWillMount(){
        
        if (this.props.storedValue !== undefined) {    
            this.setState({
                isVisible: !this.state.isVisible,
                value: this.props.storedValue,
                initValue: this.props.storedValue,
            })
        } else {
            this.setState({
                isVisible: !this.state.isVisible,
                value: this.props.initValue,
                initValue: this.props.initValue,
            })
        }
    }

    toggleNextButtonVisibility() {
      this.setState({
          isVisible: !this.state.isVisible
      })
    }

    showNextButton(value) {
        this.setState({isVisible: true})
        if (this.props.changeText) {
            this.setState({
                changeText: `${this.props.changeText[0]} ${value} ${this.props.changeText[1]}`
            })
        }
    }
 
    onSelect(value){
        let storeKey = this.props.storeKey
        let key = this.props.docId
        datetime = new Date().toJSON()
        utilities.pushToStore(storeKey, {id: key, variableName: this.state.variableName, datetime: datetime, value: value})
    }


    render() {

        let imageList = []
        imageList.push(<ResponsiveImage 
          key={this.props.headerImg} 
          source={{ uri: this.props.headerImg }} 
          initWidth='360' 
          initHeight='80'
          style={{ marginBottom: 20 }}
          resizeMode = 'cover'
          />)

        return (
        
        <View style={styles.container}>
            
                { this.state.headerImgVisible? imageList[0] :null }
                
                <Text style={ styles.headerText }>{ this.props.headerText }</Text>
                <Text style={styles.barHeader}> 
                        { String( this.state.changeText + '\n\n' + this.props.text).toUpperCase() } 
                </Text>
                

                <View style={styles.inputBar}>
                    <View style={styles.leftContainer}>
                        <Text style={[ styles.labelText, {  textAlign: 'left'  } ]}></Text>
                    </View>

                     <NumericInput 
                        totalWidth={260}
                        value={this.state.value} 
                        initValue={this.state.initValue}
                        totalHeight={this.props.totalHeight} 
                        iconSize={24}
                        minValue={this.props.minValue}
                        maxValue={this.props.maxValue}
                        step={this.props.step}
                        type={this.props.alterType}
                        rounded
                        onChange={value => { this.setState({ value: value }); this.showNextButton(value)}} />

                    <View style={styles.rightContainer}>
                        <Text style={styles.labelText}></Text>
                    </View>
                </View>

       

        {this.state.isVisible
            ? <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        this.props.sendCurrentQuestion({id: this.props.docId, variable: this.props.variableName, value: this.state.value })
                        this.onSelect(this.state.value);
                }}>
                    <Text style={styles.buttonText} >{ this.props.nextButtonLabel }</Text>
                </TouchableOpacity>
            : null}

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
      marginBottom:20
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
    inputBar: {
        height: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom:20
        // backgroundColor: 'blue',
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // backgroundColor: 'green'
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
        // backgroundColor: 'red',
    },
    barHeader: {
        margin: 20,
        fontSize: 10,
        textAlign: 'center',
        color: 'black',
      },
  })
  