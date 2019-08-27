import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import {Actions, ActionConst} from 'react-native-router-flux';
import AwesomeButton from 'react-native-really-awesome-button/src/themes/c137';

export default class ToolSelector extends React.Component {
  state = { checkboxOrientation: '' }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity onPress={this.onPressNext.bind(this)}>
        <AwesomeButton style={{ margin:6 }} onPress={ () => Actions.homeKey() } >Go back home </AwesomeButton>
        <AwesomeButton style={{ margin:6 }} onPress={ () => Actions.checkboxToolKey({ checkboxOrientation: 'column' }) }  > Go to checkbox in list </AwesomeButton>
        <AwesomeButton style={{ margin:6 }} onPress={ () => Actions.checkboxToolKey({ checkboxOrientation: 'row' }) }  > Go to checkbox aside </AwesomeButton>
        <AwesomeButton style={{ margin:6 }} onPress={ () => Actions.chooserToolKey() } > Go to chooserTool </AwesomeButton>
        <AwesomeButton style={{ margin:6 }} onPress={ () => Actions.pickerToolKey() } > Go to pickerTool </AwesomeButton>
        <AwesomeButton style={{ margin:6 }} onPress={ () => Actions.radioButtonsToolKey() } > Go to radioButtonTool </AwesomeButton>
        <AwesomeButton style={{ margin:6 }} onPress={ () => Actions.sliderToolKey() } > Go to sliderTool </AwesomeButton>
        <AwesomeButton style={{ margin:6 }} onPress={ () => Actions.weekDayKey() } > Go to Week day picker </AwesomeButton>
        {/* <AwesomeButton style={{ margin:6 }} onPress={ () => Actions.simpleButtonKey() } > Go to multiple button selector </AwesomeButton> */}
        {/* <Button onPress={ () => Actions.svgIconTool() } > Go to svgIconTool </Button> */}
        </TouchableOpacity>
      </ScrollView>  
    );
  }
  onPressNext() {
    Actions.checkboxToolKey({ checkboxOrientation: this.state.checkboxOrientation });
  }
}


  const styles = StyleSheet.create({
    contentContainer: {
      paddingVertical: 20,
      alignItems: 'center',

    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      width: 40,
      height: 40,
      borderRadius: 20,
      borderColor: 'gray',
    },
    buttonRing: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      width: 60,
      height: 60,
      borderRadius: 30,
      borderColor: 'black',
    },
    countContainer: {
      alignItems: 'center',
      padding: 10
    },
    countText: {
      color: '#FF00FF'
    }
  });
  