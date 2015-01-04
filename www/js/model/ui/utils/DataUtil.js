Aria.classDefinition({
	$classpath: 'model.ui.utils.DataUtil',
	$singleton: true,
	$prototype: {

		/**
		 * returns an array containing all the type of Crop Guarding
		 * @return JSONArray
		 */
		getCGTypes: function() {
			return [{
				label: 'Whoops',
				code: 'w'
			}, {
				label: 'Chase',
				code: 'c'
			}, {
				label: 'Stick',
				code: 's'
			}, {
				label: 'Dog',
				code: 'd'
			}, {
				label: 'Firework',
				code: 'f'
			}, {
				label: 'Slngshot',
				code: 'l'
			}];
		},

		/**
		 * returns an array containing all the type of female swelling
		 * @return JSONArray
		 */
		getSwellingTypes: function() {
			return [{
				label: '',
				code: 'n'
			}, {
				label: '',
				code: '0'
			}, {
				label: '',
				code: '1'
			}, {
				label: '',
				code: '1-2'
			}, {
				label: '',
				code: '2'
			}];
		},

		/**
		 * return all the possible activity code
		 * @return JSONArray
		 */
		getActivityCodes: function() {
			return [{
				label: 'Climb Up',
				code: 'cu',
				type: 'locomotion'
			}, {
				label: 'Climb Down',
				code: 'cd',
				type: 'locomotion'
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
					label: 'Food - Fruit',
					code: 'f'
				}, {
					label: 'Food - Flowers',
					code: 'fl'
				}, {
					label: 'Food - Leaves',
					code: 'l'
				}, {
					label: 'Food - Mushrooms',
					code: 'm'
				}, {
					label: 'Food - Anthropogenic',
					code: 'an'
				}, {
					label: 'Food - Anthropods',
					code: 'a'
				}, {
					label: 'Food - Vertebrates',
					code: 'v'
				}]
			}, {
				type: 'list',
				label: 'Event Sampling',
				code: 'eventsampling',
				items: [{
					label: 'Approach',
					code: 'da',
					properties: {
						input_monkey_id: true
					}
				}, {
					label: 'Approach Tourist',
					code: 'tda'
				}, {
					label: 'Leave Proximity',
					code: 'la',
					properties: {
						input_monkey_id: true
					}
				}, {
					label: 'Leave Proximity-Tourist',
					code: 'tla'
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
					label: 'Groomee/Groomer',
					codes: ['mse', 'msr'],
					properties: {
						input_monkey_id: true
					}
				}, {
					label: 'Play Face/Mock/...',
					code: 'fp'
				}, {
					label: 'Hug/Embrace/...',
					code: 'fe',
					properties: {
						input_monkey_id: true
					}
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
					code: 'ac',
					properties: {
						input_monkey_id: true
					}
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

			return [{
					label: 'Tourist Feeding',
					code: 'tf',
					type: 'tourist'
				}, {
					label: 'Tourist Agression',
					code: 'ta',
					type: 'tourist'
				}, {
					label: 'Tourist Tease',
					code: 'tt',
					type: 'tourist'
				}, {
					label: 'Tourist Attention',
					code: 'tn',
					type: 'tourist'
				}, {
					type: 'list',
					label: 'Tourist Directed Aggression',
					code: 'tagg tourist',
					items: [{
						label: 'Half Open Mouth/Bared Teeth/...',
						code: 'tat',
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
						label: 'Hit/Grab/Push/...',
						code: 'tab',
						properties: {
							input_monkey_id: true
						}
					}, {
						label: 'Support Shake',
						code: 'tak'
					}, {
						label: 'Lunge',
						code: 'tau',
						properties: {
							input_monkey_id: true
						}
					}]
				}];
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