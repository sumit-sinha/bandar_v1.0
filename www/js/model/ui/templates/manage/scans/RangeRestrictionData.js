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
							'Affiliative',
							'Groomee',
							'ID',
							'Groomer',
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

					if (behavior.indexOf(',') != '-1') {
						var entries = behavior.split(',');
						behavior = behavior.substring(0,2);
						for (var l = 1; l < entries.length; l++) {
							monkeyIds.push(entries[l]);
						}
					}

					row = this._getRowData(row, {
						rr: rr,
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
			row.push(1); // session

			var timeArr = args.rr.data.startTime.split('-');
			var startDate = new Date(timeArr[0], timeArr[1], timeArr[2], timeArr[3], timeArr[4], 0);
			row.push(timeArr[3] + ':' + timeArr[4]); // start time

			timeArr = args.rr.data.endTime.split('-');
			var endDate = new Date(timeArr[0], timeArr[1], timeArr[2], timeArr[3], timeArr[4], 0);
			row.push(timeArr[3] + ':' + timeArr[4]); // end time

			row.push((endDate.getTime() - startDate.getTime())/(1000 * 60)); // duration
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

			if (args.behavior == 'da') {
				row.push(1); // Approach C
				row.push(args.monkeyIds); // ID
			} else {
				row.push(0);
				row.push('');
			}

			if (args.behavior == 'la') {
				row.push(1); // // Leave C
				row.push(args.monkeyIds); // ID
			} else {
				row.push(0);
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

			row.push(args.rr.data.notes); // Notes

			return row;
		}
	}
});