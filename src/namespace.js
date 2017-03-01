import BrowserAdapter from './browserAdapter'

class Namespace {
  constructor(...args) {
    this.stack = args || []
  }

  print (method, ...args) {
    BrowserAdapter[method](...args)
  }

  transitionInto (namespace) {
    var commonSize = 0

    for (let [i, val] of this.stack.entries()) {
      if (val === namespace.stack[i]) commonSize += 1
    }
    const deleteSize = this.stack.length - commonSize

    for (let i = 0; i < deleteSize; i++) BrowserAdapter.groupEnd()
    const toAdd = namespace.stack.slice(commonSize)
    for (let n of toAdd) BrowserAdapter.group(n)
  }

  close () {
    for (let n in this.stack) BrowserAdapter.groupEnd()
  }
}

export default Namespace
