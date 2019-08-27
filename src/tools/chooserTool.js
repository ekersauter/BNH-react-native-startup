import React, { Component } from 'react';
import {Select, Option} from 'react-native-chooser';
import selectorOptions from '../data/selectorOptions.json'

import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

const cfg = {
  headerText: 'Question?',
  textBox: 'Lorem Ipsum is simply dummy Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  docId: 'Hra/12345',
}

export default class chooserTool extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      value : 'Select Me Please'}
  }

  componentDidMount() {
    this.loadData();
}

loadData() {
    this.setState({
        dataArray: selectorOptions
    })
}
  
  onSelect(value, label) {
    this.setState({value : value});
  }

  renderSelect() {
    var views = [];
    for (let i = 0; i < this.state.dataArray.length; i ++) {  
      views.push( <Option value = { this.state.dataArray[i].value } > { this.state.dataArray[i].label } </Option> )
    }
    return views;
}      
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', }}>
                    { cfg.headerText }
        </Text>
        <Text style={{ fontSize: 16, }}>
                    { cfg.textBox }
        </Text>
        <Text style={{ marginTop:10 }}></Text>  
        <Select
            style= {{ width: '100%' }}
            onSelect = {this.onSelect.bind(this)}
            defaultText  = {this.state.value}
            style = {{borderWidth : 1, borderColor : 'grey'}}
            textStyle = {{}}
            indicator = 'down'
            backdropStyle  = {{backgroundColor : '#d3d5d6'}}
            optionListStyle = {{backgroundColor : '#F5FCFF', width: '90%', height: '50%' }}
          >
          { this.renderSelect() }
        </Select>
        <Text>
            { cfg.docId }: { this.state.value }
        </Text> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2',
        marginTop:20,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        }
    }
)

/*

    https://www.npmjs.com/package/react-native-chooser

*/