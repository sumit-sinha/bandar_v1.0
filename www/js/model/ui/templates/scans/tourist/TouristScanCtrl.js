Aria.classDefinition({
	$classpath: 'model.ui.templates.scans.tourist.TouristScanCtrl',
	$extends: 'model.ui.controller.ApplicationCtrl',
	$implements: ['model.ui.templates.scans.tourist.ITouristScanCtrl'],
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
		
		$publicInterfaceName: 'model.ui.templates.scans.tourist.ITouristScanCtrl',
		
		/**
		 * creates a new temporary tourist scan
		 * @param input search parameters for DB
		 */
		createNewTouristScan: function(input) {

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
				this.data.touristScanSession = {
					'tourist': input
				};

				return null;
			} else {
				return errors;
			}
		},

		/**
		 * return tourist session data
		 * @return JSON
		 */
		getTouristScanSessionData: function() {
			if (this.data.touristScanSession != null) {
				return this.data.touristScanSession.tourist;
			}

			return null;
		},

		/**
		 * creates a new entry in DB with details as in input
		 * @param input

		 */
		saveTouristScanData: function(input) {

			var errors = [];

			// start validation
			if (input == null) {
				errors.push('tx_error_invalid_input');
				return errors;
			}

			// monkey id should not be empty
			if (input.monkey_id == null || input.monkey_id == '') {
				errors.push('tx_error_invalid_monkey_id');
			}

			// behavior_seq should not be empty
			if (input.behavior_seq == null || input.behavior_seq == '') {
				errors.push('tx_error_invalid_behavior_sequence');
			}

			if (errors.length == 0) {
				var timeStamp = this.utils.getTimeStamp();			
				var user = this.utils.initUserData(null, {
					'timeStamp': timeStamp,
					'user': this.utils.getLoggedInUser()
				});

				// set tourist scan information
				if (this.data.touristScanSession['monkey'] == null) {
					this.data.touristScanSession['monkey'] = [];
				}

				this.data.touristScanSession['monkey'].push(input);

				return null;
			} else {
				return errors;
			}
		},

		onFinalSave: function(input) {

			var errors = [];
			var bothEmpty = false;

			// start validation
			if (input == null) {
				errors.push('tx_error_invalid_input');
				return errors;
			}

			// monkey id should not be empty
			if (input.monkey_id == null || input.monkey_id == '') {
				errors.push('tx_error_invalid_monkey_id');
			}

			if (input.behavior_seq == null || input.behavior_seq == '') {
				if (errors.length == 0) {
					errors.push('tx_error_invalid_behavior_sequence');
				} else {
					errors = [];
					bothEmpty = true;
				}
			}

			if (errors.length == 0) {

				var timeStamp = this.utils.getTimeStamp();			
				var user = this.utils.initUserData(null, {
					'timeStamp': timeStamp,
					'user': this.utils.getLoggedInUser()
				});
				
				if (!bothEmpty) {

					// set tourist scan information
					if (this.data.touristScanSession['monkey'] == null) {
						this.data.touristScanSession['monkey'] = [];
					}

					this.data.touristScanSession['monkey'].push(input);
				}
				
				// create a new tourist SESSION
				user.groups[user.selectedGroup][timeStamp].TS.push(this.data.touristScanSession);
				var copiedUser = aria.utils.Json.copy(user);

				// set to local storage
				copiedUser.selectedGroup = null;
				localStorage.setItem(user.code, aria.utils.Json.convertToJsonString(copiedUser));

				// reset
				this.data.touristData = {};
				this.data.touristScanSession = {};
			} else {
				return errors;
			}
		},

		/**
		 * return tourist session data
		 * @return JSON
		 */
		getTouristSessionData: function() {
			return this.data.touristData; 
		},

		/**
		 * saves tourist session data
		 * @param input JSON
		 */
		saveTouristSessionData: function(input) {
			this.data.touristData = input;
		}
	}
});