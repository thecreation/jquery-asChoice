/*
 * choice
 * https://github.com/amazingSurge/choice
 *
 * Copyright (c) 2013 joeylin
 * Licensed under the MIT license.
 */

(function($) {
    var Choice = $.choice = function(select,options) {

        this.select = select;
        this.$select = $(select);

        this.$options = this.$select.find('option');
        var meta = {};
        
        if (this.$options.length != 0) {
            meta.status = {};
            meta.value = [];
            meta.multiple = this.$select.prop('multiple');

            $.each(this.$options,function(i,v) {
                meta.status[$(v).attr('value')] = $(v).text();
                if ($(v).prop('selected')) {
                    meta.value.push($(v).attr('value'));
                }
            });
        }      

        this.options = $.extend({},Choice.defaults,options,meta);
        this.namespace = this.options.namespace;
        this.status = this.options.status;
        
        this.value = [];

        this.init();
    };

    Choice.prototype = {
        constuctor: Choice,
        init: function() {
            var self = this,
                tpl = '<li><a href="#"></a></li>';

            this.$select.css({display:'none'});

            this.$wrap = $('<ul></ul>').addClass(this.namespace + '-wrap');
            this.$wrap.addClass(this.namespace).addClass(this.namespace + '-' + this.options.skin);

            $.each(this.status,function(key,value) {
                var $tpl = $(tpl).data('value',value).find('a').text(value).end();

                $.each(self.value,function(i,v) {
                    if (v === value) {
                        $tpl.addClass(self.namespace + '-selected');
                    }
                });

                self.$wrap.append($tpl);
            });

            this.$select.after(this.$wrap);

            if (this.options.multiple === true) {
                this.$wrap.delegate('li','click',function(){
                    if ($(this).hasClass(self.namespace + '-selected')) {                       
                        self.set.call(self,$(this).data('value'),'cancel');
                        return false;
                    } else {
                        self.set.call(self,$(this).data('value'),'selected');
                        return false;
                    }
                    
                });
                $.each(this.options.value,function(i,v) {
                    self.set.call(self,v,'selected');
                });
            } else {
                this.$wrap.delegate('li','click',function(){
                    self.set($(this).data('value'),'selected');  
                });
                this.set(this.options.value[0],'selected');
            }

        },
        set: function(value,status) {
            var $option,$li,
                pos = $.inArray(value,this.value);

            if (this.options.multiple === true) {
                $.each(this.$options,function(i,v) {
                    if ($(v).attr('value') === value ) {
                        $option = $(v);
                    }
                });
                $.each(this.$wrap.find('li'),function(i,v) {
                    if ($(v).data('value') === value) {
                        $li = $(v);
                    }
                });

                if (status === 'selected') {
                    this.value.push(value);
                    $li.addClass(this.namespace + '-selected');
                    $option.prop('selected',true);                    
                    
                } else {
                    this.value.splice(pos,1);
                    $li.removeClass(this.namespace + '-selected');
                    $option.prop('selected',false);
                }

                this.$select.trigger('change',value);
                if (typeof this.options.onChange === 'function') {
                    this.options.onChange(this);
                }

            } else {
                if (value === this.value[0]) {
                    return false;
                }

                if (status === 'cancel') {
                    return false;
                }

                var self = this;
                $.each(this.$options,function(i,v) {
                    if ($(v).attr('value') === value) {
                        $(v).prop('selected',true);  

                    } else {
                        $(v).prop('selected',false);
                    }
                });

                $.each(this.$wrap.find('li'),function(i,v) {
                    if ($(v).data('value') === value) {
                        $(v).addClass(self.namespace + '-selected');
                        self.value[0] = value;

                    } else {
                        $(v).removeClass(self.namespace + '-selected');
                    }
                });

                
                this.$select.trigger('change',value);
                if (typeof this.options.onChange === 'function') {
                    this.options.onChange(this);
                }

            }
        },
        enable: function() {},
        disable: function() {}
    };

    Choice.defaults = {
        skin: 'simple',

        status: {
            a: 'on',
            b: 'off',
            c: 'default'
        },
        multiple: false,
        value: ['default'],

        namespace: 'choice',
        onChange: function(instance) {
            console.log(instance.value);
        }
    };

    $.fn.choice = function(options) {
        return this.each(function() {
            if (!$.data(this, 'choice')) {
                $.data(this, 'choice', new Choice(this, options));
            }
        });
    }
}(jQuery));
