Aria.tplScriptDefinition({
	$classpath: 'model.ui.templates.scans.range.RangeRestrictionTemplateScript',
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
			this.data.timeStamps = [];
			this.data.behaviors = this.db.getMonkeyBehaviors();

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
			// set timestamp for each behavior
			this.data.timeStamps.push(this.utils.getCurrentTime());
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
							
						}, 1000),
					timer: this.data.timer
				};

				this.utils.setTimerInfo(timerInfo);
			}
		},

		onAddMore: function(event, args) {

			// serialize FORM to JSON
			var input = this.utils.formToJson(document.getElementById(this.$getId('frmRange')));
			input['startTime'] = this.startTime;
			input['endTime'] = this.utils.getCurrentTime();
			input['behavior_timestamp'] = this.data.timeStamps;

			this.data.errors.list = this.moduleCtrl.addRangeRestriction(event, {
				'input': input
			});

			if (this.data.errors.list == null || this.data.errors.list.length == 0) {

				var monkeyIdEL= document.getElementById(this.$getId('MONKEY_ID_1'));
				if (monkeyIdEL != null) {
					monkeyIdEL.value = '';
				}

				var behaviourSeqEL= document.getElementById('BEHAVIOR_SEQUENCE_1');
				if (behaviourSeqEL != null) {
					behaviourSeqEL.value = '';
				}

				// refresh buttons
				this.$json.setValue(this.data, 'behavior_button_refresh', !this.data.behavior_button_refresh);
				this.data.timeStamps = [];
			}

			// show error
			this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);
		},

		onScanOver: function(event, args) {

			// serialize FORM to JSON
			var input = this.utils.formToJson(document.getElementById(this.$getId('frmRange')));
			input['startTime'] = this.startTime;
			input['endTime'] = this.utils.getCurrentTime();
			input['behavior_timestamp'] = this.data.timeStamps;
			
			this.data.errors.list = this.moduleCtrl.addFinalRangeRestriction(event, {
				'input': input
			});

			if (this.data.errors.list == null || this.data.errors.list.length == 0) {
				// reset timer
				this.data.timer = 0;
				this.utils.getTimerInfo().timer = 0;

				// show success dialog
				this.utils.showOverlay(false);
				this.$json.setValue(this.data, 'rr_saved', true);
				this.data.timeStamps = [];
			}

			// show error
			this.$json.setValue(this.data.errors, 'error_occured', !this.data.errors.error_occured);
		},

		onModalTapEvent: function(event, args) {
			// reset page
			this.resetInput(event, {
				inputId: 'RR_TYPE',
				value: true
			});


			this.resetInput(event, {
				inputId: 'AREA_CODE_1',
				value: true
			});

			this.resetInput(event, {
				inputId: 'NOTES_1',
				value: true
			});

			this.resetInput(event, {
				inputId: 'GRP_BEHAV',
				value: true
			});


			this.resetInput(event, {
				inputId: 'MONKEY_ID_1',
				value: true
			});

			this.resetInput(event, {
				inputId: 'BEHAVIOR_SEQUENCE_1',
				value: true,
				absoluteId: true
			});

			this.data.timer = 120;
			var el = document.getElementById(this.$getId('btnSave'));
			if (el != null) {
				el.innerHTML = 'Save (' + this.data.timer + ')';
			}

			var timerInfo = this.utils.getTimerInfo();
			clearInterval(timerInfo.interval_focal);
			timerInfo.interval_focal = null;

			// remove modal
			this.utils.hideOverlay();
			this.$refresh({
				outputSection: 'success'
			});
		},

		resetInput: function(event, args) {
			var id = args.inputId;
			if (!args.absoluteId) {
				id = this.$getId(args.inputId);
			}
			
			var el = document.getElementById(id);
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