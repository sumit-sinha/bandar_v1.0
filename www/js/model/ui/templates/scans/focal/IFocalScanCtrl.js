Aria.interfaceDefinition({
	$classpath: 'model.ui.templates.scans.focal.IFocalScanCtrl',
	$extends: 'model.ui.controller.IApplicationCtrl',
	$interface: {
		/**
		 * creates a new temporary focal scan
		 * @param input search parameters for DB
		 */
		createNewFocalScan: function(input) {},

		/**
		 * creates a new entry in DB with details as in input
		 * @param input

		 */
		saveFocalData: function(input) {},

		/**
		 * return tourist session data
		 * @return JSON
		 */
		getTouristSessionData: function() {},

		/**
		 * return focal session data
		 * @return JSON
		 */
		getFocalSessionData: function() {},

		/**
		 * saves focal session data
		 * @param input JSON
		 */
		saveFocalSessionData: function(input) {},

		/**
		 * creates a new temporary range restriction scan
		 * @param input
		 */
		addRangeRestriction: function(args) {},

		/**
		 * return focal session data
		 * @return JSON
		 */
		getRRSessionData: function() {},

		/**
		 * saves focal session data
		 * @param input JSON
		 */
		saveRRSessionData: function(input) {}
	}
});