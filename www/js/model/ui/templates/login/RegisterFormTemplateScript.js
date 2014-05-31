Aria.tplScriptDefinition({
	$classpath: 'model.ui.templates.login.RegisterFormTemplateScript',
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
		},

		/**
         * function called when user clicks on register button
         * @param event
         * @param args
         */
		onRegisterClick: function(event, args) {

			// stop default operation
			event.preventDefault();

			var codeEL = document.getElementById('CODE_1');
			var password1EL = document.getElementById('PASSWORD_1');
			var password2EL = document.getElementById('PASSWORD_2');

			if (codeEL != null && password1EL != null && password2EL != null) {
				var input = {
					code: codeEL.value,
					password1: password1EL.value,
					password2: password2EL.value,
					callback: {
						fn: '_onRegisterationCallback',
						scope: this
					}
				}

				var errors = this.moduleCtrl.registerUser(input);
				if (errors != null) {
					this.utils.hideOverlay();
					this.data.errors.list = errors;
					this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);
				} else {
					this.data.errors.list = null;
				}
			}
		},

		_onRegisterationCallback: function(args1, args2) {
			this.utils.hideOverlay();
			this.data.errors.list = ['tx_error_db_registeration'];
			this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);
		},

		dismissError: function(event, args) {
			this.data.errors.list = null;
			this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);
		}
	}
});