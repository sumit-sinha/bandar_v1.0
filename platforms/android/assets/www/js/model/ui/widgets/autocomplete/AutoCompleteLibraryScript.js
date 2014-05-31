Aria.tplScriptDefinition({
    $classpath : 'model.ui.widgets.autocomplete.AutoCompleteLibraryScript',
    $dependencies : [
    	"model.ui.widgets.autocomplete.AutoCompleteResources", 
    	"aria.html.controllers.Suggestions"
    ],
	$prototype : {
		
		createSuggestionController: function(input) {
            
			var controller = {};
			controller.suggestionsController = Aria.getClassInstance("aria.html.controllers.Suggestions");
            controller.suggestionsController.setResourcesHandler(new model.ui.widgets.autocomplete.AutoCompleteResources(input.source));
		
			return controller;
		},
		
        reactOnType : function (evt, args) {
			
			this.showCross(args);

			if(args.input.keyupFn!=null)			
					this.$callback(args.input.keyupFn);
			var value = '';
			var inputEL = document.getElementById(args.input.id);
			if (inputEL != null) {
			
				if (args.showEmpty == null 
					|| args.showEmpty == false) {
					value = inputEL.value;
				}
				
				// get suggestions
				args.suggestionsController.suggestValue(value);
			}
			
			// show search button
            var searchButton = document.getElementById(args.input.id + 'btn');
			if (searchButton != null) {
				if (value == '') {
					searchButton.style.display = 'none';
				} else {
					searchButton.style.display = 'block';
				}
			}
			
        },
		
		showCross: function (args) {

			var inputEL = document.getElementById(args.input.id);
			var delEL = document.getElementById('del' + args.input.id);

			if (inputEL != null && delEL != null) {
				if (inputEL.value == '') {
					delEL.className += ' hidden';
				} else if (delEL.className.indexOf('hidden') != -1) {
					delEL.className = delEL.className.replace(/(?:^|\s)hidden(?!\S)/g, '');
				}
			}
		},
		
		clearField: function (evt, args) {			
			var inputEL = document.getElementById(args.input.id);
			var delEL = document.getElementById('del' + args.input.id);			

			if (inputEL != null && delEL != null) {
				inputEL.value = '';
				delEL.className += ' hidden';
			}
			
		},

        focusSearch: function(evt, args) {
			var inputEL = document.getElementById(args.input.id);
			if (inputEL != null) {
				inputEL.focus();
			}
        },

        select : function (evt, args) {
            evt.preventDefault(true);
            args.suggestionsController.setSelected(args.suggestion);
			var inputEL = document.getElementById(args.input.id);
			if (inputEL != null) {
				// show selected result
				inputEL.value = args.suggestion.label;
			}
						
			if(args.input.selectFn!=null){	
				var cb = {
					fn: args.input.selectFn.fn,
					args: args,
					scope: args.input.selectFn.scope				
				};
				this.$callback(cb);	
			}
			
			if(args.input.onblur!=null)			
					this.$callback(args.input.onblur);
			
        },
		
		onInputBlur: function(event, args) {
			var current = this;
			args.showEmpty = true;
			if(args.input.onblur!=null)
			{				
				this.$callback(args.input.onblur);
			}
			setTimeout(function(){current.reactOnType(event, args)},500);
		}
    }
});