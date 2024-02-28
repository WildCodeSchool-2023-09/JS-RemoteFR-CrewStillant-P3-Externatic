const AbstractManager = require("./AbstractManager");

class DegreeManager extends AbstractManager {
  constructor() {
    super({ table: "degree" });
  }

  async readAll() {
    const [result] = await this.database.query(
      `SELECT degree.name AS degree, degree.level AS level, degree.starting_date AS startingDate, degree.completion_date AS completionDate, degree.university AS university, degree.city AS city, candidate.firstname AS firstname, candidate.lastname AS lastname FROM ${this.table} LEFT JOIN candidate_degree ON ${this.table}.id = candidate_degree.degree_id LEFT JOIN candidate ON candidate_degree.candidate_id = candidate.id`
    );
    return result;
  }

  async read(sub) {
    const [result] = await this.database.query(
      `SELECT degree.id ,degree.name AS degree, degree.level AS level, degree.starting_date AS startingDate, degree.completion_date AS completionDate, degree.university AS university, degree.city AS city, candidate_degree.id AS candidateDegreeId, candidate.firstname AS firstname, candidate.lastname AS lastname FROM ${this.table} LEFT JOIN candidate_degree ON ${this.table}.id = candidate_degree.degree_id LEFT JOIN candidate ON candidate_degree.candidate_id = candidate.id INNER JOIN user ON candidate.user_id = user.id WHERE user.id =?`,
      [sub]
    );
    return result;
  }

  async update(
    name,
    level,
    startingDate,
    completionDate,
    university,
    city,
    id,
    sub
  ) {
    const [result] = await this.database.query(
      `UPDATE ${this.table}
      INNER JOIN candidate_degree ON ${this.table}.id = candidate_degree.degree_id
       SET name=?, level=?, starting_date=?, completion_date=?, university=?, city=? WHERE ${this.table}.id = ? AND candidate_id IN (SELECT id FROM candidate WHERE user_id=?)`,
      [name, level, startingDate, completionDate, university, city, id, sub]
    );

    return result;
  }

  async create(name, level, startingDate, completionDate, university, city) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, level, starting_date, completion_date, university, city) VALUES (?,?,?,?,?,?)`,
      [name, level, startingDate, completionDate, university, city]
    );
    return result;
  }

  async delete(sub) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id IN (SELECT degree_id FROM candidate_degree WHERE candidate_id IN (SELECT id FROM candidate WHERE user_id=?))`,
      [sub]
    );
    return result;
  }
}

module.exports = DegreeManager;
