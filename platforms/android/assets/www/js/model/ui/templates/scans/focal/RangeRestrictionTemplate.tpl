{Template {
	$classpath: 'model.ui.templates.scans.focal.RangeRestrictionTemplate',
	$hasScript: true,
	$res : {
		resources: 'model.ui.resources.AppLocalization'
	},
	$macrolibs : {
        message : "model.ui.macros.MessageMacro"
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
							<a href="javascript: void(0);" data-toggle="tab">Range Restriction</a>
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
									<label for="RR_PRESENT_1">Range Restriction Present</label>
									<div>
										<input type="radio" name="hasRange" value="true" {id "RR_PRESENT_1_1"/} class="form-control-radio" {if this.data.rrSession.hasRange == null || this.data.rrSession.hasRange == 'true'} checked{/if}>Yes</input>
										<input type="radio" name="hasRange" value="false" {id "RR_PRESENT_1_2"/} class="form-control-radio" {if this.data.rrSession.hasRange == 'false'} checked{/if}>No</input>
									</div>
								</div>
								<div class="form-group">
									<label for="RR_TYPE">Range Restriction Type</label>
									<input type="text" name="type_rr" class="form-control" {id "RR_TYPE"/} placeholder="Type of Range Restriction" {on keyup {fn: 'startTimer', scope: this}/} {if this.data.rrSession.type_rr != null}value="${this.data.rrSession.type_rr}"{/if}>
								</div>
								<div class="form-group inline">
									<label for="RR_TYPE">Group Behavior</label>
									<input type="text" name="group_behavior" class="form-control" {id "GRP_BEHAV"/} placeholder="Group Behavior" {on keyup {fn: 'startTimer', scope: this}/}>
								</div>
								<div class="form-group inline">
									<label for="AREA_CODE_1">Area Code</label>
									<input type="text" name="area_code" class="form-control" {id "AREA_CODE_1"/} placeholder="Area Code" {on keyup {fn: 'startTimer', scope: this}/} {if this.data.rrSession.area_code != null}value="${this.data.rrSession.area_code}"{/if}>
								</div>
								<div class="form-group inline">
									<label for="MONKEY_ID_1">Monkey ID</label>
									<input type="text" name="monkey_id" class="form-control" {id "MONKEY_ID_1"/} placeholder="Monkey ID" {on keyup {fn: 'startTimer', scope: this}/} {if this.data.rrSession.monkey_id != null}value="${this.data.rrSession.monkey_id}"{/if}>
								</div>
								<div class="form-group">
									<label for="BEHAVIOR_SEQUENCE_1">Behavior Sequence</label>
									<textarea class="form-control" name="behavior_seq" rows="3" {id "BEHAVIOR_SEQUENCE_1"/}>{if this.data.rrSession.behavior_seq != null}${this.data.rrSession.behavior_seq}{/if}</textarea>
								</div>
								{section {
									id: 'behButtons',
									type: 'div',
									macro: {
										name: 'showBehButton',
										scope: this
									},
									bindRefreshTo: [{
										inside: this.data,
										to: 'behavior_button_refresh'
									}]
								}/}
								<div class="btn-group btn-group-justified border-bottom">
									<a class="btn btn-default btn-primary" role="button" href="javascript:void(0);" {id "btnAddMore"/} {on click {fn: 'onAddMore', scope: this}/}>
										Add and Reset (${this.data.timer})
									</a>
								</div>
							</form>
						</div>
					</div>
				</div>
			{/if}
		</div>
	{/macro}

	{macro showBehButton()}
		{foreach behavior in this.data.behaviors}
			{if behavior_index % 3 == 0}
				<div class="btn-group btn-group-justified border-bottom">
			{/if}
			<a class="btn btn-default{if behavior.type != null} ${behavior.type}{/if}" role="button" href="javascript:void(0);" {on click {'fn': 'onBehaviorClick', 'scope': this, 'args': {'behavior': behavior}}/} {id behavior.code/}>
				(${behavior.code}) ${behavior.text}
			</a>
		    {if behavior_index % 3 == 2 || behavior_index == this.data.behaviors.length - 1}
				</div>
			{/if}
		{/foreach}
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