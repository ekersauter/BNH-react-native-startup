import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text
} from 'react-native'
import CheckBox from 'react-native-check-box'
import keys from '../tools/checkBoxToolCfg.json'
import Toast from 'react-native-easy-toast'


const cfg = {
    headerText: 'Question?',
    textBox: 'Lorem Ipsum is simply dummy ',
    docId: 'Hra/12345',
}

export default class example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArray: [],
            orientation: this.props.text
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.setState({
            dataArray: keys
        })
    }

    onClick(data) {
        console.log(data)
        data.checked = !data.checked;
        let msg=data.checked? 'you checked ':'you unchecked '
        this.toast.show(msg+data.name);
    }

    renderView() {
        if (!this.state.dataArray || this.state.dataArray.length === 0)return;
        var len = this.state.dataArray.length;
        var views = [];
        for (var i = 0, l = len - 2; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={{ flexDirection: this.props.checkboxOrientation }} >
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i + 1])}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        views.push(
            <View key={len - 1}>
                <View style={{ flexDirection: this.props.checkboxOrientation }} >
                    {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len - 2]) : null}
                    {this.renderCheckBox(this.state.dataArray[len - 1])}
                </View>
            </View>
        )
        return views;

    }

    renderCheckBox(data) {
        var leftText = data.name;
        return (
            <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={()=>this.onClick(data)}
                isChecked={data.checked}
                leftText={leftText}
            />);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', }}>
                    { cfg.headerText } { this.props.checkboxOrientation }
                </Text>
                <Text style={{ fontSize: 16, }}>
                    { cfg.textBox } 
                </Text>    
                <Text style={{ marginTop:10 }}></Text>
                <ScrollView>
                    {this.renderView()}
                </ScrollView>
                <Toast ref={e=>{this.toast=e}}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2',
        marginTop:20,
        marginLeft: 20,
        marginRight: 20
    },
    item: {
        flexDirection: 'column',
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
})