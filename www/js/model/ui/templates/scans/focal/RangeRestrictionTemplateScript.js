Aria.tplScriptDefinition({
	$classpath: 'model.ui.templates.scans.focal.RangeRestrictionTemplateScript',
	$dependencies: [
		'model.ui.utils.DataUtil',
		'model.ui.utils.ApplicationUtil'
	],
	$constructor: function() {
		this.db = model.ui.utils.DataUtil;
		this.utils = model.ui.utils.ApplicationUtil;
	},
	$destructor: function() {
		var timerInfo = this.utils.getTimerInfo();
		if (timerInfo.interval_focal != null) {
			this.utils.setTimerInfo(null);
			clearInterval(timerInfo.interval_focal);
		}
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
			this.data.behaviors = this.db.getMonkeyBehaviors();
			this.data.rrSession = this.moduleCtrl.getRRSessionData();

			if (this.data.rrSession == null || this.data.rrSession.startTime == null) {
				this.data.rrSession = {};
				this.startTime = this.utils.getCurrentTime();
			} else {
				this.startTime = this.data.rrSession.startTime;
				var timerInfo = this.utils.getTimerInfo();
				timerInfo.timer = this.data.rrSession.timer;
			}

			// add tourist behaviors to list
			var rrBehaviors = this.db.getRRBehaviors();
			for (var i = 0; i < rrBehaviors.length; i++) {
				this.data.behaviors.push(rrBehaviors[i]);
			}
		},

		dismissError: function(event, args) {
			this.data.errors.list = null;
			this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);
		},

		onFocalScanClick: function(event, args) {

			// serialize FORM to JSON
			var input = this.utils.formToJson(document.getElementById(this.$getId('frmRange')));
			input['startTime'] = this.startTime;
			input['endTime'] = this.utils.getCurrentTime();

			// save before navigation
			this.moduleCtrl.saveRRSessionData(input);

			this.data.errors.list = this.moduleCtrl.addRangeRestriction({
				'input': input
			});

			if (input.hasRange === "true" && this.data.errors.list != null && this.data.errors.list.length > 0) {
				// show error
				this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);
			} else {
				// navigate to next page
				this.moduleCtrl.navigate(null, {
					pageRequest: {
						pageId: 'focalscan'
					}
				});
			}
		},

		onTouristFocalScanClick: function(event, args) {

			// save before navigation
			var input = this.utils.formToJson(document.getElementById(this.$getId('frmRange')));
			input['startTime'] = this.startTime;
			input['endTime'] = this.utils.getCurrentTime();

			this.moduleCtrl.saveRRSessionData(input);

			// navigate to next page
			this.moduleCtrl.navigate(null, {
				pageRequest: {
					pageId: 'touristfocalscan'
				}
			});
		},

		onAddMore: function(event, args) {

			// serialize FORM to JSON
			var input = this.utils.formToJson(document.getElementById(this.$getId('frmRange')));
			input['startTime'] = this.startTime;
			input['endTime'] = this.utils.getCurrentTime();


			// save before navigation
			this.moduleCtrl.saveRRSessionData(input);

			this.data.errors.list = this.moduleCtrl.addRangeRestriction({
				'input': input
			});

			// check if crop guard is required
			if (input.hasRange === "true") {
				// show error
				this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);

				if (this.data.errors.list == null || this.data.errors.list == null || this.data.errors.list.length == 0) {

					// refresh buttons
					this.$json.setValue(this.data, 'behavior_button_refresh', !this.data.behavior_button_refresh);

					// navigate to next page
					this.moduleCtrl.navigate(null, {
						pageRequest: {
							pageId: 'focalscan'
						}
					});
				}
			} else {

				// navigate to next page
				this.moduleCtrl.navigate(null, {
					pageRequest: {
						pageId: 'focalscan'
					}
				});
			}
		}
	}
});