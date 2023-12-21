const AbstractManager = require("./AbstractManager");

class CompagnyManager extends AbstractManager {
  constructor() {
    super({ table: "company" });
  }
}

module.exports = CompagnyManager;
