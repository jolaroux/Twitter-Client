//need to import the react stuff
import React from 'react';
import ReactDOM from 'react-dom';
//importing styles
import { Styles } from '../HTML and CSS/styles.jsx'
// for saving data
import { Store } from '../Functions/Store.js'
//importing components
import { ButtonMake, TabBarMake, InputBoxMake, InputAreaMake, TableMake, SelectRowWithTextBoxAndPlus, IndivDraftMake, SelectBox, IndivInputMake } from '../Components/components.jsx'
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


//importing js files 
//twitter functions functions 
import { screenNames, checkRateLimits, getRetweeters, getFollowers, startGetFollowersNames, sortUsernames } from '../Functions/script.js'
//component functions 
import { getFromStore, registerTwitter, registerStore, showLoadDialog, showSaveDialog, saveInStore, exportData, loadData, checkAllTextInputFields } from '../Functions/functions.js'






/*######  #######  ##       ##        #######  ##      ## ######## ########   ######
##       ##     ## ##       ##       ##     ## ##  ##  ## ##       ##     ## ##    ##
##       ##     ## ##       ##       ##     ## ##  ##  ## ##       ##     ## ##
######   ##     ## ##       ##       ##     ## ##  ##  ## ######   ########   ######
##       ##     ## ##       ##       ##     ## ##  ##  ## ##       ##   ##         ##
##       ##     ## ##       ##       ##     ## ##  ##  ## ##       ##    ##  ##    ##
##        #######  ######## ########  #######   ###  ###  ######## ##     ##  ####*/

export class FollowersView extends React.Component {
  constructor(props) {
    super(props)

    registerStore()
    registerTwitter()


    this.state = { screenNameValue: false, getAllFollowersID: false, getAllFollowersData: false, sortFollowers: false, loadData: false, loadFollowers: false, loadSavedData: false, exportFollowers: false, exportData: false, exportIDs: false, isExporting: false, numOfRows: 1, sortCriteria: [], sortCriteriaValues: [], showResetButton: false, amountToGet: "all" }

    this.options = ["Follower Count", "Friend Count", "Verified?", "Tweet Count (w/ retweets)", "Default Profile?", "Default Profile Picture?", "Protected User?", "Location"]
    window.isGettingFollowerNames = false
    //this.loadedFileType = ""

    //this.loadFile = this.loadFile.bind(this)
  }

  handleScreenNameChange = (e) => {
    e.target.value == "" ?
      (
        this.setState({ screenNameValue: false, getAllFollowersID: false, sortFollowers: false, loadFollowers: false, exportFollowers: false }),
        this.setState({ exportData: false, exportFollowers: false, exportIDs: false })

      )
      :
      this.setState({ screenNameValue: true, showResetButton: true, userScreenName: e.target.value })

    this.userScreenName = e.target.value

  }

  //changing how many to get
  handleAmountToGetChange = (e) => {

    if (isNaN(e.target.value)) {
      alert("Not a number")
    } else {

      if (e.target.value == "") {
        this.setState({ amountToGet: "all" })
      } else {
        this.setState({ amountToGet: Number(e.target.value) })
      }


    }


  }


  handleSelectChange = (e) => {

    var val = e.target.value
    val = val.toString()
    // this.setState((previous, e) => {
    //   sortCriteria: previous.sortCriteria.e.target.id = e.target.value
    // })
    // //this.state.sortCriteria[e.target.id] = e.target.value

    var arr = this.state.sortCriteria;
    var lastChar = e.target.id.substr(e.target.id.length - 1);

    arr[lastChar] = val
    // console.log("ARR")
    // console.log(val)
    // console.log(arr)
    //const newObj = update(arr, {$push: {val}});


    this.setState({ sortCriteria: arr })
    //console.log(newObj)
    this.categories = arr

    // console.log("CATEGORIES ARE ")
    // console.log(categories)
  }

  //the value to sort by 
  handleInputChange = (e) => {

    //getting the value 
    var val = e.target.value
    //processing the data 
    var arr = this.state.sortCriteriaValues;
    var lastChar = e.target.id.substr(e.target.id.length - 1);
    arr[lastChar] = val

    //setting the state 
    this.setState({ sortCriteriaValues: arr })
    //values[lastChar] = val

    // console.log("VALUES ARE ")
    // console.log(values)
  }


