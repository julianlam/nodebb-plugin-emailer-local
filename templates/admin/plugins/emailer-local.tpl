<div class="row">
	<div class="col-lg-9">
		<div class="panel panel-default">
			<div class="panel-heading">Emailer (Mandrill)</div>
			<div class="panel-body">
				<blockquote>
					<p>
						This plugin lets NodeBB send emails via an SMTP interface.<br /><br />
					</p>
				</blockquote>
				<form role="form" class="local-settings">
					<fieldset>
						<div class="row">
							<div class="col-sm-6">
								<div class="form-group">
									<label for="host">SMTP Host</label>
									<input placeholder="mail.example.com" type="text" class="form-control" id="host" name="host" />
								</div>
								<div class="form-group">
									<label for="port">SMTP Port</label>
									<input placeholder="465" type="text" class="form-control" id="port" name="port" />
								</div>
								<div class="form-group">
									<label for="username">Username</label>
									<input placeholder="" type="text" class="form-control" id="username" name="username" />
								</div>
								<div class="form-group">
									<label for="password">Password</label>
									<input placeholder="" type="password" class="form-control" id="password" name="password" />
								</div>
							</div>
						</div>
					</fieldset>
				</form>
			</div>
		</div>
	</div>
	<div class="col-lg-3">
		<div class="panel panel-default">
			<div class="panel-heading">Control Panel</div>
			<div class="panel-body">
				<button class="btn btn-primary" id="save">Save Settings</button>
			</div>
		</div>
	</div>
</div>

<script>
	require(['settings'], function(Settings) {
		Settings.load('local', $('.local-settings'));

		$('#save').on('click', function() {
			Settings.save('local', $('.local-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'local-saved',
					title: 'Settings Saved',
					message: 'Please reload your NodeBB to apply these settings',
					clickfn: function() {
						socket.emit('admin.reload');
					}
				})
			});
		});
	});
</script>
