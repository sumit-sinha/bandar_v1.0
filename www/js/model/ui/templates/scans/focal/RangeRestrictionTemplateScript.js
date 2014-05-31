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
			this.data.timer = 600;
			this.data.behaviors = this.db.getMonkeyBehaviors();
			this.data.rrSession = this.moduleCtrl.getRRSessionData();

			if (this.data.rrSession == null) {
				this.data.timer = 600;
				this.data.rrSession = {};
			} else {

				if (this.data.rrSession.timer == null) {
					this.data.rrSession.timer = 600;
				}

				var timerInfo = this.utils.getTimerInfo();
				this.data.timer = this.data.rrSession.timer;
				timerInfo.timer = this.data.rrSession.timer;
			}

			// add tourist behaviors to list
			var touristBehaviors = this.db.getTouristBehaviors();
			for (var i = 0; i < touristBehaviors.length; i++) {
				this.data.behaviors.push(touristBehaviors[i]);
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

		/**
		 * function triggered when any behavior is clicked
		 * @param event
		 * @param args
		 */
		onBehaviorClick: function(event, args) {
			if (args.behavior != null) {
				var txtAreaEL = document.getElementById(this.$getId('BEHAVIOR_SEQUENCE_1'));
				if (txtAreaEL != null) {
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

			this.startTimer(event, args);
		},

		/**
		 * triggered when timer needs to start
		 * @param event
		 * @param args
		 */
		startTimer: function(event, args) {
			var currentPage = this;
			var timerInfo = this.utils.getTimerInfo();
			if (timerInfo.interval_focal == null) {

				this.startTime = this.utils.getCurrentTime();

				timerInfo = {
					interval_focal: setInterval(function() {
							if (timerInfo.timer <= 0) {
								clearInterval(timerInfo.interval_focal);
								timerInfo.timer = 1;
							}
								
							var btnEl = document.getElementById(currentPage.$getId("btnAddMore"));
							if (btnEl != null) {
								btnEl.innerHTML = 'Add and Reset (' + --timerInfo.timer + ')';
								
								if (currentPage.data != null) {
									currentPage.data.timer -= 1;
								}

								if (currentPage.data.timer == 15 
									|| (currentPage.data.timer <=5 && currentPage.data.timer >= 0)) {
									currentPage.utils.playBeep();
								}
							}
							
						}, 1000),
					timer: this.data.timer
				};

				this.utils.setTimerInfo(timerInfo);
			}
		},

		onFocalScanClick: function(event, args) {

			// save before navigation
			var input = this.utils.formToJson(document.getElementById(this.$getId('frmRange')));
			input.timer = this.data.timer;
			this.moduleCtrl.saveRRSessionData(input);

			// navigate to next page
			this.moduleCtrl.navigate(null, {
				pageRequest: {
					pageId: 'focalscan'
				}
			});
		},

		onTouristFocalScanClick: function(event, args) {

			// save before navigation
			var input = this.utils.formToJson(document.getElementById(this.$getId('frmRange')));
			input.timer = this.data.timer;
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

			this.data.errors.list = this.moduleCtrl.addRangeRestriction({
				'input': input
			});

			if (this.data.errors.list == null || this.data.errors.list.length == 0) {
				// reset fields
				var areaCodeEL= document.getElementById(this.$getId('AREA_CODE_1'));
				if (areaCodeEL != null) {
					areaCodeEL.value = '';
				}

				var monkeyIdEL= document.getElementById(this.$getId('MONKEY_ID_1'));
				if (monkeyIdEL != null) {
					monkeyIdEL.value = '';
				}

				var behaviourSeqEL= document.getElementById(this.$getId('BEHAVIOR_SEQUENCE_1'));
				if (behaviourSeqEL != null) {
					behaviourSeqEL.value = '';
				}
			}

			// show error
			this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);

			// refresh buttons
			this.$json.setValue(this.data, 'behavior_button_refresh', !this.data.behavior_button_refresh);
		},

		resetInput: function(event, args) {
			var el = document.getElementById(this.$getId(args.inputId));
			if (el != null) {
				if (args.innerHTML) {
					el.innerHTML = '';
				} else {
					el.value = '';
				}
			}
		}
	}
});