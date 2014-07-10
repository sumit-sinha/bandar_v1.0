Aria.classDefinition({
	$classpath: 'model.ui.utils.DataUtil',
	$singleton: true,
	$prototype: {

		/**
		 * return all the possible activity code
		 * @return JSONArray
		 */
		getActivityCodes: function() {
			return [{
				label: 'Ingesting',
				code: 'fe'
			}, {
				label: 'Processing',
				code: 'fp'
			}, {
				label: 'Foraging',
				code: 'fo'
			}, {
				label: 'Regurgitation',
				code: 'fg'
			}, {
				label: 'Drinking',
				code: 'd'
			}, {
				label: 'Locomotion',
				code: 'l'
			}, {
				label: 'Position',
				code: 'p'
			}, {
				label: 'Autogrooming',
				code: 'a'
			}, {
				label: 'Aggressive',
				code: 'a'
			}, {
				label: 'Out of sight',
				code: 'oos'
			}, {
				label: 'Contact - Grooming',
				code: 'g',
				type: 'contact'
			}, {
				label: 'Contact - Affilative Interactions',
				code: 'af',
				type: 'contact'
			}, {
				label: 'Contact - Mating',
				code: 'm',
				type: 'contact'
			}, {
				label: 'Contact - Other/Unknown',
				code: 's',
				type: 'contact'
			}, {
				label: 'Walk/Run',
				code: 'w',
				type: 'locomotion'
			}, {
				label: 'Run',
				code: 'r',
				type: 'locomotion'
			}, {
				label: 'Sit',
				code: 's',
				type: 'locomotion'
			}, {
				label: 'stand',
				code: 'st',
				type: 'locomotion'
			}, {
				label: 'Climb Up',
				code: 'cu',
				type: 'locomotion'
			}, {
				label: 'Climb Down',
				code: 'cd',
				type: 'locomotion'
			}, {
				label: 'Canopy - Upto 1m',
				code: '0',
				type: 'canopy'
			}, {
				label: 'Canopy - Between 1-5m',
				code: '1',
				type: 'canopy'
			}, {
				label: 'Canopy - Between 6-10m',
				code: '2',
				type: 'canopy'
			}, {
				label: 'Canopy - Between 11-15m',
				code: '3',
				type: 'canopy'
			}, {
				label: 'Canopy - Between 16-20m',
				code: '4',
				type: 'canopy'
			}, {
				label: 'Canopy - Between 21-25',
				code: '5',
				type: 'canopy'
			}, {
				label: 'Canopy > 25m',
				code: '6',
				type: 'canopy'
			}, {
				label: 'Canopy - Centre of tree',
				code: 'a',
				type: 'canopy'
			}, {
				label: 'Canopy - Periphery',
				code: 'b',
				type: 'canopy'
			}];
		},

		/**
		 * returns all the possible behaviors for a monkey
		 * @return JSONArray
		 */
		getBehaviorList: function() {
			return [{
				type: 'list',
				label: 'Food',
				code: 'food',
				items: [{
					type: 'list',
					label: 'Food - Fruit',
					code: 'F',
					items: [{
						label: 'Ripe',
						code: 'fr'
					}, {
						label: 'Unripe',
						code: 'fu'
					}, {
						label: 'Old',
						code: 'fo'
					}, {
						label: 'Seeds',
						code: 'fs'
					}, {
						label: 'Pulp',
						code: 'fp'
					}, {
						label: 'Cover',
						code: 'fc'
					}, {
						label: 'Water/Juice',
						code: 'fw'
					}]
				}, {
					label: 'Food - Flower Bud',
					code: 'fb'
				}, {
					type: 'list',
					label: 'Food - Leaves',
					code: 'l',
					items: [{
						label: 'Young',
						code: 'ly'
					}, {
						label: 'Mature',
						code: 'lm'
					}, {
						label: 'Old',
						code: 'lo'
					}]
				}, {
					label: 'Food - Plant Parts',
					code: 'p'
				}, {
					label: 'Food - Bark',
					code: 'b'
				}, {
					label: 'Food - Mushrooms',
					code: 'm'
				}, {
					label: 'Food - Anthropogenic',
					code: 'an'
				}, {
					type: 'list',
					label: 'Food - Anthropods',
					code: 'a',
					items: [{
						label: 'Caterpillar',
						code: 'ca'
					}, {
						label: 'Ant',
						code: 'an'
					}, {
						label: 'Ant eggs',
						code: 'eg'
					}, {
						label: 'Spider',
						code: 'sp'
					}, {
						label: 'Grass Hopper',
						code: 'gh'
					}, {
						label: 'Fly',
						code: 'fl'
					}]
				}, {
					type: 'list',
					label: 'Food - Vertebrates',
					code: 'v',
					items: [{
						label: 'Snake',
						code: 'sn'
					}, {
						label: 'Lizard',
						code: 'li'
					}, {
						label: 'Bird',
						code: 'bi'
					}, {
						label: 'Mammal',
						code: 'ma'
					}]
				}]
			}, {
				type: 'list',
				label: 'Event Sampling',
				code: 'eventsampling',
				items: [{
					label: 'Approach',
					code: 'da'
				}, {
					label: 'Leave Proximity',
					code: 'la'
				}]
			}, {
				type: 'list',
				label: 'Sexual Behaviors',
				code: 'sexualbehaviors',
				items: [{
					label: 'Sexual Present',
					code: 'sp'
				}, {
					label: 'Sexual Parade',
					code: 'sa'
				}, {
					label: 'Sexual Mount',
					code: 'so'
				}, {
					label: 'Inspect',
					code: 'si'
				}, {
					label: 'Mate',
					code: 'sm'
				}, {
					label: 'Silent Teeth/Jaw Movement',
					code: 'sj'
				}, {
					label: 'Reaching Back',
					code: 'sb'
				}, {
					label: 'Ejaculation',
					code: 'se'
				}, {
					label: 'Masturbation',
					code: 'st'
				}, {
					label: 'Refuse',
					code: 'sr'
				}]
			}, {
				type: 'list',
				label: 'Vocalizations',
				code: 'vocalizations',
				items: [{
					label: 'Contact/Lost Calls',
					code: 'vs'
				}, {
					label: 'Alarm',
					code: 'vw'
				}, {
					label: 'Female Capulation Call',
					code: 'vf'
				}, {
					label: 'Male Capulation Call',
					code: 'vm'
				}, {
					label: 'Loud Call',
					code: 'vl'
				}]
			}, {
				type: 'list',
				label: 'Infant Behaviors',
				code: 'infantrelbeh',
				items: [{
					label: 'Nurse',
					code: 'in'
				}, {
					label: 'Nipple Hold',
					code: 'ih'
				}, {
					label: 'Infant Inspection',
					code: 'ii'
				}, {
					label: 'Infant Restraint',
					code: 'ir'
				}, {
					label: 'Mouth Nipple Contact Deterrence',
					code: 'id'
				}, {
					label: 'Nipple Withdrawal',
					code: 'iw'
				}, {
					label: 'Play Rough',
					code: 'pr'
				}]
			}, {
				type: 'list',
				label: 'Food Behavior',
				code: 'foodrelatedbeh',
				items: [{
					label: 'Take Food from Hand',
					code: 'ct'
				}, {
					label: 'Competitive Exclusion',
					code: 'ce'
				}, {
					label: 'Pass Over To Feed',
					code: 'cp'
				}, {
					label: 'Mouth Approach',
					code: 'cm'
				}]
			}, {
				type: 'list',
				label: 'Other',
				code: 'other',
				items: [{
					label: 'Self Grooming',
					code: 'yg'
				}, {
					label: 'Scratch',
					code: 'ys'
				}, {
					label: 'Yawn',
					code: 'yy'
				}]
			}, {
				type: 'list',
				label: 'Aff Behaviors',
				code: 'affiliativebehav',
				items: [{
					label: 'Gree/Grasp/...',
					code: 'fa',
					properties: {
						input_monkey_id: true
					}
				}, {
					label: 'Play Face/Mock/...',
					code: 'fp'
				}, {
					label: 'Hug/Embrace/...',
					code: 'fe'
				}, {
					label: 'Expressive Run',
					code: 'fx'
				}, {
					label: 'Genital Grasp',
					code: 'fg',
					properties: {
						input_monkey_id: true
					}
				}, {
					label: 'Mount',
					code: 'fm'
				}, {
					label: 'Hip Holding',
					code: 'fa'
				}, {
					label: 'Unknown Affiliation',
					code: 'f0'
				}]
			}, {
				type: 'list',
				label: 'Aggress/Submissive',
				code: 'aggresssubmissive',
				items: [{
					label: 'Half Open Mouth/Bared Teeth/...',
					code: 'at',
					properties: {
						input_monkey_id: true
					}
				}, {
					label: 'Displacement',
					code: 'ad',
					properties: {
						input_monkey_id: true
					}
				}, {
					label: 'Chase',
					code: 'ac'
				}, {
					label: 'Hit/Grab/Push/...',
					code: 'ab',
					properties: {
						input_monkey_id: true
					}
				}, {
					label: 'Support Shake',
					code: 'ak'
				}, {
					label: 'Lunge',
					code: 'au',
					properties: {
						input_monkey_id: true
					}
				}, {
					label: 'Stamp',
					code: 'ap'
				}, {
					label: 'Harassment',
					code: 'ar'
				}, {
					label: 'Avoid',
					code: 'al',
					properties: {
						input_monkey_id: true
					}
				}, {
					label: 'Scream',
					code: 'as'
				}, {
					label: 'Flight/Crouch/...',
					code: 'av'
				}, {
					label: 'Enlisting',
					code: 'ae'
				}, {
					label: 'Unknown Agression',
					code: 'a0'
				}, {
					label: 'Ignore/Look Away',
					code: 'ai',
					properties: {
						input_monkey_id: true
					}
				}]
			}];
		},

		/**
		 * return all the possible monkey behaviors
		 * @return JSONArray
		 */
		getMonkeyBehaviors: function() {
			return [
				{
					text: 'Scratch',
					code: 'h'
				},
				{
					text: 'Pick',
					code: 'k'
				},
				{
					text: 'Groom',
					code: 'g'
				},
				{
					text: 'Aggress Tourist',
					code: 'at'
				},
				{
					text: 'Aggress Conspecific',
					code: 'ac'
				},
				{
					text: 'Tourist Threat',
					code: 'ut'
				},
				{
					text: 'Conspecific Threat',
					code: 'ct'
				},
				{
					text: 'Yawn',
					code: 'y'
				},
				{
					text: 'Proximity Contact',
					code: 'xc',
					properties: {
						allowed_click: 1
					}
				},
				{
					text: 'Proximity No Contact',
					code: 'xn',
					properties: {
						allowed_click: 1
					}
				},
				{
					text: 'Grooming Others',
					code: 'go',
					properties: {
						allowed_click: 1
					}
				},
				{
					text: 'Being Groomed',
					code: 'bg',
					properties: {
						allowed_click: 1,
						collect_data: true
					}
				},
				{
					text: 'ingesting',
					code: 'fe'
				},
				{
					text: 'processing',
					code: 'fp'
				},
				{
					text: 'foraging',
					code: 'fo'
				},
				{
					text: 'regurgitation',
					code: 'fg'
				},
				{
					text: 'drinking',
					code: 'd'
				},
				{
					text: 'locomotion',
					code: 'l'
				},
				{
					text: 'position',
					code: 'p'
				}
			];
		},

		/**
		 * return all the possible tourist behaviors
		 * @return JSONArray
		 */
		getTouristBehaviors: function() {

			return [
				{
					label: 'Tourist Feeding',
					code: 'tf',
					type: 'tourist'
				},
				{
					label: 'Tourist Agression',
					code: 'ta',
					type: 'tourist'
				},
				{
					label: 'Tourist Interaction',
					code: 'ti',
					type: 'tourist'
				},
				{
					label: 'Tourist Attention',
					code: 'tt',
					type: 'tourist'
				}
			];
		},

		/**
		 * return all the possible range restriction behaviors
		 * @return JSONArray
		 */
		getRRBehaviors: function() {
			return [];
		}
	}
});