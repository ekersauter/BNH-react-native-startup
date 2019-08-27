import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class DefaultLayout extends Component {
    render() {
        return (
        <View style={{flex:1, paddingTop:80}}>
            <ScrollView>
                {this.props.dataArray.map((element,index)=>{
                    return(
                        <TouchableOpacity style={styles.TouchableOpacityStyles} activeOpacity={1} key={index}
                                          onPress={this.props.onChange.bind(this,index)}>
                            <View style={styles.ViewOuter}>
                                <View style={styles.ViewInner1}>
                                    <Text style={styles.TextStyle}>{element}</Text>
                                </View>
                                <View style={styles.ViewInner2}>
                                    {this.props.selectedOption == index ?
                                        <Icon name='check' size={25} style={{padding:15, color:'#007AFF'}}/> : null}
                                </View>
                            </View>
                        </TouchableOpacity>
                    )})
                }
            </ScrollView>
        </View>
        );
    }
}
const styles=StyleSheet.create(
    {
        TouchableOpacityStyles: {
            height:60,
            width:380
        },
        ViewOuter:{
            flex:1,
            flexDirection:'row'
        },
        ViewInner1:{
            flex:6,
            backgroundColor:'white'
        },
        ViewInner2:{
            flex:1,
            backgroundColor:'white'
        },
        TextStyle:{
            padding:20
        }
    }
)