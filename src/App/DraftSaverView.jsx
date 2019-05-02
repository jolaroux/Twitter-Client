process.env.NODE_ENV = 'production';
//need to import the react stuff
import React from 'react';
import ReactDOM from 'react-dom';
//importing styles
import { Styles } from '../HTML and CSS/styles.jsx'
// for saving data
import { Store } from '../Functions/Store.js'
//importing components
import { ButtonMake, TabBarMake, InputBoxMake, InputAreaMake, TableMake, SelectRowWithTextBoxAndPlus, SelectBox, IndivInputMake, DraftJSEmojisMake } from '../Components/components.jsx'
import { IndivDraftMake } from './IndivDraft.jsx'
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
const { dialog } = require('electron').remote
import Junk from 'junk'
var mime = require('mime-types')
import poster from 'poster-image'
let videoStitch = require('video-stitch');


//importing js files 
//twitter functions functions 
import { screenNames, checkRateLimits, getRetweeters, getFollowers, startGetFollowersNames, sortUsernames } from '../Functions/script.js'
//component functions 
import { getFromStore, registerTwitter, registerStore, showLoadDialog, showSaveDialog, saveInStore, exportData, loadData, checkAllTextInputFields } from '../Functions/functions.js'


/*####  ##          ###     ######   ######  ########  ######
##    ## ##         ## ##   ##    ## ##    ## ##       ##    ##
##       ##        ##   ##  ##       ##       ##       ##
##       ##       ##     ##  ######   ######  ######    ######
##       ##       #########       ##       ## ##             ##
##    ## ##       ##     ## ##    ## ##    ## ##       ##    ##
######  ######## ##     ##  ######   ######  ########  ####*/
function draftObject(textA, idB) {
  this.text = textA;
  this.videoUrl = "";
  this.videoPosterUrl = "";
  this.imageUrls = [];
  this.gifUrl = "";
  this.id = idB;
  this.isSent = null
}




/*######  ########     ###    ######## ########     ######     ###    ##     ## ######## ########
##     ## ##     ##   ## ##   ##          ##       ##    ##   ## ##   ##     ## ##       ##     ##
##     ## ##     ##  ##   ##  ##          ##       ##        ##   ##  ##     ## ##       ##     ##
##     ## ########  ##     ## ######      ##        ######  ##     ## ##     ## ######   ########
##     ## ##   ##   ######### ##          ##             ## #########  ##   ##  ##       ##   ##
##     ## ##    ##  ##     ## ##          ##       ##    ## ##     ##   ## ##   ##       ##    ##
########  ##     ## ##     ## ##          ##        ######  ##     ##    ###    ######## ##     */


export class DraftSaverView extends React.Component {
  constructor(props) {
    super(props)
    registerStore()
    registerTwitter()



    //initializing the folders if they don't exist already
    this.dir = os.homedir() + '/Desktop/Bot/Drafts/'

    //if the drafts directory doesnt exist, make it 
    if (!fs.existsSync(this.dir)) {
      fs.mkdirSync(this.dir);
    }

    //if the videos folder doesnt exist 
    if (!fs.existsSync(os.homedir() + '/Desktop/Bot/Videos/')) {
      fs.mkdirSync(os.homedir() + '/Desktop/Bot/Videos/')
    }

    //if the images folder doesnt exist 
    if (!fs.existsSync(os.homedir() + '/Desktop/Bot/Images/')) {
      fs.mkdirSync(os.homedir() + '/Desktop/Bot/Images/')
    }

    //if the poster images folder doesnt exist 
    if (!fs.existsSync(os.homedir() + '/Desktop/Bot/Posters/')) {
      fs.mkdirSync(os.homedir() + '/Desktop/Bot/Posters/')
    }

    //if the gif folder doesnt exist 
    if (!fs.existsSync(os.homedir() + '/Desktop/Bot/Gifs/')) {
      fs.mkdirSync(os.homedir() + '/Desktop/Bot/Gifs/')
    }

    //account folder 
    this.dir = os.homedir() + '/Desktop/Bot/Drafts/' + window.store.get("Account Name")

    //if the account directory doesnt exist, make it 
    if (!fs.existsSync(this.dir)) {
      fs.mkdirSync(this.dir);
    }
    // // // console.log(this.dir)
    //read all the data from the folder 
    //read in all the categories 
    var categories = fs.readdirSync(this.dir)

    //sort the categories
    categories = categories.filter(Junk.not)


    var areThereCategories = undefined
    var categoriesArr = undefined
    var selectedCategory = undefined
    var drafts = []

    //setting is categories and categories equal to either or the categoreis
    if (categories.length == 0) {
      areThereCategories = false
      categoriesArr = []
      selectedCategory = undefined
      drafts = []

    } else {
      areThereCategories = true
      categoriesArr = categories
      selectedCategory = categoriesArr[0]

      //all the files in the directory 
      var list = fs.readdirSync(this.dir + '/' + selectedCategory)

      //getting all the actual files 
      list = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));

