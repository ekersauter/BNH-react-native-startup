import React from "react";
import Slider from "react-native-slider";
import { AppRegistry, StyleSheet, View, Text } from "react-native";

const sliderValues = {
    startValue: 5,
    headerText: 'Question?',
    textBox: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    docId: 'Hra/12345',
}

class SliderTool extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      headerImg: this.props.headerImg,
      headerText: this.props.headerText,
      text: this.props.text,
      labelLeft: this.props.labelLeft,
      labelRight: this .props.labelRight,
      start: this.props.start,
      stop: this.props.stop,
      interval: this.props.interval,  
    }
  }
    state = {
    value: sliderValues.startValue,
    headerText: sliderValues.headerText,
    textBox: sliderValues.textBox,
    docId: sliderValues.docId,

  };

  render() {
    return (
        
      <View style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', }}>
            { sliderValues.headerText }
        </Text>
        <Text style={{ fontSize: 16, }}>
        { sliderValues.textBox }
        </Text>    
        <Text style={{ marginTop:10 }}></Text>
        <Slider
          step={2}
          value={this.state.value}
          onValueChange={value => this.setState({ value })}
          trackStyle={customStyles6.track}
          thumbStyle={customStyles7.thumb}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor='#abbddb'
          maximumTrackTintColor='#778cad'
          thumbTintColor='#ccc'
        />
        <Text>
          Value: {this.state.value} Id: {this.state.docId}
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
    marginTop: 20,
  }
});

var customStyles6 = StyleSheet.create({
    track: {
        marginTop: 3,
        height: 6,
        borderRadius: 2,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 12,
        alignItems: 'center',
    },
    thumb: {
      width: 20,
      height: 20,
      borderRadius: 2,
      backgroundColor: '#ccc',
      borderColor: '#ccc',
      borderWidth: 1,
    }
  });
  
  var customStyles7 = StyleSheet.create({
    track: {
      height: 1,
      backgroundColor: '#303030',
    },
    thumb: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(54, 70, 96, 1)',
      borderColor: 'rgba(0, 0, 0, 0.9)',
      borderWidth: 4,
      borderRadius: 20,
    }
  });

export default SliderTool;