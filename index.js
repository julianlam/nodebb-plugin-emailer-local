var fs = require('fs'),
    path = require('path'),

    winston = module.parent.require('winston'),
    Meta = module.parent.require('./meta'),

    nodemailer = require('nodemailer'),
    Emailer = {};

Emailer.send = function(data) {
    var transport = nodemailer.createTransport('SMTP',{
        host: Meta.config['emailer:local:host'],
        port: Meta.config['emailer:local:port'],
        auth: {
            user: Meta.config['emailer:local:username'],
            pass: Meta.config['emailer:local:password'],
        }
    });

    transport.sendMail({
        from: data.from,
        to: data.to,
        html: data.html,
        text: data.plaintext,
        subject: data.subject
    },function(err,response) {
        if ( !err ) {
            winston.info('[emailer.smtp] Sent `' + data.template + '` email to uid ' + data.uid);
        } else {
            winston.warn('[emailer.smtp] Unable to send `' + data.template + '` email to uid ' + data.uid + '!!');
            // winston.error('[emailer.smtp] ' + response.message);
        }
    });
}

Emailer.admin = {
    menu: function(custom_header, callback) {
        custom_header.plugins.push({
            "route": '/plugins/emailer-smtp',
            "icon": 'fa-envelope-o',
            "name": 'Emailer (Local)'
        });

        return custom_header;
    },
    route: function(custom_routes, callback) {
        fs.readFile(path.join(__dirname, 'admin.tpl'), function(err, tpl) {
            custom_routes.routes.push({
                route: '/plugins/emailer-smtp',
                method: "get",
                options: function(req, res, callback) {
                    callback({
                        req: req,
                        res: res,
                        route: '/plugins/emailer-smtp',
                        name: 'Emailer (Local)',
                        content: tpl
                    });
                }
            });

            callback(null, custom_routes);
        });
    }
};

module.exports = Emailer;