      //getting all the data from each file 
      for (var i = 0; i < list.length; i++) {

        //what each file will be stored in
        var data = fs.readFileSync(this.dir + '/' + selectedCategory + '/' + list[i])

        // //parsing the json from the file 
        // var jsonParsed = JSON.parse(data)
        // var tempStatus = jsonParsed.text 
        // var tempUrl = jsonParsed.videoUrl
        // 
        // var tempDraft = new draftObject(jsonParsed.text, jsonParsed.videoUrls, jsonParsed.imageUrls, jsonParsed.gifUrls, jsonParsed.id)

        //drafts.push(tempDraft)
        drafts.push(JSON.parse(data))


      }

    }

    //set state to commented stuff in render 
    this.state = { areThereCategories: areThereCategories, categories: categoriesArr, selectedCategory: selectedCategory, drafts: drafts }



  }





  //handling the select category change 
  handleSelectCategoryChange = (e) => {

    //setting the selected category to be the selected category
    this.setState({ selectedCategory: e.target.value })
    this.reReadDrafts(e.target.value)


  }

  //creating new select category change 
  checkCreateCategoryChange = (e) => {

    //making the directory
    fs.mkdirSync(this.dir + '/' + e);

    //read in all the categories 
    var categories = fs.readdirSync(this.dir)

    //sort the categories
    categories = categories.filter(Junk.not)
    //// // console.log("NEW categories")
    //// // console.log(categories)

    //setting selected state 
    this.setState({ categories: categories, selectedCategory: e, areThereCategories: true, drafts: [] })


  }

  reReadDrafts = (selectedCategoryArgument) => {

    // // // console.log("rereading drafts from " + selectedCategoryArgument)
    // // // console.log(this.dir + '/' +  selectedCategoryArgument)
    // 

    var readDrafts = []

    //if theres categories, read the files 
    if (this.state.areThereCategories == true) {
      //parse data and upload to state 

      //all the files in the directory 
      var list = fs.readdirSync(this.dir + '/' + selectedCategoryArgument)


      //getting all the actual files 
      list = list.filter(Junk.not);


      //getting all the data from each file 
      for (var i = 0; i < list.length; i++) {
        //// // console.log("AFTER")
        //what each file will be stored in
        var data = fs.readFileSync(this.dir + '/' + selectedCategoryArgument + '/' + list[i])

        //parsing the json from the file 
        var jsonParsed = JSON.parse(data)
        var tempStatus = jsonParsed.text
        var tempUrl = jsonParsed.videoUrl


        readDrafts.push(JSON.parse(data))

      }

      this.setState({ drafts: readDrafts })

    }
  }




  render() {

    //drafts for each category 
    const draftSaverForCat = <DraftSaverForCategory
      isTrimming={this.state.id}
      showModal={this.showModal}
      hideModal={this.hideModal}
      styles={this.props.styles}
      categoriesArr={this.state.categories}
      selectedCategory={this.state.selectedCategory}
      areThereCategories={this.state.areThereCategories}
      dir={this.dir + '/' + this.state.selectedCategory}
      handleSelectCategoryChange={this.handleSelectCategoryChange}
      checkCreateCategoryChange={this.checkCreateCategoryChange}
      drafts={this.state.drafts}
      reReadDrafts={this.reReadDrafts} />









    return (
      <div>
        <div className="MainDraftContainer" id="MainDraftContainer">{draftSaverForCat}</div>

        {/* <div id={"slider"}></div> */}
      </div>
    )


  }


}


