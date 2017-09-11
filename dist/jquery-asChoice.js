/**
* jquery asChoice v0.3.2
* https://github.com/amazingSurge/jquery-asChoice
*
* Copyright (c) amazingSurge
* Released under the LGPL-3.0 license
*/
(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(require('jquery'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jQuery);
    global.jqueryAsChoiceEs = mod.exports;
  }
})(this, function(_jquery) {
  'use strict';

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule
      ? obj
      : {
          default: obj
        };
  }

  var _typeof =
    typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
      ? function(obj) {
          return typeof obj;
        }
      : function(obj) {
          return obj &&
          typeof Symbol === 'function' &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
            ? 'symbol'
            : typeof obj;
        };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function(Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  var DEFAULTS = {
    namespace: 'asChoice',
    skin: null,

    multiple: false,
    value: ['default']
  };

  var NAMESPACE$1 = 'asChoice';

  /**
   * Plugin constructor
   **/

  var asChoice = (function() {
    function asChoice(select) {
      var options =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, asChoice);

      this.select = select;
      this.$select = (0, _jquery2.default)(select);

      this.$options = this.$select.find('option');
      var meta = {};

      if (this.$options.length !== 0) {
        meta.status = {};
        meta.value = [];
        meta.multiple = this.$select.prop('multiple');

        _jquery2.default.each(this.$options, function(i, v) {
          meta.status[(0, _jquery2.default)(v).attr('value')] = {};
          meta.status[(0, _jquery2.default)(v).attr('value')].text = (0,
          _jquery2.default)(v).text();
          if ((0, _jquery2.default)(v).prop('selected')) {
            meta.value.push((0, _jquery2.default)(v).attr('value'));
          }
        });
      }

      this.options = _jquery2.default.extend({}, DEFAULTS, options, meta);
      this.namespace = this.options.namespace;
      this.status = this.options.status;

      this.classes = {
        selected: this.namespace + '-selected',
        disabled: this.namespace + '-disabled',
        skin: this.namespace + '_' + this.options.skin
      };

      this.value = [];
      this.disabled = false;
      this._trigger('init');
      this.init();
    }

    _createClass(
      asChoice,
      [
        {
          key: 'init',
          value: function init() {
            var _this = this;

            var tpl =
              '<li><span class="' + this.namespace + '-text"></span></li>';

            this.$select.css({
              display: 'none'
            });

            this.$wrap = (0, _jquery2.default)('<ul></ul>');
            this.$wrap.addClass(this.namespace);
            if (this.options.skin) {
              this.$wrap.addClass(this.classes.skin);
            }

            _jquery2.default.each(this.status, function(key, value) {
              var $tpl = (0, _jquery2.default)(tpl).data('value', key);

              if (
                (typeof value === 'undefined'
                  ? 'undefined'
                  : _typeof(value)) === 'object'
              ) {
                if (value.icon) {
                  (0, _jquery2.default)('<i></i>')
                    .addClass(value.icon)
                    .appendTo($tpl);
                }
                if (value.text) {
                  $tpl.find('span').text(value.text);
                }
              } else {
                $tpl.find('span').text(value.text);
              }

              _jquery2.default.each(_this.value, function(i, v) {
                if (v === key) {
                  $tpl.addClass(_this.classes.selected);
                }
              });

              _this.$wrap.append($tpl);
            });

            this.$select.after(this.$wrap);

            this._bindEvents();

            this._trigger('ready');
          }
        },
        {
          key: '_bindEvents',
          value: function _bindEvents() {
            var that = this;
            // unselected a link
            this.$wrap.find('a').on(this._eventName('click'), function(e) {
              e.preventDefault();
            });

            if (this.options.multiple === true) {
              this.$wrap.on(
                this._eventName('click touchstart'),
                'li',
                function() {
                  if (
                    (0, _jquery2.default)(this).hasClass(that.classes.selected)
                  ) {
                    that.set(
                      (0, _jquery2.default)(this).data('value'),
                      'unselected'
                    );
                    return false;
                  } else {
                    that.set(
                      (0, _jquery2.default)(this).data('value'),
                      'selected'
                    );
                    return false;
                  }
                }
              );
              _jquery2.default.each(this.options.value, function(i, v) {
                that.set(v, 'selected');
              });
            } else {
              this.$wrap.on(
                this._eventName('click touchstart'),
                'li',
                function() {
                  that.set(
                    (0, _jquery2.default)(this).data('value'),
                    'selected'
                  );
                }
              );
              this.set(this.options.value[0], 'selected');
            }
          }
        },
        {
          key: 'set',
          value: function set(value, status) {
            var $option = void 0;
            var $li = void 0;
            var pos = _jquery2.default.inArray(value, this.value);

            if (this.disabled) {
              return;
            }

            if (this.options.multiple === true) {
              _jquery2.default.each(this.$options, function(i, v) {
                if ((0, _jquery2.default)(v).attr('value') === value) {
                  $option = (0, _jquery2.default)(v);
                }
              });
              _jquery2.default.each(this.$wrap.find('li'), function(i, v) {
                if ((0, _jquery2.default)(v).data('value') === value) {
                  $li = (0, _jquery2.default)(v);
                }
              });

              if (status === 'selected') {
                this.value.push(value);
                $li.addClass(this.classes.selected);
                $option.prop('selected', true);
              } else {
                this.value.splice(pos, 1);
                $li.removeClass(this.classes.selected);
                $option.prop('selected', false);
              }

              this._trigger('change');
            } else {
              if (value === this.value[0]) {
                return;
              }

              if (status !== 'selected') {
                return;
              }

              var that = this;
              _jquery2.default.each(this.$options, function(i, v) {
                if ((0, _jquery2.default)(v).attr('value') === value) {
                  (0, _jquery2.default)(v).prop('selected', true);
                } else {
                  (0, _jquery2.default)(v).prop('selected', false);
                }
              });

              _jquery2.default.each(this.$wrap.find('li'), function(i, v) {
                if ((0, _jquery2.default)(v).data('value') === value) {
                  (0, _jquery2.default)(v).addClass(that.classes.selected);
                  that.value[0] = value;
                } else {
                  (0, _jquery2.default)(v).removeClass(that.classes.selected);
                }
              });
              this._trigger('change');
            }
          }
        },
        {
          key: 'val',
          value: function val(value, status) {
            var _this2 = this;

            if (value && status) {
              this.set(value, status);
            } else if (value) {
              if (typeof value === 'string') {
                // value is string
                this.set(value, 'selected');
              } else {
                // value is array
                var options = this.$wrap.find('li');
                _jquery2.default.each(options, function(key, li) {
                  var data = (0, _jquery2.default)(li).data('value');
                  if (_jquery2.default.inArray(data, value)) {
                    _this2.set(data, 'selected');
                  } else {
                    _this2.set(data, 'unselected');
                  }
                });
              }
            } else {
              return this.value;
            }
          }
        },
        {
          key: 'enable',
          value: function enable() {
            this.disabled = false;
            this.$wrap.removeClass(this.classes.disabled);
            return this;
          }
        },
        {
          key: 'disable',
          value: function disable() {
            this.disabled = true;
            this.$wrap.addClass(this.classes.disabled);
            return this;
          }
        },
        {
          key: 'destroy',
          value: function destroy() {
            this.$wrap.off(this._eventName());
            this.$wrap.find('a').off(this._eventName());
            this.$wrap.remove();
          }
        },
        {
          key: '_eventName',
          value: function _eventName(events) {
            if (typeof events !== 'string' || events === '') {
              return '.' + this.options.namespace;
            }
            events = events.split(' ');

            var length = events.length;
            for (var i = 0; i < length; i++) {
              events[i] = events[i] + '.' + this.options.namespace;
            }
            return events.join(' ');
          }
        },
        {
          key: '_trigger',
          value: function _trigger(eventType) {
            var _ref;

            for (
              var _len = arguments.length,
                params = Array(_len > 1 ? _len - 1 : 0),
                _key = 1;
              _key < _len;
              _key++
            ) {
              params[_key - 1] = arguments[_key];
            }

            var data = (_ref = [this]).concat.apply(_ref, params);

            // event
            this.$select.trigger(NAMESPACE$1 + '::' + eventType, data);

            // callback
            eventType = eventType.replace(/\b\w+\b/g, function(word) {
              return word.substring(0, 1).toUpperCase() + word.substring(1);
            });
            var onFunction = 'on' + eventType;

            if (typeof this.options[onFunction] === 'function') {
              var _options$onFunction;

              (_options$onFunction = this.options[onFunction]).apply.apply(
                _options$onFunction,
                [this].concat(params)
              );
            }
          }
        }
      ],
      [
        {
          key: 'setDefaults',
          value: function setDefaults(options) {
            _jquery2.default.extend(
              DEFAULTS,
              _jquery2.default.isPlainObject(options) && options
            );
          }
        }
      ]
    );

    return asChoice;
  })();

  var info = {
    version: '0.3.2'
  };

  var NAMESPACE = 'asChoice';
  var OtherAsChoice = _jquery2.default.fn.asChoice;

  var jQueryAsChoice = function jQueryAsChoice(options) {
    for (
      var _len2 = arguments.length,
        args = Array(_len2 > 1 ? _len2 - 1 : 0),
        _key2 = 1;
      _key2 < _len2;
      _key2++
    ) {
      args[_key2 - 1] = arguments[_key2];
    }

    if (typeof options === 'string') {
      var method = options;

      if (/^_/.test(method)) {
        return false;
      } else if (
        /^(get)$/.test(method) ||
        (method === 'val' && args.length === 0)
      ) {
        var instance = this.first().data(NAMESPACE);
        if (instance && typeof instance[method] === 'function') {
          return instance[method].apply(instance, args);
        }
      } else {
        return this.each(function() {
          var instance = _jquery2.default.data(this, NAMESPACE);
          if (instance && typeof instance[method] === 'function') {
            instance[method].apply(instance, args);
          }
        });
      }
    }

    return this.each(function() {
      if (!(0, _jquery2.default)(this).data(NAMESPACE)) {
        (0, _jquery2.default)(this).data(
          NAMESPACE,
          new asChoice(this, options)
        );
      }
    });
  };

  _jquery2.default.fn.asChoice = jQueryAsChoice;

  _jquery2.default.asChoice = _jquery2.default.extend(
    {
      setDefaults: asChoice.setDefaults,
      noConflict: function noConflict() {
        _jquery2.default.fn.asChoice = OtherAsChoice;
        return jQueryAsChoice;
      }
    },
    info
  );
});
