import React from "react";
import Slider from "react-native-slider"
import ResponsiveImage from 'react-native-responsive-image'
import {TouchableOpacity, StyleSheet, View, Text, Image} from "react-native"
import utilities from '../functions/utils'

export default class SliderTool extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            headerImgVisible: this.props.headerImgShow,
            value: this.props.storedValue,
            docId: this.props.docId,
            variableName: this.props.variableName
        }
    }

    componentDidMount(){
        
        if (this.props.storedValue !== undefined) {
            this.setState({
                isVisible: !this.state.isVisible,
            })
        }
    }

    showNextButton() {
        this.setState({isVisible: true})
    }

    sequenceImages(){

        let sequenceImagesList = this.props.sequenceImg
        return sequenceImagesList.map((src) => {
            return <ResponsiveImage 
                    key={src} source={{ uri: src }} initWidth='60' initHeight='60' style={{ marginBottom: 20, flex:1 }}>
                    </ResponsiveImage>
        })
    }

    render() {

        let imageList = []
        imageList.push(<ResponsiveImage 
          key={this.props.headerImg} 
          source={{ uri: this.props.headerImg }} 
          initWidth='120' 
          initHeight='120'
          style={{ marginBottom: 20, flex:1 }}
          />)

        return (

            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    { this.sequenceImages() }
                </View>    
                { this.state.headerImgVisible? imageList[0] :null }

                <Text style={styles.headerText}>
                    {this.props.headerText}
                </Text>
                <Text style={styles.text}>
                    {this.props.text}
                </Text>
                <Text style={styles.text}>
                    {this.props.extraText}
                </Text>
                <Text style={{
                    marginTop: 10
                }}></Text>
                <Slider
                    step={this.props.interval}
                    value={this.state.value}
                    onValueChange={value => {
                        this.setState({value});
                        this.showNextButton();
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
                        <Text
                            style={[
                            styles.labelText, {
                                textAlign: 'left'
                            }
                        ]}>
                            {this.props.labelLeft}
                        </Text>
                    </View>
                    <Text style={styles.text}></Text>

                    <View style={styles.rightContainer}>
                        <Text style={styles.labelText}>{this.props.labelRight}</Text>
                    </View>
                </View>
                {this.state.isVisible
                    ? <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                            this.props.sendCurrentQuestion({id: this.props.docId, variable: this.props.variableName, value: this.state.value })
                            let storeKey = this.props.storeKey
                            let key = this.props.docId;
                            datetime = new Date().toJSON();
                            utilities.pushToStore(storeKey, {
                                id: key, 
                                datetime: datetime, 
                                variableName: this.state.variableName, 
                                value: this.state.value
                            });
                        }}>
                            <Text style={styles.buttonText} >{ this.props.nextButtonLabel }</Text>
                        </TouchableOpacity>
                    : null}
                <Text>
                    Value: {this.state.value}
                    Id: {this.props.docId}
                </Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        alignItems: "stretch",
        // justifyContent: "center",
        marginTop: 20
    },
    innerContainer: { alignItems: 'center', flex:0, flexDirection: 'row' },

    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 12,
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
        color: '#747e84'
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