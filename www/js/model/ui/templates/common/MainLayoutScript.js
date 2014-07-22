Aria.tplScriptDefinition({
	$classpath: 'model.ui.templates.common.MainLayoutScript',
	$dependencies: [
		'model.ui.utils.ApplicationUtil'
	],
	$constructor: function() {
		this.utils = model.ui.utils.ApplicationUtil;
	},
	$prototype: {
		
		$dataReady: function() {
			try {
				var appData = pageEngine.getData().appData;
				var code = localStorage.getItem('logged_in');
				if (code != null && appData['user'] == null) {
					var data = JSON.parse(decodeURIComponent(localStorage.getItem(code)));
					aria.utils.Json.setValue(appData, 'user', data);
				}
			} catch (e) {
				// no action required
			}
		},

		$viewReady: function() {
			var containerEL = document.getElementById('container');
			if (containerEL != null) {
				containerEL.className = '';
			}

			this.utils.hideOverlay();
		}
	}
});