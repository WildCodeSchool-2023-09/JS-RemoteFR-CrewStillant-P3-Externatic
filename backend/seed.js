/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
const { faker } = require("@faker-js/faker");

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

    // Insert fake data into the 'item' table
    for (let i = 0; i < 20; i += 1) {
      queries.push(
        database.query("insert into activity(apply_date) values (?)", [
          faker.date.recent({ days: 1 }),
        ]),
        database.query(
          "insert into candidate (first_name, last_name, date_of_birth, wanted salary) VALUES (?, ?, ?, ?)",
          [
            faker.person.firstName(),
            faker.person.lastName(),
            faker.date.birthdate({ min: 18, max: 75, mode: "age" }),
            faker.number.int({ min: 35000, max: 200000 }),
          ]
        ),
        database.query(
          "INSERT INTO compagny (name, image, description, website, establishment_date) VALUES (?, ?, ?, ?, ?)",
          [
            faker.company.name(),
            faker.image.urlPlaceholder({
              width: 128,
              height: 128,
              backgroundColor: "6B6B6B",
              textColor: "FFFFFF",
              format: "png",
              text: "logo",
            }),
            faker.lorem.paragraph({ min: 2, max: 5 }),
            faker.internet.url({ appendSlash: true }),
            faker.date.past({ years: 30 }),
          ]
        ),
        database.query("", []),
        database.query("", []),
        database.query("", []),
        database.query("", []),
        database.query("", []),
        database.query("", []),
        database.query("", []),
        database.query("", []),
        database.query("", []),
        database.query("", [])
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