  /*######
  ##
  ##
  ######
  ##
  ##
  */


  //getting all the IDs of followers 
  getAllFollowersID = () => {

    this.setState({ getAllFollowersID: true })

    getFollowers(this.userScreenName,
      //callback success 
      (followers) => {

        var newFollowers = followers
        if (this.state.amountToGet != "all") {
          newFollowers = followers.slice(0, this.state.amountToGet)
        }


        alert(newFollowers.length + " followers found")
        this.followersIDs = newFollowers
        this.setState({ exportIDs: true })

      })

  }

  //getting all the data from the followers IDS
  getAllFollowersData = () => {
    // console.log("GET DATA")
    // console.log(window.isGettingFollowerNames)
    // console.log(this.state.loadFollowers)
    this.RAWUSERDATA = []
    this.namesThatPassed = []
    this.setState({ "sortCriteria": [], "sortCriteriaValues": [], "sortFollowers": false })

    //if its not going already
    if (window.isGettingFollowerNames == false) {
      window.isGettingFollowerNames = true
      //if its loaded follwers to get names of
      if (this.state.loadFollowers) {
        //console.log(followers)
        startGetFollowersNames(this.followers, (namesThatPassed, RAWUSERDATA) => {
          console.log("DONE")
          console.log(namesThatPassed.length)
          console.log(RAWUSERDATA.length)

          //storing data in local variable 
          this.namesThatPassed = namesThatPassed
          this.RAWUSERDATA = RAWUSERDATA

          //alert(window.namesThatPassed.length + ' screen names found')
          this.followers = []
          this.setState({ exportData: true, exportFollowers: true, getAllFollowersData: true })
          window.isGettingFollowerNames = false
        })

      }

    }

  }

  sortFunction = () => {
    var toggle = this.state.sortFollowers

    this.setState({ sortFollowers: !toggle })
  }

  /*
  ##
  ##
  ##
  ##
  ##
  ######*/

  //loading the IDs
  loadIDFunction = (e) => {
    showLoadDialog(os.homedir() + '/Desktop/Bot/ExportedIDs', 'Load User IDs', ['.json'], (data) => {
      this.setState({ loadSavedData: false, loadFollowers: true })
      //this.loadedFileType = 'txt'
      //test 
      console.log(data)
      data = JSON.parse(data)

      //setting the this.isGettingFollower to be the screenname from the file 
      //this.isGettingFollower = data["userScreenName"]

      //setting the followers 
      this.followers = JSON.parse(data["IDs"])
      console.log("\n\n\nLOADED FOLLOWERS ARE ")
      console.log(this.followers)

      this.setState({ showResetButton: true, userScreenName: data["userScreenName"] })

    })
  }

  //loading the RAWUSERDATA
  loadDataFunction = (e) => {
    console.log("TESTETSTTEST")
    showLoadDialog(os.homedir() + '/Desktop/Bot/RAWUSERDATA', 'Load RAWUSERDATA', ['.json'], (data) => {
      //console.log(data)
      this.setState({ loadSavedData: true, loadFollowers: false })

      //parsing the data 
      data = JSON.parse(data)

      //storing the userscreenname 
      this.userScreenName = data.userScreenName
      console.log("USER SCREEN NAME IS ")
      console.log(this.isGettingFollower)

      //storing the data
      var newData = data.RAWUSERDATA
      console.log(newData.length)
      this.savedData = []

      for (var i = 0; i < newData.length; i++) {
        this.savedData.push(JSON.parse(newData[i]))
      }

      //console.log(typeof window.savedData[0]["id"])
      //var newData = JSON.parse(data)
      //console.log(newData.length)

      // var newData = '['+data+']'
      // window.savedData = JSON.parse(newData)
      // console.log(savedData.length)
      // 
      this.setState({ showResetButton: true })
    })

  }



  /*######
  ##
  ##
  ######
  ##
  ##
  ######*/



