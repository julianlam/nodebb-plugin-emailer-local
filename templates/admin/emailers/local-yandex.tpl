<h1><i class="fa fa-envelope-o"></i> Yandex Emailer</h1>

<div class="row">
	<div class="col-lg-12">
		<blockquote>
			This plugin lets NodeBB send emails via Yandex SMTP.
		</blockquote>
	</div>
</div>

<hr />

<form role="form" class="emailer-local-yandex-settings">
	<fieldset>
		<div class="row">
			<div class="col-sm-12">
				<div class="form-group">
					<label for="username">Username (full email address)</label>
					<input type="text" class="form-control" id="username" name="username" placeholder="login@mydomain.tld" />
				</div>
			</div>
			<div class="col-sm-12">
				<div class="form-group">
					<label for="password">Password</label>
					<input type="password" class="form-control" id="password" name="password" />
				</div>
			</div>
		</div>

		<button class="btn btn-lg btn-primary" id="save">Save</button>
	</fieldset>
</form>

<script type="text/javascript">
	require(['settings'], function(Settings) {
		Settings.load('emailer-local-yandex', $('.emailer-local-yandex-settings'));

		$('#save').on('click', function(e) {
			e.preventDefault();
			Settings.save('emailer-local-yandex', $('.emailer-local-yandex-settings'), function() {
				app.alert({
					alert_id: 'emailer-local-yandex',
					type: 'info',
					title: 'Settings Changed',
					message: 'Please reload your NodeBB to apply these changes',
					timeout: 5000,
					clickfn: function() {
						socket.emit('admin.reload');
					}
				});
			});
		});
	});
</script>
