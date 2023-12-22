/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
const { fakerFR, faker } = require("@faker-js/faker");

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Generating Seed Data

    // Random additional adress using an array & faker
    const additionalAdress = [
      "Appartement",
      "Etage",
      "Couloir",
      "Escalier",
      "Entrée",
      "Bâtiment",
      "Immeuble",
      "Residence",
    ];

    // Optional: Truncate tables (remove existing data)
    // await database.query("truncate item");

    // Random number attribute using an array & faker
    const numAttribute = ["bis", "ter", "quater", "ante", "A", "B", "C", "D"];

    // Random skill level using an array & faker
    const skillLevel = ["notions", "moyen", "confirmé", "expert"];

    // Random degree level using an array & faker
    const degreeLevel = [
      "CAP-BEP",
      "Bac",
      "Bac+2",
      "Bac+3",
      "Bac+4",
      "Bac+5",
      "Bac+8",
    ];

    // Random user type using an array & faker
    const userType = ["candidat", "entreprise", "consultant"];

    // Random user type using an array & faker
    const jobType = [
      "Contrat à durée déterminée",
      "Contrat à durée indéterminée",
      "Intérim",
      "Alternance",
    ];

    // Insert fake data into all tables in the same order
    for (let i = 0; i < 20; i += 1) {
      queries.push(
        database.query(
          "insert into activity (apply_date, job_post_id, user_account_id) values (?, ?, ?)",
          [
            fakerFR.date.recent({ days: 1 }),
            fakerFR.number.int({ min: 1, max: 20 }),
            fakerFR.number.int({ min: 1, max: 20 }),
          ]
        ),
        database.query(
          "insert into candidate (first_name, last_name, date_of_birth, wanted_salary, user_account_id) VALUES (?, ?, ?, ?, ?)",
          [
            fakerFR.person.firstName(),
            fakerFR.person.lastName(),
            fakerFR.date.birthdate({ min: 18, max: 75, mode: "age" }),
            fakerFR.number.int({ min: 35000, max: 200000 }),
            fakerFR.number.int({ min: 1, max: 20 }),
          ]
        ),
        database.query(
          "INSERT INTO candidate_degree (candidate_id, degree_id) VALUES (?, ?)",
          [
            fakerFR.number.int({ min: 1, max: 20 }),
            fakerFR.number.int({ min: 1, max: 20 }),
          ]
        ),
        database.query(
          "INSERT INTO company (name, image, description, website, establishment_date, company_sector_id) VALUES (?, ?, ?, ?, ?, ?)",
          [
            fakerFR.company.name(),
            fakerFR.image.urlPlaceholder({
              width: 128,
              height: 128,
              backgroundColor: "6B6B6B",
              textColor: "FFFFFF",
              format: "png",
              text: "logo",
            }),
            fakerFR.lorem.paragraph({ min: 2, max: 5 }),
            fakerFR.internet.url({ appendSlash: true }),
            fakerFR.date.past({ years: 30 }),
            fakerFR.number.int({ min: 1, max: 20 }),
          ]
        ),
        database.query("INSERT INTO company_sector (sector) VALUES (?)", [
          fakerFR.lorem.word(),
        ]),
        database.query(
          "INSERT INTO degree (name, level, starting_date, completion_date, university, city) VALUES (?, ?, ?, ?, ?, ?)",
          [
            faker.person.jobType(),
            faker.helpers.arrayElement(degreeLevel, 1),
            fakerFR.date.between({
              from: "2018-12-01T00:00:00.000Z",
              to: "2022-12-01T00:00:00.000Z",
            }),
            fakerFR.date.between({
              from: "2022-12-01T00:00:00.000Z",
              to: "2023-12-01T00:00:00.000Z",
            }),
            fakerFR.company.name(),
            fakerFR.location.city(),
          ]
        ),
        database.query(
          "INSERT INTO experience (start_date, end_date, job_title, company_name, city, country, description, candidate_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            fakerFR.date.between({
              from: "2018-12-01T00:00:00.000Z",
              to: "2022-12-01T00:00:00.000Z",
            }),
            fakerFR.date.between({
              from: "2022-12-01T00:00:00.000Z",
              to: "2023-12-01T00:00:00.000Z",
            }),
            faker.person.jobTitle(),
            fakerFR.company.name(),
            fakerFR.location.city(),
            "France",
            fakerFR.lorem.paragraph({ min: 2, max: 5 }),
            fakerFR.number.int({ min: 1, max: 20 }),
          ]
        ),
        database.query(
          "INSERT INTO location (additional_adress, number_adress, number_attribute, address, city, state, country, zip) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            faker.helpers.arrayElement(additionalAdress, 1),
            fakerFR.number.int({ min: 1, max: 200 }),
            faker.helpers.arrayElement(numAttribute, 1),
            fakerFR.location.street(),
            fakerFR.location.city(),
            fakerFR.location.state(),
            "France",
            fakerFR.helpers.fromRegExp(/[0-9]{3}[0]{2}/),
          ]
        ),
        database.query(
          "INSERT INTO skill (name, level, candidate_id, job_id) VALUES (?, ?, ?, ?)",
          [
            fakerFR.word.adjective(),
            faker.helpers.arrayElement(skillLevel, 1),
            fakerFR.number.int({ min: 1, max: 20 }),
            fakerFR.number.int({ min: 1, max: 20 }),
          ]
        ),
        database.query(
          "INSERT INTO user (email, password, is_active, contact_number, sms_notification_active, email_notification_active, image, registration_date, user_type_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            fakerFR.internet.email(),
            fakerFR.internet.password({ length: 10, memorable: true }),
            fakerFR.datatype.boolean(0.8),
            fakerFR.helpers.fromRegExp(/[0]{1}[1-9]{1}[0-9]{8}/),
            fakerFR.datatype.boolean(0.6),
            fakerFR.datatype.boolean(0.9),
            fakerFR.internet.avatar(),
            fakerFR.date.recent({ days: 1 }),
            fakerFR.number.int({ min: 1, max: 20 }),
          ]
        ),
        database.query("INSERT INTO user_type (type) VALUES (?)", [
          faker.helpers.arrayElement(userType, 1),
        ])
      );
    }

    for (let i = 0; i < 200; i += 1) {
      queries.push(
        database.query(
          "INSERT INTO job (title, type, description, hours_worked, created_date, is_active, job_location_id, company_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            faker.person.jobTitle(),
            faker.helpers.arrayElement(jobType, 1),
            fakerFR.lorem.paragraph({ min: 5, max: 10 }),
            fakerFR.number.int({ min: 24, max: 48 }),
            fakerFR.date.recent({ days: 1 }),
            fakerFR.datatype.boolean(0.7),
            fakerFR.number.int({ min: 1, max: 20 }),
            fakerFR.number.int({ min: 1, max: 20 }),
          ]
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
