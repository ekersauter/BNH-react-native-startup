import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';

import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';

const CONTENT = [
  {
    title: 'Etiam mollis suscipit elit,',
    content: 'in malesuada lectus pretium a. Pellentesque venenatis aliquet orci, quis iaculis turpis semper non. Praesent scelerisque, ligula a sodales cursus, nibh est fringilla ligula, ac venenatis est velit eu quam. Vestibulum arcu arcu, viverra eget scelerisque eu, pulvinar at ex. In dignissim, metus vitae varius egestas, arcu risus maximus nisl, in condimentum nisl turpis et odio. Cras ac lorem non mauris ultrices blandit.',
  },
  {
    title: 'Aenean facilisis, ante quis facilisis varius',
    content: 'Duis eget fermentum eros, a tempor leo. Proin in pellentesque diam. Maecenas aliquam est eu metus varius, ut condimentum ligula laoreet. Nullam vitae tellus vitae ante ullamcorper sagittis eget non lorem. Etiam lobortis ultricies consequat. Cras id luctus purus. Phasellus egestas suscipit sem vel sagittis. Fusce in erat metus. Pellentesque ut augue at urna finibus lobortis quis quis eros. Quisque mollis rhoncus est, ut bibendum urna laoreet non. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Nam sagittis eros ultricies',
    content: 'Cras hendrerit et tellus sit amet auctor. Suspendisse tristique venenatis massa a facilisis. Proin posuere finibus tincidunt. Praesent eget ante ornare, mattis justo quis, gravida massa. Morbi euismod augue nec feugiat suscipit. Mauris nec odio sit amet quam finibus posuere eu sit amet ligula.',
  },
  {
    title: 'Suspendisse potenti',
    content: 'Nunc viverra, lacus et consequat lobortis, justo urna tincidunt orci, in eleifend nunc sapien malesuada quam. Phasellus viverra sagittis mauris, ut porttitor augue dapibus non. Etiam et massa a quam laoreet laoreet nec vitae ex. Ut vitae lorem ut nisi condimentum vulputate. Donec varius urna at libero tempor, a pulvinar sem sollicitudin. Mauris ac semper diam. Fusce id ex sem. Duis ultricies dolor sit amet diam interdum commodo. Duis elementum porttitor lacus, sit amet finibus sem sagittis eget. Proin pulvinar augue sed rhoncus congue. In nec mauris elit.',
  },
  {
    title: 'Lorem ipsum dolor sit amet',
    content: 'Fusce id felis id metus facilisis interdum sit amet quis ligula. Mauris nec orci diam. Duis nulla arcu, fringilla quis elit eget, ullamcorper pharetra lectus. In malesuada sem vitae congue blandit. Curabitur sollicitudin eros at lectus lacinia maximus. Aliquam tristique odio a metus lacinia venenatis. Aenean dapibus quis ante eu pulvinar. Vestibulum pellentesque est nulla, quis viverra dolor accumsan quis. Nunc non pulvinar lorem, sed convallis tortor. Proin sagittis tincidunt auctor. Ut sed tincidunt magna, in dictum ligula. Praesent eu nisl quis ipsum pretium pellentesque ut vitae lorem.',
  },
];


export default class AccordionView extends Component {
  state = {
    activeSection: false,
    collapsed: true,
  };


  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSection = section => {
    this.setState({ activeSection: section });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={100}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={100}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text 
          duration={100}
          easing="ease-out"
          animation={isActive ? 'zoomIn' : false}
        >
        {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Image 
            style={{
                flex: 1,
                alignSelf: 'center',
                width: '90%',
              }}
            source={require('../images/bib_test.png')} 
            resizeMode="contain"
            />  
        
        <Accordion
          activeSection={this.state.activeSection}
          sections={CONTENT}
          touchableComponent={TouchableOpacity}
          renderHeader={this.renderHeader}
          renderContent={this.renderContent}
          duration={100}
          onChange={this.setSection}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
});