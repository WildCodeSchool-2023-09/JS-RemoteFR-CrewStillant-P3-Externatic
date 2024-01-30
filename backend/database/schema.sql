-- Creation

-- Table: candidate
CREATE TABLE candidate (
    id INT AUTO_INCREMENT NOT NULL,
    firstname VARCHAR(80)  NOT NULL,
    lastname VARCHAR(80)  NOT NULL,
    date_of_birth DATE  NOT NULL,
    wanted_salary INT  NULL,
    user_id INT  NOT NULL,
    CONSTRAINT candidate_pk PRIMARY KEY (id)
);

-- Table: company
CREATE TABLE company (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255)  NOT NULL,
    image VARCHAR(255)  NOT NULL,
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
    sector VARCHAR(100) NOT NULL,
    CONSTRAINT company_sector_pk PRIMARY KEY (id)
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

-- Table: user
CREATE TABLE user (
   id INT AUTO_INCREMENT NOT NULL,
    email VARCHAR(255)  NOT NULL UNIQUE,
    password VARCHAR(100)  NOT NULL,
    is_active BOOL  NOT NULL,
    contact_number VARCHAR(20)  NOT NULL,
    sms_notification_active BOOL  NOT NULL,
    email_notification_active BOOL  NOT NULL,
    image VARCHAR(255)  NULL,
    registration_date DATETIME NOT NULL DEFAULT NOW(),
    user_type_id INT  NOT NULL,
    CONSTRAINT user_pk PRIMARY KEY (id)
);

