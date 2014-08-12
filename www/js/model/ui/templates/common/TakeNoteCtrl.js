Aria.classDefinition({
	$classpath: 'model.ui.templates.common.TakeNoteCtrl',
	$extends: 'model.ui.controller.ApplicationCtrl',
	$implements: ['model.ui.templates.common.ITakeNoteCtrl'],
	$dependencies: [
		'model.ui.utils.ApplicationUtil'
	],
	$constructor: function() {
		this.utils = model.ui.utils.ApplicationUtil;
	},
	$prototype: {
		
		$publicInterfaceName: 'model.ui.templates.common.ITakeNoteCtrl',
		
		/**
		 * fetches header data stored in controller
		 */
		saveNoteData: function(args) {
			var errors = [];

			// start validation
			if (args == null || args.notes == null || args.notes == '') {
				errors.push('tx_error_invalid_input');
				return errors;
			}

			if (errors.length == 0) {
				var timeStamp = this.utils.getTimeStamp();			
				var user = this.utils.initUserData(null, {
					'timeStamp': timeStamp,
					'user': this.utils.getLoggedInUser()
				});

				// create a new FOCAL SESSION
				if (user.notes == null) {
					user.notes = [];
				}

				user.notes.push(args);
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