//need to import the react stuff
import React from 'react';
import ReactDOM from 'react-dom';
//importing styles
import {Styles} from '../HTML and CSS/styles.jsx'
// for saving data
import {Store} from '../Functions/Store.js'
//importing components
import {ButtonMake, TabBarMake, InputBoxMake, InputAreaMake, TableMake,SelectRowWithTextBoxAndPlus, IndivDraftMake, SelectBox, IndivInputMake} from '../Components/components.jsx'



//APP VIEWS 
import {SettingsView} from './SettingsView.jsx'
import {AutoDMView} from './AutoDMView.jsx'
import {FollowersView} from './FollowersView.jsx'
import {DraftSaverView} from './DraftSaverView.jsx'
import {MassDMView} from './MassDMView.jsx'
import {MassUnfollowView} from './MassUnfollowView.jsx'
import {VideoDownloader} from './VideoDownloaderView.jsx'
import {Test} from './Test.jsx'
import {Test2} from './Test2.jsx'



 /*####   #######  ##    ## ######## ########   #######  ##       ##       ######## ########
##    ## ##     ## ###   ##    ##    ##     ## ##     ## ##       ##       ##       ##     ##
##       ##     ## ####  ##    ##    ##     ## ##     ## ##       ##       ##       ##     ##
##       ##     ## ## ## ##    ##    ########  ##     ## ##       ##       ######   ########
##       ##     ## ##  ####    ##    ##   ##   ##     ## ##       ##       ##       ##   ##
##    ## ##     ## ##   ###    ##    ##    ##  ##     ## ##       ##       ##       ##    ##
 ######   #######  ##    ##    ##    ##     ##  #######  ######## ######## ######## ##     */
 
class DisplayPage extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render () {
    //['Settings', 'Auto DM', 'Get all followers', 'Draft Saver (testing)']
    switch (this.props.page) {
      case 'Settings':
        return <SettingsView styles={this.props.styles} />;
        break;
      case 'Tweet Tracker/Auto DM':
        return <AutoDMView styles={this.props.styles} />
        break;
      case 'Get all followers':
        return <FollowersView styles={this.props.styles} />
        break;
      case 'Draft Saver':
        return <DraftSaverView styles={this.props.styles} />
        break;
      case 'Mass DM': 
        return <MassDMView styles={this.props.styles} />
        break;
      case 'Mass Unfollow':
        return <MassUnfollowView styles={this.props.styles} />
        break;
      case 'Test':
        return <Test styles={this.props.styles} />
        break;
      case 'Test2':
        return <Test2 styles={this.props.styles} />
        break;
      case 'Video Downloader':
        return  <VideoDownloader styles={this.props.styles} />
        break;
      default: 
        return null;
        break;
    }
  }
}




   /*#    ########  ########
  ## ##   ##     ## ##     ##
 ##   ##  ##     ## ##     ##
##     ## ########  ########
######### ##        ##
##     ## ##        ##
##     ## ##        */




//putting everything together
//includes the tab bar,
//and the things the tab bar shows
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {selectedTab: 'Draft Saver'}
    
  }
  
  //e is the key of the tab bar option
  handleClick = (e) => {
    this.setState({selectedTab: e})
  }
  
  
  render() {
    
    
    //the array of options that the tab bar will display
    //var TABBAROPTIONS = ['Settings', 'Tweet Tracker/Auto DM', 'Get all followers', 'Draft Saver', 'Mass DM', 'Mass Unfollow', 'Test']
    var TABBAROPTIONS = ['Settings', 'Tweet Tracker/Auto DM', 'Get all followers', 'Draft Saver', 'Video Downloader', 'Test2']
    
    
    //need to generate the tabs and the page content for each tab
    //this is generating the tab bar with all the options sent to it in the array
    const TabBar = <TabBarMake options={TABBAROPTIONS} handleTabClick={this.handleClick} buttonStyle={Object.assign({}, Styles.ButtonStyle, {width: 100 / TABBAROPTIONS.length + "%"})} selectedTab={this.state.selectedTab}/>
    
    const PageToDisplay = <DisplayPage  page={this.state.selectedTab} styles={Styles}/>
    

    //this is what is being displayed
    return (
      //the tab bar
      <div>
        <div id="tabbar" className="" style={Styles.Tabbar}>
          {TabBar}
        </div>
        <div style={{margin:"50px 0px 0px 0px"}}>
          {PageToDisplay}
        </div>
      </div>
      
    )
  }
}

//rendering the final thing
ReactDOM.render(
  //sending the options to the app class
  <App/>,
document.getElementById('root')
);












/*######  ########   #######  ########  #######  ######## ##    ## ########  ########  ######
##     ## ##     ## ##     ##    ##    ##     ##    ##     ##  ##  ##     ## ##       ##    ##
##     ## ##     ## ##     ##    ##    ##     ##    ##      ####   ##     ## ##       ##
########  ########  ##     ##    ##    ##     ##    ##       ##    ########  ######    ######
##        ##   ##   ##     ##    ##    ##     ##    ##       ##    ##        ##             ##
##        ##    ##  ##     ##    ##    ##     ##    ##       ##    ##        ##       ##    ##
##        ##     ##  #######     ##     #######     ##       ##    ##        ########  ####*/


function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

//PROTOTYPES
String.prototype.insertAt=function(index, string) { 
  return this.substr(0, index) + string + this.substr(index);
}