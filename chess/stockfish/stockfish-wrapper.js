/* eslint-disable */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var require$$1 = require('react-dom');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var React__default = /*#__PURE__*/ _interopDefaultLegacy(React);
var require$$1__default = /*#__PURE__*/ _interopDefaultLegacy(require$$1);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

const ThemeContext = /*#__PURE__*/ React.createContext({
  theme: {
    board: 'green',
    pieces: 'neo',
    playSounds: true,
    sounds: 'robot',
    highlight: true,
    coordinates: true,
  },
  setTheme: () => {},
});

const Hydrate = ({ children }) => {
  return /*#__PURE__*/ React__default['default'].createElement(
    React__default['default'].Fragment,
    null,
    typeof window === 'undefined' ? null : children
  );
};

var commonjsGlobal =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
    ? global
    : typeof self !== 'undefined'
    ? self
    : {};

function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
  return (
    (module = {
      path: basedir,
      exports: {},
      require: function (path, base) {
        return commonjsRequire(path, base === undefined || base === null ? module.path : base);
      },
    }),
    fn(module, module.exports),
    module.exports
  );
}

function commonjsRequire() {
  throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var store2 = createCommonjsModule(function (module) {
  (function (window, define) {
    var _ = {
      version: '2.12.0',
      areas: {},
      apis: {},
      // utilities
      inherit: function (api, o) {
        for (var p in api) {
          if (!o.hasOwnProperty(p)) {
            Object.defineProperty(o, p, Object.getOwnPropertyDescriptor(api, p));
          }
        }
        return o;
      },
      stringify: function (d) {
        return d === undefined || typeof d === 'function' ? d + '' : JSON.stringify(d);
      },
      parse: function (s, fn) {
        // if it doesn't parse, return as is
        try {
          return JSON.parse(s, fn || _.revive);
        } catch (e) {
          return s;
        }
      },
      // extension hooks
      fn: function (name, fn) {
        _.storeAPI[name] = fn;
        for (var api in _.apis) {
          _.apis[api][name] = fn;
        }
      },
      get: function (area, key) {
        return area.getItem(key);
      },
      set: function (area, key, string) {
        area.setItem(key, string);
      },
      remove: function (area, key) {
        area.removeItem(key);
      },
      key: function (area, i) {
        return area.key(i);
      },
      length: function (area) {
        return area.length;
      },
      clear: function (area) {
        area.clear();
      },
      // core functions
      Store: function (id, area, namespace) {
        var store = _.inherit(_.storeAPI, function (key, data, overwrite) {
          if (arguments.length === 0) {
            return store.getAll();
          }
          if (typeof data === 'function') {
            return store.transact(key, data, overwrite);
          } // fn=data, alt=overwrite
          if (data !== undefined) {
            return store.set(key, data, overwrite);
          }
          if (typeof key === 'string' || typeof key === 'number') {
            return store.get(key);
          }
          if (typeof key === 'function') {
            return store.each(key);
          }
          if (!key) {
            return store.clear();
          }
          return store.setAll(key, data); // overwrite=data, data=key
        });
        store._id = id;
        try {
          var testKey = '__store2_test';
          area.setItem(testKey, 'ok');
          store._area = area;
          area.removeItem(testKey);
        } catch (e) {
          store._area = _.storage('fake');
        }
        store._ns = namespace || '';
        if (!_.areas[id]) {
          _.areas[id] = store._area;
        }
        if (!_.apis[store._ns + store._id]) {
          _.apis[store._ns + store._id] = store;
        }
        return store;
      },
      storeAPI: {
        // admin functions
        area: function (id, area) {
          var store = this[id];
          if (!store || !store.area) {
            store = _.Store(id, area, this._ns); //new area-specific api in this namespace
            if (!this[id]) {
              this[id] = store;
            }
          }
          return store;
        },
        namespace: function (namespace, singleArea) {
          if (!namespace) {
            return this._ns ? this._ns.substring(0, this._ns.length - 1) : '';
          }
          var ns = namespace,
            store = this[ns];
          if (!store || !store.namespace) {
            store = _.Store(this._id, this._area, this._ns + ns + '.'); //new namespaced api
            if (!this[ns]) {
              this[ns] = store;
            }
            if (!singleArea) {
              for (var name in _.areas) {
                store.area(name, _.areas[name]);
              }
            }
          }
          return store;
        },
        isFake: function () {
          return this._area.name === 'fake';
        },
        toString: function () {
          return 'store' + (this._ns ? '.' + this.namespace() : '') + '[' + this._id + ']';
        },
        // storage functions
        has: function (key) {
          if (this._area.has) {
            return this._area.has(this._in(key)); //extension hook
          }
          return !!(this._in(key) in this._area);
        },
        size: function () {
          return this.keys().length;
        },
        each: function (fn, fill) {
          // fill is used by keys(fillList) and getAll(fillList))
          for (var i = 0, m = _.length(this._area); i < m; i++) {
            var key = this._out(_.key(this._area, i));
            if (key !== undefined) {
              if (fn.call(this, key, this.get(key), fill) === false) {
                break;
              }
            }
            if (m > _.length(this._area)) {
              m--;
              i--;
            } // in case of removeItem
          }
          return fill || this;
        },
        keys: function (fillList) {
          return this.each(function (k, v, list) {
            list.push(k);
          }, fillList || []);
        },
        get: function (key, alt) {
          var s = _.get(this._area, this._in(key)),
            fn;
          if (typeof alt === 'function') {
            fn = alt;
            alt = null;
          }
          return s !== null ? _.parse(s, fn) : alt != null ? alt : s;
        },
        getAll: function (fillObj) {
          return this.each(function (k, v, all) {
            all[k] = v;
          }, fillObj || {});
        },
        transact: function (key, fn, alt) {
          var val = this.get(key, alt),
            ret = fn(val);
          this.set(key, ret === undefined ? val : ret);
          return this;
        },
        set: function (key, data, overwrite) {
          var d = this.get(key);
          if (d != null && overwrite === false) {
            return data;
          }
          return _.set(this._area, this._in(key), _.stringify(data), overwrite) || d;
        },
        setAll: function (data, overwrite) {
          var changed, val;
          for (var key in data) {
            val = data[key];
            if (this.set(key, val, overwrite) !== val) {
              changed = true;
            }
          }
          return changed;
        },
        add: function (key, data) {
          var d = this.get(key);
          if (d instanceof Array) {
            data = d.concat(data);
          } else if (d !== null) {
            var type = typeof d;
            if (type === typeof data && type === 'object') {
              for (var k in data) {
                d[k] = data[k];
              }
              data = d;
            } else {
              data = d + data;
            }
          }
          _.set(this._area, this._in(key), _.stringify(data));
          return data;
        },
        remove: function (key, alt) {
          var d = this.get(key, alt);
          _.remove(this._area, this._in(key));
          return d;
        },
        clear: function () {
          if (!this._ns) {
            _.clear(this._area);
          } else {
            this.each(function (k) {
              _.remove(this._area, this._in(k));
            }, 1);
          }
          return this;
        },
        clearAll: function () {
          var area = this._area;
          for (var id in _.areas) {
            if (_.areas.hasOwnProperty(id)) {
              this._area = _.areas[id];
              this.clear();
            }
          }
          this._area = area;
          return this;
        },
        // internal use functions
        _in: function (k) {
          if (typeof k !== 'string') {
            k = _.stringify(k);
          }
          return this._ns ? this._ns + k : k;
        },
        _out: function (k) {
          return this._ns
            ? k && k.indexOf(this._ns) === 0
              ? k.substring(this._ns.length)
              : undefined
            : // so each() knows to skip it
              k;
        },
      },
      // end _.storeAPI
      storage: function (name) {
        return _.inherit(_.storageAPI, {
          items: {},
          name: name,
        });
      },
      storageAPI: {
        length: 0,
        has: function (k) {
          return this.items.hasOwnProperty(k);
        },
        key: function (i) {
          var c = 0;
          for (var k in this.items) {
            if (this.has(k) && i === c++) {
              return k;
            }
          }
        },
        setItem: function (k, v) {
          if (!this.has(k)) {
            this.length++;
          }
          this.items[k] = v;
        },
        removeItem: function (k) {
          if (this.has(k)) {
            delete this.items[k];
            this.length--;
          }
        },
        getItem: function (k) {
          return this.has(k) ? this.items[k] : null;
        },
        clear: function () {
          for (var k in this.items) {
            this.removeItem(k);
          }
        },
      }, // end _.storageAPI
    };
    var store =
      // safely set this up (throws error in IE10/32bit mode for local files)
      _.Store(
        'local',
        (function () {
          try {
            return localStorage;
          } catch (e) {}
        })()
      );
    store.local = store; // for completeness
    store._ = _; // for extenders and debuggers...
    // safely setup store.session (throws exception in FF for file:/// urls)
    store.area(
      'session',
      (function () {
        try {
          return sessionStorage;
        } catch (e) {}
      })()
    );
    store.area('page', _.storage('page'));
    if (typeof define === 'function' && define.amd !== undefined) {
      define('store2', [], function () {
        return store;
      });
    } else if (module.exports) {
      module.exports = store;
    } else {
      // expose the primary store fn to the global object and save conflicts
      if (window.store) {
        _.conflict = window.store;
      }
      window.store = store;
    }
  })(commonjsGlobal, commonjsGlobal && commonjsGlobal.define);
});

const themable = () => {
  const theme = {
    board: 'green',
    pieces: 'cburnett',
    playSounds: true,
    sounds: 'robot',
    highlight: true,
    coordinates: true,
  };
  const cache = {
    board: store2.local.get('chessground.board'),
    pieces: store2.local.get('chessground.pieces'),
    playSounds: store2.local.get('chessground.playSounds'),
    sounds: store2.local.get('chessground.sounds'),
    highlight: store2.local.get('chessground.highlight'),
    coordinates: store2.local.get('chessground.coordinates'),
  };
  for (const key of Object.keys(cache)) {
    if (cache[key] !== null && cache[key] !== undefined) {
      theme[key] = cache[key];
    }
  }
  return theme;
};

const Theme = ({ children }) => {
  const [theme, setTheme] = React.useState(themable());
  return /*#__PURE__*/ React__default['default'].createElement(
    Hydrate,
    null,
    /*#__PURE__*/ React__default['default'].createElement(
      ThemeContext.Provider,
      {
        value: {
          theme,
          setTheme,
        },
      },
      children
    )
  );
};

function mergeClassNames() {
  return Array.prototype.slice
    .call(arguments)
    .reduce(function (classList, arg) {
      return classList.concat(arg);
    }, [])
    .filter(function (arg) {
      return typeof arg === 'string';
    })
    .join(' ');
}

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var b = 'function' === typeof Symbol && Symbol.for,
  c = b ? Symbol.for('react.element') : 60103,
  d = b ? Symbol.for('react.portal') : 60106,
  e = b ? Symbol.for('react.fragment') : 60107,
  f = b ? Symbol.for('react.strict_mode') : 60108,
  g = b ? Symbol.for('react.profiler') : 60114,
  h = b ? Symbol.for('react.provider') : 60109,
  k = b ? Symbol.for('react.context') : 60110,
  l = b ? Symbol.for('react.async_mode') : 60111,
  m = b ? Symbol.for('react.concurrent_mode') : 60111,
  n = b ? Symbol.for('react.forward_ref') : 60112,
  p = b ? Symbol.for('react.suspense') : 60113,
  q = b ? Symbol.for('react.suspense_list') : 60120,
  r = b ? Symbol.for('react.memo') : 60115,
  t = b ? Symbol.for('react.lazy') : 60116,
  v = b ? Symbol.for('react.block') : 60121,
  w = b ? Symbol.for('react.fundamental') : 60117,
  x = b ? Symbol.for('react.responder') : 60118,
  y = b ? Symbol.for('react.scope') : 60119;
function z(a) {
  if ('object' === typeof a && null !== a) {
    var u = a.$$typeof;
    switch (u) {
      case c:
        switch (((a = a.type), a)) {
          case l:
          case m:
          case e:
          case g:
          case f:
          case p:
            return a;
          default:
            switch (((a = a && a.$$typeof), a)) {
              case k:
              case n:
              case t:
              case r:
              case h:
                return a;
              default:
                return u;
            }
        }
      case d:
        return u;
    }
  }
}
function A(a) {
  return z(a) === m;
}
var AsyncMode = l;
var ConcurrentMode = m;
var ContextConsumer = k;
var ContextProvider = h;
var Element = c;
var ForwardRef = n;
var Fragment = e;
var Lazy = t;
var Memo = r;
var Portal = d;
var Profiler = g;
var StrictMode = f;
var Suspense = p;
var isAsyncMode = function (a) {
  return A(a) || z(a) === l;
};
var isConcurrentMode = A;
var isContextConsumer = function (a) {
  return z(a) === k;
};
var isContextProvider = function (a) {
  return z(a) === h;
};
var isElement = function (a) {
  return 'object' === typeof a && null !== a && a.$$typeof === c;
};
var isForwardRef = function (a) {
  return z(a) === n;
};
var isFragment = function (a) {
  return z(a) === e;
};
var isLazy = function (a) {
  return z(a) === t;
};
var isMemo = function (a) {
  return z(a) === r;
};
var isPortal = function (a) {
  return z(a) === d;
};
var isProfiler = function (a) {
  return z(a) === g;
};
var isStrictMode = function (a) {
  return z(a) === f;
};
var isSuspense = function (a) {
  return z(a) === p;
};
var isValidElementType = function (a) {
  return (
    'string' === typeof a ||
    'function' === typeof a ||
    a === e ||
    a === m ||
    a === g ||
    a === f ||
    a === p ||
    a === q ||
    ('object' === typeof a &&
      null !== a &&
      (a.$$typeof === t ||
        a.$$typeof === r ||
        a.$$typeof === h ||
        a.$$typeof === k ||
        a.$$typeof === n ||
        a.$$typeof === w ||
        a.$$typeof === x ||
        a.$$typeof === y ||
        a.$$typeof === v))
  );
};
var typeOf = z;

var reactIs_production_min = {
  AsyncMode: AsyncMode,
  ConcurrentMode: ConcurrentMode,
  ContextConsumer: ContextConsumer,
  ContextProvider: ContextProvider,
  Element: Element,
  ForwardRef: ForwardRef,
  Fragment: Fragment,
  Lazy: Lazy,
  Memo: Memo,
  Portal: Portal,
  Profiler: Profiler,
  StrictMode: StrictMode,
  Suspense: Suspense,
  isAsyncMode: isAsyncMode,
  isConcurrentMode: isConcurrentMode,
  isContextConsumer: isContextConsumer,
  isContextProvider: isContextProvider,
  isElement: isElement,
  isForwardRef: isForwardRef,
  isFragment: isFragment,
  isLazy: isLazy,
  isMemo: isMemo,
  isPortal: isPortal,
  isProfiler: isProfiler,
  isStrictMode: isStrictMode,
  isSuspense: isSuspense,
  isValidElementType: isValidElementType,
  typeOf: typeOf,
};

var reactIs_development = createCommonjsModule(function (module, exports) {
  if (process.env.NODE_ENV !== 'production') {
    (function () {
      // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
      // nor polyfill, then a plain number is used for performance.
      var hasSymbol = typeof Symbol === 'function' && Symbol.for;
      var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
      var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
      var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
      var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
      var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
      var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
      var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
      // (unstable) APIs that have been removed. Can we remove the symbols?

      var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
      var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
      var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
      var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
      var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
      var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
      var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
      var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
      var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
      var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
      var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;
      function isValidElementType(type) {
        return (
          typeof type === 'string' ||
          typeof type === 'function' ||
          // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
          type === REACT_FRAGMENT_TYPE ||
          type === REACT_CONCURRENT_MODE_TYPE ||
          type === REACT_PROFILER_TYPE ||
          type === REACT_STRICT_MODE_TYPE ||
          type === REACT_SUSPENSE_TYPE ||
          type === REACT_SUSPENSE_LIST_TYPE ||
          (typeof type === 'object' &&
            type !== null &&
            (type.$$typeof === REACT_LAZY_TYPE ||
              type.$$typeof === REACT_MEMO_TYPE ||
              type.$$typeof === REACT_PROVIDER_TYPE ||
              type.$$typeof === REACT_CONTEXT_TYPE ||
              type.$$typeof === REACT_FORWARD_REF_TYPE ||
              type.$$typeof === REACT_FUNDAMENTAL_TYPE ||
              type.$$typeof === REACT_RESPONDER_TYPE ||
              type.$$typeof === REACT_SCOPE_TYPE ||
              type.$$typeof === REACT_BLOCK_TYPE))
        );
      }
      function typeOf(object) {
        if (typeof object === 'object' && object !== null) {
          var $$typeof = object.$$typeof;
          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = object.type;
              switch (type) {
                case REACT_ASYNC_MODE_TYPE:
                case REACT_CONCURRENT_MODE_TYPE:
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                  return type;
                default:
                  var $$typeofType = type && type.$$typeof;
                  switch ($$typeofType) {
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_LAZY_TYPE:
                    case REACT_MEMO_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;
                    default:
                      return $$typeof;
                  }
              }
            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }
        return undefined;
      } // AsyncMode is deprecated along with isAsyncMode

      var AsyncMode = REACT_ASYNC_MODE_TYPE;
      var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
      var ContextConsumer = REACT_CONTEXT_TYPE;
      var ContextProvider = REACT_PROVIDER_TYPE;
      var Element = REACT_ELEMENT_TYPE;
      var ForwardRef = REACT_FORWARD_REF_TYPE;
      var Fragment = REACT_FRAGMENT_TYPE;
      var Lazy = REACT_LAZY_TYPE;
      var Memo = REACT_MEMO_TYPE;
      var Portal = REACT_PORTAL_TYPE;
      var Profiler = REACT_PROFILER_TYPE;
      var StrictMode = REACT_STRICT_MODE_TYPE;
      var Suspense = REACT_SUSPENSE_TYPE;
      var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

      function isAsyncMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

            console['warn'](
              'The ReactIs.isAsyncMode() alias has been deprecated, ' +
                'and will be removed in React 17+. Update your code to use ' +
                'ReactIs.isConcurrentMode() instead. It has the exact same API.'
            );
          }
        }
        return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
      }
      function isConcurrentMode(object) {
        return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
      }
      function isContextConsumer(object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
      }
      function isContextProvider(object) {
        return typeOf(object) === REACT_PROVIDER_TYPE;
      }
      function isElement(object) {
        return (
          typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE
        );
      }
      function isForwardRef(object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
      }
      function isFragment(object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
      }
      function isLazy(object) {
        return typeOf(object) === REACT_LAZY_TYPE;
      }
      function isMemo(object) {
        return typeOf(object) === REACT_MEMO_TYPE;
      }
      function isPortal(object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
      }
      function isProfiler(object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
      }
      function isStrictMode(object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
      }
      function isSuspense(object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
      }
      exports.AsyncMode = AsyncMode;
      exports.ConcurrentMode = ConcurrentMode;
      exports.ContextConsumer = ContextConsumer;
      exports.ContextProvider = ContextProvider;
      exports.Element = Element;
      exports.ForwardRef = ForwardRef;
      exports.Fragment = Fragment;
      exports.Lazy = Lazy;
      exports.Memo = Memo;
      exports.Portal = Portal;
      exports.Profiler = Profiler;
      exports.StrictMode = StrictMode;
      exports.Suspense = Suspense;
      exports.isAsyncMode = isAsyncMode;
      exports.isConcurrentMode = isConcurrentMode;
      exports.isContextConsumer = isContextConsumer;
      exports.isContextProvider = isContextProvider;
      exports.isElement = isElement;
      exports.isForwardRef = isForwardRef;
      exports.isFragment = isFragment;
      exports.isLazy = isLazy;
      exports.isMemo = isMemo;
      exports.isPortal = isPortal;
      exports.isProfiler = isProfiler;
      exports.isStrictMode = isStrictMode;
      exports.isSuspense = isSuspense;
      exports.isValidElementType = isValidElementType;
      exports.typeOf = typeOf;
    })();
  }
});

var reactIs = createCommonjsModule(function (module) {
  if (process.env.NODE_ENV === 'production') {
    module.exports = reactIs_production_min;
  } else {
    module.exports = reactIs_development;
  }
});

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }
  return Object(val);
}
function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    }

    // Detect buggy property enumeration order in older V8 versions.

    // https://bugs.chromium.org/p/v8/issues/detail?id=4118
    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
    test1[5] = 'de';
    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    }

    // https://bugs.chromium.org/p/v8/issues/detail?id=3056
    var test2 = {};
    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });
    if (order2.join('') !== '0123456789') {
      return false;
    }

    // https://bugs.chromium.org/p/v8/issues/detail?id=3056
    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });
    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }
    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}
var objectAssign = shouldUseNative()
  ? Object.assign
  : function (target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret$1 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;

var printWarning$1 = function () {};
if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);
  printWarning$1 = function (text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has$1(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') +
                ': ' +
                location +
                ' type `' +
                typeSpecName +
                '` is invalid; ' +
                'it must be a function, usually from the `prop-types` package, but received `' +
                typeof typeSpecs[typeSpecName] +
                '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](
            values,
            typeSpecName,
            componentName,
            location,
            null,
            ReactPropTypesSecret
          );
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning$1(
            (componentName || 'React class') +
              ': type specification of ' +
              location +
              ' `' +
              typeSpecName +
              '` is invalid; the type checker ' +
              'function must return `null` or an `Error` but returned a ' +
              typeof error +
              '. ' +
              'You may have forgotten to pass an argument to the type checker ' +
              'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
              'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;
          var stack = getStack ? getStack() : '';
          printWarning$1(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function () {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
};
var checkPropTypes_1 = checkPropTypes;

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function () {};
if (process.env.NODE_ENV !== 'production') {
  printWarning = function (text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}
function emptyFunctionThatReturnsNull() {
  return null;
}
var factoryWithTypeCheckers = function (isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn =
      maybeIterable &&
      ((ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL]) || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),
    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;
  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;
      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
              'Use `PropTypes.checkPropTypes()` to call them. ' +
              'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
                'function for the `' +
                propFullName +
                '` prop on `' +
                componentName +
                '`. This is deprecated ' +
                'and will throw in the standalone `prop-types` package. ' +
                'You may be seeing this warning due to a third-party PropTypes ' +
                'library. See https://fb.me/react-warning-dont-call-proptypes ' +
                'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError(
              'The ' +
                location +
                ' `' +
                propFullName +
                '` is marked as required ' +
                ('in `' + componentName + '`, but its value is `null`.')
            );
          }
          return new PropTypeError(
            'The ' +
              location +
              ' `' +
              propFullName +
              '` is marked as required in ' +
              ('`' + componentName + '`, but its value is `undefined`.')
          );
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }
    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
  }
  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type ' +
            ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') +
            ('`' + expectedType + '`.')
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }
  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError(
          'Property `' +
            propFullName +
            '` of component `' +
            componentName +
            '` has invalid PropType notation inside arrayOf.'
        );
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type ' +
            ('`' + propType + '` supplied to `' + componentName + '`, expected an array.')
        );
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(
          propValue,
          i,
          componentName,
          location,
          propFullName + '[' + i + ']',
          ReactPropTypesSecret_1
        );
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type ' +
            ('`' +
              propType +
              '` supplied to `' +
              componentName +
              '`, expected a single ReactElement.')
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!reactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type ' +
            ('`' +
              propType +
              '` supplied to `' +
              componentName +
              '`, expected a single ReactElement type.')
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type ' +
            ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') +
            ('instance of `' + expectedClassName + '`.')
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' +
              arguments.length +
              ' arguments. ' +
              'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }
      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError(
        'Invalid ' +
          location +
          ' `' +
          propFullName +
          '` of value `' +
          String(propValue) +
          '` ' +
          ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.')
      );
    }
    return createChainableTypeChecker(validate);
  }
  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError(
          'Property `' +
            propFullName +
            '` of component `' +
            componentName +
            '` has invalid PropType notation inside objectOf.'
        );
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type ' +
            ('`' + propType + '` supplied to `' + componentName + '`, expected an object.')
        );
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(
            propValue,
            key,
            componentName,
            location,
            propFullName + '.' + key,
            ReactPropTypesSecret_1
          );
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production'
        ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.')
        : void 0;
      return emptyFunctionThatReturnsNull;
    }
    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
            'received ' +
            getPostfixForTypeWarning(checker) +
            ' at index ' +
            i +
            '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }
    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (
          checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) ==
          null
        ) {
          return null;
        }
      }
      return new PropTypeError(
        'Invalid ' +
          location +
          ' `' +
          propFullName +
          '` supplied to ' +
          ('`' + componentName + '`.')
      );
    }
    return createChainableTypeChecker(validate);
  }
  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` supplied to ' +
            ('`' + componentName + '`, expected a ReactNode.')
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type `' +
            propType +
            '` ' +
            ('supplied to `' + componentName + '`, expected `object`.')
        );
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(
          propValue,
          key,
          componentName,
          location,
          propFullName + '.' + key,
          ReactPropTypesSecret_1
        );
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type `' +
            propType +
            '` ' +
            ('supplied to `' + componentName + '`, expected `object`.')
        );
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = objectAssign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' +
              location +
              ' `' +
              propFullName +
              '` key `' +
              key +
              '` supplied to `' +
              componentName +
              '`.' +
              '\nBad object: ' +
              JSON.stringify(props[propName], null, '  ') +
              '\nValid keys: ' +
              JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(
          propValue,
          key,
          componentName,
          location,
          propFullName + '.' + key,
          ReactPropTypesSecret_1
        );
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }
        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }
        return true;
      default:
        return false;
    }
  }
  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }
    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }
  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;
var factoryWithThrowingShims = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
        'Use PropTypes.checkPropTypes() to call them. ' +
        'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction,
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  if (process.env.NODE_ENV !== 'production') {
    var ReactIs = reactIs;

    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true;
    module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
  } else {
    // By explicitly using `prop-types` you are opting into new production behavior.
    // http://fb.me/prop-types-in-prod
    module.exports = factoryWithThrowingShims();
  }
});

