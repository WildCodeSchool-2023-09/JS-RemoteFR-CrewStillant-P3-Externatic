/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
const { fakerFR } = require("@faker-js/faker");

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Generating Seed Data

    // Optional: Truncate all tables (remove existing data)
    await database.query("truncate activity");
    await database.query("truncate candidate");
    await database.query("truncate candidate_degree");
    await database.query("truncate compagny");
    await database.query("truncate compagny_sector");
    await database.query("truncate degree");
    await database.query("truncate experience");
    await database.query("truncate job");
    await database.query("truncate location");
    await database.query("truncate skill");
    await database.query("truncate user");
    await database.query("truncate user_type");

    // Random skill level using an array & faker
    const skillLevel = ["notions", "moyen", "confirmé", "expert"];
    const randomSLevel = fakerFR.datatype.int({
      min: 0,
      max: skillLevel.length - 1,
    });

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
    const randomLevel = fakerFR.datatype.int({
      min: 0,
      max: degreeLevel.length - 1,
    });

    // Random user type using an array & faker
    const userType = ["candidat", "entreprise", "consultant"];
    const randomType = fakerFR.datatype.int({
      min: 0,
      max: userType.length - 1,
    });

    // Insert fake data into all tables in the same order
    for (let i = 0; i < 20; i += 1) {
      queries.push(
        database.query("insert into activity(apply_date) values (?)", [
          fakerFR.date.recent({ days: 1 }),
        ]),
        database.query(
          "insert into candidate (first_name, last_name, date_of_birth, wanted salary) VALUES (?, ?, ?, ?)",
          [
            fakerFR.person.firstName(),
            fakerFR.person.lastName(),
            fakerFR.date.birthdate({ min: 18, max: 75, mode: "age" }),
            fakerFR.number.int({ min: 35000, max: 200000 }),
          ]
        ),
        database.query(
          "INSERT INTO compagny (name, image, description, website, establishment_date) VALUES (?, ?, ?, ?, ?)",
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
          ]
        ),
        database.query("INSERT INTO compagny_sector (sector) VALUES (?)", [
          fakerFR.person.jobArea(),
        ]),
        database.query(
          "INSERT INTO degree (name, level, starting_date, completion_date, university, city) VALUES (?, ?, ?, ?, ?, ?)",
          [
            fakerFR.person.jobType(),
            degreeLevel[randomLevel],
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
          "INSERT INTO experience (start_date, end_date, job_title, company_name, city, country, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            fakerFR.date.between({
              from: "2018-12-01T00:00:00.000Z",
              to: "2022-12-01T00:00:00.000Z",
            }),
            fakerFR.date.between({
              from: "2022-12-01T00:00:00.000Z",
              to: "2023-12-01T00:00:00.000Z",
            }),
            fakerFR.person.jobTitle(),
            fakerFR.company.name(),
            fakerFR.location.city(),
            "France",
            fakerFR.lorem.paragraph({ min: 2, max: 5 }),
          ]
        ),
        database.query(
          "INSERT INTO job (title, type, description, created_date, is_active) VALUES (?, ?, ?, ?, ?)",
          [
            fakerFR.person.jobTitle(),
            fakerFR.person.jobType(),
            fakerFR.lorem.paragraph({ min: 5, max: 10 }),
            fakerFR.date.recent({ days: 10 }),
            fakerFR.datatype.boolean(0.7),
          ]
        ),
        database.query(
          "INSERT INTO location (address, city, state, country, zip) VALUES (?, ?, ?, ?, ?)",
          [
            fakerFR.location.street(),
            fakerFR.location.city(),
            fakerFR.location.state(),
            "France",
            fakerFR.location.zipCode("#####"),
          ]
        ),
        database.query("INSERT INTO skill (name, level) VALUES (?, ?)", [
          fakerFR.word.adjective(),
          skillLevel[randomSLevel],
        ]),
        database.query(
          "INSERT INTO user (email, password, is_active, contact_number, sms_notification_active, email_notification_active, image, registration_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            fakerFR.internet.email(),
            fakerFR.internet.password({ length: 10, memorable: true }),
            fakerFR.datatype.boolean(0.8),
            fakerFR.helpers.fromRegExp(/[0]{1}[0-9]{1}[0-9]{8}/),
            fakerFR.datatype.boolean(0.6),
            fakerFR.datatype.boolean(0.9),
            fakerFR.internet.avatar(),
            fakerFR.date.recent({ days: 1 }),
          ]
        ),
        database.query("INSERT INTO user_type (type) VALUES (?)", [
          userType[randomType],
        ])
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