import wNumb from 'wNumb'
let shelljs = require('shelljs');

/*######  ########     ###    ######## ########     ######     ###    ########
##     ## ##     ##   ## ##   ##          ##       ##    ##   ## ##      ##
##     ## ##     ##  ##   ##  ##          ##       ##        ##   ##     ##
##     ## ########  ##     ## ######      ##       ##       ##     ##    ##
##     ## ##   ##   ######### ##          ##       ##       #########    ##
##     ## ##    ##  ##     ## ##          ##       ##    ## ##     ##    ##  ///
########  ##     ## ##     ## ##          ##        ######  ##     ##    */  ///

//the draft saver group for each category 
export class DraftSaverForCategory extends React.Component {
  constructor(props) {
    super(props)
    registerStore()
    registerTwitter()

    this.createdCategory = ""

    this.state = { isAddingCategory: false, textToSearch: "" }


  }



  /*######
  ##
  ##
  ######
  ##
  ##
  */



  //GOOD
  //adding a new draft
  plusButtonClicked = (e) => {

    var seconds = new Date() / 1000;
    var ran = seconds * 1000
    //// // console.log(seconds * 1000)

    //making the empty draft 
    var newDraft = new draftObject("", ran)

    //saving the draft
    fs.writeFileSync(this.props.dir + '/' + newDraft.id + '.json', JSON.stringify(newDraft))
    //reloading 
    this.props.reReadDrafts(this.props.selectedCategory)
  }

  //good
  //deleting a draft
  XButtonClicked = (e) => {

    //removing the file 
    fs.unlinkSync(this.props.dir + '/' + e.props.i + '.json')

    //rereading 
    this.props.reReadDrafts(this.props.selectedCategory)

  }


  //good! Saves all
  //handling text of status  change 
  handleStatusChange = (e, i) => {
    //// // console.log(e.target.innerText)
    // // // console.log(e.length)
    //getting and changing the old draft 
    var oldDrafts = this.props.drafts

    if (e != oldDrafts[i].text) {
      oldDrafts[i].text = e
      oldDrafts[i].isSent = null
      // // // console.log(oldDrafts[i].text)
      // // // console.log(JSON.stringify(oldDrafts[i].text))
      ////this.setState(oldDrafts)

      this.saveAll(oldDrafts)
      //rereading 
      //this.props.reReadDrafts(this.props.selectedCategory)

    }




  }

  //good
  //handling the select category change 
  handleSelectCategoryChange = (e) => {

    //setting the selected category to be the selected category
    //this.setState({selectedCategory: e.target.value})

    //sending back 
    this.props.handleSelectCategoryChange(e)
    //this.props.reReadDrafts()
  }


  //good
  //when plus is clicked
  selectCategoryPlus = (e) => {

    this.setState({ isAddingCategory: true })


  }

  //GOOD
  selectCategoryCheck = () => {
    //if the text input isnt null and there is a value
    if (document.getElementById("inputformAdd Category") != null && document.getElementById("inputformAdd Category").value != "") {

      //manually entering category 
      //if either there is no categories or you're adding a category
      if (this.state.isAddingCategory || !this.props.areThereCategories) {

        //if its not included already 
        if (this.props.categoriesArr.indexOf(document.getElementById("inputformAdd Category").value) == -1) {
          //call parent create directory
          this.props.checkCreateCategoryChange(this.createdCategory)
        }
      }
    }
    this.setState({ isAddingCategory: false })

  }

  //good
  handleCreateCategoryChange = (e) => {
    this.createdCategory = e.target.value
  }


