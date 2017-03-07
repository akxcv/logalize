import BrowserAdapter from './browserAdapter'
import { compareArrays } from './utils'

const NamespaceManager = {
  clojureStack: [],
  currentStack: [],
  previousStack: [],
  configure (configObject) {
    Object.assign(this, configObject)
    this.clear()
    this.currentStack = []
  },
  setNamespace (...args) {
    if (typeof args[args.length - 1] === 'function') {
      const func = args.pop()
      if (this.loggingEnabled) this.clojureStack.push(args)
      const returnValue = func()
      if (this.loggingEnabled) {
        const currentClojure = this.clojureStack.pop()
        currentClojure.forEach(() => {
          this.previousStack.pop()
          BrowserAdapter.groupEnd()
        })
      }
      return returnValue
    } else if (this.loggingEnabled) {
      this.currentStack.push(args)
    }
  },
  group () {
    var combinedStack = []
    for (let n of [...this.clojureStack, ...this.currentStack]) combinedStack.push(...n)
    if (!compareArrays(this.previousStack, combinedStack)) {
      var commonSize = 0
      for (let [i, val] of this.previousStack.entries()) {
        if (val === combinedStack[i]) {
          commonSize += 1
        } else {
          break
        }
      }

      const deleteSize = this.previousStack.length - commonSize
      for (let i = 0; i < deleteSize; i++) BrowserAdapter.groupEnd()

      const toAdd = combinedStack.slice(commonSize)
      for (let n of toAdd) BrowserAdapter[this._groupingMethod()](n)
    }
    this.previousStack = combinedStack
    this.currentStack = []
  },
  clear () {
    [
      ...this.clojureStack,
      ...this.currentStack,
      ...this.previousStack
    ].forEach(() => BrowserAdapter.groupEnd())
    this.previousStack = []
  },
  _groupingMethod () {
    return this.collapsed ? 'groupCollapsed' : 'group'
  }
}

export default NamespaceManager
