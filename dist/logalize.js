!function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var r={};return e.m=t,e.c=r,e.i=function(t){return t},e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=5)}([function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={log:console.log,debug:console.debug,info:console.info,warn:console.warn,error:console.error,group:console.group,groupCollapsed:console.groupCollapsed,groupEnd:console.groupEnd,assert:console.assert,count:console.count,clear:console.clear,dir:console.dir,dirxml:console.dirxml,profile:console.profile,profileEnd:console.profileEnd,time:console.time,timeEnd:console.timeEnd,timeStamp:console.timeStamp,trace:console.trace};e.default=n},function(t,e,r){"use strict";function n(t,e){if(t.length!==e.length)return!1;var r=!0,a=!1,i=void 0;try{for(var l,u=t.entries()[Symbol.iterator]();!(r=(l=u.next()).done);r=!0){var c=l.value,s=o(c,2),f=s[0],d=s[1];if(d instanceof Array&&e[f]instanceof Array){if(!n(d,e[f]))return!1}else if(d!=e[f])return!1}}catch(t){a=!0,i=t}finally{try{!r&&u.return&&u.return()}finally{if(a)throw i}}return!0}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){var r=[],n=!0,o=!1,a=void 0;try{for(var i,l=t[Symbol.iterator]();!(n=(i=l.next()).done)&&(r.push(i.value),!e||r.length!==e);n=!0);}catch(t){o=!0,a=t}finally{try{!n&&l.return&&l.return()}finally{if(o)throw a}}return r}return function(e,r){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e.compareArrays=n},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t){if(Array.isArray(t)){for(var e=0,r=Array(t.length);e<t.length;e++)r[e]=t[e];return r}return Array.from(t)}function a(){for(var t=arguments.length,e=Array(t),r=0;r<t;r++)e[r]=arguments[r];a.print.apply(a,["log"].concat(e))}Object.defineProperty(e,"__esModule",{value:!0});var i=r(0),l=n(i),u=r(3),c=n(u),s=r(4),f=n(s);r(1);Object.assign(a,{init:function(){this.configure()},configure:function(){function t(t,e){return f.default.clear(),l.default[t].apply(l.default,o(e))}var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.enabled,n=void 0===r||r,a=e.enableFormatting,i=void 0===a||a,u=e.setupConsoleHooks,c=void 0===u||u;return Object.assign(this,{enabled:n,enableFormatting:i,setupConsoleHooks:c,formattableMethods:["log","info","debug","warn","error","focus"]}),this.setupConsoleHooks?(console.log=function(){t("log",arguments)},console.debug=function(){t("debug",arguments)},console.info=function(){t("info",arguments)},console.warn=function(){t("warn",arguments)},console.error=function(){t("error",arguments)},console.assert=function(){t("assert",arguments)},console.count=function(){t("count",arguments)},console.dir=function(){t("dir",arguments)},console.dirxml=function(){t("dirxml",arguments)},console.group=function(){t("group",arguments)},console.groupCollapsed=function(){t("groupCollapsed",arguments)},console.groupEnd=function(){t("groupEnd",arguments)},console.profile=function(){t("profile",arguments)},console.profileEnd=function(){t("profileEnd",arguments)},console.time=function(){t("time",arguments)},console.timeEnd=function(){t("timeEnd",arguments)},console.timeStamp=function(){t("timeStamp",arguments)},console.trace=function(){t("trace",arguments)},console.clear=function(){t("clear",arguments)}):(console.log=l.default.log,console.debug=l.default.debug,console.info=l.default.info,console.warn=l.default.warn,console.error=l.default.error,console.assert=l.default.assert,console.count=l.default.count,console.dir=l.default.dir,console.dirxml=l.default.dirxml,console.group=l.default.group,console.groupCollapsed=l.default.groupCollapsed,console.groupEnd=l.default.groupEnd,console.profile=l.default.profile,console.profileEnd=l.default.profileEnd,console.time=l.default.time,console.timeEnd=l.default.timeEnd,console.timeStamp=l.default.timeStamp,console.trace=l.default.trace,console.clear=l.default.clear),f.default.configure({loggingEnabled:this._isEnabled(),collapsed:this.collapseNamespaces}),this},namespace:function(){var t,e=f.default.setNamespace.apply(f.default,arguments);return"function"==(t=arguments.length-1,typeof(arguments.length<=t?void 0:arguments[t]))?e:this},log:function(){this.print.apply(this,["log"].concat(Array.prototype.slice.call(arguments)))},debug:function(){this.print.apply(this,["debug"].concat(Array.prototype.slice.call(arguments)))},info:function(){this.print.apply(this,["info"].concat(Array.prototype.slice.call(arguments)))},warn:function(){this.print.apply(this,["warn"].concat(Array.prototype.slice.call(arguments)))},error:function(){this.print.apply(this,["error"].concat(Array.prototype.slice.call(arguments)))},assert:function(){this.print.apply(this,["assert"].concat(Array.prototype.slice.call(arguments)))},count:function(t){this.print("count",t)},dir:function(t){this.print("dir",t)},dirxml:function(t){this.print("dirxml",t)},profile:function(){for(var t=arguments.length,e=Array(t),r=0;r<t;r++)e[r]=arguments[r];var n=e.pop();if("function"==typeof n){this._isEnabled()&&l.default.profile(e[0]);var o=n();return this._isEnabled()&&this.profileEnd(),o}this._isEnabled()&&l.default.profile(e[0])},profileEnd:function(){this._isEnabled()&&l.default.profileEnd()},time:function(){for(var t=arguments.length,e=Array(t),r=0;r<t;r++)e[r]=arguments[r];var n=e.pop();if("function"==typeof n){this._isEnabled()&&l.default.time(e[0]);var o=n();return this._isEnabled()&&this.timeEnd(e[0]),o}this._isEnabled()&&l.default.time(e[0])},timeEnd:function(t){this._isEnabled()&&l.default.timeEnd(t)},timeStamp:function(t){this._isEnabled()&&l.default.timeStamp(t)},trace:function(t){this.print("trace",t)},group:function(){for(var t=arguments.length,e=Array(t),r=0;r<t;r++)e[r]=arguments[r];var n=e.pop();if("function"==typeof n){this._isEnabled()&&l.default.group.apply(l.default,o(e));var a=n();return this._isEnabled()&&this.groupEnd(),a}this._isEnabled()&&l.default.group.apply(l.default,o(e).concat([n]))},groupCollapsed:function(){for(var t=arguments.length,e=Array(t),r=0;r<t;r++)e[r]=arguments[r];var n=e.pop();if("function"==typeof n){this._isEnabled()&&l.default.groupCollapsed.apply(l.default,o(e));var a=n();return this._isEnabled()&&this.groupEnd(),a}this._isEnabled()&&l.default.groupCollapsed.apply(l.default,o(e).concat([n]))},groupEnd:function(){this._isEnabled()&&l.default.groupEnd()},print:function(t){for(var e=arguments.length,r=Array(e>1?e-1:0),n=1;n<e;n++)r[n-1]=arguments[n];this._isEnabled()&&(this.formattableMethods.indexOf(t)>-1&&this.enableFormatting&&(r=c.default.format(r)),f.default.group(),l.default[t].apply(l.default,o(r)))},enable:function(){localStorage&&localStorage.setItem("logalizeEnabled","true"),f.default.configure({loggingEnabled:this._isEnabled()})},disable:function(){localStorage&&localStorage.setItem("logalizeEnabled","false"),f.default.configure({loggingEnabled:this._isEnabled()})},_isEnabled:function(){return localStorage&&localStorage.logalizeEnabled?"false"!==localStorage.logalizeEnabled:this.enabled}}),e.default=a},function(t,e,r){"use strict";function n(t){if(Array.isArray(t)){for(var e=0,r=Array(t.length);e<t.length;e++)r[e]=t[e];return r}return Array.from(t)}Object.defineProperty(e,"__esModule",{value:!0});var o={format:function(t){var e,r,o=[],a=[],i=0,l=!0,u=!1,c=void 0;try{for(var s,f=t[Symbol.iterator]();!(l=(s=f.next()).done);l=!0){var d=s.value;if(d=this.formatObject(d),"undefined"==typeof d||!d[1].length)break;o.push(d[0]),a.push.apply(a,n(d[1])),i+=1}}catch(t){u=!0,c=t}finally{try{!l&&f.return&&f.return()}finally{if(u)throw c}}if(t.splice(0,i),r=[],o.length){var p;r.push(o.join(" ")),(p=r).push.apply(p,a)}return(e=r).push.apply(e,n(t)),r},formatObject:function(t){if("string"==typeof t)return this.formatString(t)},formatString:function(t){for(var e,r=[];this.canFormat(t);){var n=this.getRelevantMatch(t);e="string"==typeof n.format.classes?n.format.classes:n.format.classes(n.match),t=t.replace(n.format.regex,function(t,e){return"%c"+e+"%c"}),r.push(this.computeStyle(e)),r.push(this.computeStyle("default"))}return[t,r]},canFormat:function(t){var e=!0,r=!1,n=void 0;try{for(var o,a=this.formats[Symbol.iterator]();!(e=(o=a.next()).done);e=!0){var i=o.value;if(i.regex.test(t))return!0}}catch(t){r=!0,n=t}finally{try{!e&&a.return&&a.return()}finally{if(r)throw n}}return!1},getRelevantMatch:function(t){var e=[],r=!0,n=!1,o=void 0;try{for(var a,i=this.formats[Symbol.iterator]();!(r=(a=i.next()).done);r=!0){var l=a.value;l.regex.test(t)&&e.push({match:t.match(l.regex),format:l})}}catch(t){n=!0,o=t}finally{try{!r&&i.return&&i.return()}finally{if(n)throw o}}return e.sort(function(t,e){return t.match.index-e.match.index})[0]},computeStyle:function(t){var e=document.createElement("div");e.id="logalize",e.className=t,e.style="display: none;",document.getElementsByTagName("body")[0].appendChild(e);var r=getComputedStyle(e),n=[],o=!0,a=!1,i=void 0;try{for(var l,u=this.supportedStyles[Symbol.iterator]();!(o=(l=u.next()).done);o=!0){var c=l.value;n.push(c+":"+r.getPropertyValue(c))}}catch(t){a=!0,i=t}finally{try{!o&&u.return&&u.return()}finally{if(a)throw i}}return n.join(";")},supportedStyles:["margin","color","background-color","border-radius","padding","font-weight","font-style","text-decoration"],formats:[{regex:/\*\*([^\*]+)\*\*/,classes:"bold"},{regex:/\*([^\*]+)\*/,classes:"italic"},{regex:/~([^~]+)~/,classes:"strikethrough"},{regex:/_([^_]+)_/,classes:"underline"},{regex:/\[([^\[\]]+)\](\.[\.\w]+)/,classes:function(t){return t[2].split(".").join(" ")}}]};e.default=o},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t){if(Array.isArray(t)){for(var e=0,r=Array(t.length);e<t.length;e++)r[e]=t[e];return r}return Array.from(t)}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){var r=[],n=!0,o=!1,a=void 0;try{for(var i,l=t[Symbol.iterator]();!(n=(i=l.next()).done)&&(r.push(i.value),!e||r.length!==e);n=!0);}catch(t){o=!0,a=t}finally{try{!n&&l.return&&l.return()}finally{if(o)throw a}}return r}return function(e,r){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),i=r(0),l=n(i),u=r(1),c={clojureStack:[],currentStack:[],previousStack:[],configure:function(t){Object.assign(this,t)},setNamespace:function(){for(var t=arguments.length,e=Array(t),r=0;r<t;r++)e[r]=arguments[r];if("function"==typeof e[e.length-1]){var n=e.pop();this.loggingEnabled&&this.clojureStack.push(e);var o=n();if(this.loggingEnabled){var a=this.clojureStack.pop();for(var i in a)this.previousStack.pop(),l.default.groupEnd()}return o}this.loggingEnabled&&this.currentStack.push(e)},group:function(){for(var t=[],e=[].concat(o(this.clojureStack),o(this.currentStack)),r=0;r<e.length;r++){var n=e[r];t.push.apply(t,o(n))}if(!(0,u.compareArrays)(this.previousStack,t)){var i=0,c=!0,s=!1,f=void 0;try{for(var d,p=this.previousStack.entries()[Symbol.iterator]();!(c=(d=p.next()).done);c=!0){var g=d.value,h=a(g,2),y=h[0],v=h[1];if(v!==t[y])break;i+=1}}catch(t){s=!0,f=t}finally{try{!c&&p.return&&p.return()}finally{if(s)throw f}}for(var m=this.previousStack.length-i,b=0;b<m;b++)l.default.groupEnd();var E=t.slice(i),S=!0,_=!1,x=void 0;try{for(var A,w=E[Symbol.iterator]();!(S=(A=w.next()).done);S=!0){var k=A.value;l.default[this._groupingMethod()](k)}}catch(t){_=!0,x=t}finally{try{!S&&w.return&&w.return()}finally{if(_)throw x}}}this.previousStack=t,this.currentStack=[]},clear:function(){for(var t in[].concat(o(this.clojureStack),o(this.currentStack)))l.default.groupEnd();this.previousStack=[]},_groupingMethod:function(){return this.collapsed?"groupCollapsed":"group"}};e.default=c},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var o=r(2),a=n(o);window.logalize=a.default,window.logalize.init()}]);