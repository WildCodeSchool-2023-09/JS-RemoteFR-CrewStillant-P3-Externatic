const AbstractManager = require("./AbstractManager");

class JobManager extends AbstractManager {
  constructor() {
    super({ table: "job" });
  }

  async readAll() {
    const [rows] = await this.database.query(
      `SELECT title, type, job.description, city, name, image FROM ${this.table} JOIN location ON location_id=location_id JOIN company ON company.id=company_id ORDER BY RAND() `
    );

    return rows;
  }
}

module.exports = JobManager;
