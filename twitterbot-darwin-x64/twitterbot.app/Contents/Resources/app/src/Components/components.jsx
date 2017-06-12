 /*####   #######  ##     ## ########   #######  ##    ## ######## ##    ## ########  ######
##    ## ##     ## ###   ### ##     ## ##     ## ###   ## ##       ###   ##    ##    ##    ##
##       ##     ## #### #### ##     ## ##     ## ####  ## ##       ####  ##    ##    ##
##       ##     ## ## ### ## ########  ##     ## ## ## ## ######   ## ## ##    ##     ######
##       ##     ## ##     ## ##        ##     ## ##  #### ##       ##  ####    ##          ##
##    ## ##     ## ##     ## ##        ##     ## ##   ### ##       ##   ###    ##    ##    ##
 ######   #######  ##     ## ##         #######  ##    ## ######## ##    ##    ##     ####*/
 
 require("../Functions/functions.js")
 import {trimVideo} from '../Functions/functions.js'
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
var download = require('download-file')

// import React, { Component } from 'react';
import GiphySelect from 'react-giphy-select';
//import '../HTML and CSS/giphySelect.css';
// import createCounterPlugin from 'draft-js-counter-plugin/lib';
// 
// const counterPlugin = createCounterPlugin();
// 


/*######  ##     ## ######## ########  #######  ##    ##
##     ## ##     ##    ##       ##    ##     ## ###   ##
##     ## ##     ##    ##       ##    ##     ## ####  ##
########  ##     ##    ##       ##    ##     ## ## ## ##
##     ## ##     ##    ##       ##    ##     ## ##  ####
##     ## ##     ##    ##       ##    ##     ## ##   ###
########   #######     ##       ##     #######  ##    */


//is sent ButtonStyle, hover, selected, isSelected, handleButtonClick
export class ButtonMake extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {hover: false, isSelected: this.props.isSelected}
    this.handleIndivButtonClick = this.handleIndivButtonClick.bind(this);
  }
  //for changing background color
  changeColorHover = (e) => {
    if (this.props.buttonStyle.hover != null) {
      this.setState({hover: true})
      
    }
  }
  changeColorLeave = (e) => {
    this.setState({hover: false})
  }
  handleIndivButtonClick(e) {
    
    this.props.handleButtonClick(this);
    
    
  }
  
  
  
  
  render() {
    const newStyle = cloneDeep(this.props.buttonStyle)
    
    
    //if there's a selected color, run the tests to see if it's selected, hovered or not, if hover exists
    this.props.buttonStyle.selected != null && (newStyle.backgroundColor = (this.props.isSelected ? ( this.props.buttonStyle.selected) : (this.state.hover ? (this.props.buttonStyle.hover) : (this.props.buttonStyle.backgroundColor) )))
    
    //if theres disabled sent 
    var isDisabled = false
    if (this.props.disabled != undefined) {
      isDisabled = this.props.disabled
    }
    
    //for class name 
    var thisclassName = ""
    if (this.props.className != undefined) {
      thisclassName = this.props.className
    }
  
  
    return <button disabled={isDisabled} className={thisclassName} id={this.props.id + 'button'} onMouseEnter={this.changeColorHover}  onMouseLeave={this.changeColorLeave} onClick={this.handleIndivButtonClick} style={newStyle} >{this.props.value}</button>
  }
}




/*######    ###    ########  ########     ###    ########
   ##      ## ##   ##     ## ##     ##   ## ##   ##     ##
   ##     ##   ##  ##     ## ##     ##  ##   ##  ##     ##
   ##    ##     ## ########  ########  ##     ## ########
   ##    ######### ##     ## ##     ## ######### ##   ##
   ##    ##     ## ##     ## ##     ## ##     ## ##    ##
   ##    ##     ## ########  ########  ##     ## ##     */
//the tab bar that goes at the top
//send it array of options, and handleTabClick() for on click
export class TabBarMake extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
    
  }
  handleClick = (button) => {
    this.props.handleTabClick(button)
  }
  
  render() {
    
    //setting the buttons
    const options = this.props.options; 
    const listOptions = options.map((option) => 
      <ButtonMake key={option} isSelected={(option==this.props.selectedTab ? true : false)} id={option} value={option} handleButtonClick={this.handleClick.bind(this, option)} buttonStyle={this.props.buttonStyle}></ButtonMake>
    )
    //rendering the buttons
    return <div>{listOptions}</div>;
  }  
}



