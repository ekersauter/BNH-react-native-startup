//Loading components dynamic https://gist.github.com/davidgljay/5d7a29c5add8b360b93db838235e80a8

import React from 'react';
import { DangerZone } from 'expo';
import { Pedometer } from "expo";

import utilities from './src/functions/utils'

import globalSetup from './src/data/globalSetup.json'
import { StyleSheet, Text, View, Image } from 'react-native';
import Menu, { MenuProvider, MenuOptions, MenuOption, MenuTrigger, renderers } from 'react-native-popup-menu';
import { Scene, Router, Actions, Reducer, ActionConst } from 'react-native-router-flux';

// import startUp from './src/functions/startup'
import HomePageScreen from './src/screens/home'
import userLanguage from './src/tools/language'
import register from './src/screens/register'
import registered from './src/screens/registered'
import hraQuestions from './src/screens/hra'
// import testStore from './src/screens/testStore'
// import sandbox from './src/screens/sandbox'
// import checkBoxText from './src/components/checkBoxTest'
import mLab from './src/data/backend'

import SimpleButton from './src/tools/SimpleButton'
import dashboard from './src/screens/dashboard'
import pedometer from './src/screens/pedometer'
import storeBrowser from './src/screens/storeBrowser'
import BarChartHorizontalWithLabels from './src/screens/barChart'
import dashBoardVars from './src/screens/dashBoardPrep'
import StepsDashBoard from './src/screens/stepsDashboard'
import dashBoardHra from './src/screens/dashboardHra'

const globalLanguageSetting = globalSetup[0]['globalSetupLanguage']

// Check steps
Pedometer.isAvailableAsync().then(
  result => {
    console.log('STEPS: ', result)
  },
  error => {
    this.setState({
      isPedometerAvailable: "Could not get isPedometerAvailable: " + error
    });
  }
);

const menu_logo = require('./src/images/menu_logo.png');
const hamburger = require('./src/images/menu.png');
const { ContextMenu } = renderers;

const reducerCreate = params => {
  const defaultReducer = Reducer(params);
  return (state, action)=>{
      // console.log("ACTION:", action);
      return defaultReducer(state, action);
  }
}

const refreshOnBack = () => { Actions.pop(); Actions.refresh('homeKey'); console.log('refreshOnBack is called!')}

const NavigatorMenu = () => (
  <Menu style={ styles.navigatormenu } renderer={renderers.Popover} >
    <MenuTrigger>
            <Image
              style={ styles.hamburger }
              resizeMode='contain'
              source={ hamburger }>
            </Image>
      </MenuTrigger>
    <MenuOptions customStyles={{optionText: styles.menuoptiontext}}>
      <Image source={menu_logo} style={{ width: 150, height: 150 }}/>

      <MenuOption onSelect={() => Actions.refresh({ key: 'homeKey'})} text='Start'/>
      <MenuOption onSelect={() => Actions.userLanguageKey() } text='Set language'/>
      <MenuOption onSelect={() => Actions.registerKey() } text='Start registratie'/>
      <MenuOption onSelect={() => Actions.hraQuestionsKey()} text='Start uw profiel' />
      {/* <MenuOption onSelect={() => Actions.testStoreKey()} text='testStore' /> */}
      <MenuOption onSelect={() => Actions.dashBoardVarsKey()} text='dashboard' />
      {/* <MenuOption onSelect={() => Actions.checkboxToolKey()} text='checkbox' /> */}
      <MenuOption onSelect={() => Actions.mLabKey()} text='mLab' />
      <MenuOption onSelect={() => Actions.dashBoardHraKey()} text='dashBoardHra' />
      <MenuOption onSelect={() => Actions.pedometerKey()} text='Pedometer' />
      <MenuOption onSelect={() => Actions.storeBrowserKey()} text='BrowseStore' />
      <MenuOption onSelect={() => Actions.BarChartHorizontalWithLabelsKey()} text='BarChartHorizontalWithLabels' />

    </MenuOptions>
  </Menu>
);

/*
  Key is the onPress Action.key for navigation

*/
class NavigatorRoute extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      checkIfIsRegistred: false,
      globalLanguageSetting: globalLanguageSetting
    }
    this.CheckIfKeyInStore = utilities.CheckIfKeyInStore.bind(this)
    this.getFromStoreAndSetInSate = utilities.getFromStoreAndSetInSate.bind(this)
  }

  render() {
    return (
      <MenuProvider>
        <Router createReducer={reducerCreate}>
          <Scene key='root' >

            {/* <Scene key='startUpKey' component={startUp} title='startUp' /> */}
            <Scene key='homeKey' component={HomePageScreen} title='Start' 
              renderLeftButton={NavigatorMenu} 
              // onEnter={this.onEnterHome} 
              />
            <Scene key='userLanguageKey' component={userLanguage} title='set language'/>
            <Scene key='registerKey' component={register} title='Registratie'/> 
            <Scene key='registeredKey' component={registered} title='Registered'/>
            <Scene key='hraQuestionsKey' component={hraQuestions} title='HRA'/>
            {/* <Scene key='testStoreKey' component={testStore} title='Store test'/> */}
            <Scene key='dashBoardVarsKey' component={dashBoardVars} title='dashBoardPrep'/>
            <Scene key='dashBoardKey' component={dashboard} title='dashBoard'/>

            {/* <Scene key='checkboxToolKey' component={checkBoxText} title='checkboxTool'/> */}
            <Scene key='mLabKey' component={mLab} title='mLab'/>
            <Scene key='dashBoardHraKey' component={dashBoardHra} title='dashBoardHra'/>
            <Scene key='pedometerKey' component={pedometer} title='Pedometer'/>
            <Scene key='storeBrowserKey' component={storeBrowser} title='BrowseStore' back onBack={refreshOnBack} />
            <Scene key='BarChartHorizontalWithLabelsKey' component={BarChartHorizontalWithLabels} title='BarChart'/>
            <Scene key='StepsDashBoardKey' component={StepsDashBoard} title='StepsDashBoard'/>

            
          </Scene>
        </Router>
      </MenuProvider>
    );
  }
}

const styles = StyleSheet.create({
  hamburger: { width:32, height:32, marginLeft:16, marginTop: 6 },
  navigatormenu: { width: '100%', height:'100%' },
  menuoptiontext: { marginLeft: 10, fontSize: 18 }
})

export default NavigatorRoute;
