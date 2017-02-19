import BrowserAdapter from './browserAdapter'

var GroupManager = {
  currentStack: [],
  previousStack: [],
  globalStack: [],
  bindEvents () {
    window.addEventListener('blur', () => this.clear())
  },
  group (groupMethod, args, lambdaMode) {
    if (lambdaMode) {
      this.ungroup(false)
      this.globalStack.push(args)
    } else {
      this.currentStack = args
    }

    if (!document.hasFocus()) return

    if (lambdaMode) {
      for (let arg of args) BrowserAdapter[groupMethod](arg)
    } else {
      var commonGroupCount = 0

      for (let i in this.currentStack) {
        if (this.previousStack[i] === this.currentStack[i]) {
          commonGroupCount += 1
        }
      }
      var groupsToDeleteCount = this.previousStack.length - commonGroupCount

      for (let i = 0; i < groupsToDeleteCount; i++) BrowserAdapter.groupEnd()
      var groupsToAdd = this.currentStack.slice(commonGroupCount)
      for (let group of groupsToAdd) BrowserAdapter[groupMethod](group)
    }
  },
  ungroup (lambdaMode) {
    if (this.previousStack.length && !this.currentStack.length) {
      this.previousStack.forEach(() => BrowserAdapter.groupEnd())
    }
    if (lambdaMode) {
      var groups = this.globalStack.pop()
      groups.forEach(() => BrowserAdapter.groupEnd())
    }
    this.previousStack = this.currentStack
    this.currentStack = []
  },
  clear () {
    this.previousStack.forEach(() => BrowserAdapter.groupEnd())
    this.currentStack.forEach(() => BrowserAdapter.groupEnd())
    this.previousStack = []
  }
}

export default GroupManager
