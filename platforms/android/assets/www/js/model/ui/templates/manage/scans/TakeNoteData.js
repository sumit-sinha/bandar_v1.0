Aria.classDefinition({
	$classpath: 'model.ui.templates.manage.scans.TakeNoteData',
	$constructor: function() {

	},
	$prototype: {

		/**
		 * function used to create a workbook for Notes
		 * @return String
		 */
		createNoteWorkBook: function(args) {
			var noteData = ['Observer',
							'Start Time',
							'End Time',
							'Total Time(s)',
							'Notes'];

			// start work sheet
			var xmlContent = '<ss:Worksheet ss:Name="General Notes"><ss:Table>';

			// prepare header [START] */
			xmlContent += '<ss:Row>';
			for(var i = 0; i < noteData.length; i++){
				xmlContent += '<ss:Cell>'
									+ '<ss:Data ss:Type="String">' + noteData[i] + '</ss:Data>'
							+ '</ss:Cell>';
			}
			xmlContent += '</ss:Row>';
			// prepare header [ END ] */

			// prepare content [START] */
			var notesSavedData = this._processNoteData(args);
			for(var i = 0; i < notesSavedData.length; i++){
				xmlContent += '<ss:Row>';
				for (var j = 0; j < notesSavedData[i].length; j++) {
						xmlContent += '<ss:Cell>'
										+ '<ss:Data ss:Type="String">' + notesSavedData[i][j] + '</ss:Data>'
									+ '</ss:Cell>';
				}
				xmlContent += '</ss:Row>';
			}
			
			// prepare content [ END ] */

			// close work sheet
			xmlContent += '</ss:Table></ss:Worksheet>'
			return xmlContent;
		},

		/**
		 * function used to process notes list
		 * @return Array
		 */
		_processNoteData: function(args) {
			var output = [];
			for (var i = 0; i < args.list.length; i++) {
				var row = [];
				row.push(args.user.code); // observer

				var timeArr = args.list[i].startTime.split('-');
				var startDate = new Date(timeArr[0], timeArr[1], timeArr[2], timeArr[3], timeArr[4], timeArr[5]);
				row.push(timeArr[3] + ':' + timeArr[4] + ':' + timeArr[5]); // start time

				timeArr = args.list[i].endTime.split('-');
				var endDate = new Date(timeArr[0], timeArr[1], timeArr[2], timeArr[3], timeArr[4], timeArr[5]);
				row.push(timeArr[3] + ':' + timeArr[4] + ':' + timeArr[5]); // end time

				row.push((endDate.getTime() - startDate.getTime())/1000); // total time
				row.push(args.list[i].notes);

				output.push(row);
			}

			return output;
		}
	}
});