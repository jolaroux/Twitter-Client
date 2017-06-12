 require("../Functions/functions.js")
 import {trimVideo} from '../Functions/functions.js'
 import {ButtonMake, TabBarMake, InputBoxMake, InputAreaMake, TableMake,SelectRowWithTextBoxAndPlus,  SelectBox, IndivInputMake, DraftJSEmojisMake, GifMakeDefault} from '../Components/components.jsx'
// require("./script.js")
// 
// require("./Store.js")
//need to import the react stuff
import React from 'react';
import ReactDOM from 'react-dom';
//clone deep
var cloneDeep = require('lodash.clonedeep');
//map values for object
var mapValues = require('lodash.mapvalues');
import Color from 'Color'
var fs = require('fs')
var mime = require('mime-types')
const path = require('path')
const os = require('os');
import wNumb from 'wNumb'

var moment = require('moment');
var emojis = require('emojis-list');
const readChunk = require('read-chunk');
var download = require('download-file');
// import EmojiPicker from 'emojione-picker'
//var EmojiPicker = require('emojione-picker');

/*## ##    ## ########  #### ##     ##    ########  ########     ###    ######## ########
 ##  ###   ## ##     ##  ##  ##     ##    ##     ## ##     ##   ## ##   ##          ##
 ##  ####  ## ##     ##  ##  ##     ##    ##     ## ##     ##  ##   ##  ##          ##
 ##  ## ## ## ##     ##  ##  ##     ##    ##     ## ########  ##     ## ######      ##
 ##  ##  #### ##     ##  ##   ##   ##     ##     ## ##   ##   ######### ##          ##
 ##  ##   ### ##     ##  ##    ## ##      ##     ## ##    ##  ##     ## ##          ##
#### ##    ## ########  ####    ###       ########  ##     ## ##     ## ##          */
import {sendTweet, finalizeUpload, appendUploadLoop, initUpload, getBase64AndBytesFromFile, checkTime} from '../Functions/functions.js'

import Dropzone from 'react-dropzone'

var htmlToText = require('html-to-text');
//require('react-html5-video-editor/dist/react-html5-video-editor.js');
var noUiSlider = require('nouislider');
import poster from 'poster-image'
let videoStitch = require('video-stitch');
let shelljs = require('shelljs');
 
let videoCut = videoStitch.cut;

export class IndivDraftMake extends React.Component {
  constructor(props) {
    super(props)
    //// console.log(emojis)
    // registerStore()
    // registerTwitter()
    
    var hasVideo = this.props.videoUrl != ""
    //// // console.log(hasVideo)
    
    
    
    
    this.state=({canSendTweet: false, isVideo: hasVideo, showSave: false, progress: 0, isSent: null, textLength: this.props.draft.text.length, isTrimming: false, isTrimmingShowSlider: false, isTrimmingShowButton: false, isSavingTrimmedVideo: false, showLoadingForUpload: false, croppingImageUrl: "", isAddingGif: false})
    // isTrimming: false, isTrimmingAnimation:false, id: "", i:"", trimVideoUrl:"", loadedVideoHeight:null, loadedVideoWidth:null
    
    //keeping track of tracking 
    this.startSec = 0
    this.endSec = null
    this.savedEndSec = null
    
    
    
    this.totalBytes = undefined
    this.binaryArray = []
    this.dataToUpload = undefined
    this.status = ""
    this.isSendingTweet = false
    
    
    this.tempStatus = this.props.draft.status
    
  }
  
  uploadHandle = (totalBytes, binaryArray, mimeType, mediaCategory) => {

    //init progress bar 
    this.updateProgressBar(0)

      
      initUpload(totalBytes, mimeType, mediaCategory,
        /*success*/(mediaID, response,data) => {
        // // console.log("IN INIT SUCCESS")
        //start the background 
        this.setState({progress: 5})
          
          //starting the append loop that uploades each chunk of binaryArray
          appendUploadLoop(binaryArray, mediaID, 0,
            
            /*should keep updating*/ () => {
              return this.isSendingTweet
            },
            
            /*when tweet is cancelled*/ () => {
              this.setState({progress: 0})
              this.isSendingTweet = false
            },
            
            /*update*/ (update) => {
              //// // console.log("in update: segindex is " + update)
                // this.setState({progress: temp + 5})
              // var progress = ((update / 100) * 90) + 5
              // this.setState({progress: progress})
              this.updateProgressBar(update)
            },
            
            /*success*/(error, data, response) => {
            
              //finalizing the upload
              finalizeUpload(mediaID, 
                /*success*/ (error, data, response) => {
                
                  //checking the time of the status and stuff 
                  checkTime(mediaID, 
                    /*success*/ () => {
                    //send the tweet if its a success
                    //send to the handling function 
                    this.handleTweetIfFinishedUploading(mediaID)
                    
                    //if theres something wrong with checking the status
                  },/*error*/ (error, data, response) => {
                    // // console.log(error)
                    // // console.log(data)
                    // // console.log(response)
                    this.setState({isSendingTweet: false})
                    this.props.saveAsFailed(this.props.draft.id)
                    this.isSendingTweet = false
                  })
                  
              }, //if theres an error with finalizing 
                /*error*/ (error, data, response) => {
                  // console.log("Error in finalize")
                  // console.log("error is ")
                  // console.log(error)
                  // console.log(data)
                  // console.log(response)
                  // console.log(mimeType)
                  // console.log(mediaCategory)
                  // console.log(totalBytes)
                  this.setState({isSendingTweet: false})
                  this.isSendingTweet = false
                  this.props.saveAsFailed(this.props.draft.id)
              })
              
            },
             /*error*/(error, data, response) => {
             // // console.log("Error in append ")
             // // console.log(error)
             // // console.log(data)
             // // console.log(response)
             this.setState({isSendingTweet: false})
             this.isSendingTweet = false
             this.props.saveAsFailed(this.props.draft.id)
           })
          
        }, 
        /*error*/(error, data, response) => {
          // // console.log("Error in initializing upload")
          // // console.log(error)
          this.setState({isSendingTweet: false})
          this.isSendingTweet = false
          this.props.saveAsFailed(this.props.draft.id)
        })
    // } else {
    //   //this.setState({isSendingTweet: false})
    //   this.isSendingTweet = false
    // }
    
  }
  
