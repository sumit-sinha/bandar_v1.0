Aria.tplScriptDefinition({
	$classpath: 'model.ui.templates.groups.MyGroupListScript',
	$dependencies: [
		'model.ui.utils.ApplicationUtil'
	],
	$constructor: function() {
		this.utils = model.ui.utils.ApplicationUtil;
	},
	$prototype: {

		$dataReady: function() {
			this.data.groups = [
				{
					code: 'PB',
					text: 'Monkey Group'
				},
				{
					code: 'R1',
					text: 'Monkey Group'
				},
				{
					code: 'R2',
					text: 'Monkey Group'
				}
			];

			this.data.showScans = null;
		},

		/**
		 * function triggered when close button of popup is clicked
		 * @param event
		 * @param args
		 */
		closeScanOption: function(event, args) {
			// scan options
			this.utils.hideOverlay();
			this.$json.setValue(this.data, 'showScans', null);
		},

		/**
		 * triggered when user select any group
		 * @param event
		 * @param args
		 */
		onGroupTap: function(event, args) {

			for (var i = 0; i < this.data.groups.length; i++) {
				var group = this.data.groups[i];
				var groupEL = document.getElementById(this.$getId(group.code));
				if (groupEL != null) {
					if (group.code == args.group.code) {
						groupEL.className = 'list-group-item selected';
					} else {
						groupEL.className = 'list-group-item';
					}
				}
			}

			// if groups is not present
			var appData = pageEngine.getData().appData;
			appData['user'].selectedGroup = args.group.code;

			// scan options
			this.utils.showOverlay(false);
			this.$json.setValue(this.data, 'showScans', !this.data.showScans);

			/* navigate to focal-data page
			this.moduleCtrl.navigate(null, {
				pageRequest: {
					pageId: 'selectscan'
				}
			});*/
		},

		/**
		 * navigates user to route restriction page
		 * @param event
		 * @param args
		 */
		onRangeClick: function(event, args) {
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
		onGroupClick: function(event, args) {
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
		onFocalClick: function(event, args) {
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
		onTouristClick: function(event, args) {
			// navigate to next page
			this.moduleCtrl.navigate(null, {
				pageRequest: {
					pageId: 'touristscant'
				}
			});
		}
	}
});