/*
 * switch
 * https://github.com/amazingSurge/switch
 *
 * Copyright (c) 2013 joeylin
 * Licensed under the MIT license.
 */

(function($) {
    var Switch = $.switch = function(element, options) {

        this.element = element;
        this.$element = $(element);

        this.options = $.extend({}, Switch.defaults, options);
        this.namespace = this.options.namespace;

        this.$element.addClass(this.namespace + '-' + this.options.skin);
        this.value = this.options.value;

        this.init();
    };

    Switch.prototype = {
        constuctor: Switch,
        init: function() {
            var self = this,
                opts = this.options;

            this.$inner = $('<div></div>').addClass(this.namespace + '-inner');
            this.$on = $('<span></div>').addClass(this.namespace + '-on').text(opts.ontext);
            this.$off = $('<span></span>').addClass(this.namespace + '-off').text(opts.offtext);
            this.$handle = $('<div></div>').addClass(this.namespace + '-handle');


            this.$inner.append(this.$on, this.$handle, this.$off);
            this.$element.append(this.$inner);

            // for css3 transition
            var transition = 'margin-left ' + opts.animtime / 1000 + 's ease-in-out';
            this.transitions = {
                '-webkit-transition': transition,
                '-moz-transition': transition,
                'transition': transition
            };
            this.noTransitions = {
                '-webkit-transition': '',
                '-moz-transition': '',
                'transition': ''
            };

            // get components width
            var w = this.$on.outerWidth(true);
            var h = this.$handle.outerWidth(true);

            this.distance = w - h / 2;

            this.$inner.css(this.transitions);
            this.$element.on('click', $.proxy(this.click, this));
            this.$handle.on('mousedown', $.proxy(this.mousedown, this));

            // for support mobile touch
            // ...
            // ...
            // ...

            // set initial value
            this.set(this.value);
        },
        set: function(value) {
            var pos;

            if (this.value != value) {
                this.$element.trigger('change');
            }

            this.value = value;

            if (this.value === 'on') {
                pos = 0;
            } else {
                pos = this.distance;
            }

            this.move(pos);
        },
        move: function(pos) {
            var pos = Math.max(0, Math.min(pos, this.distance));

            this.$inner.css({
                marginLeft: -pos
            });
        },
        click: function(e) {
            
            if ($(e.target).hasClass(this.namespace + '-handle') != true) {
                if (this.value === 'on') {
                    this.set('off');
                } else {
                    this.set('on');
                }
            }
        },
        mousedown: function(e) {
            var dragDistance,
                self = this,
                startX = e.pageX;

               
            this.mousemove = function(e) {
                dragDistance = e.pageX - startX > 0 ? (this.distance + startX - e.pageX) : (startX - e.pageX);

                this.$inner.css(this.noTransitions); 
                this.$handle.off('mouseup');
                this.move(dragDistance);

                return false;
            };

            this.mouseup = function(e) {

                if (dragDistance > this.distance / 2) {

                    this.set('off')
                }
                if (dragDistance <= this.distance / 2) {

                    this.set('on')
                }

                $(document).off({
                    mousemove: this.mousemove,
                    mouseup: this.mouseup
                });

                this.$inner.css(this.transitions);
                this.$handle.off('mouseup');

                return false;
            }

            $(document).on({
                mousemove: $.proxy(this.mousemove, this),
                mouseup: $.proxy(this.mouseup, this)
            });

            this.$handle.on('mouseup', function() {
                if (self.value === 'on') {
                    self.set('off');
                } else {
                    self.set('on');
                }

            });

            return false;
        }

    };
    Switch.defaults = {
        skin: 'simple',

        dragable: true,
        clickable: true,

        ontext: 'ON',
        offtext: 'OFF',

        value: 'on',

        animtime: 300,

        namespace: 'switch'
    };
    $.fn.switch = function(options) {
        return this.each(function() {
            if (!$.data(this, 'switch')) {
                $.data(this, 'switch', new Switch(this, options));
            }
        });
    };
}(jQuery));

(function($) {
    var Selects = $.select = function(select,options) {

        this.element = select;
        this.$element = $(select);

        this.options = $.extend({},Selects.defaults,options);
        this.namespace = this.options.namespace;
        this.status = this.options.status.split(',');

        this.$element.addClass(this.namespace).addClass(this.namespace + '-' + this.options.skin);
        this.value = this.options.value;

        this.init();
    };

    Selects.prototype = {
        constuctor: Selects,
        init: function() {
            var self = this,
                tpl = '<li><a href="#"></a></li>';

            this.$element.find('select').css({display:'none'});

            this.$wrap = $('<ul></ul>').addClass(this.namespace + '-wrap');
            $.each(this.status,function(i,v) {
                var $tpl = $(tpl).data('value',v).addClass(self.namespace + '-status-' + v).find('a').text(v).end();

                self.$wrap.append($tpl);
            });

            this.$element.append(this.$wrap);

            this.$wrap.delegate('li','click',function(){
                self.set($(this).data('value'));
            });

            this.set(this.value);
        },
        set: function(value) {
            if(this.value != value) {
                this.$wrap.trigger('change',this);
            }
            this.value = value;
            this.$wrap.find('li').removeClass(this.namespace + '-active');
            this.$wrap.find('.' + this.namespace + '-status-' + value).addClass(this.namespace + '-active');
        }
    };

    Selects.defaults = {
        skin: 'simple'

        status: 'default,on,off',
        value: 'default',

        namespace: 'select'

    }
    $.fn.select = function(options) {
        return this.each(function() {
            if (!$.data(this, 'select')) {
                $.data(this, 'select', new Selects(this, options));
            }
        });
    }
}(jQuery));
