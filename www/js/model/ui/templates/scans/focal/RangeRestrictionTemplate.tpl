{Template {
	$classpath: 'model.ui.templates.scans.focal.RangeRestrictionTemplate',
	$hasScript: true,
	$res : {
		resources: 'model.ui.resources.AppLocalization'
	},
	$macrolibs : {
        message : "model.ui.macros.MessageMacro",
        application: "model.ui.macros.ApplicationMacro"
    }
}}
	{macro main()}
		<div class="container rr-data">
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
				<div class="border-top">
					<ul id="myTab" class="nav nav-tabs">
						<li {on tap {fn: 'onTouristFocalScanClick', scope: this}/}>
							<a href="javascript: void(0);" data-toggle="tab">Tourist Data</a>
						</li>
						<li class="active">
							<a href="javascript: void(0);" data-toggle="tab">${this.resources.label.tx_lbl_range_restriction}</a>
						</li>
						<li {on tap {fn: 'onFocalScanClick', scope: this}/}>
							<a href="javascript: void(0);" data-toggle="tab">Monkey</a>
						</li>
					</ul>
					<div class="tab-content">
						<div class="form-border focal-data-border">

							{section {
							    id : "errorSection",
							    macro : "printError",
							    bindRefreshTo : [{
							        to : "error_occured",
							        inside : this.data.errors,
							        recursive : true
							    }]
							}/}

							<form role="form" {id "frmRange"/}>
								<div class="form-group">
									<label for="RR_PRESENT_1">${this.resources.label.tx_lbl_range_restriction} Present</label>
									<div>
										<input type="radio" name="hasRange" value="true" {id "RR_PRESENT_1_1"/} class="form-control-radio" {if this.data.rrSession.hasRange == null || this.data.rrSession.hasRange == 'true'} checked{/if}>Yes</input>
										<input type="radio" name="hasRange" value="false" {id "RR_PRESENT_1_2"/} class="form-control-radio" {if this.data.rrSession.hasRange == 'false'} checked{/if}>No</input>
									</div>
								</div>
								<div class="form-group">
									{call application.createCGTypeAutoComplete({
										id: 'RR_TYPE',
										labelText: this.resources.label.tx_lbl_range_restriction,
										name: 'type_rr',
										type: 'text',
										value: this.data.rrSession.type_rr,
										placeholder: 'Type of ' + this.resources.label.tx_lbl_range_restriction,
										class: 'form-control',
										noDel: true,
										populate: 'C'
									})/}
								</div>
								<div class="form-group inline">
									<label for="RR_TYPE">Group Behavior</label>
									<input type="text" name="group_behavior" class="form-control" {id "GRP_BEHAV"/} placeholder="Group Behavior" {if this.data.rrSession.group_behavior != null}value="${this.data.rrSession.group_behavior}"{/if}>
								</div>
								<div class="form-group inline">
									<label for="AREA_CODE_1">Area Code</label>
									<input type="text" name="area_code" class="form-control" {id "AREA_CODE_1"/} placeholder="Area Code" {if this.data.rrSession.area_code != null}value="${this.data.rrSession.area_code}"{/if}>
								</div>
								<div class="btn-group btn-group-justified border-bottom">
									<a class="btn btn-default btn-primary" role="button" href="javascript:void(0);" {id "btnAddMore"/} {on click {fn: 'onAddMore', scope: this}/}>
										Save
									</a>
								</div>
							</form>
						</div>
					</div>
				</div>
			{/if}
		</div>
	{/macro}

	{macro printError()}
		{call message.printErrors({
			errors: this.data.errors,
			dismiss: {
				fn: 'dismissError',
				scope: this
			}
		})/}
	{/macro}
{/Template}