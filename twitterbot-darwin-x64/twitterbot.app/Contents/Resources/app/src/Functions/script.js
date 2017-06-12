//register twitter
import Twitter from 'twitter'
import Store from './Store.js'


//other files 
import {registerStore, registerTwitter} from '../Functions/functions.js'


/*
########     ###    ######## ########    ##       #### ##     ## #### ########  ######
##     ##   ## ##      ##    ##          ##        ##  ###   ###  ##     ##    ##    ##
##     ##  ##   ##     ##    ##          ##        ##  #### ####  ##     ##    ##
########  ##     ##    ##    ######      ##        ##  ## ### ##  ##     ##     ######
##   ##   #########    ##    ##          ##        ##  ##     ##  ##     ##          ##
##    ##  ##     ##    ##    ##          ##        ##  ##     ##  ##     ##    ##    ##
##     ## ##     ##    ##    ########    ######## #### ##     ## ####    ##     ######*/



export function checkRateLimits() {
 //  window.client = new Twitter({consumer_key: key, consumer_secret: secret, access_token_key: tokenkey, access_token_secret: tokensecret});
  
  
   window.client.get('application/rate_limit_status', { 'resources': 'followers,statuses,users,friendships,direct_messages,media' }, function(error, limits, response) { 
      if (!error) {
        console.log(response)
        
        console.log(limits)
        var cDate = (new Date).getTime() / 1000
        
        var seconds = limits.resources.followers["/followers/ids"].reset - cDate
        console.log("Minutes until /followers/ids resets")
        console.log(Math.round(seconds/60, -2))
        
        var seconds2 = limits.resources.statuses["/statuses/retweets/:id"].reset - cDate
        console.log("Minutes until /statuses/retweeters/:id resets")
        console.log(Math.round(seconds2/60, -2))
        //console.log("\u2713")
        
        var seconds3 = limits.resources.users["/users/lookup"] - cDate
        console.log("Minutes until /users/lookup resets")
        console.log(Math.round(seconds2/60, -2))
        
        
        
      }
  
  })
}


 /*
 ######   #######  ########  ########
##    ## ##     ## ##     ##    ##
##       ##     ## ##     ##    ##
 ######  ##     ## ########     ##
      ## ##     ## ##   ##      ##
##    ## ##     ## ##    ##     ##
 ######   #######  ##     ##    */
 
 
 

 
 
 //tracking how many sorts
// export  var counter = 1
//  
//  categories = []
//  values = []
//  
//  RAWUSERDATA=[]
   
  
export var newChoices = ["followers_count", "friends_count", "verified", "statuses_count", "default_profile", "default_profile_image", "protected", "created_at"]

//export var counterTracker = 0



   
 // savedData = []
//PROBABLY CURRENT
//FOR SORTING RAW DATA


//PROBABLY CURRENT
//SORTING THE USERNAMES

export function sortUsernames(savedData, categories, values, callback) {
  //clear
  var  namesThatPassed = []
  // console.log(categories)
  // console.log( values)
  
  
  for (var i = 0; i< savedData.length;i++) {
    //console.log(i)
    var tracker=true
    //going through all of the criteria
    
    for (var j = 0; j < categories.length; j++) {
      if (typeof  values[j] == 'boolean') {
        if ( savedData[i][categories[j]] !=  values[j]) {
          tracker = false
        }
      } else if ( values[j].constructor === Array) {
        
        try {if ((Number( savedData[i][categories[j]]) < Number( values[j][0])) || (Number( savedData[i][categories[j]]) > Number( values[j][1]))) {
         tracker = false
       } } catch(err) {
         console.log("ERROR IS ")
         console.log( savedData[i])
         console.log(i)
         console.log(err)
       }
        
        
     } else if (categories[j] == "Location") {
       
       
       if ( savedData[i]["Location"] !=  values[j]) {
         tracker = false
       }
       
       
     } else{//if its a date
        //console.log("date")
        var dateFrom =  savedData[i]['Account Age']//info['created_at']
        tempDate = dateFrom.concat(' UTC')
        
        
        //var date1 = new Date(dateFrom);
        var date1 = new Date(dateFrom);
        var date2 = new Date();
        
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24 * 7)); 
        if ((diffDays <  values[j][0]) || diffDays >  values[j][1]) {
          //console.log("THE WEEKS IS TOO SMALL")
          console.log("diffDays "+diffDays+" is in range "+ values[j])
          tracker = false
        }
        //DIFF DAYS IS DIFFERENCE IN WEEKS
      }
    
    }
    if (tracker == true) {
     //console.log("Added user to followers")
      namesThatPassed.push( savedData[i]['name'])
     //console.log(data[i]['screen_name'])
    }
    if(i == ( savedData.length - 1)) {
      console.log("CALLBACK")
      
      callback && callback(namesThatPassed)
    }
  }
}