  uploadImage = (data, callbackSuccess, callbackError) => {
    
    window.client.post("https://upload.twitter.com/1.1/media/upload.json", { "media_data": data} , function(error, data, response) {
      
      //if theres no error
      if (!error) {
        // // console.log("No error in init")
        var mediaID = data["media_id_string"]
        callbackSuccess && callbackSuccess(mediaID, response, data)
        
      //if there was an error
      } else {
        //// // console.log(error)
        callbackError && callbackError(error)
      }
      
    }) 
  }
  
  
  // var mediaNum = 0
  // var tracker = 0
  // var progressTotal = 0
  
  handleTweetIfFinishedUploading = (mediaID) => {
    this.mediaIDs.push(mediaID)
    
    //if all 3 are done 
    // // console.log("MEDIA IDS ARE ")
    // // console.log(this.mediaIDs)
    // // console.log("MEDIA NUM IS ")
    // // console.log(this.mediaNum)
    if (this.mediaIDs.length == this.mediaNum) {
      
      // //making it just one thing 
      // if (this.mediaIDs.length == 1) {
      //   this.mediaIDs = this.mediaIDs[0]
      // }
      
      // // console.log("SHOULD BE SENDING TWEET")
      sendTweet(this.props.draft.text, this.mediaIDs, 
        /*success*/(tweet) => {
        // console.log("\n\nSucces in tweet")
        this.setState({isSendingTweet: false})
        //this.updateProgressBar(100)
        document.getElementById(this.props.draft.id + 'button').style.background = "#03cf32" 
        // // console.log(tweet)
        this.props.saveAsSent(this.props.draft.id)
        this.isSendingTweet = false
      }, 
      //error in sending the tweet
        /*error*/(error, response) =>  {
        // // console.log("error in sending tweet")
        // // console.log(error)
        // // console.log(response)
        alert(error[0].message)
        this.props.saveAsFailed(this.props.draft.id)
        document.getElementById(this.props.draft.id + 'button').style.background = "#fe4c4c" 
        this.isSendingTweet = false
        this.setState({isSendingTweet: false})
      })
    } else {
      // // console.log("SOMETHING UP WITH HANDLE TWEET FUNCTION ")
    }
    
    
  }
  

  updateProgressBar = (update) => {
    
    
    
    var progress = ((update / 100) * 90) + 5
    // // console.log("\n\n\nIN PROGRESS")
    // // console.log(update)
    // // console.log(progress)
    // // console.log(this.props.draft.id + 'button')
    // // console.log(document.getElementById(this.props.draft.id + 'button'))
    // // console.log(document.getElementById(this.props.draft.id + 'button').style.backgroundColor)
    // // console.log("\n\n\n\n")
    // 
    document.getElementById(this.props.draft.id + 'button').style.background = "linear-gradient(90deg, #03cf32 " + progress + "%, #e6e6e6 0%)" 
    
    //"linear-gradient(90deg, #03cf32 " + progress + "%, #e6e6e6 0%)"
    
    
    //{background: "linear-gradient(90deg, #03cf32 " + this.state.progress + "%, #e6e6e6 0%)"}
    
    // var progress = ((update / 100) * 90) + 5
    // this.setState({progress: progress})
  }
  
  showFileLoader = (e) => {
    //showLoadDialog(dir, title, filters, (data) => {})
    //loading icon 
    this.setState({showLoadingForUpload: true})
    this.props.uploadHandle(e)
  }
  
