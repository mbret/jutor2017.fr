var express = require('express');
var app = express();
var Mailgun = require('mailgun-js');
const config = require("./config.js");
var bodyParser = require('body-parser');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('pong');
});

app.post("/mail", function(req, res) {
    var mailgun = new Mailgun({apiKey: config.mailgunApiKey, domain: config.domain});

    console.log(req.body);
    req.body.email = "jutor2017 <contact@jutor2017.fr>"
    if (typeof req.body.guestName !== "string" || req.body.guestName.length < 1) {
        return res.status(400).json({error: "Invalid guestName"});
    }
    if (req.body.present !== "true" && req.body.present !== "false") {
        return res.status(400).json({error: "Invalid present"});
    }
    if (req.body.alone !== "alone" && req.body.alone !== "together") {
        return res.status(400).json({error: "Invalid alone"});
    }

    var mapping = {
        alone: {
            together: "accompagné(e)",
            alone: "seul(e)",
        }
    };

    var data = {
        from: req.body.email,
        to: config.recipientMail,
        subject: 'Confirmation reçu de ' + req.body.guestName + ' ✔',
        html: '' +
        'Nouvelle confirmation reçu de <b>' + req.body.guestName + ' :</b>' +
        '<br><br>Je serais présent(e) : <b>' + req.body.present + ' (' + mapping.alone[req.body.alone] + ')</b>' +
        '<br>Conjoint/enfants : <b>' + req.body.conjointName + '</b>' +
        '<br>Covoit.. : <b>' + req.body.carpooling + '</b>' +
        '<br>Intéressé(e) par le service de navette mis en place ? <b>' + req.body.helpCar + '</b>' +
        '<br>Des suggestions de chansons à intégrer à la playlist ? <b>' + req.body.songs + '</b>' +
        '<br>Vous avez des questions ? Des suggestions ? <b>' + req.body.message + '</b>'
    };

    // Confirm email to send to guest
    // var callbackMail = {
    //     from: config.contactMail,
    //     to: req.body.email,
    //     subject: 'Confirmation bien envoyée ✔',
    //     html: '' +
    //     'Merci pour votre confirmation et à très vite pour faire la fête :)' +
    //     '<br>D’ici là, on retourne à nos cutters, machines à coudre et pots de peinture pour vous préparer' +
    //     '<br>une soirée d’enfer!' +
    //     '<br>Et si parmi vous se cachent des petits filous qui préparent des surprises, vous pouvez contacter' +
    //     '<br>Raymond Halbeisen (halbeisenray@free.fr), le grand frère de Julien, qui nous aide à organiser le déroulement de la soirée.' +
    //     '<br><br>Céline & Julien'
    // };

    // send mail with defined transport object
    console.log("send mail...");
    mailgun.messages().send(data, function (err, body) {
        if(err){
            console.error("Error on mailgun.messages():", err);
            return res.status(500).send("error with mailgun.messages()");
        }

        console.log("mail sent to", config.recipientMail);
        // ignore error on this mail
        // mailgun.messages().send(callbackMail, function(err) {
        //     if (err) {
        //         console.error("Unable to send callback mail to " + req.body.email, err);
        //         // try to contact admin to tell problem
        //         mailgun.messages().send({
        //             from: config.contactMail,
        //             to: "bret.maxime@gmail.com, " + config.recipientMail,
        //             subject: "Unable to deliver mail to " + req.body.email,
        //             html: "Unable to deliver confirmation callback mail to " + req.body.email + "." +
        //             "<br>Here are the error details:" +
        //             "<br><br>" + err.stack
        //         });
        //     }
        // });

        return res.status(201).send('Confirmation envoyée');
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});