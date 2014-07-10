{Template {
	$classpath: 'model.ui.templates.scans.focal.TouristDataTemplate',
	$hasScript: true,
	$res : {
		resources: 'model.ui.resources.AppLocalization'
	},
	$macrolibs : {
        message : "model.ui.macros.MessageMacro"
    }
}}
	{macro main()}
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
						<li class="active">
							<a href="javascript: void(0);" data-toggle="tab">Tourist</a>
						</li>
						<li {on tap {fn: 'onRRFocalScanClick', scope: this}/}>
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

							<form role="form" {on submit {fn: 'onScanOver', scope: this}/} {id 'frmFocalTourist'/}>
								<div class="form-group">
									<label for="TOURIST_PRESENT_1">Tourist Present</label>
									<div>
										<input type="radio" name="hasTourist" value="true" {id "TOURIST_PRESENT_1_1"/} class="form-control-radio" {if this.data.focalSession.hasTourist == null || this.data.focalSession.hasTourist == 'true'} checked{/if} {on click {fn:'onTouristPresentCheck', scope: this, args: {present: true}}/}>Yes</input>
										<input type="radio" name="hasTourist" value="false" {id "TOURIST_PRESENT_1_2"/} class="form-control-radio" {on click {fn:'onTouristPresentCheck', scope: this, args: {present: false}}/}{if this.data.focalSession.hasTourist == 'false'} checked{/if}>No</input>
									</div>
								</div>
								<div class="form-group">
									<label for="DENSITY_1">Tourist Density</label>
									<input type="text" class="form-control" name="density" {id "DENSITY_1"/} placeholder="Torist Density" value="${this.data.focalSession.density}">
								</div>
								<div class="form-group">
									<label for="AVERAGE_AGE_1">Average Age</label>
									<div>
										<input type="radio" name="averageAge" value="ADT"{if this.data.focalSession.averageAge == null || this.data.focalSession.averageAge == 'ADT'} checked{/if} {id "AVERAGE_AGE_1_1"/} class="form-control-radio">Adult</input>
										<input type="radio" name="averageAge"{if this.data.focalSession.averageAge == 'CHD'} checked{/if} value="CHD" {id "AVERAGE_AGE_1_2"/} class="form-control-radio">Child</input>
										<input type="radio" name="averageAge"{if this.data.focalSession.averageAge == 'SPLT'} checked{/if} value="SPLT" {id "AVERAGE_AGE_1_3"/} class="form-control-radio">Mixed</input>
									</div>
								</div>
								<div class="form-group">
									<label for="GENDER_1">Gender</label>
									<div>
										<input type="radio" name="gender" value="M"{if this.data.focalSession.gender == null || this.data.focalSession.gender == 'M'} checked{/if} {id "GENDER_1_1"/} class="form-control-radio">Male</input>
										<input type="radio" name="gender"{if this.data.focalSession.gender == 'F'} checked{/if} value="F" {id "GENDER_1_2"/} class="form-control-radio">Female</input>
										<input type="radio" name="gender"{if this.data.focalSession.gender == 'S'} checked{/if} value="S" {id "GENDER_1_3"/} class="form-control-radio">Split</input>
									</div>
								</div>
								<div class="form-group">
									<label for="NATIONALITY_1">Nationality</label>
									<div>
										<input type="radio" name="nationality" value="INT"{if this.data.focalSession.nationality == null || this.data.focalSession.nationality == 'INT'} checked{/if} {id "NATIONALITY_1_1"/} class="form-control-radio">International</input>
										<input type="radio" name="nationality"{if this.data.focalSession.nationality == 'DOM'} checked{/if} value="DOM" {id "NATIONALITY_1_2"/} class="form-control-radio">Domestic</input>
										<input type="radio" name="nationality"{if this.data.focalSession.nationality == 'SPL'} checked{/if} value="SPL" {id "NATIONALITY_1_3"/} class="form-control-radio">Split</input>
									</div>
								</div>
								<div class="form-group">
									<label for="NOTES_1">Notes/Observation</label>
									<textarea class="form-control" rows="3" {id "NOTES_1"/} name="notes">{if this.data.focalSession.notes != null}${this.data.focalSession.notes}{/if}</textarea>
								</div>
								<div class="btn-group btn-group-justified border-bottom">
									<a class="btn btn-default btn-primary" role="button" href="javascript:void(0);" {id "btnSave"/} {on click {fn: 'onSaveClick', scope: this}/}>
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