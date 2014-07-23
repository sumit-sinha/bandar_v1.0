Aria.tplScriptDefinition({
    $classpath : 'model.ui.macros.ApplicationMacroScript',
    $dependencies: [
    	'model.ui.utils.DataUtil',
    	'model.ui.utils.ApplicationUtil'
    ],
	$prototype : {
		
		/**
		 * function called while creating behavior buttons
		 * it returns list of object where each object represent a button
		 * @param args
		 * @return JSONArray
		 */
		getBehaviorsList: function(args) {
			var list = model.ui.utils.DataUtil.getBehaviorList();
			if (args.hasTouristBehaviors) {
				var touristList = model.ui.utils.DataUtil.getTouristBehaviors();
				if (touristList != null) {
					for (var i =0; i < touristList.length; i++) {
						list.push(touristList[i]);
					}
				}
			}

			return list;
		},

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
				if (args.behavior.properties != null) {
					if (args.behavior.properties.allowed_click == 1) {
						var el = document.getElementById(event.target.getProperty('id'));
						if (el != null) {
							el.className += ' disabled';
						}
					}

					// show monkey id textbox
					if (args.behavior.properties.input_monkey_id) {
						args.glue.addMonkeyId = true;
						aria.utils.Json.setValue(args.glue, 'refresh', !args.glue.refresh);
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

				// scroll to top
				window.scrollTo(0, 0);

				args.glue.behaviors = args.behavior.items;
				model.ui.utils.ApplicationUtil.showOverlay(false);
				aria.utils.Json.setValue(args.glue, 'refresh', !args.glue.refresh);
			}
		},

		/**
		 * function triggered when user choose to input monkey id
		 * @param event
		 * @param args
		 */
		onAddMonkeyId: function(event, args) {

			var el = document.getElementById(args.glue.id);
			var txt = document.getElementById('BEHAVIOR_MONKEY_ID');
			if (el != null && txt != null) {
				el.value += ((el.value == null || el.value == '')?'':',') + txt.value;
			}

			this.onCancelMonkeyId(event, args);
		},

		/**
		 * function triggered when user choose to skip the input of monkey id
		 * @param event
		 * @param args
		 */
		onCancelMonkeyId: function(event, args) {
			args.glue.addMonkeyId = false;
			aria.utils.Json.setValue(args.glue, 'refresh', !args.glue.refresh);
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