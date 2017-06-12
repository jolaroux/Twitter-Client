'use strict'
//need to import the react stuff
import React from 'react';
import ReactDOM from 'react-dom';
//importing styles
import {Styles} from '../HTML and CSS/styles.jsx'
// for saving data
import {Store} from './Store.js'
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
// require("./script.js")
// require("./functions.js")
const path = require('path')
const os = require('os');
var fs = require('fs-extra');
import moment from 'moment'
import update from 'immutability-helper';
const {dialog} = require('electron').remote
import Junk from 'junk'
const readChunk = require('read-chunk');
let shelljs = require('shelljs');

var FileReader = require('filereader')
var fileReader = new FileReader()




/*###### ##     ## ##    ##  ######  ######## ####  #######  ##    ##  ######
##       ##     ## ###   ## ##    ##    ##     ##  ##     ## ###   ## ##    ##
##       ##     ## ####  ## ##          ##     ##  ##     ## ####  ## ##
######   ##     ## ## ## ## ##          ##     ##  ##     ## ## ## ##  ######
##       ##     ## ##  #### ##          ##     ##  ##     ## ##  ####       ##
##       ##     ## ##   ### ##    ##    ##     ##  ##     ## ##   ### ##    ##
##        #######  ##    ##  ######     ##    ####  #######  ##    ##  ####*/


