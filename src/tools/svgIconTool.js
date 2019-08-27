import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Constants, Svg } from 'expo';

export default class svgTest extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Svg height={100} width={100}>
          <Svg.Circle
            cx={50}
            cy={50}
            r={45}
            strokeWidth={2.5}
            stroke="#e74c3c"
            fill="#f1c40f"
          />
          <Svg.Rect
            x={15}
            y={15}
            width={70}
            height={70}
            strokeWidth={2}
            stroke="#9b59b6"
            fill="#3498db"
          />
        </Svg>

        <Svg height={100} width={100}>
          <Svg.Path 
            cx={50}
            cy={50}
            r={45}
            strokeWidth={2.5}
            stroke="#e74c3c"
            fill="#f1c40f"
          />
          <Svg.Rect
            x={15}
            y={15}
            width={70}
            height={70}
            strokeWidth={2}
            stroke="#9b59b6"
            fill="#3498db"
          />
        </Svg>
        {/* <Svg height={100} width={100}>
          <Svg.path d="M150 0 L75 200 L225 200 Z"/>
        </Svg> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
