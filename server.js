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

var tmp_all_posts = [{
        id: 1,
        title: "1st spark",
        summary: "This is my summary",
        dev_notes: "My dev notes ",
        direct_link: "http://direct-link.com",
        article_text: "This is long form article text.",
        image_gallery: ["https://d13yacurqjgara.cloudfront.net/users/107759/screenshots/2470548/dribbble.png"],
        canned_video: "Canned Video",
        created_at: "2015-12-28T20:51:21.000Z",
        updated_at: "2015-12-28T20:51:21.000Z",
        user_id: null,
        published: null,
        tags: ["tag 1", "tag 2", "tag 3"]
      }, {
        id: 2,
        title: "Spark number 2",
        summary: "this is spark number 2",
        dev_notes: "these are my dev notes for spark 2",
        direct_link: "http://direct-link.com/spark2",
        article_text: "This is long form article text.",
        image_gallery: ["https://d13yacurqjgara.cloudfront.net/users/107759/screenshots/2470548/dribbble.png"],
        canned_video: "This is a canned video",
        created_at: "2016-01-06T20:49:22.000Z",
        updated_at: "2016-01-06T20:49:22.000Z",
        user_id: null,
        published: true,
        tags: ["tag 1", "tag 2", "tag 3"]
      }];

/*
  Runs on every get request
  Populate Stores with default data
*/
app.get('*', function(req, res, next){
  
  stores_obj = {
    PostsStore: {
      current_posts: tmp_all_posts
    }
  }

  next();

});

/*
  Matches requests that have /spark/:id, with an optional 2nd param /:carousel_index
  Populates the PostsStore selected_post with data from spark/:id
*/
app.get('/spark/:id/:carousel_index?', function(req, res, next){

  var id = parseInt(req.params.id);

  // Simulate an ansyc ajax call
  setTimeout(function(){

    // on success
    if(true){
      
      // pass returned data into selected_post
      var data = {
        id: 1,
        title: `Spark defined server-side. id:${id}`,
        summary: "This is my summary",
        dev_notes: "My dev notes ",
        direct_link: "http://direct-link.com",
        article_text: "This is long form article text.",
        image_gallery: ["https://d13yacurqjgara.cloudfront.net/users/107759/screenshots/2470548/dribbble.png"],
        canned_video: "Canned Video",
        created_at: "2015-12-28T20:51:21.000Z",
        updated_at: "2015-12-28T20:51:21.000Z",
        user_id: null,
        published: null,
        tags: ["tag 1", "tag 2", "tag 3"]
      }

      
      stores_obj.PostsStore.selected_post = data;

    } else {
      res.status(404).send({ message: `spark with id:${id} not found` });
      process.exit();
    }  
    next();
  }, 300);
  
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