//need to import the react stuff
import React from 'react';
import ReactDOM from 'react-dom';
//importing styles
import {Styles} from '../HTML and CSS/styles.jsx'
// for saving data
import {Store} from '../Functions/Store.js'
//importing components
import {ButtonMake, TabBarMake, InputBoxMake, InputAreaMake, TableMake,SelectRowWithTextBoxAndPlus, IndivDraftMake, SelectBox, IndivInputMake} from '../Components/components.jsx'
//clone deep
var cloneDeep = require('lodash.clonedeep');
//async
import async from 'async'
//twitter 
//register twitter
import Twitter from 'twitter'
//color
import Color from 'Color'
//import './script.js';
const path = require('path')
const os = require('os');
var fs = require('fs-extra');
import moment from 'moment'
import update from 'immutability-helper';
const {dialog} = require('electron').remote
import Junk from 'junk'


//importing js files 
//twitter functions functions 
import {screenNames, checkRateLimits, getRetweeters, getFollowers, startGetFollowersNames, sortUsernames} from '../Functions/script.js'
//component functions 
import {getFromStore, registerTwitter, registerStore, showLoadDialog, showSaveDialog, saveInStore, exportData, loadData, checkAllTextInputFields} from '../Functions/functions.js'


 /*####  ######## ######## ######## #### ##    ##  ######    ######
##    ## ##          ##       ##     ##  ###   ## ##    ##  ##    ##
##       ##          ##       ##     ##  ####  ## ##        ##
 ######  ######      ##       ##     ##  ## ## ## ##   ####  ######
      ## ##          ##       ##     ##  ##  #### ##    ##        ##
##    ## ##          ##       ##     ##  ##   ### ##    ##  ##    ##
 ######  ########    ##       ##    #### ##    ##  ######    ####*/
 

 
export class SettingsView extends React.Component {
  constructor(props) {
    super(props)
    
    console.log("NODE ENV IS ") 
    console.log(process.env.NODE_ENV)

    //bot file 
    if (!fs.existsSync(os.homedir() + '/Desktop/Bot')) {
      fs.mkdirSync(os.homedir() + '/Desktop/Bot')
    }
    
    
    //the settings needed to be inputted
    this.settingsOptionsArray = ['Consumer Key', 'Consumer Secret', 'Token Key', 'Token Secret',  'Account Name']
    
    //setting the placeholders initially equal to the options needed. have to do outside of state setting
    var tempPlaceHolders = this.settingsOptionsArray.reduce(function(result, item) {
      result[item] = item; //a, b, c
      return result;
    }, {})
    

    
    //setting the state
    this.state = {saveButton:false, saved:false, tracker:false, placeholders: tempPlaceHolders}
    
  }
  
  //getting the placeholders from the saved data
  componentDidMount() {
    console.log(getFromStore(this.settingsOptionsArray))
    this.setState({placeholders: getFromStore(this.settingsOptionsArray)})
    registerTwitter()
  }
  
  handleChange = (e) => {
    //checking the text fields and setting the state accordingly 
    checkAllTextInputFields(this.settingsOptionsArray) ? this.setState({saveButton: true, tracker:true}) : this.setState({saveButton: false, saved: false, tracker:false})
    
    
  }
  
  //saves the data
  handleSave = () => {
    //saves the data for each option in settings array
    saveInStore(this.settingsOptionsArray, true)
    //set the state to color the button
    this.setState({saved:true})
    registerTwitter()
  }
  
  handleRateLimitClick = () => {
    registerTwitter()
    checkRateLimits()
  }
  
