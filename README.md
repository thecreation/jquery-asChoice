# jQuery choice

The powerful jQuery plugin that creates choice. <a href="http://amazingsurge.github.io/jquery-choice/">Project page and demos</a><br />
Download: <a href="https://github.com/amazingSurge/jquery-choice/archive/master.zip">jquery-choice-master.zip</a>

***

## Features

* **Keyboard navigation support** — use `Arrow left/right` to navigate
* **Lightweight size** — 1 kb gzipped

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

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>skin</td>
            <td>null</td>
            <td>Optional property, set transition effect, it works after you load   specified skin file</td>
        </tr>
        <tr>
            <td>status</td>
            <td>
                a:{
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
                  }
            </td>
            <td>Optional property, set the status of elements,for example <code>a:{text: 'on',icon: 'icon1'}</code> means the element,s value is a,the text is on and it will add a icon'</td>
        </tr>
        <tr>
            <td>value</td>
            <td>['default']</td>
            <td>Optional property, set the value for element when choice initilize</td>
        </tr>
        <tr>
            <td>Onchange</td>
            <td>function(){}</td>
            <td>callback</td>
        </tr>
    </tbody>
</table>

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

## Browser support
jquery-choice is verified to work in Internet Explorer 7+, Firefox 2+, Opera 9+, Google Chrome and Safari browsers. Should also work in many others.

Mobile browsers (like Opera mini, Chrome mobile, Safari mobile, Android browser and others) is coming soon.

## Changes

| Version | Notes                                                            |
|---------|------------------------------------------------------------------|
|   0.1.x | ([compare][compare-1.1]) add keyboard function                   |
|     ... | ...                                                              |

[compare-1.1]: https://github.com/amazingSurge/jquery-choice/compare/v1.1.0...v1.2.0

## Author
[amazingSurge](http://amazingSurge.com)

## License
jQuery-choice plugin is released under the <a href="https://github.com/amazingSurge/jquery-choice/blob/master/LICENCE.GPL" target="_blank">GPL licence</a>.


