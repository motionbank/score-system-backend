var INIT = new function () {
	/**
	 *  @param type {String} 'setup', 'setupOnce', 'teardown'. see example below for explanation.
	 *  define your constructs according to the example.
	 *
	 *  @example
	 *  pages.js
	 *
	 *  (1)
	 *  INIT.addInitializers({
	 *		pages: {
	 *			show: function () {
	 *				// will get called on page load, and on pjax page change
	 *				doInitStuff();
	 *			}
	 *		}
	 *	});
	 *
	 *  (2)
	 *  INIT.addInitializers({
	 *		pages: {
	 *			show: {
	 *				setupOnce: function () {
	 *					// this will only get called once, on page load
	 *					bindGlobalEvents();
	 *				},
	 *
	 *				setup: function () {
	 *					// this will get called on page load, and on pjax page change
	 *					bindSomeEvents();
	 *				},
	 *
	 *				teardown: function () {
	 *					// this will get called on pjax page change
	 *					unbindSomeEvents();
	 *				}
	 *			}
	 *		}
	 *	});
	 */

	var applicationCallbacks = {};


	function exec(controller, action, type) {
		var method = null;
		action = action || "init";

		try {
			method = applicationCallbacks[controller][action];
		} catch (e) {
			method = null;
		}

		if ((typeof method === "function") && ((type == 'teardown') || (type == 'setupOnce'))) {
			method = null; // don't call on teardown or setupOnce if defined as single function
		}

		if ((typeof method === "object") && (method !== null)) {
			try {
				method = method[type];
			} catch (e) {
				method = null;
			}
		}

		if ((typeof method === "undefined") || (method === null)) { return; }

		method.call();
	}


	 /** @param type {String} 'setup', 'setupOnce', 'teardown'. see example at exec() for explanation.
	 */
	function executeCallbacks(type) {
		exec("common", undefined, type);
		exec("common", APPLICATION.action, type);

		if ((APPLICATION.partial !== "undefined") && (APPLICATION.partial !== "")) {
			exec("common", APPLICATION.partial, type);
		}

		exec(APPLICATION.controller, undefined, type);
		exec(APPLICATION.controller, APPLICATION.action, type);

		if ((APPLICATION.partial !== "undefined") && (APPLICATION.partial !== "")) {
			exec(APPLICATION.controller, APPLICATION.partial, type);
		}
	}


	function setupOnce() {
		executeCallbacks('setupOnce');
	}


	function setup() {
		executeCallbacks('setup');
	}


	function pageTransitionEnd() {
		executeCallbacks('pageTransitionEnd');
	}


	function teardown() {
		executeCallbacks('teardown');
	}


	//
	// PUBLIC
	//


	this.initializeApplicationCallbacks = function () {
		$(document).ready(setupOnce);
		$(document).ready(setup);

		// TURBOLINKS
		$(document).on('page:load', setup);

		// PJAX
		$(document).on('pjax:success', setup);
		$(document).on('pjax:beforeSend', teardown);

		// MESO, fire this if you want to react to page transition end events instead of page:loaded or such
		// this is needed in case you have a lengthy page transition, because after this it'
		$(document).on('MESO:pageTransitionEnd', pageTransitionEnd);
	};


	/* safeguard to prevent accidental overriding (common copypaste error) */
	this.addInitializers = function (initializers) {
		for (var namespace in initializers) {
			if (typeof applicationCallbacks[namespace] !== 'undefined') {
				$.error('Initialization: tried to override existing namespace: ' + namespace);
			}
		}

		$.extend(true, applicationCallbacks, initializers);
	};

};


INIT.initializeApplicationCallbacks();
