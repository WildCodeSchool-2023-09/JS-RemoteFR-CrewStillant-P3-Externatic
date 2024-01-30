const AbstractManager = require("./AbstractManager");

class SectorManager extends AbstractManager {
  constructor() {
    super({ table: "company_sector" });
  }

  async create(sector) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (sector) VALUES (?)`,
      [sector]
    );
    return result;
  }
}
module.exports = SectorManager;
