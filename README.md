# Logalize

Logalize is a JavaScript wrapper for browser's developer console.

[Rails gem](https://github.com/akxcv/logalize-rails)

## Main features

- Easily enable/disable logging.
- [Namespaces](#namespaces).
- [Markdown-like formatting](#formatting).

## Usage

Enable or disable logging:
```js
// Disable logalize
logalize.configure({ enabled: false })
// Enable logalize only for yourself (writes to localStorage)
logalize.enable()
```

Methods that work exactly like their console's counterparts:

- [`assert`](https://developers.google.com/web/tools/chrome-devtools/console/console-reference#assert)
- [`count`](https://developers.google.com/web/tools/chrome-devtools/console/console-reference#count)
- [`debug`](https://developers.google.com/web/tools/chrome-devtools/console/console-reference#consoledebugobject_object)
[also supports formatting](#formatting)
- [`dir`](https://developers.google.com/web/tools/chrome-devtools/console/console-reference#dir)
- [`dirxml`](https://developers.google.com/web/tools/chrome-devtools/console/console-reference#consoledirxmlobject)
- [`error`](https://developers.google.com/web/tools/chrome-devtools/console/console-reference#error)
[also supports formatting](#formatting), see [known issues](#known-issues)
- [`info`](https://developers.google.com/web/tools/chrome-devtools/console/console-reference#consoleinfoobject_object) [also supports formatting](#formatting)
- [`log`](https://developers.google.com/web/tools/chrome-devtools/console/console-reference#log)
[also supports formatting](#formatting)
- [`timeStamp`](https://developers.google.com/web/tools/chrome-devtools/console/console-reference#timestamp)
- [`trace`](https://developers.google.com/web/tools/chrome-devtools/console/console-reference#trace)
see [known issues](#known-issues)
- [`warn`](https://developers.google.com/web/tools/chrome-devtools/console/console-reference#warn)
[also supports formatting](#formatting)

Also:

- [`group`, `groupCollapsed` and `groupEnd`](https://developers.google.com/web/tools/chrome-devtools/console/console-reference#profile),
[`profile` and `profileEnd`](https://developers.google.com/web/tools/chrome-devtools/console/console-reference#profile)
as well as
[`time` and `timeEnd`](https://developers.google.com/web/tools/chrome-devtools/console/console-reference#time)
support lambda syntax:

```js
logalize.group('group1')
myVar = myFunction()
logalize.groupEnd()

/* is the same as */

myVar = logalize.group('group1', myFunction)
```

Also:
```js
logalize('my output')
// is the same as:
logalize.log('my output')
```

### Configuration options

```js
logalize.configure({
  enabled: true,
  enableFormatting: true,
  enableConsoleHooks: true,
  collapseNamespaces: false
})
```
- `enabled`: Defines whether to enable or disable Logalize.
When Logalize is disabled, it will not produce any output. However, lambda versions of `profile`, `time`, `group` and `namespace`
will still execute given functions. Default: `true`.
- `enableFormatting`: Defines whether [formatting](#formatting) should be enabled. Default: `true`.
- `enableConsoleHooks`: Defines whether Logalize needs to modify `console`.
Generally, modifying global objects is a bad thing to do, but this is required if you want Logalize to
handle console output correctly. Logalize is modifying `console` functions *very carefully* (it just
needs to hook to those methods). You can safely disable this options, but regular console output
will occasionally get stuck inside groups it does not belong to. see [known issues](#known-issues). Default: `true`.
- `collapseNamespaces`: Defines whether [namespaces](#namespaces) should use `group` or `groupCollapsed` method.
Defaults to `false` (`group`).

### Namespaces

Namespaces are like groups but more convenient:

```js
/* method 1 */
logalize.namespace('namespace one').log('inside namespace 1')

/* method 2 */
val = logalize.namespace('namespace one', function () {
  logalize.log('inside namespace 1')
  return 'veryImportantValue'
})
```

You can easily mix methods together and nest namespaces however you want:

```js
logalize.namespace('user login', function () {
  logalize.info('user login started')
  logalize.namespace('credentials').log('credentials are {correct}.green')
  /* code */
  logalize.info('[success].green')
})

logalize.namespace('namespace 1').log('some more output')
logalize.namespace('namespace 1', 'another namespace!').log('still nested correctly')
```

Output:

![Namespace output](/images/namespace_output.png?raw=true)

### Formatting

Logalize supports Markdown-like string formatting. Here's the options:
- `**bold**`
- `*italic*`
- `~strikethrough~`
- `_underline_`
- `[badge text].classOne.classTwo...` (classes are optional)
- `{custom text}.classOne.classTwo...` (classes are required). This syntax allows you to apply CSS
classes to text in curly braces. Available classes are: `badge`, `bold`, `italic`, `strikethrough`, `underline` and [color classes](#color-classes).

At the moment, you cannot nest formatting options into each other.
Objects and functions are not formattable, but they likely will be in the future.

#### Color classes

Logalize supports following color classes (both for badges and normal text):
- `.blue`
- `.orange`
- `.red`
- `.green`
- `.cyan`
- `.purple`

#### Adding custom / overriding existing styles

All styles are declared in a stylesheet and thus are easily extensible.
See [`index.scss`](index.scss).
At the moment, only these attributes are supported: `margin`, `color`, `background-color`,
`border-radius`, `padding`, `font-weight`, `font-style`, `text-decoration`.

## Known issues

- **There's no way to detect when console output happens**. Development tools are separate from `window` and `document`,
and there is no way to know if the output is happening. We can detect things like `console.log`
by modifying those functions (hence the `enableConsoleHooks` init parameter), but we cannot know when,
say, an error thrown with `throw` is going to appear in console. Groups are implemented in such a way that they don't get closed
until it's necessary, so that leads to console output being stuck inside groups it doesn't belong to.
Part of the problem is solved by modifying `console`, but another part is not solvable without a browser extension.
So, **some output will inevitably get stuck in a group it doesn't belong**.

- **Stack traces from `logalize.error` and `logalize.trace` contain unneeded information**.
Since `logalize.error` and `logalize.trace` call some functions under the hood, the stack trace produced
by those functions will contain several unneeded calls.

*All of this is according to the author's research. If you know a solution to any of these problems, you're
highly encouraged to open an issue and/or a pull request at [akxcv/logalize](https://github.com/akxcv/logalize).*

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/akxcv/logalize.

## License

The package is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

## TODO

- Support nested formatting
- Log history
- Focus mode (see only the logs you need *right now*)
- Object and function formatting
