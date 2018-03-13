import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, FlatList, View, Text, Button, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.27
import AwesomeButton from 'react-native-really-awesome-button';


class AlignItemsBasics extends React.Component {

  render() {

    let picHeader = {
      uri: 'http://www.brandnewhealth.com/uploads/7/9/1/3/79132130/1468490553.png'
    };

    let picBg = {
      uri: 'http://www.brandnewhealth.com/uploads/7/9/1/3/79132130/background-images/273746054.png'
    };

    let flexPic1 = {
      uri: 'http://www.brandnewhealth.com/uploads/7/9/1/3/79132130/wph_3.png'
    }
    let flexPic2 = {
      uri: 'http://www.brandnewhealth.com/uploads/7/9/1/3/79132130/poph_3.png'
    }
    let flexPic3 = {
      uri: 'http://www.brandnewhealth.com/uploads/7/9/1/3/79132130/cc_4.png'
    }

    return (
    <ScrollView>

      <View style={{flex: 1}}>
          <View style={{width: '100%', height: 80, backgroundColor: '#26779e', paddingTop: 10}}>
            <Image source={picHeader} style={{width: 200, height: 22, marginLeft: 20, marginTop: 20,}}/>
          </View>
          <View>
            <Image source={picBg} style={{width: '100%', height: 120}}/>
          </View>
          <View>
            <Text style={styles.normalTextWhite}>new</Text>
            <Text style={styles.normalTextNext}>insights</Text>
          </View>
          <View style={{
            padding: 12,
            flex: 1, 
            flexDirection: 'row', 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <Image source={flexPic1} style={{width: '30%', height: 80}}/>
          <Image source={flexPic2} style={{width: '30%', height: 80}}/>
          <Image source={flexPic3} style={{width: '30%', height: 80}}/>
          </View>
          <View>
            <Text style={styles.textHeader}>Vitaly - ichange3 columnist - {"\n"} on the trends for 2018</Text>
          </View>
          <View>
          <Text style={styles.normalText}>
            The Shout blog of our vitality app is Vitaly''s natural domain.
            He always has a surprising take on health or vitality. Here''s his view on the trends for 2018.
            {"\n"} {"\n"}
            Three days into the new year, so it''s about time I share the three crucial vitality trends for 2018 with you.
          </Text>
          </View>
          <View  style={{ justifyContent: 'center', alignItems: 'center', }}>
            {/*
              To ease up the button props cross platform:
              yarn add react-native-really-awesome-button
              For more information see: 
              https://www.npmjs.com/package/react-native-really-awesome-button
            */}            
            <AwesomeButton onPress={() => this.props.navigation.navigate('Details1')}
            height={40}
            borderRadius={20}
            >
              Fruit-mantra
            </AwesomeButton>
          </View>
          <View  style={{ justifyContent: 'center', alignItems: 'center', }}>
            <View style={styles.button}>
              <Button
              onPress={() => this.props.navigation.navigate('Details2')}
                title="Microbreaks"
              />
            </View>
          </View>
          <View  style={{ justifyContent: 'center', alignItems: 'center', }}>
            <View style={styles.button}>
              <Button
              onPress={() => this.props.navigation.navigate('Details3')}
                title="Hopping"
              />
            </View>
          </View>
      </View>
    </ScrollView>

    );
  }
};


class DetailsScreen1 extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
        <Text style={styles.normalText}>
        1. For a long time, the fruit-mantra has been: three pieces a day. But because we live in a visual culture and increasingly capture our performances with photos and selfies, this simple adage is no longer enough.
        {"\n"}{"\n"}
          In 2018 your fruit will also have to look nice, and especially: it will have to fit together. An aesthetic inspection committee will assess your photo compositions in real time. Because: a banana, kiwi and khaki combined? It is a challenge to make something of that! And I''m not even talking about taste here. So scoring on social media and highlighting your vitality is now done with compatible fruits.
        </Text>
      </View>
    );
  }
}

class DetailsScreen2 extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
        <Text style={styles.normalText}>
        2. Microbreaks - powernaps - standing meetings - walking meetings....
        it''s all becoming common practice, but the end has not yet been reached.
        {"\n"}{"\n"}
        The trend for 2018 is: short naps during meetings, for those agenda
        items where your contribution is not needed. Staring at the ceiling
        purposelessly, playing with the sugar packets on the table or doodling:
        all things of the past. Relentless and super-efficient power napping
        is now on the agenda. Where you would have been ridiculed 5 years ago,
        you will now reap awe and praise!{"\n"}{"\n"}
        For an extra dramatic touch, add a collective sleep moment to the
        misc. on the agenda! That''s guaranteed to be a glorious, energetic
        finale to a successful meeting and your very own 15 minutes of fame!
        </Text>
      </View>
    );
  }
}

class DetailsScreen3 extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
        <Text style={styles.normalText}>
        {"3. Finally, 'sitting is new smoking, 'standing too long is new sitting .... "}
        {"\n"}{"\n"}
        {"It simply doesn't stop. So what's the solution then? In 2018, hopping to work and at work is the real deal. "}
        {"\n"}{"\n"}
        {"Become a trendsetter and a trend hopper all at once!"}
        </Text>
        <Image
          source={{uri: 'http://www.brandnewhealth.com/uploads/7/9/1/3/79132130/nieuwsbrief-december-afb_1.png'}}
          style={{width:'100%', height:80, marginTop:100}}/>
      </View>
    );
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: AlignItemsBasics,
    },
    Details1: {
      screen: DetailsScreen1,
    },
    Details2: {
      screen: DetailsScreen2,
    },
    Details3: {
      screen: DetailsScreen3,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const styles = StyleSheet.create({

  container: {
   paddingTop: 10,
  },
  item: {
    padding: 10,
    fontSize: 13,
  },
  row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flex: 1
    },
    bullet: {
        width: 10,
        marginLeft:20,
    },
    bulletText: {
        flex: 1,
        paddingBottom: 10,
    },
    boldText: {
        fontWeight: 'bold'
    },
    normalText: {
      color: 'darkslategrey',
      fontSize: 14,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20,

    },
    normalTextWhite: {
      color: 'white',
      fontSize: 40,
      marginLeft: '40%',
      marginTop: -110,
      // height:40,
    },
    normalTextNext: {
      color: 'white',
      fontSize: 40,
      marginLeft: '40%',
      marginTop: -20,
     // fontFamily: 'vincHand',
      // height:40,
    },

    textHeader: {
      color: '#26779e',
      fontSize: 26,
      marginLeft: 20,
      marginTop: 10,
     // fontFamily: 'vincHand',
      // height:40,
    },

    button: {
      marginTop:20,
      width: '70%',
      height: 40,
      backgroundColor: '#26779e',
      paddingTop: 0,
      borderRadius: 20,
      marginLeft:20,
      marginRight:20,
      color:'#ffffff'
    },
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
