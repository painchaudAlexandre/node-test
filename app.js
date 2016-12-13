/**
 * Created by alex on 13/12/16.
 */

var express = require('express');
var bodyParser = require('body-parser')

var Contact = require('./models/contact');

var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var contacts = [];

app.get('/', function (req, res) {
    res.sendFile('views/index.html', {root: __dirname });
});
app.get('/contact/list', function (req, res) {
 res.send(contacts);
});

app.post('/contact/add', function (req, res) {
    contacts.push(new Contact(req.body.lastname, req.body.firstname));

    var homeUrl = 'http://' + req.headers.host + '/';
    res.writeHead(301,
        {Location: homeUrl}
    );
    res.end();



});
app.listen(8080, function () {
    console.log('=============== SERVER ON ===============');
});