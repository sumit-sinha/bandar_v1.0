Aria.tplScriptDefinition({
	$classpath: 'model.ui.templates.manage.scans.ManageScansScript',
	$dependencies: [
		'model.ui.utils.ApplicationUtil',
		'model.ui.templates.manage.scans.GroupScanData',
		'model.ui.templates.manage.scans.TouristScanData',
		'model.ui.templates.manage.scans.FocalRangeScan',
		'model.ui.templates.manage.scans.FocalTouristScan',
		'model.ui.templates.manage.scans.RangeRestrictionData'
	],
	$constructor: function() {
		this.utils = model.ui.utils.ApplicationUtil;
	},
	$prototype: {

		$dataReady: function() {

			// init
			this.data.scans = {
				fs: [],
				rr: [],
				gs: [],
				ts: []
			}

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
		},

		/**
		 * function triggered when 'Export' button is clicked
		 * @param event
		 * @param args
		 */
		openButtonMenu: function(event, args) {
			var btnMenu = document.getElementById(this.$getId('btnMenu'));
			if (btnMenu != null) {
				if (btnMenu.className.indexOf('open') == -1) {
					btnMenu.className = 'btn-group open';
				} else {
					btnMenu.className = 'btn-group';
				}
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
				var content = JSON.stringify(aria.utils.Json.copy(user.groups), null, 4);
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
		 * function triggered when export to excel button is clicked
		 * @param event
		 * @param args
		 */
		onExportExcelClick: function(event, args) {
			
			var user = this.utils.getLoggedInUser();
			var gsData = new model.ui.templates.manage.scans.GroupScanData();
			var tsData = new model.ui.templates.manage.scans.TouristScanData();
			var fsRangeData = new model.ui.templates.manage.scans.FocalRangeScan();
			var rrData = new model.ui.templates.manage.scans.RangeRestrictionData();
			var fsTouristData = new model.ui.templates.manage.scans.FocalTouristScan();
			
			var xmlContent = '<?xml version="1.0"?><ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">'
			xmlContent += fsTouristData.createFsTouristWorkBook({
							user: user,
							list: this.data.scans.fs,
							utils: this.utils
						  });
			xmlContent += fsRangeData.createFsRangeWorkBook({
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
		}
	}
});