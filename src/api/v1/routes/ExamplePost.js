class ExamplePost {
	constructor(controller) {
		this.controller = controller
		this.router = controller.router;

		//this is the path of your domain ex: example.domain/post
		this.path = "/post";

		//here bind the route as you like get, post, patch, etc...
		this.router.post(this.path, this.run.bind(this));
	}

	async run(req, res) {
		if (req.headers["Authorization"] !== this.controller.api.config.token) {
			return res.status(403).send("invalid access");
		  }

		res.status(200).send({
			examplejsonkey: "examplejsonvalue"
		})
	}
}

module.exports = ExamplePost;
