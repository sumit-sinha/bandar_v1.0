Aria.classDefinition({
	$classpath: 'model.ui.templates.manage.scans.TouristScanData',
	$constructor: function() {

	},
	$prototype: {

		/**
		 * function used to create a workbook for Group Scan
		 * @return String
		 */
		createTouristWorkBook: function(args) {
			var tsData = ['Date',
							'Observer', 
							'Group', 
							'Start Time', 
							'End Time', 
							'Total Time', 
							'Session', 
							'Session Total Time', 
							'T Den',
							'T Sex',
							'T Nat',
							'T Age',
							'T Feed',
							'T Agg',
							'T Attn',
							'Monkey Id',
							'H-Scratch',
							'K-Pick',
							'G-Groom',
							'T-Tourist Agg',
							'C-Con Agg',
							'U-Tour Thrt',
							'S-Con Thrt',
							'Yawn',
							'Prox Cntct',
							'Prox No Cntct',
							'Soc Grooming',
							'ID',
							'Being Groomed',
							'ID',
							'Notes'];

			// start work sheet
			var xmlContent = '<ss:Worksheet ss:Name="Tourist"><ss:Table>';

			// prepare header [START] */
			xmlContent += '<ss:Row>';
			for(var i = 0; i < tsData.length; i++){
				xmlContent += '<ss:Cell>'
									+ '<ss:Data ss:Type="String">' + tsData[i] + '</ss:Data>'
							+ '</ss:Cell>';
			}
			xmlContent += '</ss:Row>';
			// prepare header [ END ] */

			// prepare content [START] */
			for (var i = 0; i < args.list.length; i++) {
				var ts = args.list[i];

				var totalDuration = 0;
				for (var j = 0; j < ts.data.monkey.length; j++) {

					var monkey = ts.data.monkey[j];
					var timeArr = monkey.startTime.split('-');
					var startDate = new Date(timeArr[0], timeArr[1], timeArr[2], timeArr[3], timeArr[4], 0);
					
					timeArr = monkey.endTime.split('-');
					var endDate = new Date(timeArr[0], timeArr[1], timeArr[2], timeArr[3], timeArr[4], 0);

					totalDuration += (endDate.getTime() - startDate.getTime());
				}

				for (var j = 0; j < ts.data.monkey.length; j++) {
					var row = [];
					var behMap = {};
					var monkey = ts.data.monkey[j];
					var behaviors = monkey.behavior_seq.split('-');
					for (var k = 0; k < behaviors.length; k++) {
						
						var monkeyId = null;
						if (behaviors[k].indexOf('BG') == '0' 
								|| behaviors[k].indexOf('GO') == '0') {
							monkeyId = behaviors[k].substring(2);
							behaviors[k] = behaviors[k].substring(0,2);
						}

						if (behMap[behaviors[k]] != null) {
							behMap[behaviors[k]]++;
						} else {
							if (monkeyId == null) {
								behMap[behaviors[k]] = 1;
							} else {
								behMap[behaviors[k]] = monkeyId
							}
						}
					}

					if (j == 0) {
						row.push(ts.timeStamp.substring(6,8) + '-' + args.utils.numberToMonth({showShort: true, month: parseInt(ts.timeStamp.substring(4,6))}) + '-' + ts.timeStamp.substring(0,4)); // date
						row.push(args.user.code); // observer
						row.push(ts.group); // group
					} else {
						row.push('');
						row.push('');
						row.push('');
					}

					var timeArr = monkey.startTime.split('-');
					var startDate = new Date(timeArr[0], timeArr[1], timeArr[2], timeArr[3], timeArr[4], 0);
					row.push(timeArr[3] + ':' + timeArr[4]); // start time

					timeArr = monkey.endTime.split('-');
					var endDate = new Date(timeArr[0], timeArr[1], timeArr[2], timeArr[3], timeArr[4], 0);
					row.push(timeArr[3] + ':' + timeArr[4]); // end time

					row.push((endDate.getTime() - startDate.getTime())/(1000 * 60)); // total time
					if (j == 0) {
						row.push(ts.data.monkey.length); // Session
						row.push(totalDuration/(1000 * 60)); // Session Total Time
						row.push(ts.data.tourist.density); // TDen
						row.push(ts.data.tourist.gender); // TSex
						row.push(ts.data.tourist.nationality); // TNat
						row.push(ts.data.tourist.averageAge); // TAge
					} else {
						row.push('');
						row.push('');
						row.push('');
						row.push('');
						row.push('');
						row.push('');
					}

					row.push((behMap['TF'] != null)?behMap['TF']: 0); // Feed
					row.push((behMap['TA'] != null)?behMap['TA']: 0); // Aggrs
					row.push((behMap['TT'] != null)?behMap['TT']: 0); // Attn
					row.push(monkey.monkey_id); // monkey id

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
					if (j == 0) {
						row.push(ts.data.tourist.notes); // Notes
					} else {
						row.push('');
					}

					xmlContent += '<ss:Row>';
					for (var p = 0; p < row.length; p++) {
						xmlContent += '<ss:Cell>'
										+ '<ss:Data ss:Type="String">' + row[p] + '</ss:Data>'
									+ '</ss:Cell>';							
					}
					xmlContent += '</ss:Row>';
				}
			}
			// prepare content [ END ] */

			// close work sheet
			xmlContent += '</ss:Table></ss:Worksheet>'
			return xmlContent;
		}
	}
});