  saveAccountData = () => {
    
    //getting the directory
    var dir = os.homedir() + '/Desktop/Bot/UserAccountInfo/'
    var defaultPath = 'accountnamehere.json'
    var title = "Save Account Info"
    var filters = ['json']
    //showing the dialog
    
    console.log(dir + defaultPath)
    
    showSaveDialog(dir, defaultPath, title, filters, (fileName) => {

      var data = []
      for (name of this.settingsOptionsArray) {
        //this gets the value of every input field of name send
        //store.set(name, document.getElementById('inputform' + name).value)
        data.push({[name]:(document.getElementById('inputform' + name).value)})
      }
      
      //saving the data
      exportData(JSON.stringify(data), fileName)
      
      //set to user preferences
      saveInStore(this.settingsOptionsArray, true)
      
      //reload placeholders and text inputs and register twitter
      this.setState({saved:true, placeholders: getFromStore(this.settingsOptionsArray)})
      registerTwitter()
    }) 
    
    
  }
  //loading saved account data
  loadAccountData = () => {
    
    
    //getting the directory
    var dir = os.homedir() + '/Desktop/Bot/UserAccountInfo/'
    var defaultPath = 'accountnamehere.json'
    var title = "Load Account Info"
    var filters = ['json']
    //showing the dialog
    
    console.log(dir + defaultPath)
    
    showLoadDialog(dir, title, filters, (data) => {
      //loading the data
          
            
            //getting the json object
            var newDataObject = JSON.parse(data)
            var placeholdersFromFile = []
            var tempData = []
            //processing the data
            for (var i = 0; i < newDataObject.length; i++) {
              tempData.push(newDataObject[i][this.settingsOptionsArray[i]])
              placeholdersFromFile.push(newDataObject[i][this.settingsOptionsArray[i]])
      
            }
            saveInStore(this.settingsOptionsArray, false, tempData )
            
            //getting the placeholders
            var tempPlaceHolders = this.settingsOptionsArray.reduce((result, item) => {
              result[item] = placeholdersFromFile[this.settingsOptionsArray.indexOf(item)]; //a, b, c
              return result;
            }, {})
            
            //deleting the values of the input boxes 
            for (name of this.settingsOptionsArray) {
              
              document.getElementById('inputform'+name).value = ""
            }
            
            
            //setting the placeholders
            this.setState({placeholders: tempPlaceHolders})    
            registerTwitter()
          })
    
  }
  
  render () {
    //const saveButton = this.state.saveButton ? <ButtonMake handleButtonClick={this.handleSave} value="Save" buttonStyle={this.props.styles.SaveButtonStyle} isSelected={this.state.saved} /> : null
    
    const rateLimitsButton = <ButtonMake handleButtonClick={this.handleRateLimitClick} value="Check Rate Limits" buttonStyle={this.props.styles.SaveButtonStyle} isSelected={false} />
    
    const saveDataButton = this.state.saveButton ? <div style={{margin:"0px 3% 0px 0%", width:"25%", display: "inline-block", verticalAlign:"top"}}><ButtonMake handleButtonClick={this.saveAccountData} value="Save Account Data" buttonStyle={Object.assign({}, this.props.styles.SaveButtonInDivStyle, {backgroundColor: "#3ac91d"})} isSelected={false} /></div> : null
    
    const loadDataButton = <div style={{margin:"0px 0% 0px 0%", width:"25%", display: "inline-block", verticalAlign:"top"}}><ButtonMake handleButtonClick={this.loadAccountData} value="Load Account Data" buttonStyle={this.props.styles.SaveButtonInDivStyle} isSelected={false} /></div>
    
    //making the forms for each option
    this.settingsForms = this.settingsOptionsArray.map((setting) => <InputBoxMake key={setting} placeholder={this.state.placeholders[setting]} name={setting} parentHandleChange={this.handleChange} style={this.props.styles.TextInputFormStyle} ></InputBoxMake>)
    
    //renders the save button if state.saveButton == true
    return (
      <div>
        <div>{this.settingsForms}</div>
        
        <div style={{display: 'block'}}><div style={{margin: '10px', display:'block'}}>{rateLimitsButton}</div></div> 
          <div style={{display: 'block', margin: '10px'}}>{saveDataButton}{loadDataButton}</div>
      </div>
    )  
  }
}

