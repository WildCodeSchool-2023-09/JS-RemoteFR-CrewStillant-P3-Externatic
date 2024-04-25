const AbstractManager = require("./AbstractManager");

class ActivityManager extends AbstractManager {
  constructor() {
    super({ table: "activity" });
  }

  async readAll() {
    const [result] = await this.database.query(
      `SELECT job.title, job.type, job.salary, job.description, activity.apply_date AS applyDate, activity.candidate_id AS candidateId FROM ${this.table} LEFT JOIN job ON ${this.table}.job_id = job.id`
    );
    return result;
  }

  async read(sub) {
    const [result] = await this.database.query(
      `SELECT job.id, job.title, job.type, job.salary, job.description, activity.apply_date AS applyDate, activity.candidate_id AS candidateId FROM ${this.table} LEFT JOIN job ON ${this.table}.job_id = job.id WHERE ${this.table}.candidate_id IN (SELECT id FROM candidate WHERE user_id = ?)`,
      [sub]
    );
    return result;
  }

  async create(jobId, candidateId) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (job_id, candidate_id ) VALUES (?, ?)`,
      [jobId, candidateId]
    );
    return result;
  }

  async delete(id, sub) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE job_id = ? AND candidate_id IN (SELECT id FROM candidate WHERE user_id = ?)`,
      [id, sub]
    );
    return result;
  }
}

module.exports = ActivityManager;
