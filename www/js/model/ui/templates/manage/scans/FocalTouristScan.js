Aria.classDefinition({
	$classpath: 'model.ui.templates.manage.scans.FocalTouristScan',
	$constructor: function() {

	},
	$prototype: {

		/**
		 * function used to create a workbook for Focal Scan
		 * @return String
		 */
		createFsTouristWorkBook: function(args) {
			var fsData = ['Date',
							'Observer', 
							'Group', 
							'Monkey', 
							'Focal#', 
							'Start Time', 
							'End Time', 
							'Total Time', 
							'TDen', 
							'TSex', 
							'TNat', 
							'TAge', 
							'Tourist', 
							'T Feed',
							'T Aggrs',
							'T Tease',
							'T Attn',
							'Activity',
							'Food Item',
							'Locomotion',
							'Position',
							'SDB (stress)' 
							'T-Tourist Agg', 
							'C-ConAgg', 
							'ID', 
							'Approach T',
							'Approach C', 
							'ID', 
							'Leave T',
							'Leave C',
							'ID',
							'Sexual Beh',
							'Vocal',
							'Infant Rltd',
							'Food Rltd',
							'Affiliative',
							'Groomee',
							'ID',
							'Groomer',
							'ID',
							'Notes'];

			// start work sheet
			var xmlContent = '<ss:Worksheet ss:Name="Focal Tourist"><ss:Table>';

			// prepare header [START] */
			xmlContent += '<ss:Row>';
			for(var i = 0; i < fsData.length; i++){
				xmlContent += '<ss:Cell>'
									+ '<ss:Data ss:Type="String">' + fsData[i] + '</ss:Data>'
							+ '</ss:Cell>';
			}
			xmlContent += '</ss:Row>';
			// prepare header [ END ] */

			// prepare content [START] */
			var fsSavedData = this.__processFSData(args);
			for(var i = 0; i < fsSavedData.length; i++){
				for (var key in fsSavedData[i]) {
					if (fsSavedData[i].hasOwnProperty(key)) {
						xmlContent += '<ss:Row>';
						for (var j = 0; j < fsSavedData[i][key].length; j++) {
							xmlContent += '<ss:Cell>'
												+ '<ss:Data ss:Type="String">' + fsSavedData[i][key][j] + '</ss:Data>'
										+ '</ss:Cell>';							
						}
						xmlContent += '</ss:Row>';
					}
				}
			}
			
			// prepare content [ END ] */

			// close work sheet
			xmlContent += '</ss:Table></ss:Worksheet>'
			return xmlContent;
		},

		/**
		 * function used to process FS list
		 * @return Array
		 */
		__processFSData: function(args) {
			var output = [];
			for (var i = 0; i < args.list.length; i++) {
				var row = [];
				var fs = args.list[i];

				if (fs.data.range == null || fs.data.range.length == 0) {
					var behMap = {};
					var behaviors = fs.data.monkey.behavior_seq.split('-');
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

					row.push(fs.timeStamp.substring(6,8) + '-' + args.utils.numberToMonth({showShort: true, month: parseInt(fs.timeStamp.substring(4,6))}) + '-' + fs.timeStamp.substring(0,4)); // date
					row.push(args.user.code); // observer
					row.push(fs.group); // group
					row.push(fs.data.monkey.monkey_id); //monkey id
					row.push(fs.index + 1); // focal #

					var timeArr = fs.data.monkey.startTime.split('-');
					var startDate = new Date(timeArr[0], timeArr[1], timeArr[2], timeArr[3], timeArr[4], 0);
					row.push(timeArr[3] + ':' + timeArr[4]); // start time

					timeArr = fs.data.monkey.endTime.split('-');
					var endDate = new Date(timeArr[0], timeArr[1], timeArr[2], timeArr[3], timeArr[4], 0);
					row.push(timeArr[3] + ':' + timeArr[4]); // end time

					row.push((endDate.getTime() - startDate.getTime())/(1000 * 60)); // total time
					row.push(fs.data.tourist.density); // TDen
					row.push(fs.data.tourist.gender); // TSex
					row.push(fs.data.tourist.nationality); // TNat
					row.push(fs.data.tourist.averageAge); // TAge
					row.push((fs.data.tourist.hasTourist)?'1':'0'); // Tourist
					row.push((behMap['TF'] != null)?behMap['TF']: 0); // Feed
					row.push((behMap['TA'] != null)?behMap['TA']: 0); // Aggrs
					row.push((behMap['TT'] != null)?behMap['TT']: 0); // Attn
					row.push((fs.data.monkey.activity_code == 'F')?1: 0); // F-Foraging
					row.push((fs.data.monkey.activity_code == 'R')?1: 0); // R-Resting
					row.push((fs.data.monkey.activity_code == 'L')?1: 0); // L-Locomoting
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
					row.push((behMap['GO'] != null)?1: 0); // Soc Grooming
					row.push((behMap['GO'] != null)?behMap['GO']: 0);					
					row.push((behMap['BG'] != null)?1: 0); // Being Groomed
					row.push((behMap['BG'] != null)?behMap['BG']: 0); // Being Groomed Monkey Id
					row.push(fs.data.tourist.notes); // Notes

					// push to list
					output.push({i: row});
				}
			}

			return output;
		}		
	}
});