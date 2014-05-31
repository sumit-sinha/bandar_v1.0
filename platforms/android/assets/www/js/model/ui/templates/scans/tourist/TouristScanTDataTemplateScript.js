Aria.tplScriptDefinition({
	$classpath: 'model.ui.templates.scans.tourist.TouristScanTDataTemplateScript',
	$dependencies: [
		'model.ui.utils.ApplicationUtil'
	],
	$constructor: function() {
		this.utils = model.ui.utils.ApplicationUtil;
	},
	$prototype: {

		$dataReady: function() {

			if (this.data == null) {
				this.data = {};
			}

			this.data.errors = {
				list: null,
				error_occured: false
			}

			// get tourist session data (if available)
			this.data.touristScanSession = this.moduleCtrl.getTouristScanSessionData();
			if (this.data.touristScanSession == null) {
				this.data.touristScanSession = {};
			}
		},
		
		dismissError: function(event, args) {
			this.data.errors.list = null;
			this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);
		},

		onTouristScanClick: function(event, args) {

			// save before navigation
			this.onSaveClick(event, args);
		},

		/**
		 * trigerred when user click on save button
		 * @param event
		 * @param args
		 */
		onSaveClick: function(event, args) {
			
			// creates a new Tourist Scan session
			this.data.errors.list = null;
			this.data.errors.list = this.moduleCtrl.createNewTouristScan(this.utils.formToJson(document.getElementById(this.$getId('frmTourist'))));

			if (this.data.errors.list == null || this.data.errors.list.length == 0) {
				
				// navigate to next page
				this.moduleCtrl.navigate(null, {
					pageRequest: {
						pageId: 'touristscanm'
					}
				});
			} else {
				// show errors
				this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);
			}
		}
	}
});