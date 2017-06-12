
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
import {screenNames, checkRateLimits, getRetweeters, getfriends, getFriends, startGetfriendsNames, sortUsernames} from '../Functions/script.js'
//component functions 
import {getFromStore, registerTwitter, registerStore, showLoadDialog, showSaveDialog, saveInStore, exportData, loadData, checkAllTextInputFields} from '../Functions/functions.js'

export class MassUnfollowView extends React.Component {
  constructor(props) {
    super(props)
    
    registerStore()
    registerTwitter()
    
    this.friends  = []
  }
  
  //showing friends 
  showFriends = () => {
    console.log("test called")
    getFriends("DDantheMann", 
      //callback success 
      (friends) => {
        

      
      
      //alerting friends data
      alert(friends.length + " friends found")
      console.log("FRIENDS ARE ")
      console.log(friends)


      
      
      
    })
  }
  
  //unfollowing everybdoy 
  UnfollowEveryone = () => {
    console.log("test called")
    getFriends("DDantheMann", 
      //callback success 
      (friends) => {
        
      //storing in variable
      this.friends = friends
      
      
      //alerting the number of friends 
      alert(friends.length + " friends found")

      //looping 
      for (let i = 0; i < this.friends.length; i ++) {
        window.client.post("friendships/destroy", {"user_id": this.friends[i]}, (error, data, response) => {
          console.log("ERROR FOR " + this.friends[i] + " IS " + error)
          console.log("data is " + data )
          console.log(response)
        })
      }
      
    })
  }
  
  
  
  render () {
    
    //button that show followers 
    const showFriendsButton = <ButtonMake handleButtonClick={this.showFriends} value="Show all Friends" buttonStyle={this.props.styles.SaveButtonStyle} isSelected={false} />
    
    //button that unfollows everyone
    const UnfollowAllButton = <ButtonMake handleButtonClick={this.UnfollowEveryone} value="Unfollow Everyone" buttonStyle={this.props.styles.SaveButtonStyle} isSelected={false} />
    
    
    return (
      <div>
        <div>{UnfollowAllButton}</div>
        <div>{showFriendsButton}</div>
      </div>
    )
  }
}