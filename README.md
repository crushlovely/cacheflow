cacheFlow
=========

A JavaScript library to work with the `window.applicationCache` event API

*****

## Introduction

When bundling a website or web application for offline use as a webclip on iOS devices, the browser requires a cache manifest file to tell the browser which files it needs to download locally. The completion of this download process is necessary for the functionality of the webclip in offline mode.

The browser surfaces a window object called `window.applicationCache` that has a number of callbacks for a developer to use during this operation.  More information about the applicationCache API can be found [here](https://developer.mozilla.org/en-US/docs/HTML/Using_the_application_cache).

This library is a way for a developer to easily hook into these callbacks, offering the ability to specify custom language and callbacks easily.

## Usage

``` html
<script type="text/template" src="cacheFlow.js"></script>
```

``` javascript
new cacheFlow({
  events: ['checking', 'downloading'],
  lang: {
    checking: 'We are checking for any new resources'
  },
  callbacks: {
    checking: function (lang, e) {},
    downloading: function (lang, e) {}
  }
});
```

This is all that is necessary to create a new instance of the `cacheFlow` utility, but it will not have any functionality at this point.  An `options` object must be passed in as an argument utilizing the API defined below.

## API

### events

property: `events`
type: array
description: an array of string values. Values must be one of the following values:

`checking`
`noupdate`
`downloading`
`progress`
`cached`
`updateready`
`obsolete`
`error`

example:

``` javascript
events: ['checking', 'downloading', 'cached']
```

### callbacks

property: `callbacks`
type: function or object of functions
description: a single function to be used as the callback for each event or an object of callbacks.

#### arguments
index: 0
type: `event object`
description: the event object returned natively by `window.applicationCache`

index: 1
type: `string`
description: an English-language message describing the event.  Used primarily for user notifications

index: 2
type: `eventName`
description: **only defined if callback is global**. The name of the event that triggered the callback.

example (global function):

``` javascript
callbacks: function (e, lang, eventName) {}
```

example (event-specific functions):

``` javascript
callbacks: {
  checking: function (e, lang) {},
  downloading: function (e, lang) {},
  cached: function (e, lang) {}
}
```

### lang

property: `lang`
type: object
description: an object of overrides to default language values for each callback.

default language values:

``` javascript
{
  checking: 'checking for new resources',
  noupdate: 'no new resources to download',
  downloading: 'downloading new resources',
  progress: 'downloading resources',
  cached: 'resources have been downloaded',
  updateready: 'resources have been downloaded and are ready for use',
  obsolete: 'application cache is being deleted',
  error: 'an error occurred trying to grab resources'
}
```

example:
``` javascript
lang: {
  checking: 'We are checking for any new resources'
}
```
