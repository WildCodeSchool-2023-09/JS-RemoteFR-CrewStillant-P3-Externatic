const AbstractManager = require("./AbstractManager");

class CompanyManager extends AbstractManager {
  constructor() {
    super({ table: "candidate_degree" });
  }

  async readAll() {
    const [result] = await this.database.query(`SELECT * FROM ${this.table} `);
    return result;
  }

  async read(sub) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id=?`,
      [sub]
    );
    return result;
  }

  async create(candidateId, degreeId) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (candidate_id, degree_id) VALUES (?,?)`,
      [candidateId, degreeId]
    );
    return result;
  }

  async delete(sub) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE candidate_id=?`,
      [sub]
    );
    return result;
  }
}

module.exports = CompanyManager;
