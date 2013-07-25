/*
cacheFlow
A JavaScript library to work with the window.applicationCache event API
by Michael Phillips (@createbang | github.com/createbang)
============================== */

function cacheFlow(options) {

  'use strict';

  if (typeof options === 'undefined') { return false; }

  //
  // establish variables

  var api = window.applicationCache,
      lang,
      eventNames,
      filteredEvents = [],


      //
      // all valid events for use with the API

      validEvents = ['checking', 'noupdate', 'downloading', 'progress', 'cached', 'updateready', 'obsolete', 'error'],

      //
      // default language for each event

      defaultLang = {
        checking: 'checking for new resources',
        noupdate: 'no new resources to download',
        downloading: 'downloading new resources',
        progress: 'downloading resources',
        cached: 'resources have been downloaded',
        updateready: 'resources have been downloaded and are ready for use',
        obsolete: 'application cache is being deleted',
        error: 'an error occurred trying to grab resources'
      },

      //
      // define the callbacks variable (could be either a function or an object of functions)

      callbacks = options.callbacks;


  //
  // Filter down all event object keys that intersect with valid API events

  if (options.hasOwnProperty('events') && typeof options.events === 'object') {

    //
    // loop over each event in the options object, checking for validitiy

    for (var i = options.events.length - 1; i >= 0; i--) {

      //
      // is the value in the validEventnames array?

      if (validEvents.indexOf(options.events[i]) !== -1) {

        //
        // If so, push it to the filteredEvents array

        filteredEvents.push(options.events[i]);

      }
    }

    eventNames = filteredEvents;
  }


  //
  // create the lang object by combining the default language with the options overrides

  if (options.hasOwnProperty('lang') && typeof options.lang === 'object') {

    lang = defaultLang;

    //
    // override language object with options.lang values

    for (var event in options.lang) {
      if (options.hasOwnProperty(event)) {
        lang[event] = options.lang[event];
      }
    }

  } else {

    lang = defaultLang;

  }


  //
  // Loop over each of the events being hooked into

  for (var i = eventNames.length - 1; i >= 0; i--) {

    var eventName = eventNames[i],
        _this = this,

        //
        // concatenate 'on' and the eventName, giving us 'oncached', etc.

        callbackName = ['on', eventName].join(''),

        //
        // callback function, either the globally defined or the
        // callback specified in the options object

        callbackIsGlobal = (typeof callbacks === 'function'),
        callback = (callbackIsGlobal) ? callbacks : callbacks[eventName],

        //
        // predefine arguments array

        args = (callbackIsGlobal) ? [lang[eventName], eventName] : [lang[eventName]];


    //
    // execute the callback, passing in the language copy as the argument

    api[callbackName] = function (e) {

      //
      // inject the event object as the first argument

      args.splice(0, 0, e);

      //
      // execute the callback with arguments

      callback.apply(_this, args);
    };
  }

}