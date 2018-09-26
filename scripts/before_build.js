#!/usr/bin/env node
'use strict';

var fs = require('fs');

module.exports = function (context) {
    var platforms = context.opts.platforms;
    if (platforms.indexOf('android') !== -1) {
        console.log("******************** Disabling Firebase push notifications handler for Android ********************");
        try {
            var manifestPath = "platforms/android/app/src/main/AndroidManifest.xml";
            
            var contents = fs.readFileSync(manifestPath).toString();
            contents = contents.replace('<receiver android:name="org.apache.cordova.firebase.OnNotificationOpenReceiver"></receiver>', "");
            contents = contents.replace('<receiver android:name="org.apache.cordova.firebase.OnNotificationOpenReceiver" />', "");
            contents = contents.replace(/<service\s*android:name="org\.apache\.cordova\.firebase\.FirebasePluginMessagingService"(.|\n)+?<\/service>/igm, "");
            
            fs.writeFileSync(manifestPath, contents);
            console.log("******************** Firebase Notifications Done! ********************");
        } catch(err) {
            console.log("******************** Firebase Notifications Failed! ********************");
            console.log(err);
        }
    }
}