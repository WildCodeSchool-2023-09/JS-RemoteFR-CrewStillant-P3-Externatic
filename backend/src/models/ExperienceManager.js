const AbstractManager = require("./AbstractManager");

class ExperienceManager extends AbstractManager {
  constructor() {
    super({ table: "experience" });
  }

  async readAll() {
    const [result] = await this.database.query(
      `SELECT experience.job_title AS jobTitle, experience.company_name AS companyName, experience.start_date AS startDate, experience.end_date AS endDate, experience.description AS description, experience.city AS city, experience.country AS country, candidate.firstname AS firstname, candidate.lastname AS lastname FROM ${this.table} LEFT JOIN candidate ON candidate.id = ${this.table}.candidate_id `
    );

    return result;
  }

  async read(id) {
    const [result] = await this.database.query(
      `SELECT experience.job_title AS jobTitle, experience.company_name AS companyName, experience.start_date AS startDate, experience.end_date AS endDate, experience.description AS description, experience.city AS city, experience.country AS country, candidate.firstname AS firstname, candidate.lastname AS lastname FROM ${this.table} LEFT JOIN candidate ON candidate.id = ${this.table}.candidate_id WHERE ${this.table}.candidate_id=?`,
      [id]
    );

    return result;
  }

  async update(
    jobTitle,
    companyName,
    startDate,
    endDate,
    description,
    city,
    country,
    id
  ) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET job_title=?, company_name=?, start_date=?, end_date=?, description=?, city=?, country=? WHERE id=?`,
      [
        jobTitle,
        companyName,
        startDate,
        endDate,
        description,
        city,
        country,
        id,
      ]
    );

    return result;
  }

  async create(
    jobTitle,
    companyName,
    startDate,
    endDate,
    description,
    city,
    country,
    candidateId
  ) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (job_title, company_name, start_date, end_date, description, city, country, candidate_id) VALUES (?,?,?,?,?,?,?,?)`,
      [
        jobTitle,
        companyName,
        startDate,
        endDate,
        description,
        city,
        country,
        candidateId,
      ]
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

module.exports = ExperienceManager;