const colors = ['white', 'black'];
const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];

const invRanks = [...ranks].reverse();
const allKeys = Array.prototype.concat(...files.map((c) => ranks.map((r) => c + r)));
const pos2key = (pos) => allKeys[8 * pos[0] + pos[1]];
const key2pos = (k) => [k.charCodeAt(0) - 97, k.charCodeAt(1) - 49];
const allPos = allKeys.map(key2pos);
function memo(f) {
  let v;
  const ret = () => {
    if (v === undefined) v = f();
    return v;
  };
  ret.clear = () => {
    v = undefined;
  };
  return ret;
}
const timer = () => {
  let startAt;
  return {
    start() {
      startAt = performance.now();
    },
    cancel() {
      startAt = undefined;
    },
    stop() {
      if (!startAt) return 0;
      const time = performance.now() - startAt;
      startAt = undefined;
      return time;
    },
  };
};
const opposite = (c) => (c === 'white' ? 'black' : 'white');
const distanceSq = (pos1, pos2) => {
  const dx = pos1[0] - pos2[0],
    dy = pos1[1] - pos2[1];
  return dx * dx + dy * dy;
};
const samePiece = (p1, p2) => p1.role === p2.role && p1.color === p2.color;
const posToTranslateBase = (pos, asWhite, xFactor, yFactor) => [
  (asWhite ? pos[0] : 7 - pos[0]) * xFactor,
  (asWhite ? 7 - pos[1] : pos[1]) * yFactor,
];
const posToTranslateAbs = (bounds) => {
  const xFactor = bounds.width / 8,
    yFactor = bounds.height / 8;
  return (pos, asWhite) => posToTranslateBase(pos, asWhite, xFactor, yFactor);
};
const posToTranslateRel = (pos, asWhite) => posToTranslateBase(pos, asWhite, 100, 100);
const translateAbs = (el, pos) => {
  el.style.transform = `translate(${pos[0]}px,${pos[1]}px)`;
};
const translateRel = (el, percents) => {
  el.style.transform = `translate(${percents[0]}%,${percents[1]}%)`;
};
const setVisible = (el, v) => {
  el.style.visibility = v ? 'visible' : 'hidden';
};
const eventPosition = (e) => {
  var _a;
  if (e.clientX || e.clientX === 0) return [e.clientX, e.clientY];
  if ((_a = e.targetTouches) === null || _a === void 0 ? void 0 : _a[0])
    return [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
  return; // touchend has no position!
};
const isRightButton = (e) => e.buttons === 2 || e.button === 2;
const createEl = (tagName, className) => {
  const el = document.createElement(tagName);
  if (className) el.className = className;
  return el;
};
function computeSquareCenter(key, asWhite, bounds) {
  const pos = key2pos(key);
  if (!asWhite) {
    pos[0] = 7 - pos[0];
    pos[1] = 7 - pos[1];
  }
  return [
    bounds.left + (bounds.width * pos[0]) / 8 + bounds.width / 16,
    bounds.top + (bounds.height * (7 - pos[1])) / 8 + bounds.height / 16,
  ];
}

function diff(a, b) {
  return Math.abs(a - b);
}
function pawn(color) {
  return (x1, y1, x2, y2) =>
    diff(x1, x2) < 2 &&
    (color === 'white'
      ? // allow 2 squares from first two ranks, for horde
        y2 === y1 + 1 || (y1 <= 1 && y2 === y1 + 2 && x1 === x2)
      : y2 === y1 - 1 || (y1 >= 6 && y2 === y1 - 2 && x1 === x2));
}
const knight = (x1, y1, x2, y2) => {
  const xd = diff(x1, x2);
  const yd = diff(y1, y2);
  return (xd === 1 && yd === 2) || (xd === 2 && yd === 1);
};
const bishop = (x1, y1, x2, y2) => {
  return diff(x1, x2) === diff(y1, y2);
};
const rook = (x1, y1, x2, y2) => {
  return x1 === x2 || y1 === y2;
};
const queen = (x1, y1, x2, y2) => {
  return bishop(x1, y1, x2, y2) || rook(x1, y1, x2, y2);
};
function king(color, rookFiles, canCastle) {
  return (x1, y1, x2, y2) =>
    (diff(x1, x2) < 2 && diff(y1, y2) < 2) ||
    (canCastle &&
      y1 === y2 &&
      y1 === (color === 'white' ? 0 : 7) &&
      ((x1 === 4 && ((x2 === 2 && rookFiles.includes(0)) || (x2 === 6 && rookFiles.includes(7)))) ||
        rookFiles.includes(x2)));
}
function rookFilesOf(pieces, color) {
  const backrank = color === 'white' ? '1' : '8';
  const files = [];
  for (const [key, piece] of pieces) {
    if (key[1] === backrank && piece.color === color && piece.role === 'rook') {
      files.push(key2pos(key)[0]);
    }
  }
  return files;
}
function premove(pieces, key, canCastle) {
  const piece = pieces.get(key);
  if (!piece) return [];
  const pos = key2pos(key),
    r = piece.role,
    mobility =
      r === 'pawn'
        ? pawn(piece.color)
        : r === 'knight'
        ? knight
        : r === 'bishop'
        ? bishop
        : r === 'rook'
        ? rook
        : r === 'queen'
        ? queen
        : king(piece.color, rookFilesOf(pieces, piece.color), canCastle);
  return allPos
    .filter(
      (pos2) =>
        (pos[0] !== pos2[0] || pos[1] !== pos2[1]) && mobility(pos[0], pos[1], pos2[0], pos2[1])
    )
    .map(pos2key);
}

function callUserFunction(f, ...args) {
  if (f) setTimeout(() => f(...args), 1);
}
function toggleOrientation(state) {
  state.orientation = opposite(state.orientation);
  state.animation.current = state.draggable.current = state.selected = undefined;
}
function setPieces(state, pieces) {
  for (const [key, piece] of pieces) {
    if (piece) state.pieces.set(key, piece);
    else state.pieces.delete(key);
  }
}
function setCheck(state, color) {
  state.check = undefined;
  if (color === true) color = state.turnColor;
  if (color)
    for (const [k, p] of state.pieces) {
      if (p.role === 'king' && p.color === color) {
        state.check = k;
      }
    }
}
function setPremove(state, orig, dest, meta) {
  unsetPredrop(state);
  state.premovable.current = [orig, dest];
  callUserFunction(state.premovable.events.set, orig, dest, meta);
}
function unsetPremove(state) {
  if (state.premovable.current) {
    state.premovable.current = undefined;
    callUserFunction(state.premovable.events.unset);
  }
}
function setPredrop(state, role, key) {
  unsetPremove(state);
  state.predroppable.current = {
    role,
    key,
  };
  callUserFunction(state.predroppable.events.set, role, key);
}
function unsetPredrop(state) {
  const pd = state.predroppable;
  if (pd.current) {
    pd.current = undefined;
    callUserFunction(pd.events.unset);
  }
}
function tryAutoCastle(state, orig, dest) {
  if (!state.autoCastle) return false;
  const king = state.pieces.get(orig);
  if (!king || king.role !== 'king') return false;
  const origPos = key2pos(orig);
  const destPos = key2pos(dest);
  if ((origPos[1] !== 0 && origPos[1] !== 7) || origPos[1] !== destPos[1]) return false;
  if (origPos[0] === 4 && !state.pieces.has(dest)) {
    if (destPos[0] === 6) dest = pos2key([7, destPos[1]]);
    else if (destPos[0] === 2) dest = pos2key([0, destPos[1]]);
  }
  const rook = state.pieces.get(dest);
  if (!rook || rook.color !== king.color || rook.role !== 'rook') return false;
  state.pieces.delete(orig);
  state.pieces.delete(dest);
  if (origPos[0] < destPos[0]) {
    state.pieces.set(pos2key([6, destPos[1]]), king);
    state.pieces.set(pos2key([5, destPos[1]]), rook);
  } else {
    state.pieces.set(pos2key([2, destPos[1]]), king);
    state.pieces.set(pos2key([3, destPos[1]]), rook);
  }
  return true;
}
function baseMove(state, orig, dest) {
  const origPiece = state.pieces.get(orig),
    destPiece = state.pieces.get(dest);
  if (orig === dest || !origPiece) return false;
  const captured = destPiece && destPiece.color !== origPiece.color ? destPiece : undefined;
  if (dest === state.selected) unselect(state);
  callUserFunction(state.events.move, orig, dest, captured);
  if (!tryAutoCastle(state, orig, dest)) {
    state.pieces.set(dest, origPiece);
    state.pieces.delete(orig);
  }
  state.lastMove = [orig, dest];
  state.check = undefined;
  callUserFunction(state.events.change);
  return captured || true;
}
function baseNewPiece(state, piece, key, force) {
  if (state.pieces.has(key)) {
    if (force) state.pieces.delete(key);
    else return false;
  }
  callUserFunction(state.events.dropNewPiece, piece, key);
  state.pieces.set(key, piece);
  state.lastMove = [key];
  state.check = undefined;
  callUserFunction(state.events.change);
  state.movable.dests = undefined;
  state.turnColor = opposite(state.turnColor);
  return true;
}
function baseUserMove(state, orig, dest) {
  const result = baseMove(state, orig, dest);
  if (result) {
    state.movable.dests = undefined;
    state.turnColor = opposite(state.turnColor);
    state.animation.current = undefined;
  }
  return result;
}
function userMove(state, orig, dest) {
  if (canMove(state, orig, dest)) {
    const result = baseUserMove(state, orig, dest);
    if (result) {
      const holdTime = state.hold.stop();
      unselect(state);
      const metadata = {
        premove: false,
        ctrlKey: state.stats.ctrlKey,
        holdTime,
      };
      if (result !== true) metadata.captured = result;
      callUserFunction(state.movable.events.after, orig, dest, metadata);
      return true;
    }
  } else if (canPremove(state, orig, dest)) {
    setPremove(state, orig, dest, {
      ctrlKey: state.stats.ctrlKey,
    });
    unselect(state);
    return true;
  }
  unselect(state);
  return false;
}
function dropNewPiece(state, orig, dest, force) {
  const piece = state.pieces.get(orig);
  if (piece && (canDrop(state, orig, dest) || force)) {
    state.pieces.delete(orig);
    baseNewPiece(state, piece, dest, force);
    callUserFunction(state.movable.events.afterNewPiece, piece.role, dest, {
      premove: false,
      predrop: false,
    });
  } else if (piece && canPredrop(state, orig, dest)) {
    setPredrop(state, piece.role, dest);
  } else {
    unsetPremove(state);
    unsetPredrop(state);
  }
  state.pieces.delete(orig);
  unselect(state);
}
function selectSquare(state, key, force) {
  callUserFunction(state.events.select, key);
  if (state.selected) {
    if (state.selected === key && !state.draggable.enabled) {
      unselect(state);
      state.hold.cancel();
      return;
    } else if ((state.selectable.enabled || force) && state.selected !== key) {
      if (userMove(state, state.selected, key)) {
        state.stats.dragged = false;
        return;
      }
    }
  }
  if (isMovable(state, key) || isPremovable(state, key)) {
    setSelected(state, key);
    state.hold.start();
  }
}
function setSelected(state, key) {
  state.selected = key;
  if (isPremovable(state, key)) {
    state.premovable.dests = premove(state.pieces, key, state.premovable.castle);
  } else state.premovable.dests = undefined;
}
function unselect(state) {
  state.selected = undefined;
  state.premovable.dests = undefined;
  state.hold.cancel();
}
function isMovable(state, orig) {
  const piece = state.pieces.get(orig);
  return (
    !!piece &&
    (state.movable.color === 'both' ||
      (state.movable.color === piece.color && state.turnColor === piece.color))
  );
}
function canMove(state, orig, dest) {
  var _a, _b;
  return (
    orig !== dest &&
    isMovable(state, orig) &&
    (state.movable.free ||
      !!((_b = (_a = state.movable.dests) === null || _a === void 0 ? void 0 : _a.get(orig)) ===
        null || _b === void 0
        ? void 0
        : _b.includes(dest)))
  );
}
function canDrop(state, orig, dest) {
  const piece = state.pieces.get(orig);
  return (
    !!piece &&
    (orig === dest || !state.pieces.has(dest)) &&
    (state.movable.color === 'both' ||
      (state.movable.color === piece.color && state.turnColor === piece.color))
  );
}
function isPremovable(state, orig) {
  const piece = state.pieces.get(orig);
  return (
    !!piece &&
    state.premovable.enabled &&
    state.movable.color === piece.color &&
    state.turnColor !== piece.color
  );
}
function canPremove(state, orig, dest) {
  return (
    orig !== dest &&
    isPremovable(state, orig) &&
    premove(state.pieces, orig, state.premovable.castle).includes(dest)
  );
}
function canPredrop(state, orig, dest) {
  const piece = state.pieces.get(orig);
  const destPiece = state.pieces.get(dest);
  return (
    !!piece &&
    (!destPiece || destPiece.color !== state.movable.color) &&
    state.predroppable.enabled &&
    (piece.role !== 'pawn' || (dest[1] !== '1' && dest[1] !== '8')) &&
    state.movable.color === piece.color &&
    state.turnColor !== piece.color
  );
}
function isDraggable(state, orig) {
  const piece = state.pieces.get(orig);
  return (
    !!piece &&
    state.draggable.enabled &&
    (state.movable.color === 'both' ||
      (state.movable.color === piece.color &&
        (state.turnColor === piece.color || state.premovable.enabled)))
  );
}
function playPremove(state) {
  const move = state.premovable.current;
  if (!move) return false;
  const orig = move[0],
    dest = move[1];
  let success = false;
  if (canMove(state, orig, dest)) {
    const result = baseUserMove(state, orig, dest);
    if (result) {
      const metadata = {
        premove: true,
      };
      if (result !== true) metadata.captured = result;
      callUserFunction(state.movable.events.after, orig, dest, metadata);
      success = true;
    }
  }
  unsetPremove(state);
  return success;
}
function playPredrop(state, validate) {
  const drop = state.predroppable.current;
  let success = false;
  if (!drop) return false;
  if (validate(drop)) {
    const piece = {
      role: drop.role,
      color: state.movable.color,
    };
    if (baseNewPiece(state, piece, drop.key)) {
      callUserFunction(state.movable.events.afterNewPiece, drop.role, drop.key, {
        premove: false,
        predrop: true,
      });
      success = true;
    }
  }
  unsetPredrop(state);
  return success;
}
function cancelMove(state) {
  unsetPremove(state);
  unsetPredrop(state);
  unselect(state);
}
function stop(state) {
  state.movable.color = state.movable.dests = state.animation.current = undefined;
  cancelMove(state);
}
function getKeyAtDomPos(pos, asWhite, bounds) {
  let file = Math.floor((8 * (pos[0] - bounds.left)) / bounds.width);
  if (!asWhite) file = 7 - file;
  let rank = 7 - Math.floor((8 * (pos[1] - bounds.top)) / bounds.height);
  if (!asWhite) rank = 7 - rank;
  return file >= 0 && file < 8 && rank >= 0 && rank < 8 ? pos2key([file, rank]) : undefined;
}
function getSnappedKeyAtDomPos(orig, pos, asWhite, bounds) {
  const origPos = key2pos(orig);
  const validSnapPos = allPos.filter((pos2) => {
    return (
      queen(origPos[0], origPos[1], pos2[0], pos2[1]) ||
      knight(origPos[0], origPos[1], pos2[0], pos2[1])
    );
  });
  const validSnapCenters = validSnapPos.map((pos2) =>
    computeSquareCenter(pos2key(pos2), asWhite, bounds)
  );
  const validSnapDistances = validSnapCenters.map((pos2) => distanceSq(pos, pos2));
  const [, closestSnapIndex] = validSnapDistances.reduce(
    (a, b, index) => (a[0] < b ? a : [b, index]),
    [validSnapDistances[0], 0]
  );
  return pos2key(validSnapPos[closestSnapIndex]);
}
function whitePov(s) {
  return s.orientation === 'white';
}

const initial = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
const roles = {
  p: 'pawn',
  r: 'rook',
  n: 'knight',
  b: 'bishop',
  q: 'queen',
  k: 'king',
};
const letters = {
  pawn: 'p',
  rook: 'r',
  knight: 'n',
  bishop: 'b',
  queen: 'q',
  king: 'k',
};
function read(fen) {
  if (fen === 'start') fen = initial;
  const pieces = new Map();
  let row = 7,
    col = 0;
  for (const c of fen) {
    switch (c) {
      case ' ':
        return pieces;
      case '/':
        --row;
        if (row < 0) return pieces;
        col = 0;
        break;
      case '~': {
        const piece = pieces.get(pos2key([col, row]));
        if (piece) piece.promoted = true;
        break;
      }
      default: {
        const nb = c.charCodeAt(0);
        if (nb < 57) col += nb - 48;
        else {
          const role = c.toLowerCase();
          pieces.set(pos2key([col, row]), {
            role: roles[role],
            color: c === role ? 'black' : 'white',
          });
          ++col;
        }
      }
    }
  }
  return pieces;
}
function write(pieces) {
  return invRanks
    .map((y) =>
      files
        .map((x) => {
          const piece = pieces.get(x + y);
          if (piece) {
            const letter = letters[piece.role];
            return piece.color === 'white' ? letter.toUpperCase() : letter;
          } else return '1';
        })
        .join('')
    )
    .join('/')
    .replace(/1{2,}/g, (s) => s.length.toString());
}

function configure(state, config) {
  var _a, _b;
  // don't merge destinations and autoShapes. Just override.
  if ((_a = config.movable) === null || _a === void 0 ? void 0 : _a.dests)
    state.movable.dests = undefined;
  if ((_b = config.drawable) === null || _b === void 0 ? void 0 : _b.autoShapes)
    state.drawable.autoShapes = [];
  merge(state, config);
  // if a fen was provided, replace the pieces
  if (config.fen) {
    state.pieces = read(config.fen);
    state.drawable.shapes = [];
  }
  // apply config values that could be undefined yet meaningful
  if ('check' in config) setCheck(state, config.check || false);
  if ('lastMove' in config && !config.lastMove) state.lastMove = undefined;
  // in case of ZH drop last move, there's a single square.
  // if the previous last move had two squares,
  // the merge algorithm will incorrectly keep the second square.
  else if (config.lastMove) state.lastMove = config.lastMove;
  // fix move/premove dests
  if (state.selected) setSelected(state, state.selected);
  // no need for such short animations
  if (!state.animation.duration || state.animation.duration < 100) state.animation.enabled = false;
  if (!state.movable.rookCastle && state.movable.dests) {
    const rank = state.movable.color === 'white' ? '1' : '8',
      kingStartPos = 'e' + rank,
      dests = state.movable.dests.get(kingStartPos),
      king = state.pieces.get(kingStartPos);
    if (!dests || !king || king.role !== 'king') return;
    state.movable.dests.set(
      kingStartPos,
      dests.filter(
        (d) =>
          !(d === 'a' + rank && dests.includes('c' + rank)) &&
          !(d === 'h' + rank && dests.includes('g' + rank))
      )
    );
  }
}
function merge(base, extend) {
  for (const key in extend) {
    if (isObject(base[key]) && isObject(extend[key])) merge(base[key], extend[key]);
    else base[key] = extend[key];
  }
}
function isObject(o) {
  return typeof o === 'object';
}

function anim(mutation, state) {
  return state.animation.enabled ? animate(mutation, state) : render$1(mutation, state);
}
function render$1(mutation, state) {
  const result = mutation(state);
  state.dom.redraw();
  return result;
}
function makePiece(key, piece) {
  return {
    key: key,
    pos: key2pos(key),
    piece: piece,
  };
}
function closer(piece, pieces) {
  return pieces.sort((p1, p2) => {
    return distanceSq(piece.pos, p1.pos) - distanceSq(piece.pos, p2.pos);
  })[0];
}
function computePlan(prevPieces, current) {
  const anims = new Map(),
    animedOrigs = [],
    fadings = new Map(),
    missings = [],
    news = [],
    prePieces = new Map();
  let curP, preP, vector;
  for (const [k, p] of prevPieces) {
    prePieces.set(k, makePiece(k, p));
  }
  for (const key of allKeys) {
    curP = current.pieces.get(key);
    preP = prePieces.get(key);
    if (curP) {
      if (preP) {
        if (!samePiece(curP, preP.piece)) {
          missings.push(preP);
          news.push(makePiece(key, curP));
        }
      } else news.push(makePiece(key, curP));
    } else if (preP) missings.push(preP);
  }
  for (const newP of news) {
    preP = closer(
      newP,
      missings.filter((p) => samePiece(newP.piece, p.piece))
    );
    if (preP) {
      vector = [preP.pos[0] - newP.pos[0], preP.pos[1] - newP.pos[1]];
      anims.set(newP.key, vector.concat(vector));
      animedOrigs.push(preP.key);
    }
  }
  for (const p of missings) {
    if (!animedOrigs.includes(p.key)) fadings.set(p.key, p.piece);
  }
  return {
    anims: anims,
    fadings: fadings,
  };
}
function step(state, now) {
  const cur = state.animation.current;
  if (cur === undefined) {
    // animation was canceled :(
    if (!state.dom.destroyed) state.dom.redrawNow();
    return;
  }
  const rest = 1 - (now - cur.start) * cur.frequency;
  if (rest <= 0) {
    state.animation.current = undefined;
    state.dom.redrawNow();
  } else {
    const ease = easing(rest);
    for (const cfg of cur.plan.anims.values()) {
      cfg[2] = cfg[0] * ease;
      cfg[3] = cfg[1] * ease;
    }
    state.dom.redrawNow(true); // optimisation: don't render SVG changes during animations
    requestAnimationFrame((now = performance.now()) => step(state, now));
  }
}
function animate(mutation, state) {
  // clone state before mutating it
  const prevPieces = new Map(state.pieces);
  const result = mutation(state);
  const plan = computePlan(prevPieces, state);
  if (plan.anims.size || plan.fadings.size) {
    const alreadyRunning = state.animation.current && state.animation.current.start;
    state.animation.current = {
      start: performance.now(),
      frequency: 1 / state.animation.duration,
      plan: plan,
    };
    if (!alreadyRunning) step(state, performance.now());
  } else {
    // don't animate, just render right away
    state.dom.redraw();
  }
  return result;
}
// https://gist.github.com/gre/1650294
function easing(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

const brushes = ['green', 'red', 'blue', 'yellow'];
function start$2(state, e) {
  // support one finger touch only
  if (e.touches && e.touches.length > 1) return;
  e.stopPropagation();
  e.preventDefault();
  e.ctrlKey ? unselect(state) : cancelMove(state);
  const pos = eventPosition(e),
    orig = getKeyAtDomPos(pos, whitePov(state), state.dom.bounds());
  if (!orig) return;
  state.drawable.current = {
    orig,
    pos,
    brush: eventBrush(e),
    snapToValidMove: state.drawable.defaultSnapToValidMove,
  };
  processDraw(state);
}
function processDraw(state) {
  requestAnimationFrame(() => {
    const cur = state.drawable.current;
    if (cur) {
      const keyAtDomPos = getKeyAtDomPos(cur.pos, whitePov(state), state.dom.bounds());
      if (!keyAtDomPos) {
        cur.snapToValidMove = false;
      }
      const mouseSq = cur.snapToValidMove
        ? getSnappedKeyAtDomPos(cur.orig, cur.pos, whitePov(state), state.dom.bounds())
        : keyAtDomPos;
      if (mouseSq !== cur.mouseSq) {
        cur.mouseSq = mouseSq;
        cur.dest = mouseSq !== cur.orig ? mouseSq : undefined;
        state.dom.redrawNow();
      }
      processDraw(state);
    }
  });
}
function move$1(state, e) {
  if (state.drawable.current) state.drawable.current.pos = eventPosition(e);
}
function end$1(state) {
  const cur = state.drawable.current;
  if (cur) {
    if (cur.mouseSq) addShape(state.drawable, cur);
    cancel$1(state);
  }
}
function cancel$1(state) {
  if (state.drawable.current) {
    state.drawable.current = undefined;
    state.dom.redraw();
  }
}
function clear(state) {
  if (state.drawable.shapes.length) {
    state.drawable.shapes = [];
    state.dom.redraw();
    onChange(state.drawable);
  }
}
function eventBrush(e) {
  var _a;
  const modA = (e.shiftKey || e.ctrlKey) && isRightButton(e);
  const modB =
    e.altKey ||
    e.metaKey ||
    ((_a = e.getModifierState) === null || _a === void 0 ? void 0 : _a.call(e, 'AltGraph'));
  return brushes[(modA ? 1 : 0) + (modB ? 2 : 0)];
}
function addShape(drawable, cur) {
  const sameShape = (s) => s.orig === cur.orig && s.dest === cur.dest;
  const similar = drawable.shapes.find(sameShape);
  if (similar) drawable.shapes = drawable.shapes.filter((s) => !sameShape(s));
  if (!similar || similar.brush !== cur.brush) drawable.shapes.push(cur);
  onChange(drawable);
}
function onChange(drawable) {
  if (drawable.onChange) drawable.onChange(drawable.shapes);
}

function start$1(s, e) {
  if (!e.isTrusted || (e.button !== undefined && e.button !== 0)) return; // only touch or left click
  if (e.touches && e.touches.length > 1) return; // support one finger touch only
  const bounds = s.dom.bounds(),
    position = eventPosition(e),
    orig = getKeyAtDomPos(position, whitePov(s), bounds);
  if (!orig) return;
  const piece = s.pieces.get(orig);
  const previouslySelected = s.selected;
  if (
    !previouslySelected &&
    s.drawable.enabled &&
    (s.drawable.eraseOnClick || !piece || piece.color !== s.turnColor)
  )
    clear(s);
  // Prevent touch scroll and create no corresponding mouse event, if there
  // is an intent to interact with the board. If no color is movable
  // (and the board is not for viewing only), touches are likely intended to
  // select squares.
  if (
    e.cancelable !== false &&
    (!e.touches || !s.movable.color || piece || previouslySelected || pieceCloseTo(s, position))
  )
    e.preventDefault();
  const hadPremove = !!s.premovable.current;
  const hadPredrop = !!s.predroppable.current;
  s.stats.ctrlKey = e.ctrlKey;
  if (s.selected && canMove(s, s.selected, orig)) {
    anim((state) => selectSquare(state, orig), s);
  } else {
    selectSquare(s, orig);
  }
  const stillSelected = s.selected === orig;
  const element = pieceElementByKey(s, orig);
  if (piece && element && stillSelected && isDraggable(s, orig)) {
    s.draggable.current = {
      orig,
      piece,
      origPos: position,
      pos: position,
      started: s.draggable.autoDistance && s.stats.dragged,
      element,
      previouslySelected,
      originTarget: e.target,
    };
    element.cgDragging = true;
    element.classList.add('dragging');
    // place ghost
    const ghost = s.dom.elements.ghost;
    if (ghost) {
      ghost.className = `ghost ${piece.color} ${piece.role}`;
      translateAbs(ghost, posToTranslateAbs(bounds)(key2pos(orig), whitePov(s)));
      setVisible(ghost, true);
    }
    processDrag(s);
  } else {
    if (hadPremove) unsetPremove(s);
    if (hadPredrop) unsetPredrop(s);
  }
  s.dom.redraw();
}
function pieceCloseTo(s, pos) {
  const asWhite = whitePov(s),
    bounds = s.dom.bounds(),
    radiusSq = Math.pow(bounds.width / 8, 2);
  for (const key in s.pieces) {
    const center = computeSquareCenter(key, asWhite, bounds);
    if (distanceSq(center, pos) <= radiusSq) return true;
  }
  return false;
}
function dragNewPiece(s, piece, e, force) {
  const key = 'a0';
  s.pieces.set(key, piece);
  s.dom.redraw();
  const position = eventPosition(e);
  s.draggable.current = {
    orig: key,
    piece,
    origPos: position,
    pos: position,
    started: true,
    element: () => pieceElementByKey(s, key),
    originTarget: e.target,
    newPiece: true,
    force: !!force,
  };
  processDrag(s);
}
function processDrag(s) {
  requestAnimationFrame(() => {
    var _a;
    const cur = s.draggable.current;
    if (!cur) return;
    // cancel animations while dragging
    if ((_a = s.animation.current) === null || _a === void 0 ? void 0 : _a.plan.anims.has(cur.orig))
      s.animation.current = undefined;
    // if moving piece is gone, cancel
    const origPiece = s.pieces.get(cur.orig);
    if (!origPiece || !samePiece(origPiece, cur.piece)) cancel(s);
    else {
      if (!cur.started && distanceSq(cur.pos, cur.origPos) >= Math.pow(s.draggable.distance, 2))
        cur.started = true;
      if (cur.started) {
        // support lazy elements
        if (typeof cur.element === 'function') {
          const found = cur.element();
          if (!found) return;
          found.cgDragging = true;
          found.classList.add('dragging');
          cur.element = found;
        }
        const bounds = s.dom.bounds();
        translateAbs(cur.element, [
          cur.pos[0] - bounds.left - bounds.width / 16,
          cur.pos[1] - bounds.top - bounds.height / 16,
        ]);
      }
    }
    processDrag(s);
  });
}
function move(s, e) {
  // support one finger touch only
  if (s.draggable.current && (!e.touches || e.touches.length < 2)) {
    s.draggable.current.pos = eventPosition(e);
  }
}
function end(s, e) {
  const cur = s.draggable.current;
  if (!cur) return;
  // create no corresponding mouse event
  if (e.type === 'touchend' && e.cancelable !== false) e.preventDefault();
  // comparing with the origin target is an easy way to test that the end event
  // has the same touch origin
  if (e.type === 'touchend' && cur.originTarget !== e.target && !cur.newPiece) {
    s.draggable.current = undefined;
    return;
  }
  unsetPremove(s);
  unsetPredrop(s);
  // touchend has no position; so use the last touchmove position instead
  const eventPos = eventPosition(e) || cur.pos;
  const dest = getKeyAtDomPos(eventPos, whitePov(s), s.dom.bounds());
  if (dest && cur.started && cur.orig !== dest) {
    if (cur.newPiece) dropNewPiece(s, cur.orig, dest, cur.force);
    else {
      s.stats.ctrlKey = e.ctrlKey;
      if (userMove(s, cur.orig, dest)) s.stats.dragged = true;
    }
  } else if (cur.newPiece) {
    s.pieces.delete(cur.orig);
  } else if (s.draggable.deleteOnDropOff && !dest) {
    s.pieces.delete(cur.orig);
    callUserFunction(s.events.change);
  }
  if (cur.orig === cur.previouslySelected && (cur.orig === dest || !dest)) unselect(s);
  else if (!s.selectable.enabled) unselect(s);
  removeDragElements(s);
  s.draggable.current = undefined;
  s.dom.redraw();
}
function cancel(s) {
  const cur = s.draggable.current;
  if (cur) {
    if (cur.newPiece) s.pieces.delete(cur.orig);
    s.draggable.current = undefined;
    unselect(s);
    removeDragElements(s);
    s.dom.redraw();
  }
}
function removeDragElements(s) {
  const e = s.dom.elements;
  if (e.ghost) setVisible(e.ghost, false);
}
function pieceElementByKey(s, key) {
  let el = s.dom.elements.board.firstChild;
  while (el) {
    if (el.cgKey === key && el.tagName === 'PIECE') return el;
    el = el.nextSibling;
  }
  return;
}

function explosion(state, keys) {
  state.exploding = {
    stage: 1,
    keys,
  };
  state.dom.redraw();
  setTimeout(() => {
    setStage(state, 2);
    setTimeout(() => setStage(state, undefined), 120);
  }, 120);
}
function setStage(state, stage) {
  if (state.exploding) {
    if (stage) state.exploding.stage = stage;
    else state.exploding = undefined;
    state.dom.redraw();
  }
}

// see API types and documentations in dts/api.d.ts
function start(state, redrawAll) {
  function toggleOrientation$1() {
    toggleOrientation(state);
    redrawAll();
  }
  return {
    set(config) {
      if (config.orientation && config.orientation !== state.orientation) toggleOrientation$1();
      (config.fen ? anim : render$1)((state) => configure(state, config), state);
    },
    state,
    getFen: () => write(state.pieces),
    toggleOrientation: toggleOrientation$1,
    setPieces(pieces) {
      anim((state) => setPieces(state, pieces), state);
    },
    selectSquare(key, force) {
      if (key) anim((state) => selectSquare(state, key, force), state);
      else if (state.selected) {
        unselect(state);
        state.dom.redraw();
      }
    },
    move(orig, dest) {
      anim((state) => baseMove(state, orig, dest), state);
    },
    newPiece(piece, key) {
      anim((state) => baseNewPiece(state, piece, key), state);
    },
    playPremove() {
      if (state.premovable.current) {
        if (anim(playPremove, state)) return true;
        // if the premove couldn't be played, redraw to clear it up
        state.dom.redraw();
      }
      return false;
    },
    playPredrop(validate) {
      if (state.predroppable.current) {
        const result = playPredrop(state, validate);
        state.dom.redraw();
        return result;
      }
      return false;
    },
    cancelPremove() {
      render$1(unsetPremove, state);
    },
    cancelPredrop() {
      render$1(unsetPredrop, state);
    },
    cancelMove() {
      render$1((state) => {
        cancelMove(state);
        cancel(state);
      }, state);
    },
    stop() {
      render$1((state) => {
        stop(state);
        cancel(state);
      }, state);
    },
    explode(keys) {
      explosion(state, keys);
    },
    setAutoShapes(shapes) {
      render$1((state) => (state.drawable.autoShapes = shapes), state);
    },
    setShapes(shapes) {
      render$1((state) => (state.drawable.shapes = shapes), state);
    },
    getKeyAtDomPos(pos) {
      return getKeyAtDomPos(pos, whitePov(state), state.dom.bounds());
    },
    redrawAll,
    dragNewPiece(piece, event, force) {
      dragNewPiece(state, piece, event, force);
    },
    destroy() {
      stop(state);
      state.dom.unbind && state.dom.unbind();
      state.dom.destroyed = true;
    },
  };
}

function defaults() {
  return {
    pieces: read(initial),
    orientation: 'white',
    turnColor: 'white',
    coordinates: true,
    autoCastle: true,
    viewOnly: false,
    disableContextMenu: false,
    resizable: true,
    addPieceZIndex: false,
    pieceKey: false,
    highlight: {
      lastMove: true,
      check: true,
    },
    animation: {
      enabled: true,
      duration: 200,
    },
    movable: {
      free: true,
      color: 'both',
      showDests: true,
      events: {},
      rookCastle: true,
    },
    premovable: {
      enabled: true,
      showDests: true,
      castle: true,
      events: {},
    },
    predroppable: {
      enabled: false,
      events: {},
    },
    draggable: {
      enabled: true,
      distance: 3,
      autoDistance: true,
      showGhost: true,
      deleteOnDropOff: false,
    },
    dropmode: {
      active: false,
    },
    selectable: {
      enabled: true,
    },
    stats: {
      // on touchscreen, default to "tap-tap" moves
      // instead of drag
      dragged: !('ontouchstart' in window),
    },
    events: {},
    drawable: {
      enabled: true,
      visible: true,
      defaultSnapToValidMove: true,
      eraseOnClick: true,
      shapes: [],
      autoShapes: [],
      brushes: {
        green: {
          key: 'g',
          color: '#15781B',
          opacity: 1,
          lineWidth: 10,
        },
        red: {
          key: 'r',
          color: '#882020',
          opacity: 1,
          lineWidth: 10,
        },
        blue: {
          key: 'b',
          color: '#003088',
          opacity: 1,
          lineWidth: 10,
        },
        yellow: {
          key: 'y',
          color: '#e68f00',
          opacity: 1,
          lineWidth: 10,
        },
        paleBlue: {
          key: 'pb',
          color: '#003088',
          opacity: 0.4,
          lineWidth: 15,
        },
        paleGreen: {
          key: 'pg',
          color: '#15781B',
          opacity: 0.4,
          lineWidth: 15,
        },
        paleRed: {
          key: 'pr',
          color: '#882020',
          opacity: 0.4,
          lineWidth: 15,
        },
        paleGrey: {
          key: 'pgr',
          color: '#4a4a4a',
          opacity: 0.35,
          lineWidth: 15,
        },
      },
      pieces: {
        baseUrl: 'https://lichess1.org/assets/piece/cburnett/',
      },
      prevSvgHash: '',
    },
    hold: timer(),
  };
}

function createElement(tagName) {
  return document.createElementNS('http://www.w3.org/2000/svg', tagName);
}
function renderSvg(state, svg, customSvg) {
  const d = state.drawable,
    curD = d.current,
    cur = curD && curD.mouseSq ? curD : undefined,
    arrowDests = new Map(),
    bounds = state.dom.bounds();
  for (const s of d.shapes.concat(d.autoShapes).concat(cur ? [cur] : [])) {
    if (s.dest) arrowDests.set(s.dest, (arrowDests.get(s.dest) || 0) + 1);
  }
  const shapes = d.shapes.concat(d.autoShapes).map((s) => {
    return {
      shape: s,
      current: false,
      hash: shapeHash(s, arrowDests, false, bounds),
    };
  });
  if (cur)
    shapes.push({
      shape: cur,
      current: true,
      hash: shapeHash(cur, arrowDests, true, bounds),
    });
  const fullHash = shapes.map((sc) => sc.hash).join(';');
  if (fullHash === state.drawable.prevSvgHash) return;
  state.drawable.prevSvgHash = fullHash;
  /*
    -- DOM hierarchy --
    <svg class="cg-shapes">      (<= svg)
      <defs>
        ...(for brushes)...
      </defs>
      <g>
        ...(for arrows, circles, and pieces)...
      </g>
    </svg>
    <svg class="cg-custom-svgs"> (<= customSvg)
      <g>
        ...(for custom svgs)...
      </g>
    </svg>
  */
  const defsEl = svg.querySelector('defs');
  const shapesEl = svg.querySelector('g');
  const customSvgsEl = customSvg.querySelector('g');
  syncDefs(d, shapes, defsEl);
  syncShapes(
    state,
    shapes.filter((s) => !s.shape.customSvg),
    d.brushes,
    arrowDests,
    shapesEl
  );
  syncShapes(
    state,
    shapes.filter((s) => s.shape.customSvg),
    d.brushes,
    arrowDests,
    customSvgsEl
  );
}
// append only. Don't try to update/remove.
function syncDefs(d, shapes, defsEl) {
  const brushes = new Map();
  let brush;
  for (const s of shapes) {
    if (s.shape.dest) {
      brush = d.brushes[s.shape.brush];
      if (s.shape.modifiers) brush = makeCustomBrush(brush, s.shape.modifiers);
      brushes.set(brush.key, brush);
    }
  }
  const keysInDom = new Set();
  let el = defsEl.firstChild;
  while (el) {
    keysInDom.add(el.getAttribute('cgKey'));
    el = el.nextSibling;
  }
  for (const [key, brush] of brushes.entries()) {
    if (!keysInDom.has(key)) defsEl.appendChild(renderMarker(brush));
  }
}
// append and remove only. No updates.
function syncShapes(state, shapes, brushes, arrowDests, root) {
  const bounds = state.dom.bounds(),
    hashesInDom = new Map(),
    // by hash
    toRemove = [];
  for (const sc of shapes) hashesInDom.set(sc.hash, false);
  let el = root.firstChild,
    elHash;
  while (el) {
    elHash = el.getAttribute('cgHash');
    // found a shape element that's here to stay
    if (hashesInDom.has(elHash)) hashesInDom.set(elHash, true);
    // or remove it
    else toRemove.push(el);
    el = el.nextSibling;
  }
  // remove old shapes
  for (const el of toRemove) root.removeChild(el);
  // insert shapes that are not yet in dom
  for (const sc of shapes) {
    if (!hashesInDom.get(sc.hash))
      root.appendChild(renderShape(state, sc, brushes, arrowDests, bounds));
  }
}
function shapeHash(
  { orig, dest, brush, piece, modifiers, customSvg },
  arrowDests,
  current,
  bounds
) {
  return [
    bounds.width,
    bounds.height,
    current,
    orig,
    dest,
    brush,
    dest && (arrowDests.get(dest) || 0) > 1,
    piece && pieceHash(piece),
    modifiers && modifiersHash(modifiers),
    customSvg && customSvgHash(customSvg),
  ]
    .filter((x) => x)
    .join(',');
}
function pieceHash(piece) {
  return [piece.color, piece.role, piece.scale].filter((x) => x).join(',');
}
function modifiersHash(m) {
  return '' + (m.lineWidth || '');
}
function customSvgHash(s) {
  // Rolling hash with base 31 (cf. https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript)
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) >>> 0;
  }
  return 'custom-' + h.toString();
}
function renderShape(state, { shape, current, hash }, brushes, arrowDests, bounds) {
  let el;
  if (shape.customSvg) {
    const orig = orient(key2pos(shape.orig), state.orientation);
    el = renderCustomSvg(shape.customSvg, orig, bounds);
  } else if (shape.piece)
    el = renderPiece(
      state.drawable.pieces.baseUrl,
      orient(key2pos(shape.orig), state.orientation),
      shape.piece,
      bounds
    );
  else {
    const orig = orient(key2pos(shape.orig), state.orientation);
    if (shape.dest) {
      let brush = brushes[shape.brush];
      if (shape.modifiers) brush = makeCustomBrush(brush, shape.modifiers);
      el = renderArrow(
        brush,
        orig,
        orient(key2pos(shape.dest), state.orientation),
        current,
        (arrowDests.get(shape.dest) || 0) > 1,
        bounds
      );
    } else el = renderCircle(brushes[shape.brush], orig, current, bounds);
  }
  el.setAttribute('cgHash', hash);
  return el;
}
function renderCustomSvg(customSvg, pos, bounds) {
  const { width, height } = bounds;
  const w = width / 8;
  const h = height / 8;
  const x = pos[0] * w;
  const y = (7 - pos[1]) * h;
  // Translate to top-left of `orig` square
  const g = setAttributes(createElement('g'), {
    transform: `translate(${x},${y})`,
  });
  // Give 100x100 coordinate system to the user for `orig` square
  const svg = setAttributes(createElement('svg'), {
    width: w,
    height: h,
    viewBox: '0 0 100 100',
  });
  g.appendChild(svg);
  svg.innerHTML = customSvg;
  return g;
}
function renderCircle(brush, pos, current, bounds) {
  const o = pos2px(pos, bounds),
    widths = circleWidth(bounds),
    radius = (bounds.width + bounds.height) / 32;
  return setAttributes(createElement('circle'), {
    stroke: brush.color,
    'stroke-width': widths[current ? 0 : 1],
    fill: 'none',
    opacity: opacity(brush, current),
    cx: o[0],
    cy: o[1],
    r: radius - widths[1] / 2,
  });
}
function renderArrow(brush, orig, dest, current, shorten, bounds) {
  const m = arrowMargin(bounds, shorten && !current),
    a = pos2px(orig, bounds),
    b = pos2px(dest, bounds),
    dx = b[0] - a[0],
    dy = b[1] - a[1],
    angle = Math.atan2(dy, dx),
    xo = Math.cos(angle) * m,
    yo = Math.sin(angle) * m;
  return setAttributes(createElement('line'), {
    stroke: brush.color,
    'stroke-width': lineWidth(brush, current, bounds),
    'stroke-linecap': 'round',
    'marker-end': 'url(#arrowhead-' + brush.key + ')',
    opacity: opacity(brush, current),
    x1: a[0],
    y1: a[1],
    x2: b[0] - xo,
    y2: b[1] - yo,
  });
}
function renderPiece(baseUrl, pos, piece, bounds) {
  const o = pos2px(pos, bounds),
    size = (bounds.width / 8) * (piece.scale || 1),
    name = piece.color[0] + (piece.role === 'knight' ? 'n' : piece.role[0]).toUpperCase();
  return setAttributes(createElement('image'), {
    className: `${piece.role} ${piece.color}`,
    x: o[0] - size / 2,
    y: o[1] - size / 2,
    width: size,
    height: size,
    href: baseUrl + name + '.svg',
  });
}
function renderMarker(brush) {
  const marker = setAttributes(createElement('marker'), {
    id: 'arrowhead-' + brush.key,
    orient: 'auto',
    markerWidth: 4,
    markerHeight: 8,
    refX: 2.05,
    refY: 2.01,
  });
  marker.appendChild(
    setAttributes(createElement('path'), {
      d: 'M0,0 V4 L3,2 Z',
      fill: brush.color,
    })
  );
  marker.setAttribute('cgKey', brush.key);
  return marker;
}
function setAttributes(el, attrs) {
  for (const key in attrs) el.setAttribute(key, attrs[key]);
  return el;
}
function orient(pos, color) {
  return color === 'white' ? pos : [7 - pos[0], 7 - pos[1]];
}
function makeCustomBrush(base, modifiers) {
  return {
    color: base.color,
    opacity: Math.round(base.opacity * 10) / 10,
    lineWidth: Math.round(modifiers.lineWidth || base.lineWidth),
    key: [base.key, modifiers.lineWidth].filter((x) => x).join(''),
  };
}
function circleWidth(bounds) {
  const base = bounds.width / 512;
  return [3 * base, 4 * base];
}
function lineWidth(brush, current, bounds) {
  return (((brush.lineWidth || 10) * (current ? 0.85 : 1)) / 512) * bounds.width;
}
function opacity(brush, current) {
  return (brush.opacity || 1) * (current ? 0.9 : 1);
}
function arrowMargin(bounds, shorten) {
  return ((shorten ? 20 : 10) / 512) * bounds.width;
}
function pos2px(pos, bounds) {
  return [((pos[0] + 0.5) * bounds.width) / 8, ((7.5 - pos[1]) * bounds.height) / 8];
}

