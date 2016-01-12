import chromeDebug from "alt-utils/lib/chromeDebug";
var Alt = require('alt');
var alt = new Alt();

if(process.title == "browser" && location.hostname.indexOf("localhost") > -1){
  Alt.debug = chromeDebug(alt);  
}

module.exports = alt;