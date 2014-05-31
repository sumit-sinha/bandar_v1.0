Aria.classDefinition({
	$classpath: 'model.ui.templates.scans.focal.FocalScanCtrl',
	$extends: 'model.ui.controller.ApplicationCtrl',
	$implements: ['model.ui.templates.scans.focal.IFocalScanCtrl'],
	$dependencies: [
		'aria.utils.Json',
		'aria.utils.Object',
		'model.ui.utils.ApplicationUtil'
	],
	$constructor: function() {
		this.data = {};
		this.utils = model.ui.utils.ApplicationUtil;
	},
	$statics : {

    },
	$prototype: {
		
		$publicInterfaceName: 'model.ui.templates.scans.focal.IFocalScanCtrl',
		
		/**
		 * creates a new temporary focal scan
		 * @param input search parameters for DB
		 */
		createNewFocalScan: function(input) {

			var errors = [];

			// start validation
			if (input == null) {
				errors.push('tx_error_invalid_input');
				return errors;
			}

			// density should be a number
			if (input.density == null || input.density == '' || isNaN(input.density)) {
				errors.push('tx_error_invalid_density');
			}

			// average age should be a number
			if (input.averageAge == null || input.averageAge == '' || !isNaN(input.averageAge)) {
				errors.push('tx_error_invalid_avg_age');
			}

			// nationality should not be empty
			if (input.nationality == null || input.nationality == '' || !isNaN(input.nationality)) {
				errors.push('tx_error_invalid_nationality');
			}

			if (errors.length == 0) {
				this.data.focalSession = {
					'tourist': input
				};

				return null;
			} else {
				return errors;
			}
		},

		/**
		 * return focal session data
		 * @return JSON
		 */
		getRRSessionData: function() {
			if (this.data.rrCurrentData != null) {
				return this.data.rrCurrentData;
			}

			return {};
		},

		/**
		 * saves focal session data
		 * @param input JSON
		 */
		saveRRSessionData: function(input) {
			this.data.rrCurrentData = input;
		},

		/**
		 * creates a new temporary range restriction scan
		 * @param input
		 */
		addRangeRestriction: function(args) {

			var errors = [];
			var input = args.input;

			// start validation
			if (input == null) {
				errors.push('tx_error_invalid_input');
				return errors;
			}

			// monkey id should not be empty
			if (input.type_rr == null || input.type_rr == '') {
				errors.push('tx_error_invalid_type_range');
			}

			// monkey id should not be empty
			if (input.monkey_id == null || input.monkey_id == '') {
				errors.push('tx_error_invalid_monkey_id');
			}

			// activity_code should not be empty
			if (input.area_code == null || input.area_code == '') {
				errors.push('tx_error_invalid_area_code');
			}

			// behavior_seq should not be empty
			if (input.behavior_seq == null || input.behavior_seq == '') {
				errors.push('tx_error_invalid_behavior_sequence');
			}

			if (errors.length == 0) {

				if (this.data.focalSession.range == null) {
					this.data.focalSession.range = [];
				}

				this.data.focalSession.range.push(input);
				return null;
			} else {
				return errors;
			}
		},

		/**
		 * return focal session data
		 * @return JSON
		 */
		getTouristSessionData: function() {
			if (this.data.focalSession != null) {
				return this.data.focalSession.tourist;
			}

			return null;
		},

		/**
		 * creates a new entry in DB with details as in input
		 * @param input

		 */
		saveFocalData: function(input) {

			var errors = [];

			// start validation
			if (input == null) {
				errors.push('tx_error_invalid_input');
				return errors;
			}

			// monkey id should not be empty
			if (input.monkey_id == null || input.monkey_id == '') {
				errors.push('tx_error_invalid_monkey_id');
				return errors;
			}

			// activity_code should not be empty
			if (input.activity_code == null || input.activity_code == '') {
				errors.push('tx_error_invalid_activity_code');
				return errors;
			}

			// behavior_seq should not be empty
			if (input.behavior_seq == null || input.behavior_seq == '') {
				errors.push('tx_error_invalid_behavior_sequence');
				return errors;
			}

			if (errors.length == 0) {
				var timeStamp = this._getTimeStamp();			
				var user = this.utils.initUserData(null, {
					'timeStamp': timeStamp,
					'user': this.utils.getLoggedInUser()
				});

				// set focal scan information
				this.data.focalSession['monkey'] = input;

				// create a new FOCAL SESSION
				user.groups[user.selectedGroup][timeStamp].FS.push(this.data.focalSession);
				var copiedUser = aria.utils.Json.copy(user);

				// set to local storage
				copiedUser.selectedGroup = null;
				localStorage.setItem(user.code, aria.utils.Json.convertToJsonString(copiedUser));

				// reset
				this.data.focalData = {};
				this.data.focalSession = {};

				return null;
			} else {
				return errors;
			}
		},

		/**
		 * return focal session data
		 * @return JSON
		 */
		getFocalSessionData: function() {
			return this.data.focalData; 
		},

		/**
		 * saves focal session data
		 * @param input JSON
		 */
		saveFocalSessionData: function(input) {
			this.data.focalData = input;
		},

		/**
		 * returns the current date in format yyyyMMdd
		 */
		_getTimeStamp: function() {
			return this.utils.getTimeStamp();
		}
	}
});