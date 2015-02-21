var winston = require.main.require('winston'),
	Meta = require.main.require('./src/meta'),

	nodemailer = require('nodemailer'),
	smtpTransport = require('nodemailer-smtp-transport'),

	Emailer = {};


Emailer.init = function(data, callback) {
	function renderAdminPage(req, res, next) {
		res.render('admin/emailers/local-yandex', {});
	}

	data.router.get('/admin/emailers/local-yandex', data.middleware.admin.buildHeader, renderAdminPage);
	data.router.get('/api/admin/emailers/local-yandex', renderAdminPage);

	callback();
};

Emailer.send = function(data) {
	var username = Meta.config['emailer:local-yandex:username'];
	var pass = Meta.config['emailer:local-yandex:password'];

	if ( !username || !pass ) {
		winston.error('[Yandex Emailer]' + 'Username and Password are required but not presented');
	}

	var options = {
		debug: true,
		host: 'smtp.yandex.ru',
		port: 465,
		secure: true,
		auth: {
			user: username,
			pass: pass
		}
	};

	var transport = nodemailer.createTransport(smtpTransport(options));
	transport.sendMail({
		from: data.from,
		to: data.to,
		html: data.html,
		text: data.plaintext,
		subject: data.subject
	}, function(err, res) {
		if (!err) {
			winston.info('[Yandex Emailer] Sent `' + data.template + '` email to uid ' + data.uid);
		} else {
			winston.error('[Yandex Emailer] Unable to send `' + data.template + '` email to uid ' + data.uid + '!!' + ' The error: ' + err);
			// winston.error('[emailer.smtp] ' + response.message);
		}
	});
}

Emailer.admin = {
	menu: function(custom_header, callback) {
		custom_header.plugins.push({
			"route": '/emailers/local-yandex',
			"icon": 'fa-envelope-o',
			"name": 'Yandex Emailer'
		});

		callback(null, custom_header);
	}
};

module.exports = Emailer;
