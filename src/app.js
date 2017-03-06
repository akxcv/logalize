import Logalize from './'
import stylesheet from './index.css'

var styleEl = document.createElement('style')
styleEl.innerHTML = stylesheet.toString()
document.head.insertBefore(styleEl, document.head.firstChild)

window.logalize = Logalize
window.logalize.init()
