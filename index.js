'use strict'

var winston = module.parent.require('winston'),
    Meta = module.parent.require('./meta'),
    local,
    config,
    Emailer = {};


Emailer.init = function(data, callback) {
    var render = function(req, res) {
        res.render('admin/plugins/emailer-local', {});
    };

    Meta.settings.get('local', function(err, settings) {
        if (!err && settings && settings.server && settings.port && settings.username && settings.password) {
            local = require('nodemailer');
            config = settings;
        } else {
            winston.error('[plugins/emailer-local] SMTP not configured!');
        }

        data.router.get('/admin/plugins/emailer-local', data.middleware.admin.buildHeader, render);
        data.router.get('/api/admin/plugins/emailer-local', render);

        if (typeof callback === 'function') {
            callback();
        }
    });
};

Emailer.send = function(data) {
  if (local) {

    var transporter = nodemailer.createTransport({
        host: config.server,
        port: config.port,
        auth: {
          user: config.username,
          pass: config.password
        }
    });
    var mailOptions = {
      from: data.from,
      to: data.to,
      html: data.html,
      text: data.plaintext,
      subject: data.subject
    };

    transporter.sendMail(mailOptions, function(error, info){
        if ( !err ) {
            winston.info('[emailer.smtp] Sent `' + data.template + '` email to uid ' + data.uid);
        } else {
            winston.warn('[emailer.smtp] Unable to send `' + data.template + '` email to uid ' + data.uid + '!!');
            // winston.error('[emailer.smtp] ' + response.message);
        }
    });
  } else {
      winston.warn('[plugins/emailer-local] SMTP not configured, not sending email as Local object is not instantiated.');
  }
}

Emailer.admin = {
  menu: function(custom_header, callback) {
      custom_header.plugins.push({
          'route': '/plugins/emailer-local',
          'icon': 'fa-envelope-o',
          'name': 'Emailer (Local)'
      });

      callback(null, custom_header);
  }
};

module.exports = Emailer;
