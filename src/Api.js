const express = require("express");
const APIv1 = require("./api/v1/Router");
const logger = require("./misc/Logger");
/**
 * @typedef {{
 *  app_name: string,
 * 	port: number,
 *  token: string
 * }} config
 */
class Api {
	/**
	 * @param {config} config 
	 */
	constructor(config) {
		this.app = express();
		this.config = config;
		this.logger = logger;
		this.api;
	}

	listen() {
		//this is to make support for multiple apis without breaking the app
		this.api = new APIv1(this);
		this.api.build();
		this.app.use(express.json());
		this.app.use(this.api.path, this.api.router);
		this.app.set("port", this.config.port);
		this.app.listen(this.app.get("port"), () => {
			this.logger.success(
				`Success. ${this.config.app_name} is now online! Configured to listen @ port: ${this.app.get(
					"port"
				)}`
			);
		});
	}
}

module.exports = Api;
