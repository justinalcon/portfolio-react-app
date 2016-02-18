export const endpoint_url = "http://localhost:3000";

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