const AbstractManager = require("./AbstractManager");

class CompanyManager extends AbstractManager {
  constructor() {
    super({ table: "company" });
  }

  async readAll() {
    const [result] = await this.database.query(
      `SELECT company.name, company.image, company.description, company.website, company.establishment_date, company_sector.sector FROM ${this.table} INNER JOIN company_sector ON company_sector.id = company_sector_id`
    );
    return result;
  }

  async read(id) {
    const [result] = await this.database.query(
      `SELECT company.name, company.image, company.description, company.website, company.establishment_date, company_sector.sector FROM ${this.table} INNER JOIN company_sector ON company_sector.id = company_sector_id WHERE ${this.table}.id=?`,
      [id]
    );
    return result;
  }

  async update(name, image, description, website, establishmentDate, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name=?, image=?, description=?, website=?, establishment_date=?  WHERE id=?`,
      [name, image, description, website, establishmentDate, id]
    );

    return result;
  }

  async create(
    name,
    image,
    description,
    website,
    establishmentDate,
    companySectorId,
    userId
  ) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, image, description, website, establishment_date, company_sector_id,
    user_id) VALUES (?,?,?,?,?,?,?)`,
      [
        name,
        image,
        description,
        website,
        establishmentDate,
        companySectorId,
        userId,
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

module.exports = CompanyManager;
