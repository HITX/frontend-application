'use strict'

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App = require('./components/App/App.comp.jsx');
var Home = require('./components/Home/Home.comp.jsx');
var HowItWorks = require('./components/HowItWorks/HowItWorks.comp.jsx');
var Projects = require('./components/Projects/Projects.comp.jsx');
var Orgs = require('./components/Orgs/Orgs.comp.jsx');
var NotFound = require('./components/NotFound/NotFound.comp.jsx');

var routes = (
	<Route>
		<Route handler={App}>
			<DefaultRoute name='home' handler={Home}/>
			<Route name='howitworks' handler={HowItWorks}/>
			<Route name='projects' path='projects/:id' handler={Projects}/>
			<Route name='orgs' path='organizations/:id' handler={Orgs}/>
		</Route>
		<NotFoundRoute handler={NotFound}/>
	</Route>
);

module.exports = routes;
