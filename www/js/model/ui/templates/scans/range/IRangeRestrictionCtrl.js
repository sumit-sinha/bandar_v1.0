Aria.interfaceDefinition({
	$classpath: 'model.ui.templates.scans.range.IRangeRestrictionCtrl',
	$extends: 'model.ui.controller.IApplicationCtrl',
	$interface: {

		/**
		 * adds a new range restriction entry
		 * @param event
		 * @param args
		 */
		addRangeRestriction: function(event, args) {},

		/**
		 * adds a new range restriction entry in local storage
		 * @param event
		 * @param args
		 */
		addFinalRangeRestriction: function(event, args) {}
	}
});