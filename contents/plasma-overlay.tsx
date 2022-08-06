import cssText from "data-text:~/contents/index.css"
import type { PlasmoContentScript } from "plasmo"

export const config: PlasmoContentScript = {
  matches: ["<all_urls>"],
  css: ["index.css"]
}

// Idea for an UI API, for popup, notification badge, or mounting UI
// Idea for static mount
// Idea for styling injection support (inline or with custom emotion cache)

// export const getStyle = () => {
//   const style = document.createElement("style")
//   style.textContent = cssText
//   return style
// }

const PlasmoOverlay = () => {
  return (
    <div className="floating-overlay" />
  )
}

export default PlasmoOverlay