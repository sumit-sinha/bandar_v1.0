Aria.classDefinition({
	$classpath: 'model.ui.templates.manage.scans.GroupScanData',
	$constructor: function() {

	},
	$prototype: {

		/**
		 * function used to create a workbook for Group Scan
		 * @return String
		 */
		createGroupWorkBook: function(args) {
			var gsData = ['Date',
							'Observer', 
							'Group', 
							'Time', 
							'Space', 
							'Activity', 
							'Tourist?', 
							'Tourist #', 
							'Notes'];

			// start work sheet
			var xmlContent = '<ss:Worksheet ss:Name="Group"><ss:Table>';

			// prepare header [START] */
			xmlContent += '<ss:Row>';
			for(var i = 0; i < gsData.length; i++){
				xmlContent += '<ss:Cell>'
									+ '<ss:Data ss:Type="String">' + gsData[i] + '</ss:Data>'
							+ '</ss:Cell>';
			}
			xmlContent += '</ss:Row>';
			// prepare header [ END ] */

			// prepare content [START] */
			for (var i = 0; i < args.list.length; i++) {
				var row = [];
				var gs = args.list[i];

				row.push(gs.timeStamp.substring(6,8) + '-' + args.utils.numberToMonth({showShort: true, month: parseInt(gs.timeStamp.substring(4,6))}) + '-' + gs.timeStamp.substring(0,4)); // date				
				row.push(args.user.code); // observer
				row.push(gs.group); // group
				
				timeArr = gs.data.endTime.split('-');
				row.push(timeArr[3] + ':' + timeArr[4] + ':' + timeArr[5]); // time

				row.push(gs.data.use_of_space); // space
				row.push(gs.data.activity_code); // activity
				row.push((gs.data.hasTourist)?1: 0); // Tourist?
				row.push((gs.data.no_of_tourist != null)?gs.data.no_of_tourist:0); // tourist #
				row.push(gs.data.notes); // notes

				xmlContent += '<ss:Row>';
				for (var j = 0; j < row.length; j++) {
					xmlContent += '<ss:Cell>'
									+ '<ss:Data ss:Type="String">' + row[j] + '</ss:Data>'
								+ '</ss:Cell>';							
				}
				xmlContent += '</ss:Row>';
			}
			// prepare content [ END ] */

			// close work sheet
			xmlContent += '</ss:Table></ss:Worksheet>'
			return xmlContent;
		}
	}
});