//CURRENT
//getting the names from the user ids 
export function startGetFollowersNames(followers, callback) {
  var RAWUSERDATA = []
  
  
  var valueOfFollowersLength =  followers.length
  var namesThatPassed = []
  
  var counterTracker = 0
  getNamesLoop(valueOfFollowersLength, followers, namesThatPassed, RAWUSERDATA, counterTracker, function(namesThatPassed, RAWUSERDATA) {
    //console.log("CALLBACK 1")
    callback && callback(namesThatPassed, RAWUSERDATA)
  })
}
 

//will be called over again if needed
function getNamesLoop(valueOfFollowersLength, followers, namesThatPassed, RAWUSERDATA, counterTracker, callback) {
  
  get100usersNames(followers, RAWUSERDATA, namesThatPassed, counterTracker, function(counterTracker, namesThatPassed, RAWUSERDATA) {
    
    if (counterTracker < valueOfFollowersLength && window.isGettingFollowerNames) {
      //console.log("counter tracker in loop is: ", counterTracker)
      getNamesLoop(valueOfFollowersLength, followers, namesThatPassed, RAWUSERDATA, counterTracker, callback)
      
    } else {
     
      callback && callback(namesThatPassed, RAWUSERDATA)
    }
    
  })
}
 
 
//export var valueOfFollowersLength = 0
// namesThatPassed = []
 
 //names 100 users
function get100usersNames(followers, RAWUSERDATA, namesThatPassed, counterTracker, callback) {
  
  console.log("FOLLOWERS IS ")
  console.log(followers)
  console.log(typeof followers)
  console.log(typeof  followers)
  var next100 = followers.splice(0,100)
  counterTracker += next100.length
  
  
  //going through everything 100 at a time
   window.client.post("users/lookup", {"user_id":next100.toString()} , function(error, data, response) { 
    
      if (!error) {
        //console.log("NO ERROR")
        
        for(var i = 0; i < data.length; i++) {
          
          console.log("LOCATION TEST")
          console.log(data[i]["location"])
          
          var obj = {"id":data[i]["id_str"], "name":data[i]["screen_name"], "Follower Count": data[i]["followers_count"], "Friend Count": data[i]["friends_count"], "Verified?": data[i]["verified"], "Tweet Count (w/ retweets)":data[i]["statuses_count"], "Default Profile?":data[i]["default_profile"], "Default Profile Picture?":data[i]["default_profile_image"], "Protected User?":data[i]["protected"], "Account Age": data[i]["created_at"], "Location":data[i]["location"] }
          //console.log(JSON.stringify(obj))
          RAWUSERDATA.push(JSON.stringify(obj))
        
          //add to names 
          namesThatPassed.push(data[i]['screen_name'])
          
        }
          callback && callback(counterTracker, namesThatPassed, RAWUSERDATA)
      } else {
        alert("ERROR")
      }
        
  })  
  
}
 

 Array.prototype.diff = function(a) {
     return this.filter(function(i) {return a.indexOf(i) < 0;});
 };
 
