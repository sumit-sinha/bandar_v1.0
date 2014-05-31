{Template {
	$classpath: 'model.ui.templates.scans.focal.FocalDataTemplate',
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
							<a href="javascript: void(0);" data-toggle="tab">Range Restriction</a>
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
									<label for="ACTIVITY_CODE_1">Activity Code</label>
									<input type="text" name="activity_code" class="form-control" {id "ACTIVITY_CODE_1"/} placeholder="Activity Code" value="${this.data.focalData.activity_code}" {on keyup {fn: 'startTimer', scope: this}/}>
								</div>
								<div class="form-group">
									<label for="BEHAVIOR_SEQUENCE_1">Behavior Sequence</label>
									<textarea class="form-control" name="behavior_seq" rows="3" {id "BEHAVIOR_SEQUENCE_1"/}>{if this.data.focalData.behavior_seq != null}${this.data.focalData.behavior_seq}{/if}</textarea>
								</div>
								{foreach behavior in this.data.behaviors}
									{if behavior_index % 3 == 0}
										<div class="btn-group btn-group-justified border-bottom">
									{/if}
									<a class="btn btn-default{if behavior.type == 'tourist'} tourist{/if}" role="button" href="javascript:void(0);" {on click {'fn': 'onBehaviorClick', 'scope': this, 'args': {'behavior': behavior}}/} {id behavior.code/}>
										(${behavior.code}) ${behavior.text}
									</a>
								    {if behavior_index % 3 == 2 || behavior_index == this.data.behaviors.length - 1}
										</div>
									{/if}
								{/foreach}
								<div class="btn-group btn-group-justified border-bottom">
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