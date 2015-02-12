Aria.tplScriptDefinition({
	$classpath: 'model.ui.templates.common.PageHeaderTemplateScript',
	$dependencies: [
		'aria.utils.Object',
		'model.ui.utils.ApplicationUtil'
	],
	$constructor: function() {
		this.utils = model.ui.utils.ApplicationUtil;
	},
	$prototype: {

		$dataReady: function() {
			// initialize data
			this.data.count = 0;
			this.data._header = this.moduleCtrl.getHeaderData();
		},

		/**
		 * function triggered when user clicks on note button
		 * @param event
		 * @param args
		 */
		onNoteClick: function(event, args) {
			// navigate to next page
			this.moduleCtrl.navigate(null, {
				pageRequest: {
					pageId: 'takenote'
				}
			});
		},

		/**
		 * function activated when user click to open or collapse menu items
		 * @param event 
		 * @param args
		 */
		onMenuClick: function(event, args) {

			var interval = null;
			var currentPage = this;
			var navMenuEl = document.getElementById(this.$getId('navmenu'));
			if (navMenuEl != null) {
				if (navMenuEl.className.indexOf('navbar-open-left') == -1) {
					navMenuEl.className = 'navbar-vertical navbar-position navbar-open-left';
				} else {
					navMenuEl.className = 'navbar-vertical navbar-position';
				}
			}
		},

		/**
		 * function activated when user clicks on any Manage Data
		 * @param event 
		 * @param args
		 */
		onManageClick: function(event, args) {
			// navigate to next page
			this.moduleCtrl.navigate(null, {
				pageRequest: {
					pageId: 'managescans'
				}
			});
		},

		/**
		 * function activated when user clicks on any menu item
		 * @param event 
		 * @param args
		 */
		onItemClick: function(event, args) {
			if (args.onItemClick != null) {
				this.$callback(args.onItemClick);
			}
		},

		/**
		 * checks if the group is already selected by user
		 * @return Boolean true or false
		 */
		isGroupSelected: function() {
			var appData = pageEngine.getData().appData;
			return !aria.utils.Object.isEmpty(appData['user']) && appData['user'].selectedGroup != null;
		},

		/**
		 * logs out the user
		 * @param event
		 * @param args
		 */
		onLogoutClick: function(event, args) {

			// set required values
			localStorage.removeItem('logged_in');
			var appData = pageEngine.getData().appData;
			aria.utils.Json.setValue(appData, 'user', null);


			// navigate to next page
			this.moduleCtrl.navigate(null, {
				pageRequest: {
					pageId: 'authenticate'
				}
			});
		},

		/**
		 * navigates user to route restriction page
		 * @param event
		 * @param args
		 */
		onRouteRestrictionClick: function(event, args) {
			// navigate to next page
			this.moduleCtrl.navigate(null, {
				pageRequest: {
					pageId: 'rangerestriction'
				}
			});
		},

		/**
		 * navigates user to group scan page
		 * @param event
		 * @param args
		 */
		onGroupScanClick: function(event, args) {
			// navigate to next page
			this.moduleCtrl.navigate(null, {
				pageRequest: {
					pageId: 'groupscan'
				}
			});
		},

		/**
		 * navigates user to focal data collection page
		 * @param event
		 * @param args
		 */
		onFocalDataClick: function(event, args) {
			// navigate to next page
			this.moduleCtrl.navigate(null, {
				pageRequest: {
					pageId: 'touristfocalscan'
				}
			});
		},

		/**
		 * navigates user to tourist scan page
		 * @param event
		 * @param args
		 */
		onTouristScanClick: function(event, args) {
			// navigate to next page
			this.moduleCtrl.navigate(null, {
				pageRequest: {
					pageId: 'touristscant'
				}
			});
		},

		/**
		 * navigates user to group selection page
		 * @param event
		 * @param args
		 */
		onGroupClick: function(event, args) {
			// navigate to next page
			this.moduleCtrl.navigate(null, {
				pageRequest: {
					pageId: 'mygroups'
				}
			});
		},

		/**
		 * exit the native application
		 * @param event
		 * @param args
		 */
		onExitClick: function(event, args) {
			if (navigator.app != null) {
				navigator.app.exitApp();
			}
		},

		/**
		 * redirects to registeration screen
		 * @param event
		 * @param args
		 */
		onRegisterClick: function(event, args) {
			// navigate to next page
			this.moduleCtrl.navigate(null, {
				pageRequest: {
					pageId: 'register'
				}
			});
		},

		/**
		 * redirects to registeration screen
		 * @param event
		 * @param args
		 */
		onLoginClick: function(event, args) {
			// navigate to next page
			this.moduleCtrl.navigate(null, {
				pageRequest: {
					pageId: 'authenticate'
				}
			});
		}
	}
});