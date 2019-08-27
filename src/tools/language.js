import React from 'react';
import { StyleSheet, Button, Text, View, Picker, ScrollView, Platform } from 'react-native';
import { DangerZone } from 'expo';
import globalSetup from '../data/globalSetup.json'
import RadioButtonTool from '../tools/radioButtonsTool'
import utilities from '../functions/utils'
import { Actions } from 'react-native-router-flux';

const { Localization } = DangerZone;
const availableLanguageOptions = globalSetup[0].availableLanguageOptions

const nl_Message = { phrase: 'Je taal staat op Nederlands' };
const fr_Message = { phrase: 'Votre langue est le français' };
const en_Message = { phrase: 'Your language is English' };

const localization = {
  nl_BE: {
    phrase: 'Hallo gebruiker',
    default: 'English language only',
  },
  ...Platform.select({
    ios: { en_: en_Message,  nl_BE: nl_Message, nl_NL: nl_Message, fr_BE: fr_Message, fr_FR: fr_Message },
    android: { en_: en_Message, nl_BE: nl_Message, nl_NL: nl_Message, fr_BE: fr_Message, fr_FR: fr_Message },
  }),
};

export default class userLanguage extends React.Component {
  static navigationOptions = {
    title: '',
  };
  constructor(p) {
    super(p);
    this.state = { 
      checkIfLanguageSettingIsStored: false,
      currentLocale: null, 
      preferredLocales: [], 
      isoCurrencyCodes: [], 
      selectedLanguage: 'nl_',
      StoredLanguageSetting: [],
      StoredLanguageSettingIndex: -1
    };

    this.localeStore = new Localization.LocaleStore(localization)
    this.CheckIfKeyInStore = utilities.CheckIfKeyInStore.bind(this)
    this.getFromStoreAndSetInSate = utilities.getFromStoreAndSetInSate.bind(this)

  }


  async componentDidMount() {
    await this.CheckIfKeyInStore('StoredLanguageSetting', 'checkIfLanguageSettingIsStored').then( async () => {

      if (this.state.checkIfLanguageSettingIsStored[0] == true ) {
          await this.getFromStoreAndSetInSate('StoredLanguageSetting').then((result)=>{
        }).done()
      }
    })

    const currentLocale = await Localization.getCurrentLocaleAsync();
    this.setState(() => ({ currentLocale }));
    
    /* 
      After restoring previous setting from store and put in this.state now a mapping of the options for getting the index
      for the right radiobutton selection.
    */

    if ((this.state.StoredLanguageSetting[0]) && (typeof(this.state.StoredLanguageSetting[0]) == 'object')) {
      arrayLength = this.state.StoredLanguageSetting[0].length - 1
      StorredLanguageSettingValue = this.state.StoredLanguageSetting[0][arrayLength]['value']
      availableLanguageOptions.options.map((object, index) => { if (object.value == StorredLanguageSettingValue) {        
        this.setState(() => ({ 
          StoredLanguageSettingIndex: index,
          selectedLanguage:  StorredLanguageSettingValue }) );
      } }) 
    }
  }
  
  queryPreferredLocales = async () => {
    const preferredLocales = await Localization.getPreferredLocalesAsync();
    const currentLocale = await Localization.getCurrentLocaleAsync();
    this.setState(() => ({ preferredLocales, currentLocale }));
  };

  changeLocale = locale => {
    
    this.setState(() => ({ 
      locale, 
      selectedLanguage: locale.id 
    }))
    Actions.homeKey()
  }
  

  render() {
    let langSet = this.state.selectedLanguage.substring(0,2)
    return (
      <RadioButtonTool
        docId={availableLanguageOptions.docId}
        storeKey='StoredLanguageSetting'
        storedValue={this.state.StoredLanguageSettingIndex}
        headerText={availableLanguageOptions.headerText[langSet]}
        text={availableLanguageOptions.text[langSet]}
        options={availableLanguageOptions.options}
        sendCurrentQuestion={this.changeLocale}
        nextButtonLabel={availableLanguageOptions.buttonLabel[langSet]}
        selectedValue={ null }
      />

    );
  }
}

const styles = StyleSheet.create({
  centered: { alignItems: 'center', justifyContent: 'center' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  languageBox: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5
  },
  isoCurrencyCodes: {
    padding: 10,
    fontSize: 24,
    backgroundColor: 'aliceblue',
    borderWidth: 1,
  },
  picker: { backgroundColor: 'aliceblue', width: '80%', borderWidth: 1, borderRadius: 5 },
  container: {
    paddingVertical: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plainBanner: { fontSize: 18 },
  centeredText: { textAlign: 'center' },
});

