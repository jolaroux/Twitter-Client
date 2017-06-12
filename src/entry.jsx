// //css 
// require('../node_modules/nouislider/distribute/nouislider.min.css')
// require("../node_modules/nouislider/distribute/nouislider.min.js")
// require("../node_modules/animate.css/animate.min.css")
// require("./HTML and CSS/animateCSSCustom.css")


//need to import the react stuff
import React from 'react';
import ReactDOM from 'react-dom';
//importing styles
//import {Styles} from './HTML and CSS/styles.jsx'
// for saving data
//import {Store} from './Functions/Store.js'
//importing components
//import {ButtonMake, TabBarMake, InputBoxMake, InputAreaMake, TableMake,SelectRowWithTextBoxAndPlus, IndivDraftMake, SelectBox, IndivInputMake} from './Components/components.jsx'
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
const {dialog} = require('electron').remote
import Junk from 'junk'

// all the files
require("./HTML and CSS/styles.jsx")
require("./Functions/Store.js")
require("./Functions/script.js")
require("./Functions/functions.js")
require("./Components/components.jsx")
require("./App/index.jsx")
