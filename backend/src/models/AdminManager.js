const AbstractManager = require("./AbstractManager");

class CompanyManager extends AbstractManager {
  constructor() {
    super({ table: "admin" });
  }

  async readAll() {
    const [result] = await this.database.query(
      `SELECT company.name, company.image, company.description, company.website, company.establishment_date AS establishmentDate, company.siret, company_sector.sector AS companySector, user.contact_number AS contactNumber, user.registration_date AS registrationDate, user.email FROM ${this.table} INNER JOIN company_sector ON company_sector.id = company_sector_id INNER JOIN user ON user.id = user_id`
    );
    return result;
  }

  async read(id) {
    const [result] = await this.database.query(
      `SELECT company.name, company.image, company.description, company.website, company.establishment_date AS establishmentDate, company.siret, company_sector.sector AS companySector, user.contact_number AS contactNumber, user.registration_date AS registrationDate, user.email  FROM ${this.table} INNER JOIN company_sector ON company_sector.id = company_sector_id INNER JOIN user ON user.id = user_id WHERE ${this.table}.id=?`,
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
    description,
    website,
    establishmentDate,
    siret,
    companySectorId,
    userId
  ) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, description, website, establishment_date, siret, company_sector_id,
    user_id) VALUES (?,?,?,?,?,?,?)`,
      [
        name,
        description,
        website,
        establishmentDate,
        siret,
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
