const AbstractManager = require("./AbstractManager");

class ExperienceManager extends AbstractManager {
  constructor() {
    super({ table: "experience" });
  }

  async readAll() {
    const [result] = await this.database.query(
      `SELECT experience.job_title AS jobTitle, experience.company_name AS companyName, experience.start_date AS startDate, experience.end_date AS endDate, experience.description AS description, experience.city AS city, experience.country AS country, candidate.firstname AS firstname, candidate.lastname AS lastname FROM ${this.table} INNER JOIN candidate ON candidate.id = ${this.table}.candidate_id `
    );

    return result;
  }

  async read(sub) {
    const [result] = await this.database.query(
      `SELECT experience.id, experience.job_title AS jobTitle, experience.company_name AS companyName, experience.start_date AS startDate, experience.end_date AS endDate, experience.description AS description, experience.city AS city, experience.country AS country, candidate.firstname AS firstname, candidate.lastname AS lastname FROM ${this.table} INNER JOIN candidate ON candidate.id = ${this.table}.candidate_id WHERE ${this.table}.candidate_id IN (SELECT id FROM candidate WHERE user_id=?)`,
      [sub]
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
    id,
    sub
  ) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} 
    INNER JOIN candidate ON ${this.table}.candidate_id = candidate.id
    SET ${this.table}.job_title=?, ${this.table}.company_name=?, ${this.table}.start_date=?, ${this.table}.end_date=?, ${this.table}.description=?, ${this.table}.city=?, ${this.table}.country=? 
    WHERE ${this.table}.id=? AND candidate.user_id=?`,
      [
        jobTitle,
        companyName,
        startDate,
        endDate,
        description,
        city,
        country,
        id,
        sub,
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

  async delete(id, sub) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id= ? AND candidate_id IN (SELECT id FROM candidate WHERE user_id=?)`,
      [id, sub]
    );
    return result;
  }
}

module.exports = ExperienceManager;
