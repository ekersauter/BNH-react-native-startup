import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default class TextInputSetup extends React.Component {
    render() {
        return (
            <TextInput
                {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                editable = {true}
                underlineColorAndroid='transparent'
                placeholderTextColor="#737373"
                style={styles.textInput}
            />
        );
    }
}

const styles = StyleSheet.create({
textInput: { 
    height: 40,
    width: 260,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor:'white',
    paddingLeft: 10,
    marginTop: 10,
    borderRadius: 5,
  }
})