  loadFileInUpload = (file) => {
    
      var dataToUpload = []  
        
      //getting base64 and total bytes
      getBase64AndBytesFromFile(file, (results) => {
        var binaryArray = []
        var totalBytes = results.bytes
        dataToUpload = results.base64
        
        const div = Math.ceil( totalBytes / 100)
        // console.log("GET DATA")
        // console.log(totalBytes)
        // console.log(div)
        
        
        const dif = div
        var increment = dif
        var lastIndex = 0
        var counter = 0 
        for (var i = increment; i<= totalBytes; i+= increment) {
          //// console.log(i)
          var temp = []
          temp = readChunk.sync(file, lastIndex, dif)
          // // console.log("\n\n\n\n\n\n\ni")
          // // console.log(i)
          // // console.log("dif")
          // // console.log(dif)
          increment = readChunk.sync(file, i, dif).length
          // // console.log("temp length")
          // // console.log(temp.length)
          //// console.log("increment is " + increment)
          
          
          binaryArray.push(temp)
          lastIndex = i
          if (i == totalBytes) {
            break
            
          }
        }
        
        
        
        // // console.log("\n\n\n\nBINARY ARRAY IS ")
        // // console.log(binaryArray)
        // // console.log(binaryArray.length)
        
        
        var mimeType = mime.lookup(file)
        
        var mediaCategory = ""
        if (mimeType.split('/')[1] == "gif") {
          mediaCategory = "tweet_gif"
        } else if (mimeType.split('/')[0] == "video") {
          mediaCategory = "tweet_video"
        } else {
          mediaCategory = "tweet_image"
        }
        
        // var dataToUpload = results.base64
        // // console.log("base 64 length is ")
        // // console.log(dataToUpload.length)
        // // console.log("total bytes is ")
        // var totalBytes = results.bytes
        // // console.log(totalBytes)
        // var mimeType = mime.lookup(file)
        // var binaryArray = []
        // 
        // var mediaCategory = ""
        // if (mimeType.split('/')[1] == "gif") {
        //   mediaCategory = "tweet_gif"
        // } else if (mimeType.split('/')[0] == "video") {
        //   mediaCategory = "tweet_video"
        // } else {
        //   mediaCategory = "tweet_image"
        // }
        // // console.log("MEDIA CATEGORY IS ")
        // // console.log(mediaCategory)
        // 
        // // fs.writeFileSync(os.homedir() + '/Desktop/TESTTEST.txt', dataToUpload)
        // // 
        // // // // console.log(dataToUpload.length)
        // // // // console.log(totalBytes)
        // // // // console.log(mimeType)
        // // // // console.log(mediaCategory)
        // 
        // 
        // //// // console.log("length of b64 "+this.dataToUpload.length)
        // const div = Math.ceil( dataToUpload.length / 100)
        // //// // console.log("Div is "+div)
        // 
        // const dif = div
        // var increment = dif
        // var lastIndex = 0
        // var counter = 0 
        // for (var i = increment; i<= dataToUpload.length; i+= increment) {
        //   
        //   var temp = []
        //   temp = dataToUpload.slice(lastIndex, i)
        //   increment = dataToUpload.slice(i, i+dif).length
        //   
        //   
        //   
        //   binaryArray.push(temp)
        //   lastIndex = i
        //   if (i == dataToUpload.length) {
        //     break
        //     
        //   }
        // }
        //(totalBytes, binaryArray, mimeType, mediaCategory)
        
        // console.log("IN THING LSDKJFSLK THIS HSUOULD BE LOGGIN LKSDJF LSKDJ FLKSDJ FLKSJ FL\n\n\n")
        //// console.log(dataToUpload)
        //// console.log(binaryArray.length)
        
        //if its an image, upload directly 
        if (mediaCategory == "tweet_image" || mediaCategory == "tweet_gif") {
          document.getElementById(this.props.draft.id + 'button').style.background = "linear-gradient(90deg, #03cf32 50%, #e6e6e6 0%)" 
          // console.log("TWEET IMAGE OR GI")
          this.uploadImage(dataToUpload, 
            //success 
            (mediaID, response, data) => {
              // // // console.log("SUCCESS")
              // // // console.log(mediaID)
              // // // console.log(response)
              // // // console.log(data)
              this.handleTweetIfFinishedUploading(mediaID)
              this.isSendingTweet = false
            },
            //error
            (error) => {
              // // console.log("ERROR ")
              // // console.log(error)
              this.isSendingTweet = false
            }
            
            )
          } //if its not an image, upload chunked 
          else {
            //UNCOMMENT
            this.uploadHandle(totalBytes, binaryArray, mimeType, mediaCategory)
          }
        
      })
      
      
    // } else { 
    //   alert("Failed to load file");
    //   this.setState({canSendTweet: false})
    // }
    
  }
  
  //sending a tweet 
  handleTweet = (e) => {
    
    this.props.resetSaveAs(this.props.draft.id)
    
    if (!this.isSendingTweet) {
      
      this.mediaNum = 0
      this.tracker = 0
      this.totalTracker = 0
      this.mediaIDs = []
      
      
      if (this.props.draft.videoUrl != "" || this.props.draft.gifUrl != "" || this.props.draft.imageUrls.length != 0) {
        
        this.isSendingTweet = true
        
        // for (var i = 0; i < this.props.draft.videoUrls.length; i++) {
        //   this.loadFileInUpload(this.props.draft.videoUrls[i])
        //   this.mediaNum++
        // }
        
        if (this.props.draft.videoUrl != "") {
          this.loadFileInUpload(this.props.draft.videoUrl)
          this.mediaNum++
        }
        
        
        if (this.props.draft.gifUrl != "") {
          
          this.loadFileInUpload(this.props.draft.gifUrl)
          this.mediaNum++
        }
        
        for (var j = 0; j < this.props.draft.imageUrls.length; j++) {
          this.loadFileInUpload(this.props.draft.imageUrls[j])
          this.mediaNum++
        }
        
        
        //// // console.log(this.props.videoUrl)
        //this.loadFileInUpload(this.props.videoUrl)
      } else {
        sendTweet(this.props.draft.text, null, 
          /*success*/(tweet) => {
          //this.setState({isSendingTweet: false, progress: 100})
          // // console.log("TWEET SUCCESSFUL")
          // // console.log(tweet)
          this.props.saveAsSent(this.props.draft.id)
          
        }, 
        //error in sending the tweet
          /*error*/(error, response) =>  {
          // // console.log("error in sending tweet")
          // // console.log(error)
          // // console.log(response)
          this.props.saveAsFailed(this.props.draft.id)
          //this.setState({isSendingTweet: false})
        })
      }
    } else {
      this.isSendingTweet = false
    }
    
  }
  
  //changing the status 
  handleStatusChange = (e) => {
    this.props.handleChange(e, this.props.i)
    // // console.log(e.getCurrentContent().getPlainText().length)
    this.setState({textLength: e.getCurrentContent().getPlainText().length})
    
  }
  
  //deleting a draft //////show confirmation
  handleXClick = (e) => {
    //this.video.src = ""
    
    this.props.handleXClick(e)
  }
  
  
  //saving the draft 
  saveDraft = (e) => {
    this.props.handleSave(e)
  }
  
  testDCE = (e) => {
    
    // this.tempStatus = e.target.innerText
    // 
    // // this.statusContentEditDiv.props.style = style
    //    //this.statusContentEditDiv.style.backgroundColor = "#ff0000"
    // this.backgroundColor = "#ff0000"
    // // // console.log(e)
    // this.setState({isSent:true})
    // //this.setState({isSent: true, TESTTEXT: e.target.innerText})
    this.props.handleChange(e, this.props.i)
  
    
  }
  
