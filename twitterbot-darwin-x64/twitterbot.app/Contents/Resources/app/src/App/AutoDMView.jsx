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



/*###### ##      ## ######## ######## ########    ######## ########     ###     ######  ##    ## ######## ########
   ##    ##  ##  ## ##       ##          ##          ##    ##     ##   ## ##   ##    ## ##   ##  ##       ##     ##
   ##    ##  ##  ## ##       ##          ##          ##    ##     ##  ##   ##  ##       ##  ##   ##       ##     ##
   ##    ##  ##  ## ######   ######      ##          ##    ########  ##     ## ##       #####    ######   ########
   ##    ##  ##  ## ##       ##          ##          ##    ##   ##   ######### ##       ##  ##   ##       ##   ##
   ##    ##  ##  ## ##       ##          ##          ##    ##    ##  ##     ## ##    ## ##   ##  ##       ##    ##
   ##     ###  ###  ######## ########    ##          ##    ##     ## ##     ##  ######  ##    ## ######## ##     */



//this is the auto dm page
export class AutoDMView extends React.Component {
  constructor(props) {
    super(props)
    
    //starting the store
    registerStore()
    
    //registering twitter
    registerTwitter()
    //setting the state
    this.state = {canTrackTweet: false, isTrackingTweet:false, dmValue: false, isTrackingTweetDM: false, isSendingDMs: false, didExport: false, showReset:false, showDMReset: false, data:{}}
    
    //for table
    //this.testObj = [{name: "I", status: "sent"}, {name: "Love", status:"failed"}, {name: "Vape", status:"sent"}]
    this.columnNames = []
    this.screenNamesTotal = []
    
  }
  
  componentWillUnmount() {
    clearInterval(this.retweetTimer)
  }
  
  
  inputHandleChange = (e) => {
    e.target.value != "" ?
      (this.setState({canTrackTweet: true}),
      this.tweetID = e.target.value)
      :
      this.setState({canTrackTweet: false})
      
  }
  
  dmHandleChange = (e) => {
    e.target.value != "" ?
      (this.setState({dmValue: true}),
    this.DMText = e.target.value)
      :
      this.setState({dmValue: false})
      
  }
  
  startTrackingTweet = () => {
    
    this.columnNames = ["Usernames of Retweeters"]
    this.screenNamesTotal = []
    this.screenNamesObjArray = []
    
    //show export button
    this.setState({isTrackingTweet: true, showReset:false, showDMReset:false})
    
    this.retweetTimer = setInterval(() => {getRetweeters(this, cloneDeep(this.screenNamesTotal), (screenNamesObj, screenNames, namesToDM) => {
      
      if (namesToDM != []) {
        this.screenNamesObjArray.push.apply(this.screenNamesObjArray, screenNamesObj)
        this.screenNamesTotal.push.apply(this.screenNamesTotal, screenNames)
      }
      screenNamesObj = screenNamesObj.removeDuplicates()
      screenNames = screenNames.removeDuplicates()
      this.screenNamesTotal.removeDuplicates()
      this.screenNamesObjArray.removeDuplicates()
      this.screenNamesTotal = this.screenNamesTotal.removeDuplicates()
      this.screenNamesObjArray = this.screenNamesObjArray.removeDuplicates()

      screenNames.removeDuplicates()
      namesToDM = namesToDM.removeDuplicates()
      console.log(this.screenNamesTotal.length)
      console.log(namesToDM.length)
      
      
      this.setState({data: this.screenNamesObjArray})
      //this.setState({screenNamesObjArray: this.screenNamesObjArray})  
      //this.forceUpdate()
    })}, 13000)
    
  }
  
  
  stopTrackingTweet = () => {
    //setting the state correctly
    this.setState({isTrackingTweet: false, showReset:true})
    //stopping the tweet interval
    clearInterval(this.retweetTimer)
    
  }
  
  startWithDM = () => {
    // this.screenNamesObjArray = []
    this.columnNames = ["Usernames of Retweeters", "Status of DM"]
    
    this.screenNamesTotal = []
    this.screenNamesObjArray = []
    
    //show export button

    
    
    this.setState({isTrackingTweetDM: true, isSendingDMs:true, showReset:false, showDMReset:false})
    
    // this.setState({didExport:false})
    this.retweetTimer = setInterval(() => {getRetweeters(this, this.screenNamesTotal, (screenNamesObj, screenNames) => {
      this.screenNamesObjArray.push.apply(this.screenNamesObjArray, screenNamesObj)
      this.screenNamesTotal.push.apply(this.screenNamesTotal, screenNames)
      this.setState({data: this.screenNamesObjArray})
    })}, 5000)
    
  }
  
  stopDM = () => {
    this.setState({isSendingDMs:false})
  }
  
  stopDMTracking = () => {
    this.setState({isTrackingTweetDM: false, showDMReset:true})
    //this.setState({isTrackingTweetDM:false})
    clearInterval(this.retweetTimer)
  }
  
