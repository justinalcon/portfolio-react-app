// Sets up Express.js Node Server
var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');
var cookies = require('cookie-parser');

// Babel ES6/JSX Compiler
require('babel-register');
// JS templating engine - http://paularmstrong.github.io/swig/
var swig  = require('swig');

// React 
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var Iso = require('iso');
var routes = require('./src/routes');
var alt = require('./src/js/alt');

// Configure `app` as express instance
var ip = '0.0.0.0';
var port = 8080;
var app = express();


app.use(logger('dev'))
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname,'src/views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(require('connect-livereload')());
app.use(cookies());


// The base url of our end-points
var endpoint_url = require('./src/js/utils').endpoint_url;

// AJAX library with Promises. How XHR communicte with 'endpoint_url'
var axios = require('axios');

// Placeholder. This is where we will prepopulate all data that is returned from endpoints.
// Using Alt with Iso, we bootstrap here in server.js, and then bootstrap in client.js to sync.
var stores_obj = {};

/*
** Check auth_token, otherwise redirect to login page
*/
app.get('/login', function(req, res, next){
  // On login page, set a var so we dont redirect into infinite loop
  res.locals.login_page = true;
  console.log("*********", req.url);
  stores_obj = {
    UserStore: {
      is_logged_in: false,
      pre_login_req_url: req.query.original_req
    }
  }
  next();
});
app.get('*', function(req, res, next){
  // console.log("*** AUTH TOKEN:", req.cookies.auth_token);
  if(res.locals.login_page !== true && req.cookies.auth_token == undefined){
    res.redirect('/login?original_req='+encodeURIComponent(req.url));
  } else {
    next();
  } 
});

/*
  Runs on every get request
  Populate Stores with default data
*/
app.get('*', function(req, res, next){

  // If we're on login page, and still unauthenticated, skip this middleware.
  if(res.locals.login_page){
    next();
  }

  function getPostsAll(){
    return axios.get(`${endpoint_url}/sparks.json?start=0&limit=9&token=${req.cookies.auth_token}`)
  }
  function getTagsAll(){
    return axios.get(`${endpoint_url}/tags.json?token=${req.cookies.auth_token}`) 
  }

  // Create a promise that returns once both fn's are complete
  axios.all([getPostsAll(), getTagsAll()])
    .then(axios.spread(function(posts, tags){

      // Populate the stores
      stores_obj = {
        PostsStore: {
          current_posts: posts.data
        },
        HeaderStore: {
          header_title: ""
        },
        TagStore: {
          tags_all: tags.data
        },
        UserStore: {
          auth_token: req.cookies.auth_token,
          user_role: req.cookies.user_role,
          is_logged_in: true
        }
      }

      next();

    }))
    .catch(function(response){
      res.status(404).send({ 
        message: "Error retrieving posts/tags in server.js", 
        status: response.status,
      });
      process.exit();
    });

});

/*
  Matches requests that have /spark/:id
  Populates the PostsStore selected_post with data from spark/:id
*/
app.get('/spark/:id', function(req, res, next){

  var id = parseInt(req.params.id);

  axios.get(`${endpoint_url}/sparks/${id}.json?token=${req.cookies.auth_token}`)
    .then(function(response){

      // pass returned data into selected_post
      stores_obj.PostsStore.selected_post = response.data;
      stores_obj.HeaderStore.header_title = response.data.title;
      next();

    })
    .catch(function(response){
      res.status(404).send({ 
        message: `Error retrieving spark with id:${id}`,
        status: response.status,
      });
      process.exit();
    });
  
});



/*
  Serves page data based on React Router 
*/
app.use(function(req, res) {
  
  // We take the locals data we have fetched and seed our stores with data
  alt.bootstrap(JSON.stringify(stores_obj || {}));

  // Create a new instance of iso to pass data down to server
  var iso = new Iso.default();

  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      
      // Compile correct components based on routing context. defined in ./src/routes
      // `renderToString` will render React Components to a string that client.js can rehydrate
      var content = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));

      // Add the content to Iso, and call flush -- take a snapshot, render the data, and reset your stores so they are ready for the next request.
      // 1. https://github.com/goatslacker/alt#alt-features
      // 2. https://github.com/goatslacker/iso
      iso.add(content, alt.flush());
      // Render to swig HTML template
      res.render('index', { html: iso.render() });

    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.listen(port, ip, function(){
  console.log('Express listening on ' + ip + ':' + port);
});