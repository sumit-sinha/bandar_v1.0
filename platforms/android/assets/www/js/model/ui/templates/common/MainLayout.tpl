{Template {
	$classpath: 'model.ui.templates.common.MainLayout',
	$hasScript: true
}}
	{macro main()}
		<div>
			{@embed:Placeholder {
	          name : "header"
	        }/}
	        
	        {@embed:Placeholder {
	          name : "body"
	        }/}
	        
	        {@embed:Placeholder {
	          name : "footer"
	        }/}
        </div>
	{/macro}
{/Template}