/*###### ########  #### ######## ##    ## ########   ######
##       ##     ##  ##  ##       ###   ## ##     ## ##    ##
##       ##     ##  ##  ##       ####  ## ##     ## ##
######   ########   ##  ######   ## ## ## ##     ##  ######
##       ##   ##    ##  ##       ##  #### ##     ##       ##
##       ##    ##   ##  ##       ##   ### ##     ## ##    ##
##       ##     ## #### ######## ##    ## ########   ####*/


//GETTING THE FRIENDS IDS
export function getFriends(userScreenName, callback) {
  registerStore()
  registerTwitter()
  
  console.log("GET friends")
  var friends = []
  

  //getting the friends
  //initing to -1
  var cursor = -1

  loopFriends(userScreenName, friends, cursor, function() {
    
    callback && callback(friends)
  })

}


function loopFriends(userScreenName, friends, cursor, callback) {
  console.log("LOOP")
  console.log(userScreenName)
  friendsFunc(userScreenName, friends,  cursor, function(cursor, friends) {
    if (cursor != 0) 
      loopFriends(userScreenName, friends, cursor,  callback);
    else {
      //print the amount of friends
      console.log("Amount of friends is:", friends.length)

      
      //exportData(friends)
      //savefriends()
      callback && callback(friends)
      
      return;
    }
  });
}

//will be called for friends, needs a callback
function friendsFunc(userScreenName, friends, cursor, callback) {
    console.log("friends FUNC ")
    
    console.log(userScreenName)

  
  window.client.get('friends/ids', { 'screen_name': userScreenName, 'cursor': cursor, 'stringify_ids':true }, function(error, users, response) {
    console.log("RESPONSE IS ")
    console.log(response)
    if (!error) {

      var obj = JSON.parse(response['body'])
      console.log("OBJ IS ")
      console.log(obj)
      //for (id in obj.ids) {
      for (var i = 0; i < obj.ids.length; i++) {
        friends.push(obj.ids[i])
      }
      
      //friends.push.apply(obj.ids)

      cursor = obj.next_cursor

      callback && callback(cursor, friends)

    } else {

      console.log(error)
      console.log(error[0])
      console.log("friends grabbed before error")
      console.log(friends)
      alert(error[0]['message'])
      cursor = 0
      callback && callback(cursor, friends)

    }
  })

}


/*
########  #######  ##       ##        #######  ##      ## ######## ########   ######
##       ##     ## ##       ##       ##     ## ##  ##  ## ##       ##     ## ##    ##
##       ##     ## ##       ##       ##     ## ##  ##  ## ##       ##     ## ##
######   ##     ## ##       ##       ##     ## ##  ##  ## ######   ########   ######
##       ##     ## ##       ##       ##     ## ##  ##  ## ##       ##   ##         ##
##       ##     ## ##       ##       ##     ## ##  ##  ## ##       ##    ##  ##    ##
##        #######  ######## ########  #######   ###  ###  ######## ##     ##  ######*/

//getting all of the usernames of followers a person has
//the actual followers
// followers = []
//global cursor
//export var cursor = -1
//the function
// export var userScreenName = ""
//CURRENT
//GETTING THE FOLLOWERS IDS
export function getFollowers(userScreenName, callback) {
  registerStore()
  registerTwitter()
  
  console.log("GET FOLLOWERS")
  var followers = []
  

  //getting the followers
  //initing to -1
  var cursor = -1

  loop(userScreenName, followers, cursor, function() {
    
    callback && callback(followers)
  })

}

function loop(userScreenName, followers, cursor, callback) {
  console.log("LOOP")
  console.log(userScreenName)
  followersFunc(userScreenName, followers,  cursor, function(cursor, followers) {
    if (cursor != 0) 
      loop(userScreenName, followers, cursor,  callback);
    else {
      //print the amount of followers
      console.log("Amount of followers is:", followers.length)

      
      //exportData(followers)
      //saveFollowers()
      callback && callback(followers)
      
      return;
    }
  });
}

