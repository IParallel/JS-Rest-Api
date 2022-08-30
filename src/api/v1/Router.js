const fs = require("fs");
const Api = require("../../Api");

class APIv1 {
	/**
	 * 
	 * @param {Api} api 
	 */
	constructor(api) {
		this.router = require("express").Router();
		this.api = api;
		this.path = "/api/";
		this.routes = new Map();
		this.built = false;
	}

	build() {
		//to prevent running twice maybe (?
		if (this.built) return;
		//scanning the files in our routes folder
		const routes = fs.readdirSync(__dirname + "/routes/");

		for (let route of routes) {
			//safeguard.
			if (!route.endsWith(".js")) continue;

			//creating a new require cache out of the path of the file and instantiate it passing our APIv1 class
			route = new (require(__dirname + "/routes/" + route))(this);

			//this a log to check if all your routes are loaded and also get a url in console uncomment if you want
			//this.api.logger.success(`route http://127.0.0.1:${this.api.config.port}${this.path.substring(0,4)}${route.path} loaded successfully`);

			//in case you want to access routes and methods in a different way the map is useful
			this.routes.set(route.path, route);
		}

		this.api.logger.log(`Loaded ${this.routes.size} API routes!`);
		//make this function never runs again
		this.built = true;
	}
}

module.exports = APIv1;