/*## ##    ## ########  ##     ## ######## ########   #######  ##     ##
 ##  ###   ## ##     ## ##     ##    ##    ##     ## ##     ##  ##   ##
 ##  ####  ## ##     ## ##     ##    ##    ##     ## ##     ##   ## ##
 ##  ## ## ## ########  ##     ##    ##    ########  ##     ##    ###
 ##  ##  #### ##        ##     ##    ##    ##     ## ##     ##   ## ##
 ##  ##   ### ##        ##     ##    ##    ##     ## ##     ##  ##   ##
#### ##    ## ##         #######     ##    ########   #######  ##     */

export class IndivInputMake extends React.Component {
  constructor(props) {
    super(props)
    
  }
  
  handleChange = (e) => {
    this.props.onChange(e)
  }
  
  render() {
    return (
      <input type="text" value={this.props.value} placeholder={this.props.placeholder} name={this.props.name} id={'inputform'+this.props.name} onChange={this.handleChange} style={this.props.style} />
    )
  }
}

//is sent name, parentHandleChange, style, placeholder
export class InputBoxMake extends React.Component {
  constructor(props) {
    super(props)
  }
  
  handleChange = (e) => {
    this.props.parentHandleChange(e)
  }
  
  render () {
    return (
      <div>
        {this.props.name != null && <label>{this.props.name}</label>}
        <IndivInputMake placeholder={this.props.placeholder} name={this.props.name} id={'inputform'+this.props.name} onChange={this.handleChange} style={this.props.style} />
      </div>
      );
    
  }
  
  
}


/*## ##    ## ########  ##     ## ########    ###    ########  ########    ###
 ##  ###   ## ##     ## ##     ##    ##      ## ##   ##     ## ##         ## ##
 ##  ####  ## ##     ## ##     ##    ##     ##   ##  ##     ## ##        ##   ##
 ##  ## ## ## ########  ##     ##    ##    ##     ## ########  ######   ##     ##
 ##  ##  #### ##        ##     ##    ##    ######### ##   ##   ##       #########
 ##  ##   ### ##        ##     ##    ##    ##     ## ##    ##  ##       ##     ##
#### ##    ## ##         #######     ##    ##     ## ##     ## ######## ##     */

export class InputAreaMake extends React.Component {
  constructor(props) {
    super(props)
  }
  
  handleChange = (e) => {
    this.props.parentHandleChange(e)
  }
  
  render () {
    return (
      <div>
        <label>{this.props.name}</label>
        <textarea type="text" placeholder={this.props.placeholder} name={this.props.name} id={'inputform'+this.props.name} onChange={this.handleChange} style={this.props.style} />
      </div>
      );
    
  }
  
  
}

export class DraftInputAreaMake extends React.Component {
  constructor(props) {
    super(props)
  }
  
  handleChange = (e) => {
    this.props.parentHandleChange(e)
  }
  
  render () {
    return (
      <div>
        <label>{this.props.name}</label>
        <textarea type="text" maxLength={140} placeholder={this.props.placeholder} name={this.props.name} id={'inputform'+this.props.name} value={this.props.value} onChange={this.handleChange} style={this.props.style} />
      </div>
      );
    
  }
  
  
}


/*######    ###    ########  ##       ########
   ##      ## ##   ##     ## ##       ##
   ##     ##   ##  ##     ## ##       ##
   ##    ##     ## ########  ##       ######
   ##    ######### ##     ## ##       ##
   ##    ##     ## ##     ## ##       ##
   ##    ##     ## ########  ######## ######*/
   
   
export class TableMake extends React.Component {
  constructor(props) {
    super(props)
    
  }
  
  render() {
    
    //es6 version of const data = this.props.data apparently
    const {data} = this.props
    
    const {columnNames} = this.props
    
    
    const keys = Object.keys(data[0])
    
    
    
    const columnHeaders = columnNames.map((name) => 
      <th key={"header" + name}>
        {name}
      </th>
    )
    
    
    //keys are
    //row= "row" + "{first item of row}"
    //item= "item" + "{first item of row} + {"current key"}"
    const rows = data.map((row) => 
      <tr style={this.props.tableStyle.TableRowStyle} id = {"row"+row[keys[0]]} key={"row"+row[keys[0]]}>
        {keys.map((keyOfKeys) => <td style={this.props.tableStyle.TableItemStyle} id = {"item"+row[keys[0]]+keyOfKeys} key={"item"+row[keys[0]]+keyOfKeys}>{row[keyOfKeys]}</td>)}
      </tr>
    )
    


    
    
    return (<table style={this.props.tableStyle.TableStyle}>
              <thead>
                <tr>
                {columnHeaders}
                </tr>
              </thead>
              <tbody className="tableBody">
                {rows}
              </tbody>
            </table>)
  
    
    //return (<span>{rows}</span>)
    
    
  }
}


 /*####  ######## ##       ########  ######  ########
##    ## ##       ##       ##       ##    ##    ##
##       ##       ##       ##       ##          ##
 ######  ######   ##       ######   ##          ##
      ## ##       ##       ##       ##          ##
##    ## ##       ##       ##       ##    ##    ##
 ######  ######## ######## ########  ######     */
 
