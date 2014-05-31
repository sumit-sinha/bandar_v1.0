Aria.interfaceDefinition({
	$classpath: 'model.ui.templates.scans.tourist.ITouristScanCtrl',
	$extends: 'model.ui.controller.IApplicationCtrl',
	$interface: {
		/**
		 * creates a new temporary tourist scan
		 * @param input search parameters for DB
		 */
		createNewTouristScan: function(input) {},

		/**
		 * creates a new entry in DB with details as in input
		 * @param input

		 */
		saveTouristScanData: function(input) {},

		/**
		 * return tourist session data
		 * @return JSON
		 */
		getTouristScanSessionData: function() {},

		/**
		 * return focal session data
		 * @return JSON
		 */
		getTouristSessionData: function() {},

		/**
		 * saves focal session data
		 * @param input JSON
		 */
		saveTouristSessionData: function(input) {},

		/**
		 * saves focal session data to local storage
		 * @param input JSON
		 */
		onFinalSave: function(input) {}
	}
});