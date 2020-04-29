/**
 * Magic Mirror
 * Module: IPDisplay
 *
 * By Valeri Kozarev
 * MIT Licensed.
 */
Module.register("ip_display",{
	defaults: {
		// TODO: default configuration goes here
	},
	start: function() {
		this.ip = undefined;
	},
	getDom: function() {
		var element = document.createElement("div");
		element.className = "IPModule_Content";
		element.id = "IP_address"; // giving the element an ID makes it easier to find later
		element.innerHTML = "Fetching IP Address";
		return element;
	},
	notificationReceived: function(notification, payload, sender) {
		switch(notification) {
		case "DOM_OBJECTS_CREATED":
			// when all of the modules are loaded, fetch the IP address for this device
			this.sendSocketNotification("IP REQUEST", null);
			break;
		}
	},
	socketNotificationReceived: function(notification, payload) {
		switch(notification){
		case "IP RESPONSE":
			// update the HTML to show the IP address sent by the node_helper
			var ipElement = document.getElementById("IP_address");
			ipElement.innerHTML = "Hello, " + payload + "!";
			break;
		}
	}
});
