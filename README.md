# jQuery asChoice

The powerful jQuery plugin that a iphone like jquery checkbox plugin. <a href="http://amazingsurge.github.io/jquery-asChoice/">Project page and demos</a><br />
Download: <a href="https://github.com/amazingSurge/jquery-asChoice/archive/master.zip">jquery-asChoice-master.zip</a>

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
* jquery-asChoice.min.js

And CSS:
* jquery-asChoice.css - desirable if you have not yet connected one


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
$('.select').asChoice({
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
        namespace: 'asChoice'
});
```



## Settings

```javascript
    //Optional property, choose asChoice's skin, more skins is coming soon
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
    //Optional property, set the value for element when asChoice initilize
    value: ['default'],

    //callback when asChoice's value change
    Onchange: function(){}
```

## Public methods

jquery asChoice has different methods , we can use it as below :
```javascript
// set element's value and status
$(".select").asChoice("set");

// set enable true
$(".select").asChoice("enable");

// set enable false
$(".select").asChoice("disable");
```

## Event / Callback

* <code>change</code>: trigger when element set afresh

how to use event:
```javascript
$(document).on('change', function(event,instance) {
    // instance means current asChoice instance 
    // some stuff
});
```
## Browser support
jquery-asChoice is verified to work in Internet Explorer 7+, Firefox 2+, Opera 9+, Google Chrome and Safari browsers. Should also work in many others.

Mobile browsers (like Opera mini, Chrome mobile, Safari mobile, Android browser and others) is coming soon.

## Changes

| Version | Notes                                                            |
|---------|------------------------------------------------------------------|
|     ... | ...                                                              |

## Author
[amazingSurge](http://amazingSurge.com)

## License
jQuery-asChoice plugin is released under the <a href="https://github.com/amazingSurge/jquery-asChoice/blob/master/LICENCE.GPL" target="_blank">GPL licence</a>.


