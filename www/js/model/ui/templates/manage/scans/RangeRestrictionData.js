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
							'Behavior Time',
							'SDB Stress',
							'Con Agg',
							'ID',
							'Yawn',
							'Approach C',
							'ID',
							'Leave C',
							'ID',
							'Sexual Beh',
							'Vocal',
							'Infant Rltd',
							'Food Rltd',
							'Food Item',
							'Affiliative',
							'ID',
							'Groomee',
							'ID',
							'Groomer',
							'ID',
							'MNP Social',
							'Notes'];

			// start work sheet
			var xmlContent = '<ss:Worksheet ss:Name="Crop Guarding"><ss:Table>';

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
				var rr = args.list[i];
				var behaviors = rr.data.behavior_seq.split('-');
				for (var j = 0; j < behaviors.length; j++) {

					var row = [];
					var monkeyIds = [];
					var behavior = behaviors[j];

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

					row = this._getRowData(row, {
						rr: rr,
						session: i + 1,
						utils: args.utils,
						user: args.user,
						behavior: behavior,
						monkeyIds: monkeyIds,
						behavior_timestamp: rr.data.behavior_timestamp[j]
					});

					xmlContent += '<ss:Row>';
					for (var k = 0; k < row.length; k++) {
						xmlContent += '<ss:Cell>'
										+ '<ss:Data ss:Type="String">' + row[k] + '</ss:Data>'
									+ '</ss:Cell>';							
					}
					xmlContent += '</ss:Row>';
				}
			}
			// prepare content [ END ] */

			// close work sheet
			xmlContent += '</ss:Table></ss:Worksheet>'
			return xmlContent;
		},

		_getRowData: function(row, args) {
			row.push(args.rr.timeStamp.substring(6,8) + '-' + args.utils.numberToMonth({showShort: true, month: parseInt(args.rr.timeStamp.substring(4,6))}) + '-' + args.rr.timeStamp.substring(0,4)); // date
			row.push(args.user.code); // observer
			row.push(args.rr.group); // group
			row.push(args.rr.data.area_code); // location
			row.push(args.rr.data.type_rr); // type
			row.push(args.rr.data.group_behavior); // group behavior
			row.push(args.session); // session

			var timeArr = args.rr.data.startTime.split('-');
			var startDate = new Date(timeArr[0], timeArr[1], timeArr[2], timeArr[3], timeArr[4], timeArr[5]);
			row.push(timeArr[3] + ':' + timeArr[4] + ':' + timeArr[5]); // start time

			timeArr = args.rr.data.endTime.split('-');
			var endDate = new Date(timeArr[0], timeArr[1], timeArr[2], timeArr[3], timeArr[4], timeArr[5]);
			row.push(timeArr[3] + ':' + timeArr[4] + ':' + timeArr[5]); // end time

			var totalTime = (endDate.getTime() - startDate.getTime())/1000;
			var totalSeconds = totalTime % 60;
			var totalMinutes = (totalTime - totalSeconds)/60;
			totalTime = ((totalMinutes < 10)?'0':'') + totalMinutes + ':' + ((totalSeconds < 10)?'0':'') + totalSeconds;
			row.push(totalTime); // total time

			row.push(args.rr.data.monkey_id);
			
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

			// get all con agg behaviours
			var conAgg = '';
			var conAggAdded = false;
			var conAggs = ['at','ad','ac','ab','ak','au','ap','ar','al','as','av','ae','a0','ai'];
			for (var l = 0; l < conAggs.length; l++) {
				if (args.behavior == conAggs[l]) {
					conAggAdded = true;
					conAgg += ((conAgg != '')?',':'') + conAggs[l];
				}
			}

			row.push(conAgg); // Con Agg
			row.push(conAggAdded?args.monkeyIds:''); // ID
			row.push((args.behavior == 'yy')?'yy': ''); // Yawn

			var approached = false;
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
			var infntRelBehaviours = ['ih','ii','ir','id','iw','pr'];
			for (var l = 0; l < infntRelBehaviours.length; l++) {
				if (args.behavior == infntRelBehaviours[l]) {
					infntRelBehaviour += ((infntRelBehaviour != '')?',':'') + infntRelBehaviours[l];
				}
			}
			row.push(infntRelBehaviour);

			// get all food related behaviours
			var foodBehaviour = '';
			var foodBehaviours = ['ct','ce','cp','cm'];
			for (var l = 0; l < foodBehaviours.length; l++) {
				if (args.behavior == foodBehaviours[l]) {
					foodBehaviour += ((foodBehaviour != '')?',':'') + foodBehaviours[l];
				}
			}
			row.push(foodBehaviour);

			// get all food items
			var foodItems = '';
			var foods = ['f','fl','l','m','an','a', 'v'];
			for (var l = 0; l < foods.length; l++) {
				if (args.behavior == foods[l]) {
					foodItems += ((foodItems != '')?',':'') + foods[l];
				}
			}
			row.push(foodItems); // food item

			// get all affiliative behaviours
			var afflBehaviour = '';
			var afflBehaviours = ['fa','fp','fe','fx','fg','fm','f0'];
			for (var l = 0; l < afflBehaviours.length; l++) {
				if (args.behavior == afflBehaviours[l]) {
					afflBehaviour += ((afflBehaviour != '')?',':'') + afflBehaviours[l];
				}
			}

			row.push(afflBehaviour);
			if (afflBehaviour != '') {
				row.push(args.monkeyIds);
			} else {
				row.push('');
			}

			if (args.behavior == 'mse/msr') {
				
				row.push('mse');
				var monkeys = {
					mse: '',
					msr: ''
				};
				if (args.monkeyIds[0] != null) {
					row.push(args.monkeyIds[0]);
					monkeys.mse = args.monkeyIds[0];
				}

				row.push('msr');
				if (args.monkeyIds[1] != null) {
					row.push(args.monkeyIds[1]);
					monkeys.msr = args.monkeyIds[1];
				}

				row.push(monkeys.mse + 'ms' + monkeys.msr); // MNP Social
			} else {
				row.push('');
				row.push('');
				row.push('');
				row.push('');
				row.push(''); // MNP Social
			}
			
			row.push(args.rr.data.notes); // Notes

			return row;
		}
	}
});