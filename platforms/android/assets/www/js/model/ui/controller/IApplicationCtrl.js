Aria.interfaceDefinition({
	$classpath: 'model.ui.controller.IApplicationCtrl',
	$extends: 'aria.templates.IModuleCtrl',
	$interface: {
		/**
		 * function used to navigate from one page to other
		 * @param args common parameters which decide navigation flow
		 */
		navigate: function(args){},
		
		/**
		 * function used to reset menu items in app data
		 * @param header contains list of items where each element is a menu
		 */
		updateHeader: function(header){},
		
		/**
		 * function used to submit form across application
		 * @param event contains information about element triggering this method
		 * @param args common parameters which decide navigation flow
		 */
		onFormSubmit: function(event, args) {}
	}	
});