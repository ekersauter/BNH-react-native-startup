import React from 'react';
import { StyleSheet, Button, Text, View, Picker, ScrollView, Platform } from 'react-native';

export default class userPlatform extends React.Component {

    render() {
        return(
        <View>
            <Text>OS: { Platform.OS }</Text>
            <Text>Version: { Platform.version }</Text>
            <Text>isPad: { Platform.isPad }</Text>
            <Text>isTV: { Platform.isTV }</Text>


        </View>
        );
    }
}