//trimming a video 
export function trimVideo (videoUrl, id,  duration, startSec, endSec, callbackSuccess, callbackError) {
  process.env['PATH'] = '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'

  const formatted = moment.utc(duration*1000).format('HH:mm:ss');
  console.log("formatted")
  console.log(formatted);

  // console.log("SSDFDSLKFJDLSJKF")
  // console.log(fileNameWithExtension)
  var filename = videoUrl.split('/').pop().split('.')[0]
  var extension = videoUrl.split('/').pop().split('.')[1]
  console.log("EXTENSION IS ")
  console.log(filename)
  console.log(extension)
  var newFileName = os.homedir() + '/Desktop/Bot/Videos/' + filename + 'TRIMMED' + id.toString() + '.mp4'
  var tempFileName = os.homedir() + '/Desktop/Bot/Videos/temp.mp4'
  var tempFileName2 = os.homedir() + '/Desktop/Bot/Videos/temp2.mp4'
  var tempFileName3 = os.homedir() + '/Desktop/Bot/Videos/temp3.mp4'
  
  var secDuration = endSec - startSec
  
  //converting to time 
  var startSecFormat = moment.utc(startSec*1000).format('HH:mm:ss.SSS').toString()
  var endSecFormat = moment.utc(endSec*1000).format('HH:mm:ss.SSS').toString()
  var secDurationFormat = moment.utc(secDuration*1000).format('HH:mm:ss.SSS').toString()
  console.log("START AND END")
  console.log(startSecFormat)
  console.log(endSecFormat)
  console.log(secDurationFormat)
  var timeRange = startSecFormat + ',' + endSecFormat
  console.log("timerange ")
  console.log(timeRange)
  
  
    //ffmpeg -i a.mp4 -force_key_frames 00:00:09,00:00:12 out.mp4
    var commandKeypoint = 'ffmpeg -i \"' + videoUrl + '\" -preset ultrafast -force_key_frames ' + timeRange +  ' -c copy \"' + tempFileName + '\" -y'
    
    console.log("Command keypoint ")
    console.log(commandKeypoint)
    
    //test 
    process.env['PATH'] = '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
    
    let child = shelljs.exec(commandKeypoint, { async: true, silent: false });
    
    child.on('exit', (code, signal) => {
      console.log("CODE IS ")
      console.log(code)
      console.log("SIGNAL IS ")
      console.log(signal)
    
      if (code === 0) {
        console.log("CODE === 0 in forcing key frames ")
        
        //trimming the video

        
        let commandQuery = 'ffmpeg -i \"' + tempFileName + '\" -preset ultrafast -ss ' + startSecFormat + ' -t ' + secDurationFormat + ' -c copy \"' + newFileName + '\"  -y';
          console.log("COMMAND QUERY")
          console.log(commandQuery)
    
        let child2 = shelljs.exec(commandQuery, { async: true, silent: false });
    
        child2.on('exit', (code, signal) => {
          console.log("CODE IS ")
          console.log(code)
          console.log("SIGNAL IS ")
          console.log(signal)
          
    
          if (code === 0) {
            console.log("CODE === 0 in trimming video")
            callbackSuccess && callbackSuccess(newFileName)
          }
          
        })
      
    }
  })

            
            
    
  
  
  

  // //setting the keypoint
  // //ffmpeg -i a.mp4 -force_key_frames 00:00:09,00:00:12 out.mp4
  // var commandKeypoint = 'ffmpeg -i ' + videoUrl + ' -codec copy -force_key_frames ' + timeRange +  ' ' + tempFileName + ' -y'
  // 
  // console.log("Command keypoint ")
  // console.log(commandKeypoint)
  // 
  // let child = shelljs.exec(commandKeypoint, { async: true, silent: false });
  // 
  // child.on('exit', (code, signal) => {
  //   console.log("CODE IS ")
  //   console.log(code)
  //   console.log("SIGNAL IS ")
  //   console.log(signal)
  // 
  //   if (code === 0) {
  //     console.log("CODE === 0")
  //     
  //     
  //     
  //     
  //     //trimming the video
  //     //ffmpeg -i /Users/jameslaroux/Desktop/Bot/Videos/temp.mp4 -codec copy -ss 4.9 -t 10 /Users/jameslaroux/Desktop/Bot/Videos/TEMPTEMP.mp4 -y
  //     
  //     let commandQuery = 'ffmpeg -i ' + tempFileName + ' -codec copy -ss ' + startSecFormat + ' -t ' + (endSec - startSec).toString() + ' ' + tempFileName2 + '  -y';
  //       console.log("COMMAND QUERY")
  //       console.log(commandQuery)
  // 
  //     let child2 = shelljs.exec(commandQuery, { async: true, silent: false });
  // 
  //     child2.on('exit', (code, signal) => {
  //       console.log("CODE IS ")
  //       console.log(code)
  //       console.log("SIGNAL IS ")
  //       console.log(signal)
  //       
  // 
  //       if (code === 0) {
  //         console.log("CODE === 0")
  //         
  //         
  //         
  //         //ffmpeg -i INPUT_FILENAME -r 40 -c:v libx26 -acodec aac -strict -2 OUTPUT_FILENAME.mp4
  //         
  //         ////ffmpeg -i video.mov -r 40 -c:v libx264 -acodec aac -b:v 1M -vf scale=640:-1 video.mp4  
  //         
  //         console.log("newfilename ")
  //         console.log(newFileName)
  //         
  //         
  //         
  //         //var commandQuery3 = 'ffmpeg -i ' + tempFileName2 + ' -r 40 -vcodec libx264 -acodec aac -strict -2 -preset ultrafast ' + newFileName + ' -y'
  //         var commandQuery3 = 'ffmpeg -i ' + tempFileName2 + ' -c:v libx264 -acodec aac -preset ultrafast ' + newFileName + ' -y'
  //         //var commandQuery3 = 'ffmpeg -i ' + tempFileName2 + ' -preset ultrafast -r 30 -c:v libx264 ' + newFileName + ' -y'
  //         
  //       
  //         console.log("commandQuery3")
  //         console.log(commandQuery3)
  //         let child3 = shelljs.exec(commandQuery3, { async: true, silent: false });
  //         
  //         child3.on('exit', (code, signal) => {
  //           console.log("CODE IS ")
  //           console.log(code)
  //           console.log("SIGNAL IS ")
  //           console.log(signal)
  //           
  // 
  //           if (code === 0) {
  //             
  //             
  //             
  //             // 
  //             // var command4 = 'ffmpeg -i ' + tempFileName3 + ' -c:v libx264 -preset ultrafast ' + newFileName + ' -y'
  //             // console.log("command 4")
  //             // console.log(command4)
  //             // let child4 = shelljs.exec(command4,  { async: true, silent: false })
  //             // 
  //             // child4.on('exit', (code,signal) => {
  //             //   if (code === 0) {
  //                 console.log("CODE === 0")
  //                 console.log("new file name ")
  //                 console.log(newFileName)
  //                 callbackSuccess && callbackSuccess(newFileName)
  //             //   }
  //             // })
  //             // 
  //             
  //           }
  //         })
  //         
  //         // resolve({
  //         //   startTime: args.startTime,
  //         //   duration: args.duration,
  //         //   fileName: cutFileName,
  //         // });
  //         
  //         // this.props.setTrimmedVideo(newFileName, this.props.i)
  //         // this.showSaveButton(false)
  //         // this.showTrimView()
  //         // this.startSec = 0
  //         // this.endSec = secDuration
  //         // this.sliderThing.noUiSlider.destroy()
  //         
  // 
  //       } else {
  //         console.log("CODE DOES NOT === 0")
  //         //reject({ err: { code: code, signal: signal } });
  //         callbackError && callbackError()
  //       }
  // 
  //     });
  //     
  //     
  // 
  //   } else {
  //     console.log("CODE DOES NOT === 0")
  //     callbackError && callbackError()
  //     //reject({ err: { code: code, signal: signal } });
  //   }
  // 
  // });
  // 
  
}


