const AbstractManager = require("./AbstractManager");

class LocationManger extends AbstractManager {
  constructor() {
    super({ table: "location" });
  }

  async readAll() {
    const [result] = await this.database.query(`SELECT * FROM ${this.table}`);
    return result;
  }

  async read(sub) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id IN (SELECT location_id FROM job WHERE company_id IN (SELECT id from company WHERE user_id=?))`,
      [sub]
    );
    return result;
  }

  async create(
    additionalAdress,
    numberAdress,
    numberAttribute,
    address,
    city,
    state,
    country,
    zip
  ) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (
    additional_adress,
    number_adress,
    number_attribute,
    address,
    city,
    state,
    country,
    zip ) VALUES (?,?,?,?,?,?,?,?)`,
      [
        additionalAdress,
        numberAdress,
        numberAttribute,
        address,
        city,
        state,
        country,
        zip,
      ]
    );
    return result;
  }

  async delete(id, sub) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table}
       WHERE id IN (
         SELECT location_id FROM job
         INNER JOIN company ON job.company_id = company.id
         WHERE job_id = ? AND company.user_id = ?
       )`,
      [id, sub]
    );
    return result;
  }
}

module.exports = LocationManger;
