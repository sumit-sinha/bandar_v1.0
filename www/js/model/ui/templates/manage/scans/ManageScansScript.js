Aria.tplScriptDefinition({
	$classpath: 'model.ui.templates.manage.scans.ManageScansScript',
	$dependencies: [
		'model.ui.utils.ApplicationUtil',
		'model.ui.templates.manage.scans.GroupScanData',
		'model.ui.templates.manage.scans.TouristScanData',
		'model.ui.templates.manage.scans.FocalTouristScan',
		'model.ui.templates.manage.scans.RangeRestrictionData',
		'model.ui.templates.manage.scans.TakeNoteData'
	],
	$constructor: function() {
		this.utils = model.ui.utils.ApplicationUtil;
	},
	$prototype: {

		/**
		 * initialize data
		 */
		initData: function() {
			// init
			this.data.scans = {
				fs: [],
				rr: [],
				gs: [],
				ts: []
			}

			this.data.file_exported = null;
		},

		$dataReady: function() {

			this.initData();

			// parse data
			var user = this.utils.getLoggedInUser();
			if (user.groups != null) {
				for (var key1 in user.groups) {
					if (user.groups.hasOwnProperty(key1)) {

						// iterate over days
						for (var key2 in user.groups[key1]) {
							if (user.groups[key1].hasOwnProperty(key2)) {

								// get all focal scans
								for (var i = 0; user.groups[key1][key2].FS != null && i < user.groups[key1][key2].FS.length; i++) {
									this.data.scans.fs.push({
										index: i,
										group: key1,
										timeStamp: key2,
										data: user.groups[key1][key2].FS[i],
										label: key1 + '-' + key2 + '-' + (i + 1)
									});
								}

								// get all focal scans
								for (var i = 0; user.groups[key1][key2].GS != null && i < user.groups[key1][key2].GS.length; i++) {
									this.data.scans.gs.push({
										index: i,
										group: key1,
										timeStamp: key2,
										data: user.groups[key1][key2].GS[i],
										label: key1 + '-' + key2 + '-' + (i + 1)
									});
								}

								// get all focal scans
								for (var i = 0; user.groups[key1][key2].RR != null && i < user.groups[key1][key2].RR.length; i++) {
									this.data.scans.rr.push({
										index: i,
										group: key1,
										timeStamp: key2,
										data: user.groups[key1][key2].RR[i],
										label: key1 + '-' + key2 + '-' + (i + 1)
									});
								}

								// get all focal scans
								for (var i = 0; user.groups[key1][key2].TS != null && i < user.groups[key1][key2].TS.length; i++) {
									this.data.scans.ts.push({
										index: i,
										group: key1,
										timeStamp: key2,
										data: user.groups[key1][key2].TS[i],
										label: key1 + '-' + key2 + '-' + (i + 1)
									});
								}
							}
						}
					}
				}
			}
		},

		/**
		 * function triggered when OK or cross button in overlay is clicked
		 * @param event
		 * @param args
		 */
		onCloseTap: function(event, args) {
			var modalEl = document.getElementById(this.$getId('success'));
			if (modalEl != null) {
				modalEl.style.display = 'none';
			}

			this.utils.hideOverlay();
		},

		/**
		 * function triggered when delete button is clicked
		 * @param event
		 * @param args
		 */
		onDeleteClick: function(event, args) {
			this.data.deleteObject = args;
			
			// show model dialog
			this.utils.showOverlay(false);
			var modalEL = document.getElementById(this.$getId('modalBox'));
			if (modalEL != null) {
				modalEL.style.display = 'block';
			}
		},

		/**
		 * function triggered when Yes button is clicked in modal
		 * @param event
		 * @param args
		 */
		onYesClick: function(event, args) {

			if (this.data.deleteObject != null 
				&& this.data.deleteObject.type != null 
				&& this.data.deleteObject.index > -1
				&& this.data.deleteObject.group != null
				&& this.data.deleteObject.timeStamp != null) {

				// parse data
				var user = this.utils.getLoggedInUser();
				if (user.groups != null) {
					// get list
					var groups = user.groups[this.data.deleteObject.group];
					if (groups != null) {
						var timeStamps = groups[this.data.deleteObject.timeStamp];
						if (timeStamps != null) {
							var list = timeStamps[this.data.deleteObject.type.toUpperCase()];
							if (list != null) {
								list.splice(this.data.deleteObject.index, 1);
							}
						}
					}
				}

				// delete general notes
				if (user.notes != null) {
					user.notes = null;
				}

				// add back to local storage
				var copiedUser = aria.utils.Json.copy(user);
				copiedUser.selectedGroup = null;
				localStorage.setItem(user.code, aria.utils.Json.convertToJsonString(copiedUser));

				// refresh and reset
				this.$dataReady();
				this.$refresh({
					section: this.data.deleteObject.type + 'Data'
				});
				this.utils.hideOverlay();
				this.data.deleteObject = null;

				var modalEL = document.getElementById(this.$getId('modalBox'));
				if (modalEL != null) {
					modalEL.style.display = 'none';
				}
			}
		},

		/**
		 * function triggered when No or Close button is clicked in modal
		 * @param event
		 * @param args
		 */
		onCloseEvent: function(event, args) {
			this.utils.hideOverlay();
			var modalEL = document.getElementById(this.$getId('modalBox'));
			if (modalEL != null) {
				modalEL.style.display = 'none';
			}

			modalEL = document.getElementById(this.$getId('modalDelAll'));
			if (modalEL != null) {
				modalEL.style.display = 'none';
			}
		},

		/**
		 * function triggered when toggle button is clicked
		 * @param event
		 * @param args
		 */
		onToggleClick: function(event, args) {
			var secEL = document.getElementById(this.$getId(args.child));
			if (secEL != null) {
				if (secEL.className.indexOf('in') != -1) {
					secEL.className = 'accordion-body collapse';
				} else {
					secEL.className = 'accordion-body collapse in';
				}
			}
		},

		/**
		 * function triggered when export to excel button is clicked
		 * @param event
		 * @param args
		 */
		onExportFileClick: function(event, args) {
			var user = this.utils.getLoggedInUser();
			
			if (user.groups != null) {
				var content = this.createFileContent();
				if (typeof file != 'undefined') {
					file.writeFile('exported_file.txt', content, 'file');
				} else {
					var a = document.createElement('a');
					a.href = 'data:text/plain,' + content;
					a.target = '_blank';
					a.download = 'exported_file.txt';

					document.body.appendChild(a);
					a.click();
				}
			}

			// show success popup
			this.utils.showOverlay();
			var modalEl = document.getElementById(this.$getId('success'));
			if (modalEl != null) {
				modalEl.style.display = 'block';
			}
			
			this.$json.setValue(this.data, 'file_exported', !this.data.file_exported);
		},

		/**
		 * creates the file content to be exported
		 */
		createFileContent: function() {
			var timeStampArr = [];
			if (this.data.scans.fs != null) {
				for (var i = 0; i < this.data.scans.fs.length; i++) {
					var fs = this.data.scans.fs[i];
					if (fs.data != null) {
						if (fs.data.monkey != null) {
							var behaviors = fs.data.monkey.behavior_seq.split('-');
							for (var j = 0; j < behaviors.length; j++) {

								var monkeyIds = [];
								var behavior = behaviors[j];

								if (behavior.indexOf(',') != '-1') {
									var entries = behavior.split(',');
									behavior = behavior.substring(0,2);
									for (var l = 1; l < entries.length; l++) {
										monkeyIds.push(entries[l]);
									}
								}

								var jsTime = fs.data.monkey.behavior_timestamp[j].split('-');
								var item = {
									time: new Date(jsTime[0],parseInt(jsTime[1]) + 1,jsTime[2],jsTime[3],jsTime[4],jsTime[5]),
									group: fs.group,
									monkeyId: monkeyIds,
									scan: 'FS',
									behavior: behavior				
								}

								timeStampArr.push(item);
							}
						}

						if (fs.data.range != null) {
							for (var k = 0; k < fs.data.monkey.length; k++) {
								var behaviors = fs.data.monkey[k].behavior_seq.split('-');
								for (var j = 0; j < behaviors.length; j++) {

									var monkeyIds = [];
									var behavior = behaviors[j];

									if (behavior.indexOf(',') != '-1') {
										var entries = behavior.split(',');
										behavior = behavior.substring(0,2);
										for (var l = 1; l < entries.length; l++) {
											monkeyIds.push(entries[l]);
										}
									}
									var jsTime = fs.data.monkey[k].behavior_timestamp[j].split('-');
									var item = {
										time: new Date(jsTime[0],parseInt(jsTime[1]) + 1,jsTime[2],jsTime[3],jsTime[4],jsTime[5]),
										group: fs.group,
										monkeyId: monkeyIds,
										scan: 'FS',
										behavior: behavior							
									}

									timeStampArr.push(item);
								}
							}
						}
					}
				}
			}

			if (this.data.scans.ts != null) {
				for (var i = 0; i < this.data.scans.ts.length; i++) {
					var ts = this.data.scans.ts[i];
					for (var k = 0; k < ts.data.monkey.length; k++) {
						var behaviors = ts.data.monkey[k].behavior_seq.split('-');
						for (var j = 0; j < behaviors.length; j++) {
							var monkeyIds = [];
							var behavior = behaviors[j];

							if (behavior.indexOf(',') != '-1') {
								var entries = behavior.split(',');
								behavior = behavior.substring(0,2);
								for (var l = 1; l < entries.length; l++) {
									monkeyIds.push(entries[l]);
								}
							}

							var jsTime = ts.data.monkey[k].behavior_timestamp[j].split('-');
							var item = {
								time: new Date(jsTime[0],parseInt(jsTime[1]) + 1,jsTime[2],jsTime[3],jsTime[4],jsTime[5]),
								group: ts.group,
								monkeyId: monkeyIds,
								scan: 'TS',
								behavior: behavior							
							}

							timeStampArr.push(item);
						}
					}			
				}
			}

			if (this.data.scans.rr != null) {
				for (var i = 0; i < this.data.scans.rr.length; i++) {
					var rr = this.data.scans.rr[i];
					var behaviors = rr.data.behavior_seq.split('-');
					for (var j = 0; j < behaviors.length; j++) {
						var monkeyIds = [];
						var behavior = behaviors[j];

						if (behavior.indexOf(',') != '-1') {
							var entries = behavior.split(',');
							behavior = behavior.substring(0,2);
							for (var l = 1; l < entries.length; l++) {
								monkeyIds.push(entries[l]);
							}
						}

						var jsTime = rr.data.behavior_timestamp[j].split('-');
						var item = {
							time: new Date(jsTime[0],parseInt(jsTime[1]) + 1,jsTime[2],jsTime[3],jsTime[4],jsTime[5]),
							group: rr.group,
							monkeyId: monkeyIds,
							scan: 'RR',
							behavior: behavior						
						}

						timeStampArr.push(item);
					}
				}			
			}

			// sort the array based on time
			for (var i = 0; i < timeStampArr.length; i++) {
				for (var j = i + 1; j < timeStampArr.length; j++) {

					var timeI = timeStampArr[i];
					var timeJ = timeStampArr[j];

					if (timeI.time.getTime() > timeJ.time.getTime()) {
						// swap elements
						var temp = {
							time: timeI.time,
							group: timeI.group,
							monkeyId: timeI.monkeyId,
							scan: timeI.scan,
							behavior: timeI.behavior
						};

						timeStampArr[i] = timeStampArr[j];
						timeStampArr[j] = temp;
					}
				}
			}

			// convert contents to text
			var content = 'time                  |  group |  monkey id    | scan   |  behavior\r\n';
			for (var i = 0; i < timeStampArr.length; i++) {
				
				var dt = timeStampArr[i].time;
				var dtString = dt.getFullYear() 
						+ ((dt.getMonth() < 10)?'/0':'/') + dt.getMonth() 
						+ ((dt.getDate() < 10)?'/0':'/') + dt.getDate()
						+ ((dt.getHours() < 10)?' 0':' ') + dt.getHours() 
						+ ((dt.getMinutes() < 10)?':0':':') + dt.getMinutes()
						+ ((dt.getSeconds() < 10)?':0':':') + dt.getSeconds();

				content += dtString;
				content += '    |  ';
				content += timeStampArr[i].group + '    |  ';
				content += timeStampArr[i].monkey_id + '    |  ';
				content += timeStampArr[i].scan + '    |  ';
				content += timeStampArr[i].behavior + '    |  \r\n';
			}

			return content;
		},

		/**
		 * function triggered when export to excel button is clicked
		 * @param event
		 * @param args
		 */
		onExportExcelClick: function(event, args) {
			
			var user = this.utils.getLoggedInUser();
			var gsData = new model.ui.templates.manage.scans.GroupScanData();
			var tsData = new model.ui.templates.manage.scans.TouristScanData();
			var rrData = new model.ui.templates.manage.scans.RangeRestrictionData();
			var fsTouristData = new model.ui.templates.manage.scans.FocalTouristScan();
			var noteData = new model.ui.templates.manage.scans.TakeNoteData();
			
			var xmlContent = '<?xml version="1.0"?><ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">'
			xmlContent += fsTouristData.createFsTouristWorkBook({
							user: user,
							list: this.data.scans.fs,
							utils: this.utils
						  });
			xmlContent += gsData.createGroupWorkBook({
							user: user,
							list: this.data.scans.gs,
							utils: this.utils
						  });
			xmlContent += tsData.createTouristWorkBook({
							user: user,
							list: this.data.scans.ts,
							utils: this.utils
						  });
			xmlContent += rrData.createRRWorkBook({
							user: user,
							list: this.data.scans.rr,
							utils: this.utils
						  });
			xmlContent += noteData.createNoteWorkBook({
							user: user,
							list: user.notes,
							utils: this.utils
						  });
			
			xmlContent += '</ss:Workbook>';

			if (typeof file != 'undefined') {
				file.writeFile('exported_excel.xml', xmlContent, 'worksheet');
			} else {
				var a = document.createElement('a');
				a.href = 'data:application/xhtml+xml,' + xmlContent;
				a.target = '_blank';
				a.download = 'exported_excel.xml';

				document.body.appendChild(a);
				a.click();
			}

			// show success popup
			this.utils.showOverlay();
			var modalEl = document.getElementById(this.$getId('success'));
			if (modalEl != null) {
				modalEl.style.display = 'block';
			}
			
			this.$json.setValue(this.data, 'file_exported', !this.data.file_exported);
		},

		/**
		 * clears all the data from storage
		 * @param args
		 * @param event
		 */
		clearAll: function(event, args) {
			// show model dialog
			this.utils.showOverlay(false);
			var modalEL = document.getElementById(this.$getId('modalDelAll'));
			if (modalEL != null) {
				modalEL.style.display = 'block';
			}	
		},

		onDeleteAllClick: function(event, args) {
			// parse data
			var user = this.utils.getLoggedInUser();
			user.groups = null;

			// add back to local storage
			var copiedUser = aria.utils.Json.copy(user);
			copiedUser.selectedGroup = null;
			localStorage.setItem(user.code, aria.utils.Json.convertToJsonString(copiedUser));

			// refresh
			this.initData();
			this.onCloseEvent(event, args);
			this.$refresh({section: 'showData'});
		}
	}
});