  //saveall 
  saveAll = (saveDrafts) => {

    //saving all drafts 
    for (var i = 0; i < saveDrafts.length; i++) {
      //DATA goes SECOND
      fs.writeFileSync(path.join(this.props.dir, saveDrafts[i].id.toString()) + '.json', JSON.stringify(saveDrafts[i]))
    }

  }

  //showing uploadHandle to pick video to upload 
  showFileLoader = (e, id) => {

    // console.log(e)
    // console.log(id)

    var url = e[0].path
    // console.log("URL IS ")
    // console.log(url)


    try {

      //getting filename 
      var fileNameWithExtension = url.split('/').pop()
      var extension = fileNameWithExtension.split('.')[0]
      // // console.log("SSDFDSLKFJDLSJKF")
      // // console.log(fileNameWithExtension)
      var filename = url.split('/').pop().split('.')[0]
      var tempDirectory = os.homedir() + '/Desktop/Bot/Videos/tempConvert.mp4'

      process.env['PATH'] = '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'

      var type = mime.lookup(url)


      //if its a video 
      if (type.split("/")[0] == "video") {
        // console.log("VIDEO")
        //copy over as mp4
        try {

          //new path 
          var newPath = os.homedir() + '/Desktop/Bot/Videos/' + filename + '.mp4'


          // if (extension == 'mp4') {
          //   //using fs copy sync 

          // //copying to videos 
          // fs.copySync(url, newPath)
          // var oldDrafts = this.props.drafts 
          // //appending to video urls array 
          // oldDrafts[id].videoUrl = newPath



          //ffmpeg -i example.mov -f mp4 -vcodec libx264 -preset fast -profile:v main -acodec aac example.mp4 -hide_banner

          var command = 'ffmpeg -i \"' + url + '\" -codec copy \"' + newPath /*tempDirectory*/ + '\" -y'
          // console.log("first command is ")
          // console.log(command)
          let child = shelljs.exec(command, { async: true, silent: false })

          child.on('exit', (code, signal) => {
            if (code === 0) {
              // console.log("finished converting to " + newPath)
              // console.log("CODE === 0 in command 2")
              var oldDrafts = this.props.drafts
              //appending to video urls array 
              oldDrafts[id].videoUrl = newPath
              //saving the drafts 
              // this.setState(oldDrafts)
              // this.saveAll(oldDrafts)

              var test = poster(e[0]).then((blob) => {
                var img = new Image()
                img.src = URL.createObjectURL(blob)
                document.getElementById("fuckingfucktitties").src = img.src
                // fs.writeFileSync(os.homedir() + '/Desktop/fucktitties.png', 'base64', image)
                var fr = new FileReader()
                var bufferData = null
                fr.onload = (data) => {

                  var b64 = btoa(data.target.result)
                  fs.writeFileSync(os.homedir() + '/Desktop/Bot/Posters/' + filename + '.png', b64, 'base64')

                  //saving the video psoter 

                  oldDrafts[id].videoPosterUrl = os.homedir() + '/Desktop/Bot/Posters/' + filename + '.png'

                  //saving the drafts 
                  this.setState(oldDrafts)
                  this.saveAll(oldDrafts)
                }
                fr.readAsBinaryString(blob)

              })




            } else {
              alert("error in uploading")
              // console.log("code != 0 in first command ")
              // console.log("code is ")
              // console.log(code)
              // console.log("signal is ")
              // console.log(signal)
            }
          })






        } catch (err) {
          console.error(err)
        }
      } else if (type.split("/")[1] == "gif") {
        // console.log("GIF")
        //handle as image
        //new path 
        var newPath = os.homedir() + '/Desktop/Bot/Gifs/' + fileNameWithExtension
        //copying to images
        fs.copySync(url, newPath)

        //getting and changing the old draft 
        var oldDrafts = this.props.drafts
        //appending to video urls array 
        oldDrafts[id].gifUrl = newPath
        //saving the drafts 
        this.setState(oldDrafts)
        this.saveAll(oldDrafts)

        //if its an image
      } else if (type.split("/")[0] == "image") {
        //handle as image
        //new path 
        var newPath = os.homedir() + '/Desktop/Bot/Images/' + fileNameWithExtension
        //copying to images
        fs.copySync(url, newPath)

        //getting and changing the old draft 
        var oldDrafts = this.props.drafts
        //appending to video urls array 
        oldDrafts[id].imageUrls.push(newPath)
        //saving the drafts 
        this.setState(oldDrafts)
        this.saveAll(oldDrafts)

      } else {
        alert("Wrong file type")
      }


    } catch (err) {
      // if (err.code != 'Uncaught TypeError') {
      //   // // console.log(err.code)
      // }
    }


  }

