const AbstractManager = require("./AbstractManager");

class candidateManager extends AbstractManager {
  constructor() {
    super({ table: "" });
  }
}

module.exports = candidateManager;
