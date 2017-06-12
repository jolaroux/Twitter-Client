'use strict'
import React from 'react'
import Color from 'Color'
//importing components
import {ButtonMake, TabBarMake, InputBoxMake, InputAreaMake, TableMake,SelectRowWithTextBoxAndPlus, IndivDraftMake, SelectBox, IndivInputMake} from '../Components/components.jsx'
import {getFromStore, registerTwitter, registerStore, showLoadDialog, showSaveDialog, saveInStore, exportData, loadData, checkAllTextInputFields} from '../Functions/functions.js'
var fs = require('fs')
var os = require('os')
var shelljs = require('shelljs')
const download = require('download');
//const clipboardy = require('clipboardy');
// var ncp = require("copy-paste");
var validUrl = require('valid-url');
const normalizeUrl = require('normalize-url');


export class VideoDownloader extends React.Component {
  constructor(props) {
    super(props)
    // console.log("execCommand")
    // console.log(ncp.paste())
    
    
    // let child1 = shelljs.exec("pbpaste", {async: true, silent: false})
    // child1.on('exit', (code, signal) => {
    //   console.log("exit")
    //   console.log(code)
    //   if (code === 0) {
    //     console.log(signal)
    //   }
    // })
    //TESTTESTTEST
    // const { spawn } = require('child_process');
    // const child = spawn('pbpaste');
    // 
    // child.stdout.on('data', (data) => {
    //   
    //   if (normalizeUrl(data.toString().search("twitter.com")) != -1) {
    //     console.log(data.toString())
    //     var normalized = (normalizeUrl(data.toString()).toString())
    //     this.state=({url: normalized})
    //     
    //   } else {
    //     this.state = ({url:""})
    //   }
    //     
    //   
    // });
    // 
    // child.on('exit', function (code, signal) {
    //   console.log('child process exited with ' + `code ${code} and signal ${signal}`);
    //   console.log(child.stdout)
    // });
    this.state = ({url:""})
    
  }
  
  // componentDidUpdate = () => {
  //   if (this.state.url != "") {
  //     console.log("DID UPDATE")
  //     console.log(this.state.url)
  //     this.showSave()
  //   }
  // }
  
  showSave = () => {
    showSaveDialog(os.homedir() + '/Desktop/', "", "Download video to:", null, ( filename ) => {
      console.log(filename)
      console.log("SHOW SAVE")
      console.log(this.state.url)
      //testing for mp4 
      //if (filename.split('.').pop() != 'mp4')
      
      var newPath = filename
      newPath += '.mp4'
      console.log("execCommand")
      document.execCommand('paste');
      var id = this.state.url.split('/').pop()
      
      window.client.get('https://api.twitter.com/1.1/statuses/show.json', {id: id, include_entities: true,tweet_mode:"extended"}, (error, data, response) => {
        console.log("error data response")
        console.log(error)
        console.log(data)
        console.log(response)
        if (!error) {
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
        //var newPath = os.homedir() + '/Desktop/TESTVIDEO3.mp4'
        console.log("NEWPATH")
        console.log(newPath)
        
        download(url).then(data => {
          console.log("Done")
          console.log()
        	fs.writeFileSync(newPath, data);
          this.setState({url:""})
        });

      } else {
        alert("Error. Check console")
        console.log(error)
        console.log(data)
        console.log(response)
      }
      
    
    })
  })
      
      
  //  }) 
  
  }
  
  render () {
    //bactround color 
    const bColor2 = Color('#03a9f4').alpha(0.3)
    
    //url of tweet 
    const urlInput = <IndivInputMake name="Url of tweet" onChange={(e) => {this.setState({url: e.target.value})}} style={this.props.styles.TextInputFormStyle} value={this.state.url} placeholder="twitter.com/..."/>
    
    //grab video 
    console.log(this.state)
    const showSave = this.state.url != "" ? <ButtonMake handleButtonClick={this.showSave} value="Download Video" buttonStyle={this.props.styles.SaveButtonStyle} isSelected={false} /> : null

    
    
    return (
      <div style={{borderRadius: "3px", backgroundColor: bColor2, padding:"10px" }}>
        {urlInput}
        {showSave}
      </div>
    )
  }
}