{Template {
	$classpath: 'model.ui.templates.scans.group.GroupScanTemplate',
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
				to : "group_saved",
				inside : this.data,
				recursive : true
			}]
		}/}
		<div class="container group-data">
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
						<div class="form-border group-data-border">

							{section {
							    id : "errorSection",
							    macro : "printError",
							    bindRefreshTo : [{
							        to : "error_occured",
							        inside : this.data.errors,
							        recursive : true
							    }]
							}/}

							<form role="form" {id "frmGroup"/}>
								<div class="form-group">
									<label for="ACTIVITY_CODE_1">Activity Code</label>
									<input id="ACTIVITY_CODE_1" name="activity_code" type="text" role="textbox" placeholder="Activity Code" class="form-control">
								</div>
								<div class="form-group">
									<label for="USE_SPACE_1">Use of Space</label>
									<input type="text" name="use_of_space" class="form-control" {id "USE_SPACE_1"/} placeholder="Use of Space">
								</div>
								<div class="form-group">
									<label for="TOURIST_PRESENT_1">Tourist Present</label>
									<div>
										<input type="radio" name="hasTourist" value="true" {id "TOURIST_PRESENT_1_1"/} class="form-control-radio" checked {on click {fn:'onTouristPresentCheck', scope: this, args: {present: true}}/}>Yes</input>
										<input type="radio" name="hasTourist" value="false" {id "TOURIST_PRESENT_1_2"/} class="form-control-radio" {on click {fn:'onTouristPresentCheck', scope: this, args: {present: false}}/}>No</input>
									</div>
								</div>
								<div class="form-group">
									<label for="NO_OF_TOURIST_1">Number of Tourist</label>
									<input type="text" name="no_of_tourist" class="form-control" {id "NO_OF_TOURIST_1"/} placeholder="Number of Tourist">
								</div>
								<div class="form-group">
									<label for="NOTES_1">Notes/Observation</label>
									<textarea class="form-control" name="notes" rows="3" {id "NOTES_1"/}></textarea>
								</div>
								<div class="btn-group btn-group-justified border-bottom btn-extra-margin">
									<a class="btn btn-default btn-primary" role="button" href="javascript:void(0);" {id "btnSave"/} {on click {fn: 'onScanOver', scope: this}/}>
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

	{macro showSuccess()}
		{if this.data.group_saved}
			{call modal.showModal({
				message: 'Group Scan data is saved :)',
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
			${this.data.group_saved = false|eat}
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