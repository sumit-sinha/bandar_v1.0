Aria.classDefinition({
	$classpath: 'model.ui.templates.manage.scans.RangeRestrictionData',
	$constructor: function() {

	},
	$prototype: {

		/**
		 * function used to create a workbook for Group Scan
		 * @return String
		 */
		createRRWorkBook: function(args) {
			var rrData = ['Date',
							'Observer', 
							'Group', 
							'Location', 
							'Type', 
							'Group Behavior', 
							'Session', 
							'Start Time', 
							'End Time',
							'Duration',
							'Monkey Id',
							'H-Scratch',
							'K-Pick',
							'G-Groom',
							'Tourist Agg',
							'Con Agg',
							'Tour Thrt',
							'Con Thrt',
							'Yawn',
							'Prox Cntct',
							'Prox NoCon',
							'Being Groomed',
							'ID',
							'Groom Other',
							'ID',
							'Notes'];

			// start work sheet
			var xmlContent = '<ss:Worksheet ss:Name="Range Restriction"><ss:Table>';

			// prepare header [START] */
			xmlContent += '<ss:Row>';
			for(var i = 0; i < rrData.length; i++){
				xmlContent += '<ss:Cell>'
									+ '<ss:Data ss:Type="String">' + rrData[i] + '</ss:Data>'
							+ '</ss:Cell>';
			}
			xmlContent += '</ss:Row>';
			// prepare header [ END ] */

			// prepare content [START] */
			for (var i = 0; i < args.list.length; i++) {
				var row = [];
				var rr = args.list[i];

				var behMap = {};
				var behaviors = rr.data.behavior_seq.split('-');
				for (var j = 0; j < behaviors.length; j++) {

					var monkeyId = null;
					if (behaviors[j].indexOf('BG') == '0' 
							|| behaviors[j].indexOf('GO') == '0') {
						monkeyId = behaviors[j].substring(2);
						behaviors[j] = behaviors[j].substring(0,2);
					}

					if (behMap[behaviors[j]] != null) {
						behMap[behaviors[j]]++;
					} else {
						if (monkeyId == null) {
							behMap[behaviors[j]] = 1;
						} else {
							behMap[behaviors[j]] = monkeyId
						}
					}
				}

				row.push(rr.timeStamp.substring(6,8) + '-' + args.utils.numberToMonth({showShort: true, month: parseInt(rr.timeStamp.substring(4,6))}) + '-' + rr.timeStamp.substring(0,4)); // date
				row.push(args.user.code); // observer
				row.push(rr.group); // group
				row.push(rr.data.area_code); // location
				row.push(rr.data.type_rr); // type
				row.push(rr.data.group_behavior); // group behavior
				row.push(1); // session

				var timeArr = rr.data.startTime.split('-');
				var startDate = new Date(timeArr[0], timeArr[1], timeArr[2], timeArr[3], timeArr[4], 0);
				row.push(timeArr[3] + ':' + timeArr[4]); // start time

				timeArr = rr.data.endTime.split('-');
				var endDate = new Date(timeArr[0], timeArr[1], timeArr[2], timeArr[3], timeArr[4], 0);
				row.push(timeArr[3] + ':' + timeArr[4]); // end time

				row.push((endDate.getTime() - startDate.getTime())/(1000 * 60)); // duration
				row.push(rr.data.monkey_id);
				row.push((behMap['H'] != null)?behMap['H']: 0); // H-Scratch
				row.push((behMap['P'] != null)?behMap['P']: 0); // P-Pick
				row.push((behMap['G'] != null)?behMap['G']: 0); // G-Groom

				row.push((behMap['AT'] != null)?behMap['AT']: 0); // AT-Tourist Aggrs
				row.push((behMap['AC'] != null)?behMap['AC']: 0); // Con Agg
				row.push((behMap['UT'] != null)?behMap['UT']: 0); // Tourist Thrt
				row.push((behMap['CT'] != null)?behMap['CT']: 0); // Con Thrt
				row.push((behMap['Y'] != null)?behMap['Y']: 0); // Yawn
				row.push((behMap['XC'] != null)?behMap['XC']: 0); // Prox Cntnt
				row.push((behMap['XN'] != null)?behMap['XN']: 0); // Prox No Cntnt
				row.push((behMap['BG'] != null)?1: 0); // Being Groomed
				row.push((behMap['BG'] != null)?behMap['BG']: 0); // Being Groomed Monkey Id
				row.push((behMap['GO'] != null)?1: 0); // Soc Grooming
				row.push((behMap['GO'] != null)?behMap['GO']: 0);					
				row.push(rr.data.notes); // Notes

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