  //handling change of draft js editor 
  handleDraftJSChange = (editorState) => {
    //getting the text 
    var text = editorState.getCurrentContent().getPlainText()
    
    console.log("SELECTION ")
    console.log(editorState.getSelection().focusOffset)

    this.setState({textLength: text.length})
    
    this.props.handleChange(text, this.props.i)
  }
  
  
  deleteVideo = (e) => {

    this.props.deleteMedia(e.props.i, e.props.url, "video")
  }
  
  deleteImage = (e) => {
    
    if (e.props.url == this.state.croppingImageUrl) {
      this.cropper.destroy()
      this.setState({croppingImageUrl: ""})
    }
    
    
    this.props.deleteMedia(e.props.i, e.props.url,  "image")
  }
  
  deleteGif = (e) => {
    this.props.deleteMedia(e.props.i, e.props.url,  "gif")
  }
  
  onDrop = (accepted, rejected) => {
    // // console.log("ACCEPTED ")
    // // console.log(accepted)
    // // console.log("REJECTED")
    // // console.log(rejected)
    this.setState({showLoadingForUpload: true})
    
    if (accepted.length != 0) {
      this.props.uploadHandle(accepted, this.props.i )
    }
  }
  

  
  
  // //hiding 
  // hideTrimModal = () => {
  //   //setting state for buttons and stuff 
  //   
  //   
  //   //calling props to hide modal 
  //   //this.props.hideModal(this.props.draft.id, this.props.draft.videoUrl)
  //   
  //   
  //   
  // }
  
 /*####  ##       #### ########  ######## ########
##    ## ##        ##  ##     ## ##       ##     ##
##       ##        ##  ##     ## ##       ##     ##
 ######  ##        ##  ##     ## ######   ########
      ## ##        ##  ##     ## ##       ##   ##
##    ## ##        ##  ##     ## ##       ##    ##
 ######  ######## #### ########  ######## ##     */
 
//SLIDER STUFF 

  showSaveButton = (show) => {
    this.setState({isTrimmingShowButton: show})
    if (show) {
      //setting all div class 
      document.getElementById("sliderAndVideoDiv" + this.props.draft.id).className = "videoNotTrimmingDiv active saveButton"
      //setting save button class 
      document.getElementById("saveDraftButton" + this.props.draft.id).className = "animated zoomIn saveDraftButton active"
      //if hiding button
    } else {
      document.getElementById("sliderAndVideoDiv" + this.props.draft.id).className = "videoNotTrimmingDiv active"
      //setting save button class 
      document.getElementById("saveDraftButton" + this.props.draft.id).className = "animated zoomOut saveDraftButton"
      
    }
  }

  //show trim modal
  showTrimView = () => {
    //toggle 
    var toggle = this.state.isTrimming
    
    //if showing trim div 
    if (!toggle) {
      
      document.getElementById("videoToTrim" + this.props.draft.id).className = "videoNotTrimming active"
      document.getElementById("sliderAndVideoDiv" + this.props.draft.id).className = "videoNotTrimmingDiv active"
      
      this.setState({isTrimming: !toggle, isTrimmingShowSlider: !toggle})//, isTrimmingShowButton:!toggle})
      // // console.log("CREATING SLIDER")
         //making the slider "videoAndSlider" + this.props.draft.id
      
        
     //if hiding 
    } else {
      
      document.getElementById("videoToTrim" + this.props.draft.id).className = "videoNotTrimming"
      document.getElementById("sliderAndVideoDiv" + this.props.draft.id).className = "videoNotTrimmingDiv"
      this.setState({isTrimming: !toggle, isSavingTrimmedVideo: false})
      setTimeout(() => {this.setState({isTrimmingShowSlider: !toggle, isTrimmingShowButton: !toggle})}, 1000)
        
      //this.sliderThing.noUiSlider.destroy()
    }
     
  }
  

//CHANGE element id 
  //updaing the video code for the slider
  updateSlider = ( values, handle, unencoded, tap, positions ) => {
    
    // console.log(this.duration)
    // console.log(values[1])
    // console.log(this.savedEndSec)
    // console.log(this.sliderThing.noUiSlider.options)
    
    if (values[0] == 0 && values[1] == this.savedEndSec) {
      this.showSaveButton(false)
    } else {
      this.showSaveButton(true)
    }
    
    if (handle == 0) {
      this.startSec = Math.round( unencoded[0] * 100 ) / 100;
      document.getElementById("videoToTrim" + this.props.draft.id).currentTime = this.startSec
      // // console.log(handle)
      // // console.log(unencoded)
    } else {
      this.endSec = Math.round( unencoded[1] * 100 ) / 100;
    }

  } 
  
  setSlider = (values, handle, unencoded, tap, positions) => {
    if (this.savedEndSec == null) {
      this.savedEndSec = values[1]
    }
  }
  
  loadMetadata = (e) => {
    this.setState({showLoadingForUpload: false})
      this.sliderThing = document.getElementById('slider' + this.props.draft.id)
  
    //getting the this.duration
    this.duration = e.target.duration
    
    //setting start and end time 
    this.startSec = 0 
    this.endSec = this.duration
    
    // console.log("loadMetadata")
    // console.log(this.startSec)
    // console.log(this.endSec)
    
      //creating the slider 
       // console.log(this.sliderThing)
      if (!this.sliderThing.noUiSlider) {
        noUiSlider.create(this.sliderThing, {
          start: [0, this.duration],
          step:0.01,
          connect: true,
          behaviour: "drag",
          tooltips: [wNumb({ decimals: 2, suffix: 's' }),wNumb({ decimals: 2, suffix:'s' })],      
          range: {
            'min': 0,
            'max': this.duration
          }

        })      
        
        //update events when slider changed 
        //this.sliderThing.noUiSlider.on('update', this.setSlider)
        //this.sliderThing.noUiSlider.on('slide', this.updateSlider)
        this.sliderThing.noUiSlider.on('change', this.updateSlider)
      }

    
  } 
  
