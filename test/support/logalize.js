import Logalize from '../../src/'
import NamespaceManager from '../../src/namespaceManager'

Logalize._clear = function () {
  NamespaceManager.clojureStack = []
  NamespaceManager.currentStack = []
  NamespaceManager.previousStack = []
}

module.exports = Logalize
