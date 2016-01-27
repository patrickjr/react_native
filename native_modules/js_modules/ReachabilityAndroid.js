'use strict';
/**
 * This exposes the native ReachabilityAndroid module as a JS module. This has a
 * function 'test' which takes the following parameters:
 * url (string)
 */
var { NativeModules } = require('react-native');
module.exports = NativeModules.ReachabilityAndroid;