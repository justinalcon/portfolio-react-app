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