function renderWrap(element, s, relative) {
  // .cg-wrap (element passed to Chessground)
  //   cg-helper (12.5%, display: table)
  //     cg-container (800%)
  //       cg-board
  //       svg.cg-shapes
  //         defs
  //         g
  //       svg.cg-custom-svgs
  //         g
  //       coords.ranks
  //       coords.files
  //       piece.ghost
  element.innerHTML = '';
  // ensure the cg-wrap class is set
  // so bounds calculation can use the CSS width/height values
  // add that class yourself to the element before calling chessground
  // for a slight performance improvement! (avoids recomputing style)
  element.classList.add('cg-wrap');
  for (const c of colors) element.classList.toggle('orientation-' + c, s.orientation === c);
  element.classList.toggle('manipulable', !s.viewOnly);
  const helper = createEl('cg-helper');
  element.appendChild(helper);
  const container = createEl('cg-container');
  helper.appendChild(container);
  const board = createEl('cg-board');
  container.appendChild(board);
  let svg;
  let customSvg;
  if (s.drawable.visible && !relative) {
    svg = setAttributes(createElement('svg'), {
      class: 'cg-shapes',
    });
    svg.appendChild(createElement('defs'));
    svg.appendChild(createElement('g'));
    customSvg = setAttributes(createElement('svg'), {
      class: 'cg-custom-svgs',
    });
    customSvg.appendChild(createElement('g'));
    container.appendChild(svg);
    container.appendChild(customSvg);
  }
  if (s.coordinates) {
    const orientClass = s.orientation === 'black' ? ' black' : '';
    container.appendChild(renderCoords(ranks, 'ranks' + orientClass));
    container.appendChild(renderCoords(files, 'files' + orientClass));
  }
  let ghost;
  if (s.draggable.showGhost && !relative) {
    ghost = createEl('piece', 'ghost');
    setVisible(ghost, false);
    container.appendChild(ghost);
  }
  return {
    board,
    container,
    ghost,
    svg,
    customSvg,
  };
}
function renderCoords(elems, className) {
  const el = createEl('coords', className);
  let f;
  for (const elem of elems) {
    f = createEl('coord');
    f.textContent = elem;
    el.appendChild(f);
  }
  return el;
}

function drop(s, e) {
  if (!s.dropmode.active) return;
  unsetPremove(s);
  unsetPredrop(s);
  const piece = s.dropmode.piece;
  if (piece) {
    s.pieces.set('a0', piece);
    const position = eventPosition(e);
    const dest = position && getKeyAtDomPos(position, whitePov(s), s.dom.bounds());
    if (dest) dropNewPiece(s, 'a0', dest);
  }
  s.dom.redraw();
}

function bindBoard(s, boundsUpdated) {
  const boardEl = s.dom.elements.board;
  if (!s.dom.relative && s.resizable && 'ResizeObserver' in window) {
    const observer = new window['ResizeObserver'](boundsUpdated);
    observer.observe(boardEl);
  }
  if (s.viewOnly) return;
  // Cannot be passive, because we prevent touch scrolling and dragging of
  // selected elements.
  const onStart = startDragOrDraw(s);
  boardEl.addEventListener('touchstart', onStart, {
    passive: false,
  });
  boardEl.addEventListener('mousedown', onStart, {
    passive: false,
  });
  if (s.disableContextMenu || s.drawable.enabled) {
    boardEl.addEventListener('contextmenu', (e) => e.preventDefault());
  }
}
// returns the unbind function
function bindDocument(s, boundsUpdated) {
  const unbinds = [];
  // Old versions of Edge and Safari do not support ResizeObserver. Send
  // chessground.resize if a user action has changed the bounds of the board.
  if (!s.dom.relative && s.resizable && !('ResizeObserver' in window)) {
    unbinds.push(unbindable(document.body, 'chessground.resize', boundsUpdated));
  }
  if (!s.viewOnly) {
    const onmove = dragOrDraw(s, move, move$1);
    const onend = dragOrDraw(s, end, end$1);
    for (const ev of ['touchmove', 'mousemove']) unbinds.push(unbindable(document, ev, onmove));
    for (const ev of ['touchend', 'mouseup']) unbinds.push(unbindable(document, ev, onend));
    const onScroll = () => s.dom.bounds.clear();
    unbinds.push(
      unbindable(document, 'scroll', onScroll, {
        capture: true,
        passive: true,
      })
    );
    unbinds.push(
      unbindable(window, 'resize', onScroll, {
        passive: true,
      })
    );
  }
  return () => unbinds.forEach((f) => f());
}
function unbindable(el, eventName, callback, options) {
  el.addEventListener(eventName, callback, options);
  return () => el.removeEventListener(eventName, callback, options);
}
function startDragOrDraw(s) {
  return (e) => {
    if (s.draggable.current) cancel(s);
    else if (s.drawable.current) cancel$1(s);
    else if (e.shiftKey || isRightButton(e)) {
      if (s.drawable.enabled) start$2(s, e);
    } else if (!s.viewOnly) {
      if (s.dropmode.active) drop(s, e);
      else start$1(s, e);
    }
  };
}
function dragOrDraw(s, withDrag, withDraw) {
  return (e) => {
    if (s.drawable.current) {
      if (s.drawable.enabled) withDraw(s, e);
    } else if (!s.viewOnly) withDrag(s, e);
  };
}

