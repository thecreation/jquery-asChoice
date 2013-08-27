# jQuery choice

The powerful jQuery plugin that a iphone like jquery checkbox plugin. <a href="http://amazingsurge.github.io/jquery-choice/">Project page and demos</a><br />
Download: <a href="https://github.com/amazingSurge/jquery-choice/archive/master.zip">jquery-choice-master.zip</a>

***

## Features

* **Super easy implementation**
* **Lightweight size** — 1 kb gzipped
* **callbacks to handle changes** 
* **Customization freedom** — use any HTML and CSS to style inputs

## Dependencies
* <a href="http://jquery.com/" target="_blank">jQuery 1.83+</a>

## Usage

Import this libraries:
* jQuery
* jquery-choice.min.js

And CSS:
* jquery-choice.css - desirable if you have not yet connected one


Create base html element:
```html
<select class="select" multiple="multiple">
    <option value ="default" selected="selected">default</option>
    <option value ="on">on</option>
    <option value="off">off</option>
 </select>
```

Initialize tabs:
```javascript
$(".demo").tabs({panes: '.panes'});
```

Or initialize tabs with custom settings:
```javascript
$('.select').choice({
        skin: null,        
        status: {
         a: {
             text: 'on',
             icon: 'icon-1'
             },
         b: {
             text: 'off',
             icon: 'icon-2'
            },
         c: {
             text: 'default',
             icon: 'icon-3'
             }
         },
        multiple: false,
        value: ['default'],
        namespace: 'choice'
});
```



## Settings

```javascript
    //Optional property, choose choice's skin, more skins is coming soon
    skin: null,

    //Optional property, set the status of elements,for example 
    //<code>a:{text: 'on',icon: 'icon1'}</code> means the element's 
    //value is 'a',the text is 'on' and it will add a icon'
    status: a:{
                text: 'on',
                icon: 'icon-1'
              },
            b:{
                text: 'off',
                icon: 'icon-2'
              },
            c:{
                text: 'default',
                icon: 'icon-3'
              },
    //Optional property, set the value for element when choice initilize
    value: ['default'],

    //callback when choice's value change
    Onchange: function(){}
```

## Public methods

jquery choice has different methods , we can use it as below :
```javascript
// set element's value and status
$(".select").choice("set");

// set enable true
$(".select").choice("enable");

// set enable false
$(".select").choice("disable");
```

## Event / Callback

* <code>change</code>: trigger when element set afresh

how to use event:
```javascript
$(document).on('change', function(event,instance) {
    // instance means current choice instance 
    // some stuff
});
```
## Browser support
jquery-choice is verified to work in Internet Explorer 7+, Firefox 2+, Opera 9+, Google Chrome and Safari browsers. Should also work in many others.

Mobile browsers (like Opera mini, Chrome mobile, Safari mobile, Android browser and others) is coming soon.

## Changes

| Version | Notes                                                            |
|---------|------------------------------------------------------------------|
|     ... | ...                                                              |

## Author
[amazingSurge](http://amazingSurge.com)

## License
jQuery-choice plugin is released under the <a href="https://github.com/amazingSurge/jquery-choice/blob/master/LICENCE.GPL" target="_blank">GPL licence</a>.


