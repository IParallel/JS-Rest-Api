const chalk = require("chalk");
const moment = require("moment");
const util = require("util");

class logger {
	static log(content, { color = "grey" } = {}) {
		this.write(content, { color });
	}

	static info(content, { color = "green" } = {}) {
		this.write(content, { color });
	}

	static success(content, { color = "magenta" } = {}) {
		this.write(content, { color });
	}

	static warn(content, { color = "yellow" } = {}) {
		this.write(content, { color });
	}

	static error(content, { color = "red" } = {}) {
		this.write(content, { color, error: true });
	}

	static stacktrace(content, { color = "white" } = {}) {
		this.write(content, { color, error: true });
	}

	static write(content, { color = "grey", error = false } = {}) {
		const timestamp = chalk.cyan(`[${moment().format("HH:mm:ss")}]:`);
		const tag = chalk.bold(`[bello-rest-api]:`);
		const text = chalk[color](this.clean(content));
		const stream = error ? process.stderr : process.stdout;
		stream.write(`${timestamp} ${tag} ${text}\n`);
	}

	static clean(item) {
		if (typeof item === "string") return item;
		const cleaned = util.inspect(item, { depth: Infinity });
		return cleaned;
	}
}

module.exports = logger;
