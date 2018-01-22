'use strict';
console.log("teeest")
const functions = require('firebase-functions');

const admin = require('firebase-admin');
const basicAuthRequest = require('request');
admin.initializeApp(functions.config().firebase);
const cors = require('cors')({
    origin: true
  });
  

exports.sendNotification = functions.database.ref('Users/{username}').onUpdate(event => {
console.log(event);
return event;
    });