  exportFunction = (e) => {

    //export followers names
    if (e.props.value == "Export screen-names") {

      //export to /ExportedNames with this.isGettingFollower, followers length, and filename in .txt
      showSaveDialog(os.homedir() + '/Desktop/Bot/ExportedNames/', this.userScreenName + '-' + this.namesThatPassed.length + '-FollowersNames.txt', 'Save Followers Names', ['.txt'], (fileName) => {
        exportData(this.namesThatPassed, fileName)
      })

      this.setState({ isExporting: true })

      setTimeout(() => {
        this.setState({ isExporting: false })
      }, 5000)

    }

    //exporting followers IDs
    if (e.props.value == "Export IDs") {

      //exporting to /ExportedIDs, with this.isGettingFollower, followers.length, and filename in .JSON 
      showSaveDialog(os.homedir() + '/Desktop/Bot/ExportedIDs/', this.userScreenName + '-' + this.followersIDs.length + '-FollowersIDs.json', 'Save Followers IDs', ['.txt'], (fileName) => {

        //object that holds the screen name and the followers
        var obj = { userScreenName: this.userScreenName, IDs: JSON.stringify(this.followersIDs) }
        exportData(JSON.stringify(obj), fileName)
        this.followersIDs = []
      })


      this.setState({ isExporting: true })

      setTimeout(() => {
        this.setState({ isExporting: false })
      }, 5000)


    }
    //exporting RAWUSERDATA
    if (e.props.value == "Export RAWUSERDATA") {

      //exporting to /RAWUSERDATA, with this.isGettingFollower, followers length, and filename in .json
      showSaveDialog(os.homedir() + '/Desktop/Bot/RAWUSERDATA/', this.userScreenName + '-' + this.namesThatPassed.length + '-' + '-RAWUSERDATA.json', 'Save Followers RAWDATA', ['.json'], (fileName) => {
        var obj = { userScreenName: this.userScreenName, RAWUSERDATA: this.RAWUSERDATA }

        exportData(JSON.stringify(obj), fileName)
      })

      this.setState({ isExporting: true })

      setTimeout(() => {
        this.setState({ isExporting: false })
      }, 2000)

      //exportData(RAWUSERDATA, " "+this.isGettingFollower+"RAWUSERDATA.json")

    }

    // console.log(e)
    // this.setState({exportFollowers: true})
    // 
    // setTimeout(() => {
    //   this.setState({exportFollowers: false});
    // }, 2000)
    // 
    // exportData(followers, " "+this.isGettingFollower+"followerIDS.txt")

    //this.state = { screenNameValue: false, getAllFollowersID:false, getAllFollowersData:false, sortFollowers: false, loadData:false, loadFollowers:false, loadSavedData:false, exportFollowers: false, exportData: false, exportIDs:false, isExporting:false, numOfRows: 1, sortCriteria: [], sortCriteriaValues: [] }


  }


  /*
  ##
##########
  ##
  */



  plusButtonClicked = () => {
    //add new select row
    if (this.state.numOfRows < this.options.length) {
      var n = this.state.numOfRows
      n++
      this.setState({ numOfRows: n })

    }

  }

  /*     ##
   ##   ##
    ## ##
     ###
    ## ##
   ##   ##
  ##     */


  XButtonClicked = (e) => {
    //console.log(e)
    // console.log(e)
    console.log(e.props.row)

    var newSort = this.state.sortCriteria
    var newSortValues = this.state.sortCriteriaValues
    var num = this.state.numOfRows
    num--

    newSort.splice(e.props.row, 1)
    newSortValues.splice(e.props.row, 1)

    num == 0 && num++

    this.setState({ sortCriteria: newSort, sortCriteriaValues: newSortValues, numOfRows: num })


  }

  /*####  ##     ## ########  ######  ##    ##
 ##    ## ##     ## ##       ##    ## ##   ##
 ##       ##     ## ##       ##       ##  ##
 ##       ######### ######   ##       #####
 ##       ##     ## ##       ##       ##  ##
 ##    ## ##     ## ##       ##    ## ##   ##
  ######  ##     ## ########  ######  ##    */

