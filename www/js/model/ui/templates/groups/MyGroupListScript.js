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

			// navigate to focal-data page
			this.moduleCtrl.navigate(null, {
				pageRequest: {
					pageId: 'selectscan'
				}
			});
		}
	}
});