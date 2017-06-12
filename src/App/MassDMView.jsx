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
import {screenNames, checkRateLimits, getRetweeters, getFollowers, startGetFollowersNames, sortUsernames, sendDmForID} from '../Functions/script.js'
//component functions 
import {getFromStore, registerTwitter, registerStore, showLoadDialog, showSaveDialog, saveInStore, exportData, loadData, checkAllTextInputFields} from '../Functions/functions.js'




/*     ##    ###     ######   ######     ########  ##     ##
###   ###   ## ##   ##    ## ##    ##    ##     ## ###   ###
#### ####  ##   ##  ##       ##          ##     ## #### ####
## ### ## ##     ##  ######   ######     ##     ## ## ### ##
##     ## #########       ##       ##    ##     ## ##     ##
##     ## ##     ## ##    ## ##    ##    ##     ## ##     ##
##     ## ##     ##  ######   ######     ########  ##     */
   
   

export class MassDMView extends React.Component {
  constructor(props) {
    super(props)
    
    registerStore()
    registerTwitter()
    
    //if the DMCampaigns directory doesnt exist, make it 
    if (!fs.existsSync(os.homedir() + '/Desktop/Bot/DMCampaigns')){
      fs.mkdirSync(os.homedir() + '/Desktop/Bot/DMCampaigns');
    }
    
  
    
    this.state = {isCreatingNewCampaign: false, isCreatingNewGroup: false, basicsEntered: false, followersLoadedAndAmountSet: false, canFinalizeNewGroup: false, hasUploaded: false, canSaveCampaign: false}
    this.newCampaignObj = {campaignName: "", recipients: [], amountToSend: undefined, amountToSendDaily: undefined, dmText: "", excludeFromFile: [], excludeFromGroups: []}
  }
  
  //creating a new campaign
  newDMCampaign = () => {
    var toggle = this.state.isCreatingNewCampaign
    this.setState({isCreatingNewCampaign: !toggle})
  }
  
  //indiv groups of people 
  newGroup = () => {
    this.newGroupText = ""
    var toggle = this.state.isCreatingNewGroup
    
    this.setState({isCreatingNewGroup: !toggle})
  }
  
  //changing the text of the new groups 
  newGroupTextChanged = (e) => {

    //storing in variable
    this.newGroupText = e.target.innerText
    
  }
  
  //setting the name of the new group
  newGroupName = (e) => {
    this.newGroupName = e.target.value
    this.setState({canFinalizeNewGroup: true})
  }
  
  //processing the data of the new group 
  newGroupProcess = () => {
    
    
    //getting the array of names 
    var namesInGroup = this.newGroupText.split(',')
    console.log(namesInGroup)
    
    //getting the id's of everything 
    window.client.get("users/lookup", {"screen_name": namesInGroup.toString()}, (error, data, response) => {
      console.log(data)
      
      var groupNamesArray = []
      
      //parsing the data 
      for (var i = 0; i < data.length; i++) {
        var tempObj = {name: data[i]["screen_name"], id: data[i]["id_str"]}
        groupNamesArray.push(tempObj)
      }
      
     //the obj to append
     var groupNamesObjArray = {groupname: this.newGroupName, names: groupNamesArray}
      
      //test 
      console.log("OBJ ARRAY IS ")
      console.log(groupNamesObjArray)
      
      
      //creating the file if it doesnt exist 
      //if the groups file doesnt exist
      if (!fs.existsSync(os.homedir() + '/Desktop/Bot/DMCampaigns/groups.json')){
        //temp array
        var tempArray = [groupNamesObjArray]
        
        fs.writeFileSync(os.homedir() + '/Desktop/Bot/DMCampaigns/groups.json', JSON.stringify(tempArray))
      } else {
        //if the file does exist 
        
        //reading the data 
        var readData = fs.readFileSync(os.homedir() + '/Desktop/Bot/DMCampaigns/groups.json')
        
        //convering to json 
        readData = JSON.parse(readData)
        
        //adding array 
        readData.push(groupNamesObjArray)
        
        //converting back 
        readData = JSON.stringify(readData)
        
        //writing to file 
        fs.writeFileSync(os.homedir() + '/Desktop/Bot/DMCampaigns/groups.json', JSON.stringify(readData))
        
        
      }
      
      
      
    
      
    })
  }
  
  
  
