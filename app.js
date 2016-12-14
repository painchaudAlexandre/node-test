/**
 * Created by alex on 13/12/16.
 */

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser')
var Contact = require('./models/contact');
var Member = require('./models/member');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.set('view engine', 'ejs');
var contacts = [];



app.get('/', function (req, res) {
    res.sendFile('views/index.html', {root: __dirname });
});
app.get('/contact/list', function (req, res) {
    res.header('Content-Type','application/json');
 res.send(contacts);
});

app.post('/contact/add', function (req, res) {
    var contact  = new Contact(req.body.lastname, req.body.firstname);
    contacts.push(contact);

    var homeUrl = 'http://' + req.headers.host + '/';
    res.writeHead(301,
        {Location: homeUrl}
    );
    res.end();



})
// CHAT PART
var members = [];
app.get('/chat', function (req, res) {
    res.render('chat', {title: "MY SHEETY PART"});
});

io.on('connection', function(socket){
    socket.on('member_connect', function(nickname){
        var member = new Member(socket.id, nickname);
        members.push(member);
        io.emit('member_connect', members);
    });

    socket.on('member_send_message', function(nickname, message){
        var data = { "nickname" : nickname, "message" : message};
        io.emit('member_receive_message', data);
    });

    socket.on('disconnect', function(){
        var id = null;
        for (var k in members) {
            if (socket.id === members[k].id) {
                id = members[k].id;
                members.splice(k,1);
                break;
            }
        }
        io.emit('member_disconnect', socket.id);
    });
});


http.listen(8080, function(){
    console.log('===== SERVER ON =====');
});