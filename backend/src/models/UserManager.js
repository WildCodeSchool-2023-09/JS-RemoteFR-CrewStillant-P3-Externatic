const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async readAll() {
    const [result] = await this.database.query(
      `SELECT user.email, user.password, user.is_active, user.contact_number, user.sms_notification_active, user.email_notification_active, user.image, user_type.type FROM ${this.table} INNER JOIN user_type ON user_type.id = ${this.table}.user_type_id`
    );
    return result;
  }

  async read(id) {
    const [result] = await this.database.query(
      `SELECT user.email, user.password, user.contact_number, user.sms_notification_active, user.email_notification_active, user.image, user_type.type FROM ${this.table} INNER JOIN user_type ON user_type.id = ${this.table}.user_type_id WHERE ${this.table}.id =?`,
      [id]
    );
    return result;
  }

  async update(
    email,
    hashedPassword,
    contactNumber,
    smsNotificationActive,
    emailNotificationActive,
    image,
    sub
  ) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET email=?, password=?, contact_number=?, sms_notification_active=?, email_notification_active=?, image=? WHERE id = ?`,
      [
        email,
        hashedPassword,
        contactNumber,
        smsNotificationActive,
        emailNotificationActive,
        image,
        sub,
      ]
    );
    return result;
  }

  async create(
    email,
    hashedPassword,
    isActive,
    contactNumber,
    smsNotificationActive,
    emailNotificationActive,
    image,
    type
  ) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (email, password, is_active, contact_number, sms_notification_active, email_notification_active, image, user_type_id) VALUES (?,?,?,?,?,?,?,?)`,
      [
        email,
        hashedPassword,
        isActive,
        contactNumber,
        smsNotificationActive,
        emailNotificationActive,
        image,
        type,
      ]
    );
    return result.insertId;
  }

  async delete(sub) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [sub]
    );
    return result;
  }

  async readByEmail(email) {
    const [rows] = await this.database.query(
      `SELECT user.id, user.email, user.password, candidate.firstname AS firstName, user.user_type_id as userTypeId FROM ${this.table} LEFT JOIN candidate ON candidate.user_id = ${this.table}.id WHERE ${this.table}.email=?`,
      [email]
    );
    return rows[0];
  }
}

module.exports = UserManager;
