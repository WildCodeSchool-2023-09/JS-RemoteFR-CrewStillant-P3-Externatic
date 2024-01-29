/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
const path = require("path");

const externaticData = path.join(__dirname, "database", "externaticData.sql");

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Insert fake data into all tables in the same order
    for (let i = 1; i < externaticData.length; i += 1) {
      const data = externaticData[i];
      queries.push(
        database.query(
          "INSERT INTO candidate (firstname, lastname, date_of_birth, wanted_salary, user_id) VALUES (?, ?, ?, ?, ?)",
          [
            data.firstname,
            data.lastname,
            data.date_of_birth,
            data.wanted_salary,
            data.user_id,
          ]
        ),

        database.query(
          "INSERT INTO company (name, image, description, website, establishment_date, siret, company_sector_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            data.name,
            data.image,
            data.description,
            data.website,
            data.establishment_date,
            data.siret,
            data.company_sector_id,
            data.user_id,
          ]
        ),
        database.query("INSERT INTO company_sector (sector) VALUES (?)", [
          data.sector[i],
        ]),

        database.query(
          "INSERT INTO location (additional_adress, number_adress, number_attribute, address, city, state, country, zip) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            data.additional_adress,
            data.number_adress,
            data.number_attribute,
            data.address,
            data.city,
            data.state,
            data.country,
            data.zip,
          ]
        ),

        database.query(
          "INSERT INTO user (email, password, is_active, contact_number, sms_notification_active, email_notification_active, image, user_type_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            data.email,
            data.password,
            data.is_active,
            data.contact_number,
            data.sms_notification_active,
            data.email_notification_active,
            data.image,
            data.user_type_id,
          ]
        ),

        database.query(
          "INSERT INTO activity (apply_date, job_id, candidate_id) values (?, ?, ?)",
          [data.apply_date, data.job_id, data.candidate_id]
        ),

        database.query(
          "INSERT INTO skill (name, level, candidate_id, job_id) VALUES (?, ?, ?, ?)",
          [data.name, data.level, data.candidate_id, data.job_id]
        ),

        database.query(
          "INSERT INTO candidate_degree (candidate_id, degree_id) VALUES (?, ?)",
          [data.candidate_id, data.degree_id]
        ),

        database.query(
          "INSERT INTO experience (start_date, end_date, job_title, company_name, city, country, description, candidate_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            data.start_date,
            data.end_date,
            data.job_title,
            data.company_name,
            data.city,
            data.country,
            data.description,
            data.candidate_id,
          ]
        ),

        database.query(
          "INSERT INTO degree (name, level, starting_date, completion_date, university, city) VALUES (?, ?, ?, ?, ?, ?)",
          [
            data.name,
            data.level,
            data.starting_date,
            data.completion_date,
            data.university,
            data.city,
          ]
        ),

        database.query("INSERT INTO user_type (type) VALUES (?)", [data.type]),

        database.query(
          "INSERT INTO job (title, type, description, hours_worked, is_active, salary, place, sector, location_id, company_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            data.title,
            data.type,
            data.description,
            data.hours_worked,
            data.is_active,
            data.salary,
            data.place,
            data.sector,
            data.location_id,
            data.company_id,
          ]
        ),

        database.query(
          "INSERT INTO message (subject, text, user_id) VALUES ( ?, ?, ?)",
          [data.subject, data.text, data.user_id]
        )
      );
    }

    /* ************************************************************************* */

    // Wait for all the insertion queries to complete
    await Promise.all(queries);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
