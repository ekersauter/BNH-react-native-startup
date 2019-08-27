import React from "react";
import Slider from "react-native-slider"
import ResponsiveImage from 'react-native-responsive-image'
import {TouchableOpacity, StyleSheet, View, Text, Image} from "react-native"
import utilities from '../functions/utils'
import { Actions } from 'react-native-router-flux'


export default class NumberSlider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            headerImgVisible: this.props.headerImgShow,
            value: this.props.storedValue,
            docId: this.props.docId,
        }
    }

    componentDidMount(){
        if (this.props.storedValue !== undefined) {
            this.setState({
                isVisible: (this.props.buttonVisible === 'true'),
            })
        }
    }

    showNextButton() {
        this.setState({isVisible: true})
    }

    render() {

        let imageList = []
        imageList.push(<ResponsiveImage 
          key={this.props.headerImg} 
          source={{ uri: this.props.headerImg }} 
          initWidth='360' 
          initHeight='80'
          style={{ marginBottom: 20 }}
          />)

        return (

            <View style={styles.container}>

                { this.state.headerImgVisible? imageList[0] :null }

                <Text style={styles.headerText}>
                    {this.props.headerText}
                </Text>
                <Text style={styles.text}>
                    {this.props.text}
                </Text>
                <Text style={{
                    marginTop: 10
                }}></Text>
                <Slider
                    step={this.props.interval}
                    value={this.props.storedValue}
                    onSlidingComplete={value => {
                        this.setState({value});
                        let storeKey = this.props.storeKey
                        let key = this.props.docId;
                        let datetime = new Date().toJSON();
                        utilities.pushToStore(storeKey, {id: key, datetime: datetime, value: value})
                    }}
                    trackStyle={styles.track}
                    thumbStyle={styles.thumb}
                    minimumValue={this.props.minimumValue}
                    maximumValue={this.props.maximumValue}
                    minimumTrackTintColor='#abbddb'
                    maximumTrackTintColor='#778cad'
                    thumbTintColor='#ccc'/>
                <View style={styles.labelBar}>
                    <View style={styles.leftContainer}>
                        <Text style={[ styles.labelText, {textAlign: 'left' } ]}>
                            {this.props.labelLeft}
                        </Text>
                    </View>
                    <Text style={styles.text}></Text>

                    <View style={styles.rightContainer}>
                        <Text style={styles.labelText}>{this.props.labelRight}</Text>
                    </View>
                </View>
                {this.state.isVisible? 
                <TouchableOpacity style={styles.button} onPress={ () => Actions.dashBoardKey() }>
                    <Text style={styles.buttonText} >{ this.props.nextButtonLabel }</Text>
                </TouchableOpacity>
                : null}

            </View>
        );
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
        fontSize: 20,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
    },
    labelBar: {
        height: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // backgroundColor: 'green'
    },
    labelText: {
        fontSize: 14,
        color: '#8585ad'
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
        // backgroundColor: 'red',
    },
    rightIcon: {
        height: 10,
        width: 10,
        resizeMode: 'contain',
        backgroundColor: 'white'
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
    track: {
      marginTop: 3,
      height: 6,
      borderRadius: 2,
      backgroundColor: 'white',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 12,
      alignItems: 'center'
  },
  thumb: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(54, 70, 96, 1)',
    borderColor: 'rgba(0, 0, 0, 0.9)',
    borderWidth: 4,
    borderRadius: 20
}
});