{Template {
	$classpath: 'model.ui.templates.manage.scans.ManageScans',
	$hasScript: true,
	$macrolibs : {
		modal : "model.ui.macros.ModalMacro"
    },
    $res : {
		resources: 'model.ui.resources.AppLocalization'
	}
}}
	{macro main()}

		{section {
			id : "modal",
			macro : "showModal"
		}/}

		{section {
			id: 'deleteall',
			macro: "showDeleteAllModal"
		}/}

		{section {
			id : "success",
			type: 'div',
			macro : "showSuccess",
			bindRefreshTo : [{
				to : "file_exported",
				inside : this.data,
				recursive : true
			}]
		}/}

		<div class="border-top container-accordion">
			
			{section {
				id: 'showData',
				macro: 'showData'
			}/}

			<div class="btn-group btn-group-justified border-bottom">
				/*<a class="btn btn-default btn-primary" role="button" href="javascript:void(0);" {on click {fn: 'onExportFileClick', scope: this}/}>
					Export Text File
				</a>*/
				<a class="btn btn-default btn-primary" role="button" href="javascript:void(0);" {on click {fn: 'onExportExcelClick', scope: this}/}>
					Export Excel Sheet
				</a>
				<a class="btn btn-default btn-primary" role="button" href="javascript:void(0);" {on click {fn: 'clearAll', scope: this}/}>
					Delete All Scans
				</a>
			</div>
		</div>
	{/macro}

	{macro showData()}
		<div class="accordion">
			<div class="accordion-group">
				<div class="accordion-heading">
					<a class="accordion-toggle" data-toggle="collapse" href="javascript:void(0);" {on click {fn: 'onToggleClick', scope: this, args: {child: 'collapseFS'}}/}>
						Focal Data
					</a>
				</div>
				<div {id "collapseFS"/} class="accordion-body collapse">
					<div class="accordion-inner">
						{section {
							id: 'fsData',
							type: 'div',
							macro: {
								name: 'dataMacro',
								scope: this,
								args: ['fs']
							}
						}/}
					</div>
				</div>
			</div>
			<div class="accordion-group">
				<div class="accordion-heading">
					<a class="accordion-toggle" data-toggle="collapse" href="javascript:void(0);" {on click {fn: 'onToggleClick', scope: this, args: {child: 'collapseGR'}}/}>
						Group Record
					</a>
				</div>
				<div {id "collapseGR"/} class="accordion-body collapse">
					<div class="accordion-inner">
						{section {
							id: 'gsData',
							type: 'div',
							macro: {
								name: 'dataMacro',
								scope: this,
								args: ['gs']
							}
						}/}
					</div>
				</div>
			</div>
			<div class="accordion-group">
				<div class="accordion-heading">
					<a class="accordion-toggle" data-toggle="collapse" href="javascript:void(0);" {on click {fn: 'onToggleClick', scope: this, args: {child: 'collapseTR'}}/}>
						Tourist Record
					</a>
				</div>
				<div {id "collapseTR"/} class="accordion-body collapse">
					<div class="accordion-inner">
						{section {
							id: 'tsData',
							type: 'div',
							macro: {
								name: 'dataMacro',
								scope: this,
								args: ['ts']
							}
						}/}
					</div>
				</div>
			</div>
			<div class="accordion-group">
				<div class="accordion-heading">
					<a class="accordion-toggle" data-toggle="collapse" href="javascript:void(0);" {on click {fn: 'onToggleClick', scope: this, args: {child: 'collapseRR'}}/}>
						${this.resources.label.tx_lbl_range_restriction}
					</a>
				</div>
				<div {id "collapseRR"/} class="accordion-body collapse">
					<div class="accordion-inner">
						{section {
							id: 'rrData',
							type: 'div',
							macro: {
								name: 'dataMacro',
								scope: this,
								args: ['rr']
							}
						}/}
					</div>
				</div>
			</div>
		</div>
	{/macro}

	{macro dataMacro(type)}
		<ul class="list-group">
			{if this.data.scans[type] != null && this.data.scans[type].length > 0}
				{foreach scan in this.data.scans[type]}
					<li class="list-group-item">
						<button type="button" class="close" data-dismiss="alert" {on click {fn: 'onDeleteClick', scope: this, args: {'type': type,'index': scan.index, group: scan.group, timeStamp: scan.timeStamp}}/}>
							×
						</button>
						${scan.label}
					</li>
				{/foreach}
			{else/}
				<li class="no-data">
					Sorry!!! There is no data.
				</li>
			{/if}
		</ul>
	{/macro}

	{macro showSuccess()}
		{if this.data.file_exported != null}
			{call modal.showModal({
				message: 'File is successfully exported to disk',
				closeCb: {
					fn: 'onCloseTap',
					scope: this
				},
				buttons: [{
					label: 'OK',
					callback: {
						fn: 'onCloseTap',
						scope: this
					}
				}]
			})/}
		{/if}
	{/macro}

	{macro showModal()}
		<div {id 'modalBox'/} style="display: none">
			{call modal.showModal({
				message: 'Are you sure you want to delete this record?',
				closeCb: {
					fn: 'onCloseEvent',
					scope: this
				},
				buttons: [{
					label: 'Yes',
					callback: {
						fn: 'onYesClick',
						scope: this
					}
				},{
					label: 'No',
					callback: {
						fn: 'onCloseEvent',
						scope: this
					}
				}]
			})/}
		</div>
	{/macro}

	{macro showDeleteAllModal()}
		<div {id 'modalDelAll'/} style="display: none">
			{call modal.showModal({
				message: 'Are you sure you want to delete all the records?',
				closeCb: {
					fn: 'onCloseEvent',
					scope: this
				},
				buttons: [{
					label: 'Yes',
					callback: {
						fn: 'onDeleteAllClick',
						scope: this
					}
				},{
					label: 'No',
					callback: {
						fn: 'onCloseEvent',
						scope: this
					}
				}]
			})/}
		</div>
	{/macro}
{/Template}