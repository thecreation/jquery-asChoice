/**
* jquery asChoice v0.3.1
* https://github.com/amazingSurge/jquery-asChoice
*
* Copyright (c) amazingSurge
* Released under the LGPL-3.0 license
*/
import $ from 'jquery';

var DEFAULTS = {
  namespace: 'asChoice',
  skin: null,

  multiple: false,
  value: ['default']
};

const NAMESPACE$1 = 'asChoice';

/**
 * Plugin constructor
 **/
class asChoice {
  constructor(select, options = {}) {
    this.select = select;
    this.$select = $(select);

    this.$options = this.$select.find('option');
    const meta = {};

    if (this.$options.length !== 0) {
      meta.status = {};
      meta.value = [];
      meta.multiple = this.$select.prop('multiple');

      $.each(this.$options, (i, v) => {
        meta.status[$(v).attr('value')] = {};
        meta.status[$(v).attr('value')].text = $(v).text();
        if ($(v).prop('selected')) {
          meta.value.push($(v).attr('value'));
        }
      });
    }

    this.options = $.extend({}, DEFAULTS, options, meta);
    this.namespace = this.options.namespace;
    this.status = this.options.status;

    this.classes = {
      selected: `${this.namespace}-selected`,
      disabled: `${this.namespace}-disabled`,
      skin: `${this.namespace}_${this.options.skin}`
    };

    this.value = [];
    this.disabled = false;
    this._trigger('init');
    this.init();
  }

  init() {
    const tpl = `<li><span class="${this.namespace}-text"></span></li>`;

    this.$select.css({
      display: 'none'
    });

    this.$wrap = $('<ul></ul>');
    this.$wrap.addClass(this.namespace);
    if (this.options.skin) {
      this.$wrap.addClass(this.classes.skin);
    }

    $.each(this.status, (key, value) => {
      const $tpl = $(tpl).data('value', key);

      if (typeof value === 'object') {
        if (value.icon) {
          $('<i></i>').addClass(value.icon).appendTo($tpl);
        }
        if (value.text) {
          $tpl.find('span').text(value.text);
        }

      } else {
        $tpl.find('span').text(value.text);
      }

      $.each(this.value, (i, v) => {
        if (v === key) {
          $tpl.addClass(this.classes.selected);
        }
      });

      this.$wrap.append($tpl);
    });

    this.$select.after(this.$wrap);

    this._bindEvents();

    this._trigger('ready');
  }

  _bindEvents() {
    const that = this;
     // unselected a link
    this.$wrap.find('a').on(this._eventName('click'), e => {
      e.preventDefault();
    });

    if (this.options.multiple === true) {
      this.$wrap.on( this._eventName('click touchstart'), 'li', function() {
        if ($(this).hasClass(that.classes.selected)) {
          that.set($(this).data('value'), 'unselected');
          return false;
        } else {
          that.set($(this).data('value'), 'selected');
          return false;
        }
      });
      $.each(this.options.value, (i, v) => {
        that.set(v, 'selected');
      });
    } else {
      this.$wrap.on(this._eventName('click touchstart'), 'li', function() {
        that.set($(this).data('value'), 'selected');
      });
      this.set(this.options.value[0], 'selected');
    }
  }

  set(value, status) {
    let $option;
    let $li;
    const pos = $.inArray(value, this.value);

    if (this.disabled) {
      return;
    }

    if (this.options.multiple === true) {
      $.each(this.$options, (i, v) => {
        if ($(v).attr('value') === value) {
          $option = $(v);
        }
      });
      $.each(this.$wrap.find('li'), (i, v) => {
        if ($(v).data('value') === value) {
          $li = $(v);
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

      const that = this;
      $.each(this.$options, (i, v) => {
        if ($(v).attr('value') === value) {
          $(v).prop('selected', true);
        } else {
          $(v).prop('selected', false);
        }
      });

      $.each(this.$wrap.find('li'), (i, v) => {
        if ($(v).data('value') === value) {
          $(v).addClass(that.classes.selected);
          that.value[0] = value;

        } else {
          $(v).removeClass(that.classes.selected);
        }
      });
      this._trigger('change');
    }
  }

  val(value, status) {
    if (value && status) {
      this.set(value, status);
    } else if (value) {
      if (typeof value === 'string') {
        // value is string
        this.set(value, 'selected');
      } else {
        // value is array
        const options = this.$wrap.find('li');
        $.each(options, (key, li) => {
          const data = $(li).data('value');
          if ($.inArray(data, value)) {
            this.set(data, 'selected');
          } else {
            this.set(data, 'unselected');
          }
        });
      }
    } else {
      return this.value;
    }
  }

  enable() {
    this.disabled = false;
    this.$wrap.removeClass(this.classes.disabled);
    return this;
  }

  disable() {
    this.disabled = true;
    this.$wrap.addClass(this.classes.disabled);
    return this;
  }

  destroy() {
    this.$wrap.off(this._eventName());
    this.$wrap.find('a').off(this._eventName());
    this.$wrap.remove();
  }

  _eventName(events) {
    if (typeof events !== 'string' || events === '') {
      return `.${this.options.namespace}`;
    }
    events = events.split(' ');

    let length = events.length;
    for (let i = 0; i < length; i++) {
      events[i] = `${events[i]}.${this.options.namespace}`;
    }
    return events.join(' ');
  }


  _trigger(eventType, ...params) {
    let data = [this].concat(...params);

    // event
    this.$select.trigger(`${NAMESPACE$1}::${eventType}`, data);

    // callback
    eventType = eventType.replace(/\b\w+\b/g, (word) => {
      return word.substring(0, 1).toUpperCase() + word.substring(1);
    });
    let onFunction = `on${eventType}`;

    if (typeof this.options[onFunction] === 'function') {
      this.options[onFunction].apply(this, ...params);
    }
  }

  static setDefaults(options) {
    $.extend(DEFAULTS, $.isPlainObject(options) && options);
  }
}

var info = {
  version:'0.3.1'
};

const NAMESPACE = 'asChoice';
const OtherAsChoice = $.fn.asChoice;

const jQueryAsChoice = function(options, ...args) {
  if (typeof options === 'string') {
    const method = options;

    if (/^_/.test(method)) {
      return false;
    } else if ((/^(get)$/.test(method)) || (method === 'val' && args.length === 0)) {
      const instance = this.first().data(NAMESPACE);
      if (instance && typeof instance[method] === 'function') {
        return instance[method](...args);
      }
    } else {
      return this.each(function() {
        const instance = $.data(this, NAMESPACE);
        if (instance && typeof instance[method] === 'function') {
          instance[method](...args);
        }
      });
    }
  }

  return this.each(function() {
    if (!$(this).data(NAMESPACE)) {
      $(this).data(NAMESPACE, new asChoice(this, options));
    }
  });
};

$.fn.asChoice = jQueryAsChoice;

$.asChoice = $.extend({
  setDefaults: asChoice.setDefaults,
  noConflict: function() {
    $.fn.asChoice = OtherAsChoice;
    return jQueryAsChoice;
  }
}, info);
