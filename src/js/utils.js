export function detectIsNode() {
  return typeof window == "undefined"
}

export function detectIsDevUrl() {
  return location.hostname.indexOf("localhost") > -1
}

export function detectIsMobile() {
  if(detectIsNode) {
    console.log("TRYING TO DETECT ON SERVER-SIDE");
  } else {
    return window.innerWidth < 1024
  }
}