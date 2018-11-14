const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');



const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const RECAPTCHA_API_KEY = process.env.RECAPTCHA_API_KEY;

const LFA_BASE_URL = process.env.LFA_BASE_URL ?
                     process.env.LFA_BASE_URL :
                     'http://localhost:4200';

// set up Twilio
const TWILIO_NUMBER = process.env.TWILIO_NUMBER;
if (!TWILIO_NUMBER) {
  console.log('Please configure environment variables as described in README.md');
  process.exit(1);
}

const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));

// Host the public folder
app.use('/', express.static(app.get('public')));
app.use('/update/:id', express.static(app.get('public')));
app.use('/confirm/:id', express.static(app.get('public')));

app.post('/sms/' + process.env.TWILIO_HIDE + '/receive', (req, res) => {
  const phone = req.body.From.trim().substring(2);
  const twiml = new MessagingResponse();

  res.writeHead(200, {'Content-Type': 'text/xml'});

  app.service( 'api/phoneconfirms' ).find({
    query: {
      phone,
      $limit: 1
    }
  }).then( phoneconfirms => {
    if ( phoneconfirms.length == 1 ) {
      const phoneconfirmsId = phoneconfirms[0].id;
      app.service( 'api/members' ).find({
        query: {
          username: phoneconfirms[0].username,
          $limit: 1
        }
      }).then( members => {
        if ( members.length == 1 ) {
          members[0].phone = phoneconfirms[0].phone;
          members[0].lastChanged = new Date().getTime();

          const theId = members[0].id;
          delete members[0].id;

          app.service( 'api/members' ).update(
            theId,
            members[0]
          );
          app.service( 'api/phoneconfirms' ).remove( phoneconfirmsId );
          twiml.message('Mobile phone number successfully updated');
          res.end(twiml.toString());
        } else {
          twiml.message('Invalid member');
          res.end(twiml.toString());
        }
      });
    } else {
      twiml.message('Invalid phone number');
      res.end(twiml.toString());
    }
  });
});

// Set up Plugins and providers
app.configure(express.rest());


// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

app.set( 'SGMAIL', sgMail );
app.set( 'TWILIO', twilio );
app.set( 'TWILIO_NUMBER', TWILIO_NUMBER );
app.set( 'RECAPTCHA_API_KEY', RECAPTCHA_API_KEY );
app.set( 'LFA_BASE_URL', LFA_BASE_URL );
app.set( 'SENDGRID_SENDER', process.env.SENDGRID_SENDER );

module.exports = app;
