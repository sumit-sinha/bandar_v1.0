Aria.tplScriptDefinition({
	$classpath: 'model.ui.templates.scans.tourist.TouristDataTemplateScript',
	$dependencies: [
		'model.ui.utils.DataUtil',
		'model.ui.utils.ApplicationUtil'
	],
	$constructor: function() {
		this.db = model.ui.utils.DataUtil;
		this.utils = model.ui.utils.ApplicationUtil;
	},
	$prototype: {

		$dataReady: function() {

			if (this.data == null) {
				this.data = {};
			}

			this.data.errors = {
				list: null,
				error_occured: false
			}

			// init
			this.data.timeStamps = [];
			this.data.behaviors = this.db.getMonkeyBehaviors();
			this.data.touristData = this.moduleCtrl.getTouristSessionData();

			// add tourist behaviors to list
			var touristBehaviors = this.db.getTouristBehaviors();
			for (var i = 0; i < touristBehaviors.length; i++) {
				this.data.behaviors.push(touristBehaviors[i]);
			}

			if (this.data.touristData == null) {
				this.data.touristData = {};
			}

			// indicates scan has started
			this.startTime = this.utils.getCurrentTime();
		},

		dismissError: function(event, args) {
			this.data.errors.list = null;
			this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);
		},

		/**
		 * function triggered when any behavior is clicked
		 * @param event
		 * @param args
		 */
		onBehaviorClick: function(event, args) {
			if (args.behavior != null) {
				var txtAreaEL = document.getElementById(this.$getId('BEHAVIOR_SEQUENCE_1'));
				if (txtAreaEL != null) {
					this.data.timeStamps.push(this.utils.getCurrentTime());
					txtAreaEL.value += ((txtAreaEL.value != '')?'-':'') + args.behavior.code; 
				}

				if (args.behavior.properties != null 
						&& args.behavior.properties.allowed_click == 1) {
					var el = document.getElementById(event.target.getProperty('id'));
					if (el != null) {
						el.className += ' disabled';
					}
				}
			}
		},

		onTouristMScanClick: function() {

			// serailize form
			var input = this.utils.formToJson(document.getElementById(this.$getId('frmTourist')));

			// save data for prefilling
			this.moduleCtrl.saveTouristSessionData(input);

			// navigate to next page
			this.moduleCtrl.navigate(null, {
				pageRequest: {
					pageId: 'touristscant'
				}
			});
		},

		onScanOver: function(event, args) {
			var input = this.utils.formToJson(document.getElementById(this.$getId('frmTourist')));
			input['startTime'] = this.startTime;
			input['endTime'] = this.utils.getCurrentTime();
			input['behavior_timestamp'] = this.data.timeStamps;
			
			this.data.errors.list = this.moduleCtrl.onFinalSave(input);
			if (this.data.errors.list == null || this.data.errors.list.length == 0) {
				// show success dialog
				this.data.timeStamps = [];
				this.utils.showOverlay(false);
				this.$json.setValue(this.data, 'tourist_saved', true);
			} else {
				// show error
				this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);
			}
		},

		onAddMore: function(event, args) {

			// serialize FORM to JSON
			var input = this.utils.formToJson(document.getElementById(this.$getId('frmTourist')));
			input['startTime'] = this.startTime;
			input['endTime'] = this.utils.getCurrentTime();
			input['behavior_timestamp'] = this.data.timeStamps;

			this.data.errors.list = this.moduleCtrl.saveTouristScanData(input);
			if (this.data.errors.list == null || this.data.errors.list.length == 0) {

				var monkeyIdEL = document.getElementById(this.$getId('MONKEY_ID_1'));
				if (monkeyIdEL != null) {
					monkeyIdEL.value = '';
				}

				var behaviorEl = document.getElementById(this.$getId('BEHAVIOR_SEQUENCE_1'));
				if (behaviorEl != null) {
					behaviorEl.value = '';
				}

				this.data.timeStamps = [];
				this.startTime = this.utils.getCurrentTime();
			} else {
				// show error
				this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);
			}

			// refresh buttons
			this.$json.setValue(this.data, 'behavior_button_refresh', !this.data.behavior_button_refresh);
		},

		onModalTapEvent: function(event, args) {
			// navigate to next page
			this.moduleCtrl.navigate(null, {
				pageRequest: {
					pageId: 'touristscant'
				}
			});
		}
	}
});