import $ from 'jquery';
import asChoice from './asChoice';
import info from './info';

const NAMESPACE = 'asChoice';
const OtherAsChoice = $.fn.asChoice;

const jQueryAsChoice = function(options, ...args) {
  if (typeof options === 'string') {
    const method = options;

    if (/^_/.test(method)) {
      return false;
    } else if ((/^(get)/.test(method))) {
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
