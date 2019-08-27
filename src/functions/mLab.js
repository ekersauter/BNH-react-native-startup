import React from 'react'
import MLab from 'mlab-data-api';

mLab=MLab({
    key: 'jzcwlmyPA-mjODIHdwQRsM76ysFnfnkt',
  //   host:'https://api.mlab.com', //optional
  //   uri : '/api',//optional
  //   version :'1',//optional
    database:'app04', //optional
  //   timeout : 10000 //optional
})

class mLabFunctionsList extends React.Component {

    async createDatabase(databaseName){
        await mLab.setDatabase(databaseName).then((response) => {
        console.log('got setDatabase: ',response)
        })
        .catch(function (error) {
        console.log('error in createDatabase:', error) 
        })
    } 

    // insertOption: sring: database  |  sdtring: collection  |  object/array: data
    async insertDocumentToMlab(insertOptions){
        await mLab.insertDocuments(insertOptions).then(function(response) {
        // console.log('got insertDocuments: ',response)
        })
        .catch(function (error) {
        console.log('error insertDocuments: ', error) 
        })
    }

    // database: String  |  collection: String  |  query: Object  |  count: Boolean  |  fields: Object  |  findOne: Boolean  |  order: String  |  skip: Number  |  limit: Number
    async listDocumentsmLab(options) { 
        mLab.listDocuments(options)
          .then((response) => {
            this.setState(prevState => ({
              mLabDocuments: [...prevState.mLabDocuments, response.data]
            }))
            console.log('got listDocuments: ', response.data)
          })
          .catch(function (error) {
            console.log('error listDocuments:', error)
          });
    }
    
    /*  database: String  |  collection: String  |  query: { 'key': 'value' }
        Note for a like query: { 'docId': {"$regex": "hra"} } means all docId containing hra like docId like '*hra*'
    */
    async deleteDocumentsmLab(options){
        mLab.deleteDocuments(options)
        .then((response) => {
            console.log('got deleteDocuments',response.data)
        })
        .catch(function (error) {
            console.log('error deleteDocuments', error)
        })
    }

}

const mLabFunctions = new mLabFunctionsList
export default mLabFunctions