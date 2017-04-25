var express = require('express');
var app = express();
var Mailgun = require('mailgun-js');
const config = require("./config.js");
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('pong');
});

app.post("/mail", function(req, res) {
    var mailgun = new Mailgun({apiKey: config.mailgunApiKey, domain: config.domain});

    var data = {
        from: req.body.email,
        to: config.recipientMail,
        subject: 'Confirmation reçu de ' + req.body.name + ' ✔',
        html: '' +
        '<b>Nouvelle confirmation reçu de ' + req.body.name + ' :</b>' +
        '<br><br>Présent pour : ' + req.body.events + '' +
        '<br>Nombre : ' + req.body.guests + '' +
        '<br>Infos. comp. : ' + req.body.message + '' +
        '<br><br>Via : ' + req.body.email
    };

    // Confirm email to send to guest
    var callbackMail = {
        from: config.contactMail,
        to: req.body.email,
        subject: 'Confirmation bien envoyée ✔',
        html: '' +
        'Merci pour votre confirmation et à très vite pour faire la fête :)' +
        '<br>D’ici là, on retourne à nos cutters, machines à coudre et pots de peinture pour vous préparer' +
        '<br>une soirée d’enfer!' +
        '<br>Et si parmi vous se cachent des petits filous qui préparent des surprises, vous pouvez contacter' +
        '<br>Raymond Halbeisen (halbeisenray@free.fr), le grand frère de Julien, qui nous aide à organiser le déroulement de la soirée.' +
        '<br><br>Céline & Julien'
    };

    // send mail with defined transport object
    console.log("send mail...");
    mailgun.messages().send(data, function (err, body) {
        if(err){
            console.error("Error on mailgun.messages():", err);
            return res.status(500).send("error with mailgun.messages()");
        }

        // ignore error on this mail
        mailgun.messages().send(callbackMail, function(err) {
            if (err) {
                console.error("Unable to send callback mail to " + req.body.email, err);
                // try to contact admin to tell problem
                mailgun.messages().send({
                    from: config.contactMail,
                    to: "bret.maxime@gmail.com, " + config.recipientMail,
                    subject: "Unable to deliver mail to " + req.body.email,
                    html: "Unable to deliver confirmation callback mail to " + req.body.email + "." +
                    "<br>Here are the error details:" +
                    "<br><br>" + err.stack
                });
            }
        });

        return res.status(201).send('Confirmation envoyée');
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});