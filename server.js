// Sets up Express.js Node Server
var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');

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

var stores_obj;

// While waiting for end-points, storing test data in here
var tmp_models_data = require('./tmp/tmp_models_data');
var axios = require('axios');
var backend_url = "http://localhost:3000";

/*
  Runs on every get request
  Populate Stores with default data
*/
app.get('*', function(req, res, next){

  function getPostsAll(){
    return axios.get(backend_url+'/sparks.json')
    // return axios.get('http://localhost:3000/sparks/1.json')
  }
  function getTagsAll(){
    return axios.get(backend_url+'/tags.json') 
  }

  // Create a promise that returns once both fn's are complete
  axios.all([getPostsAll(), getTagsAll()])
    .then(axios.spread(function(posts, tags){
      
      // Populate the stores
      stores_obj = {
        PostsStore: {
          current_posts: posts.data,
        },
        HeaderStore: {
          header_title: ""
        },
        TagStore: {
          tags_all: tmp_models_data.getTagsAll()
        }
      }

      next();

    }))
    .catch(function(response){
      res.status(404).send({ response: response, message: "Error retrieving posts/tags in server.js" });
      process.exit();
    });

});

/*
  Matches requests that have /spark/:id
  Populates the PostsStore selected_post with data from spark/:id
*/
app.get('/spark/:id', function(req, res, next){

  var id = parseInt(req.params.id);

  axios.get(`${backend_url}/sparks/${id}.json`)
    .then(function(response){

      // pass returned data into selected_post
      stores_obj.PostsStore.selected_post = response.data;
      stores_obj.HeaderStore.header_title = response.data.title;
      next();
    })
    .catch(function(response){
      res.status(404).send({ response: response, message: `Error retrieving spark with id:${id}` });
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