  videoLoaded = () => {
    
  }

  
//CHANGE set video length 
  componentDidMount = () => {
    //// // console.log(document.getElementById('sliderDiv'))
    if (this.props.draft.videoUrl != "") {
      document.getElementById("videoToTrim" + this.props.draft.id).load()
    }
    
    
    
    
    /*cropper.getCroppedCanvas().toBlob(function (blob) {
  var formData = new FormData();*/
  
  this.cropper = new Cropper(document.getElementById("cropperJsEmpty"), {
    aspectRatio: 16 / 9,
    dragMode: 'move',
    crop: function(e) {
      // console.log(e.detail.x);
      // console.log(e.detail.y);
      // console.log(e.detail.width);
      // console.log(e.detail.height);
      // console.log(e.detail.rotate);
      // console.log(e.detail.scaleX);
      // console.log(e.detail.scaleY);
    }
  });
  
    
  
  }
  
  componentDidUpdate = () => {
    this.makeCropper()
  }
  
  
  saveTrimVideo = () => {
    this.setState({isSavingTrimmedVideo: true})
    //flooring and cieligingingignign 
    this.startSec = Math.round(this.startSec * 1000) / 1000
    this.endSec = Math.round(this.endSec * 1000) / 1000
    
    // console.log(this.startSec)
    // console.log(this.endSec)
    var secDuration = this.endSec - this.startSec
    
    
    
    trimVideo(this.props.draft.videoUrl, this.props.draft.id,  this.duration, this.startSec, this.endSec, 
      //success 
      ( newFileName ) => {
        
          this.props.setTrimmedVideo(newFileName, this.props.i)
          this.showSaveButton(false)
          this.showTrimView()
          this.startSec = 0
          this.endSec = secDuration
          this.sliderThing.noUiSlider.destroy()
          this.setState({isSavingTrimmedVideo: false})
        
        
      
      }, 
      //error
      () => {
        // console.log("ERROR")
          this.setState({isSavingTrimmedVideo: 'red'})
        
    })
  
  
  
  
  
  }
  
 /*####  ########   #######  ########
##    ## ##     ## ##     ## ##     ##
##       ##     ## ##     ## ##     ##
##       ########  ##     ## ########
##       ##   ##   ##     ## ##
##    ## ##    ##  ##     ## ##
 ######  ##     ##  #######  */
  
  makeCropper = () => {
    // console.log("MAKE CROPPER")
    //// console.log("DID MOUNT")
    // console.log(document.getElementById("cropperJsImageImg"))
    if (this.state.croppingImageUrl != "") {
      this.cropper = new Cropper(document.getElementById("cropperJsImageImg"), {
        dragMode: 'move',
        viewMode: 1,
        crop: function(e) {
          // console.log(e.detail.x);
          // console.log(e.detail.y);
          // console.log(e.detail.width);
          // console.log(e.detail.height);
          // console.log(e.detail.rotate);
          // console.log(e.detail.scaleX);
          // console.log(e.detail.scaleY);
        }
      });
    }
  }
  
  startCroppingImage = (e) => {
    // console.log("CLICKED")
    // console.log(e.target.id)
    
    this.setState({croppingImageUrl: e.target.id})

  }
  
  saveCroppedImage = () => {
    
    
    
    
    
    this.cropper.getCroppedCanvas().toBlob( (blob) => {
      // console.log("SAVE")
      var img = new Image()
      img.src = URL.createObjectURL(blob)
      document.getElementById("fuckingfucktitties").src = img.src
      // fs.writeFileSync(os.homedir() + '/Desktop/fucktitties.png', 'base64', image)
      var fr = new FileReader()
      fr.onload = (data) => {
        
        var b64 = btoa(data.target.result)
        
        var oldUrl = this.state.croppingImageUrl
        var oldName = oldUrl.split('.')[0]
        // console.log("OLDNAME IS ")
        // console.log(oldName)
        
        var newUrl = oldName + 'CROPPED.png'
        fs.writeFileSync(newUrl,  b64,'base64')
        this.props.saveCroppedImage(this.state.croppingImageUrl, newUrl,   this.props.i)
        this.setState({croppingImageUrl: ""})
      }
      fr.readAsBinaryString(blob)
    })
  }
  
  cancelCropImage = () => {
    this.setState({croppingImageUrl: ""})
    this.cropper.destroy()
  }
  
//CHANGE element id 
  //checks time and fixes it 
  fixTime = (e) => {
    // console.log("fix time")
    // console.log(this.startSec)
    // console.log(e.target.currentTime)
    // console.log(this.endSec)
    // // console.log(e.target.currentTime)
    if (e.target.currentTime < this.startSec) {
      // console.log("LESS THAN")
      // console.log(Math.round( this.startSec * 10 ) / 10)
      document.getElementById("videoToTrim" + this.props.draft.id).currentTime = Math.round( this.startSec * 10 ) / 10;
    }
    if (e.target.currentTime > this.endSec) {
      document.getElementById("videoToTrim" + this.props.draft.id).currentTime = this.startSec
    }
  }
  
  
  saveDownloadedGif = (url) => {
    this.setState({isAddingGif: false})
    this.props.saveDownloadedGif(url, this.props.i)
  }

  
  
  
/*######  ######## ##    ## ########  ######## ########
##     ## ##       ###   ## ##     ## ##       ##     ##
##     ## ##       ####  ## ##     ## ##       ##     ##
########  ######   ## ## ## ##     ## ######   ########
##   ##   ##       ##  #### ##     ## ##       ##   ##
##    ##  ##       ##   ### ##     ## ##       ##    ##
##     ## ######## ##    ## ########  ######## ##     */
  
  
  
