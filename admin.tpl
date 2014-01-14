<h1><i class="fa fa-envelope-o"></i> Emailer (SMTP)</h1>

<div class="row">
	<div class="col-lg-12">
		<blockquote>
			This plugin lets NodeBB send emails via an SMTP interface. The configuration is pretty straightforward.
		</blockquote>
	</div>
</div>

<hr />

<form role="form">
	<fieldset>
		<div class="row">
			<div class="col-sm-12">
				<div class="form-group">
					<label for="smtp:host">Host</label>
					<input type="text" class="form-control" id="smtp:host" data-field="smtp:host" />
				</div>
			</div>
			<div class="col-sm-12">
				<div class="form-group">
					<label for="smtp:port">User</label>
					<input type="text" class="form-control" value="25" id="smtp:port" data-field="smtp:port" />
				</div>
			</div>
			<div class="col-sm-12">
				<div class="form-group">
					<label for="smtp:username">User</label>
					<input type="text" class="form-control" id="smtp:username" data-field="smtp:username" />
				</div>
			</div>
			<div class="col-sm-12">
				<div class="form-group">
					<label for="smtp:password">Password</label>
					<!-- Only after https://github.com/designcreateplay/NodeBB/commit/6f129d9c68f998c9de08618c9b56f06f6841abd7 -->
					<input type="password" class="form-control" id="smtp:password" data-field="smtp:password" />
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