{Template {
	$classpath: 'model.ui.templates.groups.MyGroupList',
	$hasScript: true,
	$res : {
		resources: 'model.ui.resources.AppLocalization'
	},
	$macrolibs : {
        message : "model.ui.macros.MessageMacro"
    }
}}
	{macro main()}
		<div class="container">
			{if !this.utils.isLoggedIn()}
				{call message.printErrors({
					errors: {
						list: [
							'tx_error_user_not_logged_in'
						]
					},
					cssClass: 'border-top'
				})/}
			{else/}
				<ul class="border-top list-group">
					<li>My Groups:</li>
					{foreach group in this.data.groups}
						<li class="list-group-item" {id group.code/}
							{on click {fn: 'onGroupTap', scope: this, args: {'group': group}}/}>
							${group.text} - <span>${group.code}</span>
						</li>
					{/foreach}
				</ul>
			{/if}
			{section {
				id : "scanOptions",
				type: 'div',
				macro : {
					name: "showScanOptions",
					scope: this
				},
				bindRefreshTo : [{
					to : "showScans",
					inside : this.data,
					recursive : true
				}]
			}/}
		</div>
	{/macro}

	{macro showScanOptions()}
		{if this.data.showScans != null}
			<div class="bootbox modal" tabindex="-1" role="dialog" aria-hidden="false">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-body">
							<button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true" style="margin-top: -10px;" {on tap {fn: 'closeScanOption', scope: this}/}>×</button>
							<div class="bootbox-body show-bold">Scan Options:</div>
						</div>

						<div class="btn-group btn-group-justified border-bottom">
							<div class="btn-group">
								<button class="btn btn-default" type="button" data-toggle="dropdown" {on click {fn: 'onGroupClick', scope: this}/}>Group Collection</button>
							</div>
							<div class="btn-group">
								<button class="btn btn-default" type="button" data-toggle="dropdown" {on click {fn: 'onFocalClick', scope: this}/}>Focal Collection</button>
							</div>
						</div>
						<div class="btn-group btn-group-justified border-bottom">
							<div class="btn-group">
								<button class="btn btn-default" type="button" data-toggle="dropdown" {on click {fn: 'onTouristClick', scope: this}/}>Tourist Record</button>
							</div>
							<div class="btn-group">
								<button class="btn btn-default" type="button" data-toggle="dropdown" {on click {fn: 'onRangeClick', scope: this}/}>${this.resources.label.tx_lbl_range_restriction}</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	{/macro}
{/Template}