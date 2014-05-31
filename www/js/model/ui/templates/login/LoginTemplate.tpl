{Template {
	$classpath: 'model.ui.templates.login.LoginTemplate',
	$hasScript: true,
	$res : {
		resources: 'model.ui.resources.AppLocalization'
	},
	$macrolibs : {
        message : "model.ui.macros.MessageMacro"
    }
}}
	{macro main()}
		<div class="container">
			<form class="form-signin" {on submit {fn: 'onFormSubmit', scope: this}/}>
				{section {
				    id : "errorSection",
				    macro : "printError",
				    bindRefreshTo : [{
				        to : "error_occured",
				        inside : this.data.errors,
				        recursive : true
				    }]
				}/}

				<h2 class="form-signin-heading">Sign in</h2>
				<input type="text" class="form-control" id="CODE_1" placeholder="2 Digit Code" autofocus="" maxlength="2">
				<input type="password" id="PASSWORD_1" class="form-control" placeholder="Password">
				<button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
				
				<label class="not-a-member">Not a Member? </label>
				<a class="register-here" {on click {fn: 'onRegisterLinkClick', scope: this}/}>Click Here</a>
			</form>
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