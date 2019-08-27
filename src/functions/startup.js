import React from 'react'
import { View, Text } from 'react-native'
import utilities from '../functions/utils'
import { DangerZone } from 'expo';

const { Localization } = DangerZone;

export default class startUp extends React.Component{

    constructor(props){
        super(props);
        this.state ={ 
            currentLocale: 'nl', 
        }
        this.CheckIfKeyInStore = utilities.CheckIfKeyInStore.bind(this)
        this.getFromStoreAndSetInSate = utilities.getFromStoreAndSetInSate.bind(this)        
      }

      async componentWillMount() {
        const currentLocale = await Localization.getCurrentLocaleAsync();
        this.setState(() => ({ currentLocale }));
      }

      render() {
          let deviceLangageSetting = this.state.currentLocale.substring(0,4)
        return (
            <View>
                <Text>getCurrentLocaleAsync</Text>
                <Text> { deviceLangageSetting }</Text>
            </View>
        );
    }
}

