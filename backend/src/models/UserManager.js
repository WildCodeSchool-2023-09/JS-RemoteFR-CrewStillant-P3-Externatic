const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array
    return rows;
  }
}

module.exports = UserManager;
