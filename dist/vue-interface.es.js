import moment from 'moment';
import Popper from 'popper.js';
import axios from 'axios';

function DateFilter (value, format) {
  if (value) {
    return moment(String(value)).format(format);
  }

  return '';
}

function MomentFilter (value, format) {
  return value ? moment(String(value)) : null;
}

function index (Vue, options) {
  Vue.filter('date', DateFilter);
  Vue.filter('moment', MomentFilter);
}



var filters = /*#__PURE__*/Object.freeze({
    DateFilter: index,
    MomentFilter: index
});

function camelCase(string) {
  string = string.toLowerCase().replace(/(?:(^.)|([-_\s]+.))/g, function (match) {
    return match.charAt(match.length - 1).toUpperCase();
  });
  return string.charAt(0).toLowerCase() + string.substring(1);
}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _readOnlyError(name) {
  throw new Error("\"" + name + "\" is read-only");
}

function extend() {
  return Object.assign.apply(Object, arguments);
}

function isNull(value) {
  return value === null;
}

function isArray(value) {
  return Array.isArray(value);
}

function isObject(value) {
  return _typeof(value) === 'object' && !isNull(value) && !isArray(value);
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
*/

function deepExtend(target) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  if (!sources.length) return target;
  var source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (var key in source) {
      if (isObject(source[key])) {
        if (!target[key]) extend(target, _defineProperty({}, key, {}));
        deepExtend(target[key], source[key]);
      } else {
        extend(target, _defineProperty({}, key, source[key]));
      }
    }
  }

  return deepExtend.apply(void 0, [target].concat(sources));
}

function isNumber(value) {
  return typeof value === 'number' || (value && value.toString ? value.toString() === '[object Number]' : false);
}

function isNumeric(value) {
  return isNumber(value) || !!value && !!value.toString().match(/^\-?[\d.,]+$/);
}

function key(value) {
  return isNumeric(value) ? parseFloat(value) : value;
}

function each(subject, fn) {
  for (var i in subject) {
    fn(subject[i], key(i));
  }
}

function first(array) {
  return array && array.length ? array[0] : undefined;
}

function isUndefined(value) {
  return typeof value === 'undefined';
}

function matches(properties) {
  return function (subject) {
    for (var i in properties) {
      if (isObject(properties[i])) {
        return subject[i] ? matches(properties[i])(subject[i]) : false;
      } else if (!subject || subject[i] != properties[i]) {
        return false;
      }
    }

    return true;
  };
}

function isString(value) {
  return typeof value === 'string';
}

function get(object, path) {
  return (isString(path) ? path.split('.') : !isArray(path) ? [path] : path).reduce(function (a, b) {
    return a[b];
  }, object);
}

function property(path) {
  return function (object) {
    return get(object, path);
  };
}

function isFunction$1(value) {
  return value instanceof Function;
}

function matchesProperty(path, value) {
  return function (subject) {
    return get(subject, path) === value;
  };
}

function predicate(value) {
  if (isObject(value)) {
    value = matches(value);
  } else if (isArray(value)) {
    value = matchesProperty(value[0], value[1]);
  } else if (!isFunction$1(value)) {
    value = property(value);
  }

  return value;
}

function find(subject, value) {
  return first(subject.filter(function (object) {
    return predicate(value)(object);
  }));
}

function findIndex(subject, value) {
  for (var i in subject) {
    if (predicate(value)(subject[i])) {
      return key(i);
    }
  }

  return -1;
}

function isBoolean(value) {
  return value === true || value === false;
}

function kebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').replace(/\_/g, '-').toLowerCase();
}

function mapKeys(object, fn) {
  var mapped = {};
  each(object, function (value, key) {
    mapped[fn(value, key)] = value;
  });
  return mapped;
}

function negate(fn) {
  return function () {
    return isFunction$1(fn) ? !fn.apply(void 0, arguments) : !fn;
  };
}

function pickBy(object, match) {
  var subject = {};
  each(object, function (value, key) {
    if (predicate(match)(value)) {
      subject[key] = value;
    }
  });
  return subject;
}

function omitBy(object, fn) {
  return pickBy(object, negate(fn));
}

function remove(array, match) {
  var indexes = [];

  for (var i in array) {
    if (predicate(match)(array[i])) {
      indexes.push(key(i));
    }
  }

  return array.filter(function (value, i) {
    return indexes.indexOf(i) !== -1;
  });
}

function wrap(subject, fn) {
  return function (value) {
    return isFunction$1(fn) ? fn(subject, value) : value;
  };
}

function prefix(subject, prefix) {
  var delimeter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '-';

  var prefixer = function prefixer(value, key) {
    var string = (key || value).replace(new RegExp("^".concat(prefix).concat(delimeter, "?")), '');
    return [prefix, string].filter(function (value) {
      return !!value;
    }).join(delimeter);
  };

  if (isBoolean(subject)) {
    return subject;
  }

  if (isObject(subject)) {
    return mapKeys(subject, prefixer);
  }

  return prefixer(subject);
}

var Variant = {
  props: {
    /**
     * The variant attribute
     *
     * @property String
     */
    variant: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    variantClassPrefix: function variantClassPrefix() {
      return this.$options.name;
    },
    variantClass: function variantClass() {
      return prefix(this.variant, this.variantClassPrefix);
    }
  }
};

var Sizeable = {
  props: {
    /**
     * The size of the form control
     *
     * @property String
     */
    size: {
      type: String,
      default: 'md',
      validate: function validate(value) {
        return ['sm', 'md', 'lg'].indexOf(value) !== -1;
      }
    }
  },
  computed: {
    sizeableClassPrefix: function sizeableClassPrefix() {
      return this.$options.name;
    },
    sizeableClass: function sizeableClass() {
      return prefix(this.size, this.sizeableClassPrefix);
    }
  }
};

var COLORS = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'white', 'muted'];
var props = {};
each(['border', 'text', 'bg', 'bg-gradient'], function (namespace) {
  each(COLORS, function (color) {
    props[camelCase(prefix(color, namespace))] = Boolean;
  });
});

function classes(instance, namespace) {
  return COLORS.map(function (color) {
    return instance[camelCase(color = prefix(color, namespace))] ? color : null;
  }).filter(function (value) {
    return !!value;
  });
}

var Colorable = {
  props: props,
  methods: {
    textColor: function textColor() {
      return classes(this, 'text');
    },
    bgColor: function bgColor() {
      return classes(this, 'bg');
    },
    borderColor: function borderColor() {
      return classes(this, 'border');
    },
    bgGradientColor: function bgGradientColor() {
      return classes(this, 'bg-gradient');
    }
  },
  computed: {
    textColorClasses: function textColorClasses() {
      return this.textColor().join(' ').trim() || null;
    },
    borderColorClasses: function borderColorClasses() {
      return this.borderColor().join(' ').trim() || null;
    },
    bgColorClasses: function bgColorClasses() {
      return this.bgColor().join(' ').trim() || null;
    },
    bgGradientColorClasses: function bgGradientColorClasses() {
      return this.bgGradientColor().join(' ').trim() || null;
    },
    colorableClasses: function colorableClasses() {
      var classes = {};
      classes[this.textColorClasses] = !!this.textColorClasses;
      classes[this.borderColorClasses] = !!this.borderColorClasses;
      classes[this.bgColorClasses] = !!this.bgColorClasses;
      classes[this.bgGradientColorClasses] = !!this.bgGradientColorClasses;
      return omitBy(classes, function (key, value) {
        return !key || !value;
      });
    }
  }
};

function duration(el) {
  var duration = getComputedStyle(el).transitionDuration;
  var numeric = parseFloat(duration, 10) || 0;
  var unit = duration.match(/m?s/);

  switch (unit[0]) {
    case 's':
      return numeric * 1000;

    case 'ms':
      return numeric;
  }
}

function transition(el) {
  return new Promise(function (resolve, reject) {
    try {
      var delay = duration(el);
      setTimeout(function () {
        resolve(delay);
      }, delay);
    } catch (e) {
      reject(e);
    }
  });
}

var MergeClasses = {
  methods: {
    mergeClasses: function mergeClasses() {
      var classes = {};
      each([].slice.call(arguments), function (arg) {
        if (isObject(arg)) {
          extend(classes, arg);
        } else if (isArray(arg)) {
          classes = (_readOnlyError("classes"), classes.concat(arg));
        } else if (arg) {
          classes[arg] = true;
        }
      });
      return classes;
    }
  }
};

var Btn = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.to)?_c('router-link',{class:_vm.classes,attrs:{"to":_vm.to,"disabled":_vm.disabled,"role":"button"},on:{"click":_vm.onClick}},[_vm._t("default")],2):(_vm.href)?_c('a',{class:_vm.classes,attrs:{"href":_vm.href,"disabled":_vm.disabled,"role":"button"},on:{"click":_vm.onClick}},[_vm._t("default")],2):(_vm.label)?_c('label',{class:_vm.classes,attrs:{"disabled":_vm.disabled,"role":"button"},on:{"click":_vm.onClick}},[_vm._t("default")],2):_c('button',{class:_vm.classes,attrs:{"type":_vm.type,"disabled":_vm.disabled},on:{"click":_vm.onClick}},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'btn',

    mixins: [
        Variant,
        Sizeable,
        Colorable,
        MergeClasses
    ],

    props: {

        /**
         * Display button with active state
         *
         * @property String
         */
        active: Boolean,

        /**
         * Display button with blocked state
         *
         * @property String
         */
        block: Boolean,

        /**
         * Display button with disabled state
         *
         * @property String
         */
        disabled: Boolean,

        /**
         * If an href is passed, button is an router-link element
         *
         * @property Boolean
         */
        href: String,

        /**
         * Should use <label> as the element for the button. Used for inputs
         * wrappers (toggles).
         *
         * @property Boolean
         */
        label: Boolean,

        /**
         * Display as an outline button
         *
         * @property String
         */
        outline: Boolean,

        /**
         * If an to is passed, button is an router-link element
         *
         * @property Boolean
         */
        to: [Object, String],

        /**
         * The type attribute for the button. Not applied if an anchor
         *
         * @property String
         */
        type: String

    },

    methods: {

        onClick(event) {
            this.$emit('click', event);
        }

    },

    computed: {

        variantClassPrefix() {
            return this.$options.name + (this.outline ? '-outline' : '');
        },

        classes() {
            return this.mergeClasses(
                'btn',
                this.variantClass,
                this.sizeableClass,
                this.colorableClasses,
                this.block ? 'btn-block' : '',
                this.active ? 'active' : ''
            );
        }

    }

};

var LOADED_SCRIPTS = {};

function element(url) {
  var script = document.createElement('script');
  script.setAttribute('src', url);
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('charset', 'utf-8');
  return script;
}

function append(script) {
  if (document.querySelector('head')) {
    document.querySelector('head').appendChild(script);
  } else {
    document.querySelector('body').appendChild(script);
  }

  return script;
}

function script(url) {
  if (LOADED_SCRIPTS[url] instanceof Promise) {
    return LOADED_SCRIPTS[url];
  } else if (LOADED_SCRIPTS[url] || document.querySelector("script[src=\"".concat(url, "\"]"))) {
    return new Promise(function (resolve, reject) {
      resolve(LOADED_SCRIPTS[url]);
    });
  }

  return LOADED_SCRIPTS[url] = new Promise(function (resolve, reject) {
    try {
      append(element(url)).addEventListener('load', function (event) {
        resolve(LOADED_SCRIPTS[url] = event);
      });
    } catch (e) {
      reject(e);
    }
  });
}

var VueInstaller = {
  use: use,
  script: script,
  plugin: plugin,
  plugins: plugins,
  filter: filter,
  filters: filters$1,
  component: component,
  components: components,
  directive: directive,
  directives: directives,
  $plugins: {},
  $filters: {},
  $directives: {},
  $components: {}
};
function use(plugin) {
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
  }

  return plugin;
}
function plugin(Vue, name, def) {
  if (!VueInstaller.$plugins[name]) {
    Vue.use(VueInstaller.$plugins[name] = def);
  }
}
function plugins(Vue, plugins) {
  each(plugins, function (def, name) {
    plugin(Vue, name, def);
  });
}
function filter(Vue, name, def) {
  if (!VueInstaller.$filters[name]) {
    Vue.use(VueInstaller.$filters[name] = def);
  }
}
function filters$1(Vue, filters) {
  each(filters, function (def, name) {
    filter(Vue, name, def);
  });
}
function component(Vue, name, def) {
  if (!VueInstaller.$components[name]) {
    Vue.component(name, VueInstaller.$components[name] = def);
  }
}
function components(Vue, components) {
  each(components, function (def, name) {
    component(Vue, name, def);
  });
}
function directive(Vue, name, def) {
  if (!VueInstaller.$directives[name]) {
    if (isFunction$1(def)) {
      Vue.use(VueInstaller.$directives[name] = def);
    } else {
      Vue.directive(name, def);
    }
  }
}
function directives(Vue, directives) {
  each(directives, function (def, name) {
    directive(Vue, name, def);
  });
}

var plugin$1 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Btn: Btn
    });
  }
});

var ModalBody = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-body"},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'modal-body'

};

var ModalDialog = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-dialog",attrs:{"role":"document"}},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'modal-dialog'

};

var ModalTitle = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h5',{staticClass:"modal-title"},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'modal-title'

};

var ModalHeader = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header"},[_vm._t("title",[_c('modal-title',[_vm._t("default")],2)]),_vm._v(" "),_vm._t("close-button",[(_vm.closeable)?_c('button',{staticClass:"close",attrs:{"type":"button","aria-label":"ariaLabel"},on:{"click":function($event){_vm.$emit('close');}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])]):_vm._e()])],2)},staticRenderFns: [],

    name: 'modal-header',

    components: {
        ModalTitle
    },

    props: {

        ariaLabel: {
            type: String,
            default: 'Close'
        },

        closeable: {
            type: Boolean,
            default: true
        }

    }

};

var ModalFooter = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-footer"},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'modal-footer'

};

function unit (height) {
  return isFinite(height) ? height + 'px' : height;
}

var BaseType = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"activity-indicator",class:_vm.classes},_vm._l((_vm.nodes),function(i){return _c('div')}))},staticRenderFns: [],

    props: {
        nodes: {
            type: Number,
            default: 3
        },
        size: {
            type: String,
            default: ''
        },
        prefix: {
            type: String,
            default: 'activity-indicator-'
        }
    },

    computed: {
        classes: function() {
            const classes = {};

            classes[this.$options.name] = !!this.$options.name;
            classes[this.prefix + this.size.replace(this.prefix, '')] = !!this.size;

            return classes;
        }
    }

};

var ActivityIndicatorDots = {

    name: 'activity-indicator-dots',

    extends: BaseType
};

var ActivityIndicatorSpinner = {

    name: 'activity-indicator-spinner',

    extends: BaseType,

    props: extend({}, BaseType.props, {
        nodes: {
            type: Number,
            default: 12
        }
    })
};

var ActivityIndicator = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.center)?_c('div',{staticClass:"center-wrapper",class:{'position-relative': _vm.relative, 'position-fixed': _vm.fixed},style:(_vm.style)},[_c('div',{staticClass:"center-content d-flex flex-column align-items-center"},[_c(_vm.component,{tag:"component",attrs:{"size":_vm.size,"prefix":_vm.prefix}}),_vm._v(" "),(_vm.label)?_c('div',{staticClass:"activity-indicator-label",domProps:{"innerHTML":_vm._s(_vm.label)}}):_vm._e()],1)]):_c('div',{staticClass:"d-flex flex-column justify-content-center align-items-center",style:(_vm.style)},[_c(_vm.component,{tag:"component",attrs:{"size":_vm.size,"prefix":_vm.prefix}}),_vm._v(" "),(_vm.label)?_c('div',{staticClass:"activity-indicator-label",domProps:{"innerHTML":_vm._s(_vm.label)}}):_vm._e()],1)},staticRenderFns: [],

    name: 'activity-indicator',

    extends: BaseType,

    props: {

        center: Boolean,

        fixed: Boolean,

        label: String,

        relative: Boolean,

        type: {
            type: String,
            default: 'dots'
        },

        height: [String, Number],

        maxHeight: [String, Number],

        minHeight: [String, Number],

        width: [String, Number],

        maxWidth: [String, Number],

        minWidth: [String, Number]

    },

    components: {
        ActivityIndicatorDots,
        ActivityIndicatorSpinner
    },

    computed: {

        style() {
            return {
                width: unit(this.width),
                maxWidth: unit(this.maxWidth),
                minWidth: unit(this.minWidth),
                height: unit(this.height),
                maxHeight: unit(this.maxHeight),
                minHeight: unit(this.minHeight)
            }
        },

        component() {
            return kebabCase(this.prefix + this.type.replace(this.prefix, ''));
        }
    }

};

var plugin$2 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      ActivityIndicator: ActivityIndicator
    });
  }
});

const convertAnimationDelayToInt = function(delay) {
    const num = parseFloat(delay, 10);
    const matches = delay.match(/m?s/);
    const unit = matches ? matches[0] : false;

    let milliseconds;

    switch (unit) {
        case "s": // seconds
            milliseconds = num * 1000;
            break;
        case "ms":
        default:
            milliseconds = num;
            break;
    }

    return milliseconds || 0;
};

const animated = function(el, callback) {
    const defaultView = (el.ownerDocument || document).defaultView;

    setTimeout(() => {
        callback.apply();
    }, convertAnimationDelayToInt(defaultView.getComputedStyle(el).animationDuration));
};

var BtnActivity = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"btn",class:_vm.classes,attrs:{"type":_vm.type},on:{"click":_vm.onClick}},[(_vm.icon)?_c('i',{class:_vm.icon}):_vm._e(),_vm._v(" "+_vm._s(_vm.label)+" "),_vm._t("default"),_vm._v(" "),_c('activity-indicator',{attrs:{"type":_vm.indicator}})],2)},staticRenderFns: [],

    name: 'activity-button',

    components: {
        ActivityIndicator
    },

    props: {

        /**
         * Make the button appear with the active state.
         *
         * @property {Boolea}n}
         */
        active: Boolean,

        /**
         * Show the activity indicator inside the button.
         *
         * @property {Boolea}n}
         */
        activity: Boolean,

        /**
         * Display the button as block width.
         *
         * @property {Boolea}n}
         */
        block: Boolean,

        /**
         * Make the button appear with the disabled state.
         *
         * @property {Boolea}n}
         */
        disabled: Boolean,

        /**
         * The button label. If not passed as a property, label must be passed
         * inside the element's html.
         *
         * @property {String}
         */
        label: String,

        /**
         * The button icon
         *
         * @property {String}
         */
        icon: String,

        /**
         * The `type` attribute for the button element.
         *
         * @property {String}
         */
        type: String,

        /**
         * The size of the button.
         *
         * @property {String}
         */
        size: {
            type: String,
            default: 'md'
        },

        /**
         * The variant of the button.
         *
         * @property {String}
         */
        variant: {
            type: String,
            default: 'primary'
        },

        /**
         * The type of activity indicator inside the button.
         *
         * @property {String}
         */
        indicator: {
            type: String,
            default: 'spinner'
        },

        /**
         * The orientation of the activity button inside the button.
         *
         * @property {String}
         */
        orientation: {
            type: String,
            default: 'right'
        }
    },

    methods: {

        /**
         * Disable the button.
         *
         * @return void
         */
        disable() {
            this.$el.disabled = true;
        },

        /**
         * Enable the button.
         *
         * @return void
         */
        enable() {
            this.$el.disabled = false;
        },

        /**
         * Show the activity indicator inside the button.
         *
         * @return void
         */
        showActivity() {
            this.disable();

            animated(this.$el, () => {
                this.$el.classList.add('btn-activity');
                this.$emit('activity:show');
            });
        },

        /**
         * Hide the activity indicator inside the button.
         *
         * @return void
         */
        hideActivity() {
            this.$el.classList.add('btn-hide-activity');

            animated(this.$el, () => {
                this.enable();
                this.$el.classList.remove('btn-activity', 'btn-hide-activity');
                this.$emit('activity:hide');
            });
        },

        /**
         * The click callback function
         *
         * @return void
         */
        onClick(event) {
            this.$emit('click', event);
        }

    },

    computed: {

        /**
         * An object of classes to append to the button.
         *
         * @return void
         */
        classes() {
            const classes = {
                'disabled': this.disabled,
                'active': this.active,
                'btn-block': this.block,
                'btn-activity': this.activity
            };

            classes['btn-' + this.size.replace('btn-', '')] = !!this.size;
            classes['btn-' + this.variant.replace('btn-', '')] = !!this.variant;
            classes['btn-activity-' + this.orientation.replace('btn-activity-', '')] = !!this.orientation;
            classes['btn-activity-indicator-' + this.indicator.replace('btn-activity-indicator-', '')] = !!this.indicator;

            return classes;
        }
    },

    watch: {

        activity(value) {
            if(value) {
                this.showActivity();
            }
            else {
                this.hideActivity();
            }
        }

    }

};

var plugin$3 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      BtnActivity: BtnActivity
    });
  }
});

var ModalContent = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-content"},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'modal-content'

};

var ModalBackdrop = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-backdrop",class:{'fade': _vm.fade, 'show': _vm.show}},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'modal-backdrop',

    props: {

        /**
         * Show the modal with a fade effect.
         *
         * @property Boolean
         */
        fade: {
            type: Boolean,
            default: true
        },

        /**
         * Is the modal showing.
         *
         * @property Boolean
         */
        show: {
            type: Boolean,
            default: true
        }

    }

};

var Triggerable = {
  props: {
    /**
     * Show the triggerable element with a animated fade effect.
     *
     * @type {Boolean}
     */
    animation: {
      type: Boolean,
      default: true
    },

    /**
     * Is the triggerable element showing.
     *
     * @property Boolean
     */
    show: {
      type: Boolean,
      defaut: false
    },

    /**
     * The target element used to position the popover.
     *
     * @type {String|Element|Boolean}
     */
    target: {
      type: [String, Element, Boolean],
      default: false
    },

    /**
     * How the modal is triggered - click | hover | focus | manual. You may
     * pass multiple triggers; separate them with a space. `manual` cannot
     * be combined with any other trigger.
     *
     * @type {String}
     */
    trigger: {
      type: [String, Array],
      default: 'click'
    }
  },
  methods: {
    /**
     * Initialize the trigger event for the specified elements
     *
     * @param  {Element} el
     * @return {void}
     */
    initializeTrigger: function initializeTrigger(el) {
      var _this = this;

      each(isString(this.trigger) ? this.trigger.split(' ') : this.trigger, function (trigger) {
        el.addEventListener(trigger, function (event) {
          _this.toggle();
        });
      });
    },

    /**
     * Initialize the event triggers
     *
     * @return void
     */
    initializeTriggers: function initializeTriggers() {
      var _this2 = this;

      if (this.target && this.trigger !== 'manual') {
        if (this.target instanceof Element) {
          this.initializeTrigger(this.target);
        } else {
          document.querySelectorAll(this.target).forEach(function (el) {
            _this2.initializeTrigger(el);
          });
        }
      }

      if (this.show || !this.target) {
        this.$nextTick(function () {
          _this2.isShowing = true;
        });
      }
    },

    /**
     * Focus on the first field in the modal (if exists).
     *
     * @return this
     */
    focus: function focus() {
      var _this3 = this;

      this.$nextTick(function () {
        var el = _this3.$el.querySelector('.form-control, input, select, textarea');

        if (el) {
          el.focus();
        } else {
          _this3.$el.focus();
        }
      });
      return this;
    },

    /**
     * Open the triggereable element
     *
     * @return this
     */
    open: function open() {
      var _this4 = this;

      this.isDisplaying = true;
      this.$nextTick(function () {
        transition(_this4.$el).then(function (delay) {
          _this4.isShowing = true;

          _this4.$emit('open');
        });
      });
      return this;
    },

    /**
     * Close the triggereable element
     *
     * @return this
     */
    close: function close(event) {
      var _this5 = this;

      transition(this.$el).then(function (delay) {
        _this5.isDisplaying = false;

        _this5.$emit('close', event);
      });
      this.isShowing = false;
      return this;
    },

    /**
     * Toggle the triggereable element's open/close method.
     *
     * @return this
     */
    toggle: function toggle() {
      if (!this.isShowing) {
        this.open();
      } else {
        this.close();
      }

      return this;
    }
  },
  computed: {
    triggerableClasses: function triggerableClasses() {
      return {
        'fade': this.animation,
        'show': this.isShowing
      };
    }
  },
  watch: {
    isShowing: function isShowing(value) {
      if (value) {
        this.focus();
      }
    },
    show: function show(value) {
      this.isShowing = value;
    }
  },
  mounted: function mounted() {
    this.initializeTriggers();
  },
  data: function data() {
    return {
      isDisplaying: this.show || !this.target,
      isShowing: false
    };
  }
};

var Modal = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal",class:_vm.triggerableClasses,style:({display: _vm.isDisplaying ? 'block' : 'none'}),attrs:{"tabindex":"-1","role":"dialog"},on:{"keydown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"esc",27,$event.key,"Escape")){ return null; }return _vm.cancel($event)}}},[(_vm.backdrop)?_c('modal-backdrop',{ref:"backdrop"}):_vm._e(),_vm._v(" "),_c('modal-dialog',{class:{'modal-dialog-centered': _vm.center}},[_c('modal-content',[_vm._t("header",[(_vm.title)?_c('modal-header',{on:{"close":_vm.cancel}},[_vm._v(_vm._s(_vm.title))]):_vm._e()]),_vm._v(" "),_vm._t("body",[_c(!_vm.flush ? 'modal-body' : 'div',{tag:"component",staticClass:"child-component"},[_vm._t("default")],2)]),_vm._v(" "),_vm._t("footer",[(_vm.type)?_c('modal-footer',[(_vm.type === 'alert')?[_c('btn-activity',{attrs:{"activity":_vm.activity,"variant":"primary"},on:{"click":_vm.confirm}},[_vm._v(_vm._s(_vm.okLabel))])]:[_c('btn',{attrs:{"type":"button","variant":"secondary"},domProps:{"innerHTML":_vm._s(_vm.cancelLabel)},on:{"click":_vm.cancel}}),_vm._v(" "),_c('btn-activity',{attrs:{"activity":_vm.activity,"variant":"primary"},on:{"click":_vm.confirm}},[_vm._v(_vm._s(_vm.okLabel))])]],2):_vm._e()])],2)],1)],1)},staticRenderFns: [],

    name: 'modal',

    components: {
        Btn,
        BtnActivity,
        ModalBody,
        ModalBackdrop,
        ModalContent,
        ModalDialog,
        ModalHeader,
        ModalFooter
    },

    mixins: [
        Triggerable
    ],

    props: {

        /**
         * Show the modal activity indicator.
         *
         * @type {Boolean}
         */
        activity: Boolean,

        /**
         * Show the modal with a backdrop.
         *
         * @type {Boolean}
         */
        backdrop: {
            type: Boolean,
            default: true,
        },

        /**
         * Is the modal centered in the screen.
         *
         * @type {Boolean}
         */
        center: Boolean,

        /**
         * Is the modal content fixed position
         *
         * @type {Boolean}
         */
        closeable: {
            type: Boolean,
            default: true
        },

        /**
         * Is the modal content flush with the modal edges? If true, no modal-body
         * will be used to wrap the content.
         *
         * @type {Boolean}
         */
        flush: Boolean,

        /**
         * The ok label text.
         *
         * @type {String}
         */
        okLabel: {
            type: String,
            default: 'Ok'
        },

        /**
         * The cancel label text.
         *
         * @type {String}
         */
        cancelLabel: {
            type: String,
            default: 'Cancel'
        },

        /**
         * The modal title.
         *
         * @type {String}
         */
        title: String,

        /**
         * Is the modal type.
         *
         * @type {Boolean}
         */
        type: {
            type: [Boolean, String],
            default: false,
            validate(value) {
                return ['alert', 'confirm', 'prompt'].indexOf(value) !== -1;
            }
        }

    },

    methods: {

        /**
         * Mount the backdrop to the document body.
         *
         * @return {void}
        mountBackdrop() {
            if(!this.backdropComponent) {
                this.backdropComponent = this.$refs.backdrop.$mount(
                    document.body.appendChild(document.createElement('div'))
                );
            }
        },
        */

        /**
         * Unmount the backdrop from the document body.
         *
         * @return {void}
        unmountBackdrop() {
            if(this.backdropComponent) {
                this.backdropComponent.$destroy();
                this.backdropComponent.$el.remove();
                this.backdropComponent = null;
            }
        },
        */

        /**
         * Cancel the modal
         *
         * @return {void}
         */
        cancel(event) {
            this.$emit('cancel', event);
            this.close(event);
        },

        /**
         * Confirm the modal
         *
         * @return {void}
         */
        confirm(event) {
            this.$emit('confirm', event);
        },

        /**
         * A callback for the escape function.
         *
         * @return {void}
         */
        onEsc(event) {
            (this.type === 'confirm' || this.type ===  'prompt') ? this.cancel(event) : this.close(event);
        }

    },

    watch: {

        isShowing(value) {
            if(value) {
                document.querySelector('body').classList.add('modal-open');
                //this.mountBackdrop();
            }
            else {
                document.querySelector('body').classList.remove('modal-open');
                //this.unmountBackdrop();
            }

            this.$emit('update:show', value);
        }

    },

    data() {
        return {
            backdropComponent: null,
            isDisplaying: this.show || !this.target,
            isShowing: false
        }
    },

    mounted() {
        this.initializeTriggers();
        /*
        if(this.show || !this.target) {
            this.mountBackdrop();
        }
        */
    },

    beforeRouteLeave(to, from, next) {
        modal.close();
    }

};

var plugin$4 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Modal: Modal
    });
  }
});

function instantiate(Vue, Component, options) {
  if (Component instanceof Vue) {
    return Component;
  }

  if (isObject(Component)) {
    Component = Vue.extend(Component);
  } else if (isString(Component)) {
    var text = Component;
    Component = Vue.extend({
      functional: true,
      render: function render(h, context) {
        return this._v(text);
      }
    });
  }

  return new Component(options);
}

function modal$1 (Vue, options) {
  Vue.prototype.$modal = function (Component, options) {
    if (!isObject(options)) {
      options = {};
    }

    var instance = instantiate(Vue, Modal, options.modal);
    instance.$content = instantiate(Vue, Component, options.content);
    instance.$slots.default = [instance.$content.$mount()._vnode];
    instance.$mount(document.body.appendChild(document.createElement('div')));
    return instance;
  };

  Vue.prototype.$alert = function (title, Component, options) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var modal = _this.$modal(Component, deepExtend(options, {
        modal: {
          propsData: {
            title: title,
            type: 'alert'
          }
        }
      }));

      modal.$on('confirm', function (event) {
        modal.close();
      });
      modal.$on('close', function (event) {
        resolve(modal);
      });
    });
  };

  Vue.prototype.$confirm = function (title, Component, options) {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
      var modal = _this2.$modal(Component || title, deepExtend(options, {
        modal: {
          propsData: {
            title: Component ? title : null,
            type: 'confirm'
          }
        }
      }));

      modal.$on('cancel', function (event) {
        reject(modal);
      });
      modal.$on('confirm', function (event) {
        resolve(modal.close());
      });
    });
  };

  Vue.prototype.$prompt = function (title, Component, options, predicate) {
    var _this3 = this;

    return new Promise(function (resolve, reject) {
      if (isFunction$1(options)) {
        predicate = options;
        options = {};
      } else if (isObject(options) && isFunction$1(options.predicate)) {
        predicate = options.predicate;
      } else if (!isFunction$1(predicate)) {
        predicate = function predicate() {
          return true;
        };
      }

      var modal = _this3.$modal(Component, deepExtend(options, {
        modal: {
          propsData: {
            title: title,
            type: 'prompt'
          }
        }
      }));

      modal.$on('cancel', function (event) {
        reject(modal);
      });
      modal.$on('confirm', function (event) {
        var succeed = function succeed() {
          return resolve(modal.close());
        };

        var fail = function fail() {
          return reject(modal.close());
        };

        if (predicate(modal, succeed, fail) === true) {
          success();
        }
      });
    });
  };
}

var OverlayBody = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"overlay-body"},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'overlay-body'

};

var Container = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container"},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'container'

};

var plugin$5 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Container: Container
    });
  }
});

var OverlayContent = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('container',{staticClass:"overlay-content"},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'overlay-content',

    components: {
        Container
    }

};

var Overlay = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"overlay",class:_vm.triggerableClasses,style:({'background': _vm.background, 'display': _vm.isDisplaying ? 'flex' : 'none'}),attrs:{"role":"dialog","tabindex":"-1"},on:{"keydown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"esc",27,$event.key,"Escape")){ return null; }return _vm.onEsc($event)}}},[(_vm.closeable && !_vm.hideCloseButton)?_c('button',{staticClass:"btn btn-link overlay-close",attrs:{"type":"button"},on:{"click":_vm.onClickClose}},[_c('i',{staticClass:"fa fa-times-circle"})]):_vm._e(),_vm._v(" "),_c('overlay-content',{class:{'overlay-content-fixed': _vm.fixedContent, 'overlay-content-center': _vm.center},style:({minHeight: _vm.minHeight})},[_vm._t("body",[_c('overlay-body',{staticClass:"my-4"},[_vm._t("default")],2)])],2)],1)},staticRenderFns: [],

    name: 'overlay',

    components: {
        OverlayBody,
        OverlayContent
    },

    mixins: [
        Triggerable
    ],

    props: {

        /**
         * The overlay background color.
         *
         * @property String
         */
        background: {
            type: String,
            default: 'rgba(255, 255, 255, .925)'
        },

        /**
         * Is the overlay content fixed position
         *
         * @property Boolean
         */
        closeable: {
            type: Boolean,
            default: true
        },

        /**
         * Center the overlay content on the screen using flex box.
         *
         * @type {Boolean}
         */
        center: {
            type: Boolean,
            default: true
        },

        /**
         * Is the overlay content fixed position
         *
         * @property Boolean
         */
        fixedContent: Boolean,

        /**
         * Is the overlay close button hidden but still closeable.
         *
         * @property Boolean
         */
        hideCloseButton: Boolean,

        /**
         * Is the overlay content minimum height.
         *
         * @property Boolean
         */
        minHeight: [String, Number]

    },

    methods: {

        /**
         * The callback for the `click` event on the close button.
         *
         * @return void
         */
        onClickClose(event) {
            this.$emit('click:close', event);
            this.close();
        },

        onEsc(event) {
            this.closeable && this.close();
        }

    }

};

var plugin$6 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Overlay: Overlay
    });
  }
});

function overlay (Vue, options) {
  Vue.prototype.$overlay = function (target, Component, options) {
    if (!isObject(options)) {
      options = {};
    }

    if (!target.$overlay) {
      target.$overlay = instantiate(Vue, Overlay, deepExtend(options.overlay, {
        propsData: {
          target: target
        }
      }));
      target.$overlay.$mount(document.body.appendChild(document.createElement('div')));
      target.$overlay.$content = instantiate(Vue, Component, options.content);
      target.$overlay.$slots.default = [target.$overlay.$content.$mount()._vnode];
      target.$overlay.$nextTick(function () {
        target.$overlay.open();
      });
    }

    return target.$overlay;
  };
}

var Popover = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isDisplaying),expression:"isDisplaying"}],staticClass:"popover",class:_vm.mergeClasses(_vm.triggerableClasses, _vm.classes),attrs:{"role":"tooltip"}},[_c('div',{staticClass:"arrow"}),_vm._v(" "),(_vm.title)?_c('popover-header',{domProps:{"innerHTML":_vm._s(_vm.title)}}):_vm._e(),_vm._v(" "),_c('popover-body',[_vm._t("default")],2)],1)},staticRenderFns: [],

    name: 'popover',

    mixins: [
        Triggerable,
        MergeClasses
    ],

    props: {

        /**
         * Apply a CSS fade transition to the popover
         *
         * @type {Boolean}
         */
        animation: {
            type: Boolean,
            default: true
        },

        /**
         * Overflow constraint boundary of the popover. Accepts the values of
         * 'viewport', 'window', 'scrollParent', or an HTMLElement reference
         * (JavaScript only). For more information refer to Popper.js's
         * preventOverflow docs.
         *
         * @type {Object}
         */
        boundary: {
            type: [String, Array],
            default: 'scrollParent',
            validate(value) {
                return ['viewport', 'window', 'viewport'].indexOf(value) !== -1;
            }
        },

        /**
         * Appends the popover to a specific element.
         *
         * Example: container: 'body'.
         *
         * This option is particularly useful in that it allows you to position
         * the popover in the flow of the document near the triggering element -
         * which will prevent the popover from floating away from thetriggering
         * element during a window resize.
         *
         * @type {String|Element|Boolean}
         */
        container: {
            type: [String, Element, Boolean],
            default: false
        },

        /**
         * Delay closeing and hiding the popover (ms) - does not apply to manual trigger type
         *
         * If a number is supplied, delay is applied to both open/close
         *
         * Object structure is: delay: { "close": 500, "open": 100 }
         *
         * @type {Number|Object}
         */
        delay: {
            type: [Number, Object],
            default: 0
        },

        /**
         * Allow to specify which position Popper will use on fallback. For more
         * information refer to Popper.js's behavior docs
         *
         * @type {String|Array}
         */
        fallbackPlacement: {
            type: [String, Array],
            default: 'flip'
        },

        /**
         * Offset of the popover relative to its target. For more information
         * refer to Popper.js's offset docs.
         *
         * @type {Number|String}
         */
        offset: {
            type: [Number, String],
            default: 0
        },

        /**
         * How to position the popover - auto | top | bottom | left | right.
         *
         * When auto is specified, it will dynamically reorient the popover.
         *
         * When a function is used to determine the placement, it is called with
         * the popover DOM node as its first argument and the triggering element
         * DOM node as its second. The this context is set to the popover
         * instance.
         *
         * @type {String|Function}
         */
        placement: {
            type: [String, Function],
            default: 'top',
            validate(value) {
                return ['auto', 'top', 'bottom', 'left', 'right'].indexOf(value) !== -1;
            }
        },

        /**
         * If this property is passed, it will force the popover to be visible
         * by default.
         *
         * @type {Boolean}
         */
        show: Boolean,

        /**
         * If a selector is provided, popover objects will be delegated to the
         * specified targets. In practice, this is used to enable dynamic HTML
         * content to have popovers added. See this and an informative example.
         *
         * @type {Boolean|String}
         */
        selector: {
            type: [Boolean, String],
            default: false
        },

        /**
         * The target element used to position the popover.
         *
         * @type {String|Element|Boolean}
         */
        target: {
            type: [String, Element, Boolean],
            default: false
        },

        /**
         * The popover title
         *
         * @type {String}
         */
        title: String,

        /**
         * How popover is triggered - click | hover | focus | manual. You may
         * pass multiple triggers; separate them with a space. `manual` cannot
         * be combined with any other trigger.
         *
         * @type {String}
         */
        trigger: {
            type: [String, Array],
            default: 'click'
        }

    },

    methods: {

        align() {
            each(this.$poppers, el => {
                el.popper.update();
            });
        },

        createPopper(el) {
            return new Popper(el, this.$el, {
                offset: this.offset,
                placement: this.placement,
                modifiers: {
                    flip: {
                        boundariesElement: this.container,
                        behavior: this.fallbackPlacement
                    },
                    offset: {
                        enabled: !!this.offset,
                        offset: this.offset
                    },
                    arrow: {
                        enable: true,
                        element: this.$el.querySelector('.arrow')
                    }
                }
            });
        },

        getArrowElement() {
            return this.$el.querySelector('.arrow');
        },

        /**
         * Initialize the trigger event for the specified elements
         *
         * @param  {Element} el
         * @return {void}
         */
        initializeTrigger(el) {
            this.$poppers[el] = {
                trigger: isString(this.trigger) ? this.trigger.split(' ') : this.trigger,
                popper: this.createPopper(el),
                event: (event) => {
                    this.toggle();
                    this.$poppers[el].popper.update();
                }
            };

            each(this.$poppers[el].trigger, trigger => {
                el.addEventListener(trigger, this.$poppers[el].event);
            });
        }

    },

    watch: {

        isShowing(value) {
            this.$nextTick(() => {
                this.align();

                if(value) {
                    this.focus();
                }
            });
        }

    },

    computed: {

        classes() {
            return prefix({
                'top': this.placement === 'top',
                'bottom': this.placement === 'bottom',
                'left': this.placement === 'left',
                'right': this.placement === 'right'
            }, 'bs-popover');
        }

    },

    beforeCreate() {
        if(!this.$poppers) {
            this.$poppers = {};
        }
    }

};

var PopoverBody = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"popover-body"},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'popover-body'

};

var PopoverHeader = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,{tag:"component",staticClass:"popover-header"},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'popover-header',

    props: {

        /**
         * The component HTML element
         *
         * @type {String}
         */
        tag: {
            type: String,
            default: 'h3'
        }

    }

};

var plugin$7 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Popover: Popover,
      PopoverBody: PopoverBody,
      PopoverHeader: PopoverHeader
    });
  }
});

function popover (Vue, options) {
  Vue.prototype.$popover = function (target, Component, options) {
    if (!isObject(options)) {
      options = {};
    }

    if (!target.$popover) {
      target.$popover = instantiate(Vue, Popover, deepExtend(options.popover, {
        propsData: {
          target: target
        }
      }));
      target.$popover.$mount(document.body.appendChild(document.createElement('div')));
      var content = instantiate(Vue, Component, options.content);
      target.$popover.$slots.default = [content.$mount()._vnode];
      target.$popover.$nextTick(function () {
        target.$popover.open();
      });
    }

    return target.$popover;
  };
}



var plugins$1 = /*#__PURE__*/Object.freeze({
    modal: modal$1,
    overlay: overlay,
    popover: popover
});

var AlertClose = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"alert","aria-label":"Close"},on:{"click":_vm.onClick}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])},staticRenderFns: [],

    name: 'alert-close',

    methods: {

        onClick(event) {
            this.$emit('click', event);
        }
        
    }

};

var AlertHeading = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h4',{staticClass:"alert-heading"},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'alert-heading'

};

var ProgressBar = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"progress",style:({'height': _vm.formattedHeight})},[_c('div',{staticClass:"progress-bar",class:_vm.mergeClasses(_vm.progressClasses, _vm.variantClass),style:(_vm.styles),attrs:{"role":"progressbar","aria-valuenow":_vm.offsetValue,"aria-valuemin":_vm.min,"aria-valuemax":_vm.max}},[(!!_vm.label)?_c('span',[(_vm.label !== true)?[_vm._v(_vm._s(_vm.label))]:_vm._e(),_vm._v(" "+_vm._s(_vm.offsetValue)+"%")],2):_c('span',[_vm._t("default")],2)])])},staticRenderFns: [],

    name: 'progress-bar',

    mixins: [
        Variant,
        MergeClasses
    ],

    props: {

        /**
         * A custom color to be applied inline in the styles vs a contextual
         * variant.
         *
         * @property String
         */
        color: String,

        /**
         * The progress bar percentage value
         *
         * @property String
         */
        value: {
            type: Number,
            required: true
        },

        /**
         * The height of the progress bar
         *
         * @property String
         */
        height: [Number, String],

        /**
         * Show the progress bar value as a label inside the bar
         *
         * @property String
         */
        label: [String, Boolean],

        /**
         * Should the progress bar appear with stripes
         *
         * @property String
         */
        striped: Boolean,

        /**
         * Should the progress bar appear with animated stripes
         *
         * @property String
         */
        animated: Boolean,

        /**
         * The minimum value
         *
         * @property String
         */
        min: {
            type: Number,
            default: 0
        },

        /**
         * The max value
         *
         * @property String
         */
        max: {
            type: Number,
            default: 100
        }

    },

    computed: {

        variantClassPrefix() {
            return 'bg';
        },

        offsetValue() {
            return this.value / this.max * 100;
        },

        formattedHeight() {
            return this.height ? unit(this.height) : null;
        },

        progressClasses() {
            return {
                'progress-bar-striped': this.striped,
                'progress-bar-animated': this.animated
            };
        },

        styles() {
            return {
                width: `${this.offsetValue}%`,
                background: `${this.color} !important`
            };
        }

    }

};

var plugin$8 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      ProgressBar: ProgressBar
    });
  }
});

var Alert = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"alert",class:_vm.mergeClasses(_vm.variantClass, {show: _vm.isVisible, fade: _vm.fade}),attrs:{"role":"alert"}},[(_vm.title || _vm.heading)?_c('alert-heading',[_vm._v(_vm._s(_vm.title || _vm.heading))]):_vm._e(),_vm._v(" "),_vm._t("default"),_vm._v(" "),(_vm.dismissible)?_c('alert-close',{on:{"click":function($event){_vm.dismiss();}}}):_vm._e(),_vm._v(" "),(typeof _vm.show === 'number')?_c('progress-bar',{staticClass:"my-3",attrs:{"variant":_vm.variant,"height":5,"value":_vm.dismissCount,"max":_vm.show}}):_vm._e()],2)},staticRenderFns: [],

    name: 'alert',

    components: {
        AlertClose,
        AlertHeading,
        ProgressBar
    },

    mixins: [
        Variant,
        MergeClasses
    ],

    props: {

        /**
         * Is the alert dismissible
         *
         * @property Boolean
         */
        dismissible: Boolean,

        /**
         * The alert's title/heading
         *
         * @property Boolean
         */
        heading: String,

        /**
         * The alert's title/heading
         *
         * @property Boolean
         */
        title: String,

        /**
         * Should the alert fade when hidden
         *
         * @property Boolean
         */
        fade: {
            type: Boolean,
            default: true
        },

        /**
         * Should the alert be visible by default. If passed a number, alert
         * will be shown for the number of seconds that are passed.
         *
         * @property Boolean
         */
        show: {
            type: [Number, Boolean],
            default: true
        }

    },

    methods: {

        dismiss() {
            transition(this.$el).then(delay => {
                this.$emit('dismissed');
            });

            this.$emit('update:visible', this.isVisible = false);
        }

    },

    mounted() {
        if(typeof this.show === 'number') {
            const el = this.$el.querySelector('.progress-bar');

            this.$emit('dismiss-countdown', this.dismissCount = this.show);

            const interval = setInterval(() => {
                this.$emit('dismiss-countdown', this.dismissCount -= 1);

                if(!this.dismissCount) {
                    clearInterval(interval);
                    transition(el).then(delay => this.dismiss());
                }
            }, 1000);
        }
    },

    data() {
        return {
            dismissCount: this.show,
            isVisible: this.show
        }
    }

};

var AlertLink = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('a',{staticClass:"alert-link"},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'alert-link'

};

var plugin$9 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Alert: Alert,
      AlertLink: AlertLink,
      AlertClose: AlertClose,
      AlertHeading: AlertHeading
    });
  }
});

var Badge = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.href)?_c('a',{staticClass:"badge",class:_vm.mergeClasses(_vm.classes, _vm.variantClass),attrs:{"href":_vm.href}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))]),_vm._v(" "),_c('span',{staticClass:"sr-only",domProps:{"innerHTML":_vm._s(_vm.accessibility)}})],2):_c('span',{staticClass:"badge",class:_vm.mergeClasses(_vm.classes, _vm.variantClass)},[_vm._t("default",[_vm._v(_vm._s(_vm.label))]),_vm._v(" "),_c('span',{staticClass:"sr-only",domProps:{"innerHTML":_vm._s(_vm.accessibility)}})],2)},staticRenderFns: [],

    name: 'badge',

    mixins: [
        Variant,
        MergeClasses
    ],

    props: {

        /**
         * The screen reader accessibility label.
         *
         * @property String
         */
        accessibility: String,

        /**
         * If an href attribute is passed, the badge becomes an anchor.
         *
         * @property String
         */
        href: String,

        /**
         * The badge appear as pill shaped.
         *
         * @property String
         */
        pill: Boolean,

        /**
         * The badge label.
         *
         * @property String
         */
        label: [Number, String],

        /**
         * The badge appear as secondary in size to the parent element.
         *
         * @property String
         */
        secondary: Boolean

    },

    computed: {

        classes() {
            return prefix({
                'pill': this.pill,
                'secondary': this.secondary
            }, this.$options.name);
        }
    }
};

var plugin$a = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Badge: Badge
    });
  }
});

var BaseClass =
/*#__PURE__*/
function () {
  function BaseClass(attributes) {
    _classCallCheck(this, BaseClass);

    this.setAttribute(attributes);
  }

  _createClass(BaseClass, [{
    key: "getAttribute",
    value: function getAttribute(key) {
      return this.hasOwnProperty(key) ? this[key] : null;
    }
  }, {
    key: "getAttributes",
    value: function getAttributes() {
      var _this = this;

      var attributes = {};
      Object.getOwnPropertyNames(this).forEach(function (key) {
        attributes[key] = _this.getAttribute(key);
      });
      return attributes;
    }
  }, {
    key: "getPublicAttributes",
    value: function getPublicAttributes() {
      var _this2 = this;

      return Object.keys(this.getAttributes()).filter(function (key) {
        return !key.match(/^\$/);
      }).reduce(function (obj, key) {
        obj[key] = _this2.getAttribute(key);
        return obj;
      }, {});
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(key, value) {
      if (isObject(key)) {
        this.setAttributes(key);
      } else {
        this[key] = value;
      }
    }
  }, {
    key: "setAttributes",
    value: function setAttributes(values) {
      for (var i in values) {
        this.setAttribute(i, values[i]);
      }
    }
  }]);

  return BaseClass;
}();

var Response =
/*#__PURE__*/
function (_BaseClass) {
  _inherits(Response, _BaseClass);

  function Response(data) {
    _classCallCheck(this, Response);

    return _possibleConstructorReturn(this, _getPrototypeOf(Response).call(this, extend({
      date: new Date()
    }, data)));
  }

  _createClass(Response, [{
    key: "data",
    get: function get$$1() {
      return this.$data;
    },
    set: function set(value) {
      this.$data = value;
    }
  }, {
    key: "request",
    get: function get$$1() {
      return this.$request;
    },
    set: function set(value) {
      this.$request = value;
    }
  }, {
    key: "date",
    get: function get$$1() {
      return this.$date;
    },
    set: function set(value) {
      this.$date = value;
    }
  }]);

  return Response;
}(BaseClass);

var DEFAULTS = {
  transformRequest: [],
  transformResponse: []
};

var Request =
/*#__PURE__*/
function (_BaseClass) {
  _inherits(Request, _BaseClass);

  function Request(method, url, attributes) {
    var _this;

    _classCallCheck(this, Request);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Request).call(this, {
      options: {},
      data: {},
      headers: {},
      params: {},
      url: url,
      method: method
    }));

    if (isObject(attributes)) {
      _this.setAttribute(attributes);
    }

    return _this;
  }

  _createClass(Request, [{
    key: "send",
    value: function send(attributes) {
      var _this2 = this;

      this.sentAt = new Date();
      this.setAttributes(attributes);
      return new Promise(function (resolve, reject) {
        axios(_this2.options).then(function (data) {
          return resolve(_this2.response = new Response(data));
        }, function (errors) {
          return reject(_this2.errors = errors);
        });
      });
    }
  }, {
    key: "cancel",
    set: function set(value) {
      this.$cancel = value;
    },
    get: function get$$1() {
      return this.$cancel || function () {
        throw new Error('The request has not been sent yet.');
      };
    }
  }, {
    key: "options",
    get: function get$$1() {
      var _this3 = this;

      return extend({
        cancelToken: new axios.CancelToken(function (cancel) {
          return _this3.cancel = cancel;
        })
      }, DEFAULTS, this.getPublicAttributes());
    },
    set: function set(attributes) {
      this.setAttribute(attributes);
    }
  }, {
    key: "response",
    get: function get$$1() {
      return this.$response;
    },
    set: function set(value) {
      this.$response = value;
    }
  }, {
    key: "errors",
    get: function get$$1() {
      return this.$errors;
    },
    set: function set(value) {
      this.$errors = value;
    }
  }, {
    key: "passed",
    get: function get$$1() {
      return !!this.response && !this.errors;
    }
  }, {
    key: "failed",
    get: function get$$1() {
      return !!this.response && !!this.$error;
    }
  }], [{
    key: "transformRequest",
    value: function transformRequest(fn) {
      DEFAULTS.transformRequest.push(fn);
    }
  }, {
    key: "transformResponse",
    value: function transformResponse(fn) {
      DEFAULTS.transformResponse.push(fn);
    }
  }, {
    key: "get",
    value: function get$$1(url, attributes) {
      return this.make('get', url).send(attributes);
    }
  }, {
    key: "post",
    value: function post(url, attributes) {
      return this.make('post', url, attributes).send();
    }
  }, {
    key: "put",
    value: function put(url, attributes) {
      return this.make('put', url, attributes).send();
    }
  }, {
    key: "patch",
    value: function patch(url, data, attributes) {
      return this.make('path', url, attributes).send();
    }
  }, {
    key: "delete",
    value: function _delete(url, attributes) {
      return this.make('delete', url, attributes).send();
    }
  }, {
    key: "make",
    value: function make(method, url, attributes) {
      return new this(method, url, attributes);
    }
  }, {
    key: "transform",
    get: function get$$1() {
      return {
        request: this.transformRequest,
        response: this.transformResponse
      };
    }
  }, {
    key: "defaults",
    get: function get$$1() {
      return DEFAULTS;
    },
    set: function set(value) {
      extend(DEFAULTS, value);
    }
  }]);

  return Request;
}(BaseClass);

var Model =
/*#__PURE__*/
function () {
  /**
   * Construct the model instance
   *
   * @param data object
   * @return void
   */
  function Model() {
    var _this = this;

    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Model);

    this.$request = null;
    this.$key = this.key();
    this.$files = this.files();
    this.$properties = this.properties();
    each(params, function (value, key) {
      _this[key] = value;
    });
    this.initialize(data);
  }
  /**
   * Initialize the model with the given data without considering the data
   * as "changed".
   *
   * @param data object
   * @return this
   */


  _createClass(Model, [{
    key: "initialize",
    value: function initialize(data) {
      this.$exists = false;
      this.$changed = {};
      this.$attributes = {};
      this.fill(data);
      this.$initialized = true;
      return this;
    }
    /**
     * Define the corresponding API endpoint slug
     *
     * @return string
     */

  }, {
    key: "endpoint",
    value: function endpoint() {} //

    /**
     * Define the corresponding uri schema.
     *
     * @return string
     */

  }, {
    key: "uri",
    value: function uri() {
      return [this.endpoint() || '', this.exists() ? this.id() : null].filter(function (value) {
        return !!value;
      }).concat([].slice.call(arguments)).join('/');
    }
    /**
     * Return the primary key value for the model
     *
     * @return {Number}
     */

  }, {
    key: "id",
    value: function id() {
      return this.get(this.key());
    }
    /**
     * Define a primary key. This is used to determine if the model exists and
     * which endpoint to use.
     *
     * @return string
     */

  }, {
    key: "key",
    value: function key() {
      return 'id';
    }
    /**
     * Return an array of properties that are sent to the API. If no properties
     * are defined, then all the attributes will be included in the request.
     *
     * @return array
     */

  }, {
    key: "properties",
    value: function properties() {
      return [];
    }
    /**
     * Return an array of file properties that are sent to the API. If no fies
     * are defined, then request will always be sent with JSON vs. multipart.
     *
     * @return array
     */

  }, {
    key: "files",
    value: function files() {
      return [];
    }
    /**
     * Set the attributes in the model with the data given.
     *
     * @param data object
     * @return this
     */

  }, {
    key: "fill",
    value: function fill(data) {
      this.setAttributes(data);
      return this;
    }
    /**
     * Get one or more attributes from the model.
     *
     * @param data string|array
     * @return array|mixed
     */

  }, {
    key: "get",
    value: function get$$1(key) {
      if (isArray(key) || isObject(key)) {
        return this.getAttributes().filter(function (value) {
          return data.indexOf(value) !== -1;
        });
      } else {
        return this.getAttribute(key);
      }
    }
    /**
     * Alias for setAttributes() except this method returns `this`. This method
     * also accepts an array of values or key/value pair.
     *
     * @return this
     */

  }, {
    key: "set",
    value: function set(key) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      if (isArray(key) || isObject(key)) {
        this.setAttributes(key);
      } else {
        this.setAttribute(key, value);
      }

      return this;
    }
    /**
     * Get all the defined attributes.
     *
     * @return array
     */

  }, {
    key: "getAttributes",
    value: function getAttributes() {
      return this.$attributes;
    }
    /**
     * Get the changed attributes
     *
     * @return array
     */

  }, {
    key: "getChangedAttributes",
    value: function getChangedAttributes() {
      return Object.keys(this.$changed);
    }
    /**
     * Get the changed attributes
     *
     * @return array
     */

  }, {
    key: "getOriginalValue",
    value: function getOriginalValue(key) {
      return this.$changed[key] || this.$attributes[key];
    }
    /**
     * Get the Request object.
     *
     * @return {mixed}
     */

  }, {
    key: "getRequest",
    value: function getRequest() {
      return this.$request;
    }
    /**
     * Get the unchanged attributes
     *
     * @return array
     */

  }, {
    key: "getUnchangedAttributes",
    value: function getUnchangedAttributes() {
      var _this2 = this;

      return Object.keys(this.$attributes).filter(function (key) {
        return !(key in _this2.$changed);
      });
    }
    /**
     * Get an attribute with a given key. If no key is defined
     *
     * @param key string
     * @param default undefined|mixed
     * @return array
     */

  }, {
    key: "getAttribute",
    value: function getAttribute(key) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      return this.$attributes[key] || value;
    }
    /**
     * Set an array or object of data as attributes.
     *
     * @param attributes array|object
     * @return void
     */

  }, {
    key: "setAttributes",
    value: function setAttributes(data) {
      var _this3 = this;

      if (isArray(data) || isObject(data)) {
        each(data, function (value, key) {
          _this3.setAttribute(key, value);
        });
      }
    }
    /**
     * Set an attribute with a given key/value pair. This will track the changes
     * in the model within the `this.$changed` property. If the primary key
     * is set, it will also change the `this.$exists` property.
     *
     * @param key string
     * @param value mixed
     * @return void
     */

  }, {
    key: "setAttribute",
    value: function setAttribute(key, value) {
      if (this.getAttribute(key) !== value) {
        this.handleAttributeChange(key, value);

        if (isUndefined(value)) {
          delete this.$attributes[key];
        } else {
          this.$attributes[key] = value;
        }
      }
    }
    /**
     * Revert the model to its original state.
     *
     * @return bool
     */

  }, {
    key: "revert",
    value: function revert() {
      var _this4 = this;

      each(this.$changed, function (value, key) {
        if (!isUndefined(value)) {
          _this4.$attributes[key] = value;
        } else {
          delete _this4.$attributes[key];
        }
      });
      this.$changed = {};
    }
    /**
     * Returns if the model has a primary key set.
     *
     * @return bool
     */

  }, {
    key: "exists",
    value: function exists() {
      return !!this.$exists;
    }
    /**
     * Returns the model been changed or not.
     *
     * @return bool
     */

  }, {
    key: "hasChanged",
    value: function hasChanged(key) {
      return !key ? this.getChangedAttributes().length > 0 : !isUndefined(this.$changed[key]);
    }
    /**
     * Does the model have any File objects. If so, need to send as multipart.
     *
     * @return bool
     */

  }, {
    key: "hasFiles",
    value: function hasFiles() {
      function count(files) {
        var total = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return files.reduce(function (carry, value) {
          if (isArray(value)) {
            return carry + count(value, total);
          } else if (value instanceof File || value instanceof FileList) {
            return carry + 1;
          } else {
            return carry;
          }
        }, total);
      }

      return count(this.toJSON()) !== 0;
    }
    /**
     * Handle settings the $changed attributes when an attribute value is set.
     *
     * @param key string
     * @param value mixed
     * @return void
     */

  }, {
    key: "handleAttributeChange",
    value: function handleAttributeChange(key, value) {
      if (this.$initialized) {
        if (this.$changed[key] === value) {
          delete this.$changed[key];
        } else if (!(key in this.$changed)) {
          this.$changed[key] = this.getAttribute(key);
        }
      }

      this.handlePrimaryKeyChange(key, value);
    }
    /**
     * Set an array or object of data as attributes.
     *
     * @param key string
     * @param value mixed
     * @return void
     */

  }, {
    key: "handlePrimaryKeyChange",
    value: function handlePrimaryKeyChange(key, value) {
      if (this.$key === key) {
        this.$exists = !isUndefined(value) && !isNull(value);
      }
    }
    /**
     * Cancel the current request
     *
     * @param data object
     * @return bool
     */

  }, {
    key: "cancel",
    value: function cancel() {
      this.$request && this.$request.cancel();
    }
    /**
     * Save the model to the database
     *
     * @param data object
     * @return bool
     */

  }, {
    key: "save",
    value: function save() {
      var _this5 = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.fill(data);
      return new Promise(function (resolve, reject) {
        var data = !_this5.hasFiles() ? _this5.toJSON() : _this5.toFormData();
        var method = !_this5.exists() || _this5.hasFiles() ? 'post' : 'put';
        _this5.$request = _this5.constructor.request(method, config.uri || _this5.uri(), config);

        _this5.$request.send({
          data: data
        }).then(function (response) {
          return resolve(_this5.fill(response));
        }, reject);
      });
    }
    /**
     * Delete an existing model
     *
     * @param  {object} config
     * @return {bool}
     */

  }, {
    key: "delete",
    value: function _delete() {
      var _this6 = this;

      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new Promise(function (resolve, reject) {
        if (!_this6.exists()) {
          reject(new Error('The model must have a primary key before it can be delete.'));
        }

        _this6.$request = _this6.constructor.request('delete', config.uri || _this6.uri(), config);

        _this6.$request.send().then(function (response) {
          resolve(response);
        }, reject);
      });
    }
    /**
     * Cancel the current HTTP request if one exists.
     *
     * @return {self}
     */

  }, {
    key: "cancel",
    value: function cancel() {
      if (this.$request) {
        this.$request.cancel();
      }

      return this;
    }
    /**
     * Convert the Model instance to a FormData instance
     *
     * @return Object
     */

  }, {
    key: "toFormData",
    value: function toFormData() {
      var form = new FormData();
      each(this.toJSON(), function (value, key) {
        if (isArray(value)) {
          each(value, function (item) {
            if (!(item instanceof File) && (isObject(item) || isArray(item))) {
              item = JSON.stringify(item);
            }

            form.append(key.replace(/(.+)(\[.+\]?)$/, '$1') + '[]', item);
          });
        } else if (!(value instanceof File) && isObject(value)) {
          form.append(key, JSON.stringify(value));
        } else if (!isNull(value)) {
          form.append(key, value);
        }
      });
      return form;
    }
    /**
     * Convert the instance to JSON payload
     *
     * @return Object
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      var _this7 = this;

      return pickBy(this.$attributes, function (value, key) {
        return !_this7.$properties.length || key === _this7.key() || _this7.$properties.indexOf(key) !== -1;
      });
    }
    /**
     * Convert the model to a string
     *
     * @return String
     */

  }, {
    key: "toString",
    value: function toString() {
      return JSON.stringify(this.toJSON());
    }
    /**
     * Alias for toJSON
     *
     * @return Object
     */

  }, {
    key: "toJson",
    value: function toJson() {
      return this.toJSON();
    }
    /**
     * Search for a collection of models
     *
     * @param data object
     * @return bool
     */

  }], [{
    key: "search",
    value: function search() {
      var _this8 = this;
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var model = new this();
      return new Promise(function (resolve, reject) {
        model.$request = _this8.request('get', config.uri || model.uri(), config);
        model.$request.send().then(function (response) {
          resolve(response);
        }, function (errors) {
          reject(errors);
        });
      });
    }
    /**
     * Find an existing model by id
     *
     * @param data object
     * @return bool
     */

  }, {
    key: "find",
    value: function find$$1(id) {
      var _this9 = this;

      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new Promise(function (resolve, reject) {
        var model = new _this9();
        model.$request = _this9.request('get', config.uri || model.uri(id), config);
        model.$request.send().then(function (response) {
          resolve(model.initialize(response));
        }, function (error) {
          reject(error);
        });
      });
    }
    /**
     * Create a request from the model data
     *
     * @param data object
     * @return bool
     */

  }, {
    key: "request",
    value: function request(method, url) {
      var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return Request.make(method, url, config);
    }
  }]);

  return Model;
}();

var BaseForm = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form',{class:{'form-inline': _vm.inline},attrs:{"novalidate":_vm.novalidate},on:{"submit":function($event){$event.preventDefault();return _vm.onSubmit($event)}}},[_vm._t("default")],2)},staticRenderFns: [],

    props: {

        /**
         * The Model method used to send the request.
         *
         * @property Boolean
         */
        method: {
            type: String,
            default: 'save',
            validate(value) {
                return this.model && isFunction$1(this.model[value]);
            }
        },

        /**
         * An object of form data
         *
         * @property Object
         */
        data: {
            type: Object,
            default: () => {
                return {};
            }
        },

        /**
         * A JSON object of request headers
         *
         * @property Object
         */
        headers: Object,

        /**
         * Display the form fields inline
         *
         * @property Object
         */
        model: {
            type: Object,
            validate(value) {
                return value instanceof Model;
            }
        },

        /**
         * Display the form fields inline
         *
         * @property Boolean
         */
        inline: Boolean,

        /**
         * A callback function for the `submit` event
         *
         * @property Boolean
         */
        novalidate: {
            type: Boolean,
            default: true
        },

        /**
         * A JSON object of key/value pairs to build the query string.
         *
         * @property Object
         */
        query: Object,

        /**
         * A URI or URL used to redirect user after form submits successfully.
         *
         * @property Function|String
         */
        redirect: [Object, String, Function],

        /**
         * A callback function for the `submit` event
         *
         * @property Function
         */
        onSubmit: {
            type: Function,
            default(event) {
                this.model && this.submit(event);
            }
        },

        /**
         * A callback function for the `submit:success` event
         *
         * @property Function
         */
        onSubmitSuccess: {
            type: Function,
            default(event, data) {
                this.$emit('submit:success', event, data);
                this.$emit('submit:complete', event, true, data);

                if(this.redirect && isFunction$1(this.redirect)) {
                    this.redirect(this);
                }
                else if(this.redirect && this.$router) {
                    this.$router.push(this.redirect);
                }
            }
        },

        /**
         * A callback function for the `submit:success` event
         *
         * @property Function
         */
        onSubmitFailed: {
            type: Function,
            default(event, errors) {
                this.$emit('submit:failed', event, errors);
                this.$emit('submit:complete', event, false, errors);
            }
        }

    },

    methods: {

        submit(event) {
            this.$emit('submit', event);

            return this.model[this.method](this.data, {
                query: this.query,
                headers: this.headers,
                onUploadProgress: event => {
                    this.$emit('submit:progress', event);
                }
            }).then((data) => {
                this.onSubmitSuccess(event, data);
            }, (errors) => {
                this.onSubmitFailed(event, errors);
            });
        }

    },

    data() {
        return {
            errors: {}
        }
    }

};

var plugin$b = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      BaseForm: BaseForm
    });
  }
});

var BreadcrumbItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"breadcrumb-item",class:{'active': _vm.active},attrs:{"aria-current":_vm.active ? 'page' : false}},[(!_vm.active && _vm.href)?_c('a',{attrs:{"href":_vm.href}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2):(!_vm.active && _vm.to)?_c('router-link',{attrs:{"to":_vm.to}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2):[_vm._t("default",[_vm._v(_vm._s(_vm.label))])]],2)},staticRenderFns: [],

    name: 'breadcrumb-item',

    props: {

        /**
         * Is the item active?
         *
         * @prop {Boolean}
         */
        active: Boolean,

        /**
         * An href attribute
         *
         * @prop {String}
         */
        href: String,

        /**
         * An breadcrumb label
         *
         * @prop {String}
         */
        label: String,

        /**
         * The to attribute which is passed to the <router-link> component.
         *
         * @prop {Object}
         */
        to: [String, Object]

    }

};

var Breadcrumb = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{attrs:{"aria-label":"breadcrumb"}},[_c('ol',{staticClass:"breadcrumb"},[_vm._l((_vm.items),function(item,i){return (_vm.items.length)?_c('breadcrumb-item',_vm._b({key:i,attrs:{"current":i === item.length - 1}},'breadcrumb-item',item,false)):_vm._e()}),_vm._v(" "),_vm._t("default")],2)])},staticRenderFns: [],

    name: 'breadcrumb',

    components: {
        BreadcrumbItem
    },

    props: {

        /**
         * An array of breadcrumbs
         *
         * @prop {Array}
         */
        items: Array

    }

};

var plugin$c = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Breadcrumb: Breadcrumb,
      BreadcrumbItem: BreadcrumbItem
    });
  }
});

var Screenreaders = {
  props: {
    /**
     * Should show only for screenreaders
     *
     * @property Boolean
     */
    srOnly: Boolean,

    /**
     * Should be focusable for screenreaders
     *
     * @property Boolean
     */
    srOnlyFocusable: Boolean
  },
  computed: {
    screenreaderClasses: function screenreaderClasses() {
      return {
        'sr-only': this.srOnly,
        'sr-only-focusable': this.srOnlyFocusable
      };
    }
  }
};

var HelpText = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('small',{staticClass:"form-text",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'help-text',

    mixins: [
        Colorable,
        Screenreaders
    ],

    computed: {
        classes() {
            return extend({}, this.screenreaderClasses, this.colorableClasses);
        }
    }

};

var plugin$d = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      HelpText: HelpText
    });
  }
});

var FormGroup = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group"},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'form-group'
    
};

var plugin$e = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      FormGroup: FormGroup
    });
  }
});

var FormLabel = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'form-label',

    mixins: [
        Colorable,
        Screenreaders
    ],

    computed: {
        classes() {
            return extend({}, this.screenreaderClasses, this.colorableClasses);
        }
    }

};

var plugin$f = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      FormLabel: FormLabel
    });
  }
});

var FormFeedback = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{'invalid-feedback': _vm.invalid, 'valid-feedback': _vm.valid && !_vm.invalid}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2)},staticRenderFns: [],

    name: 'form-feedback',

    mixins: [
        Colorable
    ],

    props: {

        /**
         * The value of label element. If no value, no label will appear.
         *
         * @property String
         */
        label: String,

        /**
         * Should the feedback marked as invalid
         *
         * @property String
         */
        invalid: Boolean,

        /**
         * Should the feedback marked as invalid
         *
         * @property String
         */
        valid: Boolean

    }

};

var plugin$g = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      FormFeedback: FormFeedback
    });
  }
});

var FormControl = {
  props: {
    /**
     * The autocomplete attribute value.
     *
     * @property String
     */
    autocomplete: String,

    /**
     * The field id attribute value.
     *
     * @property String
     */
    id: [Number, String],

    /**
     * The value of label element. If no value, no label will appear.
     *
     * @property String
     */
    label: [Number, String],

    /**
     * The field name attribute value.
     *
     * @property String
     */
    name: String,

    /**
     * The field id attribute value.
     *
     * @property String
     */
    value: {
      default: null
    },

    /**
     * The placeholder attribute value.
     *
     * @property String
     */
    placeholder: String,

    /**
     * Is the field required.
     *
     * @property String
     */
    required: Boolean,

    /**
     * Add form-group wrapper to input
     *
     * @property String
     */
    group: {
      type: Boolean,
      value: true
    },

    /**
     * The regex pattern for validation.
     *
     * @property String
     */
    pattern: String,

    /**
     * An inline field validation error.
     *
     * @property String|Boolean
     */
    error: String,

    /**
     * An inline field validation errors passed as object with key/value
     * pairs. If errors passed as an object, the form name will be used for
     * the key.
     *
     * @property Object|Boolean
     */
    errors: {
      type: Object,
      default: function _default() {
        return {};
      }
    },

    /**
     * Some feedback to add to the field once the field is successfully
     * valid.
     *
     * @property String
     */
    feedback: [String, Array],

    /**
     * An array of event names that correlate with callback functions
     *
     * @property Function
     */
    bindEvents: {
      type: Array,
      default: function _default() {
        return ['focus', 'blur', 'change', 'click', 'keyup', 'keydown', 'progress', 'paste'];
      }
    },

    /**
     * The default class name assigned to the control element
     *
     * @property String
     */
    defaultControlClass: {
      type: String,
      default: 'form-control'
    },

    /**
     * Hide the label for browsers, but leave it for screen readers.
     *
     * @property String
     */
    hideLabel: Boolean,

    /**
     * Additional margin/padding classes for fine control of spacing
     *
     * @property String
     */
    spacing: String,

    /**
     * The size of the form control
     *
     * @property String
     */
    size: {
      type: String,
      default: 'md',
      validate: function validate(value) {
        return ['sm', 'md', 'lg'].indexOf(value) !== -1;
      }
    },

    /**
     * Display the form field inline
     *
     * @property String
     */
    inline: Boolean,

    /**
     * If the form control is readonly, display only as text?
     *
     * @property String
     */
    plaintext: Boolean,

    /**
     * Is the form control readonly?
     *
     * @property String
     */
    readonly: Boolean,

    /**
     * Is the form control disabled?
     *
     * @property String
     */
    disabled: Boolean,

    /**
     * Some instructions to appear under the field label
     *
     * @property String
     */
    helpText: [Number, String],

    /**
     * The maxlength attribute
     *
     * @property String
     */
    maxlength: [Number, String]
  },
  directives: {
    bindEvents: {
      bind: function bind(el, binding, vnode) {
        var events = binding.value || vnode.context.bindEvents;
        each(events, function (name) {
          el.addEventListener(name, function (event) {
            vnode.context.$emit(name, event);
          });
        });
      }
    }
  },
  methods: {
    blur: function blur() {
      if (this.getInputField()) {
        this.getInputField().blur();
      }
    },
    focus: function focus() {
      if (this.getInputField()) {
        this.getInputField().focus();
      }
    },
    getInputField: function getInputField() {
      return this.$el.querySelector('.form-control, input, select, textarea');
    },
    getFieldErrors: function getFieldErrors() {
      var errors = this.error || this.errors;

      if (isObject(this.errors)) {
        errors = this.errors[this.name || this.id];
      }

      return !errors || isArray(errors) || isObject(errors) ? errors : [errors];
    }
  },
  computed: {
    callbacks: function callbacks() {
      var _this = this;

      return this.bindEvents.map(function (event) {
        return {
          name: event,
          callback: _this[camelCase(['on', event].join(' '))]
        };
      }).filter(function (event) {
        return !isUndefined(event.callback);
      });
    },
    invalidFeedback: function invalidFeedback() {
      if (this.error) {
        return this.error;
      }

      var errors = this.getFieldErrors();
      return isArray(errors) ? errors.join('<br>') : errors;
    },
    validFeedback: function validFeedback() {
      return isArray(this.feedback) ? this.feedback.join('<br>') : this.feedback;
    },
    controlClass: function controlClass() {
      return this.defaultControlClass + (this.plaintext ? '-plaintext' : '');
    },
    controlSizeClass: function controlSizeClass() {
      return prefix(this.size, this.controlClass);
    },
    controlClasses: function controlClasses() {
      return [this.controlClass, this.controlSizeClass, this.spacing || '', this.invalidFeedback ? 'is-invalid' : ''].join(' ');
    },
    hasDefaultSlot: function hasDefaultSlot() {
      return !!this.$slots.default;
    }
  }
};

var InputField = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form-group',{staticClass:"input-field",class:{'has-activity': _vm.activity}},[_vm._t("label",[(_vm.label || _vm.hasDefaultSlot)?_c('form-label',{ref:"label",attrs:{"for":_vm.id},domProps:{"innerHTML":_vm._s(_vm.label)}}):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"position-relative"},[_vm._t("control",[_c('input',{directives:[{name:"bind-events",rawName:"v-bind-events",value:(_vm.bindEvents),expression:"bindEvents"}],ref:"control",class:_vm.mergeClasses(_vm.controlClasses, _vm.colorableClasses),attrs:{"id":_vm.id,"type":_vm.type,"name":_vm.name,"pattern":_vm.pattern,"readonly":_vm.readonly,"required":_vm.required,"maxlength":_vm.maxlength,"placeholder":_vm.placeholder,"disabled":_vm.disabled || _vm.readonly,"aria-label":_vm.label,"aria-describedby":_vm.id,"autocomplete":_vm.autocomplete},domProps:{"value":_vm.value},on:{"input":function($event){_vm.$emit('input', $event.target.value);}}})]),_vm._v(" "),_vm._t("activity",[_c('transition',{attrs:{"name":"slide-fade"}},[(_vm.activity)?_c('activity-indicator',{key:"test",ref:"activity",attrs:{"type":"dots","size":_vm.size}}):_vm._e()],1)]),_vm._v(" "),_vm._t("feedback",[(_vm.validFeedback)?_c('form-feedback',{ref:"feedback",attrs:{"valid":""},domProps:{"innerHTML":_vm._s(_vm.validFeedback)}}):(_vm.invalidFeedback)?_c('form-feedback',{ref:"feedback",attrs:{"invalid":""},domProps:{"innerHTML":_vm._s(_vm.invalidFeedback)}}):_vm._e()])],2),_vm._v(" "),_vm._t("help",[(_vm.helpText)?_c('help-text',{ref:"help",domProps:{"innerHTML":_vm._s(_vm.helpText)}}):_vm._e()])],2)},staticRenderFns: [],

    name: 'input-field',

    mixins: [
        Colorable,
        FormControl,
        MergeClasses
    ],

    components: {
        HelpText,
        FormGroup,
        FormLabel,
        FormFeedback,
        ActivityIndicator
    },

    props: {

        /**
         * Show type activity indicator.
         *
         * @property Boolean
         */
        activity: {
            type: Boolean,
            default: false
        },

        /**
         * The type attribute
         *
         * @property String
         */
        type: {
            type: String,
            default: 'text'
        }

    }

};

var plugin$h = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      InputField: InputField
    });
  }
});

var FileField = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form-group',[_vm._t("label",[(_vm.label || _vm.hasDefaultSlot)?_c('form-label',{attrs:{"for":_vm.id}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"custom-file"},[_vm._t("placeholder",[_c('form-label',{class:_vm.mergeClasses(_vm.colorableClasses, 'custom-file-label'),attrs:{"for":_vm.id},domProps:{"innerHTML":_vm._s(_vm.placeholder || 'Choose file')}})]),_vm._v(" "),_c('input',{directives:[{name:"bind-events",rawName:"v-bind-events"}],class:_vm.controlClasses,attrs:{"type":"file","id":_vm.id,"width":_vm.width,"height":_vm.height,"required":_vm.required,"multiple":_vm.multiple,"readonly":_vm.readonly},on:{"change":function($event){_vm.$emit('change', $event.target.files);}}}),_vm._v(" "),_vm._t("help",[(_vm.helpText)?_c('help-text',{domProps:{"innerHTML":_vm._s(_vm.helpText)}}):_vm._e()]),_vm._v(" "),_vm._t("feedback",[(_vm.validFeedback)?_c('form-feedback',{attrs:{"valid":""},domProps:{"innerHTML":_vm._s(_vm.validFeedback)}}):_vm._e(),_vm._v(" "),(_vm.invalidFeedback)?_c('form-feedback',{attrs:{"invalid":""},domProps:{"innerHTML":_vm._s(_vm.invalidFeedback)}}):_vm._e()])],2)],2)},staticRenderFns: [],

    name: 'file-field',

    extends: InputField,

    components: {
        HelpText,
        FormGroup,
        FormLabel,
        FormFeedback,
        MergeClasses
    },

    model: {
        event: 'change'
    },

    props: {

        /**
         * An array of event names that correlate with callback functions
         *
         * @property Function
         */
        bindEvents: {
            type: Array,
            default() {
                return ['focus', 'blur', 'input', 'click', 'keyup', 'keydown', 'progress'];
            }
        },

        /**
         * The class name assigned to the control element
         *
         * @property String
         */
        defaultControlClass: {
            type: String,
            default: 'custom-file-input'
        },

        /**
         * An array of valid extensions
         *
         * @property String
         */
        extensions: Array,

        /**
         * The type attribute
         *
         * @property String
         */
        multiple: Boolean,

        /**
         * The height attribute for the control element
         *
         * @property String
         */
        height: [Number, String],

        /**
         * The width attribute for the control element
         *
         * @property String
         */
        width: [Number, String]

    }

};

var plugin$i = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      FileField: FileField
    });
  }
});

var BtnFile = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('btn',{staticClass:"btn-file",attrs:{"type":_vm.type,"variant":_vm.variant,"block":_vm.block,"size":_vm.size,"disabled":_vm.disabled,"active":_vm.active}},[_vm._t("default"),_vm._v(" "),_c('input',{directives:[{name:"bind-events",rawName:"v-bind-events"}],class:_vm.controlClasses,attrs:{"type":"file","id":_vm.id,"width":_vm.width,"height":_vm.height,"required":_vm.required,"multiple":_vm.multiple,"readonly":_vm.readonly},on:{"change":function($event){_vm.$emit('change', _vm.multiple ? $event.target.files : $event.target.files[0]);}}})],2)},staticRenderFns: [],

    name: 'btn-file',

    mixins: [
        FileField
    ],

    components: {
        Btn,
        FileField
    },

    model: {
        event: 'change'
    },

    props: {

        /**
         * The type attribute for the button. Not applied if an anchor
         *
         * @property String
         */
        type: {
            type: String,
            default: 'button'
        }

    }

};

var plugin$j = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      BtnFile: BtnFile
    });
  }
});

var BtnGroup = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.classes,attrs:{"data-toggle":_vm.toggle ? 'buttons' : false,"role":"group"}},[_vm._l((_vm.buttons),function(button,i){return (_vm.buttons)?_c('btn',_vm._b({key:i},'btn',button,false)):_vm._e()}),_vm._v(" "),_vm._t("default")],2)},staticRenderFns: [],

    name: 'btn-group',

    components: {
        Btn
    },

    mixins: [
        Colorable,
        MergeClasses
    ],

    props: {

        /**
         * An array of buttons
         *
         * @type {Array}
         */
        buttons: Array,

        /**
         * Denote the button group as toggle buttons
         *
         * @type {Boolean}
         */
        toggle: Boolean,

        /**
         * Display the buttons vertically
         *
         * @type {Boolean}
         */
        vertical: Boolean

    },

    computed: {

        classes() {
            return this.mergeClasses(
                this.colorableClasses, {
                    'btn-group': !this.vertical,
                    'btn-group-toggle': this.toggle,
                    'btn-group-vertical': this.vertical
                }
            );
        }

    }

};

var BtnGroupToggle = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"btn-group-toggle",attrs:{"data-toggle":"buttons"}},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'btn-group-toggle'

};

var BtnToolbar = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"btn-toolbar",attrs:{"role":"toolbar"}},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'btn-toolbar'

};

var plugin$k = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      BtnGroup: BtnGroup,
      BtnGroupToggle: BtnGroupToggle,
      BtnToolbar: BtnToolbar
    });
  }
});

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

var Proxy$1 = {
  methods: {
    proxy: function proxy(callback, event) {
      if (isFunction$1(callback)) {
        callback.apply(this, [].slice.call(arguments).splice(1));
        event.preventDefault();
      }
    }
  }
};

var DropdownMenuItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.component,{tag:"component",staticClass:"dropdown-item",class:{'active': _vm.active},attrs:{"href":_vm.href || (_vm.component === 'a' ? '#' : false),"type":_vm.component === 'button' ? 'button' : false},on:{"click":_vm.onClick}},[(_vm.icon)?_c('i',{class:_vm.icon}):_vm._e(),_vm._v(" "),_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2)},staticRenderFns: [],

    mixins: [
        Proxy$1
    ],

    props: {

        /**
         * Is the menu item active.
         *
         * @property Object
         */
        active: Boolean,

        /**
         * Is the menu item a button
         *
         * @property Object
         */
        button: Boolean,

        /**
         * The `element` attribute.
         *
         * @property Object
         */
        element: String,

        /**
         * The `href` attribute.
         *
         * @property Object
         */
        href: String,

        /**
         * The icon of the dropdown menu item.
         *
         * @property Object
         */
        icon: String,

        /**
         * The label of the dropdown menu item.
         *
         * @property Object
         */
        label: String

    },

    computed: {

        component() {
            return this.element || (this.button ? 'button' : 'a');
        }

    },

    methods: {

        /**
         * A callback function for the `click` event.
         *
         * @property Object
         */
        onClick(event) {
            this.$emit('click', event);
        }

    }

};

var DropdownMenuHeader = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h5',{staticClass:"dropdown-header"},[_vm._t("default",[_vm._v(_vm._s(_vm.header))])],2)},staticRenderFns: [],

    name: 'dropdown-menu-header',

    props: {

        /**
         * The value of the header
         *
         * @property Object
         */
        header: String

    }

};

var DropdownMenuDivider = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"dropdown-divider"})},staticRenderFns: [],

    name: 'dropdown-menu-divider'

};

var DropdownMenu = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"dropdown-menu",class:{'dropdown-menu-right': _vm.align === 'right', 'show': _vm.show},attrs:{"aria-labelledby":_vm.id,"tabindex":"-1"},on:{"click":_vm.onClick}},[_vm._l((_vm.items),function(item){return [_c(_vm.prefix(item.type || 'item', 'dropdown-menu'),_vm._b({tag:"component"},'component',item,false))]}),_vm._v(" "),_vm._t("default")],2)},staticRenderFns: [],

    components: {
        DropdownMenuItem,
        DropdownMenuHeader,
        DropdownMenuDivider
    },

    props: {

        /**
         * The `id` attribute on the toggle button and aria label. If no `id` is
         * defined, then a UUID will be generated instead.
         *
         * @property Object
         */
        id: {
            type: String,
            default: uuid
        },

        /**
         * Display the dropdown menu aligned left or right
         *
         * @property String
         */
        align: {
            type: String,
            default: 'left',
            validate(value) {
                return ['left', 'right'].indexOf(value.toLowerCase()) !== -1;
            }
        },

        /**
         * The default visibility of the dropdown menu.
         *
         * @property Object
         */
        show: Boolean,

        /**
         * An array of dropdown items. If an key/value pair isn't defined, the
         * default value will be used. If no items are defined, then the slot
         * named "items" can be used to define the options with HTML.
         *
         * [{
         *      type: 'item', // String [item|header|divider]
         *      href: '#', // String
         *      label: 'Some label', // String
         *      onClick: (event) => {} // Function
         * }]
         *
         * @property Array
         */
        items: Array

    },

    methods: {

        prefix: prefix,

        /**
         * A callback function for the `click` event.
         *
         * @param Object event
         * @param Object item
         * @return void
         */
        onClick(event) {
            this.$emit('click', event);
        },

        /**
         * A callback function for the `click` event.
         *
         * @param Object event
         * @param Object item
         * @return void
         */
        onItemClick(event, item) {
            this.$emit('item:click', event, item);
        }

    },

    mounted() {
        each(this.$children, child => {
            child.$on('click', event => {
                this.onItemClick(event, child);
            });
        });
    }

};

var plugin$l = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      DropdownMenu: DropdownMenu,
      DropdownMenuDivider: DropdownMenuDivider,
      DropdownMenuHeader: DropdownMenuHeader,
      DropdownMenuItem: DropdownMenuItem
    });
  }
});

const TAB_KEYCODE = 9;
const LEFT_ARROW_KEYCODE = 37;
const RIGHT_ARROW_KEYCODE = 39;
const UP_ARROW_KEYCODE = 38;
const DOWN_ARROW_KEYCODE = 40;

let ignoreBlurEvent = false;

var BtnDropdown = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.split)?_c('btn-group',[(!_vm.dropleft)?[(_vm.href)?_c('a',{class:_vm.actionClasses,attrs:{"href":_vm.href},on:{"click":_vm.onClick}},[_vm._t("label",[(_vm.icon)?_c('i',{class:_vm.icon}):_vm._e(),_vm._v(" "+_vm._s(_vm.label))])],2):_c('button',{class:_vm.actionClasses,attrs:{"type":_vm.type},on:{"click":_vm.onClick}},[_vm._t("label-wrapper",[(_vm.icon)?_c('i',{class:_vm.icon}):_vm._e(),_vm._v(" "),_vm._t("label",[_vm._v(_vm._s(_vm.label))])])],2)]:_vm._e(),_vm._v(" "),_c('btn-group',{class:{'dropup': _vm.dropup, 'dropright': _vm.dropright, 'dropleft': _vm.dropleft}},[_c('button',{class:_vm.toggleClasses,attrs:{"type":"button","aria-haspopup":"true","aria-expanded":_vm.isDropdownShowing,"id":_vm.id},on:{"click":function($event){$event.preventDefault();!_vm.isDropdownShowing ? _vm.show() : _vm.hide();},"blur":_vm.onBlur}}),_vm._v(" "),_c('dropdown-menu',{attrs:{"id":_vm.id,"align":_vm.align,"show":_vm.isDropdownShowing},on:{"update:show":function($event){_vm.isDropdownShowing=$event;},"click":_vm.onMenuClick,"item:click":_vm.onItemClick}},[_vm._t("default")],2)],1),_vm._v(" "),(_vm.dropleft)?[(_vm.href)?_c('a',{class:_vm.actionClasses,attrs:{"href":_vm.href},on:{"click":_vm.onClick}},[_vm._t("label",[(_vm.icon)?_c('i',{class:_vm.icon}):_vm._e(),_vm._v(" "+_vm._s(_vm.label))])],2):_c('button',{class:_vm.actionClasses,attrs:{"type":_vm.type},on:{"click":_vm.onClick}},[_vm._t("label-wrapper",[(_vm.icon)?_c('i',{class:_vm.icon}):_vm._e(),_vm._v(" "),_vm._t("label",[_vm._v(_vm._s(_vm.label))])])],2)]:_vm._e()],2):_c('btn-group',{class:{'dropup': _vm.dropup, 'dropright': _vm.dropright, 'dropleft': _vm.dropleft},on:{"click":_vm.onClick}},[_c('button',{class:_vm.toggleClasses,attrs:{"aria-haspopup":"true","aria-expanded":_vm.isDropdownShowing,"type":_vm.type,"id":_vm.id},on:{"click":function($event){$event.preventDefault();!_vm.isDropdownShowing ? _vm.show() : _vm.hide();},"blur":_vm.onBlur}},[_vm._t("label",[(_vm.icon)?_c('i',{class:_vm.icon}):_vm._e(),_vm._v(" "+_vm._s(_vm.label))])],2),_vm._v(" "),_c('dropdown-menu',{attrs:{"id":_vm.id,"align":_vm.align,"show":_vm.isDropdownShowing},on:{"update:show":function($event){_vm.isDropdownShowing=$event;},"click":_vm.onMenuClick,"item:click":_vm.onItemClick}},[_vm._t("default")],2)],1)},staticRenderFns: [],

    name: 'btn-dropdown',

    extends: Btn,

    components: {
        BtnGroup,
        DropdownMenu
    },

    props: {

        /**
         * The button icon that appears before the label.
         *
         * @property String
         */
        autoclose: Boolean,

        /**
         * The button icon that appears before the label.
         *
         * @property String
         */
        icon: String,

        /**
         * The toggle button's label. If not defined as an attribute,
         * you can override with the component's slot (inner html).
         *
         * @property String
         */
        label: String,

        /**
         * The `id` attribute on the toggle button and aria label. If no `id` is
         * defined, then a UUID will be generated instead.
         *
         * @property String
         */
        id: {
            type: String,
            default: uuid
        },

        /**
         * The button type attribute.
         *
         * @property String
         */
        type: {
            type: String,
            default: 'button'
        },

        /**
         * Display the dropdown menu aligned left or right
         *
         * @property String
         */
        align: {
            type: String,
            default: 'left',
            validate(value) {
                return ['left', 'right'].indexOf(value.toLowerCase()) !== -1;
            }
        },

        /**
         * Display the dropdown button with a split toggle button.
         *
         * @property Boolean
         */
        split: {
            type: Boolean,
            default: false
        },

        /**
         * Display as a dropup instead of a dropdown.
         *
         * @property Boolean
         */
        dropup: {
            type: Boolean,
            default: false
        },

        /**
         * Display as a dropright instead of a dropdown.
         *
         * @property Boolean
         */
        dropright: {
            type: Boolean,
            default: false
        },

        /**
         * Display as a dropleft instead of a dropdown.
         *
         * @property Boolean
         */
        dropleft: {
            type: Boolean,
            default: false
        }

    },

    methods: {

        /**
         * Focus on the the dropdown toggle button
         *
         * @return void
         */
        focus() {
            this.$el.querySelector('.dropdown-toggle').focus();
        },

        /**
         * Focus on the the dropdown toggle button
         *
         * @return void
         */
        queryFocusable() {
            return this.$el.querySelector('.dropdown-menu').querySelectorAll('label, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        },

        /**
         * Method to check if the given element is focusable.
         *
         * @return void
         */
        isFocusable(element) {
            const nodes = this.queryFocusable();

            for(let i in nodes) {
                if(element === nodes[i]) {
                    return true;
                }
            }

            return false;
        },

        /**
         * Toggle the dropdown menu
         *
         * @return void
         */
        toggle() {
            !this.isDropdownShowing ? this.show() : this.hide();
        },

        /**
         * Show the dropdown menu
         *
         * @return void
         */
        show() {
            this.isDropdownShowing = true;

            this.$nextTick(() => {
                let side = 'bottom';

                if(this.dropup) {
                    side = 'top';
                }
                else if(this.dropleft) {
                    side = 'left';
                }
                else if(this.dropright) {
                    side = 'right';
                }

                const menu = this.$el.querySelector('.dropdown-menu');
                const toggle = this.$el.querySelector('.dropdown-toggle');
                const position = [side, this.align === 'left' ? 'start' : 'end'];

                new Popper(toggle, menu, {
                    placement: position.join('-')
                });

                if(this.queryFocusable().item(0)) {
                    this.$el.querySelector('input, select, textarea').focus();
                }

                this.$emit('show');
            });
        },

        /**
         * Hide the dropdown menu
         *
         * @return void
         */
        hide() {
            this.$emit('toggle', this.isDropdownShowing = false);
            this.$emit('hide');
        },

        /**
         * A callback function for the `click` event for the action button
         *
         * @return void
         */
        onClick(event) {
            this.hide();
            this.$emit('click', event);
        },

        /**
         * A callback function for the `blur` event for the action button
         *
         * @return void
         */
        onBlur(event) {
            if(!this.$el.contains(event.relatedTarget)) {
                this.hide();
            }
        },

        /**
         * A callback function for the `item:click` event for the action button
         *
         * @return void
         */
        onMenuClick(event, item) {
            if(event.target === this.$el.querySelector('.dropdown-menu')) {
                this.focus();
            }
        },

        /**
         * A callback function for the `item:click` event for the action button
         *
         * @return void
         */
        onItemClick(event, item) {
            if(!this.isFocusable(event.target)) {
                this.hide();
            }

            this.$emit('item:click', event, item);
        }

    },

    computed: {

        variantClassPrefix() {
            return 'btn' + (this.outline ? '-outline' : '');
        },

        sizeableClassPrefix() {
            return 'btn';
        },

        actionClasses() {
            return [
                'btn',
                prefix(this.size, 'btn'),
                prefix(this.variant, 'btn')
            ].join(' ');
        },

        toggleClasses() {
            return [
                'btn',
                'dropdown-toggle',
                this.variantClass,
                this.sizeableClass,
                this.active ? 'active' : '',
                this.block ? 'btn-block' : '',
                (this.split ? 'dropdown-toggle-split' : ''),
            ].join(' ');
        }
    },

    data() {
        return {
            isDropdownShowing: false
        };
    },

    mounted() {
        each(this.$el.querySelectorAll('[type=submit], input, select, textarea, [tabindex]:not([tabindex="-1"]'), el => {
            const keydown = event => {
                const ignore = [
                    LEFT_ARROW_KEYCODE,
                    RIGHT_ARROW_KEYCODE,
                    UP_ARROW_KEYCODE,
                    DOWN_ARROW_KEYCODE,
                    TAB_KEYCODE
                ];

                if(ignore.indexOf(event.keyCode) !== -1) {
                    ignoreBlurEvent = true;
                }
            };

            const blur = event => {
                if(!ignoreBlurEvent) {
                    this.focus();
                }

                ignoreBlurEvent = false;
            };

            const focus = event => {
                ignoreBlurEvent = false;
            };

            const mousedown = event => {
                ignoreBlurEvent = true;
            };

            el.addEventListener('blur', blur);
            el.addEventListener('focus', focus);
            el.addEventListener('keydown', keydown);
            el.addEventListener('mousedown', mousedown);
        });
    }

};

var plugin$m = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      BtnDropdown: BtnDropdown
    });
  }
});

var HasSlots = {
  methods: {
    getSlot: function getSlot(slot) {
      return this.$slots[slot];
    },
    hasSlot: function hasSlot(slot) {
      return !!this.$slots[slot];
    },
    hasSlots: function hasSlots(slots) {
      for (var i in slots) {
        if (!this.hasSlot(slots[i])) {
          return false;
        }
      }
    }
  },
  computed: {
    hasDefaultSlot: function hasDefaultSlot() {
      return this.hasSlot('default');
    }
  }
};

var Card = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.mergeClasses(_vm.className, _vm.colorableClasses)},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'card',

    mixins: [
        HasSlots,
        Colorable,
        MergeClasses
    ],

    computed: {

        className() {
            return this.$options.name
        }

    }

};

var CardBody = {

    name: 'card-body',

    extends: Card

};

var CardBtnGroup = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('btn-group',{staticClass:"card-btn-group"},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'card-btn-group',

    extends: Card

};

var CardDeck = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-deck"},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'card-deck'

};

var CardHeader = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,{tag:"component",class:_vm.mergeClasses(_vm.className, _vm.colorableClasses)},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'card-header',

    extends: Card,

    mixins: [
        MergeClasses
    ],

    props: {

        /**
         * The component's HTML tag name
         *
         * @property String
         */
        tag: {
            type: String,
            default: 'h5'
        }

    }

};

var CardFooter = {

    name: 'card-footer',

    extends: CardHeader,

    props: {

        /**
         * The component's HTML tag name
         *
         * @property String
         */
        tag: {
            type: String,
            default: 'div'
        }

    }

};

var CardImg = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"d-flex justify-content-center align-items-center",class:_vm.mergeClasses(_vm.className),style:({height: _vm.unit(_vm.height)})},[(_vm.background)?_c('div',{staticClass:"card-img-bg",style:({background: _vm.background ? `url(${this.src})` : null, overflow: _vm.blur ? 'hidden' : 'inherit', filter: _vm.blur ? `blur(${_vm.unit(_vm.blur)})` : null})}):_vm._e(),_vm._v(" "),(!_vm.background && _vm.src)?_c('img',{staticClass:"img-fluid",attrs:{"src":_vm.src,"alt":_vm.alt}}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"card-img-content",class:{'text-truncate': _vm.textTruncate}},[_vm._t("default")],2)])},staticRenderFns: [],

    name: 'card-img',

    extends: Card,

    mixins: [
        MergeClasses
    ],

    props: {

        /**
         * The alt attribute
         *
         * @property String
         */
        alt: String,

        /**
         * Display the image as a background image fit with CSS cover.
         *
         * @property String
         */
        background: Boolean,

        /**
         * The amount to blur the background image.
         *
         * @property String
         */
        blur: [Number, String],

        /**
         * The height attribute
         *
         * @property String
         */
        height: [Number, String],

        /**
         * Truncate the text in the content
         *
         * @property String
         */
        textTruncate: Boolean,

        /**
         * The src attribute
         *
         * @property String
         */
        src: String

    },

    methods: {

        unit(value) {
            return unit(value);
        }

    }

};

var CardImgTop = {

    name: 'card-img-top',

    extends: CardImg
};

var CardImgBottom = {

    name: 'card-img-bottom',

    extends: CardImg

};

var CardImgOverlay = {

    name: 'card-img-overlay',

    extends: Card

};

var CardLink = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('router-link',{class:_vm.mergeClasses(_vm.className, _vm.colorableClasses),attrs:{"to":_vm.href},on:{"click":_vm.onClick}},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'card-link',

    extends: Card,

    mixins: [
        MergeClasses
    ],

    props: {

        /**
         * The alt attribute
         *
         * @property String
         */
        alt: String,

        /**
         * The href attribute
         *
         * @property String
         */
        href: String,

        /**
         * The to attribute
         *
         * @property String
         */
        to: [Object, String]

    },

    methods: {

        onClick(event) {
            this.$emit('click', event);
        }

    }

};

var CardSubtitle = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h6',{class:_vm.mergeClasses(_vm.className, _vm.colorableClasses)},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'card-subtitle',

    extends: Card,

    mixins: [
        MergeClasses
    ]

};

var CardTitle = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h5',{class:_vm.mergeClasses(_vm.className, _vm.colorableClasses)},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'card-title',

    mixins: [
        Card,
        MergeClasses
    ]

};

var plugin$n = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Card: Card,
      CardBody: CardBody,
      CardBtnGroup: CardBtnGroup,
      CardDeck: CardDeck,
      CardFooter: CardFooter,
      CardHeader: CardHeader,
      CardImg: CardImg,
      CardImgTop: CardImgTop,
      CardImgBottom: CardImgBottom,
      CardImgOverlay: CardImgOverlay,
      CardLink: CardLink,
      CardSubtitle: CardSubtitle,
      CardTitle: CardTitle
    });
  }
});

var RadioField = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.mergeClasses(_vm.controlClass, _vm.customControlClass, _vm.sizeableClass, _vm.inline ? _vm.inlineClass : '')},[(_vm.custom && _vm.id)?[_c('input',{directives:[{name:"bind-events",rawName:"v-bind-events"}],class:_vm.mergeClasses(_vm.inputClass, (_vm.invalidFeedback ? 'is-invalid' : '')),attrs:{"type":"radio","name":_vm.name,"id":_vm.id,"required":_vm.required,"disabled":_vm.disabled || _vm.readonly,"readonly":_vm.readonly,"pattern":_vm.pattern},domProps:{"value":_vm.value,"checked":_vm.checkedValue === _vm.value || _vm.checked},on:{"change":function($event){_vm.$emit('change', $event.target.value);}}}),_vm._v(" "),_c('label',{class:_vm.mergeClasses(_vm.labelClass, _vm.colorableClasses),attrs:{"for":_vm.id}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))]),_vm._v(" "),_vm._t("feedback",[(_vm.validFeedback)?_c('form-feedback',{attrs:{"valid":""},domProps:{"innerHTML":_vm._s(_vm.validFeedback)}}):_vm._e(),_vm._v(" "),(_vm.invalidFeedback)?_c('form-feedback',{attrs:{"invalid":""},domProps:{"innerHTML":_vm._s(_vm.invalidFeedback)}}):_vm._e()])],2)]:[_c('label',{class:_vm.mergeClasses(_vm.labelClass, _vm.colorableClasses),attrs:{"for":_vm.id}},[_c('input',{directives:[{name:"bind-events",rawName:"v-bind-events"}],class:_vm.mergeClasses(_vm.inputClass, (_vm.invalidFeedback ? 'is-invalid' : '')),attrs:{"type":"radio","name":_vm.name,"id":_vm.id,"required":_vm.required,"disabled":_vm.disabled || _vm.readonly,"readonly":_vm.readonly,"pattern":_vm.pattern},domProps:{"value":_vm.value,"checked":_vm.checkedValue === _vm.value || _vm.checked},on:{"change":function($event){_vm.$emit('change', $event.target.value);}}}),_vm._v(" "),_vm._t("default",[_vm._v(_vm._s(_vm.label))]),_vm._v(" "),_vm._t("feedback",[(_vm.validFeedback)?_c('form-feedback',{attrs:{"valid":""},domProps:{"innerHTML":_vm._s(_vm.validFeedback)}}):_vm._e(),_vm._v(" "),(_vm.invalidFeedback)?_c('form-feedback',{attrs:{"invalid":""},domProps:{"innerHTML":_vm._s(_vm.invalidFeedback)}}):_vm._e()])],2)],_vm._v(" "),_vm._t("help",[(_vm.helpText)?_c('help-text',{domProps:{"innerHTML":_vm._s(_vm.helpText)}}):_vm._e()])],2)},staticRenderFns: [],

    name: 'radio-field',

    components: {
        HelpText,
        FormFeedback
    },

    mixins: [
        Colorable,
        FormControl,
        MergeClasses
    ],

    model: {
        event: 'change',
        prop: 'checkedValue'
    },

    props: {

        /**
         * An array of event names that correlate with callback functions
         *
         * @property Function
         */
        bindEvents: {
            type: Array,
            default() {
                return ['focus', 'blur', 'input', 'click', 'keyup', 'keydown', 'progress'];
            }
        },

        /**
         * Is this a custom element
         *
         * @property String
         */
        custom: Boolean,

        /**
         * Display the form field and label inline
         *
         * @property Function
         */
        inline: Boolean,

        /**
         * The checked values
         *
         * @property String
         */
        checked: Boolean,

        /**
         * The checked value
         *
         * @property String
         */
        checkedValue: [Boolean, Number, String, Object],

        /**
         * The class name assigned to the control element
         *
         * @property String
         */
        defaultControlClass: {
            type: String,
            default: 'form-check'
        }

    },

    computed: {

        labelClass() {
            return prefix('label', this.controlClass);
        },

        inputClass() {
            return prefix('input', this.controlClass);
        },

        inlineClass() {
            return prefix('inline', this.controlClass);
        },

        controlClass() {
            return this.custom ? 'custom-control' : this.defaultControlClass;
        },

        customControlClass() {
            return this.custom ? prefix(this.$options.name.replace('-field', ''), 'custom') : '';
        },

        sizeableClass() {
            return prefix(this.size, 'form-control');
        }

    }

};

var plugin$o = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      RadioField: RadioField
    });
  }
});

var CheckboxField = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.mergeClasses(_vm.controlClass, _vm.customControlClass, _vm.sizeableClass, _vm.inline ? _vm.inlineClass : '')},[(_vm.custom && _vm.id)?[_c('input',{directives:[{name:"bind-events",rawName:"v-bind-events"}],class:_vm.mergeClasses(_vm.inputClass, (_vm.invalidFeedback ? 'is-invalid' : '')),attrs:{"type":"checkbox","name":_vm.name,"id":_vm.id,"required":_vm.required,"disabled":_vm.disabled || _vm.readonly,"readonly":_vm.readonly,"pattern":_vm.pattern},domProps:{"value":_vm.value,"checked":_vm.checkedValues.indexOf(_vm.value) !== -1 || _vm.checked},on:{"change":function($event){_vm.update($event.target.value);}}}),_vm._v(" "),_c('label',{class:_vm.mergeClasses(_vm.labelClass, _vm.colorableClasses),attrs:{"for":_vm.id}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))]),_vm._v(" "),_vm._t("feedback",[(_vm.validFeedback)?_c('form-feedback',{attrs:{"valid":""},domProps:{"innerHTML":_vm._s(_vm.validFeedback)}}):_vm._e(),_vm._v(" "),(_vm.invalidFeedback)?_c('form-feedback',{attrs:{"invalid":""},domProps:{"innerHTML":_vm._s(_vm.invalidFeedback)}}):_vm._e()])],2)]:[_c('label',{class:_vm.mergeClasses(_vm.labelClass, _vm.colorableClasses),attrs:{"for":_vm.id}},[_c('input',{directives:[{name:"bind-events",rawName:"v-bind-events"}],class:_vm.mergeClasses(_vm.inputClass, (_vm.invalidFeedback ? 'is-invalid' : '')),attrs:{"type":"checkbox","name":_vm.name,"id":_vm.id,"required":_vm.required,"disabled":_vm.disabled || _vm.readonly,"readonly":_vm.readonly,"pattern":_vm.pattern},domProps:{"value":_vm.value,"checked":_vm.checkedValues.indexOf(_vm.value) !== -1 || _vm.checked},on:{"change":function($event){_vm.update($event.target.value);}}}),_vm._v(" "),_vm._t("default",[_vm._v(_vm._s(_vm.label))]),_vm._v(" "),_vm._t("feedback",[(_vm.validFeedback)?_c('form-feedback',{attrs:{"valid":""},domProps:{"innerHTML":_vm._s(_vm.validFeedback)}}):_vm._e(),_vm._v(" "),(_vm.invalidFeedback)?_c('form-feedback',{attrs:{"invalid":""},domProps:{"innerHTML":_vm._s(_vm.invalidFeedback)}}):_vm._e()])],2)],_vm._v(" "),_vm._t("help",[(_vm.helpText)?_c('help-text',{domProps:{"innerHTML":_vm._s(_vm.helpText)}}):_vm._e()])],2)},staticRenderFns: [],

    name: 'checkbox-field',

    extends: RadioField,

    mixins: [
        MergeClasses
    ],

    model: {
        event: 'change',
        prop: 'checkedValues'
    },

    props: {

        /**
         * The checked values
         *
         * @property String
         */
        checkedValues: {
            type: Array,
            default() {
                return [];
            }
        }

    },

    methods: {

        update(value) {
            const checked = this.checkedValues.slice(0);
            const index = this.checkedValues.indexOf(value);

            if(index === -1) {
                checked.push(value);
            }
            else {
                checked.splice(index, 1);
            }

            this.$emit('change', checked);
        }

    }
};

var plugin$p = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      CheckboxField: CheckboxField
    });
  }
});

var Dropzone = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"dropzone",class:{'is-dragging': _vm.isDragging},on:{"drop":function($event){$event.preventDefault();return _vm.onDrop($event)},"dragover":function($event){$event.preventDefault();return _vm.onDragover($event)},"dragenter":function($event){$event.preventDefault();return _vm.onDragenter($event)},"dragleave":function($event){$event.preventDefault();return _vm.onDragleave($event)}}},[_vm._t("placeholder",[_c('div',{staticClass:"dropzone-placeholder text-center"},[_c('card',[_c('card-body',[_c('h1',{staticClass:"mt-4"},[_vm._v("Drag & Drop")]),_vm._v(" "),_c('p',[_vm._v("Drag and drop your files here to upload them!")]),_vm._v(" "),_c('div',{staticClass:"mt-3"},[_c('i',{staticClass:"fa fa-image"})])])],1)],1)]),_vm._v(" "),_vm._t("default")],2)},staticRenderFns: [],

    name: 'dropzone',

    components: {
        Card,
        CardBody
    },

    methods: {

        onDrop(event) {
            this.isDragging = false;
            this.$emit('drop', event);
        },

        onDragover(event) {
            this.isDragging = true;
            this.$emit('dragover', event);
        },

        onDragenter(event) {
            this.isDragging = true;
            this.$emit('dragenter', event);
            this.onDragover(event);
        },

        onDragleave(event) {
            this.isDragging = false;
            this.$emit('dragleave', event);
        }

    },

    data() {
        return {
            files: null,
            isDragging: false
        }
    }

};

var plugin$q = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Dropzone: Dropzone
    });
  }
});

function readFile(file, progress) {
  if (!(file instanceof File)) {
    throw new Error('The first argument be an instance of File object.');
  }

  return new Promise(function (resolve, reject) {
    var reader = new FileReader();

    if (isFunction$1(progress)) {
      reader.onprogress = function (e) {
        return progress(e, reader);
      };
    }

    reader.onload = function (e) {
      return resolve(e);
    };

    reader.onerror = function (e) {
      return reject(e);
    };

    reader.onabort = function (e) {
      return reject(e);
    };

    reader.readAsDataURL(file);
  });
}

var FilePreview = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"file-preview",class:{'has-image': !!_vm.image}},[_c('div',{staticClass:"file-preview-inner"},[(!_vm.hideClose)?_c('a',{staticClass:"file-preview-close",attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.$emit('close', _vm.file);}}},[_c('i',{staticClass:"fa fa-times-circle"})]):_vm._e(),_vm._v(" "),(!!_vm.poster || _vm.isImage)?_c('div',{staticClass:"file-preview-image"},[(!!_vm.poster || !!_vm.image)?_c('img',{staticClass:"file-preview-thumbnail",attrs:{"src":_vm.poster || _vm.image},on:{"load":_vm.onLoad}}):_vm._e()]):_c('div',{directives:[{name:"ready",rawName:"v-ready",value:(() => this.$emit('loaded')),expression:"() => this.$emit('loaded')"}],staticClass:"file-preview-icon"},[_c('i',{staticClass:"fa",class:{'fa-file-video-o': _vm.isVideo, 'fa-file-o': !_vm.isVideo}})]),_vm._v(" "),(_vm.progress || _vm.isImage && _vm.loaded !== false)?_c('progress-bar',{directives:[{name:"ready",rawName:"v-ready",value:(_vm.readFile),expression:"readFile"}],staticClass:"mt-3",attrs:{"value":_vm.progress || _vm.loaded || 0,"height":10}}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"file-preview-filename",domProps:{"innerHTML":_vm._s(_vm.name)}}),_vm._v(" "),_c('div',{staticClass:"file-preview-filesize"},[_vm._v("("+_vm._s(_vm.size)+")")]),_vm._v(" "),_c('div')],1)])},staticRenderFns: [],

    name: 'file-preview',

    components: {
        ProgressBar
    },

    directives: {
        ready: {
            inserted(el, binding, vnode) {
                if(isFunction$1(binding.value)) {
                    vnode.context.$nextTick(binding.value);
                }
            }
        }
    },

    props: {

        /**
         * Hide the close button for the preview
         *
         * @property Object
         */
        hideClose: Boolean,

        /**
         * The uploaded File object
         *
         * @property Object
         */
        file: {
            type: [Object, File],
            required: true
        },

        /**
         * An image URL to instead of using the file reader.
         * @property {String}
         */
        poster: String,

        /**
         * Progress that can be passed from a parent comparent, for instance
         * use to show an ajax request with a single progress bar. If a progress
         * value is passed, even a 0, the progress bar will not be used to show
         * the progress of the file reader.
         * @property {Number}
         */
        progress: {
            type: Number,
            default: undefined
        }

    },

    computed: {

        /**
         * Get the file name
         *
         * @property String
         */
        name() {
            return this.file instanceof File ? this.file.name : this.file.orig_filename;
        },

        /**
         * Get the file extension
         *
         * @property String
         */
        extension() {
            return this.file instanceof File ? this.file.name.split('.').pop().toLowerCase() : this.file.extension;
        },

        /**
         * Get the file formatted size
         *
         * @property String
         */
        size() {
            return this.bytesToSize(this.file.size);
        },

        /**
         * Get the file type
         *
         * @property String
         */
        type() {
            return this.file instanceof File ? this.file.type : this.file.mime;
        },

        /**
         * Check to see if the file is an image.
         *
         * @property String
         */
        isImage() {
            return !!this.type.match(/^image/);
        },

        /**
         * Check to see if the file is a video.
         *
         * @property String
         */
        isVideo() {
            return !!this.type.match(/^video/);
        },

        /**
         * Get the last time the file was modified (as timestamp)
         *
         * @property String
         */
        lastModified() {
            return this.file instanceof File ? this.file.lastModified : null;
        },

        /**
         * Get the last time the file was modified (as Date)
         *
         * @property String
         */
        lastModifiedDate() {
            return this.file instanceof File ? this.file.lastModifiedDate : null;
        }

    },

    methods: {

        readFile() {
            if(this.file instanceof File) {
                const start = moment();

                this.loaded = 0;

                this.$nextTick(() => {
                    readFile(this.file, e => {
                        if(e.lengthComputable) {
                            this.$emit('progress', this.loaded = parseInt((e.loaded / e.total) * 100, 10));
                        }
                    }).then(event => {
                        this.$emit('read', event);

                        setTimeout(() => {
                            this.image = event.target.result;
                            this.$nextTick(() => {
                                this.loaded = false;
                            });
                        }, 500 - moment().diff(start));
                    }, error => {
                        this.$emit('error', error);
                    });
                });
            }
        },

    	bytesToSize: function(bytes) {
    		var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    		if (bytes == 0) return '0 Byte';
    		var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    		return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    	},

        onLoad(event) {
            this.$emit('loaded');
        }

    },

    data() {
        return {
            image: this.file.url,
            loaded: this.file instanceof File ? 0 : false,
        };
    }

};

var plugin$r = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      FilePreview: FilePreview
    });
  }
});

var FormControl$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(!_vm.select ? 'input' : 'select',{directives:[{name:"bind-events",rawName:"v-bind-events",value:(_vm.bindEvents),expression:"bindEvents"}],tag:"component",class:_vm.mergeClasses(_vm.controlClasses, _vm.colorableClasses),attrs:{"name":_vm.name,"id":_vm.id,"type":!_vm.select ? _vm.type : false,"value":_vm.value,"pattern":_vm.pattern,"required":_vm.required,"readonly":_vm.readonly,"placeholder":_vm.placeholder,"disabled":_vm.disabled || _vm.readonly,"aria-label":_vm.label,"aria-describedby":_vm.id}})},staticRenderFns: [],

    name: 'form-control',

    mixins: [
        Colorable,
        FormControl,
        MergeClasses
    ],

    props: {

        /**
         * Is the element a select?
         *
         * @property String
         */
        select: Boolean,

        /**
         * The type attribute
         *
         * @property String
         */
        type: {
            type: String,
            default: 'text'
        }

    }

};

var plugin$s = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      FormControl: FormControl$1
    });
  }
});

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
 *
 *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 */

(function(window, document) {


// Exits early if all IntersectionObserver and IntersectionObserverEntry
// features are natively supported.
if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

  // Minimal polyfill for Edge 15's lack of `isIntersecting`
  // See: https://github.com/w3c/IntersectionObserver/issues/211
  if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
    Object.defineProperty(window.IntersectionObserverEntry.prototype,
      'isIntersecting', {
      get: function () {
        return this.intersectionRatio > 0;
      }
    });
  }
  return;
}


/**
 * Creates the global IntersectionObserverEntry constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
 * @param {Object} entry A dictionary of instance properties.
 * @constructor
 */
function IntersectionObserverEntry(entry) {
  this.time = entry.time;
  this.target = entry.target;
  this.rootBounds = entry.rootBounds;
  this.boundingClientRect = entry.boundingClientRect;
  this.intersectionRect = entry.intersectionRect || getEmptyRect();
  this.isIntersecting = !!entry.intersectionRect;

  // Calculates the intersection ratio.
  var targetRect = this.boundingClientRect;
  var targetArea = targetRect.width * targetRect.height;
  var intersectionRect = this.intersectionRect;
  var intersectionArea = intersectionRect.width * intersectionRect.height;

  // Sets intersection ratio.
  if (targetArea) {
    // Round the intersection ratio to avoid floating point math issues:
    // https://github.com/w3c/IntersectionObserver/issues/324
    this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
  } else {
    // If area is zero and is intersecting, sets to 1, otherwise to 0
    this.intersectionRatio = this.isIntersecting ? 1 : 0;
  }
}


/**
 * Creates the global IntersectionObserver constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
 * @param {Function} callback The function to be invoked after intersection
 *     changes have queued. The function is not invoked if the queue has
 *     been emptied by calling the `takeRecords` method.
 * @param {Object=} opt_options Optional configuration options.
 * @constructor
 */
function IntersectionObserver(callback, opt_options) {

  var options = opt_options || {};

  if (typeof callback != 'function') {
    throw new Error('callback must be a function');
  }

  if (options.root && options.root.nodeType != 1) {
    throw new Error('root must be an Element');
  }

  // Binds and throttles `this._checkForIntersections`.
  this._checkForIntersections = throttle(
      this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

  // Private properties.
  this._callback = callback;
  this._observationTargets = [];
  this._queuedEntries = [];
  this._rootMarginValues = this._parseRootMargin(options.rootMargin);

  // Public properties.
  this.thresholds = this._initThresholds(options.threshold);
  this.root = options.root || null;
  this.rootMargin = this._rootMarginValues.map(function(margin) {
    return margin.value + margin.unit;
  }).join(' ');
}


/**
 * The minimum interval within which the document will be checked for
 * intersection changes.
 */
IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;


/**
 * The frequency in which the polyfill polls for intersection changes.
 * this can be updated on a per instance basis and must be set prior to
 * calling `observe` on the first target.
 */
IntersectionObserver.prototype.POLL_INTERVAL = null;

/**
 * Use a mutation observer on the root element
 * to detect intersection changes.
 */
IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;


/**
 * Starts observing a target element for intersection changes based on
 * the thresholds values.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.observe = function(target) {
  var isTargetAlreadyObserved = this._observationTargets.some(function(item) {
    return item.element == target;
  });

  if (isTargetAlreadyObserved) {
    return;
  }

  if (!(target && target.nodeType == 1)) {
    throw new Error('target must be an Element');
  }

  this._registerInstance();
  this._observationTargets.push({element: target, entry: null});
  this._monitorIntersections();
  this._checkForIntersections();
};


/**
 * Stops observing a target element for intersection changes.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.unobserve = function(target) {
  this._observationTargets =
      this._observationTargets.filter(function(item) {

    return item.element != target;
  });
  if (!this._observationTargets.length) {
    this._unmonitorIntersections();
    this._unregisterInstance();
  }
};


/**
 * Stops observing all target elements for intersection changes.
 */
IntersectionObserver.prototype.disconnect = function() {
  this._observationTargets = [];
  this._unmonitorIntersections();
  this._unregisterInstance();
};


/**
 * Returns any queue entries that have not yet been reported to the
 * callback and clears the queue. This can be used in conjunction with the
 * callback to obtain the absolute most up-to-date intersection information.
 * @return {Array} The currently queued entries.
 */
IntersectionObserver.prototype.takeRecords = function() {
  var records = this._queuedEntries.slice();
  this._queuedEntries = [];
  return records;
};


/**
 * Accepts the threshold value from the user configuration object and
 * returns a sorted array of unique threshold values. If a value is not
 * between 0 and 1 and error is thrown.
 * @private
 * @param {Array|number=} opt_threshold An optional threshold value or
 *     a list of threshold values, defaulting to [0].
 * @return {Array} A sorted list of unique and valid threshold values.
 */
IntersectionObserver.prototype._initThresholds = function(opt_threshold) {
  var threshold = opt_threshold || [0];
  if (!Array.isArray(threshold)) threshold = [threshold];

  return threshold.sort().filter(function(t, i, a) {
    if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
      throw new Error('threshold must be a number between 0 and 1 inclusively');
    }
    return t !== a[i - 1];
  });
};


/**
 * Accepts the rootMargin value from the user configuration object
 * and returns an array of the four margin values as an object containing
 * the value and unit properties. If any of the values are not properly
 * formatted or use a unit other than px or %, and error is thrown.
 * @private
 * @param {string=} opt_rootMargin An optional rootMargin value,
 *     defaulting to '0px'.
 * @return {Array<Object>} An array of margin objects with the keys
 *     value and unit.
 */
IntersectionObserver.prototype._parseRootMargin = function(opt_rootMargin) {
  var marginString = opt_rootMargin || '0px';
  var margins = marginString.split(/\s+/).map(function(margin) {
    var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
    if (!parts) {
      throw new Error('rootMargin must be specified in pixels or percent');
    }
    return {value: parseFloat(parts[1]), unit: parts[2]};
  });

  // Handles shorthand.
  margins[1] = margins[1] || margins[0];
  margins[2] = margins[2] || margins[0];
  margins[3] = margins[3] || margins[1];

  return margins;
};


/**
 * Starts polling for intersection changes if the polling is not already
 * happening, and if the page's visibility state is visible.
 * @private
 */
IntersectionObserver.prototype._monitorIntersections = function() {
  if (!this._monitoringIntersections) {
    this._monitoringIntersections = true;

    // If a poll interval is set, use polling instead of listening to
    // resize and scroll events or DOM mutations.
    if (this.POLL_INTERVAL) {
      this._monitoringInterval = setInterval(
          this._checkForIntersections, this.POLL_INTERVAL);
    }
    else {
      addEvent(window, 'resize', this._checkForIntersections, true);
      addEvent(document, 'scroll', this._checkForIntersections, true);

      if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in window) {
        this._domObserver = new MutationObserver(this._checkForIntersections);
        this._domObserver.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      }
    }
  }
};


/**
 * Stops polling for intersection changes.
 * @private
 */
IntersectionObserver.prototype._unmonitorIntersections = function() {
  if (this._monitoringIntersections) {
    this._monitoringIntersections = false;

    clearInterval(this._monitoringInterval);
    this._monitoringInterval = null;

    removeEvent(window, 'resize', this._checkForIntersections, true);
    removeEvent(document, 'scroll', this._checkForIntersections, true);

    if (this._domObserver) {
      this._domObserver.disconnect();
      this._domObserver = null;
    }
  }
};


/**
 * Scans each observation target for intersection changes and adds them
 * to the internal entries queue. If new entries are found, it
 * schedules the callback to be invoked.
 * @private
 */
IntersectionObserver.prototype._checkForIntersections = function() {
  var rootIsInDom = this._rootIsInDom();
  var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

  this._observationTargets.forEach(function(item) {
    var target = item.element;
    var targetRect = getBoundingClientRect(target);
    var rootContainsTarget = this._rootContainsTarget(target);
    var oldEntry = item.entry;
    var intersectionRect = rootIsInDom && rootContainsTarget &&
        this._computeTargetAndRootIntersection(target, rootRect);

    var newEntry = item.entry = new IntersectionObserverEntry({
      time: now(),
      target: target,
      boundingClientRect: targetRect,
      rootBounds: rootRect,
      intersectionRect: intersectionRect
    });

    if (!oldEntry) {
      this._queuedEntries.push(newEntry);
    } else if (rootIsInDom && rootContainsTarget) {
      // If the new entry intersection ratio has crossed any of the
      // thresholds, add a new entry.
      if (this._hasCrossedThreshold(oldEntry, newEntry)) {
        this._queuedEntries.push(newEntry);
      }
    } else {
      // If the root is not in the DOM or target is not contained within
      // root but the previous entry for this target had an intersection,
      // add a new record indicating removal.
      if (oldEntry && oldEntry.isIntersecting) {
        this._queuedEntries.push(newEntry);
      }
    }
  }, this);

  if (this._queuedEntries.length) {
    this._callback(this.takeRecords(), this);
  }
};


/**
 * Accepts a target and root rect computes the intersection between then
 * following the algorithm in the spec.
 * TODO(philipwalton): at this time clip-path is not considered.
 * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
 * @param {Element} target The target DOM element
 * @param {Object} rootRect The bounding rect of the root after being
 *     expanded by the rootMargin value.
 * @return {?Object} The final intersection rect object or undefined if no
 *     intersection is found.
 * @private
 */
IntersectionObserver.prototype._computeTargetAndRootIntersection =
    function(target, rootRect) {

  // If the element isn't displayed, an intersection can't happen.
  if (window.getComputedStyle(target).display == 'none') return;

  var targetRect = getBoundingClientRect(target);
  var intersectionRect = targetRect;
  var parent = getParentNode(target);
  var atRoot = false;

  while (!atRoot) {
    var parentRect = null;
    var parentComputedStyle = parent.nodeType == 1 ?
        window.getComputedStyle(parent) : {};

    // If the parent isn't displayed, an intersection can't happen.
    if (parentComputedStyle.display == 'none') return;

    if (parent == this.root || parent == document) {
      atRoot = true;
      parentRect = rootRect;
    } else {
      // If the element has a non-visible overflow, and it's not the <body>
      // or <html> element, update the intersection rect.
      // Note: <body> and <html> cannot be clipped to a rect that's not also
      // the document rect, so no need to compute a new intersection.
      if (parent != document.body &&
          parent != document.documentElement &&
          parentComputedStyle.overflow != 'visible') {
        parentRect = getBoundingClientRect(parent);
      }
    }

    // If either of the above conditionals set a new parentRect,
    // calculate new intersection data.
    if (parentRect) {
      intersectionRect = computeRectIntersection(parentRect, intersectionRect);

      if (!intersectionRect) break;
    }
    parent = getParentNode(parent);
  }
  return intersectionRect;
};


/**
 * Returns the root rect after being expanded by the rootMargin value.
 * @return {Object} The expanded root rect.
 * @private
 */
IntersectionObserver.prototype._getRootRect = function() {
  var rootRect;
  if (this.root) {
    rootRect = getBoundingClientRect(this.root);
  } else {
    // Use <html>/<body> instead of window since scroll bars affect size.
    var html = document.documentElement;
    var body = document.body;
    rootRect = {
      top: 0,
      left: 0,
      right: html.clientWidth || body.clientWidth,
      width: html.clientWidth || body.clientWidth,
      bottom: html.clientHeight || body.clientHeight,
      height: html.clientHeight || body.clientHeight
    };
  }
  return this._expandRectByRootMargin(rootRect);
};


/**
 * Accepts a rect and expands it by the rootMargin value.
 * @param {Object} rect The rect object to expand.
 * @return {Object} The expanded rect.
 * @private
 */
IntersectionObserver.prototype._expandRectByRootMargin = function(rect) {
  var margins = this._rootMarginValues.map(function(margin, i) {
    return margin.unit == 'px' ? margin.value :
        margin.value * (i % 2 ? rect.width : rect.height) / 100;
  });
  var newRect = {
    top: rect.top - margins[0],
    right: rect.right + margins[1],
    bottom: rect.bottom + margins[2],
    left: rect.left - margins[3]
  };
  newRect.width = newRect.right - newRect.left;
  newRect.height = newRect.bottom - newRect.top;

  return newRect;
};


/**
 * Accepts an old and new entry and returns true if at least one of the
 * threshold values has been crossed.
 * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
 *    particular target element or null if no previous entry exists.
 * @param {IntersectionObserverEntry} newEntry The current entry for a
 *    particular target element.
 * @return {boolean} Returns true if a any threshold has been crossed.
 * @private
 */
IntersectionObserver.prototype._hasCrossedThreshold =
    function(oldEntry, newEntry) {

  // To make comparing easier, an entry that has a ratio of 0
  // but does not actually intersect is given a value of -1
  var oldRatio = oldEntry && oldEntry.isIntersecting ?
      oldEntry.intersectionRatio || 0 : -1;
  var newRatio = newEntry.isIntersecting ?
      newEntry.intersectionRatio || 0 : -1;

  // Ignore unchanged ratios
  if (oldRatio === newRatio) return;

  for (var i = 0; i < this.thresholds.length; i++) {
    var threshold = this.thresholds[i];

    // Return true if an entry matches a threshold or if the new ratio
    // and the old ratio are on the opposite sides of a threshold.
    if (threshold == oldRatio || threshold == newRatio ||
        threshold < oldRatio !== threshold < newRatio) {
      return true;
    }
  }
};


/**
 * Returns whether or not the root element is an element and is in the DOM.
 * @return {boolean} True if the root element is an element and is in the DOM.
 * @private
 */
IntersectionObserver.prototype._rootIsInDom = function() {
  return !this.root || containsDeep(document, this.root);
};


/**
 * Returns whether or not the target element is a child of root.
 * @param {Element} target The target element to check.
 * @return {boolean} True if the target element is a child of root.
 * @private
 */
IntersectionObserver.prototype._rootContainsTarget = function(target) {
  return containsDeep(this.root || document, target);
};


/**
 * Adds the instance to the global IntersectionObserver registry if it isn't
 * already present.
 * @private
 */
IntersectionObserver.prototype._registerInstance = function() {
};


/**
 * Removes the instance from the global IntersectionObserver registry.
 * @private
 */
IntersectionObserver.prototype._unregisterInstance = function() {
};


/**
 * Returns the result of the performance.now() method or null in browsers
 * that don't support the API.
 * @return {number} The elapsed time since the page was requested.
 */
function now() {
  return window.performance && performance.now && performance.now();
}


/**
 * Throttles a function and delays its execution, so it's only called at most
 * once within a given time period.
 * @param {Function} fn The function to throttle.
 * @param {number} timeout The amount of time that must pass before the
 *     function can be called again.
 * @return {Function} The throttled function.
 */
function throttle(fn, timeout) {
  var timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(function() {
        fn();
        timer = null;
      }, timeout);
    }
  };
}


/**
 * Adds an event handler to a DOM node ensuring cross-browser compatibility.
 * @param {Node} node The DOM node to add the event handler to.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to add.
 * @param {boolean} opt_useCapture Optionally adds the even to the capture
 *     phase. Note: this only works in modern browsers.
 */
function addEvent(node, event, fn, opt_useCapture) {
  if (typeof node.addEventListener == 'function') {
    node.addEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.attachEvent == 'function') {
    node.attachEvent('on' + event, fn);
  }
}


/**
 * Removes a previously added event handler from a DOM node.
 * @param {Node} node The DOM node to remove the event handler from.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to remove.
 * @param {boolean} opt_useCapture If the event handler was added with this
 *     flag set to true, it should be set to true here in order to remove it.
 */
function removeEvent(node, event, fn, opt_useCapture) {
  if (typeof node.removeEventListener == 'function') {
    node.removeEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.detatchEvent == 'function') {
    node.detatchEvent('on' + event, fn);
  }
}


/**
 * Returns the intersection between two rect objects.
 * @param {Object} rect1 The first rect.
 * @param {Object} rect2 The second rect.
 * @return {?Object} The intersection rect or undefined if no intersection
 *     is found.
 */
function computeRectIntersection(rect1, rect2) {
  var top = Math.max(rect1.top, rect2.top);
  var bottom = Math.min(rect1.bottom, rect2.bottom);
  var left = Math.max(rect1.left, rect2.left);
  var right = Math.min(rect1.right, rect2.right);
  var width = right - left;
  var height = bottom - top;

  return (width >= 0 && height >= 0) && {
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    width: width,
    height: height
  };
}


/**
 * Shims the native getBoundingClientRect for compatibility with older IE.
 * @param {Element} el The element whose bounding rect to get.
 * @return {Object} The (possibly shimmed) rect of the element.
 */
function getBoundingClientRect(el) {
  var rect;

  try {
    rect = el.getBoundingClientRect();
  } catch (err) {
    // Ignore Windows 7 IE11 "Unspecified error"
    // https://github.com/w3c/IntersectionObserver/pull/205
  }

  if (!rect) return getEmptyRect();

  // Older IE
  if (!(rect.width && rect.height)) {
    rect = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };
  }
  return rect;
}


/**
 * Returns an empty rect object. An empty rect is returned when an element
 * is not in the DOM.
 * @return {Object} The empty rect.
 */
function getEmptyRect() {
  return {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0
  };
}

/**
 * Checks to see if a parent element contains a child element (including inside
 * shadow DOM).
 * @param {Node} parent The parent element.
 * @param {Node} child The child element.
 * @return {boolean} True if the parent node contains the child node.
 */
function containsDeep(parent, child) {
  var node = child;
  while (node) {
    if (node == parent) return true;

    node = getParentNode(node);
  }
  return false;
}


/**
 * Gets the parent node of an element or its host element if the parent node
 * is a shadow root.
 * @param {Node} node The node whose parent to get.
 * @return {Node|null} The parent node or null if no parent exists.
 */
function getParentNode(node) {
  var parent = node.parentNode;

  if (parent && parent.nodeType == 11 && parent.host) {
    // If the parent is a shadow root, return the host element.
    return parent.host;
  }
  return parent;
}


// Exposes the constructors globally.
window.IntersectionObserver = IntersectionObserver;
window.IntersectionObserverEntry = IntersectionObserverEntry;

}(window, document));

var InfiniteScrolling = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"infinite-scrolling",style:({height: _vm.heightUnit, background: _vm.background})},[(_vm.activity)?_c('activity-indicator',{attrs:{"size":_vm.size,"type":_vm.type,"center":""}}):_vm._e()],1)},staticRenderFns: [],

    name: 'infinite-scrolling',

    components: {
        ActivityIndicator
    },

    props: {

        /**
         * Is the activity indicator showing
         *
         * @property String
         */
        activity: Boolean,

        /**
         * The activity indicator background style
         *
         * @property String
         */
        background: String,

        /**
         * The activity indicator size
         *
         * @property String
         */
        height: {
            type: Number,
            default: 100
        },

        /**
         * The activity indicator size
         *
         * @property String
         */
        size: String,

        /**
         * The activity indicator type
         *
         * @property String
         */
        type: String,

        /**
         * The scroll observer threshold for when an element is considered
         * into view. Must be a validate between 0 and 1, and is a percentage.
         *
         * @property Number
         */
        threshold: {
            type: Number,
            default: .75,
            validate(value) {
                return value >= 0 && value <= 1;
            }
        }

    },

    methods: {

        scrollIntoViewport(entry) {
            this.$emit('scroll:in', entry);

            if(!this.activity) {
                this.$emit('load', entry);
            }
        },

        scrollOutViewport(entry) {
            this.$emit('scroll:out', entry);
        }

    },

    computed: {

        heightUnit() {
            return unit(this.height);
        }

    },

    mounted() {
        this.$nextTick(() => {
            new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting && !this.hasScrolledIntoViewport) {
                        this.scrollIntoViewport(entry, observer);
                        this.hasScrolledIntoViewport = true;
                    }
                    else if(this.hasScrolledIntoViewport) {
                        this.scrollOutViewport(entry, observer);
                        this.hasScrolledIntoViewport = false;
                    }
                });
            }, {
                threshold: this.threshold
            }).observe(this.$el);
        });
    },

    data() {
        return {
            hasScrolledIntoViewport: false
        }
    }

};

var InputGroupText = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"input-group-text",attrs:{"id":_vm.id}},[_vm._t("default",[_vm._v(_vm._s(_vm.text))])],2)},staticRenderFns: [],

    name: 'input-group-text',

    props: {

        /**
         * The id attribute
         *
         * @property String
         */
        id: String,

        /**
         * The type attribute
         *
         * @property String
         */
        text: [Array, Number, String]

    }

};

var InputGroupAppend = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-append"},[(_vm.text)?_c('input-group-text',[_vm._t("default")],2):_vm._t("default")],2)},staticRenderFns: [],

    name: 'input-group-append',

    props: {

        /**
         * The type attribute
         *
         * @property String
         */
        text: Boolean

    }

};

var InputGroupPrepend = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-prepend"},[(_vm.text)?_c('input-group-text',[_vm._t("default")],2):_vm._t("default")],2)},staticRenderFns: [],

    name: 'input-group-prepend',

    props: {

        /**
         * The type attribute
         *
         * @property String
         */
        text: Boolean

    }

};

var InputGroup = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group",class:_vm.mergeClasses(_vm.colorableClasses, _vm.sizeableClass)},[_vm._t("prepend",[(_vm.prepend instanceof Array)?[_c('input-group-prepend',_vm._l((_vm.prepend),function(value){return _c('input-group-text',{attrs:{"text":value}})}))]:(_vm.prepend)?[_c('input-group-prepend',{attrs:{"text":""}},[_vm._v(_vm._s(_vm.prepend))])]:_vm._e()]),_vm._v(" "),_vm._t("default"),_vm._v(" "),_vm._t("append",[(_vm.append instanceof Array)?[_c('input-group-append',_vm._l((_vm.append),function(value){return _c('input-group-text',{attrs:{"text":value}})}))]:(_vm.append)?[_c('input-group-append',{attrs:{"text":""}},[_vm._v(_vm._s(_vm.append))])]:_vm._e()])],2)},staticRenderFns: [],

    name: 'input-group',

    components: {
        InputGroupText,
        InputGroupAppend,
        InputGroupPrepend
    },

    mixins: [
        HasSlots,
        Sizeable,
        Colorable,
        MergeClasses
    ],

    props: {

        append: [Array, Number, String],

        prepend: [Array, Number, String]

    }

};

var plugin$t = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      InputGroup: InputGroup,
      InputGroupAppend: InputGroupAppend,
      InputGroupPrepend: InputGroupPrepend,
      InputGroupText: InputGroupText
    });
  }
});

var LightSwitchField = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form-group',[_vm._t("label",[(_vm.label)?_c('form-label',{attrs:{"for":_vm.id},domProps:{"innerHTML":_vm._s(_vm.label)}}):_vm._e()]),_vm._v(" "),_c('div',{class:_vm.controlClasses,attrs:{"tabindex":"0"},on:{"click":function($event){_vm.toggle();},"keyup":[function($event){if(!('button' in $event)&&$event.keyCode!==32){ return null; }_vm.toggle();},function($event){if(!('button' in $event)&&$event.keyCode!==37){ return null; }_vm.toggle(_vm.offValue);},function($event){if(!('button' in $event)&&$event.keyCode!==39){ return null; }_vm.toggle(_vm.onValue);}]}},[_c('div',{staticClass:"light-switch-handle"}),_vm._v(" "),_c('div',{staticClass:"light-switch-container"},[_c('div',{staticClass:"light-switch-label on-value"}),_vm._v(" "),_c('div',{staticClass:"light-switch-label off-value"})])]),_vm._v(" "),_c('form-control',{staticClass:"d-none",attrs:{"name":_vm.name,"value":_vm.value,"id":_vm.id}}),_vm._v(" "),_vm._t("feedback",[(_vm.validFeedback)?_c('form-feedback',{attrs:{"valid":""},domProps:{"innerHTML":_vm._s(_vm.validFeedback)}}):_vm._e(),_vm._v(" "),(_vm.invalidFeedback)?_c('form-feedback',{attrs:{"invalid":""},domProps:{"innerHTML":_vm._s(_vm.invalidFeedback)}}):_vm._e()]),_vm._v(" "),_vm._t("help",[(_vm.helpText)?_c('help-text',{domProps:{"innerHTML":_vm._s(_vm.helpText)}}):_vm._e()])],2)},staticRenderFns: [],

    name: 'light-switch-field',

    components: {
        HelpText,
        FormGroup,
        FormLabel,
        FormControl: FormControl$1,
        FormFeedback
    },

    mixins: [
        FormControl
    ],

    props: {

        /**
         * The class name assigned to the control element
         *
         * @property String
         */
        defaultControlClass: {
            type: String,
            default: 'form-control light-switch'
        },

        /**
         * The class name assigned to the control element
         *
         * @property String
         */
        activeClass: {
            type: String,
            default: 'on'
        },

        /**
         * The class name assigned to the control element
         *
         * @property String
         */
        onValue: {
            default: 1
        },

        /**
         * The class name assigned to the control element
         *
         * @property String
         */
        offValue: {
            default: 0
        }

    },

    computed: {

        isActive: function() {
            return this.value === this.onValue;
        },

        controlClasses() {
            return [
                this.controlClass,
                this.controlSizeClass,
                (this.spacing || ''),
                (this.invalidFeedback ? 'is-invalid' : ''),
                (this.dragging ? 'is-dragging' : ''),
                (this.isActive ? 'is-active' : '')
            ].join(' ');
        }

    },

    methods: {

        getTransitionInMilliseconds() {
            const duration = getComputedStyle(this.$el.querySelector('.light-switch-handle')).transitionDuration;
            const numeric = parseFloat(duration, 10);
            const unit = duration.match(/m?s/);

            switch (unit[0]) {
                case 's':
                    return numeric * 1000;
                case 'ms':
                    return numeric;

            }

            throw new Error(`"${unit[0]}" is not a valid unit of measure. Unit must be "s" (seconds) or "ms" (milliseconds).`);
        },

        toggle(value) {
            this.$emit('input', !isUndefined(value) ? value : (this.isActive ? this.offValue : this.onValue));
        }

    },

    watch: {
        value() {
            this.dragging = true;

            setTimeout(() => {
                this.dragging = false;
            }, this.getTransitionInMilliseconds());
        }
    },

    data() {
        return {
            dragging: false
        };
    }

};

var plugin$u = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      LightSwitchField: LightSwitchField
    });
  }
});

var ListGroupItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.to)?_c('router-link',{class:_vm.classes,attrs:{"to":_vm.to},on:{"click":function($event){_vm.$emit('click', $event);}}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))]),_vm._v(" "),(_vm.badge)?_c('badge',_vm._b({},'badge',_vm.badgeOptions,false)):_vm._e()],2):(_vm.action)?_c('button',{class:_vm.classes,attrs:{"type":"button"},on:{"click":function($event){$event.preventDefault();_vm.$emit('click', $event);}}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))]),_vm._v(" "),(_vm.badge)?_c('badge',_vm._b({},'badge',_vm.badgeOptions,false)):_vm._e()],2):_c('div',{class:_vm.classes,on:{"click":function($event){_vm.$emit('click', $event);}}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))]),_vm._v(" "),(_vm.badge)?_c('badge',_vm._b({},'badge',_vm.badgeOptions,false)):_vm._e()],2)},staticRenderFns: [],

    components: {
        Badge
    },

    props: {

        /**
         * The badge label (if number or string) or object of options to pass to
         * the component.
         *
         * @property String|Object
         */
        badge: [Number, String, Object],

        /**
         * The list group item href attribute.
         *
         * @property String
         */
        href: String,

        /**
         * The list group item variant.
         *
         * @property String
         */
        variant: String,

        /**
         * Optionally pass the item as a object to use programmatically later.
         *
         * @property String
         */
        item: Object,

        /**
         * The list group item an action, or clickable item.
         *
         * @property Boolean
         */
        action: {
            type: Boolean,
            default: false
        },

        /**
         * The list group item active.
         *
         * @property Boolean
         */
        active: {
            type: Boolean,
            default: false
        },

        /**
         * The list group item disabled.
         *
         * @property Boolean
         */
        disabled: {
            type: Boolean,
            default: false
        },

        /**
         * The list item label.
         *
         * @property Object
         */
        label: {
            type: [Number, String],
            value: null
        },

        /**
         * The to attribute to be passed to a <router-link> component.
         *
         * @property String
         */
        to: [String, Object]

    },

    computed: {

        classes() {
            const classes = prefix({
                'action': this.action,
            }, 'list-group-item');

            classes['list-group-item'] = true;
            classes['active'] = this.active;
            classes['disabled'] = this.disabled;

            if(this.variant) {
                classes[prefix(this.variant, 'list-group-item')] = true;
            }

            return classes;
        },

        badgeOptions() {
            return isObject(this.badge) ? this.badge : {
                label: this.badge
            };
        }

    },

    watch: {

        active(value, prevValue) {
            this.$emit('toggle', value);
            this.$emit(!!value ? 'activate' : 'deactivate');
        }

    },


};

var ListGroup = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"list-group",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],

    components: {
        ListGroupItem
    },

    props: {

        /**
         * The list group appear flush (without some borders).
         *
         * @property Boolean
         */
        flush: {
            type: Boolean,
            default: false
        },

        /**
         * Can activate multiple list items
         *
         * @property Boolean
         */
        multiple: {
            type: Boolean,
            default: false
        }

    },

    computed: {
        classes() {
            return prefix({
                'flush': this.flush
            }, 'list-group');
        }
    },

    methods: {

        bindEventsToChildren() {
            each(this.$children, child => {
                child.$off('click', event => this.onClickItem(event, child));
                child.$on('click', event => this.onClickItem(event, child));
            });
        },

        /**
         * The callback function for the `click` event.
         *
         * @return void
         */
        onClick(event) {
            this.$emit('click', event);
        },

        /**
         * The callback function for the child `click` events.
         *
         * @return void
         */
        onClickItem(event, child) {
            this.$emit('item:click', event, child);
        },

    },

    mounted() {
        this.bindEventsToChildren();
    },

    updated() {
        this.bindEventsToChildren();
    }

};

var plugin$v = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      ListGroup: ListGroup
    });
  }
});

var NavbarBrand = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.component,{tag:"component",staticClass:"navbar-brand",class:{'h1': _vm.h1},attrs:{"to":_vm.to,"href":_vm.href || _vm.to ? '#' : null}},[(_vm.src)?_c('img',{staticClass:"d-inline-block align-center",attrs:{"src":_vm.src,"width":_vm.unit(_vm.width),"height":_vm.unit(_vm.height),"alt":_vm.alt}}):_vm._e(),_vm._v(" "),_vm._t("default")],2)},staticRenderFns: [],

    props: {

        /**
         * The img `alt` attribute. `src` must be define before this prop has
         * any affect.
         *
         * @property Object
         */
        alt: String,

        /**
         * The HTML wrapping tag.
         *
         * @property Object
         */
        tag: String,

        /**
         * The img `width` attribute. `src` must be define before this prop has
         * any affect.
         *
         * @property Object
         */
        width: [Number, String],

        /**
         * The img `height` attribute. `src` must be define before this prop has
         * any affect.
         *
         * @property Object
         */
        height: [Number, String],

        /**
         * The `to` attribute that is passed to the component.
         *
         * @property Object
         */
        to: [Object, String],

        /**
         * The `href` attribute that is passed to the component.
         *
         * @property Object
         */
        href: String,

        /**
         * Append the `h1` class to increase the display size
         *
         * @property Object
         */
        h1: Boolean,

        /**
         * If a `src` attribute is passed, then use it to add an img tag
         *
         * @property Object
         */
        src: String,

    },

    computed: {

        component() {
            return this.tag || (this.to ? 'router-link' : (this.href ? 'a' : 'span'));
        }

    },

    methods: {
        unit(value) {
            return unit(value);
        }
    }

};

var NavbarCollapse = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"navbar-collapse",class:{'collapse': _vm.collapse},attrs:{"id":"navbarCollapse"}},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'navbar-collapse',

    props: {

        collapse: {
            type: Boolean,
            default: true
        }

    }

};

var NavbarText = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"navbar-text"},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'navbar-text'

};

var NavbarTogglerIcon = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"navbar-toggler-icon"},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'navbar-toggler-icon'

};

var NavbarToggler = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"navbar-toggler",attrs:{"type":"button","data-toggle":"collapse","data-target":_vm.target,"aria-controls":_vm.target,"aria-expanded":_vm.expanded,"aria-label":_vm.label},on:{"click":_vm.onClick}},[_vm._t("default",[_c('navbar-toggler-icon')])],2)},staticRenderFns: [],

    name: 'navbar-toggler',

    components: {
        NavbarTogglerIcon
    },

    props: {

        expanded: Boolean,

        label: {
            type: String,
            default: 'Toggle navigation'
        },

        target: {
            type: String,
            default: '.navbar-collapse'
        }

    },

    methods: {

        onClick(event) {
            this.$emit('click', event);
        }

    }

};

var Navbar = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'navbar',

    components: {
        NavbarBrand,
        NavbarCollapse,
        NavbarText,
        NavbarToggler,
        NavbarTogglerIcon
    },

    mixins: [
        Variant,
        Colorable,
        MergeClasses
    ],

    props: {

        /**
         * Expand the navbar. If true, applies to all size, otherwise pass a string.
         *
         * @property Object
         */
        expand: {
            type: [Boolean, String],
            default: 'lg',
            validate(value) {
            }
        },

        /**
         * The should the navbar be fixed at the top.
         *
         * @property String
         */
        fixed: {
            type: [String, Boolean],
            validate(value) {
            }
        },

        /**
         * The should the navbar be stickied at the top.
         *
         * @property String
         */
        sticky: {
            type: [String, Boolean],
            validate(value) {
            }
        },

        /**
         * The variant attribute
         *
         * @property String
         */
        variant: {
            type: String,
            default: 'light',
            validate(value) {
                return ['light', 'dark'].indexOf(value) !== -1;
            }
        }

    },

    computed: {

        expandedClass() {
            if(isBoolean(this.expand)) {
                return this.expand;
            }

            return prefix(prefix(this.expand, 'expand'), 'navbar');
        },

        classes() {
            return this.mergeClasses(
                'navbar',
                prefix(this.sticky === true ? 'top' : this.sticky, 'sticky'),
                prefix(this.fixed === true ? 'top' : this.fixed, 'fixed'),
                this.expandedClass,
                this.variantClass,
                this.colorableClasses
            );
        }
    },

    data() {
        return {}
    }

};

var NavigationError = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"navigation-error fa-stack fa-md",attrs:{"title":_vm.error}},[_c('i',{staticClass:"fa fa-stack-2x fa-certificate"}),_vm._v(" "),_c('i',{staticClass:"fa fa-stack-1x fa-exclamation fa-inverse"})])},staticRenderFns: [],

    name: 'navigation-error',

    props: {

        error: {
            type: String,
            required: true
        }

    }

};

var NavigationLink = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.component,{tag:"component",class:_vm.classes,attrs:{"href":_vm.href || (_vm.to ? '#' : null),"to":_vm.to},on:{"click":function($event){_vm.$emit('click', $event);}}},[_vm._t("default"),_vm._v(" "),(_vm.error)?_c('navigation-error',{attrs:{"error":_vm.error}}):_vm._e()],2)},staticRenderFns: [],

    name: 'navigation-link',

    components: {
        NavigationError
    },

    props: {

        /**
         * Is the navigation item active
         *
         * @prop {Boolean}
         */
        active: Boolean,

        /**
         * Is the navigation item disabled
         *
         * @prop {Boolean}
         */
        disabled: Boolean,

        /**
         * The error string.
         *
         * @prop {String}
         */
        error: String,

        /**
         * The href attribute
         *
         * @prop {String}
         */
        href: String,

        /**
         * The component HTML tag
         *
         * @prop {String}
         */
        tag: String,

        /**
         * The to attribute, will be passed to router-link.
         *
         * @prop {String}
         */
        to: [Object, String],

        /**
         * Add the nav-item class to the link
         *
         * @prop {Boolean}
         */
        item: {
            type: Boolean,
            default: true
        }

    },

    computed: {

        component() {
            return this.tag || (this.to ? 'router-link' : 'a');
        },

        classes() {
            this.$nextTick(() => {
                if(!this.isItem) {
                    this.isItem = !this.$parent.$el.classList.contains('nav-item');
                }
            });

            return {
                'nav-link': !!this.href || !!this.to,
                'nav-item': !!this.item,
                'active': this.active,
                'disabled': this.disabled
            }
        }

    }

};

var NavigationItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.component,{tag:"component",class:_vm.classes,on:{"click":function($event){_vm.$emit('click', $event);}}},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'navigation-item',

    extends: NavigationLink,

    props: {

        /**
         * The HTML element
         *
         * @prop {String}
         */
        element: String,

        /**
         * Is the component a list element
         *
         * @prop {Boolean}
         */
        list: Boolean,

        /**
         * Add the nav-item class to the link
         *
         * @prop {Boolean}
         */
        item: {
            type: Boolean,
            default: true
        }

    },


    computed: {

        component() {
            if(this.element) {
                return this.element;
            }
            else if(this.href) {
                return 'a';
            }
            else if(this.list) {
                return 'li';
            }

            return 'div';
        }

    }

};

var Navigation = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"nav",class:_vm.classes,attrs:{"role":_vm.role}},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'navigation',

    components: {
        NavigationItem
    },

    mixins: [
        Colorable,
        MergeClasses
    ],

    props: {

        /**
         * Helper to add the justify-content-X class.
         *
         * @prop {Array}
         */
        align: String,

        /**
         * An array of buttons
         *
         * @prop {Array}
         */
        buttons: Array,

        /**
         * The navigation inside a card
         *
         * @prop {Boolean}
         */
        card: Boolean,

        /**
         * Justify nav items to fill the width equally (using flex).
         *
         * @prop {Array}
         */
        fill: Boolean,

        /**
         * Add `nav-justified` class to the component.
         *
         * @prop {Array}
         */
        justified: Boolean,

        /**
         * Display items as pill shapes
         *
         * @prop {Array}
         */
        pills: Boolean,

        /**
         * Display items as tab shapes
         *
         * @prop {Array}
         */
        tabs: Boolean,

        /**
         * Display the buttons vertically
         *
         * @prop {Boolean}
         */
        vertical: Boolean,

        /**
         * The role attribute
         *
         * @prop {String}
         */
        role: String

    },

    computed: {

        classes() {
            this.$nextTick(() => {
                if(!this.isCard) {
                    this.isCard = this.$parent.$el.classList.contains('card-header');
                }
            });

            return this.mergeClasses(
                prefix(this.align, 'justify-content'),
                this.colorableClasses, {
                    'card-header-tabs': this.isCard && this.tabs,
                    'card-header-pills': this.isCard && this.pills,
                    'nav-justified': this.justified,
                    'nav-fill': this.fill,
                    'nav-pills': this.pills,
                    'nav-tabs': this.tabs,
                    'flex-column': this.vertical
                }
            );
        }

    },

    data() {
        return {
            isCard: this.card
        };
    }

};

var NavigationDropdown = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('navigation-item',{staticClass:"dropdown"},[_vm._t("toggle-button",[_c('navigation-link',{staticClass:"dropdown-toggle",attrs:{"href":"#","data-toggle":"dropdown","role":"button","aria-haspopup":"true","aria-expanded":_vm.isDropdownShowing},on:{"blur":_vm.onBlur},nativeOn:{"click":function($event){$event.preventDefault();_vm.toggle();}}},[_vm._v(" "+_vm._s(_vm.label)+" ")])]),_vm._v(" "),_vm._t("dropdown-menu",[_c('dropdown-menu',{attrs:{"id":_vm.id,"items":_vm.items,"align":_vm.align,"show":_vm.isDropdownShowing},on:{"update:show":function($event){_vm.isDropdownShowing=$event;},"item:click":_vm.onItemClick}},[_vm._t("default")],2)])],2)},staticRenderFns: [],

    name: 'navigation-dropdown',

    extends: BtnDropdown,

    components: {
        BtnDropdown,
        DropdownMenu,
        NavigationItem,
        NavigationLink
    }

};

var plugin$w = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Navigation: Navigation,
      NavigationError: NavigationError,
      NavigationItem: NavigationItem,
      NavigationLink: NavigationLink,
      NavigationDropdown: NavigationDropdown
    });
  }
});

var NavbarNav = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"navbar-nav",class:_vm.classes,attrs:{"role":_vm.role}},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'navbar-nav',

    components: {
        Navigation
    }

};

var plugin$x = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Navbar: Navbar,
      NavbarBrand: NavbarBrand,
      NavbarCollapse: NavbarCollapse,
      NavbarNav: NavbarNav,
      NavbarText: NavbarText,
      NavbarToggler: NavbarToggler,
      NavbarTogglerIcon: NavbarTogglerIcon
    });
  }
});

var Pagination = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{attrs:{"aria-label":"Page navigation example"}},[_c('ul',{staticClass:"pagination",class:_vm.classes},[_c('li',{staticClass:"page-item",class:{'disabled': _vm.currentPage === 1}},[_c('a',{staticClass:"page-link",attrs:{"href":"#","aria-label":"Previous"},on:{"click":function($event){$event.preventDefault();_vm.prev($event);}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("«")])])]),_vm._v(" "),_vm._l((_vm.pages),function(item){return _c('li',{staticClass:"page-item",class:{'active': item.page === _vm.currentPage, 'disabled': !!item.divider},attrs:{"data-page":item.page}},[_vm._t("default",[(item.divider)?_c('a',{staticClass:"page-link"},[_vm._v("…")]):_c('a',{staticClass:"page-link",class:item.class,attrs:{"href":"#","data-label":item.label},on:{"click":function($event){$event.preventDefault();_vm.paginate(item.page, $event);}}},[(item.label)?_c('span',{attrs:{"aria-hidden":"true"},domProps:{"innerHTML":_vm._s(item.label)}}):_vm._e(),_vm._v(" "),(item.page)?_c('span',{attrs:{"aria-hidden":"true"},domProps:{"innerHTML":_vm._s(item.page)}}):_vm._e()])],{item:item})],2)}),_vm._v(" "),_c('li',{staticClass:"page-item",class:{'disabled': _vm.currentPage >= _vm.totalPages}},[_c('a',{staticClass:"page-link",attrs:{"href":"#","aria-label":"Next"},on:{"click":function($event){$event.preventDefault();_vm.next($event);}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("»")])])])],2)])},staticRenderFns: [],

    name: 'pagination',

    props: {
        /**
         * The alignment of the pagination component.
         *
         * @prop String
         */
        align: {
            type: String,
            validate: value => {
                return ['start', 'end', 'center'].indexOf(value) !== -1;
            }
        },

        /**
         * The page on which the paginator should start.
         *
         * @prop String
         */
        page: {
            type: Number,
            default: 1
        },

        /**
         * The total number of pages in the paginator.
         *
         * @prop String
         */
        totalPages: {
            type: Number,
            default: 1
        },

        /**
         * The number of pages to show when the total number of pages is
         * greater than the number of pages that should be shown.
         *
         * @prop String
         */
        showPages: {
            type: Number,
            default: 6
        }
        
    },

    methods: {

        next(event) {
            this.paginate(this.currentPage >= this.totalPages ? this.currentPage : this.currentPage + 1, event);
        },

        prev(event) {
            this.paginate(this.currentPage <= 1 ? this.currentPage : this.currentPage - 1, event);
        },

        paginate(page, event) {
            if(event.currentTarget.parentNode.classList.contains('disabled')) {
                return;
            }

			this.setActivePage(page);

            this.$emit('paginate', page, event);
        },

		setActivePage(page) {
			if(this.currentPage !== page) {
				this.currentPage = page;
			}
		},

        generate() {
            const pages = [];
            const showPages = this.showPages % 2 ? this.showPages + 1: this.showPages;

            let startPage = (this.currentPage >= showPages) ? this.currentPage - (showPages / 2) : 1;
            const startOffset = showPages + startPage;
            const endPage = (this.totalPages < startOffset) ? this.totalPages : startOffset;
            const diff = startPage - endPage + showPages;

            startPage -= (startPage - diff > 0) ? diff : 0;

            if (startPage > 1) {
                pages.push({page: 1});
            }

            if(startPage > 2) {
                pages.push({divider: true});
            }

            for(let i = startPage; i < endPage; i++) {
                pages.push({page: i});
            }

            if (endPage <= this.totalPages) {
                if(this.totalPages - 1 > endPage) {
                    pages.push({divider: true});
                }

                pages.push({page: this.totalPages});
            }

            return pages;
        }

    },

    computed: {

        pages() {
            return this.generate();
        },

        classes() {
            const classes = {};

            classes['justify-content-' + this.align] = true;

            return classes;
        }

    },

    data() {
        return  {
            currentPage: this.page
        };
    }

};

var plugin$y = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Pagination: Pagination
    });
  }
});

const CUSTOM_SELECT_PREFIX = 'custom-select-';

var SelectField = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form-group',[_vm._t("label",[(_vm.label)?_c('form-label',{attrs:{"for":_vm.id},domProps:{"innerHTML":_vm._s(_vm.label)}}):_vm._e()]),_vm._v(" "),_vm._t("control",[_c('select',{class:_vm.mergeClasses(_vm.controlClasses, _vm.colorableClasses),attrs:{"id":_vm.id,"name":_vm.name,"required":_vm.required,"disabled":_vm.disabled || _vm.readonly,"readonly":_vm.readonly,"pattern":_vm.pattern},domProps:{"value":_vm.value},on:{"input":function($event){_vm.$emit('input', $event.target.value);}}},[_vm._t("default")],2)]),_vm._v(" "),_vm._t("help",[(_vm.helpText)?_c('help-text',{domProps:{"innerHTML":_vm._s(_vm.helpText)}}):_vm._e()]),_vm._v(" "),_vm._t("feedback",[(_vm.validFeedback)?_c('form-feedback',{attrs:{"valid":""},domProps:{"innerHTML":_vm._s(_vm.validFeedback)}}):_vm._e(),_vm._v(" "),(_vm.invalidFeedback)?_c('form-feedback',{attrs:{"invalid":""},domProps:{"innerHTML":_vm._s(_vm.invalidFeedback)}}):_vm._e()])],2)},staticRenderFns: [],

    name: 'select-field',

    components: {
        HelpText,
        FormGroup,
        FormLabel,
        FormFeedback
    },

    extends: FormControl,

    mixins: [
        Colorable,
        FormControl,
        MergeClasses
    ],

    props: {

        /**
         * Add `custom-select` to the form control if true.
         *
         * @property String
         */
        custom: Boolean

    },

    computed: {

        controlClass() {
            const controlClass = this.custom ? 'custom-select' : this.defaultControlClass;
            return this.plaintext ? `${controlClass}-plaintext` : controlClass;
        },

        customSelectClasses() {
            return [
                CUSTOM_SELECT_PREFIX.replace(/\-$/, '') + (this.plaintext ? '-plaintext' : ''),
                this.customSelectSizeClass,
                (this.spacing || '')
            ].join(' ');
        }
    }

};

var plugin$z = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      SelectField: SelectField
    });
  }
});

var Slides = {

    name: 'slides',

    props: {

        /**
         * The active slide index or key.
         *
         * @type {String|Number}
         */

        active: {
            type: [String, Number],
            default: 0
        }

    },

    watch: {

        active(value, oldValue) {
            this.lastSlide = oldValue;
            this.currentSlide = value;
        }

    },

    methods: {

        /**
         * Get the HTML nodes from the default slots (exluding children without tags).
         *
         * @return {Array}
         */
        slides() {
            return this.$slots.default
                .filter((vnode, i) => {
                    return !!vnode.tag;
                })
                .map((vnode, i) => {
                    if(!vnode.key || !vnode.data && !vnode.data.key) {
                        vnode.data = extend(vnode.data, {
                            key: vnode.key = i
                        });
                    }

                    return vnode;
                });
        },

        /**
         * Get a slide by index.
         *
         * @return {Array}
         */
        slide(index) {
            return this.findSlideByKey(index) || this.findSlideByIndex(index) || this.findSlideByIndex(0);
        },

        /**
         * Find a slide by a given key or return null if non found.
         *
         * @param  {Number|String} key
         * @return {VNode|null}
         */
        findSlideByKey(key) {
            return first(this.slides().filter((vnode, i) => {
                if(vnode.key === key) {
                    return vnode;
                }
                else if(vnode.data && vnode.data.key === key) {
                    return vnode;
                }

                return null;
            }))
        },

        /**
         * Find a slide by a given index or return null if non found.
         *
         * @param  {Number|String} key
         * @return {VNode|null}
         */
        findSlideByIndex(index) {
            return this.slides()[index] || null;
        },

        /**
         * Get the slide index for a give slide object or key
         *
         * @param  {Number|String} slide
         * @return {VNode|null}
         */
        getSlideIndex(slide) {
            const key = !isUndefined(slide.data) ? slide.data.key : slide.key || slide;

            return findIndex(this.slides(), (vnode, i) => {
                if(slide === vnode) {
                    return true;
                }
                else if(vnode.data && vnode.data.key === key) {
                    return true;
                }
                else if(vnode.key && vnode.key === key) {
                    return true;
                }
                else if(i === slide) {
                    return true;
                }

                return false;
            });
        }

    },

    data() {
        return {
            lastSlide: null,
            currentSlide: this.active
        }
    },

    render(h) {
        return this.slide(this.currentSlide);
    }

};

var SlideDeckControls = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"slide-deck-controls"},_vm._l((_vm.slides),function(slide){return _c('a',{staticClass:"slide-deck-control-icon",class:{'is-active': (slide.data ? slide.data.key : slide.key) === _vm.active},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.onClick($event, slide);}}},[_c('i',{staticClass:"fa fa-circle"})])}))},staticRenderFns: [],

    name: 'slide-deck-controls',

    props: {

        /**
         * The slide key or index that should show.
         *
         * @type {Number}
         */
        active: {
            type: [String, Number],
            default: 0
        },

        /**
         * An array of slide vnodes
         *
         * @type {Number}
         */
        slides: {
            type: Array,
            required: true
        }

    },

    methods: {

        onClick(event, slide) {
            this.$emit('click', event, slide);
        }

    },

    computed: {

    },

    data() {
        return {}
    }

};

var SlideDeck = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"slide-deck",class:{'slide-deck-flex': _vm.center}},[_c('div',{ref:"content",staticClass:"slide-deck-content",style:({width: _vm.width, height: _vm.height})},[_c('keep-alive',[_c('transition',{attrs:{"name":`slide-${_vm.direction}`},on:{"after-enter":_vm.onSlideAfterEnter,"before-enter":_vm.onSlideBeforeEnter,"enter":_vm.onSlideEnter,"after-leave":_vm.onSlideAfterLeave,"before-leave":_vm.onSlideBeforeLeave,"leave":_vm.onSlideLeave}},[_c('slides',{key:_vm.currentSlide,ref:"slides",attrs:{"active":_vm.currentSlide}},[_vm._t("default")],2)],1)],1)],1),_vm._v(" "),_vm._t("controls",[(_vm.controls)?_c('slide-deck-controls',{ref:"controls",attrs:{"slides":_vm.slides(),"active":_vm.currentSlide},on:{"click":_vm.onClickControl}}):_vm._e()])],2)},staticRenderFns: [],

    name: 'slide-deck',

    components: {
        Slides,
        SlideDeckControls
    },

    props: {

        /**
         * The slide key or index that should show.
         *
         * @type {Number}
         */
        active: {
            type: [String, Number],
            default: 0
        },

        /**
         * Center the slide-deck.
         *
         * @type Boolean
         */
        center: {
            type: Boolean,
            default: true
        },

        /**
         * Show the slide-deck controls to change the slide.
         *
         * @type Boolean
         */
        controls: Boolean,

        /**
         * Flex the content within the popover.
         *
         * @type Boolean
         */
        flex: {
            type: Boolean,
            default: true
        },

        /**
         * Give a selector or Element to use apply a hidden overflow. If false,
         * no overflow will be applied. Defaults to the slide deck's container.
         *
         * @type {String|Element|Boolean}
         */
        overflow: {
            type: [Object, String, Element, Boolean],
            default: true
        },

        /**
         * The mode determines how the popover content will flex based on the
         * varying heights of the slides.
         *
         * @type Boolean
         */
        resizeMode: {
            type: [Function, Boolean, String],
            default: 'auto',
            validate(value) {
                return ['auto', 'initial', 'inherit'].indexOf(value) !== 1;
            }
        }

    },

    watch: {

        active(value, oldValue) {
            this.lastSlide = oldValue;
            this.currentSlide = value;
        },

        currentSlide(value, oldValue) {
            this.direction = this.$refs.slides.getSlideIndex(oldValue) > this.$refs.slides.getSlideIndex(value) ? 'backward' : 'forward';
        }

    },

    methods: {

        resize(el) {
            if(isFunction$1(this.resizeMode)) {
                this.resizeMode.call(this, el || this.$el);
            }
            else {
                const style = getComputedStyle(el);

                if(!el.style.width) {
                    el.width = el.style.width = `calc(${style.width} + ${style.marginLeft} + ${style.marginRight})`;
                }

                if(!el.style.height) {
                    el.height = el.style.height = `calc(${style.height} + ${style.marginTop} + ${style.marginBottom})`;
                }
            }
        },

        slide(index) {
            return this.$refs.slides ? this.$refs.slides.slide(index || this.active) : null;
        },

        slides() {
            return this.$refs.slides ? this.$refs.slides.slides() : [];
        },

        onClickControl(event, vnode) {
            this.currentSlide = vnode.data ? vnode.data.key : vnode.key;
        },

        onSlideAfterEnter(el) {
            if(el.width) {
                el.width = el.style.width = null;
            }

            if(el.height) {
                el.height = el.style.height = null;
            }

            this.width = null;
            this.height = null;
            this.$emit(
                'after-enter', this.$refs.slides.slide(this.currentSlide), this.$refs.slides.slide(this.lastSlide)
            );
        },

        onSlideBeforeEnter(el) {
            this.$emit(
                'before-enter', this.$refs.slides.slide(this.currentSlide), this.$refs.slides.slide(this.lastSlide)
            );
        },

        onSlideEnter(el, done) {
            this.resize(el);
            this.width = el.style.width;
            this.height = el.style.height;

            transition(el).then(delay => {
                this.$nextTick(done);
            });

            this.$emit(
                'enter', this.$refs.slides.slide(this.currentSlide), this.$refs.slides.slide(this.lastSlide)
            );
        },

        onSlideAfterLeave(el) {
            if(el.width) {
                el.width = el.style.width = null;
            }

            if(el.height) {
                el.height = el.style.height = null;
            }

            this.$nextTick(() => {
                this.$emit(
                    'after-leave', this.$refs.slides.slide(this.lastSlide), this.$refs.slides.slide(this.currentSlide)
                );
            });
        },

        onSlideBeforeLeave(el) {
            this.resize(el);
            this.$emit(
                'before-leave', this.$refs.slides.slide(this.lastSlide), this.$refs.slides.slide(this.currentSlide)
            );
        },

        onSlideLeave(el, done) {
            transition(el).then(delay => {
                this.$nextTick(done);
            });

            this.$emit(
                'leave', this.$refs.slides.slide(this.lastSlide), this.$refs.slides.slide(this.currentSlide)
            );
        }

    },

    computed: {

        overflowElement() {
            if(this.overflow === true) {
                return this.$el;
            }
            else if(this.overflow instanceof Element) {
                return this.overflow;
            }
            else if(this.overflow && this.overflow.elm) {
                return this.overflow.elm;
            }
            else if(this.overflow) {
                return document.querySelector(this.overflow)
            }

            return null;
        },

        nodes() {
            return this.$slots.default;
        }

    },

    mounted() {
        if(this.overflowElement) {
            this.overflowElement.style.overflow = 'hidden';
        }
    },

    data() {
        return {
            height: null,
            width: null,
            lastSlide: null,
            currentSlide: this.active,
            direction: 'forward'
        }
    }

};

var plugin$A = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Slides: Slides,
      SlideDeck: SlideDeck
    });
  }
});

var TableViewHeader = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('th',{attrs:{"scope":"col"}},[(_vm.id && _vm.request)?[_c('a',{staticClass:"sort",attrs:{"href":"#","data-id":_vm.id},on:{"click":function($event){$event.preventDefault();_vm.$emit('order', _vm.id);}}},[(!_vm.$slots.default)?[_vm._v(" "+_vm._s(_vm.label || _vm.name || _vm.id)+" ")]:_vm._e(),_vm._v(" "),_vm._t("default")],2),_vm._v(" "),(_vm.request.params.order === _vm.id && _vm.request.params.sort === 'asc')?_c('i',{staticClass:"sort-icon fa fa-sort-asc"}):_vm._e(),_vm._v(" "),(_vm.request.params.order === _vm.id && _vm.request.params.sort === 'desc')?_c('i',{staticClass:"sort-icon fa fa-sort-desc"}):_vm._e()]:[(!_vm.$slots.default)?[_vm._v(" "+_vm._s(_vm.label || _vm.name || _vm.id)+" ")]:_vm._e(),_vm._v(" "),_vm._t("default")]],2)},staticRenderFns: [],

    name: 'table-view-header',

    props: {

        id: [Number, String],

        label: [Number, String],

        name: [Number, String],

        request: Object

    }

};

var DataTable = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{staticClass:"table",class:{'table-hover': _vm.hover && !_vm.loading && _vm.data.length}},[_c('thead',{attrs:{"slot":"thead"},slot:"thead"},[(_vm.columns.length || _vm.$slots.columns)?_c('tr',{attrs:{"slot":"columns"},slot:"columns"},_vm._l((_vm.tableColumns),function(column,key){return _c('table-view-header',_vm._g(_vm._b({key:key,attrs:{"request":_vm.request},on:{"order":id => _vm.$emit('order', id)}},'table-view-header',column.props || column,false),column.events))})):_vm._e()]),_vm._v(" "),_c('tbody',[(_vm.loading)?_c('tr',[_c('td',{staticClass:"position-relative",style:({'height': _vm.height(_vm.minHeight)}),attrs:{"colspan":_vm.tableColumns.length}},[_c('activity-indicator',{attrs:{"center":true}})],1)]):(!_vm.data.length)?_c('tr',[_c('td',{staticClass:"position-relative",attrs:{"colspan":_vm.tableColumns.length}},[_c('alert',{staticClass:"my-3",attrs:{"variant":"warning"}},[_c('i',{staticClass:"fa fa-warning"}),_vm._v(" There are no results found. ")])],1)]):_vm._t("default",_vm._l((_vm.data),function(row,i){return _c('tr',_vm._l((_vm.tableColumns),function(column){return _c('td',{domProps:{"innerHTML":_vm._s(row[column.id] || row[column.name])}})}))}),{data:_vm.data,columns:_vm.tableColumns})],2),_vm._v(" "),_vm._t("tfoot",[(_vm.paginate && _vm.response)?_c('tfoot',[_c('td',{staticClass:"table-view-footer",attrs:{"colspan":_vm.tableColumns.length || 1}},[_vm._t("pagination",[_c('pagination',{attrs:{"align":"center","page":_vm.response.current_page,"total-pages":_vm.response.last_page},on:{"paginate":function($event){_vm.$emit('paginate');}}})])],2)]):_vm._e()])],2)},staticRenderFns: [],

    components: {
        Alert,
        Pagination,
        TableViewHeader,
        ActivityIndicator
    },

    props: {

        // (array) An array of table column
        // [{id: 'database_id', name: 'Database id', width: '20%'}]
        columns: {
            type: Array,
            default: () => { return []; }
        },

        data: {
            type: Array,
            required: true
        },

        // (string) Add table-hover to the table element
        hover: {
            type: Boolean,
            default: true
        },

        loading: Boolean,

        // (integer) The minimum height of the row when loading data
        minHeight: {
            type: Number,
            default: 400
        },

        // (bool) Should show the pagination for this table
        paginate: {
            type: Boolean,
            default: true
        }

    },

    methods: {

        height(min) {
            const elements = [
                // this.$el.querySelector('thead'),
                this.$el.querySelector('tbody')
            ];

            let height = 0;

            each(elements, el => {
                height += el.getBoundingClientRect().height;
            });

            return unit(Math.max(min, height));
        }

    },

    computed: {
        tableColumns() {
            let columns = this.columns;

            if(!columns || !columns.length) {
                columns = Object.keys(this.data[0]);
            }

            return columns.map(column => {
                return isObject(column) ? column : {
                    name: column
                };
            });
        }
    }

};

var Transformer =
/*#__PURE__*/
function () {
  /**
   * Initialize the transformer instance using an HTTP response object.
   *
   * @param data object
   * @return void
   */
  function Transformer(response) {
    _classCallCheck(this, Transformer);

    if (!isObject(this.$originalResponse = response)) {
      throw new Error('The transformer must be instantiated with a response object.');
    }

    if (!isArray(this.$required = this.required()) || !this.$required.length) {
      throw new Error('A transformer must have at least one required property.');
    }

    this.$transformedResponse = this.transform(response);
    this.validate();
    this.initialize();
  }
  /**
   * A method to override to perform logic to finished initializing.
   *
   * @return void
   */


  _createClass(Transformer, [{
    key: "initialize",
    value: function initialize() {} //

    /**
     * Define an array of required properties with at least one value.
     *
     * @return void
     */

  }, {
    key: "required",
    value: function required() {} //

    /**
     * Tranform the Response object
     *
     * @property String
     */

  }, {
    key: "transform",
    value: function transform(response) {
      return response.data;
    }
    /**
     * Get the tranformed response
     *
     * @property String
     */

  }, {
    key: "response",
    value: function response() {
      return this.$transformedResponse;
    }
    /**
     * Validate the tranformed response.
     *
     * @return void
     */

  }, {
    key: "validate",
    value: function validate() {
      var _this = this;

      if (!isObject(this.$transformedResponse)) {
        throw new Error('The transformed response must be an object.');
      }

      each(this.$required, function (key) {
        if (!(key in _this.$transformedResponse)) {
          throw new Error("\"".concat(key, "\" is a required property and does not exist in the tranformed response."));
        }
      });
    }
  }]);

  return Transformer;
}();

var TableViewTransformer =
/*#__PURE__*/
function (_Transformer) {
  _inherits(TableViewTransformer, _Transformer);

  function TableViewTransformer() {
    _classCallCheck(this, TableViewTransformer);

    return _possibleConstructorReturn(this, _getPrototypeOf(TableViewTransformer).apply(this, arguments));
  }

  _createClass(TableViewTransformer, [{
    key: "required",
    value: function required() {
      return [// The end of the count of the paginated list.
      'to', // The start of the count of the paginated list.
      'from', // The total number of items (not just included in the pagination)
      'total', // The number of items per page
      'per_page', // The last page number (or total pages)
      'last_page', // The current page number
      'current_page', // The actual response data to appear in the table
      'data'];
    }
  }, {
    key: "data",
    value: function data() {
      return this.$transformedResponse.data;
    }
  }, {
    key: "initialize",
    value: function initialize() {
      if (!isArray(this.data())) {
        throw new Error('The data property must be an array.');
      }
    }
  }]);

  return TableViewTransformer;
}(Transformer);

var TableView = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"table-view"},[(_vm.heading || _vm.description || _vm.$slots.buttons)?_c('div',{staticClass:"d-flex justify-content-between align-items-center"},[_vm._t("heading",[(_vm.heading)?_c('h2',{domProps:{"innerHTML":_vm._s(_vm.heading)}}):_vm._e()]),_vm._v(" "),_vm._t("description",[(_vm.description)?_c('p',{domProps:{"innerHTML":_vm._s(_vm.description)}}):_vm._e()]),_vm._v(" "),(_vm.$slots.buttons)?_c('div',{staticClass:"ml-auto my-3"},[_vm._t("buttons")],2):_vm._e()],2):_vm._e(),_vm._v(" "),(_vm.card)?_c('card',[_c('data-table',{attrs:{"columns":_vm.columns,"data":_vm.data,"hover":_vm.hover,"loading":_vm.loading,"min-height":_vm.minHeight,"paginate":_vm.paginate},on:{"paginate":_vm.onPaginate,"order":id => _vm.orderBy(id)}},[_vm._t("default",null,{data:_vm.data,columns:_vm.columns})],2)],1):_c('data-table',{attrs:{"columns":_vm.columns,"data":_vm.data,"hover":_vm.hover,"loading":_vm.loading,"min-height":_vm.minHeight,"paginate":_vm.paginate},on:{"paginate":_vm.onPaginate,"order":id => _vm.orderBy(id)}},[_vm._t("default",null,{data:_vm.data,columns:_vm.columns})],2)],1)},staticRenderFns: [],
    name: 'table-view',

    mixins: [Proxy$1],

    components: {
        Card,
        DataTable,
        TableViewHeader
    },

    props: {

        // (boolean) Show the table in a card.
        card: Boolean,

        // (string) A relative or absolute endpoint URL used to fetch data
        url: {
            type: String,
            required: true
        },

        // (integer) The starting page of the table
        page: {
            type: Number,
            default: 1
        },

        // (integer) The total number of results per page
        limit: {
            type: Number,
            default: 20
        },

        // (string) The column used to order the data
        order: String,

        // (string) The sort direction (asc|desc)
        sort: {
            type: String,
            validate: (value) => {
                return ['asc', 'desc'].indexOf(value) !== -1;
            }
        },

        // (integer) The minimum height of the row when loading data
        minHeight: {
            type: Number,
            default: 400
        },

        // (array) An array of button objects
        // [{href: 'test-123', label: 'Test 123'}]
        buttons: {
            type: Array,
            default: () => { return []; }
        },

        // (array) An array of table column
        // [{id: 'database_id', name: 'Database id', width: '20%'}]
        columns: {
            type: Array,
            default: () => { return []; }
        },

        // (string) The table heading
        heading: String,

        // (string) Add table-hover to the table element
        hover: {
            type: Boolean,
            default: true
        },

        // (string) The table description
        description: String,

        // (bool) Should show the pagination for this table
        paginate: {
            type: Boolean,
            default: true
        },

        // (object) The HTTP response transformer instance
        transformer: {
            type: Object,
            validate: (value) => {
                return value instanceof TableViewTransformer;
            }
        }
    },

    methods: {

        orderBy(order) {
            const defaultSort = 'desc';
            const currentSort = this.getRequestParam('sort');
            const currentOrder = this.getRequestParam('order');

            this.addRequestParam('order', order);
            this.addRequestParam('sort',
                currentOrder !== order || !currentSort ? defaultSort : (
                    currentSort === defaultSort ? 'asc' : null
                )
            );

            this.fetch();
        },

        getRequestHeader(key, value) {
            return this.request.headers[key] || value
        },

        addRequestHeader(key, value) {
            if(!this.request.headers) {
                this.request.headers = {};
            }

            this.request.headers[key] = value;
        },

        getRequestParam(key, value) {
            return this.request.params[key] || value
        },

        addRequestParam(key, value) {
            if(!this.request.params) {
                this.request.params = {};
            }

            this.request.params[key] = value;
        },

        fetch() {
            this.loading = true;

            return Request.get(this.url, this.request).then(response => {
                const transformer = this.transformer || new TableViewTransformer(response);
                this.response = transformer.response();
                this.data = transformer.data();
                this.loading = false;
            }, errors => {
                this.loading = false;
            });
        },

        onPaginate(page, event) {
            if(!this.request.params) {
                this.request.params = {};
            }

            this.request.params.page = page;
            this.fetch();
        }
    },

    data() {
        return {
            // (array) The dataset for the table
            data: this.$attrs.data || [],

            // (bool) Is the table currently loading data
            loading: false,

            // (null|object) The response object
            response: null,

            // (object) The HTTP request object
            request: extend({
                headers: {},
                params: {
                    page: this.page,
                    limit: this.limit,
                    order: this.order,
                    sort: this.sort
                }
            }, this.$attrs.request)
        };
    },

    mounted() {
        this.fetch();
    },

    beforeDestroy() {
        this.$off();
    }
};

var plugin$B = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      TableView: TableView
    });
  }
});

var TextareaField = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form-group',[_vm._t("label",[(_vm.label || _vm.hasDefaultSlot)?_c('form-label',{attrs:{"for":_vm.id}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2):_vm._e()]),_vm._v(" "),_vm._t("control",[_c('div',{staticClass:"position-relative"},[_c('textarea',{directives:[{name:"bind-events",rawName:"v-bind-events",value:(_vm.bindEvents),expression:"bindEvents"}],class:_vm.mergeClasses(_vm.controlClasses, _vm.colorableClasses),attrs:{"id":_vm.id,"rows":_vm.rows,"errors":_vm.errors,"pattern":_vm.pattern,"readonly":_vm.readonly,"required":_vm.required,"maxlength":_vm.maxlength,"placeholder":_vm.placeholder,"disabled":_vm.disabled || _vm.readonly},domProps:{"value":_vm.value},on:{"input":function($event){_vm.$emit('input', $event.target.value);}}}),_vm._v(" "),_vm._t("feedback",[(_vm.validFeedback)?_c('form-feedback',{attrs:{"valid":""},domProps:{"innerHTML":_vm._s(_vm.validFeedback)}}):_vm._e(),_vm._v(" "),(_vm.invalidFeedback)?_c('form-feedback',{attrs:{"invalid":""},domProps:{"innerHTML":_vm._s(_vm.invalidFeedback)}}):_vm._e()])],2)]),_vm._v(" "),_vm._t("help",[(_vm.helpText)?_c('help-text',{domProps:{"innerHTML":_vm._s(_vm.helpText)}}):_vm._e()])],2)},staticRenderFns: [],

    name: 'textarea-field',

    components: {
        HelpText,
        FormGroup,
        FormLabel,
        FormFeedback
    },

    mixins: [
        Colorable,
        FormControl,
        MergeClasses
    ],

    props: {
        /**
         * The type attribute
         *
         * @property String
         */
        type: {
            type: String,
            default: 'text'
        },

        /**
         * The rows attribute
         *
         * @property String
         */
        rows: [Number, String]
    }

};

var plugin$C = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      TextareaField: TextareaField
    });
  }
});

var ThumbnailListItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"thumbnail-list-item",style:({height: _vm.unit(_vm.height), width: _vm.unit(_vm.width), minHeight: _vm.unit(_vm.minHeight), maxHeight: _vm.unit(_vm.maxHeight), minWidth: _vm.unit(_vm.minWidth), maxWidth: _vm.unit(_vm.maxWidth)})},[(_vm.src)?_c('img',{class:{'img-fluid': _vm.fluid},attrs:{"src":_vm.src,"alt":_vm.alt}}):_vm._e(),_vm._v(" "),_vm._t("default")],2)},staticRenderFns: [],

    props: {

        alt: String,

        src: String,

        width: [String, Number],

        height: [String, Number],

        minHeight: [String, Number],

        maxHeight: [String, Number],

        minWidth: [String, Number],

        maxWidth: [String, Number],

        fluid: {
            type: Boolean,
            default: true
        }

    },

    methods: {

        unit: unit

    }

};

var ThumbnailList = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"thumbnail-list",class:_vm.classes},[_vm._l((_vm.images),function(image){return (!!_vm.images)?_c('thumbnail-list-item',{attrs:{"src":image,"width":_vm.width}}):_vm._e()}),_vm._v(" "),_vm._t("default")],2)},staticRenderFns: [],

    components: {
        ThumbnailListItem
    },

    props: {

        fill: Boolean,

        flex: Boolean,

        noFlex: Boolean,

        grid: Boolean,

        wrap: Boolean,

        images: Array,

        width: {
            type: [String, Number],
            default: 75
        }

    },

    computed: {

        classes() {
            return {
                'thumbnail-list-fill': this.fill,
                'thumbnail-list-flex': this.flex,
                'thumbnail-list-noflex': this.noFlex,
                'thumbnail-list-grid': this.grid,
                'thumbnail-list-wrap': this.wrap
            }
        }

    }

};

var plugin$D = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      ThumbnailList: ThumbnailList
    });
  }
});

var UploadField = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form-group',{staticClass:"upload-field",class:{'enable-dropzone': _vm.dropzone, 'enable-multiple': _vm.multiple}},[_c('dropzone',{on:{"drop":_vm.onDrop}},[(_vm.multiple && (!_vm.maxUploads || _vm.maxUploads > _vm.value.length) || !_vm.multiple && !_vm.value)?_c('file-field',{attrs:{"name":_vm.name,"label":_vm.label,"placeholder":_vm.placeholder,"help-text":_vm.helpText,"multiple":_vm.multiple,"errors":_vm.errors},on:{"change":_vm.onChange}}):_vm._e(),_vm._v(" "),(_vm.files && _vm.files.length)?_c('thumbnail-list',{staticClass:"mt-4",attrs:{"wrap":""}},_vm._l((_vm.files),function(file,key){return _c('thumbnail-list-item',{key:file.lastModified + '-' + file.lastModifiedDate + '-' + file.size + '-' + file.type + '-' + file.name,class:{'uploading': !!_vm.progressBars[key]},attrs:{"width":_vm.width,"min-width":_vm.minWidth,"max-width":_vm.maxWidth,"height":_vm.height,"min-height":_vm.minHeight,"max-height":_vm.maxHeight}},[_c('file-preview',{attrs:{"file":file,"progress":_vm.progressBars[key] || 0},on:{"loaded":_vm.onLoadedPreview,"close":function($event){_vm.removeFile(file);}}}),_vm._v(" "),_vm._t("default",null,{file:file}),_vm._v(" "),_c('thumbnail-list-item')],2)})):_vm._e(),_vm._v(" "),(_vm.showDropElement)?_c('div',{staticClass:"upload-field-dropzone",style:({'min-height': _vm.dropzoneMinHeight}),on:{"drop":function($event){$event.preventDefault();return _vm.onDrop($event)}}},[_c('i',{staticClass:"fa fa-cloud-upload"}),_vm._v(" "),_c('div',[_vm._v("Drag and drop files to upload")])]):_vm._e()],1)],1)},staticRenderFns: [],

    name: 'upload-field',

    mixins: [FormControl],

    components: {
        Dropzone,
        FormGroup,
        FileField,
        FilePreview,
        ThumbnailList,
        ThumbnailListItem
    },

    model: {
        prop: 'value',
        event: 'change'
    },

    props: {

        /**
         * Can user upload multiple files
         *
         * @property String
         */
        multiple: Boolean,

        /**
         * The maximum number of files that a user can upload
         *
         * @property String
         */
        maxUploads: Number,

        /**
         * The height attribute for the control element
         *
         * @property String
         */
        height: [Number, String],

        /**
         * The minimum height attribute for the control element
         *
         * @property String
         */
        minHeight: [Number, String],

        /**
         * The maximum height attribute for the control element
         *
         * @property String
         */
        maxHeight: [Number, String],

        /**
         * The width attribute for the control element
         *
         * @property String
         */
        width: [Number, String],

        /**
         * The minimum width attribute for the control element
         *
         * @property String
         */
        minWidth: [Number, String],

        /**
         * The maximum width attribute for the control element
         *
         * @property String
         */
        maxWidth: [Number, String],

        /**
         * Can user drag/drop files into browser to upload them.
         *
         * @property String
         */
        dropzoneMinHeight: [Number, String],

        /**
         * Is the user dragging a file over the dropzone
         *
         * @property String
         */
        dragging: {
            type: [String, Boolean],
            default() {
                return undefined;
            }
        },

        /**
         * Can user drag/drop files into browser to upload them.
         *
         * @property String
         */
        dropzone: {
            type: Boolean,
            default: true
        },

        /**
         * The data attribute
         *
         * @property File|FileList|Array
         */
        value: {
            type: [Object, File, FileList, Array],
            default() {
                return !this.multiple ? null : [];
            }
        },

        /**
         * An HTTP Model used to send the request
         *
         * @type Model
         */
        model: [Model, Function],

        request: Object

    },

    methods: {

        removeFile(data) {

            if(this.multiple) {
                const files = isArray(this.value) ? this.value.slice(0) : [];

                if(data instanceof File) {
                    if(data.request && data.request.cancel) {
                        data.request.cancel();
                    }

                    remove(files, {
                        name: data.name,
                        size: data.size,
                        lastModified: data.lastModified
                    });
                }
                else {
                    remove(files, data);
                }

                this.$emit('change', files);
            }
            else {
                if(data.request && data.request.cancel) {
                    data.request.cancel();
                }

                this.$emit('change', null);
            }
        },

        addFile(file, subject) {
            const data = {
                name: file.name,
                lastModified: file.lastModified,
                lastModifiedDate: file.lastModifiedDate,
                size: file.size,
                type: file.type
            };

            if(this.multiple) {
                const files = subject || (isArray(this.value) ? this.value.slice(0) : []);

                if((!this.maxUploads || this.maxUploads > files.length) && files.indexOf(data) === -1) {
                    files.push(file);

                    this.$emit('change', files);
                    this.upload(file);
                }
            }
            else {
                this.$emit('change', file);
                this.upload(file);
            }
        },

        addFiles(files) {
            const subject = isArray(this.value) ? this.value.slice(0) : [];

            each(files, file => {
                this.addFile(file, subject);
            });

            event.target.value = null;
        },

        /**
         * Upload function that handles auto-uploading fields asynchronously.
         * This is designed to work with REST API's and replace the file Object
         * with the RESTful returned by the server.
         *
         * @type Object
         */
        upload(file) {
            // Stop upload silently if no model is defined.
            if(!this.model) {
                return Promise.resolve();
            }

            let model = this.model;

            if(!(this.model instanceof Model)) {
                model = new this.model;
            }

            model.set(this.name, file);

            this.$emit('uploading', model);
            this.$set(this.progressBars, this.multiple ? (this.value ? this.value.length : 0) : 0, 0);

            return model.save(null, extend({
                onUploadProgress: e => {
                    if(!file.index) {
                        file.index = this.files.indexOf(file);
                    }

                    if(!file.request) {
                        file.request = model.getRequest();
                    }

                    this.$set(this.progressBars, file.index, parseInt((e.loaded / e.total) * 100, 10));
                    this.$emit('progress', model, this.progressBars[file.index]);
                }
            }, this.request))
            .then(response => {
                this.$nextTick(() => {
                    this.$emit('upload', model);
                    this.progressBars[file.index] = false;
                });

                return response;
            });
        },

        /**
         * The `drop` event callback.
         *
         * @type Object
         */
        onDrop(event) {
            this.onChange(event.dataTransfer.files);
        },

        /**
         * The `change` event callback.
         *
         * @type Object
         */
        onChange(files) {
            if(files instanceof FileList) {
                this.addFiles(files);
            }
            else {
                this.addFile(files);
            }
        },

        /**
         * The `dragover` event callback.
         *
         * @type Object
         */
        onDragOver(event) {
            this.isDraggingInside = true;
            this.$emit('update:dragging', true);
            this.$emit('drag:over', event);
        },

        /**
         * The `dragover` event callback.
         *
         * @type Object
         */
        onDragEnter(event) {
            this.isDraggingInside = true;
            this.$emit('update:dragging', true);
            this.$emit('drag:enter', event);
        },

        /**
         * The `dragleave` event callback.
         *
         * @type Object
         */
        onDragLeave(event) {
            this.isDraggingInside = false;
            this.$emit('update:dragging', false);
            this.$emit('drag:leave', event);
        },

        /**
         * The `drop` event callback.
         *
         * @property String
         */
        onDrop(event) {
            this.isDraggingInside = false;
            this.addFiles(event.dataTransfer.files);
            this.$emit('update:dragging', false);
            this.$emit('drop', event);
        },

        /**
         * The `loaded` event callback.
         *
         * @type Object
         */
        onLoadedPreview(event) {
            this.$emit('loaded', event);
        }
    },

    computed: {

        files() {
            return this.multiple ? this.value : (this.value ? [this.value] : []);
        },

        showDropElement() {
            return !isUndefined(this.dragging) ? this.dragging : this.isDraggingInside
        }

    },

    data() {
        return {
            progressBars: {},
            isDraggingInside: false
        };
    }

};

var plugin$E = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      UploadField: UploadField
    });
  }
});

var WizardButtons = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"wizard-buttons"},[_c('btn-group',{ref:"left",staticClass:"wizard-buttons-left"},[_vm._t("buttons-left"),_vm._v(" "),_c('btn',{ref:"back",attrs:{"type":"button","variant":"secondary","disabled":_vm.backButton === false || (_vm.active === 0 && _vm.backButton !== true),"size":_vm.sizeableClass},on:{"click":_vm.onClickBack}},[_c('i',{staticClass:"fa fa-long-arrow-left"}),_vm._v(" Back ")])],2),_vm._v(" "),_c('btn-group',{ref:"right",staticClass:"wizard-buttons-right"},[_vm._t("buttons-right"),_vm._v(" "),(_vm.active === _vm.steps.length - 1)?_c('btn-activity',{ref:"finish",attrs:{"activity":_vm.activity,"size":_vm.sizeableClass,"disabled":_vm.finishButton === false,"type":"button","variant":"success"},on:{"click":_vm.onClickFinish}},[_vm._v(" Finish ")]):_vm._e(),_vm._v(" "),(_vm.active < _vm.steps.length - 1)?_c('btn-activity',{ref:"next",attrs:{"activity":_vm.activity,"size":_vm.sizeableClass,"disabled":_vm.nextButton === false,"type":"button","variant":"primary"},on:{"click":_vm.onClickNext}},[_vm._v(" Next "),_c('i',{staticClass:"fa fa-long-arrow-right"})]):_vm._e()],2)],1)},staticRenderFns: [],

    name: 'wizard-buttons',

    mixins: [
        Sizeable
    ],

    components: {
        Btn,
        BtnGroup,
        BtnActivity
    },

    props: {

        /**
         * The index or key of the active step.
         *
         * @type {String|Number}
         */
        active: {
            type: [String, Number],
            default: 0
        },

        /**
         * Show the activity indicator in the next or finish button.
         *
         * @type {Boolean}
         */
        activity: Boolean,

        /**
         * Show should the "Back" button.
         *
         * @type {Boolean}
         */
        backButton: Boolean,

        /**
         * Show should the "Finish" button.
         *
         * @type {Boolean}
         */
        finishButton: Boolean,

        /**
         * Show should the "Next" button.
         *
         * @type {Boolean}
         */
        nextButton: Boolean,

        /**
         * An array of steps passed from the parent.
         *
         * @type {Array}
         */
        steps: {
            type: Array,
            required: true
        }

    },

    computed: {

        /**
         * Override the class prefix with an empty string...
         * @return {String}
         */
        sizeableClassPrefix() {
            return '';
        }

    },

    methods: {

        onClickBack(event) {
            if(this.backButton !== false) {
                this.$emit('click:back', event);
            }
        },

        onClickFinish(event) {
            if(this.finishButton !== false) {
                this.$emit('click:finish', event);
            }
        },

        onClickNext(event) {
            if(this.nextButton !== false) {
                this.$emit('click:next', event);
            }
        }

    }

};

var WizardStep = {

    name: 'wizard-step',

    props: {

        /**
         * The parent wizard component instance.
         *
         * @type {String}
        wizard: {
            //required: true,
            type: Object
        },
        */

        /**
         * The step's label in the progress bar.
         *
         * @type {String}
         */
        label: String,

        /**
         * A predicate function to determine if the back button should show.
         * Can also be a boolean value.
         *
         * @type {Function|Boolean}
         */
        backButton: {
            type: [Function, Boolean],
            default() {
                return null
            }
        },

        /**
         * Validate if the data input for the step is valid. Required Boolean
         * or a predicate function.
         *
         * @type {Function|Boolean}
         */
        validate: {
            type: [Function, Boolean],
            default() {
                return true;
            }
        }

    },

    methods: {

        checkValidity(prop) {
            // Validate the property for the step first.
            if(isFunction$1(this[prop]) ? this[prop](this) === false : this[prop] === false) {
                return false
            }

            // Then validate the property of the wizard, this is the global validator
            if(this.$refs.wizard) {
                if( isFunction$1(this.$refs.wizard[prop]) ?
                    this.$refs.wizard[prop](this) === false :
                    this.$refs.wizard[prop] === false) {
                    return false;
                }
            }

            return true;
        },

        performValidityChecks() {
            if(this.$refs.wizard) {
                this.checkValidity('validate') ? this.enable() : this.disable();
                this.checkValidity('backButton') ? this.$refs.wizard.enableBackButton() : this.$refs.wizard.disableBackButton();
            }
        },

        disable() {
            if(this.$refs.wizard) {
                this.$refs.wizard.disableNextButton();
                this.$refs.wizard.disableFinishButton();
            }
        },

        enable() {
            if(this.$refs.wizard) {
                this.$refs.wizard.enableNextButton();
                this.$refs.wizard.enableFinishButton();
            }
        }

    },

    updated() {
        this.performValidityChecks();
    },

    mounted() {
        this.$nextTick(this.performValidityChecks);
    },

    render(h) {
        if(this.$slots.default.length !== 1) {
            throw new Error('The <wizard-slot> must contain a single parent DOM node.');
        }

        return this.$slots.default[0];
    }

};

var WizardError = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"wizard-error"},[(_vm.icon)?_c('div',{staticClass:"wizard-error-icon"},[_c('i',{class:_vm.icon})]):_vm._e(),_vm._v(" "),(_vm.title)?_c('h3',{staticClass:"wizard-error-title",domProps:{"innerHTML":_vm._s(_vm.title)}}):_vm._e(),_vm._v(" "),_vm._t("default"),_vm._v(" "),_c('div',{staticClass:"row justify-content-center"},[_c('div',{staticClass:"col-sm-6"},[(_vm.errors)?_c('div',{staticClass:"my-5"},[_c('ul',{staticClass:"mb-0 text-left"},_vm._l((_vm.errors),function(error,i){return _c('li',{key:i},[_vm._v(" "+_vm._s(error[0])+" ")])}))]):_vm._e(),_vm._v(" "),_c('btn',{attrs:{"size":"lg","variant":"danger","block":""},on:{"click":function($event){_vm.$emit('back');}}},[_c('i',{staticClass:"fa fa-long-arrow-left"}),_vm._v(" Go Back ")])],1)])],2)},staticRenderFns: [],

    name: 'wizard-error',

    extends: WizardStep,

    components: {
        Btn
    },

    props: {

        icon: {
            type: String,
            default: 'fa fa-3x fa-check'
        },

        title: {
            type: String,
            default: 'Error!'
        },

        errors: [Array, Object]

    }

};

var WizardHeader = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,{tag:"component",staticClass:"wizard-header",class:{'text-center': _vm.center}},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'wizard-header',

    props: {

        center: {
            type: Boolean,
            default: true
        },

        /**
         * The HTML tag
         *
         * @type {String}
         */
        tag: {
            type: String,
            default: 'h2'
        }

    }

};

var WizardProgress = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"wizard-progress"},_vm._l((_vm.steps),function(step,i){return _c('a',{staticClass:"wizard-step",class:{'active': i === _vm.active, 'disabled': i > _vm.highestStep, 'complete': i + 1 <= _vm.highestStep},style:({width: `${100 / _vm.steps.length}%`}),attrs:{"href":"#","data-step":i,"title":step.label || step.title},on:{"click":function($event){$event.preventDefault();_vm.onClick($event, step);}}},[(step.componentOptions && step.componentOptions.propsData.label)?_c('span',{staticClass:"wizard-step-label",domProps:{"innerHTML":_vm._s(step.componentOptions.propsData.label)}}):(step.componentOptions && step.componentOptions.propsData.title)?_c('span',{staticClass:"wizard-step-label",domProps:{"innerHTML":_vm._s(step.componentOptions.propsData.title)}}):_vm._e()])}))},staticRenderFns: [],

    name: 'wizard-progress',

    props: {

        /**
         * The index or key of the active step.
         *
         * @type {String|Number}
         */
        active: {
            type: [String, Number],
            default: 0
        },

        /**
         * The wizard highest available to the user.
         *
         * @type {Array}
         */
        highestStep: {
            type: Number,
            required: true,
        },

        /**
         * The wizard steps
         *
         * @type {Array}
         */
        steps: {
            type: Array,
            required: true
        }

    },

    methods: {

        onClick(event, step) {
            if(!event.target.classList.contains('disabled')) {
                this.$emit('click', event, step);
            }
        }

    },

    data() {
        return {
            isActive: false
        }
    }

};

var WizardSuccess = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"wizard-success"},[(_vm.icon)?_c('div',{staticClass:"wizard-success-icon"},[_c('i',{class:_vm.icon})]):_vm._e(),_vm._v(" "),(_vm.title)?_c('h3',{staticClass:"wizard-success-title",domProps:{"innerHTML":_vm._s(_vm.title)}}):_vm._e(),_vm._v(" "),_vm._t("default")],2)},staticRenderFns: [],

    name: 'wizard-success',

    extends: WizardStep,

    props: {

        icon: {
            type: String,
            default: 'fa fa-check'
        },

        title: {
            type: String,
            default: 'Success!'
        },

    }

};

var Wizard = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"wizard"},[(_vm.header && !_vm.isFinished)?_c('wizard-header',{ref:"header",domProps:{"innerHTML":_vm._s(_vm.header)}}):_vm._e(),_vm._v(" "),(!_vm.isFinished)?_c('wizard-progress',{ref:"progress",attrs:{"active":_vm.currentStep,"highest-step":_vm.highestStep,"steps":_vm.steps},on:{"click":_vm.onProgressClick}}):_vm._e(),_vm._v(" "),_c('div',{ref:"content",staticClass:"wizard-content"},[(!_vm.isFinished)?_vm._t("content"):_vm._e(),_vm._v(" "),(!_vm.isFinished)?_c('slide-deck',{ref:"slideDeck",attrs:{"active":_vm.currentStep,"resize-model":_vm.resizeMode},on:{"before-enter":_vm.onBeforeEnter,"enter":_vm.onEnter,"leave":_vm.onLeave}},[_vm._t("default")],2):(_vm.isFinished && !_vm.hasFailed)?_vm._t("success",[_c('wizard-success',{ref:"success"})]):(_vm.isFinished && _vm.hasFailed)?_vm._t("error",[_c('wizard-error',{ref:"error",attrs:{"errors":_vm.errors},on:{"back":_vm.onClickTest}})]):_vm._e()],2),_vm._v(" "),(!_vm.isFinished)?_vm._t("buttons",[_c('hr'),_vm._v(" "),_c('wizard-buttons',{ref:"buttons",attrs:{"size":"lg","steps":_vm.steps,"active":_vm.currentStep,"activity":_vm.activity,"back-button":!_vm.isBackButtonDisabled,"next-button":!_vm.isNextButtonDisabled,"finish-button":!_vm.isFinishButtonDisabled},on:{"click:back":_vm.onClickBack,"click:finish":_vm.onClickFinish,"click:next":_vm.onClickNext}})]):_vm._e()],2)},staticRenderFns: [],

    name: 'wizard',

    components: {
        SlideDeck,
        WizardButtons,
        WizardError,
        WizardHeader,
        WizardProgress,
        WizardSuccess
    },

    props: {

        /**
         * The index or key of the active step.
         *
         * @type {String|Number}
         */
        active: {
            type: [String, Number],
            default: 0
        },

        /**
         * The the index or key of the max completed step.
         *
         * @type {String|Number}
         */
        completed: [String, Number],

        /**
         * Show the activity indicator in the next or finish button.
         *
         * @type {Boolean}
         */
        activity: Boolean,

        /**
         * Show should the "Back" button.
         *
         * @type {Boolean}
         */
        backButton: {
            type: [Function, Boolean],
            default() {
                return this.currentStep > 0;
            }
        },

        /**
         * Show should the "Finish" button.
         *
         * @type {Boolean}
         */
        finishButton: {
            type: Boolean,
            default: true
        },

        /**
         * Pass a header as a string.
         *
         * @type {String}
         */
        header: String,

        /**
         * Show should the "Next" button.
         *
         * @type {Boolean}
         */
        nextButton: {
            type: Boolean,
            default: true
        },

        /**
         * The mode determines how the popover content will flex based on the
         * varying heights of the slides.
         *
         * @type Boolean
         */
        resizeMode: {
            type: [Function, Boolean, String],
            default: 'auto',
            validate(value) {
                return ['auto', 'initial', 'inherit'].indexOf(value) !== 1;
            }
        },

        /**
         * Validate if the data input for the step is valid. Required Boolean
         * or a predicate function.
         *
         * @type {Function|Boolean}
         */
        validate: {
            type: [Function, Boolean],
            default() {
                return true;
            }
        }

    },

    watch: {

        active() {
            this.currentStep = this.index();
        }

    },

    methods: {

        back() {
            this.$emit('update:step', this.currentStep = Math.max(this.currentStep - 1, 0));
        },

        disableButtons() {
            this.isBackButtonDisabled = true;
            this.isFinishButtonDisabled = true;
            this.isNextButtonDisabled = true;
        },

        disableBackButton() {
            this.isBackButtonDisabled = true;
        },

        disableFinishButton() {
            this.isFinishButtonDisabled = true;
        },

        disableNextButton() {
            this.isNextButtonDisabled = true;
        },

        emitBubbleEvent(key, ...args) {
            this.$refs.slideDeck.slide(this.currentStep).componentInstance.$emit.apply(
                this.$refs.slideDeck.slide(this.currentStep).componentInstance, args = [key].concat(args)
            );

            this.$emit.apply(this, args);
        },

        enableButtons() {
            this.isBackButtonDisabled = false;
            this.isFinishButtonDisabled = false;
            this.isNextButtonDisabled = false;
        },

        enableBackButton() {
            this.isBackButtonDisabled = false;
        },

        enableFinishButton() {
            this.isFinishButtonDisabled = false;
        },

        enableNextButton() {
            this.isNextButtonDisabled = false;
        },

        finish(status, errors = null) {
            this.errors = errors;
            this.hasFailed = status === false;
            this.isFinished = true;
        },

        index(key = null) {
            return Math.max(0, this.$slots.default.indexOf(
                find(this.$slots.default, ['key', key || this.active]) || this.$slots.default[key || this.active]
            ));
        },

        next() {
            this.$emit('update:step', this.currentStep = Math.min(this.currentStep + 1, this.$refs.slideDeck.slides().length - 1));
        },

        onBeforeEnter(slide, prev) {
            slide.context.$emit('before-enter', slide, prev);
            this.$emit('before-enter', slide, prev);
        },

        onClickTest(event) {
            this.isFinished = false;
        },

        onClickBack(event) {
            this.emitBubbleEvent('back', event);

            if(event.defaultPrevented !== true) {
                this.back();
            }
        },

        onClickFinish(event) {
            this.emitBubbleEvent('finish', event);

            if(event.defaultPrevented !== true) {
                this.finish(true);
            }
        },

        onClickNext(event) {
            this.emitBubbleEvent('next', event);

            if(event.defaultPrevented !== true) {
                this.next();
            }
        },

        onEnter(slide, prev) {
            this.highestStep = Math.max(this.highestStep, this.$refs.slideDeck.$refs.slides.getSlideIndex(slide));
            slide.componentInstance.$refs.wizard = this;
            slide.context.$emit('enter', slide, prev);
            this.$emit('enter', slide, prev);
        },

        onLeave(slide, prev) {
            slide.context.$emit('leave', slide, prev);
            this.$emit('leave', slide, prev);
        },

        onProgressClick(event, slide) {
            if(this.$refs.slideDeck) {
                this.currentStep = this.$refs.slideDeck.$refs.slides.getSlideIndex(slide);
            }
            else {
                this.isFinished = false;
                this.currentStep = this.index(slide.key);
            }
        }

    },

    mounted() {
        const slide = this.$refs.slideDeck.slide(this.currentStep);

        if(slide) {
            (slide.componentInstance || slide.context).$refs.wizard = this;
            (slide.componentInstance || slide.context).$emit('enter');
            this.$emit('enter', slide);
        }

        this.steps = this.$refs.slideDeck.slides();
    },

    data() {
        return {
            steps: [],
            errors: null,
            hasFailed: false,
            isFinished: false,
            currentStep: this.index(),
            highestStep: this.index(this.completed),
            isBackButtonDisabled: this.backButton === false,
            isNextButtonDisabled: this.nextButton === false,
            isFinishButtonDisabled: this.finishButton === false
        };
    }

};

var plugin$F = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Wizard: Wizard,
      WizardButtons: WizardButtons,
      WizardHeader: WizardHeader,
      WizardProgress: WizardProgress,
      WizardStep: WizardStep,
      WizardSuccess: WizardSuccess,
      WizardError: WizardError
    });
  }
});



var components$1 = /*#__PURE__*/Object.freeze({
    ActivityIndicator: ActivityIndicator,
    Alert: Alert,
    AlertClose: AlertClose,
    AlertHeading: AlertHeading,
    AlertLink: AlertLink,
    Badge: Badge,
    BaseForm: BaseForm,
    Breadcrumb: Breadcrumb,
    BreadcrumbItem: BreadcrumbItem,
    Btn: Btn,
    BtnActivity: BtnActivity,
    BtnFile: BtnFile,
    BtnGroup: BtnGroup,
    BtnGroupToggle: BtnGroupToggle,
    BtnToolbar: BtnToolbar,
    BtnDropdown: BtnDropdown,
    Card: Card,
    CardBody: CardBody,
    CardBtnGroup: CardBtnGroup,
    CardDeck: CardDeck,
    CardFooter: CardFooter,
    CardHeader: CardHeader,
    CardImg: CardImg,
    CardImgTop: CardImgTop,
    CardImgBottom: CardImgBottom,
    CardImgOverlay: CardImgOverlay,
    CardLink: CardLink,
    CardSubtitle: CardSubtitle,
    CardTitle: CardTitle,
    CheckboxField: CheckboxField,
    Container: Container,
    DropdownMenu: DropdownMenu,
    DropdownMenuItem: DropdownMenuItem,
    DropdownMenuHeader: DropdownMenuHeader,
    DropdownMenuDivider: DropdownMenuDivider,
    Dropzone: Dropzone,
    FileField: FileField,
    FilePreview: FilePreview,
    FormControl: FormControl$1,
    FormFeedback: FormFeedback,
    FormGroup: FormGroup,
    FormLabel: FormLabel,
    HelpText: HelpText,
    InfiniteScrolling: InfiniteScrolling,
    InputField: InputField,
    InputGroup: InputGroup,
    InputGroupAppend: InputGroupAppend,
    InputGroupPrepend: InputGroupPrepend,
    InputGroupText: InputGroupText,
    LightSwitchField: LightSwitchField,
    ListGroup: ListGroup,
    ListGroupItem: ListGroupItem,
    Navbar: Navbar,
    NavbarBrand: NavbarBrand,
    NavbarCollapse: NavbarCollapse,
    NavbarNav: NavbarNav,
    NavbarText: NavbarText,
    NavbarToggler: NavbarToggler,
    NavbarTogglerIcon: NavbarTogglerIcon,
    Modal: Modal,
    ModalBackdrop: ModalBackdrop,
    ModalBody: ModalBody,
    ModalContent: ModalContent,
    ModalDialog: ModalDialog,
    ModalFooter: ModalFooter,
    ModalHeader: ModalHeader,
    ModalTitle: ModalTitle,
    Navigation: Navigation,
    NavigationError: NavigationError,
    NavigationItem: NavigationItem,
    NavigationLink: NavigationLink,
    NavigationDropdown: NavigationDropdown,
    Overlay: Overlay,
    Pagination: Pagination,
    Popover: Popover,
    PopoverBody: PopoverBody,
    PopoverHeader: PopoverHeader,
    ProgressBar: ProgressBar,
    RadioField: RadioField,
    SelectField: SelectField,
    SlideDeck: SlideDeck,
    Slides: Slides,
    TableView: TableView,
    TextareaField: TextareaField,
    ThumbnailList: ThumbnailList,
    ThumbnailListItem: ThumbnailListItem,
    UploadField: UploadField,
    Wizard: Wizard,
    WizardButtons: WizardButtons,
    WizardHeader: WizardHeader,
    WizardProgress: WizardProgress,
    WizardStep: WizardStep,
    WizardSuccess: WizardSuccess
});

var STYLE_ATTRIBUTES = ['font', 'fontFamily', 'fontKerning', 'fontSize', 'fontStretch', 'fontStyle', 'fontVariant', 'fontVariantLigatures', 'fontVariantCaps', 'fontVariantNumeric', 'fontVariantEastAsian', 'fontWeight', 'lineHeight', 'letterSpacing', 'padding', 'margin', 'textAlign', 'textAlignLast', 'textDecoration', 'textDecorationLine', 'textDecorationStyle', 'textDecorationColor', 'textDecorationSkipInk', 'textDecorationPosition', 'textIndent', 'textRendering', 'textShadow', 'textSizeAdjust', 'textOverflow', 'textTransform', 'width', 'wordBreak', 'wordSpacing', 'wordWrap'];

function int(str) {
  if (typeof str === "number") {
    return str;
  } else if (!str || !str.replace) {
    return 0;
  }

  return parseInt(str.replace(/[^\d.]+/g, ''));
}

function input(div, el) {
  div.innerHTML = el.value.replace(/(?:\r\n|\r|\n)/g, '<br />');
}

function height(el) {
  return int(el.getBoundingClientRect().height);
}

function style(el, attr) {
  return window.getComputedStyle(el)[attr];
}

function resize(target, div, minHeight, maxHeight) {
  var dynamicHeight = Math.max(height(div) + int(style(div, 'lineHeight')), minHeight);
  target.style.height = (!maxHeight || dynamicHeight < maxHeight ? dynamicHeight : maxHeight) + 'px';
}

function mimic(el) {
  var div = document.createElement('div');
  var styles = window.getComputedStyle(el);

  for (var i in STYLE_ATTRIBUTES) {
    var key = STYLE_ATTRIBUTES[i];
    div.style[key] = styles[key];
  }

  div.style.position = 'absolute';
  div.style.bottom = '100%';
  div.style.zIndex = -1;
  div.style.visibility = 'hidden';
  return div;
}

function init(el, maxHeight) {
  var div = mimic(el);
  var minHeight = height(el);
  el.addEventListener('input', function (event) {
    input(div, event.target);
    resize(el, div, minHeight, maxHeight);
  });
  document.body.appendChild(div);
  input(div, el);
  resize(el, div, minHeight, maxHeight);
}

var Autogrow = {
  inserted: function inserted(el, binding, vnode) {
    if (el.tagName.toLowerCase() !== 'textarea') {
      el = el.querySelector('textarea');
    }

    if (!el) {
      throw new Error('A textarea is required for the v-autogrow directive.');
    }

    init(el, binding.value);
  }
};

function show(el, target, vnode) {
  target.classList.remove('collapse');
  target.classList.add('show');
  target.$collapsedHeight = getComputedStyle(target).height;
  target.classList.add('collapsing');
  vnode.context.$nextTick(function () {
    target.style.height = target.$collapsedHeight;
  });
  transition(target).then(function (delay) {
    target.style.height = null;
    target.classList.add('collapse');
    target.classList.remove('collapsing');
    el.classList.remove('collapsed');
  });
}

function hide(el, target, vnode) {
  target.style.height = target.$collapsedHeight;
  target.classList.add('collapsing');
  target.classList.remove('collapse');
  vnode.context.$nextTick(function () {
    target.style.height = 0;
  });
  transition(target).then(function (delay) {
    target.style.height = null;
    target.classList.add('collapse');
    target.classList.remove('show', 'collapsing');
    el.classList.add('collapsed');
  });
}

var Collapse = {
  inserted: function inserted(el, binding, vnode) {
    if (isUndefined(binding.value) || binding.value === true) {
      el.classList.add('collapsed');
      el.setAttribute('data-toggle', 'collapse');
      var target = el.getAttribute('data-target') || el.getAttribute('href');
      var elements = document.querySelectorAll(target);
      el.addEventListener('click', function (event) {
        elements.forEach(function (element) {
          if (!element.classList.contains('show')) {
            show(el, element, vnode);
          } else {
            hide(el, element, vnode);
          }
        });
        event.preventDefault();
      });
      elements.forEach(function (element) {
        /*
        if(!element.$collapsedHeight) {
            element.$collapsedHeight = getComputedStyle(element).height;
        }
        */
        if (!element.classList.contains('collapse')) {
          element.classList.add('collapse');
        }
      });
    }
  }
};

var Slug = {
  inserted: function inserted(el, binding, vnode) {
    var input = el.querySelector('input, textarea') || el;
    var value = get(vnode.context, binding.expression);
    var editable = !input.value;

    var update = function update(value) {
      if (editable) {
        input.value = kebabCase(value);
        input.dispatchEvent(new Event('input'));
      }
    };

    vnode.context.$watch(binding.expression, update);
    input.addEventListener('keyup', function (event) {
      input.value = kebabCase(event.target.value) + (event.target.value.match(/\s$/) ? ' ' : '');
    });
    input.addEventListener('input', function (event) {
      if (event instanceof InputEvent) {
        editable = !event.target.value;
      }
    });
    input.addEventListener('blur', function (event) {
      input.value = kebabCase(event.target.value || binding.expression.split('.').reduce(function (o, i) {
        return o[i];
      }, vnode.context));
      input.dispatchEvent(new Event('input'));
    });
    !input.value && update(value);
  }
};



var directives$1 = /*#__PURE__*/Object.freeze({
    Autogrow: Autogrow,
    Collapse: Collapse,
    Slug: Slug
});

function blob(url, progress) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';

    if (isFunction(progress)) {
      xhr.onprogress = function (e) {
        return progress(e, xhr);
      };
    }

    xhr.onerror = function (e) {
      return reject(e);
    };

    xhr.onabort = function (e) {
      return reject(e);
    };

    xhr.onload = function (e) {
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(e);
      }
    };

    xhr.send();
  });
}

function elapsed(milliseconds, callback, elapsedCallback) {
  var hasElapsed = false;

  function start() {
    return setTimeout(function () {
      hasElapsed = true;

      if (isFunction$1(elapsedCallback)) {
        elapsedCallback();
      }
    }, milliseconds);
  }

  function stop() {
    clearTimeout(interval);
  }

  var interval = start(),
      promise = new Promise(function (resolve, reject) {
    function resolver(resolver, response) {
      return resolver(response || hasElapsed);
    }
    callback(wrap(resolve, resolver), wrap(reject, resolver));
  });
  return promise.finally(stop, stop);
}

var easings = {
  linear: function linear(t) {
    return t;
  },
  easeInQuad: function easeInQuad(t) {
    return t * t;
  },
  easeOutQuad: function easeOutQuad(t) {
    return t * (2 - t);
  },
  easeInOutQuad: function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  easeInCubic: function easeInCubic(t) {
    return t * t * t;
  },
  easeOutCubic: function easeOutCubic(t) {
    return --t * t * t + 1;
  },
  easeInOutCubic: function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
  easeInQuart: function easeInQuart(t) {
    return t * t * t * t;
  },
  easeOutQuart: function easeOutQuart(t) {
    return 1 - --t * t * t * t;
  },
  easeInOutQuart: function easeInOutQuart(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
  },
  easeInQuint: function easeInQuint(t) {
    return t * t * t * t * t;
  },
  easeOutQuint: function easeOutQuint(t) {
    return 1 + --t * t * t * t * t;
  },
  easeInOutQuint: function easeInOutQuint(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
  }
};
function scrollTo(destination) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
  var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'easeInQuad';
  var viewport = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (!viewport) {
    viewport = document.querySelector('body');
  }

  var viewportBounds = viewport.getBoundingClientRect();
  var destinationBounds = destination.getBoundingClientRect();
  var destinationOffsetToScroll = Math.ceil(destinationBounds.top + document.documentElement.scrollTop);

  function isScrollBottom() {
    return document.documentElement.scrollTop >= Math.floor(viewportBounds.height) - window.innerHeight;
  }

  return new Promise(function (resolve, reject) {
    var startTime = performance.now();
    var isStartingBottom = isScrollBottom();

    function scroll() {
      var start = document.documentElement.scrollTop;
      var time = Math.min(1, (performance.now() - startTime) / duration);
      var timeFunction = easings[easing](time);
      window.scroll(0, Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start));

      if (document.documentElement.scrollTop === destinationOffsetToScroll || isScrollBottom() && !isStartingBottom) {
        resolve();
        return;
      }

      requestAnimationFrame(scroll);
    }

    scroll();
  });
}

var CALLBACKS = {};

function id$1(callback) {
  return findIndex(CALLBACKS, function (compare) {
    return callback.toString() == compare.toString();
  });
}

function restart(callback, milliseconds) {
  stop(id$1(callback));
  start(callback, milliseconds);
}

function stop(id) {
  clearTimeout(id);
  delete CALLBACKS[id];
}

function start(callback, milliseconds) {
  return CALLBACKS[setTimeout(callback, milliseconds)] = callback;
}

function wait(milliseconds, callback) {
  return new Promise(function (resolve, reject) {
    function resolver(resolver, response) {
      return resolver(response);
    }
    restart(wrap(callback, function (callback) {
      return callback(wrap(resolve, resolver), wrap(reject, resolver));
    }), milliseconds);
  });
  return promise.finally(stop, stop);
}
/*
import { wrap } from '../Functions';
import { isFunction } from '../Functions';

export default function elapsed(delay, callback, elapsedCallback) {
    let hasElapsed = false;

    function start() {
        return setInterval(() => {
            hasElapsed = true;

            if(isFunction(elapsedCallback)) {
                elapsedCallback();
            }
        }, delay)
    }

    function stop() {
        clearInterval(interval);
    }

    const interval = start(), promise = new Promise((resolve, reject) => {
        function resolver(resolver, response) {
            return resolver(response || hasElapsed);
        };

        callback(wrap(resolve, resolver), wrap(reject, resolver));
    });

    return promise.finally(stop, stop);
}

 */

var main = VueInstaller.use({
  install: function install(Vue) {
    VueInstaller.plugins(Vue, plugins$1);
    VueInstaller.filters(Vue, filters);
    VueInstaller.directives(Vue, directives$1);
    VueInstaller.components(Vue, components$1);
  }
});

export default main;
export { Model, Request, Response, Colorable, FormControl as FormControlMixin, HasSlots, MergeClasses, Proxy$1 as Proxy, Screenreaders, Sizeable, Triggerable, Variant, blob, elapsed, instantiate, prefix, readFile, script, scrollTo, transition, unit, uuid, wait, modal$1 as modal, overlay, popover, ActivityIndicator, Alert, AlertClose, AlertHeading, AlertLink, Badge, BaseForm, Breadcrumb, BreadcrumbItem, Btn, BtnActivity, BtnFile, BtnGroup, BtnGroupToggle, BtnToolbar, BtnDropdown, Card, CardBody, CardBtnGroup, CardDeck, CardFooter, CardHeader, CardImg, CardImgTop, CardImgBottom, CardImgOverlay, CardLink, CardSubtitle, CardTitle, CheckboxField, Container, DropdownMenu, DropdownMenuItem, DropdownMenuHeader, DropdownMenuDivider, Dropzone, FileField, FilePreview, FormControl$1 as FormControl, FormFeedback, FormGroup, FormLabel, HelpText, InfiniteScrolling, InputField, InputGroup, InputGroupAppend, InputGroupPrepend, InputGroupText, LightSwitchField, ListGroup, ListGroupItem, Navbar, NavbarBrand, NavbarCollapse, NavbarNav, NavbarText, NavbarToggler, NavbarTogglerIcon, Modal, ModalBackdrop, ModalBody, ModalContent, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Navigation, NavigationError, NavigationItem, NavigationLink, NavigationDropdown, Overlay, Pagination, Popover, PopoverBody, PopoverHeader, ProgressBar, RadioField, SelectField, SlideDeck, Slides, TableView, TextareaField, ThumbnailList, ThumbnailListItem, UploadField, Wizard, WizardButtons, WizardHeader, WizardProgress, WizardStep, WizardSuccess, Autogrow, Collapse, Slug, index as DateFilter, index as MomentFilter };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnVlLWludGVyZmFjZS5lcy5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL0ZpbHRlcnMvRGF0ZS9EYXRlRmlsdGVyLmpzIiwiLi4vc3JjL0ZpbHRlcnMvRGF0ZS9Nb21lbnRGaWx0ZXIuanMiLCIuLi9zcmMvRmlsdGVycy9EYXRlL2luZGV4LmpzIiwiLi4vc3JjL0hlbHBlcnMvRnVuY3Rpb25zL2NhbWVsQ2FzZS5qcyIsIi4uL3NyYy9IZWxwZXJzL0Z1bmN0aW9ucy9leHRlbmQuanMiLCIuLi9zcmMvSGVscGVycy9GdW5jdGlvbnMvaXNOdWxsLmpzIiwiLi4vc3JjL0hlbHBlcnMvRnVuY3Rpb25zL2lzQXJyYXkuanMiLCIuLi9zcmMvSGVscGVycy9GdW5jdGlvbnMvaXNPYmplY3QuanMiLCIuLi9zcmMvSGVscGVycy9GdW5jdGlvbnMvZGVlcEV4dGVuZC5qcyIsIi4uL3NyYy9IZWxwZXJzL0Z1bmN0aW9ucy9pc051bWJlci5qcyIsIi4uL3NyYy9IZWxwZXJzL0Z1bmN0aW9ucy9pc051bWVyaWMuanMiLCIuLi9zcmMvSGVscGVycy9GdW5jdGlvbnMva2V5LmpzIiwiLi4vc3JjL0hlbHBlcnMvRnVuY3Rpb25zL2VhY2guanMiLCIuLi9zcmMvSGVscGVycy9GdW5jdGlvbnMvZmlyc3QuanMiLCIuLi9zcmMvSGVscGVycy9GdW5jdGlvbnMvaXNVbmRlZmluZWQuanMiLCIuLi9zcmMvSGVscGVycy9GdW5jdGlvbnMvbWF0Y2hlcy5qcyIsIi4uL3NyYy9IZWxwZXJzL0Z1bmN0aW9ucy9pc1N0cmluZy5qcyIsIi4uL3NyYy9IZWxwZXJzL0Z1bmN0aW9ucy9nZXQuanMiLCIuLi9zcmMvSGVscGVycy9GdW5jdGlvbnMvcHJvcGVydHkuanMiLCIuLi9zcmMvSGVscGVycy9GdW5jdGlvbnMvaXNGdW5jdGlvbi5qcyIsIi4uL3NyYy9IZWxwZXJzL0Z1bmN0aW9ucy9tYXRjaGVzUHJvcGVydHkuanMiLCIuLi9zcmMvSGVscGVycy9GdW5jdGlvbnMvcHJlZGljYXRlLmpzIiwiLi4vc3JjL0hlbHBlcnMvRnVuY3Rpb25zL2ZpbmQuanMiLCIuLi9zcmMvSGVscGVycy9GdW5jdGlvbnMvZmluZEluZGV4LmpzIiwiLi4vc3JjL0hlbHBlcnMvRnVuY3Rpb25zL2lzQm9vbGVhbi5qcyIsIi4uL3NyYy9IZWxwZXJzL0Z1bmN0aW9ucy9rZWJhYkNhc2UuanMiLCIuLi9zcmMvSGVscGVycy9GdW5jdGlvbnMvbWFwS2V5cy5qcyIsIi4uL3NyYy9IZWxwZXJzL0Z1bmN0aW9ucy9uZWdhdGUuanMiLCIuLi9zcmMvSGVscGVycy9GdW5jdGlvbnMvcGlja0J5LmpzIiwiLi4vc3JjL0hlbHBlcnMvRnVuY3Rpb25zL29taXRCeS5qcyIsIi4uL3NyYy9IZWxwZXJzL0Z1bmN0aW9ucy9yZW1vdmUuanMiLCIuLi9zcmMvSGVscGVycy9GdW5jdGlvbnMvd3JhcC5qcyIsIi4uL3NyYy9IZWxwZXJzL1ByZWZpeC9QcmVmaXguanMiLCIuLi9zcmMvTWl4aW5zL1ZhcmlhbnQvVmFyaWFudC5qcyIsIi4uL3NyYy9NaXhpbnMvU2l6ZWFibGUvU2l6ZWFibGUuanMiLCIuLi9zcmMvTWl4aW5zL0NvbG9yYWJsZS9Db2xvcmFibGUuanMiLCIuLi9zcmMvSGVscGVycy9UcmFuc2l0aW9uL1RyYW5zaXRpb24uanMiLCIuLi9zcmMvTWl4aW5zL01lcmdlQ2xhc3Nlcy9NZXJnZUNsYXNzZXMuanMiLCIuLi9zcmMvQ29tcG9uZW50cy9CdG4vQnRuLnZ1ZSIsIi4uL3NyYy9IZWxwZXJzL1NjcmlwdC9TY3JpcHQuanMiLCIuLi9zcmMvSGVscGVycy9WdWVJbnN0YWxsZXIvVnVlSW5zdGFsbGVyLmpzIiwiLi4vc3JjL0NvbXBvbmVudHMvQnRuL2luZGV4LmpzIiwiLi4vc3JjL0NvbXBvbmVudHMvTW9kYWwvTW9kYWxCb2R5LnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL01vZGFsL01vZGFsRGlhbG9nLnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL01vZGFsL01vZGFsVGl0bGUudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvTW9kYWwvTW9kYWxIZWFkZXIudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvTW9kYWwvTW9kYWxGb290ZXIudnVlIiwiLi4vc3JjL0hlbHBlcnMvVW5pdC9Vbml0LmpzIiwiLi4vc3JjL0NvbXBvbmVudHMvQWN0aXZpdHlJbmRpY2F0b3IvVHlwZXMvQmFzZVR5cGUudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvQWN0aXZpdHlJbmRpY2F0b3IvVHlwZXMvRG90cy52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9BY3Rpdml0eUluZGljYXRvci9UeXBlcy9TcGlubmVyLnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL0FjdGl2aXR5SW5kaWNhdG9yL0FjdGl2aXR5SW5kaWNhdG9yLnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL0FjdGl2aXR5SW5kaWNhdG9yL2luZGV4LmpzIiwiLi4vc3JjL0NvbXBvbmVudHMvQnRuQWN0aXZpdHkvQnRuQWN0aXZpdHkudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvQnRuQWN0aXZpdHkvaW5kZXguanMiLCIuLi9zcmMvQ29tcG9uZW50cy9Nb2RhbC9Nb2RhbENvbnRlbnQudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvTW9kYWwvTW9kYWxCYWNrZHJvcC52dWUiLCIuLi9zcmMvTWl4aW5zL1RyaWdnZXJhYmxlL1RyaWdnZXJhYmxlLmpzIiwiLi4vc3JjL0NvbXBvbmVudHMvTW9kYWwvTW9kYWwudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvTW9kYWwvaW5kZXguanMiLCIuLi9zcmMvSGVscGVycy9JbnN0YW50aWF0ZS9JbnN0YW50aWF0ZS5qcyIsIi4uL3NyYy9QbHVnaW5zL01vZGFsL01vZGFsLmpzIiwiLi4vc3JjL0NvbXBvbmVudHMvT3ZlcmxheS9PdmVybGF5Qm9keS52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9Db250YWluZXIvQ29udGFpbmVyLnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL0NvbnRhaW5lci9pbmRleC5qcyIsIi4uL3NyYy9Db21wb25lbnRzL092ZXJsYXkvT3ZlcmxheUNvbnRlbnQudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvT3ZlcmxheS9PdmVybGF5LnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL092ZXJsYXkvaW5kZXguanMiLCIuLi9zcmMvUGx1Z2lucy9PdmVybGF5L092ZXJsYXkuanMiLCIuLi9zcmMvQ29tcG9uZW50cy9Qb3BvdmVyL1BvcG92ZXIudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvUG9wb3Zlci9Qb3BvdmVyQm9keS52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9Qb3BvdmVyL1BvcG92ZXJIZWFkZXIudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvUG9wb3Zlci9pbmRleC5qcyIsIi4uL3NyYy9QbHVnaW5zL1BvcG92ZXIvUG9wb3Zlci5qcyIsIi4uL3NyYy9Db21wb25lbnRzL0FsZXJ0L0FsZXJ0Q2xvc2UudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvQWxlcnQvQWxlcnRIZWFkaW5nLnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL1Byb2dyZXNzQmFyL1Byb2dyZXNzQmFyLnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL1Byb2dyZXNzQmFyL2luZGV4LmpzIiwiLi4vc3JjL0NvbXBvbmVudHMvQWxlcnQvQWxlcnQudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvQWxlcnQvQWxlcnRMaW5rLnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL0FsZXJ0L2luZGV4LmpzIiwiLi4vc3JjL0NvbXBvbmVudHMvQmFkZ2UvQmFkZ2UudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvQmFkZ2UvaW5kZXguanMiLCIuLi9zcmMvU3VwcG9ydC9CYXNlQ2xhc3MuanMiLCIuLi9zcmMvSHR0cC9SZXF1ZXN0L1Jlc3BvbnNlLmpzIiwiLi4vc3JjL0h0dHAvUmVxdWVzdC9SZXF1ZXN0LmpzIiwiLi4vc3JjL0h0dHAvTW9kZWwvTW9kZWwuanMiLCIuLi9zcmMvQ29tcG9uZW50cy9CYXNlRm9ybS9CYXNlRm9ybS52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9CYXNlRm9ybS9pbmRleC5qcyIsIi4uL3NyYy9Db21wb25lbnRzL0JyZWFkY3J1bWIvQnJlYWRjcnVtYkl0ZW0udnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvQnJlYWRjcnVtYi9CcmVhZGNydW1iLnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL0JyZWFkY3J1bWIvaW5kZXguanMiLCIuLi9zcmMvTWl4aW5zL1NjcmVlbnJlYWRlcnMvU2NyZWVucmVhZGVycy5qcyIsIi4uL3NyYy9Db21wb25lbnRzL0hlbHBUZXh0L0hlbHBUZXh0LnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL0hlbHBUZXh0L2luZGV4LmpzIiwiLi4vc3JjL0NvbXBvbmVudHMvRm9ybUdyb3VwL0Zvcm1Hcm91cC52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9Gb3JtR3JvdXAvaW5kZXguanMiLCIuLi9zcmMvQ29tcG9uZW50cy9Gb3JtTGFiZWwvRm9ybUxhYmVsLnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL0Zvcm1MYWJlbC9pbmRleC5qcyIsIi4uL3NyYy9Db21wb25lbnRzL0Zvcm1GZWVkYmFjay9Gb3JtRmVlZGJhY2sudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvRm9ybUZlZWRiYWNrL2luZGV4LmpzIiwiLi4vc3JjL01peGlucy9Gb3JtQ29udHJvbC9Gb3JtQ29udHJvbC5qcyIsIi4uL3NyYy9Db21wb25lbnRzL0lucHV0RmllbGQvSW5wdXRGaWVsZC52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9JbnB1dEZpZWxkL2luZGV4LmpzIiwiLi4vc3JjL0NvbXBvbmVudHMvRmlsZUZpZWxkL0ZpbGVGaWVsZC52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9GaWxlRmllbGQvaW5kZXguanMiLCIuLi9zcmMvQ29tcG9uZW50cy9CdG5GaWxlL0J0bkZpbGUudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvQnRuRmlsZS9pbmRleC5qcyIsIi4uL3NyYy9Db21wb25lbnRzL0J0bkdyb3VwL0J0bkdyb3VwLnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL0J0bkdyb3VwL0J0bkdyb3VwVG9nZ2xlLnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL0J0bkdyb3VwL0J0blRvb2xiYXIudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvQnRuR3JvdXAvaW5kZXguanMiLCIuLi9zcmMvSGVscGVycy9VdWlkL1V1aWQuanMiLCIuLi9zcmMvTWl4aW5zL1Byb3h5L1Byb3h5LmpzIiwiLi4vc3JjL0NvbXBvbmVudHMvRHJvcGRvd25NZW51L0Ryb3Bkb3duTWVudUl0ZW0udnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvRHJvcGRvd25NZW51L0Ryb3Bkb3duTWVudUhlYWRlci52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9Ecm9wZG93bk1lbnUvRHJvcGRvd25NZW51RGl2aWRlci52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9Ecm9wZG93bk1lbnUvRHJvcGRvd25NZW51LnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL0Ryb3Bkb3duTWVudS9pbmRleC5qcyIsIi4uL3NyYy9Db21wb25lbnRzL0J0bkRyb3Bkb3duL0J0bkRyb3Bkb3duLnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL0J0bkRyb3Bkb3duL2luZGV4LmpzIiwiLi4vc3JjL01peGlucy9IYXNTbG90cy9IYXNTbG90cy5qcyIsIi4uL3NyYy9Db21wb25lbnRzL0NhcmQvQ2FyZC52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9DYXJkL0NhcmRCb2R5LnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL0NhcmQvQ2FyZEJ0bkdyb3VwLnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL0NhcmQvQ2FyZERlY2sudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvQ2FyZC9DYXJkSGVhZGVyLnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL0NhcmQvQ2FyZEZvb3Rlci52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9DYXJkL0NhcmRJbWcudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvQ2FyZC9DYXJkSW1nVG9wLnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL0NhcmQvQ2FyZEltZ0JvdHRvbS52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9DYXJkL0NhcmRJbWdPdmVybGF5LnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL0NhcmQvQ2FyZExpbmsudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvQ2FyZC9DYXJkU3VidGl0bGUudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvQ2FyZC9DYXJkVGl0bGUudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvQ2FyZC9pbmRleC5qcyIsIi4uL3NyYy9Db21wb25lbnRzL1JhZGlvRmllbGQvUmFkaW9GaWVsZC52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9SYWRpb0ZpZWxkL2luZGV4LmpzIiwiLi4vc3JjL0NvbXBvbmVudHMvQ2hlY2tib3hGaWVsZC9DaGVja2JveEZpZWxkLnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL0NoZWNrYm94RmllbGQvaW5kZXguanMiLCIuLi9zcmMvQ29tcG9uZW50cy9Ecm9wem9uZS9Ecm9wem9uZS52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9Ecm9wem9uZS9pbmRleC5qcyIsIi4uL3NyYy9IZWxwZXJzL1JlYWRGaWxlL1JlYWRGaWxlLmpzIiwiLi4vc3JjL0NvbXBvbmVudHMvRmlsZVByZXZpZXcvRmlsZVByZXZpZXcudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvRmlsZVByZXZpZXcvaW5kZXguanMiLCIuLi9zcmMvQ29tcG9uZW50cy9Gb3JtQ29udHJvbC9Gb3JtQ29udHJvbC52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9Gb3JtQ29udHJvbC9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9pbnRlcnNlY3Rpb24tb2JzZXJ2ZXIvaW50ZXJzZWN0aW9uLW9ic2VydmVyLmpzIiwiLi4vc3JjL0NvbXBvbmVudHMvSW5maW5pdGVTY3JvbGxpbmcvSW5maW5pdGVTY3JvbGxpbmcudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvSW5wdXRHcm91cC9JbnB1dEdyb3VwVGV4dC52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9JbnB1dEdyb3VwL0lucHV0R3JvdXBBcHBlbmQudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvSW5wdXRHcm91cC9JbnB1dEdyb3VwUHJlcGVuZC52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9JbnB1dEdyb3VwL0lucHV0R3JvdXAudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvSW5wdXRHcm91cC9pbmRleC5qcyIsIi4uL3NyYy9Db21wb25lbnRzL0xpZ2h0U3dpdGNoRmllbGQvTGlnaHRTd2l0Y2hGaWVsZC52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9MaWdodFN3aXRjaEZpZWxkL2luZGV4LmpzIiwiLi4vc3JjL0NvbXBvbmVudHMvTGlzdEdyb3VwL0xpc3RHcm91cEl0ZW0udnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvTGlzdEdyb3VwL0xpc3RHcm91cC52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9MaXN0R3JvdXAvaW5kZXguanMiLCIuLi9zcmMvQ29tcG9uZW50cy9OYXZiYXIvTmF2YmFyQnJhbmQudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvTmF2YmFyL05hdmJhckNvbGxhcHNlLnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL05hdmJhci9OYXZiYXJUZXh0LnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL05hdmJhci9OYXZiYXJUb2dnbGVySWNvbi52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9OYXZiYXIvTmF2YmFyVG9nZ2xlci52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9OYXZiYXIvTmF2YmFyLnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL05hdmlnYXRpb24vTmF2aWdhdGlvbkVycm9yLnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL05hdmlnYXRpb24vTmF2aWdhdGlvbkxpbmsudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvTmF2aWdhdGlvbi9OYXZpZ2F0aW9uSXRlbS52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9OYXZpZ2F0aW9uL05hdmlnYXRpb24udnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvTmF2aWdhdGlvbi9OYXZpZ2F0aW9uRHJvcGRvd24udnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvTmF2aWdhdGlvbi9pbmRleC5qcyIsIi4uL3NyYy9Db21wb25lbnRzL05hdmJhci9OYXZiYXJOYXYudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvTmF2YmFyL2luZGV4LmpzIiwiLi4vc3JjL0NvbXBvbmVudHMvUGFnaW5hdGlvbi9QYWdpbmF0aW9uLnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL1BhZ2luYXRpb24vaW5kZXguanMiLCIuLi9zcmMvQ29tcG9uZW50cy9TZWxlY3RGaWVsZC9TZWxlY3RGaWVsZC52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9TZWxlY3RGaWVsZC9pbmRleC5qcyIsIi4uL3NyYy9Db21wb25lbnRzL1NsaWRlRGVjay9TbGlkZXMudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvU2xpZGVEZWNrL1NsaWRlRGVja0NvbnRyb2xzLnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL1NsaWRlRGVjay9TbGlkZURlY2sudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvU2xpZGVEZWNrL2luZGV4LmpzIiwiLi4vc3JjL0NvbXBvbmVudHMvVGFibGVWaWV3L1RhYmxlVmlld0hlYWRlci52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9UYWJsZVZpZXcvVGFibGUudnVlIiwiLi4vc3JjL0h0dHAvVHJhbnNmb3JtZXIvVHJhbnNmb3JtZXIuanMiLCIuLi9zcmMvSHR0cC9UYWJsZVZpZXdUcmFuc2Zvcm1lci9UYWJsZVZpZXdUcmFuc2Zvcm1lci5qcyIsIi4uL3NyYy9Db21wb25lbnRzL1RhYmxlVmlldy9UYWJsZVZpZXcudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvVGFibGVWaWV3L2luZGV4LmpzIiwiLi4vc3JjL0NvbXBvbmVudHMvVGV4dGFyZWFGaWVsZC9UZXh0YXJlYUZpZWxkLnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL1RleHRhcmVhRmllbGQvaW5kZXguanMiLCIuLi9zcmMvQ29tcG9uZW50cy9UaHVtYm5haWxMaXN0L1RodW1ibmFpbExpc3RJdGVtLnZ1ZSIsIi4uL3NyYy9Db21wb25lbnRzL1RodW1ibmFpbExpc3QvVGh1bWJuYWlsTGlzdC52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9UaHVtYm5haWxMaXN0L2luZGV4LmpzIiwiLi4vc3JjL0NvbXBvbmVudHMvVXBsb2FkRmllbGQvVXBsb2FkRmllbGQudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvVXBsb2FkRmllbGQvaW5kZXguanMiLCIuLi9zcmMvQ29tcG9uZW50cy9XaXphcmQvV2l6YXJkQnV0dG9ucy52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9XaXphcmQvV2l6YXJkU3RlcC52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9XaXphcmQvV2l6YXJkRXJyb3IudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvV2l6YXJkL1dpemFyZEhlYWRlci52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9XaXphcmQvV2l6YXJkUHJvZ3Jlc3MudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvV2l6YXJkL1dpemFyZFN1Y2Nlc3MudnVlIiwiLi4vc3JjL0NvbXBvbmVudHMvV2l6YXJkL1dpemFyZC52dWUiLCIuLi9zcmMvQ29tcG9uZW50cy9XaXphcmQvaW5kZXguanMiLCIuLi9zcmMvRGlyZWN0aXZlcy9BdXRvZ3Jvdy9BdXRvZ3Jvdy5qcyIsIi4uL3NyYy9EaXJlY3RpdmVzL0NvbGxhcHNlL0NvbGxhcHNlLmpzIiwiLi4vc3JjL0RpcmVjdGl2ZXMvU2x1Zy9TbHVnLmpzIiwiLi4vc3JjL0hlbHBlcnMvQmxvYi9CbG9iLmpzIiwiLi4vc3JjL0hlbHBlcnMvRWxhcHNlZC9FbGFwc2VkLmpzIiwiLi4vc3JjL0hlbHBlcnMvU2Nyb2xsVG8vU2Nyb2xsVG8uanMiLCIuLi9zcmMvSGVscGVycy9XYWl0L1dhaXQuanMiLCIuLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlLCBmb3JtYXQpIHtcbiAgICBpZih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gbW9tZW50KFN0cmluZyh2YWx1ZSkpLmZvcm1hdChmb3JtYXQpO1xuICAgIH1cblxuICAgIHJldHVybiAnJztcbn1cbiIsImltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUsIGZvcm1hdCkge1xuICAgIHJldHVybiB2YWx1ZSA/IG1vbWVudChTdHJpbmcodmFsdWUpKSA6IG51bGw7XG59XG4iLCJpbXBvcnQgRGF0ZUZpbHRlciBmcm9tICcuL0RhdGVGaWx0ZXInO1xuaW1wb3J0IE1vbWVudEZpbHRlciBmcm9tICcuL01vbWVudEZpbHRlcic7XG5cbmV4cG9ydCB7XG4gICAgRGF0ZUZpbHRlcixcbiAgICBNb21lbnRGaWx0ZXJcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKFZ1ZSwgb3B0aW9ucykge1xuICAgIFZ1ZS5maWx0ZXIoJ2RhdGUnLCBEYXRlRmlsdGVyKTtcbiAgICBWdWUuZmlsdGVyKCdtb21lbnQnLCBNb21lbnRGaWx0ZXIpO1xufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNhbWVsQ2FzZShzdHJpbmcpIHtcbiAgICBzdHJpbmcgPSBzdHJpbmcudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8oPzooXi4pfChbLV9cXHNdKy4pKS9nLCBmdW5jdGlvbihtYXRjaCkge1xuICAgICAgICByZXR1cm4gbWF0Y2guY2hhckF0KG1hdGNoLmxlbmd0aC0xKS50b1VwcGVyQ2FzZSgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHN0cmluZy5zdWJzdHJpbmcoMSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRlbmQoLi4uYXJncykge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKC4uLmFyZ3MpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNOdWxsKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSBudWxsO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNBcnJheSh2YWx1ZSkge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKTtcbn1cbiIsImltcG9ydCBpc051bGwgZnJvbSAnLi9pc051bGwnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgICByZXR1cm4gKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpICYmICFpc051bGwodmFsdWUpICYmICFpc0FycmF5KHZhbHVlKTtcbn1cbiIsImltcG9ydCBleHRlbmQgZnJvbSAnLi9leHRlbmQnO1xuaW1wb3J0IGlzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QnO1xuXG4vKipcbiAqIERlZXAgbWVyZ2UgdHdvIG9iamVjdHMuXG4gKiBAcGFyYW0gdGFyZ2V0XG4gKiBAcGFyYW0gLi4uc291cmNlc1xuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlZXBFeHRlbmQodGFyZ2V0LCAuLi5zb3VyY2VzKSB7XG4gICAgaWYgKCFzb3VyY2VzLmxlbmd0aCkgcmV0dXJuIHRhcmdldDtcbiAgICBjb25zdCBzb3VyY2UgPSBzb3VyY2VzLnNoaWZ0KCk7XG5cbiAgICBpZiAoaXNPYmplY3QodGFyZ2V0KSAmJiBpc09iamVjdChzb3VyY2UpKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KHNvdXJjZVtrZXldKSkge1xuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0W2tleV0pIGV4dGVuZCh0YXJnZXQsIHsgW2tleV06IHt9IH0pO1xuICAgICAgICAgICAgICAgIGRlZXBFeHRlbmQodGFyZ2V0W2tleV0sIHNvdXJjZVtrZXldKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXh0ZW5kKHRhcmdldCwge1trZXldOiBzb3VyY2Vba2V5XX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZXBFeHRlbmQodGFyZ2V0LCAuLi5zb3VyY2VzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB8fCAoXG4gICAgICAgIHZhbHVlICYmIHZhbHVlLnRvU3RyaW5nID8gdmFsdWUudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgTnVtYmVyXScgOiBmYWxzZVxuICAgICk7XG59XG4iLCJpbXBvcnQgaXNOdW1iZXIgZnJvbSAnLi9pc051bWJlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzTnVtZXJpYyh2YWx1ZSkge1xuICAgIHJldHVybiBpc051bWJlcih2YWx1ZSkgfHwgISF2YWx1ZSAmJiAhIXZhbHVlLnRvU3RyaW5nKCkubWF0Y2goL15cXC0/W1xcZC4sXSskLyk7XG59XG4iLCJpbXBvcnQgaXNOdW1lcmljIGZyb20gJy4vaXNOdW1lcmljJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ga2V5KHZhbHVlKSB7XG4gICAgcmV0dXJuIGlzTnVtZXJpYyh2YWx1ZSkgPyBwYXJzZUZsb2F0KHZhbHVlKSA6IHZhbHVlO1xufVxuIiwiaW1wb3J0IGtleSBmcm9tICcuL2tleSc7XG5pbXBvcnQgaXNOdW1lcmljIGZyb20gJy4vaXNOdW1lcmljJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZWFjaChzdWJqZWN0LCBmbikge1xuICAgIGZvcihjb25zdCBpIGluIHN1YmplY3QpIHtcbiAgICAgICAgZm4oc3ViamVjdFtpXSwga2V5KGkpKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaXJzdChhcnJheSkge1xuICAgIHJldHVybiAoYXJyYXkgJiYgYXJyYXkubGVuZ3RoKSA/IGFycmF5WzBdIDogdW5kZWZpbmVkO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcbn1cbiIsImltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0JztcbmltcG9ydCBpc1VuZGVmaW5lZCBmcm9tICcuL2lzVW5kZWZpbmVkJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWF0Y2hlcyhwcm9wZXJ0aWVzKSB7XG4gICAgcmV0dXJuIHN1YmplY3QgPT4ge1xuICAgICAgICBmb3IoY29uc3QgaSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICBpZihpc09iamVjdChwcm9wZXJ0aWVzW2ldKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWJqZWN0W2ldID8gbWF0Y2hlcyhwcm9wZXJ0aWVzW2ldKShzdWJqZWN0W2ldKSA6IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZighc3ViamVjdCB8fCBzdWJqZWN0W2ldICE9IHByb3BlcnRpZXNbaV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xufVxuIiwiaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5JztcbmltcG9ydCBpc1N0cmluZyBmcm9tICcuL2lzU3RyaW5nJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0KG9iamVjdCwgcGF0aCkge1xuICAgIHJldHVybiAoaXNTdHJpbmcocGF0aCkgPyBwYXRoLnNwbGl0KCcuJykgOiAoIWlzQXJyYXkocGF0aCkgPyBbcGF0aF0gOiBwYXRoKSkucmVkdWNlKChhLCBiKSA9PiBhW2JdLCBvYmplY3QpO1xufVxuIiwiaW1wb3J0IGdldCBmcm9tICcuL2dldCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByb3BlcnR5KHBhdGgpIHtcbiAgICByZXR1cm4gb2JqZWN0ID0+IHtcbiAgICAgICAgcmV0dXJuIGdldChvYmplY3QsIHBhdGgpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbjtcbn1cbiIsImltcG9ydCBnZXQgZnJvbSAnLi9nZXQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYXRjaGVzUHJvcGVydHkocGF0aCwgdmFsdWUpIHtcbiAgICByZXR1cm4gc3ViamVjdCA9PiB7XG4gICAgICAgIHJldHVybiBnZXQoc3ViamVjdCwgcGF0aCkgPT09IHZhbHVlO1xuICAgIH1cbn1cbiIsImltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheSc7XG5pbXBvcnQgbWF0Y2hlcyBmcm9tICcuL21hdGNoZXMnO1xuaW1wb3J0IGlzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QnO1xuaW1wb3J0IHByb3BlcnR5IGZyb20gJy4vcHJvcGVydHknO1xuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi9pc0Z1bmN0aW9uJztcbmltcG9ydCBtYXRjaGVzUHJvcGVydHkgZnJvbSAnLi9tYXRjaGVzUHJvcGVydHknO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwcmVkaWNhdGUodmFsdWUpIHtcbiAgICBpZihpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSBtYXRjaGVzKHZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZihpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9IG1hdGNoZXNQcm9wZXJ0eSh2YWx1ZVswXSwgdmFsdWVbMV0pO1xuICAgIH1cbiAgICBlbHNlIGlmKCFpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9IHByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG59XG4iLCJpbXBvcnQgZmlyc3QgZnJvbSAnLi9maXJzdCc7XG5pbXBvcnQgcHJlZGljYXRlIGZyb20gJy4vcHJlZGljYXRlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmluZChzdWJqZWN0LCB2YWx1ZSkge1xuICAgIHJldHVybiBmaXJzdChzdWJqZWN0LmZpbHRlcihvYmplY3QgPT4gcHJlZGljYXRlKHZhbHVlKShvYmplY3QpKSk7XG59XG4iLCJpbXBvcnQga2V5IGZyb20gJy4va2V5JztcbmltcG9ydCBwcmVkaWNhdGUgZnJvbSAnLi9wcmVkaWNhdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaW5kSW5kZXgoc3ViamVjdCwgdmFsdWUpIHtcbiAgICBmb3IoY29uc3QgaSBpbiBzdWJqZWN0KSB7XG4gICAgICAgIGlmKHByZWRpY2F0ZSh2YWx1ZSkoc3ViamVjdFtpXSkpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkoaSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gLTE7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHRydWUgfHwgdmFsdWUgPT09IGZhbHNlO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ga2ViYWJDYXNlKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJylcbiAgICAgICAgLnJlcGxhY2UoL1xccysvZywgJy0nKVxuICAgICAgICAucmVwbGFjZSgvXFxfL2csICctJylcbiAgICAgICAgLnRvTG93ZXJDYXNlKCk7XG59XG4iLCJpbXBvcnQgZWFjaCBmcm9tICcuL2VhY2gnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYXBLZXlzKG9iamVjdCwgZm4pIHtcbiAgICBjb25zdCBtYXBwZWQgPSB7fTtcblxuICAgIGVhY2gob2JqZWN0LCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICBtYXBwZWRbZm4odmFsdWUsIGtleSldID0gdmFsdWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWFwcGVkO1xufVxuIiwiaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi9pc0Z1bmN0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbmVnYXRlKGZuKSB7XG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiBpc0Z1bmN0aW9uKGZuKSA/ICFmbiguLi5hcmdzKSA6ICFmbjtcbn1cbiIsImltcG9ydCBlYWNoIGZyb20gJy4vZWFjaCc7XG5pbXBvcnQgcHJlZGljYXRlIGZyb20gJy4vcHJlZGljYXRlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGlja0J5KG9iamVjdCwgbWF0Y2gpIHtcbiAgICBjb25zdCBzdWJqZWN0ID0ge307XG5cbiAgICBlYWNoKG9iamVjdCwgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaWYocHJlZGljYXRlKG1hdGNoKSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHN1YmplY3Rba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3ViamVjdDtcbn1cbiIsImltcG9ydCBuZWdhdGUgZnJvbSAnLi9uZWdhdGUnO1xuaW1wb3J0IHBpY2tCeSBmcm9tICcuL3BpY2tCeSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9taXRCeShvYmplY3QsIGZuKSB7XG4gICAgcmV0dXJuIHBpY2tCeShvYmplY3QsIG5lZ2F0ZShmbikpO1xufVxuIiwiaW1wb3J0IGtleSBmcm9tICcuL2tleSc7XG5pbXBvcnQgcHJlZGljYXRlIGZyb20gJy4vcHJlZGljYXRlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVtb3ZlKGFycmF5LCBtYXRjaCkge1xuICAgIGNvbnN0IGluZGV4ZXMgPSBbXTtcblxuICAgIGZvcihjb25zdCBpIGluIGFycmF5KSB7XG4gICAgICAgIGlmKHByZWRpY2F0ZShtYXRjaCkoYXJyYXlbaV0pKSB7XG4gICAgICAgICAgICBpbmRleGVzLnB1c2goa2V5KGkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhcnJheS5maWx0ZXIoKHZhbHVlLCBpKSA9PiB7XG4gICAgICAgIHJldHVybiBpbmRleGVzLmluZGV4T2YoaSkgIT09IC0xO1xuICAgIH0pXG59XG4iLCJpbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuL2lzRnVuY3Rpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3cmFwKHN1YmplY3QsIGZuKSB7XG4gICAgcmV0dXJuIHZhbHVlID0+IHtcbiAgICAgICAgcmV0dXJuIGlzRnVuY3Rpb24oZm4pID8gZm4oc3ViamVjdCwgdmFsdWUpIDogdmFsdWU7XG4gICAgfVxufTtcbiIsImltcG9ydCB7IGlzTnVsbCB9IGZyb20gJy4uL0Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBtYXBLZXlzIH0gZnJvbSAnLi4vRnVuY3Rpb25zJztcbmltcG9ydCB7IGlzT2JqZWN0IH0gZnJvbSAnLi4vRnVuY3Rpb25zJztcbmltcG9ydCB7IGlzQm9vbGVhbiB9IGZyb20gJy4uL0Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJy4uL0Z1bmN0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByZWZpeChzdWJqZWN0LCBwcmVmaXgsIGRlbGltZXRlciA9ICctJykge1xuICAgIGNvbnN0IHByZWZpeGVyID0gKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgY29uc3Qgc3RyaW5nID0gKGtleSB8fCB2YWx1ZSlcbiAgICAgICAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke3ByZWZpeH0ke2RlbGltZXRlcn0/YCksICcnKTtcblxuICAgICAgICByZXR1cm4gW3ByZWZpeCwgc3RyaW5nXS5maWx0ZXIodmFsdWUgPT4gISF2YWx1ZSkuam9pbihkZWxpbWV0ZXIpO1xuICAgIH1cblxuICAgIGlmKGlzQm9vbGVhbihzdWJqZWN0KSkge1xuICAgICAgICByZXR1cm4gc3ViamVjdDtcbiAgICB9XG5cbiAgICBpZihpc09iamVjdChzdWJqZWN0KSkge1xuICAgICAgICByZXR1cm4gbWFwS2V5cyhzdWJqZWN0LCBwcmVmaXhlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByZWZpeGVyKHN1YmplY3QpO1xufVxuIiwiaW1wb3J0IHByZWZpeCBmcm9tICcuLi8uLi9IZWxwZXJzL1ByZWZpeC9QcmVmaXgnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgdmFyaWFudCBhdHRyaWJ1dGVcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgdmFyaWFudDoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgZGVmYXVsdDogJ3ByaW1hcnknXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBjb21wdXRlZDoge1xuXG4gICAgICAgIHZhcmlhbnRDbGFzc1ByZWZpeCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRvcHRpb25zLm5hbWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdmFyaWFudENsYXNzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHByZWZpeCh0aGlzLnZhcmlhbnQsIHRoaXMudmFyaWFudENsYXNzUHJlZml4KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCJpbXBvcnQgcHJlZml4IGZyb20gJy4uLy4uL0hlbHBlcnMvUHJlZml4L1ByZWZpeCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIHByb3BzOiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBzaXplIG9mIHRoZSBmb3JtIGNvbnRyb2xcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgc2l6ZToge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgZGVmYXVsdDogJ21kJyxcbiAgICAgICAgICAgIHZhbGlkYXRlOiB2YWx1ZSA9PiBbJ3NtJywgJ21kJywgJ2xnJ10uaW5kZXhPZih2YWx1ZSkgIT09IC0xXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBjb21wdXRlZDoge1xuXG4gICAgICAgIHNpemVhYmxlQ2xhc3NQcmVmaXgoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kb3B0aW9ucy5uYW1lO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNpemVhYmxlQ2xhc3MoKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJlZml4KHRoaXMuc2l6ZSwgdGhpcy5zaXplYWJsZUNsYXNzUHJlZml4KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCJpbXBvcnQgcHJlZml4IGZyb20gJy4uLy4uL0hlbHBlcnMvUHJlZml4JztcbmltcG9ydCB7IGVhY2ggfSBmcm9tICcuLi8uLi9IZWxwZXJzL0Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBvbWl0QnkgfSBmcm9tICcuLi8uLi9IZWxwZXJzL0Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBjYW1lbENhc2UgfSBmcm9tICcuLi8uLi9IZWxwZXJzL0Z1bmN0aW9ucyc7XG5cbmNvbnN0IENPTE9SUyA9IFtcbiAgICAncHJpbWFyeScsXG4gICAgJ3NlY29uZGFyeScsXG4gICAgJ3N1Y2Nlc3MnLFxuICAgICdkYW5nZXInLFxuICAgICd3YXJuaW5nJyxcbiAgICAnaW5mbycsXG4gICAgJ2xpZ2h0JyxcbiAgICAnZGFyaycsXG4gICAgJ3doaXRlJyxcbiAgICAnbXV0ZWQnXG5dO1xuXG5jb25zdCBwcm9wcyA9IHt9O1xuXG5lYWNoKFsnYm9yZGVyJywgJ3RleHQnLCAnYmcnLCAnYmctZ3JhZGllbnQnXSwgbmFtZXNwYWNlID0+IHtcbiAgICBlYWNoKENPTE9SUywgY29sb3IgPT4ge1xuICAgICAgICBwcm9wc1tjYW1lbENhc2UocHJlZml4KGNvbG9yLCBuYW1lc3BhY2UpKV0gPSBCb29sZWFuO1xuICAgIH0pO1xufSk7XG5cbmZ1bmN0aW9uIGNsYXNzZXMoaW5zdGFuY2UsIG5hbWVzcGFjZSkge1xuICAgIHJldHVybiBDT0xPUlMubWFwKGNvbG9yID0+IHtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlW2NhbWVsQ2FzZShjb2xvciA9IHByZWZpeChjb2xvciwgbmFtZXNwYWNlKSldID8gY29sb3IgOiBudWxsO1xuICAgIH0pXG4gICAgLmZpbHRlcih2YWx1ZSA9PiAhIXZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgcHJvcHM6IHByb3BzLFxuXG4gICAgbWV0aG9kczoge1xuXG4gICAgICAgIHRleHRDb2xvcigpIHtcbiAgICAgICAgICAgIHJldHVybiBjbGFzc2VzKHRoaXMsICd0ZXh0Jyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYmdDb2xvcigpIHtcbiAgICAgICAgICAgIHJldHVybiBjbGFzc2VzKHRoaXMsICdiZycpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGJvcmRlckNvbG9yKCkge1xuICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXModGhpcywgJ2JvcmRlcicpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGJnR3JhZGllbnRDb2xvcigpIHtcbiAgICAgICAgICAgIHJldHVybiBjbGFzc2VzKHRoaXMsICdiZy1ncmFkaWVudCcpO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICB0ZXh0Q29sb3JDbGFzc2VzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGV4dENvbG9yKCkuam9pbignICcpLnRyaW0oKSB8fCBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIGJvcmRlckNvbG9yQ2xhc3NlcygpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJvcmRlckNvbG9yKCkuam9pbignICcpLnRyaW0oKSB8fCBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIGJnQ29sb3JDbGFzc2VzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYmdDb2xvcigpLmpvaW4oJyAnKS50cmltKCkgfHwgbnVsbDtcbiAgICAgICAgfSxcblxuICAgICAgICBiZ0dyYWRpZW50Q29sb3JDbGFzc2VzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYmdHcmFkaWVudENvbG9yKCkuam9pbignICcpLnRyaW0oKSB8fCBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNvbG9yYWJsZUNsYXNzZXMoKSB7XG4gICAgICAgICAgICBjb25zdCBjbGFzc2VzID0ge307XG5cbiAgICAgICAgICAgIGNsYXNzZXNbdGhpcy50ZXh0Q29sb3JDbGFzc2VzXSA9ICEhdGhpcy50ZXh0Q29sb3JDbGFzc2VzO1xuICAgICAgICAgICAgY2xhc3Nlc1t0aGlzLmJvcmRlckNvbG9yQ2xhc3Nlc10gPSAhIXRoaXMuYm9yZGVyQ29sb3JDbGFzc2VzO1xuICAgICAgICAgICAgY2xhc3Nlc1t0aGlzLmJnQ29sb3JDbGFzc2VzXSA9ICEhdGhpcy5iZ0NvbG9yQ2xhc3NlcztcbiAgICAgICAgICAgIGNsYXNzZXNbdGhpcy5iZ0dyYWRpZW50Q29sb3JDbGFzc2VzXSA9ICEhdGhpcy5iZ0dyYWRpZW50Q29sb3JDbGFzc2VzO1xuXG4gICAgICAgICAgICByZXR1cm4gb21pdEJ5KGNsYXNzZXMsIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFrZXkgfHwgIXZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIiwiZnVuY3Rpb24gZHVyYXRpb24oZWwpIHtcbiAgICBjb25zdCBkdXJhdGlvbiA9IGdldENvbXB1dGVkU3R5bGUoZWwpLnRyYW5zaXRpb25EdXJhdGlvbjtcbiAgICBjb25zdCBudW1lcmljID0gcGFyc2VGbG9hdChkdXJhdGlvbiwgMTApIHx8IDA7XG4gICAgY29uc3QgdW5pdCA9IGR1cmF0aW9uLm1hdGNoKC9tP3MvKTtcblxuICAgIHN3aXRjaCAodW5pdFswXSkge1xuICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgIHJldHVybiBudW1lcmljICogMTAwMDtcbiAgICAgICAgY2FzZSAnbXMnOlxuICAgICAgICAgICAgcmV0dXJuIG51bWVyaWM7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2l0aW9uKGVsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gZHVyYXRpb24oZWwpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGRlbGF5KVxuICAgICAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoKGUpIHtcbiAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgZWFjaCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCB7IGV4dGVuZCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuLi8uLi9IZWxwZXJzL0Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbWV0aG9kczoge1xuXG4gICAgICAgIG1lcmdlQ2xhc3NlcygpIHtcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSB7fTtcblxuICAgICAgICAgICAgZWFjaChbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyksIGFyZyA9PiB7XG4gICAgICAgICAgICAgICAgaWYoaXNPYmplY3QoYXJnKSkge1xuICAgICAgICAgICAgICAgICAgICBleHRlbmQoY2xhc3NlcywgYXJnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihpc0FycmF5KGFyZykpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMuY29uY2F0KGFyZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoYXJnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXNbYXJnXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBjbGFzc2VzO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8cm91dGVyLWxpbmsgdi1pZj1cInRvXCIgOnRvPVwidG9cIiA6ZGlzYWJsZWQ9XCJkaXNhYmxlZFwiIDpjbGFzcz1cImNsYXNzZXNcIiBAY2xpY2s9XCJvbkNsaWNrXCIgcm9sZT1cImJ1dHRvblwiPlxuICAgICAgICA8c2xvdC8+XG4gICAgPC9yb3V0ZXItbGluaz5cbiAgICA8YSB2LWVsc2UtaWY9XCJocmVmXCIgOmhyZWY9XCJocmVmXCIgOmRpc2FibGVkPVwiZGlzYWJsZWRcIiA6Y2xhc3M9XCJjbGFzc2VzXCIgQGNsaWNrPVwib25DbGlja1wiIHJvbGU9XCJidXR0b25cIj5cbiAgICAgICAgPHNsb3QvPlxuICAgIDwvYT5cbiAgICA8bGFiZWwgdi1lbHNlLWlmPVwibGFiZWxcIiA6ZGlzYWJsZWQ9XCJkaXNhYmxlZFwiIDpjbGFzcz1cImNsYXNzZXNcIiBAY2xpY2s9XCJvbkNsaWNrXCIgcm9sZT1cImJ1dHRvblwiPlxuICAgICAgICA8c2xvdC8+XG4gICAgPC9sYWJlbD5cbiAgICA8YnV0dG9uIHYtZWxzZSA6dHlwZT1cInR5cGVcIiA6ZGlzYWJsZWQ9XCJkaXNhYmxlZFwiIDpjbGFzcz1cImNsYXNzZXNcIiBAY2xpY2s9XCJvbkNsaWNrXCI+XG4gICAgICAgIDxzbG90Lz5cbiAgICA8L2J1dHRvbj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgVmFyaWFudCBmcm9tICcuLi8uLi9NaXhpbnMvVmFyaWFudCc7XG5pbXBvcnQgU2l6ZWFibGUgZnJvbSAnLi4vLi4vTWl4aW5zL1NpemVhYmxlJztcbmltcG9ydCBDb2xvcmFibGUgZnJvbSAnLi4vLi4vTWl4aW5zL0NvbG9yYWJsZSc7XG5pbXBvcnQgdHJhbnNpdGlvbiBmcm9tICcuLi8uLi9IZWxwZXJzL1RyYW5zaXRpb24nO1xuaW1wb3J0IE1lcmdlQ2xhc3NlcyBmcm9tICcuLi8uLi9NaXhpbnMvTWVyZ2VDbGFzc2VzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ2J0bicsXG5cbiAgICBtaXhpbnM6IFtcbiAgICAgICAgVmFyaWFudCxcbiAgICAgICAgU2l6ZWFibGUsXG4gICAgICAgIENvbG9yYWJsZSxcbiAgICAgICAgTWVyZ2VDbGFzc2VzXG4gICAgXSxcblxuICAgIHByb3BzOiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc3BsYXkgYnV0dG9uIHdpdGggYWN0aXZlIHN0YXRlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIGFjdGl2ZTogQm9vbGVhbixcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlzcGxheSBidXR0b24gd2l0aCBibG9ja2VkIHN0YXRlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIGJsb2NrOiBCb29sZWFuLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNwbGF5IGJ1dHRvbiB3aXRoIGRpc2FibGVkIHN0YXRlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIGRpc2FibGVkOiBCb29sZWFuLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBhbiBocmVmIGlzIHBhc3NlZCwgYnV0dG9uIGlzIGFuIHJvdXRlci1saW5rIGVsZW1lbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IEJvb2xlYW5cbiAgICAgICAgICovXG4gICAgICAgIGhyZWY6IFN0cmluZyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2hvdWxkIHVzZSA8bGFiZWw+IGFzIHRoZSBlbGVtZW50IGZvciB0aGUgYnV0dG9uLiBVc2VkIGZvciBpbnB1dHNcbiAgICAgICAgICogd3JhcHBlcnMgKHRvZ2dsZXMpLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgQm9vbGVhblxuICAgICAgICAgKi9cbiAgICAgICAgbGFiZWw6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc3BsYXkgYXMgYW4gb3V0bGluZSBidXR0b25cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgb3V0bGluZTogQm9vbGVhbixcblxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgYW4gdG8gaXMgcGFzc2VkLCBidXR0b24gaXMgYW4gcm91dGVyLWxpbmsgZWxlbWVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgQm9vbGVhblxuICAgICAgICAgKi9cbiAgICAgICAgdG86IFtPYmplY3QsIFN0cmluZ10sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB0eXBlIGF0dHJpYnV0ZSBmb3IgdGhlIGJ1dHRvbi4gTm90IGFwcGxpZWQgaWYgYW4gYW5jaG9yXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIHR5cGU6IFN0cmluZ1xuXG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcblxuICAgICAgICBvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdjbGljaycsIGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgdmFyaWFudENsYXNzUHJlZml4KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJG9wdGlvbnMubmFtZSArICh0aGlzLm91dGxpbmUgPyAnLW91dGxpbmUnIDogJycpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNsYXNzZXMoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tZXJnZUNsYXNzZXMoXG4gICAgICAgICAgICAgICAgJ2J0bicsXG4gICAgICAgICAgICAgICAgdGhpcy52YXJpYW50Q2xhc3MsXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplYWJsZUNsYXNzLFxuICAgICAgICAgICAgICAgIHRoaXMuY29sb3JhYmxlQ2xhc3NlcyxcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2NrID8gJ2J0bi1ibG9jaycgOiAnJyxcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZSA/ICdhY3RpdmUnIDogJydcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuQGltcG9ydCAnLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL3Njc3MvbWl4aW5zLnNjc3MnO1xuQGltcG9ydCAnLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL3Njc3MvZnVuY3Rpb25zLnNjc3MnO1xuQGltcG9ydCAnLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL3Njc3MvdmFyaWFibGVzLnNjc3MnO1xuXG5AbWl4aW4gYnV0dG9uLWJsb2NrKCRzaXplKSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZGlzcGxheTogYmxvY2s7XG59XG5cbkBpbmNsdWRlIG1lZGlhLWJyZWFrcG9pbnQtZG93bih4cykge1xuICAgIC5idG4teHMtYmxvY2sge1xuICAgICAgICBAaW5jbHVkZSBidXR0b24tYmxvY2soeHMpO1xuXG4gICAgICAgICsgLmJ0bi14cy1ibG9jayB7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAkYnRuLWJsb2NrLXNwYWNpbmcteTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQGluY2x1ZGUgbWVkaWEtYnJlYWtwb2ludC1kb3duKHNtKSB7XG4gICAgLmJ0bi1zbS1ibG9jayB7XG4gICAgICAgIEBpbmNsdWRlIGJ1dHRvbi1ibG9jayhzbSk7XG5cbiAgICAgICAgKyAuYnRuLXhzLWJsb2NrLFxuICAgICAgICArIC5idG4tc20tYmxvY2sge1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogJGJ0bi1ibG9jay1zcGFjaW5nLXk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBpbmNsdWRlIG1lZGlhLWJyZWFrcG9pbnQtZG93bihtZCkge1xuICAgIC5idG4tbWQtYmxvY2sge1xuICAgICAgICBAaW5jbHVkZSBidXR0b24tYmxvY2sobWQpO1xuXG4gICAgICAgICsgLmJ0bi14cy1ibG9jayxcbiAgICAgICAgKyAuYnRuLXNtLWJsb2NrLFxuICAgICAgICArIC5idG4tbWQtYmxvY2sge1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogJGJ0bi1ibG9jay1zcGFjaW5nLXk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBpbmNsdWRlIG1lZGlhLWJyZWFrcG9pbnQtZG93bihsZykge1xuICAgIC5idG4tbGctYmxvY2sge1xuICAgICAgICBAaW5jbHVkZSBidXR0b24tYmxvY2sobGcpO1xuXG4gICAgICAgICsgLmJ0bi14cy1ibG9jayxcbiAgICAgICAgKyAuYnRuLXNtLWJsb2NrLFxuICAgICAgICArIC5idG4tbWQtYmxvY2ssXG4gICAgICAgICsgLmJ0bi1sZy1ibG9jayB7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAkYnRuLWJsb2NrLXNwYWNpbmcteTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQGluY2x1ZGUgbWVkaWEtYnJlYWtwb2ludC1kb3duKHhsKSB7XG4gICAgLmJ0bi14bC1ibG9jayB7XG4gICAgICAgIEBpbmNsdWRlIGJ1dHRvbi1ibG9jayh4bCk7XG5cbiAgICAgICAgKyAuYnRuLXhzLWJsb2NrLFxuICAgICAgICArIC5idG4tc20tYmxvY2ssXG4gICAgICAgICsgLmJ0bi1tZC1ibG9jayxcbiAgICAgICAgKyAuYnRuLWxnLWJsb2NrLFxuICAgICAgICArIC5idG4teGwtYmxvY2sge1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogJGJ0bi1ibG9jay1zcGFjaW5nLXk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbjwvc3R5bGU+XG4iLCJjb25zdCBMT0FERURfU0NSSVBUUyA9IHt9O1xuXG5mdW5jdGlvbiBlbGVtZW50KHVybCkge1xuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHVybCk7XG4gICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2phdmFzY3JpcHQnKTtcbiAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCdjaGFyc2V0JywgJ3V0Zi04Jyk7XG4gICAgcmV0dXJuIHNjcmlwdDtcbn1cblxuZnVuY3Rpb24gYXBwZW5kKHNjcmlwdCkge1xuICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKSkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJykuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH1cblxuICAgIHJldHVybiBzY3JpcHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNjcmlwdCh1cmwpIHtcbiAgICBpZihMT0FERURfU0NSSVBUU1t1cmxdIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICByZXR1cm4gTE9BREVEX1NDUklQVFNbdXJsXTtcbiAgICB9XG4gICAgZWxzZSBpZihMT0FERURfU0NSSVBUU1t1cmxdIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHNjcmlwdFtzcmM9XCIke3VybH1cIl1gKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShMT0FERURfU0NSSVBUU1t1cmxdKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIExPQURFRF9TQ1JJUFRTW3VybF0gPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhcHBlbmQoZWxlbWVudCh1cmwpKS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoTE9BREVEX1NDUklQVFNbdXJsXSA9IGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoKGUpIHtcbiAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgZWFjaCB9IGZyb20gJy4uL0Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vRnVuY3Rpb25zJztcbmltcG9ydCBzY3JpcHQgZnJvbSAnLi4vU2NyaXB0JztcblxuY29uc3QgVnVlSW5zdGFsbGVyID0ge1xuICAgIHVzZSxcbiAgICBzY3JpcHQsXG4gICAgcGx1Z2luLFxuICAgIHBsdWdpbnMsXG4gICAgZmlsdGVyLFxuICAgIGZpbHRlcnMsXG4gICAgY29tcG9uZW50LFxuICAgIGNvbXBvbmVudHMsXG4gICAgZGlyZWN0aXZlLFxuICAgIGRpcmVjdGl2ZXMsXG4gICAgJHBsdWdpbnM6IHt9LFxuICAgICRmaWx0ZXJzOiB7fSxcbiAgICAkZGlyZWN0aXZlczoge30sXG4gICAgJGNvbXBvbmVudHM6IHt9LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZShwbHVnaW4pIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LlZ1ZSkge1xuICAgICAgICB3aW5kb3cuVnVlLnVzZShwbHVnaW4pO1xuICAgIH1cblxuICAgIHJldHVybiBwbHVnaW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwbHVnaW4oVnVlLCBuYW1lLCBkZWYpIHtcbiAgICBpZighVnVlSW5zdGFsbGVyLiRwbHVnaW5zW25hbWVdKSB7XG4gICAgICAgIFZ1ZS51c2UoVnVlSW5zdGFsbGVyLiRwbHVnaW5zW25hbWVdID0gZGVmKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwbHVnaW5zKFZ1ZSwgcGx1Z2lucykge1xuICAgIGVhY2gocGx1Z2lucywgKGRlZiwgbmFtZSkgPT4ge1xuICAgICAgICBwbHVnaW4oVnVlLCBuYW1lLCBkZWYpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyKFZ1ZSwgbmFtZSwgZGVmKSB7XG4gICAgaWYoIVZ1ZUluc3RhbGxlci4kZmlsdGVyc1tuYW1lXSkge1xuICAgICAgICBWdWUudXNlKFZ1ZUluc3RhbGxlci4kZmlsdGVyc1tuYW1lXSA9IGRlZik7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVycyhWdWUsIGZpbHRlcnMpIHtcbiAgICBlYWNoKGZpbHRlcnMsIChkZWYsIG5hbWUpID0+IHtcbiAgICAgICAgZmlsdGVyKFZ1ZSwgbmFtZSwgZGVmKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvbmVudChWdWUsIG5hbWUsIGRlZikge1xuICAgIGlmKCFWdWVJbnN0YWxsZXIuJGNvbXBvbmVudHNbbmFtZV0pIHtcbiAgICAgICAgVnVlLmNvbXBvbmVudChuYW1lLCBWdWVJbnN0YWxsZXIuJGNvbXBvbmVudHNbbmFtZV0gPSBkZWYpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvbmVudHMoVnVlLCBjb21wb25lbnRzKSB7XG4gICAgZWFjaChjb21wb25lbnRzLCAoZGVmLCBuYW1lKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudChWdWUsIG5hbWUsIGRlZik7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXJlY3RpdmUoVnVlLCBuYW1lLCBkZWYpIHtcbiAgICBpZighVnVlSW5zdGFsbGVyLiRkaXJlY3RpdmVzW25hbWVdKSB7XG4gICAgICAgIGlmKGlzRnVuY3Rpb24oZGVmKSkge1xuICAgICAgICAgICAgVnVlLnVzZShWdWVJbnN0YWxsZXIuJGRpcmVjdGl2ZXNbbmFtZV0gPSBkZWYpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgVnVlLmRpcmVjdGl2ZShuYW1lLCBkZWYpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlyZWN0aXZlcyhWdWUsIGRpcmVjdGl2ZXMpIHtcbiAgICBlYWNoKGRpcmVjdGl2ZXMsIChkZWYsIG5hbWUpID0+IHtcbiAgICAgICAgZGlyZWN0aXZlKFZ1ZSwgbmFtZSwgZGVmKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgVnVlSW5zdGFsbGVyO1xuIiwiaW1wb3J0IEJ0biBmcm9tICcuL0J0bic7XG5pbXBvcnQgVnVlSW5zdGFsbGVyIGZyb20gJy4uLy4uL0hlbHBlcnMvVnVlSW5zdGFsbGVyL1Z1ZUluc3RhbGxlcic7XG5cbmNvbnN0IHBsdWdpbiA9IFZ1ZUluc3RhbGxlci51c2Uoe1xuXG4gICAgaW5zdGFsbChWdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgVnVlSW5zdGFsbGVyLmNvbXBvbmVudHMoe1xuICAgICAgICAgICAgQnRuXG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEJ0bjtcbiIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPjxzbG90Lz48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnbW9kYWwtYm9keSdcblxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZ1wiIHJvbGU9XCJkb2N1bWVudFwiPjxzbG90Lz48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnbW9kYWwtZGlhbG9nJ1xuXG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8aDUgY2xhc3M9XCJtb2RhbC10aXRsZVwiPjxzbG90Lz48L2g1PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdtb2RhbC10aXRsZSdcblxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICA8c2xvdCBuYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgIDxtb2RhbC10aXRsZT48c2xvdC8+PC9tb2RhbC10aXRsZT5cbiAgICAgICAgPC9zbG90PlxuXG4gICAgICAgIDxzbG90IG5hbWU9XCJjbG9zZS1idXR0b25cIj5cbiAgICAgICAgICAgIDxidXR0b24gdi1pZj1cImNsb3NlYWJsZVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgYXJpYS1sYWJlbD1cImFyaWFMYWJlbFwiIEBjbGljaz1cIiRlbWl0KCdjbG9zZScpXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L3Nsb3Q+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IE1vZGFsVGl0bGUgZnJvbSAnLi9Nb2RhbFRpdGxlJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ21vZGFsLWhlYWRlcicsXG5cbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIE1vZGFsVGl0bGVcbiAgICB9LFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICBhcmlhTGFiZWw6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICdDbG9zZSdcbiAgICAgICAgfSxcblxuICAgICAgICBjbG9zZWFibGU6IHtcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgICAgIH1cblxuICAgIH1cblxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPjxzbG90Lz48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnbW9kYWwtZm9vdGVyJ1xuXG59XG48L3NjcmlwdD5cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGhlaWdodCkge1xuICAgIHJldHVybiBpc0Zpbml0ZShoZWlnaHQpID8gaGVpZ2h0ICsgJ3B4JyA6IGhlaWdodDtcbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwiYWN0aXZpdHktaW5kaWNhdG9yXCIgOmNsYXNzPVwiY2xhc3Nlc1wiPlxuICAgICAgICA8ZGl2IHYtZm9yPVwiaSBpbiBub2Rlc1wiPjwvZGl2PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIHByb3BzOiB7XG4gICAgICAgIG5vZGVzOiB7XG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICAgICAgICBkZWZhdWx0OiAzXG4gICAgICAgIH0sXG4gICAgICAgIHNpemU6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIHByZWZpeDoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgZGVmYXVsdDogJ2FjdGl2aXR5LWluZGljYXRvci0nXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgY2xhc3NlczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBjbGFzc2VzID0ge307XG5cbiAgICAgICAgICAgIGNsYXNzZXNbdGhpcy4kb3B0aW9ucy5uYW1lXSA9ICEhdGhpcy4kb3B0aW9ucy5uYW1lO1xuICAgICAgICAgICAgY2xhc3Nlc1t0aGlzLnByZWZpeCArIHRoaXMuc2l6ZS5yZXBsYWNlKHRoaXMucHJlZml4LCAnJyldID0gISF0aGlzLnNpemU7XG5cbiAgICAgICAgICAgIHJldHVybiBjbGFzc2VzO1xuICAgICAgICB9XG4gICAgfVxuXG59XG48L3NjcmlwdD5cbiIsIjxzY3JpcHQ+XG5pbXBvcnQgQmFzZVR5cGUgZnJvbSAnLi9CYXNlVHlwZSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdhY3Rpdml0eS1pbmRpY2F0b3ItZG90cycsXG5cbiAgICBleHRlbmRzOiBCYXNlVHlwZVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuQGltcG9ydCAnLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL3Njc3MvZnVuY3Rpb25zLnNjc3MnO1xuQGltcG9ydCAnLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL3Njc3MvdmFyaWFibGVzLnNjc3MnO1xuXG4kYWN0aXZpdHktaW5kaWNhdG9yLWRvdC1zaXplOiAuNnJlbTtcblxuLmFjdGl2aXR5LWluZGljYXRvci1kb3RzIHtcblxuICAgICYgPiBkaXYge1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRncmF5LTkwMDtcbiAgICAgICAgd2lkdGg6ICRhY3Rpdml0eS1pbmRpY2F0b3ItZG90LXNpemU7XG4gICAgICAgIGhlaWdodDogJGFjdGl2aXR5LWluZGljYXRvci1kb3Qtc2l6ZTtcbiAgICAgICAgYW5pbWF0aW9uOiBhY3Rpdml0eS1pbmRpY2F0b3ItZG90cyAxLjRzIGluZmluaXRlIGVhc2UtaW4tb3V0IGJvdGg7XG4gICAgfVxuXG4gICAgJiA+IGRpdjpub3QoOmxhc3QtY2hpbGQpIHtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAkYWN0aXZpdHktaW5kaWNhdG9yLWRvdC1zaXplICogLjMzO1xuICAgIH1cblxuICAgICYuYWN0aXZpdHktaW5kaWNhdG9yLXhzID4gZGl2IHtcbiAgICAgICAgd2lkdGg6ICRhY3Rpdml0eS1pbmRpY2F0b3ItZG90LXNpemUgKiAuNTtcbiAgICAgICAgaGVpZ2h0OiAkYWN0aXZpdHktaW5kaWNhdG9yLWRvdC1zaXplICogLjU7XG4gICAgfVxuXG4gICAgJi5hY3Rpdml0eS1pbmRpY2F0b3Itc20gPiBkaXYge1xuICAgICAgICB3aWR0aDogJGFjdGl2aXR5LWluZGljYXRvci1kb3Qtc2l6ZSAqIC43NTtcbiAgICAgICAgaGVpZ2h0OiAkYWN0aXZpdHktaW5kaWNhdG9yLWRvdC1zaXplICogLjc1O1xuICAgIH1cblxuICAgICYuYWN0aXZpdHktaW5kaWNhdG9yLW1kID4gZGl2IHtcbiAgICAgICAgd2lkdGg6ICRhY3Rpdml0eS1pbmRpY2F0b3ItZG90LXNpemUgKiAxO1xuICAgICAgICBoZWlnaHQ6ICRhY3Rpdml0eS1pbmRpY2F0b3ItZG90LXNpemUgKiAxO1xuICAgIH1cblxuICAgICYuYWN0aXZpdHktaW5kaWNhdG9yLWxnID4gZGl2IHtcbiAgICAgICAgd2lkdGg6ICRhY3Rpdml0eS1pbmRpY2F0b3ItZG90LXNpemUgKiAxLjU7XG4gICAgICAgIGhlaWdodDogJGFjdGl2aXR5LWluZGljYXRvci1kb3Qtc2l6ZSAqIDEuNTtcbiAgICB9XG5cbiAgICAmLmFjdGl2aXR5LWluZGljYXRvci14bCA+IGRpdiB7XG4gICAgICAgIHdpZHRoOiAkYWN0aXZpdHktaW5kaWNhdG9yLWRvdC1zaXplICogMjtcbiAgICAgICAgaGVpZ2h0OiAkYWN0aXZpdHktaW5kaWNhdG9yLWRvdC1zaXplICogMjtcbiAgICB9XG5cbiAgICBAZm9yICRpIGZyb20gMCB0aHJvdWdoIDEyIHtcbiAgICAgICAgJiA+IGRpdjpudGgtY2hpbGQoI3skaSArIDF9KSB7XG4gICAgICAgICAgICBhbmltYXRpb24tZGVsYXk6ICRpICogLjE2cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBrZXlmcmFtZXMgYWN0aXZpdHktaW5kaWNhdG9yLWRvdHMge1xuICAgICAgICAwJSwgODAlLCAxMDAlIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gICAgICAgIH0gNDAlIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLmJ0bi1hY3Rpdml0eS1pbmRpY2F0b3ItZG90cyB7XG4gICAgJjpub3QoLmJ0bi13YXJuaW5nKSAuYWN0aXZpdHktaW5kaWNhdG9yLWRvdHMgPiBkaXYge1xuICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICB9XG59XG5cbjwvc3R5bGU+XG4iLCI8c2NyaXB0PlxuaW1wb3J0IEJhc2VUeXBlIGZyb20gJy4vQmFzZVR5cGUnO1xuaW1wb3J0IHsgZXh0ZW5kIH0gZnJvbSAnLi4vLi4vLi4vSGVscGVycy9GdW5jdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXInLFxuXG4gICAgZXh0ZW5kczogQmFzZVR5cGUsXG5cbiAgICBwcm9wczogZXh0ZW5kKHt9LCBCYXNlVHlwZS5wcm9wcywge1xuICAgICAgICBub2Rlczoge1xuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgICAgICAgZGVmYXVsdDogMTJcbiAgICAgICAgfVxuICAgIH0pXG59XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCI+XG5AaW1wb3J0ICcuL25vZGVfbW9kdWxlcy9ib290c3RyYXAvc2Nzcy9mdW5jdGlvbnMuc2Nzcyc7XG5AaW1wb3J0ICcuL25vZGVfbW9kdWxlcy9ib290c3RyYXAvc2Nzcy92YXJpYWJsZXMuc2Nzcyc7XG5cbiRhY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lci1zaXplOiAkZm9udC1zaXplLWJhc2UgKiAyLjI1O1xuJGFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyLXdpZHRoOiAxMCU7XG4kYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXItaGVpZ2h0OiAzMCU7XG4kYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXItZGVsYXk6IDFzO1xuXG5AbWl4aW4gc3Bpbm5lci1yb3RhdGUtc2VsZWN0b3JzKCRzdGFydDoxLCAkZW5kOjE2LCAkZGVsYXk6MS4ycykge1xuICAgIEBmb3IgJGkgZnJvbSAkc3RhcnQgdGhyb3VnaCAkZW5kIHtcbiAgICAgICAgJiA+IGRpdjpmaXJzdC1jaGlsZDpudGgtbGFzdC1jaGlsZCgjeyRpfSksXG4gICAgICAgICYgPiBkaXY6Zmlyc3QtY2hpbGQ6bnRoLWxhc3QtY2hpbGQoI3skaX0pIH4gZGl2IHtcbiAgICAgICAgICAgIEBpbmNsdWRlIHNwaW5uZXItcm90YXRlLXRyYW5zZm9ybSgkaSwgJGRlbGF5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQG1peGluIHNwaW5uZXItcm90YXRlLXRyYW5zZm9ybSgkdG90YWwsICRkZWxheToxLjJzKSB7XG4gICAgQGZvciAkaSBmcm9tIDEgdGhyb3VnaCAkdG90YWwge1xuICAgICAgICAmOm50aC1jaGlsZCgjeyRpfSkge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoI3szNjAgLyAkdG90YWwgKiAkaX1kZWcpO1xuXG4gICAgICAgICAgICAmOmJlZm9yZSB7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtI3skZGVsYXkgLSAoJGRlbGF5IC8gJHRvdGFsICogKCRpIC0gMSkpfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLmFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgd2lkdGg6ICRhY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lci1zaXplO1xuICAgIGhlaWdodDogJGFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyLXNpemU7XG5cbiAgICAmID4gZGl2ICB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgdG9wOiAwO1xuXG4gICAgICAgICY6YmVmb3JlIHtcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRncmF5LTkwMDtcbiAgICAgICAgICAgIHdpZHRoOiAkYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXItd2lkdGg7XG4gICAgICAgICAgICBoZWlnaHQ6ICRhY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lci1oZWlnaHQ7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgICAgICAgICBhbmltYXRpb246IGFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyICRhY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lci1kZWxheSBpbmZpbml0ZSBlYXNlLWluLW91dCBib3RoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJi5hY3Rpdml0eS1pbmRpY2F0b3IteHMge1xuICAgICAgICB3aWR0aDogJGFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyLXNpemUgKiAuNTtcbiAgICAgICAgaGVpZ2h0OiAkYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXItc2l6ZSAqIC41O1xuICAgIH1cbiAgICAmLmFjdGl2aXR5LWluZGljYXRvci1zbSB7XG4gICAgICAgIHdpZHRoOiAkYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXItc2l6ZSAqIC43NTtcbiAgICAgICAgaGVpZ2h0OiAkYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXItc2l6ZSAqIC43NTtcbiAgICB9XG4gICAgJi5hY3Rpdml0eS1pbmRpY2F0b3ItbWQge1xuICAgICAgICB3aWR0aDogJGFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyLXNpemUgKiAxO1xuICAgICAgICBoZWlnaHQ6ICRhY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lci1zaXplICogMTtcbiAgICB9XG4gICAgJi5hY3Rpdml0eS1pbmRpY2F0b3ItbGcge1xuICAgICAgICB3aWR0aDogJGFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyLXNpemUgKiAxLjU7XG4gICAgICAgIGhlaWdodDogJGFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyLXNpemUgKiAxLjU7XG4gICAgfVxuICAgICYuYWN0aXZpdHktaW5kaWNhdG9yLXhsIHtcbiAgICAgICAgd2lkdGg6ICRhY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lci1zaXplICogMjtcbiAgICAgICAgaGVpZ2h0OiAkYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXItc2l6ZSAqIDI7XG4gICAgfVxuXG4gICAgQGluY2x1ZGUgc3Bpbm5lci1yb3RhdGUtc2VsZWN0b3JzKDEsIDEyLCAkYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXItZGVsYXkpO1xuXG4gICAgQGtleWZyYW1lcyBhY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lciB7XG4gICAgICAgIDAlLCAzOSUsIDEwMCUgeyBvcGFjaXR5OiAwOyB9XG4gICAgICAgIDQwJSB7IG9wYWNpdHk6IDE7IH1cbiAgICB9XG59XG5cbi5idG4tYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXIge1xuICAgICY6bm90KC5idG4td2FybmluZykgLmFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyID4gZGl2OmJlZm9yZSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIH1cbn1cblxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IHYtaWY9XCJjZW50ZXJcIiBjbGFzcz1cImNlbnRlci13cmFwcGVyXCIgOmNsYXNzPVwieydwb3NpdGlvbi1yZWxhdGl2ZSc6IHJlbGF0aXZlLCAncG9zaXRpb24tZml4ZWQnOiBmaXhlZH1cIiA6c3R5bGU9XCJzdHlsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2VudGVyLWNvbnRlbnQgZC1mbGV4IGZsZXgtY29sdW1uIGFsaWduLWl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgPGNvbXBvbmVudCA6aXM9XCJjb21wb25lbnRcIiA6c2l6ZT1cInNpemVcIiA6cHJlZml4PVwicHJlZml4XCIvPlxuICAgICAgICAgICAgPGRpdiB2LWlmPVwibGFiZWxcIiB2LWh0bWw9XCJsYWJlbFwiIGNsYXNzPVwiYWN0aXZpdHktaW5kaWNhdG9yLWxhYmVsXCIvPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IHYtZWxzZSBjbGFzcz1cImQtZmxleCBmbGV4LWNvbHVtbiBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlclwiIDpzdHlsZT1cInN0eWxlXCI+XG4gICAgICAgIDxjb21wb25lbnQgOmlzPVwiY29tcG9uZW50XCIgOnNpemU9XCJzaXplXCIgOnByZWZpeD1cInByZWZpeFwiLz5cbiAgICAgICAgPGRpdiB2LWlmPVwibGFiZWxcIiB2LWh0bWw9XCJsYWJlbFwiIGNsYXNzPVwiYWN0aXZpdHktaW5kaWNhdG9yLWxhYmVsXCIvPlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB1bml0IGZyb20gJy4uLy4uL0hlbHBlcnMvVW5pdCc7XG5pbXBvcnQgQmFzZVR5cGUgZnJvbSAnLi9UeXBlcy9CYXNlVHlwZSc7XG5pbXBvcnQgQWN0aXZpdHlJbmRpY2F0b3JEb3RzIGZyb20gJy4vVHlwZXMvRG90cyc7XG5pbXBvcnQgeyBrZWJhYkNhc2UgfSBmcm9tICcuLi8uLi9IZWxwZXJzL0Z1bmN0aW9ucyc7XG5pbXBvcnQgQWN0aXZpdHlJbmRpY2F0b3JTcGlubmVyIGZyb20gJy4vVHlwZXMvU3Bpbm5lcic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdhY3Rpdml0eS1pbmRpY2F0b3InLFxuXG4gICAgZXh0ZW5kczogQmFzZVR5cGUsXG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIGNlbnRlcjogQm9vbGVhbixcblxuICAgICAgICBmaXhlZDogQm9vbGVhbixcblxuICAgICAgICBsYWJlbDogU3RyaW5nLFxuXG4gICAgICAgIHJlbGF0aXZlOiBCb29sZWFuLFxuXG4gICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICdkb3RzJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGhlaWdodDogW1N0cmluZywgTnVtYmVyXSxcblxuICAgICAgICBtYXhIZWlnaHQ6IFtTdHJpbmcsIE51bWJlcl0sXG5cbiAgICAgICAgbWluSGVpZ2h0OiBbU3RyaW5nLCBOdW1iZXJdLFxuXG4gICAgICAgIHdpZHRoOiBbU3RyaW5nLCBOdW1iZXJdLFxuXG4gICAgICAgIG1heFdpZHRoOiBbU3RyaW5nLCBOdW1iZXJdLFxuXG4gICAgICAgIG1pbldpZHRoOiBbU3RyaW5nLCBOdW1iZXJdXG5cbiAgICB9LFxuXG4gICAgY29tcG9uZW50czoge1xuICAgICAgICBBY3Rpdml0eUluZGljYXRvckRvdHMsXG4gICAgICAgIEFjdGl2aXR5SW5kaWNhdG9yU3Bpbm5lclxuICAgIH0sXG5cbiAgICBjb21wdXRlZDoge1xuXG4gICAgICAgIHN0eWxlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogdW5pdCh0aGlzLndpZHRoKSxcbiAgICAgICAgICAgICAgICBtYXhXaWR0aDogdW5pdCh0aGlzLm1heFdpZHRoKSxcbiAgICAgICAgICAgICAgICBtaW5XaWR0aDogdW5pdCh0aGlzLm1pbldpZHRoKSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHVuaXQodGhpcy5oZWlnaHQpLFxuICAgICAgICAgICAgICAgIG1heEhlaWdodDogdW5pdCh0aGlzLm1heEhlaWdodCksXG4gICAgICAgICAgICAgICAgbWluSGVpZ2h0OiB1bml0KHRoaXMubWluSGVpZ2h0KVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXBvbmVudCgpIHtcbiAgICAgICAgICAgIHJldHVybiBrZWJhYkNhc2UodGhpcy5wcmVmaXggKyB0aGlzLnR5cGUucmVwbGFjZSh0aGlzLnByZWZpeCwgJycpKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuLmNlbnRlci13cmFwcGVyIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xufVxuLmNlbnRlci1jb250ZW50IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA1MCU7XG4gICAgbGVmdDogNTAlO1xuICAgIG1hcmdpbi1yaWdodDogLTUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKVxufVxuPC9zdHlsZT5cbiIsImltcG9ydCBBY3Rpdml0eUluZGljYXRvciBmcm9tICcuL0FjdGl2aXR5SW5kaWNhdG9yJztcbmltcG9ydCBWdWVJbnN0YWxsZXIgZnJvbSAnLi4vLi4vSGVscGVycy9WdWVJbnN0YWxsZXIvVnVlSW5zdGFsbGVyJztcblxuY29uc3QgcGx1Z2luID0gVnVlSW5zdGFsbGVyLnVzZSh7XG5cbiAgICBpbnN0YWxsKFZ1ZSwgb3B0aW9ucykge1xuICAgICAgICBWdWVJbnN0YWxsZXIuY29tcG9uZW50cyh7XG4gICAgICAgICAgICBBY3Rpdml0eUluZGljYXRvclxuICAgICAgICB9KTtcbiAgICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBBY3Rpdml0eUluZGljYXRvcjtcbiIsIjx0ZW1wbGF0ZT5cbiAgICA8YnV0dG9uIDp0eXBlPVwidHlwZVwiIGNsYXNzPVwiYnRuXCIgOmNsYXNzPVwiY2xhc3Nlc1wiIEBjbGljaz1cIm9uQ2xpY2tcIj5cbiAgICAgICAgPGkgdi1pZj1cImljb25cIiA6Y2xhc3M9XCJpY29uXCIvPiB7e2xhYmVsfX1cbiAgICAgICAgPHNsb3QvPlxuICAgICAgICA8YWN0aXZpdHktaW5kaWNhdG9yIDp0eXBlPVwiaW5kaWNhdG9yXCIgLz5cbiAgICA8L2J1dHRvbj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgQWN0aXZpdHlJbmRpY2F0b3IgZnJvbSAnLi4vQWN0aXZpdHlJbmRpY2F0b3InO1xuXG5jb25zdCBjb252ZXJ0QW5pbWF0aW9uRGVsYXlUb0ludCA9IGZ1bmN0aW9uKGRlbGF5KSB7XG4gICAgY29uc3QgbnVtID0gcGFyc2VGbG9hdChkZWxheSwgMTApO1xuICAgIGNvbnN0IG1hdGNoZXMgPSBkZWxheS5tYXRjaCgvbT9zLyk7XG4gICAgY29uc3QgdW5pdCA9IG1hdGNoZXMgPyBtYXRjaGVzWzBdIDogZmFsc2U7XG5cbiAgICBsZXQgbWlsbGlzZWNvbmRzO1xuXG4gICAgc3dpdGNoICh1bml0KSB7XG4gICAgICAgIGNhc2UgXCJzXCI6IC8vIHNlY29uZHNcbiAgICAgICAgICAgIG1pbGxpc2Vjb25kcyA9IG51bSAqIDEwMDA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm1zXCI6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBtaWxsaXNlY29uZHMgPSBudW07XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gbWlsbGlzZWNvbmRzIHx8IDA7XG59O1xuXG5jb25zdCBhbmltYXRlZCA9IGZ1bmN0aW9uKGVsLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGRlZmF1bHRWaWV3ID0gKGVsLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQpLmRlZmF1bHRWaWV3O1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNhbGxiYWNrLmFwcGx5KCk7XG4gICAgfSwgY29udmVydEFuaW1hdGlvbkRlbGF5VG9JbnQoZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShlbCkuYW5pbWF0aW9uRHVyYXRpb24pKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdhY3Rpdml0eS1idXR0b24nLFxuXG4gICAgY29tcG9uZW50czoge1xuICAgICAgICBBY3Rpdml0eUluZGljYXRvclxuICAgIH0sXG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNYWtlIHRoZSBidXR0b24gYXBwZWFyIHdpdGggdGhlIGFjdGl2ZSBzdGF0ZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWF9bn1cbiAgICAgICAgICovXG4gICAgICAgIGFjdGl2ZTogQm9vbGVhbixcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2hvdyB0aGUgYWN0aXZpdHkgaW5kaWNhdG9yIGluc2lkZSB0aGUgYnV0dG9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYX1ufVxuICAgICAgICAgKi9cbiAgICAgICAgYWN0aXZpdHk6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc3BsYXkgdGhlIGJ1dHRvbiBhcyBibG9jayB3aWR0aC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWF9bn1cbiAgICAgICAgICovXG4gICAgICAgIGJsb2NrOiBCb29sZWFuLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNYWtlIHRoZSBidXR0b24gYXBwZWFyIHdpdGggdGhlIGRpc2FibGVkIHN0YXRlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYX1ufVxuICAgICAgICAgKi9cbiAgICAgICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBidXR0b24gbGFiZWwuIElmIG5vdCBwYXNzZWQgYXMgYSBwcm9wZXJ0eSwgbGFiZWwgbXVzdCBiZSBwYXNzZWRcbiAgICAgICAgICogaW5zaWRlIHRoZSBlbGVtZW50J3MgaHRtbC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBsYWJlbDogU3RyaW5nLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgYnV0dG9uIGljb25cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBpY29uOiBTdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBgdHlwZWAgYXR0cmlidXRlIGZvciB0aGUgYnV0dG9uIGVsZW1lbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdHlwZTogU3RyaW5nLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgc2l6ZSBvZiB0aGUgYnV0dG9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHNpemU6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICdtZCdcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHZhcmlhbnQgb2YgdGhlIGJ1dHRvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB2YXJpYW50OiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0OiAncHJpbWFyeSdcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHR5cGUgb2YgYWN0aXZpdHkgaW5kaWNhdG9yIGluc2lkZSB0aGUgYnV0dG9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIGluZGljYXRvcjoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgZGVmYXVsdDogJ3NwaW5uZXInXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBvcmllbnRhdGlvbiBvZiB0aGUgYWN0aXZpdHkgYnV0dG9uIGluc2lkZSB0aGUgYnV0dG9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIG9yaWVudGF0aW9uOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0OiAncmlnaHQnXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgbWV0aG9kczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNhYmxlIHRoZSBidXR0b24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4gdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgZGlzYWJsZSgpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRW5hYmxlIHRoZSBidXR0b24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4gdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgZW5hYmxlKCkge1xuICAgICAgICAgICAgdGhpcy4kZWwuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2hvdyB0aGUgYWN0aXZpdHkgaW5kaWNhdG9yIGluc2lkZSB0aGUgYnV0dG9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIHZvaWRcbiAgICAgICAgICovXG4gICAgICAgIHNob3dBY3Rpdml0eSgpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuXG4gICAgICAgICAgICBhbmltYXRlZCh0aGlzLiRlbCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoJ2J0bi1hY3Rpdml0eScpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2FjdGl2aXR5OnNob3cnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIaWRlIHRoZSBhY3Rpdml0eSBpbmRpY2F0b3IgaW5zaWRlIHRoZSBidXR0b24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4gdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgaGlkZUFjdGl2aXR5KCkge1xuICAgICAgICAgICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZCgnYnRuLWhpZGUtYWN0aXZpdHknKTtcblxuICAgICAgICAgICAgYW5pbWF0ZWQodGhpcy4kZWwsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2J0bi1hY3Rpdml0eScsICdidG4taGlkZS1hY3Rpdml0eScpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2FjdGl2aXR5OmhpZGUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgY2xpY2sgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdjbGljaycsIGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFuIG9iamVjdCBvZiBjbGFzc2VzIHRvIGFwcGVuZCB0byB0aGUgYnV0dG9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIHZvaWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzZXMoKSB7XG4gICAgICAgICAgICBjb25zdCBjbGFzc2VzID0ge1xuICAgICAgICAgICAgICAgICdkaXNhYmxlZCc6IHRoaXMuZGlzYWJsZWQsXG4gICAgICAgICAgICAgICAgJ2FjdGl2ZSc6IHRoaXMuYWN0aXZlLFxuICAgICAgICAgICAgICAgICdidG4tYmxvY2snOiB0aGlzLmJsb2NrLFxuICAgICAgICAgICAgICAgICdidG4tYWN0aXZpdHknOiB0aGlzLmFjdGl2aXR5XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjbGFzc2VzWydidG4tJyArIHRoaXMuc2l6ZS5yZXBsYWNlKCdidG4tJywgJycpXSA9ICEhdGhpcy5zaXplO1xuICAgICAgICAgICAgY2xhc3Nlc1snYnRuLScgKyB0aGlzLnZhcmlhbnQucmVwbGFjZSgnYnRuLScsICcnKV0gPSAhIXRoaXMudmFyaWFudDtcbiAgICAgICAgICAgIGNsYXNzZXNbJ2J0bi1hY3Rpdml0eS0nICsgdGhpcy5vcmllbnRhdGlvbi5yZXBsYWNlKCdidG4tYWN0aXZpdHktJywgJycpXSA9ICEhdGhpcy5vcmllbnRhdGlvbjtcbiAgICAgICAgICAgIGNsYXNzZXNbJ2J0bi1hY3Rpdml0eS1pbmRpY2F0b3ItJyArIHRoaXMuaW5kaWNhdG9yLnJlcGxhY2UoJ2J0bi1hY3Rpdml0eS1pbmRpY2F0b3ItJywgJycpXSA9ICEhdGhpcy5pbmRpY2F0b3I7XG5cbiAgICAgICAgICAgIHJldHVybiBjbGFzc2VzO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHdhdGNoOiB7XG5cbiAgICAgICAgYWN0aXZpdHkodmFsdWUpIHtcbiAgICAgICAgICAgIGlmKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93QWN0aXZpdHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZUFjdGl2aXR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuQGltcG9ydCAnLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL3Njc3MvZnVuY3Rpb25zLnNjc3MnO1xuQGltcG9ydCAnLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL3Njc3MvdmFyaWFibGVzLnNjc3MnO1xuXG4vLyBBY3Rpdml0eSBJbmRpY2F0b3IgdmFyaWFibGVzXG4kYWN0aXZpdHktaW5kaWNhdG9yLWFuaW1hdGVkLWRlbGF5LWluOiAzMzNtcztcbiRhY3Rpdml0eS1pbmRpY2F0b3ItYW5pbWF0ZWQtZGVsYXktb3V0OiAzMzNtcztcblxuJGFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyLXNpemU6ICRmb250LXNpemUtYmFzZSAqIDIuMjU7XG4kYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXItd2lkdGg6IDEwJTtcbiRhY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lci1oZWlnaHQ6IDMwJTtcbiRhY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lci1kZWxheTogMXM7XG5cbkBrZXlmcmFtZXMgYnRuLWFjdGl2aXR5LWluIHtcbiAgICAwJSwgMTAwJSB7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgfSAzMCUge1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKC45OCk7XG4gICAgfVxufVxuXG5Aa2V5ZnJhbWVzIGJ0bi1hY3Rpdml0eS1vdXQge1xuICAgIDAlLCAxMDAlIHtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICB9IDcwJSB7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoLjk4KTtcbiAgICB9XG59XG5cbi8vIEFjdGl2aXR5IEluZGljYXRvciBCdXR0b25cbi5idG4tYWN0aXZpdHktdG9wLFxuLmJ0bi1hY3Rpdml0eS1ib3R0b20sXG4uYnRuLWFjdGl2aXR5LWxlZnQsXG4uYnRuLWFjdGl2aXR5LXJpZ2h0IHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgdHJhbnNpdGlvbjogcGFkZGluZyAoJGFjdGl2aXR5LWluZGljYXRvci1hbmltYXRlZC1kZWxheS1pbiAvIDIpIGVhc2UtaW47XG5cbiAgICAmIC5hY3Rpdml0eS1pbmRpY2F0b3Ige1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAkYWN0aXZpdHktaW5kaWNhdG9yLWFuaW1hdGVkLWRlbGF5LW91dCBlYXNlLWluO1xuICAgIH1cbn1cblxuLmJ0bi1hY3Rpdml0eS10b3AgLmFjdGl2aXR5LWluZGljYXRvcixcbi5idG4tYWN0aXZpdHktYm90dG9tIC5hY3Rpdml0eS1pbmRpY2F0b3Ige1xuICAgIGxlZnQ6IDUwJTtcbiAgICBtYXJnaW4tcmlnaHQ6IC01MCU7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xufVxuLmJ0bi1hY3Rpdml0eS1sZWZ0IC5hY3Rpdml0eS1pbmRpY2F0b3IsXG4uYnRuLWFjdGl2aXR5LXJpZ2h0IC5hY3Rpdml0eS1pbmRpY2F0b3Ige1xuICAgIHRvcDogNTAlO1xuICAgIG1hcmdpbi1ib3R0b206IC01MCU7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xufVxuXG4uYnRuLWFjdGl2aXR5Om5vdCguYnRuLWxpbmspIHtcbiAgICBhbmltYXRpb246IGJ0bi1hY3Rpdml0eS1pbiAkYWN0aXZpdHktaW5kaWNhdG9yLWFuaW1hdGVkLWRlbGF5LWluO1xufVxuLmJ0bi1oaWRlLWFjdGl2aXR5Om5vdCguYnRuLWxpbmspIHtcbiAgICBhbmltYXRpb246IGJ0bi1hY3Rpdml0eS1vdXQgJGFjdGl2aXR5LWluZGljYXRvci1hbmltYXRlZC1kZWxheS1vdXQ7XG59XG5cbi5idG4tYWN0aXZpdHkge1xuXG4gICAgJi5idG4taGlkZS1hY3Rpdml0eSAuYWN0aXZpdHktaW5kaWNhdG9yIHtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICB9XG5cbiAgICAmIC5hY3Rpdml0eS1pbmRpY2F0b3Ige1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgfVxuXG4gICAgJi5idG4tb3V0bGluZS1wcmltYXJ5LmJ0bi1hY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lciAuYWN0aXZpdHktaW5kaWNhdG9yID4gZGl2OmJlZm9yZSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRwcmltYXJ5O1xuICAgIH1cbiAgICAmLmJ0bi1vdXRsaW5lLXNlY29uZGFyeS5idG4tYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXIgLmFjdGl2aXR5LWluZGljYXRvciA+IGRpdjpiZWZvcmUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkc3VjY2VzcztcbiAgICB9XG4gICAgJi5idG4tb3V0bGluZS1kYW5nZXIuYnRuLWFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyIC5hY3Rpdml0eS1pbmRpY2F0b3IgPiBkaXY6YmVmb3JlIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGRhbmdlcjtcbiAgICB9XG4gICAgJi5idG4tb3V0bGluZS1zdWNjZXNzLmJ0bi1hY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lciAuYWN0aXZpdHktaW5kaWNhdG9yID4gZGl2OmJlZm9yZSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRzdWNjZXNzO1xuICAgIH1cbiAgICAmLmJ0bi1vdXRsaW5lLXdhcm5pbmcuYnRuLWFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyIC5hY3Rpdml0eS1pbmRpY2F0b3IgPiBkaXY6YmVmb3JlIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHdhcm5pbmc7XG4gICAgfVxuICAgICYuYnRuLW91dGxpbmUtaW5mby5idG4tYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXIgLmFjdGl2aXR5LWluZGljYXRvciA+IGRpdjpiZWZvcmUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkaW5mbztcbiAgICB9XG4gICAgJi5idG4tb3V0bGluZS1saW5rLmJ0bi1hY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lciAuYWN0aXZpdHktaW5kaWNhdG9yID4gZGl2OmJlZm9yZSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRsaW5rLWNvbG9yO1xuICAgIH1cblxuICAgICYuYnRuLXhzIHtcbiAgICAgICAgJi5idG4tYWN0aXZpdHktdG9wLmJ0bi1hY3Rpdml0eS1pbmRpY2F0b3ItZG90cyB7XG4gICAgICAgICAgICBwYWRkaW5nLXRvcDogJGZvbnQtc2l6ZS1iYXNlICogMS4yNTtcblxuICAgICAgICAgICAgJiAuYWN0aXZpdHktaW5kaWNhdG9yIHtcbiAgICAgICAgICAgICAgICB0b3A6ICRmb250LXNpemUtYmFzZSAqIC41O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJi5idG4tYWN0aXZpdHktYm90dG9tLmJ0bi1hY3Rpdml0eS1pbmRpY2F0b3ItZG90cyB7XG4gICAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogJGZvbnQtc2l6ZS1iYXNlICogMS4yNTtcblxuICAgICAgICAgICAgJiAuYWN0aXZpdHktaW5kaWNhdG9yIHtcbiAgICAgICAgICAgICAgICBib3R0b206ICRmb250LXNpemUtYmFzZSAqIC41O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJi5idG4tYWN0aXZpdHktbGVmdC5idG4tYWN0aXZpdHktaW5kaWNhdG9yLWRvdHMge1xuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAkZm9udC1zaXplLWJhc2UgKiAyLjMzO1xuXG4gICAgICAgICAgICAmIC5hY3Rpdml0eS1pbmRpY2F0b3Ige1xuICAgICAgICAgICAgICAgIGxlZnQ6ICRmb250LXNpemUtYmFzZSAqIC41O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJi5idG4tYWN0aXZpdHktcmlnaHQuYnRuLWFjdGl2aXR5LWluZGljYXRvci1kb3RzIHtcbiAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6ICRmb250LXNpemUtYmFzZSAqIDIuMzM7XG5cbiAgICAgICAgICAgICYgLmFjdGl2aXR5LWluZGljYXRvciB7XG4gICAgICAgICAgICAgICAgcmlnaHQ6ICRmb250LXNpemUtYmFzZSAqIC41O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJi5idG4tYWN0aXZpdHktaW5kaWNhdG9yLWRvdHMgLmFjdGl2aXR5LWluZGljYXRvciA+IGRpdixcbiAgICAgICAgJiAuYWN0aXZpdHktaW5kaWNhdG9yLWRvdHMgPiBkaXYge1xuICAgICAgICAgICAgd2lkdGg6ICRmb250LXNpemUtYmFzZSAvIDM7XG4gICAgICAgICAgICBoZWlnaHQ6ICRmb250LXNpemUtYmFzZSAvIDM7XG4gICAgICAgIH1cblxuICAgICAgICAmLmJ0bi1hY3Rpdml0eS10b3AuYnRuLWFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyIHtcbiAgICAgICAgICAgIHBhZGRpbmctdG9wOiAkZm9udC1zaXplLWJhc2UgKiAxLjY2O1xuXG4gICAgICAgICAgICAmIC5hY3Rpdml0eS1pbmRpY2F0b3Ige1xuICAgICAgICAgICAgICAgIHRvcDogJGZvbnQtc2l6ZS1iYXNlICogLjI1O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJi5idG4tYWN0aXZpdHktYm90dG9tLmJ0bi1hY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lciB7XG4gICAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogJGZvbnQtc2l6ZS1iYXNlICogMS42NjtcblxuICAgICAgICAgICAgJiAuYWN0aXZpdHktaW5kaWNhdG9yIHtcbiAgICAgICAgICAgICAgICBib3R0b206ICRmb250LXNpemUtYmFzZSAqIC4yNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICYuYnRuLWFjdGl2aXR5LWxlZnQuYnRuLWFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyIHtcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogJGZvbnQtc2l6ZS1iYXNlICogMS42NjtcblxuICAgICAgICAgICAgJiAuYWN0aXZpdHktaW5kaWNhdG9yIHtcbiAgICAgICAgICAgICAgICBsZWZ0OiAkZm9udC1zaXplLWJhc2UgKiAuMjU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAmLmJ0bi1hY3Rpdml0eS1yaWdodC5idG4tYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXIge1xuICAgICAgICAgICAgcGFkZGluZy1yaWdodDogJGZvbnQtc2l6ZS1iYXNlICogMS42NjtcblxuICAgICAgICAgICAgJiAuYWN0aXZpdHktaW5kaWNhdG9yIHtcbiAgICAgICAgICAgICAgICByaWdodDogJGZvbnQtc2l6ZS1iYXNlICogLjI1O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJi5idG4tYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXIgLmFjdGl2aXR5LWluZGljYXRvcixcbiAgICAgICAgJiAuYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXIge1xuICAgICAgICAgICAgd2lkdGg6ICRmb250LXNpemUtYmFzZSAqIDE7XG4gICAgICAgICAgICBoZWlnaHQ6ICRmb250LXNpemUtYmFzZSAqIDE7XG5cbiAgICAgICAgICAgICYgPiBkaXY6YmVmb3JlIHtcbiAgICAgICAgICAgICAgICAvL3dpZHRoOiAkYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXItd2lkdGggKiAuNjM7XG4gICAgICAgICAgICAgICAgLy9oZWlnaHQ6ICRhY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lci1oZWlnaHQgKiAuNjY7XG4gICAgICAgICAgICAgICAgd2lkdGg6ICRhY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lci13aWR0aCAqIC44NDtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICRhY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lci1oZWlnaHQgKiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgJi5idG4tc20ge1xuICAgICAgICAmLmJ0bi1hY3Rpdml0eS10b3AuYnRuLWFjdGl2aXR5LWluZGljYXRvci1kb3RzIHtcbiAgICAgICAgICAgIHBhZGRpbmctdG9wOiAkZm9udC1zaXplLWJhc2UgKiAxLjc1O1xuXG4gICAgICAgICAgICAmIC5hY3Rpdml0eS1pbmRpY2F0b3Ige1xuICAgICAgICAgICAgICAgIHRvcDogJGZvbnQtc2l6ZS1iYXNlICogLjU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAmLmJ0bi1hY3Rpdml0eS1ib3R0b20uYnRuLWFjdGl2aXR5LWluZGljYXRvci1kb3RzIHtcbiAgICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAkZm9udC1zaXplLWJhc2UgKiAxLjc1O1xuXG4gICAgICAgICAgICAmIC5hY3Rpdml0eS1pbmRpY2F0b3Ige1xuICAgICAgICAgICAgICAgIGJvdHRvbTogJGZvbnQtc2l6ZS1iYXNlICogLjU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAmLmJ0bi1hY3Rpdml0eS1sZWZ0LmJ0bi1hY3Rpdml0eS1pbmRpY2F0b3ItZG90cyB7XG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6ICRmb250LXNpemUtYmFzZSAqIDM7XG5cbiAgICAgICAgICAgICYgLmFjdGl2aXR5LWluZGljYXRvciB7XG4gICAgICAgICAgICAgICAgbGVmdDogJGZvbnQtc2l6ZS1iYXNlICogLjU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAmLmJ0bi1hY3Rpdml0eS1yaWdodC5idG4tYWN0aXZpdHktaW5kaWNhdG9yLWRvdHMge1xuICAgICAgICAgICAgcGFkZGluZy1yaWdodDogJGZvbnQtc2l6ZS1iYXNlICogMztcblxuICAgICAgICAgICAgJiAuYWN0aXZpdHktaW5kaWNhdG9yIHtcbiAgICAgICAgICAgICAgICByaWdodDogJGZvbnQtc2l6ZS1iYXNlICogLjU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAmLmJ0bi1hY3Rpdml0eS1pbmRpY2F0b3ItZG90cyAuYWN0aXZpdHktaW5kaWNhdG9yID4gZGl2LFxuICAgICAgICAmIC5hY3Rpdml0eS1pbmRpY2F0b3ItZG90cyA+IGRpdiB7XG4gICAgICAgICAgICB3aWR0aDogJGZvbnQtc2l6ZS1iYXNlIC8gMjtcbiAgICAgICAgICAgIGhlaWdodDogJGZvbnQtc2l6ZS1iYXNlIC8gMjtcbiAgICAgICAgfVxuXG4gICAgICAgICYuYnRuLWFjdGl2aXR5LXRvcC5idG4tYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXIge1xuICAgICAgICAgICAgcGFkZGluZy10b3A6ICRmb250LXNpemUtYmFzZSAqIDI7XG5cbiAgICAgICAgICAgICYgLmFjdGl2aXR5LWluZGljYXRvciB7XG4gICAgICAgICAgICAgICAgdG9wOiAkZm9udC1zaXplLWJhc2UgKiAuMzM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAmLmJ0bi1hY3Rpdml0eS1ib3R0b20uYnRuLWFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyIHtcbiAgICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAkZm9udC1zaXplLWJhc2UgKiAyO1xuXG4gICAgICAgICAgICAmIC5hY3Rpdml0eS1pbmRpY2F0b3Ige1xuICAgICAgICAgICAgICAgIGJvdHRvbTogJGZvbnQtc2l6ZS1iYXNlICogLjMzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJi5idG4tYWN0aXZpdHktbGVmdC5idG4tYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXIge1xuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAkZm9udC1zaXplLWJhc2UgKiAyLjU7XG5cbiAgICAgICAgICAgICYgLmFjdGl2aXR5LWluZGljYXRvciB7XG4gICAgICAgICAgICAgICAgbGVmdDogJGZvbnQtc2l6ZS1iYXNlICogLjU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAmLmJ0bi1hY3Rpdml0eS1yaWdodC5idG4tYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXIge1xuICAgICAgICAgICAgcGFkZGluZy1yaWdodDogJGZvbnQtc2l6ZS1iYXNlICogMi41O1xuXG4gICAgICAgICAgICAmIC5hY3Rpdml0eS1pbmRpY2F0b3Ige1xuICAgICAgICAgICAgICAgIHJpZ2h0OiAkZm9udC1zaXplLWJhc2UgKiAuNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICYuYnRuLWFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyIC5hY3Rpdml0eS1pbmRpY2F0b3IsXG4gICAgICAgICYgLmFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyIHtcbiAgICAgICAgICAgIHdpZHRoOiAkZm9udC1zaXplLWJhc2UgKiAxLjU7XG4gICAgICAgICAgICBoZWlnaHQ6ICRmb250LXNpemUtYmFzZSAqIDEuNTtcblxuICAgICAgICAgICAgJiA+IGRpdjpiZWZvcmUge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAkYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXItd2lkdGggKiAuNTY7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAkYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXItaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgJjpub3QoLmJ0bi14cyk6bm90KC5idG4tc20pOm5vdCguYnRuLW1kKTpub3QoLmJ0bi1sZyk6bm90KC5idG4teGwpLFxuICAgICYuYnRuLW1kIHtcbiAgICAgICAgJi5idG4tYWN0aXZpdHktdG9wLmJ0bi1hY3Rpdml0eS1pbmRpY2F0b3ItZG90cyB7XG4gICAgICAgICAgICBwYWRkaW5nLXRvcDogJGZvbnQtc2l6ZS1iYXNlICogMjtcblxuICAgICAgICAgICAgJiAuYWN0aXZpdHktaW5kaWNhdG9yIHtcbiAgICAgICAgICAgICAgICB0b3A6ICRmb250LXNpemUtYmFzZSAqIC42NjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICYuYnRuLWFjdGl2aXR5LWJvdHRvbS5idG4tYWN0aXZpdHktaW5kaWNhdG9yLWRvdHMge1xuICAgICAgICAgICAgcGFkZGluZy1ib3R0b206ICRmb250LXNpemUtYmFzZSAqIDI7XG5cbiAgICAgICAgICAgICYgLmFjdGl2aXR5LWluZGljYXRvciB7XG4gICAgICAgICAgICAgICAgYm90dG9tOiAkZm9udC1zaXplLWJhc2UgKiAuNjY7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAmLmJ0bi1hY3Rpdml0eS1sZWZ0LmJ0bi1hY3Rpdml0eS1pbmRpY2F0b3ItZG90cyB7XG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6ICRmb250LXNpemUtYmFzZSAqIDQ7XG5cbiAgICAgICAgICAgICYgLmFjdGl2aXR5LWluZGljYXRvciB7XG4gICAgICAgICAgICAgICAgbGVmdDogJGZvbnQtc2l6ZS1iYXNlICogLjU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAmLmJ0bi1hY3Rpdml0eS1yaWdodC5idG4tYWN0aXZpdHktaW5kaWNhdG9yLWRvdHMge1xuICAgICAgICAgICAgcGFkZGluZy1yaWdodDogJGZvbnQtc2l6ZS1iYXNlICogNDtcblxuICAgICAgICAgICAgJiAuYWN0aXZpdHktaW5kaWNhdG9yIHtcbiAgICAgICAgICAgICAgICByaWdodDogJGZvbnQtc2l6ZS1iYXNlICogLjU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAmLmJ0bi1hY3Rpdml0eS1pbmRpY2F0b3ItZG90cyAuYWN0aXZpdHktaW5kaWNhdG9yID4gZGl2LFxuICAgICAgICAmIC5hY3Rpdml0eS1pbmRpY2F0b3ItZG90cyA+IGRpdiB7XG4gICAgICAgICAgICB3aWR0aDogJGZvbnQtc2l6ZS1iYXNlIC8gMS4yNTtcbiAgICAgICAgICAgIGhlaWdodDogJGZvbnQtc2l6ZS1iYXNlIC8gMS4yNTtcbiAgICAgICAgfVxuXG4gICAgICAgICYuYnRuLWFjdGl2aXR5LXRvcC5idG4tYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXIge1xuICAgICAgICAgICAgcGFkZGluZy10b3A6ICRmb250LXNpemUtYmFzZSAqIDIuNzU7XG5cbiAgICAgICAgICAgICYgLmFjdGl2aXR5LWluZGljYXRvciB7XG4gICAgICAgICAgICAgICAgdG9wOiAkZm9udC1zaXplLWJhc2UgKiAuMzM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAmLmJ0bi1hY3Rpdml0eS1ib3R0b20uYnRuLWFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyIHtcbiAgICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAkZm9udC1zaXplLWJhc2UgKiAyLjc1O1xuXG4gICAgICAgICAgICAmIC5hY3Rpdml0eS1pbmRpY2F0b3Ige1xuICAgICAgICAgICAgICAgIGJvdHRvbTogJGZvbnQtc2l6ZS1iYXNlICogLjMzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJi5idG4tYWN0aXZpdHktbGVmdC5idG4tYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXIge1xuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAkZm9udC1zaXplLWJhc2UgKiAyLjc1O1xuXG4gICAgICAgICAgICAmIC5hY3Rpdml0eS1pbmRpY2F0b3Ige1xuICAgICAgICAgICAgICAgIGxlZnQ6ICRmb250LXNpemUtYmFzZSAqIC41O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJi5idG4tYWN0aXZpdHktcmlnaHQuYnRuLWFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyIHtcbiAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6ICRmb250LXNpemUtYmFzZSAqIDIuNzU7XG5cbiAgICAgICAgICAgICYgLmFjdGl2aXR5LWluZGljYXRvciB7XG4gICAgICAgICAgICAgICAgcmlnaHQ6ICRmb250LXNpemUtYmFzZSAqIC41O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJi5idG4tYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXIgLmFjdGl2aXR5LWluZGljYXRvcixcbiAgICAgICAgJiAuYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXIge1xuICAgICAgICAgICAgd2lkdGg6ICRmb250LXNpemUtYmFzZSAqIDEuNzU7XG4gICAgICAgICAgICBoZWlnaHQ6ICRmb250LXNpemUtYmFzZSAqIDEuNzU7XG5cbiAgICAgICAgICAgICYgPiBkaXY6YmVmb3JlIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogJGFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyLXdpZHRoICogLjY2O1xuICAgICAgICAgICAgICAgIGhlaWdodDogJGFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyLWhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgICYuYnRuLWxnIHtcbiAgICAgICAgJi5idG4tYWN0aXZpdHktdG9wLmJ0bi1hY3Rpdml0eS1pbmRpY2F0b3ItZG90cyB7XG4gICAgICAgICAgICBwYWRkaW5nLXRvcDogJGZvbnQtc2l6ZS1iYXNlICogMi43NTtcblxuICAgICAgICAgICAgJiAuYWN0aXZpdHktaW5kaWNhdG9yIHtcbiAgICAgICAgICAgICAgICB0b3A6ICRmb250LXNpemUtYmFzZSAqIC42NjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICYuYnRuLWFjdGl2aXR5LWJvdHRvbS5idG4tYWN0aXZpdHktaW5kaWNhdG9yLWRvdHMge1xuICAgICAgICAgICAgcGFkZGluZy1ib3R0b206ICRmb250LXNpemUtYmFzZSAqIDIuNzU7XG5cbiAgICAgICAgICAgICYgLmFjdGl2aXR5LWluZGljYXRvciB7XG4gICAgICAgICAgICAgICAgYm90dG9tOiAkZm9udC1zaXplLWJhc2UgKiAuNjY7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAmLmJ0bi1hY3Rpdml0eS1sZWZ0LmJ0bi1hY3Rpdml0eS1pbmRpY2F0b3ItZG90cyB7XG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6ICRmb250LXNpemUtYmFzZSAqIDU7XG5cbiAgICAgICAgICAgICYgLmFjdGl2aXR5LWluZGljYXRvciB7XG4gICAgICAgICAgICAgICAgbGVmdDogJGZvbnQtc2l6ZS1iYXNlICogLjU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAmLmJ0bi1hY3Rpdml0eS1yaWdodC5idG4tYWN0aXZpdHktaW5kaWNhdG9yLWRvdHMge1xuICAgICAgICAgICAgcGFkZGluZy1yaWdodDogJGZvbnQtc2l6ZS1iYXNlICogNTtcblxuICAgICAgICAgICAgJiAuYWN0aXZpdHktaW5kaWNhdG9yIHtcbiAgICAgICAgICAgICAgICByaWdodDogJGZvbnQtc2l6ZS1iYXNlICogLjU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAmLmJ0bi1hY3Rpdml0eS1pbmRpY2F0b3ItZG90cyAuYWN0aXZpdHktaW5kaWNhdG9yID4gZGl2LFxuICAgICAgICAmIC5hY3Rpdml0eS1pbmRpY2F0b3ItZG90cyA+IGRpdiB7XG4gICAgICAgICAgICB3aWR0aDogJGZvbnQtc2l6ZS1iYXNlICogMS4xO1xuICAgICAgICAgICAgaGVpZ2h0OiAkZm9udC1zaXplLWJhc2UgKiAxLjE7XG4gICAgICAgIH1cblxuICAgICAgICAmLmJ0bi1hY3Rpdml0eS10b3AuYnRuLWFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyIHtcbiAgICAgICAgICAgIHBhZGRpbmctdG9wOiAkZm9udC1zaXplLWJhc2UgKiAzLjU7XG5cbiAgICAgICAgICAgICYgLmFjdGl2aXR5LWluZGljYXRvciB7XG4gICAgICAgICAgICAgICAgdG9wOiAkZm9udC1zaXplLWJhc2UgKiAuNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICYuYnRuLWFjdGl2aXR5LWJvdHRvbS5idG4tYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXIge1xuICAgICAgICAgICAgcGFkZGluZy1ib3R0b206ICRmb250LXNpemUtYmFzZSAqIDMuNTtcblxuICAgICAgICAgICAgJiAuYWN0aXZpdHktaW5kaWNhdG9yIHtcbiAgICAgICAgICAgICAgICBib3R0b206ICRmb250LXNpemUtYmFzZSAqIC41O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJi5idG4tYWN0aXZpdHktbGVmdC5idG4tYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXIge1xuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAkZm9udC1zaXplLWJhc2UgKiAzLjI1O1xuXG4gICAgICAgICAgICAmIC5hY3Rpdml0eS1pbmRpY2F0b3Ige1xuICAgICAgICAgICAgICAgIGxlZnQ6ICRmb250LXNpemUtYmFzZSAqIC41O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJi5idG4tYWN0aXZpdHktcmlnaHQuYnRuLWFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyIHtcbiAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6ICRmb250LXNpemUtYmFzZSAqIDMuMjU7XG5cbiAgICAgICAgICAgICYgLmFjdGl2aXR5LWluZGljYXRvciB7XG4gICAgICAgICAgICAgICAgcmlnaHQ6ICRmb250LXNpemUtYmFzZSAqIC41O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJi5idG4tYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXIgLmFjdGl2aXR5LWluZGljYXRvcixcbiAgICAgICAgJiAuYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXIge1xuICAgICAgICAgICAgd2lkdGg6ICRmb250LXNpemUtYmFzZSAqIDIuMTU7XG4gICAgICAgICAgICBoZWlnaHQ6ICRmb250LXNpemUtYmFzZSAqIDIuMTU7XG5cbiAgICAgICAgICAgICYgPiBkaXY6YmVmb3JlIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogJGFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyLXdpZHRoICogLjc1O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgJi5idG4teGwge1xuICAgICAgICAmLmJ0bi1hY3Rpdml0eS10b3AuYnRuLWFjdGl2aXR5LWluZGljYXRvci1kb3RzIHtcbiAgICAgICAgICAgIHBhZGRpbmctdG9wOiAkZm9udC1zaXplLWJhc2UgKiAzLjc1O1xuXG4gICAgICAgICAgICAmIC5hY3Rpdml0eS1pbmRpY2F0b3Ige1xuICAgICAgICAgICAgICAgIHRvcDogJGZvbnQtc2l6ZS1iYXNlICogMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICYuYnRuLWFjdGl2aXR5LWJvdHRvbS5idG4tYWN0aXZpdHktaW5kaWNhdG9yLWRvdHMge1xuICAgICAgICAgICAgcGFkZGluZy1ib3R0b206ICRmb250LXNpemUtYmFzZSAqIDMuNzU7XG5cbiAgICAgICAgICAgICYgLmFjdGl2aXR5LWluZGljYXRvciB7XG4gICAgICAgICAgICAgICAgYm90dG9tOiAkZm9udC1zaXplLWJhc2UgKiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJi5idG4tYWN0aXZpdHktbGVmdC5idG4tYWN0aXZpdHktaW5kaWNhdG9yLWRvdHMge1xuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAkZm9udC1zaXplLWJhc2UgKiA2O1xuXG4gICAgICAgICAgICAmIC5hY3Rpdml0eS1pbmRpY2F0b3Ige1xuICAgICAgICAgICAgICAgIGxlZnQ6ICRmb250LXNpemUtYmFzZSAqIC43NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICYuYnRuLWFjdGl2aXR5LXJpZ2h0LmJ0bi1hY3Rpdml0eS1pbmRpY2F0b3ItZG90cyB7XG4gICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiAkZm9udC1zaXplLWJhc2UgKiA2O1xuXG4gICAgICAgICAgICAmIC5hY3Rpdml0eS1pbmRpY2F0b3Ige1xuICAgICAgICAgICAgICAgIHJpZ2h0OiAkZm9udC1zaXplLWJhc2UgKiAuNzU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAmLmJ0bi1hY3Rpdml0eS1pbmRpY2F0b3ItZG90cyAuYWN0aXZpdHktaW5kaWNhdG9yID4gZGl2LFxuICAgICAgICAmIC5hY3Rpdml0eS1pbmRpY2F0b3ItZG90cyA+IGRpdiB7XG4gICAgICAgICAgICB3aWR0aDogJGZvbnQtc2l6ZS1iYXNlICogMS4yNTtcbiAgICAgICAgICAgIGhlaWdodDogJGZvbnQtc2l6ZS1iYXNlICogMS4yNTtcbiAgICAgICAgfVxuXG4gICAgICAgICYuYnRuLWFjdGl2aXR5LXRvcC5idG4tYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXIge1xuICAgICAgICAgICAgcGFkZGluZy10b3A6ICRmb250LXNpemUtYmFzZSAqIDQuMjU7XG5cbiAgICAgICAgICAgICYgLmFjdGl2aXR5LWluZGljYXRvciB7XG4gICAgICAgICAgICAgICAgdG9wOiAkZm9udC1zaXplLWJhc2UgKiAuNjY7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAmLmJ0bi1hY3Rpdml0eS1ib3R0b20uYnRuLWFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyIHtcbiAgICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAkZm9udC1zaXplLWJhc2UgKiA0LjI1O1xuXG4gICAgICAgICAgICAmIC5hY3Rpdml0eS1pbmRpY2F0b3Ige1xuICAgICAgICAgICAgICAgIGJvdHRvbTogJGZvbnQtc2l6ZS1iYXNlICogLjY2O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJi5idG4tYWN0aXZpdHktbGVmdC5idG4tYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXIge1xuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAkZm9udC1zaXplLWJhc2UgKiA0O1xuXG4gICAgICAgICAgICAmIC5hY3Rpdml0eS1pbmRpY2F0b3Ige1xuICAgICAgICAgICAgICAgIGxlZnQ6ICRmb250LXNpemUtYmFzZSAqIC43NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICYuYnRuLWFjdGl2aXR5LXJpZ2h0LmJ0bi1hY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lciB7XG4gICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiAkZm9udC1zaXplLWJhc2UgKiA0O1xuXG4gICAgICAgICAgICAmIC5hY3Rpdml0eS1pbmRpY2F0b3Ige1xuICAgICAgICAgICAgICAgIHJpZ2h0OiAkZm9udC1zaXplLWJhc2UgKiAuNzU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAmLmJ0bi1hY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lciAuYWN0aXZpdHktaW5kaWNhdG9yLFxuICAgICAgICAmIC5hY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lciB7XG4gICAgICAgICAgICB3aWR0aDogJGZvbnQtc2l6ZS1iYXNlICogMi41O1xuICAgICAgICAgICAgaGVpZ2h0OiAkZm9udC1zaXplLWJhc2UgKiAyLjU7XG5cbiAgICAgICAgICAgICYgPiBkaXY6YmVmb3JlIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogJGFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyLXdpZHRoICogLjc1O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59XG48L3N0eWxlPlxuIiwiaW1wb3J0IEJ0bkFjdGl2aXR5IGZyb20gJy4vQnRuQWN0aXZpdHknO1xuaW1wb3J0IFZ1ZUluc3RhbGxlciBmcm9tICcuLi8uLi9IZWxwZXJzL1Z1ZUluc3RhbGxlci9WdWVJbnN0YWxsZXInO1xuXG5jb25zdCBwbHVnaW4gPSBWdWVJbnN0YWxsZXIudXNlKHtcblxuICAgIGluc3RhbGwoVnVlLCBvcHRpb25zKSB7XG4gICAgICAgIFZ1ZUluc3RhbGxlci5jb21wb25lbnRzKHtcbiAgICAgICAgICAgIEJ0bkFjdGl2aXR5XG4gICAgICAgIH0pXG4gICAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQnRuQWN0aXZpdHk7XG4iLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj48c2xvdC8+PC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ21vZGFsLWNvbnRlbnQnXG5cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1iYWNrZHJvcFwiIDpjbGFzcz1cInsnZmFkZSc6IGZhZGUsICdzaG93Jzogc2hvd31cIj5cbiAgICAgICAgPHNsb3QvPlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdtb2RhbC1iYWNrZHJvcCcsXG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG93IHRoZSBtb2RhbCB3aXRoIGEgZmFkZSBlZmZlY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBCb29sZWFuXG4gICAgICAgICAqL1xuICAgICAgICBmYWRlOiB7XG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJcyB0aGUgbW9kYWwgc2hvd2luZy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IEJvb2xlYW5cbiAgICAgICAgICovXG4gICAgICAgIHNob3c6IHtcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgICAgIH1cblxuICAgIH1cblxufVxuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgeyBlYWNoIH0gZnJvbSAnLi4vLi4vSGVscGVycy9GdW5jdGlvbnMnO1xuaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuLi8uLi9IZWxwZXJzL0Z1bmN0aW9ucyc7XG5pbXBvcnQgdHJhbnNpdGlvbiBmcm9tICcuLi8uLi9IZWxwZXJzL1RyYW5zaXRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG93IHRoZSB0cmlnZ2VyYWJsZSBlbGVtZW50IHdpdGggYSBhbmltYXRlZCBmYWRlIGVmZmVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBhbmltYXRpb246IHtcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElzIHRoZSB0cmlnZ2VyYWJsZSBlbGVtZW50IHNob3dpbmcuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBCb29sZWFuXG4gICAgICAgICAqL1xuICAgICAgICBzaG93OiB7XG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICAgICAgZGVmYXV0OiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgdGFyZ2V0IGVsZW1lbnQgdXNlZCB0byBwb3NpdGlvbiB0aGUgcG9wb3Zlci5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge1N0cmluZ3xFbGVtZW50fEJvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgIHR5cGU6IFtTdHJpbmcsIEVsZW1lbnQsIEJvb2xlYW5dLFxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogSG93IHRoZSBtb2RhbCBpcyB0cmlnZ2VyZWQgLSBjbGljayB8IGhvdmVyIHwgZm9jdXMgfCBtYW51YWwuIFlvdSBtYXlcbiAgICAgICAgICogcGFzcyBtdWx0aXBsZSB0cmlnZ2Vyczsgc2VwYXJhdGUgdGhlbSB3aXRoIGEgc3BhY2UuIGBtYW51YWxgIGNhbm5vdFxuICAgICAgICAgKiBiZSBjb21iaW5lZCB3aXRoIGFueSBvdGhlciB0cmlnZ2VyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdHJpZ2dlcjoge1xuICAgICAgICAgICAgdHlwZTogW1N0cmluZywgQXJyYXldLFxuICAgICAgICAgICAgZGVmYXVsdDogJ2NsaWNrJ1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgbWV0aG9kczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbml0aWFsaXplIHRoZSB0cmlnZ2VyIGV2ZW50IGZvciB0aGUgc3BlY2lmaWVkIGVsZW1lbnRzXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSAge0VsZW1lbnR9IGVsXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICBpbml0aWFsaXplVHJpZ2dlcihlbCkge1xuICAgICAgICAgICAgZWFjaChpc1N0cmluZyh0aGlzLnRyaWdnZXIpID8gdGhpcy50cmlnZ2VyLnNwbGl0KCcgJykgOiB0aGlzLnRyaWdnZXIsIHRyaWdnZXIgPT4ge1xuICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIodHJpZ2dlciwgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluaXRpYWxpemUgdGhlIGV2ZW50IHRyaWdnZXJzXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4gdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgaW5pdGlhbGl6ZVRyaWdnZXJzKCkge1xuICAgICAgICAgICAgaWYodGhpcy50YXJnZXQgJiYgdGhpcy50cmlnZ2VyICE9PSAnbWFudWFsJykge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMudGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVUcmlnZ2VyKHRoaXMudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy50YXJnZXQpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplVHJpZ2dlcihlbCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy5zaG93IHx8ICF0aGlzLnRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1Nob3dpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGb2N1cyBvbiB0aGUgZmlyc3QgZmllbGQgaW4gdGhlIG1vZGFsIChpZiBleGlzdHMpLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIGZvY3VzKCkge1xuICAgICAgICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmZvcm0tY29udHJvbCwgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKTtcblxuICAgICAgICAgICAgICAgIGlmKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogT3BlbiB0aGUgdHJpZ2dlcmVhYmxlIGVsZW1lbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBvcGVuKCkge1xuICAgICAgICAgICAgdGhpcy5pc0Rpc3BsYXlpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLiRuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbih0aGlzLiRlbCkudGhlbihkZWxheSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTaG93aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnb3BlbicpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDbG9zZSB0aGUgdHJpZ2dlcmVhYmxlIGVsZW1lbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBjbG9zZShldmVudCkge1xuICAgICAgICAgICAgdHJhbnNpdGlvbih0aGlzLiRlbCkudGhlbihkZWxheSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0Rpc3BsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdjbG9zZScsIGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmlzU2hvd2luZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVG9nZ2xlIHRoZSB0cmlnZ2VyZWFibGUgZWxlbWVudCdzIG9wZW4vY2xvc2UgbWV0aG9kLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLmlzU2hvd2luZykge1xuICAgICAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgdHJpZ2dlcmFibGVDbGFzc2VzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAnZmFkZSc6IHRoaXMuYW5pbWF0aW9uLFxuICAgICAgICAgICAgICAgICdzaG93JzogdGhpcy5pc1Nob3dpbmdcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICB3YXRjaDoge1xuXG4gICAgICAgIGlzU2hvd2luZyh2YWx1ZSkge1xuICAgICAgICAgICAgaWYodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvdyh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5pc1Nob3dpbmcgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVRyaWdnZXJzKCk7XG4gICAgfSxcblxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpc0Rpc3BsYXlpbmc6IHRoaXMuc2hvdyB8fCAhdGhpcy50YXJnZXQsXG4gICAgICAgICAgICBpc1Nob3dpbmc6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsIjx0ZW1wbGF0ZT5cblxuICAgIDxkaXYgY2xhc3M9XCJtb2RhbFwiIDpjbGFzcz1cInRyaWdnZXJhYmxlQ2xhc3Nlc1wiIDpzdHlsZT1cIntkaXNwbGF5OiBpc0Rpc3BsYXlpbmcgPyAnYmxvY2snIDogJ25vbmUnfVwiIHRhYmluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgQGtleWRvd24uZXNjPVwiY2FuY2VsXCI+XG5cbiAgICAgICAgPG1vZGFsLWJhY2tkcm9wIHYtaWY9XCJiYWNrZHJvcFwiIHJlZj1cImJhY2tkcm9wXCIvPlxuXG4gICAgICAgIDxtb2RhbC1kaWFsb2cgOmNsYXNzPVwieydtb2RhbC1kaWFsb2ctY2VudGVyZWQnOiBjZW50ZXJ9XCI+XG5cbiAgICAgICAgICAgIDxtb2RhbC1jb250ZW50PlxuXG4gICAgICAgICAgICAgICAgPHNsb3QgbmFtZT1cImhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8bW9kYWwtaGVhZGVyIHYtaWY9XCJ0aXRsZVwiIEBjbG9zZT1cImNhbmNlbFwiPnt7dGl0bGV9fTwvbW9kYWwtaGVhZGVyPlxuICAgICAgICAgICAgICAgIDwvc2xvdD5cblxuICAgICAgICAgICAgICAgIDxzbG90IG5hbWU9XCJib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgIDxjb21wb25lbnQgOmlzPVwiIWZsdXNoID8gJ21vZGFsLWJvZHknIDogJ2RpdidcIiBjbGFzcz1cImNoaWxkLWNvbXBvbmVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNsb3QvPlxuICAgICAgICAgICAgICAgICAgICA8L2NvbXBvbmVudD5cbiAgICAgICAgICAgICAgICA8L3Nsb3Q+XG5cbiAgICAgICAgICAgICAgICA8c2xvdCBuYW1lPVwiZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtb2RhbC1mb290ZXIgdi1pZj1cInR5cGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwidHlwZSA9PT0gJ2FsZXJ0J1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidG4tYWN0aXZpdHkgOmFjdGl2aXR5PVwiYWN0aXZpdHlcIiB2YXJpYW50PVwicHJpbWFyeVwiIEBjbGljaz1cImNvbmZpcm1cIj57e29rTGFiZWx9fTwvYnRuLWFjdGl2aXR5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ0biB0eXBlPVwiYnV0dG9uXCIgdmFyaWFudD1cInNlY29uZGFyeVwiIEBjbGljaz1cImNhbmNlbFwiIHYtaHRtbD1cImNhbmNlbExhYmVsXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidG4tYWN0aXZpdHkgOmFjdGl2aXR5PVwiYWN0aXZpdHlcIiB2YXJpYW50PVwicHJpbWFyeVwiIEBjbGljaz1cImNvbmZpcm1cIj57e29rTGFiZWx9fTwvYnRuLWFjdGl2aXR5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9tb2RhbC1mb290ZXI+XG4gICAgICAgICAgICAgICAgPC9zbG90PlxuXG4gICAgICAgICAgICA8L21vZGFsLWNvbnRlbnQ+XG5cbiAgICAgICAgPC9tb2RhbC1kaWFsb2c+XG5cbiAgICA8L2Rpdj5cblxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBCdG4gZnJvbSAnLi4vQnRuJztcbmltcG9ydCB7IGVhY2ggfSBmcm9tICcuLi8uLi9IZWxwZXJzL0Z1bmN0aW9ucyc7XG5pbXBvcnQgTW9kYWxCb2R5IGZyb20gJy4vTW9kYWxCb2R5JztcbmltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAnLi4vLi4vSGVscGVycy9GdW5jdGlvbnMnO1xuaW1wb3J0IE1vZGFsRGlhbG9nIGZyb20gJy4vTW9kYWxEaWFsb2cnO1xuaW1wb3J0IE1vZGFsSGVhZGVyIGZyb20gJy4vTW9kYWxIZWFkZXInO1xuaW1wb3J0IE1vZGFsRm9vdGVyIGZyb20gJy4vTW9kYWxGb290ZXInO1xuaW1wb3J0IEJ0bkFjdGl2aXR5IGZyb20gJy4uL0J0bkFjdGl2aXR5JztcbmltcG9ydCBNb2RhbENvbnRlbnQgZnJvbSAnLi9Nb2RhbENvbnRlbnQnO1xuaW1wb3J0IE1vZGFsQmFja2Ryb3AgZnJvbSAnLi9Nb2RhbEJhY2tkcm9wJztcbmltcG9ydCBUcmlnZ2VyYWJsZSBmcm9tICcuLi8uLi9NaXhpbnMvVHJpZ2dlcmFibGUnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnbW9kYWwnLFxuXG4gICAgY29tcG9uZW50czoge1xuICAgICAgICBCdG4sXG4gICAgICAgIEJ0bkFjdGl2aXR5LFxuICAgICAgICBNb2RhbEJvZHksXG4gICAgICAgIE1vZGFsQmFja2Ryb3AsXG4gICAgICAgIE1vZGFsQ29udGVudCxcbiAgICAgICAgTW9kYWxEaWFsb2csXG4gICAgICAgIE1vZGFsSGVhZGVyLFxuICAgICAgICBNb2RhbEZvb3RlclxuICAgIH0sXG5cbiAgICBtaXhpbnM6IFtcbiAgICAgICAgVHJpZ2dlcmFibGVcbiAgICBdLFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2hvdyB0aGUgbW9kYWwgYWN0aXZpdHkgaW5kaWNhdG9yLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGFjdGl2aXR5OiBCb29sZWFuLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG93IHRoZSBtb2RhbCB3aXRoIGEgYmFja2Ryb3AuXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgYmFja2Ryb3A6IHtcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJcyB0aGUgbW9kYWwgY2VudGVyZWQgaW4gdGhlIHNjcmVlbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBjZW50ZXI6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElzIHRoZSBtb2RhbCBjb250ZW50IGZpeGVkIHBvc2l0aW9uXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgY2xvc2VhYmxlOiB7XG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJcyB0aGUgbW9kYWwgY29udGVudCBmbHVzaCB3aXRoIHRoZSBtb2RhbCBlZGdlcz8gSWYgdHJ1ZSwgbm8gbW9kYWwtYm9keVxuICAgICAgICAgKiB3aWxsIGJlIHVzZWQgdG8gd3JhcCB0aGUgY29udGVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBmbHVzaDogQm9vbGVhbixcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG9rIGxhYmVsIHRleHQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBva0xhYmVsOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0OiAnT2snXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjYW5jZWwgbGFiZWwgdGV4dC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIGNhbmNlbExhYmVsOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0OiAnQ2FuY2VsJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbW9kYWwgdGl0bGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0aXRsZTogU3RyaW5nLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJcyB0aGUgbW9kYWwgdHlwZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICB0eXBlOiBbQm9vbGVhbiwgU3RyaW5nXSxcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgdmFsaWRhdGUodmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWydhbGVydCcsICdjb25maXJtJywgJ3Byb21wdCddLmluZGV4T2YodmFsdWUpICE9PSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogTW91bnQgdGhlIGJhY2tkcm9wIHRvIHRoZSBkb2N1bWVudCBib2R5LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICBtb3VudEJhY2tkcm9wKCkge1xuICAgICAgICAgICAgaWYoIXRoaXMuYmFja2Ryb3BDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJhY2tkcm9wQ29tcG9uZW50ID0gdGhpcy4kcmVmcy5iYWNrZHJvcC4kbW91bnQoXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogVW5tb3VudCB0aGUgYmFja2Ryb3AgZnJvbSB0aGUgZG9jdW1lbnQgYm9keS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgdW5tb3VudEJhY2tkcm9wKCkge1xuICAgICAgICAgICAgaWYodGhpcy5iYWNrZHJvcENvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmFja2Ryb3BDb21wb25lbnQuJGRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJhY2tkcm9wQ29tcG9uZW50LiRlbC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJhY2tkcm9wQ29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2FuY2VsIHRoZSBtb2RhbFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgY2FuY2VsKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdjYW5jZWwnLCBldmVudCk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKGV2ZW50KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29uZmlybSB0aGUgbW9kYWxcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIGNvbmZpcm0oZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NvbmZpcm0nLCBldmVudCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgY2FsbGJhY2sgZm9yIHRoZSBlc2NhcGUgZnVuY3Rpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICBvbkVzYyhldmVudCkge1xuICAgICAgICAgICAgKHRoaXMudHlwZSA9PT0gJ2NvbmZpcm0nIHx8IHRoaXMudHlwZSA9PT0gICdwcm9tcHQnKSA/IHRoaXMuY2FuY2VsKGV2ZW50KSA6IHRoaXMuY2xvc2UoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgd2F0Y2g6IHtcblxuICAgICAgICBpc1Nob3dpbmcodmFsdWUpIHtcbiAgICAgICAgICAgIGlmKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmNsYXNzTGlzdC5hZGQoJ21vZGFsLW9wZW4nKTtcbiAgICAgICAgICAgICAgICAvL3RoaXMubW91bnRCYWNrZHJvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLW9wZW4nKTtcbiAgICAgICAgICAgICAgICAvL3RoaXMudW5tb3VudEJhY2tkcm9wKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3VwZGF0ZTpzaG93JywgdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tkcm9wQ29tcG9uZW50OiBudWxsLFxuICAgICAgICAgICAgaXNEaXNwbGF5aW5nOiB0aGlzLnNob3cgfHwgIXRoaXMudGFyZ2V0LFxuICAgICAgICAgICAgaXNTaG93aW5nOiBmYWxzZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVRyaWdnZXJzKCk7XG4gICAgICAgIC8qXG4gICAgICAgIGlmKHRoaXMuc2hvdyB8fCAhdGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMubW91bnRCYWNrZHJvcCgpO1xuICAgICAgICB9XG4gICAgICAgICovXG4gICAgfSxcblxuICAgIGJlZm9yZVJvdXRlTGVhdmUodG8sIGZyb20sIG5leHQpIHtcbiAgICAgICAgbW9kYWwuY2xvc2UoKTtcbiAgICB9XG5cbn1cblxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuLm1vZGFsIHtcbiAgICAubW9kYWwtYmFja2Ryb3AgKyAubW9kYWwtZGlhbG9nIHtcbiAgICAgICAgei1pbmRleDogMTA1MDtcbiAgICB9XG59XG48L3N0eWxlPlxuIiwiaW1wb3J0IE1vZGFsIGZyb20gJy4vTW9kYWwnO1xuaW1wb3J0IE1vZGFsQmFja2Ryb3AgZnJvbSAnLi9Nb2RhbEJhY2tkcm9wJztcbmltcG9ydCBNb2RhbEJvZHkgZnJvbSAnLi9Nb2RhbEJvZHknO1xuaW1wb3J0IE1vZGFsQ29udGVudCBmcm9tICcuL01vZGFsQ29udGVudCc7XG5pbXBvcnQgTW9kYWxEaWFsb2cgZnJvbSAnLi9Nb2RhbERpYWxvZyc7XG5pbXBvcnQgTW9kYWxGb290ZXIgZnJvbSAnLi9Nb2RhbEZvb3Rlcic7XG5pbXBvcnQgTW9kYWxIZWFkZXIgZnJvbSAnLi9Nb2RhbEhlYWRlcic7XG5pbXBvcnQgVnVlSW5zdGFsbGVyIGZyb20gJy4uLy4uL0hlbHBlcnMvVnVlSW5zdGFsbGVyL1Z1ZUluc3RhbGxlcic7XG5cbmNvbnN0IHBsdWdpbiA9IFZ1ZUluc3RhbGxlci51c2Uoe1xuXG4gICAgaW5zdGFsbChWdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgVnVlSW5zdGFsbGVyLmNvbXBvbmVudHMoe1xuICAgICAgICAgICAgTW9kYWxcbiAgICAgICAgfSk7XG4gICAgfVxuXG59KTtcblxuZXhwb3J0IHtcbiAgICBNb2RhbEJhY2tkcm9wLFxuICAgIE1vZGFsQm9keSxcbiAgICBNb2RhbENvbnRlbnQsXG4gICAgTW9kYWxEaWFsb2csXG4gICAgTW9kYWxGb290ZXIsXG4gICAgTW9kYWxIZWFkZXJcbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9kYWw7XG4iLCJpbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJy4uL0Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJy4uL0Z1bmN0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluc3RhbnRpYXRlKFZ1ZSwgQ29tcG9uZW50LCBvcHRpb25zKSB7XG4gICAgaWYoQ29tcG9uZW50IGluc3RhbmNlb2YgVnVlKSB7XG4gICAgICAgIHJldHVybiBDb21wb25lbnQ7XG4gICAgfVxuXG4gICAgaWYoaXNPYmplY3QoQ29tcG9uZW50KSkge1xuICAgICAgICBDb21wb25lbnQgPSBWdWUuZXh0ZW5kKENvbXBvbmVudCk7XG4gICAgfVxuICAgIGVsc2UgaWYoaXNTdHJpbmcoQ29tcG9uZW50KSkge1xuICAgICAgICBjb25zdCB0ZXh0ID0gQ29tcG9uZW50O1xuXG4gICAgICAgIENvbXBvbmVudCA9IFZ1ZS5leHRlbmQoe1xuXG4gICAgICAgICAgICBmdW5jdGlvbmFsOiB0cnVlLFxuXG4gICAgICAgICAgICByZW5kZXIoaCwgY29udGV4dCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl92KHRleHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQ29tcG9uZW50KG9wdGlvbnMpO1xufVxuIiwiaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICcuLi8uLi9IZWxwZXJzL0Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vLi4vSGVscGVycy9GdW5jdGlvbnMnO1xuaW1wb3J0IHsgZGVlcEV4dGVuZCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCBNb2RhbCBmcm9tICcuLi8uLi9Db21wb25lbnRzL01vZGFsJztcbmltcG9ydCBpbnN0YW50aWF0ZSBmcm9tICcuLi8uLi9IZWxwZXJzL0luc3RhbnRpYXRlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oVnVlLCBvcHRpb25zKSB7XG5cbiAgICBWdWUucHJvdG90eXBlLiRtb2RhbCA9IGZ1bmN0aW9uKENvbXBvbmVudCwgb3B0aW9ucykge1xuICAgICAgICBpZighaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGluc3RhbmNlID0gaW5zdGFudGlhdGUoVnVlLCBNb2RhbCwgb3B0aW9ucy5tb2RhbCk7XG5cbiAgICAgICAgaW5zdGFuY2UuJGNvbnRlbnQgPSBpbnN0YW50aWF0ZShWdWUsIENvbXBvbmVudCwgb3B0aW9ucy5jb250ZW50KTtcbiAgICAgICAgaW5zdGFuY2UuJHNsb3RzLmRlZmF1bHQgPSBbaW5zdGFuY2UuJGNvbnRlbnQuJG1vdW50KCkuX3Zub2RlXTtcbiAgICAgICAgaW5zdGFuY2UuJG1vdW50KFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSlcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfTtcblxuICAgIFZ1ZS5wcm90b3R5cGUuJGFsZXJ0ID0gZnVuY3Rpb24odGl0bGUsIENvbXBvbmVudCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbW9kYWwgPSB0aGlzLiRtb2RhbChDb21wb25lbnQsIGRlZXBFeHRlbmQob3B0aW9ucywge1xuICAgICAgICAgICAgICAgIG1vZGFsOiB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BzRGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2FsZXJ0J1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICBtb2RhbC4kb24oJ2NvbmZpcm0nLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgbW9kYWwuY2xvc2UoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtb2RhbC4kb24oJ2Nsb3NlJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUobW9kYWwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBWdWUucHJvdG90eXBlLiRjb25maXJtID0gZnVuY3Rpb24odGl0bGUsIENvbXBvbmVudCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbW9kYWwgPSB0aGlzLiRtb2RhbChDb21wb25lbnQgfHwgdGl0bGUsIGRlZXBFeHRlbmQob3B0aW9ucywge1xuICAgICAgICAgICAgICAgIG1vZGFsOiB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BzRGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IENvbXBvbmVudCA/IHRpdGxlIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdjb25maXJtJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICBtb2RhbC4kb24oJ2NhbmNlbCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QobW9kYWwpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1vZGFsLiRvbignY29uZmlybScsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKG1vZGFsLmNsb3NlKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBWdWUucHJvdG90eXBlLiRwcm9tcHQgPSBmdW5jdGlvbih0aXRsZSwgQ29tcG9uZW50LCBvcHRpb25zLCBwcmVkaWNhdGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmKGlzRnVuY3Rpb24ob3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICBwcmVkaWNhdGUgPSBvcHRpb25zO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoaXNPYmplY3Qob3B0aW9ucykgJiYgaXNGdW5jdGlvbihvcHRpb25zLnByZWRpY2F0ZSkpIHtcbiAgICAgICAgICAgICAgICBwcmVkaWNhdGUgPSBvcHRpb25zLnByZWRpY2F0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoIWlzRnVuY3Rpb24ocHJlZGljYXRlKSkge1xuICAgICAgICAgICAgICAgIHByZWRpY2F0ZSA9ICgpID0+IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1vZGFsID0gdGhpcy4kbW9kYWwoQ29tcG9uZW50LCBkZWVwRXh0ZW5kKG9wdGlvbnMsIHtcbiAgICAgICAgICAgICAgICBtb2RhbDoge1xuICAgICAgICAgICAgICAgICAgICBwcm9wc0RhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwcm9tcHQnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIG1vZGFsLiRvbignY2FuY2VsJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChtb2RhbCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbW9kYWwuJG9uKCdjb25maXJtJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1Y2NlZWQgPSAoKSA9PiByZXNvbHZlKG1vZGFsLmNsb3NlKCkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZhaWwgPSAoKSA9PiByZWplY3QobW9kYWwuY2xvc2UoKSk7XG5cbiAgICAgICAgICAgICAgICBpZihwcmVkaWNhdGUobW9kYWwsIHN1Y2NlZWQsIGZhaWwpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxufVxuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJvdmVybGF5LWJvZHlcIj48c2xvdC8+PC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ292ZXJsYXktYm9keSdcblxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+PHNsb3QvPjwvZGl2PlxuXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdjb250YWluZXInXG5cbn1cblxuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgQ29udGFpbmVyIGZyb20gJy4vQ29udGFpbmVyJztcbmltcG9ydCBWdWVJbnN0YWxsZXIgZnJvbSAnLi4vLi4vSGVscGVycy9WdWVJbnN0YWxsZXIvVnVlSW5zdGFsbGVyJztcblxuY29uc3QgcGx1Z2luID0gVnVlSW5zdGFsbGVyLnVzZSh7XG5cbiAgICBpbnN0YWxsKFZ1ZSwgb3B0aW9ucykge1xuICAgICAgICBWdWVJbnN0YWxsZXIuY29tcG9uZW50cyh7XG4gICAgICAgICAgICBDb250YWluZXJcbiAgICAgICAgfSk7XG4gICAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ29udGFpbmVyO1xuIiwiPHRlbXBsYXRlPlxuICAgIDxjb250YWluZXIgY2xhc3M9XCJvdmVybGF5LWNvbnRlbnRcIj5cbiAgICAgICAgPHNsb3QvPlxuICAgIDwvY29udGFpbmVyPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi4vQ29udGFpbmVyJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ292ZXJsYXktY29udGVudCcsXG5cbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIENvbnRhaW5lclxuICAgIH1cblxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuQGltcG9ydCAnLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL3Njc3MvZnVuY3Rpb25zLnNjc3MnO1xuQGltcG9ydCAnLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL3Njc3MvdmFyaWFibGVzLnNjc3MnO1xuXG4ub3ZlcmxheS1jb250ZW50IHtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgIC8qXG4gICAgJi5vdmVybGF5LWNvbnRlbnQtY2VudGVyIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICAgICAgLm92ZXJsYXktYm9keSB7XG4gICAgICAgICAgICBmbGV4OiAxO1xuICAgICAgICB9XG4gICAgfVxuICAgICovXG5cbiAgICAmLm92ZXJsYXktY29udGVudC1maXhlZCB7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAgIG1heC13aWR0aDogbm9uZTtcbiAgICB9XG5cbiAgICAub3ZlcmxheS1jb250cm9scyB7XG4gICAgICAgIGZsb2F0OiByaWdodDtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB0b3A6IDRweDtcbiAgICAgICAgcGFkZGluZy1yaWdodDogMDtcbiAgICAgICAgcGFkZGluZy1ib3R0b206ICRmb250LXNpemUtYmFzZTtcblxuICAgICAgICAmLmxlZnQge1xuICAgICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgfVxuICAgICAgICAmLnJpZ2h0IHtcbiAgICAgICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgJiArICoge1xuICAgICAgICAgICAgY2xlYXI6IGJvdGg7XG4gICAgICAgIH1cbiAgICB9XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJvdmVybGF5XCIgOmNsYXNzPVwidHJpZ2dlcmFibGVDbGFzc2VzXCIgOnN0eWxlPVwieydiYWNrZ3JvdW5kJzogYmFja2dyb3VuZCwgJ2Rpc3BsYXknOiBpc0Rpc3BsYXlpbmcgPyAnZmxleCcgOiAnbm9uZSd9XCIgcm9sZT1cImRpYWxvZ1wiIHRhYmluZGV4PVwiLTFcIiBAa2V5ZG93bi5lc2M9XCJvbkVzY1wiPlxuICAgICAgICA8YnV0dG9uIHYtaWY9XCJjbG9zZWFibGUgJiYgIWhpZGVDbG9zZUJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGluayBvdmVybGF5LWNsb3NlXCIgQGNsaWNrPVwib25DbGlja0Nsb3NlXCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXRpbWVzLWNpcmNsZVwiPjwvaT5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPG92ZXJsYXktY29udGVudCA6Y2xhc3M9XCJ7J292ZXJsYXktY29udGVudC1maXhlZCc6IGZpeGVkQ29udGVudCwgJ292ZXJsYXktY29udGVudC1jZW50ZXInOiBjZW50ZXJ9XCIgOnN0eWxlPVwie21pbkhlaWdodDogbWluSGVpZ2h0fVwiPlxuICAgICAgICAgICAgPHNsb3QgbmFtZT1cImJvZHlcIj5cbiAgICAgICAgICAgICAgICA8b3ZlcmxheS1ib2R5IGNsYXNzPVwibXktNFwiPlxuICAgICAgICAgICAgICAgICAgICA8c2xvdC8+XG4gICAgICAgICAgICAgICAgPC9vdmVybGF5LWJvZHk+XG4gICAgICAgICAgICA8L3Nsb3Q+XG4gICAgICAgIDwvb3ZlcmxheS1jb250ZW50PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBPdmVybGF5Qm9keSBmcm9tICcuL092ZXJsYXlCb2R5JztcbmltcG9ydCBPdmVybGF5Q29udGVudCBmcm9tICcuL092ZXJsYXlDb250ZW50JztcbmltcG9ydCBUcmlnZ2VyYWJsZSBmcm9tICcuLi8uLi9NaXhpbnMvVHJpZ2dlcmFibGUnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnb3ZlcmxheScsXG5cbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIE92ZXJsYXlCb2R5LFxuICAgICAgICBPdmVybGF5Q29udGVudFxuICAgIH0sXG5cbiAgICBtaXhpbnM6IFtcbiAgICAgICAgVHJpZ2dlcmFibGVcbiAgICBdLFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG92ZXJsYXkgYmFja2dyb3VuZCBjb2xvci5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgYmFja2dyb3VuZDoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgZGVmYXVsdDogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgLjkyNSknXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElzIHRoZSBvdmVybGF5IGNvbnRlbnQgZml4ZWQgcG9zaXRpb25cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IEJvb2xlYW5cbiAgICAgICAgICovXG4gICAgICAgIGNsb3NlYWJsZToge1xuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2VudGVyIHRoZSBvdmVybGF5IGNvbnRlbnQgb24gdGhlIHNjcmVlbiB1c2luZyBmbGV4IGJveC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBjZW50ZXI6IHtcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElzIHRoZSBvdmVybGF5IGNvbnRlbnQgZml4ZWQgcG9zaXRpb25cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IEJvb2xlYW5cbiAgICAgICAgICovXG4gICAgICAgIGZpeGVkQ29udGVudDogQm9vbGVhbixcblxuICAgICAgICAvKipcbiAgICAgICAgICogSXMgdGhlIG92ZXJsYXkgY2xvc2UgYnV0dG9uIGhpZGRlbiBidXQgc3RpbGwgY2xvc2VhYmxlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgQm9vbGVhblxuICAgICAgICAgKi9cbiAgICAgICAgaGlkZUNsb3NlQnV0dG9uOiBCb29sZWFuLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJcyB0aGUgb3ZlcmxheSBjb250ZW50IG1pbmltdW0gaGVpZ2h0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgQm9vbGVhblxuICAgICAgICAgKi9cbiAgICAgICAgbWluSGVpZ2h0OiBbU3RyaW5nLCBOdW1iZXJdXG5cbiAgICB9LFxuXG4gICAgbWV0aG9kczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgY2FsbGJhY2sgZm9yIHRoZSBgY2xpY2tgIGV2ZW50IG9uIHRoZSBjbG9zZSBidXR0b24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4gdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgb25DbGlja0Nsb3NlKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdjbGljazpjbG9zZScsIGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBvbkVzYyhldmVudCkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZWFibGUgJiYgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cblxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuQGltcG9ydCAnLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL3Njc3MvZnVuY3Rpb25zLnNjc3MnO1xuQGltcG9ydCAnLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL3Njc3MvdmFyaWFibGVzLnNjc3MnO1xuXG4ub3ZlcmxheSB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgbWluLWhlaWdodDogMDtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICB6LWluZGV4OiAtMTtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXG4gICAgJi5mYWRlIHtcbiAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAzMzNtcyBlYXNlLW91dDtcbiAgICB9XG5cbiAgICAmLnNob3cge1xuICAgICAgICB6LWluZGV4OiAxMDMwO1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgIH1cblxuICAgIC5vdmVybGF5LWNvbnRlbnQge1xuICAgICAgICBmbGV4OiAxO1xuICAgIH1cblxuICAgIC5vdmVybGF5LWhlYWRlciB7XG4gICAgICAgIG1hcmdpbi10b3A6ICRmb250LXNpemUtYmFzZSAqIDEuNTtcbiAgICB9XG5cbiAgICAub3ZlcmxheS1jbG9zZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZS1iYXNlICogMS4yNTtcbiAgICAgICAgY29sb3I6ICRncmF5LTcwMDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6ICRmb250LXNpemUtYmFzZTtcbiAgICAgICAgcmlnaHQ6ICRmb250LXNpemUtYmFzZTtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICB9XG59XG48L3N0eWxlPlxuIiwiaW1wb3J0IE92ZXJsYXkgZnJvbSAnLi9PdmVybGF5JztcbmltcG9ydCBWdWVJbnN0YWxsZXIgZnJvbSAnLi4vLi4vSGVscGVycy9WdWVJbnN0YWxsZXIvVnVlSW5zdGFsbGVyJztcblxuY29uc3QgcGx1Z2luID0gVnVlSW5zdGFsbGVyLnVzZSh7XG5cbiAgICBpbnN0YWxsKFZ1ZSwgb3B0aW9ucykge1xuICAgICAgICBWdWVJbnN0YWxsZXIuY29tcG9uZW50cyh7XG4gICAgICAgICAgICBPdmVybGF5XG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IE92ZXJsYXk7XG4iLCJpbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCB7IGRlZXBFeHRlbmQgfSBmcm9tICcuLi8uLi9IZWxwZXJzL0Z1bmN0aW9ucyc7XG5pbXBvcnQgaW5zdGFudGlhdGUgZnJvbSAnLi4vLi4vSGVscGVycy9JbnN0YW50aWF0ZSc7XG5pbXBvcnQgT3ZlcmxheSBmcm9tICcuLi8uLi9Db21wb25lbnRzL092ZXJsYXknO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihWdWUsIG9wdGlvbnMpIHtcbiAgICBWdWUucHJvdG90eXBlLiRvdmVybGF5ID0gZnVuY3Rpb24odGFyZ2V0LCBDb21wb25lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYoIWlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBpZighdGFyZ2V0LiRvdmVybGF5KSB7XG4gICAgICAgICAgICB0YXJnZXQuJG92ZXJsYXkgPSBpbnN0YW50aWF0ZShWdWUsIE92ZXJsYXksIGRlZXBFeHRlbmQob3B0aW9ucy5vdmVybGF5LCB7XG4gICAgICAgICAgICAgICAgcHJvcHNEYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICB0YXJnZXQuJG92ZXJsYXkuJG1vdW50KFxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0YXJnZXQuJG92ZXJsYXkuJGNvbnRlbnQgPSBpbnN0YW50aWF0ZShWdWUsIENvbXBvbmVudCwgb3B0aW9ucy5jb250ZW50KTtcbiAgICAgICAgICAgIHRhcmdldC4kb3ZlcmxheS4kc2xvdHMuZGVmYXVsdCA9IFt0YXJnZXQuJG92ZXJsYXkuJGNvbnRlbnQuJG1vdW50KCkuX3Zub2RlXTtcbiAgICAgICAgICAgIHRhcmdldC4kb3ZlcmxheS4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC4kb3ZlcmxheS5vcGVuKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0YXJnZXQuJG92ZXJsYXk7XG4gICAgfTtcbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IHYtc2hvdz1cImlzRGlzcGxheWluZ1wiIGNsYXNzPVwicG9wb3ZlclwiIDpjbGFzcz1cIm1lcmdlQ2xhc3Nlcyh0cmlnZ2VyYWJsZUNsYXNzZXMsIGNsYXNzZXMpXCIgcm9sZT1cInRvb2x0aXBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+XG4gICAgICAgIDxwb3BvdmVyLWhlYWRlciB2LWlmPVwidGl0bGVcIiB2LWh0bWw9XCJ0aXRsZVwiLz5cbiAgICAgICAgPHBvcG92ZXItYm9keT5cbiAgICAgICAgICAgIDxzbG90Lz5cbiAgICAgICAgPC9wb3BvdmVyLWJvZHk+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuLypcbkV2ZW50c1xuRXZlbnQgVHlwZVx0RGVzY3JpcHRpb25cbmNsb3NlLmJzLnBvcG92ZXJcdFRoaXMgZXZlbnQgZmlyZXMgaW1tZWRpYXRlbHkgd2hlbiB0aGUgY2xvc2UgaW5zdGFuY2UgbWV0aG9kIGlzIGNhbGxlZC5cbmNsb3Nlbi5icy5wb3BvdmVyXHRUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHBvcG92ZXIgaGFzIGJlZW4gbWFkZSB2aXNpYmxlIHRvIHRoZSB1c2VyICh3aWxsIHdhaXQgZm9yIENTUyB0cmFuc2l0aW9ucyB0byBjb21wbGV0ZSkuXG5vcGVuLmJzLnBvcG92ZXJcdFRoaXMgZXZlbnQgaXMgZmlyZWQgaW1tZWRpYXRlbHkgd2hlbiB0aGUgb3BlbiBpbnN0YW5jZSBtZXRob2QgaGFzIGJlZW4gY2FsbGVkLlxuaGlkZGVuLmJzLnBvcG92ZXJcdFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgcG9wb3ZlciBoYXMgZmluaXNoZWQgYmVpbmcgaGlkZGVuIGZyb20gdGhlIHVzZXIgKHdpbGwgd2FpdCBmb3IgQ1NTIHRyYW5zaXRpb25zIHRvIGNvbXBsZXRlKS5cbmluc2VydGVkLmJzLnBvcG92ZXJcdFRoaXMgZXZlbnQgaXMgZmlyZWQgYWZ0ZXIgdGhlIGNsb3NlLmJzLnBvcG92ZXIgZXZlbnQgd2hlbiB0aGUgcG9wb3ZlciB0ZW1wbGF0ZSBoYXMgYmVlbiBhZGRlZCB0byB0aGUgRE9NLlxuJCgnI215UG9wb3ZlcicpLm9uKCdoaWRkZW4uYnMucG9wb3ZlcicsIGZ1bmN0aW9uICgpIHtcbiAgLy8gZG8gc29tZXRoaW5n4oCmXG59KVxuKi9cbmltcG9ydCB7IGVhY2ggfSBmcm9tICcuLi8uLi9IZWxwZXJzL0Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCBQb3BwZXIgZnJvbSAncG9wcGVyLmpzJztcbmltcG9ydCBwcmVmaXggZnJvbSAnLi4vLi4vSGVscGVycy9QcmVmaXgnO1xuaW1wb3J0IFRyaWdnZXJhYmxlIGZyb20gJy4uLy4uL01peGlucy9UcmlnZ2VyYWJsZSc7XG5pbXBvcnQgTWVyZ2VDbGFzc2VzIGZyb20gJy4uLy4uL01peGlucy9NZXJnZUNsYXNzZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAncG9wb3ZlcicsXG5cbiAgICBtaXhpbnM6IFtcbiAgICAgICAgVHJpZ2dlcmFibGUsXG4gICAgICAgIE1lcmdlQ2xhc3Nlc1xuICAgIF0sXG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBseSBhIENTUyBmYWRlIHRyYW5zaXRpb24gdG8gdGhlIHBvcG92ZXJcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBhbmltYXRpb246IHtcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE92ZXJmbG93IGNvbnN0cmFpbnQgYm91bmRhcnkgb2YgdGhlIHBvcG92ZXIuIEFjY2VwdHMgdGhlIHZhbHVlcyBvZlxuICAgICAgICAgKiAndmlld3BvcnQnLCAnd2luZG93JywgJ3Njcm9sbFBhcmVudCcsIG9yIGFuIEhUTUxFbGVtZW50IHJlZmVyZW5jZVxuICAgICAgICAgKiAoSmF2YVNjcmlwdCBvbmx5KS4gRm9yIG1vcmUgaW5mb3JtYXRpb24gcmVmZXIgdG8gUG9wcGVyLmpzJ3NcbiAgICAgICAgICogcHJldmVudE92ZXJmbG93IGRvY3MuXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBib3VuZGFyeToge1xuICAgICAgICAgICAgdHlwZTogW1N0cmluZywgQXJyYXldLFxuICAgICAgICAgICAgZGVmYXVsdDogJ3Njcm9sbFBhcmVudCcsXG4gICAgICAgICAgICB2YWxpZGF0ZSh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbJ3ZpZXdwb3J0JywgJ3dpbmRvdycsICd2aWV3cG9ydCddLmluZGV4T2YodmFsdWUpICE9PSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQXBwZW5kcyB0aGUgcG9wb3ZlciB0byBhIHNwZWNpZmljIGVsZW1lbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEV4YW1wbGU6IGNvbnRhaW5lcjogJ2JvZHknLlxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGlzIG9wdGlvbiBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGluIHRoYXQgaXQgYWxsb3dzIHlvdSB0byBwb3NpdGlvblxuICAgICAgICAgKiB0aGUgcG9wb3ZlciBpbiB0aGUgZmxvdyBvZiB0aGUgZG9jdW1lbnQgbmVhciB0aGUgdHJpZ2dlcmluZyBlbGVtZW50IC1cbiAgICAgICAgICogd2hpY2ggd2lsbCBwcmV2ZW50IHRoZSBwb3BvdmVyIGZyb20gZmxvYXRpbmcgYXdheSBmcm9tIHRoZXRyaWdnZXJpbmdcbiAgICAgICAgICogZWxlbWVudCBkdXJpbmcgYSB3aW5kb3cgcmVzaXplLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfEVsZW1lbnR8Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGNvbnRhaW5lcjoge1xuICAgICAgICAgICAgdHlwZTogW1N0cmluZywgRWxlbWVudCwgQm9vbGVhbl0sXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWxheSBjbG9zZWluZyBhbmQgaGlkaW5nIHRoZSBwb3BvdmVyIChtcykgLSBkb2VzIG5vdCBhcHBseSB0byBtYW51YWwgdHJpZ2dlciB0eXBlXG4gICAgICAgICAqXG4gICAgICAgICAqIElmIGEgbnVtYmVyIGlzIHN1cHBsaWVkLCBkZWxheSBpcyBhcHBsaWVkIHRvIGJvdGggb3Blbi9jbG9zZVxuICAgICAgICAgKlxuICAgICAgICAgKiBPYmplY3Qgc3RydWN0dXJlIGlzOiBkZWxheTogeyBcImNsb3NlXCI6IDUwMCwgXCJvcGVuXCI6IDEwMCB9XG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ8T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgZGVsYXk6IHtcbiAgICAgICAgICAgIHR5cGU6IFtOdW1iZXIsIE9iamVjdF0sXG4gICAgICAgICAgICBkZWZhdWx0OiAwXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFsbG93IHRvIHNwZWNpZnkgd2hpY2ggcG9zaXRpb24gUG9wcGVyIHdpbGwgdXNlIG9uIGZhbGxiYWNrLiBGb3IgbW9yZVxuICAgICAgICAgKiBpbmZvcm1hdGlvbiByZWZlciB0byBQb3BwZXIuanMncyBiZWhhdmlvciBkb2NzXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd8QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBmYWxsYmFja1BsYWNlbWVudDoge1xuICAgICAgICAgICAgdHlwZTogW1N0cmluZywgQXJyYXldLFxuICAgICAgICAgICAgZGVmYXVsdDogJ2ZsaXAnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE9mZnNldCBvZiB0aGUgcG9wb3ZlciByZWxhdGl2ZSB0byBpdHMgdGFyZ2V0LiBGb3IgbW9yZSBpbmZvcm1hdGlvblxuICAgICAgICAgKiByZWZlciB0byBQb3BwZXIuanMncyBvZmZzZXQgZG9jcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge051bWJlcnxTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBvZmZzZXQ6IHtcbiAgICAgICAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICAgICAgICBkZWZhdWx0OiAwXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhvdyB0byBwb3NpdGlvbiB0aGUgcG9wb3ZlciAtIGF1dG8gfCB0b3AgfCBib3R0b20gfCBsZWZ0IHwgcmlnaHQuXG4gICAgICAgICAqXG4gICAgICAgICAqIFdoZW4gYXV0byBpcyBzcGVjaWZpZWQsIGl0IHdpbGwgZHluYW1pY2FsbHkgcmVvcmllbnQgdGhlIHBvcG92ZXIuXG4gICAgICAgICAqXG4gICAgICAgICAqIFdoZW4gYSBmdW5jdGlvbiBpcyB1c2VkIHRvIGRldGVybWluZSB0aGUgcGxhY2VtZW50LCBpdCBpcyBjYWxsZWQgd2l0aFxuICAgICAgICAgKiB0aGUgcG9wb3ZlciBET00gbm9kZSBhcyBpdHMgZmlyc3QgYXJndW1lbnQgYW5kIHRoZSB0cmlnZ2VyaW5nIGVsZW1lbnRcbiAgICAgICAgICogRE9NIG5vZGUgYXMgaXRzIHNlY29uZC4gVGhlIHRoaXMgY29udGV4dCBpcyBzZXQgdG8gdGhlIHBvcG92ZXJcbiAgICAgICAgICogaW5zdGFuY2UuXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd8RnVuY3Rpb259XG4gICAgICAgICAqL1xuICAgICAgICBwbGFjZW1lbnQ6IHtcbiAgICAgICAgICAgIHR5cGU6IFtTdHJpbmcsIEZ1bmN0aW9uXSxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICd0b3AnLFxuICAgICAgICAgICAgdmFsaWRhdGUodmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWydhdXRvJywgJ3RvcCcsICdib3R0b20nLCAnbGVmdCcsICdyaWdodCddLmluZGV4T2YodmFsdWUpICE9PSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgdGhpcyBwcm9wZXJ0eSBpcyBwYXNzZWQsIGl0IHdpbGwgZm9yY2UgdGhlIHBvcG92ZXIgdG8gYmUgdmlzaWJsZVxuICAgICAgICAgKiBieSBkZWZhdWx0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHNob3c6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGEgc2VsZWN0b3IgaXMgcHJvdmlkZWQsIHBvcG92ZXIgb2JqZWN0cyB3aWxsIGJlIGRlbGVnYXRlZCB0byB0aGVcbiAgICAgICAgICogc3BlY2lmaWVkIHRhcmdldHMuIEluIHByYWN0aWNlLCB0aGlzIGlzIHVzZWQgdG8gZW5hYmxlIGR5bmFtaWMgSFRNTFxuICAgICAgICAgKiBjb250ZW50IHRvIGhhdmUgcG9wb3ZlcnMgYWRkZWQuIFNlZSB0aGlzIGFuZCBhbiBpbmZvcm1hdGl2ZSBleGFtcGxlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbnxTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBzZWxlY3Rvcjoge1xuICAgICAgICAgICAgdHlwZTogW0Jvb2xlYW4sIFN0cmluZ10sXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgdGFyZ2V0IGVsZW1lbnQgdXNlZCB0byBwb3NpdGlvbiB0aGUgcG9wb3Zlci5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge1N0cmluZ3xFbGVtZW50fEJvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgIHR5cGU6IFtTdHJpbmcsIEVsZW1lbnQsIEJvb2xlYW5dLFxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHBvcG92ZXIgdGl0bGVcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRpdGxlOiBTdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhvdyBwb3BvdmVyIGlzIHRyaWdnZXJlZCAtIGNsaWNrIHwgaG92ZXIgfCBmb2N1cyB8IG1hbnVhbC4gWW91IG1heVxuICAgICAgICAgKiBwYXNzIG11bHRpcGxlIHRyaWdnZXJzOyBzZXBhcmF0ZSB0aGVtIHdpdGggYSBzcGFjZS4gYG1hbnVhbGAgY2Fubm90XG4gICAgICAgICAqIGJlIGNvbWJpbmVkIHdpdGggYW55IG90aGVyIHRyaWdnZXIuXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0cmlnZ2VyOiB7XG4gICAgICAgICAgICB0eXBlOiBbU3RyaW5nLCBBcnJheV0sXG4gICAgICAgICAgICBkZWZhdWx0OiAnY2xpY2snXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgYWxpZ24oKSB7XG4gICAgICAgICAgICBlYWNoKHRoaXMuJHBvcHBlcnMsIGVsID0+IHtcbiAgICAgICAgICAgICAgICBlbC5wb3BwZXIudXBkYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVQb3BwZXIoZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUG9wcGVyKGVsLCB0aGlzLiRlbCwge1xuICAgICAgICAgICAgICAgIG9mZnNldDogdGhpcy5vZmZzZXQsXG4gICAgICAgICAgICAgICAgcGxhY2VtZW50OiB0aGlzLnBsYWNlbWVudCxcbiAgICAgICAgICAgICAgICBtb2RpZmllcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgZmxpcDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgYm91bmRhcmllc0VsZW1lbnQ6IHRoaXMuY29udGFpbmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6IHRoaXMuZmFsbGJhY2tQbGFjZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiAhIXRoaXMub2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0OiB0aGlzLm9mZnNldFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBhcnJvdzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmFycm93JylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldEFycm93RWxlbWVudCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuYXJyb3cnKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW5pdGlhbGl6ZSB0aGUgdHJpZ2dlciBldmVudCBmb3IgdGhlIHNwZWNpZmllZCBlbGVtZW50c1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gIHtFbGVtZW50fSBlbFxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgaW5pdGlhbGl6ZVRyaWdnZXIoZWwpIHtcbiAgICAgICAgICAgIHRoaXMuJHBvcHBlcnNbZWxdID0ge1xuICAgICAgICAgICAgICAgIHRyaWdnZXI6IGlzU3RyaW5nKHRoaXMudHJpZ2dlcikgPyB0aGlzLnRyaWdnZXIuc3BsaXQoJyAnKSA6IHRoaXMudHJpZ2dlcixcbiAgICAgICAgICAgICAgICBwb3BwZXI6IHRoaXMuY3JlYXRlUG9wcGVyKGVsKSxcbiAgICAgICAgICAgICAgICBldmVudDogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBvcHBlcnNbZWxdLnBvcHBlci51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBlYWNoKHRoaXMuJHBvcHBlcnNbZWxdLnRyaWdnZXIsIHRyaWdnZXIgPT4ge1xuICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIodHJpZ2dlciwgdGhpcy4kcG9wcGVyc1tlbF0uZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICB3YXRjaDoge1xuXG4gICAgICAgIGlzU2hvd2luZyh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxpZ24oKTtcblxuICAgICAgICAgICAgICAgIGlmKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgY2xhc3NlcygpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmVmaXgoe1xuICAgICAgICAgICAgICAgICd0b3AnOiB0aGlzLnBsYWNlbWVudCA9PT0gJ3RvcCcsXG4gICAgICAgICAgICAgICAgJ2JvdHRvbSc6IHRoaXMucGxhY2VtZW50ID09PSAnYm90dG9tJyxcbiAgICAgICAgICAgICAgICAnbGVmdCc6IHRoaXMucGxhY2VtZW50ID09PSAnbGVmdCcsXG4gICAgICAgICAgICAgICAgJ3JpZ2h0JzogdGhpcy5wbGFjZW1lbnQgPT09ICdyaWdodCdcbiAgICAgICAgICAgIH0sICdicy1wb3BvdmVyJyk7XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBiZWZvcmVDcmVhdGUoKSB7XG4gICAgICAgIGlmKCF0aGlzLiRwb3BwZXJzKSB7XG4gICAgICAgICAgICB0aGlzLiRwb3BwZXJzID0ge307XG4gICAgICAgIH1cbiAgICB9XG5cbn07XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwicG9wb3Zlci1ib2R5XCI+XG4gICAgICAgIDxzbG90Lz5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAncG9wb3Zlci1ib2R5J1xuXG59O1xuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gICAgPGNvbXBvbmVudCA6aXM9XCJ0YWdcIiBjbGFzcz1cInBvcG92ZXItaGVhZGVyXCI+XG4gICAgICAgIDxzbG90Lz5cbiAgICA8L2NvbXBvbmVudD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAncG9wb3Zlci1oZWFkZXInLFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGNvbXBvbmVudCBIVE1MIGVsZW1lbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRhZzoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgZGVmYXVsdDogJ2gzJ1xuICAgICAgICB9XG5cbiAgICB9XG5cbn07XG48L3NjcmlwdD5cbiIsImltcG9ydCBQb3BvdmVyIGZyb20gJy4vUG9wb3Zlcic7XG5pbXBvcnQgUG9wb3ZlckJvZHkgZnJvbSAnLi9Qb3BvdmVyQm9keSc7XG5pbXBvcnQgUG9wb3ZlckhlYWRlciBmcm9tICcuL1BvcG92ZXJIZWFkZXInO1xuaW1wb3J0IFZ1ZUluc3RhbGxlciBmcm9tICcuLi8uLi9IZWxwZXJzL1Z1ZUluc3RhbGxlci9WdWVJbnN0YWxsZXInO1xuXG5jb25zdCBwbHVnaW4gPSBWdWVJbnN0YWxsZXIudXNlKHtcblxuICAgIGluc3RhbGwoVnVlLCBvcHRpb25zKSB7XG4gICAgICAgIFZ1ZUluc3RhbGxlci5jb21wb25lbnRzKHtcbiAgICAgICAgICAgIFBvcG92ZXIsXG4gICAgICAgICAgICBQb3BvdmVyQm9keSxcbiAgICAgICAgICAgIFBvcG92ZXJIZWFkZXJcbiAgICAgICAgfSk7XG4gICAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgUG9wb3ZlcjtcbiIsImltcG9ydCB7IGlzT2JqZWN0IH0gZnJvbSAnLi4vLi4vSGVscGVycy9GdW5jdGlvbnMnO1xuaW1wb3J0IHsgZGVlcEV4dGVuZCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCBpbnN0YW50aWF0ZSBmcm9tICcuLi8uLi9IZWxwZXJzL0luc3RhbnRpYXRlJztcbmltcG9ydCBQb3BvdmVyIGZyb20gJy4uLy4uL0NvbXBvbmVudHMvUG9wb3Zlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKFZ1ZSwgb3B0aW9ucykge1xuICAgIFZ1ZS5wcm90b3R5cGUuJHBvcG92ZXIgPSBmdW5jdGlvbih0YXJnZXQsIENvbXBvbmVudCwgb3B0aW9ucykge1xuICAgICAgICBpZighaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCF0YXJnZXQuJHBvcG92ZXIpIHtcbiAgICAgICAgICAgIHRhcmdldC4kcG9wb3ZlciA9IGluc3RhbnRpYXRlKFZ1ZSwgUG9wb3ZlciwgZGVlcEV4dGVuZChvcHRpb25zLnBvcG92ZXIsIHtcbiAgICAgICAgICAgICAgICBwcm9wc0RhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIHRhcmdldC4kcG9wb3Zlci4kbW91bnQoXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBpbnN0YW50aWF0ZShWdWUsIENvbXBvbmVudCwgb3B0aW9ucy5jb250ZW50KTtcblxuICAgICAgICAgICAgdGFyZ2V0LiRwb3BvdmVyLiRzbG90cy5kZWZhdWx0ID0gW2NvbnRlbnQuJG1vdW50KCkuX3Zub2RlXTtcbiAgICAgICAgICAgIHRhcmdldC4kcG9wb3Zlci4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC4kcG9wb3Zlci5vcGVuKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0YXJnZXQuJHBvcG92ZXI7XG4gICAgfTtcbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIiBAY2xpY2s9XCJvbkNsaWNrXCI+XG4gICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG4gICAgPC9idXR0b24+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ2FsZXJ0LWNsb3NlJyxcblxuICAgIG1ldGhvZHM6IHtcblxuICAgICAgICBvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdjbGljaycsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICAgIDxoNCBjbGFzcz1cImFsZXJ0LWhlYWRpbmdcIj48c2xvdC8+PC9oND5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnYWxlcnQtaGVhZGluZydcblxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cInByb2dyZXNzXCIgOnN0eWxlPVwieydoZWlnaHQnOiBmb3JtYXR0ZWRIZWlnaHR9XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcy1iYXJcIiByb2xlPVwicHJvZ3Jlc3NiYXJcIiA6c3R5bGU9XCJzdHlsZXNcIiA6Y2xhc3M9XCJtZXJnZUNsYXNzZXMocHJvZ3Jlc3NDbGFzc2VzLCB2YXJpYW50Q2xhc3MpXCIgOmFyaWEtdmFsdWVub3c9XCJvZmZzZXRWYWx1ZVwiIDphcmlhLXZhbHVlbWluPVwibWluXCIgOmFyaWEtdmFsdWVtYXg9XCJtYXhcIj5cbiAgICAgICAgICAgIDxzcGFuIHYtaWY9XCIhIWxhYmVsXCI+PHRlbXBsYXRlIHYtaWY9XCJsYWJlbCAhPT0gdHJ1ZVwiPnt7bGFiZWx9fTwvdGVtcGxhdGU+IHt7b2Zmc2V0VmFsdWV9fSU8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiB2LWVsc2U+PHNsb3QvPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHVuaXQgZnJvbSAnLi4vLi4vSGVscGVycy9Vbml0JztcbmltcG9ydCBWYXJpYW50IGZyb20gJy4uLy4uL01peGlucy9WYXJpYW50JztcbmltcG9ydCB7IGlzTnVtYmVyIH0gZnJvbSAnLi4vLi4vSGVscGVycy9GdW5jdGlvbnMnO1xuaW1wb3J0IE1lcmdlQ2xhc3NlcyBmcm9tICcuLi8uLi9NaXhpbnMvTWVyZ2VDbGFzc2VzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ3Byb2dyZXNzLWJhcicsXG5cbiAgICBtaXhpbnM6IFtcbiAgICAgICAgVmFyaWFudCxcbiAgICAgICAgTWVyZ2VDbGFzc2VzXG4gICAgXSxcblxuICAgIHByb3BzOiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgY3VzdG9tIGNvbG9yIHRvIGJlIGFwcGxpZWQgaW5saW5lIGluIHRoZSBzdHlsZXMgdnMgYSBjb250ZXh0dWFsXG4gICAgICAgICAqIHZhcmlhbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIGNvbG9yOiBTdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBwcm9ncmVzcyBiYXIgcGVyY2VudGFnZSB2YWx1ZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGhlaWdodCBvZiB0aGUgcHJvZ3Jlc3MgYmFyXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIGhlaWdodDogW051bWJlciwgU3RyaW5nXSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2hvdyB0aGUgcHJvZ3Jlc3MgYmFyIHZhbHVlIGFzIGEgbGFiZWwgaW5zaWRlIHRoZSBiYXJcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgbGFiZWw6IFtTdHJpbmcsIEJvb2xlYW5dLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG91bGQgdGhlIHByb2dyZXNzIGJhciBhcHBlYXIgd2l0aCBzdHJpcGVzXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIHN0cmlwZWQ6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNob3VsZCB0aGUgcHJvZ3Jlc3MgYmFyIGFwcGVhciB3aXRoIGFuaW1hdGVkIHN0cmlwZXNcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgYW5pbWF0ZWQ6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBtaW5pbXVtIHZhbHVlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIG1pbjoge1xuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgICAgICAgZGVmYXVsdDogMFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbWF4IHZhbHVlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIG1heDoge1xuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgICAgICAgZGVmYXVsdDogMTAwXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBjb21wdXRlZDoge1xuXG4gICAgICAgIHZhcmlhbnRDbGFzc1ByZWZpeCgpIHtcbiAgICAgICAgICAgIHJldHVybiAnYmcnO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9mZnNldFZhbHVlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgLyB0aGlzLm1heCAqIDEwMDtcbiAgICAgICAgfSxcblxuICAgICAgICBmb3JtYXR0ZWRIZWlnaHQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQgPyB1bml0KHRoaXMuaGVpZ2h0KSA6IG51bGw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcHJvZ3Jlc3NDbGFzc2VzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAncHJvZ3Jlc3MtYmFyLXN0cmlwZWQnOiB0aGlzLnN0cmlwZWQsXG4gICAgICAgICAgICAgICAgJ3Byb2dyZXNzLWJhci1hbmltYXRlZCc6IHRoaXMuYW5pbWF0ZWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3R5bGVzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5vZmZzZXRWYWx1ZX0lYCxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBgJHt0aGlzLmNvbG9yfSAhaW1wb3J0YW50YFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG5cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IFByb2dyZXNzQmFyIGZyb20gJy4vUHJvZ3Jlc3NCYXInO1xuaW1wb3J0IFZ1ZUluc3RhbGxlciBmcm9tICcuLi8uLi9IZWxwZXJzL1Z1ZUluc3RhbGxlci9WdWVJbnN0YWxsZXInO1xuXG5jb25zdCBwbHVnaW4gPSBWdWVJbnN0YWxsZXIudXNlKHtcblxuICAgIGluc3RhbGwoVnVlLCBvcHRpb25zKSB7XG4gICAgICAgIFZ1ZUluc3RhbGxlci5jb21wb25lbnRzKHtcbiAgICAgICAgICAgIFByb2dyZXNzQmFyXG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFByb2dyZXNzQmFyO1xuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJhbGVydFwiIDpjbGFzcz1cIm1lcmdlQ2xhc3Nlcyh2YXJpYW50Q2xhc3MsIHtzaG93OiBpc1Zpc2libGUsIGZhZGU6IGZhZGV9KVwiIHJvbGU9XCJhbGVydFwiPlxuICAgICAgICA8YWxlcnQtaGVhZGluZyB2LWlmPVwidGl0bGUgfHwgaGVhZGluZ1wiPnt7IHRpdGxlIHx8IGhlYWRpbmcgfX08L2FsZXJ0LWhlYWRpbmc+XG4gICAgICAgIDxzbG90Lz5cbiAgICAgICAgPGFsZXJ0LWNsb3NlIHYtaWY9XCJkaXNtaXNzaWJsZVwiIEBjbGljaz1cImRpc21pc3MoKVwiLz5cbiAgICAgICAgPHByb2dyZXNzLWJhciB2LWlmPVwidHlwZW9mIHNob3cgPT09ICdudW1iZXInXCIgOnZhcmlhbnQ9XCJ2YXJpYW50XCIgOmhlaWdodD1cIjVcIiA6dmFsdWU9XCJkaXNtaXNzQ291bnRcIiA6bWF4PVwic2hvd1wiIGNsYXNzPVwibXktM1wiLz5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgQWxlcnRDbG9zZSBmcm9tICcuL0FsZXJ0Q2xvc2UnO1xuaW1wb3J0IEFsZXJ0SGVhZGluZyBmcm9tICcuL0FsZXJ0SGVhZGluZyc7XG5pbXBvcnQgUHJvZ3Jlc3NCYXIgZnJvbSAnLi4vUHJvZ3Jlc3NCYXInO1xuaW1wb3J0IFZhcmlhbnQgZnJvbSAnLi4vLi4vTWl4aW5zL1ZhcmlhbnQnO1xuaW1wb3J0IHRyYW5zaXRpb24gZnJvbSAnLi4vLi4vSGVscGVycy9UcmFuc2l0aW9uJztcbmltcG9ydCBNZXJnZUNsYXNzZXMgZnJvbSAnLi4vLi4vTWl4aW5zL01lcmdlQ2xhc3Nlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdhbGVydCcsXG5cbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIEFsZXJ0Q2xvc2UsXG4gICAgICAgIEFsZXJ0SGVhZGluZyxcbiAgICAgICAgUHJvZ3Jlc3NCYXJcbiAgICB9LFxuXG4gICAgbWl4aW5zOiBbXG4gICAgICAgIFZhcmlhbnQsXG4gICAgICAgIE1lcmdlQ2xhc3Nlc1xuICAgIF0sXG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJcyB0aGUgYWxlcnQgZGlzbWlzc2libGVcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IEJvb2xlYW5cbiAgICAgICAgICovXG4gICAgICAgIGRpc21pc3NpYmxlOiBCb29sZWFuLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgYWxlcnQncyB0aXRsZS9oZWFkaW5nXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBCb29sZWFuXG4gICAgICAgICAqL1xuICAgICAgICBoZWFkaW5nOiBTdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBhbGVydCdzIHRpdGxlL2hlYWRpbmdcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IEJvb2xlYW5cbiAgICAgICAgICovXG4gICAgICAgIHRpdGxlOiBTdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNob3VsZCB0aGUgYWxlcnQgZmFkZSB3aGVuIGhpZGRlblxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgQm9vbGVhblxuICAgICAgICAgKi9cbiAgICAgICAgZmFkZToge1xuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2hvdWxkIHRoZSBhbGVydCBiZSB2aXNpYmxlIGJ5IGRlZmF1bHQuIElmIHBhc3NlZCBhIG51bWJlciwgYWxlcnRcbiAgICAgICAgICogd2lsbCBiZSBzaG93biBmb3IgdGhlIG51bWJlciBvZiBzZWNvbmRzIHRoYXQgYXJlIHBhc3NlZC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IEJvb2xlYW5cbiAgICAgICAgICovXG4gICAgICAgIHNob3c6IHtcbiAgICAgICAgICAgIHR5cGU6IFtOdW1iZXIsIEJvb2xlYW5dLFxuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgbWV0aG9kczoge1xuXG4gICAgICAgIGRpc21pc3MoKSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uKHRoaXMuJGVsKS50aGVuKGRlbGF5ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdkaXNtaXNzZWQnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCd1cGRhdGU6dmlzaWJsZScsIHRoaXMuaXNWaXNpYmxlID0gZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgaWYodHlwZW9mIHRoaXMuc2hvdyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLnByb2dyZXNzLWJhcicpO1xuXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdkaXNtaXNzLWNvdW50ZG93bicsIHRoaXMuZGlzbWlzc0NvdW50ID0gdGhpcy5zaG93KTtcblxuICAgICAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnZGlzbWlzcy1jb3VudGRvd24nLCB0aGlzLmRpc21pc3NDb3VudCAtPSAxKTtcblxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmRpc21pc3NDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbihlbCkudGhlbihkZWxheSA9PiB0aGlzLmRpc21pc3MoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpc21pc3NDb3VudDogdGhpcy5zaG93LFxuICAgICAgICAgICAgaXNWaXNpYmxlOiB0aGlzLnNob3dcbiAgICAgICAgfVxuICAgIH1cblxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gICAgPGEgY2xhc3M9XCJhbGVydC1saW5rXCI+PHNsb3QvPjwvYT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnYWxlcnQtbGluaydcblxufVxuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgQWxlcnQgZnJvbSAnLi9BbGVydCc7XG5pbXBvcnQgQWxlcnRMaW5rIGZyb20gJy4vQWxlcnRMaW5rJztcbmltcG9ydCBBbGVydENsb3NlIGZyb20gJy4vQWxlcnRDbG9zZSc7XG5pbXBvcnQgQWxlcnRIZWFkaW5nIGZyb20gJy4vQWxlcnRIZWFkaW5nJztcbmltcG9ydCBWdWVJbnN0YWxsZXIgZnJvbSAnLi4vLi4vSGVscGVycy9WdWVJbnN0YWxsZXIvVnVlSW5zdGFsbGVyJztcblxuY29uc3QgcGx1Z2luID0gVnVlSW5zdGFsbGVyLnVzZSh7XG5cbiAgICBpbnN0YWxsKFZ1ZSwgb3B0aW9ucykge1xuICAgICAgICBWdWVJbnN0YWxsZXIuY29tcG9uZW50cyh7XG4gICAgICAgICAgICBBbGVydCxcbiAgICAgICAgICAgIEFsZXJ0TGluayxcbiAgICAgICAgICAgIEFsZXJ0Q2xvc2UsXG4gICAgICAgICAgICBBbGVydEhlYWRpbmdcbiAgICAgICAgfSk7XG4gICAgfVxuXG59KTtcblxuZXhwb3J0ICogZnJvbSAnLi9BbGVydExpbmsnO1xuZXhwb3J0ICogZnJvbSAnLi9BbGVydENsb3NlJztcbmV4cG9ydCAqIGZyb20gJy4vQWxlcnRIZWFkaW5nJztcbmV4cG9ydCBkZWZhdWx0IEFsZXJ0O1xuIiwiPHRlbXBsYXRlPlxuICAgIDxhIHYtaWY9XCJocmVmXCIgOmhyZWY9XCJocmVmXCIgY2xhc3M9XCJiYWRnZVwiIDpjbGFzcz1cIm1lcmdlQ2xhc3NlcyhjbGFzc2VzLCB2YXJpYW50Q2xhc3MpXCI+XG4gICAgICAgIDxzbG90Pnt7bGFiZWx9fTwvc2xvdD5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCIgdi1odG1sPVwiYWNjZXNzaWJpbGl0eVwiLz5cbiAgICA8L2E+XG4gICAgPHNwYW4gdi1lbHNlIGNsYXNzPVwiYmFkZ2VcIiA6Y2xhc3M9XCJtZXJnZUNsYXNzZXMoY2xhc3NlcywgdmFyaWFudENsYXNzKVwiPlxuICAgICAgICA8c2xvdD57e2xhYmVsfX08L3Nsb3Q+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIHYtaHRtbD1cImFjY2Vzc2liaWxpdHlcIi8+XG4gICAgPC9zcGFuPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBwcmVmaXggZnJvbSAnLi4vLi4vSGVscGVycy9QcmVmaXgnO1xuaW1wb3J0IFZhcmlhbnQgZnJvbSAnLi4vLi4vTWl4aW5zL1ZhcmlhbnQnO1xuaW1wb3J0IE1lcmdlQ2xhc3NlcyBmcm9tICcuLi8uLi9NaXhpbnMvTWVyZ2VDbGFzc2VzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ2JhZGdlJyxcblxuICAgIG1peGluczogW1xuICAgICAgICBWYXJpYW50LFxuICAgICAgICBNZXJnZUNsYXNzZXNcbiAgICBdLFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHNjcmVlbiByZWFkZXIgYWNjZXNzaWJpbGl0eSBsYWJlbC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgYWNjZXNzaWJpbGl0eTogU3RyaW5nLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBhbiBocmVmIGF0dHJpYnV0ZSBpcyBwYXNzZWQsIHRoZSBiYWRnZSBiZWNvbWVzIGFuIGFuY2hvci5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgaHJlZjogU3RyaW5nLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgYmFkZ2UgYXBwZWFyIGFzIHBpbGwgc2hhcGVkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBwaWxsOiBCb29sZWFuLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgYmFkZ2UgbGFiZWwuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIGxhYmVsOiBbTnVtYmVyLCBTdHJpbmddLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgYmFkZ2UgYXBwZWFyIGFzIHNlY29uZGFyeSBpbiBzaXplIHRvIHRoZSBwYXJlbnQgZWxlbWVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgc2Vjb25kYXJ5OiBCb29sZWFuXG5cbiAgICB9LFxuXG4gICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICBjbGFzc2VzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHByZWZpeCh7XG4gICAgICAgICAgICAgICAgJ3BpbGwnOiB0aGlzLnBpbGwsXG4gICAgICAgICAgICAgICAgJ3NlY29uZGFyeSc6IHRoaXMuc2Vjb25kYXJ5XG4gICAgICAgICAgICB9LCB0aGlzLiRvcHRpb25zLm5hbWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG48L3NjcmlwdD5cbiIsImltcG9ydCBCYWRnZSBmcm9tICcuL0JhZGdlJztcbmltcG9ydCBWdWVJbnN0YWxsZXIgZnJvbSAnLi4vLi4vSGVscGVycy9WdWVJbnN0YWxsZXIvVnVlSW5zdGFsbGVyJztcblxuY29uc3QgcGx1Z2luID0gVnVlSW5zdGFsbGVyLnVzZSh7XG5cbiAgICBpbnN0YWxsKFZ1ZSwgb3B0aW9ucykge1xuICAgICAgICBWdWVJbnN0YWxsZXIuY29tcG9uZW50cyh7XG4gICAgICAgICAgICBCYWRnZVxuICAgICAgICB9KTtcbiAgICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBCYWRnZTtcbiIsImltcG9ydCB7IGlzT2JqZWN0IH0gZnJvbSAnLi4vSGVscGVycy9GdW5jdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlQ2xhc3Mge1xuXG4gICAgY29uc3RydWN0b3IoYXR0cmlidXRlcykge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVzKTtcbiAgICB9XG5cbiAgICBnZXRBdHRyaWJ1dGUoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc093blByb3BlcnR5KGtleSkgPyB0aGlzW2tleV0gOiBudWxsO1xuICAgIH1cblxuICAgIGdldEF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSB7fTtcblxuICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzW2tleV0gPSB0aGlzLmdldEF0dHJpYnV0ZShrZXkpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYXR0cmlidXRlcztcbiAgICB9XG5cbiAgICBnZXRQdWJsaWNBdHRyaWJ1dGVzKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5nZXRBdHRyaWJ1dGVzKCkpXG4gICAgICAgICAgICAuZmlsdGVyKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFrZXkubWF0Y2goL15cXCQvKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucmVkdWNlKChvYmosIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIG9ialtrZXldID0gdGhpcy5nZXRBdHRyaWJ1dGUoa2V5KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICB9LCB7fSk7XG4gICAgfVxuXG4gICAgc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYoaXNPYmplY3Qoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGVzKGtleSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0QXR0cmlidXRlcyh2YWx1ZXMpIHtcbiAgICAgICAgZm9yKGNvbnN0IGkgaW4gdmFsdWVzKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShpLCB2YWx1ZXNbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgQmFzZUNsYXNzIGZyb20gJy4uLy4uL1N1cHBvcnQvQmFzZUNsYXNzJztcbmltcG9ydCB7IGV4dGVuZCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzcG9uc2UgZXh0ZW5kcyBCYXNlQ2xhc3Mge1xuXG4gICAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgICAgICBzdXBlcihleHRlbmQoe1xuICAgICAgICAgICAgZGF0ZTogbmV3IERhdGVcbiAgICAgICAgfSwgZGF0YSkpO1xuICAgIH1cblxuICAgIGdldCBkYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kZGF0YTtcbiAgICB9XG5cbiAgICBzZXQgZGF0YSh2YWx1ZSkge1xuICAgICAgICB0aGlzLiRkYXRhID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHJlcXVlc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRyZXF1ZXN0O1xuICAgIH1cblxuICAgIHNldCByZXF1ZXN0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuJHJlcXVlc3QgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGRhdGU7XG4gICAgfVxuXG4gICAgc2V0IGRhdGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy4kZGF0ZSA9IHZhbHVlO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCBSZXNwb25zZSBmcm9tICcuL1Jlc3BvbnNlJztcbmltcG9ydCBCYXNlQ2xhc3MgZnJvbSAnLi4vLi4vU3VwcG9ydC9CYXNlQ2xhc3MnO1xuaW1wb3J0IHsgZXh0ZW5kIH0gZnJvbSAnLi4vLi4vSGVscGVycy9GdW5jdGlvbnMnO1xuaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICcuLi8uLi9IZWxwZXJzL0Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcblxuY29uc3QgREVGQVVMVFMgPSB7XG4gICAgdHJhbnNmb3JtUmVxdWVzdDogW10sXG4gICAgdHJhbnNmb3JtUmVzcG9uc2U6IFtdXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXF1ZXN0IGV4dGVuZHMgQmFzZUNsYXNzIHtcblxuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCwgdXJsLCBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIHN1cGVyKHtcbiAgICAgICAgICAgIG9wdGlvbnM6IHt9LFxuICAgICAgICAgICAgZGF0YToge30sXG4gICAgICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgICAgIHBhcmFtczoge30sXG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYoaXNPYmplY3QoYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VuZChhdHRyaWJ1dGVzKSB7XG4gICAgICAgIHRoaXMuc2VudEF0ID0gbmV3IERhdGU7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlcyhhdHRyaWJ1dGVzKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgYXhpb3ModGhpcy5vcHRpb25zKS50aGVuKFxuICAgICAgICAgICAgICAgIGRhdGEgPT4gcmVzb2x2ZSh0aGlzLnJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGRhdGEpKSxcbiAgICAgICAgICAgICAgICBlcnJvcnMgPT4gcmVqZWN0KHRoaXMuZXJyb3JzID0gZXJyb3JzKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0IGNhbmNlbCh2YWx1ZSkge1xuICAgICAgICB0aGlzLiRjYW5jZWwgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgY2FuY2VsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kY2FuY2VsIHx8ICgoKSA9PiB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSByZXF1ZXN0IGhhcyBub3QgYmVlbiBzZW50IHlldC4nKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0IG9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBleHRlbmQoe1xuICAgICAgICAgICAgY2FuY2VsVG9rZW46IG5ldyBheGlvcy5DYW5jZWxUb2tlbihcbiAgICAgICAgICAgICAgICBjYW5jZWwgPT4gdGhpcy5jYW5jZWwgPSBjYW5jZWxcbiAgICAgICAgICAgIClcbiAgICAgICAgfSwgREVGQVVMVFMsIHRoaXMuZ2V0UHVibGljQXR0cmlidXRlcygpKTtcbiAgICB9XG5cbiAgICBzZXQgb3B0aW9ucyhhdHRyaWJ1dGVzKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZXMpO1xuICAgIH1cblxuICAgIGdldCByZXNwb25zZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHNldCByZXNwb25zZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLiRyZXNwb25zZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBlcnJvcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRlcnJvcnM7XG4gICAgfVxuXG4gICAgc2V0IGVycm9ycyh2YWx1ZSkge1xuICAgICAgICB0aGlzLiRlcnJvcnMgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgcGFzc2VkKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLnJlc3BvbnNlICYmICF0aGlzLmVycm9ycztcbiAgICB9XG5cbiAgICBnZXQgZmFpbGVkKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLnJlc3BvbnNlICYmICEhdGhpcy4kZXJyb3I7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCB0cmFuc2Zvcm0oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXF1ZXN0OiB0aGlzLnRyYW5zZm9ybVJlcXVlc3QsXG4gICAgICAgICAgICByZXNwb25zZTogdGhpcy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICAgICAgcmV0dXJuIERFRkFVTFRTO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXQgZGVmYXVsdHModmFsdWUpIHtcbiAgICAgICAgZXh0ZW5kKERFRkFVTFRTLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHRyYW5zZm9ybVJlcXVlc3QoZm4pIHtcbiAgICAgICAgREVGQVVMVFMudHJhbnNmb3JtUmVxdWVzdC5wdXNoKGZuKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdHJhbnNmb3JtUmVzcG9uc2UoZm4pIHtcbiAgICAgICAgREVGQVVMVFMudHJhbnNmb3JtUmVzcG9uc2UucHVzaChmbik7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCh1cmwsIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFrZSgnZ2V0JywgdXJsKS5zZW5kKGF0dHJpYnV0ZXMpO1xuICAgIH1cblxuICAgIHN0YXRpYyBwb3N0KHVybCwgYXR0cmlidXRlcykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYWtlKCdwb3N0JywgdXJsLCBhdHRyaWJ1dGVzKS5zZW5kKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHB1dCh1cmwsIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFrZSgncHV0JywgdXJsLCBhdHRyaWJ1dGVzKS5zZW5kKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHBhdGNoKHVybCwgZGF0YSwgYXR0cmlidXRlcykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYWtlKCdwYXRoJywgdXJsLCBhdHRyaWJ1dGVzKS5zZW5kKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRlbGV0ZSh1cmwsIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFrZSgnZGVsZXRlJywgdXJsLCBhdHRyaWJ1dGVzKS5zZW5kKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIG1ha2UobWV0aG9kLCB1cmwsIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKG1ldGhvZCwgdXJsLCBhdHRyaWJ1dGVzKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL1JlcXVlc3QnO1xuaW1wb3J0IHsgZWFjaCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCB7IGlzTnVsbCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCB7IHBpY2tCeSB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuLi8uLi9IZWxwZXJzL0Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCB7IGlzVW5kZWZpbmVkIH0gZnJvbSAnLi4vLi4vSGVscGVycy9GdW5jdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RlbCB7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgdGhlIG1vZGVsIGluc3RhbmNlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YSBvYmplY3RcbiAgICAgKiBAcmV0dXJuIHZvaWRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihkYXRhID0ge30sIHBhcmFtcyA9IHt9KSB7XG4gICAgICAgIHRoaXMuJHJlcXVlc3QgPSBudWxsO1xuICAgICAgICB0aGlzLiRrZXkgPSB0aGlzLmtleSgpO1xuICAgICAgICB0aGlzLiRmaWxlcyA9IHRoaXMuZmlsZXMoKTtcbiAgICAgICAgdGhpcy4kcHJvcGVydGllcyA9IHRoaXMucHJvcGVydGllcygpO1xuXG4gICAgICAgIGVhY2gocGFyYW1zLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgdGhpc1trZXldID0gdmFsdWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZShkYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoZSBtb2RlbCB3aXRoIHRoZSBnaXZlbiBkYXRhIHdpdGhvdXQgY29uc2lkZXJpbmcgdGhlIGRhdGFcbiAgICAgKiBhcyBcImNoYW5nZWRcIi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkYXRhIG9iamVjdFxuICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAqL1xuICAgIGluaXRpYWxpemUoZGF0YSkge1xuICAgICAgICB0aGlzLiRleGlzdHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy4kY2hhbmdlZCA9IHt9O1xuICAgICAgICB0aGlzLiRhdHRyaWJ1dGVzID0ge307XG4gICAgICAgIHRoaXMuZmlsbChkYXRhKTtcbiAgICAgICAgdGhpcy4kaW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlZmluZSB0aGUgY29ycmVzcG9uZGluZyBBUEkgZW5kcG9pbnQgc2x1Z1xuICAgICAqXG4gICAgICogQHJldHVybiBzdHJpbmdcbiAgICAgKi9cbiAgICBlbmRwb2ludCgpIHtcbiAgICAgICAgLy9cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWZpbmUgdGhlIGNvcnJlc3BvbmRpbmcgdXJpIHNjaGVtYS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gc3RyaW5nXG4gICAgICovXG4gICAgdXJpKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgKHRoaXMuZW5kcG9pbnQoKSB8fCAnJyksXG4gICAgICAgICAgICAodGhpcy5leGlzdHMoKSA/IHRoaXMuaWQoKSA6IG51bGwpXG4gICAgICAgIF1cbiAgICAgICAgLmZpbHRlcih2YWx1ZSA9PiAhIXZhbHVlKVxuICAgICAgICAuY29uY2F0KFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSlcbiAgICAgICAgLmpvaW4oJy8nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIHByaW1hcnkga2V5IHZhbHVlIGZvciB0aGUgbW9kZWxcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KHRoaXMua2V5KCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlZmluZSBhIHByaW1hcnkga2V5LiBUaGlzIGlzIHVzZWQgdG8gZGV0ZXJtaW5lIGlmIHRoZSBtb2RlbCBleGlzdHMgYW5kXG4gICAgICogd2hpY2ggZW5kcG9pbnQgdG8gdXNlLlxuICAgICAqXG4gICAgICogQHJldHVybiBzdHJpbmdcbiAgICAgKi9cbiAgICBrZXkoKSB7XG4gICAgICAgIHJldHVybiAnaWQnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhbiBhcnJheSBvZiBwcm9wZXJ0aWVzIHRoYXQgYXJlIHNlbnQgdG8gdGhlIEFQSS4gSWYgbm8gcHJvcGVydGllc1xuICAgICAqIGFyZSBkZWZpbmVkLCB0aGVuIGFsbCB0aGUgYXR0cmlidXRlcyB3aWxsIGJlIGluY2x1ZGVkIGluIHRoZSByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQHJldHVybiBhcnJheVxuICAgICAqL1xuICAgIHByb3BlcnRpZXMoKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYW4gYXJyYXkgb2YgZmlsZSBwcm9wZXJ0aWVzIHRoYXQgYXJlIHNlbnQgdG8gdGhlIEFQSS4gSWYgbm8gZmllc1xuICAgICAqIGFyZSBkZWZpbmVkLCB0aGVuIHJlcXVlc3Qgd2lsbCBhbHdheXMgYmUgc2VudCB3aXRoIEpTT04gdnMuIG11bHRpcGFydC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gYXJyYXlcbiAgICAgKi9cbiAgICBmaWxlcygpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgYXR0cmlidXRlcyBpbiB0aGUgbW9kZWwgd2l0aCB0aGUgZGF0YSBnaXZlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkYXRhIG9iamVjdFxuICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAqL1xuICAgIGZpbGwoZGF0YSkge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZXMoZGF0YSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IG9uZSBvciBtb3JlIGF0dHJpYnV0ZXMgZnJvbSB0aGUgbW9kZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YSBzdHJpbmd8YXJyYXlcbiAgICAgKiBAcmV0dXJuIGFycmF5fG1peGVkXG4gICAgICovXG4gICAgZ2V0KGtleSkge1xuICAgICAgICBpZihpc0FycmF5KGtleSkgfHwgaXNPYmplY3Qoa2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlcygpLmZpbHRlcigodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5pbmRleE9mKHZhbHVlKSAhPT0gLTE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShrZXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHNldEF0dHJpYnV0ZXMoKSBleGNlcHQgdGhpcyBtZXRob2QgcmV0dXJucyBgdGhpc2AuIFRoaXMgbWV0aG9kXG4gICAgICogYWxzbyBhY2NlcHRzIGFuIGFycmF5IG9mIHZhbHVlcyBvciBrZXkvdmFsdWUgcGFpci5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAqL1xuICAgIHNldChrZXksIHZhbHVlID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmKGlzQXJyYXkoa2V5KSB8fCBpc09iamVjdChrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZXMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCB0aGUgZGVmaW5lZCBhdHRyaWJ1dGVzLlxuICAgICAqXG4gICAgICogQHJldHVybiBhcnJheVxuICAgICAqL1xuICAgIGdldEF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRhdHRyaWJ1dGVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY2hhbmdlZCBhdHRyaWJ1dGVzXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIGFycmF5XG4gICAgICovXG4gICAgZ2V0Q2hhbmdlZEF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLiRjaGFuZ2VkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGNoYW5nZWQgYXR0cmlidXRlc1xuICAgICAqXG4gICAgICogQHJldHVybiBhcnJheVxuICAgICAqL1xuICAgIGdldE9yaWdpbmFsVmFsdWUoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRjaGFuZ2VkW2tleV0gfHwgdGhpcy4kYXR0cmlidXRlc1trZXldO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgUmVxdWVzdCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHttaXhlZH1cbiAgICAgKi9cbiAgICBnZXRSZXF1ZXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kcmVxdWVzdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHVuY2hhbmdlZCBhdHRyaWJ1dGVzXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIGFycmF5XG4gICAgICovXG4gICAgZ2V0VW5jaGFuZ2VkQXR0cmlidXRlcygpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuJGF0dHJpYnV0ZXMpLmZpbHRlcihrZXkgPT4gIShrZXkgaW4gdGhpcy4kY2hhbmdlZCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbiBhdHRyaWJ1dGUgd2l0aCBhIGdpdmVuIGtleS4gSWYgbm8ga2V5IGlzIGRlZmluZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXkgc3RyaW5nXG4gICAgICogQHBhcmFtIGRlZmF1bHQgdW5kZWZpbmVkfG1peGVkXG4gICAgICogQHJldHVybiBhcnJheVxuICAgICAqL1xuICAgIGdldEF0dHJpYnV0ZShrZXksIHZhbHVlID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRhdHRyaWJ1dGVzW2tleV0gfHwgdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGFuIGFycmF5IG9yIG9iamVjdCBvZiBkYXRhIGFzIGF0dHJpYnV0ZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYXR0cmlidXRlcyBhcnJheXxvYmplY3RcbiAgICAgKiBAcmV0dXJuIHZvaWRcbiAgICAgKi9cbiAgICBzZXRBdHRyaWJ1dGVzKGRhdGEpIHtcbiAgICAgICAgaWYoaXNBcnJheShkYXRhKSB8fCBpc09iamVjdChkYXRhKSkge1xuICAgICAgICAgICAgZWFjaChkYXRhLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgYW4gYXR0cmlidXRlIHdpdGggYSBnaXZlbiBrZXkvdmFsdWUgcGFpci4gVGhpcyB3aWxsIHRyYWNrIHRoZSBjaGFuZ2VzXG4gICAgICogaW4gdGhlIG1vZGVsIHdpdGhpbiB0aGUgYHRoaXMuJGNoYW5nZWRgIHByb3BlcnR5LiBJZiB0aGUgcHJpbWFyeSBrZXlcbiAgICAgKiBpcyBzZXQsIGl0IHdpbGwgYWxzbyBjaGFuZ2UgdGhlIGB0aGlzLiRleGlzdHNgIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGtleSBzdHJpbmdcbiAgICAgKiBAcGFyYW0gdmFsdWUgbWl4ZWRcbiAgICAgKiBAcmV0dXJuIHZvaWRcbiAgICAgKi9cbiAgICBzZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSkge1xuICAgICAgICBpZih0aGlzLmdldEF0dHJpYnV0ZShrZXkpICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVBdHRyaWJ1dGVDaGFuZ2Uoa2V5LCB2YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmKGlzVW5kZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLiRhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRhdHRyaWJ1dGVzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldmVydCB0aGUgbW9kZWwgdG8gaXRzIG9yaWdpbmFsIHN0YXRlLlxuICAgICAqXG4gICAgICogQHJldHVybiBib29sXG4gICAgICovXG4gICAgcmV2ZXJ0KCkge1xuICAgICAgICBlYWNoKHRoaXMuJGNoYW5nZWQsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBpZighaXNVbmRlZmluZWQodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kYXR0cmlidXRlc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy4kYXR0cmlidXRlc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLiRjaGFuZ2VkID0ge307XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBpZiB0aGUgbW9kZWwgaGFzIGEgcHJpbWFyeSBrZXkgc2V0LlxuICAgICAqXG4gICAgICogQHJldHVybiBib29sXG4gICAgICovXG4gICAgZXhpc3RzKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLiRleGlzdHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbW9kZWwgYmVlbiBjaGFuZ2VkIG9yIG5vdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gYm9vbFxuICAgICAqL1xuICAgIGhhc0NoYW5nZWQoa2V5KSB7XG4gICAgICAgIHJldHVybiAha2V5ID8gdGhpcy5nZXRDaGFuZ2VkQXR0cmlidXRlcygpLmxlbmd0aCA+IDAgOiAhaXNVbmRlZmluZWQodGhpcy4kY2hhbmdlZFtrZXldKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEb2VzIHRoZSBtb2RlbCBoYXZlIGFueSBGaWxlIG9iamVjdHMuIElmIHNvLCBuZWVkIHRvIHNlbmQgYXMgbXVsdGlwYXJ0LlxuICAgICAqXG4gICAgICogQHJldHVybiBib29sXG4gICAgICovXG4gICAgaGFzRmlsZXMoKSB7XG4gICAgICAgIGZ1bmN0aW9uIGNvdW50KGZpbGVzLCB0b3RhbCA9IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmaWxlcy5yZWR1Y2UoKGNhcnJ5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXJyeSArIGNvdW50KHZhbHVlLCB0b3RhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYodmFsdWUgaW5zdGFuY2VvZiBGaWxlIHx8IHZhbHVlIGluc3RhbmNlb2YgRmlsZUxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcnJ5ICsgMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXJyeTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0b3RhbCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY291bnQodGhpcy50b0pTT04oKSkgIT09IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIHNldHRpbmdzIHRoZSAkY2hhbmdlZCBhdHRyaWJ1dGVzIHdoZW4gYW4gYXR0cmlidXRlIHZhbHVlIGlzIHNldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXkgc3RyaW5nXG4gICAgICogQHBhcmFtIHZhbHVlIG1peGVkXG4gICAgICogQHJldHVybiB2b2lkXG4gICAgICovXG4gICAgaGFuZGxlQXR0cmlidXRlQ2hhbmdlKGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYodGhpcy4kaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuJGNoYW5nZWRba2V5XSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy4kY2hhbmdlZFtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZighKGtleSBpbiB0aGlzLiRjaGFuZ2VkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGNoYW5nZWRba2V5XSA9IHRoaXMuZ2V0QXR0cmlidXRlKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhhbmRsZVByaW1hcnlLZXlDaGFuZ2Uoa2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGFuIGFycmF5IG9yIG9iamVjdCBvZiBkYXRhIGFzIGF0dHJpYnV0ZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2V5IHN0cmluZ1xuICAgICAqIEBwYXJhbSB2YWx1ZSBtaXhlZFxuICAgICAqIEByZXR1cm4gdm9pZFxuICAgICAqL1xuICAgIGhhbmRsZVByaW1hcnlLZXlDaGFuZ2Uoa2V5LCB2YWx1ZSkge1xuICAgICAgICBpZih0aGlzLiRrZXkgPT09IGtleSkge1xuICAgICAgICAgICAgdGhpcy4kZXhpc3RzID0gIWlzVW5kZWZpbmVkKHZhbHVlKSAmJiAhaXNOdWxsKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbmNlbCB0aGUgY3VycmVudCByZXF1ZXN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YSBvYmplY3RcbiAgICAgKiBAcmV0dXJuIGJvb2xcbiAgICAgKi9cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHRoaXMuJHJlcXVlc3QgJiYgdGhpcy4kcmVxdWVzdC5jYW5jZWwoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTYXZlIHRoZSBtb2RlbCB0byB0aGUgZGF0YWJhc2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSBkYXRhIG9iamVjdFxuICAgICAqIEByZXR1cm4gYm9vbFxuICAgICAqL1xuICAgIHNhdmUoZGF0YSA9IHt9LCBjb25maWcgPSB7fSkge1xuICAgICAgICB0aGlzLmZpbGwoZGF0YSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSAhdGhpcy5oYXNGaWxlcygpID8gdGhpcy50b0pTT04oKSA6IHRoaXMudG9Gb3JtRGF0YSgpO1xuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gIXRoaXMuZXhpc3RzKCkgfHwgdGhpcy5oYXNGaWxlcygpID8gJ3Bvc3QnIDogJ3B1dCc7XG5cbiAgICAgICAgICAgIHRoaXMuJHJlcXVlc3QgPSB0aGlzLmNvbnN0cnVjdG9yLnJlcXVlc3QobWV0aG9kLCBjb25maWcudXJpIHx8IHRoaXMudXJpKCksIGNvbmZpZyk7XG4gICAgICAgICAgICB0aGlzLiRyZXF1ZXN0LnNlbmQoe1xuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4gcmVzb2x2ZSh0aGlzLmZpbGwocmVzcG9uc2UpKSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIGFuIGV4aXN0aW5nIG1vZGVsXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGNvbmZpZ1xuICAgICAqIEByZXR1cm4ge2Jvb2x9XG4gICAgICovXG4gICAgZGVsZXRlKGNvbmZpZyA9IHt9KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZighdGhpcy5leGlzdHMoKSkge1xuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ1RoZSBtb2RlbCBtdXN0IGhhdmUgYSBwcmltYXJ5IGtleSBiZWZvcmUgaXQgY2FuIGJlIGRlbGV0ZS4nKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuJHJlcXVlc3QgPSB0aGlzLmNvbnN0cnVjdG9yLnJlcXVlc3QoJ2RlbGV0ZScsIGNvbmZpZy51cmkgfHwgdGhpcy51cmkoKSwgY29uZmlnKTtcbiAgICAgICAgICAgIHRoaXMuJHJlcXVlc3Quc2VuZCgpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FuY2VsIHRoZSBjdXJyZW50IEhUVFAgcmVxdWVzdCBpZiBvbmUgZXhpc3RzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7c2VsZn1cbiAgICAgKi9cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIGlmKHRoaXMuJHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHRoaXMuJHJlcXVlc3QuY2FuY2VsKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IHRoZSBNb2RlbCBpbnN0YW5jZSB0byBhIEZvcm1EYXRhIGluc3RhbmNlXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIE9iamVjdFxuICAgICAqL1xuICAgIHRvRm9ybURhdGEoKSB7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcblxuICAgICAgICBlYWNoKHRoaXMudG9KU09OKCksICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBpZihpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGVhY2godmFsdWUsIGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZighKGl0ZW0gaW5zdGFuY2VvZiBGaWxlKSAmJiAoaXNPYmplY3QoaXRlbSkgfHwgaXNBcnJheShpdGVtKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBKU09OLnN0cmluZ2lmeShpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uYXBwZW5kKGtleS5yZXBsYWNlKC8oLispKFxcWy4rXFxdPykkLywgJyQxJykrJ1tdJywgaXRlbSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCEodmFsdWUgaW5zdGFuY2VvZiBGaWxlKSAmJiBpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBmb3JtLmFwcGVuZChrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCFpc051bGwodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgZm9ybS5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmb3JtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgdGhlIGluc3RhbmNlIHRvIEpTT04gcGF5bG9hZFxuICAgICAqXG4gICAgICogQHJldHVybiBPYmplY3RcbiAgICAgKi9cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiBwaWNrQnkodGhpcy4kYXR0cmlidXRlcywgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy4kcHJvcGVydGllcy5sZW5ndGggfHwgKFxuICAgICAgICAgICAgICAgIGtleSA9PT0gdGhpcy5rZXkoKSB8fCB0aGlzLiRwcm9wZXJ0aWVzLmluZGV4T2Yoa2V5KSAhPT0gLTFcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgdGhlIG1vZGVsIHRvIGEgc3RyaW5nXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIFN0cmluZ1xuICAgICAqL1xuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy50b0pTT04oKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHRvSlNPTlxuICAgICAqXG4gICAgICogQHJldHVybiBPYmplY3RcbiAgICAgKi9cbiAgICB0b0pzb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvSlNPTigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlYXJjaCBmb3IgYSBjb2xsZWN0aW9uIG9mIG1vZGVsc1xuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGEgb2JqZWN0XG4gICAgICogQHJldHVybiBib29sXG4gICAgICovXG4gICAgc3RhdGljIHNlYXJjaChwYXJhbXMgPSB7fSwgY29uZmlnID0ge30pIHtcbiAgICAgICAgY29uc3QgbW9kZWwgPSBuZXcgdGhpcztcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgbW9kZWwuJHJlcXVlc3QgPSB0aGlzLnJlcXVlc3QoJ2dldCcsIChjb25maWcudXJpIHx8IG1vZGVsLnVyaSgpKSwgY29uZmlnKTtcbiAgICAgICAgICAgIG1vZGVsLiRyZXF1ZXN0LnNlbmQoKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sIGVycm9ycyA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9ycyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZCBhbiBleGlzdGluZyBtb2RlbCBieSBpZFxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGEgb2JqZWN0XG4gICAgICogQHJldHVybiBib29sXG4gICAgICovXG4gICAgc3RhdGljIGZpbmQoaWQsIGNvbmZpZyA9IHt9KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtb2RlbCA9IG5ldyB0aGlzO1xuICAgICAgICAgICAgbW9kZWwuJHJlcXVlc3QgPSB0aGlzLnJlcXVlc3QoJ2dldCcsIChjb25maWcudXJpIHx8IG1vZGVsLnVyaShpZCkpLCBjb25maWcpO1xuICAgICAgICAgICAgbW9kZWwuJHJlcXVlc3Quc2VuZCgpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUobW9kZWwuaW5pdGlhbGl6ZShyZXNwb25zZSkpO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgcmVxdWVzdCBmcm9tIHRoZSBtb2RlbCBkYXRhXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YSBvYmplY3RcbiAgICAgKiBAcmV0dXJuIGJvb2xcbiAgICAgKi9cbiAgICBzdGF0aWMgcmVxdWVzdChtZXRob2QsIHVybCwgY29uZmlnID0ge30pIHtcbiAgICAgICAgcmV0dXJuIFJlcXVlc3QubWFrZShtZXRob2QsIHVybCwgY29uZmlnKTtcbiAgICB9XG5cbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8Zm9ybSBAc3VibWl0LnByZXZlbnQ9XCJvblN1Ym1pdFwiIDpjbGFzcz1cInsnZm9ybS1pbmxpbmUnOiBpbmxpbmV9XCIgOm5vdmFsaWRhdGU9XCJub3ZhbGlkYXRlXCI+XG4gICAgICAgIDxzbG90Pjwvc2xvdD5cbiAgICA8L2Zvcm0+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IE1vZGVsIGZyb20gJy4uLy4uL0h0dHAvTW9kZWwvTW9kZWwnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIE1vZGVsIG1ldGhvZCB1c2VkIHRvIHNlbmQgdGhlIHJlcXVlc3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBCb29sZWFuXG4gICAgICAgICAqL1xuICAgICAgICBtZXRob2Q6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICdzYXZlJyxcbiAgICAgICAgICAgIHZhbGlkYXRlKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwgJiYgaXNGdW5jdGlvbih0aGlzLm1vZGVsW3ZhbHVlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFuIG9iamVjdCBvZiBmb3JtIGRhdGFcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IE9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgICAgICAgZGVmYXVsdDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQSBKU09OIG9iamVjdCBvZiByZXF1ZXN0IGhlYWRlcnNcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IE9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgaGVhZGVyczogT2JqZWN0LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNwbGF5IHRoZSBmb3JtIGZpZWxkcyBpbmxpbmVcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IE9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgICAgICAgIHZhbGlkYXRlKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgTW9kZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc3BsYXkgdGhlIGZvcm0gZmllbGRzIGlubGluZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgQm9vbGVhblxuICAgICAgICAgKi9cbiAgICAgICAgaW5saW5lOiBCb29sZWFuLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGNhbGxiYWNrIGZ1bmN0aW9uIGZvciB0aGUgYHN1Ym1pdGAgZXZlbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IEJvb2xlYW5cbiAgICAgICAgICovXG4gICAgICAgIG5vdmFsaWRhdGU6IHtcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgSlNPTiBvYmplY3Qgb2Yga2V5L3ZhbHVlIHBhaXJzIHRvIGJ1aWxkIHRoZSBxdWVyeSBzdHJpbmcuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBPYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIHF1ZXJ5OiBPYmplY3QsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgVVJJIG9yIFVSTCB1c2VkIHRvIHJlZGlyZWN0IHVzZXIgYWZ0ZXIgZm9ybSBzdWJtaXRzIHN1Y2Nlc3NmdWxseS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IEZ1bmN0aW9ufFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgcmVkaXJlY3Q6IFtPYmplY3QsIFN0cmluZywgRnVuY3Rpb25dLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGNhbGxiYWNrIGZ1bmN0aW9uIGZvciB0aGUgYHN1Ym1pdGAgZXZlbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IEZ1bmN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBvblN1Ym1pdDoge1xuICAgICAgICAgICAgdHlwZTogRnVuY3Rpb24sXG4gICAgICAgICAgICBkZWZhdWx0KGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbCAmJiB0aGlzLnN1Ym1pdChldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgY2FsbGJhY2sgZnVuY3Rpb24gZm9yIHRoZSBgc3VibWl0OnN1Y2Nlc3NgIGV2ZW50XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBGdW5jdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgb25TdWJtaXRTdWNjZXNzOiB7XG4gICAgICAgICAgICB0eXBlOiBGdW5jdGlvbixcbiAgICAgICAgICAgIGRlZmF1bHQoZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdzdWJtaXQ6c3VjY2VzcycsIGV2ZW50LCBkYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdzdWJtaXQ6Y29tcGxldGUnLCBldmVudCwgdHJ1ZSwgZGF0YSk7XG5cbiAgICAgICAgICAgICAgICBpZih0aGlzLnJlZGlyZWN0ICYmIGlzRnVuY3Rpb24odGhpcy5yZWRpcmVjdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWRpcmVjdCh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLnJlZGlyZWN0ICYmIHRoaXMuJHJvdXRlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCh0aGlzLnJlZGlyZWN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgY2FsbGJhY2sgZnVuY3Rpb24gZm9yIHRoZSBgc3VibWl0OnN1Y2Nlc3NgIGV2ZW50XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBGdW5jdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgb25TdWJtaXRGYWlsZWQ6IHtcbiAgICAgICAgICAgIHR5cGU6IEZ1bmN0aW9uLFxuICAgICAgICAgICAgZGVmYXVsdChldmVudCwgZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnc3VibWl0OmZhaWxlZCcsIGV2ZW50LCBlcnJvcnMpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3N1Ym1pdDpjb21wbGV0ZScsIGV2ZW50LCBmYWxzZSwgZXJyb3JzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcblxuICAgICAgICBzdWJtaXQoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3N1Ym1pdCcsIGV2ZW50KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxbdGhpcy5tZXRob2RdKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiB0aGlzLnF1ZXJ5LFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICBvblVwbG9hZFByb2dyZXNzOiBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3N1Ym1pdDpwcm9ncmVzcycsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblN1Ym1pdFN1Y2Nlc3MoZXZlbnQsIGRhdGEpO1xuICAgICAgICAgICAgfSwgKGVycm9ycykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25TdWJtaXRGYWlsZWQoZXZlbnQsIGVycm9ycyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlcnJvcnM6IHt9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgQmFzZUZvcm0gZnJvbSAnLi9CYXNlRm9ybSc7XG5pbXBvcnQgVnVlSW5zdGFsbGVyIGZyb20gJy4uLy4uL0hlbHBlcnMvVnVlSW5zdGFsbGVyL1Z1ZUluc3RhbGxlcic7XG5cbmNvbnN0IHBsdWdpbiA9IFZ1ZUluc3RhbGxlci51c2Uoe1xuXG4gICAgaW5zdGFsbChWdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgVnVlSW5zdGFsbGVyLmNvbXBvbmVudHMoe1xuICAgICAgICAgICAgQmFzZUZvcm1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQmFzZUZvcm07XG4iLCI8dGVtcGxhdGU+XG4gICAgPGxpIGNsYXNzPVwiYnJlYWRjcnVtYi1pdGVtXCIgOmNsYXNzPVwieydhY3RpdmUnOiBhY3RpdmV9XCIgOmFyaWEtY3VycmVudD1cImFjdGl2ZSA/ICdwYWdlJyA6IGZhbHNlXCI+XG4gICAgICAgIDxhIHYtaWY9XCIhYWN0aXZlICYmIGhyZWZcIiA6aHJlZj1cImhyZWZcIj5cbiAgICAgICAgICAgIDxzbG90Pnt7bGFiZWx9fTwvc2xvdD5cbiAgICAgICAgPC9hPlxuICAgICAgICA8cm91dGVyLWxpbmsgdi1lbHNlLWlmPVwiIWFjdGl2ZSAmJiB0b1wiIDp0bz1cInRvXCI+XG4gICAgICAgICAgICA8c2xvdD57e2xhYmVsfX08L3Nsb3Q+XG4gICAgICAgIDwvcm91dGVyLWxpbms+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICAgICAgICA8c2xvdD57e2xhYmVsfX08L3Nsb3Q+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9saT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnYnJlYWRjcnVtYi1pdGVtJyxcblxuICAgIHByb3BzOiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElzIHRoZSBpdGVtIGFjdGl2ZT9cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3Age0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBhY3RpdmU6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFuIGhyZWYgYXR0cmlidXRlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBocmVmOiBTdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFuIGJyZWFkY3J1bWIgbGFiZWxcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3Age1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIGxhYmVsOiBTdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB0byBhdHRyaWJ1dGUgd2hpY2ggaXMgcGFzc2VkIHRvIHRoZSA8cm91dGVyLWxpbms+IGNvbXBvbmVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3Age09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIHRvOiBbU3RyaW5nLCBPYmplY3RdXG5cbiAgICB9XG5cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICAgIDxuYXYgYXJpYS1sYWJlbD1cImJyZWFkY3J1bWJcIj5cbiAgICAgICAgPG9sIGNsYXNzPVwiYnJlYWRjcnVtYlwiPlxuICAgICAgICAgICAgPGJyZWFkY3J1bWItaXRlbVxuICAgICAgICAgICAgICAgIHYtaWY9XCJpdGVtcy5sZW5ndGhcIlxuICAgICAgICAgICAgICAgIHYtZm9yPVwiKGl0ZW0sIGkpIGluIGl0ZW1zXCJcbiAgICAgICAgICAgICAgICB2LWJpbmQ9XCJpdGVtXCJcbiAgICAgICAgICAgICAgICA6a2V5PVwiaVwiXG4gICAgICAgICAgICAgICAgOmN1cnJlbnQ9XCJpID09PSBpdGVtLmxlbmd0aCAtIDFcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxzbG90Lz5cbiAgICAgICAgPC9vbD5cbiAgICA8L25hdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgQnJlYWRjcnVtYkl0ZW0gZnJvbSAnLi9CcmVhZGNydW1iSXRlbSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdicmVhZGNydW1iJyxcblxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgQnJlYWRjcnVtYkl0ZW1cbiAgICB9LFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQW4gYXJyYXkgb2YgYnJlYWRjcnVtYnNcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3Age0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgaXRlbXM6IEFycmF5XG5cbiAgICB9XG5cbn1cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IEJyZWFkY3J1bWIgZnJvbSAnLi9CcmVhZGNydW1iJztcbmltcG9ydCBCcmVhZGNydW1iSXRlbSBmcm9tICcuL0JyZWFkY3J1bWJJdGVtJztcbmltcG9ydCBWdWVJbnN0YWxsZXIgZnJvbSAnLi4vLi4vSGVscGVycy9WdWVJbnN0YWxsZXIvVnVlSW5zdGFsbGVyJztcblxuY29uc3QgcGx1Z2luID0gVnVlSW5zdGFsbGVyLnVzZSh7XG5cbiAgICBpbnN0YWxsKFZ1ZSwgb3B0aW9ucykge1xuICAgICAgICBWdWVJbnN0YWxsZXIuY29tcG9uZW50cyh7XG4gICAgICAgICAgICBCcmVhZGNydW1iLFxuICAgICAgICAgICAgQnJlYWRjcnVtYkl0ZW1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQnJlYWRjcnVtYjtcbiIsImV4cG9ydCBkZWZhdWx0IHtcblxuICAgIHByb3BzOiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNob3VsZCBzaG93IG9ubHkgZm9yIHNjcmVlbnJlYWRlcnNcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IEJvb2xlYW5cbiAgICAgICAgICovXG4gICAgICAgIHNyT25seTogQm9vbGVhbixcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2hvdWxkIGJlIGZvY3VzYWJsZSBmb3Igc2NyZWVucmVhZGVyc1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgQm9vbGVhblxuICAgICAgICAgKi9cbiAgICAgICAgc3JPbmx5Rm9jdXNhYmxlOiBCb29sZWFuXG5cbiAgICB9LFxuXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgc2NyZWVucmVhZGVyQ2xhc3NlcygpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgJ3NyLW9ubHknOiB0aGlzLnNyT25seSxcbiAgICAgICAgICAgICAgICAnc3Itb25seS1mb2N1c2FibGUnOiB0aGlzLnNyT25seUZvY3VzYWJsZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsIjx0ZW1wbGF0ZT5cblxuICAgIDxzbWFsbCBjbGFzcz1cImZvcm0tdGV4dFwiIDpjbGFzcz1cImNsYXNzZXNcIj48c2xvdCAvPjwvc21hbGw+XG5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5cbmltcG9ydCB7IGV4dGVuZCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCBDb2xvcmFibGUgZnJvbSAnLi4vLi4vTWl4aW5zL0NvbG9yYWJsZS9Db2xvcmFibGUnO1xuaW1wb3J0IFNjcmVlbnJlYWRlcnMgZnJvbSAnLi4vLi4vTWl4aW5zL1NjcmVlbnJlYWRlcnMvU2NyZWVucmVhZGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdoZWxwLXRleHQnLFxuXG4gICAgbWl4aW5zOiBbXG4gICAgICAgIENvbG9yYWJsZSxcbiAgICAgICAgU2NyZWVucmVhZGVyc1xuICAgIF0sXG5cbiAgICBjb21wdXRlZDoge1xuICAgICAgICBjbGFzc2VzKCkge1xuICAgICAgICAgICAgcmV0dXJuIGV4dGVuZCh7fSwgdGhpcy5zY3JlZW5yZWFkZXJDbGFzc2VzLCB0aGlzLmNvbG9yYWJsZUNsYXNzZXMpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IEhlbHBUZXh0IGZyb20gJy4vSGVscFRleHQnO1xuaW1wb3J0IFZ1ZUluc3RhbGxlciBmcm9tICcuLi8uLi9IZWxwZXJzL1Z1ZUluc3RhbGxlci9WdWVJbnN0YWxsZXInO1xuXG5jb25zdCBwbHVnaW4gPSBWdWVJbnN0YWxsZXIudXNlKHtcblxuICAgIGluc3RhbGwoVnVlLCBvcHRpb25zKSB7XG4gICAgICAgIFZ1ZUluc3RhbGxlci5jb21wb25lbnRzKHtcbiAgICAgICAgICAgIEhlbHBUZXh0XG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEhlbHBUZXh0O1xuIiwiPHRlbXBsYXRlPlxuXG4gICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj48c2xvdC8+PC9kaXY+XG5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ2Zvcm0tZ3JvdXAnXG4gICAgXG59XG5cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IEZvcm1Hcm91cCBmcm9tICcuL0Zvcm1Hcm91cCc7XG5pbXBvcnQgVnVlSW5zdGFsbGVyIGZyb20gJy4uLy4uL0hlbHBlcnMvVnVlSW5zdGFsbGVyL1Z1ZUluc3RhbGxlcic7XG5cbmNvbnN0IHBsdWdpbiA9IFZ1ZUluc3RhbGxlci51c2Uoe1xuXG4gICAgaW5zdGFsbChWdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgVnVlSW5zdGFsbGVyLmNvbXBvbmVudHMoe1xuICAgICAgICAgICAgRm9ybUdyb3VwXG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEZvcm1Hcm91cDtcbiIsIjx0ZW1wbGF0ZT5cblxuICAgIDxsYWJlbCA6Y2xhc3M9XCJjbGFzc2VzXCI+PHNsb3QvPjwvbGFiZWw+XG5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5cbmltcG9ydCB7IGV4dGVuZCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCBDb2xvcmFibGUgZnJvbSAnLi4vLi4vTWl4aW5zL0NvbG9yYWJsZS9Db2xvcmFibGUnO1xuaW1wb3J0IFNjcmVlbnJlYWRlcnMgZnJvbSAnLi4vLi4vTWl4aW5zL1NjcmVlbnJlYWRlcnMvU2NyZWVucmVhZGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdmb3JtLWxhYmVsJyxcblxuICAgIG1peGluczogW1xuICAgICAgICBDb2xvcmFibGUsXG4gICAgICAgIFNjcmVlbnJlYWRlcnNcbiAgICBdLFxuXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgY2xhc3NlcygpIHtcbiAgICAgICAgICAgIHJldHVybiBleHRlbmQoe30sIHRoaXMuc2NyZWVucmVhZGVyQ2xhc3NlcywgdGhpcy5jb2xvcmFibGVDbGFzc2VzKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG48L3NjcmlwdD5cbiIsImltcG9ydCBGb3JtTGFiZWwgZnJvbSAnLi9Gb3JtTGFiZWwnO1xuaW1wb3J0IFZ1ZUluc3RhbGxlciBmcm9tICcuLi8uLi9IZWxwZXJzL1Z1ZUluc3RhbGxlci9WdWVJbnN0YWxsZXInO1xuXG5jb25zdCBwbHVnaW4gPSBWdWVJbnN0YWxsZXIudXNlKHtcblxuICAgIGluc3RhbGwoVnVlLCBvcHRpb25zKSB7XG4gICAgICAgIFZ1ZUluc3RhbGxlci5jb21wb25lbnRzKHtcbiAgICAgICAgICAgIEZvcm1MYWJlbFxuICAgICAgICB9KTtcbiAgICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBGb3JtTGFiZWw7XG4iLCI8dGVtcGxhdGU+XG5cbiAgICA8ZGl2IDpjbGFzcz1cInsnaW52YWxpZC1mZWVkYmFjayc6IGludmFsaWQsICd2YWxpZC1mZWVkYmFjayc6IHZhbGlkICYmICFpbnZhbGlkfVwiPlxuICAgICAgICA8c2xvdD57e2xhYmVsfX08L3Nsb3Q+XG4gICAgPC9kaXY+XG5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5cbmltcG9ydCBDb2xvcmFibGUgZnJvbSAnLi4vLi4vTWl4aW5zL0NvbG9yYWJsZS9Db2xvcmFibGUnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnZm9ybS1mZWVkYmFjaycsXG5cbiAgICBtaXhpbnM6IFtcbiAgICAgICAgQ29sb3JhYmxlXG4gICAgXSxcblxuICAgIHByb3BzOiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB2YWx1ZSBvZiBsYWJlbCBlbGVtZW50LiBJZiBubyB2YWx1ZSwgbm8gbGFiZWwgd2lsbCBhcHBlYXIuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIGxhYmVsOiBTdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNob3VsZCB0aGUgZmVlZGJhY2sgbWFya2VkIGFzIGludmFsaWRcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgaW52YWxpZDogQm9vbGVhbixcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2hvdWxkIHRoZSBmZWVkYmFjayBtYXJrZWQgYXMgaW52YWxpZFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICB2YWxpZDogQm9vbGVhblxuXG4gICAgfVxuXG59XG5cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IEZvcm1GZWVkYmFjayBmcm9tICcuL0Zvcm1GZWVkYmFjayc7XG5pbXBvcnQgVnVlSW5zdGFsbGVyIGZyb20gJy4uLy4uL0hlbHBlcnMvVnVlSW5zdGFsbGVyL1Z1ZUluc3RhbGxlcic7XG5cbmNvbnN0IHBsdWdpbiA9IFZ1ZUluc3RhbGxlci51c2Uoe1xuXG4gICAgaW5zdGFsbChWdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgVnVlSW5zdGFsbGVyLmNvbXBvbmVudHMoe1xuICAgICAgICAgICAgRm9ybUZlZWRiYWNrXG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEZvcm1GZWVkYmFjaztcbiIsImltcG9ydCBwcmVmaXggZnJvbSAnLi4vLi4vSGVscGVycy9QcmVmaXgnO1xuaW1wb3J0IHsgZWFjaCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuLi8uLi9IZWxwZXJzL0Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCB7IGNhbWVsQ2FzZSB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCB7IGlzVW5kZWZpbmVkIH0gZnJvbSAnLi4vLi4vSGVscGVycy9GdW5jdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgYXV0b2NvbXBsZXRlIGF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgYXV0b2NvbXBsZXRlOiBTdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBmaWVsZCBpZCBhdHRyaWJ1dGUgdmFsdWUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIGlkOiBbTnVtYmVyLCBTdHJpbmddLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgdmFsdWUgb2YgbGFiZWwgZWxlbWVudC4gSWYgbm8gdmFsdWUsIG5vIGxhYmVsIHdpbGwgYXBwZWFyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBsYWJlbDogW051bWJlciwgU3RyaW5nXSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGZpZWxkIG5hbWUgYXR0cmlidXRlIHZhbHVlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBuYW1lOiBTdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBmaWVsZCBpZCBhdHRyaWJ1dGUgdmFsdWUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBwbGFjZWhvbGRlciBhdHRyaWJ1dGUgdmFsdWUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIHBsYWNlaG9sZGVyOiBTdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElzIHRoZSBmaWVsZCByZXF1aXJlZC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgcmVxdWlyZWQ6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBmb3JtLWdyb3VwIHdyYXBwZXIgdG8gaW5wdXRcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgZ3JvdXA6IHtcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgICAgICB2YWx1ZTogdHJ1ZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgcmVnZXggcGF0dGVybiBmb3IgdmFsaWRhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgcGF0dGVybjogU3RyaW5nLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBbiBpbmxpbmUgZmllbGQgdmFsaWRhdGlvbiBlcnJvci5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ3xCb29sZWFuXG4gICAgICAgICAqL1xuICAgICAgICBlcnJvcjogU3RyaW5nLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBbiBpbmxpbmUgZmllbGQgdmFsaWRhdGlvbiBlcnJvcnMgcGFzc2VkIGFzIG9iamVjdCB3aXRoIGtleS92YWx1ZVxuICAgICAgICAgKiBwYWlycy4gSWYgZXJyb3JzIHBhc3NlZCBhcyBhbiBvYmplY3QsIHRoZSBmb3JtIG5hbWUgd2lsbCBiZSB1c2VkIGZvclxuICAgICAgICAgKiB0aGUga2V5LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgT2JqZWN0fEJvb2xlYW5cbiAgICAgICAgICovXG4gICAgICAgIGVycm9yczoge1xuICAgICAgICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgICAgICAgZGVmYXVsdCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU29tZSBmZWVkYmFjayB0byBhZGQgdG8gdGhlIGZpZWxkIG9uY2UgdGhlIGZpZWxkIGlzIHN1Y2Nlc3NmdWxseVxuICAgICAgICAgKiB2YWxpZC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgZmVlZGJhY2s6IFtTdHJpbmcsIEFycmF5XSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQW4gYXJyYXkgb2YgZXZlbnQgbmFtZXMgdGhhdCBjb3JyZWxhdGUgd2l0aCBjYWxsYmFjayBmdW5jdGlvbnNcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IEZ1bmN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBiaW5kRXZlbnRzOiB7XG4gICAgICAgICAgICB0eXBlOiBBcnJheSxcbiAgICAgICAgICAgIGRlZmF1bHQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnZm9jdXMnLCAnYmx1cicsICdjaGFuZ2UnLCAnY2xpY2snLCAna2V5dXAnLCAna2V5ZG93bicsICdwcm9ncmVzcycsICdwYXN0ZSddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZGVmYXVsdCBjbGFzcyBuYW1lIGFzc2lnbmVkIHRvIHRoZSBjb250cm9sIGVsZW1lbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgZGVmYXVsdENvbnRyb2xDbGFzczoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgZGVmYXVsdDogJ2Zvcm0tY29udHJvbCdcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogSGlkZSB0aGUgbGFiZWwgZm9yIGJyb3dzZXJzLCBidXQgbGVhdmUgaXQgZm9yIHNjcmVlbiByZWFkZXJzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBoaWRlTGFiZWw6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZGl0aW9uYWwgbWFyZ2luL3BhZGRpbmcgY2xhc3NlcyBmb3IgZmluZSBjb250cm9sIG9mIHNwYWNpbmdcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgc3BhY2luZzogU3RyaW5nLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgc2l6ZSBvZiB0aGUgZm9ybSBjb250cm9sXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIHNpemU6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICdtZCcsXG4gICAgICAgICAgICB2YWxpZGF0ZTogdmFsdWUgPT4gWydzbScsICdtZCcsICdsZyddLmluZGV4T2YodmFsdWUpICE9PSAtMVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNwbGF5IHRoZSBmb3JtIGZpZWxkIGlubGluZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBpbmxpbmU6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHRoZSBmb3JtIGNvbnRyb2wgaXMgcmVhZG9ubHksIGRpc3BsYXkgb25seSBhcyB0ZXh0P1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBwbGFpbnRleHQ6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElzIHRoZSBmb3JtIGNvbnRyb2wgcmVhZG9ubHk/XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIHJlYWRvbmx5OiBCb29sZWFuLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJcyB0aGUgZm9ybSBjb250cm9sIGRpc2FibGVkP1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBkaXNhYmxlZDogQm9vbGVhbixcblxuICAgICAgICAvKipcbiAgICAgICAgICogU29tZSBpbnN0cnVjdGlvbnMgdG8gYXBwZWFyIHVuZGVyIHRoZSBmaWVsZCBsYWJlbFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBoZWxwVGV4dDogW051bWJlciwgU3RyaW5nXSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG1heGxlbmd0aCBhdHRyaWJ1dGVcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgbWF4bGVuZ3RoOiBbTnVtYmVyLCBTdHJpbmddXG5cbiAgICB9LFxuXG4gICAgZGlyZWN0aXZlczoge1xuICAgICAgICBiaW5kRXZlbnRzOiB7XG4gICAgICAgICAgICBiaW5kKGVsLCBiaW5kaW5nLCB2bm9kZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50cyA9IGJpbmRpbmcudmFsdWUgfHwgdm5vZGUuY29udGV4dC5iaW5kRXZlbnRzO1xuXG4gICAgICAgICAgICAgICAgZWFjaChldmVudHMsIG5hbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZub2RlLmNvbnRleHQuJGVtaXQobmFtZSwgZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgYmx1cigpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0SW5wdXRGaWVsZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRJbnB1dEZpZWxkKCkuYmx1cigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGZvY3VzKCkge1xuICAgICAgICAgICAgaWYodGhpcy5nZXRJbnB1dEZpZWxkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldElucHV0RmllbGQoKS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGdldElucHV0RmllbGQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmZvcm0tY29udHJvbCwgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRGaWVsZEVycm9ycygpIHtcbiAgICAgICAgICAgIGxldCBlcnJvcnMgPSB0aGlzLmVycm9yIHx8IHRoaXMuZXJyb3JzO1xuXG4gICAgICAgICAgICBpZihpc09iamVjdCh0aGlzLmVycm9ycykpIHtcbiAgICAgICAgICAgICAgICBlcnJvcnMgPSB0aGlzLmVycm9yc1t0aGlzLm5hbWUgfHwgdGhpcy5pZF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAhZXJyb3JzIHx8IGlzQXJyYXkoZXJyb3JzKSB8fCBpc09iamVjdChlcnJvcnMpID8gZXJyb3JzIDogW2Vycm9yc107XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBjb21wdXRlZDoge1xuXG4gICAgICAgIGNhbGxiYWNrcygpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJpbmRFdmVudHMubWFwKGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IHRoaXNbY2FtZWxDYXNlKFsnb24nLCBldmVudF0uam9pbignICcpKV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5maWx0ZXIoZXZlbnQgPT4gIWlzVW5kZWZpbmVkKGV2ZW50LmNhbGxiYWNrKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW52YWxpZEZlZWRiYWNrKCkge1xuICAgICAgICAgICAgaWYodGhpcy5lcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVycm9yO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBlcnJvcnMgPSB0aGlzLmdldEZpZWxkRXJyb3JzKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBpc0FycmF5KGVycm9ycykgPyBlcnJvcnMuam9pbignPGJyPicpIDogZXJyb3JzO1xuICAgICAgICB9LFxuXG4gICAgICAgIHZhbGlkRmVlZGJhY2soKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNBcnJheSh0aGlzLmZlZWRiYWNrKSA/IHRoaXMuZmVlZGJhY2suam9pbignPGJyPicpIDogdGhpcy5mZWVkYmFjaztcbiAgICAgICAgfSxcblxuICAgICAgICBjb250cm9sQ2xhc3MoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWZhdWx0Q29udHJvbENsYXNzICsgKHRoaXMucGxhaW50ZXh0ID8gJy1wbGFpbnRleHQnIDogJycpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNvbnRyb2xTaXplQ2xhc3MoKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJlZml4KHRoaXMuc2l6ZSwgdGhpcy5jb250cm9sQ2xhc3MpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNvbnRyb2xDbGFzc2VzKCkge1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xDbGFzcyxcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xTaXplQ2xhc3MsXG4gICAgICAgICAgICAgICAgKHRoaXMuc3BhY2luZyB8fCAnJyksXG4gICAgICAgICAgICAgICAgKHRoaXMuaW52YWxpZEZlZWRiYWNrID8gJ2lzLWludmFsaWQnIDogJycpXG4gICAgICAgICAgICBdLmpvaW4oJyAnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBoYXNEZWZhdWx0U2xvdCAoKSB7XG4gICAgICAgICAgICByZXR1cm4gISF0aGlzLiRzbG90cy5kZWZhdWx0XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIiwiPHRlbXBsYXRlPlxuXG4gICAgPGZvcm0tZ3JvdXAgY2xhc3M9XCJpbnB1dC1maWVsZFwiIDpjbGFzcz1cInsnaGFzLWFjdGl2aXR5JzogYWN0aXZpdHl9XCI+XG5cbiAgICAgICAgPHNsb3QgbmFtZT1cImxhYmVsXCI+XG4gICAgICAgICAgICA8Zm9ybS1sYWJlbCByZWY9XCJsYWJlbFwiIHYtaWY9XCJsYWJlbCB8fCBoYXNEZWZhdWx0U2xvdFwiIDpmb3I9XCJpZFwiIHYtaHRtbD1cImxhYmVsXCIvPlxuICAgICAgICA8L3Nsb3Q+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBvc2l0aW9uLXJlbGF0aXZlXCI+XG4gICAgICAgICAgICA8c2xvdCBuYW1lPVwiY29udHJvbFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICByZWY9XCJjb250cm9sXCJcbiAgICAgICAgICAgICAgICAgICAgOmlkPVwiaWRcIlxuICAgICAgICAgICAgICAgICAgICA6dHlwZT1cInR5cGVcIlxuICAgICAgICAgICAgICAgICAgICA6bmFtZT1cIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICA6dmFsdWU9XCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgIDpwYXR0ZXJuPVwicGF0dGVyblwiXG4gICAgICAgICAgICAgICAgICAgIDpyZWFkb25seT1cInJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgOnJlcXVpcmVkPVwicmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgICAgICA6bWF4bGVuZ3RoPVwibWF4bGVuZ3RoXCJcbiAgICAgICAgICAgICAgICAgICAgOnBsYWNlaG9sZGVyPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCJkaXNhYmxlZCB8fCByZWFkb25seVwiXG4gICAgICAgICAgICAgICAgICAgIDpjbGFzcz1cIm1lcmdlQ2xhc3Nlcyhjb250cm9sQ2xhc3NlcywgY29sb3JhYmxlQ2xhc3NlcylcIlxuICAgICAgICAgICAgICAgICAgICA6YXJpYS1sYWJlbD1cImxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgOmFyaWEtZGVzY3JpYmVkYnk9XCJpZFwiXG4gICAgICAgICAgICAgICAgICAgIDphdXRvY29tcGxldGU9XCJhdXRvY29tcGxldGVcIlxuICAgICAgICAgICAgICAgICAgICB2LWJpbmQtZXZlbnRzPVwiYmluZEV2ZW50c1wiXG4gICAgICAgICAgICAgICAgICAgIEBpbnB1dD1cIiRlbWl0KCdpbnB1dCcsICRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9zbG90PlxuXG4gICAgICAgICAgICA8c2xvdCBuYW1lPVwiYWN0aXZpdHlcIj5cbiAgICAgICAgICAgICAgICA8dHJhbnNpdGlvbiBuYW1lPVwic2xpZGUtZmFkZVwiPlxuICAgICAgICAgICAgICAgICAgICA8YWN0aXZpdHktaW5kaWNhdG9yIGtleT1cInRlc3RcIiB2LWlmPVwiYWN0aXZpdHlcIiByZWY9XCJhY3Rpdml0eVwiIHR5cGU9XCJkb3RzXCIgOnNpemU9XCJzaXplXCIvPlxuICAgICAgICAgICAgICAgIDwvdHJhbnNpdGlvbj5cbiAgICAgICAgICAgIDwvc2xvdD5cblxuICAgICAgICAgICAgPHNsb3QgbmFtZT1cImZlZWRiYWNrXCI+XG4gICAgICAgICAgICAgICAgPGZvcm0tZmVlZGJhY2sgdi1pZj1cInZhbGlkRmVlZGJhY2tcIiByZWY9XCJmZWVkYmFja1wiIHYtaHRtbD1cInZhbGlkRmVlZGJhY2tcIiB2YWxpZCAvPlxuICAgICAgICAgICAgICAgIDxmb3JtLWZlZWRiYWNrIHYtZWxzZS1pZj1cImludmFsaWRGZWVkYmFja1wiIHJlZj1cImZlZWRiYWNrXCIgdi1odG1sPVwiaW52YWxpZEZlZWRiYWNrXCIgaW52YWxpZCAvPlxuICAgICAgICAgICAgPC9zbG90PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8c2xvdCBuYW1lPVwiaGVscFwiPlxuICAgICAgICAgICAgPGhlbHAtdGV4dCB2LWlmPVwiaGVscFRleHRcIiByZWY9XCJoZWxwXCIgdi1odG1sPVwiaGVscFRleHRcIiAvPlxuICAgICAgICA8L3Nsb3Q+XG4gICAgICAgIFxuICAgIDwvZm9ybS1ncm91cD5cblxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cblxuaW1wb3J0IEhlbHBUZXh0IGZyb20gJy4uL0hlbHBUZXh0JztcbmltcG9ydCBGb3JtR3JvdXAgZnJvbSAnLi4vRm9ybUdyb3VwJztcbmltcG9ydCBGb3JtTGFiZWwgZnJvbSAnLi4vRm9ybUxhYmVsJztcbmltcG9ydCBGb3JtRmVlZGJhY2sgZnJvbSAnLi4vRm9ybUZlZWRiYWNrJztcbmltcG9ydCBDb2xvcmFibGUgZnJvbSAnLi4vLi4vTWl4aW5zL0NvbG9yYWJsZSc7XG5pbXBvcnQgRm9ybUNvbnRyb2wgZnJvbSAnLi4vLi4vTWl4aW5zL0Zvcm1Db250cm9sJztcbmltcG9ydCBNZXJnZUNsYXNzZXMgZnJvbSAnLi4vLi4vTWl4aW5zL01lcmdlQ2xhc3Nlcyc7XG5pbXBvcnQgQWN0aXZpdHlJbmRpY2F0b3IgZnJvbSAnLi4vQWN0aXZpdHlJbmRpY2F0b3InO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnaW5wdXQtZmllbGQnLFxuXG4gICAgbWl4aW5zOiBbXG4gICAgICAgIENvbG9yYWJsZSxcbiAgICAgICAgRm9ybUNvbnRyb2wsXG4gICAgICAgIE1lcmdlQ2xhc3Nlc1xuICAgIF0sXG5cbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIEhlbHBUZXh0LFxuICAgICAgICBGb3JtR3JvdXAsXG4gICAgICAgIEZvcm1MYWJlbCxcbiAgICAgICAgRm9ybUZlZWRiYWNrLFxuICAgICAgICBBY3Rpdml0eUluZGljYXRvclxuICAgIH0sXG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG93IHR5cGUgYWN0aXZpdHkgaW5kaWNhdG9yLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgQm9vbGVhblxuICAgICAgICAgKi9cbiAgICAgICAgYWN0aXZpdHk6IHtcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgdHlwZSBhdHRyaWJ1dGVcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgZGVmYXVsdDogJ3RleHQnXG4gICAgICAgIH1cblxuICAgIH1cblxufVxuXG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCI+XG4uaW5wdXQtZmllbGQge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgIC5hY3Rpdml0eS1pbmRpY2F0b3Ige1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICB0b3A6IDUwJTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTFyZW0sIC01MCUpO1xuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgLjI1cyBlYXNlLWluO1xuICAgIH1cblxuICAgIC5hY3Rpdml0eS1pbmRpY2F0b3Ige1xuICAgIH1cblxuICAgIC5zbGlkZS1mYWRlLWVudGVyIHtcbiAgICB9XG5cbiAgICAuc2xpZGUtZmFkZS1lbnRlci1hY3RpdmUge1xuICAgIH1cblxuICAgIC5zbGlkZS1mYWRlLWxlYXZlLWFjdGl2ZSB7XG5cbiAgICB9XG5cbiAgICAuc2xpZGUtZmFkZS1lbnRlcixcbiAgICAuc2xpZGUtZmFkZS1sZWF2ZS10byB7XG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDI1JSwgLTUwJSk7XG4gICAgfVxufVxuPC9zdHlsZT5cbiIsImltcG9ydCBJbnB1dEZpZWxkIGZyb20gJy4vSW5wdXRGaWVsZCc7XG5pbXBvcnQgVnVlSW5zdGFsbGVyIGZyb20gJy4uLy4uL0hlbHBlcnMvVnVlSW5zdGFsbGVyL1Z1ZUluc3RhbGxlcic7XG5cbmNvbnN0IHBsdWdpbiA9IFZ1ZUluc3RhbGxlci51c2Uoe1xuXG4gICAgaW5zdGFsbChWdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgVnVlSW5zdGFsbGVyLmNvbXBvbmVudHMoe1xuICAgICAgICAgICAgSW5wdXRGaWVsZFxuICAgICAgICB9KTtcbiAgICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBJbnB1dEZpZWxkO1xuIiwiPHRlbXBsYXRlPlxuXG4gICAgPGZvcm0tZ3JvdXA+XG5cbiAgICAgICAgPHNsb3QgbmFtZT1cImxhYmVsXCI+XG4gICAgICAgICAgICA8Zm9ybS1sYWJlbCB2LWlmPVwibGFiZWwgfHwgaGFzRGVmYXVsdFNsb3RcIiA6Zm9yPVwiaWRcIj5cbiAgICAgICAgICAgICAgICA8c2xvdD57e2xhYmVsfX08L3Nsb3Q+XG4gICAgICAgICAgICA8L2Zvcm0tbGFiZWw+XG4gICAgICAgIDwvc2xvdD5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiY3VzdG9tLWZpbGVcIj5cblxuICAgICAgICAgICAgPHNsb3QgbmFtZT1cInBsYWNlaG9sZGVyXCI+XG4gICAgICAgICAgICAgICAgPGZvcm0tbGFiZWwgOmNsYXNzPVwibWVyZ2VDbGFzc2VzKGNvbG9yYWJsZUNsYXNzZXMsICdjdXN0b20tZmlsZS1sYWJlbCcpXCIgOmZvcj1cImlkXCIgdi1odG1sPVwicGxhY2Vob2xkZXIgfHwgJ0Nob29zZSBmaWxlJ1wiIC8+XG4gICAgICAgICAgICA8L3Nsb3Q+XG5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHYtYmluZC1ldmVudHNcbiAgICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICAgICAgOmNsYXNzPVwiY29udHJvbENsYXNzZXNcIlxuICAgICAgICAgICAgICAgIDppZD1cImlkXCJcbiAgICAgICAgICAgICAgICA6d2lkdGg9XCJ3aWR0aFwiXG4gICAgICAgICAgICAgICAgOmhlaWdodD1cImhlaWdodFwiXG4gICAgICAgICAgICAgICAgOnJlcXVpcmVkPVwicmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgIDptdWx0aXBsZT1cIm11bHRpcGxlXCJcbiAgICAgICAgICAgICAgICA6cmVhZG9ubHk9XCJyZWFkb25seVwiXG4gICAgICAgICAgICAgICAgQGNoYW5nZT1cIiRlbWl0KCdjaGFuZ2UnLCAkZXZlbnQudGFyZ2V0LmZpbGVzKVwiPlxuXG4gICAgICAgICAgICA8c2xvdCBuYW1lPVwiaGVscFwiPlxuICAgICAgICAgICAgICAgIDxoZWxwLXRleHQgdi1pZj1cImhlbHBUZXh0XCIgdi1odG1sPVwiaGVscFRleHRcIiAvPlxuICAgICAgICAgICAgPC9zbG90PlxuXG4gICAgICAgICAgICA8c2xvdCBuYW1lPVwiZmVlZGJhY2tcIj5cbiAgICAgICAgICAgICAgICA8Zm9ybS1mZWVkYmFjayB2LWlmPVwidmFsaWRGZWVkYmFja1wiIHYtaHRtbD1cInZhbGlkRmVlZGJhY2tcIiB2YWxpZCAvPlxuICAgICAgICAgICAgICAgIDxmb3JtLWZlZWRiYWNrIHYtaWY9XCJpbnZhbGlkRmVlZGJhY2tcIiB2LWh0bWw9XCJpbnZhbGlkRmVlZGJhY2tcIiBpbnZhbGlkIC8+XG4gICAgICAgICAgICA8L3Nsb3Q+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICA8L2Zvcm0tZ3JvdXA+XG5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgSGVscFRleHQgZnJvbSAnLi4vSGVscFRleHQnO1xuaW1wb3J0IEZvcm1Hcm91cCBmcm9tICcuLi9Gb3JtR3JvdXAnO1xuaW1wb3J0IEZvcm1MYWJlbCBmcm9tICcuLi9Gb3JtTGFiZWwnO1xuaW1wb3J0IEZvcm1GZWVkYmFjayBmcm9tICcuLi9Gb3JtRmVlZGJhY2snO1xuaW1wb3J0IElucHV0RmllbGQgZnJvbSAnLi4vSW5wdXRGaWVsZCc7XG5pbXBvcnQgTWVyZ2VDbGFzc2VzIGZyb20gJy4uLy4uL01peGlucy9NZXJnZUNsYXNzZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnZmlsZS1maWVsZCcsXG5cbiAgICBleHRlbmRzOiBJbnB1dEZpZWxkLFxuXG4gICAgY29tcG9uZW50czoge1xuICAgICAgICBIZWxwVGV4dCxcbiAgICAgICAgRm9ybUdyb3VwLFxuICAgICAgICBGb3JtTGFiZWwsXG4gICAgICAgIEZvcm1GZWVkYmFjayxcbiAgICAgICAgTWVyZ2VDbGFzc2VzXG4gICAgfSxcblxuICAgIG1vZGVsOiB7XG4gICAgICAgIGV2ZW50OiAnY2hhbmdlJ1xuICAgIH0sXG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBbiBhcnJheSBvZiBldmVudCBuYW1lcyB0aGF0IGNvcnJlbGF0ZSB3aXRoIGNhbGxiYWNrIGZ1bmN0aW9uc1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgRnVuY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIGJpbmRFdmVudHM6IHtcbiAgICAgICAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgICAgICAgZGVmYXVsdCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWydmb2N1cycsICdibHVyJywgJ2lucHV0JywgJ2NsaWNrJywgJ2tleXVwJywgJ2tleWRvd24nLCAncHJvZ3Jlc3MnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGNsYXNzIG5hbWUgYXNzaWduZWQgdG8gdGhlIGNvbnRyb2wgZWxlbWVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBkZWZhdWx0Q29udHJvbENsYXNzOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0OiAnY3VzdG9tLWZpbGUtaW5wdXQnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFuIGFycmF5IG9mIHZhbGlkIGV4dGVuc2lvbnNcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgZXh0ZW5zaW9uczogQXJyYXksXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB0eXBlIGF0dHJpYnV0ZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBtdWx0aXBsZTogQm9vbGVhbixcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGhlaWdodCBhdHRyaWJ1dGUgZm9yIHRoZSBjb250cm9sIGVsZW1lbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgaGVpZ2h0OiBbTnVtYmVyLCBTdHJpbmddLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgd2lkdGggYXR0cmlidXRlIGZvciB0aGUgY29udHJvbCBlbGVtZW50XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIHdpZHRoOiBbTnVtYmVyLCBTdHJpbmddXG5cbiAgICB9XG5cbn1cblxuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgRmlsZUZpZWxkIGZyb20gJy4vRmlsZUZpZWxkJztcbmltcG9ydCBWdWVJbnN0YWxsZXIgZnJvbSAnLi4vLi4vSGVscGVycy9WdWVJbnN0YWxsZXIvVnVlSW5zdGFsbGVyJztcblxuY29uc3QgcGx1Z2luID0gVnVlSW5zdGFsbGVyLnVzZSh7XG5cbiAgICBpbnN0YWxsKFZ1ZSwgb3B0aW9ucykge1xuICAgICAgICBWdWVJbnN0YWxsZXIuY29tcG9uZW50cyh7XG4gICAgICAgICAgICBGaWxlRmllbGRcbiAgICAgICAgfSk7XG4gICAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgRmlsZUZpZWxkO1xuIiwiPHRlbXBsYXRlPlxuXG4gICAgPGJ0biBjbGFzcz1cImJ0bi1maWxlXCIgOnR5cGU9XCJ0eXBlXCIgOnZhcmlhbnQ9XCJ2YXJpYW50XCIgOmJsb2NrPVwiYmxvY2tcIiA6c2l6ZT1cInNpemVcIiA6ZGlzYWJsZWQ9XCJkaXNhYmxlZFwiIDphY3RpdmU9XCJhY3RpdmVcIj5cbiAgICAgICAgPHNsb3QvPlxuXG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdi1iaW5kLWV2ZW50c1xuICAgICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgICAgOmNsYXNzPVwiY29udHJvbENsYXNzZXNcIlxuICAgICAgICAgICAgOmlkPVwiaWRcIlxuICAgICAgICAgICAgOndpZHRoPVwid2lkdGhcIlxuICAgICAgICAgICAgOmhlaWdodD1cImhlaWdodFwiXG4gICAgICAgICAgICA6cmVxdWlyZWQ9XCJyZXF1aXJlZFwiXG4gICAgICAgICAgICA6bXVsdGlwbGU9XCJtdWx0aXBsZVwiXG4gICAgICAgICAgICA6cmVhZG9ubHk9XCJyZWFkb25seVwiXG4gICAgICAgICAgICB2LW9uOmNoYW5nZT1cIiRlbWl0KCdjaGFuZ2UnLCBtdWx0aXBsZSA/ICRldmVudC50YXJnZXQuZmlsZXMgOiAkZXZlbnQudGFyZ2V0LmZpbGVzWzBdKVwiPlxuICAgIDwvYnRuPlxuXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IEJ0biBmcm9tICcuLi9CdG4nO1xuaW1wb3J0IEZpbGVGaWVsZCBmcm9tICcuLi9GaWxlRmllbGQnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnYnRuLWZpbGUnLFxuXG4gICAgbWl4aW5zOiBbXG4gICAgICAgIEZpbGVGaWVsZFxuICAgIF0sXG5cbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIEJ0bixcbiAgICAgICAgRmlsZUZpZWxkXG4gICAgfSxcblxuICAgIG1vZGVsOiB7XG4gICAgICAgIGV2ZW50OiAnY2hhbmdlJ1xuICAgIH0sXG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgdHlwZSBhdHRyaWJ1dGUgZm9yIHRoZSBidXR0b24uIE5vdCBhcHBsaWVkIGlmIGFuIGFuY2hvclxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0OiAnYnV0dG9uJ1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cblxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuLmJ0bi1maWxlIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICAgaW5wdXQge1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICB9XG59XG48L3N0eWxlPlxuIiwiaW1wb3J0IEJ0bkZpbGUgZnJvbSAnLi9CdG5GaWxlJztcbmltcG9ydCBWdWVJbnN0YWxsZXIgZnJvbSAnLi4vLi4vSGVscGVycy9WdWVJbnN0YWxsZXIvVnVlSW5zdGFsbGVyJztcblxuY29uc3QgcGx1Z2luID0gVnVlSW5zdGFsbGVyLnVzZSh7XG5cbiAgICBpbnN0YWxsKFZ1ZSwgb3B0aW9ucykge1xuICAgICAgICBWdWVJbnN0YWxsZXIuY29tcG9uZW50cyh7XG4gICAgICAgICAgICBCdG5GaWxlXG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEJ0bkZpbGU7XG4iLCI8dGVtcGxhdGU+XG4gICAgPGRpdiA6Y2xhc3M9XCJjbGFzc2VzXCIgOmRhdGEtdG9nZ2xlPVwidG9nZ2xlID8gJ2J1dHRvbnMnIDogZmFsc2VcIiByb2xlPVwiZ3JvdXBcIj5cbiAgICAgICAgPGJ0biB2LWlmPVwiYnV0dG9uc1wiIHYtZm9yPVwiKGJ1dHRvbiwgaSkgaW4gYnV0dG9uc1wiIDprZXk9XCJpXCIgdi1iaW5kPVwiYnV0dG9uXCIgLz5cbiAgICAgICAgPHNsb3QvPlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBCdG4gZnJvbSAnLi4vQnRuJztcbmltcG9ydCBDb2xvcmFibGUgZnJvbSAnLi4vLi4vTWl4aW5zL0NvbG9yYWJsZSc7XG5pbXBvcnQgTWVyZ2VDbGFzc2VzIGZyb20gJy4uLy4uL01peGlucy9NZXJnZUNsYXNzZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnYnRuLWdyb3VwJyxcblxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgQnRuXG4gICAgfSxcblxuICAgIG1peGluczogW1xuICAgICAgICBDb2xvcmFibGUsXG4gICAgICAgIE1lcmdlQ2xhc3Nlc1xuICAgIF0sXG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBbiBhcnJheSBvZiBidXR0b25zXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGJ1dHRvbnM6IEFycmF5LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZW5vdGUgdGhlIGJ1dHRvbiBncm91cCBhcyB0b2dnbGUgYnV0dG9uc1xuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHRvZ2dsZTogQm9vbGVhbixcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlzcGxheSB0aGUgYnV0dG9ucyB2ZXJ0aWNhbGx5XG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmVydGljYWw6IEJvb2xlYW5cblxuICAgIH0sXG5cbiAgICBjb21wdXRlZDoge1xuXG4gICAgICAgIGNsYXNzZXMoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tZXJnZUNsYXNzZXMoXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvcmFibGVDbGFzc2VzLCB7XG4gICAgICAgICAgICAgICAgICAgICdidG4tZ3JvdXAnOiAhdGhpcy52ZXJ0aWNhbCxcbiAgICAgICAgICAgICAgICAgICAgJ2J0bi1ncm91cC10b2dnbGUnOiB0aGlzLnRvZ2dsZSxcbiAgICAgICAgICAgICAgICAgICAgJ2J0bi1ncm91cC12ZXJ0aWNhbCc6IHRoaXMudmVydGljYWxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXAtdG9nZ2xlXCIgZGF0YS10b2dnbGU9XCJidXR0b25zXCI+XG4gICAgICAgIDxzbG90Lz5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnYnRuLWdyb3VwLXRvZ2dsZSdcblxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cImJ0bi10b29sYmFyXCIgcm9sZT1cInRvb2xiYXJcIj5cbiAgICAgICAgPHNsb3QvPlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdidG4tdG9vbGJhcidcblxufVxuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgQnRuR3JvdXAgZnJvbSAnLi9CdG5Hcm91cC52dWUnO1xuaW1wb3J0IEJ0bkdyb3VwVG9nZ2xlIGZyb20gJy4vQnRuR3JvdXBUb2dnbGUnO1xuaW1wb3J0IEJ0blRvb2xiYXIgZnJvbSAnLi9CdG5Ub29sYmFyJztcbmltcG9ydCBWdWVJbnN0YWxsZXIgZnJvbSAnLi4vLi4vSGVscGVycy9WdWVJbnN0YWxsZXIvVnVlSW5zdGFsbGVyJztcblxuY29uc3QgcGx1Z2luID0gVnVlSW5zdGFsbGVyLnVzZSh7XG5cbiAgICBpbnN0YWxsKFZ1ZSwgb3B0aW9ucykge1xuICAgICAgICBWdWVJbnN0YWxsZXIuY29tcG9uZW50cyh7XG4gICAgICAgICAgICBCdG5Hcm91cCxcbiAgICAgICAgICAgIEJ0bkdyb3VwVG9nZ2xlLFxuICAgICAgICAgICAgQnRuVG9vbGJhclxuICAgICAgICB9KTtcbiAgICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBCdG5Hcm91cDtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHV1aWQoKSB7XG4gICAgcmV0dXJuICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgYyA9PiB7XG4gICAgICAgIHZhciByID0gTWF0aC5yYW5kb20oKSAqIDE2IHwgMCwgdiA9IGMgPT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KTtcbiAgICAgICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpO1xuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbWV0aG9kczoge1xuICAgICAgICBwcm94eShjYWxsYmFjaywgZXZlbnQpIHtcbiAgICAgICAgICAgIGlmKGlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgW10uc2xpY2UuY2FsbChhcmd1bWVudHMpLnNwbGljZSgxKSk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiPHRlbXBsYXRlPlxuICAgIDxjb21wb25lbnRcbiAgICAgICAgOmlzPVwiY29tcG9uZW50XCJcbiAgICAgICAgOmhyZWY9XCJocmVmIHx8IChjb21wb25lbnQgPT09ICdhJyA/ICcjJyA6IGZhbHNlKVwiXG4gICAgICAgIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiXG4gICAgICAgIDpjbGFzcz1cInsnYWN0aXZlJzogYWN0aXZlfVwiXG4gICAgICAgIDp0eXBlPVwiY29tcG9uZW50ID09PSAnYnV0dG9uJyA/ICdidXR0b24nIDogZmFsc2VcIlxuICAgICAgICBAY2xpY2s9XCJvbkNsaWNrXCI+XG4gICAgICAgIDxpIHYtaWY9XCJpY29uXCIgOmNsYXNzPVwiaWNvblwiLz5cbiAgICAgICAgPHNsb3Q+e3tsYWJlbH19PC9zbG90PlxuICAgIDwvY29tcG9uZW50PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBQcm94eSBmcm9tICcuLi8uLi9NaXhpbnMvUHJveHkvUHJveHknO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBtaXhpbnM6IFtcbiAgICAgICAgUHJveHlcbiAgICBdLFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSXMgdGhlIG1lbnUgaXRlbSBhY3RpdmUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBPYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIGFjdGl2ZTogQm9vbGVhbixcblxuICAgICAgICAvKipcbiAgICAgICAgICogSXMgdGhlIG1lbnUgaXRlbSBhIGJ1dHRvblxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgT2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBidXR0b246IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBgZWxlbWVudGAgYXR0cmlidXRlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgT2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBlbGVtZW50OiBTdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBgaHJlZmAgYXR0cmlidXRlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgT2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBocmVmOiBTdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBpY29uIG9mIHRoZSBkcm9wZG93biBtZW51IGl0ZW0uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBPYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIGljb246IFN0cmluZyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGxhYmVsIG9mIHRoZSBkcm9wZG93biBtZW51IGl0ZW0uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBPYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIGxhYmVsOiBTdHJpbmdcblxuICAgIH0sXG5cbiAgICBjb21wdXRlZDoge1xuXG4gICAgICAgIGNvbXBvbmVudCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQgfHwgKHRoaXMuYnV0dG9uID8gJ2J1dHRvbicgOiAnYScpO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgbWV0aG9kczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGNhbGxiYWNrIGZ1bmN0aW9uIGZvciB0aGUgYGNsaWNrYCBldmVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IE9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgb25DbGljayhldmVudCkge1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2xpY2snLCBldmVudCk7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuXG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8aDUgY2xhc3M9XCJkcm9wZG93bi1oZWFkZXJcIj5cbiAgICAgICAgPHNsb3Q+e3toZWFkZXJ9fTwvc2xvdD5cbiAgICA8L2g1PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ2Ryb3Bkb3duLW1lbnUtaGVhZGVyJyxcblxuICAgIHByb3BzOiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB2YWx1ZSBvZiB0aGUgaGVhZGVyXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBPYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIGhlYWRlcjogU3RyaW5nXG5cbiAgICB9XG5cbn1cblxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cImRyb3Bkb3duLWRpdmlkZXJcIj48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdkcm9wZG93bi1tZW51LWRpdmlkZXInXG5cbn1cblxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIiA6Y2xhc3M9XCJ7J2Ryb3Bkb3duLW1lbnUtcmlnaHQnOiBhbGlnbiA9PT0gJ3JpZ2h0JywgJ3Nob3cnOiBzaG93fVwiIDphcmlhLWxhYmVsbGVkYnk9XCJpZFwiIHRhYmluZGV4PVwiLTFcIiBAY2xpY2s9XCJvbkNsaWNrXCI+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LWZvcj1cIml0ZW0gaW4gaXRlbXNcIj5cbiAgICAgICAgICAgIDxjb21wb25lbnQgOmlzPVwicHJlZml4KGl0ZW0udHlwZSB8fCAnaXRlbScsICdkcm9wZG93bi1tZW51JylcIiB2LWJpbmQ9XCJpdGVtXCIvPlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8c2xvdC8+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHV1aWQgZnJvbSAnLi4vLi4vSGVscGVycy9VdWlkJztcbmltcG9ydCBwcmVmaXggZnJvbSAnLi4vLi4vSGVscGVycy9QcmVmaXgnO1xuaW1wb3J0IHsgZWFjaCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCBEcm9wZG93bk1lbnVJdGVtIGZyb20gJy4vRHJvcGRvd25NZW51SXRlbSc7XG5pbXBvcnQgRHJvcGRvd25NZW51SGVhZGVyIGZyb20gJy4vRHJvcGRvd25NZW51SGVhZGVyJztcbmltcG9ydCBEcm9wZG93bk1lbnVEaXZpZGVyIGZyb20gJy4vRHJvcGRvd25NZW51RGl2aWRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgRHJvcGRvd25NZW51SXRlbSxcbiAgICAgICAgRHJvcGRvd25NZW51SGVhZGVyLFxuICAgICAgICBEcm9wZG93bk1lbnVEaXZpZGVyXG4gICAgfSxcblxuICAgIHByb3BzOiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBgaWRgIGF0dHJpYnV0ZSBvbiB0aGUgdG9nZ2xlIGJ1dHRvbiBhbmQgYXJpYSBsYWJlbC4gSWYgbm8gYGlkYCBpc1xuICAgICAgICAgKiBkZWZpbmVkLCB0aGVuIGEgVVVJRCB3aWxsIGJlIGdlbmVyYXRlZCBpbnN0ZWFkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgT2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBpZDoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgZGVmYXVsdDogdXVpZFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNwbGF5IHRoZSBkcm9wZG93biBtZW51IGFsaWduZWQgbGVmdCBvciByaWdodFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBhbGlnbjoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgZGVmYXVsdDogJ2xlZnQnLFxuICAgICAgICAgICAgdmFsaWRhdGUodmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWydsZWZ0JywgJ3JpZ2h0J10uaW5kZXhPZih2YWx1ZS50b0xvd2VyQ2FzZSgpKSAhPT0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBkZWZhdWx0IHZpc2liaWxpdHkgb2YgdGhlIGRyb3Bkb3duIG1lbnUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBPYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIHNob3c6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFuIGFycmF5IG9mIGRyb3Bkb3duIGl0ZW1zLiBJZiBhbiBrZXkvdmFsdWUgcGFpciBpc24ndCBkZWZpbmVkLCB0aGVcbiAgICAgICAgICogZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQuIElmIG5vIGl0ZW1zIGFyZSBkZWZpbmVkLCB0aGVuIHRoZSBzbG90XG4gICAgICAgICAqIG5hbWVkIFwiaXRlbXNcIiBjYW4gYmUgdXNlZCB0byBkZWZpbmUgdGhlIG9wdGlvbnMgd2l0aCBIVE1MLlxuICAgICAgICAgKlxuICAgICAgICAgKiBbe1xuICAgICAgICAgKiAgICAgIHR5cGU6ICdpdGVtJywgLy8gU3RyaW5nIFtpdGVtfGhlYWRlcnxkaXZpZGVyXVxuICAgICAgICAgKiAgICAgIGhyZWY6ICcjJywgLy8gU3RyaW5nXG4gICAgICAgICAqICAgICAgbGFiZWw6ICdTb21lIGxhYmVsJywgLy8gU3RyaW5nXG4gICAgICAgICAqICAgICAgb25DbGljazogKGV2ZW50KSA9PiB7fSAvLyBGdW5jdGlvblxuICAgICAgICAgKiB9XVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgQXJyYXlcbiAgICAgICAgICovXG4gICAgICAgIGl0ZW1zOiBBcnJheVxuXG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcblxuICAgICAgICBwcmVmaXg6IHByZWZpeCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQSBjYWxsYmFjayBmdW5jdGlvbiBmb3IgdGhlIGBjbGlja2AgZXZlbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBPYmplY3QgZXZlbnRcbiAgICAgICAgICogQHBhcmFtIE9iamVjdCBpdGVtXG4gICAgICAgICAqIEByZXR1cm4gdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgb25DbGljayhldmVudCkge1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2xpY2snLCBldmVudCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgY2FsbGJhY2sgZnVuY3Rpb24gZm9yIHRoZSBgY2xpY2tgIGV2ZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gT2JqZWN0IGV2ZW50XG4gICAgICAgICAqIEBwYXJhbSBPYmplY3QgaXRlbVxuICAgICAgICAgKiBAcmV0dXJuIHZvaWRcbiAgICAgICAgICovXG4gICAgICAgIG9uSXRlbUNsaWNrKGV2ZW50LCBpdGVtKSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdpdGVtOmNsaWNrJywgZXZlbnQsIGl0ZW0pO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgZWFjaCh0aGlzLiRjaGlsZHJlbiwgY2hpbGQgPT4ge1xuICAgICAgICAgICAgY2hpbGQuJG9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uSXRlbUNsaWNrKGV2ZW50LCBjaGlsZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IERyb3Bkb3duTWVudSBmcm9tICcuL0Ryb3Bkb3duTWVudSc7XG5pbXBvcnQgRHJvcGRvd25NZW51RGl2aWRlciBmcm9tICcuL0Ryb3Bkb3duTWVudURpdmlkZXInO1xuaW1wb3J0IERyb3Bkb3duTWVudUhlYWRlciBmcm9tICcuL0Ryb3Bkb3duTWVudUhlYWRlcic7XG5pbXBvcnQgRHJvcGRvd25NZW51SXRlbSBmcm9tICcuL0Ryb3Bkb3duTWVudUl0ZW0nO1xuaW1wb3J0IFZ1ZUluc3RhbGxlciBmcm9tICcuLi8uLi9IZWxwZXJzL1Z1ZUluc3RhbGxlci9WdWVJbnN0YWxsZXInO1xuXG5jb25zdCBwbHVnaW4gPSBWdWVJbnN0YWxsZXIudXNlKHtcblxuICAgIGluc3RhbGwoVnVlLCBvcHRpb25zKSB7XG4gICAgICAgIFZ1ZUluc3RhbGxlci5jb21wb25lbnRzKHtcbiAgICAgICAgICAgIERyb3Bkb3duTWVudSxcbiAgICAgICAgICAgIERyb3Bkb3duTWVudURpdmlkZXIsXG4gICAgICAgICAgICBEcm9wZG93bk1lbnVIZWFkZXIsXG4gICAgICAgICAgICBEcm9wZG93bk1lbnVJdGVtXG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydCAqIGZyb20gJy4vRHJvcGRvd25NZW51RGl2aWRlcic7XG5leHBvcnQgKiBmcm9tICcuL0Ryb3Bkb3duTWVudUhlYWRlcic7XG5leHBvcnQgKiBmcm9tICcuL0Ryb3Bkb3duTWVudUl0ZW0nO1xuZXhwb3J0IGRlZmF1bHQgRHJvcGRvd25NZW51O1xuIiwiPHRlbXBsYXRlPlxuXG4gICAgPGJ0bi1ncm91cCB2LWlmPVwic3BsaXRcIj5cbiAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCIhZHJvcGxlZnRcIj5cbiAgICAgICAgICAgIDxhIHYtaWY9XCJocmVmXCIgOmhyZWY9XCJocmVmXCIgOmNsYXNzPVwiYWN0aW9uQ2xhc3Nlc1wiIEBjbGljaz1cIm9uQ2xpY2tcIj5cbiAgICAgICAgICAgICAgICA8c2xvdCBuYW1lPVwibGFiZWxcIj48aSB2LWlmPVwiaWNvblwiIDpjbGFzcz1cImljb25cIj48L2k+IHt7bGFiZWx9fTwvc2xvdD5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDxidXR0b24gdi1lbHNlIDp0eXBlPVwidHlwZVwiIDpjbGFzcz1cImFjdGlvbkNsYXNzZXNcIiBAY2xpY2s9XCJvbkNsaWNrXCI+XG4gICAgICAgICAgICAgICAgPHNsb3QgbmFtZT1cImxhYmVsLXdyYXBwZXJcIj48aSB2LWlmPVwiaWNvblwiIDpjbGFzcz1cImljb25cIj48L2k+IDxzbG90IG5hbWU9XCJsYWJlbFwiPnt7bGFiZWx9fTwvc2xvdD48L3Nsb3Q+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPGJ0bi1ncm91cCA6Y2xhc3M9XCJ7J2Ryb3B1cCc6IGRyb3B1cCwgJ2Ryb3ByaWdodCc6IGRyb3ByaWdodCwgJ2Ryb3BsZWZ0JzogZHJvcGxlZnR9XCI+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIDphcmlhLWV4cGFuZGVkPVwiaXNEcm9wZG93blNob3dpbmdcIiA6aWQ9XCJpZFwiIDpjbGFzcz1cInRvZ2dsZUNsYXNzZXNcIiBAY2xpY2sucHJldmVudD1cIiFpc0Ryb3Bkb3duU2hvd2luZyA/IHNob3coKSA6IGhpZGUoKVwiIEBibHVyPVwib25CbHVyXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8ZHJvcGRvd24tbWVudVxuICAgICAgICAgICAgICAgIDppZD1cImlkXCJcbiAgICAgICAgICAgICAgICA6YWxpZ249XCJhbGlnblwiXG4gICAgICAgICAgICAgICAgOnNob3cuc3luYz1cImlzRHJvcGRvd25TaG93aW5nXCJcbiAgICAgICAgICAgICAgICBAY2xpY2s9XCJvbk1lbnVDbGlja1wiXG4gICAgICAgICAgICAgICAgQGl0ZW06Y2xpY2s9XCJvbkl0ZW1DbGlja1wiPlxuICAgICAgICAgICAgICAgIDxzbG90Lz5cbiAgICAgICAgICAgIDwvZHJvcGRvd24tbWVudT5cbiAgICAgICAgPC9idG4tZ3JvdXA+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwiZHJvcGxlZnRcIj5cbiAgICAgICAgICAgIDxhIHYtaWY9XCJocmVmXCIgOmhyZWY9XCJocmVmXCIgOmNsYXNzPVwiYWN0aW9uQ2xhc3Nlc1wiIEBjbGljaz1cIm9uQ2xpY2tcIj5cbiAgICAgICAgICAgICAgICA8c2xvdCBuYW1lPVwibGFiZWxcIj48aSB2LWlmPVwiaWNvblwiIDpjbGFzcz1cImljb25cIj48L2k+IHt7bGFiZWx9fTwvc2xvdD5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDxidXR0b24gdi1lbHNlIDp0eXBlPVwidHlwZVwiIDpjbGFzcz1cImFjdGlvbkNsYXNzZXNcIiBAY2xpY2s9XCJvbkNsaWNrXCI+XG4gICAgICAgICAgICAgICAgPHNsb3QgbmFtZT1cImxhYmVsLXdyYXBwZXJcIj48aSB2LWlmPVwiaWNvblwiIDpjbGFzcz1cImljb25cIj48L2k+IDxzbG90IG5hbWU9XCJsYWJlbFwiPnt7bGFiZWx9fTwvc2xvdD48L3Nsb3Q+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L2J0bi1ncm91cD5cblxuICAgIDxidG4tZ3JvdXAgdi1lbHNlIDpjbGFzcz1cInsnZHJvcHVwJzogZHJvcHVwLCAnZHJvcHJpZ2h0JzogZHJvcHJpZ2h0LCAnZHJvcGxlZnQnOiBkcm9wbGVmdH1cIiBAY2xpY2s9XCJvbkNsaWNrXCI+XG4gICAgICAgIDxidXR0b24gYXJpYS1oYXNwb3B1cD1cInRydWVcIiA6YXJpYS1leHBhbmRlZD1cImlzRHJvcGRvd25TaG93aW5nXCIgOnR5cGU9XCJ0eXBlXCIgOmlkPVwiaWRcIiA6Y2xhc3M9XCJ0b2dnbGVDbGFzc2VzXCIgQGNsaWNrLnByZXZlbnQ9XCIhaXNEcm9wZG93blNob3dpbmcgPyBzaG93KCkgOiBoaWRlKClcIiBAYmx1cj1cIm9uQmx1clwiPlxuICAgICAgICAgICAgPHNsb3QgbmFtZT1cImxhYmVsXCI+PGkgdi1pZj1cImljb25cIiA6Y2xhc3M9XCJpY29uXCI+PC9pPiB7e2xhYmVsfX08L3Nsb3Q+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxkcm9wZG93bi1tZW51XG4gICAgICAgICAgICA6aWQ9XCJpZFwiXG4gICAgICAgICAgICA6YWxpZ249XCJhbGlnblwiXG4gICAgICAgICAgICA6c2hvdy5zeW5jPVwiaXNEcm9wZG93blNob3dpbmdcIlxuICAgICAgICAgICAgQGNsaWNrPVwib25NZW51Q2xpY2tcIlxuICAgICAgICAgICAgQGl0ZW06Y2xpY2s9XCJvbkl0ZW1DbGlja1wiPlxuICAgICAgICAgICAgPHNsb3QvPlxuICAgICAgICA8L2Ryb3Bkb3duLW1lbnU+XG4gICAgPC9idG4tZ3JvdXA+XG5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgQnRuIGZyb20gJy4uL0J0bic7XG5pbXBvcnQgUG9wcGVyIGZyb20gJ3BvcHBlci5qcyc7XG5pbXBvcnQgQnRuR3JvdXAgZnJvbSAnLi4vQnRuR3JvdXAnO1xuaW1wb3J0IHV1aWQgZnJvbSAnLi4vLi4vSGVscGVycy9VdWlkJztcbmltcG9ydCBwcmVmaXggZnJvbSAnLi4vLi4vSGVscGVycy9QcmVmaXgnO1xuaW1wb3J0IERyb3Bkb3duTWVudSBmcm9tICcuLi9Ecm9wZG93bk1lbnUnO1xuaW1wb3J0IHsgZWFjaCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcblxuY29uc3QgVEFCX0tFWUNPREUgPSA5O1xuY29uc3QgTEVGVF9BUlJPV19LRVlDT0RFID0gMzc7XG5jb25zdCBSSUdIVF9BUlJPV19LRVlDT0RFID0gMzk7XG5jb25zdCBVUF9BUlJPV19LRVlDT0RFID0gMzg7XG5jb25zdCBET1dOX0FSUk9XX0tFWUNPREUgPSA0MDtcblxubGV0IGlnbm9yZUJsdXJFdmVudCA9IGZhbHNlO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnYnRuLWRyb3Bkb3duJyxcblxuICAgIGV4dGVuZHM6IEJ0bixcblxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgQnRuR3JvdXAsXG4gICAgICAgIERyb3Bkb3duTWVudVxuICAgIH0sXG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgYnV0dG9uIGljb24gdGhhdCBhcHBlYXJzIGJlZm9yZSB0aGUgbGFiZWwuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIGF1dG9jbG9zZTogQm9vbGVhbixcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGJ1dHRvbiBpY29uIHRoYXQgYXBwZWFycyBiZWZvcmUgdGhlIGxhYmVsLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBpY29uOiBTdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB0b2dnbGUgYnV0dG9uJ3MgbGFiZWwuIElmIG5vdCBkZWZpbmVkIGFzIGFuIGF0dHJpYnV0ZSxcbiAgICAgICAgICogeW91IGNhbiBvdmVycmlkZSB3aXRoIHRoZSBjb21wb25lbnQncyBzbG90IChpbm5lciBodG1sKS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgbGFiZWw6IFN0cmluZyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGBpZGAgYXR0cmlidXRlIG9uIHRoZSB0b2dnbGUgYnV0dG9uIGFuZCBhcmlhIGxhYmVsLiBJZiBubyBgaWRgIGlzXG4gICAgICAgICAqIGRlZmluZWQsIHRoZW4gYSBVVUlEIHdpbGwgYmUgZ2VuZXJhdGVkIGluc3RlYWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIGlkOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0OiB1dWlkXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBidXR0b24gdHlwZSBhdHRyaWJ1dGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICdidXR0b24nXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc3BsYXkgdGhlIGRyb3Bkb3duIG1lbnUgYWxpZ25lZCBsZWZ0IG9yIHJpZ2h0XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIGFsaWduOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0OiAnbGVmdCcsXG4gICAgICAgICAgICB2YWxpZGF0ZSh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbJ2xlZnQnLCAncmlnaHQnXS5pbmRleE9mKHZhbHVlLnRvTG93ZXJDYXNlKCkpICE9PSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlzcGxheSB0aGUgZHJvcGRvd24gYnV0dG9uIHdpdGggYSBzcGxpdCB0b2dnbGUgYnV0dG9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgQm9vbGVhblxuICAgICAgICAgKi9cbiAgICAgICAgc3BsaXQ6IHtcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNwbGF5IGFzIGEgZHJvcHVwIGluc3RlYWQgb2YgYSBkcm9wZG93bi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IEJvb2xlYW5cbiAgICAgICAgICovXG4gICAgICAgIGRyb3B1cDoge1xuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc3BsYXkgYXMgYSBkcm9wcmlnaHQgaW5zdGVhZCBvZiBhIGRyb3Bkb3duLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgQm9vbGVhblxuICAgICAgICAgKi9cbiAgICAgICAgZHJvcHJpZ2h0OiB7XG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlzcGxheSBhcyBhIGRyb3BsZWZ0IGluc3RlYWQgb2YgYSBkcm9wZG93bi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IEJvb2xlYW5cbiAgICAgICAgICovXG4gICAgICAgIGRyb3BsZWZ0OiB7XG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRm9jdXMgb24gdGhlIHRoZSBkcm9wZG93biB0b2dnbGUgYnV0dG9uXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4gdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgZm9jdXMoKSB7XG4gICAgICAgICAgICB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuZHJvcGRvd24tdG9nZ2xlJykuZm9jdXMoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRm9jdXMgb24gdGhlIHRoZSBkcm9wZG93biB0b2dnbGUgYnV0dG9uXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4gdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgcXVlcnlGb2N1c2FibGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmRyb3Bkb3duLW1lbnUnKS5xdWVyeVNlbGVjdG9yQWxsKCdsYWJlbCwgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEsIFt0YWJpbmRleF06bm90KFt0YWJpbmRleD1cIi0xXCJdKScpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNZXRob2QgdG8gY2hlY2sgaWYgdGhlIGdpdmVuIGVsZW1lbnQgaXMgZm9jdXNhYmxlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIHZvaWRcbiAgICAgICAgICovXG4gICAgICAgIGlzRm9jdXNhYmxlKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVzID0gdGhpcy5xdWVyeUZvY3VzYWJsZSgpO1xuXG4gICAgICAgICAgICBmb3IobGV0IGkgaW4gbm9kZXMpIHtcbiAgICAgICAgICAgICAgICBpZihlbGVtZW50ID09PSBub2Rlc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVG9nZ2xlIHRoZSBkcm9wZG93biBtZW51XG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4gdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgdG9nZ2xlKCkge1xuICAgICAgICAgICAgIXRoaXMuaXNEcm9wZG93blNob3dpbmcgPyB0aGlzLnNob3coKSA6IHRoaXMuaGlkZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG93IHRoZSBkcm9wZG93biBtZW51XG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4gdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgc2hvdygpIHtcbiAgICAgICAgICAgIHRoaXMuaXNEcm9wZG93blNob3dpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLiRuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHNpZGUgPSAnYm90dG9tJztcblxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZHJvcHVwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNpZGUgPSAndG9wJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMuZHJvcGxlZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2lkZSA9ICdsZWZ0J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMuZHJvcHJpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNpZGUgPSAncmlnaHQnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IG1lbnUgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuZHJvcGRvd24tbWVudScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvZ2dsZSA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5kcm9wZG93bi10b2dnbGUnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFtzaWRlLCB0aGlzLmFsaWduID09PSAnbGVmdCcgPyAnc3RhcnQnIDogJ2VuZCddO1xuXG4gICAgICAgICAgICAgICAgbmV3IFBvcHBlcih0b2dnbGUsIG1lbnUsIHtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50OiBwb3NpdGlvbi5qb2luKCctJylcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmKHRoaXMucXVlcnlGb2N1c2FibGUoKS5pdGVtKDApKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhJykuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdzaG93Jyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogSGlkZSB0aGUgZHJvcGRvd24gbWVudVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIHZvaWRcbiAgICAgICAgICovXG4gICAgICAgIGhpZGUoKSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCd0b2dnbGUnLCB0aGlzLmlzRHJvcGRvd25TaG93aW5nID0gZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnaGlkZScpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGNhbGxiYWNrIGZ1bmN0aW9uIGZvciB0aGUgYGNsaWNrYCBldmVudCBmb3IgdGhlIGFjdGlvbiBidXR0b25cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NsaWNrJywgZXZlbnQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGNhbGxiYWNrIGZ1bmN0aW9uIGZvciB0aGUgYGJsdXJgIGV2ZW50IGZvciB0aGUgYWN0aW9uIGJ1dHRvblxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIHZvaWRcbiAgICAgICAgICovXG4gICAgICAgIG9uQmx1cihldmVudCkge1xuICAgICAgICAgICAgaWYoIXRoaXMuJGVsLmNvbnRhaW5zKGV2ZW50LnJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgY2FsbGJhY2sgZnVuY3Rpb24gZm9yIHRoZSBgaXRlbTpjbGlja2AgZXZlbnQgZm9yIHRoZSBhY3Rpb24gYnV0dG9uXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4gdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgb25NZW51Q2xpY2soZXZlbnQsIGl0ZW0pIHtcbiAgICAgICAgICAgIGlmKGV2ZW50LnRhcmdldCA9PT0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmRyb3Bkb3duLW1lbnUnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQSBjYWxsYmFjayBmdW5jdGlvbiBmb3IgdGhlIGBpdGVtOmNsaWNrYCBldmVudCBmb3IgdGhlIGFjdGlvbiBidXR0b25cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBvbkl0ZW1DbGljayhldmVudCwgaXRlbSkge1xuICAgICAgICAgICAgaWYoIXRoaXMuaXNGb2N1c2FibGUoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdpdGVtOmNsaWNrJywgZXZlbnQsIGl0ZW0pO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICB2YXJpYW50Q2xhc3NQcmVmaXgoKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2J0bicgKyAodGhpcy5vdXRsaW5lID8gJy1vdXRsaW5lJyA6ICcnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzaXplYWJsZUNsYXNzUHJlZml4KCkge1xuICAgICAgICAgICAgcmV0dXJuICdidG4nO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFjdGlvbkNsYXNzZXMoKSB7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICdidG4nLFxuICAgICAgICAgICAgICAgIHByZWZpeCh0aGlzLnNpemUsICdidG4nKSxcbiAgICAgICAgICAgICAgICBwcmVmaXgodGhpcy52YXJpYW50LCAnYnRuJylcbiAgICAgICAgICAgIF0uam9pbignICcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHRvZ2dsZUNsYXNzZXMoKSB7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICdidG4nLFxuICAgICAgICAgICAgICAgICdkcm9wZG93bi10b2dnbGUnLFxuICAgICAgICAgICAgICAgIHRoaXMudmFyaWFudENsYXNzLFxuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZWFibGVDbGFzcyxcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZSA/ICdhY3RpdmUnIDogJycsXG4gICAgICAgICAgICAgICAgdGhpcy5ibG9jayA/ICdidG4tYmxvY2snIDogJycsXG4gICAgICAgICAgICAgICAgKHRoaXMuc3BsaXQgPyAnZHJvcGRvd24tdG9nZ2xlLXNwbGl0JyA6ICcnKSxcbiAgICAgICAgICAgIF0uam9pbignICcpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpc0Ryb3Bkb3duU2hvd2luZzogZmFsc2VcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgZWFjaCh0aGlzLiRlbC5xdWVyeVNlbGVjdG9yQWxsKCdbdHlwZT1zdWJtaXRdLCBpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSwgW3RhYmluZGV4XTpub3QoW3RhYmluZGV4PVwiLTFcIl0nKSwgZWwgPT4ge1xuICAgICAgICAgICAgY29uc3Qga2V5ZG93biA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpZ25vcmUgPSBbXG4gICAgICAgICAgICAgICAgICAgIExFRlRfQVJST1dfS0VZQ09ERSxcbiAgICAgICAgICAgICAgICAgICAgUklHSFRfQVJST1dfS0VZQ09ERSxcbiAgICAgICAgICAgICAgICAgICAgVVBfQVJST1dfS0VZQ09ERSxcbiAgICAgICAgICAgICAgICAgICAgRE9XTl9BUlJPV19LRVlDT0RFLFxuICAgICAgICAgICAgICAgICAgICBUQUJfS0VZQ09ERVxuICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgICBpZihpZ25vcmUuaW5kZXhPZihldmVudC5rZXlDb2RlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWdub3JlQmx1ckV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25zdCBibHVyID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGlmKCFpZ25vcmVCbHVyRXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlnbm9yZUJsdXJFdmVudCA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3QgZm9jdXMgPSBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgaWdub3JlQmx1ckV2ZW50ID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25zdCBtb3VzZWRvd24gPSBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgaWdub3JlQmx1ckV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBibHVyKTtcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgZm9jdXMpO1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWRvd24pO1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgbW91c2Vkb3duKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IEJ0bkRyb3Bkb3duIGZyb20gJy4vQnRuRHJvcGRvd24nO1xuaW1wb3J0IFZ1ZUluc3RhbGxlciBmcm9tICcuLi8uLi9IZWxwZXJzL1Z1ZUluc3RhbGxlci9WdWVJbnN0YWxsZXInO1xuXG5jb25zdCBwbHVnaW4gPSBWdWVJbnN0YWxsZXIudXNlKHtcblxuICAgIGluc3RhbGwoVnVlLCBvcHRpb25zKSB7XG4gICAgICAgIFZ1ZUluc3RhbGxlci5jb21wb25lbnRzKHtcbiAgICAgICAgICAgIEJ0bkRyb3Bkb3duXG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEJ0bkRyb3Bkb3duO1xuIiwiZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbWV0aG9kczoge1xuXG4gICAgICAgIGdldFNsb3Qoc2xvdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNsb3RzW3Nsb3RdO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhhc1Nsb3Qoc2xvdCkge1xuICAgICAgICAgICAgcmV0dXJuICEhdGhpcy4kc2xvdHNbc2xvdF07XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFzU2xvdHMoc2xvdHMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaSBpbiBzbG90cykge1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmhhc1Nsb3Qoc2xvdHNbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBjb21wdXRlZDoge1xuXG4gICAgICAgIGhhc0RlZmF1bHRTbG90KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFzU2xvdCgnZGVmYXVsdCcpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbiIsIjx0ZW1wbGF0ZT5cblxuICAgIDxkaXYgOmNsYXNzPVwibWVyZ2VDbGFzc2VzKGNsYXNzTmFtZSwgY29sb3JhYmxlQ2xhc3NlcylcIj5cbiAgICAgICAgPHNsb3QvPlxuICAgIDwvZGl2PlxuXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IEhhc1Nsb3RzIGZyb20gJy4uLy4uL01peGlucy9IYXNTbG90cyc7XG5pbXBvcnQgQ29sb3JhYmxlIGZyb20gJy4uLy4uL01peGlucy9Db2xvcmFibGUnO1xuaW1wb3J0IE1lcmdlQ2xhc3NlcyBmcm9tICcuLi8uLi9NaXhpbnMvTWVyZ2VDbGFzc2VzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ2NhcmQnLFxuXG4gICAgbWl4aW5zOiBbXG4gICAgICAgIEhhc1Nsb3RzLFxuICAgICAgICBDb2xvcmFibGUsXG4gICAgICAgIE1lcmdlQ2xhc3Nlc1xuICAgIF0sXG5cbiAgICBjb21wdXRlZDoge1xuXG4gICAgICAgIGNsYXNzTmFtZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRvcHRpb25zLm5hbWVcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG5cbjwvc2NyaXB0PlxuIiwiPHNjcmlwdD5cbmltcG9ydCBDYXJkIGZyb20gJy4vQ2FyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdjYXJkLWJvZHknLFxuXG4gICAgZXh0ZW5kczogQ2FyZFxuXG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cblxuICAgIDxidG4tZ3JvdXAgY2xhc3M9XCJjYXJkLWJ0bi1ncm91cFwiPlxuICAgICAgICA8c2xvdC8+XG4gICAgPC9idG4tZ3JvdXA+XG5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgQ2FyZCBmcm9tICcuL0NhcmQnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnY2FyZC1idG4tZ3JvdXAnLFxuXG4gICAgZXh0ZW5kczogQ2FyZFxuXG59XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCI+XG5AaW1wb3J0ICcuL25vZGVfbW9kdWxlcy9ib290c3RyYXAvc2Nzcy9mdW5jdGlvbnMuc2Nzcyc7XG5AaW1wb3J0ICcuL25vZGVfbW9kdWxlcy9ib290c3RyYXAvc2Nzcy92YXJpYWJsZXMuc2Nzcyc7XG5cbi5jYXJkIHtcbiAgICAuY2FyZC1idG4tZ3JvdXAsXG4gICAgLmJ0bi1ncm91cC5jYXJkLWJ0bi1ncm91cCB7XG4gICAgICAgIGZsZXg6IDE7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcblxuICAgICAgICAmID4gLmJ0biB7XG4gICAgICAgICAgICBmbGV4OiAxO1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuXG4gICAgICAgICAgICAmOm5vdCg6bGFzdC1jaGlsZCk6OmFmdGVyIHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgICAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogJGZvbnQtc2l6ZS1iYXNlO1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgICAgICAgICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAkY2FyZC1ib3JkZXItY29sb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuXG4gICAgPGRpdiBjbGFzcz1cImNhcmQtZGVja1wiPlxuICAgICAgICA8c2xvdC8+XG4gICAgPC9kaXY+XG5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnY2FyZC1kZWNrJ1xuXG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cblxuICAgIDxjb21wb25lbnQgOmlzPVwidGFnXCIgOmNsYXNzPVwibWVyZ2VDbGFzc2VzKGNsYXNzTmFtZSwgY29sb3JhYmxlQ2xhc3NlcylcIj5cbiAgICAgICAgPHNsb3QvPlxuICAgIDwvY29tcG9uZW50PlxuXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IENhcmQgZnJvbSAnLi9DYXJkJztcbmltcG9ydCBNZXJnZUNsYXNzZXMgZnJvbSAnLi4vLi4vTWl4aW5zL01lcmdlQ2xhc3Nlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdjYXJkLWhlYWRlcicsXG5cbiAgICBleHRlbmRzOiBDYXJkLFxuXG4gICAgbWl4aW5zOiBbXG4gICAgICAgIE1lcmdlQ2xhc3Nlc1xuICAgIF0sXG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgY29tcG9uZW50J3MgSFRNTCB0YWcgbmFtZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICB0YWc6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICdoNSdcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG5cbjwvc2NyaXB0PlxuIiwiPHNjcmlwdD5cbmltcG9ydCBDYXJkSGVhZGVyIGZyb20gJy4vQ2FyZEhlYWRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdjYXJkLWZvb3RlcicsXG5cbiAgICBleHRlbmRzOiBDYXJkSGVhZGVyLFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGNvbXBvbmVudCdzIEhUTUwgdGFnIG5hbWVcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgdGFnOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0OiAnZGl2J1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cblxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG5cbiAgICA8ZGl2IDpjbGFzcz1cIm1lcmdlQ2xhc3NlcyhjbGFzc05hbWUpXCIgY2xhc3M9XCJkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1pdGVtcy1jZW50ZXJcIiA6c3R5bGU9XCJ7aGVpZ2h0OiB1bml0KGhlaWdodCl9XCI+XG4gICAgICAgIDxkaXYgdi1pZj1cImJhY2tncm91bmRcIiBjbGFzcz1cImNhcmQtaW1nLWJnXCIgOnN0eWxlPVwie2JhY2tncm91bmQ6IGJhY2tncm91bmQgPyBgdXJsKCR7dGhpcy5zcmN9KWAgOiBudWxsLCBvdmVyZmxvdzogYmx1ciA/ICdoaWRkZW4nIDogJ2luaGVyaXQnLCBmaWx0ZXI6IGJsdXIgPyBgYmx1cigke3VuaXQoYmx1cil9KWAgOiBudWxsfVwiLz5cbiAgICAgICAgPGltZyB2LWlmPVwiIWJhY2tncm91bmQgJiYgc3JjXCIgOnNyYz1cInNyY1wiIDphbHQ9XCJhbHRcIiBjbGFzcz1cImltZy1mbHVpZFwiLz5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaW1nLWNvbnRlbnRcIiA6Y2xhc3M9XCJ7J3RleHQtdHJ1bmNhdGUnOiB0ZXh0VHJ1bmNhdGV9XCI+XG4gICAgICAgICAgICA8c2xvdC8+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IENhcmQgZnJvbSAnLi9DYXJkJztcbmltcG9ydCB1bml0IGZyb20gJy4uLy4uL0hlbHBlcnMvVW5pdCc7XG5pbXBvcnQgTWVyZ2VDbGFzc2VzIGZyb20gJy4uLy4uL01peGlucy9NZXJnZUNsYXNzZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnY2FyZC1pbWcnLFxuXG4gICAgZXh0ZW5kczogQ2FyZCxcblxuICAgIG1peGluczogW1xuICAgICAgICBNZXJnZUNsYXNzZXNcbiAgICBdLFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGFsdCBhdHRyaWJ1dGVcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgYWx0OiBTdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc3BsYXkgdGhlIGltYWdlIGFzIGEgYmFja2dyb3VuZCBpbWFnZSBmaXQgd2l0aCBDU1MgY292ZXIuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIGJhY2tncm91bmQ6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBhbW91bnQgdG8gYmx1ciB0aGUgYmFja2dyb3VuZCBpbWFnZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgYmx1cjogW051bWJlciwgU3RyaW5nXSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGhlaWdodCBhdHRyaWJ1dGVcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgaGVpZ2h0OiBbTnVtYmVyLCBTdHJpbmddLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcnVuY2F0ZSB0aGUgdGV4dCBpbiB0aGUgY29udGVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICB0ZXh0VHJ1bmNhdGU6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBzcmMgYXR0cmlidXRlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIHNyYzogU3RyaW5nXG5cbiAgICB9LFxuXG4gICAgbWV0aG9kczoge1xuXG4gICAgICAgIHVuaXQodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB1bml0KHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCI+XG4uY2FyZC1pbWcsXG4uY2FyZC1pbWctdG9wLFxuLmNhcmQtaW1nLWJvdHRvbSB7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0ZXh0LXNoYWRvdzogMCAwIDIwcHggcmdiYSgwLCAwLCAwLCAuNSk7XG5cbiAgICAuY2FyZC1pbWctYmcge1xuICAgICAgICB6LWluZGV4OiAwO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlciAhaW1wb3J0YW50O1xuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgIWltcG9ydGFudDtcbiAgICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdCAhaW1wb3J0YW50O1xuXG4gICAgICAgICYgPiBpbWc6Zmlyc3QtY2hpbGQge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLmNhcmQtaW1nLWNvbnRlbnQge1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgfVxuXG4gICAgLypcbiAgICAmID4gOm5vdChpbWcpIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIH1cbiAgICAqL1xufVxuPC9zdHlsZT5cbiIsIjxzY3JpcHQ+XG5pbXBvcnQgQ2FyZEltZyBmcm9tICcuL0NhcmRJbWcnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnY2FyZC1pbWctdG9wJyxcblxuICAgIGV4dGVuZHM6IENhcmRJbWdcbn1cblxuPC9zY3JpcHQ+XG4iLCI8c2NyaXB0PlxuaW1wb3J0IENhcmRJbWcgZnJvbSAnLi9DYXJkSW1nJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ2NhcmQtaW1nLWJvdHRvbScsXG5cbiAgICBleHRlbmRzOiBDYXJkSW1nXG5cbn1cbjwvc2NyaXB0PlxuIiwiPHNjcmlwdD5cbmltcG9ydCBDYXJkIGZyb20gJy4vQ2FyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdjYXJkLWltZy1vdmVybGF5JyxcblxuICAgIGV4dGVuZHM6IENhcmRcblxufVxuXG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cblxuICAgIDxyb3V0ZXItbGluayA6dG89XCJocmVmXCIgOmNsYXNzPVwibWVyZ2VDbGFzc2VzKGNsYXNzTmFtZSwgY29sb3JhYmxlQ2xhc3NlcylcIiBAY2xpY2s9XCJvbkNsaWNrXCI+XG4gICAgICAgIDxzbG90Lz5cbiAgICA8L3JvdXRlci1saW5rPlxuXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IENhcmQgZnJvbSAnLi9DYXJkJztcbmltcG9ydCBNZXJnZUNsYXNzZXMgZnJvbSAnLi4vLi4vTWl4aW5zL01lcmdlQ2xhc3Nlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdjYXJkLWxpbmsnLFxuXG4gICAgZXh0ZW5kczogQ2FyZCxcblxuICAgIG1peGluczogW1xuICAgICAgICBNZXJnZUNsYXNzZXNcbiAgICBdLFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGFsdCBhdHRyaWJ1dGVcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgYWx0OiBTdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBocmVmIGF0dHJpYnV0ZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBocmVmOiBTdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB0byBhdHRyaWJ1dGVcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgdG86IFtPYmplY3QsIFN0cmluZ11cblxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgb25DbGljayhldmVudCkge1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2xpY2snLCBldmVudCk7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuXG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cblxuICAgIDxoNiA6Y2xhc3M9XCJtZXJnZUNsYXNzZXMoY2xhc3NOYW1lLCBjb2xvcmFibGVDbGFzc2VzKVwiPlxuICAgICAgICA8c2xvdC8+XG4gICAgPC9oNj5cblxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBDYXJkIGZyb20gJy4vQ2FyZCc7XG5pbXBvcnQgTWVyZ2VDbGFzc2VzIGZyb20gJy4uLy4uL01peGlucy9NZXJnZUNsYXNzZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnY2FyZC1zdWJ0aXRsZScsXG5cbiAgICBleHRlbmRzOiBDYXJkLFxuXG4gICAgbWl4aW5zOiBbXG4gICAgICAgIE1lcmdlQ2xhc3Nlc1xuICAgIF1cblxufVxuXG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cblxuICAgIDxoNSA6Y2xhc3M9XCJtZXJnZUNsYXNzZXMoY2xhc3NOYW1lLCBjb2xvcmFibGVDbGFzc2VzKVwiPlxuICAgICAgICA8c2xvdC8+XG4gICAgPC9oNT5cblxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBDYXJkIGZyb20gJy4vQ2FyZCc7XG5pbXBvcnQgTWVyZ2VDbGFzc2VzIGZyb20gJy4uLy4uL01peGlucy9NZXJnZUNsYXNzZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnY2FyZC10aXRsZScsXG5cbiAgICBtaXhpbnM6IFtcbiAgICAgICAgQ2FyZCxcbiAgICAgICAgTWVyZ2VDbGFzc2VzXG4gICAgXVxuXG59XG5cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IENhcmQgZnJvbSAnLi9DYXJkJztcbmltcG9ydCBDYXJkQm9keSBmcm9tICcuL0NhcmRCb2R5JztcbmltcG9ydCBDYXJkQnRuR3JvdXAgZnJvbSAnLi9DYXJkQnRuR3JvdXAnO1xuaW1wb3J0IENhcmREZWNrIGZyb20gJy4vQ2FyZERlY2snO1xuaW1wb3J0IENhcmRGb290ZXIgZnJvbSAnLi9DYXJkRm9vdGVyJztcbmltcG9ydCBDYXJkSGVhZGVyIGZyb20gJy4vQ2FyZEhlYWRlcic7XG5pbXBvcnQgQ2FyZEltZyBmcm9tICcuL0NhcmRJbWcnO1xuaW1wb3J0IENhcmRJbWdUb3AgZnJvbSAnLi9DYXJkSW1nVG9wJztcbmltcG9ydCBDYXJkSW1nQm90dG9tIGZyb20gJy4vQ2FyZEltZ0JvdHRvbSc7XG5pbXBvcnQgQ2FyZEltZ092ZXJsYXkgZnJvbSAnLi9DYXJkSW1nT3ZlcmxheSc7XG5pbXBvcnQgQ2FyZExpbmsgZnJvbSAnLi9DYXJkTGluayc7XG5pbXBvcnQgQ2FyZFN1YnRpdGxlIGZyb20gJy4vQ2FyZFN1YnRpdGxlJztcbmltcG9ydCBDYXJkVGl0bGUgZnJvbSAnLi9DYXJkVGl0bGUnO1xuaW1wb3J0IFZ1ZUluc3RhbGxlciBmcm9tICcuLi8uLi9IZWxwZXJzL1Z1ZUluc3RhbGxlci9WdWVJbnN0YWxsZXInO1xuXG5jb25zdCBwbHVnaW4gPSBWdWVJbnN0YWxsZXIudXNlKHtcblxuICAgIGluc3RhbGwoVnVlLCBvcHRpb25zKSB7XG4gICAgICAgIFZ1ZUluc3RhbGxlci5jb21wb25lbnRzKHtcbiAgICAgICAgICAgIENhcmQsXG4gICAgICAgICAgICBDYXJkQm9keSxcbiAgICAgICAgICAgIENhcmRCdG5Hcm91cCxcbiAgICAgICAgICAgIENhcmREZWNrLFxuICAgICAgICAgICAgQ2FyZEZvb3RlcixcbiAgICAgICAgICAgIENhcmRIZWFkZXIsXG4gICAgICAgICAgICBDYXJkSW1nLFxuICAgICAgICAgICAgQ2FyZEltZ1RvcCxcbiAgICAgICAgICAgIENhcmRJbWdCb3R0b20sXG4gICAgICAgICAgICBDYXJkSW1nT3ZlcmxheSxcbiAgICAgICAgICAgIENhcmRMaW5rLFxuICAgICAgICAgICAgQ2FyZFN1YnRpdGxlLFxuICAgICAgICAgICAgQ2FyZFRpdGxlXG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydCAqIGZyb20gJy4vQ2FyZEJvZHknO1xuZXhwb3J0ICogZnJvbSAnLi9DYXJkQnRuR3JvdXAnO1xuZXhwb3J0ICogZnJvbSAnLi9DYXJkRGVjayc7XG5leHBvcnQgKiBmcm9tICcuL0NhcmRGb290ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9DYXJkSGVhZGVyJztcbmV4cG9ydCAqIGZyb20gJy4vQ2FyZEltZyc7XG5leHBvcnQgKiBmcm9tICcuL0NhcmRJbWdUb3AnO1xuZXhwb3J0ICogZnJvbSAnLi9DYXJkSW1nQm90dG9tJztcbmV4cG9ydCAqIGZyb20gJy4vQ2FyZEltZ092ZXJsYXknO1xuZXhwb3J0ICogZnJvbSAnLi9DYXJkTGluayc7XG5leHBvcnQgKiBmcm9tICcuL0NhcmRTdWJ0aXRsZSc7XG5leHBvcnQgKiBmcm9tICcuL0NhcmRUaXRsZSc7XG5leHBvcnQgZGVmYXVsdCBDYXJkO1xuIiwiPHRlbXBsYXRlPlxuXG4gICAgPGRpdiA6Y2xhc3M9XCJtZXJnZUNsYXNzZXMoY29udHJvbENsYXNzLCBjdXN0b21Db250cm9sQ2xhc3MsIHNpemVhYmxlQ2xhc3MsIGlubGluZSA/IGlubGluZUNsYXNzIDogJycpXCI+XG5cbiAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCJjdXN0b20gJiYgaWRcIj5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHYtYmluZC1ldmVudHNcbiAgICAgICAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgICAgIDpuYW1lPVwibmFtZVwiXG4gICAgICAgICAgICAgICAgOmlkPVwiaWRcIlxuICAgICAgICAgICAgICAgIDp2YWx1ZT1cInZhbHVlXCJcbiAgICAgICAgICAgICAgICA6cmVxdWlyZWQ9XCJyZXF1aXJlZFwiXG4gICAgICAgICAgICAgICAgOmRpc2FibGVkPVwiZGlzYWJsZWQgfHwgcmVhZG9ubHlcIlxuICAgICAgICAgICAgICAgIDpyZWFkb25seT1cInJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICA6cGF0dGVybj1cInBhdHRlcm5cIlxuICAgICAgICAgICAgICAgIDpjaGVja2VkPVwiY2hlY2tlZFZhbHVlID09PSB2YWx1ZSB8fCBjaGVja2VkXCJcbiAgICAgICAgICAgICAgICA6Y2xhc3M9XCJtZXJnZUNsYXNzZXMoaW5wdXRDbGFzcywgKGludmFsaWRGZWVkYmFjayA/ICdpcy1pbnZhbGlkJyA6ICcnKSlcIlxuICAgICAgICAgICAgICAgIEBjaGFuZ2U9XCIkZW1pdCgnY2hhbmdlJywgJGV2ZW50LnRhcmdldC52YWx1ZSlcIj5cblxuICAgICAgICAgICAgPGxhYmVsIDpmb3I9XCJpZFwiIDpjbGFzcz1cIm1lcmdlQ2xhc3NlcyhsYWJlbENsYXNzLCBjb2xvcmFibGVDbGFzc2VzKVwiPlxuICAgICAgICAgICAgICAgIDxzbG90Pnt7bGFiZWx9fTwvc2xvdD5cbiAgICAgICAgICAgICAgICA8c2xvdCBuYW1lPVwiZmVlZGJhY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgPGZvcm0tZmVlZGJhY2sgdi1pZj1cInZhbGlkRmVlZGJhY2tcIiB2LWh0bWw9XCJ2YWxpZEZlZWRiYWNrXCIgdmFsaWQgLz5cbiAgICAgICAgICAgICAgICAgICAgPGZvcm0tZmVlZGJhY2sgdi1pZj1cImludmFsaWRGZWVkYmFja1wiIHYtaHRtbD1cImludmFsaWRGZWVkYmFja1wiIGludmFsaWQgLz5cbiAgICAgICAgICAgICAgICA8L3Nsb3Q+XG4gICAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICAgICAgICA8bGFiZWwgOmZvcj1cImlkXCIgOmNsYXNzPVwibWVyZ2VDbGFzc2VzKGxhYmVsQ2xhc3MsIGNvbG9yYWJsZUNsYXNzZXMpXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHYtYmluZC1ldmVudHNcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICAgICAgICAgICAgOm5hbWU9XCJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgOmlkPVwiaWRcIlxuICAgICAgICAgICAgICAgICAgICA6dmFsdWU9XCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgIDpyZXF1aXJlZD1cInJlcXVpcmVkXCJcbiAgICAgICAgICAgICAgICAgICAgOmRpc2FibGVkPVwiZGlzYWJsZWQgfHwgcmVhZG9ubHlcIlxuICAgICAgICAgICAgICAgICAgICA6cmVhZG9ubHk9XCJyZWFkb25seVwiXG4gICAgICAgICAgICAgICAgICAgIDpwYXR0ZXJuPVwicGF0dGVyblwiXG4gICAgICAgICAgICAgICAgICAgIDpjaGVja2VkPVwiY2hlY2tlZFZhbHVlID09PSB2YWx1ZSB8fCBjaGVja2VkXCJcbiAgICAgICAgICAgICAgICAgICAgOmNsYXNzPVwibWVyZ2VDbGFzc2VzKGlucHV0Q2xhc3MsIChpbnZhbGlkRmVlZGJhY2sgPyAnaXMtaW52YWxpZCcgOiAnJykpXCJcbiAgICAgICAgICAgICAgICAgICAgQGNoYW5nZT1cIiRlbWl0KCdjaGFuZ2UnLCAkZXZlbnQudGFyZ2V0LnZhbHVlKVwiPlxuXG4gICAgICAgICAgICAgICAgPHNsb3Q+e3tsYWJlbH19PC9zbG90PlxuXG4gICAgICAgICAgICAgICAgPHNsb3QgbmFtZT1cImZlZWRiYWNrXCI+XG4gICAgICAgICAgICAgICAgICAgIDxmb3JtLWZlZWRiYWNrIHYtaWY9XCJ2YWxpZEZlZWRiYWNrXCIgdi1odG1sPVwidmFsaWRGZWVkYmFja1wiIHZhbGlkIC8+XG4gICAgICAgICAgICAgICAgICAgIDxmb3JtLWZlZWRiYWNrIHYtaWY9XCJpbnZhbGlkRmVlZGJhY2tcIiB2LWh0bWw9XCJpbnZhbGlkRmVlZGJhY2tcIiBpbnZhbGlkIC8+XG4gICAgICAgICAgICAgICAgPC9zbG90PlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC90ZW1wbGF0ZT5cblxuICAgICAgICA8c2xvdCBuYW1lPVwiaGVscFwiPlxuICAgICAgICAgICAgPGhlbHAtdGV4dCB2LWlmPVwiaGVscFRleHRcIiB2LWh0bWw9XCJoZWxwVGV4dFwiIC8+XG4gICAgICAgIDwvc2xvdD5cbiAgICA8L2Rpdj5cblxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBIZWxwVGV4dCBmcm9tICcuLi9IZWxwVGV4dCc7XG5pbXBvcnQgRm9ybUZlZWRiYWNrIGZyb20gJy4uL0Zvcm1GZWVkYmFjayc7XG5pbXBvcnQgcHJlZml4IGZyb20gJy4uLy4uL0hlbHBlcnMvUHJlZml4JztcbmltcG9ydCBDb2xvcmFibGUgZnJvbSAnLi4vLi4vTWl4aW5zL0NvbG9yYWJsZSc7XG5pbXBvcnQgRm9ybUNvbnRyb2wgZnJvbSAnLi4vLi4vTWl4aW5zL0Zvcm1Db250cm9sJztcbmltcG9ydCBNZXJnZUNsYXNzZXMgZnJvbSAnLi4vLi4vTWl4aW5zL01lcmdlQ2xhc3Nlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdyYWRpby1maWVsZCcsXG5cbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIEhlbHBUZXh0LFxuICAgICAgICBGb3JtRmVlZGJhY2tcbiAgICB9LFxuXG4gICAgbWl4aW5zOiBbXG4gICAgICAgIENvbG9yYWJsZSxcbiAgICAgICAgRm9ybUNvbnRyb2wsXG4gICAgICAgIE1lcmdlQ2xhc3Nlc1xuICAgIF0sXG5cbiAgICBtb2RlbDoge1xuICAgICAgICBldmVudDogJ2NoYW5nZScsXG4gICAgICAgIHByb3A6ICdjaGVja2VkVmFsdWUnXG4gICAgfSxcblxuICAgIHByb3BzOiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFuIGFycmF5IG9mIGV2ZW50IG5hbWVzIHRoYXQgY29ycmVsYXRlIHdpdGggY2FsbGJhY2sgZnVuY3Rpb25zXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBGdW5jdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgYmluZEV2ZW50czoge1xuICAgICAgICAgICAgdHlwZTogQXJyYXksXG4gICAgICAgICAgICBkZWZhdWx0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbJ2ZvY3VzJywgJ2JsdXInLCAnaW5wdXQnLCAnY2xpY2snLCAna2V5dXAnLCAna2V5ZG93bicsICdwcm9ncmVzcyddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJcyB0aGlzIGEgY3VzdG9tIGVsZW1lbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgY3VzdG9tOiBCb29sZWFuLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNwbGF5IHRoZSBmb3JtIGZpZWxkIGFuZCBsYWJlbCBpbmxpbmVcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IEZ1bmN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBpbmxpbmU6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjaGVja2VkIHZhbHVlc1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBjaGVja2VkOiBCb29sZWFuLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgY2hlY2tlZCB2YWx1ZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBjaGVja2VkVmFsdWU6IFtCb29sZWFuLCBOdW1iZXIsIFN0cmluZywgT2JqZWN0XSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGNsYXNzIG5hbWUgYXNzaWduZWQgdG8gdGhlIGNvbnRyb2wgZWxlbWVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBkZWZhdWx0Q29udHJvbENsYXNzOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0OiAnZm9ybS1jaGVjaydcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgbGFiZWxDbGFzcygpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmVmaXgoJ2xhYmVsJywgdGhpcy5jb250cm9sQ2xhc3MpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGlucHV0Q2xhc3MoKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJlZml4KCdpbnB1dCcsIHRoaXMuY29udHJvbENsYXNzKTtcbiAgICAgICAgfSxcblxuICAgICAgICBpbmxpbmVDbGFzcygpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmVmaXgoJ2lubGluZScsIHRoaXMuY29udHJvbENsYXNzKTtcbiAgICAgICAgfSxcblxuICAgICAgICBjb250cm9sQ2xhc3MoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jdXN0b20gPyAnY3VzdG9tLWNvbnRyb2wnIDogdGhpcy5kZWZhdWx0Q29udHJvbENsYXNzO1xuICAgICAgICB9LFxuXG4gICAgICAgIGN1c3RvbUNvbnRyb2xDbGFzcygpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1c3RvbSA/IHByZWZpeCh0aGlzLiRvcHRpb25zLm5hbWUucmVwbGFjZSgnLWZpZWxkJywgJycpLCAnY3VzdG9tJykgOiAnJztcbiAgICAgICAgfSxcblxuICAgICAgICBzaXplYWJsZUNsYXNzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHByZWZpeCh0aGlzLnNpemUsICdmb3JtLWNvbnRyb2wnKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG5cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IFJhZGlvRmllbGQgZnJvbSAnLi9SYWRpb0ZpZWxkJztcbmltcG9ydCBWdWVJbnN0YWxsZXIgZnJvbSAnLi4vLi4vSGVscGVycy9WdWVJbnN0YWxsZXIvVnVlSW5zdGFsbGVyJztcblxuY29uc3QgcGx1Z2luID0gVnVlSW5zdGFsbGVyLnVzZSh7XG5cbiAgICBpbnN0YWxsKFZ1ZSwgb3B0aW9ucykge1xuICAgICAgICBWdWVJbnN0YWxsZXIuY29tcG9uZW50cyh7XG4gICAgICAgICAgICBSYWRpb0ZpZWxkXG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFJhZGlvRmllbGQ7XG4iLCI8dGVtcGxhdGU+XG5cbiAgICA8ZGl2IDpjbGFzcz1cIm1lcmdlQ2xhc3Nlcyhjb250cm9sQ2xhc3MsIGN1c3RvbUNvbnRyb2xDbGFzcywgc2l6ZWFibGVDbGFzcywgaW5saW5lID8gaW5saW5lQ2xhc3MgOiAnJylcIj5cblxuICAgICAgICA8dGVtcGxhdGUgdi1pZj1cImN1c3RvbSAmJiBpZFwiPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdi1iaW5kLWV2ZW50c1xuICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgOm5hbWU9XCJuYW1lXCJcbiAgICAgICAgICAgICAgICA6aWQ9XCJpZFwiXG4gICAgICAgICAgICAgICAgOnZhbHVlPVwidmFsdWVcIlxuICAgICAgICAgICAgICAgIDpyZXF1aXJlZD1cInJlcXVpcmVkXCJcbiAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCJkaXNhYmxlZCB8fCByZWFkb25seVwiXG4gICAgICAgICAgICAgICAgOnJlYWRvbmx5PVwicmVhZG9ubHlcIlxuICAgICAgICAgICAgICAgIDpwYXR0ZXJuPVwicGF0dGVyblwiXG4gICAgICAgICAgICAgICAgOmNoZWNrZWQ9XCJjaGVja2VkVmFsdWVzLmluZGV4T2YodmFsdWUpICE9PSAtMSB8fCBjaGVja2VkXCJcbiAgICAgICAgICAgICAgICA6Y2xhc3M9XCJtZXJnZUNsYXNzZXMoaW5wdXRDbGFzcywgKGludmFsaWRGZWVkYmFjayA/ICdpcy1pbnZhbGlkJyA6ICcnKSlcIlxuICAgICAgICAgICAgICAgIEBjaGFuZ2U9XCJ1cGRhdGUoJGV2ZW50LnRhcmdldC52YWx1ZSlcIj5cblxuICAgICAgICAgICAgPGxhYmVsIDpmb3I9XCJpZFwiIDpjbGFzcz1cIm1lcmdlQ2xhc3NlcyhsYWJlbENsYXNzLCBjb2xvcmFibGVDbGFzc2VzKVwiPlxuICAgICAgICAgICAgICAgIDxzbG90Pnt7bGFiZWx9fTwvc2xvdD5cbiAgICAgICAgICAgICAgICA8c2xvdCBuYW1lPVwiZmVlZGJhY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgPGZvcm0tZmVlZGJhY2sgdi1pZj1cInZhbGlkRmVlZGJhY2tcIiB2LWh0bWw9XCJ2YWxpZEZlZWRiYWNrXCIgdmFsaWQgLz5cbiAgICAgICAgICAgICAgICAgICAgPGZvcm0tZmVlZGJhY2sgdi1pZj1cImludmFsaWRGZWVkYmFja1wiIHYtaHRtbD1cImludmFsaWRGZWVkYmFja1wiIGludmFsaWQgLz5cbiAgICAgICAgICAgICAgICA8L3Nsb3Q+XG4gICAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgIDwvdGVtcGxhdGU+XG5cbiAgICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgICAgIDxsYWJlbCA6Zm9yPVwiaWRcIiA6Y2xhc3M9XCJtZXJnZUNsYXNzZXMobGFiZWxDbGFzcywgY29sb3JhYmxlQ2xhc3NlcylcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdi1iaW5kLWV2ZW50c1xuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICA6bmFtZT1cIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICA6aWQ9XCJpZFwiXG4gICAgICAgICAgICAgICAgICAgIDp2YWx1ZT1cInZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgOnJlcXVpcmVkPVwicmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCJkaXNhYmxlZCB8fCByZWFkb25seVwiXG4gICAgICAgICAgICAgICAgICAgIDpyZWFkb25seT1cInJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgOnBhdHRlcm49XCJwYXR0ZXJuXCJcbiAgICAgICAgICAgICAgICAgICAgOmNoZWNrZWQ9XCJjaGVja2VkVmFsdWVzLmluZGV4T2YodmFsdWUpICE9PSAtMSB8fCBjaGVja2VkXCJcbiAgICAgICAgICAgICAgICAgICAgOmNsYXNzPVwibWVyZ2VDbGFzc2VzKGlucHV0Q2xhc3MsIChpbnZhbGlkRmVlZGJhY2sgPyAnaXMtaW52YWxpZCcgOiAnJykpXCJcbiAgICAgICAgICAgICAgICAgICAgQGNoYW5nZT1cInVwZGF0ZSgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiPlxuXG4gICAgICAgICAgICAgICAgPHNsb3Q+e3tsYWJlbH19PC9zbG90PlxuXG4gICAgICAgICAgICAgICAgPHNsb3QgbmFtZT1cImZlZWRiYWNrXCI+XG4gICAgICAgICAgICAgICAgICAgIDxmb3JtLWZlZWRiYWNrIHYtaWY9XCJ2YWxpZEZlZWRiYWNrXCIgdi1odG1sPVwidmFsaWRGZWVkYmFja1wiIHZhbGlkIC8+XG4gICAgICAgICAgICAgICAgICAgIDxmb3JtLWZlZWRiYWNrIHYtaWY9XCJpbnZhbGlkRmVlZGJhY2tcIiB2LWh0bWw9XCJpbnZhbGlkRmVlZGJhY2tcIiBpbnZhbGlkIC8+XG4gICAgICAgICAgICAgICAgPC9zbG90PlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC90ZW1wbGF0ZT5cblxuICAgICAgICA8c2xvdCBuYW1lPVwiaGVscFwiPlxuICAgICAgICAgICAgPGhlbHAtdGV4dCB2LWlmPVwiaGVscFRleHRcIiB2LWh0bWw9XCJoZWxwVGV4dFwiIC8+XG4gICAgICAgIDwvc2xvdD5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5cbmltcG9ydCBSYWRpb0ZpZWxkIGZyb20gJy4uL1JhZGlvRmllbGQnO1xuaW1wb3J0IE1lcmdlQ2xhc3NlcyBmcm9tICcuLi8uLi9NaXhpbnMvTWVyZ2VDbGFzc2VzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ2NoZWNrYm94LWZpZWxkJyxcblxuICAgIGV4dGVuZHM6IFJhZGlvRmllbGQsXG5cbiAgICBtaXhpbnM6IFtcbiAgICAgICAgTWVyZ2VDbGFzc2VzXG4gICAgXSxcblxuICAgIG1vZGVsOiB7XG4gICAgICAgIGV2ZW50OiAnY2hhbmdlJyxcbiAgICAgICAgcHJvcDogJ2NoZWNrZWRWYWx1ZXMnXG4gICAgfSxcblxuICAgIHByb3BzOiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjaGVja2VkIHZhbHVlc1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBjaGVja2VkVmFsdWVzOiB7XG4gICAgICAgICAgICB0eXBlOiBBcnJheSxcbiAgICAgICAgICAgIGRlZmF1bHQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgbWV0aG9kczoge1xuXG4gICAgICAgIHVwZGF0ZSh2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgY2hlY2tlZCA9IHRoaXMuY2hlY2tlZFZhbHVlcy5zbGljZSgwKTtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jaGVja2VkVmFsdWVzLmluZGV4T2YodmFsdWUpO1xuXG4gICAgICAgICAgICBpZihpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjaGVja2VkLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2hlY2tlZC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCBjaGVja2VkKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG48L3NjcmlwdD5cbiIsImltcG9ydCBDaGVja2JveEZpZWxkIGZyb20gJy4vQ2hlY2tib3hGaWVsZCc7XG5pbXBvcnQgVnVlSW5zdGFsbGVyIGZyb20gJy4uLy4uL0hlbHBlcnMvVnVlSW5zdGFsbGVyL1Z1ZUluc3RhbGxlcic7XG5cbmNvbnN0IHBsdWdpbiA9IFZ1ZUluc3RhbGxlci51c2Uoe1xuXG4gICAgaW5zdGFsbChWdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgVnVlSW5zdGFsbGVyLmNvbXBvbmVudHMoe1xuICAgICAgICAgICAgQ2hlY2tib3hGaWVsZFxuICAgICAgICB9KTtcbiAgICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDaGVja2JveEZpZWxkO1xuIiwiPHRlbXBsYXRlPlxuXG4gICAgPGRpdiBjbGFzcz1cImRyb3B6b25lXCIgOmNsYXNzPVwieydpcy1kcmFnZ2luZyc6IGlzRHJhZ2dpbmd9XCIgQGRyb3AucHJldmVudD1cIm9uRHJvcFwiIEBkcmFnb3Zlci5wcmV2ZW50PVwib25EcmFnb3ZlclwiIEBkcmFnZW50ZXIucHJldmVudD1cIm9uRHJhZ2VudGVyXCIgQGRyYWdsZWF2ZS5wcmV2ZW50PVwib25EcmFnbGVhdmVcIj5cbiAgICAgICAgPHNsb3QgbmFtZT1cInBsYWNlaG9sZGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZHJvcHpvbmUtcGxhY2Vob2xkZXIgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8Y2FyZD5cbiAgICAgICAgICAgICAgICAgICAgPGNhcmQtYm9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzcz1cIm10LTRcIj5EcmFnICYgRHJvcDwvaDE+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5EcmFnIGFuZCBkcm9wIHlvdXIgZmlsZXMgaGVyZSB0byB1cGxvYWQgdGhlbSE8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXQtM1wiPjxpIGNsYXNzPVwiZmEgZmEtaW1hZ2VcIi8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvY2FyZC1ib2R5PlxuICAgICAgICAgICAgICAgIDwvY2FyZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3Nsb3Q+XG4gICAgICAgIDxzbG90Lz5cbiAgICA8L2Rpdj5cblxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBDYXJkIGZyb20gJy4uL0NhcmQnO1xuaW1wb3J0IENhcmRCb2R5IGZyb20gJy4uL0NhcmQvQ2FyZEJvZHknO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnZHJvcHpvbmUnLFxuXG4gICAgY29tcG9uZW50czoge1xuICAgICAgICBDYXJkLFxuICAgICAgICBDYXJkQm9keVxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgb25Ecm9wKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2Ryb3AnLCBldmVudCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25EcmFnb3ZlcihldmVudCkge1xuICAgICAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2RyYWdvdmVyJywgZXZlbnQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uRHJhZ2VudGVyKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnZHJhZ2VudGVyJywgZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5vbkRyYWdvdmVyKGV2ZW50KTtcbiAgICAgICAgfSxcblxuICAgICAgICBvbkRyYWdsZWF2ZShldmVudCkge1xuICAgICAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdkcmFnbGVhdmUnLCBldmVudCk7XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmlsZXM6IG51bGwsXG4gICAgICAgICAgICBpc0RyYWdnaW5nOiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG59XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCI+XG4uZHJvcHpvbmUge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgIHAge1xuICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgfVxuXG4gICAgLmZhLWltYWdlIHtcbiAgICAgICAgZm9udC1zaXplOiAxMDBweDtcbiAgICB9XG5cbiAgICAuZHJvcHpvbmUtcGxhY2Vob2xkZXIge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgei1pbmRleDogMjtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgfVxuXG4gICAgJi5pcy1kcmFnZ2luZyAuZHJvcHpvbmUtcGxhY2Vob2xkZXIge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9XG59XG48L3N0eWxlPlxuIiwiaW1wb3J0IERyb3B6b25lIGZyb20gJy4vRHJvcHpvbmUnO1xuaW1wb3J0IFZ1ZUluc3RhbGxlciBmcm9tICcuLi8uLi9IZWxwZXJzL1Z1ZUluc3RhbGxlci9WdWVJbnN0YWxsZXInO1xuXG5jb25zdCBwbHVnaW4gPSBWdWVJbnN0YWxsZXIudXNlKHtcblxuICAgIGluc3RhbGwoVnVlLCBvcHRpb25zKSB7XG4gICAgICAgIFZ1ZUluc3RhbGxlci5jb21wb25lbnRzKHtcbiAgICAgICAgICAgIERyb3B6b25lXG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IERyb3B6b25lO1xuIiwiaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL0Z1bmN0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlYWRGaWxlKGZpbGUsIHByb2dyZXNzKSB7XG4gICAgaWYoIShmaWxlIGluc3RhbmNlb2YgRmlsZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZmlyc3QgYXJndW1lbnQgYmUgYW4gaW5zdGFuY2Ugb2YgRmlsZSBvYmplY3QuJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXI7XG5cbiAgICAgICAgaWYoaXNGdW5jdGlvbihwcm9ncmVzcykpIHtcbiAgICAgICAgICAgIHJlYWRlci5vbnByb2dyZXNzID0gZSA9PiBwcm9ncmVzcyhlLCByZWFkZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGUgPT4gcmVzb2x2ZShlKTtcbiAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSBlID0+IHJlamVjdChlKTtcbiAgICAgICAgcmVhZGVyLm9uYWJvcnQgPSBlID0+IHJlamVjdChlKTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgfSk7XG59XG4iLCI8dGVtcGxhdGU+XG5cbiAgICA8ZGl2IGNsYXNzPVwiZmlsZS1wcmV2aWV3XCIgOmNsYXNzPVwieydoYXMtaW1hZ2UnOiAhIWltYWdlfVwiPlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmaWxlLXByZXZpZXctaW5uZXJcIj5cblxuICAgICAgICAgICAgPGEgdi1pZj1cIiFoaWRlQ2xvc2VcIiBocmVmPVwiI1wiIGNsYXNzPVwiZmlsZS1wcmV2aWV3LWNsb3NlXCIgQGNsaWNrLnByZXZlbnQ9XCIkZW1pdCgnY2xvc2UnLCBmaWxlKVwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtdGltZXMtY2lyY2xlXCI+PC9pPlxuICAgICAgICAgICAgPC9hPlxuXG4gICAgICAgICAgICA8ZGl2IHYtaWY9XCIhIXBvc3RlciB8fCBpc0ltYWdlXCIgY2xhc3M9XCJmaWxlLXByZXZpZXctaW1hZ2VcIj5cbiAgICAgICAgICAgICAgICA8aW1nIHYtaWY9XCIhIXBvc3RlciB8fCAhIWltYWdlXCIgOnNyYz1cInBvc3RlciB8fCBpbWFnZVwiIGNsYXNzPVwiZmlsZS1wcmV2aWV3LXRodW1ibmFpbFwiIEBsb2FkPVwib25Mb2FkXCIvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgdi1lbHNlIHYtcmVhZHk9XCIoKSA9PiB0aGlzLiRlbWl0KCdsb2FkZWQnKVwiIGNsYXNzPVwiZmlsZS1wcmV2aWV3LWljb25cIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhXCIgOmNsYXNzPVwieydmYS1maWxlLXZpZGVvLW8nOiBpc1ZpZGVvLCAnZmEtZmlsZS1vJzogIWlzVmlkZW99XCI+PC9pPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxwcm9ncmVzcy1iYXJcbiAgICAgICAgICAgICAgICB2LWlmPVwicHJvZ3Jlc3MgfHwgaXNJbWFnZSAmJiBsb2FkZWQgIT09IGZhbHNlXCJcbiAgICAgICAgICAgICAgICB2LXJlYWR5PVwicmVhZEZpbGVcIlxuICAgICAgICAgICAgICAgIDp2YWx1ZT1cInByb2dyZXNzIHx8IGxvYWRlZCB8fCAwXCJcbiAgICAgICAgICAgICAgICA6aGVpZ2h0PVwiMTBcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwibXQtM1wiLz5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpbGUtcHJldmlldy1maWxlbmFtZVwiIHYtaHRtbD1cIm5hbWVcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWxlLXByZXZpZXctZmlsZXNpemVcIj4oe3tzaXplfX0pPC9kaXY+XG4gICAgICAgIDxkaXY+XG5cbiAgICA8L2Rpdj5cblxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCBQcm9ncmVzc0JhciBmcm9tICcuLi9Qcm9ncmVzc0Jhcic7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vLi4vSGVscGVycy9GdW5jdGlvbnMnO1xuaW1wb3J0IHJlYWRGaWxlIGZyb20gJy4uLy4uL0hlbHBlcnMvUmVhZEZpbGUvUmVhZEZpbGUnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnZmlsZS1wcmV2aWV3JyxcblxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgUHJvZ3Jlc3NCYXJcbiAgICB9LFxuXG4gICAgZGlyZWN0aXZlczoge1xuICAgICAgICByZWFkeToge1xuICAgICAgICAgICAgaW5zZXJ0ZWQoZWwsIGJpbmRpbmcsIHZub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYoaXNGdW5jdGlvbihiaW5kaW5nLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB2bm9kZS5jb250ZXh0LiRuZXh0VGljayhiaW5kaW5nLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSGlkZSB0aGUgY2xvc2UgYnV0dG9uIGZvciB0aGUgcHJldmlld1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgT2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBoaWRlQ2xvc2U6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB1cGxvYWRlZCBGaWxlIG9iamVjdFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgT2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBmaWxlOiB7XG4gICAgICAgICAgICB0eXBlOiBbT2JqZWN0LCBGaWxlXSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFuIGltYWdlIFVSTCB0byBpbnN0ZWFkIG9mIHVzaW5nIHRoZSBmaWxlIHJlYWRlci5cbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBwb3N0ZXI6IFN0cmluZyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUHJvZ3Jlc3MgdGhhdCBjYW4gYmUgcGFzc2VkIGZyb20gYSBwYXJlbnQgY29tcGFyZW50LCBmb3IgaW5zdGFuY2VcbiAgICAgICAgICogdXNlIHRvIHNob3cgYW4gYWpheCByZXF1ZXN0IHdpdGggYSBzaW5nbGUgcHJvZ3Jlc3MgYmFyLiBJZiBhIHByb2dyZXNzXG4gICAgICAgICAqIHZhbHVlIGlzIHBhc3NlZCwgZXZlbiBhIDAsIHRoZSBwcm9ncmVzcyBiYXIgd2lsbCBub3QgYmUgdXNlZCB0byBzaG93XG4gICAgICAgICAqIHRoZSBwcm9ncmVzcyBvZiB0aGUgZmlsZSByZWFkZXIuXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgcHJvZ3Jlc3M6IHtcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgICAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZFxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHRoZSBmaWxlIG5hbWVcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgbmFtZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbGUgaW5zdGFuY2VvZiBGaWxlID8gdGhpcy5maWxlLm5hbWUgOiB0aGlzLmZpbGUub3JpZ19maWxlbmFtZTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHRoZSBmaWxlIGV4dGVuc2lvblxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBleHRlbnNpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWxlIGluc3RhbmNlb2YgRmlsZSA/IHRoaXMuZmlsZS5uYW1lLnNwbGl0KCcuJykucG9wKCkudG9Mb3dlckNhc2UoKSA6IHRoaXMuZmlsZS5leHRlbnNpb247XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCB0aGUgZmlsZSBmb3JtYXR0ZWQgc2l6ZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBzaXplKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnl0ZXNUb1NpemUodGhpcy5maWxlLnNpemUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgdGhlIGZpbGUgdHlwZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICB0eXBlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsZSBpbnN0YW5jZW9mIEZpbGUgPyB0aGlzLmZpbGUudHlwZSA6IHRoaXMuZmlsZS5taW1lO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayB0byBzZWUgaWYgdGhlIGZpbGUgaXMgYW4gaW1hZ2UuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIGlzSW1hZ2UoKSB7XG4gICAgICAgICAgICByZXR1cm4gISF0aGlzLnR5cGUubWF0Y2goL15pbWFnZS8pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayB0byBzZWUgaWYgdGhlIGZpbGUgaXMgYSB2aWRlby5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgaXNWaWRlbygpIHtcbiAgICAgICAgICAgIHJldHVybiAhIXRoaXMudHlwZS5tYXRjaCgvXnZpZGVvLyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCB0aGUgbGFzdCB0aW1lIHRoZSBmaWxlIHdhcyBtb2RpZmllZCAoYXMgdGltZXN0YW1wKVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBsYXN0TW9kaWZpZWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWxlIGluc3RhbmNlb2YgRmlsZSA/IHRoaXMuZmlsZS5sYXN0TW9kaWZpZWQgOiBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgdGhlIGxhc3QgdGltZSB0aGUgZmlsZSB3YXMgbW9kaWZpZWQgKGFzIERhdGUpXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIGxhc3RNb2RpZmllZERhdGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWxlIGluc3RhbmNlb2YgRmlsZSA/IHRoaXMuZmlsZS5sYXN0TW9kaWZpZWREYXRlIDogbnVsbDtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcblxuICAgICAgICByZWFkRmlsZSgpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuZmlsZSBpbnN0YW5jZW9mIEZpbGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IG1vbWVudCgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSAwO1xuXG4gICAgICAgICAgICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZWFkRmlsZSh0aGlzLmZpbGUsIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZS5sZW5ndGhDb21wdXRhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgncHJvZ3Jlc3MnLCB0aGlzLmxvYWRlZCA9IHBhcnNlSW50KChlLmxvYWRlZCAvIGUudG90YWwpICogMTAwLCAxMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3JlYWQnLCBldmVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDUwMCAtIG1vbWVudCgpLmRpZmYoc3RhcnQpKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnZXJyb3InLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgXHRieXRlc1RvU2l6ZTogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICBcdFx0dmFyIHNpemVzID0gWydCeXRlcycsICdLQicsICdNQicsICdHQicsICdUQiddO1xuICAgIFx0XHRpZiAoYnl0ZXMgPT0gMCkgcmV0dXJuICcwIEJ5dGUnO1xuICAgIFx0XHR2YXIgaSA9IHBhcnNlSW50KE1hdGguZmxvb3IoTWF0aC5sb2coYnl0ZXMpIC8gTWF0aC5sb2coMTAyNCkpKTtcbiAgICBcdFx0cmV0dXJuIE1hdGgucm91bmQoYnl0ZXMgLyBNYXRoLnBvdygxMDI0LCBpKSwgMikgKyAnICcgKyBzaXplc1tpXTtcbiAgICBcdH0sXG5cbiAgICAgICAgb25Mb2FkKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdsb2FkZWQnKTtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbWFnZTogdGhpcy5maWxlLnVybCxcbiAgICAgICAgICAgIGxvYWRlZDogdGhpcy5maWxlIGluc3RhbmNlb2YgRmlsZSA/IDAgOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICB9XG5cbn1cblxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuJGZpbGUtcHJldmlldy1jbG9zZS13aWR0aDogMXJlbSAqIDI7XG4kZmlsZS1wcmV2aWV3LWNsb3NlLWhlaWdodDogMXJlbSAqIDI7XG5cbi5maWxlLXByZXZpZXcge1xuICAgIHdpZHRoOiAxMDAlO1xuXG4gICAgLmZpbGUtcHJldmlldy1pbm5lciB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB9XG5cbiAgICAuZmlsZS1wcmV2aWV3LWNsb3NlIHtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgd2lkdGg6IDI0cHg7XG4gICAgICAgIGhlaWdodDogMjRweDtcbiAgICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMzMlLCAtMzMlKTtcblxuICAgICAgICBpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC5maWxlLXByZXZpZXctaWNvbiB7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgZm9udC1zaXplOiA2MHB4O1xuICAgICAgICBwYWRkaW5nOiAxcmVtO1xuICAgIH1cblxuICAgIC5maWxlLXByZXZpZXctdGh1bWJuYWlsIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcbiAgICB9XG5cbiAgICAuZmlsZS1wcmV2aWV3LWZpbGVuYW1lIHtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICB9XG5cbiAgICAuZmlsZS1wcmV2aWV3LWZpbGVuYW1lLFxuICAgIC5maWxlLXByZXZpZXctZmlsZXNpemUge1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgfVxuXG59XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgRmlsZVByZXZpZXcgZnJvbSAnLi9GaWxlUHJldmlldyc7XG5pbXBvcnQgVnVlSW5zdGFsbGVyIGZyb20gJy4uLy4uL0hlbHBlcnMvVnVlSW5zdGFsbGVyL1Z1ZUluc3RhbGxlcic7XG5cbmNvbnN0IHBsdWdpbiA9IFZ1ZUluc3RhbGxlci51c2Uoe1xuXG4gICAgaW5zdGFsbChWdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgVnVlSW5zdGFsbGVyLmNvbXBvbmVudHMoe1xuICAgICAgICAgICAgRmlsZVByZXZpZXdcbiAgICAgICAgfSk7XG4gICAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgRmlsZVByZXZpZXc7XG4iLCI8dGVtcGxhdGU+XG5cbiAgICA8Y29tcG9uZW50XG4gICAgICAgIDpuYW1lPVwibmFtZVwiXG4gICAgICAgIDppZD1cImlkXCJcbiAgICAgICAgOmlzPVwiIXNlbGVjdCA/ICdpbnB1dCcgOiAnc2VsZWN0J1wiXG4gICAgICAgIDp0eXBlPVwiIXNlbGVjdCA/IHR5cGUgOiBmYWxzZVwiXG4gICAgICAgIDp2YWx1ZT1cInZhbHVlXCJcbiAgICAgICAgOnBhdHRlcm49XCJwYXR0ZXJuXCJcbiAgICAgICAgOnJlcXVpcmVkPVwicmVxdWlyZWRcIlxuICAgICAgICA6cmVhZG9ubHk9XCJyZWFkb25seVwiXG4gICAgICAgIDpwbGFjZWhvbGRlcj1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgOmRpc2FibGVkPVwiZGlzYWJsZWQgfHwgcmVhZG9ubHlcIlxuICAgICAgICA6Y2xhc3M9XCJtZXJnZUNsYXNzZXMoY29udHJvbENsYXNzZXMsIGNvbG9yYWJsZUNsYXNzZXMpXCJcbiAgICAgICAgOmFyaWEtbGFiZWw9XCJsYWJlbFwiXG4gICAgICAgIDphcmlhLWRlc2NyaWJlZGJ5PVwiaWRcIlxuICAgICAgICB2LWJpbmQtZXZlbnRzPVwiYmluZEV2ZW50c1wiLz5cblxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cblxuaW1wb3J0IENvbG9yYWJsZSBmcm9tICcuLi8uLi9NaXhpbnMvQ29sb3JhYmxlJztcbmltcG9ydCBGb3JtQ29udHJvbCBmcm9tICcuLi8uLi9NaXhpbnMvRm9ybUNvbnRyb2wnO1xuaW1wb3J0IE1lcmdlQ2xhc3NlcyBmcm9tICcuLi8uLi9NaXhpbnMvTWVyZ2VDbGFzc2VzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ2Zvcm0tY29udHJvbCcsXG5cbiAgICBtaXhpbnM6IFtcbiAgICAgICAgQ29sb3JhYmxlLFxuICAgICAgICBGb3JtQ29udHJvbCxcbiAgICAgICAgTWVyZ2VDbGFzc2VzXG4gICAgXSxcblxuICAgIHByb3BzOiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElzIHRoZSBlbGVtZW50IGEgc2VsZWN0P1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBzZWxlY3Q6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB0eXBlIGF0dHJpYnV0ZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0OiAndGV4dCdcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG5cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IEZvcm1Db250cm9sIGZyb20gJy4vRm9ybUNvbnRyb2wnO1xuaW1wb3J0IFZ1ZUluc3RhbGxlciBmcm9tICcuLi8uLi9IZWxwZXJzL1Z1ZUluc3RhbGxlci9WdWVJbnN0YWxsZXInO1xuXG5jb25zdCBwbHVnaW4gPSBWdWVJbnN0YWxsZXIudXNlKHtcblxuICAgIGluc3RhbGwoVnVlLCBvcHRpb25zKSB7XG4gICAgICAgIFZ1ZUluc3RhbGxlci5jb21wb25lbnRzKHtcbiAgICAgICAgICAgIEZvcm1Db250cm9sXG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEZvcm1Db250cm9sO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBXM0MgU09GVFdBUkUgQU5EIERPQ1VNRU5UIE5PVElDRSBBTkQgTElDRU5TRS5cbiAqXG4gKiAgaHR0cHM6Ly93d3cudzMub3JnL0NvbnNvcnRpdW0vTGVnYWwvMjAxNS9jb3B5cmlnaHQtc29mdHdhcmUtYW5kLWRvY3VtZW50XG4gKlxuICovXG5cbihmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50KSB7XG4ndXNlIHN0cmljdCc7XG5cblxuLy8gRXhpdHMgZWFybHkgaWYgYWxsIEludGVyc2VjdGlvbk9ic2VydmVyIGFuZCBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5XG4vLyBmZWF0dXJlcyBhcmUgbmF0aXZlbHkgc3VwcG9ydGVkLlxuaWYgKCdJbnRlcnNlY3Rpb25PYnNlcnZlcicgaW4gd2luZG93ICYmXG4gICAgJ0ludGVyc2VjdGlvbk9ic2VydmVyRW50cnknIGluIHdpbmRvdyAmJlxuICAgICdpbnRlcnNlY3Rpb25SYXRpbycgaW4gd2luZG93LkludGVyc2VjdGlvbk9ic2VydmVyRW50cnkucHJvdG90eXBlKSB7XG5cbiAgLy8gTWluaW1hbCBwb2x5ZmlsbCBmb3IgRWRnZSAxNSdzIGxhY2sgb2YgYGlzSW50ZXJzZWN0aW5nYFxuICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS93M2MvSW50ZXJzZWN0aW9uT2JzZXJ2ZXIvaXNzdWVzLzIxMVxuICBpZiAoISgnaXNJbnRlcnNlY3RpbmcnIGluIHdpbmRvdy5JbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5LnByb3RvdHlwZSkpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LkludGVyc2VjdGlvbk9ic2VydmVyRW50cnkucHJvdG90eXBlLFxuICAgICAgJ2lzSW50ZXJzZWN0aW5nJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVyc2VjdGlvblJhdGlvID4gMDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm47XG59XG5cblxuLyoqXG4gKiBBbiBJbnRlcnNlY3Rpb25PYnNlcnZlciByZWdpc3RyeS4gVGhpcyByZWdpc3RyeSBleGlzdHMgdG8gaG9sZCBhIHN0cm9uZ1xuICogcmVmZXJlbmNlIHRvIEludGVyc2VjdGlvbk9ic2VydmVyIGluc3RhbmNlcyBjdXJyZW50bHkgb2JzZXJ2aW5nIGEgdGFyZ2V0XG4gKiBlbGVtZW50LiBXaXRob3V0IHRoaXMgcmVnaXN0cnksIGluc3RhbmNlcyB3aXRob3V0IGFub3RoZXIgcmVmZXJlbmNlIG1heSBiZVxuICogZ2FyYmFnZSBjb2xsZWN0ZWQuXG4gKi9cbnZhciByZWdpc3RyeSA9IFtdO1xuXG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgZ2xvYmFsIEludGVyc2VjdGlvbk9ic2VydmVyRW50cnkgY29uc3RydWN0b3IuXG4gKiBodHRwczovL3czYy5naXRodWIuaW8vSW50ZXJzZWN0aW9uT2JzZXJ2ZXIvI2ludGVyc2VjdGlvbi1vYnNlcnZlci1lbnRyeVxuICogQHBhcmFtIHtPYmplY3R9IGVudHJ5IEEgZGljdGlvbmFyeSBvZiBpbnN0YW5jZSBwcm9wZXJ0aWVzLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIEludGVyc2VjdGlvbk9ic2VydmVyRW50cnkoZW50cnkpIHtcbiAgdGhpcy50aW1lID0gZW50cnkudGltZTtcbiAgdGhpcy50YXJnZXQgPSBlbnRyeS50YXJnZXQ7XG4gIHRoaXMucm9vdEJvdW5kcyA9IGVudHJ5LnJvb3RCb3VuZHM7XG4gIHRoaXMuYm91bmRpbmdDbGllbnRSZWN0ID0gZW50cnkuYm91bmRpbmdDbGllbnRSZWN0O1xuICB0aGlzLmludGVyc2VjdGlvblJlY3QgPSBlbnRyeS5pbnRlcnNlY3Rpb25SZWN0IHx8IGdldEVtcHR5UmVjdCgpO1xuICB0aGlzLmlzSW50ZXJzZWN0aW5nID0gISFlbnRyeS5pbnRlcnNlY3Rpb25SZWN0O1xuXG4gIC8vIENhbGN1bGF0ZXMgdGhlIGludGVyc2VjdGlvbiByYXRpby5cbiAgdmFyIHRhcmdldFJlY3QgPSB0aGlzLmJvdW5kaW5nQ2xpZW50UmVjdDtcbiAgdmFyIHRhcmdldEFyZWEgPSB0YXJnZXRSZWN0LndpZHRoICogdGFyZ2V0UmVjdC5oZWlnaHQ7XG4gIHZhciBpbnRlcnNlY3Rpb25SZWN0ID0gdGhpcy5pbnRlcnNlY3Rpb25SZWN0O1xuICB2YXIgaW50ZXJzZWN0aW9uQXJlYSA9IGludGVyc2VjdGlvblJlY3Qud2lkdGggKiBpbnRlcnNlY3Rpb25SZWN0LmhlaWdodDtcblxuICAvLyBTZXRzIGludGVyc2VjdGlvbiByYXRpby5cbiAgaWYgKHRhcmdldEFyZWEpIHtcbiAgICAvLyBSb3VuZCB0aGUgaW50ZXJzZWN0aW9uIHJhdGlvIHRvIGF2b2lkIGZsb2F0aW5nIHBvaW50IG1hdGggaXNzdWVzOlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS93M2MvSW50ZXJzZWN0aW9uT2JzZXJ2ZXIvaXNzdWVzLzMyNFxuICAgIHRoaXMuaW50ZXJzZWN0aW9uUmF0aW8gPSBOdW1iZXIoKGludGVyc2VjdGlvbkFyZWEgLyB0YXJnZXRBcmVhKS50b0ZpeGVkKDQpKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBJZiBhcmVhIGlzIHplcm8gYW5kIGlzIGludGVyc2VjdGluZywgc2V0cyB0byAxLCBvdGhlcndpc2UgdG8gMFxuICAgIHRoaXMuaW50ZXJzZWN0aW9uUmF0aW8gPSB0aGlzLmlzSW50ZXJzZWN0aW5nID8gMSA6IDA7XG4gIH1cbn1cblxuXG4vKipcbiAqIENyZWF0ZXMgdGhlIGdsb2JhbCBJbnRlcnNlY3Rpb25PYnNlcnZlciBjb25zdHJ1Y3Rvci5cbiAqIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby9JbnRlcnNlY3Rpb25PYnNlcnZlci8jaW50ZXJzZWN0aW9uLW9ic2VydmVyLWludGVyZmFjZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgYWZ0ZXIgaW50ZXJzZWN0aW9uXG4gKiAgICAgY2hhbmdlcyBoYXZlIHF1ZXVlZC4gVGhlIGZ1bmN0aW9uIGlzIG5vdCBpbnZva2VkIGlmIHRoZSBxdWV1ZSBoYXNcbiAqICAgICBiZWVuIGVtcHRpZWQgYnkgY2FsbGluZyB0aGUgYHRha2VSZWNvcmRzYCBtZXRob2QuXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdF9vcHRpb25zIE9wdGlvbmFsIGNvbmZpZ3VyYXRpb24gb3B0aW9ucy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBJbnRlcnNlY3Rpb25PYnNlcnZlcihjYWxsYmFjaywgb3B0X29wdGlvbnMpIHtcblxuICB2YXIgb3B0aW9ucyA9IG9wdF9vcHRpb25zIHx8IHt9O1xuXG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5yb290ICYmIG9wdGlvbnMucm9vdC5ub2RlVHlwZSAhPSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdyb290IG11c3QgYmUgYW4gRWxlbWVudCcpO1xuICB9XG5cbiAgLy8gQmluZHMgYW5kIHRocm90dGxlcyBgdGhpcy5fY2hlY2tGb3JJbnRlcnNlY3Rpb25zYC5cbiAgdGhpcy5fY2hlY2tGb3JJbnRlcnNlY3Rpb25zID0gdGhyb3R0bGUoXG4gICAgICB0aGlzLl9jaGVja0ZvckludGVyc2VjdGlvbnMuYmluZCh0aGlzKSwgdGhpcy5USFJPVFRMRV9USU1FT1VUKTtcblxuICAvLyBQcml2YXRlIHByb3BlcnRpZXMuXG4gIHRoaXMuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG4gIHRoaXMuX29ic2VydmF0aW9uVGFyZ2V0cyA9IFtdO1xuICB0aGlzLl9xdWV1ZWRFbnRyaWVzID0gW107XG4gIHRoaXMuX3Jvb3RNYXJnaW5WYWx1ZXMgPSB0aGlzLl9wYXJzZVJvb3RNYXJnaW4ob3B0aW9ucy5yb290TWFyZ2luKTtcblxuICAvLyBQdWJsaWMgcHJvcGVydGllcy5cbiAgdGhpcy50aHJlc2hvbGRzID0gdGhpcy5faW5pdFRocmVzaG9sZHMob3B0aW9ucy50aHJlc2hvbGQpO1xuICB0aGlzLnJvb3QgPSBvcHRpb25zLnJvb3QgfHwgbnVsbDtcbiAgdGhpcy5yb290TWFyZ2luID0gdGhpcy5fcm9vdE1hcmdpblZhbHVlcy5tYXAoZnVuY3Rpb24obWFyZ2luKSB7XG4gICAgcmV0dXJuIG1hcmdpbi52YWx1ZSArIG1hcmdpbi51bml0O1xuICB9KS5qb2luKCcgJyk7XG59XG5cblxuLyoqXG4gKiBUaGUgbWluaW11bSBpbnRlcnZhbCB3aXRoaW4gd2hpY2ggdGhlIGRvY3VtZW50IHdpbGwgYmUgY2hlY2tlZCBmb3JcbiAqIGludGVyc2VjdGlvbiBjaGFuZ2VzLlxuICovXG5JbnRlcnNlY3Rpb25PYnNlcnZlci5wcm90b3R5cGUuVEhST1RUTEVfVElNRU9VVCA9IDEwMDtcblxuXG4vKipcbiAqIFRoZSBmcmVxdWVuY3kgaW4gd2hpY2ggdGhlIHBvbHlmaWxsIHBvbGxzIGZvciBpbnRlcnNlY3Rpb24gY2hhbmdlcy5cbiAqIHRoaXMgY2FuIGJlIHVwZGF0ZWQgb24gYSBwZXIgaW5zdGFuY2UgYmFzaXMgYW5kIG11c3QgYmUgc2V0IHByaW9yIHRvXG4gKiBjYWxsaW5nIGBvYnNlcnZlYCBvbiB0aGUgZmlyc3QgdGFyZ2V0LlxuICovXG5JbnRlcnNlY3Rpb25PYnNlcnZlci5wcm90b3R5cGUuUE9MTF9JTlRFUlZBTCA9IG51bGw7XG5cbi8qKlxuICogVXNlIGEgbXV0YXRpb24gb2JzZXJ2ZXIgb24gdGhlIHJvb3QgZWxlbWVudFxuICogdG8gZGV0ZWN0IGludGVyc2VjdGlvbiBjaGFuZ2VzLlxuICovXG5JbnRlcnNlY3Rpb25PYnNlcnZlci5wcm90b3R5cGUuVVNFX01VVEFUSU9OX09CU0VSVkVSID0gdHJ1ZTtcblxuXG4vKipcbiAqIFN0YXJ0cyBvYnNlcnZpbmcgYSB0YXJnZXQgZWxlbWVudCBmb3IgaW50ZXJzZWN0aW9uIGNoYW5nZXMgYmFzZWQgb25cbiAqIHRoZSB0aHJlc2hvbGRzIHZhbHVlcy5cbiAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IFRoZSBET00gZWxlbWVudCB0byBvYnNlcnZlLlxuICovXG5JbnRlcnNlY3Rpb25PYnNlcnZlci5wcm90b3R5cGUub2JzZXJ2ZSA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICB2YXIgaXNUYXJnZXRBbHJlYWR5T2JzZXJ2ZWQgPSB0aGlzLl9vYnNlcnZhdGlvblRhcmdldHMuc29tZShmdW5jdGlvbihpdGVtKSB7XG4gICAgcmV0dXJuIGl0ZW0uZWxlbWVudCA9PSB0YXJnZXQ7XG4gIH0pO1xuXG4gIGlmIChpc1RhcmdldEFscmVhZHlPYnNlcnZlZCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICghKHRhcmdldCAmJiB0YXJnZXQubm9kZVR5cGUgPT0gMSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3RhcmdldCBtdXN0IGJlIGFuIEVsZW1lbnQnKTtcbiAgfVxuXG4gIHRoaXMuX3JlZ2lzdGVySW5zdGFuY2UoKTtcbiAgdGhpcy5fb2JzZXJ2YXRpb25UYXJnZXRzLnB1c2goe2VsZW1lbnQ6IHRhcmdldCwgZW50cnk6IG51bGx9KTtcbiAgdGhpcy5fbW9uaXRvckludGVyc2VjdGlvbnMoKTtcbiAgdGhpcy5fY2hlY2tGb3JJbnRlcnNlY3Rpb25zKCk7XG59O1xuXG5cbi8qKlxuICogU3RvcHMgb2JzZXJ2aW5nIGEgdGFyZ2V0IGVsZW1lbnQgZm9yIGludGVyc2VjdGlvbiBjaGFuZ2VzLlxuICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgVGhlIERPTSBlbGVtZW50IHRvIG9ic2VydmUuXG4gKi9cbkludGVyc2VjdGlvbk9ic2VydmVyLnByb3RvdHlwZS51bm9ic2VydmUgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgdGhpcy5fb2JzZXJ2YXRpb25UYXJnZXRzID1cbiAgICAgIHRoaXMuX29ic2VydmF0aW9uVGFyZ2V0cy5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xuXG4gICAgcmV0dXJuIGl0ZW0uZWxlbWVudCAhPSB0YXJnZXQ7XG4gIH0pO1xuICBpZiAoIXRoaXMuX29ic2VydmF0aW9uVGFyZ2V0cy5sZW5ndGgpIHtcbiAgICB0aGlzLl91bm1vbml0b3JJbnRlcnNlY3Rpb25zKCk7XG4gICAgdGhpcy5fdW5yZWdpc3Rlckluc3RhbmNlKCk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBTdG9wcyBvYnNlcnZpbmcgYWxsIHRhcmdldCBlbGVtZW50cyBmb3IgaW50ZXJzZWN0aW9uIGNoYW5nZXMuXG4gKi9cbkludGVyc2VjdGlvbk9ic2VydmVyLnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX29ic2VydmF0aW9uVGFyZ2V0cyA9IFtdO1xuICB0aGlzLl91bm1vbml0b3JJbnRlcnNlY3Rpb25zKCk7XG4gIHRoaXMuX3VucmVnaXN0ZXJJbnN0YW5jZSgpO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgYW55IHF1ZXVlIGVudHJpZXMgdGhhdCBoYXZlIG5vdCB5ZXQgYmVlbiByZXBvcnRlZCB0byB0aGVcbiAqIGNhbGxiYWNrIGFuZCBjbGVhcnMgdGhlIHF1ZXVlLiBUaGlzIGNhbiBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlXG4gKiBjYWxsYmFjayB0byBvYnRhaW4gdGhlIGFic29sdXRlIG1vc3QgdXAtdG8tZGF0ZSBpbnRlcnNlY3Rpb24gaW5mb3JtYXRpb24uXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGN1cnJlbnRseSBxdWV1ZWQgZW50cmllcy5cbiAqL1xuSW50ZXJzZWN0aW9uT2JzZXJ2ZXIucHJvdG90eXBlLnRha2VSZWNvcmRzID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZWNvcmRzID0gdGhpcy5fcXVldWVkRW50cmllcy5zbGljZSgpO1xuICB0aGlzLl9xdWV1ZWRFbnRyaWVzID0gW107XG4gIHJldHVybiByZWNvcmRzO1xufTtcblxuXG4vKipcbiAqIEFjY2VwdHMgdGhlIHRocmVzaG9sZCB2YWx1ZSBmcm9tIHRoZSB1c2VyIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGFuZFxuICogcmV0dXJucyBhIHNvcnRlZCBhcnJheSBvZiB1bmlxdWUgdGhyZXNob2xkIHZhbHVlcy4gSWYgYSB2YWx1ZSBpcyBub3RcbiAqIGJldHdlZW4gMCBhbmQgMSBhbmQgZXJyb3IgaXMgdGhyb3duLlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8bnVtYmVyPX0gb3B0X3RocmVzaG9sZCBBbiBvcHRpb25hbCB0aHJlc2hvbGQgdmFsdWUgb3JcbiAqICAgICBhIGxpc3Qgb2YgdGhyZXNob2xkIHZhbHVlcywgZGVmYXVsdGluZyB0byBbMF0uXG4gKiBAcmV0dXJuIHtBcnJheX0gQSBzb3J0ZWQgbGlzdCBvZiB1bmlxdWUgYW5kIHZhbGlkIHRocmVzaG9sZCB2YWx1ZXMuXG4gKi9cbkludGVyc2VjdGlvbk9ic2VydmVyLnByb3RvdHlwZS5faW5pdFRocmVzaG9sZHMgPSBmdW5jdGlvbihvcHRfdGhyZXNob2xkKSB7XG4gIHZhciB0aHJlc2hvbGQgPSBvcHRfdGhyZXNob2xkIHx8IFswXTtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHRocmVzaG9sZCkpIHRocmVzaG9sZCA9IFt0aHJlc2hvbGRdO1xuXG4gIHJldHVybiB0aHJlc2hvbGQuc29ydCgpLmZpbHRlcihmdW5jdGlvbih0LCBpLCBhKSB7XG4gICAgaWYgKHR5cGVvZiB0ICE9ICdudW1iZXInIHx8IGlzTmFOKHQpIHx8IHQgPCAwIHx8IHQgPiAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RocmVzaG9sZCBtdXN0IGJlIGEgbnVtYmVyIGJldHdlZW4gMCBhbmQgMSBpbmNsdXNpdmVseScpO1xuICAgIH1cbiAgICByZXR1cm4gdCAhPT0gYVtpIC0gMV07XG4gIH0pO1xufTtcblxuXG4vKipcbiAqIEFjY2VwdHMgdGhlIHJvb3RNYXJnaW4gdmFsdWUgZnJvbSB0aGUgdXNlciBjb25maWd1cmF0aW9uIG9iamVjdFxuICogYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgdGhlIGZvdXIgbWFyZ2luIHZhbHVlcyBhcyBhbiBvYmplY3QgY29udGFpbmluZ1xuICogdGhlIHZhbHVlIGFuZCB1bml0IHByb3BlcnRpZXMuIElmIGFueSBvZiB0aGUgdmFsdWVzIGFyZSBub3QgcHJvcGVybHlcbiAqIGZvcm1hdHRlZCBvciB1c2UgYSB1bml0IG90aGVyIHRoYW4gcHggb3IgJSwgYW5kIGVycm9yIGlzIHRocm93bi5cbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZz19IG9wdF9yb290TWFyZ2luIEFuIG9wdGlvbmFsIHJvb3RNYXJnaW4gdmFsdWUsXG4gKiAgICAgZGVmYXVsdGluZyB0byAnMHB4Jy5cbiAqIEByZXR1cm4ge0FycmF5PE9iamVjdD59IEFuIGFycmF5IG9mIG1hcmdpbiBvYmplY3RzIHdpdGggdGhlIGtleXNcbiAqICAgICB2YWx1ZSBhbmQgdW5pdC5cbiAqL1xuSW50ZXJzZWN0aW9uT2JzZXJ2ZXIucHJvdG90eXBlLl9wYXJzZVJvb3RNYXJnaW4gPSBmdW5jdGlvbihvcHRfcm9vdE1hcmdpbikge1xuICB2YXIgbWFyZ2luU3RyaW5nID0gb3B0X3Jvb3RNYXJnaW4gfHwgJzBweCc7XG4gIHZhciBtYXJnaW5zID0gbWFyZ2luU3RyaW5nLnNwbGl0KC9cXHMrLykubWFwKGZ1bmN0aW9uKG1hcmdpbikge1xuICAgIHZhciBwYXJ0cyA9IC9eKC0/XFxkKlxcLj9cXGQrKShweHwlKSQvLmV4ZWMobWFyZ2luKTtcbiAgICBpZiAoIXBhcnRzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Jvb3RNYXJnaW4gbXVzdCBiZSBzcGVjaWZpZWQgaW4gcGl4ZWxzIG9yIHBlcmNlbnQnKTtcbiAgICB9XG4gICAgcmV0dXJuIHt2YWx1ZTogcGFyc2VGbG9hdChwYXJ0c1sxXSksIHVuaXQ6IHBhcnRzWzJdfTtcbiAgfSk7XG5cbiAgLy8gSGFuZGxlcyBzaG9ydGhhbmQuXG4gIG1hcmdpbnNbMV0gPSBtYXJnaW5zWzFdIHx8IG1hcmdpbnNbMF07XG4gIG1hcmdpbnNbMl0gPSBtYXJnaW5zWzJdIHx8IG1hcmdpbnNbMF07XG4gIG1hcmdpbnNbM10gPSBtYXJnaW5zWzNdIHx8IG1hcmdpbnNbMV07XG5cbiAgcmV0dXJuIG1hcmdpbnM7XG59O1xuXG5cbi8qKlxuICogU3RhcnRzIHBvbGxpbmcgZm9yIGludGVyc2VjdGlvbiBjaGFuZ2VzIGlmIHRoZSBwb2xsaW5nIGlzIG5vdCBhbHJlYWR5XG4gKiBoYXBwZW5pbmcsIGFuZCBpZiB0aGUgcGFnZSdzIHZpc2liaWxpdHkgc3RhdGUgaXMgdmlzaWJsZS5cbiAqIEBwcml2YXRlXG4gKi9cbkludGVyc2VjdGlvbk9ic2VydmVyLnByb3RvdHlwZS5fbW9uaXRvckludGVyc2VjdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCF0aGlzLl9tb25pdG9yaW5nSW50ZXJzZWN0aW9ucykge1xuICAgIHRoaXMuX21vbml0b3JpbmdJbnRlcnNlY3Rpb25zID0gdHJ1ZTtcblxuICAgIC8vIElmIGEgcG9sbCBpbnRlcnZhbCBpcyBzZXQsIHVzZSBwb2xsaW5nIGluc3RlYWQgb2YgbGlzdGVuaW5nIHRvXG4gICAgLy8gcmVzaXplIGFuZCBzY3JvbGwgZXZlbnRzIG9yIERPTSBtdXRhdGlvbnMuXG4gICAgaWYgKHRoaXMuUE9MTF9JTlRFUlZBTCkge1xuICAgICAgdGhpcy5fbW9uaXRvcmluZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwoXG4gICAgICAgICAgdGhpcy5fY2hlY2tGb3JJbnRlcnNlY3Rpb25zLCB0aGlzLlBPTExfSU5URVJWQUwpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGFkZEV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScsIHRoaXMuX2NoZWNrRm9ySW50ZXJzZWN0aW9ucywgdHJ1ZSk7XG4gICAgICBhZGRFdmVudChkb2N1bWVudCwgJ3Njcm9sbCcsIHRoaXMuX2NoZWNrRm9ySW50ZXJzZWN0aW9ucywgdHJ1ZSk7XG5cbiAgICAgIGlmICh0aGlzLlVTRV9NVVRBVElPTl9PQlNFUlZFUiAmJiAnTXV0YXRpb25PYnNlcnZlcicgaW4gd2luZG93KSB7XG4gICAgICAgIHRoaXMuX2RvbU9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIodGhpcy5fY2hlY2tGb3JJbnRlcnNlY3Rpb25zKTtcbiAgICAgICAgdGhpcy5fZG9tT2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudCwge1xuICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgIGNoYXJhY3RlckRhdGE6IHRydWUsXG4gICAgICAgICAgc3VidHJlZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cblxuLyoqXG4gKiBTdG9wcyBwb2xsaW5nIGZvciBpbnRlcnNlY3Rpb24gY2hhbmdlcy5cbiAqIEBwcml2YXRlXG4gKi9cbkludGVyc2VjdGlvbk9ic2VydmVyLnByb3RvdHlwZS5fdW5tb25pdG9ySW50ZXJzZWN0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5fbW9uaXRvcmluZ0ludGVyc2VjdGlvbnMpIHtcbiAgICB0aGlzLl9tb25pdG9yaW5nSW50ZXJzZWN0aW9ucyA9IGZhbHNlO1xuXG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9tb25pdG9yaW5nSW50ZXJ2YWwpO1xuICAgIHRoaXMuX21vbml0b3JpbmdJbnRlcnZhbCA9IG51bGw7XG5cbiAgICByZW1vdmVFdmVudCh3aW5kb3csICdyZXNpemUnLCB0aGlzLl9jaGVja0ZvckludGVyc2VjdGlvbnMsIHRydWUpO1xuICAgIHJlbW92ZUV2ZW50KGRvY3VtZW50LCAnc2Nyb2xsJywgdGhpcy5fY2hlY2tGb3JJbnRlcnNlY3Rpb25zLCB0cnVlKTtcblxuICAgIGlmICh0aGlzLl9kb21PYnNlcnZlcikge1xuICAgICAgdGhpcy5fZG9tT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgdGhpcy5fZG9tT2JzZXJ2ZXIgPSBudWxsO1xuICAgIH1cbiAgfVxufTtcblxuXG4vKipcbiAqIFNjYW5zIGVhY2ggb2JzZXJ2YXRpb24gdGFyZ2V0IGZvciBpbnRlcnNlY3Rpb24gY2hhbmdlcyBhbmQgYWRkcyB0aGVtXG4gKiB0byB0aGUgaW50ZXJuYWwgZW50cmllcyBxdWV1ZS4gSWYgbmV3IGVudHJpZXMgYXJlIGZvdW5kLCBpdFxuICogc2NoZWR1bGVzIHRoZSBjYWxsYmFjayB0byBiZSBpbnZva2VkLlxuICogQHByaXZhdGVcbiAqL1xuSW50ZXJzZWN0aW9uT2JzZXJ2ZXIucHJvdG90eXBlLl9jaGVja0ZvckludGVyc2VjdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJvb3RJc0luRG9tID0gdGhpcy5fcm9vdElzSW5Eb20oKTtcbiAgdmFyIHJvb3RSZWN0ID0gcm9vdElzSW5Eb20gPyB0aGlzLl9nZXRSb290UmVjdCgpIDogZ2V0RW1wdHlSZWN0KCk7XG5cbiAgdGhpcy5fb2JzZXJ2YXRpb25UYXJnZXRzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgIHZhciB0YXJnZXQgPSBpdGVtLmVsZW1lbnQ7XG4gICAgdmFyIHRhcmdldFJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3QodGFyZ2V0KTtcbiAgICB2YXIgcm9vdENvbnRhaW5zVGFyZ2V0ID0gdGhpcy5fcm9vdENvbnRhaW5zVGFyZ2V0KHRhcmdldCk7XG4gICAgdmFyIG9sZEVudHJ5ID0gaXRlbS5lbnRyeTtcbiAgICB2YXIgaW50ZXJzZWN0aW9uUmVjdCA9IHJvb3RJc0luRG9tICYmIHJvb3RDb250YWluc1RhcmdldCAmJlxuICAgICAgICB0aGlzLl9jb21wdXRlVGFyZ2V0QW5kUm9vdEludGVyc2VjdGlvbih0YXJnZXQsIHJvb3RSZWN0KTtcblxuICAgIHZhciBuZXdFbnRyeSA9IGl0ZW0uZW50cnkgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeSh7XG4gICAgICB0aW1lOiBub3coKSxcbiAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgYm91bmRpbmdDbGllbnRSZWN0OiB0YXJnZXRSZWN0LFxuICAgICAgcm9vdEJvdW5kczogcm9vdFJlY3QsXG4gICAgICBpbnRlcnNlY3Rpb25SZWN0OiBpbnRlcnNlY3Rpb25SZWN0XG4gICAgfSk7XG5cbiAgICBpZiAoIW9sZEVudHJ5KSB7XG4gICAgICB0aGlzLl9xdWV1ZWRFbnRyaWVzLnB1c2gobmV3RW50cnkpO1xuICAgIH0gZWxzZSBpZiAocm9vdElzSW5Eb20gJiYgcm9vdENvbnRhaW5zVGFyZ2V0KSB7XG4gICAgICAvLyBJZiB0aGUgbmV3IGVudHJ5IGludGVyc2VjdGlvbiByYXRpbyBoYXMgY3Jvc3NlZCBhbnkgb2YgdGhlXG4gICAgICAvLyB0aHJlc2hvbGRzLCBhZGQgYSBuZXcgZW50cnkuXG4gICAgICBpZiAodGhpcy5faGFzQ3Jvc3NlZFRocmVzaG9sZChvbGRFbnRyeSwgbmV3RW50cnkpKSB7XG4gICAgICAgIHRoaXMuX3F1ZXVlZEVudHJpZXMucHVzaChuZXdFbnRyeSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIHRoZSByb290IGlzIG5vdCBpbiB0aGUgRE9NIG9yIHRhcmdldCBpcyBub3QgY29udGFpbmVkIHdpdGhpblxuICAgICAgLy8gcm9vdCBidXQgdGhlIHByZXZpb3VzIGVudHJ5IGZvciB0aGlzIHRhcmdldCBoYWQgYW4gaW50ZXJzZWN0aW9uLFxuICAgICAgLy8gYWRkIGEgbmV3IHJlY29yZCBpbmRpY2F0aW5nIHJlbW92YWwuXG4gICAgICBpZiAob2xkRW50cnkgJiYgb2xkRW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgICAgdGhpcy5fcXVldWVkRW50cmllcy5wdXNoKG5ld0VudHJ5KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHRoaXMpO1xuXG4gIGlmICh0aGlzLl9xdWV1ZWRFbnRyaWVzLmxlbmd0aCkge1xuICAgIHRoaXMuX2NhbGxiYWNrKHRoaXMudGFrZVJlY29yZHMoKSwgdGhpcyk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBBY2NlcHRzIGEgdGFyZ2V0IGFuZCByb290IHJlY3QgY29tcHV0ZXMgdGhlIGludGVyc2VjdGlvbiBiZXR3ZWVuIHRoZW5cbiAqIGZvbGxvd2luZyB0aGUgYWxnb3JpdGhtIGluIHRoZSBzcGVjLlxuICogVE9ETyhwaGlsaXB3YWx0b24pOiBhdCB0aGlzIHRpbWUgY2xpcC1wYXRoIGlzIG5vdCBjb25zaWRlcmVkLlxuICogaHR0cHM6Ly93M2MuZ2l0aHViLmlvL0ludGVyc2VjdGlvbk9ic2VydmVyLyNjYWxjdWxhdGUtaW50ZXJzZWN0aW9uLXJlY3QtYWxnb1xuICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgVGhlIHRhcmdldCBET00gZWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IHJvb3RSZWN0IFRoZSBib3VuZGluZyByZWN0IG9mIHRoZSByb290IGFmdGVyIGJlaW5nXG4gKiAgICAgZXhwYW5kZWQgYnkgdGhlIHJvb3RNYXJnaW4gdmFsdWUuXG4gKiBAcmV0dXJuIHs/T2JqZWN0fSBUaGUgZmluYWwgaW50ZXJzZWN0aW9uIHJlY3Qgb2JqZWN0IG9yIHVuZGVmaW5lZCBpZiBub1xuICogICAgIGludGVyc2VjdGlvbiBpcyBmb3VuZC5cbiAqIEBwcml2YXRlXG4gKi9cbkludGVyc2VjdGlvbk9ic2VydmVyLnByb3RvdHlwZS5fY29tcHV0ZVRhcmdldEFuZFJvb3RJbnRlcnNlY3Rpb24gPVxuICAgIGZ1bmN0aW9uKHRhcmdldCwgcm9vdFJlY3QpIHtcblxuICAvLyBJZiB0aGUgZWxlbWVudCBpc24ndCBkaXNwbGF5ZWQsIGFuIGludGVyc2VjdGlvbiBjYW4ndCBoYXBwZW4uXG4gIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXQpLmRpc3BsYXkgPT0gJ25vbmUnKSByZXR1cm47XG5cbiAgdmFyIHRhcmdldFJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3QodGFyZ2V0KTtcbiAgdmFyIGludGVyc2VjdGlvblJlY3QgPSB0YXJnZXRSZWN0O1xuICB2YXIgcGFyZW50ID0gZ2V0UGFyZW50Tm9kZSh0YXJnZXQpO1xuICB2YXIgYXRSb290ID0gZmFsc2U7XG5cbiAgd2hpbGUgKCFhdFJvb3QpIHtcbiAgICB2YXIgcGFyZW50UmVjdCA9IG51bGw7XG4gICAgdmFyIHBhcmVudENvbXB1dGVkU3R5bGUgPSBwYXJlbnQubm9kZVR5cGUgPT0gMSA/XG4gICAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHBhcmVudCkgOiB7fTtcblxuICAgIC8vIElmIHRoZSBwYXJlbnQgaXNuJ3QgZGlzcGxheWVkLCBhbiBpbnRlcnNlY3Rpb24gY2FuJ3QgaGFwcGVuLlxuICAgIGlmIChwYXJlbnRDb21wdXRlZFN0eWxlLmRpc3BsYXkgPT0gJ25vbmUnKSByZXR1cm47XG5cbiAgICBpZiAocGFyZW50ID09IHRoaXMucm9vdCB8fCBwYXJlbnQgPT0gZG9jdW1lbnQpIHtcbiAgICAgIGF0Um9vdCA9IHRydWU7XG4gICAgICBwYXJlbnRSZWN0ID0gcm9vdFJlY3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIHRoZSBlbGVtZW50IGhhcyBhIG5vbi12aXNpYmxlIG92ZXJmbG93LCBhbmQgaXQncyBub3QgdGhlIDxib2R5PlxuICAgICAgLy8gb3IgPGh0bWw+IGVsZW1lbnQsIHVwZGF0ZSB0aGUgaW50ZXJzZWN0aW9uIHJlY3QuXG4gICAgICAvLyBOb3RlOiA8Ym9keT4gYW5kIDxodG1sPiBjYW5ub3QgYmUgY2xpcHBlZCB0byBhIHJlY3QgdGhhdCdzIG5vdCBhbHNvXG4gICAgICAvLyB0aGUgZG9jdW1lbnQgcmVjdCwgc28gbm8gbmVlZCB0byBjb21wdXRlIGEgbmV3IGludGVyc2VjdGlvbi5cbiAgICAgIGlmIChwYXJlbnQgIT0gZG9jdW1lbnQuYm9keSAmJlxuICAgICAgICAgIHBhcmVudCAhPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiZcbiAgICAgICAgICBwYXJlbnRDb21wdXRlZFN0eWxlLm92ZXJmbG93ICE9ICd2aXNpYmxlJykge1xuICAgICAgICBwYXJlbnRSZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KHBhcmVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgZWl0aGVyIG9mIHRoZSBhYm92ZSBjb25kaXRpb25hbHMgc2V0IGEgbmV3IHBhcmVudFJlY3QsXG4gICAgLy8gY2FsY3VsYXRlIG5ldyBpbnRlcnNlY3Rpb24gZGF0YS5cbiAgICBpZiAocGFyZW50UmVjdCkge1xuICAgICAgaW50ZXJzZWN0aW9uUmVjdCA9IGNvbXB1dGVSZWN0SW50ZXJzZWN0aW9uKHBhcmVudFJlY3QsIGludGVyc2VjdGlvblJlY3QpO1xuXG4gICAgICBpZiAoIWludGVyc2VjdGlvblJlY3QpIGJyZWFrO1xuICAgIH1cbiAgICBwYXJlbnQgPSBnZXRQYXJlbnROb2RlKHBhcmVudCk7XG4gIH1cbiAgcmV0dXJuIGludGVyc2VjdGlvblJlY3Q7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgcm9vdCByZWN0IGFmdGVyIGJlaW5nIGV4cGFuZGVkIGJ5IHRoZSByb290TWFyZ2luIHZhbHVlLlxuICogQHJldHVybiB7T2JqZWN0fSBUaGUgZXhwYW5kZWQgcm9vdCByZWN0LlxuICogQHByaXZhdGVcbiAqL1xuSW50ZXJzZWN0aW9uT2JzZXJ2ZXIucHJvdG90eXBlLl9nZXRSb290UmVjdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcm9vdFJlY3Q7XG4gIGlmICh0aGlzLnJvb3QpIHtcbiAgICByb290UmVjdCA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdCh0aGlzLnJvb3QpO1xuICB9IGVsc2Uge1xuICAgIC8vIFVzZSA8aHRtbD4vPGJvZHk+IGluc3RlYWQgb2Ygd2luZG93IHNpbmNlIHNjcm9sbCBiYXJzIGFmZmVjdCBzaXplLlxuICAgIHZhciBodG1sID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICByb290UmVjdCA9IHtcbiAgICAgIHRvcDogMCxcbiAgICAgIGxlZnQ6IDAsXG4gICAgICByaWdodDogaHRtbC5jbGllbnRXaWR0aCB8fCBib2R5LmNsaWVudFdpZHRoLFxuICAgICAgd2lkdGg6IGh0bWwuY2xpZW50V2lkdGggfHwgYm9keS5jbGllbnRXaWR0aCxcbiAgICAgIGJvdHRvbTogaHRtbC5jbGllbnRIZWlnaHQgfHwgYm9keS5jbGllbnRIZWlnaHQsXG4gICAgICBoZWlnaHQ6IGh0bWwuY2xpZW50SGVpZ2h0IHx8IGJvZHkuY2xpZW50SGVpZ2h0XG4gICAgfTtcbiAgfVxuICByZXR1cm4gdGhpcy5fZXhwYW5kUmVjdEJ5Um9vdE1hcmdpbihyb290UmVjdCk7XG59O1xuXG5cbi8qKlxuICogQWNjZXB0cyBhIHJlY3QgYW5kIGV4cGFuZHMgaXQgYnkgdGhlIHJvb3RNYXJnaW4gdmFsdWUuXG4gKiBAcGFyYW0ge09iamVjdH0gcmVjdCBUaGUgcmVjdCBvYmplY3QgdG8gZXhwYW5kLlxuICogQHJldHVybiB7T2JqZWN0fSBUaGUgZXhwYW5kZWQgcmVjdC5cbiAqIEBwcml2YXRlXG4gKi9cbkludGVyc2VjdGlvbk9ic2VydmVyLnByb3RvdHlwZS5fZXhwYW5kUmVjdEJ5Um9vdE1hcmdpbiA9IGZ1bmN0aW9uKHJlY3QpIHtcbiAgdmFyIG1hcmdpbnMgPSB0aGlzLl9yb290TWFyZ2luVmFsdWVzLm1hcChmdW5jdGlvbihtYXJnaW4sIGkpIHtcbiAgICByZXR1cm4gbWFyZ2luLnVuaXQgPT0gJ3B4JyA/IG1hcmdpbi52YWx1ZSA6XG4gICAgICAgIG1hcmdpbi52YWx1ZSAqIChpICUgMiA/IHJlY3Qud2lkdGggOiByZWN0LmhlaWdodCkgLyAxMDA7XG4gIH0pO1xuICB2YXIgbmV3UmVjdCA9IHtcbiAgICB0b3A6IHJlY3QudG9wIC0gbWFyZ2luc1swXSxcbiAgICByaWdodDogcmVjdC5yaWdodCArIG1hcmdpbnNbMV0sXG4gICAgYm90dG9tOiByZWN0LmJvdHRvbSArIG1hcmdpbnNbMl0sXG4gICAgbGVmdDogcmVjdC5sZWZ0IC0gbWFyZ2luc1szXVxuICB9O1xuICBuZXdSZWN0LndpZHRoID0gbmV3UmVjdC5yaWdodCAtIG5ld1JlY3QubGVmdDtcbiAgbmV3UmVjdC5oZWlnaHQgPSBuZXdSZWN0LmJvdHRvbSAtIG5ld1JlY3QudG9wO1xuXG4gIHJldHVybiBuZXdSZWN0O1xufTtcblxuXG4vKipcbiAqIEFjY2VwdHMgYW4gb2xkIGFuZCBuZXcgZW50cnkgYW5kIHJldHVybnMgdHJ1ZSBpZiBhdCBsZWFzdCBvbmUgb2YgdGhlXG4gKiB0aHJlc2hvbGQgdmFsdWVzIGhhcyBiZWVuIGNyb3NzZWQuXG4gKiBAcGFyYW0gez9JbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5fSBvbGRFbnRyeSBUaGUgcHJldmlvdXMgZW50cnkgZm9yIGFcbiAqICAgIHBhcnRpY3VsYXIgdGFyZ2V0IGVsZW1lbnQgb3IgbnVsbCBpZiBubyBwcmV2aW91cyBlbnRyeSBleGlzdHMuXG4gKiBAcGFyYW0ge0ludGVyc2VjdGlvbk9ic2VydmVyRW50cnl9IG5ld0VudHJ5IFRoZSBjdXJyZW50IGVudHJ5IGZvciBhXG4gKiAgICBwYXJ0aWN1bGFyIHRhcmdldCBlbGVtZW50LlxuICogQHJldHVybiB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGEgYW55IHRocmVzaG9sZCBoYXMgYmVlbiBjcm9zc2VkLlxuICogQHByaXZhdGVcbiAqL1xuSW50ZXJzZWN0aW9uT2JzZXJ2ZXIucHJvdG90eXBlLl9oYXNDcm9zc2VkVGhyZXNob2xkID1cbiAgICBmdW5jdGlvbihvbGRFbnRyeSwgbmV3RW50cnkpIHtcblxuICAvLyBUbyBtYWtlIGNvbXBhcmluZyBlYXNpZXIsIGFuIGVudHJ5IHRoYXQgaGFzIGEgcmF0aW8gb2YgMFxuICAvLyBidXQgZG9lcyBub3QgYWN0dWFsbHkgaW50ZXJzZWN0IGlzIGdpdmVuIGEgdmFsdWUgb2YgLTFcbiAgdmFyIG9sZFJhdGlvID0gb2xkRW50cnkgJiYgb2xkRW50cnkuaXNJbnRlcnNlY3RpbmcgP1xuICAgICAgb2xkRW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gfHwgMCA6IC0xO1xuICB2YXIgbmV3UmF0aW8gPSBuZXdFbnRyeS5pc0ludGVyc2VjdGluZyA/XG4gICAgICBuZXdFbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyB8fCAwIDogLTE7XG5cbiAgLy8gSWdub3JlIHVuY2hhbmdlZCByYXRpb3NcbiAgaWYgKG9sZFJhdGlvID09PSBuZXdSYXRpbykgcmV0dXJuO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50aHJlc2hvbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHRocmVzaG9sZCA9IHRoaXMudGhyZXNob2xkc1tpXTtcblxuICAgIC8vIFJldHVybiB0cnVlIGlmIGFuIGVudHJ5IG1hdGNoZXMgYSB0aHJlc2hvbGQgb3IgaWYgdGhlIG5ldyByYXRpb1xuICAgIC8vIGFuZCB0aGUgb2xkIHJhdGlvIGFyZSBvbiB0aGUgb3Bwb3NpdGUgc2lkZXMgb2YgYSB0aHJlc2hvbGQuXG4gICAgaWYgKHRocmVzaG9sZCA9PSBvbGRSYXRpbyB8fCB0aHJlc2hvbGQgPT0gbmV3UmF0aW8gfHxcbiAgICAgICAgdGhyZXNob2xkIDwgb2xkUmF0aW8gIT09IHRocmVzaG9sZCA8IG5ld1JhdGlvKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSByb290IGVsZW1lbnQgaXMgYW4gZWxlbWVudCBhbmQgaXMgaW4gdGhlIERPTS5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIHJvb3QgZWxlbWVudCBpcyBhbiBlbGVtZW50IGFuZCBpcyBpbiB0aGUgRE9NLlxuICogQHByaXZhdGVcbiAqL1xuSW50ZXJzZWN0aW9uT2JzZXJ2ZXIucHJvdG90eXBlLl9yb290SXNJbkRvbSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gIXRoaXMucm9vdCB8fCBjb250YWluc0RlZXAoZG9jdW1lbnQsIHRoaXMucm9vdCk7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdGFyZ2V0IGVsZW1lbnQgaXMgYSBjaGlsZCBvZiByb290LlxuICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgVGhlIHRhcmdldCBlbGVtZW50IHRvIGNoZWNrLlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdGFyZ2V0IGVsZW1lbnQgaXMgYSBjaGlsZCBvZiByb290LlxuICogQHByaXZhdGVcbiAqL1xuSW50ZXJzZWN0aW9uT2JzZXJ2ZXIucHJvdG90eXBlLl9yb290Q29udGFpbnNUYXJnZXQgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgcmV0dXJuIGNvbnRhaW5zRGVlcCh0aGlzLnJvb3QgfHwgZG9jdW1lbnQsIHRhcmdldCk7XG59O1xuXG5cbi8qKlxuICogQWRkcyB0aGUgaW5zdGFuY2UgdG8gdGhlIGdsb2JhbCBJbnRlcnNlY3Rpb25PYnNlcnZlciByZWdpc3RyeSBpZiBpdCBpc24ndFxuICogYWxyZWFkeSBwcmVzZW50LlxuICogQHByaXZhdGVcbiAqL1xuSW50ZXJzZWN0aW9uT2JzZXJ2ZXIucHJvdG90eXBlLl9yZWdpc3Rlckluc3RhbmNlID0gZnVuY3Rpb24oKSB7XG4gIGlmIChyZWdpc3RyeS5pbmRleE9mKHRoaXMpIDwgMCkge1xuICAgIHJlZ2lzdHJ5LnB1c2godGhpcyk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBSZW1vdmVzIHRoZSBpbnN0YW5jZSBmcm9tIHRoZSBnbG9iYWwgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgcmVnaXN0cnkuXG4gKiBAcHJpdmF0ZVxuICovXG5JbnRlcnNlY3Rpb25PYnNlcnZlci5wcm90b3R5cGUuX3VucmVnaXN0ZXJJbnN0YW5jZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaW5kZXggPSByZWdpc3RyeS5pbmRleE9mKHRoaXMpO1xuICBpZiAoaW5kZXggIT0gLTEpIHJlZ2lzdHJ5LnNwbGljZShpbmRleCwgMSk7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgcmVzdWx0IG9mIHRoZSBwZXJmb3JtYW5jZS5ub3coKSBtZXRob2Qgb3IgbnVsbCBpbiBicm93c2Vyc1xuICogdGhhdCBkb24ndCBzdXBwb3J0IHRoZSBBUEkuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBlbGFwc2VkIHRpbWUgc2luY2UgdGhlIHBhZ2Ugd2FzIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gbm93KCkge1xuICByZXR1cm4gd2luZG93LnBlcmZvcm1hbmNlICYmIHBlcmZvcm1hbmNlLm5vdyAmJiBwZXJmb3JtYW5jZS5ub3coKTtcbn1cblxuXG4vKipcbiAqIFRocm90dGxlcyBhIGZ1bmN0aW9uIGFuZCBkZWxheXMgaXRzIGV4ZWN1dGlvbiwgc28gaXQncyBvbmx5IGNhbGxlZCBhdCBtb3N0XG4gKiBvbmNlIHdpdGhpbiBhIGdpdmVuIHRpbWUgcGVyaW9kLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHRocm90dGxlLlxuICogQHBhcmFtIHtudW1iZXJ9IHRpbWVvdXQgVGhlIGFtb3VudCBvZiB0aW1lIHRoYXQgbXVzdCBwYXNzIGJlZm9yZSB0aGVcbiAqICAgICBmdW5jdGlvbiBjYW4gYmUgY2FsbGVkIGFnYWluLlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSB0aHJvdHRsZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZuLCB0aW1lb3V0KSB7XG4gIHZhciB0aW1lciA9IG51bGw7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aW1lcikge1xuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBmbigpO1xuICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICB9LCB0aW1lb3V0KTtcbiAgICB9XG4gIH07XG59XG5cblxuLyoqXG4gKiBBZGRzIGFuIGV2ZW50IGhhbmRsZXIgdG8gYSBET00gbm9kZSBlbnN1cmluZyBjcm9zcy1icm93c2VyIGNvbXBhdGliaWxpdHkuXG4gKiBAcGFyYW0ge05vZGV9IG5vZGUgVGhlIERPTSBub2RlIHRvIGFkZCB0aGUgZXZlbnQgaGFuZGxlciB0by5cbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBldmVudCBoYW5kbGVyIHRvIGFkZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0X3VzZUNhcHR1cmUgT3B0aW9uYWxseSBhZGRzIHRoZSBldmVuIHRvIHRoZSBjYXB0dXJlXG4gKiAgICAgcGhhc2UuIE5vdGU6IHRoaXMgb25seSB3b3JrcyBpbiBtb2Rlcm4gYnJvd3NlcnMuXG4gKi9cbmZ1bmN0aW9uIGFkZEV2ZW50KG5vZGUsIGV2ZW50LCBmbiwgb3B0X3VzZUNhcHR1cmUpIHtcbiAgaWYgKHR5cGVvZiBub2RlLmFkZEV2ZW50TGlzdGVuZXIgPT0gJ2Z1bmN0aW9uJykge1xuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZm4sIG9wdF91c2VDYXB0dXJlIHx8IGZhbHNlKTtcbiAgfVxuICBlbHNlIGlmICh0eXBlb2Ygbm9kZS5hdHRhY2hFdmVudCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgbm9kZS5hdHRhY2hFdmVudCgnb24nICsgZXZlbnQsIGZuKTtcbiAgfVxufVxuXG5cbi8qKlxuICogUmVtb3ZlcyBhIHByZXZpb3VzbHkgYWRkZWQgZXZlbnQgaGFuZGxlciBmcm9tIGEgRE9NIG5vZGUuXG4gKiBAcGFyYW0ge05vZGV9IG5vZGUgVGhlIERPTSBub2RlIHRvIHJlbW92ZSB0aGUgZXZlbnQgaGFuZGxlciBmcm9tLlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGV2ZW50IGhhbmRsZXIgdG8gcmVtb3ZlLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRfdXNlQ2FwdHVyZSBJZiB0aGUgZXZlbnQgaGFuZGxlciB3YXMgYWRkZWQgd2l0aCB0aGlzXG4gKiAgICAgZmxhZyBzZXQgdG8gdHJ1ZSwgaXQgc2hvdWxkIGJlIHNldCB0byB0cnVlIGhlcmUgaW4gb3JkZXIgdG8gcmVtb3ZlIGl0LlxuICovXG5mdW5jdGlvbiByZW1vdmVFdmVudChub2RlLCBldmVudCwgZm4sIG9wdF91c2VDYXB0dXJlKSB7XG4gIGlmICh0eXBlb2Ygbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyID09ICdmdW5jdGlvbicpIHtcbiAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGZuLCBvcHRfdXNlQ2FwdHVyZSB8fCBmYWxzZSk7XG4gIH1cbiAgZWxzZSBpZiAodHlwZW9mIG5vZGUuZGV0YXRjaEV2ZW50ID09ICdmdW5jdGlvbicpIHtcbiAgICBub2RlLmRldGF0Y2hFdmVudCgnb24nICsgZXZlbnQsIGZuKTtcbiAgfVxufVxuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgaW50ZXJzZWN0aW9uIGJldHdlZW4gdHdvIHJlY3Qgb2JqZWN0cy5cbiAqIEBwYXJhbSB7T2JqZWN0fSByZWN0MSBUaGUgZmlyc3QgcmVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSByZWN0MiBUaGUgc2Vjb25kIHJlY3QuXG4gKiBAcmV0dXJuIHs/T2JqZWN0fSBUaGUgaW50ZXJzZWN0aW9uIHJlY3Qgb3IgdW5kZWZpbmVkIGlmIG5vIGludGVyc2VjdGlvblxuICogICAgIGlzIGZvdW5kLlxuICovXG5mdW5jdGlvbiBjb21wdXRlUmVjdEludGVyc2VjdGlvbihyZWN0MSwgcmVjdDIpIHtcbiAgdmFyIHRvcCA9IE1hdGgubWF4KHJlY3QxLnRvcCwgcmVjdDIudG9wKTtcbiAgdmFyIGJvdHRvbSA9IE1hdGgubWluKHJlY3QxLmJvdHRvbSwgcmVjdDIuYm90dG9tKTtcbiAgdmFyIGxlZnQgPSBNYXRoLm1heChyZWN0MS5sZWZ0LCByZWN0Mi5sZWZ0KTtcbiAgdmFyIHJpZ2h0ID0gTWF0aC5taW4ocmVjdDEucmlnaHQsIHJlY3QyLnJpZ2h0KTtcbiAgdmFyIHdpZHRoID0gcmlnaHQgLSBsZWZ0O1xuICB2YXIgaGVpZ2h0ID0gYm90dG9tIC0gdG9wO1xuXG4gIHJldHVybiAod2lkdGggPj0gMCAmJiBoZWlnaHQgPj0gMCkgJiYge1xuICAgIHRvcDogdG9wLFxuICAgIGJvdHRvbTogYm90dG9tLFxuICAgIGxlZnQ6IGxlZnQsXG4gICAgcmlnaHQ6IHJpZ2h0LFxuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodFxuICB9O1xufVxuXG5cbi8qKlxuICogU2hpbXMgdGhlIG5hdGl2ZSBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBvbGRlciBJRS5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWwgVGhlIGVsZW1lbnQgd2hvc2UgYm91bmRpbmcgcmVjdCB0byBnZXQuXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSAocG9zc2libHkgc2hpbW1lZCkgcmVjdCBvZiB0aGUgZWxlbWVudC5cbiAqL1xuZnVuY3Rpb24gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsKSB7XG4gIHZhciByZWN0O1xuXG4gIHRyeSB7XG4gICAgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICAvLyBJZ25vcmUgV2luZG93cyA3IElFMTEgXCJVbnNwZWNpZmllZCBlcnJvclwiXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3czYy9JbnRlcnNlY3Rpb25PYnNlcnZlci9wdWxsLzIwNVxuICB9XG5cbiAgaWYgKCFyZWN0KSByZXR1cm4gZ2V0RW1wdHlSZWN0KCk7XG5cbiAgLy8gT2xkZXIgSUVcbiAgaWYgKCEocmVjdC53aWR0aCAmJiByZWN0LmhlaWdodCkpIHtcbiAgICByZWN0ID0ge1xuICAgICAgdG9wOiByZWN0LnRvcCxcbiAgICAgIHJpZ2h0OiByZWN0LnJpZ2h0LFxuICAgICAgYm90dG9tOiByZWN0LmJvdHRvbSxcbiAgICAgIGxlZnQ6IHJlY3QubGVmdCxcbiAgICAgIHdpZHRoOiByZWN0LnJpZ2h0IC0gcmVjdC5sZWZ0LFxuICAgICAgaGVpZ2h0OiByZWN0LmJvdHRvbSAtIHJlY3QudG9wXG4gICAgfTtcbiAgfVxuICByZXR1cm4gcmVjdDtcbn1cblxuXG4vKipcbiAqIFJldHVybnMgYW4gZW1wdHkgcmVjdCBvYmplY3QuIEFuIGVtcHR5IHJlY3QgaXMgcmV0dXJuZWQgd2hlbiBhbiBlbGVtZW50XG4gKiBpcyBub3QgaW4gdGhlIERPTS5cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIGVtcHR5IHJlY3QuXG4gKi9cbmZ1bmN0aW9uIGdldEVtcHR5UmVjdCgpIHtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IDAsXG4gICAgYm90dG9tOiAwLFxuICAgIGxlZnQ6IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgd2lkdGg6IDAsXG4gICAgaGVpZ2h0OiAwXG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2tzIHRvIHNlZSBpZiBhIHBhcmVudCBlbGVtZW50IGNvbnRhaW5zIGEgY2hpbGQgZWxlbWVudCAoaW5jbHVkaW5nIGluc2lkZVxuICogc2hhZG93IERPTSkuXG4gKiBAcGFyYW0ge05vZGV9IHBhcmVudCBUaGUgcGFyZW50IGVsZW1lbnQuXG4gKiBAcGFyYW0ge05vZGV9IGNoaWxkIFRoZSBjaGlsZCBlbGVtZW50LlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcGFyZW50IG5vZGUgY29udGFpbnMgdGhlIGNoaWxkIG5vZGUuXG4gKi9cbmZ1bmN0aW9uIGNvbnRhaW5zRGVlcChwYXJlbnQsIGNoaWxkKSB7XG4gIHZhciBub2RlID0gY2hpbGQ7XG4gIHdoaWxlIChub2RlKSB7XG4gICAgaWYgKG5vZGUgPT0gcGFyZW50KSByZXR1cm4gdHJ1ZTtcblxuICAgIG5vZGUgPSBnZXRQYXJlbnROb2RlKG5vZGUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuXG4vKipcbiAqIEdldHMgdGhlIHBhcmVudCBub2RlIG9mIGFuIGVsZW1lbnQgb3IgaXRzIGhvc3QgZWxlbWVudCBpZiB0aGUgcGFyZW50IG5vZGVcbiAqIGlzIGEgc2hhZG93IHJvb3QuXG4gKiBAcGFyYW0ge05vZGV9IG5vZGUgVGhlIG5vZGUgd2hvc2UgcGFyZW50IHRvIGdldC5cbiAqIEByZXR1cm4ge05vZGV8bnVsbH0gVGhlIHBhcmVudCBub2RlIG9yIG51bGwgaWYgbm8gcGFyZW50IGV4aXN0cy5cbiAqL1xuZnVuY3Rpb24gZ2V0UGFyZW50Tm9kZShub2RlKSB7XG4gIHZhciBwYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XG5cbiAgaWYgKHBhcmVudCAmJiBwYXJlbnQubm9kZVR5cGUgPT0gMTEgJiYgcGFyZW50Lmhvc3QpIHtcbiAgICAvLyBJZiB0aGUgcGFyZW50IGlzIGEgc2hhZG93IHJvb3QsIHJldHVybiB0aGUgaG9zdCBlbGVtZW50LlxuICAgIHJldHVybiBwYXJlbnQuaG9zdDtcbiAgfVxuICByZXR1cm4gcGFyZW50O1xufVxuXG5cbi8vIEV4cG9zZXMgdGhlIGNvbnN0cnVjdG9ycyBnbG9iYWxseS5cbndpbmRvdy5JbnRlcnNlY3Rpb25PYnNlcnZlciA9IEludGVyc2VjdGlvbk9ic2VydmVyO1xud2luZG93LkludGVyc2VjdGlvbk9ic2VydmVyRW50cnkgPSBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5O1xuXG59KHdpbmRvdywgZG9jdW1lbnQpKTtcbiIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwiaW5maW5pdGUtc2Nyb2xsaW5nXCIgOnN0eWxlPVwie2hlaWdodDogaGVpZ2h0VW5pdCwgYmFja2dyb3VuZDogYmFja2dyb3VuZH1cIj5cbiAgICAgICAgPGFjdGl2aXR5LWluZGljYXRvciB2LWlmPVwiYWN0aXZpdHlcIiA6c2l6ZT1cInNpemVcIiA6dHlwZT1cInR5cGVcIiBjZW50ZXIvPlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCAnaW50ZXJzZWN0aW9uLW9ic2VydmVyJztcbmltcG9ydCB1bml0IGZyb20gJy4uLy4uL0hlbHBlcnMvVW5pdCc7XG5pbXBvcnQgQWN0aXZpdHlJbmRpY2F0b3IgZnJvbSAnLi4vQWN0aXZpdHlJbmRpY2F0b3InO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnaW5maW5pdGUtc2Nyb2xsaW5nJyxcblxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgQWN0aXZpdHlJbmRpY2F0b3JcbiAgICB9LFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSXMgdGhlIGFjdGl2aXR5IGluZGljYXRvciBzaG93aW5nXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIGFjdGl2aXR5OiBCb29sZWFuLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgYWN0aXZpdHkgaW5kaWNhdG9yIGJhY2tncm91bmQgc3R5bGVcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgYmFja2dyb3VuZDogU3RyaW5nLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgYWN0aXZpdHkgaW5kaWNhdG9yIHNpemVcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgaGVpZ2h0OiB7XG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICAgICAgICBkZWZhdWx0OiAxMDBcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGFjdGl2aXR5IGluZGljYXRvciBzaXplXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIHNpemU6IFN0cmluZyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGFjdGl2aXR5IGluZGljYXRvciB0eXBlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIHR5cGU6IFN0cmluZyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHNjcm9sbCBvYnNlcnZlciB0aHJlc2hvbGQgZm9yIHdoZW4gYW4gZWxlbWVudCBpcyBjb25zaWRlcmVkXG4gICAgICAgICAqIGludG8gdmlldy4gTXVzdCBiZSBhIHZhbGlkYXRlIGJldHdlZW4gMCBhbmQgMSwgYW5kIGlzIGEgcGVyY2VudGFnZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IE51bWJlclxuICAgICAgICAgKi9cbiAgICAgICAgdGhyZXNob2xkOiB7XG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICAgICAgICBkZWZhdWx0OiAuNzUsXG4gICAgICAgICAgICB2YWxpZGF0ZSh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA+PSAwICYmIHZhbHVlIDw9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgc2Nyb2xsSW50b1ZpZXdwb3J0KGVudHJ5KSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdzY3JvbGw6aW4nLCBlbnRyeSk7XG5cbiAgICAgICAgICAgIGlmKCF0aGlzLmFjdGl2aXR5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnbG9hZCcsIGVudHJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBzY3JvbGxPdXRWaWV3cG9ydChlbnRyeSkge1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnc2Nyb2xsOm91dCcsIGVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgaGVpZ2h0VW5pdCgpIHtcbiAgICAgICAgICAgIHJldHVybiB1bml0KHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgIG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihlbnRyeS5pc0ludGVyc2VjdGluZyAmJiAhdGhpcy5oYXNTY3JvbGxlZEludG9WaWV3cG9ydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxJbnRvVmlld3BvcnQoZW50cnksIG9ic2VydmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzU2Nyb2xsZWRJbnRvVmlld3BvcnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy5oYXNTY3JvbGxlZEludG9WaWV3cG9ydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxPdXRWaWV3cG9ydChlbnRyeSwgb2JzZXJ2ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNTY3JvbGxlZEludG9WaWV3cG9ydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdGhyZXNob2xkOiB0aGlzLnRocmVzaG9sZFxuICAgICAgICAgICAgfSkub2JzZXJ2ZSh0aGlzLiRlbCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGFzU2Nyb2xsZWRJbnRvVmlld3BvcnQ6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cbi5pbmZpbml0ZS1zY3JvbGxpbmcge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cblxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiIDppZD1cImlkXCI+XG4gICAgICAgIDxzbG90Pnt7IHRleHQgfX08L3Nsb3Q+XG4gICAgPC9zcGFuPlxuXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnaW5wdXQtZ3JvdXAtdGV4dCcsXG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgaWQgYXR0cmlidXRlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIGlkOiBTdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB0eXBlIGF0dHJpYnV0ZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICB0ZXh0OiBbQXJyYXksIE51bWJlciwgU3RyaW5nXVxuXG4gICAgfVxuXG59XG5cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuXG4gICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxuICAgICAgICA8aW5wdXQtZ3JvdXAtdGV4dCB2LWlmPVwidGV4dFwiPlxuICAgICAgICAgICAgPHNsb3QvPlxuICAgICAgICA8L2lucHV0LWdyb3VwLXRleHQ+XG4gICAgICAgIDxzbG90IHYtZWxzZS8+XG4gICAgPC9kaXY+XG5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdpbnB1dC1ncm91cC1hcHBlbmQnLFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHR5cGUgYXR0cmlidXRlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIHRleHQ6IEJvb2xlYW5cblxuICAgIH1cblxufVxuXG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cblxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCI+XG4gICAgICAgIDxpbnB1dC1ncm91cC10ZXh0IHYtaWY9XCJ0ZXh0XCI+XG4gICAgICAgICAgICA8c2xvdC8+XG4gICAgICAgIDwvaW5wdXQtZ3JvdXAtdGV4dD5cbiAgICAgICAgPHNsb3Qgdi1lbHNlLz5cbiAgICA8L2Rpdj5cblxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ2lucHV0LWdyb3VwLXByZXBlbmQnLFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHR5cGUgYXR0cmlidXRlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIHRleHQ6IEJvb2xlYW5cblxuICAgIH1cblxufVxuXG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cblxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiIDpjbGFzcz1cIm1lcmdlQ2xhc3Nlcyhjb2xvcmFibGVDbGFzc2VzLCBzaXplYWJsZUNsYXNzKVwiPlxuXG4gICAgICAgIDxzbG90IG5hbWU9XCJwcmVwZW5kXCI+XG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1pZj1cInByZXBlbmQgaW5zdGFuY2VvZiBBcnJheVwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dC1ncm91cC1wcmVwZW5kPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQtZ3JvdXAtdGV4dCB2LWZvcj1cInZhbHVlIGluIHByZXBlbmRcIiA6dGV4dD1cInZhbHVlXCIvPlxuICAgICAgICAgICAgICAgIDwvaW5wdXQtZ3JvdXAtcHJlcGVuZD5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1lbHNlLWlmPVwicHJlcGVuZFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dC1ncm91cC1wcmVwZW5kIHRleHQ+e3twcmVwZW5kfX08L2lucHV0LWdyb3VwLXByZXBlbmQ+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3Nsb3Q+XG5cbiAgICAgICAgPHNsb3QvPlxuXG4gICAgICAgIDxzbG90IG5hbWU9XCJhcHBlbmRcIj5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwiYXBwZW5kIGluc3RhbmNlb2YgQXJyYXlcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQtZ3JvdXAtYXBwZW5kPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQtZ3JvdXAtdGV4dCB2LWZvcj1cInZhbHVlIGluIGFwcGVuZFwiIDp0ZXh0PVwidmFsdWVcIi8+XG4gICAgICAgICAgICAgICAgPC9pbnB1dC1ncm91cC1hcHBlbmQ+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtZWxzZS1pZj1cImFwcGVuZFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dC1ncm91cC1hcHBlbmQgdGV4dD57e2FwcGVuZH19PC9pbnB1dC1ncm91cC1hcHBlbmQ+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3Nsb3Q+XG4gICAgPC9kaXY+XG5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgSGFzU2xvdHMgZnJvbSAnLi4vLi4vTWl4aW5zL0hhc1Nsb3RzJztcbmltcG9ydCBTaXplYWJsZSBmcm9tICcuLi8uLi9NaXhpbnMvU2l6ZWFibGUnO1xuaW1wb3J0IElucHV0R3JvdXBUZXh0IGZyb20gJy4vSW5wdXRHcm91cFRleHQnO1xuaW1wb3J0IENvbG9yYWJsZSBmcm9tICcuLi8uLi9NaXhpbnMvQ29sb3JhYmxlJztcbmltcG9ydCBJbnB1dEdyb3VwQXBwZW5kIGZyb20gJy4vSW5wdXRHcm91cEFwcGVuZCc7XG5pbXBvcnQgSW5wdXRHcm91cFByZXBlbmQgZnJvbSAnLi9JbnB1dEdyb3VwUHJlcGVuZCc7XG5pbXBvcnQgTWVyZ2VDbGFzc2VzIGZyb20gJy4uLy4uL01peGlucy9NZXJnZUNsYXNzZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnaW5wdXQtZ3JvdXAnLFxuXG4gICAgY29tcG9uZW50czoge1xuICAgICAgICBJbnB1dEdyb3VwVGV4dCxcbiAgICAgICAgSW5wdXRHcm91cEFwcGVuZCxcbiAgICAgICAgSW5wdXRHcm91cFByZXBlbmRcbiAgICB9LFxuXG4gICAgbWl4aW5zOiBbXG4gICAgICAgIEhhc1Nsb3RzLFxuICAgICAgICBTaXplYWJsZSxcbiAgICAgICAgQ29sb3JhYmxlLFxuICAgICAgICBNZXJnZUNsYXNzZXNcbiAgICBdLFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICBhcHBlbmQ6IFtBcnJheSwgTnVtYmVyLCBTdHJpbmddLFxuXG4gICAgICAgIHByZXBlbmQ6IFtBcnJheSwgTnVtYmVyLCBTdHJpbmddXG5cbiAgICB9XG5cbn1cblxuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgSW5wdXRHcm91cCBmcm9tICcuL0lucHV0R3JvdXAnO1xuaW1wb3J0IElucHV0R3JvdXBBcHBlbmQgZnJvbSAnLi9JbnB1dEdyb3VwQXBwZW5kJztcbmltcG9ydCBJbnB1dEdyb3VwUHJlcGVuZCBmcm9tICcuL0lucHV0R3JvdXBQcmVwZW5kJztcbmltcG9ydCBJbnB1dEdyb3VwVGV4dCBmcm9tICcuL0lucHV0R3JvdXBUZXh0JztcbmltcG9ydCBWdWVJbnN0YWxsZXIgZnJvbSAnLi4vLi4vSGVscGVycy9WdWVJbnN0YWxsZXIvVnVlSW5zdGFsbGVyJztcblxuY29uc3QgcGx1Z2luID0gVnVlSW5zdGFsbGVyLnVzZSh7XG5cbiAgICBpbnN0YWxsKFZ1ZSwgb3B0aW9ucykge1xuICAgICAgICBWdWVJbnN0YWxsZXIuY29tcG9uZW50cyh7XG4gICAgICAgICAgICBJbnB1dEdyb3VwLFxuICAgICAgICAgICAgSW5wdXRHcm91cEFwcGVuZCxcbiAgICAgICAgICAgIElucHV0R3JvdXBQcmVwZW5kLFxuICAgICAgICAgICAgSW5wdXRHcm91cFRleHRcbiAgICAgICAgfSk7XG4gICAgfVxuXG59KTtcblxuZXhwb3J0ICogZnJvbSAnLi9JbnB1dEdyb3VwQXBwZW5kJztcbmV4cG9ydCAqIGZyb20gJy4vSW5wdXRHcm91cFByZXBlbmQnO1xuZXhwb3J0ICogZnJvbSAnLi9JbnB1dEdyb3VwVGV4dCc7XG5leHBvcnQgZGVmYXVsdCBJbnB1dEdyb3VwO1xuIiwiPHRlbXBsYXRlPlxuXG4gICAgPGZvcm0tZ3JvdXA+XG5cbiAgICAgICAgPHNsb3QgbmFtZT1cImxhYmVsXCI+XG4gICAgICAgICAgICA8Zm9ybS1sYWJlbCB2LWlmPVwibGFiZWxcIiA6Zm9yPVwiaWRcIiB2LWh0bWw9XCJsYWJlbFwiIC8+XG4gICAgICAgIDwvc2xvdD5cblxuICAgICAgICA8ZGl2IDpjbGFzcz1cImNvbnRyb2xDbGFzc2VzXCIgdGFiaW5kZXg9XCIwXCIgQGNsaWNrPVwidG9nZ2xlKClcIiBAa2V5dXAuMzI9XCJ0b2dnbGUoKVwiIEBrZXl1cC4zNz1cInRvZ2dsZShvZmZWYWx1ZSlcIiBAa2V5dXAuMzk9XCJ0b2dnbGUob25WYWx1ZSlcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaWdodC1zd2l0Y2gtaGFuZGxlXCI+PC9kaXY+XG4gICAgICAgIFx0PGRpdiBjbGFzcz1cImxpZ2h0LXN3aXRjaC1jb250YWluZXJcIj5cbiAgICAgICAgXHRcdDxkaXYgY2xhc3M9XCJsaWdodC1zd2l0Y2gtbGFiZWwgb24tdmFsdWVcIj48L2Rpdj5cbiAgICAgICAgXHRcdDxkaXYgY2xhc3M9XCJsaWdodC1zd2l0Y2gtbGFiZWwgb2ZmLXZhbHVlXCI+PC9kaXY+XG4gICAgICAgIFx0PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxmb3JtLWNvbnRyb2wgOm5hbWU9XCJuYW1lXCIgOnZhbHVlPVwidmFsdWVcIiA6aWQ9XCJpZFwiIGNsYXNzPVwiZC1ub25lXCIvPlxuXG4gICAgICAgIDxzbG90IG5hbWU9XCJmZWVkYmFja1wiPlxuICAgICAgICAgICAgPGZvcm0tZmVlZGJhY2sgdi1pZj1cInZhbGlkRmVlZGJhY2tcIiB2LWh0bWw9XCJ2YWxpZEZlZWRiYWNrXCIgdmFsaWQgLz5cbiAgICAgICAgICAgIDxmb3JtLWZlZWRiYWNrIHYtaWY9XCJpbnZhbGlkRmVlZGJhY2tcIiB2LWh0bWw9XCJpbnZhbGlkRmVlZGJhY2tcIiBpbnZhbGlkIC8+XG4gICAgICAgIDwvc2xvdD5cblxuICAgICAgICA8c2xvdCBuYW1lPVwiaGVscFwiPlxuICAgICAgICAgICAgPGhlbHAtdGV4dCB2LWlmPVwiaGVscFRleHRcIiB2LWh0bWw9XCJoZWxwVGV4dFwiIC8+XG4gICAgICAgIDwvc2xvdD5cblxuICAgIDwvZm9ybS1ncm91cD5cblxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBIZWxwVGV4dCBmcm9tICcuLi9IZWxwVGV4dCc7XG5pbXBvcnQgRm9ybUdyb3VwIGZyb20gJy4uL0Zvcm1Hcm91cCc7XG5pbXBvcnQgRm9ybUxhYmVsIGZyb20gJy4uL0Zvcm1MYWJlbCc7XG5pbXBvcnQgRm9ybUZlZWRiYWNrIGZyb20gJy4uL0Zvcm1GZWVkYmFjayc7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCBGb3JtQ29udHJvbCBmcm9tICcuLi9Gb3JtQ29udHJvbCc7XG5pbXBvcnQgRm9ybUNvbnRyb2xNaXhpbiBmcm9tICcuLi8uLi9NaXhpbnMvRm9ybUNvbnRyb2wnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnbGlnaHQtc3dpdGNoLWZpZWxkJyxcblxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgSGVscFRleHQsXG4gICAgICAgIEZvcm1Hcm91cCxcbiAgICAgICAgRm9ybUxhYmVsLFxuICAgICAgICBGb3JtQ29udHJvbCxcbiAgICAgICAgRm9ybUZlZWRiYWNrXG4gICAgfSxcblxuICAgIG1peGluczogW1xuICAgICAgICBGb3JtQ29udHJvbE1peGluXG4gICAgXSxcblxuICAgIHByb3BzOiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjbGFzcyBuYW1lIGFzc2lnbmVkIHRvIHRoZSBjb250cm9sIGVsZW1lbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgZGVmYXVsdENvbnRyb2xDbGFzczoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgZGVmYXVsdDogJ2Zvcm0tY29udHJvbCBsaWdodC1zd2l0Y2gnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjbGFzcyBuYW1lIGFzc2lnbmVkIHRvIHRoZSBjb250cm9sIGVsZW1lbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgYWN0aXZlQ2xhc3M6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICdvbidcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGNsYXNzIG5hbWUgYXNzaWduZWQgdG8gdGhlIGNvbnRyb2wgZWxlbWVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBvblZhbHVlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiAxXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjbGFzcyBuYW1lIGFzc2lnbmVkIHRvIHRoZSBjb250cm9sIGVsZW1lbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgb2ZmVmFsdWU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IDBcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgaXNBY3RpdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgPT09IHRoaXMub25WYWx1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBjb250cm9sQ2xhc3NlcygpIHtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgdGhpcy5jb250cm9sQ2xhc3MsXG4gICAgICAgICAgICAgICAgdGhpcy5jb250cm9sU2l6ZUNsYXNzLFxuICAgICAgICAgICAgICAgICh0aGlzLnNwYWNpbmcgfHwgJycpLFxuICAgICAgICAgICAgICAgICh0aGlzLmludmFsaWRGZWVkYmFjayA/ICdpcy1pbnZhbGlkJyA6ICcnKSxcbiAgICAgICAgICAgICAgICAodGhpcy5kcmFnZ2luZyA/ICdpcy1kcmFnZ2luZycgOiAnJyksXG4gICAgICAgICAgICAgICAgKHRoaXMuaXNBY3RpdmUgPyAnaXMtYWN0aXZlJyA6ICcnKVxuICAgICAgICAgICAgXS5qb2luKCcgJyk7XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgZ2V0VHJhbnNpdGlvbkluTWlsbGlzZWNvbmRzKCkge1xuICAgICAgICAgICAgY29uc3QgZHVyYXRpb24gPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5saWdodC1zd2l0Y2gtaGFuZGxlJykpLnRyYW5zaXRpb25EdXJhdGlvbjtcbiAgICAgICAgICAgIGNvbnN0IG51bWVyaWMgPSBwYXJzZUZsb2F0KGR1cmF0aW9uLCAxMCk7XG4gICAgICAgICAgICBjb25zdCB1bml0ID0gZHVyYXRpb24ubWF0Y2goL20/cy8pO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHVuaXRbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bWVyaWMgKiAxMDAwO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21zJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bWVyaWM7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBcIiR7dW5pdFswXX1cIiBpcyBub3QgYSB2YWxpZCB1bml0IG9mIG1lYXN1cmUuIFVuaXQgbXVzdCBiZSBcInNcIiAoc2Vjb25kcykgb3IgXCJtc1wiIChtaWxsaXNlY29uZHMpLmApO1xuICAgICAgICB9LFxuXG4gICAgICAgIHRvZ2dsZSh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnaW5wdXQnLCAhaXNVbmRlZmluZWQodmFsdWUpID8gdmFsdWUgOiAodGhpcy5pc0FjdGl2ZSA/IHRoaXMub2ZmVmFsdWUgOiB0aGlzLm9uVmFsdWUpKTtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIHdhdGNoOiB7XG4gICAgICAgIHZhbHVlKCkge1xuICAgICAgICAgICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIHRoaXMuZ2V0VHJhbnNpdGlvbkluTWlsbGlzZWNvbmRzKCkpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkcmFnZ2luZzogZmFsc2VcbiAgICAgICAgfTtcbiAgICB9XG5cbn1cblxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuQGltcG9ydCAnLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL3Njc3MvZnVuY3Rpb25zLnNjc3MnO1xuQGltcG9ydCAnLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL3Njc3MvdmFyaWFibGVzLnNjc3MnO1xuQGltcG9ydCAnLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL3Njc3MvbWl4aW5zLnNjc3MnO1xuXG4kbGlnaHQtc3dpdGNoLWFuaW1hdGlvbi1lYXNpbmc6IGVhc2U7XG4kbGlnaHQtc3dpdGNoLWFuaW1hdGlvbi1sZW5ndGg6IDFzIC8gMztcbiRsaWdodC1zd2l0Y2gtaGFuZGxlLXdpZHRoOiAkZm9udC1zaXplLWJhc2UgKiAyO1xuJGxpZ2h0LXN3aXRjaC1oYW5kbGUtaGVpZ2h0OiAkbGlnaHQtc3dpdGNoLWhhbmRsZS13aWR0aDtcbiRsaWdodC1zd2l0Y2gtc2l6ZS13aWR0aDogJGxpZ2h0LXN3aXRjaC1oYW5kbGUtd2lkdGggKiAxLjU7XG4kbGlnaHQtc3dpdGNoLXNpemUtaGVpZ2h0OiAkbGlnaHQtc3dpdGNoLWhhbmRsZS1oZWlnaHQ7XG4kbGlnaHQtc3dpdGNoLWxhYmVsLXdpZHRoOiAkbGlnaHQtc3dpdGNoLWhhbmRsZS13aWR0aDtcbiRsaWdodC1zd2l0Y2gtbGFiZWwtaGVpZ2h0OiAkbGlnaHQtc3dpdGNoLWhhbmRsZS1oZWlnaHQ7XG5cbkBtaXhpbiBsaWdodC1zd2l0Y2gtc2l6ZSgkc2l6ZSwgJG1vZGlmaWVyKSB7XG4gICAgJGhhbmRsZS13aWR0aDogJGxpZ2h0LXN3aXRjaC1oYW5kbGUtd2lkdGggKiAkbW9kaWZpZXI7XG4gICAgJGhhbmRsZS1oZWlnaHQ6ICRoYW5kbGUtd2lkdGg7XG4gICAgJHNpemUtd2lkdGg6ICRoYW5kbGUtd2lkdGggKiAxLjU7XG4gICAgJHNpemUtaGVpZ2h0OiAkaGFuZGxlLWhlaWdodDtcbiAgICAkbGFiZWwtd2lkdGg6ICRoYW5kbGUtd2lkdGg7XG4gICAgJGxhYmVsLWhlaWdodDogJGhhbmRsZS1oZWlnaHQ7XG5cbiAgICAmLmxpZ2h0LXN3aXRjaC0jeyRzaXplfSB7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgXHR3aWR0aDogJHNpemUtd2lkdGg7XG4gICAgXHRoZWlnaHQ6ICRoYW5kbGUtaGVpZ2h0O1xuICAgIFx0Ym9yZGVyLXJhZGl1czogJGhhbmRsZS13aWR0aDtcblxuICAgICAgICAubGlnaHQtc3dpdGNoLWhhbmRsZSB7XG4gICAgICAgICAgICB3aWR0aDogJGhhbmRsZS13aWR0aDtcbiAgICAgICAgICAgIGhlaWdodDogJGhhbmRsZS1oZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICAubGlnaHQtc3dpdGNoLWNvbnRhaW5lciB7XG4gICAgICAgICAgICBsZWZ0OiAtJGhhbmRsZS13aWR0aCAvIDI7XG4gICAgICAgICAgICB3aWR0aDogJGxhYmVsLXdpZHRoICogMjtcbiAgICAgICAgICAgIGhlaWdodDogJGxhYmVsLWhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgICYuaXMtYWN0aXZlIHtcbiAgICAgICAgICAgIC5saWdodC1zd2l0Y2gtaGFuZGxlIHtcbiAgICAgICAgICAgICAgICBsZWZ0OiAkaGFuZGxlLXdpZHRoIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC5saWdodC1zd2l0Y2gtbGFiZWwge1xuICAgICAgICAgICAgd2lkdGg6ICRsYWJlbC13aWR0aDtcbiAgICAgICAgICAgIGhlaWdodDogJGxhYmVsLWhlaWdodDtcblxuICAgICAgICAgICAgJi5vbi12YWx1ZSB7XG4gICAgICAgICAgICAgICAgLy9ib3JkZXItcmFkaXVzOiAkaGFuZGxlLXdpZHRoIDAgMCAkaGFuZGxlLXdpZHRoO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAmLm9mZi12YWx1ZSB7XG4gICAgICAgICAgICAgICAgLy9ib3JkZXItcmFkaXVzOiAwICRoYW5kbGUtd2lkdGggJGhhbmRsZS13aWR0aCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4ubGlnaHQtc3dpdGNoIHtcbiAgICBwYWRkaW5nOiAwO1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdGJvcmRlcjogbm9uZTtcblx0d2lkdGg6ICRsaWdodC1zd2l0Y2gtc2l6ZS13aWR0aDtcblx0aGVpZ2h0OiAkbGlnaHQtc3dpdGNoLWhhbmRsZS1oZWlnaHQ7XG5cdGJvcmRlci1yYWRpdXM6ICRsaWdodC1zd2l0Y2gtaGFuZGxlLXdpZHRoO1xuXHRvdmVyZmxvdzogaGlkZGVuO1xuXHRjdXJzb3I6IHBvaW50ZXI7XG5cdC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG5cdC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG5cdC1tcy11c2VyLXNlbGVjdDogbm9uZTtcblx0b3ZlcmZsb3c6IGhpZGRlbjtcblxuICAgIEBpbmNsdWRlIGxpZ2h0LXN3aXRjaC1zaXplKCd4cycsIC41KTtcbiAgICBAaW5jbHVkZSBsaWdodC1zd2l0Y2gtc2l6ZSgnc20nLCAuNzUpO1xuICAgIEBpbmNsdWRlIGxpZ2h0LXN3aXRjaC1zaXplKCdtZCcsIDEpO1xuICAgIEBpbmNsdWRlIGxpZ2h0LXN3aXRjaC1zaXplKCdsZycsIDEuNSk7XG4gICAgQGluY2x1ZGUgbGlnaHQtc3dpdGNoLXNpemUoJ3hsJywgMik7XG5cbiAgICBAaW5jbHVkZSBmb3JtLXZhbGlkYXRpb24tc3RhdGUoXCJ2YWxpZFwiLCAkZm9ybS1mZWVkYmFjay12YWxpZC1jb2xvcik7XG4gICAgQGluY2x1ZGUgZm9ybS12YWxpZGF0aW9uLXN0YXRlKFwiaW52YWxpZFwiLCAkZm9ybS1mZWVkYmFjay1pbnZhbGlkLWNvbG9yKTtcblxuICAgICYuaXMtaW52YWxpZCB7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICRmb3JtLWZlZWRiYWNrLWludmFsaWQtY29sb3I7XG5cbiAgICAgICAgJiAubGlnaHQtc3dpdGNoLWhhbmRsZSB7XG5cblxuICAgICAgICB9XG5cbiAgICAgICAgJjpub3QoLmlzLWFjdGl2ZSkgLmxpZ2h0LXN3aXRjaC1oYW5kbGUge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogJGZvcm0tZmVlZGJhY2staW52YWxpZC1jb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5saWdodC1zd2l0Y2gtbGFiZWwge1xuICAgICAgICAgICAgJi5vbi12YWx1ZSB7XG4gICAgICAgICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICYub2ZmLXZhbHVlIHtcbiAgICAgICAgICAgICAgICByaWdodDogMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC5saWdodC1zd2l0Y2gtaGFuZGxlIHtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIHRyYW5zaXRpb246IGxlZnQgJGxpZ2h0LXN3aXRjaC1hbmltYXRpb24tbGVuZ3RoICRsaWdodC1zd2l0Y2gtYW5pbWF0aW9uLWVhc2luZztcbiAgICAgICAgd2lkdGg6ICRsaWdodC1zd2l0Y2gtaGFuZGxlLXdpZHRoO1xuICAgICAgICBoZWlnaHQ6ICRsaWdodC1zd2l0Y2gtaGFuZGxlLWhlaWdodDtcbiAgICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHJhZGlhbC1ncmFkaWVudCh3aGl0ZSwgcmdiKDI1MCwgMjUwLCAyNTApIDUwJSwgd2hpdGUgNzUlKTtcbiAgICAgICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDAgMXB4IHJnYmEoMCwgMCwgMCwgMC4xKSwgMCAwIDAgMXB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICB9XG5cbiAgICAubGlnaHQtc3dpdGNoLWNvbnRhaW5lciB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgbGVmdDogLSRsaWdodC1zd2l0Y2gtaGFuZGxlLXdpZHRoIC8gMjtcbiAgICAgICAgdG9wOiAoJGxpZ2h0LXN3aXRjaC1oYW5kbGUtaGVpZ2h0IC0gICRsaWdodC1zd2l0Y2gtbGFiZWwtaGVpZ2h0KSAvIDI7XG4gICAgICAgIHdpZHRoOiAkbGlnaHQtc3dpdGNoLWxhYmVsLXdpZHRoICogMjtcbiAgICAgICAgaGVpZ2h0OiAkbGlnaHQtc3dpdGNoLWxhYmVsLWhlaWdodDtcbiAgICAgICAgdHJhbnNpdGlvbjogbGVmdCAkbGlnaHQtc3dpdGNoLWFuaW1hdGlvbi1sZW5ndGggJGxpZ2h0LXN3aXRjaC1hbmltYXRpb24tZWFzaW5nO1xuICAgIH1cblxuICAgICY6bm90KC5pcy1hY3RpdmUpIHtcbiAgICAgICAgJjpub3QoLmlzLWRyYWdnaW5nKSAub24tdmFsdWUge1xuICAgICAgICAgICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJi5pcy1hY3RpdmUge1xuICAgICAgICAmOm5vdCguaXMtZHJhZ2dpbmcpIC5vZmYtdmFsdWUge1xuICAgICAgICAgICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgICAgICB9XG5cbiAgICAgICAgLmxpZ2h0LXN3aXRjaC1oYW5kbGUge1xuICAgICAgICAgICAgbGVmdDogJGxpZ2h0LXN3aXRjaC1oYW5kbGUtd2lkdGggLyAyO1xuICAgICAgICB9XG5cbiAgICAgICAgLmxpZ2h0LXN3aXRjaC1jb250YWluZXIge1xuICAgICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC5saWdodC1zd2l0Y2gtbGFiZWwge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiAkbGlnaHQtc3dpdGNoLWxhYmVsLXdpZHRoO1xuICAgICAgICBoZWlnaHQ6ICRsaWdodC1zd2l0Y2gtbGFiZWwtaGVpZ2h0O1xuICAgICAgICAvL2JveC1zaGFkb3c6IGluc2V0IDAgMCAwIDFweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG5cbiAgICAgICAgJi5vbi12YWx1ZSB7XG4gICAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogIzAwYjAwNztcbiAgICAgICAgICAgIC8vYm9yZGVyLXJhZGl1czogJGxpZ2h0LXN3aXRjaC1oYW5kbGUtd2lkdGggMCAwICRsaWdodC1zd2l0Y2gtaGFuZGxlLXdpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgJi5vZmYtdmFsdWUge1xuICAgICAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjZWJlZGVmO1xuICAgICAgICAgICAgLy9ib3JkZXItcmFkaXVzOiAwICRsaWdodC1zd2l0Y2gtaGFuZGxlLXdpZHRoICRsaWdodC1zd2l0Y2gtaGFuZGxlLXdpZHRoIDA7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IExpZ2h0U3dpdGNoRmllbGQgZnJvbSAnLi9MaWdodFN3aXRjaEZpZWxkJztcbmltcG9ydCBWdWVJbnN0YWxsZXIgZnJvbSAnLi4vLi4vSGVscGVycy9WdWVJbnN0YWxsZXIvVnVlSW5zdGFsbGVyJztcblxuY29uc3QgcGx1Z2luID0gVnVlSW5zdGFsbGVyLnVzZSh7XG5cbiAgICBpbnN0YWxsKFZ1ZSwgb3B0aW9ucykge1xuICAgICAgICBWdWVJbnN0YWxsZXIuY29tcG9uZW50cyh7XG4gICAgICAgICAgICBMaWdodFN3aXRjaEZpZWxkXG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IExpZ2h0U3dpdGNoRmllbGQ7XG4iLCI8dGVtcGxhdGU+XG4gICAgPHJvdXRlci1saW5rIHYtaWY9XCJ0b1wiIDp0bz1cInRvXCIgOmNsYXNzPVwiY2xhc3Nlc1wiIEBjbGljaz1cIiRlbWl0KCdjbGljaycsICRldmVudClcIj5cbiAgICAgICAgPHNsb3Q+e3tsYWJlbH19PC9zbG90PiA8YmFkZ2Ugdi1pZj1cImJhZGdlXCIgdi1iaW5kPVwiYmFkZ2VPcHRpb25zXCI+PC9iYWRnZT5cbiAgICA8L3JvdXRlci1saW5rPlxuICAgIDxhIHYtZWxzZWlmPVwiaHJlZlwiIDpocmVmPVwiaHJlZlwiIDpjbGFzcz1cImNsYXNzZXNcIiBAY2xpY2s9XCIkZW1pdCgnY2xpY2snLCAkZXZlbnQpXCI+XG4gICAgICAgIDxzbG90Pnt7bGFiZWx9fTwvc2xvdD4gPGJhZGdlIHYtaWY9XCJiYWRnZVwiIHYtYmluZD1cImJhZGdlT3B0aW9uc1wiPjwvYmFkZ2U+XG4gICAgPC9hPlxuICAgIDxidXR0b24gdi1lbHNlLWlmPVwiYWN0aW9uXCIgdHlwZT1cImJ1dHRvblwiIDpjbGFzcz1cImNsYXNzZXNcIiBAY2xpY2sucHJldmVudD1cIiRlbWl0KCdjbGljaycsICRldmVudClcIj5cbiAgICAgICAgPHNsb3Q+e3tsYWJlbH19PC9zbG90PiA8YmFkZ2Ugdi1pZj1cImJhZGdlXCIgdi1iaW5kPVwiYmFkZ2VPcHRpb25zXCI+PC9iYWRnZT5cbiAgICA8L2J1dHRvbj5cbiAgICA8ZGl2IHYtZWxzZSA6Y2xhc3M9XCJjbGFzc2VzXCIgQGNsaWNrPVwiJGVtaXQoJ2NsaWNrJywgJGV2ZW50KVwiPlxuICAgICAgICA8c2xvdD57e2xhYmVsfX08L3Nsb3Q+IDxiYWRnZSB2LWlmPVwiYmFkZ2VcIiB2LWJpbmQ9XCJiYWRnZU9wdGlvbnNcIj48L2JhZGdlPlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cblxuaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICcuLi8uLi9IZWxwZXJzL0Z1bmN0aW9ucyc7XG5pbXBvcnQgQmFkZ2UgZnJvbSAnLi4vQmFkZ2UnO1xuaW1wb3J0IHByZWZpeCBmcm9tICcuLi8uLi9IZWxwZXJzL1ByZWZpeC9QcmVmaXgnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIEJhZGdlXG4gICAgfSxcblxuICAgIHByb3BzOiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBiYWRnZSBsYWJlbCAoaWYgbnVtYmVyIG9yIHN0cmluZykgb3Igb2JqZWN0IG9mIG9wdGlvbnMgdG8gcGFzcyB0b1xuICAgICAgICAgKiB0aGUgY29tcG9uZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nfE9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgYmFkZ2U6IFtOdW1iZXIsIFN0cmluZywgT2JqZWN0XSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGxpc3QgZ3JvdXAgaXRlbSBocmVmIGF0dHJpYnV0ZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgaHJlZjogU3RyaW5nLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbGlzdCBncm91cCBpdGVtIHZhcmlhbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIHZhcmlhbnQ6IFN0cmluZyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogT3B0aW9uYWxseSBwYXNzIHRoZSBpdGVtIGFzIGEgb2JqZWN0IHRvIHVzZSBwcm9ncmFtbWF0aWNhbGx5IGxhdGVyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBpdGVtOiBPYmplY3QsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBsaXN0IGdyb3VwIGl0ZW0gYW4gYWN0aW9uLCBvciBjbGlja2FibGUgaXRlbS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IEJvb2xlYW5cbiAgICAgICAgICovXG4gICAgICAgIGFjdGlvbjoge1xuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBsaXN0IGdyb3VwIGl0ZW0gYWN0aXZlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgQm9vbGVhblxuICAgICAgICAgKi9cbiAgICAgICAgYWN0aXZlOiB7XG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGxpc3QgZ3JvdXAgaXRlbSBkaXNhYmxlZC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IEJvb2xlYW5cbiAgICAgICAgICovXG4gICAgICAgIGRpc2FibGVkOiB7XG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGxpc3QgaXRlbSBsYWJlbC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IE9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICAgICAgICB2YWx1ZTogbnVsbFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgdG8gYXR0cmlidXRlIHRvIGJlIHBhc3NlZCB0byBhIDxyb3V0ZXItbGluaz4gY29tcG9uZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICB0bzogW1N0cmluZywgT2JqZWN0XVxuXG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgY2xhc3NlcygpIHtcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBwcmVmaXgoe1xuICAgICAgICAgICAgICAgICdhY3Rpb24nOiB0aGlzLmFjdGlvbixcbiAgICAgICAgICAgIH0sICdsaXN0LWdyb3VwLWl0ZW0nKTtcblxuICAgICAgICAgICAgY2xhc3Nlc1snbGlzdC1ncm91cC1pdGVtJ10gPSB0cnVlO1xuICAgICAgICAgICAgY2xhc3Nlc1snYWN0aXZlJ10gPSB0aGlzLmFjdGl2ZTtcbiAgICAgICAgICAgIGNsYXNzZXNbJ2Rpc2FibGVkJ10gPSB0aGlzLmRpc2FibGVkO1xuXG4gICAgICAgICAgICBpZih0aGlzLnZhcmlhbnQpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzW3ByZWZpeCh0aGlzLnZhcmlhbnQsICdsaXN0LWdyb3VwLWl0ZW0nKV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY2xhc3NlcztcbiAgICAgICAgfSxcblxuICAgICAgICBiYWRnZU9wdGlvbnMoKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNPYmplY3QodGhpcy5iYWRnZSkgPyB0aGlzLmJhZGdlIDoge1xuICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLmJhZGdlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgd2F0Y2g6IHtcblxuICAgICAgICBhY3RpdmUodmFsdWUsIHByZXZWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgndG9nZ2xlJywgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCghIXZhbHVlID8gJ2FjdGl2YXRlJyA6ICdkZWFjdGl2YXRlJyk7XG4gICAgICAgIH1cblxuICAgIH0sXG5cblxufVxuXG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwibGlzdC1ncm91cFwiIDpjbGFzcz1cImNsYXNzZXNcIj5cbiAgICAgICAgPHNsb3QvPlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cblxuaW1wb3J0IHsgZWFjaCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCBMaXN0R3JvdXBJdGVtIGZyb20gJy4vTGlzdEdyb3VwSXRlbSc7XG5pbXBvcnQgcHJlZml4IGZyb20gJy4uLy4uL0hlbHBlcnMvUHJlZml4L1ByZWZpeCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgTGlzdEdyb3VwSXRlbVxuICAgIH0sXG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbGlzdCBncm91cCBhcHBlYXIgZmx1c2ggKHdpdGhvdXQgc29tZSBib3JkZXJzKS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IEJvb2xlYW5cbiAgICAgICAgICovXG4gICAgICAgIGZsdXNoOiB7XG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2FuIGFjdGl2YXRlIG11bHRpcGxlIGxpc3QgaXRlbXNcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IEJvb2xlYW5cbiAgICAgICAgICovXG4gICAgICAgIG11bHRpcGxlOiB7XG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIGNsYXNzZXMoKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJlZml4KHtcbiAgICAgICAgICAgICAgICAnZmx1c2gnOiB0aGlzLmZsdXNoXG4gICAgICAgICAgICB9LCAnbGlzdC1ncm91cCcpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcblxuICAgICAgICBiaW5kRXZlbnRzVG9DaGlsZHJlbigpIHtcbiAgICAgICAgICAgIGVhY2godGhpcy4kY2hpbGRyZW4sIGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICBjaGlsZC4kb2ZmKCdjbGljaycsIGV2ZW50ID0+IHRoaXMub25DbGlja0l0ZW0oZXZlbnQsIGNoaWxkKSk7XG4gICAgICAgICAgICAgICAgY2hpbGQuJG9uKCdjbGljaycsIGV2ZW50ID0+IHRoaXMub25DbGlja0l0ZW0oZXZlbnQsIGNoaWxkKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGZvciB0aGUgYGNsaWNrYCBldmVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdjbGljaycsIGV2ZW50KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGZvciB0aGUgY2hpbGQgYGNsaWNrYCBldmVudHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4gdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgb25DbGlja0l0ZW0oZXZlbnQsIGNoaWxkKSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdpdGVtOmNsaWNrJywgZXZlbnQsIGNoaWxkKTtcbiAgICAgICAgfSxcblxuICAgIH0sXG5cbiAgICBtb3VudGVkKCkge1xuICAgICAgICB0aGlzLmJpbmRFdmVudHNUb0NoaWxkcmVuKCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZWQoKSB7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50c1RvQ2hpbGRyZW4oKTtcbiAgICB9XG5cbn1cblxuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgTGlzdEdyb3VwIGZyb20gJy4vTGlzdEdyb3VwJztcbmltcG9ydCBWdWVJbnN0YWxsZXIgZnJvbSAnLi4vLi4vSGVscGVycy9WdWVJbnN0YWxsZXIvVnVlSW5zdGFsbGVyJztcblxuY29uc3QgcGx1Z2luID0gVnVlSW5zdGFsbGVyLnVzZSh7XG5cbiAgICBpbnN0YWxsKFZ1ZSwgb3B0aW9ucykge1xuICAgICAgICBWdWVJbnN0YWxsZXIuY29tcG9uZW50cyh7XG4gICAgICAgICAgICBMaXN0R3JvdXBcbiAgICAgICAgfSk7XG4gICAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdEdyb3VwO1xuIiwiPHRlbXBsYXRlPlxuICAgIDxjb21wb25lbnQgY2xhc3M9XCJuYXZiYXItYnJhbmRcIiA6Y2xhc3M9XCJ7J2gxJzogaDF9XCIgOmlzPVwiY29tcG9uZW50XCIgOnRvPVwidG9cIiA6aHJlZj1cImhyZWYgfHwgdG8gPyAnIycgOiBudWxsXCI+XG4gICAgICAgIDxpbWcgdi1pZj1cInNyY1wiIGNsYXNzPVwiZC1pbmxpbmUtYmxvY2sgYWxpZ24tY2VudGVyXCIgOnNyYz1cInNyY1wiIDp3aWR0aD1cInVuaXQod2lkdGgpXCIgOmhlaWdodD1cInVuaXQoaGVpZ2h0KVwiIDphbHQ9XCJhbHRcIi8+XG4gICAgICAgIDxzbG90Lz5cbiAgICA8L2NvbXBvbmVudD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgdW5pdCBmcm9tICcuLi8uLi9IZWxwZXJzL1VuaXQnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgaW1nIGBhbHRgIGF0dHJpYnV0ZS4gYHNyY2AgbXVzdCBiZSBkZWZpbmUgYmVmb3JlIHRoaXMgcHJvcCBoYXNcbiAgICAgICAgICogYW55IGFmZmVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IE9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgYWx0OiBTdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBIVE1MIHdyYXBwaW5nIHRhZy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IE9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgdGFnOiBTdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBpbWcgYHdpZHRoYCBhdHRyaWJ1dGUuIGBzcmNgIG11c3QgYmUgZGVmaW5lIGJlZm9yZSB0aGlzIHByb3AgaGFzXG4gICAgICAgICAqIGFueSBhZmZlY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBPYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIHdpZHRoOiBbTnVtYmVyLCBTdHJpbmddLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgaW1nIGBoZWlnaHRgIGF0dHJpYnV0ZS4gYHNyY2AgbXVzdCBiZSBkZWZpbmUgYmVmb3JlIHRoaXMgcHJvcCBoYXNcbiAgICAgICAgICogYW55IGFmZmVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IE9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgaGVpZ2h0OiBbTnVtYmVyLCBTdHJpbmddLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgYHRvYCBhdHRyaWJ1dGUgdGhhdCBpcyBwYXNzZWQgdG8gdGhlIGNvbXBvbmVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IE9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgdG86IFtPYmplY3QsIFN0cmluZ10sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBgaHJlZmAgYXR0cmlidXRlIHRoYXQgaXMgcGFzc2VkIHRvIHRoZSBjb21wb25lbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBPYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIGhyZWY6IFN0cmluZyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQXBwZW5kIHRoZSBgaDFgIGNsYXNzIHRvIGluY3JlYXNlIHRoZSBkaXNwbGF5IHNpemVcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IE9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgaDE6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGEgYHNyY2AgYXR0cmlidXRlIGlzIHBhc3NlZCwgdGhlbiB1c2UgaXQgdG8gYWRkIGFuIGltZyB0YWdcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IE9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgc3JjOiBTdHJpbmcsXG5cbiAgICB9LFxuXG4gICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICBjb21wb25lbnQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50YWcgfHwgKHRoaXMudG8gPyAncm91dGVyLWxpbmsnIDogKHRoaXMuaHJlZiA/ICdhJyA6ICdzcGFuJykpO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgbWV0aG9kczoge1xuICAgICAgICB1bml0KHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5pdCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cIm5hdmJhci1jb2xsYXBzZVwiIGlkPVwibmF2YmFyQ29sbGFwc2VcIiA6Y2xhc3M9XCJ7J2NvbGxhcHNlJzogY29sbGFwc2V9XCI+XG4gICAgICAgIDxzbG90Lz5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnbmF2YmFyLWNvbGxhcHNlJyxcblxuICAgIHByb3BzOiB7XG5cbiAgICAgICAgY29sbGFwc2U6IHtcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgICAgIH1cblxuICAgIH1cblxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gICAgPHNwYW4gY2xhc3M9XCJuYXZiYXItdGV4dFwiPlxuICAgICAgICA8c2xvdC8+XG4gICAgPC9zcGFuPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICduYXZiYXItdGV4dCdcblxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gICAgPHNwYW4gY2xhc3M9XCJuYXZiYXItdG9nZ2xlci1pY29uXCI+XG4gICAgICAgIDxzbG90Lz5cbiAgICA8L3NwYW4+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ25hdmJhci10b2dnbGVyLWljb24nXG5cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzPVwibmF2YmFyLXRvZ2dsZXJcIlxuICAgICAgICBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJcbiAgICAgICAgOmRhdGEtdGFyZ2V0PVwidGFyZ2V0XCJcbiAgICAgICAgOmFyaWEtY29udHJvbHM9XCJ0YXJnZXRcIlxuICAgICAgICA6YXJpYS1leHBhbmRlZD1cImV4cGFuZGVkXCJcbiAgICAgICAgOmFyaWEtbGFiZWw9XCJsYWJlbFwiXG4gICAgICAgIEBjbGljaz1cIm9uQ2xpY2tcIj5cbiAgICAgICAgPHNsb3Q+PG5hdmJhci10b2dnbGVyLWljb24vPjwvc2xvdD5cbiAgICA8L2J1dHRvbj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgTmF2YmFyVG9nZ2xlckljb24gZnJvbSAnLi9OYXZiYXJUb2dnbGVySWNvbic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICduYXZiYXItdG9nZ2xlcicsXG5cbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIE5hdmJhclRvZ2dsZXJJY29uXG4gICAgfSxcblxuICAgIHByb3BzOiB7XG5cbiAgICAgICAgZXhwYW5kZWQ6IEJvb2xlYW4sXG5cbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICdUb2dnbGUgbmF2aWdhdGlvbidcbiAgICAgICAgfSxcblxuICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICcubmF2YmFyLWNvbGxhcHNlJ1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgbWV0aG9kczoge1xuXG4gICAgICAgIG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NsaWNrJywgZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cblxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gICAgPG5hdiA6Y2xhc3M9XCJjbGFzc2VzXCI+XG4gICAgICAgIDxzbG90Lz5cbiAgICA8L25hdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyBlYWNoIH0gZnJvbSAnLi4vLi4vSGVscGVycy9GdW5jdGlvbnMnO1xuaW1wb3J0IHsgaXNCb29sZWFuIH0gZnJvbSAnLi4vLi4vSGVscGVycy9GdW5jdGlvbnMnO1xuaW1wb3J0IHByZWZpeCBmcm9tICcuLi8uLi9IZWxwZXJzL1ByZWZpeCc7XG5pbXBvcnQgVmFyaWFudCBmcm9tICcuLi8uLi9NaXhpbnMvVmFyaWFudCc7XG5pbXBvcnQgQ29sb3JhYmxlIGZyb20gJy4uLy4uL01peGlucy9Db2xvcmFibGUnO1xuaW1wb3J0IE5hdmJhckJyYW5kIGZyb20gJy4vTmF2YmFyQnJhbmQnO1xuaW1wb3J0IE5hdmJhckNvbGxhcHNlIGZyb20gJy4vTmF2YmFyQ29sbGFwc2UnO1xuaW1wb3J0IE5hdmJhclRleHQgZnJvbSAnLi9OYXZiYXJUZXh0JztcbmltcG9ydCBOYXZiYXJUb2dnbGVyIGZyb20gJy4vTmF2YmFyVG9nZ2xlcic7XG5pbXBvcnQgTmF2YmFyVG9nZ2xlckljb24gZnJvbSAnLi9OYXZiYXJUb2dnbGVySWNvbic7XG5pbXBvcnQgTWVyZ2VDbGFzc2VzIGZyb20gJy4uLy4uL01peGlucy9NZXJnZUNsYXNzZXMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnbmF2YmFyJyxcblxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgTmF2YmFyQnJhbmQsXG4gICAgICAgIE5hdmJhckNvbGxhcHNlLFxuICAgICAgICBOYXZiYXJUZXh0LFxuICAgICAgICBOYXZiYXJUb2dnbGVyLFxuICAgICAgICBOYXZiYXJUb2dnbGVySWNvblxuICAgIH0sXG5cbiAgICBtaXhpbnM6IFtcbiAgICAgICAgVmFyaWFudCxcbiAgICAgICAgQ29sb3JhYmxlLFxuICAgICAgICBNZXJnZUNsYXNzZXNcbiAgICBdLFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRXhwYW5kIHRoZSBuYXZiYXIuIElmIHRydWUsIGFwcGxpZXMgdG8gYWxsIHNpemUsIG90aGVyd2lzZSBwYXNzIGEgc3RyaW5nLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgT2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBleHBhbmQ6IHtcbiAgICAgICAgICAgIHR5cGU6IFtCb29sZWFuLCBTdHJpbmddLFxuICAgICAgICAgICAgZGVmYXVsdDogJ2xnJyxcbiAgICAgICAgICAgIHZhbGlkYXRlKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgWyd4cycsICdzbScsICdtZCcsICdsZycsICd4bCddLmluZGV4T2YodmFsdWUpICE9PSAtMSB8fCBpc0Jvb2xlYW4odmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgc2hvdWxkIHRoZSBuYXZiYXIgYmUgZml4ZWQgYXQgdGhlIHRvcC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgZml4ZWQ6IHtcbiAgICAgICAgICAgIHR5cGU6IFtTdHJpbmcsIEJvb2xlYW5dLFxuICAgICAgICAgICAgdmFsaWRhdGUodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBbJ3RvcCcsICdib3R0b20nXS5pbmRleE9mKHZhbHVlKSAhPT0gLTEgfHwgaXNCb29sZWFuKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHNob3VsZCB0aGUgbmF2YmFyIGJlIHN0aWNraWVkIGF0IHRoZSB0b3AuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIHN0aWNreToge1xuICAgICAgICAgICAgdHlwZTogW1N0cmluZywgQm9vbGVhbl0sXG4gICAgICAgICAgICB2YWxpZGF0ZSh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIFsndG9wJywgJ2JvdHRvbSddLmluZGV4T2YodmFsdWUpICE9PSAtMSB8fCBpc0Jvb2xlYW4odmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgdmFyaWFudCBhdHRyaWJ1dGVcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgdmFyaWFudDoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgZGVmYXVsdDogJ2xpZ2h0JyxcbiAgICAgICAgICAgIHZhbGlkYXRlKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnbGlnaHQnLCAnZGFyayddLmluZGV4T2YodmFsdWUpICE9PSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgZXhwYW5kZWRDbGFzcygpIHtcbiAgICAgICAgICAgIGlmKGlzQm9vbGVhbih0aGlzLmV4cGFuZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leHBhbmQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwcmVmaXgocHJlZml4KHRoaXMuZXhwYW5kLCAnZXhwYW5kJyksICduYXZiYXInKTtcbiAgICAgICAgfSxcblxuICAgICAgICBjbGFzc2VzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVyZ2VDbGFzc2VzKFxuICAgICAgICAgICAgICAgICduYXZiYXInLFxuICAgICAgICAgICAgICAgIHByZWZpeCh0aGlzLnN0aWNreSA9PT0gdHJ1ZSA/ICd0b3AnIDogdGhpcy5zdGlja3ksICdzdGlja3knKSxcbiAgICAgICAgICAgICAgICBwcmVmaXgodGhpcy5maXhlZCA9PT0gdHJ1ZSA/ICd0b3AnIDogdGhpcy5maXhlZCwgJ2ZpeGVkJyksXG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbmRlZENsYXNzLFxuICAgICAgICAgICAgICAgIHRoaXMudmFyaWFudENsYXNzLFxuICAgICAgICAgICAgICAgIHRoaXMuY29sb3JhYmxlQ2xhc3Nlc1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge31cbiAgICB9XG5cbn1cblxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gICAgPHNwYW4gY2xhc3M9XCJuYXZpZ2F0aW9uLWVycm9yIGZhLXN0YWNrIGZhLW1kXCIgOnRpdGxlPVwiZXJyb3JcIj5cbiAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1zdGFjay0yeCBmYS1jZXJ0aWZpY2F0ZVwiLz5cbiAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1zdGFjay0xeCBmYS1leGNsYW1hdGlvbiBmYS1pbnZlcnNlXCIvPlxuICAgIDwvc3Bhbj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnbmF2aWdhdGlvbi1lcnJvcicsXG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIGVycm9yOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cbkBpbXBvcnQgJy4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9zY3NzL19mdW5jdGlvbnMuc2Nzcyc7XG5AaW1wb3J0ICcuL25vZGVfbW9kdWxlcy9ib290c3RyYXAvc2Nzcy9fdmFyaWFibGVzLnNjc3MnO1xuXG4ubmF2aWdhdGlvbi1lcnJvciB7XG4gICAgY29sb3I6ICRkYW5nZXI7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICAgIDxjb21wb25lbnQgOmlzPVwiY29tcG9uZW50XCIgOmhyZWY9XCJocmVmIHx8ICh0byA/ICcjJyA6IG51bGwpXCIgOnRvPVwidG9cIiA6Y2xhc3M9XCJjbGFzc2VzXCIgQGNsaWNrPVwiJGVtaXQoJ2NsaWNrJywgJGV2ZW50KVwiPlxuICAgICAgICA8c2xvdCAvPlxuICAgICAgICA8bmF2aWdhdGlvbi1lcnJvciB2LWlmPVwiZXJyb3JcIiA6ZXJyb3I9XCJlcnJvclwiLz5cbiAgICA8L2NvbXBvbmVudD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgTmF2aWdhdGlvbkVycm9yIGZyb20gJy4vTmF2aWdhdGlvbkVycm9yJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ25hdmlnYXRpb24tbGluaycsXG5cbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIE5hdmlnYXRpb25FcnJvclxuICAgIH0sXG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJcyB0aGUgbmF2aWdhdGlvbiBpdGVtIGFjdGl2ZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcCB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGFjdGl2ZTogQm9vbGVhbixcblxuICAgICAgICAvKipcbiAgICAgICAgICogSXMgdGhlIG5hdmlnYXRpb24gaXRlbSBkaXNhYmxlZFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcCB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGRpc2FibGVkOiBCb29sZWFuLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZXJyb3Igc3RyaW5nLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcCB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgZXJyb3I6IFN0cmluZyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGhyZWYgYXR0cmlidXRlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBocmVmOiBTdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjb21wb25lbnQgSFRNTCB0YWdcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3Age1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRhZzogU3RyaW5nLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgdG8gYXR0cmlidXRlLCB3aWxsIGJlIHBhc3NlZCB0byByb3V0ZXItbGluay5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3Age1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRvOiBbT2JqZWN0LCBTdHJpbmddLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGQgdGhlIG5hdi1pdGVtIGNsYXNzIHRvIHRoZSBsaW5rXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgaXRlbToge1xuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgY29tcG9uZW50KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFnIHx8ICh0aGlzLnRvID8gJ3JvdXRlci1saW5rJyA6ICdhJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xhc3NlcygpIHtcbiAgICAgICAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZighdGhpcy5pc0l0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0l0ZW0gPSAhdGhpcy4kcGFyZW50LiRlbC5jbGFzc0xpc3QuY29udGFpbnMoJ25hdi1pdGVtJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgJ25hdi1saW5rJzogISF0aGlzLmhyZWYgfHwgISF0aGlzLnRvLFxuICAgICAgICAgICAgICAgICduYXYtaXRlbSc6ICEhdGhpcy5pdGVtLFxuICAgICAgICAgICAgICAgICdhY3RpdmUnOiB0aGlzLmFjdGl2ZSxcbiAgICAgICAgICAgICAgICAnZGlzYWJsZWQnOiB0aGlzLmRpc2FibGVkXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gICAgPGNvbXBvbmVudCA6aXM9XCJjb21wb25lbnRcIiA6Y2xhc3M9XCJjbGFzc2VzXCIgQGNsaWNrPVwiJGVtaXQoJ2NsaWNrJywgJGV2ZW50KVwiPlxuICAgICAgICA8c2xvdCAvPlxuICAgIDwvY29tcG9uZW50PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBOYXZpZ2F0aW9uTGluayBmcm9tICcuL05hdmlnYXRpb25MaW5rJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ25hdmlnYXRpb24taXRlbScsXG5cbiAgICBleHRlbmRzOiBOYXZpZ2F0aW9uTGluayxcblxuICAgIHByb3BzOiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBIVE1MIGVsZW1lbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3Age1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIGVsZW1lbnQ6IFN0cmluZyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogSXMgdGhlIGNvbXBvbmVudCBhIGxpc3QgZWxlbWVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcCB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGxpc3Q6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCB0aGUgbmF2LWl0ZW0gY2xhc3MgdG8gdGhlIGxpbmtcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3Age0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpdGVtOiB7XG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgICAgICB9XG5cbiAgICB9LFxuXG5cbiAgICBjb21wdXRlZDoge1xuXG4gICAgICAgIGNvbXBvbmVudCgpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuaHJlZikge1xuICAgICAgICAgICAgICAgIHJldHVybiAnYSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMubGlzdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnbGknO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gJ2Rpdic7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gICAgPG5hdiBjbGFzcz1cIm5hdlwiIDpjbGFzcz1cImNsYXNzZXNcIiA6cm9sZT1cInJvbGVcIj5cbiAgICAgICAgPHNsb3QvPlxuICAgIDwvbmF2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBOYXZpZ2F0aW9uSXRlbSBmcm9tICcuL05hdmlnYXRpb25JdGVtJztcbmltcG9ydCBwcmVmaXggZnJvbSAnLi4vLi4vSGVscGVycy9QcmVmaXgnO1xuaW1wb3J0IENvbG9yYWJsZSBmcm9tICcuLi8uLi9NaXhpbnMvQ29sb3JhYmxlJztcbmltcG9ydCBNZXJnZUNsYXNzZXMgZnJvbSAnLi4vLi4vTWl4aW5zL01lcmdlQ2xhc3Nlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICduYXZpZ2F0aW9uJyxcblxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgTmF2aWdhdGlvbkl0ZW1cbiAgICB9LFxuXG4gICAgbWl4aW5zOiBbXG4gICAgICAgIENvbG9yYWJsZSxcbiAgICAgICAgTWVyZ2VDbGFzc2VzXG4gICAgXSxcblxuICAgIHByb3BzOiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhlbHBlciB0byBhZGQgdGhlIGp1c3RpZnktY29udGVudC1YIGNsYXNzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcCB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBhbGlnbjogU3RyaW5nLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBbiBhcnJheSBvZiBidXR0b25zXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGJ1dHRvbnM6IEFycmF5LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbmF2aWdhdGlvbiBpbnNpZGUgYSBjYXJkXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgY2FyZDogQm9vbGVhbixcblxuICAgICAgICAvKipcbiAgICAgICAgICogSnVzdGlmeSBuYXYgaXRlbXMgdG8gZmlsbCB0aGUgd2lkdGggZXF1YWxseSAodXNpbmcgZmxleCkuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGZpbGw6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBgbmF2LWp1c3RpZmllZGAgY2xhc3MgdG8gdGhlIGNvbXBvbmVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3Age0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAganVzdGlmaWVkOiBCb29sZWFuLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNwbGF5IGl0ZW1zIGFzIHBpbGwgc2hhcGVzXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIHBpbGxzOiBCb29sZWFuLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNwbGF5IGl0ZW1zIGFzIHRhYiBzaGFwZXNcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3Age0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgdGFiczogQm9vbGVhbixcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlzcGxheSB0aGUgYnV0dG9ucyB2ZXJ0aWNhbGx5XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmVydGljYWw6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSByb2xlIGF0dHJpYnV0ZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcCB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgcm9sZTogU3RyaW5nXG5cbiAgICB9LFxuXG4gICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICBjbGFzc2VzKCkge1xuICAgICAgICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzQ2FyZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQ2FyZCA9IHRoaXMuJHBhcmVudC4kZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXJkLWhlYWRlcicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tZXJnZUNsYXNzZXMoXG4gICAgICAgICAgICAgICAgcHJlZml4KHRoaXMuYWxpZ24sICdqdXN0aWZ5LWNvbnRlbnQnKSxcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG9yYWJsZUNsYXNzZXMsIHtcbiAgICAgICAgICAgICAgICAgICAgJ2NhcmQtaGVhZGVyLXRhYnMnOiB0aGlzLmlzQ2FyZCAmJiB0aGlzLnRhYnMsXG4gICAgICAgICAgICAgICAgICAgICdjYXJkLWhlYWRlci1waWxscyc6IHRoaXMuaXNDYXJkICYmIHRoaXMucGlsbHMsXG4gICAgICAgICAgICAgICAgICAgICduYXYtanVzdGlmaWVkJzogdGhpcy5qdXN0aWZpZWQsXG4gICAgICAgICAgICAgICAgICAgICduYXYtZmlsbCc6IHRoaXMuZmlsbCxcbiAgICAgICAgICAgICAgICAgICAgJ25hdi1waWxscyc6IHRoaXMucGlsbHMsXG4gICAgICAgICAgICAgICAgICAgICduYXYtdGFicyc6IHRoaXMudGFicyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZsZXgtY29sdW1uJzogdGhpcy52ZXJ0aWNhbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaXNDYXJkOiB0aGlzLmNhcmRcbiAgICAgICAgfTtcbiAgICB9XG5cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuXG4gICAgPG5hdmlnYXRpb24taXRlbSBjbGFzcz1cImRyb3Bkb3duXCI+XG5cbiAgICAgICAgPHNsb3QgbmFtZT1cInRvZ2dsZS1idXR0b25cIj5cbiAgICAgICAgICAgIDxuYXZpZ2F0aW9uLWxpbmtcbiAgICAgICAgICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJkcm9wZG93bi10b2dnbGVcIlxuICAgICAgICAgICAgICAgIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIlxuICAgICAgICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICA6YXJpYS1leHBhbmRlZD1cImlzRHJvcGRvd25TaG93aW5nXCJcbiAgICAgICAgICAgICAgICBAY2xpY2submF0aXZlLnByZXZlbnQ9XCJ0b2dnbGUoKVwiXG4gICAgICAgICAgICAgICAgQGJsdXI9XCJvbkJsdXJcIj5cbiAgICAgICAgICAgICAgICB7e2xhYmVsfX1cbiAgICAgICAgICAgIDwvbmF2aWdhdGlvbi1saW5rPlxuICAgICAgICA8L3Nsb3Q+XG5cbiAgICAgICAgPHNsb3QgbmFtZT1cImRyb3Bkb3duLW1lbnVcIj5cbiAgICAgICAgICAgIDxkcm9wZG93bi1tZW51XG4gICAgICAgICAgICAgICAgOmlkPVwiaWRcIlxuICAgICAgICAgICAgICAgIDppdGVtcz1cIml0ZW1zXCJcbiAgICAgICAgICAgICAgICA6YWxpZ249XCJhbGlnblwiXG4gICAgICAgICAgICAgICAgOnNob3cuc3luYz1cImlzRHJvcGRvd25TaG93aW5nXCJcbiAgICAgICAgICAgICAgICBAaXRlbTpjbGljaz1cIm9uSXRlbUNsaWNrXCI+XG4gICAgICAgICAgICAgICAgPHNsb3QvPlxuICAgICAgICAgICAgPC9kcm9wZG93bi1tZW51PlxuICAgICAgICA8L3Nsb3Q+XG5cbiAgICA8L25hdmlnYXRpb24taXRlbT5cblxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBOYXZpZ2F0aW9uSXRlbSBmcm9tICcuL05hdmlnYXRpb25JdGVtJztcbmltcG9ydCBOYXZpZ2F0aW9uTGluayBmcm9tICcuL05hdmlnYXRpb25MaW5rJztcbmltcG9ydCBEcm9wZG93bk1lbnUgZnJvbSAnLi4vRHJvcGRvd25NZW51JztcbmltcG9ydCBCdG5Ecm9wZG93biBmcm9tICcuLi9CdG5Ecm9wZG93bic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICduYXZpZ2F0aW9uLWRyb3Bkb3duJyxcblxuICAgIGV4dGVuZHM6IEJ0bkRyb3Bkb3duLFxuXG4gICAgY29tcG9uZW50czoge1xuICAgICAgICBCdG5Ecm9wZG93bixcbiAgICAgICAgRHJvcGRvd25NZW51LFxuICAgICAgICBOYXZpZ2F0aW9uSXRlbSxcbiAgICAgICAgTmF2aWdhdGlvbkxpbmtcbiAgICB9XG5cbn1cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IE5hdmlnYXRpb24gZnJvbSAnLi9OYXZpZ2F0aW9uJztcbmltcG9ydCBOYXZpZ2F0aW9uRXJyb3IgZnJvbSAnLi9OYXZpZ2F0aW9uRXJyb3InO1xuaW1wb3J0IE5hdmlnYXRpb25JdGVtIGZyb20gJy4vTmF2aWdhdGlvbkl0ZW0nO1xuaW1wb3J0IE5hdmlnYXRpb25MaW5rIGZyb20gJy4vTmF2aWdhdGlvbkxpbmsnO1xuaW1wb3J0IE5hdmlnYXRpb25Ecm9wZG93biBmcm9tICcuL05hdmlnYXRpb25Ecm9wZG93bic7XG5pbXBvcnQgVnVlSW5zdGFsbGVyIGZyb20gJy4uLy4uL0hlbHBlcnMvVnVlSW5zdGFsbGVyL1Z1ZUluc3RhbGxlcic7XG5cbmNvbnN0IHBsdWdpbiA9IFZ1ZUluc3RhbGxlci51c2Uoe1xuXG4gICAgaW5zdGFsbChWdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgVnVlSW5zdGFsbGVyLmNvbXBvbmVudHMoe1xuICAgICAgICAgICAgTmF2aWdhdGlvbixcbiAgICAgICAgICAgIE5hdmlnYXRpb25FcnJvcixcbiAgICAgICAgICAgIE5hdmlnYXRpb25JdGVtLFxuICAgICAgICAgICAgTmF2aWdhdGlvbkxpbmssXG4gICAgICAgICAgICBOYXZpZ2F0aW9uRHJvcGRvd25cbiAgICAgICAgfSk7XG4gICAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgTmF2aWdhdGlvbjtcbiIsIjx0ZW1wbGF0ZT5cbiAgICA8dWwgY2xhc3M9XCJuYXZiYXItbmF2XCIgOmNsYXNzPVwiY2xhc3Nlc1wiIDpyb2xlPVwicm9sZVwiPlxuICAgICAgICA8c2xvdC8+XG4gICAgPC91bD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgTmF2aWdhdGlvbiBmcm9tICcuLi9OYXZpZ2F0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ25hdmJhci1uYXYnLFxuXG4gICAgY29tcG9uZW50czoge1xuICAgICAgICBOYXZpZ2F0aW9uXG4gICAgfVxuXG59XG48L3NjcmlwdD5cbiIsImltcG9ydCBOYXZiYXIgZnJvbSAnLi9OYXZiYXInO1xuaW1wb3J0IE5hdmJhckJyYW5kIGZyb20gJy4vTmF2YmFyQnJhbmQnO1xuaW1wb3J0IE5hdmJhckNvbGxhcHNlIGZyb20gJy4vTmF2YmFyQ29sbGFwc2UnO1xuaW1wb3J0IE5hdmJhck5hdiBmcm9tICcuL05hdmJhck5hdic7XG5pbXBvcnQgTmF2YmFyVGV4dCBmcm9tICcuL05hdmJhclRleHQnO1xuaW1wb3J0IE5hdmJhclRvZ2dsZXIgZnJvbSAnLi9OYXZiYXJUb2dnbGVyJztcbmltcG9ydCBOYXZiYXJUb2dnbGVySWNvbiBmcm9tICcuL05hdmJhclRvZ2dsZXJJY29uJztcbmltcG9ydCBWdWVJbnN0YWxsZXIgZnJvbSAnLi4vLi4vSGVscGVycy9WdWVJbnN0YWxsZXIvVnVlSW5zdGFsbGVyJztcblxuY29uc3QgcGx1Z2luID0gVnVlSW5zdGFsbGVyLnVzZSh7XG5cbiAgICBpbnN0YWxsKFZ1ZSwgb3B0aW9ucykge1xuICAgICAgICBWdWVJbnN0YWxsZXIuY29tcG9uZW50cyh7XG4gICAgICAgICAgICBOYXZiYXIsXG4gICAgICAgICAgICBOYXZiYXJCcmFuZCxcbiAgICAgICAgICAgIE5hdmJhckNvbGxhcHNlLFxuICAgICAgICAgICAgTmF2YmFyTmF2LFxuICAgICAgICAgICAgTmF2YmFyVGV4dCxcbiAgICAgICAgICAgIE5hdmJhclRvZ2dsZXIsXG4gICAgICAgICAgICBOYXZiYXJUb2dnbGVySWNvblxuICAgICAgICB9KTtcbiAgICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBOYXZiYXI7XG4iLCI8dGVtcGxhdGU+XG4gICAgPG5hdiBhcmlhLWxhYmVsPVwiUGFnZSBuYXZpZ2F0aW9uIGV4YW1wbGVcIj5cbiAgICAgICAgPHVsIGNsYXNzPVwicGFnaW5hdGlvblwiIDpjbGFzcz1cImNsYXNzZXNcIj5cbiAgICAgICAgXHQ8bGkgY2xhc3M9XCJwYWdlLWl0ZW1cIiA6Y2xhc3M9XCJ7J2Rpc2FibGVkJzogY3VycmVudFBhZ2UgPT09IDF9XCI+XG4gICAgICAgIFx0XHQ8YSBocmVmPVwiI1wiIGNsYXNzPVwicGFnZS1saW5rXCIgYXJpYS1sYWJlbD1cIlByZXZpb3VzXCIgQGNsaWNrLnByZXZlbnQ9XCJwcmV2KCRldmVudClcIj5cbiAgICAgICAgXHRcdFx0PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JmxhcXVvOzwvc3Bhbj5cbiAgICAgICAgXHRcdDwvYT5cbiAgICAgICAgXHQ8L2xpPlxuICAgICAgICAgICAgPGxpIHYtZm9yPVwiaXRlbSBpbiBwYWdlc1wiIDpkYXRhLXBhZ2U9XCJpdGVtLnBhZ2VcIiBjbGFzcz1cInBhZ2UtaXRlbVwiIDpjbGFzcz1cInsnYWN0aXZlJzogaXRlbS5wYWdlID09PSBjdXJyZW50UGFnZSwgJ2Rpc2FibGVkJzogISFpdGVtLmRpdmlkZXJ9XCI+XG4gICAgICAgICAgICAgICAgPHNsb3QgOml0ZW09XCJpdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhIHYtaWY9XCJpdGVtLmRpdmlkZXJcIiBjbGFzcz1cInBhZ2UtbGlua1wiPiZoZWxsaXA7PC9hPlxuICAgICAgICAgICAgICAgIFx0PGEgdi1lbHNlIGhyZWY9XCIjXCIgY2xhc3M9XCJwYWdlLWxpbmtcIiA6Y2xhc3M9XCJpdGVtLmNsYXNzXCIgOmRhdGEtbGFiZWw9XCJpdGVtLmxhYmVsXCIgQGNsaWNrLnByZXZlbnQ9XCJwYWdpbmF0ZShpdGVtLnBhZ2UsICRldmVudClcIj5cbiAgICAgICAgICAgICAgICBcdFx0PHNwYW4gdi1pZj1cIml0ZW0ubGFiZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIiB2LWh0bWw9XCJpdGVtLmxhYmVsXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIFx0XHQ8c3BhbiB2LWlmPVwiaXRlbS5wYWdlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgdi1odG1sPVwiaXRlbS5wYWdlXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIFx0PC9hPlxuICAgICAgICAgICAgICAgIDwvc2xvdD5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgIFx0PGxpIGNsYXNzPVwicGFnZS1pdGVtXCIgOmNsYXNzPVwieydkaXNhYmxlZCc6IGN1cnJlbnRQYWdlID49IHRvdGFsUGFnZXN9XCI+XG4gICAgICAgIFx0XHQ8YSBocmVmPVwiI1wiIGNsYXNzPVwicGFnZS1saW5rXCIgYXJpYS1sYWJlbD1cIk5leHRcIiBAY2xpY2sucHJldmVudD1cIm5leHQoJGV2ZW50KVwiPlxuICAgICAgICBcdFx0XHQ8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mcmFxdW87PC9zcGFuPlxuICAgICAgICBcdFx0PC9hPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICA8L25hdj5cblxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdwYWdpbmF0aW9uJyxcblxuICAgIHByb3BzOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgYWxpZ25tZW50IG9mIHRoZSBwYWdpbmF0aW9uIGNvbXBvbmVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3AgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBhbGlnbjoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgdmFsaWRhdGU6IHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWydzdGFydCcsICdlbmQnLCAnY2VudGVyJ10uaW5kZXhPZih2YWx1ZSkgIT09IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgcGFnZSBvbiB3aGljaCB0aGUgcGFnaW5hdG9yIHNob3VsZCBzdGFydC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3AgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBwYWdlOiB7XG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICAgICAgICBkZWZhdWx0OiAxXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB0b3RhbCBudW1iZXIgb2YgcGFnZXMgaW4gdGhlIHBhZ2luYXRvci5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3AgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICB0b3RhbFBhZ2VzOiB7XG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICAgICAgICBkZWZhdWx0OiAxXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBudW1iZXIgb2YgcGFnZXMgdG8gc2hvdyB3aGVuIHRoZSB0b3RhbCBudW1iZXIgb2YgcGFnZXMgaXNcbiAgICAgICAgICogZ3JlYXRlciB0aGFuIHRoZSBudW1iZXIgb2YgcGFnZXMgdGhhdCBzaG91bGQgYmUgc2hvd24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wIFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgc2hvd1BhZ2VzOiB7XG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICAgICAgICBkZWZhdWx0OiA2XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcblxuICAgICAgICBuZXh0KGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2luYXRlKHRoaXMuY3VycmVudFBhZ2UgPj0gdGhpcy50b3RhbFBhZ2VzID8gdGhpcy5jdXJyZW50UGFnZSA6IHRoaXMuY3VycmVudFBhZ2UgKyAxLCBldmVudCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcHJldihldmVudCkge1xuICAgICAgICAgICAgdGhpcy5wYWdpbmF0ZSh0aGlzLmN1cnJlbnRQYWdlIDw9IDEgPyB0aGlzLmN1cnJlbnRQYWdlIDogdGhpcy5jdXJyZW50UGFnZSAtIDEsIGV2ZW50KTtcbiAgICAgICAgfSxcblxuICAgICAgICBwYWdpbmF0ZShwYWdlLCBldmVudCkge1xuICAgICAgICAgICAgaWYoZXZlbnQuY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuXHRcdFx0dGhpcy5zZXRBY3RpdmVQYWdlKHBhZ2UpO1xuXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdwYWdpbmF0ZScsIHBhZ2UsIGV2ZW50KTtcbiAgICAgICAgfSxcblxuXHRcdHNldEFjdGl2ZVBhZ2UocGFnZSkge1xuXHRcdFx0aWYodGhpcy5jdXJyZW50UGFnZSAhPT0gcGFnZSkge1xuXHRcdFx0XHR0aGlzLmN1cnJlbnRQYWdlID0gcGFnZTtcblx0XHRcdH1cblx0XHR9LFxuXG4gICAgICAgIGdlbmVyYXRlKCkge1xuICAgICAgICAgICAgY29uc3QgcGFnZXMgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHNob3dQYWdlcyA9IHRoaXMuc2hvd1BhZ2VzICUgMiA/IHRoaXMuc2hvd1BhZ2VzICsgMTogdGhpcy5zaG93UGFnZXM7XG5cbiAgICAgICAgICAgIGxldCBzdGFydFBhZ2UgPSAodGhpcy5jdXJyZW50UGFnZSA+PSBzaG93UGFnZXMpID8gdGhpcy5jdXJyZW50UGFnZSAtIChzaG93UGFnZXMgLyAyKSA6IDE7XG4gICAgICAgICAgICBjb25zdCBzdGFydE9mZnNldCA9IHNob3dQYWdlcyArIHN0YXJ0UGFnZTtcbiAgICAgICAgICAgIGNvbnN0IGVuZFBhZ2UgPSAodGhpcy50b3RhbFBhZ2VzIDwgc3RhcnRPZmZzZXQpID8gdGhpcy50b3RhbFBhZ2VzIDogc3RhcnRPZmZzZXQ7XG4gICAgICAgICAgICBjb25zdCBkaWZmID0gc3RhcnRQYWdlIC0gZW5kUGFnZSArIHNob3dQYWdlcztcblxuICAgICAgICAgICAgc3RhcnRQYWdlIC09IChzdGFydFBhZ2UgLSBkaWZmID4gMCkgPyBkaWZmIDogMDtcblxuICAgICAgICAgICAgaWYgKHN0YXJ0UGFnZSA+IDEpIHtcbiAgICAgICAgICAgICAgICBwYWdlcy5wdXNoKHtwYWdlOiAxfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHN0YXJ0UGFnZSA+IDIpIHtcbiAgICAgICAgICAgICAgICBwYWdlcy5wdXNoKHtkaXZpZGVyOiB0cnVlfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvcihsZXQgaSA9IHN0YXJ0UGFnZTsgaSA8IGVuZFBhZ2U7IGkrKykge1xuICAgICAgICAgICAgICAgIHBhZ2VzLnB1c2goe3BhZ2U6IGl9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVuZFBhZ2UgPD0gdGhpcy50b3RhbFBhZ2VzKSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy50b3RhbFBhZ2VzIC0gMSA+IGVuZFBhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXMucHVzaCh7ZGl2aWRlcjogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHBhZ2VzLnB1c2goe3BhZ2U6IHRoaXMudG90YWxQYWdlc30pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGFnZXM7XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBjb21wdXRlZDoge1xuXG4gICAgICAgIHBhZ2VzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBjbGFzc2VzKCkge1xuICAgICAgICAgICAgY29uc3QgY2xhc3NlcyA9IHt9O1xuXG4gICAgICAgICAgICBjbGFzc2VzWydqdXN0aWZ5LWNvbnRlbnQtJyArIHRoaXMuYWxpZ25dID0gdHJ1ZTtcblxuICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXM7XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4gIHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLnBhZ2VcbiAgICAgICAgfTtcbiAgICB9XG5cbn07XG48L3NjcmlwdD5cbiIsImltcG9ydCBQYWdpbmF0aW9uIGZyb20gJy4vUGFnaW5hdGlvbic7XG5pbXBvcnQgVnVlSW5zdGFsbGVyIGZyb20gJy4uLy4uL0hlbHBlcnMvVnVlSW5zdGFsbGVyL1Z1ZUluc3RhbGxlcic7XG5cbmNvbnN0IHBsdWdpbiA9IFZ1ZUluc3RhbGxlci51c2Uoe1xuXG4gICAgaW5zdGFsbChWdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgVnVlSW5zdGFsbGVyLmNvbXBvbmVudHMoe1xuICAgICAgICAgICAgUGFnaW5hdGlvblxuICAgICAgICB9KTtcbiAgICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBQYWdpbmF0aW9uO1xuIiwiPHRlbXBsYXRlPlxuXG4gICAgPGZvcm0tZ3JvdXA+XG5cbiAgICAgICAgPHNsb3QgbmFtZT1cImxhYmVsXCI+XG4gICAgICAgICAgICA8Zm9ybS1sYWJlbCB2LWlmPVwibGFiZWxcIiA6Zm9yPVwiaWRcIiB2LWh0bWw9XCJsYWJlbFwiLz5cbiAgICAgICAgPC9zbG90PlxuXG4gICAgICAgIDxzbG90IG5hbWU9XCJjb250cm9sXCI+XG4gICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgOmlkPVwiaWRcIlxuICAgICAgICAgICAgICAgIDpuYW1lPVwibmFtZVwiXG4gICAgICAgICAgICAgICAgOnZhbHVlPVwidmFsdWVcIlxuICAgICAgICAgICAgICAgIDpyZXF1aXJlZD1cInJlcXVpcmVkXCJcbiAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCJkaXNhYmxlZCB8fCByZWFkb25seVwiXG4gICAgICAgICAgICAgICAgOnJlYWRvbmx5PVwicmVhZG9ubHlcIlxuICAgICAgICAgICAgICAgIDpwYXR0ZXJuPVwicGF0dGVyblwiXG4gICAgICAgICAgICAgICAgOmNsYXNzPVwibWVyZ2VDbGFzc2VzKGNvbnRyb2xDbGFzc2VzLCBjb2xvcmFibGVDbGFzc2VzKVwiXG4gICAgICAgICAgICAgICAgQGlucHV0PVwiJGVtaXQoJ2lucHV0JywgJGV2ZW50LnRhcmdldC52YWx1ZSlcIj5cbiAgICAgICAgICAgICAgICA8c2xvdCAvPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvc2xvdD5cblxuICAgICAgICA8c2xvdCBuYW1lPVwiaGVscFwiPlxuICAgICAgICAgICAgPGhlbHAtdGV4dCB2LWlmPVwiaGVscFRleHRcIiB2LWh0bWw9XCJoZWxwVGV4dFwiIC8+XG4gICAgICAgIDwvc2xvdD5cblxuICAgICAgICA8c2xvdCBuYW1lPVwiZmVlZGJhY2tcIj5cbiAgICAgICAgICAgIDxmb3JtLWZlZWRiYWNrIHYtaWY9XCJ2YWxpZEZlZWRiYWNrXCIgdi1odG1sPVwidmFsaWRGZWVkYmFja1wiIHZhbGlkIC8+XG4gICAgICAgICAgICA8Zm9ybS1mZWVkYmFjayB2LWlmPVwiaW52YWxpZEZlZWRiYWNrXCIgdi1odG1sPVwiaW52YWxpZEZlZWRiYWNrXCIgaW52YWxpZCAvPlxuICAgICAgICA8L3Nsb3Q+XG5cbiAgICA8L2Zvcm0tZ3JvdXA+XG5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgSGVscFRleHQgZnJvbSAnLi4vSGVscFRleHQnO1xuaW1wb3J0IEZvcm1Hcm91cCBmcm9tICcuLi9Gb3JtR3JvdXAnO1xuaW1wb3J0IEZvcm1MYWJlbCBmcm9tICcuLi9Gb3JtTGFiZWwnO1xuaW1wb3J0IEZvcm1GZWVkYmFjayBmcm9tICcuLi9Gb3JtRmVlZGJhY2snO1xuaW1wb3J0IENvbG9yYWJsZSBmcm9tICcuLi8uLi9NaXhpbnMvQ29sb3JhYmxlJztcbmltcG9ydCBGb3JtQ29udHJvbCBmcm9tICcuLi8uLi9NaXhpbnMvRm9ybUNvbnRyb2wnO1xuaW1wb3J0IE1lcmdlQ2xhc3NlcyBmcm9tICcuLi8uLi9NaXhpbnMvTWVyZ2VDbGFzc2VzJztcblxuY29uc3QgQ1VTVE9NX1NFTEVDVF9QUkVGSVggPSAnY3VzdG9tLXNlbGVjdC0nXG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdzZWxlY3QtZmllbGQnLFxuXG4gICAgY29tcG9uZW50czoge1xuICAgICAgICBIZWxwVGV4dCxcbiAgICAgICAgRm9ybUdyb3VwLFxuICAgICAgICBGb3JtTGFiZWwsXG4gICAgICAgIEZvcm1GZWVkYmFja1xuICAgIH0sXG5cbiAgICBleHRlbmRzOiBGb3JtQ29udHJvbCxcblxuICAgIG1peGluczogW1xuICAgICAgICBDb2xvcmFibGUsXG4gICAgICAgIEZvcm1Db250cm9sLFxuICAgICAgICBNZXJnZUNsYXNzZXNcbiAgICBdLFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkIGBjdXN0b20tc2VsZWN0YCB0byB0aGUgZm9ybSBjb250cm9sIGlmIHRydWUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIGN1c3RvbTogQm9vbGVhblxuXG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgY29udHJvbENsYXNzKCkge1xuICAgICAgICAgICAgY29uc3QgY29udHJvbENsYXNzID0gdGhpcy5jdXN0b20gPyAnY3VzdG9tLXNlbGVjdCcgOiB0aGlzLmRlZmF1bHRDb250cm9sQ2xhc3M7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wbGFpbnRleHQgPyBgJHtjb250cm9sQ2xhc3N9LXBsYWludGV4dGAgOiBjb250cm9sQ2xhc3M7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3VzdG9tU2VsZWN0Q2xhc3NlcygpIHtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgQ1VTVE9NX1NFTEVDVF9QUkVGSVgucmVwbGFjZSgvXFwtJC8sICcnKSArICh0aGlzLnBsYWludGV4dCA/ICctcGxhaW50ZXh0JyA6ICcnKSxcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbVNlbGVjdFNpemVDbGFzcyxcbiAgICAgICAgICAgICAgICAodGhpcy5zcGFjaW5nIHx8ICcnKVxuICAgICAgICAgICAgXS5qb2luKCcgJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IFNlbGVjdEZpZWxkIGZyb20gJy4vU2VsZWN0RmllbGQnO1xuaW1wb3J0IFZ1ZUluc3RhbGxlciBmcm9tICcuLi8uLi9IZWxwZXJzL1Z1ZUluc3RhbGxlci9WdWVJbnN0YWxsZXInO1xuXG5jb25zdCBwbHVnaW4gPSBWdWVJbnN0YWxsZXIudXNlKHtcblxuICAgIGluc3RhbGwoVnVlLCBvcHRpb25zKSB7XG4gICAgICAgIFZ1ZUluc3RhbGxlci5jb21wb25lbnRzKHtcbiAgICAgICAgICAgIFNlbGVjdEZpZWxkXG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdEZpZWxkO1xuIiwiPHNjcmlwdD5cbmltcG9ydCB7IGV4dGVuZCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCB7IGZpcnN0IH0gZnJvbSAnLi4vLi4vSGVscGVycy9GdW5jdGlvbnMnO1xuaW1wb3J0IHsgZmluZEluZGV4IH0gZnJvbSAnLi4vLi4vSGVscGVycy9GdW5jdGlvbnMnO1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICcuLi8uLi9IZWxwZXJzL0Z1bmN0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdzbGlkZXMnLFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGFjdGl2ZSBzbGlkZSBpbmRleCBvciBrZXkuXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd8TnVtYmVyfVxuICAgICAgICAgKi9cblxuICAgICAgICBhY3RpdmU6IHtcbiAgICAgICAgICAgIHR5cGU6IFtTdHJpbmcsIE51bWJlcl0sXG4gICAgICAgICAgICBkZWZhdWx0OiAwXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICB3YXRjaDoge1xuXG4gICAgICAgIGFjdGl2ZSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMubGFzdFNsaWRlID0gb2xkVmFsdWU7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTbGlkZSA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgbWV0aG9kczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgdGhlIEhUTUwgbm9kZXMgZnJvbSB0aGUgZGVmYXVsdCBzbG90cyAoZXhsdWRpbmcgY2hpbGRyZW4gd2l0aG91dCB0YWdzKS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBzbGlkZXMoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kc2xvdHMuZGVmYXVsdFxuICAgICAgICAgICAgICAgIC5maWx0ZXIoKHZub2RlLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIXZub2RlLnRhZztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5tYXAoKHZub2RlLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCF2bm9kZS5rZXkgfHwgIXZub2RlLmRhdGEgJiYgIXZub2RlLmRhdGEua2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2bm9kZS5kYXRhID0gZXh0ZW5kKHZub2RlLmRhdGEsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IHZub2RlLmtleSA9IGlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZub2RlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgYSBzbGlkZSBieSBpbmRleC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICBzbGlkZShpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZFNsaWRlQnlLZXkoaW5kZXgpIHx8IHRoaXMuZmluZFNsaWRlQnlJbmRleChpbmRleCkgfHwgdGhpcy5maW5kU2xpZGVCeUluZGV4KDApO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaW5kIGEgc2xpZGUgYnkgYSBnaXZlbiBrZXkgb3IgcmV0dXJuIG51bGwgaWYgbm9uIGZvdW5kLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gIHtOdW1iZXJ8U3RyaW5nfSBrZXlcbiAgICAgICAgICogQHJldHVybiB7Vk5vZGV8bnVsbH1cbiAgICAgICAgICovXG4gICAgICAgIGZpbmRTbGlkZUJ5S2V5KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGZpcnN0KHRoaXMuc2xpZGVzKCkuZmlsdGVyKCh2bm9kZSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHZub2RlLmtleSA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2bm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZih2bm9kZS5kYXRhICYmIHZub2RlLmRhdGEua2V5ID09PSBrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZub2RlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSkpXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpbmQgYSBzbGlkZSBieSBhIGdpdmVuIGluZGV4IG9yIHJldHVybiBudWxsIGlmIG5vbiBmb3VuZC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtICB7TnVtYmVyfFN0cmluZ30ga2V5XG4gICAgICAgICAqIEByZXR1cm4ge1ZOb2RlfG51bGx9XG4gICAgICAgICAqL1xuICAgICAgICBmaW5kU2xpZGVCeUluZGV4KGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zbGlkZXMoKVtpbmRleF0gfHwgbnVsbDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHRoZSBzbGlkZSBpbmRleCBmb3IgYSBnaXZlIHNsaWRlIG9iamVjdCBvciBrZXlcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtICB7TnVtYmVyfFN0cmluZ30gc2xpZGVcbiAgICAgICAgICogQHJldHVybiB7Vk5vZGV8bnVsbH1cbiAgICAgICAgICovXG4gICAgICAgIGdldFNsaWRlSW5kZXgoc2xpZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9ICFpc1VuZGVmaW5lZChzbGlkZS5kYXRhKSA/IHNsaWRlLmRhdGEua2V5IDogc2xpZGUua2V5IHx8IHNsaWRlO1xuXG4gICAgICAgICAgICByZXR1cm4gZmluZEluZGV4KHRoaXMuc2xpZGVzKCksICh2bm9kZSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHNsaWRlID09PSB2bm9kZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZih2bm9kZS5kYXRhICYmIHZub2RlLmRhdGEua2V5ID09PSBrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYodm5vZGUua2V5ICYmIHZub2RlLmtleSA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGkgPT09IHNsaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxhc3RTbGlkZTogbnVsbCxcbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZTogdGhpcy5hY3RpdmVcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW5kZXIoaCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zbGlkZSh0aGlzLmN1cnJlbnRTbGlkZSk7XG4gICAgfVxuXG59O1xuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gICAgPCEtLSBUT0RPOiBBZGQgdG9vbHRpcCB3aXRoIHNsaWRlIG5hbWUva2V5IHRvIHRoZSBjb250cm9sIG9uY2UgdGhlIHRvb2x0aXAgZGlyZWN0aXZlIGhhcyBiZWVuIHdyaXR0ZW4uIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJzbGlkZS1kZWNrLWNvbnRyb2xzXCI+XG4gICAgICAgIDxhIHYtZm9yPVwic2xpZGUgaW4gc2xpZGVzXCIgaHJlZj1cIiNcIiBAY2xpY2sucHJldmVudD1cIm9uQ2xpY2soJGV2ZW50LCBzbGlkZSlcIiBjbGFzcz1cInNsaWRlLWRlY2stY29udHJvbC1pY29uXCIgOmNsYXNzPVwieydpcy1hY3RpdmUnOiAoc2xpZGUuZGF0YSA/IHNsaWRlLmRhdGEua2V5IDogc2xpZGUua2V5KSA9PT0gYWN0aXZlfVwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jaXJjbGVcIi8+XG4gICAgICAgIDwvYT5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnc2xpZGUtZGVjay1jb250cm9scycsXG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgc2xpZGUga2V5IG9yIGluZGV4IHRoYXQgc2hvdWxkIHNob3cuXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBhY3RpdmU6IHtcbiAgICAgICAgICAgIHR5cGU6IFtTdHJpbmcsIE51bWJlcl0sXG4gICAgICAgICAgICBkZWZhdWx0OiAwXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFuIGFycmF5IG9mIHNsaWRlIHZub2Rlc1xuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgc2xpZGVzOiB7XG4gICAgICAgICAgICB0eXBlOiBBcnJheSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgb25DbGljayhldmVudCwgc2xpZGUpIHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NsaWNrJywgZXZlbnQsIHNsaWRlKVxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgY29tcHV0ZWQ6IHtcblxuICAgIH0sXG5cbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge31cbiAgICB9XG5cbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCI+XG5AaW1wb3J0ICcuL25vZGVfbW9kdWxlcy9ib290c3RyYXAvc2Nzcy9mdW5jdGlvbnMuc2Nzcyc7XG5AaW1wb3J0ICcuL25vZGVfbW9kdWxlcy9ib290c3RyYXAvc2Nzcy92YXJpYWJsZXMuc2Nzcyc7XG5cbi5zbGlkZS1kZWNrLWNvbnRyb2xzIHtcbiAgICAuc2xpZGUtZGVjay1jb250cm9sLWljb24ge1xuICAgICAgICBjb2xvcjogJHdoaXRlO1xuICAgICAgICBmb250LXNpemU6ICRmb250LXNpemUtYmFzZTtcblxuICAgICAgICAmOm5vdCg6bGFzdC1jaGlsZCkge1xuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAkZm9udC1zaXplLWJhc2UgLyAyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLnNsaWRlLWRlY2stY29udHJvbC1pY29uLmlzLWFjdGl2ZSB7XG4gICAgICAgIGNvbG9yOiAkcHJpbWFyeTtcbiAgICB9XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJzbGlkZS1kZWNrXCIgOmNsYXNzPVwieydzbGlkZS1kZWNrLWZsZXgnOiBjZW50ZXJ9XCI+XG4gICAgICAgIDxkaXYgcmVmPVwiY29udGVudFwiIGNsYXNzPVwic2xpZGUtZGVjay1jb250ZW50XCIgOnN0eWxlPVwie3dpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHR9XCI+XG4gICAgICAgICAgICA8a2VlcC1hbGl2ZT5cbiAgICAgICAgICAgICAgICA8dHJhbnNpdGlvblxuICAgICAgICAgICAgICAgICAgICA6bmFtZT1cImBzbGlkZS0ke2RpcmVjdGlvbn1gXCJcbiAgICAgICAgICAgICAgICAgICAgQGFmdGVyLWVudGVyPVwib25TbGlkZUFmdGVyRW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICBAYmVmb3JlLWVudGVyPVwib25TbGlkZUJlZm9yZUVudGVyXCJcbiAgICAgICAgICAgICAgICAgICAgQGVudGVyPVwib25TbGlkZUVudGVyXCJcbiAgICAgICAgICAgICAgICAgICAgQGFmdGVyLWxlYXZlPVwib25TbGlkZUFmdGVyTGVhdmVcIlxuICAgICAgICAgICAgICAgICAgICBAYmVmb3JlLWxlYXZlPVwib25TbGlkZUJlZm9yZUxlYXZlXCJcbiAgICAgICAgICAgICAgICAgICAgQGxlYXZlPVwib25TbGlkZUxlYXZlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzbGlkZXMgcmVmPVwic2xpZGVzXCIgOmtleT1cImN1cnJlbnRTbGlkZVwiIDphY3RpdmU9XCJjdXJyZW50U2xpZGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzbG90Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9zbGlkZXM+XG4gICAgICAgICAgICAgICAgPC90cmFuc2l0aW9uPlxuICAgICAgICAgICAgPC9rZWVwLWFsaXZlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHNsb3QgbmFtZT1cImNvbnRyb2xzXCI+XG4gICAgICAgICAgICA8c2xpZGUtZGVjay1jb250cm9scyB2LWlmPVwiY29udHJvbHNcIiByZWY9XCJjb250cm9sc1wiIDpzbGlkZXM9XCJzbGlkZXMoKVwiIDphY3RpdmU9XCJjdXJyZW50U2xpZGVcIiBAY2xpY2s9XCJvbkNsaWNrQ29udHJvbFwiIC8+XG4gICAgICAgIDwvc2xvdD5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vLi4vSGVscGVycy9GdW5jdGlvbnMnO1xuaW1wb3J0IHVuaXQgZnJvbSAnLi4vLi4vSGVscGVycy9Vbml0JztcbmltcG9ydCB0cmFuc2l0aW9uIGZyb20gJy4uLy4uL0hlbHBlcnMvVHJhbnNpdGlvbic7XG5pbXBvcnQgU2xpZGVzIGZyb20gJy4vU2xpZGVzJztcbmltcG9ydCBTbGlkZURlY2tDb250cm9scyBmcm9tICcuL1NsaWRlRGVja0NvbnRyb2xzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ3NsaWRlLWRlY2snLFxuXG4gICAgY29tcG9uZW50czoge1xuICAgICAgICBTbGlkZXMsXG4gICAgICAgIFNsaWRlRGVja0NvbnRyb2xzXG4gICAgfSxcblxuICAgIHByb3BzOiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBzbGlkZSBrZXkgb3IgaW5kZXggdGhhdCBzaG91bGQgc2hvdy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIGFjdGl2ZToge1xuICAgICAgICAgICAgdHlwZTogW1N0cmluZywgTnVtYmVyXSxcbiAgICAgICAgICAgIGRlZmF1bHQ6IDBcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2VudGVyIHRoZSBzbGlkZS1kZWNrLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSBCb29sZWFuXG4gICAgICAgICAqL1xuICAgICAgICBjZW50ZXI6IHtcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNob3cgdGhlIHNsaWRlLWRlY2sgY29udHJvbHMgdG8gY2hhbmdlIHRoZSBzbGlkZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUgQm9vbGVhblxuICAgICAgICAgKi9cbiAgICAgICAgY29udHJvbHM6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZsZXggdGhlIGNvbnRlbnQgd2l0aGluIHRoZSBwb3BvdmVyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSBCb29sZWFuXG4gICAgICAgICAqL1xuICAgICAgICBmbGV4OiB7XG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHaXZlIGEgc2VsZWN0b3Igb3IgRWxlbWVudCB0byB1c2UgYXBwbHkgYSBoaWRkZW4gb3ZlcmZsb3cuIElmIGZhbHNlLFxuICAgICAgICAgKiBubyBvdmVyZmxvdyB3aWxsIGJlIGFwcGxpZWQuIERlZmF1bHRzIHRvIHRoZSBzbGlkZSBkZWNrJ3MgY29udGFpbmVyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfEVsZW1lbnR8Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIG92ZXJmbG93OiB7XG4gICAgICAgICAgICB0eXBlOiBbT2JqZWN0LCBTdHJpbmcsIEVsZW1lbnQsIEJvb2xlYW5dLFxuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbW9kZSBkZXRlcm1pbmVzIGhvdyB0aGUgcG9wb3ZlciBjb250ZW50IHdpbGwgZmxleCBiYXNlZCBvbiB0aGVcbiAgICAgICAgICogdmFyeWluZyBoZWlnaHRzIG9mIHRoZSBzbGlkZXMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgICAgICovXG4gICAgICAgIHJlc2l6ZU1vZGU6IHtcbiAgICAgICAgICAgIHR5cGU6IFtGdW5jdGlvbiwgQm9vbGVhbiwgU3RyaW5nXSxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICdhdXRvJyxcbiAgICAgICAgICAgIHZhbGlkYXRlKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnYXV0bycsICdpbml0aWFsJywgJ2luaGVyaXQnXS5pbmRleE9mKHZhbHVlKSAhPT0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIHdhdGNoOiB7XG5cbiAgICAgICAgYWN0aXZlKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5sYXN0U2xpZGUgPSBvbGRWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNsaWRlID0gdmFsdWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3VycmVudFNsaWRlKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSB0aGlzLiRyZWZzLnNsaWRlcy5nZXRTbGlkZUluZGV4KG9sZFZhbHVlKSA+IHRoaXMuJHJlZnMuc2xpZGVzLmdldFNsaWRlSW5kZXgodmFsdWUpID8gJ2JhY2t3YXJkJyA6ICdmb3J3YXJkJztcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcblxuICAgICAgICByZXNpemUoZWwpIHtcbiAgICAgICAgICAgIGlmKGlzRnVuY3Rpb24odGhpcy5yZXNpemVNb2RlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplTW9kZS5jYWxsKHRoaXMsIGVsIHx8IHRoaXMuJGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XG5cbiAgICAgICAgICAgICAgICBpZighZWwuc3R5bGUud2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZWwud2lkdGggPSBlbC5zdHlsZS53aWR0aCA9IGBjYWxjKCR7c3R5bGUud2lkdGh9ICsgJHtzdHlsZS5tYXJnaW5MZWZ0fSArICR7c3R5bGUubWFyZ2luUmlnaHR9KWA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoIWVsLnN0eWxlLmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBlbC5oZWlnaHQgPSBlbC5zdHlsZS5oZWlnaHQgPSBgY2FsYygke3N0eWxlLmhlaWdodH0gKyAke3N0eWxlLm1hcmdpblRvcH0gKyAke3N0eWxlLm1hcmdpbkJvdHRvbX0pYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2xpZGUoaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRyZWZzLnNsaWRlcyA/IHRoaXMuJHJlZnMuc2xpZGVzLnNsaWRlKGluZGV4IHx8IHRoaXMuYWN0aXZlKSA6IG51bGw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2xpZGVzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHJlZnMuc2xpZGVzID8gdGhpcy4kcmVmcy5zbGlkZXMuc2xpZGVzKCkgOiBbXTtcbiAgICAgICAgfSxcblxuICAgICAgICBvbkNsaWNrQ29udHJvbChldmVudCwgdm5vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNsaWRlID0gdm5vZGUuZGF0YSA/IHZub2RlLmRhdGEua2V5IDogdm5vZGUua2V5O1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uU2xpZGVBZnRlckVudGVyKGVsKSB7XG4gICAgICAgICAgICBpZihlbC53aWR0aCkge1xuICAgICAgICAgICAgICAgIGVsLndpZHRoID0gZWwuc3R5bGUud2lkdGggPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihlbC5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBlbC5oZWlnaHQgPSBlbC5zdHlsZS5oZWlnaHQgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoXG4gICAgICAgICAgICAgICAgJ2FmdGVyLWVudGVyJywgdGhpcy4kcmVmcy5zbGlkZXMuc2xpZGUodGhpcy5jdXJyZW50U2xpZGUpLCB0aGlzLiRyZWZzLnNsaWRlcy5zbGlkZSh0aGlzLmxhc3RTbGlkZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25TbGlkZUJlZm9yZUVudGVyKGVsKSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KFxuICAgICAgICAgICAgICAgICdiZWZvcmUtZW50ZXInLCB0aGlzLiRyZWZzLnNsaWRlcy5zbGlkZSh0aGlzLmN1cnJlbnRTbGlkZSksIHRoaXMuJHJlZnMuc2xpZGVzLnNsaWRlKHRoaXMubGFzdFNsaWRlKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcblxuICAgICAgICBvblNsaWRlRW50ZXIoZWwsIGRvbmUpIHtcbiAgICAgICAgICAgIHRoaXMucmVzaXplKGVsKTtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSBlbC5zdHlsZS53aWR0aDtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gZWwuc3R5bGUuaGVpZ2h0O1xuXG4gICAgICAgICAgICB0cmFuc2l0aW9uKGVsKS50aGVuKGRlbGF5ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRuZXh0VGljayhkb25lKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLiRlbWl0KFxuICAgICAgICAgICAgICAgICdlbnRlcicsIHRoaXMuJHJlZnMuc2xpZGVzLnNsaWRlKHRoaXMuY3VycmVudFNsaWRlKSwgdGhpcy4kcmVmcy5zbGlkZXMuc2xpZGUodGhpcy5sYXN0U2xpZGUpXG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uU2xpZGVBZnRlckxlYXZlKGVsKSB7XG4gICAgICAgICAgICBpZihlbC53aWR0aCkge1xuICAgICAgICAgICAgICAgIGVsLndpZHRoID0gZWwuc3R5bGUud2lkdGggPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihlbC5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBlbC5oZWlnaHQgPSBlbC5zdHlsZS5oZWlnaHQgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLiRuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdChcbiAgICAgICAgICAgICAgICAgICAgJ2FmdGVyLWxlYXZlJywgdGhpcy4kcmVmcy5zbGlkZXMuc2xpZGUodGhpcy5sYXN0U2xpZGUpLCB0aGlzLiRyZWZzLnNsaWRlcy5zbGlkZSh0aGlzLmN1cnJlbnRTbGlkZSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25TbGlkZUJlZm9yZUxlYXZlKGVsKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZShlbCk7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KFxuICAgICAgICAgICAgICAgICdiZWZvcmUtbGVhdmUnLCB0aGlzLiRyZWZzLnNsaWRlcy5zbGlkZSh0aGlzLmxhc3RTbGlkZSksIHRoaXMuJHJlZnMuc2xpZGVzLnNsaWRlKHRoaXMuY3VycmVudFNsaWRlKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcblxuICAgICAgICBvblNsaWRlTGVhdmUoZWwsIGRvbmUpIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb24oZWwpLnRoZW4oZGVsYXkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5leHRUaWNrKGRvbmUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuJGVtaXQoXG4gICAgICAgICAgICAgICAgJ2xlYXZlJywgdGhpcy4kcmVmcy5zbGlkZXMuc2xpZGUodGhpcy5sYXN0U2xpZGUpLCB0aGlzLiRyZWZzLnNsaWRlcy5zbGlkZSh0aGlzLmN1cnJlbnRTbGlkZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBjb21wdXRlZDoge1xuXG4gICAgICAgIG92ZXJmbG93RWxlbWVudCgpIHtcbiAgICAgICAgICAgIGlmKHRoaXMub3ZlcmZsb3cgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMub3ZlcmZsb3cgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmZsb3c7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMub3ZlcmZsb3cgJiYgdGhpcy5vdmVyZmxvdy5lbG0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vdmVyZmxvdy5lbG07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMub3ZlcmZsb3cpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLm92ZXJmbG93KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSxcblxuICAgICAgICBub2RlcygpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzbG90cy5kZWZhdWx0O1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgaWYodGhpcy5vdmVyZmxvd0VsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmZsb3dFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhlaWdodDogbnVsbCxcbiAgICAgICAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgICAgICAgbGFzdFNsaWRlOiBudWxsLFxuICAgICAgICAgICAgY3VycmVudFNsaWRlOiB0aGlzLmFjdGl2ZSxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ2ZvcndhcmQnXG4gICAgICAgIH1cbiAgICB9XG5cbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCI+XG4uc2xpZGUtZGVjayB7XG4gICAgaGVpZ2h0OiBhdXRvO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgICYuc2xpZGUtZGVjay1mbGV4IHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cbiAgICAgICAgLnNsaWRlLWRlY2stY29udGVudCB7XG4gICAgICAgICAgICBmbGV4OiAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLnNsaWRlLWRlY2stY29udGVudCB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIC4zMzNzIGVhc2U7XG4gICAgfVxuXG4gICAgLypcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgKi9cblxuICAgIC5zbGlkZS1kZWNrLWNvbnRyb2xzIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBsZWZ0OiA1MCU7XG4gICAgICAgIGJvdHRvbTogMXJlbTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xuICAgIH1cblxuICAgIC5zbGlkZS1mb3J3YXJkLWVudGVyLWFjdGl2ZSxcbiAgICAuc2xpZGUtZm9yd2FyZC1sZWF2ZS1hY3RpdmUsXG4gICAgLnNsaWRlLWJhY2t3YXJkLWVudGVyLWFjdGl2ZSxcbiAgICAuc2xpZGUtYmFja3dhcmQtbGVhdmUtYWN0aXZlIHtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIC4zMzNzIGVhc2Utb3V0O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICB9XG5cbiAgICAuc2xpZGUtZm9yd2FyZC1lbnRlci1hY3RpdmUsXG4gICAgLnNsaWRlLWJhY2t3YXJkLWVudGVyLWFjdGl2ZSB7XG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAuMzMzcyBlYXNlLW91dDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuXG4gICAgLnNsaWRlLWZvcndhcmQtZW50ZXItYWN0aXZlIHtcbiAgICAgICAgbGVmdDogMDtcbiAgICB9XG5cbiAgICAuc2xpZGUtYmFja3dhcmQtZW50ZXItYWN0aXZlIHtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgfVxuXG4gICAgLnNsaWRlLWZvcndhcmQtZW50ZXItYWN0aXZlLFxuICAgIC5zbGlkZS1iYWNrd2FyZC1sZWF2ZS10byB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMTUlKTtcbiAgICB9XG5cbiAgICAuc2xpZGUtZm9yd2FyZC1sZWF2ZS10byxcbiAgICAuc2xpZGUtYmFja3dhcmQtZW50ZXItYWN0aXZlIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMTUlKTtcbiAgICB9XG5cbiAgICAuc2xpZGUtZm9yd2FyZC1lbnRlci10byxcbiAgICAuc2xpZGUtYmFja3dhcmQtZW50ZXItdG8ge1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG4gICAgfVxuXG59XG48L3N0eWxlPlxuIiwiaW1wb3J0IFNsaWRlcyBmcm9tICcuL1NsaWRlcyc7XG5pbXBvcnQgU2xpZGVEZWNrIGZyb20gJy4vU2xpZGVEZWNrJztcbmltcG9ydCBWdWVJbnN0YWxsZXIgZnJvbSAnLi4vLi4vSGVscGVycy9WdWVJbnN0YWxsZXIvVnVlSW5zdGFsbGVyJztcblxuY29uc3QgcGx1Z2luID0gVnVlSW5zdGFsbGVyLnVzZSh7XG5cbiAgICBpbnN0YWxsKFZ1ZSwgb3B0aW9ucykge1xuICAgICAgICBWdWVJbnN0YWxsZXIuY29tcG9uZW50cyh7XG4gICAgICAgICAgICBTbGlkZXMsXG4gICAgICAgICAgICBTbGlkZURlY2tcbiAgICAgICAgfSk7XG4gICAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgU2xpZGVEZWNrO1xuIiwiPHRlbXBsYXRlPlxuXG5cdDx0aCBzY29wZT1cImNvbFwiPlxuXHQgICAgPHRlbXBsYXRlIHYtaWY9XCJpZCAmJiByZXF1ZXN0XCI+XG5cdFx0XHQ8YSBocmVmPVwiI1wiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJzb3J0XCJcbiAgICAgICAgICAgICAgICA6ZGF0YS1pZD1cImlkXCJcbiAgICAgICAgICAgICAgICBAY2xpY2sucHJldmVudD1cIiRlbWl0KCdvcmRlcicsIGlkKVwiPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwiISRzbG90cy5kZWZhdWx0XCI+XG4gICAgICAgICAgICAgICAgICAgIHt7IGxhYmVsIHx8IG5hbWUgfHwgaWQgfX1cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDxzbG90Lz5cbiAgICAgICAgICAgIDwvYT5cblx0XHRcdDxpIHYtaWY9XCJyZXF1ZXN0LnBhcmFtcy5vcmRlciA9PT0gaWQgJiYgcmVxdWVzdC5wYXJhbXMuc29ydCA9PT0gJ2FzYydcIiBjbGFzcz1cInNvcnQtaWNvbiBmYSBmYS1zb3J0LWFzY1wiLz5cblx0XHRcdDxpIHYtaWY9XCJyZXF1ZXN0LnBhcmFtcy5vcmRlciA9PT0gaWQgJiYgcmVxdWVzdC5wYXJhbXMuc29ydCA9PT0gJ2Rlc2MnXCIgY2xhc3M9XCJzb3J0LWljb24gZmEgZmEtc29ydC1kZXNjXCIvPlxuXHRcdDwvdGVtcGxhdGU+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1pZj1cIiEkc2xvdHMuZGVmYXVsdFwiPlxuICAgICAgICAgICAgICAgIHt7IGxhYmVsIHx8IG5hbWUgfHwgaWQgfX1cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8c2xvdC8+XG4gICAgICAgIDwvdGVtcGxhdGU+XG5cdDwvdGg+XG5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICd0YWJsZS12aWV3LWhlYWRlcicsXG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIGlkOiBbTnVtYmVyLCBTdHJpbmddLFxuXG4gICAgICAgIGxhYmVsOiBbTnVtYmVyLCBTdHJpbmddLFxuXG4gICAgICAgIG5hbWU6IFtOdW1iZXIsIFN0cmluZ10sXG5cbiAgICAgICAgcmVxdWVzdDogT2JqZWN0XG5cbiAgICB9XG5cbn1cblxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG5cbiAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZVwiIDpjbGFzcz1cInsndGFibGUtaG92ZXInOiBob3ZlciAmJiAhbG9hZGluZyAmJiBkYXRhLmxlbmd0aH1cIj5cblxuICAgICAgICA8dGhlYWQgc2xvdD1cInRoZWFkXCI+XG4gICAgICAgICAgICA8dHIgdi1pZj1cImNvbHVtbnMubGVuZ3RoIHx8ICRzbG90cy5jb2x1bW5zXCIgc2xvdD1cImNvbHVtbnNcIj5cbiAgICAgICAgICAgICAgICA8dGFibGUtdmlldy1oZWFkZXJcbiAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCIoY29sdW1uLCBrZXkpIGluIHRhYmxlQ29sdW1uc1wiXG4gICAgICAgICAgICAgICAgICAgIHYtYmluZD1cImNvbHVtbi5wcm9wcyB8fCBjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICB2LW9uPVwiY29sdW1uLmV2ZW50c1wiXG4gICAgICAgICAgICAgICAgICAgIDpyZXF1ZXN0PVwicmVxdWVzdFwiXG4gICAgICAgICAgICAgICAgICAgIDprZXk9XCJrZXlcIlxuICAgICAgICAgICAgICAgICAgICBAb3JkZXI9XCJpZCA9PiAkZW1pdCgnb3JkZXInLCBpZClcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3RoZWFkPlxuXG4gICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgIDx0ciB2LWlmPVwibG9hZGluZ1wiPlxuICAgICAgICAgICAgICAgIDx0ZCA6Y29sc3Bhbj1cInRhYmxlQ29sdW1ucy5sZW5ndGhcIiBjbGFzcz1cInBvc2l0aW9uLXJlbGF0aXZlXCIgOnN0eWxlPVwieydoZWlnaHQnOiBoZWlnaHQobWluSGVpZ2h0KX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGFjdGl2aXR5LWluZGljYXRvciA6Y2VudGVyPVwidHJ1ZVwiPjwvYWN0aXZpdHktaW5kaWNhdG9yPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuXG4gICAgICAgICAgICA8dHIgdi1lbHNlLWlmPVwiIWRhdGEubGVuZ3RoXCI+XG4gICAgICAgICAgICAgICAgPHRkIDpjb2xzcGFuPVwidGFibGVDb2x1bW5zLmxlbmd0aFwiIGNsYXNzPVwicG9zaXRpb24tcmVsYXRpdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGFsZXJ0IHZhcmlhbnQ9XCJ3YXJuaW5nXCIgY2xhc3M9XCJteS0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXdhcm5pbmdcIi8+IFRoZXJlIGFyZSBubyByZXN1bHRzIGZvdW5kLlxuICAgICAgICAgICAgICAgICAgICA8L2FsZXJ0PlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuXG4gICAgICAgICAgICA8c2xvdCB2LWVsc2UgOmRhdGE9XCJkYXRhXCIgOmNvbHVtbnM9XCJ0YWJsZUNvbHVtbnNcIj5cbiAgICAgICAgICAgICAgICA8dHIgdi1mb3I9XCIocm93LCBpKSBpbiBkYXRhXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCB2LWZvcj1cImNvbHVtbiBpbiB0YWJsZUNvbHVtbnNcIiB2LWh0bWw9XCJyb3dbY29sdW1uLmlkXSB8fCByb3dbY29sdW1uLm5hbWVdXCI+PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC9zbG90PlxuICAgICAgICA8L3Rib2R5PlxuXG4gICAgICAgIDxzbG90IG5hbWU9XCJ0Zm9vdFwiPlxuICAgICAgICAgICAgPHRmb290IHYtaWY9XCJwYWdpbmF0ZSAmJiByZXNwb25zZVwiPlxuICAgICAgICAgICAgICAgIDx0ZCA6Y29sc3Bhbj1cInRhYmxlQ29sdW1ucy5sZW5ndGggfHwgMVwiIGNsYXNzPVwidGFibGUtdmlldy1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNsb3QgbmFtZT1cInBhZ2luYXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYWdpbmF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ249XCJjZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpwYWdlPVwicmVzcG9uc2UuY3VycmVudF9wYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dG90YWwtcGFnZXM9XCJyZXNwb25zZS5sYXN0X3BhZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBwYWdpbmF0ZT1cIiRlbWl0KCdwYWdpbmF0ZScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc2xvdD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90Zm9vdD5cbiAgICAgICAgPC9zbG90PlxuXG4gICAgPC90YWJsZT5cblxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBBbGVydCBmcm9tICcuLi9BbGVydCc7XG5pbXBvcnQgeyBlYWNoIH0gZnJvbSAnLi4vLi4vSGVscGVycy9GdW5jdGlvbnMnO1xuaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICcuLi8uLi9IZWxwZXJzL0Z1bmN0aW9ucyc7XG5pbXBvcnQgdW5pdCBmcm9tICcuLi8uLi9IZWxwZXJzL1VuaXQnO1xuaW1wb3J0IFBhZ2luYXRpb24gZnJvbSAnLi4vUGFnaW5hdGlvbic7XG5pbXBvcnQgVGFibGVWaWV3SGVhZGVyIGZyb20gJy4vVGFibGVWaWV3SGVhZGVyJztcbmltcG9ydCBBY3Rpdml0eUluZGljYXRvciBmcm9tICcuLi9BY3Rpdml0eUluZGljYXRvcic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgQWxlcnQsXG4gICAgICAgIFBhZ2luYXRpb24sXG4gICAgICAgIFRhYmxlVmlld0hlYWRlcixcbiAgICAgICAgQWN0aXZpdHlJbmRpY2F0b3JcbiAgICB9LFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICAvLyAoYXJyYXkpIEFuIGFycmF5IG9mIHRhYmxlIGNvbHVtblxuICAgICAgICAvLyBbe2lkOiAnZGF0YWJhc2VfaWQnLCBuYW1lOiAnRGF0YWJhc2UgaWQnLCB3aWR0aDogJzIwJSd9XVxuICAgICAgICBjb2x1bW5zOiB7XG4gICAgICAgICAgICB0eXBlOiBBcnJheSxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICgpID0+IHsgcmV0dXJuIFtdOyB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdHlwZTogQXJyYXksXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIChzdHJpbmcpIEFkZCB0YWJsZS1ob3ZlciB0byB0aGUgdGFibGUgZWxlbWVudFxuICAgICAgICBob3Zlcjoge1xuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICAgICAgfSxcblxuICAgICAgICBsb2FkaW5nOiBCb29sZWFuLFxuXG4gICAgICAgIC8vIChpbnRlZ2VyKSBUaGUgbWluaW11bSBoZWlnaHQgb2YgdGhlIHJvdyB3aGVuIGxvYWRpbmcgZGF0YVxuICAgICAgICBtaW5IZWlnaHQ6IHtcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgICAgICAgIGRlZmF1bHQ6IDQwMFxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIChib29sKSBTaG91bGQgc2hvdyB0aGUgcGFnaW5hdGlvbiBmb3IgdGhpcyB0YWJsZVxuICAgICAgICBwYWdpbmF0ZToge1xuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcblxuICAgICAgICBoZWlnaHQobWluKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50cyA9IFtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCd0aGVhZCcpLFxuICAgICAgICAgICAgICAgIHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJ3Rib2R5JylcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIGxldCBoZWlnaHQgPSAwO1xuXG4gICAgICAgICAgICBlYWNoKGVsZW1lbnRzLCBlbCA9PiB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ICs9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gdW5pdChNYXRoLm1heChtaW4sIGhlaWdodCkpO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgdGFibGVDb2x1bW5zKCkge1xuICAgICAgICAgICAgbGV0IGNvbHVtbnMgPSB0aGlzLmNvbHVtbnM7XG5cbiAgICAgICAgICAgIGlmKCFjb2x1bW5zIHx8ICFjb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbHVtbnMgPSBPYmplY3Qua2V5cyh0aGlzLmRhdGFbMF0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY29sdW1ucy5tYXAoY29sdW1uID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNPYmplY3QoY29sdW1uKSA/IGNvbHVtbiA6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogY29sdW1uXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IHsgZWFjaCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuLi8uLi9IZWxwZXJzL0Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJhbnNmb3JtZXIge1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgdHJhbnNmb3JtZXIgaW5zdGFuY2UgdXNpbmcgYW4gSFRUUCByZXNwb25zZSBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YSBvYmplY3RcbiAgICAgKiBAcmV0dXJuIHZvaWRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZXNwb25zZSkge1xuICAgICAgICBpZighaXNPYmplY3QodGhpcy4kb3JpZ2luYWxSZXNwb25zZSA9IHJlc3BvbnNlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgdHJhbnNmb3JtZXIgbXVzdCBiZSBpbnN0YW50aWF0ZWQgd2l0aCBhIHJlc3BvbnNlIG9iamVjdC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFpc0FycmF5KHRoaXMuJHJlcXVpcmVkID0gdGhpcy5yZXF1aXJlZCgpKSB8fCAhdGhpcy4kcmVxdWlyZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgdHJhbnNmb3JtZXIgbXVzdCBoYXZlIGF0IGxlYXN0IG9uZSByZXF1aXJlZCBwcm9wZXJ0eS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJHRyYW5zZm9ybWVkUmVzcG9uc2UgPSB0aGlzLnRyYW5zZm9ybShyZXNwb25zZSk7XG4gICAgICAgIHRoaXMudmFsaWRhdGUoKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBtZXRob2QgdG8gb3ZlcnJpZGUgdG8gcGVyZm9ybSBsb2dpYyB0byBmaW5pc2hlZCBpbml0aWFsaXppbmcuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHZvaWRcbiAgICAgKi9cbiAgICBpbml0aWFsaXplKCkge1xuICAgICAgICAvL1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlZmluZSBhbiBhcnJheSBvZiByZXF1aXJlZCBwcm9wZXJ0aWVzIHdpdGggYXQgbGVhc3Qgb25lIHZhbHVlLlxuICAgICAqXG4gICAgICogQHJldHVybiB2b2lkXG4gICAgICovXG4gICAgcmVxdWlyZWQoKSB7XG4gICAgICAgIC8vXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJhbmZvcm0gdGhlIFJlc3BvbnNlIG9iamVjdFxuICAgICAqXG4gICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAqL1xuICAgIHRyYW5zZm9ybShyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRyYW5mb3JtZWQgcmVzcG9uc2VcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgKi9cbiAgICByZXNwb25zZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHRyYW5zZm9ybWVkUmVzcG9uc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgdGhlIHRyYW5mb3JtZWQgcmVzcG9uc2UuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHZvaWRcbiAgICAgKi9cbiAgICB2YWxpZGF0ZSgpIHtcbiAgICAgICAgaWYoIWlzT2JqZWN0KHRoaXMuJHRyYW5zZm9ybWVkUmVzcG9uc2UpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB0cmFuc2Zvcm1lZCByZXNwb25zZSBtdXN0IGJlIGFuIG9iamVjdC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVhY2godGhpcy4kcmVxdWlyZWQsIGtleSA9PiB7XG4gICAgICAgICAgICBpZighKGtleSBpbiB0aGlzLiR0cmFuc2Zvcm1lZFJlc3BvbnNlKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgXCIke2tleX1cIiBpcyBhIHJlcXVpcmVkIHByb3BlcnR5IGFuZCBkb2VzIG5vdCBleGlzdCBpbiB0aGUgdHJhbmZvcm1lZCByZXNwb25zZS5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBpc0FycmF5IH0gZnJvbSAnLi4vLi4vSGVscGVycy9GdW5jdGlvbnMnO1xuaW1wb3J0IFRyYW5zZm9ybWVyIGZyb20gJy4uL1RyYW5zZm9ybWVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGVWaWV3VHJhbnNmb3JtZXIgZXh0ZW5kcyBUcmFuc2Zvcm1lciB7XG5cbiAgICByZXF1aXJlZCgpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIC8vIFRoZSBlbmQgb2YgdGhlIGNvdW50IG9mIHRoZSBwYWdpbmF0ZWQgbGlzdC5cbiAgICAgICAgICAgICd0bycsXG5cbiAgICAgICAgICAgIC8vIFRoZSBzdGFydCBvZiB0aGUgY291bnQgb2YgdGhlIHBhZ2luYXRlZCBsaXN0LlxuICAgICAgICAgICAgJ2Zyb20nLFxuXG4gICAgICAgICAgICAvLyBUaGUgdG90YWwgbnVtYmVyIG9mIGl0ZW1zIChub3QganVzdCBpbmNsdWRlZCBpbiB0aGUgcGFnaW5hdGlvbilcbiAgICAgICAgICAgICd0b3RhbCcsXG5cbiAgICAgICAgICAgIC8vIFRoZSBudW1iZXIgb2YgaXRlbXMgcGVyIHBhZ2VcbiAgICAgICAgICAgICdwZXJfcGFnZScsXG5cbiAgICAgICAgICAgIC8vIFRoZSBsYXN0IHBhZ2UgbnVtYmVyIChvciB0b3RhbCBwYWdlcylcbiAgICAgICAgICAgICdsYXN0X3BhZ2UnLFxuXG4gICAgICAgICAgICAvLyBUaGUgY3VycmVudCBwYWdlIG51bWJlclxuICAgICAgICAgICAgJ2N1cnJlbnRfcGFnZScsXG5cbiAgICAgICAgICAgIC8vIFRoZSBhY3R1YWwgcmVzcG9uc2UgZGF0YSB0byBhcHBlYXIgaW4gdGhlIHRhYmxlXG4gICAgICAgICAgICAnZGF0YSdcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kdHJhbnNmb3JtZWRSZXNwb25zZS5kYXRhO1xuICAgIH1cblxuICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgIGlmKCFpc0FycmF5KHRoaXMuZGF0YSgpKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZGF0YSBwcm9wZXJ0eSBtdXN0IGJlIGFuIGFycmF5LicpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCI8dGVtcGxhdGU+XG5cbiAgICA8ZGl2IGNsYXNzPVwidGFibGUtdmlld1wiPlxuXG4gICAgICAgIDxkaXYgdi1pZj1cImhlYWRpbmcgfHwgZGVzY3JpcHRpb24gfHwgJHNsb3RzLmJ1dHRvbnNcIiBjbGFzcz1cImQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlbiBhbGlnbi1pdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxzbG90IG5hbWU9XCJoZWFkaW5nXCI+PGgyIHYtaWY9XCJoZWFkaW5nXCIgdi1odG1sPVwiaGVhZGluZ1wiLz48L3Nsb3Q+XG4gICAgICAgICAgICA8c2xvdCBuYW1lPVwiZGVzY3JpcHRpb25cIj48cCB2LWlmPVwiZGVzY3JpcHRpb25cIiB2LWh0bWw9XCJkZXNjcmlwdGlvblwiLz48L3Nsb3Q+XG5cbiAgICAgICAgICAgIDxkaXYgdi1pZj1cIiRzbG90cy5idXR0b25zXCIgY2xhc3M9XCJtbC1hdXRvIG15LTNcIj5cbiAgICAgICAgICAgICAgICA8c2xvdCBuYW1lPVwiYnV0dG9uc1wiLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8Y2FyZCB2LWlmPVwiY2FyZFwiPlxuICAgICAgICAgICAgPGRhdGEtdGFibGVcbiAgICAgICAgICAgICAgICA6Y29sdW1ucz1cImNvbHVtbnNcIlxuICAgICAgICAgICAgICAgIDpkYXRhPVwiZGF0YVwiXG4gICAgICAgICAgICAgICAgOmhvdmVyPVwiaG92ZXJcIlxuICAgICAgICAgICAgICAgIDpsb2FkaW5nPVwibG9hZGluZ1wiXG4gICAgICAgICAgICAgICAgOm1pbi1oZWlnaHQ9XCJtaW5IZWlnaHRcIlxuICAgICAgICAgICAgICAgIDpwYWdpbmF0ZT1cInBhZ2luYXRlXCJcbiAgICAgICAgICAgICAgICBAcGFnaW5hdGU9XCJvblBhZ2luYXRlXCJcbiAgICAgICAgICAgICAgICBAb3JkZXI9XCJpZCA9PiBvcmRlckJ5KGlkKVwiPlxuICAgICAgICAgICAgICAgIDxzbG90IDpkYXRhPVwiZGF0YVwiIDpjb2x1bW5zPVwiY29sdW1uc1wiLz5cbiAgICAgICAgICAgIDwvZGF0YS10YWJsZS8+XG4gICAgICAgIDwvY2FyZD5cbiAgICAgICAgPGRhdGEtdGFibGVcbiAgICAgICAgICAgIHYtZWxzZVxuICAgICAgICAgICAgOmNvbHVtbnM9XCJjb2x1bW5zXCJcbiAgICAgICAgICAgIDpkYXRhPVwiZGF0YVwiXG4gICAgICAgICAgICA6aG92ZXI9XCJob3ZlclwiXG4gICAgICAgICAgICA6bG9hZGluZz1cImxvYWRpbmdcIlxuICAgICAgICAgICAgOm1pbi1oZWlnaHQ9XCJtaW5IZWlnaHRcIlxuICAgICAgICAgICAgOnBhZ2luYXRlPVwicGFnaW5hdGVcIlxuICAgICAgICAgICAgQHBhZ2luYXRlPVwib25QYWdpbmF0ZVwiXG4gICAgICAgICAgICBAb3JkZXI9XCJpZCA9PiBvcmRlckJ5KGlkKVwiPlxuICAgICAgICAgICAgPHNsb3QgOmRhdGE9XCJkYXRhXCIgOmNvbHVtbnM9XCJjb2x1bW5zXCIvPlxuICAgICAgICA8L2RhdGEtdGFibGUvPlxuXG4gICAgPC9kaXY+XG5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgQ2FyZCBmcm9tICcuLi9DYXJkJztcbmltcG9ydCBEYXRhVGFibGUgZnJvbSAnLi9UYWJsZSc7XG5pbXBvcnQgeyBleHRlbmQgfSBmcm9tICcuLi8uLi9IZWxwZXJzL0Z1bmN0aW9ucyc7XG5pbXBvcnQgUHJveHkgZnJvbSAnLi4vLi4vTWl4aW5zL1Byb3h5JztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uLy4uL0h0dHAvUmVxdWVzdCc7XG5pbXBvcnQgVGFibGVWaWV3SGVhZGVyIGZyb20gJy4vVGFibGVWaWV3SGVhZGVyJztcbmltcG9ydCBUYWJsZVZpZXdUcmFuc2Zvcm1lciBmcm9tICcuLi8uLi9IdHRwL1RhYmxlVmlld1RyYW5zZm9ybWVyJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIG5hbWU6ICd0YWJsZS12aWV3JyxcblxuICAgIG1peGluczogW1Byb3h5XSxcblxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgQ2FyZCxcbiAgICAgICAgRGF0YVRhYmxlLFxuICAgICAgICBUYWJsZVZpZXdIZWFkZXJcbiAgICB9LFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICAvLyAoYm9vbGVhbikgU2hvdyB0aGUgdGFibGUgaW4gYSBjYXJkLlxuICAgICAgICBjYXJkOiBCb29sZWFuLFxuXG4gICAgICAgIC8vIChzdHJpbmcpIEEgcmVsYXRpdmUgb3IgYWJzb2x1dGUgZW5kcG9pbnQgVVJMIHVzZWQgdG8gZmV0Y2ggZGF0YVxuICAgICAgICB1cmw6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gKGludGVnZXIpIFRoZSBzdGFydGluZyBwYWdlIG9mIHRoZSB0YWJsZVxuICAgICAgICBwYWdlOiB7XG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICAgICAgICBkZWZhdWx0OiAxXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gKGludGVnZXIpIFRoZSB0b3RhbCBudW1iZXIgb2YgcmVzdWx0cyBwZXIgcGFnZVxuICAgICAgICBsaW1pdDoge1xuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgICAgICAgZGVmYXVsdDogMjBcbiAgICAgICAgfSxcblxuICAgICAgICAvLyAoc3RyaW5nKSBUaGUgY29sdW1uIHVzZWQgdG8gb3JkZXIgdGhlIGRhdGFcbiAgICAgICAgb3JkZXI6IFN0cmluZyxcblxuICAgICAgICAvLyAoc3RyaW5nKSBUaGUgc29ydCBkaXJlY3Rpb24gKGFzY3xkZXNjKVxuICAgICAgICBzb3J0OiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICB2YWxpZGF0ZTogKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnYXNjJywgJ2Rlc2MnXS5pbmRleE9mKHZhbHVlKSAhPT0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gKGludGVnZXIpIFRoZSBtaW5pbXVtIGhlaWdodCBvZiB0aGUgcm93IHdoZW4gbG9hZGluZyBkYXRhXG4gICAgICAgIG1pbkhlaWdodDoge1xuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgICAgICAgZGVmYXVsdDogNDAwXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gKGFycmF5KSBBbiBhcnJheSBvZiBidXR0b24gb2JqZWN0c1xuICAgICAgICAvLyBbe2hyZWY6ICd0ZXN0LTEyMycsIGxhYmVsOiAnVGVzdCAxMjMnfV1cbiAgICAgICAgYnV0dG9uczoge1xuICAgICAgICAgICAgdHlwZTogQXJyYXksXG4gICAgICAgICAgICBkZWZhdWx0OiAoKSA9PiB7IHJldHVybiBbXTsgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIChhcnJheSkgQW4gYXJyYXkgb2YgdGFibGUgY29sdW1uXG4gICAgICAgIC8vIFt7aWQ6ICdkYXRhYmFzZV9pZCcsIG5hbWU6ICdEYXRhYmFzZSBpZCcsIHdpZHRoOiAnMjAlJ31dXG4gICAgICAgIGNvbHVtbnM6IHtcbiAgICAgICAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgICAgICAgZGVmYXVsdDogKCkgPT4geyByZXR1cm4gW107IH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyAoc3RyaW5nKSBUaGUgdGFibGUgaGVhZGluZ1xuICAgICAgICBoZWFkaW5nOiBTdHJpbmcsXG5cbiAgICAgICAgLy8gKHN0cmluZykgQWRkIHRhYmxlLWhvdmVyIHRvIHRoZSB0YWJsZSBlbGVtZW50XG4gICAgICAgIGhvdmVyOiB7XG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIChzdHJpbmcpIFRoZSB0YWJsZSBkZXNjcmlwdGlvblxuICAgICAgICBkZXNjcmlwdGlvbjogU3RyaW5nLFxuXG4gICAgICAgIC8vIChib29sKSBTaG91bGQgc2hvdyB0aGUgcGFnaW5hdGlvbiBmb3IgdGhpcyB0YWJsZVxuICAgICAgICBwYWdpbmF0ZToge1xuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICAgICAgfSxcblxuICAgICAgICAvLyAob2JqZWN0KSBUaGUgSFRUUCByZXNwb25zZSB0cmFuc2Zvcm1lciBpbnN0YW5jZVxuICAgICAgICB0cmFuc2Zvcm1lcjoge1xuICAgICAgICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgICAgICAgdmFsaWRhdGU6ICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFRhYmxlVmlld1RyYW5zZm9ybWVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcblxuICAgICAgICBvcmRlckJ5KG9yZGVyKSB7XG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0U29ydCA9ICdkZXNjJztcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTb3J0ID0gdGhpcy5nZXRSZXF1ZXN0UGFyYW0oJ3NvcnQnKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRPcmRlciA9IHRoaXMuZ2V0UmVxdWVzdFBhcmFtKCdvcmRlcicpO1xuXG4gICAgICAgICAgICB0aGlzLmFkZFJlcXVlc3RQYXJhbSgnb3JkZXInLCBvcmRlcik7XG4gICAgICAgICAgICB0aGlzLmFkZFJlcXVlc3RQYXJhbSgnc29ydCcsXG4gICAgICAgICAgICAgICAgY3VycmVudE9yZGVyICE9PSBvcmRlciB8fCAhY3VycmVudFNvcnQgPyBkZWZhdWx0U29ydCA6IChcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNvcnQgPT09IGRlZmF1bHRTb3J0ID8gJ2FzYycgOiBudWxsXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdGhpcy5mZXRjaCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5oZWFkZXJzW2tleV0gfHwgdmFsdWVcbiAgICAgICAgfSxcblxuICAgICAgICBhZGRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLnJlcXVlc3QuaGVhZGVycykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdC5oZWFkZXJzID0ge307XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5oZWFkZXJzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRSZXF1ZXN0UGFyYW0oa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wYXJhbXNba2V5XSB8fCB2YWx1ZVxuICAgICAgICB9LFxuXG4gICAgICAgIGFkZFJlcXVlc3RQYXJhbShrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICBpZighdGhpcy5yZXF1ZXN0LnBhcmFtcykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdC5wYXJhbXMgPSB7fTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LnBhcmFtc1trZXldID0gdmFsdWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZmV0Y2goKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICByZXR1cm4gUmVxdWVzdC5nZXQodGhpcy51cmwsIHRoaXMucmVxdWVzdCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdHJhbnNmb3JtZXIgPSB0aGlzLnRyYW5zZm9ybWVyIHx8IG5ldyBUYWJsZVZpZXdUcmFuc2Zvcm1lcihyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNwb25zZSA9IHRyYW5zZm9ybWVyLnJlc3BvbnNlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gdHJhbnNmb3JtZXIuZGF0YSgpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgZXJyb3JzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uUGFnaW5hdGUocGFnZSwgZXZlbnQpIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLnJlcXVlc3QucGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LnBhcmFtcyA9IHt9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QucGFyYW1zLnBhZ2UgPSBwYWdlO1xuICAgICAgICAgICAgdGhpcy5mZXRjaCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAvLyAoYXJyYXkpIFRoZSBkYXRhc2V0IGZvciB0aGUgdGFibGVcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuJGF0dHJzLmRhdGEgfHwgW10sXG5cbiAgICAgICAgICAgIC8vIChib29sKSBJcyB0aGUgdGFibGUgY3VycmVudGx5IGxvYWRpbmcgZGF0YVxuICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG5cbiAgICAgICAgICAgIC8vIChudWxsfG9iamVjdCkgVGhlIHJlc3BvbnNlIG9iamVjdFxuICAgICAgICAgICAgcmVzcG9uc2U6IG51bGwsXG5cbiAgICAgICAgICAgIC8vIChvYmplY3QpIFRoZSBIVFRQIHJlcXVlc3Qgb2JqZWN0XG4gICAgICAgICAgICByZXF1ZXN0OiBleHRlbmQoe1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICBwYWdlOiB0aGlzLnBhZ2UsXG4gICAgICAgICAgICAgICAgICAgIGxpbWl0OiB0aGlzLmxpbWl0LFxuICAgICAgICAgICAgICAgICAgICBvcmRlcjogdGhpcy5vcmRlcixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogdGhpcy5zb3J0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcy4kYXR0cnMucmVxdWVzdClcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgdGhpcy5mZXRjaCgpO1xuICAgIH0sXG5cbiAgICBiZWZvcmVEZXN0cm95KCkge1xuICAgICAgICB0aGlzLiRvZmYoKTtcbiAgICB9XG59XG5cbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cbi5jYXJkID4gLnRhYmxlIHtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuXG4gICAgdGhlYWQgdGgge1xuICAgICAgICBib3JkZXItdG9wOiAwO1xuICAgICAgICBib3JkZXItYm90dG9tOiAwO1xuICAgIH1cblxuICAgIHRmb290IC5wYWdpbmF0aW9uIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICB9XG59XG48L3N0eWxlPlxuIiwiaW1wb3J0IFRhYmxlVmlldyBmcm9tICcuL1RhYmxlVmlldyc7XG5pbXBvcnQgVnVlSW5zdGFsbGVyIGZyb20gJy4uLy4uL0hlbHBlcnMvVnVlSW5zdGFsbGVyL1Z1ZUluc3RhbGxlcic7XG5cbmNvbnN0IHBsdWdpbiA9IFZ1ZUluc3RhbGxlci51c2Uoe1xuXG4gICAgaW5zdGFsbChWdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgVnVlSW5zdGFsbGVyLmNvbXBvbmVudHMoe1xuICAgICAgICAgICAgVGFibGVWaWV3XG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlVmlldztcbiIsIjx0ZW1wbGF0ZT5cblxuICAgIDxmb3JtLWdyb3VwPlxuXG4gICAgICAgIDxzbG90IG5hbWU9XCJsYWJlbFwiPlxuICAgICAgICAgICAgPGZvcm0tbGFiZWwgdi1pZj1cImxhYmVsIHx8IGhhc0RlZmF1bHRTbG90XCIgOmZvcj1cImlkXCI+XG4gICAgICAgICAgICAgICAgPHNsb3Q+e3tsYWJlbH19PC9zbG90PlxuICAgICAgICAgICAgPC9mb3JtLWxhYmVsPlxuICAgICAgICA8L3Nsb3Q+XG5cbiAgICAgICAgPHNsb3QgbmFtZT1cImNvbnRyb2xcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwb3NpdGlvbi1yZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgICA6aWQ9XCJpZFwiXG4gICAgICAgICAgICAgICAgICAgIDpyb3dzPVwicm93c1wiXG4gICAgICAgICAgICAgICAgICAgIDp2YWx1ZT1cInZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgOmVycm9ycz1cImVycm9yc1wiXG4gICAgICAgICAgICAgICAgICAgIDpwYXR0ZXJuPVwicGF0dGVyblwiXG4gICAgICAgICAgICAgICAgICAgIDpyZWFkb25seT1cInJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgOnJlcXVpcmVkPVwicmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgICAgICA6bWF4bGVuZ3RoPVwibWF4bGVuZ3RoXCJcbiAgICAgICAgICAgICAgICAgICAgOnBsYWNlaG9sZGVyPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCJkaXNhYmxlZCB8fCByZWFkb25seVwiXG4gICAgICAgICAgICAgICAgICAgIDpjbGFzcz1cIm1lcmdlQ2xhc3Nlcyhjb250cm9sQ2xhc3NlcywgY29sb3JhYmxlQ2xhc3NlcylcIlxuICAgICAgICAgICAgICAgICAgICB2LWJpbmQtZXZlbnRzPVwiYmluZEV2ZW50c1wiXG4gICAgICAgICAgICAgICAgICAgIEBpbnB1dD1cIiRlbWl0KCdpbnB1dCcsICRldmVudC50YXJnZXQudmFsdWUpXCI+XG4gICAgICAgICAgICAgICAgPC90ZXh0YXJlYT5cblxuICAgICAgICAgICAgICAgIDxzbG90IG5hbWU9XCJmZWVkYmFja1wiPlxuICAgICAgICAgICAgICAgICAgICA8Zm9ybS1mZWVkYmFjayB2LWlmPVwidmFsaWRGZWVkYmFja1wiIHYtaHRtbD1cInZhbGlkRmVlZGJhY2tcIiB2YWxpZCAvPlxuICAgICAgICAgICAgICAgICAgICA8Zm9ybS1mZWVkYmFjayB2LWlmPVwiaW52YWxpZEZlZWRiYWNrXCIgdi1odG1sPVwiaW52YWxpZEZlZWRiYWNrXCIgaW52YWxpZCAvPlxuICAgICAgICAgICAgICAgIDwvc2xvdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3Nsb3Q+XG5cbiAgICAgICAgPHNsb3QgbmFtZT1cImhlbHBcIj5cbiAgICAgICAgICAgIDxoZWxwLXRleHQgdi1pZj1cImhlbHBUZXh0XCIgdi1odG1sPVwiaGVscFRleHRcIiAvPlxuICAgICAgICA8L3Nsb3Q+XG5cbiAgICA8L2Zvcm0tZ3JvdXA+XG5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgSGVscFRleHQgZnJvbSAnLi4vSGVscFRleHQnO1xuaW1wb3J0IEZvcm1Hcm91cCBmcm9tICcuLi9Gb3JtR3JvdXAnO1xuaW1wb3J0IEZvcm1MYWJlbCBmcm9tICcuLi9Gb3JtTGFiZWwnO1xuaW1wb3J0IEZvcm1GZWVkYmFjayBmcm9tICcuLi9Gb3JtRmVlZGJhY2snO1xuaW1wb3J0IENvbG9yYWJsZSBmcm9tICcuLi8uLi9NaXhpbnMvQ29sb3JhYmxlJztcbmltcG9ydCBGb3JtQ29udHJvbCBmcm9tICcuLi8uLi9NaXhpbnMvRm9ybUNvbnRyb2wnO1xuaW1wb3J0IE1lcmdlQ2xhc3NlcyBmcm9tICcuLi8uLi9NaXhpbnMvTWVyZ2VDbGFzc2VzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ3RleHRhcmVhLWZpZWxkJyxcblxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgSGVscFRleHQsXG4gICAgICAgIEZvcm1Hcm91cCxcbiAgICAgICAgRm9ybUxhYmVsLFxuICAgICAgICBGb3JtRmVlZGJhY2tcbiAgICB9LFxuXG4gICAgbWl4aW5zOiBbXG4gICAgICAgIENvbG9yYWJsZSxcbiAgICAgICAgRm9ybUNvbnRyb2wsXG4gICAgICAgIE1lcmdlQ2xhc3Nlc1xuICAgIF0sXG5cbiAgICBwcm9wczoge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHR5cGUgYXR0cmlidXRlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICd0ZXh0J1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgcm93cyBhdHRyaWJ1dGVcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgcm93czogW051bWJlciwgU3RyaW5nXVxuICAgIH1cblxufVxuXG48L3NjcmlwdD5cbiIsImltcG9ydCBUZXh0YXJlYUZpZWxkIGZyb20gJy4vVGV4dGFyZWFGaWVsZCc7XG5pbXBvcnQgVnVlSW5zdGFsbGVyIGZyb20gJy4uLy4uL0hlbHBlcnMvVnVlSW5zdGFsbGVyL1Z1ZUluc3RhbGxlcic7XG5cbmNvbnN0IHBsdWdpbiA9IFZ1ZUluc3RhbGxlci51c2Uoe1xuXG4gICAgaW5zdGFsbChWdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgVnVlSW5zdGFsbGVyLmNvbXBvbmVudHMoe1xuICAgICAgICAgICAgVGV4dGFyZWFGaWVsZFxuICAgICAgICB9KTtcbiAgICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBUZXh0YXJlYUZpZWxkO1xuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJ0aHVtYm5haWwtbGlzdC1pdGVtXCIgOnN0eWxlPVwie2hlaWdodDogdW5pdChoZWlnaHQpLCB3aWR0aDogdW5pdCh3aWR0aCksIG1pbkhlaWdodDogdW5pdChtaW5IZWlnaHQpLCBtYXhIZWlnaHQ6IHVuaXQobWF4SGVpZ2h0KSwgbWluV2lkdGg6IHVuaXQobWluV2lkdGgpLCBtYXhXaWR0aDogdW5pdChtYXhXaWR0aCl9XCI+XG4gICAgICAgIDxpbWcgdi1pZj1cInNyY1wiIDpzcmM9XCJzcmNcIiA6YWx0PVwiYWx0XCIgOmNsYXNzPVwieydpbWctZmx1aWQnOiBmbHVpZH1cIiAvPlxuICAgICAgICA8c2xvdC8+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHVuaXQgZnJvbSAnLi4vLi4vSGVscGVycy9Vbml0JztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICBhbHQ6IFN0cmluZyxcblxuICAgICAgICBzcmM6IFN0cmluZyxcblxuICAgICAgICB3aWR0aDogW1N0cmluZywgTnVtYmVyXSxcblxuICAgICAgICBoZWlnaHQ6IFtTdHJpbmcsIE51bWJlcl0sXG5cbiAgICAgICAgbWluSGVpZ2h0OiBbU3RyaW5nLCBOdW1iZXJdLFxuXG4gICAgICAgIG1heEhlaWdodDogW1N0cmluZywgTnVtYmVyXSxcblxuICAgICAgICBtaW5XaWR0aDogW1N0cmluZywgTnVtYmVyXSxcblxuICAgICAgICBtYXhXaWR0aDogW1N0cmluZywgTnVtYmVyXSxcblxuICAgICAgICBmbHVpZDoge1xuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcblxuICAgICAgICB1bml0OiB1bml0XG5cbiAgICB9XG5cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cbi50aHVtYm5haWwtbGlzdC1pdGVtIHtcbiAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgbWF4LWhlaWdodDogMTAwJTtcblxuICAgICYgPiBpbWcge1xuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XG5cbiAgICAgICAgJi5pbWctZmx1aWQge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgICY6bm90KDpvbmx5LWNoaWxkKSB7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICB9XG5cbiAgICAmOm50aC1jaGlsZCgybikge1xuICAgICAgICBvcGFjaXR5OiAuMjU7XG4gICAgfVxuICAgICovXG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJ0aHVtYm5haWwtbGlzdFwiIDpjbGFzcz1cImNsYXNzZXNcIj5cbiAgICAgICAgPHRodW1ibmFpbC1saXN0LWl0ZW0gdi1pZj1cIiEhaW1hZ2VzXCIgdi1mb3I9XCJpbWFnZSBpbiBpbWFnZXNcIiA6c3JjPVwiaW1hZ2VcIiA6d2lkdGg9XCJ3aWR0aFwiIC8+XG4gICAgICAgIDxzbG90Lz5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgVGh1bWJuYWlsTGlzdEl0ZW0gZnJvbSAnLi9UaHVtYm5haWxMaXN0SXRlbSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgVGh1bWJuYWlsTGlzdEl0ZW1cbiAgICB9LFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICBmaWxsOiBCb29sZWFuLFxuXG4gICAgICAgIGZsZXg6IEJvb2xlYW4sXG5cbiAgICAgICAgbm9GbGV4OiBCb29sZWFuLFxuXG4gICAgICAgIGdyaWQ6IEJvb2xlYW4sXG5cbiAgICAgICAgd3JhcDogQm9vbGVhbixcblxuICAgICAgICBpbWFnZXM6IEFycmF5LFxuXG4gICAgICAgIHdpZHRoOiB7XG4gICAgICAgICAgICB0eXBlOiBbU3RyaW5nLCBOdW1iZXJdLFxuICAgICAgICAgICAgZGVmYXVsdDogNzVcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgY2xhc3NlcygpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgJ3RodW1ibmFpbC1saXN0LWZpbGwnOiB0aGlzLmZpbGwsXG4gICAgICAgICAgICAgICAgJ3RodW1ibmFpbC1saXN0LWZsZXgnOiB0aGlzLmZsZXgsXG4gICAgICAgICAgICAgICAgJ3RodW1ibmFpbC1saXN0LW5vZmxleCc6IHRoaXMubm9GbGV4LFxuICAgICAgICAgICAgICAgICd0aHVtYm5haWwtbGlzdC1ncmlkJzogdGhpcy5ncmlkLFxuICAgICAgICAgICAgICAgICd0aHVtYm5haWwtbGlzdC13cmFwJzogdGhpcy53cmFwXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuLnRodW1ibmFpbC1saXN0IHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuXG4gICAgJjpub3QoLnRodW1ibmFpbC1saXN0LWdyaWQpID4gKjpub3Qge1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbiAgICB9XG5cbiAgICAmOm5vdCgudGh1bWJuYWlsLWxpc3QtZ3JpZCkgPiAqOmZpcnN0LWNoaWxkOmxhc3QtY2hpbGQge1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgIH1cblxuICAgICYudGh1bWJuYWlsLWxpc3QtZmlsbCxcbiAgICAmLnRodW1ibmFpbC1saXN0LXdyYXAge1xuICAgICAgICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xuICAgIH1cblxuICAgICYudGh1bWJuYWlsLWxpc3Qtbm9mbGV4ID4gKiB7XG4gICAgICAgIGZsZXg6IDA7XG4gICAgfVxuXG4gICAgJi50aHVtYm5haWwtbGlzdC1maWxsID4gKiB7XG4gICAgICAgIGZsZXg6IDEgMCBhdXRvO1xuICAgIH1cblxuICAgICYudGh1bWJuYWlsLWxpc3Qtd3JhcCA+ICoge1xuICAgICAgICBmbGV4OiAwIDAgYXV0bztcbiAgICB9XG5cbiAgICAmLnRodW1ibmFpbC1saXN0LWZsZXggPiAqIHtcbiAgICAgICAgZmxleDogMTtcbiAgICB9XG5cbn1cbjwvc3R5bGU+XG4iLCJpbXBvcnQgVGh1bWJuYWlsTGlzdCBmcm9tICcuL1RodW1ibmFpbExpc3QnO1xuaW1wb3J0IFRodW1ibmFpbExpc3RJdGVtIGZyb20gJy4vVGh1bWJuYWlsTGlzdEl0ZW0nO1xuaW1wb3J0IFZ1ZUluc3RhbGxlciBmcm9tICcuLi8uLi9IZWxwZXJzL1Z1ZUluc3RhbGxlci9WdWVJbnN0YWxsZXInO1xuXG5jb25zdCBwbHVnaW4gPSBWdWVJbnN0YWxsZXIudXNlKHtcblxuICAgIGluc3RhbGwoVnVlLCBvcHRpb25zKSB7XG4gICAgICAgIFZ1ZUluc3RhbGxlci5jb21wb25lbnRzKHtcbiAgICAgICAgICAgIFRodW1ibmFpbExpc3RcbiAgICAgICAgfSk7XG4gICAgfVxuXG59KTtcblxuZXhwb3J0IHtcbiAgICBUaHVtYm5haWxMaXN0SXRlbVxufTtcblxuZXhwb3J0IGRlZmF1bHQgVGh1bWJuYWlsTGlzdDtcbiIsIjx0ZW1wbGF0ZT5cblxuICAgIDxmb3JtLWdyb3VwIGNsYXNzPVwidXBsb2FkLWZpZWxkXCIgOmNsYXNzPVwieydlbmFibGUtZHJvcHpvbmUnOiBkcm9wem9uZSwgJ2VuYWJsZS1tdWx0aXBsZSc6IG11bHRpcGxlfVwiPlxuXG4gICAgICAgIDxkcm9wem9uZSBAZHJvcD1cIm9uRHJvcFwiPlxuXG4gICAgICAgICAgICA8ZmlsZS1maWVsZFxuICAgICAgICAgICAgICAgIHYtaWY9XCJtdWx0aXBsZSAmJiAoIW1heFVwbG9hZHMgfHwgbWF4VXBsb2FkcyA+IHZhbHVlLmxlbmd0aCkgfHwgIW11bHRpcGxlICYmICF2YWx1ZVwiXG4gICAgICAgICAgICAgICAgOm5hbWU9XCJuYW1lXCJcbiAgICAgICAgICAgICAgICA6bGFiZWw9XCJsYWJlbFwiXG4gICAgICAgICAgICAgICAgOnBsYWNlaG9sZGVyPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgICAgIDpoZWxwLXRleHQ9XCJoZWxwVGV4dFwiXG4gICAgICAgICAgICAgICAgOm11bHRpcGxlPVwibXVsdGlwbGVcIlxuICAgICAgICAgICAgICAgIDplcnJvcnM9XCJlcnJvcnNcIlxuICAgICAgICAgICAgICAgIEBjaGFuZ2U9XCJvbkNoYW5nZVwiXG4gICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICA8dGh1bWJuYWlsLWxpc3Qgdi1pZj1cImZpbGVzICYmIGZpbGVzLmxlbmd0aFwiIGNsYXNzPVwibXQtNFwiIHdyYXA+XG4gICAgICAgICAgICAgICAgPHRodW1ibmFpbC1saXN0LWl0ZW1cbiAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCIoZmlsZSwga2V5KSBpbiBmaWxlc1wiXG4gICAgICAgICAgICAgICAgICAgIDprZXk9XCJmaWxlLmxhc3RNb2RpZmllZCArICctJyArIGZpbGUubGFzdE1vZGlmaWVkRGF0ZSArICctJyArIGZpbGUuc2l6ZSArICctJyArIGZpbGUudHlwZSArICctJyArIGZpbGUubmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIDp3aWR0aD1cIndpZHRoXCJcbiAgICAgICAgICAgICAgICAgICAgOm1pbi13aWR0aD1cIm1pbldpZHRoXCJcbiAgICAgICAgICAgICAgICAgICAgOm1heC13aWR0aD1cIm1heFdpZHRoXCJcbiAgICAgICAgICAgICAgICAgICAgOmhlaWdodD1cImhlaWdodFwiXG4gICAgICAgICAgICAgICAgICAgIDptaW4taGVpZ2h0PVwibWluSGVpZ2h0XCJcbiAgICAgICAgICAgICAgICAgICAgOm1heC1oZWlnaHQ9XCJtYXhIZWlnaHRcIlxuICAgICAgICAgICAgICAgICAgICA6Y2xhc3M9XCJ7J3VwbG9hZGluZyc6ICEhcHJvZ3Jlc3NCYXJzW2tleV19XCI+XG4gICAgICAgICAgICAgICAgICAgIDxmaWxlLXByZXZpZXcgOmZpbGU9XCJmaWxlXCIgOnByb2dyZXNzPVwicHJvZ3Jlc3NCYXJzW2tleV0gfHwgMFwiIEBsb2FkZWQ9XCJvbkxvYWRlZFByZXZpZXdcIiBAY2xvc2U9XCJyZW1vdmVGaWxlKGZpbGUpXCIvPlxuICAgICAgICAgICAgICAgICAgICA8c2xvdCA6ZmlsZT1cImZpbGVcIi8+XG4gICAgICAgICAgICAgICAgPHRodW1ibmFpbC1saXN0LWl0ZW0+XG4gICAgICAgICAgICA8L3RodW1ibmFpbC1saXN0PlxuXG4gICAgICAgICAgICA8ZGl2IHYtaWY9XCJzaG93RHJvcEVsZW1lbnRcIiBjbGFzcz1cInVwbG9hZC1maWVsZC1kcm9wem9uZVwiIDpzdHlsZT1cInsnbWluLWhlaWdodCc6IGRyb3B6b25lTWluSGVpZ2h0fVwiIEBkcm9wLnByZXZlbnQ9XCJvbkRyb3BcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWNsb3VkLXVwbG9hZFwiPjwvaT5cbiAgICAgICAgICAgICAgICA8ZGl2PkRyYWcgYW5kIGRyb3AgZmlsZXMgdG8gdXBsb2FkPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L2Ryb3B6b25lPlxuXG4gICAgPC9mb3JtLWdyb3VwPlxuXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgZWFjaCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCB7IGV4dGVuZCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCB7IHJlbW92ZSB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuLi8uLi9IZWxwZXJzL0Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCBGb3JtR3JvdXAgZnJvbSAnLi4vRm9ybUdyb3VwJztcbmltcG9ydCBNb2RlbCBmcm9tICcuLi8uLi9IdHRwL01vZGVsJztcbmltcG9ydCBEcm9wem9uZSBmcm9tICcuLi9Ecm9wem9uZS9Ecm9wem9uZSc7XG5pbXBvcnQgRm9ybUNvbnRyb2wgZnJvbSAnLi4vLi4vTWl4aW5zL0Zvcm1Db250cm9sL0Zvcm1Db250cm9sJztcbmltcG9ydCBGaWxlRmllbGQgZnJvbSAnLi4vRmlsZUZpZWxkL0ZpbGVGaWVsZCc7XG5pbXBvcnQgRmlsZVByZXZpZXcgZnJvbSAnLi4vRmlsZVByZXZpZXcvRmlsZVByZXZpZXcnO1xuaW1wb3J0IFRodW1ibmFpbExpc3QgZnJvbSAnLi4vVGh1bWJuYWlsTGlzdC9UaHVtYm5haWxMaXN0JztcbmltcG9ydCBUaHVtYm5haWxMaXN0SXRlbSBmcm9tICcuLi9UaHVtYm5haWxMaXN0L1RodW1ibmFpbExpc3RJdGVtJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ3VwbG9hZC1maWVsZCcsXG5cbiAgICBtaXhpbnM6IFtGb3JtQ29udHJvbF0sXG5cbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIERyb3B6b25lLFxuICAgICAgICBGb3JtR3JvdXAsXG4gICAgICAgIEZpbGVGaWVsZCxcbiAgICAgICAgRmlsZVByZXZpZXcsXG4gICAgICAgIFRodW1ibmFpbExpc3QsXG4gICAgICAgIFRodW1ibmFpbExpc3RJdGVtXG4gICAgfSxcblxuICAgIG1vZGVsOiB7XG4gICAgICAgIHByb3A6ICd2YWx1ZScsXG4gICAgICAgIGV2ZW50OiAnY2hhbmdlJ1xuICAgIH0sXG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYW4gdXNlciB1cGxvYWQgbXVsdGlwbGUgZmlsZXNcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgbXVsdGlwbGU6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBtYXhpbXVtIG51bWJlciBvZiBmaWxlcyB0aGF0IGEgdXNlciBjYW4gdXBsb2FkXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIG1heFVwbG9hZHM6IE51bWJlcixcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGhlaWdodCBhdHRyaWJ1dGUgZm9yIHRoZSBjb250cm9sIGVsZW1lbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgaGVpZ2h0OiBbTnVtYmVyLCBTdHJpbmddLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbWluaW11bSBoZWlnaHQgYXR0cmlidXRlIGZvciB0aGUgY29udHJvbCBlbGVtZW50XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIG1pbkhlaWdodDogW051bWJlciwgU3RyaW5nXSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG1heGltdW0gaGVpZ2h0IGF0dHJpYnV0ZSBmb3IgdGhlIGNvbnRyb2wgZWxlbWVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBtYXhIZWlnaHQ6IFtOdW1iZXIsIFN0cmluZ10sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB3aWR0aCBhdHRyaWJ1dGUgZm9yIHRoZSBjb250cm9sIGVsZW1lbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgd2lkdGg6IFtOdW1iZXIsIFN0cmluZ10sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBtaW5pbXVtIHdpZHRoIGF0dHJpYnV0ZSBmb3IgdGhlIGNvbnRyb2wgZWxlbWVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBtaW5XaWR0aDogW051bWJlciwgU3RyaW5nXSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG1heGltdW0gd2lkdGggYXR0cmlidXRlIGZvciB0aGUgY29udHJvbCBlbGVtZW50XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIG1heFdpZHRoOiBbTnVtYmVyLCBTdHJpbmddLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYW4gdXNlciBkcmFnL2Ryb3AgZmlsZXMgaW50byBicm93c2VyIHRvIHVwbG9hZCB0aGVtLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBkcm9wem9uZU1pbkhlaWdodDogW051bWJlciwgU3RyaW5nXSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogSXMgdGhlIHVzZXIgZHJhZ2dpbmcgYSBmaWxlIG92ZXIgdGhlIGRyb3B6b25lXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIGRyYWdnaW5nOiB7XG4gICAgICAgICAgICB0eXBlOiBbU3RyaW5nLCBCb29sZWFuXSxcbiAgICAgICAgICAgIGRlZmF1bHQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2FuIHVzZXIgZHJhZy9kcm9wIGZpbGVzIGludG8gYnJvd3NlciB0byB1cGxvYWQgdGhlbS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgZHJvcHpvbmU6IHtcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBkYXRhIGF0dHJpYnV0ZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgRmlsZXxGaWxlTGlzdHxBcnJheVxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIHR5cGU6IFtPYmplY3QsIEZpbGUsIEZpbGVMaXN0LCBBcnJheV0sXG4gICAgICAgICAgICBkZWZhdWx0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5tdWx0aXBsZSA/IG51bGwgOiBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQW4gSFRUUCBNb2RlbCB1c2VkIHRvIHNlbmQgdGhlIHJlcXVlc3RcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUgTW9kZWxcbiAgICAgICAgICovXG4gICAgICAgIG1vZGVsOiBbTW9kZWwsIEZ1bmN0aW9uXSxcblxuICAgICAgICByZXF1ZXN0OiBPYmplY3RcblxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgcmVtb3ZlRmlsZShkYXRhKSB7XG5cbiAgICAgICAgICAgIGlmKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlcyA9IGlzQXJyYXkodGhpcy52YWx1ZSkgPyB0aGlzLnZhbHVlLnNsaWNlKDApIDogW107XG5cbiAgICAgICAgICAgICAgICBpZihkYXRhIGluc3RhbmNlb2YgRmlsZSkge1xuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLnJlcXVlc3QgJiYgZGF0YS5yZXF1ZXN0LmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5yZXF1ZXN0LmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlKGZpbGVzLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplOiBkYXRhLnNpemUsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0TW9kaWZpZWQ6IGRhdGEubGFzdE1vZGlmaWVkXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlKGZpbGVzLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCBmaWxlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZihkYXRhLnJlcXVlc3QgJiYgZGF0YS5yZXF1ZXN0LmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLnJlcXVlc3QuY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWRkRmlsZShmaWxlLCBzdWJqZWN0KSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6IGZpbGUubmFtZSxcbiAgICAgICAgICAgICAgICBsYXN0TW9kaWZpZWQ6IGZpbGUubGFzdE1vZGlmaWVkLFxuICAgICAgICAgICAgICAgIGxhc3RNb2RpZmllZERhdGU6IGZpbGUubGFzdE1vZGlmaWVkRGF0ZSxcbiAgICAgICAgICAgICAgICBzaXplOiBmaWxlLnNpemUsXG4gICAgICAgICAgICAgICAgdHlwZTogZmlsZS50eXBlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlcyA9IHN1YmplY3QgfHwgKGlzQXJyYXkodGhpcy52YWx1ZSkgPyB0aGlzLnZhbHVlLnNsaWNlKDApIDogW10pO1xuXG4gICAgICAgICAgICAgICAgaWYoKCF0aGlzLm1heFVwbG9hZHMgfHwgdGhpcy5tYXhVcGxvYWRzID4gZmlsZXMubGVuZ3RoKSAmJiBmaWxlcy5pbmRleE9mKGRhdGEpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBmaWxlcy5wdXNoKGZpbGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIGZpbGVzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWQoZmlsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgZmlsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGxvYWQoZmlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWRkRmlsZXMoZmlsZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YmplY3QgPSBpc0FycmF5KHRoaXMudmFsdWUpID8gdGhpcy52YWx1ZS5zbGljZSgwKSA6IFtdO1xuXG4gICAgICAgICAgICBlYWNoKGZpbGVzLCBmaWxlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEZpbGUoZmlsZSwgc3ViamVjdCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnZhbHVlID0gbnVsbDtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVXBsb2FkIGZ1bmN0aW9uIHRoYXQgaGFuZGxlcyBhdXRvLXVwbG9hZGluZyBmaWVsZHMgYXN5bmNocm9ub3VzbHkuXG4gICAgICAgICAqIFRoaXMgaXMgZGVzaWduZWQgdG8gd29yayB3aXRoIFJFU1QgQVBJJ3MgYW5kIHJlcGxhY2UgdGhlIGZpbGUgT2JqZWN0XG4gICAgICAgICAqIHdpdGggdGhlIFJFU1RmdWwgcmV0dXJuZWQgYnkgdGhlIHNlcnZlci5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUgT2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICB1cGxvYWQoZmlsZSkge1xuICAgICAgICAgICAgLy8gU3RvcCB1cGxvYWQgc2lsZW50bHkgaWYgbm8gbW9kZWwgaXMgZGVmaW5lZC5cbiAgICAgICAgICAgIGlmKCF0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgbW9kZWwgPSB0aGlzLm1vZGVsO1xuXG4gICAgICAgICAgICBpZighKHRoaXMubW9kZWwgaW5zdGFuY2VvZiBNb2RlbCkpIHtcbiAgICAgICAgICAgICAgICBtb2RlbCA9IG5ldyB0aGlzLm1vZGVsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtb2RlbC5zZXQodGhpcy5uYW1lLCBmaWxlKTtcblxuICAgICAgICAgICAgdGhpcy4kZW1pdCgndXBsb2FkaW5nJywgbW9kZWwpO1xuICAgICAgICAgICAgdGhpcy4kc2V0KHRoaXMucHJvZ3Jlc3NCYXJzLCB0aGlzLm11bHRpcGxlID8gKHRoaXMudmFsdWUgPyB0aGlzLnZhbHVlLmxlbmd0aCA6IDApIDogMCwgMCk7XG5cbiAgICAgICAgICAgIHJldHVybiBtb2RlbC5zYXZlKG51bGwsIGV4dGVuZCh7XG4gICAgICAgICAgICAgICAgb25VcGxvYWRQcm9ncmVzczogZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFmaWxlLmluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlLmluZGV4ID0gdGhpcy5maWxlcy5pbmRleE9mKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoIWZpbGUucmVxdWVzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS5yZXF1ZXN0ID0gbW9kZWwuZ2V0UmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2V0KHRoaXMucHJvZ3Jlc3NCYXJzLCBmaWxlLmluZGV4LCBwYXJzZUludCgoZS5sb2FkZWQgLyBlLnRvdGFsKSAqIDEwMCwgMTApKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgncHJvZ3Jlc3MnLCBtb2RlbCwgdGhpcy5wcm9ncmVzc0JhcnNbZmlsZS5pbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMucmVxdWVzdCkpXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCd1cGxvYWQnLCBtb2RlbCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJzW2ZpbGUuaW5kZXhdID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGBkcm9wYCBldmVudCBjYWxsYmFjay5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUgT2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBvbkRyb3AoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UoZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGBjaGFuZ2VgIGV2ZW50IGNhbGxiYWNrLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSBPYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIG9uQ2hhbmdlKGZpbGVzKSB7XG4gICAgICAgICAgICBpZihmaWxlcyBpbnN0YW5jZW9mIEZpbGVMaXN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRGaWxlcyhmaWxlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEZpbGUoZmlsZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgYGRyYWdvdmVyYCBldmVudCBjYWxsYmFjay5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUgT2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBvbkRyYWdPdmVyKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmlzRHJhZ2dpbmdJbnNpZGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgndXBkYXRlOmRyYWdnaW5nJywgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdkcmFnOm92ZXInLCBldmVudCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBgZHJhZ292ZXJgIGV2ZW50IGNhbGxiYWNrLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSBPYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIG9uRHJhZ0VudGVyKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmlzRHJhZ2dpbmdJbnNpZGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgndXBkYXRlOmRyYWdnaW5nJywgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdkcmFnOmVudGVyJywgZXZlbnQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgYGRyYWdsZWF2ZWAgZXZlbnQgY2FsbGJhY2suXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIE9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgb25EcmFnTGVhdmUoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaXNEcmFnZ2luZ0luc2lkZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgndXBkYXRlOmRyYWdnaW5nJywgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnZHJhZzpsZWF2ZScsIGV2ZW50KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGBkcm9wYCBldmVudCBjYWxsYmFjay5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgb25Ecm9wKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmlzRHJhZ2dpbmdJbnNpZGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuYWRkRmlsZXMoZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzKTtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3VwZGF0ZTpkcmFnZ2luZycsIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2Ryb3AnLCBldmVudCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBgbG9hZGVkYCBldmVudCBjYWxsYmFjay5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUgT2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBvbkxvYWRlZFByZXZpZXcoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2xvYWRlZCcsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjb21wdXRlZDoge1xuXG4gICAgICAgIGZpbGVzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGUgPyB0aGlzLnZhbHVlIDogKHRoaXMudmFsdWUgPyBbdGhpcy52YWx1ZV0gOiBbXSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvd0Ryb3BFbGVtZW50KCkge1xuICAgICAgICAgICAgcmV0dXJuICFpc1VuZGVmaW5lZCh0aGlzLmRyYWdnaW5nKSA/IHRoaXMuZHJhZ2dpbmcgOiB0aGlzLmlzRHJhZ2dpbmdJbnNpZGVcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwcm9ncmVzc0JhcnM6IHt9LFxuICAgICAgICAgICAgaXNEcmFnZ2luZ0luc2lkZTogZmFsc2VcbiAgICAgICAgfTtcbiAgICB9XG5cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cblxuLnVwbG9hZC1maWVsZCB7XG4gICAgIC5maWxlLXByZXZpZXcge1xuICAgICAgICBtaW4td2lkdGg6IDEwMHB4O1xuICAgICAgICBtaW4taGVpZ2h0OiAxMDBweDtcblxuICAgICAgICAudXBsb2FkaW5nIC5maWxlLXByZXZpZXcge1xuICAgICAgICAgICAgb3BhY2l0eTogLjU7XG4gICAgICAgIH1cbiAgICB9XG59XG48L3N0eWxlPlxuIiwiaW1wb3J0IFVwbG9hZEZpZWxkIGZyb20gJy4vVXBsb2FkRmllbGQnO1xuaW1wb3J0IFZ1ZUluc3RhbGxlciBmcm9tICcuLi8uLi9IZWxwZXJzL1Z1ZUluc3RhbGxlci9WdWVJbnN0YWxsZXInO1xuXG5jb25zdCBwbHVnaW4gPSBWdWVJbnN0YWxsZXIudXNlKHtcblxuICAgIGluc3RhbGwoVnVlLCBvcHRpb25zKSB7XG4gICAgICAgIFZ1ZUluc3RhbGxlci5jb21wb25lbnRzKHtcbiAgICAgICAgICAgIFVwbG9hZEZpZWxkXG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFVwbG9hZEZpZWxkO1xuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJ3aXphcmQtYnV0dG9uc1wiPlxuICAgICAgICA8YnRuLWdyb3VwIHJlZj1cImxlZnRcIiBjbGFzcz1cIndpemFyZC1idXR0b25zLWxlZnRcIj5cbiAgICAgICAgICAgIDxzbG90IG5hbWU9XCJidXR0b25zLWxlZnRcIi8+XG4gICAgICAgICAgICA8YnRuIHR5cGU9XCJidXR0b25cIiB2YXJpYW50PVwic2Vjb25kYXJ5XCIgcmVmPVwiYmFja1wiIDpkaXNhYmxlZD1cImJhY2tCdXR0b24gPT09IGZhbHNlIHx8IChhY3RpdmUgPT09IDAgJiYgYmFja0J1dHRvbiAhPT0gdHJ1ZSlcIiA6c2l6ZT1cInNpemVhYmxlQ2xhc3NcIiBAY2xpY2s9XCJvbkNsaWNrQmFja1wiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtbG9uZy1hcnJvdy1sZWZ0XCIvPiBCYWNrXG4gICAgICAgICAgICA8L2J0bj5cbiAgICAgICAgPC9idG4tZ3JvdXA+XG4gICAgICAgIDxidG4tZ3JvdXAgcmVmPVwicmlnaHRcIiBjbGFzcz1cIndpemFyZC1idXR0b25zLXJpZ2h0XCI+XG4gICAgICAgICAgICA8c2xvdCBuYW1lPVwiYnV0dG9ucy1yaWdodFwiLz5cbiAgICAgICAgICAgIDxidG4tYWN0aXZpdHkgdi1pZj1cImFjdGl2ZSA9PT0gc3RlcHMubGVuZ3RoIC0gMVwiIHJlZj1cImZpbmlzaFwiIDphY3Rpdml0eT1cImFjdGl2aXR5XCIgOnNpemU9XCJzaXplYWJsZUNsYXNzXCIgOmRpc2FibGVkPVwiZmluaXNoQnV0dG9uID09PSBmYWxzZVwiIHR5cGU9XCJidXR0b25cIiB2YXJpYW50PVwic3VjY2Vzc1wiIEBjbGljaz1cIm9uQ2xpY2tGaW5pc2hcIj5cbiAgICAgICAgICAgICAgICBGaW5pc2hcbiAgICAgICAgICAgIDwvYnRuLWFjdGl2aXR5PlxuICAgICAgICAgICAgPGJ0bi1hY3Rpdml0eSB2LWlmPVwiYWN0aXZlIDwgc3RlcHMubGVuZ3RoIC0gMVwiIHJlZj1cIm5leHRcIiA6YWN0aXZpdHk9XCJhY3Rpdml0eVwiIDpzaXplPVwic2l6ZWFibGVDbGFzc1wiIDpkaXNhYmxlZD1cIm5leHRCdXR0b24gPT09IGZhbHNlXCIgdHlwZT1cImJ1dHRvblwiIHZhcmlhbnQ9XCJwcmltYXJ5XCIgQGNsaWNrPVwib25DbGlja05leHRcIj5cbiAgICAgICAgICAgICAgICBOZXh0IDxpIGNsYXNzPVwiZmEgZmEtbG9uZy1hcnJvdy1yaWdodFwiLz5cbiAgICAgICAgICAgIDwvYnRuLWFjdGl2aXR5PlxuICAgICAgICA8L2J0bi1ncm91cD5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgQnRuIGZyb20gJy4uL0J0bic7XG5pbXBvcnQgQnRuR3JvdXAgZnJvbSAnLi4vQnRuR3JvdXAnO1xuaW1wb3J0IEJ0bkFjdGl2aXR5IGZyb20gJy4uL0J0bkFjdGl2aXR5JztcbmltcG9ydCBTaXplYWJsZSBmcm9tICcuLi8uLi9NaXhpbnMvU2l6ZWFibGUnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnd2l6YXJkLWJ1dHRvbnMnLFxuXG4gICAgbWl4aW5zOiBbXG4gICAgICAgIFNpemVhYmxlXG4gICAgXSxcblxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgQnRuLFxuICAgICAgICBCdG5Hcm91cCxcbiAgICAgICAgQnRuQWN0aXZpdHlcbiAgICB9LFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGluZGV4IG9yIGtleSBvZiB0aGUgYWN0aXZlIHN0ZXAuXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd8TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgYWN0aXZlOiB7XG4gICAgICAgICAgICB0eXBlOiBbU3RyaW5nLCBOdW1iZXJdLFxuICAgICAgICAgICAgZGVmYXVsdDogMFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG93IHRoZSBhY3Rpdml0eSBpbmRpY2F0b3IgaW4gdGhlIG5leHQgb3IgZmluaXNoIGJ1dHRvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBhY3Rpdml0eTogQm9vbGVhbixcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2hvdyBzaG91bGQgdGhlIFwiQmFja1wiIGJ1dHRvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBiYWNrQnV0dG9uOiBCb29sZWFuLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG93IHNob3VsZCB0aGUgXCJGaW5pc2hcIiBidXR0b24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgZmluaXNoQnV0dG9uOiBCb29sZWFuLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG93IHNob3VsZCB0aGUgXCJOZXh0XCIgYnV0dG9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIG5leHRCdXR0b246IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFuIGFycmF5IG9mIHN0ZXBzIHBhc3NlZCBmcm9tIHRoZSBwYXJlbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIHN0ZXBzOiB7XG4gICAgICAgICAgICB0eXBlOiBBcnJheSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBjb21wdXRlZDoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPdmVycmlkZSB0aGUgY2xhc3MgcHJlZml4IHdpdGggYW4gZW1wdHkgc3RyaW5nLi4uXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHNpemVhYmxlQ2xhc3NQcmVmaXgoKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgb25DbGlja0JhY2soZXZlbnQpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuYmFja0J1dHRvbiAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdjbGljazpiYWNrJywgZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG9uQ2xpY2tGaW5pc2goZXZlbnQpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuZmluaXNoQnV0dG9uICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NsaWNrOmZpbmlzaCcsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBvbkNsaWNrTmV4dChldmVudCkge1xuICAgICAgICAgICAgaWYodGhpcy5uZXh0QnV0dG9uICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NsaWNrOm5leHQnLCBldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuLndpemFyZC1idXR0b25zIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cbjwvc3R5bGU+XG4iLCI8c2NyaXB0PlxuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ3dpemFyZC1zdGVwJyxcblxuICAgIHByb3BzOiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBwYXJlbnQgd2l6YXJkIGNvbXBvbmVudCBpbnN0YW5jZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgd2l6YXJkOiB7XG4gICAgICAgICAgICAvL3JlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogT2JqZWN0XG4gICAgICAgIH0sXG4gICAgICAgICovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBzdGVwJ3MgbGFiZWwgaW4gdGhlIHByb2dyZXNzIGJhci5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIGxhYmVsOiBTdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgcHJlZGljYXRlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBpZiB0aGUgYmFjayBidXR0b24gc2hvdWxkIHNob3cuXG4gICAgICAgICAqIENhbiBhbHNvIGJlIGEgYm9vbGVhbiB2YWx1ZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge0Z1bmN0aW9ufEJvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBiYWNrQnV0dG9uOiB7XG4gICAgICAgICAgICB0eXBlOiBbRnVuY3Rpb24sIEJvb2xlYW5dLFxuICAgICAgICAgICAgZGVmYXVsdCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBWYWxpZGF0ZSBpZiB0aGUgZGF0YSBpbnB1dCBmb3IgdGhlIHN0ZXAgaXMgdmFsaWQuIFJlcXVpcmVkIEJvb2xlYW5cbiAgICAgICAgICogb3IgYSBwcmVkaWNhdGUgZnVuY3Rpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtGdW5jdGlvbnxCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICAgIHR5cGU6IFtGdW5jdGlvbiwgQm9vbGVhbl0sXG4gICAgICAgICAgICBkZWZhdWx0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgbWV0aG9kczoge1xuXG4gICAgICAgIGNoZWNrVmFsaWRpdHkocHJvcCkge1xuICAgICAgICAgICAgLy8gVmFsaWRhdGUgdGhlIHByb3BlcnR5IGZvciB0aGUgc3RlcCBmaXJzdC5cbiAgICAgICAgICAgIGlmKGlzRnVuY3Rpb24odGhpc1twcm9wXSkgPyB0aGlzW3Byb3BdKHRoaXMpID09PSBmYWxzZSA6IHRoaXNbcHJvcF0gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRoZW4gdmFsaWRhdGUgdGhlIHByb3BlcnR5IG9mIHRoZSB3aXphcmQsIHRoaXMgaXMgdGhlIGdsb2JhbCB2YWxpZGF0b3JcbiAgICAgICAgICAgIGlmKHRoaXMuJHJlZnMud2l6YXJkKSB7XG4gICAgICAgICAgICAgICAgaWYoIGlzRnVuY3Rpb24odGhpcy4kcmVmcy53aXphcmRbcHJvcF0pID9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcmVmcy53aXphcmRbcHJvcF0odGhpcykgPT09IGZhbHNlIDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcmVmcy53aXphcmRbcHJvcF0gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIHBlcmZvcm1WYWxpZGl0eUNoZWNrcygpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuJHJlZnMud2l6YXJkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1ZhbGlkaXR5KCd2YWxpZGF0ZScpID8gdGhpcy5lbmFibGUoKSA6IHRoaXMuZGlzYWJsZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tWYWxpZGl0eSgnYmFja0J1dHRvbicpID8gdGhpcy4kcmVmcy53aXphcmQuZW5hYmxlQmFja0J1dHRvbigpIDogdGhpcy4kcmVmcy53aXphcmQuZGlzYWJsZUJhY2tCdXR0b24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBkaXNhYmxlKCkge1xuICAgICAgICAgICAgaWYodGhpcy4kcmVmcy53aXphcmQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLndpemFyZC5kaXNhYmxlTmV4dEJ1dHRvbigpO1xuICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMud2l6YXJkLmRpc2FibGVGaW5pc2hCdXR0b24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBlbmFibGUoKSB7XG4gICAgICAgICAgICBpZih0aGlzLiRyZWZzLndpemFyZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMud2l6YXJkLmVuYWJsZU5leHRCdXR0b24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLndpemFyZC5lbmFibGVGaW5pc2hCdXR0b24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIHVwZGF0ZWQoKSB7XG4gICAgICAgIHRoaXMucGVyZm9ybVZhbGlkaXR5Q2hlY2tzKCk7XG4gICAgfSxcblxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHRoaXMuJG5leHRUaWNrKHRoaXMucGVyZm9ybVZhbGlkaXR5Q2hlY2tzKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyKGgpIHtcbiAgICAgICAgaWYodGhpcy4kc2xvdHMuZGVmYXVsdC5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIDx3aXphcmQtc2xvdD4gbXVzdCBjb250YWluIGEgc2luZ2xlIHBhcmVudCBET00gbm9kZS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLiRzbG90cy5kZWZhdWx0WzBdO1xuICAgIH1cblxufTtcbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJ3aXphcmQtZXJyb3JcIj5cbiAgICAgICAgPGRpdiB2LWlmPVwiaWNvblwiIGNsYXNzPVwid2l6YXJkLWVycm9yLWljb25cIj5cbiAgICAgICAgICAgIDxpIDpjbGFzcz1cImljb25cIi8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxoMyB2LWlmPVwidGl0bGVcIiBjbGFzcz1cIndpemFyZC1lcnJvci10aXRsZVwiIHYtaHRtbD1cInRpdGxlXCIvPlxuXG4gICAgICAgIDxzbG90Lz5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktY29udGVudC1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tNlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cImVycm9yc1wiIGNsYXNzPVwibXktNVwiPlxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJtYi0wIHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIHYtZm9yPVwiKGVycm9yLCBpKSBpbiBlcnJvcnNcIiA6a2V5PVwiaVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGVycm9yWzBdIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGJ0biBzaXplPVwibGdcIiB2YXJpYW50PVwiZGFuZ2VyXCIgYmxvY2sgQGNsaWNrPVwiJGVtaXQoJ2JhY2snKVwiPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWxvbmctYXJyb3ctbGVmdFwiLz4gR28gQmFja1xuICAgICAgICAgICAgICAgIDwvYnRuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBCdG4gZnJvbSAnLi4vQnRuJztcbmltcG9ydCBXaXphcmRTdGVwIGZyb20gJy4vV2l6YXJkU3RlcCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICd3aXphcmQtZXJyb3InLFxuXG4gICAgZXh0ZW5kczogV2l6YXJkU3RlcCxcblxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgQnRuXG4gICAgfSxcblxuICAgIHByb3BzOiB7XG5cbiAgICAgICAgaWNvbjoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgZGVmYXVsdDogJ2ZhIGZhLTN4IGZhLWNoZWNrJ1xuICAgICAgICB9LFxuXG4gICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0OiAnRXJyb3IhJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGVycm9yczogW0FycmF5LCBPYmplY3RdXG5cbiAgICB9XG5cbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCI+XG5AaW1wb3J0ICcuL25vZGVfbW9kdWxlcy9ib290c3RyYXAvc2Nzcy9mdW5jdGlvbnMuc2Nzcyc7XG5AaW1wb3J0ICcuL25vZGVfbW9kdWxlcy9ib290c3RyYXAvc2Nzcy92YXJpYWJsZXMuc2Nzcyc7XG5cbiR3aXphcmQtZXJyb3ItY29sb3I6ICNiMTA4MDU7XG5cbi53aXphcmQtZXJyb3Ige1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBmb250LXNpemU6ICRmb250LXNpemUtbGc7XG4gICAgcGFkZGluZzogJGZvbnQtc2l6ZS1sZyAqIDQgJGZvbnQtc2l6ZS1sZztcblxuICAgIC53aXphcmQtZXJyb3ItdGl0bGUge1xuICAgICAgICBmb250LXNpemU6ICRmb250LXNpemUtbGcgKiAxLjU7XG4gICAgICAgIGNvbG9yOiAkd2l6YXJkLWVycm9yLWNvbG9yO1xuICAgIH1cblxuICAgIC53aXphcmQtZXJyb3ItaWNvbiB7XG4gICAgICAgIGNvbG9yOiAkd2l6YXJkLWVycm9yLWNvbG9yO1xuICAgICAgICBmb250LXNpemU6ICRmb250LXNpemUtbGc7XG4gICAgICAgIGJvcmRlcjogNXB4IHNvbGlkICR3aXphcmQtZXJyb3ItY29sb3I7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgd2lkdGg6ICRmb250LXNpemUtbGcgKiA2O1xuICAgICAgICBoZWlnaHQ6ICRmb250LXNpemUtbGcgKiA2O1xuICAgICAgICBtYXJnaW46ICRmb250LXNpemUtbGcgYXV0bztcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICAgICAgIGkge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICB0b3A6IDUwJTtcbiAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMDtcbiAgICAgICAgfVxuICAgIH1cbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gICAgPGNvbXBvbmVudCA6aXM9XCJ0YWdcIiBjbGFzcz1cIndpemFyZC1oZWFkZXJcIiA6Y2xhc3M9XCJ7J3RleHQtY2VudGVyJzogY2VudGVyfVwiPlxuICAgICAgICA8c2xvdC8+XG4gICAgPC9jb21wb25lbnQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ3dpemFyZC1oZWFkZXInLFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICBjZW50ZXI6IHtcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBIVE1MIHRhZ1xuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdGFnOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0OiAnaDInXG4gICAgICAgIH1cblxuICAgIH1cblxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuLmNhcmQgPiAud2l6YXJkIHtcbiAgICAud2l6YXJkLWhlYWRlciB7XG4gICAgICAgIG1hcmdpbi10b3A6IDFyZW07XG4gICAgfVxufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwid2l6YXJkLXByb2dyZXNzXCI+XG4gICAgICAgIDxhXG4gICAgICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgICAgICB2LWZvcj1cIihzdGVwLCBpKSBpbiBzdGVwc1wiXG4gICAgICAgICAgICBjbGFzcz1cIndpemFyZC1zdGVwXCJcbiAgICAgICAgICAgIDpjbGFzcz1cInsnYWN0aXZlJzogaSA9PT0gYWN0aXZlLCAnZGlzYWJsZWQnOiBpID4gaGlnaGVzdFN0ZXAsICdjb21wbGV0ZSc6IGkgKyAxIDw9IGhpZ2hlc3RTdGVwfVwiXG4gICAgICAgICAgICA6ZGF0YS1zdGVwPVwiaVwiXG4gICAgICAgICAgICA6dGl0bGU9XCJzdGVwLmxhYmVsIHx8IHN0ZXAudGl0bGVcIlxuICAgICAgICAgICAgOnN0eWxlPVwie3dpZHRoOiBgJHsxMDAgLyBzdGVwcy5sZW5ndGh9JWB9XCJcbiAgICAgICAgICAgIEBjbGljay5wcmV2ZW50PVwib25DbGljaygkZXZlbnQsIHN0ZXApXCI+XG4gICAgICAgICAgICA8c3BhbiB2LWlmPVwic3RlcC5jb21wb25lbnRPcHRpb25zICYmIHN0ZXAuY29tcG9uZW50T3B0aW9ucy5wcm9wc0RhdGEubGFiZWxcIiBjbGFzcz1cIndpemFyZC1zdGVwLWxhYmVsXCIgdi1odG1sPVwic3RlcC5jb21wb25lbnRPcHRpb25zLnByb3BzRGF0YS5sYWJlbFwiLz5cbiAgICAgICAgICAgIDxzcGFuIHYtZWxzZS1pZj1cInN0ZXAuY29tcG9uZW50T3B0aW9ucyAmJiBzdGVwLmNvbXBvbmVudE9wdGlvbnMucHJvcHNEYXRhLnRpdGxlXCIgY2xhc3M9XCJ3aXphcmQtc3RlcC1sYWJlbFwiIHYtaHRtbD1cInN0ZXAuY29tcG9uZW50T3B0aW9ucy5wcm9wc0RhdGEudGl0bGVcIi8+XG4gICAgICAgIDwvYT5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnd2l6YXJkLXByb2dyZXNzJyxcblxuICAgIHByb3BzOiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBpbmRleCBvciBrZXkgb2YgdGhlIGFjdGl2ZSBzdGVwLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfE51bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIGFjdGl2ZToge1xuICAgICAgICAgICAgdHlwZTogW1N0cmluZywgTnVtYmVyXSxcbiAgICAgICAgICAgIGRlZmF1bHQ6IDBcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHdpemFyZCBoaWdoZXN0IGF2YWlsYWJsZSB0byB0aGUgdXNlci5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgaGlnaGVzdFN0ZXA6IHtcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgd2l6YXJkIHN0ZXBzXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIHN0ZXBzOiB7XG4gICAgICAgICAgICB0eXBlOiBBcnJheSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgb25DbGljayhldmVudCwgc3RlcCkge1xuICAgICAgICAgICAgaWYoIWV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdjbGljaycsIGV2ZW50LCBzdGVwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpc0FjdGl2ZTogZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuQGltcG9ydCAnLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL3Njc3MvZnVuY3Rpb25zLnNjc3MnO1xuQGltcG9ydCAnLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL3Njc3MvdmFyaWFibGVzLnNjc3MnO1xuXG4ud2l6YXJkLXByb2dyZXNzIHtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBwYWRkaW5nOiAzMHB4IDA7XG4gICAgY291bnRlci1yZXNldDogc3RlcDtcbn1cblxuLypcbi53aXphcmQtcHJvZ3Jlc3Mtd3JhcHBlciB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgcGFkZGluZzogMzBweCAwO1xuXG4gICAgJjphZnRlciB7XG4gICAgICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGZvbnQtc2l6ZTogMDtcbiAgICAgICAgY29udGVudDogXCIgXCI7XG4gICAgICAgIGNsZWFyOiBib3RoO1xuICAgICAgICBoZWlnaHQ6IDA7XG4gICAgfVxufVxuKi9cblxuLndpemFyZC1zdGVwIHtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbiAgICBmb250LXNpemU6ICRmb250LXNpemUtYmFzZTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG5cbiAgICAmOmJlZm9yZSB7XG4gICAgICAgIHdpZHRoOiA0MHB4O1xuICAgICAgICBoZWlnaHQ6IDQwcHg7XG4gICAgICAgIGNvbnRlbnQ6IGNvdW50ZXIoc3RlcCk7XG4gICAgICAgIGNvdW50ZXItaW5jcmVtZW50OiBzdGVwO1xuICAgICAgICBsaW5lLWhlaWdodDogMzZweDtcbiAgICAgICAgZm9udC1zaXplOiAxNXB4O1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBtYXJnaW46IDAgYXV0byAxMHB4IGF1dG87XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICAgICAgYm9yZGVyOiAycHggc29saWQgIzAwOGNjMDtcbiAgICAgICAgY29sb3I6ICMwMDhjYzA7XG4gICAgfVxuXG4gICAgJjphZnRlciB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDJweDtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzdkN2Q3ZDtcbiAgICAgICAgdG9wOiAyMHB4O1xuICAgICAgICBsZWZ0OiAtNTAlO1xuICAgIH1cblxuICAgICY6Zmlyc3QtY2hpbGQ6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiBub25lO1xuICAgIH1cblxuICAgICYsICY6aG92ZXIge1xuICAgICAgICBjb2xvcjogIzdkN2Q3ZDtcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuXG4gICAgICAgICY6bm90KC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLndpemFyZC1zdGVwLWxhYmVsIHtcbiAgICAgICBjb2xvcjogIzAwOGNjMDtcbiAgICB9XG5cbiAgICAmLmRpc2FibGVkIHtcbiAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xuXG4gICAgICAgICY6YmVmb3JlIHtcbiAgICAgICAgICAgIGNvbG9yOiAjN2Q3ZDdkO1xuICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiAjN2Q3ZDdkO1xuICAgICAgICB9XG5cbiAgICAgICAgLndpemFyZC1zdGVwLWxhYmVsIHtcbiAgICAgICAgICAgIGNvbG9yOiAjN2Q3ZDdkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJi5jb21wbGV0ZSB7XG4gICAgICAgICY6YmVmb3JlIHtcbiAgICAgICAgICAgIGJvcmRlci1jb2xvcjogIzU1Yjc3NjtcbiAgICAgICAgICAgIGNvbG9yOiAjNTViNzc2O1xuICAgICAgICB9XG5cbiAgICAgICAgJjpiZWZvcmUge1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6IEZvbnRBd2Vzb21lO1xuICAgICAgICAgICAgY29udGVudDogXCJcXGYwMGNcIjtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiA0MHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgJiArIC53aXphcmQtc3RlcDphZnRlciB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTViNzc2O1xuICAgICAgICB9XG5cbiAgICAgICAgLndpemFyZC1zdGVwLWxhYmVsIHtcbiAgICAgICAgICAgIGNvbG9yOiAjNTViNzc2O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJi5hY3RpdmUge1xuICAgICAgICAmOmJlZm9yZSB7XG4gICAgICAgICAgICBib3JkZXItY29sb3I6ICNiMTA4MDU7XG4gICAgICAgICAgICBjb2xvcjogI2IxMDgwNTtcbiAgICAgICAgfVxuXG4gICAgICAgIC53aXphcmQtc3RlcC1sYWJlbCB7XG4gICAgICAgICAgICBjb2xvcjogI2IxMDgwNTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC53aXphcmQ6bm90KC53aXphcmQtZmluaXNoZWQpICYuYWN0aXZlOmhvdmVyOmJlZm9yZSxcbiAgICAud2l6YXJkOm5vdCgud2l6YXJkLWZpbmlzaGVkKSAmLmNvbXBsZXRlOmhvdmVyOmJlZm9yZSB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogI2IxMDgwNTtcbiAgICAgICAgY29sb3I6ICNiMTA4MDU7XG4gICAgfVxuXG4gICAgLndpemFyZDpub3QoLndpemFyZC1maW5pc2hlZCkgJi5jb21wbGV0ZTpob3ZlciArIC53aXphcmQtc3RlcDphZnRlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNiMTA4MDU7XG4gICAgfVxufVxuXG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJ3aXphcmQtc3VjY2Vzc1wiPlxuICAgICAgICA8ZGl2IHYtaWY9XCJpY29uXCIgY2xhc3M9XCJ3aXphcmQtc3VjY2Vzcy1pY29uXCI+XG4gICAgICAgICAgICA8aSA6Y2xhc3M9XCJpY29uXCIvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8aDMgdi1pZj1cInRpdGxlXCIgY2xhc3M9XCJ3aXphcmQtc3VjY2Vzcy10aXRsZVwiIHYtaHRtbD1cInRpdGxlXCIvPlxuXG4gICAgICAgIDxzbG90Lz5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgV2l6YXJkU3RlcCBmcm9tICcuL1dpemFyZFN0ZXAnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnd2l6YXJkLXN1Y2Nlc3MnLFxuXG4gICAgZXh0ZW5kczogV2l6YXJkU3RlcCxcblxuICAgIHByb3BzOiB7XG5cbiAgICAgICAgaWNvbjoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgZGVmYXVsdDogJ2ZhIGZhLWNoZWNrJ1xuICAgICAgICB9LFxuXG4gICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0OiAnU3VjY2VzcyEnXG4gICAgICAgIH0sXG5cbiAgICB9XG5cbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCI+XG5AaW1wb3J0ICcuL25vZGVfbW9kdWxlcy9ib290c3RyYXAvc2Nzcy9mdW5jdGlvbnMuc2Nzcyc7XG5AaW1wb3J0ICcuL25vZGVfbW9kdWxlcy9ib290c3RyYXAvc2Nzcy92YXJpYWJsZXMuc2Nzcyc7XG5cbiR3aXphcmQtc3VjY2Vzcy1jb2xvcjogIzU1Yjc3NjtcblxuLndpemFyZC1zdWNjZXNzIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAkZm9udC1zaXplLWxnO1xuICAgIHBhZGRpbmc6ICRmb250LXNpemUtbGcgKiA0ICRmb250LXNpemUtbGc7XG5cbiAgICAud2l6YXJkLXN1Y2Nlc3MtdGl0bGUge1xuICAgICAgICBmb250LXNpemU6ICRmb250LXNpemUtbGcgKiAxLjU7XG4gICAgICAgIGNvbG9yOiAkd2l6YXJkLXN1Y2Nlc3MtY29sb3I7XG4gICAgfVxuXG4gICAgLndpemFyZC1zdWNjZXNzLWljb24ge1xuICAgICAgICBjb2xvcjogJHdpemFyZC1zdWNjZXNzLWNvbG9yO1xuICAgICAgICBmb250LXNpemU6ICRmb250LXNpemUtbGcgKiAyLjU7XG4gICAgICAgIGJvcmRlcjogNXB4IHNvbGlkICR3aXphcmQtc3VjY2Vzcy1jb2xvcjtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICB3aWR0aDogJGZvbnQtc2l6ZS1sZyAqIDY7XG4gICAgICAgIGhlaWdodDogJGZvbnQtc2l6ZS1sZyAqIDY7XG4gICAgICAgIG1hcmdpbjogJGZvbnQtc2l6ZS1sZyBhdXRvO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgICAgICAgaSB7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIHRvcDogNTAlO1xuICAgICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAwO1xuICAgICAgICB9XG4gICAgfVxufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwid2l6YXJkXCI+XG5cbiAgICAgICAgPHdpemFyZC1oZWFkZXIgdi1pZj1cImhlYWRlciAmJiAhaXNGaW5pc2hlZFwiIHJlZj1cImhlYWRlclwiIHYtaHRtbD1cImhlYWRlclwiLz5cblxuICAgICAgICA8d2l6YXJkLXByb2dyZXNzXG4gICAgICAgICAgICB2LWlmPVwiIWlzRmluaXNoZWRcIlxuICAgICAgICAgICAgcmVmPVwicHJvZ3Jlc3NcIlxuICAgICAgICAgICAgOmFjdGl2ZT1cImN1cnJlbnRTdGVwXCJcbiAgICAgICAgICAgIDpoaWdoZXN0LXN0ZXA9XCJoaWdoZXN0U3RlcFwiXG4gICAgICAgICAgICA6c3RlcHM9XCJzdGVwc1wiXG4gICAgICAgICAgICBAY2xpY2s9XCJvblByb2dyZXNzQ2xpY2tcIlxuICAgICAgICAvPlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3aXphcmQtY29udGVudFwiIHJlZj1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxzbG90IHYtaWY9XCIhaXNGaW5pc2hlZFwiIG5hbWU9XCJjb250ZW50XCIvPlxuXG4gICAgICAgICAgICA8c2xpZGUtZGVja1xuICAgICAgICAgICAgICAgIHYtaWY9XCIhaXNGaW5pc2hlZFwiXG4gICAgICAgICAgICAgICAgcmVmPVwic2xpZGVEZWNrXCJcbiAgICAgICAgICAgICAgICA6YWN0aXZlPVwiY3VycmVudFN0ZXBcIlxuICAgICAgICAgICAgICAgIDpyZXNpemUtbW9kZWw9XCJyZXNpemVNb2RlXCJcbiAgICAgICAgICAgICAgICBAYmVmb3JlLWVudGVyPVwib25CZWZvcmVFbnRlclwiXG4gICAgICAgICAgICAgICAgQGVudGVyPVwib25FbnRlclwiXG4gICAgICAgICAgICAgICAgQGxlYXZlPVwib25MZWF2ZVwiPlxuICAgICAgICAgICAgICAgIDxzbG90IC8+XG4gICAgICAgICAgICA8L3NsaWRlLWRlY2s+XG5cbiAgICAgICAgICAgIDxzbG90IHYtZWxzZS1pZj1cImlzRmluaXNoZWQgJiYgIWhhc0ZhaWxlZFwiIG5hbWU9XCJzdWNjZXNzXCI+XG4gICAgICAgICAgICAgICAgPHdpemFyZC1zdWNjZXNzIHJlZj1cInN1Y2Nlc3NcIi8+XG4gICAgICAgICAgICA8L3Nsb3Q+XG5cbiAgICAgICAgICAgIDxzbG90IHYtZWxzZS1pZj1cImlzRmluaXNoZWQgJiYgaGFzRmFpbGVkXCIgbmFtZT1cImVycm9yXCI+XG4gICAgICAgICAgICAgICAgPHdpemFyZC1lcnJvciByZWY9XCJlcnJvclwiIDplcnJvcnM9XCJlcnJvcnNcIiBAYmFjaz1cIm9uQ2xpY2tUZXN0XCIvPlxuICAgICAgICAgICAgPC9zbG90PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8c2xvdCB2LWlmPVwiIWlzRmluaXNoZWRcIiBuYW1lPVwiYnV0dG9uc1wiPlxuICAgICAgICAgICAgPGhyPlxuXG4gICAgICAgICAgICA8d2l6YXJkLWJ1dHRvbnNcbiAgICAgICAgICAgICAgICByZWY9XCJidXR0b25zXCJcbiAgICAgICAgICAgICAgICBzaXplPVwibGdcIlxuICAgICAgICAgICAgICAgIDpzdGVwcz1cInN0ZXBzXCJcbiAgICAgICAgICAgICAgICA6YWN0aXZlPVwiY3VycmVudFN0ZXBcIlxuICAgICAgICAgICAgICAgIDphY3Rpdml0eT1cImFjdGl2aXR5XCJcbiAgICAgICAgICAgICAgICA6YmFjay1idXR0b249XCIhaXNCYWNrQnV0dG9uRGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgIDpuZXh0LWJ1dHRvbj1cIiFpc05leHRCdXR0b25EaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgOmZpbmlzaC1idXR0b249XCIhaXNGaW5pc2hCdXR0b25EaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgQGNsaWNrOmJhY2s9XCJvbkNsaWNrQmFja1wiXG4gICAgICAgICAgICAgICAgQGNsaWNrOmZpbmlzaD1cIm9uQ2xpY2tGaW5pc2hcIlxuICAgICAgICAgICAgICAgIEBjbGljazpuZXh0PVwib25DbGlja05leHRcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9zbG90PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IGVhY2ggfSBmcm9tICcuLi8uLi9IZWxwZXJzL0Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBmaW5kIH0gZnJvbSAnLi4vLi4vSGVscGVycy9GdW5jdGlvbnMnO1xuaW1wb3J0IFNsaWRlRGVjayBmcm9tICcuLi9TbGlkZURlY2snO1xuaW1wb3J0IFdpemFyZEJ1dHRvbnMgZnJvbSAnLi9XaXphcmRCdXR0b25zJztcbmltcG9ydCBXaXphcmRFcnJvciBmcm9tICcuL1dpemFyZEVycm9yJztcbmltcG9ydCBXaXphcmRIZWFkZXIgZnJvbSAnLi9XaXphcmRIZWFkZXInO1xuaW1wb3J0IFdpemFyZFByb2dyZXNzIGZyb20gJy4vV2l6YXJkUHJvZ3Jlc3MnO1xuaW1wb3J0IFdpemFyZFN1Y2Nlc3MgZnJvbSAnLi9XaXphcmRTdWNjZXNzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ3dpemFyZCcsXG5cbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIFNsaWRlRGVjayxcbiAgICAgICAgV2l6YXJkQnV0dG9ucyxcbiAgICAgICAgV2l6YXJkRXJyb3IsXG4gICAgICAgIFdpemFyZEhlYWRlcixcbiAgICAgICAgV2l6YXJkUHJvZ3Jlc3MsXG4gICAgICAgIFdpemFyZFN1Y2Nlc3NcbiAgICB9LFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGluZGV4IG9yIGtleSBvZiB0aGUgYWN0aXZlIHN0ZXAuXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd8TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgYWN0aXZlOiB7XG4gICAgICAgICAgICB0eXBlOiBbU3RyaW5nLCBOdW1iZXJdLFxuICAgICAgICAgICAgZGVmYXVsdDogMFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgdGhlIGluZGV4IG9yIGtleSBvZiB0aGUgbWF4IGNvbXBsZXRlZCBzdGVwLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfE51bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIGNvbXBsZXRlZDogW1N0cmluZywgTnVtYmVyXSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2hvdyB0aGUgYWN0aXZpdHkgaW5kaWNhdG9yIGluIHRoZSBuZXh0IG9yIGZpbmlzaCBidXR0b24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgYWN0aXZpdHk6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNob3cgc2hvdWxkIHRoZSBcIkJhY2tcIiBidXR0b24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgYmFja0J1dHRvbjoge1xuICAgICAgICAgICAgdHlwZTogW0Z1bmN0aW9uLCBCb29sZWFuXSxcbiAgICAgICAgICAgIGRlZmF1bHQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFN0ZXAgPiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG93IHNob3VsZCB0aGUgXCJGaW5pc2hcIiBidXR0b24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgZmluaXNoQnV0dG9uOiB7XG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQYXNzIGEgaGVhZGVyIGFzIGEgc3RyaW5nLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgaGVhZGVyOiBTdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNob3cgc2hvdWxkIHRoZSBcIk5leHRcIiBidXR0b24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgbmV4dEJ1dHRvbjoge1xuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG1vZGUgZGV0ZXJtaW5lcyBob3cgdGhlIHBvcG92ZXIgY29udGVudCB3aWxsIGZsZXggYmFzZWQgb24gdGhlXG4gICAgICAgICAqIHZhcnlpbmcgaGVpZ2h0cyBvZiB0aGUgc2xpZGVzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSBCb29sZWFuXG4gICAgICAgICAqL1xuICAgICAgICByZXNpemVNb2RlOiB7XG4gICAgICAgICAgICB0eXBlOiBbRnVuY3Rpb24sIEJvb2xlYW4sIFN0cmluZ10sXG4gICAgICAgICAgICBkZWZhdWx0OiAnYXV0bycsXG4gICAgICAgICAgICB2YWxpZGF0ZSh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbJ2F1dG8nLCAnaW5pdGlhbCcsICdpbmhlcml0J10uaW5kZXhPZih2YWx1ZSkgIT09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZhbGlkYXRlIGlmIHRoZSBkYXRhIGlucHV0IGZvciB0aGUgc3RlcCBpcyB2YWxpZC4gUmVxdWlyZWQgQm9vbGVhblxuICAgICAgICAgKiBvciBhIHByZWRpY2F0ZSBmdW5jdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge0Z1bmN0aW9ufEJvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgICAgdHlwZTogW0Z1bmN0aW9uLCBCb29sZWFuXSxcbiAgICAgICAgICAgIGRlZmF1bHQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICB3YXRjaDoge1xuXG4gICAgICAgIGFjdGl2ZSgpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0ZXAgPSB0aGlzLmluZGV4KCk7XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgYmFjaygpIHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3VwZGF0ZTpzdGVwJywgdGhpcy5jdXJyZW50U3RlcCA9IE1hdGgubWF4KHRoaXMuY3VycmVudFN0ZXAgLSAxLCAwKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGlzYWJsZUJ1dHRvbnMoKSB7XG4gICAgICAgICAgICB0aGlzLmlzQmFja0J1dHRvbkRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaXNGaW5pc2hCdXR0b25EaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmlzTmV4dEJ1dHRvbkRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBkaXNhYmxlQmFja0J1dHRvbigpIHtcbiAgICAgICAgICAgIHRoaXMuaXNCYWNrQnV0dG9uRGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRpc2FibGVGaW5pc2hCdXR0b24oKSB7XG4gICAgICAgICAgICB0aGlzLmlzRmluaXNoQnV0dG9uRGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRpc2FibGVOZXh0QnV0dG9uKCkge1xuICAgICAgICAgICAgdGhpcy5pc05leHRCdXR0b25EaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZW1pdEJ1YmJsZUV2ZW50KGtleSwgLi4uYXJncykge1xuICAgICAgICAgICAgdGhpcy4kcmVmcy5zbGlkZURlY2suc2xpZGUodGhpcy5jdXJyZW50U3RlcCkuY29tcG9uZW50SW5zdGFuY2UuJGVtaXQuYXBwbHkoXG4gICAgICAgICAgICAgICAgdGhpcy4kcmVmcy5zbGlkZURlY2suc2xpZGUodGhpcy5jdXJyZW50U3RlcCkuY29tcG9uZW50SW5zdGFuY2UsIGFyZ3MgPSBba2V5XS5jb25jYXQoYXJncylcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHRoaXMuJGVtaXQuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZW5hYmxlQnV0dG9ucygpIHtcbiAgICAgICAgICAgIHRoaXMuaXNCYWNrQnV0dG9uRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaXNGaW5pc2hCdXR0b25EaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc05leHRCdXR0b25EaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIGVuYWJsZUJhY2tCdXR0b24oKSB7XG4gICAgICAgICAgICB0aGlzLmlzQmFja0J1dHRvbkRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZW5hYmxlRmluaXNoQnV0dG9uKCkge1xuICAgICAgICAgICAgdGhpcy5pc0ZpbmlzaEJ1dHRvbkRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZW5hYmxlTmV4dEJ1dHRvbigpIHtcbiAgICAgICAgICAgIHRoaXMuaXNOZXh0QnV0dG9uRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfSxcblxuICAgICAgICBmaW5pc2goc3RhdHVzLCBlcnJvcnMgPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcbiAgICAgICAgICAgIHRoaXMuaGFzRmFpbGVkID0gc3RhdHVzID09PSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaXNGaW5pc2hlZCA9IHRydWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5kZXgoa2V5ID0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIHRoaXMuJHNsb3RzLmRlZmF1bHQuaW5kZXhPZihcbiAgICAgICAgICAgICAgICBmaW5kKHRoaXMuJHNsb3RzLmRlZmF1bHQsIFsna2V5Jywga2V5IHx8IHRoaXMuYWN0aXZlXSkgfHwgdGhpcy4kc2xvdHMuZGVmYXVsdFtrZXkgfHwgdGhpcy5hY3RpdmVdXG4gICAgICAgICAgICApKTtcbiAgICAgICAgfSxcblxuICAgICAgICBuZXh0KCkge1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgndXBkYXRlOnN0ZXAnLCB0aGlzLmN1cnJlbnRTdGVwID0gTWF0aC5taW4odGhpcy5jdXJyZW50U3RlcCArIDEsIHRoaXMuJHJlZnMuc2xpZGVEZWNrLnNsaWRlcygpLmxlbmd0aCAtIDEpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBvbkJlZm9yZUVudGVyKHNsaWRlLCBwcmV2KSB7XG4gICAgICAgICAgICBzbGlkZS5jb250ZXh0LiRlbWl0KCdiZWZvcmUtZW50ZXInLCBzbGlkZSwgcHJldik7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdiZWZvcmUtZW50ZXInLCBzbGlkZSwgcHJldik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25DbGlja1Rlc3QoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaXNGaW5pc2hlZCA9IGZhbHNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uQ2xpY2tCYWNrKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRCdWJibGVFdmVudCgnYmFjaycsIGV2ZW50KTtcblxuICAgICAgICAgICAgaWYoZXZlbnQuZGVmYXVsdFByZXZlbnRlZCAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG9uQ2xpY2tGaW5pc2goZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdEJ1YmJsZUV2ZW50KCdmaW5pc2gnLCBldmVudCk7XG5cbiAgICAgICAgICAgIGlmKGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaCh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBvbkNsaWNrTmV4dChldmVudCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0QnViYmxlRXZlbnQoJ25leHQnLCBldmVudCk7XG5cbiAgICAgICAgICAgIGlmKGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBvbkVudGVyKHNsaWRlLCBwcmV2KSB7XG4gICAgICAgICAgICB0aGlzLmhpZ2hlc3RTdGVwID0gTWF0aC5tYXgodGhpcy5oaWdoZXN0U3RlcCwgdGhpcy4kcmVmcy5zbGlkZURlY2suJHJlZnMuc2xpZGVzLmdldFNsaWRlSW5kZXgoc2xpZGUpKTtcbiAgICAgICAgICAgIHNsaWRlLmNvbXBvbmVudEluc3RhbmNlLiRyZWZzLndpemFyZCA9IHRoaXM7XG4gICAgICAgICAgICBzbGlkZS5jb250ZXh0LiRlbWl0KCdlbnRlcicsIHNsaWRlLCBwcmV2KTtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2VudGVyJywgc2xpZGUsIHByZXYpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uTGVhdmUoc2xpZGUsIHByZXYpIHtcbiAgICAgICAgICAgIHNsaWRlLmNvbnRleHQuJGVtaXQoJ2xlYXZlJywgc2xpZGUsIHByZXYpO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnbGVhdmUnLCBzbGlkZSwgcHJldik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25Qcm9ncmVzc0NsaWNrKGV2ZW50LCBzbGlkZSkge1xuICAgICAgICAgICAgaWYodGhpcy4kcmVmcy5zbGlkZURlY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGVwID0gdGhpcy4kcmVmcy5zbGlkZURlY2suJHJlZnMuc2xpZGVzLmdldFNsaWRlSW5kZXgoc2xpZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0ZpbmlzaGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RlcCA9IHRoaXMuaW5kZXgoc2xpZGUua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIGNvbnN0IHNsaWRlID0gdGhpcy4kcmVmcy5zbGlkZURlY2suc2xpZGUodGhpcy5jdXJyZW50U3RlcCk7XG5cbiAgICAgICAgaWYoc2xpZGUpIHtcbiAgICAgICAgICAgIChzbGlkZS5jb21wb25lbnRJbnN0YW5jZSB8fCBzbGlkZS5jb250ZXh0KS4kcmVmcy53aXphcmQgPSB0aGlzO1xuICAgICAgICAgICAgKHNsaWRlLmNvbXBvbmVudEluc3RhbmNlIHx8IHNsaWRlLmNvbnRleHQpLiRlbWl0KCdlbnRlcicpO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnZW50ZXInLCBzbGlkZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0ZXBzID0gdGhpcy4kcmVmcy5zbGlkZURlY2suc2xpZGVzKCk7XG4gICAgfSxcblxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGVwczogW10sXG4gICAgICAgICAgICBlcnJvcnM6IG51bGwsXG4gICAgICAgICAgICBoYXNGYWlsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgaXNGaW5pc2hlZDogZmFsc2UsXG4gICAgICAgICAgICBjdXJyZW50U3RlcDogdGhpcy5pbmRleCgpLFxuICAgICAgICAgICAgaGlnaGVzdFN0ZXA6IHRoaXMuaW5kZXgodGhpcy5jb21wbGV0ZWQpLFxuICAgICAgICAgICAgaXNCYWNrQnV0dG9uRGlzYWJsZWQ6IHRoaXMuYmFja0J1dHRvbiA9PT0gZmFsc2UsXG4gICAgICAgICAgICBpc05leHRCdXR0b25EaXNhYmxlZDogdGhpcy5uZXh0QnV0dG9uID09PSBmYWxzZSxcbiAgICAgICAgICAgIGlzRmluaXNoQnV0dG9uRGlzYWJsZWQ6IHRoaXMuZmluaXNoQnV0dG9uID09PSBmYWxzZVxuICAgICAgICB9O1xuICAgIH1cblxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuQGltcG9ydCAnLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL3Njc3MvZnVuY3Rpb25zLnNjc3MnO1xuQGltcG9ydCAnLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL3Njc3MvdmFyaWFibGVzLnNjc3MnO1xuXG4ud2l6YXJkIHtcbiAgICAuc2xpZGUtZGVjay1jb250ZW50IHtcbiAgICAgICAgbWFyZ2luOiAxcmVtO1xuICAgIH1cblxuICAgIC53aXphcmQtY29udGVudCB7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHBhZGRpbmc6IC41cmVtO1xuXG4gICAgICAgICYgKyBociB7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLndpemFyZC1idXR0b25zIHtcbiAgICAgICAgcGFkZGluZzogMXJlbTtcbiAgICB9XG59XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgV2l6YXJkIGZyb20gJy4vV2l6YXJkJztcbmltcG9ydCBXaXphcmRCdXR0b25zIGZyb20gJy4vV2l6YXJkQnV0dG9ucyc7XG5pbXBvcnQgV2l6YXJkSGVhZGVyIGZyb20gJy4vV2l6YXJkSGVhZGVyJztcbmltcG9ydCBXaXphcmRQcm9ncmVzcyBmcm9tICcuL1dpemFyZFByb2dyZXNzJztcbmltcG9ydCBXaXphcmRTdGVwIGZyb20gJy4vV2l6YXJkU3RlcCc7XG5pbXBvcnQgV2l6YXJkU3VjY2VzcyBmcm9tICcuL1dpemFyZFN1Y2Nlc3MnO1xuaW1wb3J0IFdpemFyZEVycm9yIGZyb20gJy4vV2l6YXJkRXJyb3InO1xuaW1wb3J0IFZ1ZUluc3RhbGxlciBmcm9tICcuLi8uLi9IZWxwZXJzL1Z1ZUluc3RhbGxlci9WdWVJbnN0YWxsZXInO1xuXG5jb25zdCBwbHVnaW4gPSBWdWVJbnN0YWxsZXIudXNlKHtcblxuICAgIGluc3RhbGwoVnVlLCBvcHRpb25zKSB7XG4gICAgICAgIFZ1ZUluc3RhbGxlci5jb21wb25lbnRzKHtcbiAgICAgICAgICAgIFdpemFyZCxcbiAgICAgICAgICAgIFdpemFyZEJ1dHRvbnMsXG4gICAgICAgICAgICBXaXphcmRIZWFkZXIsXG4gICAgICAgICAgICBXaXphcmRQcm9ncmVzcyxcbiAgICAgICAgICAgIFdpemFyZFN0ZXAsXG4gICAgICAgICAgICBXaXphcmRTdWNjZXNzLFxuICAgICAgICAgICAgV2l6YXJkRXJyb3JcbiAgICAgICAgfSk7XG4gICAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgV2l6YXJkO1xuIiwiY29uc3QgU1RZTEVfQVRUUklCVVRFUyA9IFtcbiAgICAnZm9udCcsXG4gICAgJ2ZvbnRGYW1pbHknLFxuICAgICdmb250S2VybmluZycsXG4gICAgJ2ZvbnRTaXplJyxcbiAgICAnZm9udFN0cmV0Y2gnLFxuICAgICdmb250U3R5bGUnLFxuICAgICdmb250VmFyaWFudCcsXG4gICAgJ2ZvbnRWYXJpYW50TGlnYXR1cmVzJyxcbiAgICAnZm9udFZhcmlhbnRDYXBzJyxcbiAgICAnZm9udFZhcmlhbnROdW1lcmljJyxcbiAgICAnZm9udFZhcmlhbnRFYXN0QXNpYW4nLFxuICAgICdmb250V2VpZ2h0JyxcbiAgICAnbGluZUhlaWdodCcsXG4gICAgJ2xldHRlclNwYWNpbmcnLFxuICAgICdwYWRkaW5nJyxcbiAgICAnbWFyZ2luJyxcbiAgICAndGV4dEFsaWduJyxcbiAgICAndGV4dEFsaWduTGFzdCcsXG4gICAgJ3RleHREZWNvcmF0aW9uJyxcbiAgICAndGV4dERlY29yYXRpb25MaW5lJyxcbiAgICAndGV4dERlY29yYXRpb25TdHlsZScsXG4gICAgJ3RleHREZWNvcmF0aW9uQ29sb3InLFxuICAgICd0ZXh0RGVjb3JhdGlvblNraXBJbmsnLFxuICAgICd0ZXh0RGVjb3JhdGlvblBvc2l0aW9uJyxcbiAgICAndGV4dEluZGVudCcsXG4gICAgJ3RleHRSZW5kZXJpbmcnLFxuICAgICd0ZXh0U2hhZG93JyxcbiAgICAndGV4dFNpemVBZGp1c3QnLFxuICAgICd0ZXh0T3ZlcmZsb3cnLFxuICAgICd0ZXh0VHJhbnNmb3JtJyxcbiAgICAnd2lkdGgnLFxuICAgICd3b3JkQnJlYWsnLFxuICAgICd3b3JkU3BhY2luZycsXG4gICAgJ3dvcmRXcmFwJ1xuXTtcblxuXG5mdW5jdGlvbiBpbnQoc3RyKSB7XG4gICAgaWYodHlwZW9mIHN0ciA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICBlbHNlIGlmKCFzdHIgfHwgIXN0ci5yZXBsYWNlKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJzZUludChzdHIucmVwbGFjZSgvW15cXGQuXSsvZywgJycpKTtcbn1cblxuZnVuY3Rpb24gaW5wdXQoZGl2LCBlbCkge1xuICAgIGRpdi5pbm5lckhUTUwgPSBlbC52YWx1ZS5yZXBsYWNlKC8oPzpcXHJcXG58XFxyfFxcbikvZywgJzxiciAvPicpO1xufVxuXG5mdW5jdGlvbiBoZWlnaHQoZWwpIHtcbiAgICByZXR1cm4gaW50KGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCk7XG59XG5cbmZ1bmN0aW9uIHN0eWxlKGVsLCBhdHRyKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKVthdHRyXTtcbn1cblxuZnVuY3Rpb24gcmVzaXplKHRhcmdldCwgZGl2LCBtaW5IZWlnaHQsIG1heEhlaWdodCkge1xuICAgIGNvbnN0IGR5bmFtaWNIZWlnaHQgPSBNYXRoLm1heChoZWlnaHQoZGl2KSArIGludChzdHlsZShkaXYsICdsaW5lSGVpZ2h0JykpLCBtaW5IZWlnaHQpO1xuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSAoKCFtYXhIZWlnaHQgfHwgZHluYW1pY0hlaWdodCA8IG1heEhlaWdodCkgPyBkeW5hbWljSGVpZ2h0IDogbWF4SGVpZ2h0KSArICdweCc7XG59XG5cbmZ1bmN0aW9uIHNldE1pbkhlaWdodChkaXYsIGVsKSB7XG4gICAgZGl2LnN0eWxlLm1pbkhlaWdodCA9IGhlaWdodChlbCkgKyAncHgnO1xufVxuXG5mdW5jdGlvbiBtaW1pYyhlbCkge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKTtcblxuICAgIGZvcihsZXQgaSBpbiBTVFlMRV9BVFRSSUJVVEVTKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IFNUWUxFX0FUVFJJQlVURVNbaV07XG5cbiAgICAgICAgZGl2LnN0eWxlW2tleV0gPSBzdHlsZXNba2V5XTtcbiAgICB9XG5cbiAgICBkaXYuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIGRpdi5zdHlsZS5ib3R0b20gPSAnMTAwJSc7XG4gICAgZGl2LnN0eWxlLnpJbmRleCA9IC0xO1xuICAgIGRpdi5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG5cbiAgICByZXR1cm4gZGl2O1xufVxuXG5mdW5jdGlvbiBpbml0KGVsLCBtYXhIZWlnaHQpIHtcbiAgICBjb25zdCBkaXYgPSBtaW1pYyhlbCk7XG4gICAgY29uc3QgbWluSGVpZ2h0ID0gaGVpZ2h0KGVsKTtcblxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZXZlbnQgPT4ge1xuICAgICAgICBpbnB1dChkaXYsIGV2ZW50LnRhcmdldCk7XG4gICAgICAgIHJlc2l6ZShlbCwgZGl2LCBtaW5IZWlnaHQsIG1heEhlaWdodCk7XG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG5cbiAgICBpbnB1dChkaXYsIGVsKTtcbiAgICByZXNpemUoZWwsIGRpdiwgbWluSGVpZ2h0LCBtYXhIZWlnaHQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBpbnNlcnRlZChlbCwgYmluZGluZywgdm5vZGUpIHtcbiAgICAgICAgaWYoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAndGV4dGFyZWEnKSB7XG4gICAgICAgICAgICBlbCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ3RleHRhcmVhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighZWwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQSB0ZXh0YXJlYSBpcyByZXF1aXJlZCBmb3IgdGhlIHYtYXV0b2dyb3cgZGlyZWN0aXZlLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5pdChlbCwgYmluZGluZy52YWx1ZSk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCB0cmFuc2l0aW9uIGZyb20gJy4uLy4uL0hlbHBlcnMvVHJhbnNpdGlvbic7XG5cbmZ1bmN0aW9uIHNob3coZWwsIHRhcmdldCwgdm5vZGUpIHtcbiAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2UnKTtcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgIHRhcmdldC4kY29sbGFwc2VkSGVpZ2h0ID0gZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXQpLmhlaWdodDtcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2luZycpO1xuXG4gICAgdm5vZGUuY29udGV4dC4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gdGFyZ2V0LiRjb2xsYXBzZWRIZWlnaHQ7XG4gICAgfSk7XG5cbiAgICB0cmFuc2l0aW9uKHRhcmdldCkudGhlbihkZWxheSA9PiB7XG4gICAgICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBudWxsO1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2UnKTtcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2NvbGxhcHNpbmcnKTtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2VkJyk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGhpZGUoZWwsIHRhcmdldCwgdm5vZGUpIHtcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gdGFyZ2V0LiRjb2xsYXBzZWRIZWlnaHQ7XG4gICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNpbmcnKTtcbiAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2UnKTtcblxuICAgIHZub2RlLmNvbnRleHQuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IDA7XG4gICAgfSk7XG5cbiAgICB0cmFuc2l0aW9uKHRhcmdldCkudGhlbihkZWxheSA9PiB7XG4gICAgICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBudWxsO1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2UnKTtcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnLCAnY29sbGFwc2luZycpO1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzZWQnKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgaW5zZXJ0ZWQoZWwsIGJpbmRpbmcsIHZub2RlKSB7XG4gICAgICAgIGlmKGlzVW5kZWZpbmVkKGJpbmRpbmcudmFsdWUpIHx8IGJpbmRpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNlZCcpO1xuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdkYXRhLXRvZ2dsZScsICdjb2xsYXBzZScpO1xuXG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JykgfHwgZWwuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGFyZ2V0KTtcblxuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIWVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3coZWwsIGVsZW1lbnQsIHZub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZGUoZWwsIGVsZW1lbnQsIHZub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgaWYoIWVsZW1lbnQuJGNvbGxhcHNlZEhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LiRjb2xsYXBzZWRIZWlnaHQgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmhlaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgICAgIGlmKCFlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnY29sbGFwc2UnKSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IGdldCB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcbmltcG9ydCB7IGtlYmFiQ2FzZSB9IGZyb20gJy4uLy4uL0hlbHBlcnMvRnVuY3Rpb25zJztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgaW5zZXJ0ZWQoZWwsIGJpbmRpbmcsIHZub2RlKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZWwucXVlcnlTZWxlY3RvcignaW5wdXQsIHRleHRhcmVhJykgfHwgZWw7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0KHZub2RlLmNvbnRleHQsIGJpbmRpbmcuZXhwcmVzc2lvbik7XG5cbiAgICAgICAgbGV0IGVkaXRhYmxlID0gIWlucHV0LnZhbHVlO1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZSA9IHZhbHVlID0+IHtcbiAgICAgICAgICAgIGlmKGVkaXRhYmxlKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBrZWJhYkNhc2UodmFsdWUpO1xuICAgICAgICAgICAgICAgIGlucHV0LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdpbnB1dCcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2bm9kZS5jb250ZXh0LiR3YXRjaChiaW5kaW5nLmV4cHJlc3Npb24sIHVwZGF0ZSk7XG5cbiAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IGtlYmFiQ2FzZShldmVudC50YXJnZXQudmFsdWUpICsgKFxuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC52YWx1ZS5tYXRjaCgvXFxzJC8pID8gJyAnIDogJydcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYoZXZlbnQgaW5zdGFuY2VvZiBJbnB1dEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgZWRpdGFibGUgPSAhZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBrZWJhYkNhc2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IGJpbmRpbmcuZXhwcmVzc2lvbi5zcGxpdCgnLicpLnJlZHVjZSgobyxpKT0+b1tpXSwgdm5vZGUuY29udGV4dCkpO1xuICAgICAgICAgICAgaW5wdXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2lucHV0JykpO1xuICAgICAgICB9KTtcblxuICAgICAgICAhaW5wdXQudmFsdWUgJiYgdXBkYXRlKHZhbHVlKTtcbiAgICB9XG5cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJsb2IodXJsLCBwcm9ncmVzcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2Jsb2InO1xuXG4gICAgICAgIGlmKGlzRnVuY3Rpb24ocHJvZ3Jlc3MpKSB7XG4gICAgICAgICAgICB4aHIub25wcm9ncmVzcyA9IGUgPT4gcHJvZ3Jlc3MoZSwgeGhyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHhoci5vbmVycm9yID0gZSA9PiByZWplY3QoZSk7XG4gICAgICAgIHhoci5vbmFib3J0ID0gZSA9PiByZWplY3QoZSk7XG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgeGhyLnNlbmQoKTtcbiAgICB9KTtcbn1cbiIsImltcG9ydCB7IHdyYXAgfSBmcm9tICcuLi9GdW5jdGlvbnMnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL0Z1bmN0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVsYXBzZWQobWlsbGlzZWNvbmRzLCBjYWxsYmFjaywgZWxhcHNlZENhbGxiYWNrKSB7XG4gICAgbGV0IGhhc0VsYXBzZWQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBoYXNFbGFwc2VkID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYoaXNGdW5jdGlvbihlbGFwc2VkQ2FsbGJhY2spKSB7XG4gICAgICAgICAgICAgICAgZWxhcHNlZENhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIG1pbGxpc2Vjb25kcylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoaW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIGNvbnN0IGludGVydmFsID0gc3RhcnQoKSwgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZnVuY3Rpb24gcmVzb2x2ZXIocmVzb2x2ZXIsIHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZXIocmVzcG9uc2UgfHwgaGFzRWxhcHNlZCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY2FsbGJhY2sod3JhcChyZXNvbHZlLCByZXNvbHZlciksIHdyYXAocmVqZWN0LCByZXNvbHZlcikpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByb21pc2UuZmluYWxseShzdG9wLCBzdG9wKTtcbn1cbiIsImNvbnN0IGVhc2luZ3MgPSB7XG4gICAgbGluZWFyKHQpIHtcbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfSxcbiAgICBlYXNlSW5RdWFkKHQpIHtcbiAgICAgICAgcmV0dXJuIHQgKiB0O1xuICAgIH0sXG4gICAgZWFzZU91dFF1YWQodCkge1xuICAgICAgICByZXR1cm4gdCAqICgyIC0gdCk7XG4gICAgfSxcbiAgICBlYXNlSW5PdXRRdWFkKHQpIHtcbiAgICAgICAgcmV0dXJuIHQgPCAwLjUgPyAyICogdCAqIHQgOiAtMSArICg0IC0gMiAqIHQpICogdDtcbiAgICB9LFxuICAgIGVhc2VJbkN1YmljKHQpIHtcbiAgICAgICAgcmV0dXJuIHQgKiB0ICogdDtcbiAgICB9LFxuICAgIGVhc2VPdXRDdWJpYyh0KSB7XG4gICAgICAgIHJldHVybiAoLS10KSAqIHQgKiB0ICsgMTtcbiAgICB9LFxuICAgIGVhc2VJbk91dEN1YmljKHQpIHtcbiAgICAgICAgcmV0dXJuIHQgPCAwLjUgPyA0ICogdCAqIHQgKiB0IDogKHQgLSAxKSAqICgyICogdCAtIDIpICogKDIgKiB0IC0gMikgKyAxO1xuICAgIH0sXG4gICAgZWFzZUluUXVhcnQodCkge1xuICAgICAgICByZXR1cm4gdCAqIHQgKiB0ICogdDtcbiAgICB9LFxuICAgIGVhc2VPdXRRdWFydCh0KSB7XG4gICAgICAgIHJldHVybiAxIC0gKC0tdCkgKiB0ICogdCAqIHQ7XG4gICAgfSxcbiAgICBlYXNlSW5PdXRRdWFydCh0KSB7XG4gICAgICAgIHJldHVybiB0IDwgMC41ID8gOCAqIHQgKiB0ICogdCAqIHQgOiAxIC0gOCAqICgtLXQpICogdCAqIHQgKiB0O1xuICAgIH0sXG4gICAgZWFzZUluUXVpbnQodCkge1xuICAgICAgICByZXR1cm4gdCAqIHQgKiB0ICogdCAqIHQ7XG4gICAgfSxcbiAgICBlYXNlT3V0UXVpbnQodCkge1xuICAgICAgICByZXR1cm4gMSArICgtLXQpICogdCAqIHQgKiB0ICogdDtcbiAgICB9LFxuICAgIGVhc2VJbk91dFF1aW50KHQpIHtcbiAgICAgICAgcmV0dXJuIHQgPCAwLjUgPyAxNiAqIHQgKiB0ICogdCAqIHQgKiB0IDogMSArIDE2ICogKC0tdCkgKiB0ICogdCAqIHQgKiB0O1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNjcm9sbFRvKGRlc3RpbmF0aW9uLCBkdXJhdGlvbiA9IDEwMDAsIGVhc2luZyA9ICdlYXNlSW5RdWFkJywgdmlld3BvcnQgPSBmYWxzZSkge1xuICAgIGlmKCF2aWV3cG9ydCkge1xuICAgICAgICB2aWV3cG9ydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICB9XG5cbiAgICBjb25zdCB2aWV3cG9ydEJvdW5kcyA9IHZpZXdwb3J0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uQm91bmRzID0gZGVzdGluYXRpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgZGVzdGluYXRpb25PZmZzZXRUb1Njcm9sbCA9IE1hdGguY2VpbChkZXN0aW5hdGlvbkJvdW5kcy50b3AgKyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wKTtcblxuICAgIGZ1bmN0aW9uIGlzU2Nyb2xsQm90dG9tKCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA+PSBNYXRoLmZsb29yKHZpZXdwb3J0Qm91bmRzLmhlaWdodCkgLSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhcnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgIGNvbnN0IGlzU3RhcnRpbmdCb3R0b20gPSBpc1Njcm9sbEJvdHRvbSgpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHNjcm9sbCgpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBNYXRoLm1pbigxLCAoKHBlcmZvcm1hbmNlLm5vdygpIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uKSk7XG4gICAgICAgICAgICBjb25zdCB0aW1lRnVuY3Rpb24gPSBlYXNpbmdzW2Vhc2luZ10odGltZSk7XG5cbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGwoMCwgTWF0aC5jZWlsKCh0aW1lRnVuY3Rpb24gKiAoZGVzdGluYXRpb25PZmZzZXRUb1Njcm9sbCAtIHN0YXJ0KSkgKyBzdGFydCkpO1xuXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9PT0gZGVzdGluYXRpb25PZmZzZXRUb1Njcm9sbCB8fCBpc1Njcm9sbEJvdHRvbSgpICYmICFpc1N0YXJ0aW5nQm90dG9tKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNjcm9sbCk7XG4gICAgICAgIH1cblxuICAgICAgICBzY3JvbGwoKTtcbiAgICB9KTtcbn1cbiIsImltcG9ydCB7IHdyYXAgfSBmcm9tICcuLi9GdW5jdGlvbnMnO1xuaW1wb3J0IHsgZmluZEtleSB9IGZyb20gJy4uL0Z1bmN0aW9ucyc7XG5cbmNvbnN0IENBTExCQUNLUyA9IHt9O1xuXG5mdW5jdGlvbiBpZChjYWxsYmFjaykge1xuICAgIHJldHVybiBmaW5kS2V5KENBTExCQUNLUywgY29tcGFyZSA9PiB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjay50b1N0cmluZygpID09IGNvbXBhcmUudG9TdHJpbmcoKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcmVzdGFydChjYWxsYmFjaywgbWlsbGlzZWNvbmRzKSB7XG4gICAgc3RvcChpZChjYWxsYmFjaykpO1xuICAgIHN0YXJ0KGNhbGxiYWNrLCBtaWxsaXNlY29uZHMpO1xufVxuXG5mdW5jdGlvbiBzdG9wKGlkKSB7XG4gICAgY2xlYXJUaW1lb3V0KGlkKTtcbiAgICBkZWxldGUgQ0FMTEJBQ0tTW2lkXTtcbn1cblxuZnVuY3Rpb24gc3RhcnQoY2FsbGJhY2ssIG1pbGxpc2Vjb25kcykge1xuICAgIHJldHVybiBDQUxMQkFDS1Nbc2V0VGltZW91dChjYWxsYmFjaywgbWlsbGlzZWNvbmRzKV0gPSBjYWxsYmFjaztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2FpdChtaWxsaXNlY29uZHMsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZnVuY3Rpb24gcmVzb2x2ZXIocmVzb2x2ZXIsIHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZXIocmVzcG9uc2UpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlc3RhcnQod3JhcChjYWxsYmFjaywgY2FsbGJhY2sgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHdyYXAocmVzb2x2ZSwgcmVzb2x2ZXIpLCB3cmFwKHJlamVjdCwgcmVzb2x2ZXIpKTtcbiAgICAgICAgfSksIG1pbGxpc2Vjb25kcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZS5maW5hbGx5KHN0b3AsIHN0b3ApO1xufVxuXG5cbi8qXG5pbXBvcnQgeyB3cmFwIH0gZnJvbSAnLi4vRnVuY3Rpb25zJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi9GdW5jdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlbGFwc2VkKGRlbGF5LCBjYWxsYmFjaywgZWxhcHNlZENhbGxiYWNrKSB7XG4gICAgbGV0IGhhc0VsYXBzZWQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgICByZXR1cm4gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgaGFzRWxhcHNlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmKGlzRnVuY3Rpb24oZWxhcHNlZENhbGxiYWNrKSkge1xuICAgICAgICAgICAgICAgIGVsYXBzZWRDYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBkZWxheSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnRlcnZhbCA9IHN0YXJ0KCksIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIHJlc29sdmVyKHJlc29sdmVyLCByZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmVyKHJlc3BvbnNlIHx8IGhhc0VsYXBzZWQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNhbGxiYWNrKHdyYXAocmVzb2x2ZSwgcmVzb2x2ZXIpLCB3cmFwKHJlamVjdCwgcmVzb2x2ZXIpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwcm9taXNlLmZpbmFsbHkoc3RvcCwgc3RvcCk7XG59XG5cbiAqL1xuIiwiaW1wb3J0ICogYXMgZmlsdGVycyBmcm9tICcuL0ZpbHRlcnMnO1xuaW1wb3J0ICogYXMgcGx1Z2lucyBmcm9tICcuL1BsdWdpbnMnO1xuaW1wb3J0ICogYXMgY29tcG9uZW50cyBmcm9tICcuL0NvbXBvbmVudHMnO1xuaW1wb3J0ICogYXMgZGlyZWN0aXZlcyBmcm9tICcuL0RpcmVjdGl2ZXMnO1xuaW1wb3J0IFZ1ZUluc3RhbGxlciBmcm9tICcuL0hlbHBlcnMvVnVlSW5zdGFsbGVyJztcblxuZXhwb3J0ICogZnJvbSAnLi9IdHRwJztcbmV4cG9ydCAqIGZyb20gJy4vTWl4aW5zJztcbmV4cG9ydCAqIGZyb20gJy4vSGVscGVycyc7XG5leHBvcnQgKiBmcm9tICcuL1BsdWdpbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9Db21wb25lbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vRGlyZWN0aXZlcyc7XG5leHBvcnQgKiBmcm9tICcuL0ZpbHRlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBWdWVJbnN0YWxsZXIudXNlKHtcblxuICAgIGluc3RhbGwoVnVlKSB7XG4gICAgICAgIFZ1ZUluc3RhbGxlci5wbHVnaW5zKFZ1ZSwgcGx1Z2lucyk7XG4gICAgICAgIFZ1ZUluc3RhbGxlci5maWx0ZXJzKFZ1ZSwgZmlsdGVycyk7XG4gICAgICAgIFZ1ZUluc3RhbGxlci5kaXJlY3RpdmVzKFZ1ZSwgZGlyZWN0aXZlcyk7XG4gICAgICAgIFZ1ZUluc3RhbGxlci5jb21wb25lbnRzKFZ1ZSwgY29tcG9uZW50cyk7XG4gICAgfVxuXG59KTtcbiJdLCJuYW1lcyI6WyJ2YWx1ZSIsImZvcm1hdCIsIm1vbWVudCIsIlN0cmluZyIsIlZ1ZSIsIm9wdGlvbnMiLCJmaWx0ZXIiLCJEYXRlRmlsdGVyIiwiTW9tZW50RmlsdGVyIiwiY2FtZWxDYXNlIiwic3RyaW5nIiwidG9Mb3dlckNhc2UiLCJyZXBsYWNlIiwibWF0Y2giLCJjaGFyQXQiLCJsZW5ndGgiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0cmluZyIsImV4dGVuZCIsIk9iamVjdCIsImFzc2lnbiIsImlzTnVsbCIsImlzQXJyYXkiLCJBcnJheSIsImlzT2JqZWN0IiwiZGVlcEV4dGVuZCIsInRhcmdldCIsInNvdXJjZXMiLCJzb3VyY2UiLCJzaGlmdCIsImtleSIsImlzTnVtYmVyIiwidG9TdHJpbmciLCJpc051bWVyaWMiLCJwYXJzZUZsb2F0IiwiZWFjaCIsInN1YmplY3QiLCJmbiIsImkiLCJmaXJzdCIsImFycmF5IiwidW5kZWZpbmVkIiwiaXNVbmRlZmluZWQiLCJtYXRjaGVzIiwicHJvcGVydGllcyIsImlzU3RyaW5nIiwiZ2V0Iiwib2JqZWN0IiwicGF0aCIsInNwbGl0IiwicmVkdWNlIiwiYSIsImIiLCJwcm9wZXJ0eSIsImlzRnVuY3Rpb24iLCJGdW5jdGlvbiIsIm1hdGNoZXNQcm9wZXJ0eSIsInByZWRpY2F0ZSIsImZpbmQiLCJmaW5kSW5kZXgiLCJpc0Jvb2xlYW4iLCJrZWJhYkNhc2UiLCJzdHIiLCJtYXBLZXlzIiwibWFwcGVkIiwibmVnYXRlIiwicGlja0J5Iiwib21pdEJ5IiwicmVtb3ZlIiwiaW5kZXhlcyIsInB1c2giLCJpbmRleE9mIiwid3JhcCIsInByZWZpeCIsImRlbGltZXRlciIsInByZWZpeGVyIiwiUmVnRXhwIiwiam9pbiIsInByb3BzIiwidmFyaWFudCIsInR5cGUiLCJkZWZhdWx0IiwiY29tcHV0ZWQiLCJ2YXJpYW50Q2xhc3NQcmVmaXgiLCIkb3B0aW9ucyIsIm5hbWUiLCJ2YXJpYW50Q2xhc3MiLCJzaXplIiwidmFsaWRhdGUiLCJzaXplYWJsZUNsYXNzUHJlZml4Iiwic2l6ZWFibGVDbGFzcyIsIkNPTE9SUyIsIm5hbWVzcGFjZSIsImNvbG9yIiwiQm9vbGVhbiIsImNsYXNzZXMiLCJpbnN0YW5jZSIsIm1hcCIsIm1ldGhvZHMiLCJ0ZXh0Q29sb3IiLCJiZ0NvbG9yIiwiYm9yZGVyQ29sb3IiLCJiZ0dyYWRpZW50Q29sb3IiLCJ0ZXh0Q29sb3JDbGFzc2VzIiwidHJpbSIsImJvcmRlckNvbG9yQ2xhc3NlcyIsImJnQ29sb3JDbGFzc2VzIiwiYmdHcmFkaWVudENvbG9yQ2xhc3NlcyIsImNvbG9yYWJsZUNsYXNzZXMiLCJkdXJhdGlvbiIsImVsIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInRyYW5zaXRpb25EdXJhdGlvbiIsIm51bWVyaWMiLCJ1bml0IiwidHJhbnNpdGlvbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZGVsYXkiLCJzZXRUaW1lb3V0IiwiZSIsIm1lcmdlQ2xhc3NlcyIsInNsaWNlIiwiY2FsbCIsImFyZ3VtZW50cyIsImFyZyIsImNvbmNhdCIsIkxPQURFRF9TQ1JJUFRTIiwiZWxlbWVudCIsInVybCIsInNjcmlwdCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZCIsInF1ZXJ5U2VsZWN0b3IiLCJhcHBlbmRDaGlsZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIlZ1ZUluc3RhbGxlciIsInVzZSIsInBsdWdpbiIsInBsdWdpbnMiLCJmaWx0ZXJzIiwiY29tcG9uZW50IiwiY29tcG9uZW50cyIsImRpcmVjdGl2ZSIsImRpcmVjdGl2ZXMiLCIkcGx1Z2lucyIsIiRmaWx0ZXJzIiwiJGRpcmVjdGl2ZXMiLCIkY29tcG9uZW50cyIsIndpbmRvdyIsImRlZiIsImluc3RhbGwiLCJCdG4iLCJoZWlnaHQiLCJpc0Zpbml0ZSIsIkFjdGl2aXR5SW5kaWNhdG9yIiwiQnRuQWN0aXZpdHkiLCJhbmltYXRpb24iLCJzaG93IiwiZGVmYXV0IiwiRWxlbWVudCIsInRyaWdnZXIiLCJpbml0aWFsaXplVHJpZ2dlciIsInRvZ2dsZSIsImluaXRpYWxpemVUcmlnZ2VycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiJG5leHRUaWNrIiwiaXNTaG93aW5nIiwiZm9jdXMiLCIkZWwiLCJvcGVuIiwiaXNEaXNwbGF5aW5nIiwidGhlbiIsIiRlbWl0IiwiY2xvc2UiLCJ0cmlnZ2VyYWJsZUNsYXNzZXMiLCJ3YXRjaCIsIm1vdW50ZWQiLCJkYXRhIiwiTW9kYWwiLCJpbnN0YW50aWF0ZSIsIkNvbXBvbmVudCIsInRleHQiLCJmdW5jdGlvbmFsIiwicmVuZGVyIiwiaCIsImNvbnRleHQiLCJfdiIsInByb3RvdHlwZSIsIiRtb2RhbCIsIm1vZGFsIiwiJGNvbnRlbnQiLCJjb250ZW50IiwiJHNsb3RzIiwiJG1vdW50IiwiX3Zub2RlIiwiYm9keSIsIiRhbGVydCIsInRpdGxlIiwicHJvcHNEYXRhIiwiJG9uIiwiJGNvbmZpcm0iLCIkcHJvbXB0Iiwic3VjY2VlZCIsImZhaWwiLCJzdWNjZXNzIiwiQ29udGFpbmVyIiwiT3ZlcmxheSIsIiRvdmVybGF5Iiwib3ZlcmxheSIsIlBvcG92ZXIiLCJQb3BvdmVyQm9keSIsIlBvcG92ZXJIZWFkZXIiLCIkcG9wb3ZlciIsInBvcG92ZXIiLCJQcm9ncmVzc0JhciIsIkFsZXJ0IiwiQWxlcnRMaW5rIiwiQWxlcnRDbG9zZSIsIkFsZXJ0SGVhZGluZyIsIkJhZGdlIiwiQmFzZUNsYXNzIiwiYXR0cmlidXRlcyIsImhhc093blByb3BlcnR5IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImdldEF0dHJpYnV0ZSIsImtleXMiLCJnZXRBdHRyaWJ1dGVzIiwib2JqIiwic2V0QXR0cmlidXRlcyIsInZhbHVlcyIsIlJlc3BvbnNlIiwiZGF0ZSIsIkRhdGUiLCIkZGF0YSIsIiRyZXF1ZXN0IiwiJGRhdGUiLCJERUZBVUxUUyIsInRyYW5zZm9ybVJlcXVlc3QiLCJ0cmFuc2Zvcm1SZXNwb25zZSIsIlJlcXVlc3QiLCJtZXRob2QiLCJoZWFkZXJzIiwicGFyYW1zIiwic2VudEF0IiwiYXhpb3MiLCJyZXNwb25zZSIsImVycm9ycyIsIiRjYW5jZWwiLCJFcnJvciIsImNhbmNlbFRva2VuIiwiQ2FuY2VsVG9rZW4iLCJjYW5jZWwiLCJnZXRQdWJsaWNBdHRyaWJ1dGVzIiwiJHJlc3BvbnNlIiwiJGVycm9ycyIsIiRlcnJvciIsIm1ha2UiLCJzZW5kIiwicmVxdWVzdCIsIk1vZGVsIiwiJGtleSIsIiRmaWxlcyIsImZpbGVzIiwiJHByb3BlcnRpZXMiLCJpbml0aWFsaXplIiwiJGV4aXN0cyIsIiRjaGFuZ2VkIiwiJGF0dHJpYnV0ZXMiLCJmaWxsIiwiJGluaXRpYWxpemVkIiwiZW5kcG9pbnQiLCJleGlzdHMiLCJpZCIsImhhbmRsZUF0dHJpYnV0ZUNoYW5nZSIsImdldENoYW5nZWRBdHRyaWJ1dGVzIiwiY291bnQiLCJ0b3RhbCIsImNhcnJ5IiwiRmlsZSIsIkZpbGVMaXN0IiwidG9KU09OIiwiaGFuZGxlUHJpbWFyeUtleUNoYW5nZSIsImNvbmZpZyIsImhhc0ZpbGVzIiwidG9Gb3JtRGF0YSIsImNvbnN0cnVjdG9yIiwidXJpIiwiZm9ybSIsIkZvcm1EYXRhIiwiaXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJtb2RlbCIsImVycm9yIiwiQmFzZUZvcm0iLCJCcmVhZGNydW1iIiwiQnJlYWRjcnVtYkl0ZW0iLCJzck9ubHkiLCJzck9ubHlGb2N1c2FibGUiLCJzY3JlZW5yZWFkZXJDbGFzc2VzIiwiSGVscFRleHQiLCJGb3JtR3JvdXAiLCJGb3JtTGFiZWwiLCJGb3JtRmVlZGJhY2siLCJhdXRvY29tcGxldGUiLCJOdW1iZXIiLCJsYWJlbCIsInBsYWNlaG9sZGVyIiwicmVxdWlyZWQiLCJncm91cCIsInBhdHRlcm4iLCJmZWVkYmFjayIsImJpbmRFdmVudHMiLCJkZWZhdWx0Q29udHJvbENsYXNzIiwiaGlkZUxhYmVsIiwic3BhY2luZyIsImlubGluZSIsInBsYWludGV4dCIsInJlYWRvbmx5IiwiZGlzYWJsZWQiLCJoZWxwVGV4dCIsIm1heGxlbmd0aCIsImJpbmQiLCJiaW5kaW5nIiwidm5vZGUiLCJldmVudHMiLCJibHVyIiwiZ2V0SW5wdXRGaWVsZCIsImdldEZpZWxkRXJyb3JzIiwiY2FsbGJhY2tzIiwiY2FsbGJhY2siLCJpbnZhbGlkRmVlZGJhY2siLCJ2YWxpZEZlZWRiYWNrIiwiY29udHJvbENsYXNzIiwiY29udHJvbFNpemVDbGFzcyIsImNvbnRyb2xDbGFzc2VzIiwiaGFzRGVmYXVsdFNsb3QiLCJJbnB1dEZpZWxkIiwiRmlsZUZpZWxkIiwiQnRuRmlsZSIsIkJ0bkdyb3VwIiwiQnRuR3JvdXBUb2dnbGUiLCJCdG5Ub29sYmFyIiwidXVpZCIsImMiLCJyIiwiTWF0aCIsInJhbmRvbSIsInYiLCJwcm94eSIsImFwcGx5Iiwic3BsaWNlIiwicHJldmVudERlZmF1bHQiLCJQcm94eSIsIkRyb3Bkb3duTWVudSIsIkRyb3Bkb3duTWVudURpdmlkZXIiLCJEcm9wZG93bk1lbnVIZWFkZXIiLCJEcm9wZG93bk1lbnVJdGVtIiwiQnRuRHJvcGRvd24iLCJnZXRTbG90Iiwic2xvdCIsImhhc1Nsb3QiLCJoYXNTbG90cyIsInNsb3RzIiwiQ2FyZCIsIkNhcmRCb2R5IiwiQ2FyZEJ0bkdyb3VwIiwiQ2FyZERlY2siLCJDYXJkRm9vdGVyIiwiQ2FyZEhlYWRlciIsIkNhcmRJbWciLCJDYXJkSW1nVG9wIiwiQ2FyZEltZ0JvdHRvbSIsIkNhcmRJbWdPdmVybGF5IiwiQ2FyZExpbmsiLCJDYXJkU3VidGl0bGUiLCJDYXJkVGl0bGUiLCJSYWRpb0ZpZWxkIiwiQ2hlY2tib3hGaWVsZCIsIkRyb3B6b25lIiwicmVhZEZpbGUiLCJmaWxlIiwicHJvZ3Jlc3MiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25wcm9ncmVzcyIsIm9ubG9hZCIsIm9uZXJyb3IiLCJvbmFib3J0IiwicmVhZEFzRGF0YVVSTCIsIkZpbGVQcmV2aWV3IiwiRm9ybUNvbnRyb2wiLCJJbnB1dEdyb3VwIiwiSW5wdXRHcm91cEFwcGVuZCIsIklucHV0R3JvdXBQcmVwZW5kIiwiSW5wdXRHcm91cFRleHQiLCJGb3JtQ29udHJvbE1peGluIiwiTGlnaHRTd2l0Y2hGaWVsZCIsIkxpc3RHcm91cCIsIk5hdmlnYXRpb24iLCJOYXZpZ2F0aW9uRXJyb3IiLCJOYXZpZ2F0aW9uSXRlbSIsIk5hdmlnYXRpb25MaW5rIiwiTmF2aWdhdGlvbkRyb3Bkb3duIiwiTmF2YmFyIiwiTmF2YmFyQnJhbmQiLCJOYXZiYXJDb2xsYXBzZSIsIk5hdmJhck5hdiIsIk5hdmJhclRleHQiLCJOYXZiYXJUb2dnbGVyIiwiTmF2YmFyVG9nZ2xlckljb24iLCJQYWdpbmF0aW9uIiwiU2VsZWN0RmllbGQiLCJTbGlkZXMiLCJTbGlkZURlY2siLCJUcmFuc2Zvcm1lciIsIiRvcmlnaW5hbFJlc3BvbnNlIiwiJHJlcXVpcmVkIiwiJHRyYW5zZm9ybWVkUmVzcG9uc2UiLCJ0cmFuc2Zvcm0iLCJUYWJsZVZpZXdUcmFuc2Zvcm1lciIsIlRhYmxlVmlldyIsIlRleHRhcmVhRmllbGQiLCJUaHVtYm5haWxMaXN0IiwiVXBsb2FkRmllbGQiLCJXaXphcmQiLCJXaXphcmRCdXR0b25zIiwiV2l6YXJkSGVhZGVyIiwiV2l6YXJkUHJvZ3Jlc3MiLCJXaXphcmRTdGVwIiwiV2l6YXJkU3VjY2VzcyIsIldpemFyZEVycm9yIiwiU1RZTEVfQVRUUklCVVRFUyIsImludCIsInBhcnNlSW50IiwiaW5wdXQiLCJkaXYiLCJpbm5lckhUTUwiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJzdHlsZSIsImF0dHIiLCJyZXNpemUiLCJtaW5IZWlnaHQiLCJtYXhIZWlnaHQiLCJkeW5hbWljSGVpZ2h0IiwibWF4IiwibWltaWMiLCJzdHlsZXMiLCJwb3NpdGlvbiIsImJvdHRvbSIsInpJbmRleCIsInZpc2liaWxpdHkiLCJpbml0IiwiaW5zZXJ0ZWQiLCJ0YWdOYW1lIiwiY2xhc3NMaXN0IiwiYWRkIiwiJGNvbGxhcHNlZEhlaWdodCIsImhpZGUiLCJlbGVtZW50cyIsImNvbnRhaW5zIiwiZXhwcmVzc2lvbiIsImVkaXRhYmxlIiwidXBkYXRlIiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwiJHdhdGNoIiwiSW5wdXRFdmVudCIsIm8iLCJibG9iIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJyZXNwb25zZVR5cGUiLCJzdGF0dXMiLCJlbGFwc2VkIiwibWlsbGlzZWNvbmRzIiwiZWxhcHNlZENhbGxiYWNrIiwiaGFzRWxhcHNlZCIsInN0YXJ0Iiwic3RvcCIsImNsZWFyVGltZW91dCIsImludGVydmFsIiwicHJvbWlzZSIsInJlc29sdmVyIiwiZmluYWxseSIsImVhc2luZ3MiLCJsaW5lYXIiLCJ0IiwiZWFzZUluUXVhZCIsImVhc2VPdXRRdWFkIiwiZWFzZUluT3V0UXVhZCIsImVhc2VJbkN1YmljIiwiZWFzZU91dEN1YmljIiwiZWFzZUluT3V0Q3ViaWMiLCJlYXNlSW5RdWFydCIsImVhc2VPdXRRdWFydCIsImVhc2VJbk91dFF1YXJ0IiwiZWFzZUluUXVpbnQiLCJlYXNlT3V0UXVpbnQiLCJlYXNlSW5PdXRRdWludCIsInNjcm9sbFRvIiwiZGVzdGluYXRpb24iLCJlYXNpbmciLCJ2aWV3cG9ydCIsInZpZXdwb3J0Qm91bmRzIiwiZGVzdGluYXRpb25Cb3VuZHMiLCJkZXN0aW5hdGlvbk9mZnNldFRvU2Nyb2xsIiwiY2VpbCIsInRvcCIsImRvY3VtZW50RWxlbWVudCIsInNjcm9sbFRvcCIsImlzU2Nyb2xsQm90dG9tIiwiZmxvb3IiLCJpbm5lckhlaWdodCIsInN0YXJ0VGltZSIsInBlcmZvcm1hbmNlIiwibm93IiwiaXNTdGFydGluZ0JvdHRvbSIsInNjcm9sbCIsInRpbWUiLCJtaW4iLCJ0aW1lRnVuY3Rpb24iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJDQUxMQkFDS1MiLCJmaW5kS2V5IiwiY29tcGFyZSIsInJlc3RhcnQiLCJ3YWl0Il0sIm1hcHBpbmdzIjoiOzs7O0FBRWUscUJBQVNBLEtBQVQsRUFBZ0JDLE1BQWhCLEVBQXdCO01BQ2hDRCxLQUFILEVBQVU7V0FDQ0UsTUFBTSxDQUFDQyxNQUFNLENBQUNILEtBQUQsQ0FBUCxDQUFOLENBQXNCQyxNQUF0QixDQUE2QkEsTUFBN0IsQ0FBUDs7O1NBR0cs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
