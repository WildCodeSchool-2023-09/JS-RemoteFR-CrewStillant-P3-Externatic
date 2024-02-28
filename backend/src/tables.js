/* ************************************************************************* */
// Register Data Managers for Tables
/* ************************************************************************* */

// Import the manager modules responsible for handling data operations on the tables
const CompanyManager = require("./models/CompanyManager");
const JobManager = require("./models/JobManager");
const UserManager = require("./models/UserManager");
const CandidateManager = require("./models/CandidateManager");
const DegreeManager = require("./models/DegreeManager");
const ExperienceManager = require("./models/ExperienceManager");
const ActivityManager = require("./models/ActivityManager");
const MessageManager = require("./models/MessageManger");
const SectorManager = require("./models/SectorManager");
const SkillManager = require("./models/SkillManager");
const CandidateDegreeManager = require("./models/CandidateDegreeManager");
const LocationManager = require("./models/LocationManager");

const managers = [
  UserManager,
  CompanyManager,
  CandidateManager,
  JobManager,
  DegreeManager,
  ExperienceManager,
  ActivityManager,
  MessageManager,
  SectorManager,
  SkillManager,
  CandidateDegreeManager,
  LocationManager,
];

// Create an empty object to hold data managers for different tables
const tables = {};

// Register each manager as data access point for its table
managers.forEach((ManagerClass) => {
  const manager = new ManagerClass();

  tables[manager.table] = manager;
});

/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
