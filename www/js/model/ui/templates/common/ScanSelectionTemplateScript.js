Aria.tplScriptDefinition({
	$classpath: 'model.ui.templates.common.ScanSelectionTemplateScript',
	$constructor: function() {

	},
	$prototype: {

		/**
		 * navigates user to route restriction page
		 * @param event
		 * @param args
		 */
		onRangeClick: function(event, args) {
			// navigate to next page
			this.moduleCtrl.navigate(null, {
				pageRequest: {
					pageId: 'rangerestriction'
				}
			});
		},

		/**
		 * navigates user to group scan page
		 * @param event
		 * @param args
		 */
		onGroupClick: function(event, args) {
			// navigate to next page
			this.moduleCtrl.navigate(null, {
				pageRequest: {
					pageId: 'groupscan'
				}
			});
		},

		/**
		 * navigates user to focal data collection page
		 * @param event
		 * @param args
		 */
		onFocalClick: function(event, args) {
			// navigate to next page
			this.moduleCtrl.navigate(null, {
				pageRequest: {
					pageId: 'touristfocalscan'
				}
			});
		},

		/**
		 * navigates user to tourist scan page
		 * @param event
		 * @param args
		 */
		onTouristClick: function(event, args) {
			// navigate to next page
			this.moduleCtrl.navigate(null, {
				pageRequest: {
					pageId: 'touristscant'
				}
			});
		}
	}
});