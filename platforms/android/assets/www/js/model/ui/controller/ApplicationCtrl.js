Aria.classDefinition({
	$classpath: 'model.ui.controller.ApplicationCtrl',
	$extends: 'aria.templates.ModuleCtrl',
	$dependencies:[
		'aria.utils.HashManager'
	],
	$implements: ['model.ui.controller.IApplicationCtrl'],
	$prototype: {
		
		$publicInterfaceName: 'model.ui.controller.IApplicationCtrl',
		
		init: function(args, callback) {

			// set a callback on hash change
			aria.utils.HashManager.addCallback({
				fn: '__onHashChange',
				scope:this
			});

			// initialize data
			var appData = pageEngine.getData().appData;
			if (appData.header == null) {
				aria.utils.Json.setValue(appData, 'header', {
					menus: []
				});
			}
			
			this.$callback(callback);
		},
		
		__onHashChange: function(){

			var hashPage = aria.utils.HashManager.getHashString();
			if (hashPage == null || hashPage == '') {

				// if hashpage is null or empty
				// then it means that current was the entry action
				history.back();
			}
		},

		/**
		 * function used to navigate from one page to other
		 * @param event contains information about element triggering this method
		 * @param args common parameters which decide navigation flow
		 */
		navigate: function(event, args) {
			if (pageEngine != null) {
				pageEngine.navigate({
					pageId: args.pageRequest.pageId
				});
			}
		},
		
		/**
		 * function used to submit form across application
		 * @param event contains information about element triggering this method
		 * @param args common parameters which decide navigation flow
		 */
		onFormSubmit: function(event, args) {
			event.preventDefault();
		},
		
		/**
		 * function used to reset menu items in app data
		 * @param header contains list of items where each element is a menu
		 */
		updateHeader: function(header){
			var appData = pageEngine.getData().appData;
			this.$Json.setValue(appData, 'header', header);
		}
	}
});