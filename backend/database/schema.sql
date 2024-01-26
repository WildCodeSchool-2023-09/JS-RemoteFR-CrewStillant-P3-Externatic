-- Table: activity
CREATE TABLE activity (
    id INT AUTO_INCREMENT NOT NULL,
    apply_date DATE  NOT NULL,
    job_id INT  NOT NULL,
    candidate_id INT  NOT NULL,
    CONSTRAINT activity_pk PRIMARY KEY (id)
);

-- Table: candidate
CREATE TABLE candidate (
    id INT AUTO_INCREMENT NOT NULL,
    firstname VARCHAR(80)  NOT NULL,
    lastname VARCHAR(80)  NOT NULL,
    date_of_birth DATE  NOT NULL,
    wanted_salary INT  NULL,
    curriculum VARCHAR(255)  NULL,
    user_id INT  NOT NULL,
    CONSTRAINT candidate_pk PRIMARY KEY (id)
);

-- Table: candidate_degree
CREATE TABLE candidate_degree (
    id INT AUTO_INCREMENT NOT NULL,
    candidate_id INT  NOT NULL,
    degree_id INT  NOT NULL,
    CONSTRAINT candidate_degree_pk PRIMARY KEY (id)
);

-- Table: company
CREATE TABLE company (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255)  NOT NULL,
    image VARCHAR(255) NULL,
    description TEXT  NOT NULL,
    website VARCHAR(255)  NOT NULL,
    establishment_date DATE  NOT NULL,
    siret BIGINT NOT NULL UNIQUE,
    company_sector_id INT  NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT company_pk PRIMARY KEY (id)
);

-- Table: company_sector
CREATE TABLE company_sector (
    id INT AUTO_INCREMENT NOT NULL,
    sector VARCHAR(100)  NOT NULL,
    CONSTRAINT company_sector_pk PRIMARY KEY (id)
);

-- Table: degree
CREATE TABLE degree (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(80)  NOT NULL,
    level VARCHAR(80)  NOT NULL,
    starting_date DATE  NOT NULL,
    completion_date DATE  NULL,
    university VARCHAR(80)  NULL,
    city VARCHAR(80)  NULL,
    CONSTRAINT degree_pk PRIMARY KEY (id)
);

-- Table: experience
CREATE TABLE experience (
    id INT AUTO_INCREMENT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE  NULL,
    job_title VARCHAR(50) NOT NULL,
    company_name VARCHAR(100)  NULL,
    city VARCHAR(50)  NULL,
    country VARCHAR(50)  NULL,
    description TEXT NOT NULL,
    candidate_id INT  NOT NULL,
    CONSTRAINT experience_pk PRIMARY KEY (id)
);

-- Table: job
CREATE TABLE job (
   id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(100)  NOT NULL,
    type VARCHAR(30)  NOT NULL,
    description TEXT  NOT NULL,
    hours_worked INT NOT NULL,
    created_date DATETIME NOT NULL DEFAULT NOW(),
    is_active BOOL NULL,
    salary INT NOT NULL,
    place VARCHAR(10) NOT NULL,
    sector VARCHAR(100) NOT NULL,
    location_id INT  NOT NULL,
    company_id INT  NOT NULL,
    CONSTRAINT job_pk PRIMARY KEY (id)
);

-- Table: location
CREATE TABLE location (
    id INT AUTO_INCREMENT NOT NULL,
    additional_adress VARCHAR(100) NULL,
    number_adress INT NULL,
    number_attribute VARCHAR(10) NULL,
    address VARCHAR(100)  NOT NULL,
    city VARCHAR(50)  NOT NULL,
    state VARCHAR(50)  NOT NULL,
    country VARCHAR(50)  NOT NULL,
    zip VARCHAR(5)  NOT NULL,
    CONSTRAINT location_pk PRIMARY KEY (id)
);

-- Table: skill
CREATE TABLE skill (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(50)  NOT NULL,
    level VARCHAR(50)  NOT NULL,
    candidate_id INT  NOT NULL,
    job_id INT  NOT NULL,
    CONSTRAINT skill_pk PRIMARY KEY (id)
);

-- Table: user
CREATE TABLE user (
   id INT AUTO_INCREMENT NOT NULL,
    email VARCHAR(255)  NOT NULL UNIQUE,
    password VARCHAR(100)  NOT NULL,
    is_active BOOL NULL,
    contact_number VARCHAR(20)  NOT NULL,
    sms_notification_active BOOL  NOT NULL,
    email_notification_active BOOL  NOT NULL,
    image VARCHAR(255)  NULL,
    registration_date DATETIME NOT NULL DEFAULT NOW(),
    user_type_id INT  NOT NULL,
    CONSTRAINT user_pk PRIMARY KEY (id)
);

-- Table: user_type
CREATE TABLE user_type (
    id INT AUTO_INCREMENT NOT NULL,
    type VARCHAR(20)  NOT NULL,
    CONSTRAINT user_type_pk PRIMARY KEY (id)
);

-- Table: messages
CREATE TABLE message(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
subject VARCHAR(255) NOT NULL,
text TEXT NOT NULL,
recieved_date DATETIME NOT NULL DEFAULT NOW(),
user_id INT NOT NULL
);