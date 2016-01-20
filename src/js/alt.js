import chromeDebug from "alt-utils/lib/chromeDebug";
import {detectIsNode, detectIsDevUrl} from '../js/utils';

var Alt = require('alt');
var alt = new Alt();

if(!detectIsNode() && detectIsDevUrl()){
  Alt.debug = chromeDebug(alt);  
}

module.exports = alt;