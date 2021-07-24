var https = require('https')

const users=[{
    "id": 1,
    "name": "Leanne Graham",
    "email": "Sincere@april.biz",
    "phone": "1-770-736-8031 x56442"
}]

var app = app.get('/users', function(request, response) {
    response.json({})
});


const hostname = '127.0.0.1';
const port = 3001;

app.listen(port,hostname);