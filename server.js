const bodyParser = require('body-parser');
const app = require('./app/app');
const port = 8000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});




