<h1><i class="fa fa-envelope-o"></i> Emailer (Local)</h1>

<div class="row">
	<div class="col-lg-12">
		<blockquote>
			This plugin lets NodeBB send emails via an SMTP interface.
		</blockquote>
	</div>
</div>

<hr />

<form role="form">
	<fieldset>
		<div class="row">
			<div class="col-sm-12">
				<div class="form-group">
					<label for="emailer:local:host">Host</label>
					<input type="text" class="form-control" id="emailer:local:host" data-field="emailer:local:host" />
				</div>
			</div>
			<div class="col-sm-12">
				<div class="form-group">
					<label for="emailer:local:port">Port</label>
					<input type="text" class="form-control" value="25" id="emailer:local:port" data-field="emailer:local:port" />
				</div>
			</div>
			<div class="col-sm-12">
				<div class="form-group">
					<label for="emailer:local:username">User</label>
					<input type="text" class="form-control" id="emailer:local:username" data-field="emailer:local:username" />
				</div>
			</div>
			<div class="col-sm-12">
				<div class="form-group">
					<label for="emailer:local:password">Password</label>
					<!-- Only after https://github.com/designcreateplay/NodeBB/commit/6f129d9c68f998c9de08618c9b56f06f6841abd7 -->
					<input type="password" class="form-control" id="emailer:local:password" data-field="emailer:local:password" />
					<!-- If you're using an older commit, use type="text". Or pulling the up-to-date version would be even better ;) -->
				</div>
			</div>
		</div>

		<button class="btn btn-lg btn-primary" id="save">Save</button>
	</fieldset>
</form>

<script type="text/javascript">
	require(['forum/admin/settings'], function(Settings) {
		Settings.prepare();
	});
</script>
