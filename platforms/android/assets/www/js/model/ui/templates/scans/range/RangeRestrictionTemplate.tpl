{Template {
	$classpath: 'model.ui.templates.scans.range.RangeRestrictionTemplate',
	$hasScript: true,
	$res : {
		resources: 'model.ui.resources.AppLocalization'
	},
	$macrolibs : {
		modal : "model.ui.macros.ModalMacro",
        message : "model.ui.macros.MessageMacro"
    }
}}
	{macro main()}

		{section {
			id : "success",
			macro : "showSuccess",
			bindRefreshTo : [{
				to : "rr_saved",
				inside : this.data,
				recursive : true
			}]
		}/}
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
					<div class="tab-content">
						<div class="form-border rr-data-border">

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
									<label for="RR_TYPE">Range Restriction Type</label>
									<input type="text" name="type_rr" class="form-control" {id "RR_TYPE"/} placeholder="Type of Range Restriction" {on keyup {fn: 'startTimer', scope: this}/}>
								</div>
								<div class="form-group inline">
									<label for="RR_TYPE">Group Behavior</label>
									<input type="text" name="group_behavior" class="form-control" {id "GRP_BEHAV"/} placeholder="Group Behavior" {on keyup {fn: 'startTimer', scope: this}/}>
								</div>
								<div class="form-group inline">
									<label for="AREA_CODE_1">Area Code</label>
									<input type="text" name="area_code" class="form-control" {id "AREA_CODE_1"/} placeholder="Area Code" {on keyup {fn: 'startTimer', scope: this}/}>
								</div>
								<div class="form-group inline">
									<label for="MONKEY_ID_1">Monkey ID</label>
									<input type="text" name="monkey_id" class="form-control" {id "MONKEY_ID_1"/} placeholder="Monkey ID" {on keyup {fn: 'startTimer', scope: this}/}>
								</div>
								<div class="form-group">
									<label for="NOTES_1">Notes/Observation</label>
									<textarea class="form-control" rows="2" {id "NOTES_1"/} name="notes"></textarea>
								</div>
								<div class="form-group">
									<label for="BEHAVIOR_SEQUENCE_1">Behavior Sequence</label>
									<textarea class="form-control" name="behavior_seq" rows="3" {id "BEHAVIOR_SEQUENCE_1"/}></textarea>
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
										Add and Reset (+)
									</a>
									<a class="btn btn-default btn-primary" role="button" href="javascript:void(0);" {id "btnSave"/} {on click {fn: 'onScanOver', scope: this}/}>
										Save (${this.data.timer})
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

	{macro showSuccess()}
		{if this.data.rr_saved}
			{call modal.showModal({
				message: 'Range Restriction data is saved :)',
				closeCb: {
					fn: 'onModalTapEvent',
					scope: this
				},
				buttons: [{
					label: 'OK',
					callback: {
						fn: 'onModalTapEvent',
						scope: this
					}
				}]
			})/};
			${this.data.rr_saved = false|eat}
		{/if}
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