// ported from https://github.com/veloce/lichobile/blob/master/src/js/chessground/view.js
// in case of bugs, blame @veloce
function render(s) {
  const asWhite = whitePov(s),
    posToTranslate = s.dom.relative ? posToTranslateRel : posToTranslateAbs(s.dom.bounds()),
    translate = s.dom.relative ? translateRel : translateAbs,
    boardEl = s.dom.elements.board,
    pieces = s.pieces,
    curAnim = s.animation.current,
    anims = curAnim ? curAnim.plan.anims : new Map(),
    fadings = curAnim ? curAnim.plan.fadings : new Map(),
    curDrag = s.draggable.current,
    squares = computeSquareClasses(s),
    samePieces = new Set(),
    sameSquares = new Set(),
    movedPieces = new Map(),
    movedSquares = new Map(); // by class name
  let k, el, pieceAtKey, elPieceName, anim, fading, pMvdset, pMvd, sMvdset, sMvd;
  // walk over all board dom elements, apply animations and flag moved pieces
  el = boardEl.firstChild;
  while (el) {
    k = el.cgKey;
    if (isPieceNode(el)) {
      pieceAtKey = pieces.get(k);
      anim = anims.get(k);
      fading = fadings.get(k);
      elPieceName = el.cgPiece;
      // if piece not being dragged anymore, remove dragging style
      if (el.cgDragging && (!curDrag || curDrag.orig !== k)) {
        el.classList.remove('dragging');
        translate(el, posToTranslate(key2pos(k), asWhite));
        el.cgDragging = false;
      }
      // remove fading class if it still remains
      if (!fading && el.cgFading) {
        el.cgFading = false;
        el.classList.remove('fading');
      }
      // there is now a piece at this dom key
      if (pieceAtKey) {
        // continue animation if already animating and same piece
        // (otherwise it could animate a captured piece)
        if (anim && el.cgAnimating && elPieceName === pieceNameOf(pieceAtKey)) {
          const pos = key2pos(k);
          pos[0] += anim[2];
          pos[1] += anim[3];
          el.classList.add('anim');
          translate(el, posToTranslate(pos, asWhite));
        } else if (el.cgAnimating) {
          el.cgAnimating = false;
          el.classList.remove('anim');
          translate(el, posToTranslate(key2pos(k), asWhite));
          if (s.addPieceZIndex) el.style.zIndex = posZIndex(key2pos(k), asWhite);
        }
        // same piece: flag as same
        if (elPieceName === pieceNameOf(pieceAtKey) && (!fading || !el.cgFading)) {
          samePieces.add(k);
        }
        // different piece: flag as moved unless it is a fading piece
        else {
          if (fading && elPieceName === pieceNameOf(fading)) {
            el.classList.add('fading');
            el.cgFading = true;
          } else {
            appendValue(movedPieces, elPieceName, el);
          }
        }
      }
      // no piece: flag as moved
      else {
        appendValue(movedPieces, elPieceName, el);
      }
    } else if (isSquareNode(el)) {
      const cn = el.className;
      if (squares.get(k) === cn) sameSquares.add(k);
      else appendValue(movedSquares, cn, el);
    }
    el = el.nextSibling;
  }
  // walk over all squares in current set, apply dom changes to moved squares
  // or append new squares
  for (const [sk, className] of squares) {
    if (!sameSquares.has(sk)) {
      sMvdset = movedSquares.get(className);
      sMvd = sMvdset && sMvdset.pop();
      const translation = posToTranslate(key2pos(sk), asWhite);
      if (sMvd) {
        sMvd.cgKey = sk;
        translate(sMvd, translation);
      } else {
        const squareNode = createEl('square', className);
        squareNode.cgKey = sk;
        translate(squareNode, translation);
        boardEl.insertBefore(squareNode, boardEl.firstChild);
      }
    }
  }
  // walk over all pieces in current set, apply dom changes to moved pieces
  // or append new pieces
  for (const [k, p] of pieces) {
    anim = anims.get(k);
    if (!samePieces.has(k)) {
      pMvdset = movedPieces.get(pieceNameOf(p));
      pMvd = pMvdset && pMvdset.pop();
      // a same piece was moved
      if (pMvd) {
        // apply dom changes
        pMvd.cgKey = k;
        if (pMvd.cgFading) {
          pMvd.classList.remove('fading');
          pMvd.cgFading = false;
        }
        const pos = key2pos(k);
        if (s.addPieceZIndex) pMvd.style.zIndex = posZIndex(pos, asWhite);
        if (anim) {
          pMvd.cgAnimating = true;
          pMvd.classList.add('anim');
          pos[0] += anim[2];
          pos[1] += anim[3];
        }
        translate(pMvd, posToTranslate(pos, asWhite));
      }
      // no piece in moved obj: insert the new piece
      // assumes the new piece is not being dragged
      else {
        const pieceName = pieceNameOf(p),
          pieceNode = createEl('piece', pieceName),
          pos = key2pos(k);
        pieceNode.cgPiece = pieceName;
        pieceNode.cgKey = k;
        if (anim) {
          pieceNode.cgAnimating = true;
          pos[0] += anim[2];
          pos[1] += anim[3];
        }
        translate(pieceNode, posToTranslate(pos, asWhite));
        if (s.addPieceZIndex) pieceNode.style.zIndex = posZIndex(pos, asWhite);
        boardEl.appendChild(pieceNode);
      }
    }
  }
  // remove any element that remains in the moved sets
  for (const nodes of movedPieces.values()) removeNodes(s, nodes);
  for (const nodes of movedSquares.values()) removeNodes(s, nodes);
}
function updateBounds(s) {
  if (s.dom.relative) return;
  const asWhite = whitePov(s),
    posToTranslate = posToTranslateAbs(s.dom.bounds());
  let el = s.dom.elements.board.firstChild;
  while (el) {
    if ((isPieceNode(el) && !el.cgAnimating) || isSquareNode(el)) {
      translateAbs(el, posToTranslate(key2pos(el.cgKey), asWhite));
    }
    el = el.nextSibling;
  }
}
function isPieceNode(el) {
  return el.tagName === 'PIECE';
}
function isSquareNode(el) {
  return el.tagName === 'SQUARE';
}
function removeNodes(s, nodes) {
  for (const node of nodes) s.dom.elements.board.removeChild(node);
}
function posZIndex(pos, asWhite) {
  let z = 2 + pos[1] * 8 + (7 - pos[0]);
  if (asWhite) z = 67 - z;
  return z + '';
}
function pieceNameOf(piece) {
  return `${piece.color} ${piece.role}`;
}
function computeSquareClasses(s) {
  var _a;
  const squares = new Map();
  if (s.lastMove && s.highlight.lastMove)
    for (const k of s.lastMove) {
      addSquare(squares, k, 'last-move');
    }
  if (s.check && s.highlight.check) addSquare(squares, s.check, 'check');
  if (s.selected) {
    addSquare(squares, s.selected, 'selected');
    if (s.movable.showDests) {
      const dests = (_a = s.movable.dests) === null || _a === void 0 ? void 0 : _a.get(s.selected);
      if (dests)
        for (const k of dests) {
          addSquare(squares, k, 'move-dest' + (s.pieces.has(k) ? ' oc' : ''));
        }
      const pDests = s.premovable.dests;
      if (pDests)
        for (const k of pDests) {
          addSquare(squares, k, 'premove-dest' + (s.pieces.has(k) ? ' oc' : ''));
        }
    }
  }
  const premove = s.premovable.current;
  if (premove) for (const k of premove) addSquare(squares, k, 'current-premove');
  else if (s.predroppable.current)
    addSquare(squares, s.predroppable.current.key, 'current-premove');
  const o = s.exploding;
  if (o) for (const k of o.keys) addSquare(squares, k, 'exploding' + o.stage);
  return squares;
}
function addSquare(squares, key, klass) {
  const classes = squares.get(key);
  if (classes) squares.set(key, `${classes} ${klass}`);
  else squares.set(key, klass);
}
function appendValue(map, key, value) {
  const arr = map.get(key);
  if (arr) arr.push(value);
  else map.set(key, [value]);
}

function Chessground$1(element, config) {
  const maybeState = defaults();
  configure(maybeState, config || {});
  function redrawAll() {
    const prevUnbind = 'dom' in maybeState ? maybeState.dom.unbind : undefined;
    // compute bounds from existing board element if possible
    // this allows non-square boards from CSS to be handled (for 3D)
    const relative = maybeState.viewOnly && !maybeState.drawable.visible,
      elements = renderWrap(element, maybeState, relative),
      bounds = memo(() => elements.board.getBoundingClientRect()),
      redrawNow = (skipSvg) => {
        render(state);
        if (!skipSvg && elements.svg) renderSvg(state, elements.svg, elements.customSvg);
      },
      boundsUpdated = () => {
        bounds.clear();
        updateBounds(state);
        if (elements.svg) renderSvg(state, elements.svg, elements.customSvg);
      };
    const state = maybeState;
    state.dom = {
      elements,
      bounds,
      redraw: debounceRedraw(redrawNow),
      redrawNow,
      unbind: prevUnbind,
      relative,
    };
    state.drawable.prevSvgHash = '';
    redrawNow(false);
    bindBoard(state, boundsUpdated);
    if (!prevUnbind) state.dom.unbind = bindDocument(state, boundsUpdated);
    state.events.insert && state.events.insert(elements);
    return state;
  }
  return start(redrawAll(), redrawAll);
}
function debounceRedraw(redrawNow) {
  let redrawing = false;
  return () => {
    if (redrawing) return;
    redrawing = true;
    requestAnimationFrame(() => {
      redrawNow();
      redrawing = false;
    });
  };
}

class Chessground extends React__default['default'].Component {
  buildConfigFromProps(props) {
    const config = {
      events: {},
    };
    Object.keys(Chessground.types).forEach((k) => {
      const v = props[k];
      if (typeof v !== 'undefined') {
        const match = k.match(/^on([A-Z]\S*)/);
        if (match) {
          config.events[match[1].toLowerCase()] = v;
        } else {
          config[k] = v;
        }
      }
    });
    return config;
  }
  componentDidMount() {
    this.board = Chessground$1(this.el, this.buildConfigFromProps(this.props));
    if (this.props.shapes) {
      this.board.setShapes(this.props.shapes);
    }
  }
  componentDidUpdate() {
    this.board = Chessground$1(this.el, this.buildConfigFromProps(this.props));
    if (this.props.shapes) {
      this.board.setShapes(this.props.shapes);
    }
  }
  render() {
    const props = {
      style: {
        ...this.props.style,
      },
    };
    if (this.props.width) {
      props.style.width = this.props.width;
    }
    if (this.props.height) {
      props.style.height = this.props.height;
    }
    return /*#__PURE__*/ React__default['default'].createElement(
      'div',
      _extends(
        {
          ref: (el) => (this.el = el),
        },
        props
      )
    );
  }
}
_defineProperty(Chessground, 'types', {
  width: propTypes.oneOfType([propTypes.string, propTypes.number]),
  height: propTypes.oneOfType([propTypes.string, propTypes.number]),
  fen: propTypes.string,
  orientation: propTypes.string,
  turnColor: propTypes.string,
  check: propTypes.string,
  lastMove: propTypes.array,
  selected: propTypes.string,
  coordinates: propTypes.bool,
  autoCastle: propTypes.bool,
  viewOnly: propTypes.bool,
  disableContextMenu: propTypes.bool,
  resizable: propTypes.bool,
  addPieceZIndex: propTypes.bool,
  hightlight: propTypes.object,
  animation: propTypes.object,
  movable: propTypes.object,
  premovable: propTypes.object,
  predroppable: propTypes.object,
  draggable: propTypes.object,
  selectable: propTypes.object,
  onChange: propTypes.func,
  onMove: propTypes.func,
  onDropNewPiece: propTypes.func,
  onSelect: propTypes.func,
  items: propTypes.object,
  drawable: propTypes.object,
});
_defineProperty(Chessground, 'defaultProps', {
  coordinates: false,
  resizable: true,
  hightlight: {
    lastMove: true,
    check: true,
  },
});

var lisp =
  'data:audio/ogg;base64,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';

var piano =
  'data:audio/ogg;base64,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';

var robot =
  'data:audio/ogg;base64,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';

var sfx =
  'data:audio/ogg;base64,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';

const play = (file) => {
  try {
    new Audio(file).play();
  } catch {
    return () => {};
  }
};
const audio = (sound) => {
  if (sound === 'silent') {
    return false;
  }
  switch (sound) {
    case 'lisp':
      return play(lisp);
    case 'piano':
      return play(piano);
    case 'sfx':
      return play(sfx);
    default:
      return play(robot);
  }
};

const useChessground = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const handleChecked = (event) => {
    const name = event.target.name;
    const checked = event.target.checked;
    store2.local.set(`chessground.${name}`, checked);
    setTheme((state) => ({
      ...state,
      [name]: checked,
    }));
  };
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    store2.local.set(`chessground.${name}`, value);
    setTheme((state) => ({
      ...state,
      [name]: value,
    }));
  };
  return {
    theme,
    setTheme,
    handleChecked,
    handleChange,
  };
};

