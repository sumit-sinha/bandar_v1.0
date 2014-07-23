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
							'T Tease',
							'T Attn',
							'Monkey Id',
							'Behavior Time',
							'SDB (Stress)',
							'Tourist Agg',
							'Con Agg',
							'ID',
							'Yawn',
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
							'MNP Social',
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
			var count = 0;
			for (var i = 0; i < args.list.length; i++) {
				var ts = args.list[i];

				var totalDuration = 0;
				for (var j = 0; j < ts.data.monkey.length; j++) {

					var monkey = ts.data.monkey[j];
					var timeArr = monkey.startTime.split('-');
					var startDate = new Date(timeArr[0], timeArr[1], timeArr[2], timeArr[3], timeArr[4], 0);
					
					timeArr = monkey.endTime.split('-');
					var endDate = new Date(timeArr[0], timeArr[1], timeArr[2], timeArr[3], timeArr[4], 0);

					totalDuration = (endDate.getTime() - startDate.getTime())/1000;
					var totalMinutes = totalDuration % 60;
					var totalSeconds = totalDuration - (60 * totalMinutes);
					totalDuration = ((totalMinutes < 10)?'0':'') + totalMinutes + ':' + ((totalSeconds < 10)?'0':'') + totalSeconds;
				}

				for (var j = 0; j < ts.data.monkey.length; j++) {

					var monkey = ts.data.monkey[j];
					var behaviors = monkey.behavior_seq.split('-');
					for (var k = 0; k < behaviors.length; k++) {
						
						var row = [];
						var monkeyIds = [];
						var behavior = behaviors[k];

						if (behavior.indexOf(',') != '-1') {
							var entries = behavior.split(',');
							behavior = behavior.substring(0,2);
							for (var l = 1; l < entries.length; l++) {
								monkeyIds.push(entries[l]);
							}
						}

						row = this._getRowData(row, {
							ts: ts,
							totalDuration: totalDuration,
							monkey: monkey,
							utils: args.utils,
							user: args.user,
							behavior: behavior,
							monkeyIds: monkeyIds,
							behavior_timestamp: monkey.behavior_timestamp[k]
						});

						xmlContent += '<ss:Row>';
						for (var p = 0; p < row.length; p++) {
							xmlContent += '<ss:Cell>'
											+ '<ss:Data ss:Type="String">' + row[p] + '</ss:Data>'
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

		_getRowData: function(row, args) {
			row.push(args.ts.timeStamp.substring(6,8) + '-' + args.utils.numberToMonth({showShort: true, month: parseInt(args.ts.timeStamp.substring(4,6))}) + '-' + args.ts.timeStamp.substring(0,4)); // date
			row.push(args.user.code); // observer
			row.push(args.ts.group); // group

			var timeArr = args.monkey.startTime.split('-');
			var startDate = new Date(timeArr[0], timeArr[1], timeArr[2], timeArr[3], timeArr[4], timeArr[5]);
			row.push(timeArr[3] + ':' + timeArr[4] + ':' + timeArr[5]); // start time

			timeArr = args.monkey.endTime.split('-');
			var endDate = new Date(timeArr[0], timeArr[1], timeArr[2], timeArr[3], timeArr[4], timeArr[5]);
			row.push(timeArr[3] + ':' + timeArr[4] + ':' + timeArr[5]); // end time

			var totalTime = (endDate.getTime() - startDate.getTime())/1000;
			var totalSeconds = totalTime % 60;
			var totalMinutes = (totalTime - totalSeconds)/60;
			totalTime = ((totalMinutes < 10)?'0':'') + totalMinutes + ':' + ((totalSeconds < 10)?'0':'') + totalSeconds;
			row.push(totalTime); // total time

			row.push(args.ts.data.monkey.length); // Session
			row.push(args.totalDuration); // Session Total Time
			row.push(args.ts.data.tourist.density); // TDen
			row.push(args.ts.data.tourist.gender); // TSex
			row.push(args.ts.data.tourist.nationality); // TNat
			row.push(args.ts.data.tourist.averageAge); // TAge

			row.push(args.behavior == 'tf'?1: 0); // Feed
			row.push(args.behavior == 'ta'?1: 0); // Aggrs
			row.push(args.behavior == 'tt'?1: 0); // Tease
			row.push(args.behavior == 'tn'?1: 0); // Attn
			row.push(args.monkey.monkey_id); // monkey id

			timeArr = args.behavior_timestamp.split('-');
			row.push(timeArr[3] + ':' + timeArr[4] + ':' + timeArr[5]); // Behavior time

			// get all stress activities
			var stress = '';
			var stresses = ['yg','ys'];
			for (var l = 0; l < stresses.length; l++) {
				if (args.behavior == stresses[l]) {
					stress += ((stress != '')?',':'') + stresses[l];
				}
			}

			row.push(stress); // SDB (stress)

			// get all tourist agg behaviours
			var touristOrConBehAdded = false;
			var touristAgg = '';
			var touristAggs = ['at','ac','ab','ak','au','ap','ar','a0','ai'];
			for (var l = 0; l < touristAggs.length; l++) {
				if (args.behavior == touristAggs[l]) {
					touristOrConBehAdded = true;
					touristAgg += ((touristAgg != '')?',':'') + touristAggs[l];
				}
			}
			row.push(touristAgg); // Tourist Agg

			// get all con agg behaviours
			var conAgg = '';
			var conAggs = ['at','ad','ac','ab','ak','au','ap','ar','al','as','av','ae','a0','ai'];
			for (var l = 0; l < conAggs.length; l++) {
				if (args.behavior == conAggs[l]) {
					touristOrConBehAdded = true;
					conAgg += ((conAgg != '')?',':'') + conAggs[l];
				}
			}

			row.push(conAgg); // Con Agg
			row.push(touristOrConBehAdded?args.monkeyIds:''); // ID
			row.push((args.behavior == 'yy')?'yy': ''); // Yawn

			var approached = false;
			if (args.behavior == 'tda') {
				approached = true;
				row.push('tda'); // Approach T
			} else {
				row.push('');
			}

			if (args.behavior == 'da') {
				approached = true;
				row.push('da'); // Approach C
			} else {
				row.push('');
			}

			if (approached) {
				row.push(args.monkeyIds); // ID
			} else {
				row.push('');
			}

			var left = false;
			if (args.behavior == 'tla') {
				left = true;
				row.push('tla'); // Leave T
			} else {
				row.push('');
			}

			if (args.behavior == 'la') {
				left = true;
				row.push('la'); // Leave C
			} else {
				row.push('');
			}

			if (left) {
				row.push(args.monkeyIds); // ID
			} else {
				row.push('');
			}

			// get all sexual behaviours
			var sexualBehaviour = '';
			var sexualBehaviours = ['sp','sa','so','si','sm','sj','sb','s','st','sr'];
			for (var l = 0; l < sexualBehaviours.length; l++) {
				if (args.behavior == sexualBehaviours[l]) {
					sexualBehaviour += ((sexualBehaviour != '')?',':'') + sexualBehaviours[l];
				}
			}
			row.push(sexualBehaviour);

			// get all vocal behaviours
			var vocalBehaviour = '';
			var vocalBehaviours = ['vs','vw','vf','vm','vl'];
			for (var l = 0; l < vocalBehaviours.length; l++) {
				if (args.behavior == vocalBehaviours[l]) {
					vocalBehaviour += ((vocalBehaviour != '')?',':'') + vocalBehaviours[l];
				}
			}
			row.push(vocalBehaviour);

			// get all infant related behaviours
			var infntRelBehaviour = '';
			var infntRelBehaviours = ['ct','ce','cp','cm'];
			for (var l = 0; l < infntRelBehaviours.length; l++) {
				if (args.behavior == infntRelBehaviours[l]) {
					infntRelBehaviour += ((infntRelBehaviour != '')?',':'') + infntRelBehaviours[l];
				}
			}
			row.push(infntRelBehaviour);

			// get all food related behaviours
			var foodBehaviour = '';
			var foodBehaviours = ['ih','ii','ir','id','iw','pr'];
			for (var l = 0; l < foodBehaviours.length; l++) {
				if (args.behavior == foodBehaviours[l]) {
					foodBehaviour += ((foodBehaviour != '')?',':'') + foodBehaviours[l];
				}
			}
			row.push(foodBehaviour);

			// get all affiliative behaviours
			var afflBehaviour = '';
			var afflBehaviours = ['fa','fp','fe','fx','fg','fm','f0'];
			for (var l = 0; l < afflBehaviours.length; l++) {
				if (args.behavior == afflBehaviours[l]) {
					afflBehaviour += ((afflBehaviour != '')?',':'') + afflBehaviours[l];
				}
			}
			row.push(afflBehaviour);

			if (args.behavior == 'mse') {
				row.push('ms');
				row.push(args.monkeyIds);
			} else {
				row.push('');
				row.push('');
			}

			if (args.behavior == 'msr') {
				row.push('ms');
				row.push(args.monkeyIds);
			} else {
				row.push('');
				row.push('');
			}

			row.push(''); // MNP Social
			row.push(args.ts.data.tourist.notes); // Notes

			return row;
		}
	}
});