export class SelectBox extends React.Component {
  constructor(props) {
    super(props)
  }
  
  handleChange = (e) => {
    //// console.log(e.target)
    this.props.handleChange(e)
  }
  
  render () {
    //making all the options for select
    const options = this.props.options.map((option) => 

      <option style={this.props.optionStyle} key={option} value={option}>{option}</option>
     
    )
    //adding the disabled default option
    const disabled = <option key={"default"} id="default" value="default" disabled>Select your option</option>
    //adding it in the array
    options.splice(0, 0, disabled)
    
    const select = <select  id={'selectBox' + this.props.idNum.toString()} value={this.props.selectValue} onChange={this.handleChange} style={this.props.selectStyle}>{options}</select>
  
  
    return(
      select
    )
  }
  
  
}
 
 
export class SelectRowWithTextBoxAndPlus extends React.Component {
 constructor(props) {
   super(props)
   this.state = {selectValueNotDefault: false, selectValue: "default"}
 }
 
 handleSelectChange = (e) => {
   
   
   this.props.handleSelectChange(e)
   
  //  this.setState({selectValueNotDefault: true, selectValue: e.target.value})
   

 }
 
 handleInputChange = (e) => {
   
   this.props.handleInputChange(e)
   
  //  e.target.value != "" ?
  //  this.setState({inputValue: true})
  //  :
  //  this.setState({inputValue: false})
   
 }
 
 handleXClick = (e) => {
   
   this.props.XButtonClicked(e)
 }

 
 render() {
   
  //  // console.log("OPTIONS IS ")
  //  // console.log(this.props.options)
  //  // console.log("idNum IS ")
  //  // console.log(this.props.idNum)
   var tempOptions = cloneDeep(this.props.options)
   var selectOptions = cloneDeep(this.props.options)
   //changing what options to not show 
   for (var i = 0; i < (this.props.idNum); i++) {
     
     
     var index = selectOptions.indexOf(this.props.alreadySelected[i])
     
     selectOptions.splice(index, 1)
     
     //selectOptions = tempOptions.splice(selectOptions.indexOf( this.props.alreadySelected[i]), 1)
   }
   
   
   //making the select box
   const select = <div style={{display: "inline-block", width: "40%"}} ><SelectBox idNum={this.props.idNum} selectValue={(this.props.idNum == this.props.alreadySelected.length) ? "default" :  this.props.alreadySelected[this.props.idNum]} selectStyle={this.props.styles.SelectBoxStyle} options={selectOptions} handleChange={this.handleSelectChange}/></div>
   

   //textbox
   const textBox = (this.props.alreadySelected.length != 0 && (this.props.alreadySelected.length - 1 == this.props.idNum) || this.props.idNum < this.props.alreadySelected.length - 1) ? <div style={{display: "inline-block", width: "40%", margin:"0px 0px 0px 5%"}} ><IndivInputMake value={(this.props.alreadyEntered.length == this.props.idNum) ? "" : this.props.alreadyEntered[this.props.idNum]} name={this.props.idNum} onChange={this.handleInputChange} style={this.props.styles.TextInputFormStyleOption} placeholder={this.props.textPlaceholder}/></div> : null
   
   
   
  //  const hbc = ((this.props.idNum == this.props.numOfRows - 1) && this.props.alreadyEntered.length != this.props.options.length) ? this.props.plusButtonClicked : this.handleXClick.bind(this) 
  //  const v = ((this.props.idNum == this.props.numOfRows - 1) && this.props.alreadyEntered.length != this.props.options.length) ? "+" : "X"
  //  const bs = ((this.props.idNum == this.props.numOfRows - 1)  && this.props.alreadyEntered.length != this.props.options.length) ?  this.props.styles.PlusButtonStyle : this.props.styles.XButtonStyle 
  //  
  //  const plusOrXButton = (this.props.alreadyEntered[this.props.idNum] != null) ? <ButtonMake row={this.props.idNum} handleButtonClick={hbc} value={v} buttonStyle={bs} isSelected={false} /> : null
   
   
   const plusButton = (((this.props.idNum == this.props.numOfRows - 1) && this.props.alreadyEntered.length != this.props.options.length) && (this.props.alreadyEntered[this.props.idNum] != null)) ? <ButtonMake handleButtonClick={this.props.plusButtonClicked} value="+" buttonStyle={this.props.styles.PlusButtonStyle} isSelected={false} /> : null
   
   const xButton = (this.props.alreadySelected.length != 0) ? <ButtonMake handleButtonClick={this.handleXClick.bind(this)} value="X" buttonStyle={this.props.styles.XButtonStyle} row={this.props.idNum} isSelected={false} /> : null
   
   const checkButton = ((this.props.alreadySelected.length != 0 && this.props.alreadyEntered.length != 0) && this.props.idNum == this.props.numOfRows - 1) ? <ButtonMake  handleButtonClick={this.props.checkButtonClicked} value={"✓"} buttonStyle={this.props.styles.CheckButtonStyle } isSelected={false} /> : null
   
   return (
     <div>
     <div>{select}{textBox}{plusButton}{xButton}</div>
     {checkButton}
    </div>
   )
 }
}

 /*####   #### ########
##    ##   ##  ##
##         ##  ##
##   ####  ##  ######
##    ##   ##  ##
##    ##   ##  ##
 ######   #### */


