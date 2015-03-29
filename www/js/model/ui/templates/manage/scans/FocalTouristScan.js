Aria.classDefinition({
	$classpath: 'model.ui.templates.manage.scans.FocalTouristScan',
	$constructor: function() {

	},
	$dependencies: [
		'aria.utils'
	],
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
							'Swelling',
							'Type',
							'Focal#',
							'Start Time',
							'End Time',
							'Total Time',
							'Behavior Time',
							'CG-Location',
							'CG-Type',
							'Guide Name',
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
							'SDB (stress)',
							'T-Tourist Agg',
							'C-ConAgg',
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
							'ID',
							'Groomer',
							'ID',
							'Groomee',
							'ID',
							'MNP Social',
							'Notes',
							'NB',];

			// start work sheet
			var xmlContent = '<ss:Styles><ss:Style ss:ID="s23"><ss:Interior ss:Color="#800080" ss:Pattern="Solid"/></ss:Style></ss:Styles><ss:Worksheet ss:Name="Focal"><ss:Table>';

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
						if (!fsSavedData[i].colored_row) {
							xmlContent += '<ss:Row>';
						} else {
							xmlContent += '<ss:Row ss:StyleID="s23">';
						}

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
			var count = 0;
			var output = [];
			for (var i = 0; i < args.list.length; i++) {
				var fs = args.list[i];
				var behaviors = fs.data.monkey.behavior_seq.split('-');
				for (var j = 0; j < behaviors.length; j++) {
					var row = [];
					var behaviorData = this._getMonkeys(behaviors[j]);

					var params = {
						fs: fs,
						utils: args.utils,
						user: args.user,
						behavior: behaviorData.behavior,
						monkeyIds: behaviorData.monkeyIds,
						behavior_timestamp: fs.data.monkey.behavior_timestamp[j]
					};

					if (j == 0) {
						params['session'] = (i + 1);
					}

					row = this._getRowData(row, params);

					// push to list
					var counter = {};
					counter[count++] = row;
					output.push(counter);
				}

				/*output.push({
					count: this._getRowData(row, {
						fs: fs,
						session: ((count < 9)?'0':'') + (count + 1),
						utils: args.utils,
						user: args.user,
						behaviors: behaviors
					}),
					colored_row: true
				});

				count += 1;*/
			}

			return output;
		},

		/**
		 * get monkey ids associated with behavior
		 * @param behavior String
		 */
		_getMonkeys: function(behavior) {
			var monkeyIds = [];
			if (behavior.indexOf('#') != -1) {
				var multipleBehaviors = behavior.split('#');
				behavior = '';
				for (var x = 0; x < multipleBehaviors.length; x++) {
					var monkeys = '';
					var substrIndex = multipleBehaviors[x].length;
					if (multipleBehaviors[x].indexOf(',') != '-1') {
						
						var entries = multipleBehaviors[x].split(',');
						for (var l = 1; l < entries.length; l++) {
							if (newBehavior != entries[l]) {
								monkeys += ((monkeys != '')?',':'') + entries[l];
							}
						}

						substrIndex = multipleBehaviors[x].indexOf(',');
					}

					var newBehavior = multipleBehaviors[x].substring(0,substrIndex);
					behavior += ((behavior != null && behavior != '')?'/': '') 
										+ newBehavior;


					monkeyIds.push(monkeys);
				}
			} else if (behavior.indexOf(',') != '-1') {
				var entries = behavior.split(',');
				behavior = behavior.substring(0,behavior.indexOf(','));
				for (var l = 1; l < entries.length; l++) {
					monkeyIds.push(entries[l]);
				}
			}

			return {monkeyIds: monkeyIds, behavior: behavior};
		},

		/**
		 * create data for a row based on a behavior
		 * @param row JSONObject where data will be pushed
		 * @param args JSONObject containing monkeyIds and corresponding behavior
		 */
		_getRowData: function(row, args) {

			var behaviorMap = null;
			var behaviorMonkeys = '';
			if (args.behaviors != null) {
				behaviorMap = {};
				for (var i = 0; i < args.behaviors.length; i++) {
					var temp = args.behaviors[i];
					if (temp.indexOf(',') != -1) {
						temp = args.behaviors[i].substring(0, args.behaviors[i].indexOf(','));
					}

					behaviorMap[temp] = {
						monkeys: this._getMonkeys(args.behaviors[i])['monkeyIds'],
						behavior_timestamp: args.fs.data.monkey.behavior_timestamp[i]
					}
				}
			}

			var activities = [];
			if (args.fs.data.monkey.activity_code != null) {
				activities = args.fs.data.monkey.activity_code.split(';');
			}

			var range = null;
			if (args.fs.data.range != null 
				&& args.fs.data.range.length > 0) {
				range = args.fs.data.range[0];
			}

			if (range != null 
				|| (args.fs.data.tourist != null 
					&& args.fs.data.tourist.hasTourist === 'false')) {
				// i.e. its a CG Focal scan
				args.fs.data.tourist = null;
			}

			row.push(args.fs.timeStamp.substring(6,8) + '-' + args.utils.numberToMonth({showShort: true, month: parseInt(args.fs.timeStamp.substring(4,6))}) + '-' + args.fs.timeStamp.substring(0,4)); // date
			row.push(args.user.code); // observer
			row.push(args.fs.group); // group

			row.push(args.fs.data.monkey.monkey_id); //monkey id
			row.push(args.fs.data.monkey.female_swelling); // female swelling
			
			var timeArr = args.fs.data.monkey.startTime.split('-');
			
			// Type column as per Niki's new request
			if (range != null) {
				row.push('C');
			} else if (args.fs.data.tourist != null) {
				row.push('T');
			} else {
				row.push('N');
			}

			if (args.session != null) {
				row.push(args.session); // focal #
			} else {
				row.push('');
			}

			var startDate = new Date(timeArr[0], timeArr[1], timeArr[2], timeArr[3], timeArr[4], timeArr[5]);
			row.push(timeArr[3] + ':' + timeArr[4] + ':' + timeArr[5]); // start time

			timeArr = args.fs.data.monkey.endTime.split('-');
			var endDate = new Date(timeArr[0], timeArr[1], timeArr[2], timeArr[3], timeArr[4], timeArr[5]);
			row.push(timeArr[3] + ':' + timeArr[4] + ':' + timeArr[5]); // end time

			row.push(args.fs.data.monkey.totalTime); // total time

			if (behaviorMap == null) {
				timeArr = args.behavior_timestamp.split('-');
				row.push(timeArr[3] + ':' + timeArr[4] + ':' + timeArr[5]); // Behavior time
			} else {
				row.push('');
			}

			if (range != null) {
				row.push(range.area_code); // CG Location
				row.push(range.type_rr); // CG-Type
			} else {
				// range events
				row.push('');
				row.push('');
			}

			if (args.fs.data.tourist != null) {
				row.push(args.fs.data.tourist.guideName); // guide name
			} else {
				row.push('');
			}
			
			if (args.fs.data.tourist != null) {
				row.push(args.fs.data.tourist.density); // TDen
				row.push(args.fs.data.tourist.gender); // TSex
				row.push(args.fs.data.tourist.nationality); // TNat
				row.push(args.fs.data.tourist.averageAge); // TAge
				row.push((args.fs.data.tourist.hasTourist)?'1':'0'); // Tourist
			} else {
				for (var l = 0; l < 5; l++) {
					row.push('');
				}
			}

			row.push((args.behavior == 'tf' || (behaviorMap != null && behaviorMap['tf'] != null))?1: 0); // T Feed
			row.push((args.behavior ==  'ta'|| (behaviorMap != null && behaviorMap['ta'] != null))?1: 0); // T Aggrs
			row.push((args.behavior == 'tt' || (behaviorMap != null && behaviorMap['tt'] != null))?1: 0); // T Tease
			row.push((args.behavior == 'tn' || (behaviorMap != null && behaviorMap['tn'] != null))?1: 0); // T Attn
			
			// get all food items
			var activityItem = '';
			var activityItems = {'fo':'','fe':'','fp':'','fg':'','d':''};
			for (var l = 0; l < activities.length; l++) {
				if (activityItems[activities[l]] != null) {
					activityItem += ((activityItem != '')?',':'') + activities[l];
				}
			}

			row.push(activityItem); // Activity

			// get all food items
			var foodItem = '';
			var foodItems = ['f','fl','l','a','m','v','an'];
			for (var l = 0; l < foodItems.length; l++) {
				if (args.behavior == foodItems[l] || (behaviorMap != null && behaviorMap[foodItems[l]] != null)) {
					foodItem += ((foodItem != '')?',':'') + foodItems[l];
				}
			}

			row.push(foodItem); // Foor Item

			// get all locomotion
			var locomotion = '';
			var locomotions = {'w': '','r': '','l': '','s': '', 'st': '','cu': '','cd': ''};
			for (var l = 0; l < activities.length; l++) {
				if (locomotions[activities[l]] != null) {
					locomotion += ((locomotion != '')?',':'') + activities[l];
				}
			}

			row.push(locomotion); // Locomotion

			/*/ get all position items
			var position = '';
			var positions = ['0','1','2','3','4','5','6','b'];
			for (var l = 0; l < positions.length; l++) {
				if (args.behavior == positions[l] || (behaviorMap != null && behaviorMap[positions[l]] != null)) {
					position += ((position != '')?',':'') + positions[l];
				}
			}

			row.push(position); // Position*/

			// get all stress activities
			var stress = '';
			var stresses = ['yg','ys'];
			for (var l = 0; l < stresses.length; l++) {
				if (args.behavior == stresses[l] || (behaviorMap != null && behaviorMap[stresses[l]] != null)) {
					stress += ((stress != '')?',':'') + stresses[l];
				}
			}

			row.push(stress); // SDB (stress)

			// get all tourist agg behaviours
			var touristOrConBehAdded = false;
			var touristAgg = '';
			var touristAggs = ['tat','tab','tau','tak','tap'];
			for (var l = 0; l < touristAggs.length; l++) {
				if (args.behavior == touristAggs[l] || (behaviorMap != null && behaviorMap[touristAggs[l]] != null)) {
					touristOrConBehAdded = true;
					touristAgg += ((touristAgg != '')?',':'') + touristAggs[l];

					if (behaviorMap != null) {
						behaviorMonkeys += behaviorMap[touristAggs[l]];
					}
				}
			}
			row.push(touristAgg); // Tourist Agg

			// get all con agg behaviours
			var conAgg = '';
			var conAggs = ['at','ad','ac','ab','ak','au','ap','ar','al','as','av','ae','a0','ai'];
			for (var l = 0; l < conAggs.length; l++) {
				if (args.behavior == conAggs[l] || (behaviorMap != null && behaviorMap[conAggs[l]] != null)) {
					touristOrConBehAdded = true;
					conAgg += ((conAgg != '')?',':'') + conAggs[l];

					if (behaviorMap != null) {
						behaviorMonkeys += behaviorMap[conAggs[l]];
					}
				}
			}

			row.push(conAgg); // Con Agg

			if (touristOrConBehAdded) {
				if (behaviorMap == null) {
					row.push(args.monkeyIds);
				} else {
					row.push(behaviorMonkeys);
				}
			} else {
				row.push('');
			}

			behaviorMonkeys = '';
			row.push((args.behavior == 'yy' || (behaviorMap != null && behaviorMap['yy'] != null))?'yy': ''); // Yawn

			var approached = false;
			if (args.behavior == 'tda' || (behaviorMap != null && behaviorMap['tda'] != null)) {
				approached = true;
				row.push('tda'); // Approach T

				if (behaviorMap != null) {
					behaviorMonkeys += behaviorMap['tda'];
				}
			} else {
				row.push('');
			}

			if (args.behavior == 'da' || (behaviorMap != null && behaviorMap['da'] != null)) {
				approached = true;
				row.push('da'); // Approach C

				if (behaviorMap != null) {
					behaviorMonkeys += behaviorMap['da'];
				}
			} else {
				row.push('');
			}

			if (approached) {
				if (behaviorMap == null) {
					row.push(args.monkeyIds);
				} else {
					row.push(behaviorMonkeys);
				}
			} else {
				row.push('');
			}

			var left = false;
			behaviorMonkeys = '';
			if (args.behavior == 'tla' || (behaviorMap != null && behaviorMap['tla'] != null)) {
				left = true;
				row.push('tla'); // Leave T

				if (behaviorMap != null) {
					behaviorMonkeys += behaviorMap['tla'];
				}
			} else {
				row.push('');
			}

			if (args.behavior == 'la' || (behaviorMap != null && behaviorMap['la'] != null)) {
				left = true;
				row.push('la'); // Leave C

				if (behaviorMap != null) {
					behaviorMonkeys += behaviorMap['la'];
				}
			} else {
				row.push('');
			}

			if (left) {
				if (behaviorMap == null) {
					row.push(args.monkeyIds);
				} else {
					row.push(behaviorMonkeys);
				}
			} else {
				row.push('');
			}

			// get all sexual behaviours
			var sexualBehaviour = '';
			var sexualBehaviours = ['sp','sa','so','si','sm','sj','sb','s','st','sr', 'se'];
			for (var l = 0; l < sexualBehaviours.length; l++) {
				if (args.behavior == sexualBehaviours[l] || (behaviorMap != null && behaviorMap[sexualBehaviours[l]] != null)) {
					sexualBehaviour += ((sexualBehaviour != '')?',':'') + sexualBehaviours[l];
				}
			}
			row.push(sexualBehaviour);

			// get all vocal behaviours
			var vocalBehaviour = '';
			var vocalBehaviours = ['vs','vw','vf','vm','vl'];
			for (var l = 0; l < vocalBehaviours.length; l++) {
				if (args.behavior == vocalBehaviours[l] || (behaviorMap != null && behaviorMap[vocalBehaviours[l]] != null)) {
					vocalBehaviour += ((vocalBehaviour != '')?',':'') + vocalBehaviours[l];
				}
			}
			row.push(vocalBehaviour);

			// get all infant related behaviours
			var infntRelBehaviour = '';
			var infntRelBehaviours = ['ih','ii','ir','id','iw','pr', 'in'];
			for (var l = 0; l < infntRelBehaviours.length; l++) {
				if (args.behavior == infntRelBehaviours[l] || (behaviorMap != null && behaviorMap[infntRelBehaviours[l]] != null)) {
					infntRelBehaviour += ((infntRelBehaviour != '')?',':'') + infntRelBehaviours[l];
				}
			}
			row.push(infntRelBehaviour);

			// get all food related behaviours
			var foodBehaviour = '';
			var foodBehaviours = ['ct','ce','cp','cm'];
			for (var l = 0; l < foodBehaviours.length; l++) {
				if (args.behavior == foodBehaviours[l] || (behaviorMap != null && behaviorMap[foodBehaviours[l]] != null)) {
					foodBehaviour += ((foodBehaviour != '')?',':'') + foodBehaviours[l];
				}
			}
			row.push(foodBehaviour);

			// get all affiliative behaviours
			var afflBehaviour = '';
			behaviorMonkeys = '';
			var afflBehaviours = ['fa','fp','fe','fx','fg','fm','f0', 'fb'];
			for (var l = 0; l < afflBehaviours.length; l++) {
				if (args.behavior == afflBehaviours[l] || (behaviorMap != null && behaviorMap[afflBehaviours[l]] != null)) {
					afflBehaviour += ((afflBehaviour != '')?',':'') + afflBehaviours[l];

					if (behaviorMap != null) {
						behaviorMonkeys += behaviorMap[afflBehaviours[l]];
					}
				}
			}
			
			row.push(afflBehaviour);
			if (afflBehaviour != '') {
				if (behaviorMap == null) {
					row.push(args.monkeyIds);
				} else {
					row.push(behaviorMonkeys);
				}
			} else {
				row.push('');
			}

			if (args.behavior == 'mse/msr' || (behaviorMap != null && behaviorMap['mse/msr'] != null)) {
				
				row.push('msr');
				var monkeys = {
					mse: '',
					msr: ''
				};

				if (behaviorMap == null) {
					if (args.monkeyIds[0] != null) {
						row.push(args.monkeyIds[0]);
						monkeys.msr = args.monkeyIds[0];
					}
				} else {
					if (behaviorMap['mse/msr'].monkeys[0] != null) {
						row.push(behaviorMap['mse/msr'].monkeys[0]);
						monkeys.msr = behaviorMap['mse/msr'].monkeys[0];
					}
				}

				row.push('mse');
				if (behaviorMap == null) {
					if (args.monkeyIds[1] != null) {
						row.push(args.monkeyIds[1]);
						monkeys.mse = args.monkeyIds[1];
					}
				} else {
					if (behaviorMap['mse/msr'].monkeys[1] != null) {
						row.push(behaviorMap['mse/msr'].monkeys[1]);
						monkeys.mse = behaviorMap['mse/msr'].monkeys[1];
					}
				}

				row.push(monkeys.msr.trim() + 'ms' + monkeys.mse.trim()); // MNP Social
			} else {
				row.push('');
				row.push('');
				row.push('');
				row.push('');
				row.push(''); // MNP Social
			}

			row.push(args.fs.data.monkey.notes); // Notes

			// no behavior
			var noBehavior = '';
			behaviorMonkeys = '';
			var noBehaviors = ['nb'];
			for (var l = 0; l < noBehaviors.length; l++) {
				if (args.behavior == noBehaviors[l] || (behaviorMap != null && behaviorMap[noBehaviors[l]] != null)) {
					noBehavior += ((noBehavior != '')?',':'') + noBehaviors[l];
				}
			}

			row.push(noBehavior);

			return row;
		}
	}
});