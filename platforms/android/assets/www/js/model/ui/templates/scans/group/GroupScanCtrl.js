Aria.classDefinition({
	$classpath: 'model.ui.templates.scans.group.GroupScanCtrl',
	$extends: 'model.ui.controller.ApplicationCtrl',
	$implements: ['model.ui.templates.scans.group.IGroupScanCtrl'],
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
		
		$publicInterfaceName: 'model.ui.templates.scans.group.IGroupScanCtrl',

		/**
		 * creates a new entry in DB with details as in input
		 * @param input

		 */
		saveGroupScanData: function(input) {

			var errors = [];

			// start validation
			if (input == null) {
				errors.push('tx_error_invalid_input');
				return errors;
			}

			// monkey id should not be empty
			if (input.use_of_space == null || input.use_of_space == '') {
				errors.push('tx_error_invalid_use_of_space');
			}

			// activity_code should not be empty
			if (input.activity_code == null || input.activity_code == '') {
				errors.push('tx_error_invalid_activity_code');
			}

			// behavior_seq should not be empty
			if (input.no_of_tourist == null || input.no_of_tourist == '') {
				errors.push('tx_error_invalid_no_of_tourist');
			}

			if (errors.length == 0) {
				var timeStamp = this.utils.getTimeStamp();			
				var user = this.utils.initUserData(null, {
					'timeStamp': timeStamp,
					'user': this.utils.getLoggedInUser()
				});

				// create a new FOCAL SESSION
				user.groups[user.selectedGroup][timeStamp].GS.push(input);
				var copiedUser = aria.utils.Json.copy(user);

				// set to local storage
				copiedUser.selectedGroup = null;
				localStorage.setItem(user.code, aria.utils.Json.convertToJsonString(copiedUser));

				return null;
			} else {
				return errors;
			}
		}
	}
});