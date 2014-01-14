var fs = require('fs'),
    path = require('path'),

    winston = module.parent.require('winston'),
    Meta = module.parent.require('./meta'),

    nodemailer = require('nodemailer'),
    Emailer = {};

Emailer.send = function(data) {
    // Update the API key, if necessary
    // if (PostageApp.getApiKey && PostageApp.setApiKey && PostageApp.getApiKey() !== Meta.config['postageapp:apiKey']) {
    //  PostageApp.setApiKey(Meta.config['postageapp:apiKey']);
    // }

    var transport = nodemailer.createTransport('SMTP',{
        host: Meta.config['smtp:host'],
        auth: {
            user: Meta.config['smtp:username'],
            pass: Meta.config['smtp:password'],
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
            "name": 'Emailer (SMTP)'
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
                        name: 'Emailer (SMTP)',
                        content: tpl
                    });
                }
            });

            callback(null, custom_routes);
        });
    }
};

module.exports = Emailer;