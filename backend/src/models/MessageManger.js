const AbstractManager = require("./AbstractManager");

class MessageManager extends AbstractManager {
  constructor() {
    super({ table: "message" });
  }

  async readAll() {
    const [result] = await this.database.query(
      `SELECT user.email, message.subject, message.text, message.recieved_date AS receivedDate FROM ${this.table} INNER JOIN user ON ${this.table}.user_id = user.id`
    );
    return result;
  }

  async read(sub) {
    const [result] = await this.database.query(
      `SELECT user.email, message.subject, message.text, message.recieved_date AS receivedDate FROM ${this.table} INNER JOIN user ON ${this.table}.user_id = user.id WHERE ${this.table}.user_id=?`,
      [sub]
    );
    return result;
  }

  async create(subject, text, userId) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (subject, text, user_id) VALUES (?,?,?)`,
      [subject, text, userId]
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

module.exports = MessageManager;
