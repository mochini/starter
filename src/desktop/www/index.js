!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=6)}([function(e,n,t){e.exports=!t(5)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,n){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,n){var t=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=t)},function(e,n){var t=e.exports={version:"2.6.5"};"number"==typeof __e&&(__e=t)},function(e,n,t){var r=t(17),o=t(18),i=t(20),a=Object.defineProperty;n.f=t(0)?Object.defineProperty:function(e,n,t){if(r(e),n=i(n,!0),r(t),o)try{return a(e,n,t)}catch(e){}if("get"in t||"set"in t)throw TypeError("Accessors not supported!");return"value"in t&&(e[n]=t.value),e}},function(e,n){e.exports=function(e){try{return!!e()}catch(e){return!0}}},function(e,n,t){t(7),e.exports=t(24)},function(e,n,t){"use strict";var r=a(t(8)),o=a(t(9)),i=a(t(23));function a(e){return e&&e.__esModule?e:{default:e}}new(function(){function e(){(0,r.default)(this,e),this.store=null,this._handleReady=this._handleReady.bind(this),this.store=i.default.createInstance({name:"local",storeName:"electron"}),this._handleReady()}return(0,o.default)(e,[{key:"_handleReady",value:function(){var e=document.createElement("iframe");e.setAttribute("src","http://localhost:3000"),e.setAttribute("border",0),window.navigator.userAgent.match(/Windows/)&&document.getElementById("header").classList.add("hidden"),document.getElementById("body").appendChild(e)}}]),e}())},function(e,n,t){"use strict";n.__esModule=!0,n.default=function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}},function(e,n,t){"use strict";n.__esModule=!0;var r,o=t(10),i=(r=o)&&r.__esModule?r:{default:r};n.default=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,i.default)(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}()},function(e,n,t){e.exports={default:t(11),__esModule:!0}},function(e,n,t){t(12);var r=t(3).Object;e.exports=function(e,n,t){return r.defineProperty(e,n,t)}},function(e,n,t){var r=t(13);r(r.S+r.F*!t(0),"Object",{defineProperty:t(4).f})},function(e,n,t){var r=t(2),o=t(3),i=t(14),a=t(16),u=t(22),c=function(e,n,t){var f,s,l,d=e&c.F,v=e&c.G,h=e&c.S,p=e&c.P,y=e&c.B,b=e&c.W,m=v?o:o[n]||(o[n]={}),g=m.prototype,_=v?r:h?r[n]:(r[n]||{}).prototype;for(f in v&&(t=n),t)(s=!d&&_&&void 0!==_[f])&&u(m,f)||(l=s?_[f]:t[f],m[f]=v&&"function"!=typeof _[f]?t[f]:y&&s?i(l,r):b&&_[f]==l?function(e){var n=function(n,t,r){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(n);case 2:return new e(n,t)}return new e(n,t,r)}return e.apply(this,arguments)};return n.prototype=e.prototype,n}(l):p&&"function"==typeof l?i(Function.call,l):l,p&&((m.virtual||(m.virtual={}))[f]=l,e&c.R&&g&&!g[f]&&a(g,f,l)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,e.exports=c},function(e,n,t){var r=t(15);e.exports=function(e,n,t){if(r(e),void 0===n)return e;switch(t){case 1:return function(t){return e.call(n,t)};case 2:return function(t,r){return e.call(n,t,r)};case 3:return function(t,r,o){return e.call(n,t,r,o)}}return function(){return e.apply(n,arguments)}}},function(e,n){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,n,t){var r=t(4),o=t(21);e.exports=t(0)?function(e,n,t){return r.f(e,n,o(1,t))}:function(e,n,t){return e[n]=t,e}},function(e,n,t){var r=t(1);e.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e}},function(e,n,t){e.exports=!t(0)&&!t(5)(function(){return 7!=Object.defineProperty(t(19)("div"),"a",{get:function(){return 7}}).a})},function(e,n,t){var r=t(1),o=t(2).document,i=r(o)&&r(o.createElement);e.exports=function(e){return i?o.createElement(e):{}}},function(e,n,t){var r=t(1);e.exports=function(e,n){if(!r(e))return e;var t,o;if(n&&"function"==typeof(t=e.toString)&&!r(o=t.call(e)))return o;if("function"==typeof(t=e.valueOf)&&!r(o=t.call(e)))return o;if(!n&&"function"==typeof(t=e.toString)&&!r(o=t.call(e)))return o;throw TypeError("Can't convert object to primitive value")}},function(e,n){e.exports=function(e,n){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:n}}},function(e,n){var t={}.hasOwnProperty;e.exports=function(e,n){return t.call(e,n)}},function(e,n,t){var r;e.exports=function e(n,t,o){function i(u,c){if(!t[u]){if(!n[u]){var f="function"==typeof r&&r;if(!c&&f)return r(u,!0);if(a)return a(u,!0);var s=new Error("Cannot find module '"+u+"'");throw s.code="MODULE_NOT_FOUND",s}var l=t[u]={exports:{}};n[u][0].call(l.exports,function(e){var t=n[u][1][e];return i(t||e)},l,l.exports,e,n,t,o)}return t[u].exports}for(var a="function"==typeof r&&r,u=0;u<o.length;u++)i(o[u]);return i}({1:[function(e,n,t){(function(e){"use strict";var t,r,o=e.MutationObserver||e.WebKitMutationObserver;if(o){var i=0,a=new o(s),u=e.document.createTextNode("");a.observe(u,{characterData:!0}),t=function(){u.data=i=++i%2}}else if(e.setImmediate||void 0===e.MessageChannel)t="document"in e&&"onreadystatechange"in e.document.createElement("script")?function(){var n=e.document.createElement("script");n.onreadystatechange=function(){s(),n.onreadystatechange=null,n.parentNode.removeChild(n),n=null},e.document.documentElement.appendChild(n)}:function(){setTimeout(s,0)};else{var c=new e.MessageChannel;c.port1.onmessage=s,t=function(){c.port2.postMessage(0)}}var f=[];function s(){var e,n;r=!0;for(var t=f.length;t;){for(n=f,f=[],e=-1;++e<t;)n[e]();t=f.length}r=!1}n.exports=function(e){1!==f.push(e)||r||t()}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(e,n,t){"use strict";var r=e(1);function o(){}var i={},a=["REJECTED"],u=["FULFILLED"],c=["PENDING"];function f(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=c,this.queue=[],this.outcome=void 0,e!==o&&v(this,e)}function s(e,n,t){this.promise=e,"function"==typeof n&&(this.onFulfilled=n,this.callFulfilled=this.otherCallFulfilled),"function"==typeof t&&(this.onRejected=t,this.callRejected=this.otherCallRejected)}function l(e,n,t){r(function(){var r;try{r=n(t)}catch(n){return i.reject(e,n)}r===e?i.reject(e,new TypeError("Cannot resolve promise with itself")):i.resolve(e,r)})}function d(e){var n=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof n)return function(){n.apply(e,arguments)}}function v(e,n){var t=!1;function r(n){t||(t=!0,i.reject(e,n))}function o(n){t||(t=!0,i.resolve(e,n))}var a=h(function(){n(o,r)});"error"===a.status&&r(a.value)}function h(e,n){var t={};try{t.value=e(n),t.status="success"}catch(e){t.status="error",t.value=e}return t}n.exports=f,f.prototype.catch=function(e){return this.then(null,e)},f.prototype.then=function(e,n){if("function"!=typeof e&&this.state===u||"function"!=typeof n&&this.state===a)return this;var t=new this.constructor(o);if(this.state!==c){var r=this.state===u?e:n;l(t,r,this.outcome)}else this.queue.push(new s(t,e,n));return t},s.prototype.callFulfilled=function(e){i.resolve(this.promise,e)},s.prototype.otherCallFulfilled=function(e){l(this.promise,this.onFulfilled,e)},s.prototype.callRejected=function(e){i.reject(this.promise,e)},s.prototype.otherCallRejected=function(e){l(this.promise,this.onRejected,e)},i.resolve=function(e,n){var t=h(d,n);if("error"===t.status)return i.reject(e,t.value);var r=t.value;if(r)v(e,r);else{e.state=u,e.outcome=n;for(var o=-1,a=e.queue.length;++o<a;)e.queue[o].callFulfilled(n)}return e},i.reject=function(e,n){e.state=a,e.outcome=n;for(var t=-1,r=e.queue.length;++t<r;)e.queue[t].callRejected(n);return e},f.resolve=function(e){return e instanceof this?e:i.resolve(new this(o),e)},f.reject=function(e){var n=new this(o);return i.reject(n,e)},f.all=function(e){var n=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var t=e.length,r=!1;if(!t)return this.resolve([]);for(var a=new Array(t),u=0,c=-1,f=new this(o);++c<t;)s(e[c],c);return f;function s(e,o){n.resolve(e).then(function(e){a[o]=e,++u!==t||r||(r=!0,i.resolve(f,a))},function(e){r||(r=!0,i.reject(f,e))})}},f.race=function(e){var n=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var t=e.length,r=!1;if(!t)return this.resolve([]);for(var a,u=-1,c=new this(o);++u<t;)a=e[u],n.resolve(a).then(function(e){r||(r=!0,i.resolve(c,e))},function(e){r||(r=!0,i.reject(c,e))});return c}},{1:1}],3:[function(e,n,t){(function(n){"use strict";"function"!=typeof n.Promise&&(n.Promise=e(2))}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{2:2}],4:[function(e,n,t){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(){try{if("undefined"!=typeof indexedDB)return indexedDB;if("undefined"!=typeof webkitIndexedDB)return webkitIndexedDB;if("undefined"!=typeof mozIndexedDB)return mozIndexedDB;if("undefined"!=typeof OIndexedDB)return OIndexedDB;if("undefined"!=typeof msIndexedDB)return msIndexedDB}catch(e){return}}();function i(e,n){e=e||[],n=n||{};try{return new Blob(e,n)}catch(i){if("TypeError"!==i.name)throw i;for(var t="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder,r=new t,o=0;o<e.length;o+=1)r.append(e[o]);return r.getBlob(n.type)}}"undefined"==typeof Promise&&e(3);var a=Promise;function u(e,n){n&&e.then(function(e){n(null,e)},function(e){n(e)})}function c(e,n,t){"function"==typeof n&&e.then(n),"function"==typeof t&&e.catch(t)}function f(e){return"string"!=typeof e&&(console.warn(e+" used as a key, but it is not a string."),e=String(e)),e}function s(){if(arguments.length&&"function"==typeof arguments[arguments.length-1])return arguments[arguments.length-1]}var l="local-forage-detect-blob-support",d=void 0,v={},h=Object.prototype.toString,p="readonly",y="readwrite";function b(e){return"boolean"==typeof d?a.resolve(d):function(e){return new a(function(n){var t=e.transaction(l,y),r=i([""]);t.objectStore(l).put(r,"key"),t.onabort=function(e){e.preventDefault(),e.stopPropagation(),n(!1)},t.oncomplete=function(){var e=navigator.userAgent.match(/Chrome\/(\d+)/),t=navigator.userAgent.match(/Edge\//);n(t||!e||parseInt(e[1],10)>=43)}}).catch(function(){return!1})}(e).then(function(e){return d=e})}function m(e){var n=v[e.name],t={};t.promise=new a(function(e,n){t.resolve=e,t.reject=n}),n.deferredOperations.push(t),n.dbReady?n.dbReady=n.dbReady.then(function(){return t.promise}):n.dbReady=t.promise}function g(e){var n=v[e.name],t=n.deferredOperations.pop();if(t)return t.resolve(),t.promise}function _(e,n){var t=v[e.name],r=t.deferredOperations.pop();if(r)return r.reject(n),r.promise}function w(e,n){return new a(function(t,r){if(v[e.name]=v[e.name]||{forages:[],db:null,dbReady:null,deferredOperations:[]},e.db){if(!n)return t(e.db);m(e),e.db.close()}var i=[e.name];n&&i.push(e.version);var a=o.open.apply(o,i);n&&(a.onupgradeneeded=function(n){var t=a.result;try{t.createObjectStore(e.storeName),n.oldVersion<=1&&t.createObjectStore(l)}catch(t){if("ConstraintError"!==t.name)throw t;console.warn('The database "'+e.name+'" has been upgraded from version '+n.oldVersion+" to version "+n.newVersion+', but the storage "'+e.storeName+'" already exists.')}}),a.onerror=function(e){e.preventDefault(),r(a.error)},a.onsuccess=function(){t(a.result),g(e)}})}function I(e){return w(e,!1)}function S(e){return w(e,!0)}function E(e,n){if(!e.db)return!0;var t=!e.db.objectStoreNames.contains(e.storeName),r=e.version<e.db.version,o=e.version>e.db.version;if(r&&(e.version!==n&&console.warn('The database "'+e.name+"\" can't be downgraded from version "+e.db.version+" to version "+e.version+"."),e.version=e.db.version),o||t){if(t){var i=e.db.version+1;i>e.version&&(e.version=i)}return!0}return!1}function j(e){var n=function(e){for(var n=e.length,t=new ArrayBuffer(n),r=new Uint8Array(t),o=0;o<n;o++)r[o]=e.charCodeAt(o);return t}(atob(e.data));return i([n],{type:e.type})}function N(e){return e&&e.__local_forage_encoded_blob}function x(e){var n=this,t=n._initReady().then(function(){var e=v[n._dbInfo.name];if(e&&e.dbReady)return e.dbReady});return c(t,e,e),t}function O(e,n,t,r){void 0===r&&(r=1);try{var o=e.db.transaction(e.storeName,n);t(null,o)}catch(o){if(r>0&&(!e.db||"InvalidStateError"===o.name||"NotFoundError"===o.name))return a.resolve().then(function(){if(!e.db||"NotFoundError"===o.name&&!e.db.objectStoreNames.contains(e.storeName)&&e.version<=e.db.version)return e.db&&(e.version=e.db.version+1),S(e)}).then(function(){return function(e){m(e);for(var n=v[e.name],t=n.forages,r=0;r<t.length;r++){var o=t[r];o._dbInfo.db&&(o._dbInfo.db.close(),o._dbInfo.db=null)}return e.db=null,I(e).then(function(n){return e.db=n,E(e)?S(e):n}).then(function(r){e.db=n.db=r;for(var o=0;o<t.length;o++)t[o]._dbInfo.db=r}).catch(function(n){throw _(e,n),n})}(e).then(function(){O(e,n,t,r-1)})}).catch(t);t(o)}}var R={_driver:"asyncStorage",_initStorage:function(e){var n=this,t={db:null};if(e)for(var r in e)t[r]=e[r];var o=v[t.name];o||(o={forages:[],db:null,dbReady:null,deferredOperations:[]},v[t.name]=o),o.forages.push(n),n._initReady||(n._initReady=n.ready,n.ready=x);var i=[];function u(){return a.resolve()}for(var c=0;c<o.forages.length;c++){var f=o.forages[c];f!==n&&i.push(f._initReady().catch(u))}var s=o.forages.slice(0);return a.all(i).then(function(){return t.db=o.db,I(t)}).then(function(e){return t.db=e,E(t,n._defaultConfig.version)?S(t):e}).then(function(e){t.db=o.db=e,n._dbInfo=t;for(var r=0;r<s.length;r++){var i=s[r];i!==n&&(i._dbInfo.db=t.db,i._dbInfo.version=t.version)}})},_support:function(){try{if(!o)return!1;var e="undefined"!=typeof openDatabase&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),n="function"==typeof fetch&&-1!==fetch.toString().indexOf("[native code");return(!e||n)&&"undefined"!=typeof indexedDB&&"undefined"!=typeof IDBKeyRange}catch(e){return!1}}(),iterate:function(e,n){var t=this,r=new a(function(n,r){t.ready().then(function(){O(t._dbInfo,p,function(o,i){if(o)return r(o);try{var a=i.objectStore(t._dbInfo.storeName),u=a.openCursor(),c=1;u.onsuccess=function(){var t=u.result;if(t){var r=t.value;N(r)&&(r=j(r));var o=e(r,t.key,c++);void 0!==o?n(o):t.continue()}else n()},u.onerror=function(){r(u.error)}}catch(e){r(e)}})}).catch(r)});return u(r,n),r},getItem:function(e,n){var t=this;e=f(e);var r=new a(function(n,r){t.ready().then(function(){O(t._dbInfo,p,function(o,i){if(o)return r(o);try{var a=i.objectStore(t._dbInfo.storeName),u=a.get(e);u.onsuccess=function(){var e=u.result;void 0===e&&(e=null),N(e)&&(e=j(e)),n(e)},u.onerror=function(){r(u.error)}}catch(e){r(e)}})}).catch(r)});return u(r,n),r},setItem:function(e,n,t){var r=this;e=f(e);var o=new a(function(t,o){var i;r.ready().then(function(){return i=r._dbInfo,"[object Blob]"===h.call(n)?b(i.db).then(function(e){return e?n:(t=n,new a(function(e,n){var r=new FileReader;r.onerror=n,r.onloadend=function(n){var r=btoa(n.target.result||"");e({__local_forage_encoded_blob:!0,data:r,type:t.type})},r.readAsBinaryString(t)}));var t}):n}).then(function(n){O(r._dbInfo,y,function(i,a){if(i)return o(i);try{var u=a.objectStore(r._dbInfo.storeName);null===n&&(n=void 0);var c=u.put(n,e);a.oncomplete=function(){void 0===n&&(n=null),t(n)},a.onabort=a.onerror=function(){var e=c.error?c.error:c.transaction.error;o(e)}}catch(e){o(e)}})}).catch(o)});return u(o,t),o},removeItem:function(e,n){var t=this;e=f(e);var r=new a(function(n,r){t.ready().then(function(){O(t._dbInfo,y,function(o,i){if(o)return r(o);try{var a=i.objectStore(t._dbInfo.storeName),u=a.delete(e);i.oncomplete=function(){n()},i.onerror=function(){r(u.error)},i.onabort=function(){var e=u.error?u.error:u.transaction.error;r(e)}}catch(e){r(e)}})}).catch(r)});return u(r,n),r},clear:function(e){var n=this,t=new a(function(e,t){n.ready().then(function(){O(n._dbInfo,y,function(r,o){if(r)return t(r);try{var i=o.objectStore(n._dbInfo.storeName),a=i.clear();o.oncomplete=function(){e()},o.onabort=o.onerror=function(){var e=a.error?a.error:a.transaction.error;t(e)}}catch(e){t(e)}})}).catch(t)});return u(t,e),t},length:function(e){var n=this,t=new a(function(e,t){n.ready().then(function(){O(n._dbInfo,p,function(r,o){if(r)return t(r);try{var i=o.objectStore(n._dbInfo.storeName),a=i.count();a.onsuccess=function(){e(a.result)},a.onerror=function(){t(a.error)}}catch(e){t(e)}})}).catch(t)});return u(t,e),t},key:function(e,n){var t=this,r=new a(function(n,r){e<0?n(null):t.ready().then(function(){O(t._dbInfo,p,function(o,i){if(o)return r(o);try{var a=i.objectStore(t._dbInfo.storeName),u=!1,c=a.openCursor();c.onsuccess=function(){var t=c.result;t?0===e?n(t.key):u?n(t.key):(u=!0,t.advance(e)):n(null)},c.onerror=function(){r(c.error)}}catch(e){r(e)}})}).catch(r)});return u(r,n),r},keys:function(e){var n=this,t=new a(function(e,t){n.ready().then(function(){O(n._dbInfo,p,function(r,o){if(r)return t(r);try{var i=o.objectStore(n._dbInfo.storeName),a=i.openCursor(),u=[];a.onsuccess=function(){var n=a.result;n?(u.push(n.key),n.continue()):e(u)},a.onerror=function(){t(a.error)}}catch(e){t(e)}})}).catch(t)});return u(t,e),t},dropInstance:function(e,n){n=s.apply(this,arguments);var t,r=this.config();if((e="function"!=typeof e&&e||{}).name||(e.name=e.name||r.name,e.storeName=e.storeName||r.storeName),e.name){var i=e.name===r.name&&this._dbInfo.db,c=i?a.resolve(this._dbInfo.db):I(e).then(function(n){var t=v[e.name],r=t.forages;t.db=n;for(var o=0;o<r.length;o++)r[o]._dbInfo.db=n;return n});t=e.storeName?c.then(function(n){if(n.objectStoreNames.contains(e.storeName)){var t=n.version+1;m(e);var r=v[e.name],i=r.forages;n.close();for(var u=0;u<i.length;u++){var c=i[u];c._dbInfo.db=null,c._dbInfo.version=t}var f=new a(function(n,r){var i=o.open(e.name,t);i.onerror=function(e){var n=i.result;n.close(),r(e)},i.onupgradeneeded=function(){var n=i.result;n.deleteObjectStore(e.storeName)},i.onsuccess=function(){var e=i.result;e.close(),n(e)}});return f.then(function(e){r.db=e;for(var n=0;n<i.length;n++){var t=i[n];t._dbInfo.db=e,g(t._dbInfo)}}).catch(function(n){throw(_(e,n)||a.resolve()).catch(function(){}),n})}}):c.then(function(n){m(e);var t=v[e.name],r=t.forages;n.close();for(var i=0;i<r.length;i++){var u=r[i];u._dbInfo.db=null}var c=new a(function(n,t){var r=o.deleteDatabase(e.name);r.onerror=r.onblocked=function(e){var n=r.result;n&&n.close(),t(e)},r.onsuccess=function(){var e=r.result;e&&e.close(),n(e)}});return c.then(function(e){t.db=e;for(var n=0;n<r.length;n++){var o=r[n];g(o._dbInfo)}}).catch(function(n){throw(_(e,n)||a.resolve()).catch(function(){}),n})})}else t=a.reject("Invalid arguments");return u(t,n),t}},A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",D="~~local_forage_type~",B=/^~~local_forage_type~([^~]+)~/,T="__lfsc__:",k=T.length,C="arbf",M="blob",F="si08",P="ui08",L="uic8",z="si16",U="si32",W="ur16",q="ui32",G="fl32",H="fl64",Q=k+C.length,K=Object.prototype.toString;function X(e){var n,t,r,o,i,a=.75*e.length,u=e.length,c=0;"="===e[e.length-1]&&(a--,"="===e[e.length-2]&&a--);var f=new ArrayBuffer(a),s=new Uint8Array(f);for(n=0;n<u;n+=4)t=A.indexOf(e[n]),r=A.indexOf(e[n+1]),o=A.indexOf(e[n+2]),i=A.indexOf(e[n+3]),s[c++]=t<<2|r>>4,s[c++]=(15&r)<<4|o>>2,s[c++]=(3&o)<<6|63&i;return f}function J(e){var n,t=new Uint8Array(e),r="";for(n=0;n<t.length;n+=3)r+=A[t[n]>>2],r+=A[(3&t[n])<<4|t[n+1]>>4],r+=A[(15&t[n+1])<<2|t[n+2]>>6],r+=A[63&t[n+2]];return t.length%3==2?r=r.substring(0,r.length-1)+"=":t.length%3==1&&(r=r.substring(0,r.length-2)+"=="),r}var V={serialize:function(e,n){var t="";if(e&&(t=K.call(e)),e&&("[object ArrayBuffer]"===t||e.buffer&&"[object ArrayBuffer]"===K.call(e.buffer))){var r,o=T;e instanceof ArrayBuffer?(r=e,o+=C):(r=e.buffer,"[object Int8Array]"===t?o+=F:"[object Uint8Array]"===t?o+=P:"[object Uint8ClampedArray]"===t?o+=L:"[object Int16Array]"===t?o+=z:"[object Uint16Array]"===t?o+=W:"[object Int32Array]"===t?o+=U:"[object Uint32Array]"===t?o+=q:"[object Float32Array]"===t?o+=G:"[object Float64Array]"===t?o+=H:n(new Error("Failed to get type for BinaryArray"))),n(o+J(r))}else if("[object Blob]"===t){var i=new FileReader;i.onload=function(){var t=D+e.type+"~"+J(this.result);n(T+M+t)},i.readAsArrayBuffer(e)}else try{n(JSON.stringify(e))}catch(t){console.error("Couldn't convert value into a JSON string: ",e),n(null,t)}},deserialize:function(e){if(e.substring(0,k)!==T)return JSON.parse(e);var n,t=e.substring(Q),r=e.substring(k,Q);if(r===M&&B.test(t)){var o=t.match(B);n=o[1],t=t.substring(o[0].length)}var a=X(t);switch(r){case C:return a;case M:return i([a],{type:n});case F:return new Int8Array(a);case P:return new Uint8Array(a);case L:return new Uint8ClampedArray(a);case z:return new Int16Array(a);case W:return new Uint16Array(a);case U:return new Int32Array(a);case q:return new Uint32Array(a);case G:return new Float32Array(a);case H:return new Float64Array(a);default:throw new Error("Unkown type: "+r)}},stringToBuffer:X,bufferToString:J};function Y(e,n,t,r){e.executeSql("CREATE TABLE IF NOT EXISTS "+n.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],t,r)}function Z(e,n,t,r,o,i){e.executeSql(t,r,o,function(e,a){a.code===a.SYNTAX_ERR?e.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?",[n.storeName],function(e,u){u.rows.length?i(e,a):Y(e,n,function(){e.executeSql(t,r,o,i)},i)},i):i(e,a)},i)}var $={_driver:"webSQLStorage",_initStorage:function(e){var n=this,t={db:null};if(e)for(var r in e)t[r]="string"!=typeof e[r]?e[r].toString():e[r];var o=new a(function(e,r){try{t.db=openDatabase(t.name,String(t.version),t.description,t.size)}catch(e){return r(e)}t.db.transaction(function(o){Y(o,t,function(){n._dbInfo=t,e()},function(e,n){r(n)})},r)});return t.serializer=V,o},_support:"function"==typeof openDatabase,iterate:function(e,n){var t=this,r=new a(function(n,r){t.ready().then(function(){var o=t._dbInfo;o.db.transaction(function(t){Z(t,o,"SELECT * FROM "+o.storeName,[],function(t,r){for(var i=r.rows,a=i.length,u=0;u<a;u++){var c=i.item(u),f=c.value;if(f&&(f=o.serializer.deserialize(f)),void 0!==(f=e(f,c.key,u+1)))return void n(f)}n()},function(e,n){r(n)})})}).catch(r)});return u(r,n),r},getItem:function(e,n){var t=this;e=f(e);var r=new a(function(n,r){t.ready().then(function(){var o=t._dbInfo;o.db.transaction(function(t){Z(t,o,"SELECT * FROM "+o.storeName+" WHERE key = ? LIMIT 1",[e],function(e,t){var r=t.rows.length?t.rows.item(0).value:null;r&&(r=o.serializer.deserialize(r)),n(r)},function(e,n){r(n)})})}).catch(r)});return u(r,n),r},setItem:function(e,n,t){return function e(n,t,r,o){var i=this;n=f(n);var c=new a(function(a,u){i.ready().then(function(){void 0===t&&(t=null);var c=t,f=i._dbInfo;f.serializer.serialize(t,function(t,s){s?u(s):f.db.transaction(function(e){Z(e,f,"INSERT OR REPLACE INTO "+f.storeName+" (key, value) VALUES (?, ?)",[n,t],function(){a(c)},function(e,n){u(n)})},function(t){if(t.code===t.QUOTA_ERR){if(o>0)return void a(e.apply(i,[n,c,r,o-1]));u(t)}})})}).catch(u)});return u(c,r),c}.apply(this,[e,n,t,1])},removeItem:function(e,n){var t=this;e=f(e);var r=new a(function(n,r){t.ready().then(function(){var o=t._dbInfo;o.db.transaction(function(t){Z(t,o,"DELETE FROM "+o.storeName+" WHERE key = ?",[e],function(){n()},function(e,n){r(n)})})}).catch(r)});return u(r,n),r},clear:function(e){var n=this,t=new a(function(e,t){n.ready().then(function(){var r=n._dbInfo;r.db.transaction(function(n){Z(n,r,"DELETE FROM "+r.storeName,[],function(){e()},function(e,n){t(n)})})}).catch(t)});return u(t,e),t},length:function(e){var n=this,t=new a(function(e,t){n.ready().then(function(){var r=n._dbInfo;r.db.transaction(function(n){Z(n,r,"SELECT COUNT(key) as c FROM "+r.storeName,[],function(n,t){var r=t.rows.item(0).c;e(r)},function(e,n){t(n)})})}).catch(t)});return u(t,e),t},key:function(e,n){var t=this,r=new a(function(n,r){t.ready().then(function(){var o=t._dbInfo;o.db.transaction(function(t){Z(t,o,"SELECT key FROM "+o.storeName+" WHERE id = ? LIMIT 1",[e+1],function(e,t){var r=t.rows.length?t.rows.item(0).key:null;n(r)},function(e,n){r(n)})})}).catch(r)});return u(r,n),r},keys:function(e){var n=this,t=new a(function(e,t){n.ready().then(function(){var r=n._dbInfo;r.db.transaction(function(n){Z(n,r,"SELECT key FROM "+r.storeName,[],function(n,t){for(var r=[],o=0;o<t.rows.length;o++)r.push(t.rows.item(o).key);e(r)},function(e,n){t(n)})})}).catch(t)});return u(t,e),t},dropInstance:function(e,n){n=s.apply(this,arguments);var t=this.config();(e="function"!=typeof e&&e||{}).name||(e.name=e.name||t.name,e.storeName=e.storeName||t.storeName);var r,o=this;return u(r=e.name?new a(function(n){var r;r=e.name===t.name?o._dbInfo.db:openDatabase(e.name,"","",0),e.storeName?n({db:r,storeNames:[e.storeName]}):n(function(e){return new a(function(n,t){e.transaction(function(r){r.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",[],function(t,r){for(var o=[],i=0;i<r.rows.length;i++)o.push(r.rows.item(i).name);n({db:e,storeNames:o})},function(e,n){t(n)})},function(e){t(e)})})}(r))}).then(function(e){return new a(function(n,t){e.db.transaction(function(r){function o(e){return new a(function(n,t){r.executeSql("DROP TABLE IF EXISTS "+e,[],function(){n()},function(e,n){t(n)})})}for(var i=[],u=0,c=e.storeNames.length;u<c;u++)i.push(o(e.storeNames[u]));a.all(i).then(function(){n()}).catch(function(e){t(e)})},function(e){t(e)})})}):a.reject("Invalid arguments"),n),r}};function ee(e,n){var t=e.name+"/";return e.storeName!==n.storeName&&(t+=e.storeName+"/"),t}function ne(){return!function(){try{return localStorage.setItem("_localforage_support_test",!0),localStorage.removeItem("_localforage_support_test"),!1}catch(e){return!0}}()||localStorage.length>0}var te={_driver:"localStorageWrapper",_initStorage:function(e){var n={};if(e)for(var t in e)n[t]=e[t];return n.keyPrefix=ee(e,this._defaultConfig),ne()?(this._dbInfo=n,n.serializer=V,a.resolve()):a.reject()},_support:function(){try{return"undefined"!=typeof localStorage&&"setItem"in localStorage&&!!localStorage.setItem}catch(e){return!1}}(),iterate:function(e,n){var t=this,r=t.ready().then(function(){for(var n=t._dbInfo,r=n.keyPrefix,o=r.length,i=localStorage.length,a=1,u=0;u<i;u++){var c=localStorage.key(u);if(0===c.indexOf(r)){var f=localStorage.getItem(c);if(f&&(f=n.serializer.deserialize(f)),void 0!==(f=e(f,c.substring(o),a++)))return f}}});return u(r,n),r},getItem:function(e,n){var t=this;e=f(e);var r=t.ready().then(function(){var n=t._dbInfo,r=localStorage.getItem(n.keyPrefix+e);return r&&(r=n.serializer.deserialize(r)),r});return u(r,n),r},setItem:function(e,n,t){var r=this;e=f(e);var o=r.ready().then(function(){void 0===n&&(n=null);var t=n;return new a(function(o,i){var a=r._dbInfo;a.serializer.serialize(n,function(n,r){if(r)i(r);else try{localStorage.setItem(a.keyPrefix+e,n),o(t)}catch(e){"QuotaExceededError"!==e.name&&"NS_ERROR_DOM_QUOTA_REACHED"!==e.name||i(e),i(e)}})})});return u(o,t),o},removeItem:function(e,n){var t=this;e=f(e);var r=t.ready().then(function(){var n=t._dbInfo;localStorage.removeItem(n.keyPrefix+e)});return u(r,n),r},clear:function(e){var n=this,t=n.ready().then(function(){for(var e=n._dbInfo.keyPrefix,t=localStorage.length-1;t>=0;t--){var r=localStorage.key(t);0===r.indexOf(e)&&localStorage.removeItem(r)}});return u(t,e),t},length:function(e){var n=this.keys().then(function(e){return e.length});return u(n,e),n},key:function(e,n){var t=this,r=t.ready().then(function(){var n,r=t._dbInfo;try{n=localStorage.key(e)}catch(e){n=null}return n&&(n=n.substring(r.keyPrefix.length)),n});return u(r,n),r},keys:function(e){var n=this,t=n.ready().then(function(){for(var e=n._dbInfo,t=localStorage.length,r=[],o=0;o<t;o++){var i=localStorage.key(o);0===i.indexOf(e.keyPrefix)&&r.push(i.substring(e.keyPrefix.length))}return r});return u(t,e),t},dropInstance:function(e,n){if(n=s.apply(this,arguments),!(e="function"!=typeof e&&e||{}).name){var t=this.config();e.name=e.name||t.name,e.storeName=e.storeName||t.storeName}var r,o=this;return u(r=e.name?new a(function(n){e.storeName?n(ee(e,o._defaultConfig)):n(e.name+"/")}).then(function(e){for(var n=localStorage.length-1;n>=0;n--){var t=localStorage.key(n);0===t.indexOf(e)&&localStorage.removeItem(t)}}):a.reject("Invalid arguments"),n),r}},re=function(e,n){for(var t=e.length,r=0;r<t;){if((o=e[r])===(i=n)||"number"==typeof o&&"number"==typeof i&&isNaN(o)&&isNaN(i))return!0;r++}var o,i;return!1},oe=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},ie={},ae={},ue={INDEXEDDB:R,WEBSQL:$,LOCALSTORAGE:te},ce=[ue.INDEXEDDB._driver,ue.WEBSQL._driver,ue.LOCALSTORAGE._driver],fe=["dropInstance"],se=["clear","getItem","iterate","key","keys","length","removeItem","setItem"].concat(fe),le={description:"",driver:ce.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1};function de(e,n){e[n]=function(){var t=arguments;return e.ready().then(function(){return e[n].apply(e,t)})}}function ve(){for(var e=1;e<arguments.length;e++){var n=arguments[e];if(n)for(var t in n)n.hasOwnProperty(t)&&(oe(n[t])?arguments[0][t]=n[t].slice():arguments[0][t]=n[t])}return arguments[0]}var he=function(){function e(n){for(var t in function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),ue)if(ue.hasOwnProperty(t)){var r=ue[t],o=r._driver;this[t]=o,ie[o]||this.defineDriver(r)}this._defaultConfig=ve({},le),this._config=ve({},this._defaultConfig,n),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch(function(){})}return e.prototype.config=function(e){if("object"===(void 0===e?"undefined":r(e))){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var n in e){if("storeName"===n&&(e[n]=e[n].replace(/\W/g,"_")),"version"===n&&"number"!=typeof e[n])return new Error("Database version must be a number.");this._config[n]=e[n]}return!("driver"in e&&e.driver)||this.setDriver(this._config.driver)}return"string"==typeof e?this._config[e]:this._config},e.prototype.defineDriver=function(e,n,t){var r=new a(function(n,t){try{var r=e._driver,o=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");if(!e._driver)return void t(o);for(var i=se.concat("_initStorage"),c=0,f=i.length;c<f;c++){var s=i[c],l=!re(fe,s);if((l||e[s])&&"function"!=typeof e[s])return void t(o)}!function(){for(var n=function(e){return function(){var n=new Error("Method "+e+" is not implemented by the current driver"),t=a.reject(n);return u(t,arguments[arguments.length-1]),t}},t=0,r=fe.length;t<r;t++){var o=fe[t];e[o]||(e[o]=n(o))}}();var d=function(t){ie[r]&&console.info("Redefining LocalForage driver: "+r),ie[r]=e,ae[r]=t,n()};"_support"in e?e._support&&"function"==typeof e._support?e._support().then(d,t):d(!!e._support):d(!0)}catch(e){t(e)}});return c(r,n,t),r},e.prototype.driver=function(){return this._driver||null},e.prototype.getDriver=function(e,n,t){var r=ie[e]?a.resolve(ie[e]):a.reject(new Error("Driver not found."));return c(r,n,t),r},e.prototype.getSerializer=function(e){var n=a.resolve(V);return c(n,e),n},e.prototype.ready=function(e){var n=this,t=n._driverSet.then(function(){return null===n._ready&&(n._ready=n._initDriver()),n._ready});return c(t,e,e),t},e.prototype.setDriver=function(e,n,t){var r=this;oe(e)||(e=[e]);var o=this._getSupportedDrivers(e);function i(){r._config.driver=r.driver()}function u(e){return r._extend(e),i(),r._ready=r._initStorage(r._config),r._ready}var f=null!==this._driverSet?this._driverSet.catch(function(){return a.resolve()}):a.resolve();return this._driverSet=f.then(function(){var e=o[0];return r._dbInfo=null,r._ready=null,r.getDriver(e).then(function(e){r._driver=e._driver,i(),r._wrapLibraryMethodsWithReady(),r._initDriver=function(e){return function(){var n=0;return function t(){for(;n<e.length;){var o=e[n];return n++,r._dbInfo=null,r._ready=null,r.getDriver(o).then(u).catch(t)}i();var c=new Error("No available storage method found.");return r._driverSet=a.reject(c),r._driverSet}()}}(o)})}).catch(function(){i();var e=new Error("No available storage method found.");return r._driverSet=a.reject(e),r._driverSet}),c(this._driverSet,n,t),this._driverSet},e.prototype.supports=function(e){return!!ae[e]},e.prototype._extend=function(e){ve(this,e)},e.prototype._getSupportedDrivers=function(e){for(var n=[],t=0,r=e.length;t<r;t++){var o=e[t];this.supports(o)&&n.push(o)}return n},e.prototype._wrapLibraryMethodsWithReady=function(){for(var e=0,n=se.length;e<n;e++)de(this,se[e])},e.prototype.createInstance=function(n){return new e(n)},e}(),pe=new he;n.exports=pe},{3:3}]},{},[4])(4)},function(e,n,t){}]);