//will be called for followers, needs a callback
function followersFunc(userScreenName, followers, cursor, callback) {
    console.log("FOLLOWERS FUNC ")
    
    console.log(userScreenName)

  
  window.client.get('followers/ids', { 'screen_name': userScreenName, 'cursor': cursor, 'stringify_ids':true }, function(error, users, response) {
    console.log("RESPONSE IS ")
    console.log(response)
    if (!error) {

      var obj = JSON.parse(response['body'])
      console.log("OBJ IS ")
      console.log(obj)
      //for (id in obj.ids) {
      for (var i = 0; i < obj.ids.length; i++) {
        followers.push(obj.ids[i])
      }
      
      //followers.push.apply(obj.ids)

      cursor = obj.next_cursor

      callback && callback(cursor, followers)

    } else {

      console.log(error)
      console.log(error[0])
      console.log("Followers grabbed before error")
      console.log(followers)
      alert(error[0]['message'])
      cursor = 0
      callback && callback(cursor, followers)

    }
  })

}

// export function loadFollowers() {
//   followers = store.get('followers')
//   
//   console.log("FOLLOWERS ARE")
//   console.log(followers)
//   
//   button = document.getElementById("getFollowersId")
//   button.style.color = "#4fd249"
//   button.innerHTML = followers.length + " followers"
//   
//   //show sort and other buttons
//   document.getElementById("sortFollowersId").style = "display:inline-block"
//   document.getElementById("exportFollowersId").style = "display:inline-block"
// }
 

/*
   ###    ##     ## ########  #######          ########  ##     ##
  ## ##   ##     ##    ##    ##     ##         ##     ## ###   ###
 ##   ##  ##     ##    ##    ##     ##         ##     ## #### ####
##     ## ##     ##    ##    ##     ## ####### ##     ## ## ### ##
######### ##     ##    ##    ##     ##         ##     ## ##     ##
##     ## ##     ##    ##    ##     ##         ##     ## ##     ##
##     ##  #######     ##     #######          ########  ##     */


//705081977716604928
//for knowing whether the process is going
// export var autoDmIsGoing = false
// 
// //storing the screen names
// export var screenNames = []
// export var newNames = []
// export var namesToDM = []
// 
// export var blacklist = []

//the function that sends a dm
export function sendDmForTable(userScreenName, dmtext) {

  //var dmtext = document.getElementById("dmtosend").value

  //sending the dm
  console.log("RECIEVED IN sendDmForTable")
  console.log(userScreenName)
  console.log(dmtext)

  window.client.post('direct_messages/new', {
    screen_name: userScreenName,
    text: dmtext
  }, function(error, tweets, response) {
    if (!error) {
      console.log("DM sent successfully")
      //change the status in the table
      document.getElementById('item'+userScreenName+'status').innerHTML = "SENT"
      

    } else {
      console.log("DM not sent successfully")
      console.log(error[0])
      document.getElementById('item'+userScreenName+'status').innerHTML = "FAILED"
      
    }
  })

}

//the function that JUST SENDS DM NO TABLE
//also takes user ids 
export function sendDmForID(userID, dmtext) {

  //var dmtext = document.getElementById("dmtosend").value

  //sending the dm
  console.log("RECIEVED IN sendDmForTable")
  console.log(userID)
  console.log(dmtext)

  window.client.post('direct_messages/new', {
    user_id: userID,
    text: dmtext
  }, function(error, tweets, response) {
    if (!error) {
      console.log("DM sent successfully")
      
      

    } else {
      console.log("DM not sent successfully to " + userID)
      console.log(error)
      console.log(response)
      console.log(tweets)
      
      
    }
  })

}


//THIS IS FOR REACT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

 // screenNamesObjArray = []

