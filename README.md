# [jQuery asChoice](https://github.com/amazingSurge/jquery-asChoice) ![bower][bower-image] [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![prs-welcome]](#contributing)

> A jquery plugin that convent select into choices.

## Table of contents
- [Main files](#main-files)
- [Quick start](#quick-start)
- [Requirements](#requirements)
- [Usage](#usage)
- [Examples](#examples)
- [Options](#options)
- [Methods](#methods)
- [Events](#events)
- [No conflict](#no-conflict)
- [Browser support](#browser-support)
- [Contributing](#contributing)
- [Development](#development)
- [Changelog](#changelog)
- [Copyright and license](#copyright-and-license)

## Main files
```
dist/
├── jquery-asChoice.js
├── jquery-asChoice.es.js
├── jquery-asChoice.min.js
└── css/
    ├── asChoice.css
    └── asChoice.min.css
```

## Quick start
Several quick start options are available:
#### Download the latest build

 * [Development](https://raw.githubusercontent.com/amazingSurge/jquery-asChoice/master/dist/jquery-asChoice.js) - unminified
 * [Production](https://raw.githubusercontent.com/amazingSurge/jquery-asChoice/master/dist/jquery-asChoice.min.js) - minified

#### Install From Bower
```sh
bower install jquery-asChoice --save
```

#### Install From Npm
```sh
npm install jquery-asChoice --save
```

#### Install From Yarn
```sh
yarn add jquery-asChoice
```

#### Build From Source
If you want build from source:

```sh
git clone git@github.com:amazingSurge/jquery-asChoice.git
cd jquery-asChoice
npm install
npm install -g gulp-cli babel-cli
gulp build
```

Done!

## Requirements
`jquery-asChoice` requires the latest version of [`jQuery`](https://jquery.com/download/).

## Usage
#### Including files:

```html
<link rel="stylesheet" href="/path/to/asChoice.css">
<script src="/path/to/jquery.js"></script>
<script src="/path/to/jquery-asChoice.js"></script>
```

#### Required HTML structure

```html
<select class="select" multiple="multiple">
    <option value ="default" selected="selected">default</option>
    <option value ="on">on</option>
    <option value="off">off</option>
 </select>
```

#### Initialization
All you need to do is call the plugin on the element:

```javascript
jQuery(function($) {
  $('.example').asChoice(); 
});
```

## Examples
There are some example usages that you can look at to get started. They can be found in the
[examples folder](https://github.com/amazingSurge/jquery-asChoice/tree/master/examples).

## Options
`jquery-asChoice` can accept an options object to alter the way it behaves. You can see the default options by call `$.asChoice.setDefaults()`. The structure of an options object is as follows:

```
{
  namespace: 'asChoice',
  skin: null,

  multiple: false,
  value: ['default']
}
```

## Methods
Methods are called on asChoice instances through the asChoice method itself.
You can also save the instances to variable for further use.

```javascript
// call directly
$().asChoice('destroy');

// or
var api = $().data('asChoice');
api.destroy();
```

#### val(value)
Set the select value if value is defined or get the value.
```javascript
// set the val
$().asChoice('val', '5');

// get the val
var value = $().asChoice('val');
```

#### set(value)
Set the select value
```javascript
$().asChoice('set', '5');
```

#### get()
Get the select value.
```javascript
var value = $().asChoice('get');
```


#### enable()
Enable the choice functions.
```javascript
$().asChoice('enable');
```

#### disable()
Disable the choice functions.
```javascript
$().asChoice('disable');
```

#### destroy()
Destroy the choice instance.
```javascript
$().asChoice('destroy');
```

## Events
`jquery-asChoice` provides custom events for the plugin’s unique actions. 

```javascript
$('.the-element').on('asChoice::ready', function (e) {
  // on instance ready
});

```

Event   | Description
------- | -----------
init    | Fires when the instance is setup for the first time.
ready   | Fires when the instance is ready for API use.
enable  | Fires when the `enable` instance method has been called.
disable | Fires when the `disable` instance method has been called.
destroy | Fires when an instance is destroyed. 

## No conflict
If you have to use other plugin with the same namespace, just call the `$.asChoice.noConflict` method to revert to it.

```html
<script src="other-plugin.js"></script>
<script src="jquery-asChoice.js"></script>
<script>
  $.asChoice.noConflict();
  // Code that uses other plugin's "$().asChoice" can follow here.
</script>
```

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_32x32.png" alt="IE"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | 9-11 ✓ | Latest ✓ |

As a jQuery plugin, you also need to see the [jQuery Browser Support](http://jquery.com/browser-support/).

## Contributing
Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md). Make sure you're using the latest version of `jquery-asChoice` before submitting an issue. There are several ways to help out:

* [Bug reports](CONTRIBUTING.md#bug-reports)
* [Feature requests](CONTRIBUTING.md#feature-requests)
* [Pull requests](CONTRIBUTING.md#pull-requests)
* Write test cases for open bug issues
* Contribute to the documentation

## Development
`jquery-asChoice` is built modularly and uses Gulp as a build system to build its distributable files. To install the necessary dependencies for the build system, please run:

```sh
npm install -g gulp
npm install -g babel-cli
npm install
```

Then you can generate new distributable files from the sources, using:
```
gulp build
```

More gulp tasks can be found [here](CONTRIBUTING.md#available-tasks).

## Changelog
To see the list of recent changes, see [Releases section](https://github.com/amazingSurge/jquery-asChoice/releases).

## Copyright and license
Copyright (C) 2016 amazingSurge.

Licensed under [the LGPL license](LICENSE).

[⬆ back to top](#table-of-contents)

[bower-image]: https://img.shields.io/bower/v/jquery-asChoice.svg?style=flat
[bower-link]: https://david-dm.org/amazingSurge/jquery-asChoice/dev-status.svg
[npm-image]: https://badge.fury.io/js/jquery-asChoice.svg?style=flat
[npm-url]: https://npmjs.org/package/jquery-asChoice
[license]: https://img.shields.io/npm/l/jquery-asChoice.svg?style=flat
[prs-welcome]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[daviddm-image]: https://david-dm.org/amazingSurge/jquery-asChoice.svg?style=flat
[daviddm-url]: https://david-dm.org/amazingSurge/jquery-asChoice