  checkButtonClicked = () => {
    //start sorting
    //console.log("CHECK CLICKED")
    // console.log(categories)
    // console.log(values)
    var categories = this.state.sortCriteria
    var values = this.state.sortCriteriaValues

    //format categories and values 
    if (categories.length != values.length) {
      categories.pop()


    }

    const yesOrNoOptions = ["Verified?", "Default Profile?", "Default Profile Picture?", "Protected User?"]
    //FORMAT 
    for (var j = 0; j < values.length; j++) {


      if (typeof values[j] != 'object' && typeof values[j] != 'boolean') {



        if (values[j] == 'yes' || values[j] == 'no') {
          if (values[j] == 'yes') {
            values[j] = true
          } else {
            values[j] = false
          }
          //if its not a yes or no option
        } else if (categories[j] != "Location") {


          // console.log("PROBLEM IS ")
          // console.log(values[j])
          //if (typeof values[j] == 'string') {
          //console.log(typeof values[j])
          //console.log(values[j])
          //console.log(values[j].split(','))
          if (values[j].split(',') == values[j]) {
            //console.log("SPasdfasdfasdfE")
            var a = 0
            var b = Number(values[j])
            values[j] = [a, b]
          } else {
            //console.log("SPLITE ELSE")
            values[j] = values[j].split(',')
          }
          //}

        }
      }



    }

    // console.log("NEW CATEGORIES")
    // console.log(categories)
    // console.log("NEW VALUES")
    // console.log(values)

    //SORT 
    console.log("SORTINGLJSLDKFJSLKDJF")
    sortUsernames(this.savedData, categories, values, (namesThatPassed) => {

      this.setState({ exportFollowers: true })
      alert(namesThatPassed.length + " followers found")
      console.log(namesThatPassed.length)
      this.namesThatPassed = namesThatPassed
      //alert(window.namesThatPassed.length+" names found")
    })


  }

  resetButtonCLicked = () => {
    this.setState({ screenNameValue: false, getAllFollowersID: false, getAllFollowersData: false, sortFollowers: false, loadData: false, loadFollowers: false, loadSavedData: false, exportFollowers: false, exportData: false, exportIDs: false, isExporting: false, numOfRows: 1, sortCriteria: [], sortCriteriaValues: [], showResetButton: false })

    window.followers = []
    window.namesThatPassed = []
    window.RAWUSERDATA = []
  }