  //setting the name of the campaign
  campaignNameChanged = (e) => {
    this.newCampaignObj.campaignName = e.target.value
    this.setState({ basicsEntered: true})
  }
  
  //the number of DMs to send 
  amountToSendChanged = (e) => {
    if (isNaN(e.target.value)) {
      alert("not a number brah")
    } else {
      this.newCampaignObj.amountToSend = Number(e.target.value)
    }
  }
  
  //the number of DMs to send a day 
  amountToSendDailyChanged = (e) => {
    if (isNaN(e.target.value)) {
      alert("not a number brah")
    } else {
      this.newCampaignObj.amountToSendDaily = Number(e.target.value)
    }
    
    this.setState({followersLoadedAndAmountSet: true})
  }
  
  //the text of the DM 
  dmTextChanged = (e) => {
    console.log(e.target.innerText)
    this.newCampaignObj.dmText = e.target.innerText
  } 
  
  //uploading recipients 
  uploadRecipients = () => {
    //loading the IDs

    showLoadDialog(os.homedir() + '/Desktop/Bot/ExportedIDs', 'Load User IDs', ['.json'], (data) => {
      
      

      //parsing the data
      console.log(data)
      data = JSON.parse(data)
      

      //setting the followers 
      this.newCampaignObj.recipients = data["IDs"]
      this.testRecipients = JSON.parse(data["IDs"])
      //setting state 
      this.setState({hasUploaded: true})
      
    })
    
  }
  
  //saving new campaign
  saveCampaign = () => {
    fs.writeFileSync(os.homedir() + '/Desktop/Bot/DMCampaigns/' + this.newCampaignObj.campaignName + '.json', JSON.stringify(this.newCampaignObj))
  }
  
  //testing mass dm 
  testMassDM = () => {
    for ( var i = 0; i < this.testRecipients.length; i++) {
      sendDmForID(this.testRecipients[i], "hey whats up")
    //console.log(i)
    }
  }
  