//getting the filename to load from
//loading saved account data
export function showLoadDialog(dir, title, filters, callback){
  // var dir = os.homedir() + '/Desktop/Bot/UserAccountInfo'
  
  dialog.showOpenDialog({defaultPath: dir}, (filePaths) => {
    
    if (filePaths != undefined) {
      console.log(filePaths[0])
      
      //loading the data
      loadData(filePaths[0], (data) => {
        callback && callback(data)
      })
        
    } else {
      console.log("no path")
    }
  })
}



//getting the filename to save too
export function showSaveDialog(dir, defaultPath, title, filters, callback) {


  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  
  //showing the save dialog
  dialog.showSaveDialog({title:title, defaultPath: dir + defaultPath, filters: [
    { extensions: filters }
  ]},(fileName) => {
  //if no file name
  if (fileName === undefined){
      console.log("You didn't save the file");
      return;
  } else { 
    console.log("show save dialog "+fileName)
    callback && callback(fileName)
  }

    
  }); 
  
}

//check time after upload
export function checkTime(mediaID, callbackSuccess, callbackError) {
  //register 
  registerStore()
  registerTwitter()
  
  window.client.get("media/upload", {"command": "STATUS", "media_id": mediaID}, (error, data, response) => {
    if (!error) {
      console.log("MEDIA ID IS " +mediaID)
      // console.log("IN CHECK TIME")
      // console.log(error)
      // console.log(data)
      // console.log(response)
      var info = data.processing_info.state
      console.log("INFO IS "+info)
      
      //if it failed
      if (info == "failed") {
        //showing error for failed
        callbackError && callbackError(data.processing_info.error)
      } else if (info == "succeeded") {
        callbackSuccess && callbackSuccess()
      } else {
        var check = data.processing_info.check_after_secs
        
        //set the timeout
        console.log("setting timeout for "+check+" seconds")
        setTimeout(function() {checkTime(mediaID, callbackSuccess, callbackError)}, check*1000)
      }
    } else {
      callbackError && callbackError(error, data, response)
    }
  })
}


//send a tweet function 
export function sendTweet(status, mediaIds, callbackSuccess, callbackError) {
  
  //register 
  registerStore()
  registerTwitter()
  
  
  //sending the tweet
  var mediaString = ""
  // if there's ids sent
  if (mediaIds != null) {
    for (var i = 0; i < mediaIds.length; i++) {
      mediaString = mediaString + mediaIds[i] + ','
    }
  }
  
  var statusToSend = {status: status, media_ids: mediaString, enable_dm_commands: false}
  
  
  window.client.post('statuses/update', statusToSend, (error, tweet, response) => {
    
    //if no error with tweet
    if (!error) {
      callbackSuccess && callbackSuccess(tweet)
      
      //if error with tweet
    } else {
      console.log(error[0])
      callbackError && callbackError(error, response)
    }
  });

}


