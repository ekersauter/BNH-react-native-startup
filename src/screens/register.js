'use strict';
import React from 'react';
import { Keyboard, FlatList, ActivityIndicator, Text, View, TextInput,Button,StyleSheet, TouchableOpacity    } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import {Actions, ActionConst} from 'react-native-router-flux';
import registrationTexts from '../data/registration/registrationSettings.json';
import codeSource from '../data/bedrijfsCode.json';
import globalSetup from '../data/globalSetup.json'
import utilities from '../functions/utils'
import TextInputSetup from '../setups/textinputsetup'

const globalLanguageSetting = globalSetup[0]['globalSetupLanguage']

/* https://medium.com/reactnative/tabbing-through-input-fields-ef283f923ab1
   And for KeyboardAvoidongView:
    https://github.com/APSL/react-native-keyboard-aware-scroll-view
*/


export default class register extends React.Component {
    constructor(props){
        super(props);
        this.state ={ 
          checkIfIsRegistred: false,
          StoredLanguageSetting: [],
          checkIfLanguageSettingIsStored: false,
          languageSetting: '',
          isLoading: false,
          codeInput: '',
          checkCode: false,
          isVisible:false,
          showAlert: false,
          alertTitle:'',
          alertMessage:'',
          cancelText:'',
          confirmText:'',
          birthYear:'',
          birthYearOk: false,
          registerOk: false,
          placeholdersKeys: registrationTexts.settings.placeholders,
          checkForRegistrationCodeKeys: registrationTexts.settings['checkForRegistrationCode'],
          checkRegisterKeys: registrationTexts.settings['checkRegister'],
          registred: []
        };

        this.dataCodeSource = codeSource;
        // this.focusNextField = this.focusNextField.bind(this);
        // this.inputs = {};

        this.CheckIfKeyInStore = utilities.CheckIfKeyInStore.bind(this)
        this.getFromStoreAndSetInSate = utilities.getFromStoreAndSetInSate.bind(this)

      }

      showAlert = () => {
        this.setState({
          showAlert: true
        });
      };
     
      hideAlert = () => {
        this.setState({
          showAlert: false
        });
      };
    
      // focusNextField(id) {
      //   this.inputs[id].focus();
      // }

      async componentDidMount(){

        await this.CheckIfKeyInStore('registred', 'checkIfIsRegistred').then( async () => {
            if (this.state.checkIfIsRegistred[0] == true ) {
                await this.getFromStoreAndSetInSate('registred').then(()=>{
                })
            }
        })

        await this.CheckIfKeyInStore('StoredLanguageSetting', 'checkIfLanguageSettingIsStored').then( async () => {
          if (this.state.checkIfLanguageSettingIsStored[0] == true ) {
              await this.getFromStoreAndSetInSate('StoredLanguageSetting').then(()=>{
                let languageSetting = utilities.getPropertyValueOfLastObjectInArray(this.state.StoredLanguageSetting, 'value')
                this.setState({ languageSetting: languageSetting.substring(0,2) })
            }).done()
          }
        })

      }

      checkForRegistrationCode = () => {
        // this.state.codeInput
        this.state.checkCode = this.dataCodeSource.includes(this.state.codeInput);
        if (this.state.checkCode) {
          // this.focusNextField('emailInput');
          this.setState({
            isVisible:!this.state.isVisible, //toggles the visibilty of the text
            alertTitle: this.state.checkForRegistrationCodeKeys['confirm'][this.state.languageSetting]['alertTitle'],
            alertMessage: this.state.checkForRegistrationCodeKeys['confirm'][this.state.languageSetting]['alertMessage'],
            alertCancelText: this.state.checkForRegistrationCodeKeys['confirm'][this.state.languageSetting]['alertCancelText'],
            alertConfirmText: this.state.checkForRegistrationCodeKeys['confirm'][this.state.languageSetting]['alertConfirmText'],
          }); this.showAlert(); Keyboard.dismiss();
        } else {
          this.setState({
            alertTitle: this.state.checkForRegistrationCodeKeys['denial'][this.state.languageSetting]['alertTitle'],
            alertMessage: this.state.checkForRegistrationCodeKeys['denial'][this.state.languageSetting]['alertMessage'],
            alertCancelText: this.state.checkForRegistrationCodeKeys['denial'][this.state.languageSetting]['alertCancelText'],
            alertConfirmText: this.state.checkForRegistrationCodeKeys['denial'][this.state.languageSetting]['alertConfirmText'],
          }); this.showAlert(); Keyboard.dismiss();
        }
      }

