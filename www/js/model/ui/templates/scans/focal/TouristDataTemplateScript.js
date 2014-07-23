Aria.tplScriptDefinition({
	$classpath: 'model.ui.templates.scans.focal.TouristDataTemplateScript',
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

			// get focal session data (if available)
			this.data.focalSession = this.moduleCtrl.getTouristSessionData();
			if (this.data.focalSession == null) {
				this.data.focalSession = {};
			}
		},

		onTouristPresentCheck: function(event, args) {
			var noOfTouristEL = document.getElementById(this.$getId('DENSITY_1'));
			if (noOfTouristEL != null) {
				if (args.present) {
					noOfTouristEL.value = '';
				} else {
					noOfTouristEL.value = '0';
				}
			}
		},
		
		dismissError: function(event, args) {
			this.data.errors.list = null;
			this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);
		},

		onFocalScanClick: function(event, args) {

			// save before navigation
			if (args == null) {
				args = {};
			}

			args.useSamePage = true;
			args.nextpage = 'focalscan';
			this.onSaveClick(event, args);
		},

		onRRFocalScanClick: function(event, args) {

			// save before navigation
			if (args == null) {
				args = {};
			}
			args.nextpage = 'rangerestrfocal';
			this.onSaveClick(event, args);
		},

		/**
		 * trigerred when user click on save button
		 * @param event
		 * @param args
		 */
		onSaveClick: function(event, args) {
			
			// creates a new FOCAL_SESSION
			this.data.errors.list = null;
			var formData = this.utils.formToJson(document.getElementById(this.$getId('frmFocalTourist')));
			this.data.errors.list = this.moduleCtrl.createNewFocalScan(formData);

			if (this.data.errors.list == null || this.data.errors.list.length == 0) {
				
				// navigate to next page
				var nextpage = 'focalscan';
				if (args != null && args.nextpage != null) {
					nextpage = args.nextpage;
				}

				if ((args == null || !args.useSamePage) && formData.hasTourist == 'false') {
					nextpage = 'rangerestrfocal';
				}

				this.moduleCtrl.navigate(null, {
					pageRequest: {
						pageId: nextpage
					}
				});
			} else {
				// show errors
				this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);
			}
		}
	}
});