  //removing media from a tweet 
  deleteMedia = (i, url, type) => {
    // // console.log(i)
    // // console.log(url)
    // // console.log(type)

    //if its a video 
    if (type == "video") {
      //getting and changing the old draft 
      var oldDrafts = this.props.drafts
      //appending to video urls array 
      oldDrafts[i].videoUrl = ""

      //saving the drafts 
      this.setState(oldDrafts)
      this.saveAll(oldDrafts)
    } else if (type == "image") {
      //getting and changing the old draft 
      var oldDrafts = this.props.drafts
      //appending to video urls array 
      oldDrafts[i].imageUrls.splice(oldDrafts[i].imageUrls.indexOf(url), 1)

      //saving the drafts 
      this.setState(oldDrafts)
      this.saveAll(oldDrafts)
    } else if (type == "gif") {
      //getting and changing the old draft 
      var oldDrafts = this.props.drafts
      //appending to video urls array 
      oldDrafts[i].gifUrl = ""

      //saving the drafts 
      this.setState(oldDrafts)
      this.saveAll(oldDrafts)
    }
  }

  //saving a tweet as sent
  saveAsSent = (id) => {
    // // console.log("SAVE AS SENT ")
    // // console.log(id)
    // // console.log(this.props.dir)
    // // console.log(path.join(this.props.dir, id.toString() + '.json'))
    var tweetData = fs.readFileSync(path.join(this.props.dir, id.toString() + '.json'))
    var tweetData = JSON.parse(tweetData)

    tweetData.isSent = true

    fs.writeFileSync(path.join(this.props.dir, id.toString() + '.json'), JSON.stringify(tweetData))

    //rereading 
    this.props.reReadDrafts(this.props.selectedCategory)
  }

  //saving a tweet as failed
  saveAsFailed = (id) => {
    // // console.log("SAVE AS FAILED ")
    // // console.log(id)
    // // console.log(this.props.dir)
    // // console.log(path.join(this.props.dir, id.toString() + '.json'))
    var tweetData = fs.readFileSync(path.join(this.props.dir, id.toString() + '.json'))
    var tweetData = JSON.parse(tweetData)

    tweetData.isSent = false

    fs.writeFileSync(path.join(this.props.dir, id.toString() + '.json'), JSON.stringify(tweetData))

    //rereading 
    this.props.reReadDrafts(this.props.selectedCategory)
  }

  //reset save as  
  resetSaveAs = (id) => {
    // // console.log("RESET SAVE AS  ")
    // // console.log(id)
    // // console.log(this.props.dir)
    // // console.log(path.join(this.props.dir, id.toString() + '.json'))
    var tweetData = fs.readFileSync(path.join(this.props.dir, id.toString() + '.json'))
    var tweetData = JSON.parse(tweetData)

    tweetData.isSent = null

    fs.writeFileSync(path.join(this.props.dir, id.toString() + '.json'), JSON.stringify(tweetData))

    //rereading 
    this.props.reReadDrafts(this.props.selectedCategory)
  }


  //setting trimmed video 
  setTrimmedVideo = (url, i) => {

    //setTimeout(() => {
    var oldDrafts = this.props.drafts
    //appending to video urls array 
    oldDrafts[i].videoUrl = url
    this.saveAll(oldDrafts)
    this.props.reReadDrafts(this.props.selectedCategory)

    //realoding video? 
    //document.getElementById("videoToTrim" + oldDrafts[i].id).load()
    //}, 3000)
  }