//doing everything in a function 
export function uploadData() {
  
}


//finalizing the upload 
export function finalizeUpload(mediaID, callbackSuccess, callbackError) {
  
  
  
  
  
  console.log("MEDIA ID IN FINAL IS " + mediaID)
  console.log(typeof mediaID)
  window.client.post("media/upload", {command: "FINALIZE", media_id: mediaID}, (error, data, response) => {
    
    //if no error
    if (!error) {
      console.log("FINALIZE UPLOAD SUCCESSFUL")
      callbackSuccess && callbackSuccess(error, data, response)
    } else {
      console.log("ERROR IN FINALIZE")
      callbackError && callbackError(error, data, response)
    }
    
  })
  
}

//appending each chunk , calling itself recursively
// export function appendUploadLoop( uploadData, mediaID, segIndex, shouldKeepGoing, callbackQuit, callbackUpdate, callbackSuccess, callbackError) {
//   registerStore()
//   registerTwitter()
//   
//   console.log("\n\n\n\n\n\n\nIN APPEND UPLOAD")
//   console.log(uploadData[0])
//   console.log(uploadData[0].length)
//   console.log(uploadData.length)
//   console.log(mediaID)
//   console.log(segIndex)
//   
//   function loopUpload() {
//     if (shouldKeepGoing()) {
//       //posting the data element of segIndex
//       window.client.post("https://upload.twitter.com/1.1/media/upload.json", {"command": "APPEND", "media_id": mediaID, "media_data": uploadData[segIndex], "segment_index": segIndex}, (error, data, response) => {
//         //if successful
//         //console.log("error is "+error)
//         if (!error) {
//           console.log(response)
//           //console.log("no error in append " + segIndex)
//           console.log(segIndex)
//           console.log(uploadData[segIndex].length)
//           
//           //if its not the last index
//           if (segIndex != (uploadData.length - 1)) {
//             segIndex++
//             //call loop again with updated segIndex
//             callbackUpdate && callbackUpdate(segIndex)
//             loopUpload()
// 
//           //if it is the last index
//           } else {
//             console.log("appendUploadLoop is done looping")
//             console.log(segIndex)
//             console.log(uploadData[segIndex].length)
//             callbackSuccess && callbackSuccess(error, data, response)
//           }
//           
//           
//         // if not successful, and there is an error
//         } else {
//           console.log("Error in media upload append "+ segIndex)
//           callbackError && callbackError(error, data, response)
//         }
//       })
//     } else {
//       callbackQuit && callbackQuit()
//     }
//     
//     
//   }
//   
//   loopUpload()
//     
// }

// 
// export function appendUploadLoop( uploadData, mediaID, segIndex, shouldKeepGoing, callbackQuit, callbackUpdate, callbackSuccess, callbackError) {
//   
//   
//   console.log("\n\n\n\n\n\n\nIN APPEND UPLOAD")
//   //console.log(uploadData[0])
//   console.log(uploadData[0].length)
//   console.log(uploadData[99].length)
//   console.log(uploadData.length)
//   console.log(mediaID)
//   console.log(segIndex)
//   
//   function loopUpload() {
//     if (/*shouldKeepGoing()*/true) {
//       //posting the data element of segIndex
//       window.client.post("media/upload", {command: "APPEND", media_id: mediaID, media_data: uploadData[segIndex], segment_index: segIndex}, (error, data, response) => {
//         //if successful
//         //console.log("error is "+error)
//         if (!error) {
//           console.log("\n\n\n\n")
//           console.log(data)
//           console.log(response)
//           //console.log("no error in append " + segIndex)
//           console.log(segIndex)
//           console.log(uploadData[segIndex].length)
//           console.log(mediaID)
//           
//           //if its not the last index
//           if (segIndex != (uploadData.length - 1)) {
//             segIndex++
//             //call loop again with updated segIndex
//             callbackUpdate && callbackUpdate(segIndex)
//             loopUpload()
// 
//           //if it is the last index
//           } else {
//             console.log("appendUploadLoop is done looping")
//             
//             callbackSuccess && callbackSuccess(error, data, response)
//           }
//           
//           
//         // if not successful, and there is an error
//         } else {
//           console.log("Error in media upload append "+ segIndex)
//           callbackError && callbackError(error, data, response)
//         }
//       })
//     } else {
//       callbackQuit && callbackQuit()
//     }
//     
//     
//   }
//   
//   loopUpload()
//     
// }    
//   
//   

