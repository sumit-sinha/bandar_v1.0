Aria.classDefinition({
	$classpath: 'model.ui.templates.login.AuthenticationCtrl',
	$extends: 'model.ui.controller.ApplicationCtrl',
	$implements: ['model.ui.templates.login.IAuthenticationCtrl'],
	$dependencies: [
		'aria.utils.Object',
		'model.ui.utils.ApplicationUtil'
	],
	$constructor: function() {
		this.utils = model.ui.utils.ApplicationUtil;
	},
	$statics : {

    },
	$prototype: {
		
		$publicInterfaceName: 'model.ui.templates.login.IAuthenticationCtrl',
		
		/**
		 * fetch user profile from DB
		 * @param input search parameters for DB
		 *		{
		 *			code: '',
		 *			password: '',
		 *			callback: {}
		 *		}
		 */
		fetchUser: function(input) {
			
			// if any
			var errors = [];
			this.utils.showOverlay(true);

			// validate code
			if (!this.validateCode(input.code)) {
				errors.push('tx_error_invalid_code');
			}

			// validate password
			if (!this.validatePassword(input.password)) {
				errors.push('tx_error_invalid_pwd');
			}

			if (errors.length == 0) {

				//i.e. no errors
				var user = {
					code: input['code'],
					password: input['password'],
					callback: input['callback']
				}

				// initialize
				if (this.data == null) {
					this.data = {};
				}

				// start transaction
				this.selectUser(user);
				return null;
			} else {
				return errors;
			}
		},

		/**
		 * creates a new entry in DB with details as in input
		 * @param input
		 *		{
		 *			code: '',
		 *			password1: '',
		 *			password2: '',
		 *			callback: {}
		 *		}
		 */
		registerUser: function(input) {
			
			// if any
			var errors = [];
			this.utils.showOverlay(true);

			// validate code
			if (!this.validateCode(input.code)) {
				errors.push('tx_error_invalid_code');
			}

			// validate password
			if (!this.validatePassword(input.password1)) {
				errors.push('tx_error_invalid_pwd');
			} else if (input.password1 != input.password2) {
				errors.push('tx_error_confirm_pwd_no_match');
			}

			if (errors.length == 0) {

				//i.e. no errors
				var registeration = {
					code: input['code'],
					password: input['password1'],
					dateofjoining: '19042014',
					callback: input['callback']
				}

				// initialize
				if (this.data == null) {
					this.data = {};
				}

				// start transaction
				this.insertUser(registeration);
				return null;
			} else {
				return errors;
			}
		},

		_onFailure: function(data) {

			// set user profile data to null, this indicates logged out
			var appData = pageEngine.getData().appData;
			aria.utils.Json.setValue(appData, 'user', null);
			this.$callback(data.callback);	
		},

		_processLogin: function(user) {
			// set user profile data to appData, this indicates login
			localStorage.setItem('logged_in', user.code);
			var appData = pageEngine.getData().appData;
			aria.utils.Json.setValue(appData, 'user', user);

			// navigate to next page
			this.navigate(null, {
				pageRequest: {
					pageId: 'mygroups'
				}
			});
		},

		/**
		 * validates user 2 digit code
		 * @param code 2 digit code
		 * @return true if 'code' is a valid code
		 */
		validateCode: function(code) { 
    		return code != null && code.length == 2;
		},

		/**
		 * validates user password
		 * @param password value for password field
		 * @return true if 'password' is a valid password
		 */
		validatePassword: function(password) {
			return password != null && password.length > 0;
		},

		/**
		 * insert data into DB
		 * @param registeration transaction object
		 */
		insertUser: function(registeration) {

			try {
				var code = registeration['code'];
				var data = JSON.parse(localStorage.getItem(code));
				if (!aria.utils.Object.isEmpty(data)) {
					this._onFailure(registeration);
					return;
				}
			} catch (e) {
				// i.e. no pre-existing user
			}

			var user = {
				'code': registeration['code'],
				'password': registeration['password'],
				'dateofjoining': registeration['dateofjoining']
			}

			// add JSON to local Storage
			localStorage.setItem(code, JSON.stringify(user));
			this._processLogin(user);
		},

		/**
		 * insert data into DB
		 * @param user transaction object
		 */
		selectUser: function(user) {
			try {
				var code = user['code'];
				var data = JSON.parse(localStorage.getItem(code));
				if (aria.utils.Object.isEmpty(data) || data.password != user['password']) {
					this._onFailure(user);
				} else {
					// user logged in
					this._processLogin(data);
				}
			} catch (e) {
				this._onFailure(user);
			}
		}
	}
});