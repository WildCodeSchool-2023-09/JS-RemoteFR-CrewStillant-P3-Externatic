const AbstractManager = require("./AbstractManager");

class AdminManager extends AbstractManager {
  constructor() {
    super({ table: "admin" });
  }

  async readAll() {
    const [result] = await this.database.query(
      `SELECT admin.*, user.image AS image, user.contact_number AS contactNumber, user.registration_date AS registrationDate, user.email FROM ${this.table} INNER JOIN user ON user.id = user_id`
    );
    return result;
  }

  async read(sub) {
    const [result] = await this.database.query(
      `SELECT admin.*, user.image AS image, user.contact_number AS contactNumber, user.registration_date AS registrationDate, user.email FROM ${this.table} INNER JOIN user ON user.id = ${this.table}.user_id WHERE ${this.table}.user_id=?`,
      [sub]
    );
    return result;
  }

  async update(firstname, lastname, dateOfBirth, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET firstname=?, lastname=?, dateOfBirth=? WHERE id=?`,
      [firstname, lastname, dateOfBirth, id]
    );

    return result;
  }

  async create(firstname, lastname, dateOfBirth, userId) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, date_of_birth, user_id) VALUES (?,?,?,?)`,
      [firstname, lastname, dateOfBirth, userId]
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

module.exports = AdminManager;