  render() {
    //backgroundColor
    const bColor = Color('#03a9f4').alpha(0.3)
    
//NEW GROUP
    //to create a new group button
    const newGroupButton =  <ButtonMake handleButtonClick={this.newGroup} value="New Group of people" buttonStyle={this.props.styles.SaveButtonStyle} isSelected={false} />
    
    //the name of a new group
    const newGroupName = <InputBoxMake name="The name of the group of people" parentHandleChange={this.newGroupName} style={this.props.styles.TextInputFormStyle} placeholder="ex: x followers of... for..."/> 
    
    //to finalize a group button 
    const newGroupEnteredButton =  this.state.canFinalizeNewGroup ? <ButtonMake handleButtonClick={this.newGroupProcess} value="Create Group" buttonStyle={Object.assign({}, this.props.styles.SaveButtonStyle, {"hover": "#3ac91d"})} isSelected={false} /> : null
    
    //new group label 
    const newGroupLabel = <label>Enter usernames of people to NOT DM</label>
    
    //entering text of a new group 
    const newGroupTextArea =  <div placeholder="Seperated by commas" name="Tweet Text" id={this.props.i} style={Object.assign({}, this.props.styles.TextInputFormStyle, {whiteSpace: "pre", margin: "0px 0% 10px 0%", width:"100%", display: "inline-block", outline:"none", backgroundColor: "#f6f6f6"})} contentEditable suppressContentEditableWarning={true} onInput={this.newGroupTextChanged}></div> 
    
    //the div of creating a new group 
    const addingNewGroupDiv = this.state.isCreatingNewGroup ? <div style={{margin: "10px 10px 10px 10px", padding: "10px 10px 10px 10px",  backgroundColor: bColor}}>{newGroupLabel}<div>{newGroupTextArea}{newGroupName}</div>{newGroupEnteredButton}</div> 
    :
    null
    
//NEW CAMPAIGN
    //to create a new campgain 
    const newDMCampaignButton = <ButtonMake handleButtonClick={this.newDMCampaign} value="New DM Campaign" buttonStyle={this.props.styles.SaveButtonStyle} isSelected={false} />
    
    //setting recipients
    const uploadPeopleToDM = <div style={{width:"25%", marginLeft:"37.5%"}}><ButtonMake handleButtonClick={this.uploadRecipients} value="Upload Recipients" buttonStyle={this.props.styles.SaveButtonInDivStyle} isSelected={false} /></div>
    
    //the name of the campaign
    const dmCampaignName =  <InputBoxMake name="The name of the campaign" parentHandleChange={this.campaignNameChanged} style={this.props.styles.TextInputFormStyle} placeholder="ex: x followers of... for..."/> 
    
    //the amount of dms to send
    const amountToSend = this.state.basicsEntered ? <InputBoxMake name="How many DMs to send" parentHandleChange={this.amountToSendChanged} style={this.props.styles.TextInputFormStyle} placeholder="How many DMs to send total"/> : null
    
    //the amount to send daily/each time
    const amountToSendDaily = this.state.basicsEntered ? <InputBoxMake name="How many DMs to send each time" parentHandleChange={this.amountToSendDailyChanged} style={this.props.styles.TextInputFormStyle} placeholder="ex: 500"/> : null
    
    //label of enter dm 
    const enterDmLabel = <label style={{margin: "0px 0px 10px 0px"}}>Enter DM to send</label>
    
    //the text to send in a dm 
    const dmText = this.state.followersLoadedAndAmountSet ? <div>{enterDmLabel}<div placeholder="Enter DM..." name="Tweet Text" id={this.props.i} style={Object.assign({}, this.props.styles.TextInputFormStyle, {whiteSpace: "pre", margin: "0px 0% 10px 0%", width:"100%", display: "inline-block", outline:"none", backgroundColor: "#f6f6f6"})} contentEditable suppressContentEditableWarning={true} onInput={(e) => {this.newCampaignObj.dmText = e.target.innerText; this.setState({canSaveCampaign: true})}}></div></div> : null
    
    
    //the button to finalize a campgain 
    const finalizeCampaignButton = this.state.canSaveCampaign && this.state.hasUploaded ? <ButtonMake handleButtonClick={this.saveCampaign} value="Save DM Campaign" buttonStyle={this.props.styles.SaveButtonStyle} isSelected={false} /> : null
    
    //the div that has all the options in it to create a new campaign
    const newCampaignDiv = this.state.isCreatingNewCampaign ? <div style={{margin: "10px 10px 10px 10px", padding: "10px 10px 10px 10px",  backgroundColor: bColor}}>
      <div>{uploadPeopleToDM}</div>
      <div>{dmCampaignName}</div>
      <div>{amountToSend}</div>
      <div>{amountToSendDaily}</div>
      <div>{dmText}</div>
      <div>{finalizeCampaignButton}</div>
    </div>
    :
    null
    
//CAMPAIGNS ALREADY MADE 
    //test dm all 
    const testMassDMAllButton = <ButtonMake handleButtonClick={this.testMassDM} value="TEST DM ALL " buttonStyle={this.props.styles.SaveButtonStyle} isSelected={false} /> 
    
    
    return (
      <div>
        <div>{newDMCampaignButton}{newGroupButton}</div>
        {newCampaignDiv}{addingNewGroupDiv}
        {testMassDMAllButton}
      </div>
    )
  }
}
