Aria.classDefinition({
	$classpath: 'model.ui.templates.common.PageHeaderCtrl',
	$extends: 'model.ui.controller.ApplicationCtrl',
	$implements: ['model.ui.templates.common.IPageHeaderCtrl'],
	$prototype: {
		
		$publicInterfaceName: 'model.ui.templates.common.IPageHeaderCtrl',
		
		/**
		 * fetches header data stored in controller
		 */
		getHeaderData: function() {
			return this._data.header;
		}
	}
});