  render() {

    //this.state = { screenNameValue: false, getAllFollowersID:false, getAllFollowersData:false, sortFollowers: false, loadData:false, loadFollowers:false, loadSavedData:false, exportFollowers: false, exportData: false, numOfRows: 1, sortCriteria: [], sortCriteriaValues: []}


    const screenNameInput = <InputBoxMake name="Screen Name of User to get followers of (sorted by recent first)" parentHandleChange={this.handleScreenNameChange} style={this.props.styles.TextInputFormStyle} placeholder="@" />

    const amountToGetInput = this.state.screenNameValue ? <InputBoxMake name="How many followers to get" parentHandleChange={this.handleAmountToGetChange} style={this.props.styles.TextInputFormStyle} placeholder="Default is 75k, or all possible" /> : null

    const getAllIDButton = this.state.screenNameValue ? <div style={{ margin: "0px 1.19% 0px 1.19%", width: "14.28%", display: "inline-block", verticalAlign: "top" }}><ButtonMake handleButtonClick={this.getAllFollowersID} value={"Get ALL followers (IDs) *faster*"} buttonStyle={this.props.styles.SaveButtonInDivStyle} isSelected={this.state.getAllFollowersID} /></div> : null

    const getAllNamesButton = this.state.loadFollowers ? <div style={{ margin: "0px 1.19% 0px 1.19%", width: "14.28%", display: "inline-block", verticalAlign: "top" }}><ButtonMake handleButtonClick={this.getAllFollowersData} value="Get Data of Followers" buttonStyle={this.props.styles.SaveButtonInDivStyle} isSelected={this.state.getAllFollowersData} /></div> : null

    const sortButton = this.state.loadSavedData ? <div style={{ margin: "0px 1.19% 0px 1.19%", width: "14.28%", display: "inline-block", verticalAlign: "top" }}><ButtonMake handleButtonClick={this.sortFunction} value="Sort/Get" buttonStyle={this.props.styles.SaveButtonInDivStyle} isSelected={this.state.sortFollowers} /></div> : null

    const loadIDButton = !this.state.screenNameValue && !this.state.loadSavedData ? <div style={{ margin: "0px 1.19% 0px 1.19%", width: "14.28%", display: "inline-block", verticalAlign: "top" }}>{<ButtonMake handleButtonClick={this.loadIDFunction} value="Load followers IDs" buttonStyle={this.props.styles.SaveButtonInDivStyle} isSelected={this.state.loadFollowers} />}</div> : null

    const loadDataButton = !this.state.screenNameValue && !this.state.loadFollowers ? <div style={{ margin: "0px 1.19% 0px 1.19%", width: "14.28%", display: "inline-block", verticalAlign: "top" }}>{<ButtonMake handleButtonClick={this.loadDataFunction} value="Load Saved Data" buttonStyle={this.props.styles.SaveButtonInDivStyle} isSelected={this.state.loadSavedData} />}</div> : null


    var eName = ""




    //export buttons
    const exportIDButton = (this.state.exportIDs) ? <div style={{ margin: "0px 1.19% 0px 1.19%", width: "14.28%", display: "inline-block" }}><ButtonMake handleButtonClick={this.exportFunction} value={"Export IDs"} buttonStyle={this.props.styles.SaveButtonInDivStyle} isSelected={this.state.isExporting} /></div> : null

    const exportDataButton = (this.state.exportData) ? <div style={{ margin: "0px 1.19% 0px 1.19%", width: "14.28%", display: "inline-block" }}><ButtonMake handleButtonClick={this.exportFunction} value={"Export RAWUSERDATA"} buttonStyle={this.props.styles.SaveButtonInDivStyle} isSelected={this.state.isExporting} /></div> : null

    const exportFollowersButton = (this.state.exportFollowers) ? <div style={{ margin: "0px 1.19% 0px 1.19%", width: "14.28%", display: "inline-block" }}><ButtonMake handleButtonClick={this.exportFunction} value={"Export screen-names"} buttonStyle={this.props.styles.SaveButtonInDivStyle} isSelected={this.state.isExporting} /></div> : null


    const resetButton = this.state.showResetButton ? <ButtonMake handleButtonClick={this.resetButtonCLicked} value="Reset" buttonStyle={this.props.styles.ResetButtonStyle} isSelected={false} /> : null


    //getting an array to iterate through
    var numArr = []
    for (var i = 0; i < this.state.numOfRows; i++) {

      numArr.push(i)
    }
    //removing all options already in play
    var options = this.options

    const yesOrNoOptions = ["Verified?", "Default Profile?", "Default Profile Picture?", "Protected User?"]

    const selectRows = this.state.sortFollowers ? (numArr.map((n) =>
      <SelectRowWithTextBoxAndPlus style={{ clear: "right" }} idNum={n} key={"SelectRow" + n.toString()} plusButtonClicked={this.plusButtonClicked} XButtonClicked={this.XButtonClicked} numOfRows={this.state.numOfRows} options={options} alreadySelected={this.state.sortCriteria} alreadyEntered={this.state.sortCriteriaValues} checkButtonClicked={this.checkButtonClicked} handleSelectChange={this.handleSelectChange} handleInputChange={this.handleInputChange} textPlaceholder={yesOrNoOptions.includes(this.state.sortCriteria[n]) ? "'yes' or 'no'" : "ex: '1000' (0-->1000)   OR   '10, 5000' (10-->5000)"} styles={this.props.styles} />)) : null

    //const checkButton = 


    //const fileInput = this.state.loadData ? <div onChange={this.loadFile} style={{margin: "0 auto"}}><input type="file" id="fileInput"/></div> : null {fileInput}

    const bColor = Color('#03a9f4').alpha(0.3)

    return (
      <div>
        <div id="dataDiv" style={{ backgroundColor: bColor, borderRadius: "5px", overflow: "hidden" }}>
          <div style={{ padding: "10px" }}>
            {screenNameInput}
            {amountToGetInput}
            {loadIDButton}{loadDataButton}{getAllIDButton}{getAllNamesButton}{sortButton}{exportIDButton}{exportDataButton}{exportFollowersButton}{resetButton}
            {selectRows}
          </div>
        </div>
      </div>
    )
  }
}

