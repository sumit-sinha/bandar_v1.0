{Template {
	$classpath: 'model.ui.templates.groups.MyGroupList',
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
				<ul class="border-top list-group">
					<li>My Groups:</li>
					{foreach group in this.data.groups}
						<li class="list-group-item" {id group.code/}
							{on click {fn: 'onGroupTap', scope: this, args: {'group': group}}/}>
							${group.text} - <span>${group.code}</span>
						</li>
					{/foreach}
				</ul>
			{/if}
		</div>
	{/macro}
{/Template}