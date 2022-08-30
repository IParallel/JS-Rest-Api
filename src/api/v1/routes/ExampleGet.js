//this is an example of a get route
const APIv1 = require("../Router");
class ExampleGet {
	/**
	 * @param {APIv1} controller 
	 */
	constructor(controller) {
		this.controller = controller;
		this.router = controller.router;

		//this is the path of your domain ex: example.domain/get
		this.path = '/get';
		
		//here bind the route as you like get, post, patch, etc...
		this.router.get(this.path, this.run.bind(this));
	}

	async run(req, res) {
		res.status(200).send("OK");
	}
}

module.exports = ExampleGet;