      validateEmail = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(text) === false)
        {
        console.log("Email is Not Correct");
        this.setState({email:text, emailOk:false})
        return false;
          }
        else {
          this.setState({email:text, emailOk:true})
          console.log("Email is Correct");
        }
        }

        validatePassword = (text) => {
          const minLength = 6;
          console.log(text.length,' <-> ', minLength);
          if(text.length >= minLength)
          {
          console.log("Password is Ok");
          this.setState({password:text, passwordOk:true})
          return false;
            }
          else {
            this.setState({passwordOk:false})
            console.log("Password is not Ok");
          }
          }  

        checkRegister = () => {
          if (this.state.emailOk === true && this.state.passwordOk === true) {
            this.setState({
              alertTitle: this.state.checkRegisterKeys['confirm'][this.state.languageSetting]['alertTitle'],
              alertMessage: this.state.checkRegisterKeys['confirm'][this.state.languageSetting]['alertMessage'],
              alertCancelText: this.state.checkRegisterKeys['confirm'][this.state.languageSetting]['alertCancelText'],
              alertConfirmText: this.state.checkRegisterKeys['confirm'][this.state.languageSetting]['alertConfirmText'],
              registerOk: true
            }); 
            this.showAlert(); Keyboard.dismiss(); let datetime = new Date().toJSON(); this.setState({
              registred: { code: this.state.codeInput, email: this.state.email, password: this.state.password, datetime: datetime }
            }); 
            utilities.storeLocal('registred', 
            { code: this.state.codeInput, email: this.state.email, password: this.state.password, birthyear: this.state.birthYear, datetime: datetime }) 
          } else {
            this.setState({
              alertTitle: this.state.checkRegisterKeys['denial'][this.state.languageSetting]['alertTitle'],
              alertMessage: this.state.checkRegisterKeys['denial'][this.state.languageSetting]['alertMessage'],
              alertCancelText: this.state.checkRegisterKeys['denial'][this.state.languageSetting]['alertCancelText'],
              alertConfirmText: this.state.checkRegisterKeys['denial'][this.state.languageSetting]['alertConfirmText'],
            }); this.showAlert(); Keyboard.dismiss();
          }        
        }  

      render() {    
        
        const {showAlert} = this.state;
        return (

                <View style={styles.container}>
                  <View >
                  {!this.state.isVisible?
                    <TextInputSetup
                      placeholder={ this.state.placeholdersKeys['code'][this.state.languageSetting] }
                      onChangeText={(codeInput) => { this.setState({codeInput}) }}
                    />
                    :null}
                    {this.state.isVisible?<Text>{ this.state.placeholdersKeys['codeConfirmed'][this.state.languageSetting] } {this.state.codeInput}</Text>:null}
                    
                    {/* for focussing temporary left out: returnKeyType={ 'next' } ref={ input => { this.inputs['emailInput'] = input; }} */}
                    
                    {this.state.isVisible?
                      <TextInputSetup
                        keyboardType={'numeric'}
                        maxLength={4}
                        minLength={4}
                        placeholder= { this.state.placeholdersKeys['birthyear'][this.state.languageSetting] }
                        onChangeText={(text) => this.setState({birthYear: text})} 
                        value={ this.state.birthYear }
                      />:null}

                    {this.state.isVisible?
                      <TextInputSetup
                        keyboardType={'email-address'}
                        placeholder={ this.state.placeholdersKeys['email'][this.state.languageSetting] }
                        onChangeText={(text) => this.validateEmail(text)} 
                        value={this.state.email}
                        />:null}
                    
                    {this.state.isVisible?
                      <TextInputSetup
                        onChangeText={(text) => this.validatePassword(text)} 
                        value={this.state.password}
                        placeholder= { this.state.placeholdersKeys['password'][this.state.languageSetting] }
                        />:null}
                    
                    {!this.state.isVisible?
                      <TouchableOpacity onPress={() => {
                        Keyboard.dismiss(); this.checkForRegistrationCode();
                        }}>
                        <View style={styles.button}>
                          <Text style={styles.text}>{ this.state.placeholdersKeys['label1'][this.state.languageSetting] }</Text>
                        </View>
                      </TouchableOpacity>
                    :null}
                                        
                    {this.state.isVisible?
                      <TouchableOpacity onPress={() => {
                        Keyboard.dismiss(); this.checkRegister();
                        }}>
                        <View style={styles.button}>
                          <Text style={styles.text}>{ this.state.placeholdersKeys['label2'][this.state.languageSetting] }</Text>
                        </View>
                      </TouchableOpacity>
                    :null}

                  </View>

                      <AwesomeAlert
                        show={showAlert}
                        showProgress={false}
                        title={this.state.alertTitle}
                        message={this.state.alertMessage}
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={true}
                        showConfirmButton={true}
                        cancelText={this.state.alertCancelText}
                        confirmText={this.state.alertConfirmText}
                        confirmButtonColor="#DD6B55"
                        onCancelPressed={() => {
                          this.hideAlert(); 
                          Actions.homeKey();
                        }}
                        onConfirmPressed={() => {
                          this.hideAlert(); if (this.state.registerOk === true) { Actions.registeredKey(); }; 
                        }}
                      />  

                </View>       
              )
      }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    // backgroundColor: 'white',
    marginTop:20,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    },
    button: {
      marginTop: 10,
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderRadius: 5,
      backgroundColor: "#3b475b",
    },
    
    text: {
      color: '#fff',
      fontSize: 15,
      textAlign: 'center',
      
    }

  })