
-- Table: activity
CREATE TABLE activity (
    id INT AUTO_INCREMENT NOT NULL,
    apply_date DATE  NOT NULL,
    job_post_id INT  NOT NULL,
    user_account_id INT  NOT NULL,
    CONSTRAINT activity_pk PRIMARY KEY (id)
);

-- Table: candidate
CREATE TABLE candidate (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(50)  NOT NULL,
    last_name VARCHAR(50)  NOT NULL,
    date_of_birth DATE  NOT NULL,
    wanted_salary INT  NULL,
    user_account_id INT  NOT NULL,
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
    image VARCHAR(255)  NOT NULL,
    description TEXT  NOT NULL,
    website VARCHAR(255)  NOT NULL,
    establishment_date DATE  NOT NULL,
    company_sector_id INT  NOT NULL,
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
    start_date DATE  NOT NULL,
    end_date DATE  NULL,
    job_title VARCHAR(50)  NOT NULL,
    company_name VARCHAR(100)  NULL,
    city VARCHAR(50)  NULL,
    country VARCHAR(50)  NULL,
    description TEXT  NOT NULL,
    candidate_id INT  NOT NULL,
    CONSTRAINT experience_pk PRIMARY KEY (id)
);

-- Table: job
CREATE TABLE job (
   id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(100)  NOT NULL,
    type VARCHAR(30)  NOT NULL,
    description TEXT  NOT NULL,
    created_date DATETIME NOT NULL,
    is_active BOOL  NOT NULL,
    job_location_id INT  NOT NULL,
    company_id INT  NOT NULL,
    CONSTRAINT job_pk PRIMARY KEY (id)
);

-- Table: location
CREATE TABLE location (
    id INT AUTO_INCREMENT NOT NULL,
    address VARCHAR(100)  NOT NULL,
    city VARCHAR(50)  NOT NULL,
    state VARCHAR(50)  NOT NULL,
    country VARCHAR(50)  NOT NULL,
    zip INT  NOT NULL,
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
    email VARCHAR(255)  NOT NULL,
    password VARCHAR(100)  NOT NULL,
    is_active BOOL  NOT NULL,
    contact_number INT(20)  NOT NULL,
    sms_notification_active BOOL  NOT NULL,
    email_notification_active BOOL  NOT NULL,
    image VARCHAR(255)  NULL,
    registration_date DATE  NOT NULL,
    user_type_id INT  NOT NULL,
    CONSTRAINT user_pk PRIMARY KEY (id)
);

-- Table: user_type
CREATE TABLE user_type (
    id INT AUTO_INCREMENT NOT NULL,
    type VARCHAR(20)  NOT NULL,
    CONSTRAINT user_type_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: company_sector 
ALTER TABLE company ADD CONSTRAINT company_sector_fk FOREIGN KEY (company_sector_id)
    REFERENCES company_sector (id);

-- Reference: candidate_degree 
ALTER TABLE candidate_degree ADD CONSTRAINT degree_candidate_fk FOREIGN KEY (degree_id)
    REFERENCES degree (id);

-- Reference: experience 
ALTER TABLE experience ADD CONSTRAINT candidate_experience_fk FOREIGN KEY (candidate_id)
    REFERENCES candidate (id);

-- Reference: job 
ALTER TABLE job ADD CONSTRAINT job_location_fk FOREIGN KEY (job_location_id)
    REFERENCES location (id);

-- Reference: job 
ALTER TABLE activity ADD CONSTRAINT user_job_fk FOREIGN KEY (user_account_id)
    REFERENCES user (id);

-- Reference: activity
ALTER TABLE activity ADD CONSTRAINT job_activity_fk FOREIGN KEY (job_post_id)
    REFERENCES job (id);

-- Reference: job_post_company 
ALTER TABLE job ADD CONSTRAINT job_company_fk FOREIGN KEY (company_id)
    REFERENCES company (id);

-- Reference: job_post_skill 
ALTER TABLE skill ADD CONSTRAINT job_skill_fk FOREIGN KEY (job_id)
    REFERENCES job (id);

-- Reference: candidate_degree 
ALTER TABLE candidate_degree ADD CONSTRAINT candidate_degree_fk FOREIGN KEY (candidate_id)
    REFERENCES candidate (id);

-- Reference: candidate 
ALTER TABLE candidate ADD CONSTRAINT user_candidate_fk FOREIGN KEY (user_account_id)
    REFERENCES user (id);

-- Reference: skill 
ALTER TABLE skill ADD CONSTRAINT candidate_skill_fk FOREIGN KEY (candidate_id)
    REFERENCES candidate (id);

-- Reference: user_type 
ALTER TABLE user ADD CONSTRAINT user_type_fk FOREIGN KEY (user_type_id)
    REFERENCES user_type (id);

-- End of file.

