{Template {
	$classpath: 'model.ui.templates.scans.tourist.TouristDataTemplate',
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
				to : "tourist_saved",
				inside : this.data,
				recursive : true
			}]
		}/}
		<div class="container tourist-data">
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
						<li {on tap {fn: 'onTouristMScanClick', scope: this}/}>
							<a href="javascript: void(0);" data-toggle="tab">Tourist Data</a>
						</li>
						<li class="active">
							<a href="javascript: void(0);" data-toggle="tab">Monkey Data</a>
						</li>
					</ul>
					<div class="tab-content">
						<div class="form-border tourist-data-border">

							{section {
							    id : "errorSection",
							    macro : "printError",
							    bindRefreshTo : [{
							        to : "error_occured",
							        inside : this.data.errors,
							        recursive : true
							    }]
							}/}

							<form role="form" {id "frmTourist"/}>
								<div class="form-group">
									<label for="MONKEY_ID_1">Monkey ID</label>
									<input type="text" name="monkey_id" class="form-control" {id "MONKEY_ID_1"/} placeholder="Monkey ID" value="${this.data.touristData.monkey_id}">
								</div>

								{call application.createBehaviorField({
									divCss: 'form-group',
									id: 'BEHAVIOR_SEQUENCE_1',
									name: 'behavior_seq',
									hasTouristBehaviors: true,
									behavior_seq: this.data.touristData.behavior_seq,
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
		{if this.data.tourist_saved}
			{call modal.showModal({
				message: 'Tourist collection is saved :)',
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
			${this.data.tourist_saved = false|eat}
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