  render() {
   
    
    // var http = require('http');
    // 
    // http.createServer(function (req, res) {
    //     res.writeHead(200, {'Content-Type': 'text/html'});
    //     res.end('Hello World!');
    // }).listen(8080);
    // var canvas = <canvas></canvas>
    // var video = <video src={this.props.draft.videoUrl}></video>
    // canvas.width = video.videoWidth;
    // canvas.height = video.videoHeight;
    // 
    // canvas.drawImage(video, 0, 0, canvas.width, canvas.height);
    // 
    // var img = document.createElement("img");
    // img.src = canvas.toDataURL();
    // //$output.prepend(img);
    //// // console.log("VIDEO IS " + this.props.draft.videoUrl)
    
        
    //background colors 
    const bColor = Color('#03a9f4').alpha(0.3)
    const bColor2 = Color('#03a9f4').alpha(0.1)
    const bColor3 = Color('#03a9f4').alpha(0.01)
    
    //setting the background color on whether or not its sent 
    var backgoundColorOfDraftText = ""
    if (this.props.draft.isSent == true) {
       backgoundColorOfDraftText = {background: "#03cf32", hover: null, selected: null}
    } else if (this.props.draft.isSent == false) {
       backgoundColorOfDraftText = {background: "#fe4c4c", hover: null, selected: null}
    } else {
      backgoundColorOfDraftText = {background: "linear-gradient(90deg, #03cf32 " + this.state.progress + "%, #e6e6e6 0%)"}
    }
  
    //default file uploader 
    //const fileUploader = <
    
     //
     
    //loading gif 
    
     
    var visibility = (this.props.draft.videoUrl == "" && this.props.draft.gifUrl == ""  && this.props.draft.imageUrls.length != 4) ? "visible" : "hidden"
    
      
    
    //to delete a draft
    const xButton = <div><ButtonMake handleButtonClick={this.handleXClick}  i={this.props.draft.id} value="X" buttonStyle={this.props.styles.XButtonStyleLeft} isSelected={false} /></div>
    
    //tweet label 
    const tweetLabel = <label style={{float: "left"}}>Tweet Text</label>
    
    //char counter color 
    const charCounterColor = this.state.textLength < 110 ? "#3ac91d" : (this.state.textLength <130 ? "#f0e448" : (this.state.textLength < 140 ? "#fe4c4c" : "#ab0505"))
    
    //char counter 
    const charCounter = <label style={{float: "right",backgroundColor: charCounterColor, margin:"0px 10% 0px 0px", padding:"5px", borderRadius:"5px"}}>{140 - this.state.textLength}</label>

    //div content editable status box 
    
  
    //the text of tweet to send but draft js 
    const statusDraftJSText = 
    <span 
      style={{margin:"0px 0% 0px 5%", display:"inline-block",width:"90%", float:"left"}}>
      {tweetLabel}{charCounter}
      <DraftJSEmojisMake 
        placeholder={"Enter Tweet..."} 
        text={this.props.draft.text} 
        id={this.props.i} 
        handleTextChange={this.handleDraftJSChange} 
        styles={this.props.styles} 
        editorStyle={this.props.styles.TextAreaFormStyleBlue} 
      />
    </span>
    
    
      const addGifButton = <div style={{display:"inline-block", margin:"36px 0px 0px 0px", width:"5%"}}><ButtonMake handleButtonClick={() => {
        var toggle = this.state.isAddingGif;
        this.setState({isAddingGif: !toggle})
      }} value="Gif" buttonStyle={this.props.styles.AddGifButton} isSelected={false} /></div>
    
    const statusDraftJS = <div id="totaldraftid">{statusDraftJSText}{addGifButton}</div>
      
/*     ## #### ########  ########  #######
##     ##  ##  ##     ## ##       ##     ##
##     ##  ##  ##     ## ##       ##     ##
##     ##  ##  ##     ## ######   ##     ##
 ##   ##   ##  ##     ## ##       ##     ##
  ## ##    ##  ##     ## ##       ##     ##
   ###    #### ########  ########  ######*/
   
    
    var videoPreview = null
    if (this.props.draft.videoUrl != "") {
      
      // // console.log("is trimming ")
      // // console.log(this.state.isTrimming)
      //get div style if trimming or not
        
      
      //x button 
      const videoXButton = <ButtonMake 
        i={this.props.i} 
        url={this.props.draft.videoUrl} 
        handleButtonClick={this.deleteVideo} 
        value="X" 
        buttonStyle={this.props.styles.XButtonStyleMedia} 
        isSelected={false} />
        
      //button to save trim video  //SaveButtonStyleGreenRunning
      var save_style = this.state.isSavingTrimmedVideo ? this.props.styles.SaveButtonStyleGreenRunning : this.props.styles.SaveButtonStyleGreen
      const SaveTrimButton = /*this.state.isTrimmingShowButton ?*/ <ButtonMake handleButtonClick={this.saveTrimVideo} value="Save" buttonStyle={save_style} isSelected={false} />// : null
      
      //adding the video preview 
      videoPreview = /*<div 
        style={{display:"inline-block", borderRadius:"5px"}} 
        key={this.props.draft.videoUrl}>{videoXButton} */ 
        //style={{height: "175px", margin: "10px 5% 10px 5%", transition: 'all 1s'}}
        <div id={"sliderAndVideoDiv" + this.props.draft.id} className="videoNotTrimmingDiv">
          <div>{/* of video */}
            <video 
              src={this.props.draft.videoUrl} 
              //style={{margin:" 0 auto"}}  
              id={"videoToTrim" + this.props.draft.id}
              className="videoNotTrimming" 
              controls 
              poster={this.props.draft.videoPosterUrl}
              preload="metadata"
              onLoadedMetadata={this.loadMetadata} 
              onTimeUpdate={this.fixTime}>
            </video>
            {videoXButton}
          </div>
         <div //of slider 
           className={"slider animated " + (this.state.isTrimming ? "zoomIn" : "zoomOut")}>
           <div //of slider
            // style={{margin:"5% 10% 5% 10%", position:"absolute", bottom:"0px"}} 
             id={'slider' + this.props.draft.id}>
            </div>
         </div>
         <div 
           className={"saveDraftButton"} 
           style={{height:"60px", width:"100%", position:"absolute", bottom:"0px", textAlign:"center", verticalAlign:"baseline"}} 
           id={"saveDraftButton" + this.props.draft.id}/*of button */>
            {SaveTrimButton}
         </div>
        {/* <div id={'slider' + this.props.draft.id} className={"animated " + (this.state.isTrimming ? "zoomIn" : "zoomOut")} style={{height:"auto", margin:"2% 10% 5% 10%", visibility: (this.state.isTrimmingShowSlider ? "visible" : "hidden")}} height={"auto"}></div> */}
      </div>
      
    }
    
    
    
    //if theres no video preview 
    const videoDiv = (videoPreview == null) ? 
      null
      :
      //if theres a video preview, see if it's trimming or not 
      <div style={{width:"100%", textAlign:"center"}}>{videoPreview}</div>  
      
    
/*## ##     ##  ######         ###    ##    ## ########      ######   #### ########
 ##  ###   ### ##    ##       ## ##   ###   ## ##     ##    ##    ##   ##  ##
 ##  #### #### ##            ##   ##  ####  ## ##     ##    ##         ##  ##
 ##  ## ### ## ##   ####    ##     ## ## ## ## ##     ##    ##   ####  ##  ######
 ##  ##     ## ##    ##     ######### ##  #### ##     ##    ##    ##   ##  ##
 ##  ##     ## ##    ##     ##     ## ##   ### ##     ##    ##    ##   ##  ##
#### ##     ##  ######      ##     ## ##    ## ########      ######   #### */

    var cropImageDiv = null 
    
    if (this.state.croppingImageUrl != "") {
      // console.log("CREATING CROP IMAGE")
      var cropImage = <img 
        id="cropperJsImageImg"
        onload={this.makeCropper} 
        src={this.state.croppingImageUrl} 
        style={{maxWidth:'100%', visibility: "hidden"}}
      />
      
      cropImage.onload = {function() {this.makeCropper}}
        
      
      var cropImageDivWithoutButton = <div>
        <div 
          style={{maxWidth: "80%", maxHeight:"500px", margin:"0px 0px 0px 10%"}}>
          {cropImage}
        </div>
      </div>
      
      
      
      //buttons to set aspect ratio
      const setARtwoOne = <ButtonMake handleButtonClick={() => {
        this.cropper.setAspectRatio(1)
        this.cropper.setCropBoxData({left: this.cropper.getCanvasData().left, width: this.cropper.getCanvasData().width})}
      } 
      value="Square" 
      buttonStyle={this.props.styles.SaveButtonStyle} isSelected={false} />
      
      const setFreeMove = <span style={{margin:"0px 20px 0px 20px"}}>
        <ButtonMake 
          handleButtonClick={() => {
            this.cropper.setAspectRatio(0); 
            this.cropper.setCropBoxData({left: this.cropper.getCanvasData().left, width: this.cropper.getCanvasData().width})}
          } 
          value="Free move" 
          buttonStyle={this.props.styles.SaveButtonStyle} isSelected={false} /></span>
      
      const setRect = <ButtonMake handleButtonClick={() => {
        this.cropper.setAspectRatio(2)
        this.cropper.setCropBoxData({left: this.cropper.getCanvasData().left, width: this.cropper.getCanvasData().width})}
      } value="Rect" buttonStyle={this.props.styles.SaveButtonStyle} isSelected={false} />
      
      
      //buttons to set preset 
      const presetButtonsdiv = <div>{setARtwoOne}{setFreeMove}{setRect}</div>
      
      //button to save 
      const saveCropImage = 
      <ButtonMake
        handleButtonClick={this.saveCroppedImage} 
        value="Save Cropped Image" 
        buttonStyle={Object.assign({}, this.props.styles.SaveButtonStyle, {margin:"30px 10px 30px 10px", backgroundColor: "#3ac91d"})} 
        isSelected={false} />
      
      //button to cancel 
      const cancelCropImage = <ButtonMake handleButtonClick={this.cancelCropImage} value="Cancel" buttonStyle={Object.assign({}, this.props.styles.SaveButtonStyle, {margin:"30px 10px 30px 10px", backgroundColor: "#f76767"})} isSelected={false} />
      
      //buttons to save and cancel 
      const buttons = <div>{cancelCropImage}{saveCropImage}</div>
      
      cropImageDiv = <div style={{width:"100%", textAlign:"center"}}>{cropImageDivWithoutButton}{presetButtonsdiv}{buttons}</div>
    }

    
//gif browse 
    const giphyBrowse = this.state.isAddingGif ?
    <div>
      <GifMakeDefault downloadedGif={this.saveDownloadedGif} />
    </div>
    : null
      
    
//the image previews
    var imagePreviews = []

    //adding to image previews
    for (var i = 0; i < this.props.draft.imageUrls.length; i++) {
      
      //x button 
      const imageXButton = <ButtonMake key={i} i={this.props.i} url={this.props.draft.imageUrls[i]} handleButtonClick={this.deleteImage} value="X" buttonStyle={this.props.styles.XButtonStyleMediaImage} isSelected={false} />
      
      var tempImage = 
        <span  
          key={this.props.draft.imageUrls[i]}>{imageXButton}
          <img 
            style={{height:"100%", verticalAlign:"50%", margin:"0px 10px 0px 10px"}} 
            id={this.props.draft.imageUrls[i]} 
            src={this.props.draft.imageUrls[i]} 
            onClick={this.startCroppingImage} />
          
        </span>
      imagePreviews.push(tempImage)
    }
    const imageDiv = imagePreviews.length != 0 ? 
      <div style={{height:"175px", display:"inline-block", margin:"10px 0px 10px 0px"}}>{imagePreviews}</div>
      :
      null  
      
      
    
      
    
//the gif preview 
    var gifPreview = null
    if (this.props.draft.gifUrl != "") {
      //x button 
      const imageXButton = <ButtonMake key={i} i={this.props.i} url={this.props.draft.gifUrl} handleButtonClick={this.deleteGif} value="X" buttonStyle={this.props.styles.XButtonStyleMediaImage} isSelected={false} />
      
      var tempImage = 
      <span  
        key={this.props.draft.gifUrl}>{imageXButton}
        <img 
          style={{height:"100%", verticalAlign:"50%", margin:"0px 10px 0px 10px"}} 
          src={this.props.draft.gifUrl}>
        </img>
      </span>
      gifPreview = tempImage
    }
    const gifDiv = gifPreview != null ? 
      <div style={{height:"175px", display:"inline-block", margin:"10px 0px 10px 0px"}}>{gifPreview}</div>
      :
      null
    
    
    
    //the images and videos div 
    //the label
    const mediaLabel = <div><label style={{margin:"0px 0px 0px 5%"}}>Media</label></div>
  //the div
    const mediaDiv = (videoPreview != null || gifPreview != null || imagePreviews.length != 0) ?
      <div id="mediadiv"  >{mediaLabel}<div style={{overflow:"auto", whiteSpace: "nowrap"}}>{gifDiv}{imageDiv}</div></div>
      :
      null
      
    //
                  
    //the style of the whole div, alternating between left and right 
    var styleVal={backgroundColor:bColor, borderRadius:"10px", width:"92%", margin:"2% 2% 2% 2%", display:"inline-block", border: "0.01px solid #657786", overflow:"hidden", verticalAlign: "top"}  
  
        
        
    //to send the tweet 
    //const tweetButton =  <span style={{width:"40%", margin:"5% 3% 2% 6%", display:"inline-block"}}><ButtonMake className={"tweetButtonInSendingDrafts"}  i={this.props.i} id={this.props.draft.id}  handleButtonClick={this.handleTweet} value="Send Tweet" isSelected={false} /></span>
    
    var tweetButtonClassName = ""
      if (this.props.draft.isSent == true) {
         tweetButtonClassName = "tweetButtonInSendingDrafts sent"
      } else if (this.props.draft.isSent == false) {
         tweetButtonClassName = "tweetButtonInSendingDrafts failed"
      } else {
        tweetButtonClassName = "tweetButtonInSendingDrafts"
      }
    
    const tweetButton =  <span style={{width:"40%", margin:"2.5% 3% 2% 6%", display:"inline-block"}}><button className={tweetButtonClassName} id={this.props.draft.id + 'button'}  onClick={this.handleTweet} >{"Send Tweet"}</button></span>
    
    

  
          
      //if theres a video show the trim button
      const topLeftButton = this.props.draft.videoUrl != "" ? 
      <div style={{width:"40%", margin:"2.5% 3% 2% 3%", display:"inline-block"}}><ButtonMake i={this.props.i} handleButtonClick={this.showTrimView} value="Trim Video" buttonStyle={this.props.styles.SaveButtonInDivStyleDraft} isSelected={false} /></div>
      : 
      ((this.props.draft.videoUrl == "" && this.props.draft.gifUrl == ""  && this.props.draft.imageUrls.length != 4) ? 
      <span style={{width:"40%", margin:"2.5% 3% 2% 3%", display:"inline-block", visibility: "visible"}} 
      className="dropzone"><Dropzone  
      style={ this.props.styles.DragAndDrop} 
      onDrop={this.onDrop}>Drag & Drop... Or click</Dropzone>
      </span> 
      :
      <span style={{width:"40%", margin:"2.5% 3% 2% 3%", display:"inline-block", visibility: "hidden"}} 
      className="dropzone"><Dropzone  
      style={ this.props.styles.DragAndDrop} 
      onDrop={this.onDrop}>Drag & Drop... Or click</Dropzone>
      </span>   
      )
        
        
//SLIDER STUFF 
//the modal so it won't be blurred 
//display for trim video popup 
var display = (this.state.isTrimming ? "block" : "none")
var bColor4 = '#86d5f9'
var animateClass = this.state.isTrimmingAnimation ?   " animatedCustom foldOutRight" : " animatedCustom foldInLeft"
// // console.log("CLASS IS " +animateClass)
  //video that is being trimmed 
  this.videoU = <video 
    id="trimVideo" 
    onLoadedMetadata={this.showModalAfterVideoLoads} 
    onTimeUpdate={this.fixTime}
    style={{maxWidth: "80%", minWidth: "80%"}}//{{height:"500px", width:"auto"}} 
    src={this.state.trimVideoUrl} 
    controls preload="metadata" 
    autoPlay= {false} 
    poster={'/Users/jameslaroux/Desktop/Screen Shot 2017-06-06 at 2.27.58 PM.png'}
    currentTime={this.startSec} /> 
    

        
       
 //hiding on click
 window.onmousedown = (event) => {
   // // console.log(event)
   if (event.target == document.getElementById("trimmodal" + this.state.id)) {
     // // console.log("WINDOW CLicked")
     this.hideModal() 
   }
 }

 
  
    
    return(
      <div style={styleVal}>
      {xButton}{topLeftButton}{tweetButton}
      <div>{statusDraftJS}</div>
      <div>{mediaDiv}{videoDiv}</div>
      <div>{cropImageDiv}</div>
      {/* {this.trimModal} */}
      {/* <div>
        <GifMakeDefault />
      </div> */}
      <div>{giphyBrowse}</div>
      </div>
      
    )
  }
  
  
}
