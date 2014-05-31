Aria.classDefinition({
	$classpath: 'model.ui.templates.scans.range.RangeRestrictionCtrl',
	$extends: 'model.ui.controller.ApplicationCtrl',
	$implements: ['model.ui.templates.scans.range.IRangeRestrictionCtrl'],
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
		
		$publicInterfaceName: 'model.ui.templates.scans.range.IRangeRestrictionCtrl',
		
		/**
		 * adds a new range restriction entry in storage
		 * @param event
		 * @param args
		 */
		addRangeRestriction: function(event, args) {

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
				var timeStamp = this.utils.getTimeStamp();			
				var user = this.utils.initUserData(null, {
					'timeStamp': timeStamp,
					'user': this.utils.getLoggedInUser()
				});

				// create a new FOCAL SESSION
				user.groups[user.selectedGroup][timeStamp].RR.push(input);
				this.data.user = user;

				return null;
			} else {
				return errors;
			}
		},

		/**
		 * adds a new range restriction entry in local storage
		 * @param event
		 * @param args
		 */
		addFinalRangeRestriction: function(event, args) {
			
			var errors = [];
			var allEmpty = false;
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
				if (errors.length < 3) {
					errors.push('tx_error_invalid_behavior_sequence');
				} else {
					errors = [];
					allEmpty = true;
				}
			}

			if (errors.length == 0) {

				if (!allEmpty) {

					var timeStamp = this.utils.getTimeStamp();
					if (this.data.user == null) {	
						this.data.user = this.utils.initUserData(null, {
							'timeStamp': timeStamp,
							'user': this.utils.getLoggedInUser()
						});
					}

					// create a new FOCAL SESSION
					this.data.user.groups[this.data.user.selectedGroup][timeStamp].RR.push(input);
				}

				if (this.data.user != null) {
					var copiedUser = aria.utils.Json.copy(this.data.user);

					// set to local storage
					copiedUser.selectedGroup = null;
					localStorage.setItem(this.data.user.code, aria.utils.Json.convertToJsonString(copiedUser));

					this.data.user = null;

					return null;
				}

				errors = [];
				errors.push('tx_error_invalid_input');
				return errors;

			} else {
				return errors;
			}
		}	
	}
});