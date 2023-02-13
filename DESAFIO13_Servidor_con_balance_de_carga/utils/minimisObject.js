const parseArgs = require("minimist");

const options = {
  default: { port: "8080" },
  alias: { p: "port" },
};

const minimistObject = parseArgs(process.argv.slice(2), options);

module.exports = { minimistObject };