var chess = createCommonjsModule(function (module, exports) {
  /*
   * Copyright (c) 2021, Jeff Hlywa (jhlywa@gmail.com)
   * All rights reserved.
   *
   * Redistribution and use in source and binary forms, with or without
   * modification, are permitted provided that the following conditions are met:
   *
   * 1. Redistributions of source code must retain the above copyright notice,
   *    this list of conditions and the following disclaimer.
   * 2. Redistributions in binary form must reproduce the above copyright notice,
   *    this list of conditions and the following disclaimer in the documentation
   *    and/or other materials provided with the distribution.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
   * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
   * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
   * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
   * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
   * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
   * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
   * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
   * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
   * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
   * POSSIBILITY OF SUCH DAMAGE.
   *
   *----------------------------------------------------------------------------*/

  var Chess = function (fen) {
    var BLACK = 'b';
    var WHITE = 'w';
    var EMPTY = -1;
    var PAWN = 'p';
    var KNIGHT = 'n';
    var BISHOP = 'b';
    var ROOK = 'r';
    var QUEEN = 'q';
    var KING = 'k';
    var SYMBOLS = 'pnbrqkPNBRQK';
    var DEFAULT_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    var POSSIBLE_RESULTS = ['1-0', '0-1', '1/2-1/2', '*'];
    var PAWN_OFFSETS = {
      b: [16, 32, 17, 15],
      w: [-16, -32, -17, -15],
    };
    var PIECE_OFFSETS = {
      n: [-18, -33, -31, -14, 18, 33, 31, 14],
      b: [-17, -15, 17, 15],
      r: [-16, 1, 16, -1],
      q: [-17, -16, -15, 1, 17, 16, 15, -1],
      k: [-17, -16, -15, 1, 17, 16, 15, -1],
    };

    // prettier-ignore
    var ATTACKS = [20, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 20, 0, 0, 20, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 20, 0, 0, 0, 0, 24, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 24, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 24, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 2, 24, 2, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 53, 56, 53, 2, 0, 0, 0, 0, 0, 0, 24, 24, 24, 24, 24, 24, 56, 0, 56, 24, 24, 24, 24, 24, 24, 0, 0, 0, 0, 0, 0, 2, 53, 56, 53, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 2, 24, 2, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 24, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 24, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 24, 0, 0, 0, 0, 20, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 20, 0, 0, 20, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 20];

    // prettier-ignore
    var RAYS = [17, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 15, 0, 0, 17, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 17, 0, 0, 0, 0, 16, 0, 0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 17, 0, 0, 0, 16, 0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 0, 16, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 16, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 16, 15, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, -15, -16, -17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -15, 0, -16, 0, -17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -15, 0, 0, -16, 0, 0, -17, 0, 0, 0, 0, 0, 0, 0, 0, -15, 0, 0, 0, -16, 0, 0, 0, -17, 0, 0, 0, 0, 0, 0, -15, 0, 0, 0, 0, -16, 0, 0, 0, 0, -17, 0, 0, 0, 0, -15, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, -17, 0, 0, -15, 0, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, 0, -17];
    var SHIFTS = {
      p: 0,
      n: 1,
      b: 2,
      r: 3,
      q: 4,
      k: 5,
    };
    var FLAGS = {
      NORMAL: 'n',
      CAPTURE: 'c',
      BIG_PAWN: 'b',
      EP_CAPTURE: 'e',
      PROMOTION: 'p',
      KSIDE_CASTLE: 'k',
      QSIDE_CASTLE: 'q',
    };
    var BITS = {
      NORMAL: 1,
      CAPTURE: 2,
      BIG_PAWN: 4,
      EP_CAPTURE: 8,
      PROMOTION: 16,
      KSIDE_CASTLE: 32,
      QSIDE_CASTLE: 64,
    };
    var RANK_1 = 7;
    var RANK_2 = 6;
    var RANK_7 = 1;
    var RANK_8 = 0;

    // prettier-ignore
    var SQUARES = {
    a8: 0,
    b8: 1,
    c8: 2,
    d8: 3,
    e8: 4,
    f8: 5,
    g8: 6,
    h8: 7,
    a7: 16,
    b7: 17,
    c7: 18,
    d7: 19,
    e7: 20,
    f7: 21,
    g7: 22,
    h7: 23,
    a6: 32,
    b6: 33,
    c6: 34,
    d6: 35,
    e6: 36,
    f6: 37,
    g6: 38,
    h6: 39,
    a5: 48,
    b5: 49,
    c5: 50,
    d5: 51,
    e5: 52,
    f5: 53,
    g5: 54,
    h5: 55,
    a4: 64,
    b4: 65,
    c4: 66,
    d4: 67,
    e4: 68,
    f4: 69,
    g4: 70,
    h4: 71,
    a3: 80,
    b3: 81,
    c3: 82,
    d3: 83,
    e3: 84,
    f3: 85,
    g3: 86,
    h3: 87,
    a2: 96,
    b2: 97,
    c2: 98,
    d2: 99,
    e2: 100,
    f2: 101,
    g2: 102,
    h2: 103,
    a1: 112,
    b1: 113,
    c1: 114,
    d1: 115,
    e1: 116,
    f1: 117,
    g1: 118,
    h1: 119
  };
    var ROOKS = {
      w: [
        {
          square: SQUARES.a1,
          flag: BITS.QSIDE_CASTLE,
        },
        {
          square: SQUARES.h1,
          flag: BITS.KSIDE_CASTLE,
        },
      ],
      b: [
        {
          square: SQUARES.a8,
          flag: BITS.QSIDE_CASTLE,
        },
        {
          square: SQUARES.h8,
          flag: BITS.KSIDE_CASTLE,
        },
      ],
    };
    var board = new Array(128);
    var kings = {
      w: EMPTY,
      b: EMPTY,
    };
    var turn = WHITE;
    var castling = {
      w: 0,
      b: 0,
    };
    var ep_square = EMPTY;
    var half_moves = 0;
    var move_number = 1;
    var history = [];
    var header = {};
    var comments = {};

    /* if the user passes in a fen string, load it, else default to
     * starting position
     */
    if (typeof fen === 'undefined') {
      load(DEFAULT_POSITION);
    } else {
      load(fen);
    }
    function clear(keep_headers) {
      if (typeof keep_headers === 'undefined') {
        keep_headers = false;
      }
      board = new Array(128);
      kings = {
        w: EMPTY,
        b: EMPTY,
      };
      turn = WHITE;
      castling = {
        w: 0,
        b: 0,
      };
      ep_square = EMPTY;
      half_moves = 0;
      move_number = 1;
      history = [];
      if (!keep_headers) header = {};
      comments = {};
      update_setup(generate_fen());
    }
    function prune_comments() {
      var reversed_history = [];
      var current_comments = {};
      var copy_comment = function (fen) {
        if (fen in comments) {
          current_comments[fen] = comments[fen];
        }
      };
      while (history.length > 0) {
        reversed_history.push(undo_move());
      }
      copy_comment(generate_fen());
      while (reversed_history.length > 0) {
        make_move(reversed_history.pop());
        copy_comment(generate_fen());
      }
      comments = current_comments;
    }
    function reset() {
      load(DEFAULT_POSITION);
    }
    function load(fen, keep_headers) {
      if (typeof keep_headers === 'undefined') {
        keep_headers = false;
      }
      var tokens = fen.split(/\s+/);
      var position = tokens[0];
      var square = 0;
      if (!validate_fen(fen).valid) {
        return false;
      }
      clear(keep_headers);
      for (var i = 0; i < position.length; i++) {
        var piece = position.charAt(i);
        if (piece === '/') {
          square += 8;
        } else if (is_digit(piece)) {
          square += parseInt(piece, 10);
        } else {
          var color = piece < 'a' ? WHITE : BLACK;
          put(
            {
              type: piece.toLowerCase(),
              color: color,
            },
            algebraic(square)
          );
          square++;
        }
      }
      turn = tokens[1];
      if (tokens[2].indexOf('K') > -1) {
        castling.w |= BITS.KSIDE_CASTLE;
      }
      if (tokens[2].indexOf('Q') > -1) {
        castling.w |= BITS.QSIDE_CASTLE;
      }
      if (tokens[2].indexOf('k') > -1) {
        castling.b |= BITS.KSIDE_CASTLE;
      }
      if (tokens[2].indexOf('q') > -1) {
        castling.b |= BITS.QSIDE_CASTLE;
      }
      ep_square = tokens[3] === '-' ? EMPTY : SQUARES[tokens[3]];
      half_moves = parseInt(tokens[4], 10);
      move_number = parseInt(tokens[5], 10);
      update_setup(generate_fen());
      return true;
    }

    /* TODO: this function is pretty much crap - it validates structure but
     * completely ignores content (e.g. doesn't verify that each side has a king)
     * ... we should rewrite this, and ditch the silly error_number field while
     * we're at it
     */
    function validate_fen(fen) {
      var errors = {
        0: 'No errors.',
        1: 'FEN string must contain six space-delimited fields.',
        2: '6th field (move number) must be a positive integer.',
        3: '5th field (half move counter) must be a non-negative integer.',
        4: '4th field (en-passant square) is invalid.',
        5: '3rd field (castling availability) is invalid.',
        6: '2nd field (side to move) is invalid.',
        7: "1st field (piece positions) does not contain 8 '/'-delimited rows.",
        8: '1st field (piece positions) is invalid [consecutive numbers].',
        9: '1st field (piece positions) is invalid [invalid piece].',
        10: '1st field (piece positions) is invalid [row too large].',
        11: 'Illegal en-passant square',
      };

      /* 1st criterion: 6 space-seperated fields? */
      var tokens = fen.split(/\s+/);
      if (tokens.length !== 6) {
        return {
          valid: false,
          error_number: 1,
          error: errors[1],
        };
      }

      /* 2nd criterion: move number field is a integer value > 0? */
      if (isNaN(tokens[5]) || parseInt(tokens[5], 10) <= 0) {
        return {
          valid: false,
          error_number: 2,
          error: errors[2],
        };
      }

      /* 3rd criterion: half move counter is an integer >= 0? */
      if (isNaN(tokens[4]) || parseInt(tokens[4], 10) < 0) {
        return {
          valid: false,
          error_number: 3,
          error: errors[3],
        };
      }

      /* 4th criterion: 4th field is a valid e.p.-string? */
      if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
        return {
          valid: false,
          error_number: 4,
          error: errors[4],
        };
      }

      /* 5th criterion: 3th field is a valid castle-string? */
      if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(tokens[2])) {
        return {
          valid: false,
          error_number: 5,
          error: errors[5],
        };
      }

      /* 6th criterion: 2nd field is "w" (white) or "b" (black)? */
      if (!/^(w|b)$/.test(tokens[1])) {
        return {
          valid: false,
          error_number: 6,
          error: errors[6],
        };
      }

      /* 7th criterion: 1st field contains 8 rows? */
      var rows = tokens[0].split('/');
      if (rows.length !== 8) {
        return {
          valid: false,
          error_number: 7,
          error: errors[7],
        };
      }

      /* 8th criterion: every row is valid? */
      for (var i = 0; i < rows.length; i++) {
        /* check for right sum of fields AND not two numbers in succession */
        var sum_fields = 0;
        var previous_was_number = false;
        for (var k = 0; k < rows[i].length; k++) {
          if (!isNaN(rows[i][k])) {
            if (previous_was_number) {
              return {
                valid: false,
                error_number: 8,
                error: errors[8],
              };
            }
            sum_fields += parseInt(rows[i][k], 10);
            previous_was_number = true;
          } else {
            if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
              return {
                valid: false,
                error_number: 9,
                error: errors[9],
              };
            }
            sum_fields += 1;
            previous_was_number = false;
          }
        }
        if (sum_fields !== 8) {
          return {
            valid: false,
            error_number: 10,
            error: errors[10],
          };
        }
      }
      if ((tokens[3][1] == '3' && tokens[1] == 'w') || (tokens[3][1] == '6' && tokens[1] == 'b')) {
        return {
          valid: false,
          error_number: 11,
          error: errors[11],
        };
      }

      /* everything's okay! */
      return {
        valid: true,
        error_number: 0,
        error: errors[0],
      };
    }
    function generate_fen() {
      var empty = 0;
      var fen = '';
      for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
        if (board[i] == null) {
          empty++;
        } else {
          if (empty > 0) {
            fen += empty;
            empty = 0;
          }
          var color = board[i].color;
          var piece = board[i].type;
          fen += color === WHITE ? piece.toUpperCase() : piece.toLowerCase();
        }
        if ((i + 1) & 0x88) {
          if (empty > 0) {
            fen += empty;
          }
          if (i !== SQUARES.h1) {
            fen += '/';
          }
          empty = 0;
          i += 8;
        }
      }
      var cflags = '';
      if (castling[WHITE] & BITS.KSIDE_CASTLE) {
        cflags += 'K';
      }
      if (castling[WHITE] & BITS.QSIDE_CASTLE) {
        cflags += 'Q';
      }
      if (castling[BLACK] & BITS.KSIDE_CASTLE) {
        cflags += 'k';
      }
      if (castling[BLACK] & BITS.QSIDE_CASTLE) {
        cflags += 'q';
      }

      /* do we have an empty castling flag? */
      cflags = cflags || '-';
      var epflags = ep_square === EMPTY ? '-' : algebraic(ep_square);
      return [fen, turn, cflags, epflags, half_moves, move_number].join(' ');
    }
    function set_header(args) {
      for (var i = 0; i < args.length; i += 2) {
        if (typeof args[i] === 'string' && typeof args[i + 1] === 'string') {
          header[args[i]] = args[i + 1];
        }
      }
      return header;
    }

    /* called when the initial board setup is changed with put() or remove().
     * modifies the SetUp and FEN properties of the header object.  if the FEN is
     * equal to the default position, the SetUp and FEN are deleted
     * the setup is only updated if history.length is zero, ie moves haven't been
     * made.
     */
    function update_setup(fen) {
      if (history.length > 0) return;
      if (fen !== DEFAULT_POSITION) {
        header['SetUp'] = '1';
        header['FEN'] = fen;
      } else {
        delete header['SetUp'];
        delete header['FEN'];
      }
    }
    function get(square) {
      var piece = board[SQUARES[square]];
      return piece
        ? {
            type: piece.type,
            color: piece.color,
          }
        : null;
    }
    function put(piece, square) {
      /* check for valid piece object */
      if (!('type' in piece && 'color' in piece)) {
        return false;
      }

      /* check for piece */
      if (SYMBOLS.indexOf(piece.type.toLowerCase()) === -1) {
        return false;
      }

      /* check for valid square */
      if (!(square in SQUARES)) {
        return false;
      }
      var sq = SQUARES[square];

      /* don't let the user place more than one king */
      if (piece.type == KING && !(kings[piece.color] == EMPTY || kings[piece.color] == sq)) {
        return false;
      }
      board[sq] = {
        type: piece.type,
        color: piece.color,
      };
      if (piece.type === KING) {
        kings[piece.color] = sq;
      }
      update_setup(generate_fen());
      return true;
    }
    function remove(square) {
      var piece = get(square);
      board[SQUARES[square]] = null;
      if (piece && piece.type === KING) {
        kings[piece.color] = EMPTY;
      }
      update_setup(generate_fen());
      return piece;
    }
    function build_move(board, from, to, flags, promotion) {
      var move = {
        color: turn,
        from: from,
        to: to,
        flags: flags,
        piece: board[from].type,
      };
      if (promotion) {
        move.flags |= BITS.PROMOTION;
        move.promotion = promotion;
      }
      if (board[to]) {
        move.captured = board[to].type;
      } else if (flags & BITS.EP_CAPTURE) {
        move.captured = PAWN;
      }
      return move;
    }
    function generate_moves(options) {
      function add_move(board, moves, from, to, flags) {
        /* if pawn promotion */
        if (board[from].type === PAWN && (rank(to) === RANK_8 || rank(to) === RANK_1)) {
          var pieces = [QUEEN, ROOK, BISHOP, KNIGHT];
          for (var i = 0, len = pieces.length; i < len; i++) {
            moves.push(build_move(board, from, to, flags, pieces[i]));
          }
        } else {
          moves.push(build_move(board, from, to, flags));
        }
      }
      var moves = [];
      var us = turn;
      var them = swap_color(us);
      var second_rank = {
        b: RANK_7,
        w: RANK_2,
      };
      var first_sq = SQUARES.a8;
      var last_sq = SQUARES.h1;
      var single_square = false;

      /* do we want legal moves? */
      var legal = typeof options !== 'undefined' && 'legal' in options ? options.legal : true;
      var piece_type =
        typeof options !== 'undefined' && 'piece' in options && typeof options.piece === 'string'
          ? options.piece.toLowerCase()
          : true;

      /* are we generating moves for a single square? */
      if (typeof options !== 'undefined' && 'square' in options) {
        if (options.square in SQUARES) {
          first_sq = last_sq = SQUARES[options.square];
          single_square = true;
        } else {
          /* invalid square */
          return [];
        }
      }
      for (var i = first_sq; i <= last_sq; i++) {
        /* did we run off the end of the board */
        if (i & 0x88) {
          i += 7;
          continue;
        }
        var piece = board[i];
        if (piece == null || piece.color !== us) {
          continue;
        }
        if (piece.type === PAWN && (piece_type === true || piece_type === PAWN)) {
          /* single square, non-capturing */
          var square = i + PAWN_OFFSETS[us][0];
          if (board[square] == null) {
            add_move(board, moves, i, square, BITS.NORMAL);

            /* double square */
            var square = i + PAWN_OFFSETS[us][1];
            if (second_rank[us] === rank(i) && board[square] == null) {
              add_move(board, moves, i, square, BITS.BIG_PAWN);
            }
          }

          /* pawn captures */
          for (j = 2; j < 4; j++) {
            var square = i + PAWN_OFFSETS[us][j];
            if (square & 0x88) continue;
            if (board[square] != null && board[square].color === them) {
              add_move(board, moves, i, square, BITS.CAPTURE);
            } else if (square === ep_square) {
              add_move(board, moves, i, ep_square, BITS.EP_CAPTURE);
            }
          }
        } else if (piece_type === true || piece_type === piece.type) {
          for (var j = 0, len = PIECE_OFFSETS[piece.type].length; j < len; j++) {
            var offset = PIECE_OFFSETS[piece.type][j];
            var square = i;
            while (true) {
              square += offset;
              if (square & 0x88) break;
              if (board[square] == null) {
                add_move(board, moves, i, square, BITS.NORMAL);
              } else {
                if (board[square].color === us) break;
                add_move(board, moves, i, square, BITS.CAPTURE);
                break;
              }

              /* break, if knight or king */
              if (piece.type === 'n' || piece.type === 'k') break;
            }
          }
        }
      }

      /* check for castling if: a) we're generating all moves, or b) we're doing
       * single square move generation on the king's square
       */
      if (piece_type === true || piece_type === KING) {
        if (!single_square || last_sq === kings[us]) {
          /* king-side castling */
          if (castling[us] & BITS.KSIDE_CASTLE) {
            var castling_from = kings[us];
            var castling_to = castling_from + 2;
            if (
              board[castling_from + 1] == null &&
              board[castling_to] == null &&
              !attacked(them, kings[us]) &&
              !attacked(them, castling_from + 1) &&
              !attacked(them, castling_to)
            ) {
              add_move(board, moves, kings[us], castling_to, BITS.KSIDE_CASTLE);
            }
          }

          /* queen-side castling */
          if (castling[us] & BITS.QSIDE_CASTLE) {
            var castling_from = kings[us];
            var castling_to = castling_from - 2;
            if (
              board[castling_from - 1] == null &&
              board[castling_from - 2] == null &&
              board[castling_from - 3] == null &&
              !attacked(them, kings[us]) &&
              !attacked(them, castling_from - 1) &&
              !attacked(them, castling_to)
            ) {
              add_move(board, moves, kings[us], castling_to, BITS.QSIDE_CASTLE);
            }
          }
        }
      }

      /* return all pseudo-legal moves (this includes moves that allow the king
       * to be captured)
       */
      if (!legal) {
        return moves;
      }

      /* filter out illegal moves */
      var legal_moves = [];
      for (var i = 0, len = moves.length; i < len; i++) {
        make_move(moves[i]);
        if (!king_attacked(us)) {
          legal_moves.push(moves[i]);
        }
        undo_move();
      }
      return legal_moves;
    }

    /* convert a move from 0x88 coordinates to Standard Algebraic Notation
     * (SAN)
     *
     * @param {boolean} sloppy Use the sloppy SAN generator to work around over
     * disambiguation bugs in Fritz and Chessbase.  See below:
     *
     * r1bqkbnr/ppp2ppp/2n5/1B1pP3/4P3/8/PPPP2PP/RNBQK1NR b KQkq - 2 4
     * 4. ... Nge7 is overly disambiguated because the knight on c6 is pinned
     * 4. ... Ne7 is technically the valid SAN
     */
    function move_to_san(move, moves) {
      var output = '';
      if (move.flags & BITS.KSIDE_CASTLE) {
        output = 'O-O';
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        output = 'O-O-O';
      } else {
        if (move.piece !== PAWN) {
          var disambiguator = get_disambiguator(move, moves);
          output += move.piece.toUpperCase() + disambiguator;
        }
        if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
          if (move.piece === PAWN) {
            output += algebraic(move.from)[0];
          }
          output += 'x';
        }
        output += algebraic(move.to);
        if (move.flags & BITS.PROMOTION) {
          output += '=' + move.promotion.toUpperCase();
        }
      }
      make_move(move);
      if (in_check()) {
        if (in_checkmate()) {
          output += '#';
        } else {
          output += '+';
        }
      }
      undo_move();
      return output;
    }
    // parses all of the decorators out of a SAN string
    function stripped_san(move) {
      return move.replace(/=/, '').replace(/[+#]?[?!]*$/, '');
    }
    function attacked(color, square) {
      for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
        /* did we run off the end of the board */
        if (i & 0x88) {
          i += 7;
          continue;
        }

        /* if empty square or wrong color */
        if (board[i] == null || board[i].color !== color) continue;
        var piece = board[i];
        var difference = i - square;
        var index = difference + 119;
        if (ATTACKS[index] & (1 << SHIFTS[piece.type])) {
          if (piece.type === PAWN) {
            if (difference > 0) {
              if (piece.color === WHITE) return true;
            } else {
              if (piece.color === BLACK) return true;
            }
            continue;
          }

          /* if the piece is a knight or a king */
          if (piece.type === 'n' || piece.type === 'k') return true;
          var offset = RAYS[index];
          var j = i + offset;
          var blocked = false;
          while (j !== square) {
            if (board[j] != null) {
              blocked = true;
              break;
            }
            j += offset;
          }
          if (!blocked) return true;
        }
      }
      return false;
    }
    function king_attacked(color) {
      return attacked(swap_color(color), kings[color]);
    }
    function in_check() {
      return king_attacked(turn);
    }
    function in_checkmate() {
      return in_check() && generate_moves().length === 0;
    }
    function in_stalemate() {
      return !in_check() && generate_moves().length === 0;
    }
    function insufficient_material() {
      var pieces = {};
      var bishops = [];
      var num_pieces = 0;
      var sq_color = 0;
      for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
        sq_color = (sq_color + 1) % 2;
        if (i & 0x88) {
          i += 7;
          continue;
        }
        var piece = board[i];
        if (piece) {
          pieces[piece.type] = piece.type in pieces ? pieces[piece.type] + 1 : 1;
          if (piece.type === BISHOP) {
            bishops.push(sq_color);
          }
          num_pieces++;
        }
      }

      /* k vs. k */
      if (num_pieces === 2) {
        return true;
      } else if (
        /* k vs. kn .... or .... k vs. kb */
        num_pieces === 3 &&
        (pieces[BISHOP] === 1 || pieces[KNIGHT] === 1)
      ) {
        return true;
      } else if (num_pieces === pieces[BISHOP] + 2) {
        /* kb vs. kb where any number of bishops are all on the same color */
        var sum = 0;
        var len = bishops.length;
        for (var i = 0; i < len; i++) {
          sum += bishops[i];
        }
        if (sum === 0 || sum === len) {
          return true;
        }
      }
      return false;
    }
    function in_threefold_repetition() {
      /* TODO: while this function is fine for casual use, a better
       * implementation would use a Zobrist key (instead of FEN). the
       * Zobrist key would be maintained in the make_move/undo_move functions,
       * avoiding the costly that we do below.
       */
      var moves = [];
      var positions = {};
      var repetition = false;
      while (true) {
        var move = undo_move();
        if (!move) break;
        moves.push(move);
      }
      while (true) {
        /* remove the last two fields in the FEN string, they're not needed
         * when checking for draw by rep */
        var fen = generate_fen().split(' ').slice(0, 4).join(' ');

        /* has the position occurred three or move times */
        positions[fen] = fen in positions ? positions[fen] + 1 : 1;
        if (positions[fen] >= 3) {
          repetition = true;
        }
        if (!moves.length) {
          break;
        }
        make_move(moves.pop());
      }
      return repetition;
    }
    function push(move) {
      history.push({
        move: move,
        kings: {
          b: kings.b,
          w: kings.w,
        },
        turn: turn,
        castling: {
          b: castling.b,
          w: castling.w,
        },
        ep_square: ep_square,
        half_moves: half_moves,
        move_number: move_number,
      });
    }
    function make_move(move) {
      var us = turn;
      var them = swap_color(us);
      push(move);
      board[move.to] = board[move.from];
      board[move.from] = null;

      /* if ep capture, remove the captured pawn */
      if (move.flags & BITS.EP_CAPTURE) {
        if (turn === BLACK) {
          board[move.to - 16] = null;
        } else {
          board[move.to + 16] = null;
        }
      }

      /* if pawn promotion, replace with new piece */
      if (move.flags & BITS.PROMOTION) {
        board[move.to] = {
          type: move.promotion,
          color: us,
        };
      }

      /* if we moved the king */
      if (board[move.to].type === KING) {
        kings[board[move.to].color] = move.to;

        /* if we castled, move the rook next to the king */
        if (move.flags & BITS.KSIDE_CASTLE) {
          var castling_to = move.to - 1;
          var castling_from = move.to + 1;
          board[castling_to] = board[castling_from];
          board[castling_from] = null;
        } else if (move.flags & BITS.QSIDE_CASTLE) {
          var castling_to = move.to + 1;
          var castling_from = move.to - 2;
          board[castling_to] = board[castling_from];
          board[castling_from] = null;
        }

        /* turn off castling */
        castling[us] = '';
      }

      /* turn off castling if we move a rook */
      if (castling[us]) {
        for (var i = 0, len = ROOKS[us].length; i < len; i++) {
          if (move.from === ROOKS[us][i].square && castling[us] & ROOKS[us][i].flag) {
            castling[us] ^= ROOKS[us][i].flag;
            break;
          }
        }
      }

      /* turn off castling if we capture a rook */
      if (castling[them]) {
        for (var i = 0, len = ROOKS[them].length; i < len; i++) {
          if (move.to === ROOKS[them][i].square && castling[them] & ROOKS[them][i].flag) {
            castling[them] ^= ROOKS[them][i].flag;
            break;
          }
        }
      }

      /* if big pawn move, update the en passant square */
      if (move.flags & BITS.BIG_PAWN) {
        if (turn === 'b') {
          ep_square = move.to - 16;
        } else {
          ep_square = move.to + 16;
        }
      } else {
        ep_square = EMPTY;
      }

      /* reset the 50 move counter if a pawn is moved or a piece is captured */
      if (move.piece === PAWN) {
        half_moves = 0;
      } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
        half_moves = 0;
      } else {
        half_moves++;
      }
      if (turn === BLACK) {
        move_number++;
      }
      turn = swap_color(turn);
    }
    function undo_move() {
      var old = history.pop();
      if (old == null) {
        return null;
      }
      var move = old.move;
      kings = old.kings;
      turn = old.turn;
      castling = old.castling;
      ep_square = old.ep_square;
      half_moves = old.half_moves;
      move_number = old.move_number;
      var us = turn;
      var them = swap_color(turn);
      board[move.from] = board[move.to];
      board[move.from].type = move.piece; // to undo any promotions
      board[move.to] = null;
      if (move.flags & BITS.CAPTURE) {
        board[move.to] = {
          type: move.captured,
          color: them,
        };
      } else if (move.flags & BITS.EP_CAPTURE) {
        var index;
        if (us === BLACK) {
          index = move.to - 16;
        } else {
          index = move.to + 16;
        }
        board[index] = {
          type: PAWN,
          color: them,
        };
      }
      if (move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
        var castling_to, castling_from;
        if (move.flags & BITS.KSIDE_CASTLE) {
          castling_to = move.to + 1;
          castling_from = move.to - 1;
        } else if (move.flags & BITS.QSIDE_CASTLE) {
          castling_to = move.to - 2;
          castling_from = move.to + 1;
        }
        board[castling_to] = board[castling_from];
        board[castling_from] = null;
      }
      return move;
    }

    /* this function is used to uniquely identify ambiguous moves */
    function get_disambiguator(move, moves) {
      var from = move.from;
      var to = move.to;
      var piece = move.piece;
      var ambiguities = 0;
      var same_rank = 0;
      var same_file = 0;
      for (var i = 0, len = moves.length; i < len; i++) {
        var ambig_from = moves[i].from;
        var ambig_to = moves[i].to;
        var ambig_piece = moves[i].piece;

        /* if a move of the same piece type ends on the same to square, we'll
         * need to add a disambiguator to the algebraic notation
         */
        if (piece === ambig_piece && from !== ambig_from && to === ambig_to) {
          ambiguities++;
          if (rank(from) === rank(ambig_from)) {
            same_rank++;
          }
          if (file(from) === file(ambig_from)) {
            same_file++;
          }
        }
      }
      if (ambiguities > 0) {
        /* if there exists a similar moving piece on the same rank and file as
         * the move in question, use the square as the disambiguator
         */
        if (same_rank > 0 && same_file > 0) {
          return algebraic(from);
        } else if (same_file > 0) {
          /* if the moving piece rests on the same file, use the rank symbol as the
           * disambiguator
           */
          return algebraic(from).charAt(1);
        } else {
          /* else use the file symbol */
          return algebraic(from).charAt(0);
        }
      }
      return '';
    }
    function infer_piece_type(san) {
      var piece_type = san.charAt(0);
      if (piece_type >= 'a' && piece_type <= 'h') {
        var matches = san.match(/[a-h]\d.*[a-h]\d/);
        if (matches) {
          return undefined;
        }
        return PAWN;
      }
      piece_type = piece_type.toLowerCase();
      if (piece_type === 'o') {
        return KING;
      }
      return piece_type;
    }
    function ascii() {
      var s = '   +------------------------+\n';
      for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
        /* display the rank */
        if (file(i) === 0) {
          s += ' ' + '87654321'[rank(i)] + ' |';
        }

        /* empty piece */
        if (board[i] == null) {
          s += ' . ';
        } else {
          var piece = board[i].type;
          var color = board[i].color;
          var symbol = color === WHITE ? piece.toUpperCase() : piece.toLowerCase();
          s += ' ' + symbol + ' ';
        }
        if ((i + 1) & 0x88) {
          s += '|\n';
          i += 8;
        }
      }
      s += '   +------------------------+\n';
      s += '     a  b  c  d  e  f  g  h\n';
      return s;
    }

    // convert a move from Standard Algebraic Notation (SAN) to 0x88 coordinates
    function move_from_san(move, sloppy) {
      // strip off any move decorations: e.g Nf3+?!
      var clean_move = stripped_san(move);

      // if we're using the sloppy parser run a regex to grab piece, to, and from
      // this should parse invalid SAN like: Pe2-e4, Rc1c4, Qf3xf7
      if (sloppy) {
        var matches = clean_move.match(
          /([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/
        );
        if (matches) {
          var piece = matches[1];
          var from = matches[2];
          var to = matches[3];
          var promotion = matches[4];
        }
      }
      var piece_type = infer_piece_type(clean_move);
      var moves = null;
      var legalMoves = generate_moves({
        legal: true,
        piece: piece ? piece : piece_type,
      });
      moves = legalMoves;
      if (sloppy) {
        var illegalMoves = generate_moves({
          legal: false,
          piece: piece ? piece : piece_type,
        });
        moves = illegalMoves;
      }
      for (var i = 0, len = moves.length; i < len; i++) {
        // try the strict parser first, then the sloppy parser if requested
        // by the user
        if (
          clean_move === stripped_san(move_to_san(moves[i], legalMoves)) ||
          (sloppy && clean_move === stripped_san(move_to_san(moves[i], illegalMoves)))
        ) {
          return moves[i];
        } else {
          if (
            matches &&
            (!piece || piece.toLowerCase() == moves[i].piece) &&
            SQUARES[from] == moves[i].from &&
            SQUARES[to] == moves[i].to &&
            (!promotion || promotion.toLowerCase() == moves[i].promotion)
          ) {
            return moves[i];
          }
        }
      }
      return null;
    }

    /*****************************************************************************
     * UTILITY FUNCTIONS
     ****************************************************************************/
    function rank(i) {
      return i >> 4;
    }
    function file(i) {
      return i & 15;
    }
    function algebraic(i) {
      var f = file(i),
        r = rank(i);
      return 'abcdefgh'.substring(f, f + 1) + '87654321'.substring(r, r + 1);
    }
    function swap_color(c) {
      return c === WHITE ? BLACK : WHITE;
    }
    function is_digit(c) {
      return '0123456789'.indexOf(c) !== -1;
    }

    /* pretty = external move object */
    function make_pretty(ugly_move) {
      var move = clone(ugly_move);
      move.san = move_to_san(
        move,
        generate_moves({
          legal: true,
        })
      );
      move.to = algebraic(move.to);
      move.from = algebraic(move.from);
      var flags = '';
      for (var flag in BITS) {
        if (BITS[flag] & move.flags) {
          flags += FLAGS[flag];
        }
      }
      move.flags = flags;
      return move;
    }
    function clone(obj) {
      var dupe = obj instanceof Array ? [] : {};
      for (var property in obj) {
        if (typeof property === 'object') {
          dupe[property] = clone(obj[property]);
        } else {
          dupe[property] = obj[property];
        }
      }
      return dupe;
    }
    function trim(str) {
      return str.replace(/^\s+|\s+$/g, '');
    }

    /*****************************************************************************
     * DEBUGGING UTILITIES
     ****************************************************************************/
    function perft(depth) {
      var moves = generate_moves({
        legal: false,
      });
      var nodes = 0;
      var color = turn;
      for (var i = 0, len = moves.length; i < len; i++) {
        make_move(moves[i]);
        if (!king_attacked(color)) {
          if (depth - 1 > 0) {
            var child_nodes = perft(depth - 1);
            nodes += child_nodes;
          } else {
            nodes++;
          }
        }
        undo_move();
      }
      return nodes;
    }
    return {
      /***************************************************************************
       * PUBLIC CONSTANTS (is there a better way to do this?)
       **************************************************************************/
      WHITE: WHITE,
      BLACK: BLACK,
      PAWN: PAWN,
      KNIGHT: KNIGHT,
      BISHOP: BISHOP,
      ROOK: ROOK,
      QUEEN: QUEEN,
      KING: KING,
      SQUARES: (function () {
        /* from the ECMA-262 spec (section 12.6.4):
         * "The mechanics of enumerating the properties ... is
         * implementation dependent"
         * so: for (var sq in SQUARES) { keys.push(sq); } might not be
         * ordered correctly
         */
        var keys = [];
        for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
          if (i & 0x88) {
            i += 7;
            continue;
          }
          keys.push(algebraic(i));
        }
        return keys;
      })(),
      FLAGS: FLAGS,
      /***************************************************************************
       * PUBLIC API
       **************************************************************************/
      load: function (fen) {
        return load(fen);
      },
      reset: function () {
        return reset();
      },
      moves: function (options) {
        /* The internal representation of a chess move is in 0x88 format, and
         * not meant to be human-readable.  The code below converts the 0x88
         * square coordinates to algebraic coordinates.  It also prunes an
         * unnecessary move keys resulting from a verbose call.
         */

        var ugly_moves = generate_moves(options);
        var moves = [];
        for (var i = 0, len = ugly_moves.length; i < len; i++) {
          /* does the user want a full move object (most likely not), or just
           * SAN
           */
          if (typeof options !== 'undefined' && 'verbose' in options && options.verbose) {
            moves.push(make_pretty(ugly_moves[i]));
          } else {
            moves.push(
              move_to_san(
                ugly_moves[i],
                generate_moves({
                  legal: true,
                })
              )
            );
          }
        }
        return moves;
      },
      in_check: function () {
        return in_check();
      },
      in_checkmate: function () {
        return in_checkmate();
      },
      in_stalemate: function () {
        return in_stalemate();
      },
      in_draw: function () {
        return (
          half_moves >= 100 ||
          in_stalemate() ||
          insufficient_material() ||
          in_threefold_repetition()
        );
      },
      insufficient_material: function () {
        return insufficient_material();
      },
      in_threefold_repetition: function () {
        return in_threefold_repetition();
      },
      game_over: function () {
        return (
          half_moves >= 100 ||
          in_checkmate() ||
          in_stalemate() ||
          insufficient_material() ||
          in_threefold_repetition()
        );
      },
      validate_fen: function (fen) {
        return validate_fen(fen);
      },
      fen: function () {
        return generate_fen();
      },
      board: function () {
        var output = [],
          row = [];
        for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
          if (board[i] == null) {
            row.push(null);
          } else {
            row.push({
              type: board[i].type,
              color: board[i].color,
            });
          }
          if ((i + 1) & 0x88) {
            output.push(row);
            row = [];
            i += 8;
          }
        }
        return output;
      },
      pgn: function (options) {
        /* using the specification from http://www.chessclub.com/help/PGN-spec
         * example for html usage: .pgn({ max_width: 72, newline_char: "<br />" })
         */
        var newline =
          typeof options === 'object' && typeof options.newline_char === 'string'
            ? options.newline_char
            : '\n';
        var max_width =
          typeof options === 'object' && typeof options.max_width === 'number'
            ? options.max_width
            : 0;
        var result = [];
        var header_exists = false;

        /* add the PGN header headerrmation */
        for (var i in header) {
          /* TODO: order of enumerated properties in header object is not
           * guaranteed, see ECMA-262 spec (section 12.6.4)
           */
          result.push('[' + i + ' "' + header[i] + '"]' + newline);
          header_exists = true;
        }
        if (header_exists && history.length) {
          result.push(newline);
        }
        var append_comment = function (move_string) {
          var comment = comments[generate_fen()];
          if (typeof comment !== 'undefined') {
            var delimiter = move_string.length > 0 ? ' ' : '';
            move_string = `${move_string}${delimiter}{${comment}}`;
          }
          return move_string;
        };

        /* pop all of history onto reversed_history */
        var reversed_history = [];
        while (history.length > 0) {
          reversed_history.push(undo_move());
        }
        var moves = [];
        var move_string = '';

        /* special case of a commented starting position with no moves */
        if (reversed_history.length === 0) {
          moves.push(append_comment(''));
        }

        /* build the list of moves.  a move_string looks like: "3. e3 e6" */
        while (reversed_history.length > 0) {
          move_string = append_comment(move_string);
          var move = reversed_history.pop();

          /* if the position started with black to move, start PGN with 1. ... */
          if (!history.length && move.color === 'b') {
            move_string = move_number + '. ...';
          } else if (move.color === 'w') {
            /* store the previous generated move_string if we have one */
            if (move_string.length) {
              moves.push(move_string);
            }
            move_string = move_number + '.';
          }
          move_string =
            move_string +
            ' ' +
            move_to_san(
              move,
              generate_moves({
                legal: false,
              })
            );
          make_move(move);
        }

        /* are there any other leftover moves? */
        if (move_string.length) {
          moves.push(append_comment(move_string));
        }

        /* is there a result? */
        if (typeof header.Result !== 'undefined') {
          moves.push(header.Result);
        }

        /* history should be back to what it was before we started generating PGN,
         * so join together moves
         */
        if (max_width === 0) {
          return result.join('') + moves.join(' ');
        }
        var strip = function () {
          if (result.length > 0 && result[result.length - 1] === ' ') {
            result.pop();
            return true;
          }
          return false;
        };

        /* NB: this does not preserve comment whitespace. */
        var wrap_comment = function (width, move) {
          for (var token of move.split(' ')) {
            if (!token) {
              continue;
            }
            if (width + token.length > max_width) {
              while (strip()) {
                width--;
              }
              result.push(newline);
              width = 0;
            }
            result.push(token);
            width += token.length;
            result.push(' ');
            width++;
          }
          if (strip()) {
            width--;
          }
          return width;
        };

        /* wrap the PGN output at max_width */
        var current_width = 0;
        for (var i = 0; i < moves.length; i++) {
          if (current_width + moves[i].length > max_width) {
            if (moves[i].includes('{')) {
              current_width = wrap_comment(current_width, moves[i]);
              continue;
            }
          }
          /* if the current move will push past max_width */
          if (current_width + moves[i].length > max_width && i !== 0) {
            /* don't end the line with whitespace */
            if (result[result.length - 1] === ' ') {
              result.pop();
            }
            result.push(newline);
            current_width = 0;
          } else if (i !== 0) {
            result.push(' ');
            current_width++;
          }
          result.push(moves[i]);
          current_width += moves[i].length;
        }
        return result.join('');
      },
      load_pgn: function (pgn, options) {
        // allow the user to specify the sloppy move parser to work around over
        // disambiguation bugs in Fritz and Chessbase
        var sloppy = typeof options !== 'undefined' && 'sloppy' in options ? options.sloppy : false;
        function mask(str) {
          return str.replace(/\\/g, '\\');
        }
        function has_keys(object) {
          for (var key in object) {
            return true;
          }
          return false;
        }
        function parse_pgn_header(header, options) {
          var newline_char =
            typeof options === 'object' && typeof options.newline_char === 'string'
              ? options.newline_char
              : '\r?\n';
          var header_obj = {};
          var headers = header.split(new RegExp(mask(newline_char)));
          var key = '';
          var value = '';
          for (var i = 0; i < headers.length; i++) {
            key = headers[i].replace(/^\[([A-Z][A-Za-z]*)\s.*\]$/, '$1');
            value = headers[i].replace(/^\[[A-Za-z]+\s"(.*)"\ *\]$/, '$1');
            if (trim(key).length > 0) {
              header_obj[key] = value;
            }
          }
          return header_obj;
        }
        var newline_char =
          typeof options === 'object' && typeof options.newline_char === 'string'
            ? options.newline_char
            : '\r?\n';

        // RegExp to split header. Takes advantage of the fact that header and movetext
        // will always have a blank line between them (ie, two newline_char's).
        // With default newline_char, will equal: /^(\[((?:\r?\n)|.)*\])(?:\r?\n){2}/
        var header_regex = new RegExp(
          '^(\\[((?:' + mask(newline_char) + ')|.)*\\])' + '(?:' + mask(newline_char) + '){2}'
        );

        // If no header given, begin with moves.
        var header_string = header_regex.test(pgn) ? header_regex.exec(pgn)[1] : '';

        // Put the board in the starting position
        reset();

        /* parse PGN header */
        var headers = parse_pgn_header(header_string, options);
        for (var key in headers) {
          set_header([key, headers[key]]);
        }

        /* load the starting position indicated by [Setup '1'] and
         * [FEN position] */
        if (headers['SetUp'] === '1') {
          if (!('FEN' in headers && load(headers['FEN'], true))) {
            // second argument to load: don't clear the headers
            return false;
          }
        }

        /* NB: the regexes below that delete move numbers, recursive
         * annotations, and numeric annotation glyphs may also match
         * text in comments. To prevent this, we transform comments
         * by hex-encoding them in place and decoding them again after
         * the other tokens have been deleted.
         *
         * While the spec states that PGN files should be ASCII encoded,
         * we use {en,de}codeURIComponent here to support arbitrary UTF8
         * as a convenience for modern users */

        var to_hex = function (string) {
          return Array.from(string)
            .map(function (c) {
              /* encodeURI doesn't transform most ASCII characters,
               * so we handle these ourselves */
              return c.charCodeAt(0) < 128
                ? c.charCodeAt(0).toString(16)
                : encodeURIComponent(c).replace(/\%/g, '').toLowerCase();
            })
            .join('');
        };
        var from_hex = function (string) {
          return string.length == 0
            ? ''
            : decodeURIComponent('%' + string.match(/.{1,2}/g).join('%'));
        };
        var encode_comment = function (string) {
          string = string.replace(new RegExp(mask(newline_char), 'g'), ' ');
          return `{${to_hex(string.slice(1, string.length - 1))}}`;
        };
        var decode_comment = function (string) {
          if (string.startsWith('{') && string.endsWith('}')) {
            return from_hex(string.slice(1, string.length - 1));
          }
        };

        /* delete header to get the moves */
        var ms = pgn
          .replace(header_string, '')
          .replace(
            /* encode comments so they don't get deleted below */
            new RegExp(`(\{[^}]*\})+?|;([^${mask(newline_char)}]*)`, 'g'),
            function (match, bracket, semicolon) {
              return bracket !== undefined
                ? encode_comment(bracket)
                : ' ' + encode_comment(`{${semicolon.slice(1)}}`);
            }
          )
          .replace(new RegExp(mask(newline_char), 'g'), ' ');

        /* delete recursive annotation variations */
        var rav_regex = /(\([^\(\)]+\))+?/g;
        while (rav_regex.test(ms)) {
          ms = ms.replace(rav_regex, '');
        }

        /* delete move numbers */
        ms = ms.replace(/\d+\.(\.\.)?/g, '');

        /* delete ... indicating black to move */
        ms = ms.replace(/\.\.\./g, '');

        /* delete numeric annotation glyphs */
        ms = ms.replace(/\$\d+/g, '');

        /* trim and get array of moves */
        var moves = trim(ms).split(new RegExp(/\s+/));

        /* delete empty entries */
        moves = moves.join(',').replace(/,,+/g, ',').split(',');
        var move = '';
        for (var half_move = 0; half_move < moves.length - 1; half_move++) {
          var comment = decode_comment(moves[half_move]);
          if (comment !== undefined) {
            comments[generate_fen()] = comment;
            continue;
          }
          move = move_from_san(moves[half_move], sloppy);

          /* move not possible! (don't clear the board to examine to show the
           * latest valid position)
           */
          if (move == null) {
            return false;
          } else {
            make_move(move);
          }
        }
        comment = decode_comment(moves[moves.length - 1]);
        if (comment !== undefined) {
          comments[generate_fen()] = comment;
          moves.pop();
        }

        /* examine last move */
        move = moves[moves.length - 1];
        if (POSSIBLE_RESULTS.indexOf(move) > -1) {
          if (has_keys(header) && typeof header.Result === 'undefined') {
            set_header(['Result', move]);
          }
        } else {
          move = move_from_san(move, sloppy);
          if (move == null) {
            return false;
          } else {
            make_move(move);
          }
        }
        return true;
      },
      header: function () {
        return set_header(arguments);
      },
      ascii: function () {
        return ascii();
      },
      turn: function () {
        return turn;
      },
      move: function (move, options) {
        /* The move function can be called with in the following parameters:
         *
         * .move('Nxb7')      <- where 'move' is a case-sensitive SAN string
         *
         * .move({ from: 'h7', <- where the 'move' is a move object (additional
         *         to :'h8',      fields are ignored)
         *         promotion: 'q',
         *      })
         */

        // allow the user to specify the sloppy move parser to work around over
        // disambiguation bugs in Fritz and Chessbase
        var sloppy = typeof options !== 'undefined' && 'sloppy' in options ? options.sloppy : false;
        var move_obj = null;
        if (typeof move === 'string') {
          move_obj = move_from_san(move, sloppy);
        } else if (typeof move === 'object') {
          var moves = generate_moves();

          /* convert the pretty move object to an ugly move object */
          for (var i = 0, len = moves.length; i < len; i++) {
            if (
              move.from === algebraic(moves[i].from) &&
              move.to === algebraic(moves[i].to) &&
              (!('promotion' in moves[i]) || move.promotion === moves[i].promotion)
            ) {
              move_obj = moves[i];
              break;
            }
          }
        }

        /* failed to find move */
        if (!move_obj) {
          return null;
        }

        /* need to make a copy of move because we can't generate SAN after the
         * move is made
         */
        var pretty_move = make_pretty(move_obj);
        make_move(move_obj);
        return pretty_move;
      },
      undo: function () {
        var move = undo_move();
        return move ? make_pretty(move) : null;
      },
      clear: function () {
        return clear();
      },
      put: function (piece, square) {
        return put(piece, square);
      },
      get: function (square) {
        return get(square);
      },
      remove: function (square) {
        return remove(square);
      },
      perft: function (depth) {
        return perft(depth);
      },
      square_color: function (square) {
        if (square in SQUARES) {
          var sq_0x88 = SQUARES[square];
          return (rank(sq_0x88) + file(sq_0x88)) % 2 === 0 ? 'light' : 'dark';
        }
        return null;
      },
      history: function (options) {
        var reversed_history = [];
        var move_history = [];
        var verbose = typeof options !== 'undefined' && 'verbose' in options && options.verbose;
        while (history.length > 0) {
          reversed_history.push(undo_move());
        }
        while (reversed_history.length > 0) {
          var move = reversed_history.pop();
          if (verbose) {
            move_history.push(make_pretty(move));
          } else {
            move_history.push(
              move_to_san(
                move,
                generate_moves({
                  legal: true,
                })
              )
            );
          }
          make_move(move);
        }
        return move_history;
      },
      get_comment: function () {
        return comments[generate_fen()];
      },
      set_comment: function (comment) {
        comments[generate_fen()] = comment.replace('{', '[').replace('}', ']');
      },
      delete_comment: function () {
        var comment = comments[generate_fen()];
        delete comments[generate_fen()];
        return comment;
      },
      get_comments: function () {
        prune_comments();
        return Object.keys(comments).map(function (fen) {
          return {
            fen: fen,
            comment: comments[fen],
          };
        });
      },
      delete_comments: function () {
        prune_comments();
        return Object.keys(comments).map(function (fen) {
          var comment = comments[fen];
          delete comments[fen];
          return {
            fen: fen,
            comment: comment,
          };
        });
      },
    };
  };

  /* export Chess object if using node or any other CommonJS compatible
   * environment */
  exports.Chess = Chess;
});

