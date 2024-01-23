const AbstractManager = require("./AbstractManager");

class JobManager extends AbstractManager {
  constructor() {
    super({ table: "job" });
  }

  async readAll(terms, location, salary, place, sector, type, orderBy, limit) {
    // Toute la logique pour pouvoir accumuler les filtres de recherche via un tableau d'objets.
    const initialSql = `SELECT j.id, j.title, j.type, j.description, j.hours_worked, j.created_date, j.is_active, j.salary, j.place, j.sector, l.city AS city, j.company_id FROM ${this.table} AS j JOIN location AS l ON l.id=j.location_id`;
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

    // Je fais ma requête SQL préparée avec mon tableau d'objets.
    const [rows] = await this.database.query(
      query + (orderBy != null ? orderBySql : "") + limitSql,
      values
    );

    return rows;
  }
}
module.exports = JobManager;
