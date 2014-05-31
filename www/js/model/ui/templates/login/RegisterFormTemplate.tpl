{Template {
	$classpath: 'model.ui.templates.login.RegisterFormTemplate',
	$hasScript: true,
	$res : {
		resources: 'model.ui.resources.AppLocalization'
	},
	$macrolibs : {
        message : "model.ui.macros.MessageMacro"
    }
}}
	{macro main()}
		<div class="container register-form border-top">
			{section {
			    id : "errorSection",
			    macro : "printError",
			    bindRefreshTo : [{
			        to : "error_occured",
			        inside : this.data.errors,
			        recursive : true
			    }]
			}/}

			<div class="form-border register-form-border">
				<form role="form" {on submit {fn: 'onRegisterClick', scope: this}/}>
					<div class="form-group">
						<label for="CODE_1">2 Digit Code</label>
						<input type="text" maxlength="2" class="form-control" id="CODE_1" placeholder="2 Digit Code">
					</div>
					<div class="form-group">
						<label for="PASSWORD_1">Password</label>
						<input type="password" class="form-control" id="PASSWORD_1" placeholder="Password">
					</div>
					<div class="form-group">
						<label for="PASSWORD_2">Confirm Password</label>
						<input type="password" class="form-control" id="PASSWORD_2" placeholder="Confirm Password">
					</div>
					<button type="submit" class="btn btn-default">Submit</button>
				</form>
			</div>
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