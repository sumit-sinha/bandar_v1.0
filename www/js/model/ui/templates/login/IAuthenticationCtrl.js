Aria.interfaceDefinition({
	$classpath: 'model.ui.templates.login.IAuthenticationCtrl',
	$extends: 'model.ui.controller.IApplicationCtrl',
	$interface: {
		/**
		 * fetch user profile from DB
		 * @param input search parameters for DB
		 *		{
		 *			email: ''
		 *		}
		 */
		fetchUser: function(input) {},

		/**
		 * creates a new entry in DB with details as in input
		 * @param input
		 *		{
		 *			email: ''	
		 *			password: ''
		 *		}
		 */
		registerUser: function(input) {}
	}
});