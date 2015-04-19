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
			this.data.timeStamps = [];
			this.data.behaviors = this.db.getMonkeyBehaviors();
			this.data.touristData = this.moduleCtrl.getTouristSessionData();

			this.data.timer = 60;

			// add tourist behaviors to list
			var touristBehaviors = this.db.getTouristBehaviors();
			for (var i = 0; i < touristBehaviors.length; i++) {
				this.data.behaviors.push(touristBehaviors[i]);
			}

			if (this.data.touristData == null) {
				this.data.touristData = {};
			}

			// indicates scan has started
			this.scanCount = 1;
			this.startTime = this.utils.getCurrentTime();
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
				timerInfo = {
					interval_focal: setInterval(function() {
							if (timerInfo.timer <= 0) {
								clearInterval(timerInfo.interval_focal);
								timerInfo.interval_focal = null;
								timerInfo.timer = 1;
							}
								
							var btnEl = document.getElementById(currentPage.$getId("btnScan"));
							if (btnEl != null) {
								btnEl.innerHTML = 'Scan (' + --timerInfo.timer + ')';
								
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

		dismissError: function(event, args) {
			this.data.errors.list = null;
			this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);
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
			input['scanCount'] = this.scanCount;
			
			this.data.errors.list = this.moduleCtrl.onFinalSave(input);
			if (this.data.errors.list == null || this.data.errors.list.length == 0) {
				// show success dialog
				this.data.timeStamps = [];
				
				this.data.timer = 0;
				this.utils.getTimerInfo().timer = 60;

				this.utils.showOverlay(false);
				this.$json.setValue(this.data, 'tourist_saved', true);

				this.scanCount = 1;
			} else {
				// show error
				this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);
			}
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

		onAddMore: function(event, args) {

			// serialize FORM to JSON
			var input = this.utils.formToJson(document.getElementById(this.$getId('frmTourist')));
			input['startTime'] = this.startTime;
			input['endTime'] = this.utils.getCurrentTime();
			input['behavior_timestamp'] = this.data.timeStamps;
				
			input['sameSession'] = true;
			input['scanCount'] = this.scanCount;
			if (args.reset) {
				input['scanCount'] = this.scanCount++;
			}

			this.data.errors.list = this.moduleCtrl.saveTouristScanData(input);
			if (this.data.errors.list == null || this.data.errors.list.length == 0) {

				var monkeyIdEL = document.getElementById(this.$getId('MONKEY_ID_1'));
				if (monkeyIdEL != null) {
					monkeyIdEL.value = '';
				}

				var behaviorEl = document.getElementById('BEHAVIOR_SEQUENCE_1');
				if (behaviorEl != null) {
					behaviorEl.value = '';
				}

				// show success dialog
				this.data.timeStamps = [];
				
				if (args.reset == true) {
					this.data.timer = 60;
					this.utils.getTimerInfo().timer = 60;

					this.startTimer(event, args);
				}

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