var Formatter = {
  format: function (args) {
    var formattedStrings = []
    var styles = []
    var formattedArgCount = 0
    var result

    for (var i in args) {
      var arg = this.formatObject(args[i])
      if (typeof arg === 'undefined' || !arg[1].length) break
      formattedStrings.push(arg[0])
      styles.push.apply(styles, arg[1])
      formattedArgCount += 1
    }

    args.splice(0, formattedArgCount)
    result = []
    if (formattedStrings.length) {
      result.push(formattedStrings.join(' '))
      result.push.apply(result, styles)
    }
    result.push.apply(result, args)
    return result
  },

  formatObject: function (obj) {
    if (typeof obj !== 'string') return
    return this.formatString(obj)
  },

  formatString: function (string) {
    var styles = []
    var classes

    while (this.canFormat(string)) {
      var match = this.getRelevantMatch(string)
      if (typeof match.format.classes === 'string') {
        classes = match.format.classes
      } else {
        classes = match.format.classes(match.match)
      }

      string = string.replace(match.format.regex, function (_, m) { return '%c' + m + '%c' })
      styles.push(this.computeStyle(classes))
      styles.push(this.computeStyle('default'))
    }

    return [string, styles]
  },

  canFormat: function (string) {
    for (var i in this.formats) {
      if (this.formats[i].regex.test(string)) return true
    }
    return false
  },

  getRelevantMatch: function (string) {
    var matches = []
    for (var i in this.formats) {
      var format = this.formats[i]
      if (format.regex.test(string)) {
        matches.push({ match: string.match(format.regex), format: format })
      }
    }
    return matches.sort(function (a, b) {
      return a.match.index - b.match.index
    })[0]
  },

  computeStyle: function (classes) {
    // Create a temporary div to compute styles
    var div = document.createElement('div')
    div.id = 'crocon'
    div.className = classes
    div.style = 'display: none;'

    // Append the div to the DOM and compute styles
    document.getElementsByTagName('body')[0].appendChild(div)
    var computedStyle = getComputedStyle(div)
    var styles = []

    for (var i in this.supportedStyles) {
      var s = this.supportedStyles[i]
      styles.push(s + ':' + computedStyle.getPropertyValue(s))
    }

    return styles.join(';')
  },

  /* eslint-disable indent, no-useless-escape */
  supportedStyles: ['margin', 'color', 'background-color', 'border-radius', 'padding',
                    'font-weight', 'font-style', 'text-decoration'],

  formats: [{
      // **bold**
      regex: /\*\*([^\*]+)\*\*/,
      classes: 'bold'
    }, {
      // *italic*
      regex: /\*([^\*]+)\*/,
      classes: 'italic'
    }, {
      // ~strikethrough~
      regex: /~([^~]+)~/,
      classes: 'strikethrough'
    }, {
      // _underline_
      regex: /_([^_]+)_/,
      classes: 'underline'
    }, {
      // custom
      // [my text].class1.class2
      regex: /\[([^\[\]]+)\](\.[\.\w]+)/,
      classes: function (match) { return match[2].split('.').join(' ') }
    }
  ]
}

module.exports = Formatter
