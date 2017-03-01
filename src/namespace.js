import BrowserAdapter from './browserAdapter'

class Namespace {
  constructor(...args) {
    this.stack = args || []
  }

  transitionInto (...namespaces) {
    var newStack = []
    for (let ns of namespaces) newStack.push(...ns.stack)
    var commonSize = 0

    for (let [i, val] of this.stack.entries()) {
      if (val === newStack[i]) commonSize += 1
    }
    const deleteSize = this.stack.length - commonSize

    for (let i = 0; i < deleteSize; i++) BrowserAdapter.groupEnd()
    const toAdd = newStack.slice(commonSize)
    for (let n of toAdd) BrowserAdapter.group(n)
    this.stack = newStack
  }

  close () {
    for (let n in this.stack) BrowserAdapter.groupEnd()
  }
}

export default Namespace
