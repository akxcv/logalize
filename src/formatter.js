const Formatter = {
  format (args) {
    var formattedStrings = []
    var styles = []
    var formattedArgCount = 0
    var result

    for (let arg of args) {
      arg = this.formatObject(arg)
      if (typeof arg === 'undefined' || !arg[1].length) break
      formattedStrings.push(arg[0])
      styles.push(...arg[1])
      formattedArgCount += 1
    }

    args.splice(0, formattedArgCount)
    result = []
    if (formattedStrings.length) {
      result.push(formattedStrings.join(' '))
      result.push(...styles)
    }
    result.push(...args)
    return result
  },

  formatObject (obj) {
    if (typeof obj !== 'string') return
    return this.formatString(obj)
  },

  formatString (string) {
    var styles = []
    var classes

    while (this.canFormat(string)) {
      let match = this.getRelevantMatch(string)
      if (typeof match.format.classes === 'string') {
        classes = match.format.classes
      } else {
        classes = match.format.classes(match.match)
      }

      string = string.replace(match.format.regex, (_, m) => `%c${m}%c`)
      styles.push(this.computeStyle(classes))
      styles.push(this.computeStyle('default'))
    }

    return [string, styles]
  },

  canFormat (string) {
    for (let format of this.formats) {
      if (format.regex.test(string)) return true
    }
    return false
  },

  getRelevantMatch (string) {
    var matches = []
    for (let format of this.formats) {
      if (format.regex.test(string)) {
        matches.push({ match: string.match(format.regex), format })
      }
    }
    return matches.sort((a, b) => a.match.index - b.match.index)[0]
  },

  computeStyle (classes) {
    // Create a temporary div to compute styles
    var div = document.createElement('div')
    div.id = 'logalize'
    div.className = classes
    div.style = 'display: none;'

    // Append the div to the DOM and compute styles
    document.getElementsByTagName('body')[0].appendChild(div)
    const computedStyle = getComputedStyle(div)
    var styles = []

    for (let s of this.supportedStyles) {
      styles.push(`${s}:${computedStyle.getPropertyValue(s)}`)
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
      classes: (match) => match[2].split('.').join(' ')
    }
  ]
}

export default Formatter