  exportFunction = () => {
    
    this.setState({didExport: true})
    
    setTimeout(() => {
      this.setState({didExport: false});
    }, 2000)
    
    ///actually exporting usernames
    
    
    //getting just the names
    var names = []
    for (var i = 0; i<this.screenNamesObjArray.length; i++) {
      names.push(this.screenNamesObjArray[i].name)
    }  
    
    //export to /ExportedNames with window.userScreenName, followers length, and filename in .txt
    showSaveDialog(os.homedir() + '/Desktop/Bot/ExportedNames/', '-'+names.length+'-FollowersNames.txt', 'Save Followers Names', ['.txt'], (fileName) => {
      exportData(names, fileName)
    })
  
  }
  
  resetEverything = () => {
    this.setState({canTrackTweet: false, isTrackingTweet:false, dmValue: false, isTrackingTweetDM: false, isSendingDMs: false, didExport: false, showReset:false, showDMReset: false})
    document.getElementById('inputform'+'ID of Tweet').value = ""
    this.screenNamesObjArray = []
  }
  
  render() {
    //is sent name, parentHandleChange, style, placeholder

    this.idInputField = <InputBoxMake name="ID of Tweet" parentHandleChange={this.inputHandleChange} style={this.props.styles.TextInputFormStyle} placeholder="Enter ID of tweet"/>
    
    //if theres a value in the id box and if its not tracking a tweet
    const dmInputArea = (this.state.canTrackTweet && !this.state.isTrackingTweet ) ? <InputAreaMake name="OR enter a DM to send" parentHandleChange={this.dmHandleChange} style={this.props.styles.TextAreaFormStyle} placeholder="Enter DM to send" /> : null
    
    //if theres an id value and not a dm value
     const tweetTrackerButton =  (this.state.canTrackTweet && !this.state.dmValue) ? <ButtonMake handleButtonClick={this.state.isTrackingTweet ? this.stopTrackingTweet : this.startTrackingTweet} value={this.state.isTrackingTweet ? "Stop Tracking Tweet" : "Start Tracking Tweet without DMing"} buttonStyle={ this.state.isTrackingTweet ? this.props.styles.ProcessIsRunningStyle : this.props.styles.SaveButtonStyle} /> : null
     
     //if its tracking a tweet and theres no dm value
    const exportButton = (this.state.isTrackingTweet || this.state.showReset) ? <div style={{margin: "0px 0px 0px 0px", display:"inline-block", width:"25%", float:"right"}}><ButtonMake handleButtonClick={this.exportFunction} value="Export Names" buttonStyle={this.props.styles.SaveButtonInDivStyle} isSelected={this.state.didExport}/></div> : null
    
    const resetButton = this.state.showReset ? <div style={{margin:"0px 20px 0px 0px", display:"block", width:"25%", float:"right"}}><ButtonMake handleButtonClick={this.resetEverything} value="Reset Everything" buttonStyle={this.props.styles.BadButton} isSelected={false} /></div> : null
    
    //if its tracking a tweet dm
    const DMexportButton = (this.state.isTrackingTweetDM  || this.state.showDMReset ) ? <div style={{margin: "0px 0px 0px 0px", display:"inline-block", width:"25%", float:"right"}}><ButtonMake handleButtonClick={this.exportFunction} value="Export Names" buttonStyle={this.props.styles.SaveButtonInDivStyle} isSelected={this.state.didExport} /></div> : null
    
    const dmResetButton = (this.state.showDMReset) ? <div style={{margin:"0px 20px 0px 0px", display:"block", width:"25%", float:"right"}}><ButtonMake handleButtonClick={this.resetEverything} value="Reset Everything" buttonStyle={this.props.styles.BadButton} isSelected={false} /></div> : null
    
    //if theres a dm value
    const sendWithDMButton = this.state.dmValue ? <ButtonMake handleButtonClick={this.state.isSendingDMs ? this.stopDM : (this.state.isTrackingTweetDM ? this.stopDMTracking : this.startWithDM)} value={this.state.isSendingDMs ? "Stop DM'ing but keep tracking" : (this.state.isTrackingTweetDM ? "Stop Tracking" : "Track and Send DM")} buttonStyle={ this.state.isSendingDMs ? this.props.styles.ProcessIsRunningStyleGreenToYellow : (this.state.isTrackingTweetDM ? this.props.styles.ProcessIsRunningStyleYellowToRed : this.props.styles.SaveButtonStyle)}  /> : null
    
    const bColor = Color('#03a9f4').alpha(0.3)
    
    //the table
    const table = this.screenNamesTotal.length != 0 && ((this.state.isTrackingTweet || this.state.isTrackingTweetDM || this.state.showReset || this.state.showDMReset) ? <TableMake tableStyle={this.props.styles} columnNames={this.columnNames} data={this.screenNamesObjArray}/> : null)

    return ( 
      <div id="maindiv">
        <div id="infodiv"  style={{backgroundColor: bColor, borderRadius:"5px"}}>
          <div style={{padding:"10px"}} id="iddiv">{this.idInputField}{tweetTrackerButton}{exportButton}{resetButton}</div>
          <div style={{padding:"10px"}} id="dmdiv">{dmInputArea}{sendWithDMButton}{DMexportButton}{dmResetButton}</div>
        </div>
        <div id="tablediv">
          {table}
        </div>
    
      </div>
    )
  }
}

Array.prototype.removeDuplicates = function () {
    return this.filter(function (item, index, self) {
        return self.indexOf(item) == index;
    });
};