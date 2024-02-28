const AbstractManager = require("./AbstractManager");

class JobManager extends AbstractManager {
  constructor() {
    super({
      table: "job",
    });
  }

  async readAll() {
    const [result] = await this.database.query(
      `SELECT job.id, job.title, company.name AS company, company.image, job.type, job.description, job.hours_worked AS hoursWorked, job.salary, job.created_date AS createdDate, location.additional_adress AS additionalAdress, location.number_adress AS numberAdress, location.number_attribute AS numberAttribute, location.address, location.city, location.zip, location.state, location.country, skill.name AS skill, skill.level FROM ${this.table} LEFT JOIN location ON location.id = location_id LEFT JOIN company ON company.id = company_id LEFT JOIN skill ON job.id = job_id ORDER BY createdDate DESC LIMIT 9`
    );
    return result;
  }

  async readCount() {
    const [result] = await this.database.query(
      `SELECT COUNT(*) AS OffersAvailable FROM ${this.table}`
    );
    return result[0];
  }

  async read(id) {
    const [result] = await this.database.query(
      `SELECT job.id, job.is_active AS isActive, job.title, company.name AS company, company.image, job.type, job.place, job.sector, job.description, job.hours_worked AS hoursWorked, job.salary, job.created_date AS createdDate, location.additional_adress AS additionalAdress, location.number_adress AS numberAdress, location.number_attribute AS numberAttribute, location.address, location.city, location.zip, location.state, location.country, skill.name AS skill, skill.level FROM ${this.table} LEFT JOIN location ON location.id = location_id LEFT JOIN company ON company.id = company_id LEFT JOIN skill ON job.id = job_id WHERE ${this.table}.company_id IN (SELECT id FROM company WHERE user_id=?)`,
      [id]
    );
    return result;
  }

  async readOne(id) {
    const offerId = Number(id);
    const [result] = await this.database.query(
      `SELECT job.id, job.place, job.title, company.name AS company, company.image, job.type, job.description, job.hours_worked AS hoursWorked, job.salary, job.created_date AS createdDate, location.city, CONCAT(COALESCE(location.additional_adress, '.'), ' ', COALESCE(location.number_adress, '.'), ' ', COALESCE(location.number_attribute, '.'), ' ', location.address) AS address, skill.name AS skill, skill.level FROM ${this.table} LEFT JOIN location ON location.id = location_id LEFT JOIN company ON company.id = company_id LEFT JOIN skill ON job.id = job_id WHERE ${this.table}.id = ?`,
      [offerId]
    );
    return result;
  }

  async update(
    title,
    type,
    description,
    hoursWorked,
    isActive,
    salary,
    place,
    sector,
    locationId,
    companyId,
    id,
    sub
  ) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title=?, type=?, description=?, hours_worked=?, is_active=?, salary=?, place=?, sector=?, location_id=?, company_id=? WHERE id=? AND company_id IN (SELECT id FROM company WHERE user_id=?)`,
      [
        title,
        type,
        description,
        hoursWorked,
        isActive,
        salary,
        place,
        sector,
        locationId,
        companyId,
        id,
        sub,
      ]
    );
    return result;
  }

  async create(
    title,
    type,
    description,
    hoursWorked,
    isActive,
    salary,
    place,
    sector,
    locationId,
    companyId
  ) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, type, description, hours_worked, is_active, salary, place, sector, location_id, company_id) VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [
        title,
        type,
        description,
        hoursWorked,
        isActive,
        salary,
        place,
        sector,
        locationId,
        companyId,
      ]
    );
    return result;
  }

  async delete(id, sub) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=? AND company_id IN (SELECT id FROM company WHERE user_id=?)`,
      [id, sub]
    );
    return result;
  }

  async readAllFilters(
    terms,
    location,
    salary,
    place,
    sector,
    type,
    orderBy,
    limit
  ) {
    // Toute la logique pour pouvoir accumuler les filtres de recherche via un tableau d'objets.
    const initialSql = `SELECT j.id, j.title, j.type, j.description, j.hours_worked, j.created_date, j.is_active, j.salary, j.place, j.sector, CONCAT(COALESCE(l.additional_adress, '.'), ' ', COALESCE(l.number_adress, '.'), ' ', COALESCE(l.number_attribute, '.'), ' ', l.address) AS address, l.city, l.zip as cityCode, l.state, l.country, j.company_id FROM ${this.table} AS j JOIN location AS l ON l.id=j.location_id`;
    const where = [];

    // S'il y a un filtre de présent via les query, j'ajoute un nouvel objet dans le tableau ci-dessus.
    if (terms != null || terms !== "") {
      where.push({
        column: "title",
        value: `%${terms}%`,
        operator: "LIKE",
      });
    }
    if (location != null) {
      where.push({
        column: "city",
        value: `%${location}%`,
        operator: "LIKE",
      });
    }
    if (salary != null) {
      where.push({
        column: "salary",
        value: salary,
        operator: ">=",
      });
    }
    if (place != null) {
      where.push({
        column: "place",
        value: place,
        operator: "=",
      });
    }
    if (sector != null) {
      where.push({
        column: "sector",
        value: sector,
        operator: "=",
      });
    }
    if (type != null) {
      where.push({
        column: "type",
        value: type,
        operator: "=",
      });
    }

    // Je place ma logique dans des constantes pour faciliter le rendu de la requête plus bas.
    const query = where.reduce(
      (sql, { column, operator }, index) =>
        `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ? `,
      initialSql
    );

    const orderBySql = ` ORDER BY ${orderBy} ASC `;

    const limitSql = `LIMIT ${limit}`;

    const values = where.map(({ value }) => value);

    if (where.length !== 0) {
      // Je fais ma requête SQL préparée avec mon tableau d'objets.
      const [rows] = await this.database.query(
        query + (orderBy != null ? orderBySql : "") + limitSql,
        values
      );

      return rows;
    }
    return null;
  }
}

module.exports = JobManager;
