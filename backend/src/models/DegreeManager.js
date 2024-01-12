const AbstractManager = require("./AbstractManager");

class DegreeManager extends AbstractManager {
  constructor() {
    super({ table: "degree" });
  }

  async readAll() {
    const [result] = await this.database.query(
      `SELECT degree.name AS degree, degree.level AS level, degree.starting_date AS starting_date, degree.completion_date AS completion_date, degree.university AS university, degree.city AS city, candidate.firstname AS firstname, candidate.lastname AS lastname FROM ${this.table} LEFT JOIN candidate_degree ON ${this.table}.id = candidate_degree.degree_id LEFT JOIN candidate ON candidate_degree.candidate_id = candidate.id`
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
    id
  ) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name=?, level=?, starting_date=?, completion_date=?, university=?, city=? WHERE id=?`,
      [name, level, startingDate, completionDate, university, city, id]
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

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [id]
    );
    return result;
  }
}

module.exports = DegreeManager;
