Aria.tplScriptDefinition({
	$classpath: 'model.ui.templates.scans.focal.FocalDataTemplateScript',
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
			this.data.focalData = this.moduleCtrl.getFocalSessionData();

			// add tourist behaviors to list
			var touristBehaviors = this.db.getTouristBehaviors();
			for (var i = 0; i < touristBehaviors.length; i++) {
				this.data.behaviors.push(touristBehaviors[i]);
			}

			if (aria.utils.Object.isEmpty(this.data.focalData)) {
				this.data.timer = 120;
				this.data.timeStamps = [];
				this.data.focalData = {};
			} else {

				if (this.data.focalData.timer == null) {
					this.data.focalData.timer = 120;
				}

				if (this.data.focalData.behavior_timestamp == null) {
					this.data.timeStamps = [];
				}

				var timerInfo = this.utils.getTimerInfo();
				this.data.timer = this.data.focalData.timer;
				timerInfo.timer = this.data.focalData.timer;
				this.data.timeStamps = this.data.focalData.behavior_timestamp;

				if (this.data.timer != 120) {
					this.data.paused = true;
				}

				// set start time
				this.startTime = this.data.focalData.startTime;
			}
		},

		onContinueClick: function(event, args) {
			this.startTimer(event, args);
			this.$json.setValue(this.data, 'paused', false);
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
			// set timestamp for each behavior
			this.data.timeStamps.push(this.utils.getCurrentTime());
			this.startTimer(event, args);
		},

		/**
		 * triggered when timer need to start
		 * @param event
		 * @param args
		 */
		startTimer: function(event, args) {
			var currentPage = this;
			var timerInfo = this.utils.getTimerInfo();
			if (timerInfo.interval_focal == null) {

				// set start time
				if (this.startTime == null) {
					this.startTime = this.utils.getCurrentTime();
				}

				timerInfo = {
					interval_focal: setInterval(function() {
							if (timerInfo.timer <= 0) {
								clearInterval(timerInfo.interval_focal);
								timerInfo.timer = 1;
							}
								
							var btnEl = document.getElementById(currentPage.$getId("btnSave"));
							if (btnEl != null) {
								btnEl.innerHTML = 'Save (' + --timerInfo.timer + ')';
								
								if (currentPage.data != null) {
									currentPage.data.timer -= 1;
								}

								if (currentPage.data.timer == 15 
									|| (currentPage.data.timer <=5 && currentPage.data.timer >= 0)) {
									currentPage.utils.playBeep();
								}
							}

							// if continue button is visible
							if (currentPage.data.paused == true) {
								currentPage.$json.setValue(this.data, 'paused', false);
							}
							
						}, 1000),
					timer: this.data.timer
				};

				this.utils.setTimerInfo(timerInfo);
			}
		},

		onTouristFocalScanClick: function() {

			// serailize form
			var input = this.utils.formToJson(document.getElementById(this.$getId('frmFocal')));
			input.timer = this.data.timer;
			input.startTime = this.startTime;
			input['behavior_timestamp'] = this.data.timeStamps;

			// save data for prefilling
			this.moduleCtrl.saveFocalSessionData(input);

			// navigate to next page
			this.moduleCtrl.navigate(null, {
				pageRequest: {
					pageId: 'touristfocalscan'
				}
			});
		},

		onRRFocalScanClick: function(event, args) {
			// serailize form
			var input = this.utils.formToJson(document.getElementById(this.$getId('frmFocal')));
			input.timer = this.data.timer;
			input.startTime = this.startTime;
			input['behavior_timestamp'] = this.data.timeStamps;

			// save data for prefilling
			this.moduleCtrl.saveFocalSessionData(input);

			// navigate to next page
			this.moduleCtrl.navigate(null, {
				pageRequest: {
					pageId: 'rangerestrfocal'
				}
			});
		},

		onScanOver: function(event, args) {

			// serialize FORM to JSON
			var input = this.utils.formToJson(document.getElementById(this.$getId('frmFocal')));
			input['startTime'] = this.startTime;
			input['endTime'] = this.utils.getCurrentTime();
			input['behavior_timestamp'] = this.data.timeStamps;
			input['totalTime'] = 120 - this.data.timer;
			
			this.data.errors.list = this.moduleCtrl.saveFocalData(input);
			if (this.data.errors.list == null || this.data.errors.list.length == 0) {
				
				// reset timer
				this.data.timer = 0;
				this.utils.getTimerInfo().timer = 0;

				// show success dialog
				this.utils.showOverlay(false);
				this.$json.setValue(this.data, 'focal_saved', true);
			} else {
				// show error
				this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);
			}
		},

		onModalTapEvent: function(event, args) {
			// navigate to next page
			this.moduleCtrl.navigate(null, {
				pageRequest: {
					pageId: 'touristfocalscan'
				}
			});
		}
	}
});