export class GifMakeDefault extends React.Component {
  constructor(props) {
    super(props)
  }
  
  onEntrySelect = (e) => {
    console.log(e)
    
    ////.bitly_gif_url
    var url = ""
    
    if (Number(e.images.downsized.size) >  5242880) {
      if (Number(e.images.downsized_large.size) > 5242880) {
        if (Number(e.images.downsized_medium.size) > 5242880) {
          if (Number(e.images.downsized_small.size) > 5242880) {
            alert("Gif is too big, using still image")
            url = e.images.downsized_still.url
            //downsized_small is good 
          } else {
            url = e.images.downsized_small.url
          }
          //downsized_medium is good 
        } else {
          url = e.images.downsized_medium.url
        }
        
        //downsized_large is good 
      } else {
        url = e.images.downsized_large.url
      }
        
    //downsized is good 
    } else {
      url = e.images.downsized.url
    }
    e.images.downsized_large.url
    console.log("download url is " + url)
    
    var newUrl = os.homedir() + '/Desktop/Bot/Gifs/gif_' + e.id + '.gif'

    //this.props.downloadedGif = this.props.downloadedGif.bind(this)
    download(url, {directory: os.homedir() + '/Desktop/Bot/Gifs', filename: 'gif_' + e.id + '.gif'}, (err) => {
        if (err) throw err
        console.log("before")
        this.props.downloadedGif(newUrl)
        console.log("after")
        console.log("meow")
    }) 
    
  }
  
  render () {
    return (
      <div style={{margin:"10px 5% 10px 5%"}}>
        <GiphySelect 
          onEntrySelect={this.onEntrySelect}/>
      </div>
    )
  }
}


/*######  ########     ###    ######## ########          ##  ######
##     ## ##     ##   ## ##   ##          ##             ## ##    ##
##     ## ##     ##  ##   ##  ##          ##             ## ##
##     ## ########  ##     ## ######      ##             ##  ######
##     ## ##   ##   ######### ##          ##       ##    ##       ##
##     ## ##    ##  ##     ## ##          ##       ##    ## ##    ##
########  ##     ## ##     ## ##          ##        ######   ####*/



//importing the emoji plugin and editor 
import  { ContentState, EditorState } from 'draft-js'; // eslint-disable-line import/no-unresolved
import Editor from 'draft-js-plugins-editor';


import createEmojiPlugin from 'draft-js-emoji-plugin';

const emojiPlugin = createEmojiPlugin();


//makes an input area with the emoji button
export class DraftJSEmojisMake extends React.Component {
  constructor (props) {
    super(props)
    
    var cont = ContentState.createFromText(this.props.text)
    this.state = {
      editorState: EditorState.createWithContent(cont),
    };
  }

  

  onChange = (editorState) => {
    console.log("Change")
    //// console.log(editorState.getCurrentContent().getPlainText())
    this.props.handleTextChange(editorState)
    
    
    // const contentState = ContentState.createFromText(text);
    // const NewEditorState = EditorState.push(this.state.editorState, contentState);
    // this.setState({ editorState });  
  
    this.setState({
      editorState: editorState
    });
  };

  // focus = () => {
  //   this.editor.focus();
  // };

  render() {
    return (
      <span >
        <span style={this.props.editorStyle} >
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            //plugins={[emojiPlugin]}
            className={"editorContent"}
            placeholder={this.props.placeholder}
            spellCheck={true}
            readOnly={false}
            ref={(element) => { this.editor = element; }}
          />
        </span>
        {/* <div className={"options"}>
          <EmojiSuggestions />
          <EmojiSelect />
        </div> */}
      </span>
    );
  }
}















//PROTOTYPES
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
