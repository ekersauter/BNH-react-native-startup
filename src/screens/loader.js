import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  ImageBackground
} from 'react-native';

import globalSetup from '../data/globalSetup.json'
const loaderBg = 'data:image/png;base64,' + globalSetup[0]['loaderBg']

const Loader = props => {
  const {
    loading,
    ...attributes
  } = props;

  return (

    <Modal
      transparent={false}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => { console.log('close modal') }}>
      <ImageBackground source={{ uri: loaderBg }} style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loading}
            size='large'
            color='#000' />
        </View>
      </ImageBackground>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    opacity: 0.6,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',

  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    opacity: 0.4,
  }
});

export default Loader;