//the config file there put whatever you want to make it accesible in the whole project
const config = require("./config.json");

//our main builder
const api = require("./src/Api");
const restapi = new api(config);

module.exports = restapi;
//starting the whole app
restapi.listen();