export function getRetweeters(component, screenNames, callback) {
  console.log("INIT ")
  console.log(screenNames.length)
  screenNames = screenNames.removeDuplicates()
  
  //var newNames = []
  //console.log(component.state.isTrackingTweet)
  getRetweetersScreenNames(component.tweetID, (newNames) => {
    console.log("CALL 1")
    console.log(newNames.length)
    processNamesForDmReact(component, newNames, screenNames, (screenNamesObjArray, screenNames, namesToDM) => {
      screenNames.removeDuplicates()
      screenNamesObjArray.removeDuplicates()
      console.log("call 2")
      console.log(screenNames.length)
      console.log(namesToDM.length)
      if (component.state.isTrackingTweet || component.state.isTrackingTweetDM) {
      callback && callback( screenNamesObjArray, screenNames, namesToDM)
      }
    })
  })
}


export function getRetweetersScreenNames(tweetID, callback) {
  
  //resetting the names array
  var newNames = []
  //console.log("GET retweets")

  //the tweet to get data from
  var tweet = 'https://api.twitter.com/1.1/statuses/retweets/' + tweetID + '.json'

  //getting the retweets
  window.client.get("statuses/retweets", {"id":tweetID, "count":"100"}, function(error, tweets, response) {
   //window.client.get(tweet, function(error, tweets, response) {
     
    //if there's no error
    if (!error) {
      
      //console.log(tweets)

      //getting the data formatted correctly
      var textTweets = JSON.stringify(tweets)
      var parsedTweets = JSON.parse(textTweets)

      //getting the amount returned
      var count = tweets.length
      
      //storing the screenNames that we get  
      for ( var i = 0; i < count; i++) {

        //console.log(parsedTweets[i]['user']['screen_name'])
        newNames.push(parsedTweets[i]['user']['screen_name'])
      }

      //callback
      callback && callback(newNames)
      
      //if there is an error
    } else {
      console.log("error is ")
      var errorText = error[0]
      console.log(errorText)
      alert(errorText['message'])
    }

  });
}


export function processNamesForDmReact(component, newNames, screenNames, callback) {
  //console.log(newNames)

  var namesToDM = []
  var screenNamesObjArray = []
  //removing all duplicate names from new names
  //for (name in newNames) {
  
  console.log("IN PROCESS")
  console.log(screenNames)
  console.log(newNames)
  if (newNames.length != 0) {
    for (var name = 0; name < newNames.length; name++) {
      //var obj = {name: newNames[name]}
      //if its not already included
      
      if (screenNames.indexOf(newNames[name]) == -1) {

        namesToDM.push(newNames[name])
        
        //screenNames will just have all of them, for dups checking
        screenNames.push(newNames[name])
        
        //sendDmForTable
        if (component.state.isSendingDMs) {
          setDelay(newNames[name])
        }
        
        var obj = component.state.isSendingDMs ? {name: newNames[name], status: '...'} : {name: newNames[name]}
        
         screenNamesObjArray.push(obj)
        
        console.log(" screenNamesObjArray IS")
        console.log( screenNamesObjArray, screenNames)
        
      }

    }
  }
  console.log("AFTER")
  console.log(screenNames)
  
  screenNames = screenNames.removeDuplicates()
  screenNamesObjArray = screenNamesObjArray.removeDuplicates()
  
  

  function setDelay(i) {
    setTimeout(function() {
      console.log(" screenNamesObjArray I is")
      console.log(i);
      sendDmForTable(i, component.DMText)
    }, 10000);
  }

  callback && callback(screenNamesObjArray, screenNames, namesToDM)
}




//creates a range of numbers
function range(start, edge, step) {
  // If only one number was passed in make it the edge and 0 the start.
  if (arguments.length == 1) {
    edge = start;
    start = 0;
  }

  // Validate the edge and step numbers.
  edge = edge || 0;
  step = step || 1;

  // Create the array of numbers, stopping befor the edge.
  for (var ret = []; (edge - start) * step > 0; start += step) {
    ret.push(start);
  }
  return ret;
}

//PROTOTYPES
String.prototype.insertAt=function(index, string) { 
  return this.substr(0, index) + string + this.substr(index);
}

Array.prototype.removeDuplicates = function () {
    return this.filter(function (item, index, self) {
        return self.indexOf(item) == index;
    });
};