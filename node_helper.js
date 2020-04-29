/**
 * Magic Mirror
 * Module: IP Display
 *
 * By Valeri Kozarev
 * MIT Licensed.
 */
var NodeHelper = require("node_helper");

/**
 * helper function which fetches the IP Address
 */
getIP = function(){
	activeIp = "null";

	var os = require("OS");
	var ifaces = os.networkInterfaces();

	Object.keys(ifaces).forEach(function (ifname) {
		var alias = 0;

		ifaces[ifname].forEach(function (iface) {
			if ("IPv4" !== iface.family || iface.internal !== false) {
					// skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
					return;

			} else {
					// report the IPv4 address of this machine
					activeIp = iface.address;
			}
	  });
	});

	return activeIp;
};

module.exports = NodeHelper.create({
	start: function() {
		this.ip = undefined;
	},
	socketNotificationReceived: function(notification, payload) {
		switch(notification){
		case "IP REQUEST":
			// when requested, find the IP and send it back
			this.ip = getIP();
			this.sendSocketNotification("IP RESPONSE", this.ip);
			break;
		}
	},
});
