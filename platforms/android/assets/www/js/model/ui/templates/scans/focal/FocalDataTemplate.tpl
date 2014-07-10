{Template {
	$classpath: 'model.ui.templates.scans.focal.FocalDataTemplate',
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
				to : "focal_saved",
				inside : this.data,
				recursive : true
			}]
		}/}
		<div class="container focal-data">
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
							<a href="javascript: void(0);" data-toggle="tab">Tourist</a>
						</li>
						<li {on tap {fn: 'onRRFocalScanClick', scope: this}/}>
							<a href="javascript: void(0);" data-toggle="tab">${this.resources.label.tx_lbl_range_restriction}</a>
						</li>
						<li class="active">
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

							<form role="form" {id "frmFocal"/}>
								<div class="form-group">
									<label for="MONKEY_ID_1">Monkey ID</label>
									<input type="text" name="monkey_id" class="form-control" {id "MONKEY_ID_1"/} placeholder="Monkey ID" value="${this.data.focalData.monkey_id}" {on keyup {fn: 'startTimer', scope: this}/}>
								</div>
								<div class="form-group">
									{call application.createActivityAutoComplete({
										id: 'ACTIVITY_CODE_1',
										labelText: 'Activity Code',
										name: 'activity_code',
										type: 'text',
										value: this.data.focalData.activity_code,
										placeholder: 'Activity Code',
										keyupFn: {
											fn: 'startTimer',
											scope: this
										},
										class: 'form-control',
										noDel: true,
										populate: 'C'
									})/}
								</div>
								{call application.createBehaviorField({
									divCss: 'form-group',
									id: 'BEHAVIOR_SEQ_1',
									name: 'behavior_seq',
									onKeyUp: {
										fn: 'onBehaviorClick',
										scope: this
									},
									behavior_seq: this.data.focalData.behavior_seq
								})/}
								{section {
									id: 'monkeyButton',
									type: 'div',
									macro: {
										name: 'monkeyButtons',
										scope: this
									},
									bindRefreshTo : [{
								        to : "paused",
								        inside : this.data,
								        recursive : true
								    }]
								}/}
							</form>
						</div>
					</div>
				</div>
			{/if}
		</div>
	{/macro}

	{macro monkeyButtons()}
		<div class="btn-group btn-group-justified border-bottom">
			<a class="btn btn-default btn-primary" role="button" href="javascript:void(0);" {id "btnSave"/} {on click {fn: 'onScanOver', scope: this}/}>
				Save (${this.data.timer})
			</a>
			{if this.data.paused}
				<a class="btn btn-default btn-primary" role="button" href="javascript:void(0);" {id "btnContinue"/} {on click {fn: 'onContinueClick', scope: this}/}>
					Continue
				</a>
			{/if}
		</div>
	{/macro}

	{macro showSuccess()}
		{if this.data.focal_saved}
			{call modal.showModal({
				message: 'Focal data is saved :)',
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
			${this.data.focal_saved = false|eat}
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