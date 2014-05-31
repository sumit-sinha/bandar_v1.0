Aria.tplScriptDefinition({
	$classpath: 'model.ui.templates.login.LoginTemplateScript',
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
         * function called when user wants to register a new account
         * @param event
         * @param args
         */
		onRegisterLinkClick: function(event, args) {
			this.moduleCtrl.navigate(event, {
				pageRequest: {
					pageId: 'register'
				}
			});
		},

		/**
         * function called when user wants to submit the login form
         * @param event
         * @param args
         */
		onFormSubmit: function(event, args) {
			event.preventDefault();

			var codeEL = document.getElementById('CODE_1');
			var password1EL = document.getElementById('PASSWORD_1');

			if (codeEL != null && password1EL != null) {
				var input = {
					code: codeEL.value,
					password: password1EL.value,
					callback: {
						fn: '_onLoginCallback',
						scope: this
					}
				}

				var errors = this.moduleCtrl.fetchUser(input);
				if (errors != null) {
					this.utils.hideOverlay();
					this.data.errors.list = errors;
					this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);
				}
			}
		},

		_onLoginCallback: function(args1, args2) {
			this.utils.hideOverlay();
			this.data.errors.list = ['tx_error_user_name_pwd_no_match'];
			this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);
		},

		dismissError: function(event, args) {
			this.data.errors.list = null;
			this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);
		}
	}
});