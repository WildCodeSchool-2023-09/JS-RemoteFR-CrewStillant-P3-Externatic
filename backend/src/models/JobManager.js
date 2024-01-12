const AbstractManager = require("./AbstractManager");

class JobManger extends AbstractManager {
  constructor() {
    super({
      table: "job",
    });
  }

  async readAll() {
    const [result] = await this.database.query(
      `SELECT job.title, company.name AS company, company.image, job.type, job.description, job.hours_worked, job.salary, job.created_date, location.additional_adress, location.number_adress, location.number_attribute, location.address, location.city, location.zip, location.state, location.country, skill.name, skill.level FROM ${this.table} LEFT JOIN location ON location.id = location_id LEFT JOIN company ON company.id = company_id LEFT JOIN skill ON job.id = job_id`
    );
    return result;
  }

  async read(id) {
    const [result] = await this.database.query(
      `SELECT job.title, company.name AS company, company.image, job.type, job.description, job.hours_worked, job.salary, job.created_date, location.additional_adress, location.number_adress, location.number_attribute, location.address, location.city, location.zip, location.state, location.country, skill.name, skill.level FROM ${this.table} LEFT JOIN location ON location.id = location_id LEFT JOIN company ON company.id = company_id LEFT JOIN skill ON job.id = job_id WHERE ${this.table}.id=?`,
      [id]
    );
    return result;
  }

  async edit(
    title,
    type,
    description,
    salary,
    hoursWorked,
    isActive,
    locationId,
    companyId,
    id
  ) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title=?, type=?, description=?, salary=?, hours_worked=?,is_active=?, location_id=?, company_id=? WHERE id=?`,
      [
        title,
        type,
        description,
        salary,
        hoursWorked,
        isActive,
        locationId,
        companyId,
        id,
      ]
    );
    return result;
  }

  async create(
    title,
    type,
    description,
    salary,
    hoursWorked,
    isActive,
    locationId,
    companyId
  ) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, type, description, salary, hours_worked, is_active, location_id, company_id) VALUES (?,?,?,?,?,?,?,?)`,
      [
        title,
        type,
        description,
        salary,
        hoursWorked,
        isActive,
        locationId,
        companyId,
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

module.exports = JobManger;
