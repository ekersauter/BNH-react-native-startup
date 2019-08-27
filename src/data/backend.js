import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import utilities from '../functions/utils'
import mLabFunctions from '../functions/mLab'

import config from '../data/hra/questions.json'


export default class mLabdb extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            mLabDatabase: [],
            mLabCollections: [],
            mLabDocuments: [],
            response: []
        }
        this.renderArray = utilities.renderArray.bind(this)
        this.renderArrayOfObjects = utilities.renderArrayOfObjects.bind(this)
        this.listDocumentsmLab = mLabFunctions.listDocumentsmLab.bind(this)

        let collectionName = 'answersHra'
        let insertOptions = { database: "app04", collection: collectionName, data: config }
        mLabFunctions.insertDocumentToMlab(insertOptions)

        let listDocumentsOptions = { collection: 'answersHra', query: { 'type': 'slider' } }
        this.listDocumentsmLab(listDocumentsOptions)

        let deleteDocumentOptions = { collection: 'answersHra', query: { 'docId': {"$regex": "hra"} } }
        mLabFunctions.deleteDocumentsmLab(deleteDocumentOptions)

      }

    async componentWillMount(){
        
      await mLab.listDatabases()
      .then((response) => {

        this.setState(prevState => ({
          mLabDatabase: [...prevState.mLabDatabase, response.data[0]]
        }))

          mLab.listCollections(response.data[0])
          .then((listResponse) => {
            this.setState(prevState => ({
              mLabCollections: [...prevState.mLabCollections, listResponse.data]
            }))
          })
          .catch(function (error) {
            console.log('error in listCollections:', error)
          })

        })
        .catch(function (error) {
          console.log('error in listDatabases: ', error)
        })
    
    }

    renderCollections(){
       return this.renderArray(this.state.mLabCollections)
    }

    renderDocuments(){
      return this.renderArrayOfObjects(this.state.mLabDocuments)
    }

    render() {
        console.log('Backend this.state.mLabCollections: ', this.state.mLabCollections)
        return (
        <View style={styles.container}>
        {/* <ScrollView style={{ marginLeft: 10 }}> */}
          <View>
            <Text style={styles.paragraph}> Database: { this.state.mLabDatabase } </Text>
          </View>
          {/* <View>
              <Text style={styles.paragraph}> Collections: </Text> { this.renderCollections() }
          </View> */}
          {/* <View>
            <Text style={styles.paragraph}> Documents: </Text> { this.renderDocuments() }  
          </View>     */}
          {/* </ScrollView>  */}
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
  paragraph: {
    margin: 24,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});



/* 
    API jzcwlmyPA-mjODIHdwQRsM76ysFnfnkt
    https://www.npmjs.com/package/mlab-data-api
    https://github.com/bgrusnak/mlab-data-api#readme

    https://mlab.com/signup/
      Account:
      bnh
      email:
      eriks@brandnewhealth.com
      username:
      eker
      password:
      bnh@mLab4us

      PLAN TYPE	Sandbox
      Change
      CLOUD PROVIDER	Amazon Web Services
      Change
      REGION	Europe (Ireland) (eu-west-1)
      Change
      PLAN LINE & SIZE	
      Sandbox FREE
      Change
      STORAGE 
      0.5 GB
      MONGODB VERSION	3.6.8 (MMAPv1)
      Change
      DATABASE NAME	bnh
      Change
      Total Price	FREE
*/