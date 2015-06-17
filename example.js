"use strict";

var quipu = require("./index.js");
var PIN = require("./myPINcode.js");

// initilize the device

var devices = {
	modem: "/dev/serial/by-id/usb-HUAWEI_HUAWEI_HiLink-if00-port0",
	sms: "/dev/serial/by-id/usb-HUAWEI_HUAWEI_HiLink-if02-port0"
};

quipu.handle("initialize", devices, PIN);

// sending a SMS
setTimeout(function(){
// this seems necessary, because the PIN unlocking takes some time.
// Without timeout, this message wouldn't be sent
	quipu.handle("sendSMS", "Hello from quipu.", "33671358943");
}, 3000);

// receiving SMS
quipu.on("smsReceived", function(sms){
	console.log(sms);		
});

// spawning a 3G connexion and closing it after 30 seconds
quipu.handle("open3G");

setTimeout(function(){
	quipu.handle("close3G");
}, 30000)


// open a reverse ssh tunnel towards "kerrigan" (must be set in your ~/.ssh/config)
quipu.handle("openTunnel", 2222, 9632, "kerrigan");

setTimeout(function(){
	quipu.handle("closeTunnel");
}, 30000)



module.exports = quipu;
