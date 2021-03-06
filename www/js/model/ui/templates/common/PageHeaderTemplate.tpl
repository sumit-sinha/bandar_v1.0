{Template{
	$classpath: 'model.ui.templates.common.PageHeaderTemplate',
	$hasScript: true,
	$res : {
		resources: 'model.ui.resources.AppLocalization'
	}
}}
	{macro main()}
		<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse" {on tap {fn: 'onMenuClick', scope: this}/} {id 'navbar'/}>
		            	<span class="sr-only">Toggle navigation</span>
		            	<span class="icon-bar"></span>
		            	<span class="icon-bar"></span>
		            	<span class="icon-bar"></span>
		          	</button>
		          	<a class="navbar-brand" href="javascript:void(0)">Bandar{if typeof pageEngine.getData == 'function' && pageEngine.getData() != null && pageEngine.getData().appData['user'] != null && pageEngine.getData().appData['user'].selectedGroup != null && pageEngine.getData().appData['user'].selectedGroup != ''} [${pageEngine.getData().appData['user'].selectedGroup}]{/if}</a>
		        </div>
		    </div>
		</div>
        <div class="navbar-vertical navbar-position" {id 'navmenu'/}>
			<ul class="nav-vertical navbar-nav-vertical">
				{if this.utils.isLoggedIn()}
					<li>
						<a href="javascript:void(0)" {on click {fn: 'onGroupClick', scope: this}/}>
							Monkey Groups
						</a>
					</li>
					<li>
						<a href="javascript:void(0)" {on click {fn: 'onManageClick', scope: this}/}>
							Manage Recorded Data
						</a>
					</li>
					<li class="divider"></li>
					{if this.isGroupSelected()}
						<li>
							<a href="javascript:void(0)" {on click {fn: 'onGroupScanClick', scope: this}/}>
								Group Collection
							</a>
						</li>
						<li>
							<a href="javascript:void(0)" {on click {fn: 'onFocalDataClick', scope: this}/}>
								Focal Collection
							</a>
						</li>
						<li>
							<a href="javascript:void(0)" {on click {fn: 'onTouristScanClick', scope: this}/}>
								Tourist Record
							</a>
						</li>
						<li>
							<a href="javascript:void(0)" {on click {fn: 'onRouteRestrictionClick', scope: this}/}>
								${this.resources.label.tx_lbl_range_restriction}
							</a>
						</li>
						<li class="divider"></li>
					{/if}
					<li>
						<a href="javascript:void(0)" {on click {fn: 'onNoteClick', scope: this}/}>
							Take Note
						</a>
					</li>
					<li class="divider"></li>
					<li>
						<a href="javascript:void(0)" {on click {fn: 'onLogoutClick', scope: this}/}>
							Logout
						</a>
					</li>
					<li class="divider"></li>
					<li>
						<a href="javascript:void(0)" {on click {fn: 'onExitClick', scope: this}/}>
							Exit Application
						</a>
					</li>
					<li class="divider"></li>
				{else/}
					<li>
						<a href="javascript:void(0)" {on click {fn: 'onLoginClick', scope: this}/}>
							Login
						</a>
					</li>
					<li class="divider"></li>
					<li>
						<a href="javascript:void(0)" {on click {fn: 'onRegisterClick', scope: this}/}>
							New User? Register
						</a>
					</li>
				{/if}
			</ul>
        </div>
	{/macro}
{/Template}