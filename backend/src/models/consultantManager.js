const AbstractManager = require("./AbstractManager");

class consultantManager extends AbstractManager {
  constructor() {
    super({ table: "" });
  }
}

module.exports = consultantManager;
