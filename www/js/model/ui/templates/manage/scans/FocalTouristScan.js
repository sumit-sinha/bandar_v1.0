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
							'Behavior Time',
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
							'SDB (stress)',
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
						
						var monkeyIds = [];
						if (behaviors[j].indexOf(',') != '-1') {
							var entries = behaviors[j].split(',');
							behaviors[j] = behaviors[j].substring(0,2);
							for (var l = 1; l < entries.length; l++) {
								monkeyIds.push(entries[l]);
							}
						}

						if (behMap[behaviors[j]] != null) {
							behMap[behaviors[j]]++;
						} else {
							if (monkeyIds == null || monkeyIds.length == 0) {
								behMap[behaviors[j]] = 1;
							} else {
								behMap[behaviors[j]] = monkeyIds;
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
					row.push(''); // Behavior time
					row.push(fs.data.tourist.density); // TDen
					row.push(fs.data.tourist.gender); // TSex
					row.push(fs.data.tourist.nationality); // TNat
					row.push(fs.data.tourist.averageAge); // TAge
					row.push((fs.data.tourist.hasTourist)?'1':'0'); // Tourist
					row.push((behMap['tf'] != null)?behMap['tf']: 0); // T Feed
					row.push((behMap['ta'] != null)?behMap['ta']: 0); // T Aggrs
					row.push((behMap['tt'] != null)?behMap['tt']: 0); // T Tease
					row.push((behMap['tn'] != null)?behMap['tn']: 0); // T Attn
					row.push(fs.data.monkey.activity_code); // Activity

					// get all food items
					var foodItem = '';
					var foodItems = ['f','fl','l','a','m','v','an'];
					for (var l = 0; l < foodItems.length; l++) {
						if (behMap[foodItems[l]] != null) {
							foodItem += ((foodItem != '')?',':'') + foodItems[l];
						}
					}

					row.push(foodItem); // Foor Item

					// get all locomotion
					var locomotion = '';
					var locomotions = ['w','r','s','st','cu','cd','l'];
					for (var l = 0; l < locomotions.length; l++) {
						if (behMap[locomotions[l]] != null) {
							locomotion += ((locomotion != '')?',':'') + locomotions[l];
						}
					}

					row.push(locomotion); // Locomotion

					// get all position items
					var position = '';
					var positions = ['0','1','2','3','4','5','6','a','b'];
					for (var l = 0; l < positions.length; l++) {
						if (behMap[positions[l]] != null) {
							position += ((position != '')?',':'') + positions[l];
						}
					}

					row.push(position); // Position

					// get all stress activities
					var stress = '';
					var stresses = ['yg','ys'];
					for (var l = 0; l < stresses.length; l++) {
						if (behMap[stresses[l]] != null) {
							stress += ((stress != '')?',':'') + stresses[l];
						}
					}

					row.push(stress); // SDB (stress)

					// get all tourist agg behaviours
					var monkeyIds = '';
					var touristAgg = '';
					var touristAggs = ['at','ac','ab','ak','au','ap','ar','a0','ai'];
					for (var l = 0; l < touristAggs.length; l++) {
						if (behMap[touristAggs[l]] != null) {
							touristAgg += ((touristAgg != '')?',':'') + touristAggs[l];
							if (behMap[touristAggs[l]] instanceof Array && behMap[touristAggs[l]].length > 0) {
								for (var monkeyId in behMap[touristAggs[l]]) {
									monkeyIds += ((monkeyIds != '')?',': '') + monkeyId;
								}
							}
						}
					}
					row.push(touristAgg); // Tourist Agg

					// get all tourist agg behaviours
					var conAgg = '';
					var conAggs = ['at','ad','ac','ab','ak','au','ap','ar','al','as','av','ae','a0','ai'];
					for (var l = 0; l < conAggs.length; l++) {
						if (behMap[conAggs[l]] != null) {
							conAgg += ((conAgg != '')?',':'') + conAggs[l];
							if (behMap[conAggs[l]] instanceof Array && behMap[conAggs[l]].length > 0) {
								for (var monkeyId in behMap[conAggs[l]]) {
									monkeyIds += ((monkeyIds != '')?',': '') + monkeyId;
								}
							}
						}
					}

					row.push(conAgg); // Con Agg
					row.push(monkeyIds); // ID
					row.push((behMap['yy'] != null)?behMap['yy']: 0); // Yawn

					row.push(''); // Approach T
					row.push(''); // Approach C
					row.push(''); // ID

					row.push(''); // Leave T
					row.push(''); // Leave C
					row.push(''); // ID

					// get all sexual behaviours
					var sexualBehaviour = '';
					var sexualBehaviours = ['sp','sa','so','si','sm','sj','sb','s','st','sr'];
					for (var l = 0; l < sexualBehaviours.length; l++) {
						if (behMap[sexualBehaviours[l]] != null) {
							sexualBehaviour += ((sexualBehaviour != '')?',':'') + sexualBehaviours[l];
						}
					}
					row.push(sexualBehaviour);

					// get all vocal behaviours
					var vocalBehaviour = '';
					var vocalBehaviours = ['vs','vw','vf','vm','vl'];
					for (var l = 0; l < vocalBehaviours.length; l++) {
						if (behMap[vocalBehaviours[l]] != null) {
							vocalBehaviour += ((vocalBehaviour != '')?',':'') + vocalBehaviours[l];
						}
					}
					row.push(vocalBehaviour);

					// get all food related behaviours
					var foodBehaviour = '';
					var foodBehaviours = ['ih','ii','ir','id','iw','pr'];
					for (var l = 0; l < foodBehaviours.length; l++) {
						if (behMap[foodBehaviours[l]] != null) {
							foodBehaviour += ((foodBehaviour != '')?',':'') + foodBehaviours[l];
						}
					}
					row.push(foodBehaviour);

					// get all infant related behaviours
					var infntRelBehaviour = '';
					var infntRelBehaviours = ['ct','ce','cp','cm'];
					for (var l = 0; l < infntRelBehaviours.length; l++) {
						if (behMap[infntRelBehaviours[l]] != null) {
							infntRelBehaviour += ((infntRelBehaviour != '')?',':'') + infntRelBehaviours[l];
						}
					}
					row.push(infntRelBehaviour);

					// get all affiliative behaviours
					var afflBehaviour = '';
					var afflBehaviours = ['fa','fp','fe','fx','fg','fm','f0'];
					for (var l = 0; l < afflBehaviours.length; l++) {
						if (behMap[afflBehaviours[l]] != null) {
							afflBehaviour += ((afflBehaviour != '')?',':'') + afflBehaviours[l];
						}
					}
					row.push(afflBehaviour);

					if (behMap['mse'] != null) {
						row.push('ms');
						row.push(behMap['mse']);
					} else {
						row.push('');
						row.push('');
					}

					if (behMap['msr'] != null) {
						row.push('ms');
						row.push(behMap['msr']);
					} else {
						row.push('');
						row.push('');
					}

					row.push(fs.data.tourist.notes); // Notes

					// push to list
					output.push({i: row});
				}
			}

			return output;
		}		
	}
});