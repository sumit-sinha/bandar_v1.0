Aria.classDefinition({
	$classpath: 'model.ui.templates.manage.scans.FocalRangeScan',
	$constructor: function() {

	},
	$prototype: {

		/**
		 * function used to create a workbook for Focal Scan
		 * @return String
		 */
		createFsRangeWorkBook: function(args) {
			var fsData = ['Date',
							'Observer',
							'Group',
							'Monkey',
							'Focal#',
							'Start Time',
							'End Time',
							'Total Time',
							'Behavior Time',
							'Location',
							'Whoops',
							'C-Chase',
							'S-Stick',
							'D-Dog',
							'F-Firework',
							'L-Slingshot',
							'Activity',
							'Food Item',
							'Locomotion',
							'Position',
							'SDB Stress',
							'Con Agg',
							'ID',
							'Yawn',
							'Approach C',
							'ID',
							'Leave C',
							'Yawn', 
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
			var xmlContent = '<ss:Worksheet ss:Name="Focal CG"><ss:Table>';

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
			var count = 0;
			for (var i = 0; i < args.list.length; i++) {
				var fs = args.list[i];

				if (fs.data.range != null && fs.data.range.length > 0) {

					var range = fs.data.range[0];
					var behaviors = fs.data.monkey.behavior_seq.split('-');
					for (var j = 0; j < behaviors.length && range != null; j++) {
						var row = [];
						var monkeyIds = [];
						var behavior = behaviors[j];

						if (behavior.indexOf(',') != '-1') {
							var entries = behavior.split(',');
							behavior = behavior.substring(0,2);
							for (var l = 1; l < entries.length; l++) {
								monkeyIds.push(entries[l]);
							}
						}

						row = this._getRowData(row, {
							fs: fs,
							utils: args.utils,
							user: args.user,
							range: range,
							behavior: behavior,
							monkeyIds: monkeyIds,
							behavior_timestamp: fs.data.monkey.behavior_timestamp[j]
						});

						// push to list
						var counter = {};
						counter[count++] = row;
						output.push(counter);
					}
				}
			}

			return output;
		},

		_getRowData: function(row, args) {
			row.push(args.fs.timeStamp.substring(6,8) + '-' + args.utils.numberToMonth({showShort: true, month: parseInt(args.fs.timeStamp.substring(4,6))}) + '-' + args.fs.timeStamp.substring(0,4)); // date
			row.push(args.user.code); // observer
			row.push(args.fs.group); // group
			row.push(args.fs.data.monkey.monkey_id); //monkey id
			row.push(args.fs.index + 1); // focal #

			var timeArr = args.fs.data.monkey.startTime.split('-');
			var startDate = new Date(timeArr[0], timeArr[1], timeArr[2], timeArr[3], timeArr[4], 0);
			row.push(timeArr[3] + ':' + timeArr[4]); // start time

			timeArr = args.fs.data.monkey.endTime.split('-');
			var endDate = new Date(timeArr[0], timeArr[1], timeArr[2], timeArr[3], timeArr[4], 0);
			row.push(timeArr[3] + ':' + timeArr[4]); // end time

			row.push((endDate.getTime() - startDate.getTime())/(1000 * 60)); // total time

			timeArr = args.behavior_timestamp.split('-');
			row.push(timeArr[3] + ':' + timeArr[4] + ':' + timeArr[5]); // Behavior time

			row.push(args.range.area_code); // location
			
			if (args.range.rr_type != null) {
				args.range.rr_type = args.range.rr_type.toUpperCase();
			} else {
				args.range.rr_type = '';
			}

			row.push((args.range.rr_type == 'W')?1: 0); // Whoops
			row.push((args.range.rr_type == 'C')?1: 0); // Chase
			row.push((args.range.rr_type == 'S')?1: 0); // Stick
			row.push((args.range.rr_type == 'D')?1: 0); // Dog
			row.push((args.range.rr_type == 'F')?1: 0); // Firework
			row.push((args.range.rr_type == 'L')?1: 0); // SlingShot

			row.push(args.fs.data.monkey.activity_code); // activity

			// get all food items
			var foodItem = '';
			var foodItems = ['f','fl','l','a','m','v','an'];
			for (var l = 0; l < foodItems.length; l++) {
				if (args.behavior == foodItems[l]) {
					foodItem += ((foodItem != '')?',':'') + foodItems[l];
				}
			}

			row.push(foodItem); // Foor Item

			// get all locomotion
			var locomotion = '';
			var locomotions = ['w','r','s','st','cu','cd','l'];
			for (var l = 0; l < locomotions.length; l++) {
				if (args.behavior == locomotions[l]) {
					locomotion += ((locomotion != '')?',':'') + locomotions[l];
				}
			}

			row.push(locomotion); // Locomotion

			// get all position items
			var position = '';
			var positions = ['0','1','2','3','4','5','6','a','b'];
			for (var l = 0; l < positions.length; l++) {
				if (args.behavior == positions[l]) {
					position += ((position != '')?',':'') + positions[l];
				}
			}

			row.push(position); // Position

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
			var conAgg = '';
			var monkeyIds = '';
			var conAggs = ['at','ad','ac','ab','ak','au','ap','ar','al','as','av','ae','a0','ai'];
			for (var l = 0; l < conAggs.length; l++) {
				if (args.behavior == conAggs[l]) {
					conAgg += ((conAgg != '')?',':'') + conAggs[l];
					if (args.behavior == conAgg[l] && args.monkeyIds instanceof Array && args.monkeyIds.length > 0) {
						for (var monkeyId in args.monkeyIds) {
							monkeyIds += ((monkeyIds != '')?',': '') + monkeyId;
						}
					}
				}
			}

			row.push(conAgg); // Con Agg
			row.push(monkeyIds); // ID
			row.push((args.behavior == 'yy')?1: 0); // Yawn

			var approached = false;
			if (args.behavior == 'da') {
				approached = true;
				row.push(1); // Approach C
			} else {
				row.push(0);
			}

			if (approached) {
				row.push(args.monkeyIds); // ID
			} else {
				row.push('');
			}

			var left = false;
			if (args.behavior == 'la') {
				left = true;
				row.push(1); // Leave C
			} else {
				row.push(0);
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

			// get all food related behaviours
			var foodBehaviour = '';
			var foodBehaviours = ['ih','ii','ir','id','iw','pr'];
			for (var l = 0; l < foodBehaviours.length; l++) {
				if (args.behavior == foodBehaviours[l]) {
					foodBehaviour += ((foodBehaviour != '')?',':'') + foodBehaviours[l];
				}
			}
			row.push(foodBehaviour);

			// get all infant related behaviours
			var infntRelBehaviour = '';
			var infntRelBehaviours = ['ct','ce','cp','cm'];
			for (var l = 0; l < infntRelBehaviours.length; l++) {
				if (args.behavior == infntRelBehaviours[l]) {
					infntRelBehaviour += ((infntRelBehaviour != '')?',':'') + infntRelBehaviours[l];
				}
			}
			row.push(infntRelBehaviour);

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
				row.push(1);
			} else {
				row.push('');
				row.push('');
			}

			if (args.behavior == 'msr') {
				row.push('ms');
				row.push(1);
			} else {
				row.push('');
				row.push('');
			}

			row.push(args.range.notes); // Notes

			return row;
		}		
	}
});