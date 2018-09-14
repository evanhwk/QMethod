const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./config/DB');

    // For dev builds, use test database
    if (process.argv[2] == 'test') {
      process.env['MONGODB_URI'] = config.TEST_DB;
    }

    // init mongoDB
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env['MONGODB_URI'], {useNewUrlParser: true}).then(
      () => {console.log('Database is connected') },
      err => { console.log('Can not connect to the database'+ err)}
    );

    // init express
    const app = express();
    app.use(express.static(__dirname + '/dist'));
    app.use(bodyParser.json());
    app.use(cors());
    const port = process.env.PORT || 8080;

    /**
     * If an incoming request uses a protocol other than HTTPS,
     * redirect that request to the same url but with HTTPS
     */
    const forceSSL = function() {
      return function (req, res, next) {
        if (req.headers['x-forwarded-proto'] !== 'https') {
          return res.redirect(
          ['https://', req.get('Host'), req.url].join('')
          );
        }
        next();
      }
    }
    
    // Routes for RESTful API for Survey Data
    const surveyRoutes = require('./express/routes/survey.route');
    app.use('/api', surveyRoutes);

    // Routes for RESTful API for User Data
    // const userRoutes = require('./express/routes/user.route');
    // app.use('/api2', userRoutes);

    // For all GET requests, send back index.html
    // so that PathLocationStrategy can be used
    app.get('/*', function(req, res) {
      res.sendFile(path.join(__dirname + '/dist/index.html'));
    });

    // const server =
    app.listen(port, function(){
     console.log('Listening on port ' + port);
    });