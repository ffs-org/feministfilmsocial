'use strict';

import request from 'request';
import path from 'path';
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const mailgun = require('mailgun-js')({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.DOMAIN });
const compileTemplate = require('./compile-template');

function subscribeHandler(req, res, next) {
  const param = {
    from: 'Feminist Film Social <hello@frministfilmsocial.com>',
    to: req.body.email,
    subject: 'Welcome to Feminist Film Social',
    html: compileTemplate('welcome', 'html')({ email: req.body.email, name: req.body.name })
  };

  mailgun.messages().send(param, (err, body) => {
    if (err) {
      next(err);
      return res.status(500).json({ error: 'Something went wrong' });
    } else {
      request({
        url: process.env.MAILCHIMP_URL,
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + process.env.MAILCHIMP_API,
          'Content-Type': 'application/json'
        },
        json: {
          'email_address': req.body.email,
          'status': 'subscribed',
        }
      }, (err, response, body) => {
        if (err) {
          return next(err, null);
        } else {
          return res.status(201).json({ res: 'ok'});
        }
      });
    }
  });
}

export default subscribeHandler;
