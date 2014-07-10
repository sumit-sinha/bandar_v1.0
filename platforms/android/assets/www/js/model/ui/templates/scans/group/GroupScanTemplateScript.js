Aria.tplScriptDefinition({
	$classpath: 'model.ui.templates.scans.group.GroupScanTemplateScript',
	$dependencies: [
		'model.ui.utils.DataUtil',
		'model.ui.utils.ApplicationUtil'
	],
	$constructor: function() {
		this.db = model.ui.utils.DataUtil;
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
		},

		dismissError: function(event, args) {
			this.data.errors.list = null;
			this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);
		},

		onTouristPresentCheck: function(event, args) {
			var noOfTouristEL = document.getElementById(this.$getId('NO_OF_TOURIST_1'));
			if (noOfTouristEL != null) {
				if (args.present) {
					noOfTouristEL.value = '';
				} else {
					noOfTouristEL.value = '0';
				}
			}
		},

		onScanOver: function(event, args) {

			// serialize FORM to JSON
			var input = this.utils.formToJson(document.getElementById(this.$getId('frmGroup')));
			input['endTime'] = this.utils.getCurrentTime();

			this.data.errors.list = this.moduleCtrl.saveGroupScanData(input);
			if (this.data.errors.list == null || this.data.errors.list.length == 0) {
				
				// reset timer
				this.data.timer = 0;
				this.utils.getTimerInfo().timer = 0;

				// show success dialog
				this.utils.showOverlay(false);
				this.$json.setValue(this.data, 'group_saved', true);
			} else {
				// show error
				this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);
			}
		},

		onModalTapEvent: function(event, args) {
			
			// reset page
			this.resetInput(event, {
				inputId: 'ACTIVITY_1',
				value: true
			});

			this.resetInput(event, {
				inputId: 'USE_SPACE_1',
				value: true
			});

			this.resetInput(event, {
				inputId: 'NO_OF_TOURIST_1',
				value: true
			});

			this.resetInput(event, {
				inputId: 'NOTES_1',
				value: true
			});

			var el = document.getElementById(this.$getId('TOURIST_PRESENT_1_1'));
			if (el != null) {
				el.checked = true;
			}

			// remove modal
			this.utils.hideOverlay();
			this.$refresh({
				outputSection: 'success'
			});
		},

		resetInput: function(event, args) {
			var el = document.getElementById(this.$getId(args.inputId));
			if (el != null) {
				if (args.innerHTML) {
					el.innerHTML = '';
				} else {
					el.value = '';
				}
			}
		}
	}
});