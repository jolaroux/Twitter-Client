
require('./cssStyles.css')
import Color from 'Color'
const bColor2 = Color('#03a9f4').alpha(0.3)

//styles for everything
export var Styles = {
  //styles for tab bar
  
  /*######    ###    ########  ########     ###    ########
     ##      ## ##   ##     ## ##     ##   ## ##   ##     ##
     ##     ##   ##  ##     ## ##     ##  ##   ##  ##     ##
     ##    ##     ## ########  ########  ##     ## ########
     ##    ######### ##     ## ##     ## ######### ##   ##
     ##    ##     ## ##     ## ##     ## ##     ## ##    ##
     ##    ##     ## ########  ########  ##     ## ##     */
  
  
  Tabbar: {
    overflow: "hidden",
    border: "0.01px solid #959191",
    borderStyle: "none none solid none",
    borderRadius: "3px",
    position: "fixed",
    width: "100%",
    height:"40px",
    top: "0px",
    zIndex:"99999"
  },
  
  
  /*######  ##     ## ######## ########  #######  ##    ##
  ##     ## ##     ##    ##       ##    ##     ## ###   ##
  ##     ## ##     ##    ##       ##    ##     ## ####  ##
  ########  ##     ##    ##       ##    ##     ## ## ## ##
  ##     ## ##     ##    ##       ##    ##     ## ##  ####
  ##     ## ##     ##    ##       ##    ##     ## ##   ###
  ########   #######     ##       ##     #######  ##    */
  
  ButtonStyle: {
    backgroundColor: "#e6e6e6",
    border: "none",
    outline: "none",
    cursor: "pointer",
    overflow: "hidden",
    verticalAlign: "top",
    //width: "16.66%",
    height: "40px",
    zIndex:"999999",
    transition: "0.3s",
    hover: "#657786",
    selected: "#03a9f4"
  },
  SaveButtonStyle: {
    backgroundColor: "#e6e6e6",
    border: "0.01px solid #657786",
    outline: "none",
    cursor: "pointer",
    width: "25%",
    overflow: "hidden",
    verticalAlign: "top",
    height: 40,
    transition: "0.3s",
    hover: "#657786",
    selected: "#3ac91d",
    borderRadius: "3px"
  },
  SaveButtonStyle2: {
    backgroundColor: "#e6e6e6",
    border: "0.01px solid #657786",
    outline: "none",
    cursor: "pointer",
    width: "25%",
    overflow: "hidden",
    //verticalAlign: "top",
    height: '40px',
    transition: "0.3s",
    hover: "#657786",
    selected: "#3ac91d",
    borderRadius: "3px"
  },
  SaveButtonCenteredStyle: {
    backgroundColor: "#e6e6e6",
    border: "0.01px solid #657786",
    outline: "none",
    cursor: "pointer",
    width: "25%",
    overflow: "hidden",
    verticalAlign: "top",
    height: 40,
    transition: "0.3s",
    hover: "#657786",
    selected: "#3ac91d",
    borderRadius: "3px"
  },
  SaveButtonInDivStyle: {

    backgroundColor: "#e6e6e6",
    border: "0.01px solid #657786",
    outline: "none",
    cursor: "pointer",
    width: "100%",
    overflow: "hidden",
    verticalAlign: "top",
    height: "40px",
    transition: "0.3s",
    hover: "#657786",
    selected: "#3ac91d",
    borderRadius: "3px"
  },
  SaveButtonInDivStyle2: {

    backgroundColor: "#e6e6e6",
    border: "0.01px solid #657786",
    outline: "none",
    cursor: "pointer",
    width: "100%",
    //overflow: "hidden",
    //verticalAlign: "top",
    height: "40px",
    transition: "0.3s",
    hover: "#657786",
    selected: "#3ac91d",
    borderRadius: "3px"
  },
  
  SaveButtonInDivStyleDraft: {

    backgroundColor: "#e6e6e6",
    border: "0.01px solid #657786",
    outline: "none",
    cursor: "pointer",
    width: "100%",
    overflow: "hidden",
    verticalAlign: "top",
    height: "30px",
    transition: "0.3s",
    hover: "#657786",
    selected: "#3ac91d",
      borderRadius: "3px"
  },
  DragAndDrop: {

    backgroundColor: "#e6e6e6",
    border: "0.01px solid #657786",
    outline: "none",
    cursor: "pointer",
    width: "100%",
    overflow: "hidden",
    verticalAlign: "top",
    height: "21px",
    textAlign:"center",
    display:"inline-block",
    padding:"4px 0px 3px 0px",
    transition: "0.3s",
    hover: "#657786",
    selected: "#3ac91d",
      borderRadius: "3px"
  },
  
  SaveAllButtonStyle: {
      backgroundColor: "#e6e6e6",
      border: "0.01px solid #657786",
      outline: "none",
      cursor: "pointer",
      width: "10%",
      overflow: "hidden",
      verticalAlign: "top",
      height: 40,
      transition: "0.3s",
      hover: "#657786",
      selected: "#3ac91d",
      borderRadius: "3px",
      //display: "inline",
      margin: "-38px 8px 0px -5px",
      float:"left",
  },
  
  ProcessIsRunningStyle: {
    backgroundColor: "#3ac91d",
    border: "0.01px solid #657786",
    outline: "none",
    cursor: "pointer",
    width: "25%",
    overflow: "hidden",
    verticalAlign: "top",
    height: 40,
    transition: "0.3s",
    hover: "#fe4c4c",
    selected: "#3ac91d",
    borderRadius: "3px"
  },
  ProcessIsRunningStyleGreenToYellow: {
    backgroundColor: "#3ac91d",
    border: "0.01px solid #657786",
    outline: "none",
    cursor: "pointer",
    width: "25%",
    overflow: "hidden",
    verticalAlign: "top",
    height: 40,
    transition: "0.3s",
    hover: "#f0e448",
    selected: "#3ac91d",
    borderRadius: "3px"
  },
  ProcessIsRunningStyleYellowToRed: {
    backgroundColor: "#f0e448",
    border: "0.01px solid #657786",
    outline: "none",
    cursor: "pointer",
    width: "25%",
    overflow: "hidden",
    verticalAlign: "top",
    height: 40,
    transition: "0.3s",
    hover: "#fe4c4c",
    selected: "#3ac91d",
    borderRadius: "3px"
  },
  BadButton: {
    backgroundColor: "#e6e6e6",
    border: "0.01px solid #657786",
    outline: "none",
    cursor: "pointer",
    width: "100%",
    overflow: "hidden",
    verticalAlign: "top",
    height: 40,
    transition: "0.3s",
    hover: "#657786",
    selected: "#3ac91d",
      borderRadius: "3px"
  },
  SaveButtonStyleGreen: {
    backgroundColor: "#3ac91d",
    border: "0.01px solid #657786",
    outline: "none",
    cursor: "pointer",
    marginTop: "-5px",
    width: "40%",
    //marginBottom:"0px",
    overflow: "hidden",
    verticalAlign: "baseline",
    height: "40px",
    transition: "0.3s",
    hover: "#657786",
    selected: "#3ac91d",
    borderRadius: "3px"
  },
  SaveButtonStyleGreenRunning: {
    backgroundColor: "#657786",
    border: "0.01px solid #657786",
    outline: "none",
    cursor: "pointer",
    marginTop: "-5px",
    width: "40%",
    //marginBottom:"0px",
    overflow: "hidden",
    verticalAlign: "baseline",
    height: "40px",
    transition: "0.3s",
    hover: "#657786",
    selected: "#3ac91d",
    borderRadius: "3px"
  },
  
    PlusButtonStyle: {
      backgroundColor: "#3ac91d",
      border: "0.01px solid #657786",
      outline: "none",
      cursor: "pointer",
      //width: "3.75%",
      overflow: "hidden",
      transition: "0.3s",
      margin: "8px 0px 0px 1%",
      //height: "30px",
      borderRadius: "3px",
      hover: "#657786",
      fontSize: "20px",
      selected: "#3ac91d"
      //verticalAlign: "top"
      
    },
    PlusButtonStyleDraft: {
      backgroundColor: "#3ac91d",
      border: "0.01px solid #657786",
      outline: "none",
      cursor: "pointer",
      width: "3.75%",
      //overflow: "hidden",
      transition: "0.3s",
    //  margin: "-38px 8px 0px 0px",
      float:"right",
      height: "40px",
      verticalAlign:"middle",
      padding:"0px 0px 4px 0px",
      borderRadius: "3px",
      hover: "#1e700c",
      fontSize: "30px",
      lineHeight:"30px",
      selected: "#3ac91d",
      //position: "-webkit-sticky",
      position: "fixed",
      right:"10px",
      zIndex:"15",
      margin: "0px 1% 0px 0%"
      //position: "fixed",
      //right: "10px"
      //verticalAlign: "top"
      
    },
    ResetButtonStyle: {
      backgroundColor: "#f74646",
      border: "0.01px solid #657786",
      outline: "none",
      cursor: "pointer",
      width: "8%",
      float:"right",
      overflow: "hidden",
      verticalAlign: "top",
      transition: "0.3s",
      margin: "0px -13px 0px 5%",
      height: "40px",
      borderRadius: "3px",
      hover: "#657786",
      fontSize: "15px",
      selected: "#3ac91d"
      
    },
    CheckButtonStyle: {
      backgroundColor: "#3ac91d",
      border: "0.01px solid #657786",
      outline: "none",
      cursor: "pointer",
      width: "5%",
      // padding: "10px",
      float:"right",
      overflow: "hidden",
      //verticalAlign: "top",
      transition: "0.3s",
      margin: "8px -15px -1px 5%",
      height: "40px",
      borderRadius: "3px",
      hover: "#657786",
      fontSize: "20px",
      selected: "#3ac91d",
      
    },
    XButtonStyle: {
      backgroundColor: "#f74646",
      border: "0.01px solid #657786",
      outline: "none",
      cursor: "pointer",
      width: "5%",
      // padding: "10px",
      padding: "3px 0px 0px 0px",
      float:"right",
      overflow: "hidden",
      //verticalAlign: "top",
      transition: "0.3s",
      margin: "8px -15px 0px 5%",
      height: "40px",
      borderRadius: "3px",
      hover: "#657786",
      fontSize: "15px",
      selected: "#3ac91d",
      
    },
    XButtonStyleLeft: {
      backgroundColor: "#f74646",
      border: "0.01px solid #657786",
      outline: "none",
      cursor: "pointer",
      width: "30px",
      // padding: "10px",
      //padding: "3.5% 0px 0px 4%",
      padding: "0px 0px 0px 0px",
      float:"left",
      overflow: "auto",
      //verticalAlign: "top",
      transition: "0.3s",
      //margin: "-3% 0px 0px -4.25%",
      height: "30px",
      borderRadius: "3px",
      hover: "#ba3333",
      fontSize: "15px",
      selected: "#3ac91d",
      
    },
    XButtonStyleMediaImage: {
      // backgroundColor: "#f74646",
      // border: "3px solid #f74646",
      // cursor: "pointer",
      // width: "25px",
      // transition: "0.3s",
      // padding:"5px 0px 0px 0px",
      // height: "25px",
      // //borderRadius: "5px",
      // hover: "#ba3333",
      // fontSize: "15px",
      // selected: "#3ac91d",
      // verticalAlign: "top",
      // position:"relative",
      // display:"inline-block", 
      // left:"35px",
      // marginTop:"0px",
      // top:"0px",
      // zIndex:"10",
      // outline:"none"
      
      
      backgroundColor: "#f74646",
      border: "3px solid #f74646",
      borderRadius:"5px",
      cursor: "pointer",
      width: "25px",
      transition: "0.3s",
      //padding:"5px 0px 0px 0px",
      padding:"0px 0px 0px 0px",
      height: "25px",
      
      hover: "#ba3333",
      fontSize: "15px",
      selected: "#3ac91d",
      verticalAlign: "top",
      position:"relative",
      display:"inline-block", 
      left:"35px",
      top:"0px",
      marginTop:"0px",
      zIndex:"100",
      outline:"none"
      
    
      
    },
    
    XButtonStyleMedia: {
      backgroundColor: "#f74646",
      border: "3px solid #f74646",
      borderRadius:"5px",
      cursor: "pointer",
      width: "25px",
      transition: "0.3s",
      //padding:"5px 0px 0px 0px",
      padding:"0px 0px 0px 0px",
      height: "25px",
      
      hover: "#ba3333",
      fontSize: "15px",
      selected: "#3ac91d",
      
      position:"absolute",
      
      left:"0px",
      top:"0px",
      zIndex:"100",
      outline:"none"

      
    },
  
  //plus button 
    AddCategoryStyle: {
      
      hover: "#657786",
      selected: "#03a9f4",
      backgroundColor: bColor2,
      border: "0.01px solid #657786",
      outline: "none",
      cursor: "pointer",
      width: "3%",
      height: "3%",
      transition: "0.3s",
      //margin: "0px 0px 0px 42.5%",
      borderRadius: "3px",
      lineHeight:"20px",
      padding:"0px 0px 0px 0px",
      fontSize: "20px",
    },

    //check button
    AddCategoryButtonStyle: {
      
      hover: "#657786",
      selected: "#03a9f4",
      backgroundColor: "#3fdd1f",
      border: "0.01px solid #657786",
      outline: "none",
      cursor: "pointer",
      width: "3%",
      height: "3%",
      transition: "0.3s",
      //margin: "0px 0px 0px 42.5%",
      lineHeight:"15px",
      padding:"0px 0px 0px 0px",
      borderRadius: "3px",
      fontSize: "15px",
    },
    
    ClearSearchBarStyle: {
      hover: "#657786",
      selected: "#03a9f4",
      backgroundColor: bColor2,
      border: "0.01px solid #657786",
      outline: "none",
      cursor: "pointer",
      width: "3%",
      height: "3%",
      transition: "0.3s",
      textAlign:"center",
      //padding:"3px 0px 0px 0px",
      lineHeight:"15px",
      padding:"0px 0px 0px 0px",
      //margin: "0px 0px 0px 42.5%",
      borderRadius: "3px",
      fontSize: "15px",
      position:"absolute",
      margin:"7px 0px 0px 21%"
    },
    
    AddGifButton: {
      backgroundColor: "#e6e6e6",
      border: "0.01px solid #657786",
      outline: "none",
      cursor: "pointer",
      //width: "5%",
      overflow: "hidden",
      //verticalAlign: "top",
      height: "40px",
      transition: "0.3s",
      hover: "#657786",
      selected: "#3ac91d",
      borderRadius: "3px",
      display:"inline-block",
      padding: "0px 12px 0px 12px",
      //padding:"0px 0px 0px 0px",
      marginTop:"38px",
      marginLeft:"-5px"
    },
    addEmojiButton: { 
      backgroundColor: "#e6e6e6",
      border: "0.01px solid #657786",
      outline: "none",
      cursor: "pointer",
      //width: "5%",
      //width:"6%", 
      overflow: "hidden",
      verticalAlign: "top",
      textAlign: "center",
      height: "40px",
      transition: "0.3s",
      hover: "#657786",
      selected: "#3ac91d",
      borderRadius: "3px",

      padding: "0px 12px 12px 12px",
      //padding:"0px 0px 0px 0px",
      marginTop:"38px",
      position:"absolute",
      right:"-5px",
      fontSize:"25px"
    },
    
  
  /*###### ######## ##     ## ######## #### ##    ## ########  ##     ## ########
     ##    ##        ##   ##     ##     ##  ###   ## ##     ## ##     ##    ##
     ##    ##         ## ##      ##     ##  ####  ## ##     ## ##     ##    ##
     ##    ######      ###       ##     ##  ## ## ## ########  ##     ##    ##
     ##    ##         ## ##      ##     ##  ##  #### ##        ##     ##    ##
     ##    ##        ##   ##     ##     ##  ##   ### ##        ##     ##    ##
     ##    ######## ##     ##    ##    #### ##    ## ##         #######     */
   
     
  
  
  TextInputFormStyle: {
    width: "100%",
    padding: "12px 20px",
    margin: "8px 0px",
    display: "inline-block",
    border: "1px solid #b9b9b9",
    borderRadius: "4px",
    boxSizing: "border-box",
    backgroundColor: "#f6f6f6"
  
  }, 
  TextInputFormStyleSearch: {
    width: "20%",
    padding: "12px 20px 12px 20px",
    lineHeight: "15px",
    //margin: "8px 0px",
    display: "inline-block",
    position:"absolute",
    border: "0.01px solid #657786",
    borderRadius: "4px",
    boxSizing: "border-box",
    color:"#14191b",
    backgroundColor: bColor2
  
  }, 
  
  TextAreaFormStyle: {
    width: "100%",
    height: "100px",
    padding: "12px 20px",
    margin: "8px 0px",
    display: "inline-block",
    border: "1px solid #b9b9b9",
    borderRadius: "4px",
    boxSizing: "border-box",
    backgroundColor: "#f6f6f6"
  },
  TextAreaFormStyleBlue: {
    width: "100%",
    //height: "8%",
    padding: "12px 12px 12px 12px",
    margin: "8px 0px 8px 0px",
    display: "inline-block",
    border: "0.01px solid #657786",
    borderRadius: "4px",
    boxSizing: "border-box",

    background: "#dff8ff"
    
    //backgroundColor: "#dff8ff"
    //background: "linear-gradient(90deg, #03cf32 10%, #dff8ff 0%)"
  },
  
  
  TextInputFormStyleOption: {
    //width: "45%",
    width: "100%",
    padding: "12px 20px",
    margin: "8px 0px",
    height: "40px",
    //display: "inline-block",
    border: "1px solid #b9b9b9",
    borderRadius: "4px",
    boxSizing: "border-box",
    backgroundColor: "#f6f6f6"
  
  }, 
  
  //inputtng a new category
  TextInputFormStyleDraft: {
    backgroundColor: bColor2,
    border: "0.01px solid #657786",

    outline: "none",
    cursor: "pointer",
    width: "15%",
    overflow: "hidden",
    transition: "0.3s",
    //margin: "-38px 8px 0px 42.5%",
    height: "38px",
    //textAlign: "center",
    borderRadius: "3px",
    fontSize: "15px",
    padding: "0px 0px 0px 5px"
  
  }, 
  
  
   /*####  ######## ##       ########  ######  ########
  ##    ## ##       ##       ##       ##    ##    ##
  ##       ##       ##       ##       ##          ##
   ######  ######   ##       ######   ##          ##
        ## ##       ##       ##       ##          ##
  ##    ## ##       ##       ##       ##    ##    ##
   ######  ######## ######## ########  ######     */
  
  SelectBoxStyle: {
    margin: "8px 0px",
    width: "100%",
    height: "40px",
    padding: "12px",
    border: "1px solid #b9b9b9",
    borderRadius: "4px",
    boxSizing: "border-box",
    backgroundColor: "#f6f6f6"
  },
  //select box of draft categories
  CategorySelect: {
    backgroundColor: bColor2,
    border: "0.01px solid #657786",
    outline: "none",
    cursor: "pointer",
    width: "15%",
    overflow: "hidden",
    transition: "0.3s",
    //margin: "-38px 8px 0px 42.5%",
    height: "38px",
    textAlign: "center",
    borderRadius: "0px",
    fontSize: "15px",
  }, 
  
  
  TableStyle: {
    tableLayout:"fixed",
    width: "100%",
    
  },
  TableRowStyle: {
    //backgroundColor:"#ff0000"
  },
  TableItemStyle: {
    
  },
  





/*     ##  #######  ########     ###    ##
###   ### ##     ## ##     ##   ## ##   ##
#### #### ##     ## ##     ##  ##   ##  ##
## ### ## ##     ## ##     ## ##     ## ##
##     ## ##     ## ##     ## ######### ##
##     ## ##     ## ##     ## ##     ## ##
##     ##  #######  ########  ##     ## ######*/

  // 
  // ModalStyle: {
  //   /* The Modal (background) */
  // 
  //   //display: "none", /* Hidden by default */
  //   position: "fixed", /* Stay in place */
  //   zIndex: "1", /* Sit on top */
  //   paddingTop: "100px", /* Location of the box */
  //   left: "0",
  //   top: "0",
  //   width: "100%", /* Full width */
  //   height: "100%", /* Full height */
  //   overflow: "auto", /* Enable scroll if needed */
  //   backgroundColor: "rgb(0,0,0)", /* Fallback color */
  //   backgroundColor: "rgba(0,0,0,0.4)" /* Black w/ opacity */
  // 
  // 
  // },
  // 
  // /* Modal Content */
  // ModalContentStyle: {
  //   position: "relative",
  //   backgroundColor: "#fefefe",
  //   margin: "auto",
  //   padding: "0",
  //   border: "1px solid #888",
  //   width: "80%",
  //   boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)",
  //   WebkitAnimationName: "animatetop",
  //   WebkitAnimationDuration: "0.4s",
  //   animationName: "animatetop",
  //   animationDuration: "0.4s"
  // },
  

}




