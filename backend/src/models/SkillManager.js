const AbstractManager = require("./AbstractManager");

class SkillManager extends AbstractManager {
  constructor() {
    super({ table: "skill" });
  }

  async readAll() {
    const [result] = await this.database.query(`SELECT * FROM ${this.table}`);
    return result;
  }

  async read(id) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE ${this.table}.candidate_id =?`,
      [id]
    );
    return result;
  }

  async update(name, level, candidateId, jobId, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, level = ?, candidate_id = ?, job_id = ? WHERE id = ?`,
      [name, level, candidateId, jobId, id]
    );
    return result;
  }

  async create(name, level, candidateId, jobId) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, level, candidate_id, job_id) VALUES (?,?,?,?)`,
      [name, level, candidateId, jobId]
    );
    return result;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [id]
    );
    return result;
  }
}

module.exports = SkillManager;
