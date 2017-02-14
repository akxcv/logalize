# Logalize

Logalize is a Javascript wrapper for browser's developer console. Its goal is to make debugging
easier.

[Rails gem](https://github.com/akxcv/logalize-rails)

## Motivation

The builtin developer console in modern browsers suffers from a number of problems. Here are some
of the big ones:

**There's no good way to turn logging on/off.**

Most of the time you don't want your clients to
see debugging output in their console on your production website. But, `console.log` does not
care if it runs in development or production, it's going to log anyway. This leads to developers
seldom using the console *or* writing `console.log` over and over again just to erase
it afterwards (...just to write it back again afterwards, and so on). Disabling the console
is still possible (e.x. `if (!debug) console.log = function () {}`), but it's not a good solution
if you use other console methods (which you should!). Also, imagine you want to be able to
see debugging output in production while normal website users don't see anything. What do you do?

Logalize solves this problem by introducing a flexible enable/disable mechanism. First of all, you
can enable or disable it during initialization: `logalize = new Logalize({ enabled: debug })`
(assuming that `debug` is `true` in development and `false` in production). But also, you can
enable or disable Logalize in your browser (`logalize.enable()` or `logalize.disable()`), which will
override the global `enabled` option. Thus, you can easily switch Logalize on/off in any environment,
and it will only affect *your* console.

See [initialization options](#initialization-options).

**`console.group` is a great idea, but it's not implemented well**

With [`console.group`](https://developers.google.com/web/tools/chrome-devtools/console/console-reference#group) you can split your output in foldable groups, which is a *very* good thing
to be able to do. However, a lot of JS these days is *asynchronous*, which is something you have
to constantly think about if you want to group your output.

Consider this simple scenario:

```js
async function f1() {
    console.group('group 1');
    console.log('function 1 start');
    await sleep(1000);
    console.log('function 1 end');
    console.groupEnd();
}

async function f2() {
    console.group('group 2');
    console.log('function 2 start');
    await sleep(500);
    console.log('function 2 end');
    console.groupEnd();
}

f1(); f2()
```

Result:

![Async and groups](/images/async_console_groups.png?raw=true)

Logalize solves this by creating a different implementation of groups. With Logalize, you can use
groups like this:

```js
logalize.group('my namespace').log('hello from my namespace')
/* or */
logalize.group('my namespace', function () {
  logalize.log('hello from my namespace')
  /* ... */
})
```

See [grouping](#grouping)

**`console.log` supports formatting with CSS, but it's not convenient**

`console` supports formatting with CSS rules:

```js
console.log('roses are %cred%c, violets are %cblue', 'color: red;', 'color: black;', 'color: blue;')
```

Result:

![Console formatting](/images/console_formatting.png?raw=true)

This is awesome, but really not convenient.

Logalize makes formatting much easier by introducing a markdown-like syntax. See [formatting](#formatting).

## Browser support

TBD

## Usage

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

- [`profile` and `profileEnd`](https://developers.google.com/web/tools/chrome-devtools/console/console-reference#profile)
as well as
[`time` and `timeEnd`](https://developers.google.com/web/tools/chrome-devtools/console/console-reference#time)
support lambda syntax:

```js
logalize.profile('profile1')
myVar = myFunction()
logalize.profileEnd()

/* is the same as */

myVar = logalize.profile('profile1', myFunction)
```

- `group` is described in [grouping](#grouping).

### Initialization options

```js
logalize = new Logalize({
  enabled: true,
  enableFormatting: true,
  collapseGroups: false,
  setupConsoleHooks: true
})
```
- `enabledByDefault`: Defines whether to enable or disable Logalize.
When Logalize is disabled, it will not produce any output. However, lambda versions of `profile`, `time` and `group` will still execute given functions. Default: `true`.
- `enableFormatting`: Defines whether [formatting](#formatting) should be enabled. Default: `true`.
- `collapseGroups`: Defines whether [groups](#grouping) should be
collapsed or not. Default: `false` (expanded).
- `setupConsoleHooks`: Defines whether Logalize needs to modify `console` upon initialization.
Generally, modifying global objects is a bad thing to do, but this is required if you want Logalize to
handle console output correctly. Logalize is modifying `console` functions *very carefully* (it just
needs to hook to those methods). You can safely disable this options, but regular console output
will occasionally get stuck inside groups it does not belong to. see [known issues](#known-issues). Default: `true`.

### Grouping

Groups in Logalize work a little different from console's groups. There are two ways to group the output.

```js
/* method 1 */
logalize.group('group one').log('inside group 1')

/* method 2 */
logalize.group('group one', function () {
  logalize.log('inside group 1')
})
```

You can easily mix methods together and nest groups however you want:

```js
logalize.group('user login', function () {
  logalize.info('user login started')
  logalize.group('credentials').log('credentials are [correct].green')
  /* code */
  logalize.info('[success].badge.green')
})

logalize.group('group 1').log('some more output')
logalize.group('group 1', 'another group!').log('still nested correctly')
```

Output:

![Group output](/images/group_output.png?raw=true)

When `document` is not in focus (e.g. your console is in focus), the output becomes:

![Inline group output](/images/inline_group_output.png?raw=true)

This behaviour is explained in [known issues](#known-issues).

### Formatting

Logalize supports Markdown-like string formatting. Here's the options:
- `**bold**`
- `*italic*`
- `~strikethrough~`
- `_underline_`
- `[custom text].classOne.classTwo...`. This syntax allows you to apply CSS classes to text in
square brackets. Available classes are: `badge`, `bold`, `italic`, `strikethrough`, `underline` and [color classes](#color-classes).

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
by modifying those functions (hence the `setupConsoleHooks` init parameter), but we cannot know when,
say, an error thrown with `throw` is going to appear in console. Groups are implemented in such a way that they don't get closed
until it's necessary, so that leads to console output being stuck inside groups it doesn't belong to.
Part of the problem is solved by modifying `console`, but another part is not solvable without a browser extension.
The best we can do is to detect whether or not `document` is in focus (with `document.hasFocus()`).
This enables us to change how groups work if `document` is not in focus (say, `console` is in focus).
However, some things (like `throw` or click on the "clear console" button) are simply not catchable.
So, **some output will inevitably get stuck in a group it doesn't belong**. Beware of this, especially when using `collapseGroups = true`.

- **Stack traces from `logalize.error` and `logalize.trace` contain unneeded information**.
Since `logalize.error` and `logalize.trace` call some functions under the hood, the stack trace produced
by those functions will contain several unneeded calls.

*All of this is according to the author's research. If you know a solution to this problem, you're
highly encouraged to open an issue and/or a pull request at [akxcv/logalize](https://github.com/akxcv/logalize).*

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/akxcv/logalize.

## License

The package is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

## TODO

- Support nested styles
- Log history
- Replace stylesheet with in-memory CSS?
- Focus mode (see only the logs you need **right now**)
- Custom styles in formatting (e.x. `[my text]{color: #434433;}`)
- Browser support
- Object and function formatting