-- Table: activity
CREATE TABLE activity (
    id INT AUTO_INCREMENT NOT NULL,
    apply_date DATETIME NOT NULL DEFAULT NOW(),
    job_id INT  NOT NULL,
    candidate_id INT  NOT NULL,
    CONSTRAINT activity_pk PRIMARY KEY (id)
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

-- Table: candidate_degree
CREATE TABLE candidate_degree (
    id INT AUTO_INCREMENT NOT NULL,
    candidate_id INT  NOT NULL,
    degree_id INT  NOT NULL,
    CONSTRAINT candidate_degree_pk PRIMARY KEY (id)
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

-- Table: user_type
CREATE TABLE user_type (
    id INT AUTO_INCREMENT NOT NULL,
    type VARCHAR(20)  NOT NULL,
    CONSTRAINT user_type_pk PRIMARY KEY (id)
);

-- Table: job
CREATE TABLE job (
   id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(100)  NOT NULL,
    type VARCHAR(30)  NOT NULL,
    description TEXT  NOT NULL,
    hours_worked INT NOT NULL,
    created_date DATETIME NOT NULL DEFAULT NOW(),
    is_active BOOL  NOT NULL,
    salary INT NOT NULL,
    place VARCHAR(10) NOT NULL,
    sector VARCHAR(100) NOT NULL,
    location_id INT  NOT NULL,
    company_id INT  NOT NULL,
    CONSTRAINT job_pk PRIMARY KEY (id)
);

-- Table: messages
CREATE TABLE message(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
subject VARCHAR(255) NOT NULL,
text TEXT NOT NULL,
recieved_date DATETIME NOT NULL DEFAULT NOW(),
user_id INT NOT NULL
);

-- Insertion

    INSERT INTO candidate (firstname, lastname, date_of_birth, wanted_salary, user_id)
VALUES
    ("Malissia", "Cardenas", "1994-03-27", 90700, 1),
    ("Chen", "Mitroshinov", "1994-03-23", 94998, 3),
    ("Conny", "Ledwidge", "1988-03-16", 154241, 4),
    ("Merle", "Evamy", "1998-11-03", 61372, 5),
    ("Kattie", "Treppas", "2000-08-02", 114084, 9),
    ("Frederico", "Peyro", "1993-11-10", 172207, 11),
    ("Lefty", "Westmore", "1996-07-25", 61985, 12),
    ("Puff", "Dablin", "1991-09-21", 170898, 13);
  
INSERT INTO company (name, image, description, website, establishment_date, siret, company_sector_id, user_id)
 VALUES
("Technicity", "https://www.logogenie.fr/download/preview/engine/13203026", "Nous développons des solutions numériques pour nos clients sur tous types de projets et supports. Du développement web à l'infrastructure réseaux, nous gérons tous les pôles menant à votre réussite. Fort d'une expérience de 15 ans dans le numérique, nous vous accompagnerons dans votre carrière.", "https://puginarug.com/", "2005-02-10", 012345678985472, 1, 6),
("Computers & Co", "https://www.logogenie.fr/download/preview/engine/13202670", "Nous développons des solutions numériques pour nos clients sur tous types de projets et supports. Du développement web à l'infrastructure réseaux, nous gérons tous les pôles menant à votre réussite. Fort d'une expérience de 15 ans dans le numérique, nous vous accompagnerons dans votre carrière.", "https://puginarug.com/", "2005-02-10", 012345438985472, 2, 7),
("TotoDev S.A.", "https://www.logogenie.fr/download/preview/engine/13202679", "Nous développons des solutions numériques pour nos clients sur tous types de projets et supports. Du développement web à l'infrastructure réseaux, nous gérons tous les pôles menant à votre réussite. Fort d'une expérience de 15 ans dans le numérique, nous vous accompagnerons dans votre carrière.", "https://puginarug.com/", "2005-02-10", 012345678195472, 3, 8),
("Amazing-Computing ", "https://www.logogenie.fr/download/preview/engine/13202685", "Nous développons des solutions numériques pour nos clients sur tous types de projets et supports. Du développement web à l'infrastructure réseaux, nous gérons tous les pôles menant à votre réussite. Fort d'une expérience de 15 ans dans le numérique, nous vous accompagnerons dans votre carrière.", "https://puginarug.com/", "2005-02-10", 012379678985472, 4, 2),
("RollingDev", "https://www.logogenie.fr/download/preview/engine/13202692", "Nous développons des solutions numériques pour nos clients sur tous types de projets et supports. Du développement web à l'infrastructure réseaux, nous gérons tous les pôles menant à votre réussite. Fort d'une expérience de 15 ans dans le numérique, nous vous accompagnerons dans votre carrière.", "https://puginarug.com/", "2005-02-10", 012345678985132, 5, 10);

INSERT INTO company_sector (sector) 
VALUES 
("Technologie de l'Information"),
("Santé"),
("Énergie"),
("Finance "),
("Automobile"),
("Alimentation et Boissons "),
("Aérospatiale et Défense"),
("Biotechnologie"),
("Industrie manufacturière"),
("Télécommunications");

INSERT INTO location (additional_adress, number_adress, number_attribute, address, city, state, country, zip)
 VALUES 
 ("Résidence", 25, "bis", "Rue de la paix","Nantes", "Pays de la Loire", "France", 44000),
( "", 1, "", "Rue de l'écorce écarlate", "Paris", "Ile-de-France", "France", 75016),
("", 107, "", "Place Napoléon Bonaparte", "Dreux", "Centre-Val de Loire", "France", 28100),
("", 8, "ter", "Avenue du Général Leclerc", "Lyon", "Auvergne-Rhône-Alpes", "France", 69000),
("Bâtiment", 10, "D", "Rue de la palme d'or", "Lille", "Hauts-de-France", "France", 59000);

INSERT INTO user (email, password, is_active, contact_number, sms_notification_active, email_notification_active, image, user_type_id) 
VALUES 
("Malissiarde@gmail.com", "$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg", 1, "0612345678", 1, 1, "https://images.media.io/pixpic-styles/IDphotowomen.png?task_id=1221506", 1),
("AmazingComputing@contact.com", "$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg", 1, "0612345678", 1, 1, "https://www.logogenie.fr/download/preview/engine/13202685", 2),
("ChenMitroshinov@gmail.com", "$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg", 1, "0612345678", 1, 1, "https://images.media.io/pixpic-styles/male_id_photo.png?task_id=1225012", 1),
("ConnyLedwidge@gmail.com", "$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg", 1, "0612345678", "1", 1, "https://images.media.io/pixpic-web/styles/20231107/male_LinkedIn.png", 1),
("MerleEvamy@gmail.com", "$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg", 1, "0612345678", 1, 1, "https://images.media.io/pixpic-styles/ProfilePicture.png?task_id=1221501", 1),
("Technicity@contact.com", "$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg", 1, "0612345678", 1, 1, "https://www.logogenie.fr/download/preview/engine/13203026", 2),
("ComputersCo@contact.com", "$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg", 1, "0612345678", 1, 1, "https://www.logogenie.fr/download/preview/engine/13202670", 2),
("TotoDev@contact.com", "$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg", 1, "0612345678", 1, 1, "https://www.logogenie.fr/download/preview/engine/13202679", 2),
("KattieTreppas@gmail.com", "$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg", 1, "0612345678", 1, 1, "https://images.media.io/pixpic-web/styles/20231107/female_Badge_Photo.png", 1),
("RollingDev@contact.com", "$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg", 1, "0612345678", 1, 1, "https://www.logogenie.fr/download/preview/engine/13202692", 2),
("FredericoPeyro@gmail.com", "$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg", 1, "0612345678", 1, 1, "https://images.media.io/pixpic-web/styles/20231107/male_Badge_Photo.png", 1),
("LeftyWestmore@gmail.com", "$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg", 1, "0612345678", 1, 1, "https://images.media.io/pixpic-styles/Graduationweb2.png?task_id=1221465", 1),
("PuffDablin@gmail.com", "$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg", 1, "0612345678", 1, 1, "https://images.media.io/pixpic-styles/profilepictureman.png?task_id=1221524", 1);

INSERT INTO activity (job_id, candidate_id) 
    VALUES 
(13, 1),
(25, 1),
(30, 5),
(1,11),
(3, 1),
(29, 9),
(27, 3),
(1, 1),
(25, 12),
(7, 3),
(14, 5),
(28, 11),
(22, 3),
(2, 9),
(1, 1),
(2, 9),
(3, 3),
(4, 4),
(5, 5),
(6, 13),
(7, 11),
(8, 9),
(9, 1),
(10, 9),
(11, 3),
(12, 4),
(13, 5),
(14, 12),
(15, 9),
(16, 5),
(17, 1),
(18, 5),
(19, 3),
(20, 4),
(21, 5),
(22, 11),
(23, 12),
(24, 3),
(25, 1),
(26, 9),
(27, 3),
(28, 4),
(29, 5),
(30, 12),
(31, 3),
(32, 4),
(33, 1),
(34, 12),
(35, 3),
(36, 4),
(37, 5),
(38, 1),
(39, 5),
(40, 13),
(41, 1),
(42, 5),
(43, 3),
(44, 4),
(45, 5);

    INSERT INTO skill (name, level, candidate_id, job_id) 
VALUES 
("HTML", "Expert", 12, 1),
("CSS", "Expert", 11, 2),
("JavaScript", "Courant", 3, 3),
("Rust", "Avancé", 4, 4),
("C++", "Avancé", 5, 5),
("C#", "Avancé", 1, 6);
                
   INSERT INTO candidate_degree (candidate_id, degree_id)
    VALUES 
   (1, 5),
(5, 15),
(11, 5),
(12, 7),
(13, 5),
(4, 14),
(5, 1),
(3, 9),
(1, 13),
(4, 1),
(3, 3),
(9, 11),
(5, 4),
(1, 8),
(4, 2);     

INSERT INTO experience (start_date, end_date, job_title, company_name, city, country, description, candidate_id)
 VALUES 
("2015-01-02", "2023-12-31", "Développeur Web & Web Mobile", "Amazon", "Paris", "France", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras semper auctor neque vitae tempus quam pellentesque nec. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.", 12),
("2015-01-02", "2023-12-31", "Développeur Web & Web Mobile", "Google", "Paris", "France", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras semper auctor neque vitae tempus quam pellentesque nec. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.", 11),
("2015-01-02", "2023-12-31", "Développeur Web & Web Mobile", "Facebook", "Paris", "France", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras semper auctor neque vitae tempus quam pellentesque nec. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.", 3),
("2015-01-02", "2023-12-31", "Développeur Web & Web Mobile", "Youtube", "Paris", "France", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras semper auctor neque vitae tempus quam pellentesque nec. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.", 4),
("2015-01-02", "2023-12-31", "Développeur Web & Web Mobile", "Twitter", "Paris", "France", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras semper auctor neque vitae tempus quam pellentesque nec. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.", 5),
("2024-01-02", "2023-12-31", "Développeur Web & Web Mobile", "Samsung", "Paris", "France", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras semper auctor neque vitae tempus quam pellentesque nec. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.", 1);

INSERT INTO degree (name, level, starting_date, completion_date, university, city) 
VALUES 
("Licence en Génie Électrique et Informatique", "Bac+3", "2001-01-12", "2004-06-08", "Université de Paris", "Paris"),
("Doctorat en Cybersécurité", "Bac+8", "2000-06-06", "2008-06-11", "Université Lyon 1 Claude Bernard", "Lyon"),
("Master en Réalité Virtuelle", "Bac+5", "2003-07-05", "2008-11-28", "Université de Lille", "Lille"),
("Licence en Gestion des Systèmes d'Information", "Bac+3", "1999-06-21", "2002-06-16", "Sorbonne Université", "Paris"),
("Doctorat en Intelligence Artificielle", "Bac+8", "2005-04-10", "2013-02-26", "Université Grenoble Alpes", "Strasbourg"),
("Doctorat en Science des Données", "Bac+8", "2000-07-19", "208-03-25", "Université de Strasbourg ", "Carlton"),
("Master en Ingénierie Logicielle", "Bac+5", "2015-06-08", "2020-10-23", "Université Paris-Sud", "Orsay"),
("Licence en Informatique", "Bac+3", "2004-12-10", "2007-04-16", "Aix-Marseille Université", "Marseille"),
("Master en Développement Web", "Bac+5", "2012-04-19", "2017-03-17", "Université de Bordeaux", "Bordeaux"),
("Licence en Réseaux et Sécurité", "Bac+3", "2003-03-15", "2006-12-04", "Université Pierre et Marie Curie (UPMC)", "Paris"),
("Master en Robotique Avancée", "Bac+5", "2008-07-17", "2013-12-04", "Université Toulouse 1 Capitole", "Toulouse"),
("Doctorat en Ingénierie des Logiciels Embarqués", "Bac+8", "2001-01-22", "2009-09-04", "Université Nice Sophia Antipolis", "Nice");

INSERT INTO user_type (type) 
VALUES 
("candidat"),
("entreprise"),
("administrateur"); 

INSERT INTO job (
    title,
    type,
    description,
    hours_worked,
    is_active,
    salary,
    place,
    sector,
    location_id,
    company_id
) VALUES 
("Développeur Web Senior", "Contrat à durée déterminée", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras semper auctor neque vitae tempus quam pellentesque nec. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.", 35, 1, 100000, "Hybride", "Développement", 1, 1),
("Développeur Web Mobile", "Contrat à durée indéterminée", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras semper auctor neque vitae tempus quam pellentesque nec. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.", 35, 1, 60000, "Hybride", "Développement", 2, 2),
("Data Analyste", "Stage", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras semper auctor neque vitae tempus quam pellentesque nec. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.", 24, 1, 45000, "Sur site", "Data", 3, 3),
("Testeur", "Alternance", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras semper auctor neque vitae tempus quam pellentesque nec. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.", 30, 1, 80000, "A distance", "Cloud", 4, 4),
("DevOps", "Contrat à durée déterminée", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras semper auctor neque vitae tempus quam pellentesque nec. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.", 35, 1, 50000, "Hybride", "Cloud Azure", 5, 5),
("Développeur Full Stack", "Contrat à durée indéterminée", "Lorem ipsum dolor sit amet, consectetur adipiscing elit...", 35, 1, 55000, "Hybride", "Technologie de l'Information", 1, 1),
("Data Scientist", "Contrat à durée indéterminée", "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...", 35, 1, 70000, "À distance", "Santé", 2, 2),
("Ingénieur DevOps", "Contrat à durée indéterminée", "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...", 35, 1, 65000, "Sur site", "Énergie", 3, 3),
("Analyste d'affaires", "Contrat à durée indéterminée", "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore...", 35, 1, 60000, "Hybride", "Finance ", 4, 4),
("Chef de projet IT", "Contrat à durée indéterminée", "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia...", 35, 1, 75000, "À distance", "Automobile", 5, 5),
("Architecte logiciel", "Contrat à durée indéterminée", "Deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus...", 35, 1, 80000, "Sur site", "Alimentation et Boissons ", 1, 1),
("Administrateur système", "Contrat à durée indéterminée", "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit...", 35, 1, 55000, "Hybride", "Aérospatiale et Défense", 2, 2),
("Ingénieur sécurité", "Contrat à durée indéterminée", "Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt...", 35, 1, 70000, "À distance", "Biotechnologie", 3, 3),
("Testeur logiciel", "Contrat à durée indéterminée", "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet...", 35, 1, 50000, "Sur site", "Industrie manufacturière", 4, 4),
("Ingénieur réseau", "Contrat à durée indéterminée", "Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt...", 35, 1, 60000, "Hybride", "Télécommunications", 5, 5),
("Spécialiste en sécurité", "Contrat à durée indéterminée", "Lorem ipsum dolor sit amet, consectetur adipiscing elit...", 35, 1, 65000, "Hybride", "Technologie de l'Information", 1, 1),
("Ingénieur en logiciel embarqué", "Contrat à durée indéterminée", "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...", 35, 1, 70000, "À distance", "Santé", 2, 2),
("Gestionnaire de projet IT", "Contrat à durée indéterminée", "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...", 35, 1, 75000, "Sur site", "Énergie", 3, 3),
("Analyste de données", "Contrat à durée indéterminée", "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore...", 35, 1, 60000, "Hybride", "Finance", 4, 4),
("Ingénieur en test logiciel", "Contrat à durée indéterminée", "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia...", 35, 1, 55000, "À distance", "Automobile", 5, 5),
("Architecte de solutions", "Contrat à durée indéterminée", "Deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus...", 35, 1, 80000, "Sur site", "Alimentation et Boissons ", 1, 1),
("Administrateur de base de données", "Contrat à durée indéterminée", "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit...", 35, 1, 55000, "Hybride", "Aérospatiale et Défense", 2, 2),
("Ingénieur en assurance qualité", "Contrat à durée indéterminée", "Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt...", 35, 1, 60000, "À distance", "Biotechnologie", 3, 3),
("Développeur Backend", "Contrat à durée indéterminée", "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet...", 35, 1, 65000, "Sur site", "Industrie manufacturière", 4, 4),
("Développeur Frontend", "Contrat à durée indéterminée", "Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt...", 35, 1, 60000, "Hybride", "Télécommunications",5, 5),
("Développeur Backend", "Contrat à durée indéterminée", "Lorem ipsum dolor sit amet, consectetur adipiscing elit...", 35, 1, 65000, "À distance", "Technologie de l'Information", 1, 2),
("Ingénieur en logiciel embarqué", "Contrat à durée indéterminée", "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...", 35, 1, 70000, "Sur site", "Santé", 2, 3),
("Gestionnaire de projet IT", "Contrat à durée indéterminée", "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...", 35, 1, 75000, "Hybride", "Énergie", 3, 4),
("Analyste de données", "Contrat à durée indéterminée", "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore...", 35, 1, 60000, "À distance", "Finance ", 4, 5),
("Ingénieur en test logiciel", "Contrat à durée indéterminée", "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia...", 35, 1, 55000, "Sur site", "Automobile", 5, 1),
("Architecte de solutions", "Contrat à durée indéterminée", "Deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus...", 35, 1, 80000, "Hybride", "Alimentation et Boissons ", 1, 3),
("Administrateur de base de données", "Contrat à durée indéterminée", "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit...", 35, 1, 55000, "À distance", "Aérospatiale et Défense", 2, 4),
("Ingénieur en assurance qualité", "Contrat à durée indéterminée", "Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt...", 35, 1, 60000, "Sur site", "Biotechnologie", 3, 5),
("Développeur Mobile", "Contrat à durée indéterminée", "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet...", 35, 1, 65000, "Hybride", "Industrie manufacturière", 4, 1),
("Ingénieur réseau", "Contrat à durée indéterminée", "Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt...", 35, 1, 60000, "À distance", "Télécommunications", 5, 2),
("Spécialiste en sécurité", "Contrat à durée indéterminée", "Lorem ipsum dolor sit amet, consectetur adipiscing elit...", 35, 1, 65000, "Sur site", "Technologie de l'Information", 1, 3),
("Ingénieur en logiciel embarqué", "Contrat à durée indéterminée", "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...", 35, 1, 70000, "Hybride", "Santé", 2, 4),
("Gestionnaire de projet IT", "Contrat à durée indéterminée", "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...", 35, 1, 75000, "À distance", "Énergie", 3, 5),
("Analyste de données", "Contrat à durée indéterminée", "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore...", 35, 1, 60000, "Sur site", "Finance ", 4, 1),
("Ingénieur en test logiciel", "Contrat à durée indéterminée", "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia...", 35, 1, 55000, "Hybride", "Automobile", 5, 2);

INSERT INTO message (subject, text, user_id) 
VALUES 
("Mise à jour du projet", "Le projet est sur la bonne voie et nous respectons nos jalons.", 1),
("Compte-rendu de réunion", "Ci-joint le compte-rendu de notre dernière réunion.", 2),
("Examen du budget", "Nous devons examiner le budget pour le prochain trimestre.", 3),
("Nouvelle embauche", "Veuillez accueillir notre nouveau membre de l'équipe, John Doe.", 4),
("Mise à jour du logiciel", "Une nouvelle version du logiciel est disponible.", 5),
("Rapport de ventes", "Les ventes ont augmenté de 10% ce mois-ci.", 6),
("Stratégie marketing", "Discutons de notre stratégie marketing pour le prochain trimestre.", 7),
("Retour des clients", "Nous avons reçu des commentaires de nos clients.", 8),
("Lancement de produit", "Notre nouveau produit sera lancé le mois prochain.", 9),
("Réunion d'équipe", "Notre prochaine réunion d'équipe est prévue pour lundi.", 10),
("Calendrier des vacances", "Veuillez trouver le calendrier des vacances en pièce jointe.", 11),
("Évaluation de performance", "Il est temps pour nos évaluations de performance annuelles.", 12),
("Session de formation", "Une nouvelle session de formation a été programmée.", 13),
("Bilan de fin d'année", "Examinons nos réalisations pour l'année.", 1),
("Mise à jour de la politique", "Nous avons mis à jour notre politique de confidentialité.", 2),
("Bug du logiciel", "Nous avons identifié un bug dans le logiciel.", 3),
("Participation à la conférence", "Veuillez confirmer votre participation à la conférence à venir.", 4),
("Arrêt du système", "Le système sera en maintenance ce soir.", 5),
("Nouvelle fonctionnalité", "Une nouvelle fonctionnalité a été ajoutée au logiciel.", 6),
("Réunion client", "Une réunion avec le client a été programmée pour la semaine prochaine.", 7),
("Approbation de la facture", "Veuillez approuver la facture jointe.", 8),
("Renouvellement du contrat", "Notre contrat avec le client est à renouveler.", 9),
("Enquête auprès des employés", "Veuillez remplir l'enquête de satisfaction des employés jointe.", 10),
("Santé et sécurité", "Veuillez consulter les directives de santé et de sécurité mises à jour.", 11),
("Déménagement du bureau", "Notre bureau déménagera dans un nouveau lieu le mois prochain.", 12),
("Violation de données", "Nous avons détecté une éventuelle violation de données.", 13),
("Mise à niveau du serveur", "Le serveur sera mis à niveau ce week-end.", 1),
("Réinitialisation du mot de passe", "Votre mot de passe a été réinitialisé. Veuillez en créer un nouveau.", 2),
("Rapport annuel", "Le rapport annuel est maintenant disponible pour examen.", 3),
("Formation logicielle", "Une session de formation logicielle a été programmée.", 4),
("Politique de vacances", "Veuillez consulter la politique de vacances mise à jour.", 5),
("Date limite du projet", "La date limite du projet a été avancée.", 6),
("Promotion d'un employé", "Félicitations pour votre promotion !", 7),
("Retour du client", "Le client a donné son avis sur notre proposition.", 8),
("Coupes budgétaires", "En raison de coupes budgétaires, nous devrons reporter certains projets.", 9),
("Fusion d'entreprises", "Notre entreprise va fusionner avec une autre entreprise.", 10),
("Licence logicielle", "Notre licence logicielle expirera le mois prochain.", 11),
("Audit de sécurité", "Un audit de sécurité a été programmé pour la semaine prochaine.", 12),
("Retraite de l'entreprise", "Veuillez confirmer votre présence à la retraite de l'entreprise à venir.", 13),
("Retraite de l'entreprise", "Veuillez confirmer votre présence à la retraite de l'entreprise à venir.", 1),
("Révision de la politique", "Nous avons révisé notre politique de ressources humaines.", 2),
("Maintenance du système", "Le système sera en maintenance pendant deux heures demain.", 3),
("Rapport financier", "Le rapport financier du dernier trimestre est maintenant disponible.", 4),
("Mise à jour de sécurité", "Une mise à jour de sécurité importante a été installée sur nos serveurs.", 5),
("Réunion du conseil", "La prochaine réunion du conseil est prévue pour le mois prochain.", 6),
("Résultats de l'enquête", "Les résultats de l'enquête auprès des employés sont maintenant disponibles.", 7),
("Plan de continuité des activités", "Veuillez examiner le plan de continuité des activités mis à jour.", 8),
("Nouveau partenaire", "Nous avons un nouveau partenaire commercial. Plus de détails à suivre.", 9),
("Changement de direction", "Notre directeur général a décidé de démissionner. Un remplaçant sera annoncé prochainement.", 10);
