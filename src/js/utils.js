export const ENDPOINT_URL = "http://localhost:3000";

/*
** Various detection functions
*/

export function detectIsNode() {
  return typeof window == "undefined"
}

export function detectIsDevUrl() {
  return location.hostname.indexOf("localhost") > -1
}

export function detectIsMobile() {
  if(detectIsNode()) {
    console.log("TRYING TO DETECT MOBILE ON SERVER-SIDE");
  } else {
    return window.innerWidth < 1024
  }
}

export function detectIsTouch() {
  if(detectIsNode()) {
    console.log("TRYING TO DETECT TOUCH ON SERVER-SIDE");
  } else {
    return navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)
  } 
}

/*
** Form validation
*/
export function validateEmail(string){
  var email_regex = new RegExp(/([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})/g);
  return string.match(email_regex) !== null;
}

/*
** Misc helper fns
*/
export function slugify(string) {
  return string.replace(/\s/g,'-').toLowerCase()
}

export function throttle(callback, limit) {
    var wait = false;                 // Initially, we're not waiting
    return function () {              // We return a throttled function
        if (!wait) {                  // If we're not waiting
            callback.call();          // Execute users function
            wait = true;              // Prevent future invocations
            setTimeout(function () {  // After a period of time
                wait = false;         // And allow future invocations
            }, limit);
        }
    }
}

/*
** Front-end fns to get/set cookies
*/
export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
export function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
export function killCookies(){
  document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
}
