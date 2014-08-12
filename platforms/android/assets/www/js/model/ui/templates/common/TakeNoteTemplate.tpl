{Template{
	$classpath: 'model.ui.templates.common.TakeNoteTemplate',
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
				to : "notes_saved",
				inside : this.data,
				recursive : true
			}]
		}/}

		<div class="container take-note">
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
				<div class="form-border">

					{section {
					    id : "errorSection",
					    macro : "printError",
					    bindRefreshTo : [{
					        to : "error_occured",
					        inside : this.data.errors,
					        recursive : true
					    }]
					}/}

					<form role="form" {id "frmNote"/}>
						<div class="form-group">
							<label for="NOTES_1">Take Note</label>
							<textarea class="form-control" rows="10" {id "NOTES_1"/} name="notes"></textarea>
						</div>
						<div class="btn-group btn-group-justified border-bottom">
							<a class="btn btn-default btn-primary" role="button" href="javascript:void(0);" {on click {fn: 'onSaveNoteClick', scope: this}/}>
								Save Note
							</a>
						</div>
					</form>
				</div>
			{/if}
		</div>
	{/macro}

	{macro showSuccess()}
		{if this.data.notes_saved}
			{call modal.showModal({
				message: 'Notes are saved :)',
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
			})/};
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