const validateKings = (fen) => {
  if (!fen) {
    return false;
  }
  const position = fen.split(' ')[0];
  return (position.match(/k/g) || []).length === 1 && (position.match(/K/g) || []).length === 1;
};
const isValidFen = (fen) => {
  const chess$1 = new chess.Chess(fen);
  return chess$1.validate_fen(fen) && validateKings(fen);
};

/**
 * Legal chess moves for chessground
 * @param {*} chess
 */
const toDests = (chess) => {
  if (!isValidFen(chess.fen())) {
    return;
  }
  const dests = new Map();
  const color = chess.turn() === 'w' ? 'white' : 'black';
  chess.SQUARES.forEach((s) => {
    const ms = chess.moves({
      square: s,
      verbose: true,
    });
    if (ms.length) {
      dests.set(
        s,
        ms.map((m) => m.to)
      );
    }
  });
  return {
    color,
    // who's turn is it
    dests,
    // what to move
    free: false,
  };
};

const fen = {
  initial: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  empty: '8/8/8/8/8/8/8/8 w - - 0 1',
};
const initialFen = fen.initial;
const emptyFen = fen.empty;
const constants = {
  fen,
  initialFen,
  emptyFen,
};

const useChess = (props) => {
  const [fen, setFen] = React.useState(props.fen || initialFen);
  const [chess$1, setChess] = React.useState(new chess.Chess(fen));

  // reinitialize when FEN changes from props
  React.useEffect(() => {
    if (props.fen) {
      setFen(props.fen);
      setChess(new chess.Chess(props.fen));
      setLastMove([]);
    }
  }, [props.fen, props.reset]);
  const [lastMove, setLastMove] = React.useState([]);
  const promotion = props.lastMove && props.lastMove.promotion;
  const turnColor = chess$1.turn() === 'w' ? 'white' : 'black';
  const [orientation] = React.useState(props.orientation || turnColor);
  const onMove = (from, to, promotion) => {
    const move = chess$1.move({
      from,
      to,
      promotion,
    });
    setLastMove([from, to]);
    setFen(chess$1.fen());
    return move;
  };
  const onPromote = (promotion) => {
    const move = onMove(lastMove[0], lastMove[1], promotion);
    return move;
  };
  return {
    chess: chess$1,
    fen,
    turnColor,
    lastMove,
    orientation,
    promotion,
    onMove,
    onPromote,
  };
};