  saveCroppedImage = (oldUrl, newUrl, i) => {

    //get old drafts and change the url to the old one
    var oldDrafts = this.props.drafts
    var oldVidUrls = oldDrafts[i].imageUrls

    //change 
    oldDrafts[i].imageUrls[oldDrafts[i].imageUrls.indexOf(oldUrl)] = newUrl

    this.saveAll(oldDrafts)
    this.props.reReadDrafts(this.props.selectedCategory)
  }

  saveDownloadedGif = (newUrl, i) => {

    //get old drafts and change the url to the old one
    var oldDrafts = this.props.drafts
    oldDrafts[i].gifUrl = newUrl




    this.saveAll(oldDrafts)
    this.props.reReadDrafts(this.props.selectedCategory)
  }


  //searching drafts 
  handleSearch = (e) => {
    this.setState({ textToSearch: e.target.value })
  }



  /*######  ######## ##    ## ########  ######## ########
  ##     ## ##       ###   ## ##     ## ##       ##     ##
  ##     ## ##       ####  ## ##     ## ##       ##     ##
  ########  ######   ## ## ## ##     ## ######   ########
  ##   ##   ##       ##  #### ##     ## ##       ##   ##
  ##    ##  ##       ##   ### ##     ## ##       ##    ##
  ##     ## ######## ##    ## ########  ######## ##     */



