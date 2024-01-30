const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "activity" });
  }

  async readAll() {
    const [result] = await this.database.query(
      `SELECT job.title, job.type, job.salary, job.description, activity.apply_date AS applyDate, activity.candidate_id AS candidateId FROM ${this.table} LEFT JOIN job ON ${this.table}.job_id = job.id`
    );
    return result;
  }

  async read(id) {
    const [result] = await this.database.query(
      `SELECT job.title, job.type, job.salary, job.description, activity.apply_date AS applyDate, activity.candidate_id AS candidateId FROM ${this.table} LEFT JOIN job ON ${this.table}.job_id = job.id WHERE ${this.table}.candidate_id =?`,
      [id]
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

module.exports = UserManager;