function uploadChunk (mediaID, dataU, seg, callbackUpdate, callbackSuccess, callbackError) {
  console.log("\n\nUPLOADING CHUNK " + seg)
  window.client.post("https://upload.twitter.com/1.1/media/upload.json", {"command": "APPEND", "media_id": mediaID, "media": dataU, "segment_index": seg}, (error, data, response) => {
    //if successful
    //console.log("error is "+error)
    if (!error) {
      //console.log(response)
      //console.log("no error in append " + segIndex)
      
      //console.log(dataU.length)
      window.appendTracker++
      //console.log(window.appendTracker)
      //if its not the last index
      console.log("appendTracker "  + window.appendTracker)
      console.log("totalTrackerThing " + window.totalTrackerThing)
      if (window.appendTracker != (window.totalTrackerThing)) {
        //call loop again with updated segIndex
        callbackUpdate && callbackUpdate(window.appendTracker)
        

      //if it is the last index
      } else {
        console.log("appendUploadLoop is done looping")
        console.log(window.appendTracker)
        callbackSuccess && callbackSuccess(error, data, response)
      }
      
      
    // if not successful, and there is an error
    } else {
      console.log("Error in media upload append "+ seg)
      console.log(error)
      console.log(response)
      console.log(data)
      //callbackError && callbackError(error, data, response)
      uploadChunk(mediaID, dataU, seg, callbackUpdate, callbackSuccess, callbackError) 
    }
  })
}


//(mediaID, dataU, seg, callbackUpdate, callbackSuccess)
export function appendUploadLoop( uploadData, mediaID, segIndex, shouldKeepGoing, callbackQuit, callbackUpdate, callbackSuccess, callbackError) {
  registerStore()
  registerTwitter()
  window.appendTracker = 0
  window.totalTrackerThing = uploadData.length
  
  console.log("\n\n\n\n\n\n\nIN APPEND UPLOAD")
  //console.log(uploadData[0])
  console.log(uploadData[0].length)
  console.log(uploadData.length)
  console.log(mediaID)
  console.log(segIndex)
  
  
  for (let i = 0; i < uploadData.length; i++) {
    
    uploadChunk(mediaID, uploadData[i], i, callbackUpdate, callbackSuccess, callbackError)
  
  }

  
    
}    
  
  


//initing upload 
export function initUpload(bytes, type, category, callbackSuccess, callbackError) {
  
  registerStore()
  registerTwitter()
  
  console.log("\n\n\n\n\n")
  console.log("in init upload ")
  console.log(bytes)
  console.log(type)
  console.log(category)
  
  
  window.client.post("media/upload", {"command": "INIT", "total_bytes": bytes, "media_type": type, "media_category": "tweet_video"} , function(error, data, response) {
    
    //if theres no error
    if (!error) {
      console.log(response)
      console.log("No error in init")
      var mediaID = data["media_id_string"]
      console.log("MEDIA ID IS ")
      console.log(mediaID)
      callbackSuccess && callbackSuccess(mediaID, response, data)
      
    //if there was an error
    } else {
      alert("ERROR")
      //console.log(error)
      callbackError && callbackError(error)
    }
    
  }) 
  
}



