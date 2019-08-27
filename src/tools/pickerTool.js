import React from 'React'
import { View, Text, StyleSheet, Picker } from 'react-native'

const docId = 'Hra/12345'

export default class PickerTool extends React.Component {

    constructor () {
        super();
        this.state = {
            pickOption: 'Maak een keuze'
        }
      }

    render() {
        return (
            <View style= { styles.container }>
            <Picker
                selectedValue={this.state.pickOption}
                style={{ height: 50, width: '80%' }}
                onValueChange={(itemValue, itemIndex) => this.setState({pickOption: itemValue})}>
                <Picker.Item label='Maak een keuze' value='l0' />
                <Picker.Item label='Test1' value='1' />
                <Picker.Item label='Test2' value='2' />
                <Picker.Item label='Test3' value='3' />
                <Picker.Item label='Test4' value='4' />
                <Picker.Item label='Test5' value='5' />
                <Picker.Item label='Test6' value='6' />
            </Picker>

            <View>
                <Text> { docId }: { this.state.pickOption } </Text>
            </View>
            </View> 
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        }
    }
)