  render() {


    //getting the drafts to sort them 
    var draftsToSort = this.props.drafts

    //sorting them 
    draftsToSort.sort(function (a, b) {
      return b.id - a.id
    })


    //the drafts array, to push and return 
    const draftsArrNotSearched = []

    //testing for plusbutton 
    var amountThatHaveTextOrVideo = 0

    //adding to draft array AND seeing whether plusbutton should be should be shown or not 
    for (var i = 0; i < draftsToSort.length; i++) {
      // console.log("TExt is ")
      // console.log(draftsToSort[i].text.length)
      // console.log(this.state.textToSearch.length)

      // //if theres no search criteria let them all through 
      // if (this.state.textToSearch == "") {
      // // console.log(draftsToSort[i].text)
      //whether plus should be shown 
      if (draftsToSort[i].text != "" || draftsToSort[i].videoUrl != "" || draftsToSort[i].imageUrls.length != 0) {
        amountThatHaveTextOrVideo++
      }


      //adding to drafts to show 
      draftsArrNotSearched.push(<IndivDraftMake
        saveDownloadedGif={this.saveDownloadedGif}
        saveCroppedImage={this.saveCroppedImage}
        setTrimmedVideo={this.setTrimmedVideo}
        resetSaveAs={this.resetSaveAs}
        saveAsSent={this.saveAsSent}
        saveAsFailed={this.saveAsFailed}
        deleteMedia={this.deleteMedia}
        i={i}
        draft={draftsToSort[i]}
        id={'draft' + i}
        key={'draft' + draftsToSort[i].id + draftsToSort[i].text}
        styles={this.props.styles}
        handleXClick={this.XButtonClicked}
        uploadHandle={this.showFileLoader}
        handleChange={this.handleStatusChange}
        handleSave={this.saveDraft} />)

      // } else {
      //   //if there is search criteria
      //   //testing for search crieria. -1 means not in  
      //   if (draftsToSort[i].text.search(this.state.textToSearch) != -1) {
      //   //whether plus should be shown 
      //   if (draftsToSort[i].text != "" || draftsToSort[i].videoUrl != "" || draftsToSort[i].imageUrls.length != 0) {
      //     amountThatHaveTextOrVideo++
      //   }
      //   
      //   
      //   //adding to drafts to show 
      //   draftsArr.push(<IndivDraftMake 
      //     saveCroppedImage={this.saveCroppedImage}
      //     setTrimmedVideo={this.setTrimmedVideo}
      //     resetSaveAs={this.resetSaveAs} 
      //     saveAsSent={this.saveAsSent} 
      //     saveAsFailed={this.saveAsFailed} 
      //     deleteMedia={this.deleteMedia} 
      //     i={i} 
      //     draft={draftsToSort[i]} 
      //     id={'draft'+i} 
      //     key={'draft'+ draftsToSort[i].id + draftsToSort[i].text} 
      //     styles={this.props.styles} 
      //     handleXClick={this.XButtonClicked} 
      //     uploadHandle={this.showFileLoader} 
      //     handleChange={this.handleStatusChange} 
      //     handleSave={this.saveDraft} />) 
      //}
      //}

    }

    var draftsArr = []

    //searching 
    for (var i = 0; i < draftsArrNotSearched.length; i++) {
      if (draftsToSort[i].text.search(this.state.textToSearch) != -1) {
        draftsArr.push(draftsArrNotSearched[i])
      }
    }

    // // console.log("AMOUNT THAT HAVE TEXT OR VIDEO ")
    // // console.log(amountThatHaveTextOrVideo)
    //whether plus should be shown or not 
    var shouldShowPlus = true//((draftsToSort.length - amountThatHaveTextOrVideo) > 0 ? false : true)

    //plus button 
    const plusButton = (this.props.areThereCategories && shouldShowPlus) ? <ButtonMake handleButtonClick={this.plusButtonClicked}
      value="+"
      buttonStyle={this.props.styles.PlusButtonStyleDraft}
      isSelected={false} />
      :
      null

    //select or input

    const selected = this.props.areThereCategories ? this.props.selectedCategory : null

    const catSelect = this.state.isAddingCategory || !this.props.areThereCategories ?
      <IndivInputMake
        name="Add Category"
        onChange={this.handleCreateCategoryChange}
        style={this.props.styles.TextInputFormStyleDraft}
        placeholder="Enter New Category" />
      : <SelectBox
        optionStyle={this.props.styles.CategorySelectOption}
        selectValue={selected}
        options={this.props.categoriesArr}
        selectStyle={this.props.styles.CategorySelect}
        idNum={"1"}
        handleChange={this.handleSelectCategoryChange} />

    //button that adds category or confirms category 
    const catSelectPlus = this.state.isAddingCategory || !this.props.areThereCategories ?
      <ButtonMake
        handleButtonClick={this.selectCategoryCheck}
        value="✓"
        buttonStyle={this.props.styles.AddCategoryButtonStyle}
        isSelected={false} />
      :
      <ButtonMake
        handleButtonClick={this.selectCategoryPlus}
        value="+"
        buttonStyle={this.props.styles.AddCategoryStyle}
        isSelected={false} />


    //the search bar 
    const searchBar = <IndivInputMake name="" onChange={this.handleSearch} style={this.props.styles.TextInputFormStyleSearch} value={this.state.textToSearch} placeholder="Search..." />

    //button to clear 
    const searchBarClear = <ButtonMake handleButtonClick={() => { this.setState({ textToSearch: "" }) }} value="X" buttonStyle={this.props.styles.ClearSearchBarStyle} isSelected={false} />

    const search = <span style={{ marginLeft: "2%" }}>{searchBar}{searchBarClear}</span>


    //the div of either all of the drafts, or nothing 
    var divOfDrafts = <div id="testblur" style={{ backgroundColor: "#dff8ff", border: "0.01px solid #b0b7be", overflow: "hidden", borderRadius: "10px", margin: "46px 0px 0px 0px", padding: "10px 0px 10px 0px", minHeight: "10px" }}>
      <div style={{ verticalAlign: "middle" }}>{search}<span style={{ margin: "0px 0px 0px 40%" }}>{catSelect}<span style={{ margin: "0px 0px 0px 1%" }}>{catSelectPlus}</span></span>{plusButton}</div>
      <div >{draftsArr}</div>
    </div>


    return (
      <div>
        {divOfDrafts}
      </div>
    )

  }

}




