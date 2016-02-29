# Discovery Front-End
## An Isomorphic Single-Page Application

### Toolset:
1. [ReactJS](https://facebook.github.io/react/) - Component-based javascript framework for building UI's
2. [Alt](http://alt.js.org/) - Robust implementaiton of the [Flux Application Architecure](https://facebook.github.io/flux/docs/overview.html)
3. [Sass](http://sass-lang.com/) - CSS Preprocessor for extended functionality
4. [Browserify](http://browserify.org/) - Dependency management across javascript files
5. [Babel](https://babeljs.io/) - ES6+ javascript transpiler
6. [Gulp](http://gulpjs.com/) - Build process and automation tool


### Communicate with Back-End API
This Front-End application is reliant on a RESTful JSON API. The associated RoR CMS and API is on [bitbucket here](https://bitbucket.org/cnstudiotech/discovery).

You can change the IP of the Back-End in the file `./src/js/utils`. The variable `endpoint` is the base of the Back-End URL used in production. The variable `localhost` is the URL used in development.

### Build Process:

##### This how to instantiate the project and run the automation tools on OS X. 
npm is the package manager that will download dependencies, and gulp is the command line tool for automation tasks.

1. Confirm that you have latest npm (run `npm -v`, if it says not found then install via [NodeJS](https://nodejs.org/en/download/))
2. From the root directory, run `npm install` to download dependencies
3. Confirm that you have gulp installed on your command line (run `gulp`, if not found run `npm install -g gulp`, possible requiring sudo)
4. If installed, running `gulp` from the root directly will run the default task to setup a webserver with livereload, and a watcher build task that compiles scss and js on save.
5. Source files in in `/` and `./src`, while compiled files will be put in `./public`

Now you're up and ready to begin coding!

### Production Build:

##### This is how to configure the project for production
Run the task `gulp buildProd` to generate production-ready css + jss in `./public/dist`.

Using [dotenv](https://github.com/motdotla/dotenv) to detect a `.env` file at the root directory. Add environment specific variables: `NODE_ENV=production`. The default value is assumed to `development`.

Changing the `NODE_ENV` variable between `development||production` will affect which files are included in the swig template in `./src/views`

### Notes on How Isomorphic Works:
Isomorphic Web-Apps can run both server-side and client-side, while sharing the same codebase. The code is pre-rendered and delivered as HTML, where the client can pick back up and continue running the application.
##### In our case:
1. **gulp** runs a **node** server at `./server.js`  
2. Request is processed and **react-router**, shared between client & server, decides correct React component to render.
3. **ReactDOM/server** method **renderToString()** coverts the React component to an HTML string.
4. **Iso**, [an isomorphic Alt helper library]((https://github.com/goatslacker/iso)), assists in passing on the data server-side.
5. Final HTML is rendered to a **swig** template and sent to client.
6. **Iso** bootstraps the passed down data and re-hydrates the client-side React components.

### How to do Remote Preview
1. Run the Node server like normal
2. Get your IP address. (On Linux run `ifconfig|grep inet`, and look for `inet XX.XX.XX.XXX netmask 0xfffffc00 ...`)
3. Navigate to http://-your-ip-:port on your remote device

### Ubuntu 14.04 Trusty

#### git
    
    $ sudo apt-get update
    $ sudo apt-get install git

#### Get the code:

1. generate an ssh key, and add it to bitbucket if this deploy machine is new

#### NODE & NPM

    $ sudo apt-get install nodejs
    $ sudo ln -s /usr/bin/nodejs /usr/bin/node
    $ sudo apt-get install npm
    $ cd /var/www/
    $ sudo mkdir discovery
    $ sudo chown ubuntu discovery
    $ git clone git@bitbucket.org:cnstudiotech/discovery-fe-app.git discovery
    $ cd discovery


#### GULP
    $sudo npm install -g gulp
  
#### Install
    $ npm install
    $ gulp
    
#### Resources: 
* [React on ES6+](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/)
* [Alt.js Guide](http://alt.js.org/guide/)
* [React DevTools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)