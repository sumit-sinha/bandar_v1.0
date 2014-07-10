Aria.classDefinition({
	$classpath: 'model.ui.utils.ApplicationUtil',
	$singleton: true,
	$prototype: {

		/**
		 * returns a JSON which contains the timer information
		 * @return JSON
		 */
		getTimerInfo: function() {
			var appData = pageEngine.getData().appData;
			if (appData.timer == null) {
				appData.timer = {};
			}

			return appData.timer;
		},

		/**
		 * plays a beep sound
		 */
		playBeep: function() {
  			if (typeof audio != 'undefined') {
  				audio.playAudio("www/media/beep.mp3");
  			}
		},

		/**
		 * set a JSON which contains the timer information
		 * @param JSON
		 */
		setTimerInfo: function(timer) {
			var appData = pageEngine.getData().appData;
			appData.timer = timer;
		},

		/**
		 * returns string equivalent for month
		 * @param args
		 * @return string
		 */
		numberToMonth: function(args) {
			var month = '';
			switch (args.month) {
				case 0:
					month = 'January';
					break;
				case 1:
					month = 'February';
					break;
				case 2:
					month = 'March';
					break;
				case 3:
					month = 'April';
					break;
				case 4:
					month = 'May';
					break;
				case 5:
					month = 'June';
					break;
				case 6:
					month = 'July';
					break;
				case 7:
					month = 'August';
					break;
				case 8:
					month = 'September';
					break;
				case 9:
					month = 'October';
					break;
				case 10:
					month = 'November';
					break;
				case 11:
					month = 'December';
					break;
				default:
					month = 'January';
					break;
			}

			if (args.showShort) {
				return month.substring(0,3);
			}

			return month;
		},

		/**
		 * displays the overlay
		 * @param loading Boolean, if true displays the loading icon
		 */
		showOverlay: function(loading) {
			var mskEls = document.getElementsByClassName('msk');
			for (var i = 0; i < mskEls.length; i++) {
				mskEls[i].className = 'msk';
				if (loading) {
					mskEls[i].className += ' loading';
				}
			}
		},

		/**
		 * hides the overlay
		 */
		hideOverlay: function() {
			var mskEls = document.getElementsByClassName('msk');
			for (var i = 0; i < mskEls.length; i++) {
				mskEls[i].className = 'msk loading hidden';
			}
		},

		/**
		 * checks if user is logged in or not
		 * if logged in then return true else false
		 * @return Boolean true or false
		 */
		isLoggedIn: function() {
			var appData = pageEngine.getData().appData;
			if (!aria.utils.Object.isEmpty(appData['user'])) {
				if (localStorage.getItem('logged_in') == null) {
					localStorage.setItem('logged_in', appData['user'].code);
				}

				return true;
			}

			return false;
		},

		/**
		 * returns the current logged in user
		 */
		getLoggedInUser: function() {
			var appData = pageEngine.getData().appData;
			if (!aria.utils.Object.isEmpty(appData['user'])) {
				return appData['user'];
			}

			return null;
		},

		/**
		 * returns the current date in format yyyyMMdd
		 */
		getTimeStamp: function() {
			var dt = new Date();
			return dt.getFullYear() 
					+ ((dt.getMonth() < 10)?'0':'') + dt.getMonth() 
					+ ((dt.getDate() < 10)?'0':'') + dt.getDate();
		},

		/**
		 * returns the current date in format yyyyMMdd
		 */
		getCurrentTime: function() {
			var dt = new Date();
			return dt.getFullYear() 
					+ ((dt.getMonth() < 10)?'-0':'-') + dt.getMonth() 
					+ ((dt.getDate() < 10)?'-0':'-') + dt.getDate()
					+ ((dt.getHours() < 10)?'-0':'-') + dt.getHours() 
					+ ((dt.getMinutes() < 10)?'-0':'-') + dt.getMinutes()
					+ ((dt.getSeconds() < 10)?'-0':'-') + dt.getSeconds();
		},

		/**
		 * creates a copy of JSON
		 * @param input JSON to be copied
		 */
		duplicateJSON: function(input) {
			
			if (input == null) {
				return null;
			}

			var duplicate = {};
			for (var key in input) {
				if (input.hasOwnProperty(key) && key != 'aria:parent') {
					duplicate[key] = input[key];
				}
			}

			return duplicate;
		},

		/**
		 * converts a form to JSON object
		 * @param form DOM element
		 */
		formToJson: function(form) {
			var output = {};
			var params = this.serialize(form);
			var parameters = params.split('&');
			for (var i = 0; i < parameters.length; i++) {
				var keyValue = parameters[i].split('=');
				output[keyValue[0]] = keyValue[1];
			}

			return output;
		},

		/**
		 * method used to serialize a form
		 * @param form DOM element
		 */
		serialize: function(form) {
			
			if (!form || form.nodeName !== "FORM") {
				return;
			}
			var i, j, q = [];
			for (i = form.elements.length - 1; i >= 0; i = i - 1) {
				if (form.elements[i].name === "") {
					continue;
				}
				switch (form.elements[i].nodeName) {
				case 'INPUT':
					switch (form.elements[i].type) {
					case 'text':
					case 'hidden':
					case 'password':
					case 'button':
					case 'reset':
					case 'submit':
						q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
						break;
					case 'checkbox':
					case 'radio':
						if (form.elements[i].checked) {
							q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
						}						
						break;
					case 'file':
						break;
					}
					break;			 
				case 'TEXTAREA':
					q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
					break;
				case 'SELECT':
					switch (form.elements[i].type) {
					case 'select-one':
						q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
						break;
					case 'select-multiple':
						for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
							if (form.elements[i].options[j].selected) {
								q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
							}
						}
						break;
					}
					break;
				case 'BUTTON':
					switch (form.elements[i].type) {
					case 'reset':
					case 'submit':
					case 'button':
						q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
						break;
					}
					break;
				}
			}
			return q.join("&");
		},

		/**
		 * if current logged in user has no group information attached then initliate that
		 * @param event
		 * @param args
		 */
		initUserData: function(event, args) {

			if (args.user.groups == null) {
				args.user.groups = {};
			}

			if (args.user.groups[args.user.selectedGroup] == null) {
				args.user.groups[args.user.selectedGroup] = {};
				args.user.groups[args.user.selectedGroup][args.timeStamp] = {
					'FS': [],
					'GS': [],
					'TS': [],
					'RR': []
				}
			}

			if (args.user.groups[args.user.selectedGroup][args.timeStamp] == null) {
				args.user.groups[args.user.selectedGroup][args.timeStamp] = {
					'FS': [],
					'GS': [],
					'TS': [],
					'RR': []
				}
			}

			return args.user;
		}
	}
});