//getting the data of a file
export function getBase64AndBytesFromFile(file, callback) {

  //var r = new FileReader();

  var dataToUpload = undefined
  var totalBytes = undefined
  // r.onload = function(e) { 
  //   console.log("onload ")
  //   dataToUpload = btoa(e.target.result)
  //   totalBytes = e.target.result.length
  //   //console.log(dataToUpload.length)
  //   //console.log(totalBytes)
  //   
  //   var obj = {base64: dataToUpload, bytes: totalBytes}
  //   callback && callback(obj)
  //   
  // }
  console.log(file)
  fs.readFile(file, 'base64',  (err, data) => {
    if (err) throw err;
    
    //should be b64 data 
    dataToUpload = data
    
    fs.readFile(file, 'binary', (err, data) => {
      totalBytes = data.length
      
      var obj = {base64: dataToUpload, bytes: totalBytes}
      callback && callback(obj)
      
    })
    
    //console.log(data.length)
    
    
  });
  
  
}

export function loadData(filename, callback) {
  fs.readFile(filename,'utf8' , function read(err, data) {
    if (!err) {
      //console.log(data)
      callback && callback(data)
    } else {
      alert("ERR READING "+err)
    }
  })
}

export function exportData(data, filename) {
  console.log("EXPORTING DATA")
  
  
  //writing to the file
  fs.writeFile(filename, data, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  }); 
}

export function registerTwitter() {
  
  var key = store.get('Consumer Key')
  var secret = store.get('Consumer Secret')
  var tokenkey = store.get('Token Key')
  var tokensecret = store.get('Token Secret')

  window.client = new Twitter({consumer_key: key, consumer_secret: secret, access_token_key: tokenkey, access_token_secret: tokensecret});
}


export function registerStore() {
  
  
  //making an object of names that is {name:name} for the defaults
  var namesObject = ['Consumer Key', 'Consumer Secret', 'Token Key', 'Token Secret', 'Account Name'].reduce(function(result, item) {
    result[item] = item; //a, b, c
    return result;
  }, {})
        

  //this makes the store variable global
  window.store = new Store({
      // We'll call our data file 'user-preferences'
      configName: 'user-preferences',
      defaults: namesObject
    });
  
}

//this goes through the [name/s] sent and sees if they all have text in them
export function checkAllTextInputFields(names) {
  
  //this is seeing if every text input field has data in it
  var tracker = true
  for (var i = 0; i < names.length; i++) {
    
    if (document.getElementById('inputform' + names[i]).value == "") {
      tracker = false
    } 
  }

  if (tracker == true) {
    
    return true
  } else {
    return false
  }
  
}

//getting the value from the store
export function getFromStore(names) {
  
  //making an object of names that is {name:name} for the defaults
  var namesObject = names.reduce(function(result, item) {
    result[item] = item; //a, b, c
    return result;
  }, {})
        

  //this makes the store variable global
  window.store = new Store({
      // We'll call our data file 'user-preferences'
      configName: 'user-preferences',
      defaults: namesObject
    });
    
  //getting the stored data for each of the names  
  var data = []
  for (name of names) {
    data.push(store.get(name))
  }
  
  //this makes an object that is {name: data} to return so it's easier to access
  var dataObject = names.reduce(function(result, item) {
    result[item] = data[names.indexOf(item)]; //a, b, c
    return result;
  }, {})
  
  //sending the data object back
  return dataObject
}

//this takes the [name/s] of things to store, whether its from an inputfield, and the data if its not
export function saveInStore(names, isFromInputField, data = null) {
  
  //if its from an input form, set the value of inputform + name equal to each name sent
  if (isFromInputField == true) {
    for (name of names) {
      //this gets the value of every input field of name send
      store.set(name, document.getElementById('inputform' + name).value)
    }
  } else {
    for (var i = 0; i < names.length; i++) {
      store.set(names[i], data[i] )
    }
  }
}