var reactPureModal_min = createCommonjsModule(function (module, exports) {
  !(function (e, t) {
    module.exports = t(React__default['default'], require$$1__default['default']);
  })(commonjsGlobal, function (e, t) {
    return (function (e) {
      var t = {};
      function o(n) {
        if (t[n]) return t[n].exports;
        var a = (t[n] = {
          i: n,
          l: !1,
          exports: {},
        });
        return e[n].call(a.exports, a, a.exports, o), (a.l = !0), a.exports;
      }
      return (
        (o.m = e),
        (o.c = t),
        (o.d = function (e, t, n) {
          o.o(e, t) ||
            Object.defineProperty(e, t, {
              enumerable: !0,
              get: n,
            });
        }),
        (o.r = function (e) {
          'undefined' != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, {
              value: 'Module',
            }),
            Object.defineProperty(e, '__esModule', {
              value: !0,
            });
        }),
        (o.t = function (e, t) {
          if ((1 & t && (e = o(e)), 8 & t)) return e;
          if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
          var n = Object.create(null);
          if (
            (o.r(n),
            Object.defineProperty(n, 'default', {
              enumerable: !0,
              value: e,
            }),
            2 & t && 'string' != typeof e)
          )
            for (var a in e)
              o.d(
                n,
                a,
                function (t) {
                  return e[t];
                }.bind(null, a)
              );
          return n;
        }),
        (o.n = function (e) {
          var t =
            e && e.__esModule
              ? function () {
                  return e.default;
                }
              : function () {
                  return e;
                };
          return o.d(t, 'a', t), t;
        }),
        (o.o = function (e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (o.p = ''),
        o((o.s = 3))
      );
    })([
      function (t, o) {
        t.exports = e;
      },
      function (e, o) {
        e.exports = t;
      },
      function (e, t, o) {},
      function (e, t, o) {
        o.r(t);
        var n = o(0),
          a = o.n(n),
          r = o(1);
        function c(e) {
          const {
            children: t,
            replace: o,
            bodyClass: n,
            header: r,
            footer: c,
            onDragStart: u,
            onDragEnd: l,
            onClose: s,
            closeButton: i,
            closeButtonPosition: d,
          } = e;
          return o
            ? t
            : a.a.createElement(
                'div',
                {
                  className: 'panel panel-default ' + ('bottom' === d ? 'additional-row' : ''),
                },
                a.a.createElement(
                  'div',
                  {
                    className: 'panel-heading',
                    onTouchStart: u,
                    onMouseDown: u,
                    onTouchEnd: l,
                    onMouseUp: l,
                  },
                  r &&
                    a.a.createElement(
                      'h3',
                      {
                        className: 'panel-title',
                      },
                      r
                    )
                ),
                a.a.createElement(
                  'div',
                  {
                    className: n,
                  },
                  t
                ),
                c &&
                  a.a.createElement(
                    'div',
                    {
                      className: 'panel-footer',
                    },
                    c
                  ),
                a.a.createElement(
                  'div',
                  {
                    className: 'close',
                    onClick: s,
                    style: {
                      position: 'header' === d ? 'absolute' : 'static',
                      margin: 'bottom' === d ? '10px auto' : '',
                    },
                  },
                  i
                )
              );
        }
        c.defaultProps = {
          closeButton: '×',
          closeButtonPosition: 'header',
          replace: !1,
          draggable: !1,
        };
        var u = c;
        o(2);
        function l(e) {
          let t = Math.random().toString();
          const [o, c] = Object(n.useState)(!1),
            [l, s] = Object(n.useState)(null),
            [i, d] = Object(n.useState)(null),
            [f, p] = Object(n.useState)(0),
            [m, b] = Object(n.useState)(0),
            [g, v] = Object(n.useState)(0),
            [h, y] = Object(n.useState)(0),
            { isOpen: j, onClose: E } = e;
          Object(n.useEffect)(
            () => (
              j &&
                (function (e) {
                  e && (e.stopPropagation(), e.preventDefault());
                  !(function () {
                    document.addEventListener('keydown', O),
                      document.activeElement instanceof HTMLElement &&
                        document.activeElement.blur();
                    document.body.classList.add('body-modal-fix');
                  })();
                })(),
              () => {
                j && x();
              }
            ),
            [j]
          );
          const O = Object(n.useCallback)((e) => {
            const o = document.querySelectorAll('.pure-modal');
            if (o.length && o[o.length - 1].classList.contains(t)) return !1;
            27 === e.keyCode && document.activeElement && x(e);
          }, []);
          if (!j) return null;
          function x(e) {
            e && (e.stopPropagation(), e.preventDefault()),
              E &&
                E(
                  e
                    ? {
                        isPassive: !0,
                      }
                    : {
                        isPassive: !1,
                      }
                ),
              document.removeEventListener('keydown', O),
              document.body.classList.remove('body-modal-fix'),
              s(null),
              d(null),
              p(0),
              b(0),
              v(0),
              y(0);
          }
          function S(e) {
            return e instanceof TouchEvent && e.changedTouches.length > 0
              ? {
                  pageX: e.changedTouches[0].pageX,
                  pageY: e.changedTouches[0].pageY,
                }
              : e instanceof MouseEvent
              ? {
                  pageX: e.pageX,
                  pageY: e.pageY,
                }
              : {
                  pageX: 0,
                  pageY: 0,
                };
          }
          function T(e) {
            if (e instanceof TouchEvent && e.changedTouches && e.changedTouches.length > 1)
              return P();
            e.preventDefault();
            const { pageX: t, pageY: o } = S(e);
            'number' == typeof l && 'number' == typeof i && (p(t - l - g), b(o - i - h));
          }
          function P() {
            return c(!1);
          }
          const {
            children: M,
            replace: D = !1,
            className: w,
            header: B,
            footer: C,
            scrollable: N = !0,
            draggable: k = !1,
            width: L,
            closeButton: X,
            closeButtonPosition: Y,
            portal: _ = !1,
          } = e;
          let q = ['pure-modal-backdrop'],
            $ = ['pure-modal', t],
            A = ['panel-body'];
          w && ($ = $.concat(w)),
            N
              ? (A = A.concat('scrollable'))
              : ((q = q.concat('scrollable')), ($ = $.concat('auto-height'))),
            k && (q = q.concat('backdrop-overflow-hidden'));
          const H = a.a.createElement(
            'div',
            {
              className: q.join(' '),
              onMouseDown: function (e) {
                if (e) {
                  if (!e.target.classList.contains('pure-modal-backdrop')) return;
                  e.stopPropagation(), e.preventDefault();
                }
                x(e);
              },
              onTouchMove: o ? T : void 0,
              onMouseMove: o ? T : void 0,
            },
            a.a.createElement(
              'div',
              {
                className: $.join(' '),
                style: {
                  transform: `translate(${f}px, ${m}px)`,
                  transition: 'none',
                  width: L,
                },
              },
              a.a.createElement(
                u,
                {
                  replace: D,
                  header: B,
                  footer: C,
                  onDragStart: k
                    ? function (e) {
                        if (
                          e instanceof TouchEvent &&
                          e.changedTouches &&
                          e.changedTouches.length > 1
                        )
                          return;
                        e.preventDefault();
                        const { pageX: t, pageY: o } = S(e),
                          { top: n, left: a } = e.currentTarget.getBoundingClientRect();
                        c(!0),
                          s('number' == typeof l ? l : a),
                          d('number' == typeof i ? i : n),
                          v(t - a),
                          y(o - n);
                      }
                    : void 0,
                  onDragEnd: k ? P : void 0,
                  onClose: x,
                  bodyClass: A.join(' '),
                  closeButton: X,
                  closeButtonPosition: Y,
                },
                M
              )
            )
          );
          return _ ? Object(r.createPortal)(H, document.body) : H;
        }
        t.default = a.a.memo(l);
      },
    ]);
  });
});

var Modal = /*@__PURE__*/ getDefaultExportFromCjs(reactPureModal_min);

const SparePiece = ({ role, color, highlighted, selectPiece }) => {
  const bin = role === 'bin';
  const handleClick = () => {
    if (typeof selectPiece === 'function') {
      selectPiece({
        role,
        color,
      });
    }
  };
  return /*#__PURE__*/ React__default['default'].createElement(
    'div',
    {
      className: mergeClassNames(
        'edit-square border border-gray-300 rounded',
        highlighted && 'bg-orange-300'
      ),
    },
    /*#__PURE__*/ React__default['default'].createElement('piece', {
      className: mergeClassNames('spare-piece', role, color, bin && 'next-trash'),
      onClick: handleClick,
    })
  );
};

const Promote = ({ isOpen, hide, onPromote, color = 'white' }) => {
  const promoteTo = (promotion) => {
    onPromote(promotion);
    hide();
  };
  return /*#__PURE__*/ React__default['default'].createElement(
    Modal,
    {
      closeButton: '',
      isOpen: isOpen,
      onClose: hide,
    },
    /*#__PURE__*/ React__default['default'].createElement(
      'div',
      {
        className: 'promote flex gap-2 py-1.5 justify-center',
      },
      /*#__PURE__*/ React__default['default'].createElement(SparePiece, {
        color: color,
        role: 'queen',
        selectPiece: () => promoteTo('q'),
      }),
      /*#__PURE__*/ React__default['default'].createElement(SparePiece, {
        color: color,
        role: 'rook',
        selectPiece: () => promoteTo('r'),
      }),
      /*#__PURE__*/ React__default['default'].createElement(SparePiece, {
        color: color,
        role: 'bishop',
        selectPiece: () => promoteTo('b'),
      }),
      /*#__PURE__*/ React__default['default'].createElement(SparePiece, {
        color: color,
        role: 'knight',
        selectPiece: () => promoteTo('n'),
      })
    )
  );
};

/**
 * Custom hook for handling common open/close/toggle scenarios
 */
const useDisclosure = (initialState = false) => {
  const [isOpen, setOpen] = React.useState(initialState);
  const show = () => {
    setOpen(true);
  };
  const hide = () => {
    setOpen(false);
  };
  const toggle = () => {
    setOpen(!isOpen);
  };
  return {
    isOpen,
    show,
    hide,
    toggle,
  };
};

const cgProps = (props) => {
  const cgProps = {};

  // normalize orientation for Chessground
  if (props.orientation) {
    cgProps.orientation = props.orientation;
    if (cgProps.orientation === 'w') {
      cgProps.orientation = 'white';
    }
    if (cgProps.orientation === 'b') {
      cgProps.orientation = 'black';
    }
  }

  // pass props directly to Chessground
  const passProps = ['shapes', 'onSelect', 'drawable'];
  for (const prop of passProps) {
    cgProps[prop] = props[prop];
  }

  // helper that disables Chessground drawable option
  if (props.drawable === false) {
    cgProps.drawable = {
      enabled: false,
    };
  }

  // helper for Chessground editing mode
  if (props.editing) {
    cgProps.movable = {
      free: false,
    };
    cgProps.drawable = {
      enabled: false,
    };
  }
  if (props.viewOnly) {
    cgProps.draggable = false;
    cgProps.movable = {
      free: false,
    };
    cgProps.drawable = {
      enabled: false,
    };
  }
  if (props.readOnly) {
    cgProps.draggable = false;
    cgProps.movable = {
      free: false,
    };
    cgProps.drawable = {
      enabled: false,
    };
    cgProps.coordinates = false;
  }
  return cgProps;
};

const Chessboard = (props, ref) => {
  const { theme } = useChessground();
  const { isOpen, show, hide } = useDisclosure();
  const { chess, fen, turnColor, lastMove, orientation, promotion, onMove, onPromote } =
    useChess(props);
  const handleMove = async (from, to) => {
    const move = onMove(from, to, promotion);
    if (!move) {
      show();
      return false;
    }
    if (theme.playSounds) {
      audio(theme.sounds);
    }
    // pass the chess object to callback function
    if (typeof props.onMove === 'function') {
      await props.onMove(chess);
    }
  };
  const handlePromotion = async (promotion) => {
    const move = onPromote(promotion);
    if (!move) {
      return false;
    }
    if (theme.playSounds) {
      audio(theme.sounds);
    }
    // pass the chess object to callback function
    if (typeof props.onMove === 'function') {
      await props.onMove(chess);
    }
  };
  React.useEffect(() => {
    if (typeof props.setPromoting === 'function') {
      props.setPromoting(isOpen);
    }
  }, [isOpen]);
  return /*#__PURE__*/ React__default['default'].createElement(
    'div',
    {
      className: mergeClassNames(
        'chessground',
        theme.highlight && 'highlight',
        theme.board,
        theme.pieces
      ),
    },
    /*#__PURE__*/ React__default['default'].createElement(
      Chessground,
      _extends(
        {
          ref: ref,
          coordinates: theme.coordinates,
          onMove: handleMove,
          fen: fen,
          turnColor: turnColor,
          lastMove: lastMove,
          orientation: orientation,
          movable: toDests(chess),
        },
        cgProps(props)
      )
    ),
    /*#__PURE__*/ React__default['default'].createElement(Promote, {
      isOpen: isOpen,
      hide: hide,
      color: turnColor,
      onPromote: handlePromotion,
    })
  );
};
var Chessboard$1 = /*#__PURE__*/ React.forwardRef(Chessboard);

const sideToMove = (fen) => {
  try {
    const fenOrientation = fen.split(' ')[1];
    return fenOrientation === 'w' ? 'white' : 'black';
  } catch {
    return 'white';
  }
};
const getOrientation = (props) => {
  try {
    if (props.orientation) {
      return props.orientation;
    }
    if (props.fen) {
      return sideToMove(props.fen);
    }
    return 'white';
  } catch {
    return 'white';
  }
};
const useOrientation = (props) => {
  const [orientation, setOrientation] = React.useState(getOrientation(props));
  const flip = () => {
    setOrientation((state) => {
      return state === 'white' ? 'black' : 'white';
    });
  };
  React.useEffect(() => {
    setOrientation(sideToMove(props.fen));
  }, [props.reset]);
  return [orientation, flip];
};

const StyleBoard = () => {
  const { theme, handleChange } = useChessground();
  return /*#__PURE__*/ React__default['default'].createElement(
    React__default['default'].Fragment,
    null,
    /*#__PURE__*/ React__default['default'].createElement('div', null, 'Board'),
    /*#__PURE__*/ React__default['default'].createElement(
      'select',
      {
        name: 'board',
        className: 'bg-white border border-gray-300 px-2 py-1.5 w-full text-gray-800 rounded',
        defaultValue: theme.board,
        onChange: handleChange,
      },
      /*#__PURE__*/ React__default['default'].createElement(
        'option',
        {
          value: 'green',
        },
        'Green'
      ),
      /*#__PURE__*/ React__default['default'].createElement(
        'option',
        {
          value: 'brown',
        },
        'Brown'
      ),
      /*#__PURE__*/ React__default['default'].createElement(
        'option',
        {
          value: 'ruby',
        },
        'Ruby'
      ),
      /*#__PURE__*/ React__default['default'].createElement(
        'option',
        {
          value: 'purple',
        },
        'Purple'
      ),
      /*#__PURE__*/ React__default['default'].createElement(
        'option',
        {
          value: 'teal',
        },
        'Teal'
      )
    )
  );
};

const Coordinates = () => {
  const { theme, handleChecked } = useChessground();
  return /*#__PURE__*/ React__default['default'].createElement(
    React__default['default'].Fragment,
    null,
    /*#__PURE__*/ React__default['default'].createElement('div', null, 'Coordinates'),
    /*#__PURE__*/ React__default['default'].createElement(
      'div',
      {
        className: 'flex',
      },
      /*#__PURE__*/ React__default['default'].createElement('input', {
        name: 'coordinates',
        type: 'checkbox',
        className: 'checkbox rounded border border-gray-300',
        defaultChecked: theme.coordinates,
        onChange: handleChecked,
      })
    )
  );
};

const HighlightMove = () => {
  const { theme, handleChecked } = useChessground();
  return /*#__PURE__*/ React__default['default'].createElement(
    React__default['default'].Fragment,
    null,
    /*#__PURE__*/ React__default['default'].createElement('div', null, 'Highlight moves'),
    /*#__PURE__*/ React__default['default'].createElement(
      'div',
      {
        className: 'flex',
      },
      /*#__PURE__*/ React__default['default'].createElement('input', {
        name: 'highlight',
        type: 'checkbox',
        className: 'checkbox rounded border border-gray-300',
        defaultChecked: theme.highlight,
        onChange: handleChecked,
      })
    )
  );
};

const StylePieces = () => {
  const { theme, handleChange } = useChessground();
  return /*#__PURE__*/ React__default['default'].createElement(
    React__default['default'].Fragment,
    null,
    /*#__PURE__*/ React__default['default'].createElement('div', null, 'Pieces'),
    /*#__PURE__*/ React__default['default'].createElement(
      'select',
      {
        name: 'pieces',
        className: 'bg-white border border-gray-300 px-2 py-1.5 w-full text-gray-800 rounded',
        defaultValue: theme.pieces,
        onChange: handleChange,
      },
      /*#__PURE__*/ React__default['default'].createElement(
        'option',
        {
          value: 'cburnett',
        },
        'Cburnett'
      ),
      /*#__PURE__*/ React__default['default'].createElement(
        'option',
        {
          value: 'neo',
        },
        'Neo'
      ),
      /*#__PURE__*/ React__default['default'].createElement(
        'option',
        {
          value: 'alpha',
        },
        'Alpha'
      ),
      /*#__PURE__*/ React__default['default'].createElement(
        'option',
        {
          value: 'bases',
        },
        'Bases'
      ),
      /*#__PURE__*/ React__default['default'].createElement(
        'option',
        {
          value: 'classic',
        },
        'Classic'
      )
    )
  );
};

const PlaySounds = () => {
  const { theme, handleChecked } = useChessground();
  return /*#__PURE__*/ React__default['default'].createElement(
    React__default['default'].Fragment,
    null,
    /*#__PURE__*/ React__default['default'].createElement('div', null, 'Play sounds'),
    /*#__PURE__*/ React__default['default'].createElement(
      'div',
      {
        className: 'flex',
      },
      /*#__PURE__*/ React__default['default'].createElement('input', {
        name: 'playSounds',
        type: 'checkbox',
        className: 'checkbox rounded border border-gray-300',
        defaultChecked: theme.playSounds,
        onChange: handleChecked,
      })
    )
  );
};

const Sounds = () => {
  const { theme, handleChange } = useChessground();
  return /*#__PURE__*/ React__default['default'].createElement(
    React__default['default'].Fragment,
    null,
    /*#__PURE__*/ React__default['default'].createElement('div', null, 'Sounds'),
    /*#__PURE__*/ React__default['default'].createElement(
      'select',
      {
        name: 'sounds',
        className: 'bg-white border border-gray-300 px-2 py-1.5 w-full text-gray-800 rounded',
        defaultValue: theme.sounds,
        onChange: handleChange,
      },
      /*#__PURE__*/ React__default['default'].createElement(
        'option',
        {
          value: 'robot',
        },
        'Robot'
      ),
      /*#__PURE__*/ React__default['default'].createElement(
        'option',
        {
          value: 'piano',
        },
        'Piano'
      ),
      /*#__PURE__*/ React__default['default'].createElement(
        'option',
        {
          value: 'lisp',
        },
        'Lisp'
      ),
      /*#__PURE__*/ React__default['default'].createElement(
        'option',
        {
          value: 'sfx',
        },
        'SFX'
      )
    )
  );
};

const Settings = () => {
  const { isOpen, show, hide } = useDisclosure();
  return /*#__PURE__*/ React__default['default'].createElement(
    React__default['default'].Fragment,
    null,
    /*#__PURE__*/ React__default['default'].createElement(
      'button',
      {
        type: 'button',
        className: 'next-button next-settings',
        title: 'Settings',
        onClick: show,
      },
      /*#__PURE__*/ React__default['default'].createElement('i', {
        className: 'next-cog',
      })
    ),
    /*#__PURE__*/ React__default['default'].createElement(
      Modal,
      {
        header: 'Settings',
        isOpen: isOpen,
        onClose: hide,
      },
      /*#__PURE__*/ React__default['default'].createElement(
        'div',
        {
          className: 'grid grid-cols-2 gap-3 items-center text-sm',
        },
        /*#__PURE__*/ React__default['default'].createElement(StylePieces, null),
        /*#__PURE__*/ React__default['default'].createElement(StyleBoard, null),
        /*#__PURE__*/ React__default['default'].createElement(HighlightMove, null),
        /*#__PURE__*/ React__default['default'].createElement(PlaySounds, null),
        /*#__PURE__*/ React__default['default'].createElement(Sounds, null),
        /*#__PURE__*/ React__default['default'].createElement(Coordinates, null)
      )
    )
  );
};

const Flip = (props) => {
  return /*#__PURE__*/ React__default['default'].createElement(
    'button',
    _extends(
      {
        type: 'button',
        className: 'next-button next-flip',
        title: 'Flip board',
      },
      props
    ),
    /*#__PURE__*/ React__default['default'].createElement('i', {
      className: 'next-sync',
    })
  );
};

const Advanced = ({ flip, readOnly }) => {
  if (readOnly) {
    return null;
  }
  return /*#__PURE__*/ React__default['default'].createElement(
    'div',
    {
      className: 'text-gray-400 flex flex-row-reverse gap-2 py-1.5',
    },
    /*#__PURE__*/ React__default['default'].createElement(Settings, null),
    /*#__PURE__*/ React__default['default'].createElement(Flip, {
      onClick: flip,
    })
  );
};

const NextChessground = (props, ref) => {
  const [orientation, flip] = useOrientation(props);
  return /*#__PURE__*/ React__default['default'].createElement(
    Theme,
    null,
    /*#__PURE__*/ React__default['default'].createElement(
      'div',
      {
        className: 'next-chessground',
      },
      /*#__PURE__*/ React__default['default'].createElement(
        Chessboard$1,
        _extends({}, props, {
          ref: ref,
          orientation: orientation,
        })
      ),
      /*#__PURE__*/ React__default['default'].createElement(Advanced, {
        flip: flip,
        readOnly: props.readOnly,
      })
    )
  );
};
var NextChessground$1 = /*#__PURE__*/ React.forwardRef(NextChessground);

const EditorPieces = (props) => {
  const { theme } = useChessground();
  const roles = ['bin', 'pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];
  const showPiece = (role, props) => {
    const {
      color = 'white',
      selected = {
        role: null,
        color: null,
      },
    } = props;
    const highlighted = role === selected.role && color === selected.color;
    return /*#__PURE__*/ React__default['default'].createElement(
      SparePiece,
      _extends(
        {
          key: `${role}-${color}`,
          highlighted: highlighted,
          role: role,
          color: color,
        },
        props
      )
    );
  };
  return /*#__PURE__*/ React__default['default'].createElement(
    'div',
    {
      className: mergeClassNames('spare-pieces flex gap-2', theme.pieces),
    },
    roles.map((role) => showPiece(role, props))
  );
};

/**
 * Pieces diff from a Chessground board
 */
const piecesDiff = (key) => {
  const map = new Map();
  map.set(key, null);
  return map;
};

/**
 * Drop piece to a Chessground board
 */
const dropPiece = (cg, selected, key) => {
  if (!cg) {
    throw new Error('Chessground is not defined');
  }
  if (!selected || !selected.role || !selected.color) {
    return cg.getFen();
  }
  if (selected.role === 'bin') {
    cg.setPieces(piecesDiff(key));
    return cg.getFen();
  }
  const square = cg.state.pieces.get(key);
  if (!square) {
    cg.newPiece(selected, key);
    return cg.getFen();
  }
  if (square.role === selected.role && square.color === selected.color) {
    cg.setPieces(piecesDiff(key));
    return cg.getFen();
  }
  cg.setPieces(piecesDiff(key));
  cg.newPiece(selected, key);
  return cg.getFen();
};

const getCastles = (initial, option) => {
  if (!option) {
    return initial;
  }
  const all = ['K', 'Q', 'k', 'q'];
  const array = all.map((letter) => {
    if (letter !== option) {
      if (initial.includes(letter)) {
        return letter;
      }
      return '';
    }
    if (initial.includes(option)) {
      return '';
    }
    return option;
  });
  const string = array.join('');
  return string.length ? string : '-';
};

const FenOptions = ({ onChange }) => {
  const [side, setSide] = React.useState('w');
  const [castles, setCastles] = React.useState('-');
  React.useEffect(() => {
    if (typeof onChange === 'function') {
      onChange([side, castles].join(' '));
    }
  }, [side, castles]);
  const changeSide = (e) => {
    const { value } = e.target;
    setSide(value);
  };
  const changeCastle = (e) => {
    const { value } = e.target;
    setCastles(getCastles(castles, value));
  };
  return /*#__PURE__*/ React__default['default'].createElement(
    'div',
    {
      className: 'flex flex-col gap-2 w-full',
    },
    /*#__PURE__*/ React__default['default'].createElement(
      'div',
      {
        className: 'flex gap-2 w-full',
      },
      /*#__PURE__*/ React__default['default'].createElement(
        'div',
        null,
        /*#__PURE__*/ React__default['default'].createElement('input', {
          defaultChecked: true,
          className: 'mx-1',
          type: 'radio',
          id: 'white-radio',
          name: 'side-to-move',
          value: 'w',
          onChange: changeSide,
        }),
        /*#__PURE__*/ React__default['default'].createElement(
          'label',
          {
            htmlFor: 'white-radio',
          },
          'White to move'
        )
      ),
      /*#__PURE__*/ React__default['default'].createElement(
        'div',
        null,
        /*#__PURE__*/ React__default['default'].createElement('input', {
          className: 'mx-1',
          type: 'radio',
          id: 'black-radio',
          name: 'side-to-move',
          value: 'b',
          onChange: changeSide,
        }),
        /*#__PURE__*/ React__default['default'].createElement(
          'label',
          {
            htmlFor: 'black-radio',
          },
          'Black to move'
        )
      )
    ),
    /*#__PURE__*/ React__default['default'].createElement(
      'div',
      {
        className: 'flex flex-col gap-2 w-full',
      },
      /*#__PURE__*/ React__default['default'].createElement(
        'div',
        {
          className: 'flex w-full gap-4',
        },
        /*#__PURE__*/ React__default['default'].createElement(
          'div',
          null,
          /*#__PURE__*/ React__default['default'].createElement('span', null, 'White can')
        ),
        /*#__PURE__*/ React__default['default'].createElement(
          'div',
          null,
          /*#__PURE__*/ React__default['default'].createElement('input', {
            className: 'mx-1',
            type: 'checkbox',
            id: 'white-short-castle',
            value: 'K',
            onChange: changeCastle,
          }),
          /*#__PURE__*/ React__default['default'].createElement(
            'label',
            {
              htmlFor: 'white-short-castle',
            },
            'O-O'
          )
        ),
        /*#__PURE__*/ React__default['default'].createElement(
          'div',
          null,
          /*#__PURE__*/ React__default['default'].createElement('input', {
            className: 'mx-1',
            type: 'checkbox',
            id: 'white-long-castle',
            value: 'Q',
            onChange: changeCastle,
          }),
          /*#__PURE__*/ React__default['default'].createElement(
            'label',
            {
              htmlFor: 'white-long-castle',
            },
            'O-O-O'
          )
        )
      ),
      /*#__PURE__*/ React__default['default'].createElement(
        'div',
        {
          className: 'flex w-full gap-4',
        },
        /*#__PURE__*/ React__default['default'].createElement(
          'div',
          null,
          /*#__PURE__*/ React__default['default'].createElement('span', null, 'Black can')
        ),
        /*#__PURE__*/ React__default['default'].createElement(
          'div',
          null,
          /*#__PURE__*/ React__default['default'].createElement('input', {
            className: 'mx-1',
            type: 'checkbox',
            id: 'black-short-castle',
            value: 'k',
            onChange: changeCastle,
          }),
          /*#__PURE__*/ React__default['default'].createElement(
            'label',
            {
              htmlFor: 'black-short-castle',
            },
            'O-O'
          )
        ),
        /*#__PURE__*/ React__default['default'].createElement(
          'div',
          null,
          /*#__PURE__*/ React__default['default'].createElement('input', {
            className: 'mx-1',
            type: 'checkbox',
            id: 'black-long-castle',
            value: 'q',
            onChange: changeCastle,
          }),
          /*#__PURE__*/ React__default['default'].createElement(
            'label',
            {
              htmlFor: 'black-long-castle',
            },
            'O-O-O'
          )
        )
      )
    )
  );
};

const NextEditor = (props, ref) => {
  const [fen, setFen] = React.useState(props.fen || constants.emptyFen);
  const [selected, setSelected] = React.useState({
    role: null,
    color: null,
  });
  React.useEffect(() => {
    if (props.fen) {
      setFen(props.fen);
    }
  }, [props.fen]);
  React.useEffect(() => {
    if (typeof props.onSelect === 'function') {
      props.onSelect(fen);
    }
  }, [fen]);
  const onSelect = (key) => {
    const array = fen.split(' ');
    array.shift();
    const options = array.join(' ');
    const position = dropPiece(ref.current.board, selected, key);
    const withOptions = [position, options].join(' ');
    setFen(withOptions);
  };
  const handleChange = (options) => {
    const position = fen.split(' ')[0];
    const withOptions = [position, options, '- 0 1'].join(' ');
    setFen(withOptions);
  };
  return /*#__PURE__*/ React__default['default'].createElement(
    Theme,
    null,
    /*#__PURE__*/ React__default['default'].createElement(
      'div',
      {
        className: 'next-chessground gap-2',
      },
      /*#__PURE__*/ React__default['default'].createElement(EditorPieces, {
        selected: selected,
        selectPiece: setSelected,
        color: 'black',
      }),
      /*#__PURE__*/ React__default['default'].createElement(
        Chessboard$1,
        _extends({}, props, {
          ref: ref,
          fen: fen,
          onSelect: onSelect,
          editing: true,
        })
      ),
      /*#__PURE__*/ React__default['default'].createElement(EditorPieces, {
        selected: selected,
        selectPiece: setSelected,
        color: 'white',
      }),
      /*#__PURE__*/ React__default['default'].createElement(FenOptions, {
        onChange: handleChange,
      })
    )
  );
};
var NextEditor$1 = /*#__PURE__*/ React.forwardRef(NextEditor);

class Stockfish {
  constructor(path) {
    if (typeof window === 'undefined') {
      return false;
    }
    if (!window.chessEngineWorker) {
      const worker = path ?? process.env.STOCKFISH_PATH;
      window.chessEngineWorker = new Worker(worker);
    }
    this.skillLevel = 20;
    this.maxDepth = 40;
    this.resolveTimeout = null;
    this.isAnalyzing = false;
    this.fen = constants.initialFen;
  }
  getTurnFromFen(fen) {
    return fen.split(' ')[1];
  }
  normalizeScoreValue(value) {
    const { fen } = this;
    const turn = this.getTurnFromFen(fen);
    if (turn === 'b') {
      return -1 * value;
    }
    return value;
  }
  isInfoMessage(message) {
    if (!message || !message.data) {
      return false;
    }
    return message.data.startsWith('info');
  }
  setSkillLevel(maxError = null, probability = null) {
    /**
     * skill level is 0-20, higher the stronger
     * maxError: 0-5000, lower the stronger (null = no limit)
     * probability: 1-1000, higher the stronger (null = no limit)
     * for skill level 20 (2400+ ELO), play at full strength without restrictions
     */
    if (this.skillLevel < 20) {
      window.chessEngineWorker.postMessage('setoption name Skill Level value ' + this.skillLevel);
    }

    // Set maxError if provided (null means full strength)
    if (maxError !== null) {
      window.chessEngineWorker.postMessage(
        'setoption name Skill Level Maximum Error value ' + maxError
      );
    }

    // Set probability if provided (null means full strength)
    if (probability !== null) {
      window.chessEngineWorker.postMessage(
        'setoption name Skill Level Probability value ' + probability
      );
    }

    // For skill level 20 with null parameters, don't set any restrictions - let Stockfish play at maximum strength
  }
  updateSkillLevel(newSkillLevel, maxError = null, probability = null) {
    this.skillLevel = newSkillLevel;
    this.setSkillLevel(maxError, probability);
  }
  async init() {
    await this.use_uci();
    await this.is_ready();
    this.setSkillLevel();
  }
  getScoreFromInfo(msg) {
    if (msg.startsWith('info depth 0')) {
      // This happens when game is over.
      const split = msg.split(' ');
      const type = split[4];
      const value = this.normalizeScoreValue(Number(split[5]));
      this.isAnalyzing = false;
      return {
        type,
        value,
      };
    } else if (msg.startsWith('info depth ')) {
      const split = msg.split(' ');
      const type = split[8];
      const value = this.normalizeScoreValue(Number(split[9]));
      return {
        type,
        value,
      };
    }
    return {
      type: 'cp',
      value: 0,
    };
  }
  parseData(data) {
    const depth = data.split(' ')[2];
    let pv = '';
    if (data.indexOf(' pv ') > -1) {
      pv = data.split(' pv ')[1].split(' bmc ')[0];
    }
    const score = this.getScoreFromInfo(data);
    return {
      depth,
      pv,
      score,
    };
  }
  use_uci() {
    return new Promise((resolve) => {
      window.chessEngineWorker.postMessage('uci');
      window.chessEngineWorker.onmessage = (message) => {
        if (message.data === 'uciok') {
          resolve(message);
        }
      };
    });
  }
  is_ready() {
    return new Promise((resolve) => {
      window.chessEngineWorker.postMessage('isready');
      window.chessEngineWorker.onmessage = (message) => {
        if (message.data === 'readyok') {
          resolve(message);
        }
      };
    });
  }
  set_position(fen) {
    return new Promise((resolve) => {
      this.fen = fen;
      window.chessEngineWorker.postMessage('position fen ' + fen);
      resolve();
    });
  }
  async new_position(fen) {
    await this.stop();
    await this.is_ready();
    this.set_position(fen);
    this.go_infinite();
  }
  set_multipv(numPv) {
    window.chessEngineWorker.postMessage('setoption name MultiPV value ' + numPv);
  }
  get_score(fen, depth = 15) {
    return new Promise((resolve) => {
      window.chessEngineWorker.postMessage('position fen ' + fen);
      window.chessEngineWorker.postMessage('go depth 15');
      window.chessEngineWorker.onmessage = (message) => {
        if (message.data.startsWith('info depth ' + depth)) {
          const split = message.data.split(' ');
          const type = split[8];
          const value = Number(split[9]);
          resolve({
            type,
            value,
          });
        } else if (message.data.startsWith('info depth 0')) {
          // This happens when game is over.
          const split = message.data.split(' ');
          const type = split[4];
          const value = Number(split[5]);
          resolve({
            type,
            value,
          });
        }
      };
    });
  }
  go_depth(depth) {
    return new Promise((resolve) => {
      window.chessEngineWorker.postMessage('go depth ' + depth);
      window.chessEngineWorker.onmessage = (message) => {
        if (message.data.startsWith('bestmove')) {
          resolve(message.data);
        }
      };
    });
  }
  go_time(time) {
    return new Promise((resolve) => {
      window.chessEngineWorker.postMessage('go movetime ' + time);
      window.chessEngineWorker.onmessage = (message) => {
        if (message.data.startsWith('bestmove')) {
          resolve(message.data);
        }
      };
    });
  }
  go_infinite(callback) {
    window.chessEngineWorker.postMessage('go infinite');
    this.isAnalyzing = true;
    window.chessEngineWorker.onmessage = (message) => {
      if (this.isInfoMessage(message) && typeof callback === 'function') {
        const msgData = this.parseData(message.data);
        if (msgData.depth > this.maxDepth) {
          this.stop();
        }
        callback(msgData);
      }
    };
  }
  stop() {
    return new Promise((resolve) => {
      if (!this.isAnalyzing) {
        resolve();
      }
      window.chessEngineWorker.postMessage('stop');
      window.chessEngineWorker.onmessage = (message) => {
        if (message.data.startsWith('bestmove')) {
          this.isAnalyzing = false;
          resolve(message.data);
        }
      };
    });
  }
  shouldMoveFirst(fen, playerColor) {
    const turnFromFen = fen.split(' ')[1]; // 'w' or 'b'
    const isWhiteToMove = turnFromFen === 'w';

    // Engine should move first if:
    // - Player chose black pieces and it's white's turn to move
    // - Player chose white pieces and it's black's turn to move
    return (playerColor === 'black' && isWhiteToMove) ||
           (playerColor === 'white' && !isWhiteToMove);
  }
  quit() {
    window.chessEngineWorker.postMessage('quit');
  }
}

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;
  if (!css || typeof document === 'undefined') {
    return;
  }
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$7 =
  ".brown .cg-wrap cg-board {\n  background-image: url('data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgeG1sbnM6eD0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgIHZpZXdCb3g9IjAgMCA4IDgiICBzaGFwZS1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiI+PHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iI2I1ODg2MyIvPjxnIGlkPSJhIj4gIDxnIGlkPSJiIj4gICAgPGcgaWQ9ImMiPiAgICAgIDxnIGlkPSJkIj4gICAgICAgIDxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmMGQ5YjUiIGlkPSJlIi8+ICAgICAgICA8dXNlIHg9IjIiIGhyZWY9IiNlIiB4OmhyZWY9IiNlIi8+ICAgICAgPC9nPiAgICAgIDx1c2UgeD0iNCIgaHJlZj0iI2QiIHg6aHJlZj0iI2QiLz4gICAgPC9nPiAgICA8dXNlIHg9IjEiIHk9IjEiIGhyZWY9IiNjIiB4OmhyZWY9IiNjIi8+ICA8L2c+ICA8dXNlIHk9IjIiIGhyZWY9IiNiIiB4OmhyZWY9IiNiIi8+PC9nPjx1c2UgeT0iNCIgaHJlZj0iI2EiIHg6aHJlZj0iI2EiLz48L3N2Zz4=');\n}\n.green .cg-wrap cg-board {\n  background-image: url('data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgeG1sbnM6eD0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgIHZpZXdCb3g9IjAgMCA4IDgiICBzaGFwZS1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiI+PHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzc3OTU1NiIvPjxnIGlkPSJhIj4gIDxnIGlkPSJiIj4gICAgPGcgaWQ9ImMiPiAgICAgIDxnIGlkPSJkIj4gICAgICAgIDxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNFQkVDRDAiIGlkPSJlIi8+ICAgICAgICA8dXNlIHg9IjIiIGhyZWY9IiNlIiB4OmhyZWY9IiNlIi8+ICAgICAgPC9nPiAgICAgIDx1c2UgeD0iNCIgaHJlZj0iI2QiIHg6aHJlZj0iI2QiLz4gICAgPC9nPiAgICA8dXNlIHg9IjEiIHk9IjEiIGhyZWY9IiNjIiB4OmhyZWY9IiNjIi8+ICA8L2c+ICA8dXNlIHk9IjIiIGhyZWY9IiNiIiB4OmhyZWY9IiNiIi8+PC9nPjx1c2UgeT0iNCIgaHJlZj0iI2EiIHg6aHJlZj0iI2EiLz48L3N2Zz4=');\n}\n.ruby .cg-wrap cg-board {\n  background-image: url('data:image/svg+xml;base64,CjxzdmcgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgIHhtbG5zOng9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiICB2aWV3Qm94PSIwIDAgOCA4IiAgc2hhcGUtcmVuZGVyaW5nPSJnZW9tZXRyaWNQcmVjaXNpb24iPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiM4QjI2MzUiLz48ZyBpZD0iYSI+ICA8ZyBpZD0iYiI+ICAgIDxnIGlkPSJjIj4gICAgICA8ZyBpZD0iZCI+ICAgICAgICA8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjRDJENEM4IiBpZD0iZSIvPiAgICAgICAgPHVzZSB4PSIyIiBocmVmPSIjZSIgeDpocmVmPSIjZSIvPiAgICAgIDwvZz4gICAgICA8dXNlIHg9IjQiIGhyZWY9IiNkIiB4OmhyZWY9IiNkIi8+ICAgIDwvZz4gICAgPHVzZSB4PSIxIiB5PSIxIiBocmVmPSIjYyIgeDpocmVmPSIjYyIvPiAgPC9nPiAgPHVzZSB5PSIyIiBocmVmPSIjYiIgeDpocmVmPSIjYiIvPjwvZz48dXNlIHk9IjQiIGhyZWY9IiNhIiB4OmhyZWY9IiNhIi8+PC9zdmc+');\n}\n.purple .cg-wrap cg-board {\n  background-image: url('data:image/png;base64,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');\n}\n.teal .cg-wrap cg-board {\n  background-image: url('data:image/svg+xml;base64,CjxzdmcgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgIHhtbG5zOng9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiICB2aWV3Qm94PSIwIDAgOCA4IiAgc2hhcGUtcmVuZGVyaW5nPSJnZW9tZXRyaWNQcmVjaXNpb24iPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMxYzcyYWQiLz48ZyBpZD0iYSI+ICA8ZyBpZD0iYiI+ICAgIDxnIGlkPSJjIj4gICAgICA8ZyBpZD0iZCI+ICAgICAgICA8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjZTNlYmYzIiBpZD0iZSIvPiAgICAgICAgPHVzZSB4PSIyIiBocmVmPSIjZSIgeDpocmVmPSIjZSIvPiAgICAgIDwvZz4gICAgICA8dXNlIHg9IjQiIGhyZWY9IiNkIiB4OmhyZWY9IiNkIi8+ICAgIDwvZz4gICAgPHVzZSB4PSIxIiB5PSIxIiBocmVmPSIjYyIgeDpocmVmPSIjYyIvPiAgPC9nPiAgPHVzZSB5PSIyIiBocmVmPSIjYiIgeDpocmVmPSIjYiIvPjwvZz48dXNlIHk9IjQiIGhyZWY9IiNhIiB4OmhyZWY9IiNhIi8+PC9zdmc+');\n}\n";
styleInject(css_248z$7);

var css_248z$6 =
  '.next-chessground .chessground {\n  grid-area: board;\n  position: relative;\n  display: block;\n  height: 0;\n  padding-bottom: 100%;\n  padding-right: 100%;\n  width: 100%;\n  border-radius: 0.25rem;\n  overflow: hidden;\n}\n\n.next-chessground .cg-wrap {\n  display: table;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n\n.next-chessground cg-helper {\n  position: absolute;\n  width: 12.5%;\n  padding-bottom: 12.5%;\n  display: table;\n  bottom: 0;\n}\n\n.next-chessground cg-container {\n  position: absolute;\n  width: 800%;\n  height: 800%;\n  display: block;\n  bottom: 0;\n}\n\n.next-chessground cg-board {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  line-height: 0;\n  background-size: cover;\n  cursor: pointer;\n}\n\n.next-chessground cg-board square {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 12.5%;\n  height: 12.5%;\n  pointer-events: none;\n}\n.next-chessground .highlight cg-board square.last-move {\n  will-change: transform;\n  background-color: rgba(246, 246, 130, 0.5);\n}\n.next-chessground .highlight .correct cg-board square.last-move {\n  background-color: rgba(155, 240, 0, 0.4);\n}\n.next-chessground .highlight .incorrect cg-board square.last-move {\n  background-color: rgba(240, 0, 0, 0.4);\n}\n\n.next-chessground cg-board square.check {\n  background: radial-gradient(\n    ellipse at center,\n    rgba(255, 0, 0, 1) 0%,\n    rgba(231, 0, 0, 1) 25%,\n    rgba(169, 0, 0, 0) 89%,\n    rgba(158, 0, 0, 0) 100%\n  );\n}\n.next-chessground cg-board square.current-premove {\n  background-color: rgba(20, 30, 85, 0.5);\n}\n.next-chessground cg-board piece {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 12.5%;\n  height: 12.5%;\n  background-size: cover;\n  z-index: 2;\n  will-change: transform;\n  pointer-events: none;\n}\n.next-chessground cg-board piece.dragging {\n  cursor: move;\n  z-index: 9;\n}\n.next-chessground cg-board piece.anim {\n  z-index: 8;\n}\n.next-chessground cg-board piece.fading {\n  z-index: 1;\n  opacity: 0.5;\n}\n.next-chessground cg-board piece.ghost {\n  opacity: 0.3;\n}\n.next-chessground .cg-wrap svg {\n  overflow: hidden;\n  position: relative;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  z-index: 2;\n  opacity: 0.6;\n}\n.next-chessground .cg-wrap svg image {\n  opacity: 0.5;\n}\n\n.next-chessground .spare-pieces {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n}\n.next-chessground .spare-piece {\n  top: 0;\n  left: 0;\n  padding-bottom: 100%;\n  padding-left: 100%;\n  position: absolute;\n  background-size: contain;\n  background-position: 0% -100%;\n  cursor: pointer;\n}\n.next-chessground .edit-square {\n  display: table;\n  position: relative;\n  width: 14.285%;\n  padding-bottom: 13.285%;\n}\n.next-chessground .promote .edit-square {\n  width: 20%;\n  padding-bottom: 20%;\n}\n';
styleInject(css_248z$6);

var css_248z$5 =
  'coords {\n  position: absolute;\n  display: flex;\n  pointer-events: none;\n  user-select: none;\n  color: #fff;\n  font-weight: bold;\n  font-size: 0.5rem;\n  opacity: 0.8;\n}\n.coords-no coords {\n  display: none;\n}\n@media (min-width: 640px) {\n  coords {\n    font-size: 0.75rem;\n  }\n}\ncoords.ranks {\n  flex-flow: column-reverse;\n  top: 0;\n  right: 0;\n  height: 100%;\n  width: 0.8em;\n}\ncoords.ranks.black {\n  flex-flow: column;\n}\ncoords.files {\n  bottom: 0;\n  left: 0;\n  flex-flow: row;\n  width: 100%;\n}\ncoords.files.black {\n  flex-flow: row-reverse;\n}\ncoords.files coord {\n  padding-left: 4px;\n}\ncoords coord {\n  flex: 1 1 auto;\n}\n\n.orientation-white .files coord:nth-child(2n + 1),\n.orientation-white .ranks coord:nth-child(2n),\n.orientation-black .files coord:nth-child(2n),\n.orientation-black .ranks coord:nth-child(2n + 1) {\n  color: #fff;\n}\n.orientation-white .files coord:nth-child(2n),\n.orientation-white .ranks coord:nth-child(2n + 1),\n.orientation-black .files coord:nth-child(2n + 1),\n.orientation-black .ranks coord:nth-child(2n) {\n  color: #779556;\n}\n';
styleInject(css_248z$5);

var css_248z$4 =
  ".next-chessground .next-cog {\n  width: 1rem;\n  height: 1rem;\n  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjOUY5REIwIiBkPSJNNDg3LjQgMzE1LjdsLTQyLjYtMjQuNmM0LjMtMjMuMiA0LjMtNDcgMC03MC4ybDQyLjYtMjQuNmM0LjktMi44IDcuMS04LjYgNS41LTE0LTExLjEtMzUuNi0zMC02Ny44LTU0LjctOTQuNi0zLjgtNC4xLTEwLTUuMS0xNC44LTIuM0wzODAuOCAxMTBjLTE3LjktMTUuNC0zOC41LTI3LjMtNjAuOC0zNS4xVjI1LjhjMC01LjYtMy45LTEwLjUtOS40LTExLjctMzYuNy04LjItNzQuMy03LjgtMTA5LjIgMC01LjUgMS4yLTkuNCA2LjEtOS40IDExLjdWNzVjLTIyLjIgNy45LTQyLjggMTkuOC02MC44IDM1LjFMODguNyA4NS41Yy00LjktMi44LTExLTEuOS0xNC44IDIuMy0yNC43IDI2LjctNDMuNiA1OC45LTU0LjcgOTQuNi0xLjcgNS40LjYgMTEuMiA1LjUgMTRMNjcuMyAyMjFjLTQuMyAyMy4yLTQuMyA0NyAwIDcwLjJsLTQyLjYgMjQuNmMtNC45IDIuOC03LjEgOC42LTUuNSAxNCAxMS4xIDM1LjYgMzAgNjcuOCA1NC43IDk0LjYgMy44IDQuMSAxMCA1LjEgMTQuOCAyLjNsNDIuNi0yNC42YzE3LjkgMTUuNCAzOC41IDI3LjMgNjAuOCAzNS4xdjQ5LjJjMCA1LjYgMy45IDEwLjUgOS40IDExLjcgMzYuNyA4LjIgNzQuMyA3LjggMTA5LjIgMCA1LjUtMS4yIDkuNC02LjEgOS40LTExLjd2LTQ5LjJjMjIuMi03LjkgNDIuOC0xOS44IDYwLjgtMzUuMWw0Mi42IDI0LjZjNC45IDIuOCAxMSAxLjkgMTQuOC0yLjMgMjQuNy0yNi43IDQzLjYtNTguOSA1NC43LTk0LjYgMS41LTUuNS0uNy0xMS4zLTUuNi0xNC4xek0yNTYgMzM2Yy00NC4xIDAtODAtMzUuOS04MC04MHMzNS45LTgwIDgwLTgwIDgwIDM1LjkgODAgODAtMzUuOSA4MC04MCA4MHoiLz48L3N2Zz4=');\n}\n.next-chessground .next-sync {\n  width: 1rem;\n  height: 1rem;\n  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjOUY5REIwIiBkPSJNMzcwLjcyIDEzMy4yOEMzMzkuNDU4IDEwNC4wMDggMjk4Ljg4OCA4Ny45NjIgMjU1Ljg0OCA4OGMtNzcuNDU4LjA2OC0xNDQuMzI4IDUzLjE3OC0xNjIuNzkxIDEyNi44NS0xLjM0NCA1LjM2My02LjEyMiA5LjE1LTExLjY1MSA5LjE1SDI0LjEwM2MtNy40OTggMC0xMy4xOTQtNi44MDctMTEuODA3LTE0LjE3NkMzMy45MzMgOTQuOTI0IDEzNC44MTMgOCAyNTYgOGM2Ni40NDggMCAxMjYuNzkxIDI2LjEzNiAxNzEuMzE1IDY4LjY4NUw0NjMuMDMgNDAuOTdDNDc4LjE0OSAyNS44NTEgNTA0IDM2LjU1OSA1MDQgNTcuOTQxVjE5MmMwIDEzLjI1NS0xMC43NDUgMjQtMjQgMjRIMzQ1Ljk0MWMtMjEuMzgyIDAtMzIuMDktMjUuODUxLTE2Ljk3MS00MC45NzFsNDEuNzUtNDEuNzQ5ek0zMiAyOTZoMTM0LjA1OWMyMS4zODIgMCAzMi4wOSAyNS44NTEgMTYuOTcxIDQwLjk3MWwtNDEuNzUgNDEuNzVjMzEuMjYyIDI5LjI3MyA3MS44MzUgNDUuMzE5IDExNC44NzYgNDUuMjggNzcuNDE4LS4wNyAxNDQuMzE1LTUzLjE0NCAxNjIuNzg3LTEyNi44NDkgMS4zNDQtNS4zNjMgNi4xMjItOS4xNSAxMS42NTEtOS4xNWg1Ny4zMDRjNy40OTggMCAxMy4xOTQgNi44MDcgMTEuODA3IDE0LjE3NkM0NzguMDY3IDQxNy4wNzYgMzc3LjE4NyA1MDQgMjU2IDUwNGMtNjYuNDQ4IDAtMTI2Ljc5MS0yNi4xMzYtMTcxLjMxNS02OC42ODVMNDguOTcgNDcxLjAzQzMzLjg1MSA0ODYuMTQ5IDggNDc1LjQ0MSA4IDQ1NC4wNTlWMzIwYzAtMTMuMjU1IDEwLjc0NS0yNCAyNC0yNHoiLz48L3N2Zz4=');\n}\n.next-chessground .next-trash {\n  width: 1rem;\n  height: 1rem;\n  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii05NiAtOTYgNjQwIDY0MCI+PHBhdGggZD0iTTI2OCA0MTZoMjRhMTIgMTIgMCAwIDAgMTItMTJWMTg4YTEyIDEyIDAgMCAwLTEyLTEyaC0yNGExMiAxMiAwIDAgMC0xMiAxMnYyMTZhMTIgMTIgMCAwIDAgMTIgMTJ6TTQzMiA4MGgtODIuNDFsLTM0LTU2LjdBNDggNDggMCAwIDAgMjc0LjQxIDBIMTczLjU5YTQ4IDQ4IDAgMCAwLTQxLjE2IDIzLjNMOTguNDEgODBIMTZBMTYgMTYgMCAwIDAgMCA5NnYxNmExNiAxNiAwIDAgMCAxNiAxNmgxNnYzMzZhNDggNDggMCAwIDAgNDggNDhoMjg4YTQ4IDQ4IDAgMCAwIDQ4LTQ4VjEyOGgxNmExNiAxNiAwIDAgMCAxNi0xNlY5NmExNiAxNiAwIDAgMC0xNi0xNnpNMTcxLjg0IDUwLjkxQTYgNiAwIDAgMSAxNzcgNDhoOTRhNiA2IDAgMCAxIDUuMTUgMi45MUwyOTMuNjEgODBIMTU0LjM5ek0zNjggNDY0SDgwVjEyOGgyODh6bS0yMTItNDhoMjRhMTIgMTIgMCAwIDAgMTItMTJWMTg4YTEyIDEyIDAgMCAwLTEyLTEyaC0yNGExMiAxMiAwIDAgMC0xMiAxMnYyMTZhMTIgMTIgMCAwIDAgMTIgMTJ6Ii8+PC9zdmc+');\n}\n";
styleInject(css_248z$4);

var css_248z$3 =
  "*,\n::after,\n::before {\n  box-sizing: border-box;\n  border-width: 0;\n  border-style: solid;\n}\n\n.next-chessground {\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  width: 100%;\n}\n.next-chessground .checkbox {\n  display: flex;\n  margin: 0;\n  align-items: center;\n  padding-left: 0.25rem;\n  width: 2.75rem;\n  height: 1.75rem;\n  outline: none;\n  appearance: none;\n  transition: 0.2s ease-in-out;\n  padding-left: 0.25rem;\n  padding-right: 0.25rem;\n  cursor: pointer;\n}\n.next-chessground .checkbox:before {\n  background-color: rgba(156, 163, 175);\n  width: 1rem;\n  height: 1rem;\n  border-radius: 999px;\n  content: '';\n  transition: 0.2s ease-in-out;\n}\n.next-chessground .checkbox:checked:before {\n  background-color: rgba(4, 120, 87);\n  transform: translate(1rem, 0);\n}\n.next-chessground .next-button {\n  background-color: transparent;\n  background-image: none;\n  cursor: pointer;\n  display: flex;\n  outline: none;\n\n  padding: 0;\n  line-height: inherit;\n  color: inherit;\n  font-size: 100%;\n}\n.next-chessground .next-button:focus {\n  outline: none;\n}\n";
styleInject(css_248z$3);

var css_248z$2 =
  '.pure-modal {\n  box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 15px 0px;\n  color: rgba(55, 65, 81);\n}\n.pure-modal-backdrop {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n.backdrop-overflow-hidden {\n  overflow: hidden !important;\n}\n.pure-modal-backdrop .pure-modal {\n  width: 300px;\n  max-width: 100%;\n  box-sizing: border-box;\n  transition: all 0.2s ease-in-out;\n  max-height: 100%;\n}\n.pure-modal.auto-height {\n  position: static;\n}\n.pure-modal-backdrop.scrollable {\n  overflow-y: auto;\n}\n.pure-modal-backdrop .panel {\n  display: grid;\n  grid-template-rows: repeat(3, min-content);\n}\n.pure-modal-backdrop:not(.scrollable) .panel {\n  grid-template-rows: min-content minmax(0, 1fr) min-content;\n  max-height: -moz-available;\n  max-height: -webkit-fill-available;\n  max-height: fill-available;\n  height: 100%;\n}\n.pure-modal > * > * {\n  flex: 0 0 auto;\n}\n.pure-modal > * > .scrollable {\n  overflow-x: hidden;\n  overflow-scrolling: touch;\n}\n@media (max-width: 480px) {\n  .pure-modal-backdrop .pure-modal {\n    width: 100%;\n  }\n}\n.pure-modal .panel-body {\n  background-color: #fff;\n}\n.pure-modal .panel-heading {\n  background: #f0f0f0;\n}\n.pure-modal .panel-title {\n  padding: 12px 45px 12px 15px;\n  margin: 0;\n}\n.pure-modal .close {\n  right: 6px;\n  top: 6px;\n  z-index: 1;\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  text-align: center;\n  line-height: 30px;\n  cursor: pointer;\n  font-size: 1.85rem;\n}\n.pure-modal .panel-heading .close:hover {\n  color: #000;\n}\n.pure-modal .panel-body {\n  padding: 15px;\n}\n.pure-modal .panel-footer {\n  padding: 12px 45px 12px 15px;\n  background: #f0f0f0;\n}\n.pure-modal .panel-body,\n.pure-modal .panel-footer,\n.pure-modal .panel-title {\n  word-break: break-all;\n}\n.pure-modal-backdrop .additional-row,\n.pure-modal-backdrop:not(.scrollable) .additional-row {\n  display: grid;\n  grid-template-rows: min-content minmax(0, 1fr) min-content min-content;\n}\n';
styleInject(css_248z$2);

var css_248z$1 =
  "/**\n * Cburnett\n */\n.cburnett piece.pawn.white {\n  background-image: url('https://lichess1.org/assets/_MKI2V3/piece/cburnett/wP.svg');\n}\n.cburnett piece.bishop.white {\n  background-image: url('https://lichess1.org/assets/_MKI2V3/piece/cburnett/wB.svg');\n}\n.cburnett piece.knight.white {\n  background-image: url('https://lichess1.org/assets/_MKI2V3/piece/cburnett/wN.svg');\n}\n.cburnett piece.rook.white {\n  background-image: url('https://lichess1.org/assets/_MKI2V3/piece/cburnett/wR.svg');\n}\n.cburnett piece.queen.white {\n  background-image: url('https://lichess1.org/assets/_MKI2V3/piece/cburnett/wQ.svg');\n}\n.cburnett piece.king.white {\n  background-image: url('https://lichess1.org/assets/_MKI2V3/piece/cburnett/wK.svg');\n}\n.cburnett piece.pawn.black {\n  background-image: url('https://lichess1.org/assets/_MKI2V3/piece/cburnett/bP.svg');\n}\n.cburnett piece.bishop.black {\n  background-image: url('https://lichess1.org/assets/_MKI2V3/piece/cburnett/bB.svg');\n}\n.cburnett piece.knight.black {\n  background-image: url('https://lichess1.org/assets/_MKI2V3/piece/cburnett/bN.svg');\n}\n.cburnett piece.rook.black {\n  background-image: url('https://lichess1.org/assets/_MKI2V3/piece/cburnett/bR.svg');\n}\n.cburnett piece.queen.black {\n  background-image: url('https://lichess1.org/assets/_MKI2V3/piece/cburnett/bQ.svg');\n}\n.cburnett piece.king.black {\n  background-image: url('https://lichess1.org/assets/_MKI2V3/piece/cburnett/bK.svg');\n}\n\n/**\n * Classic\n */\n.classic piece.pawn.white {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/classic/150/wp.png');\n}\n.classic piece.bishop.white {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/classic/150/wb.png');\n}\n.classic piece.knight.white {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/classic/150/wn.png');\n}\n.classic piece.rook.white {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/classic/150/wr.png');\n}\n.classic piece.queen.white {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/classic/150/wq.png');\n}\n.classic piece.king.white {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/classic/150/wk.png');\n}\n.classic piece.pawn.black {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/classic/150/bp.png');\n}\n.classic piece.bishop.black {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/classic/150/bb.png');\n}\n.classic piece.knight.black {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/classic/150/bn.png');\n}\n.classic piece.rook.black {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/classic/150/br.png');\n}\n.classic piece.queen.black {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/classic/150/bq.png');\n}\n.classic piece.king.black {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/classic/150/bk.png');\n}\n\n/**\n * Neo\n */\n.neo piece.pawn.white {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png');\n}\n.neo piece.bishop.white {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wb.png');\n}\n.neo piece.knight.white {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wn.png');\n}\n.neo piece.rook.white {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wr.png');\n}\n.neo piece.queen.white {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wq.png');\n}\n.neo piece.king.white {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wk.png');\n}\n.neo piece.pawn.black {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png');\n}\n.neo piece.bishop.black {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bb.png');\n}\n.neo piece.knight.black {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bn.png');\n}\n.neo piece.rook.black {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/neo/150/br.png');\n}\n.neo piece.queen.black {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bq.png');\n}\n.neo piece.king.black {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bk.png');\n}\n\n/**\n * Alpha\n */\n.alpha piece.pawn.white {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/alpha/150/wp.png');\n}\n.alpha piece.bishop.white {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/alpha/150/wb.png');\n}\n.alpha piece.knight.white {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/alpha/150/wn.png');\n}\n.alpha piece.rook.white {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/alpha/150/wr.png');\n}\n.alpha piece.queen.white {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/alpha/150/wq.png');\n}\n.alpha piece.king.white {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/alpha/150/wk.png');\n}\n.alpha piece.pawn.black {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/alpha/150/bp.png');\n}\n.alpha piece.bishop.black {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/alpha/150/bb.png');\n}\n.alpha piece.knight.black {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/alpha/150/bn.png');\n}\n.alpha piece.rook.black {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/alpha/150/br.png');\n}\n.alpha piece.queen.black {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/alpha/150/bq.png');\n}\n.alpha piece.king.black {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/alpha/150/bk.png');\n}\n\n/**\n * Bases\n */\n.bases piece.pawn.white {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/bases/150/wp.png');\n}\n.bases piece.bishop.white {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/bases/150/wb.png');\n}\n.bases piece.knight.white {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/bases/150/wn.png');\n}\n.bases piece.rook.white {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/bases/150/wr.png');\n}\n.bases piece.queen.white {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/bases/150/wq.png');\n}\n.bases piece.king.white {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/bases/150/wk.png');\n}\n.bases piece.pawn.black {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/bases/150/bp.png');\n}\n.bases piece.bishop.black {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/bases/150/bb.png');\n}\n.bases piece.knight.black {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/bases/150/bn.png');\n}\n.bases piece.rook.black {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/bases/150/br.png');\n}\n.bases piece.queen.black {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/bases/150/bq.png');\n}\n.bases piece.king.black {\n  background-image: url('https://images.chesscomfiles.com/chess-themes/pieces/bases/150/bk.png');\n}\n";
styleInject(css_248z$1);

var css_248z =
  '.flex {\n  display: flex;\n}\n.flex-col {\n  flex-direction: column;\n}\n.flex-row-reverse {\n  flex-direction: row-reverse;\n}\n.grid {\n  display: grid;\n}\n.grid-cols-2 {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n.gap-2 {\n  gap: 0.5rem;\n}\n.gap-3 {\n  gap: 0.75rem;\n}\n.w-full {\n  width: 100%;\n}\n.items-center {\n  align-items: center;\n}\n.justify-center {\n  justify-content: center;\n}\n.py-1\\.5 {\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n}\n.px-2 {\n  padding-left: 0.25rem;\n  padding-right: 0.25rem;\n}\n.cursor-pointer {\n  cursor: pointer;\n}\n.cursor-resize {\n  cursor: nesw-resize;\n}\n.outline-none,\n.outline-none:focus {\n  outline: none;\n}\n.text-sm {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n}\n.text-gray-400 {\n  color: rgba(156, 163, 175);\n}\n.text-gray-800 {\n  color: rgba(31, 41, 55);\n}\n.bg-white {\n  background-color: #fff;\n}\n.bg-orange-300 {\n  background-color: #fbd38d;\n}\n.border {\n  border-width: 1px;\n  border-style: solid;\n}\n.border-gray-300 {\n  border-color: rgba(209, 213, 219);\n}\n.rounded {\n  border-radius: 0.25rem;\n}\n';
styleInject(css_248z);

exports.NextChessground = NextChessground$1;
exports.NextEditor = NextEditor$1;
exports.Stockfish = Stockfish;
exports.constants = constants;
exports['default'] = NextChessground$1;
exports.isValidFen = isValidFen;
exports.useChess = useChess;
exports.useChessground = useChessground;
