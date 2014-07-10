Aria.tplScriptDefinition({
    $classpath : 'model.ui.macros.ApplicationMacroScript',
    $dependencies: [
    	'model.ui.utils.ApplicationUtil'
    ],
	$prototype : {
		
		/**
		 * function triggered when event button is clicked
		 * @param event
		 * @param args
		 */
		onBehaviorButtonClick: function(event, args) {
			if (args.behavior.items == null || args.behavior.items.length == 0) {
				var el = document.getElementById(args.glue.id);
				if (el != null) {
					el.value += ((el.value == null || el.value == '')?'':'-') + args.behavior.code;
				}

				// disable button if only one click is allowed
				if (args.behavior.properties != null 
						&& args.behavior.properties.allowed_click == 1) {
					var el = document.getElementById(event.target.getProperty('id'));
					if (el != null) {
						el.className += ' disabled';
					}
				}

				if(args.glue.onKeyUp != null) {
					this.$callback(args.glue.onKeyUp);
				}
			} else {
				// refresh the modal
				if (args.glue.previousList == null) {
					args.glue.previousList = [];
				}

				if (args.glue.behaviors != null) {
					args.glue.previousList.push(args.glue.behaviors);
				}

				args.glue.behaviors = args.behavior.items;
				model.ui.utils.ApplicationUtil.showOverlay(false);
				aria.utils.Json.setValue(args.glue, 'refresh', !args.glue.refresh);
			}
		},

		onCloseCb: function(event, args) {

			if (args.glue.previousList == null || args.glue.previousList.length == 0) {
				args.glue.behaviors = null;
				model.ui.utils.ApplicationUtil.hideOverlay();
				aria.utils.Json.setValue(args.glue, 'refresh', null);
			} else {
				args.glue.behaviors = args.glue.previousList.pop();
				aria.utils.Json.setValue(args.glue, 'refresh', !args.glue.refresh);
			}				
		}
	}
});