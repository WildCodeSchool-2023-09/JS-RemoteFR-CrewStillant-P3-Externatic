/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
/* require("dotenv").config();

/* Import database client
const database = require("./database/client");

// Import data
const candidate = require("./database/data/candidate.json");
const company = require("./database/data/company.json");
const companySector = require("./database/data/companySector.json");
const location = require("./database/data/location.json");
const user = require("./database/data/user.json");
const activity = require("./database/data/activity.json");
const skill = require("./database/data/skill.json");
const candidateDegree = require("./database/data/candidateDegree.json");
const experience = require("./database/data/experience.json");
const degree = require("./database/data/degree.json");
const userType = require("./database/data/userType.json");
const job = require("./database/data/job.json");
const message = require("./database/data/message.json");

const seed = async () => {
  try {
    /* ************************************************************************* */
// Candidate
/* const candidateQuery = [];

    for (let i = 0; i < candidate.length; i++) {
      const query = database.query(
        "INSERT INTO candidate (firstname, lastname, date_of_birth, wanted_salary, user_id) VALUES (?, ?, ?, ?, ?)",
        [
          candidate[i].firstname,
          candidate[i].lastname,
          candidate[i].date_of_birth,
          candidate[i].wanted_salary,
          candidate[i].user_id,
        ]
      );
      candidateQuery.push(query);
    }
    await Promise.all(candidateQuery);

    // Company
    const companyQuery = [];

    for (let i = 0; i < company.length; i++) {
      const query = database.query(
        "INSERT INTO company (name, image, description, website, establishment_date, siret, company_sector_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          company[i].name,
          company[i].image,
          company[i].description,
          company[i].website,
          company[i].establishment_date,
          company[i].siret,
          company[i].company_sector_id,
          company[i].user_id,
        ]
      );
      companyQuery.push(query);
    }
    await Promise.all(companyQuery);

    // Company sector
    const companySectorQuery = [];

    for (let i = 0; i < companySector.length; i++) {
      const query = database.query(
        "INSERT INTO company_sector (sector) VALUES (?)",
        [companySector[i].sector]
      );
      companySectorQuery.push(query);
    }
    await Promise.all(companySectorQuery);

    // Location
    const locationQuery = [];

    for (let i = 0; i < location.length; i++) {
      const query = database.query(
        "INSERT INTO location (additional_adress, number_adress, number_attribute, address, city, state, country, zip) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          location[i].additional_adress,
          location[i].number_adress,
          location[i].number_attribute,
          location[i].address,
          location[i].city,
          location[i].state,
          location[i].country,
          location[i].zip,
        ]
      );
      locationQuery.push(query);
    }
    await Promise.all(locationQuery);

    // User
    const userQuery = [];

    for (let i = 0; i < user.length; i++) {
      const query = database.query(
        "INSERT INTO user (email, password, is_active, contact_number, sms_notification_active, email_notification_active, image, user_type_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          user[i].email,
          user[i].password,
          user[i].is_active,
          user[i].contact_number,
          user[i].sms_notification_active,
          user[i].email_notification_active,
          user[i].image,
          user[i].user_type_id,
        ]
      );
      userQuery.push(query);
    }
    await Promise.all(userQuery);

    // Activity
    const activityQuery = [];

    for (let i = 0; i < activity.length; i++) {
      const query = database.query(
        "INSERT INTO activity ( job_id, candidate_id) values (?, ?)",
        [activity[i].job_id, activity[i].candidate_id]
      );
      activityQuery.push(query);
    }
    await Promise.all(activityQuery);

    // Skill
    const skillQuery = [];

    for (let i = 0; i < skill.length; i++) {
      const query = database.query(
        "INSERT INTO skill (name, level, candidate_id, job_id) VALUES (?, ?, ?, ?)",
        [skill[i].name, skill[i].level, skill[i].candidate_id, skill[i].job_id]
      );
      skillQuery.push(query);
    }
    await Promise.all(skillQuery);

    // Candidate degree
    const candidateDegreeQuery = [];

    for (let i = 0; i < candidateDegree.length; i++) {
      const query = database.query(
        "INSERT INTO candidate_degree (candidate_id, degree_id) VALUES (?, ?)",
        [candidateDegree[i].candidate_id, candidateDegree[i].degree_id]
      );
      candidateDegreeQuery.push(query);
    }
    await Promise.all(candidateDegreeQuery);

    // Experience
    const experienceQuery = [];

    for (let i = 0; i < experience.length; i++) {
      const query = database.query(
        "INSERT INTO experience (start_date, end_date, job_title, company_name, city, country, description, candidate_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          experience[i].start_date,
          experience[i].end_date,
          experience[i].job_title,
          experience[i].company_name,
          experience[i].city,
          experience[i].country,
          experience[i].description,
          experience[i].candidate_id,
        ]
      );
      experienceQuery.push(query);
    }
    await Promise.all(experienceQuery);

    // Degree
    const degreeQuery = [];

    for (let i = 0; i < degree.length; i++) {
      const query = database.query(
        "INSERT INTO degree (name, level, starting_date, completion_date, university, city) VALUES (?, ?, ?, ?, ?, ?)",
        [
          degree[i].name,
          degree[i].level,
          degree[i].starting_date,
          degree[i].completion_date,
          degree[i].university,
          degree[i].city,
        ]
      );
      degreeQuery.push(query);
    }
    await Promise.all(degreeQuery);

    // User type
    const userTypeQuery = [];

    for (let i = 0; i < userType.length; i++) {
      const query = database.query("INSERT INTO user_type (type) VALUES (?)", [
        userType[i].type,
      ]);
      userTypeQuery.push(query);
    }
    await Promise.all(userTypeQuery);

    // Job
    const jobQuery = [];
    for (let i = 0; i < job.length; i++) {
      const query = database.query(
        "INSERT INTO job (title, type, description, hours_worked, is_active, salary, place, sector, location_id, company_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          job[i].title,
          job[i].type,
          job[i].description,
          job[i].hours_worked,
          job[i].is_active,
          job[i].salary,
          job[i].place,
          job[i].sector,
          job[i].location_id,
          job[i].company_id,
        ]
      );
      jobQuery.push(query);
    }
    await Promise.all(jobQuery);

    // Message
    const messageQuery = [];

    for (let i = 0; i < message.length; i++) {
      const query = database.query(
        "INSERT INTO message (subject, text, user_id) VALUES ( ?, ?, ?)",
        [message[i].subject, message[i].text, message[i].user_id]
      );
      messageQuery.push(query);
    }
    await Promise.all(messageQuery);
    /* ************************************************************************* */

// Wait for all the insertion queries to complete
// await Promise.all(queries);

// Close the database connection
/*  database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
 /* } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed(); */
