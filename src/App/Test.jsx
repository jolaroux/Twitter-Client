'use strict'
import React from 'react'


import Dropzone from 'react-dropzone'

import Color from 'Color'

import { getFriends} from '../Functions/script.js'

//importing components
import {ButtonMake, TabBarMake, InputBoxMake, InputAreaMake, TableMake,SelectRowWithTextBoxAndPlus, IndivDraftMake, SelectBox, IndivInputMake} from '../Components/components.jsx'

import {getFromStore, registerTwitter, registerStore, showLoadDialog, showSaveDialog, saveInStore, exportData, loadData, checkAllTextInputFields, sendTweet} from '../Functions/functions.js'

var fs = require('fs')
var os = require('os')


const download = require('download');

//require('./worker')

// var Worker = require('./worker.js')
//var MyWorker = require("worker-loader!./worker.js");


let videoStitch = require('video-stitch');
let videoCut = videoStitch.cut;
var randomWords = require('random-words');

//
export class Test extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = { video:  "/Users/jameslaroux/Desktop/Testingbot/IMG_1982.mp4"}
  }
  
  test = () => {
    
   
    
     videoCut({
         silent: true // optional. if set to false, gives detailed output on console 
       })
       .original({
         "fileName": "file:///Users/jameslaroux/Desktop/Testingbot/IMG_1982.mp4",
         "duration": "00:00:09"
       })
       .exclude([
         {
           "startTime": "00:00:00",
           "duration": "00:00:03"
         },
         {
           "startTime": "00:00:05",
           "duration": "00:00:04"
           
         }
       ])
       .cut()
       .then((videoClips) => {
         console.log("DONE")
         console.log(videoClips)
         // [{startTime, duration, fileName}] 
         
         //get filename url.split('/').pop().split('.')[0]
         var fileNameOfVideo = videoClips[0].fileName.split('/').pop().split('.')[0]
         
         //move to videos file with mp4 extension 
         fs.renameSync(videoClips[0].fileName, os.homedir() + '/Desktop/Bot/Videos/' + fileNameOfVideo + '.mp4')
       });


  }
  
  unFollowAll = () => {
    
    registerStore()
    registerTwitter()
    
    var friends = []
    getFriends("thisisnotjamesA", (newFriends) => {
      for (var i = 0; i < newFriends.length; i ++) {
        console.log(newFriends[i])
        window.client.post("friendships/destroy", {"user_id":newFriends[i]}, (error, data, response) => {
          if (!error) {
            console.log("successful")
          } else {
            console.log(error)
          }
        })
      }
    })
    
    // var data = fs.readFileSync('/Users/jameslaroux/Desktop/Bot/ExportedNames/-37-FollowersNames.txt', 'utf8')
    // 
    // var names = data.split(',')
    // 
    // for (var i = 0; i < names.length; i ++) {
    //   console.log(names[i])
    //   window.client.post("friendships/destroy", {"screen_name":names[i]}, (error, data, response) => {
    //     if (!error) {
    //       console.log("successful")
    //     } else {
    //       console.log("ERROR")
    //     }
    //   })
    // }
  }
  
  followAll = () => {
    
    registerStore()
    registerTwitter()
    
    var friends = []
    getFriends("thisisnotjamesA", (newFriends) => {
      for (var i = 0; i < newFriends.length; i ++) {
        console.log(newFriends[i])
        window.client.post("friendships/create", {"screen_name":newFriends[i]}, (error, data, response) => {
          if (!error) {
            console.log("successful")
          } else {
            console.log(e)
          }
        })
      }
    })
    
  }
  
  randomTest = () => {
    //this.props.downloadedGif = this.props.downloadedGif.bind(this)
    registerStore()
    registerTwitter()
    
    window.client.get('https://api.twitter.com/1.1/statuses/show.json', {id: '874114140117323777', include_entities: true,tweet_mode:"extended"}, (error, data, response) => {
      console.log("error data response")
      console.log(error)
      console.log(data)
      console.log(response)
      
      var variants = data.extended_entities.media[0].video_info.variants
      
      var mp4Variants = []
      for (var i = 0; i < variants.length; i++) {
        console.log(variants[i].url)
        console.log(variants[i].url.split('.')[variants[i].url.split('.').length - 1])
        if (variants[i].url.split('.')[variants[i].url.split('.').length - 1] == 'mp4') {
          mp4Variants.push(variants[i])
        }
      }
      console.log("VARIANTS ARE ")
      console.log(mp4Variants)
      mp4Variants.sort(function(a,b){
        return (b.bitrate - a.bitrate)
      })
      console.log("VARIANTS ARE after sorting ")
      console.log(mp4Variants)
      
      
      var url = mp4Variants[0].url
      console.log("URL " + mp4Variants[0].url) 
      var newPath = os.homedir() + '/Desktop/TESTVIDEO3.mp4'
      console.log(newPath)
      
      download(url).then(data => {
        console.log("Done")
        console.log()
      	fs.writeFileSync(newPath, data);
      });

    })
    
  }
  
  
  test4 = () => {
    //console.log(twemoji.convert.toCodePoint('\ud83c\udde8\ud83c\uddf3'));
    fs.writeFileSync(os.homedir() + '/Desktop/fuckemoji.txt', "asdf🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈f",  "utf8")
  }
  
  test5 = () => {
    //sendTweet(status, mediaIds, callbackSuccess, callbackError) {
    sendTweet(fs.readFileSync(os.homedir() + '/Desktop/fuckemoji.txt'), null, () => {
      console.log("SUCCESS")
    },
    () => {
      console.log("error")
    })
  }
  
  test6 = () => {
    
    // Note: because the regular expression has the global flag set, this module
    // exports a function that returns the regex rather than exporting the regular
    // expression itself, to make it impossible to (accidentally) mutate the
    // original regular expression.

    const text = `
  ⌚
🏳️‍🌈
👩
👩🏿
    `;

    
    let match;
    while (match = regex.exec(text)) {
      const emoji = match[0];
      console.log(`Matched sequence ${ emoji } — code points: ${ [...emoji].length }`);
    }
  }
  
  

  render() {
    
    
    
    
    const video = <video  width="30%"  controls>
        <source src={this.state.video + '#t=3,5'} type="video/mp4"/>
      </video>
    
    const button = <div style={{margin:"30px 0px 0px 0px"}}><ButtonMake handleButtonClick={this.test} value="TEST" buttonStyle={this.props.styles.SaveButtonStyle} isSelected={false} /></div>
    
    const test = <ButtonMake handleButtonClick={this.followAll} value="FOLLOW ALL" buttonStyle={this.props.styles.SaveButtonStyle} isSelected={false} />
    const test2 = <ButtonMake handleButtonClick={this.unFollowAll} value="UNFOLLOW ALL" buttonStyle={this.props.styles.SaveButtonStyle} isSelected={false} />
    const test3 = <div><ButtonMake handleButtonClick={this.randomTest} value="test download" buttonStyle={this.props.styles.SaveButtonStyle} isSelected={false} /></div>
    const test4 = <div><ButtonMake handleButtonClick={this.test4} value="test " buttonStyle={this.props.styles.SaveButtonStyle} isSelected={false} /></div>
    
    const test5 = <div><ButtonMake handleButtonClick={this.test5} value="test tweet" buttonStyle={this.props.styles.SaveButtonStyle} isSelected={false} /></div>
    
    const test6 = <div><ButtonMake handleButtonClick={this.test6} value="test emoji " buttonStyle={this.props.styles.SaveButtonStyle} isSelected={false} /></div>
    
    return (
      <div>
        {/* {test}
        {test2} */}
        
        {test6}
    </div>
    )
  }
}




























