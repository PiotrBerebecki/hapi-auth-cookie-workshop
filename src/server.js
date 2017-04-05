const hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');
const Handlebars = require('handlebars');
const cookieAuth = require('hapi-auth-cookie');

const routes = require('./routes.js');

const server = new hapi.Server();

server.connection({
  port: process.env.PORT || 4000
});

server.register([Vision, Inert, cookieAuth], (err) => {
  if (err) throw err;

  var options = {
    password: 'm!*"2/),p4:xDs%KEgVr7;e#85Ah^WYC',
    cookie: 'cookie-name',
    isSecure: false,
    ttl: 24 * 60 * 60 * 1000
  };

  server.auth.strategy('base', 'cookie', [options]);

  server.views({
    engines: { html: Handlebars },
    path: './src/views',
    layoutPath: './src/views/layout',
    layout: 'index'
  });

  server.route(routes);
});

module.exports = server;
