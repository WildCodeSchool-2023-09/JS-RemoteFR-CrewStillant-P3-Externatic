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
      `SELECT user.email, user.password, user.is_active, user.contact_number, user.sms_notification_active, user.email_notification_active, user.image, user_type.type FROM ${this.table} INNER JOIN user_type ON user_type.id = ${this.table}.user_type_id WHERE ${this.table}.id =?`,
      [id]
    );
    return result;
  }

  async update(
    email,
    password,
    isActive,
    contactNumber,
    smsNotificationActive,
    emailNotificationActive,
    image,
    userTypeId,
    id
  ) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET email=?, password=?, is_active=?, contact_number=?, sms_notification_active=?, email_notification_active=?, image=?, user_type_id=? WHERE id = ?`,
      [
        email,
        password,
        isActive,
        contactNumber,
        smsNotificationActive,
        emailNotificationActive,
        image,
        userTypeId,
        id,
      ]
    );
    return result;
  }

  async create(
    email,
    password,
    isActive,
    contactNumber,
    smsNotificationActive,
    emailNotificationActive,
    type,
    filename
  ) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (email, password, is_active, contact_number, sms_notification_active, email_notification_active, image, user_type_id) VALUES (?,?,?,?,?,?,?)`,
      [
        email,
        password,
        isActive,
        contactNumber,
        smsNotificationActive,
        emailNotificationActive,
        filename,
        type,
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

module.exports = UserManager;
