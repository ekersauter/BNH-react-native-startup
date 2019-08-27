/*
    Push notifications
    https://forums.expo.io/t/ios-not-getting-push-notifications/7966/7
*/

import React from 'react'
import expo from 'expo'

export default class ExpoApi extends React.Component {

    getDevData() {
        console.log('Object.keys(expo.Constants.platform)[0]:', Object.keys(expo.Constants.platform)[0]);
        console.log('Expo.Constants.deviceId:', Expo.Constants.deviceId)
        console.log('Expo.Constants.installationId:', Expo.Constants.installationId)
        // console.log('Expo.Notifications.getExpoPushTokenAsync():', Expo.Notifications.getExpoPushTokenAsync())
        console.log('Expo.Constants.sessionId:', Expo.Constants.sessionId)
    }

    render() {

        return this.getDevData()
    }
}