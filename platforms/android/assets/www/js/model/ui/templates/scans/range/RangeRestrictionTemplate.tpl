{Template {
	$classpath: 'model.ui.templates.scans.range.RangeRestrictionTemplate',
	$hasScript: true,
	$res : {
		resources: 'model.ui.resources.AppLocalization'
	},
	$macrolibs : {
		modal : "model.ui.macros.ModalMacro",
        message : "model.ui.macros.MessageMacro",
        application: "model.ui.macros.ApplicationMacro"
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
									{call application.createCGTypeAutoComplete({
										id: 'RR_TYPE',
										labelText: this.resources.label.tx_lbl_range_restriction,
										name: 'type_rr',
										type: 'text',
										placeholder: 'Type of ' + this.resources.label.tx_lbl_range_restriction,
										class: 'form-control',
										noDel: true,
										populate: 'C'
									})/}
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
								{call application.createBehaviorField({
									divCss: 'form-group',
									id: 'BEHAVIOR_SEQUENCE_1',
									name: 'behavior_seq',
									onKeyUp: {
										fn: 'onBehaviorClick',
										scope: this
									}
								})/}
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

	{macro showSuccess()}
		{if this.data.rr_saved}
			{call modal.showModal({
				message: this.resources.label.tx_lbl_range_restriction + ' data is saved :)',
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