{Template {
	$classpath: 'model.ui.templates.common.ScanSelectionTemplate',
	$hasScript: true	
}}
	{macro main()}
		<div class="tab-content">
			<div class="form-border selection-data-border">
				<div class="btn-group btn-group-justified border-bottom">
					<button class="btn btn-default btn-primary btn-big-rect" role="button" href="javascript:void(0);" {on click {fn: 'onGroupClick', scope: this}/}>
						Group Collection
					</button>
					<button class="btn btn-default btn-primary btn-big-rect" role="button" href="javascript:void(0);" {on click {fn: 'onFocalClick', scope: this}/}>
						Focal Collection
					</button>
					<button class="btn btn-default btn-primary btn-big-rect" role="button" href="javascript:void(0);" {on click {fn: 'onTouristClick', scope: this}/}>
						Tourist Record
					</button>
					<button class="btn btn-default btn-primary btn-big-rect" role="button" href="javascript:void(0);" {on click {fn: 'onRangeClick', scope: this}/}>
						Range Restriction
					</button>
				</div>
			</div>
		</div>
	{/macro}
{/Template}