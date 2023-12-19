const AbstractManager = require("./AbstractManager");

class companyManager extends AbstractManager {
  constructor() {
    super({ table: "" });
  }
}

module.exports = companyManager;
