Aria.tplScriptDefinition({
	$classpath: 'model.ui.templates.common.TakeNoteTemplateScript',
	$dependencies: [
		'model.ui.utils.ApplicationUtil'
	],
	$constructor: function() {
		this.utils = model.ui.utils.ApplicationUtil;
	},
	$prototype: {

		$dataReady: function() {
			this.startTime = this.utils.getCurrentTime();

			if (this.data == null) {
				this.data = {};
			}

			this.data.errors = {
				list: null,
				error_occured: false
			}

			this.data.notes_saved = false;
		},

		/**
		 * function called to save the note data
		 * @param event
		 * @param args
		 */
		onSaveNoteClick: function(event, args) {
			var input = this.utils.formToJson(document.getElementById(this.$getId('frmNote')));
			input['startTime'] = this.startTime;
			input['endTime'] = this.utils.getCurrentTime();

			this.data.errors.list = this.moduleCtrl.saveNoteData(input);
			if (this.data.errors.list == null || this.data.errors.list.length == 0) {
				// show success dialog
				this.utils.showOverlay(false);
				this.$json.setValue(this.data, 'notes_saved', true);

				// reset text box
				var el = document.getElementById(this.$getId('NOTES_1'));
				if (el != null) {
					el.value = '';
				}
			} else {
				// show error
				this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);
			}
		},

		dismissError: function(event, args) {
			this.data.errors.list = null;
			this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);
		},

		/**
		 * function triggered when OK or cross button in overlay is clicked
		 * @param event
		 * @param args
		 */
		onCloseTap: function(event, args) {
			this.utils.hideOverlay();
			this.$json.setValue(this.data, 'notes_saved', false);
		},
	}
});