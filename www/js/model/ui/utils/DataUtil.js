Aria.classDefinition({
	$classpath: 'model.ui.utils.DataUtil',
	$singleton: true,
	$prototype: {

		/**
		 * function to be called at page load
		 */
		initialize: function() {
			
		},

		/**
		 * return all the possible monkey behaviors
		 * @return JSONArray
		 */
		getMonkeyBehaviors: function() {
			return [
				{
					text: 'Scratch',
					code: 'H'
				},
				{
					text: 'Pick',
					code: 'K'
				},
				{
					text: 'Groom',
					code: 'G'
				},
				{
					text: 'Aggress Tourist',
					code: 'AT'
				},
				{
					text: 'Aggress Conspecific',
					code: 'AC'
				},
				{
					text: 'Tourist Threat',
					code: 'UT'
				},
				{
					text: 'Conspecific Threat',
					code: 'CT'
				},
				{
					text: 'Yawn',
					code: 'Y'
				},
				{
					text: 'Proximity Contact',
					code: 'XC',
					properties: {
						allowed_click: 1
					}
				},
				{
					text: 'Proximity No Contact',
					code: 'XN',
					properties: {
						allowed_click: 1
					}
				},
				{
					text: 'Grooming Others',
					code: 'GO',
					properties: {
						allowed_click: 1
					}
				},
				{
					text: 'Being Groomed',
					code: 'BG',
					properties: {
						allowed_click: 1,
						collect_data: true
					}
				}
			];
		},

		/**
		 * return all the possible tourist behaviors
		 * @return JSONArray
		 */
		getTouristBehaviors: function() {

			/*return [
				{
					text: 'Tourist Agression',
					code: 'TA',
					type: 'tourist'
				}
			];*/

			return [
				{
					text: 'Tourist Feeding',
					code: 'TF',
					type: 'tourist'
				},
				{
					text: 'Tourist Agression',
					code: 'TA',
					type: 'tourist'
				},
				{
					text: 'Tourist Interaction',
					code: 'TI',
					type: 'tourist'
				},
				{
					text: 'Tourist Attention',
					code: 'TT',
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