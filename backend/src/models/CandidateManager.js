const AbstractManager = require("./AbstractManager");

class CandidateManager extends AbstractManager {
  constructor() {
    super({ table: "candidate" });
  }

  async readAll() {
    const [result] = await this.database.query(
      `SELECT user.image, user.email, user.contact_number AS contactNumber, candidate.firstname, candidate.lastname, candidate.date_of_birth AS dateOfBirth, candidate.wanted_salary AS wantedSalary, user.registration_date AS registrationDate FROM ${this.table} LEFT JOIN user ON ${this.table}.user_id = user.id`
    );
    return result;
  }

  async read(id) {
    const [result] = await this.database.query(
      `SELECT user.image, user.email, user.contact_number AS contactNumber, candidate.firstname, candidate.lastname, candidate.date_of_birth AS dateOfBirth, candidate.wanted_salary AS wantedSalary, user.registration_date AS registrationDate, candidate.id FROM ${this.table} LEFT JOIN user ON ${this.table}.user_id = user.id WHERE ${this.table}.id =?`,
      [id]
    );
    return result;
  }

  async update(firstname, lastname, dateOfBirth, salary, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET firstname = ?, lastname = ?, date_of_birth = ?, wanted_salary = ? WHERE id = ?`,
      [firstname, lastname, dateOfBirth, salary, id]
    );
    return result;
  }

  async create(firstname, lastname, dateOfBirth, salary, insertId) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, date_of_birth, wanted_salary, user_id) VALUES (?,?,?,?,?)`,
      [firstname, lastname, dateOfBirth, salary, insertId]
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

module.exports = CandidateManager;
