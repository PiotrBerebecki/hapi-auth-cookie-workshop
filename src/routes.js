const home = {
  method: 'GET',
  path: '/',
  handler (req, reply) {
    reply.view('index');
  }
}

const fileServer = {
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: './public'
    }
  }
}

const login = {
  method: 'POST',
  path: '/login',
  handler (req, reply) {


    var username = req.payload.username;
    var password = req.payload.password;
    // We would normally check username and password details against database.
    // If user exists, return an object that uniquely identifies the user.
    // For this workshop skip this process and set the cookie right away...
    req.cookieAuth.set(username);

    reply.view('user-page');

  }
}

const authRoute = {
  method: 'GET',
  path: '/auth-only',
  handler (request, reply) {
    reply('You\'re not authenticated :(');
  }
}

module.exports = [
  home,
  fileServer,
  login,
  authRoute
]
