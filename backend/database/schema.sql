-- MySQL dump 10.13  Distrib 8.0.35, for Win64 (x86_64)
--
-- Host: localhost    Database: externatic_db
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `apply_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `job_id` INT NOT NULL,
  `candidate_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `candidate_activity` (`candidate_id`),
  KEY `job_activity` (`job_id`),
  CONSTRAINT `candidate_activity` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`) ON DELETE CASCADE,
  CONSTRAINT `job_activity` FOREIGN KEY (`job_id`) REFERENCES `job` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES 
(1,'2024-01-30 16:07:26',13,1),
(2,'2024-01-30 16:07:26',25,2),
(3,'2024-01-30 16:07:26',30,3),
(4,'2024-01-30 16:07:26',1,4),
(5,'2024-01-30 16:07:26',3,5),
(6,'2024-01-30 16:07:26',29,6),
(7,'2024-01-30 16:07:26',27,7),
(8,'2024-01-30 16:07:26',1,8),
(9,'2024-01-30 16:07:26',25,1),
(10,'2024-01-30 16:07:26',7,2),
(11,'2024-01-30 16:07:26',14,3),
(12,'2024-01-30 16:07:26',28,4),
(13,'2024-01-30 16:07:26',22,5),
(14,'2024-01-30 16:07:26',2,6),
(15,'2024-01-30 16:07:26',1,7),
(16,'2024-01-30 16:07:26',2,8),
(17,'2024-01-30 16:07:26',3,1),
(18,'2024-01-30 16:07:26',4,2),
(19,'2024-01-30 16:07:26',5,3),
(20,'2024-01-30 16:07:26',6,4),
(21,'2024-01-30 16:07:26',7,5),
(22,'2024-01-30 16:07:26',8,6),
(23,'2024-01-30 16:07:26',9,7),
(24,'2024-01-30 16:07:26',10,8),
(25,'2024-01-30 16:07:26',11,1),
(26,'2024-01-30 16:07:26',12,2),
(27,'2024-01-30 16:07:26',13,3),
(28,'2024-01-30 16:07:26',14,4),
(29,'2024-01-30 16:07:26',15,5),
(30,'2024-01-30 16:07:26',16,6),
(31,'2024-01-30 16:07:26',17,7),
(32,'2024-01-30 16:07:26',18,8),
(33,'2024-01-30 16:07:26',19,1),
(34,'2024-01-30 16:07:26',20,2),
(35,'2024-01-30 16:07:26',21,3),
(36,'2024-01-30 16:07:26',22,4),
(37,'2024-01-30 16:07:26',23,5),
(38,'2024-01-30 16:07:26',24,6),
(39,'2024-01-30 16:07:26',25,7),
(40,'2024-01-30 16:07:26',26,8),
(41,'2024-01-30 16:07:26',27,1),
(42,'2024-01-30 16:07:26',28,2),
(43,'2024-01-30 16:07:26',29,3),
(44,'2024-01-30 16:07:26',30,4),
(45,'2024-01-30 16:07:26',31,5),
(46,'2024-01-30 16:07:26',32,6),
(47,'2024-01-30 16:07:26',33,7),
(48,'2024-01-30 16:07:26',34,8),
(49,'2024-01-30 16:07:26',35,1),
(50,'2024-01-30 16:07:26',36,2),
(51,'2024-01-30 16:07:26',37,3),
(52,'2024-01-30 16:07:26',38,4),
(53,'2024-01-30 16:07:26',39,5),
(54,'2024-01-30 16:07:26',40,6);
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidate`
--

DROP TABLE IF EXISTS `candidate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidate` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(80) NOT NULL,
  `lastname` VARCHAR(80) NOT NULL,
  `date_of_birth` date NOT NULL,
  `wanted_salary` INT DEFAULT NULL,
  `city` VARCHAR(255) NOT NULL,
  `country` VARCHAR(255) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `candidate_user` (`user_id`),
  CONSTRAINT `candidate_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate`
--

LOCK TABLES `candidate` WRITE;
/*!40000 ALTER TABLE `candidate` DISABLE KEYS */;
INSERT INTO `candidate` VALUES (1,'Malissia','Cardenas','1994-03-27',90700,'Lille','France',1),(2,'Chen','Mitroshinov','1994-03-23',94998,'Marseille','France',3),(3,'Conny','Ledwidge','1988-03-16',154241,'Nantes','France',4),(4,'Merle','Evamy','1998-11-03',61372,'Bordeaux','France',5),(5,'Kattie','Treppas','2000-08-02',114084,'Paris','France',9),(6,'Frederico','Peyro','1993-11-10',172207,'Nice','France',11),(7,'Lefty','Westmore','1996-07-25',61985,'Montpellier','France',12),(8,'Puff','Dablin','1991-09-21',170898,'Lyon','France',13);
/*!40000 ALTER TABLE `candidate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidate_degree`
--

DROP TABLE IF EXISTS `candidate_degree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidate_degree` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `candidate_id` INT NOT NULL,
  `degree_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `candidate_degree` (`candidate_id`),
  KEY `degree_candidate` (`degree_id`),
  CONSTRAINT `candidate_degree` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`) ON DELETE CASCADE,
  CONSTRAINT `degree_candidate` FOREIGN KEY (`degree_id`) REFERENCES `degree` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_degree`
--

LOCK TABLES `candidate_degree` WRITE;
/*!40000 ALTER TABLE `candidate_degree` DISABLE KEYS */;
INSERT INTO `candidate_degree` VALUES (1,7,5),(2,5,12),(3,2,5),(4,8,7),(5,7,8),(6,4,10),(7,5,1),(8,3,9),(9,1,3),(10,4,1),(11,3,3),(12,6,11),(13,5,4),(14,1,8),(15,4,2);
/*!40000 ALTER TABLE `candidate_degree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `website` VARCHAR(255) NOT NULL,
  `establishment_date` DATE NOT NULL,
  `siret` BIGINT NOT NULL,
  `company_sector_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `siret` (`siret`),
  KEY `company_sector` (`company_sector_id`),
  KEY `company_user` (`user_id`),
  CONSTRAINT `company_sector` FOREIGN KEY (`company_sector_id`) REFERENCES `company_sector` (`id`) ON DELETE CASCADE,
  CONSTRAINT `company_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'Technicity','https://www.logogenie.fr/download/preview/engine/13203026','Nous développons des solutions numériques pour nos clients sur tous types de projets et supports. Du développement web à l\'infrastructure réseaux, nous gérons tous les pôles menant à votre réussite. Fort d\'une expérience de 15 ans dans le numérique, nous vous accompagnerons dans votre carrière.','https://puginarug.com/','2005-02-10',12345678985472,1,6),(2,'Computers & Co','https://www.logogenie.fr/download/preview/engine/13202670','Nous développons des solutions numériques pour nos clients sur tous types de projets et supports. Du développement web à l\'infrastructure réseaux, nous gérons tous les pôles menant à votre réussite. Fort d\'une expérience de 15 ans dans le numérique, nous vous accompagnerons dans votre carrière.','https://puginarug.com/','2005-02-10',12345438985472,2,7),(3,'TotoDev S.A.','https://www.logogenie.fr/download/preview/engine/13202679','Nous développons des solutions numériques pour nos clients sur tous types de projets et supports. Du développement web à l\'infrastructure réseaux, nous gérons tous les pôles menant à votre réussite. Fort d\'une expérience de 15 ans dans le numérique, nous vous accompagnerons dans votre carrière.','https://puginarug.com/','2005-02-10',12345678195472,3,8),(4,'Amazing-Computing ','https://www.logogenie.fr/download/preview/engine/13202685','Nous développons des solutions numériques pour nos clients sur tous types de projets et supports. Du développement web à l\'infrastructure réseaux, nous gérons tous les pôles menant à votre réussite. Fort d\'une expérience de 15 ans dans le numérique, nous vous accompagnerons dans votre carrière.','https://puginarug.com/','2005-02-10',12379678985472,4,2),(5,'RollingDev','https://www.logogenie.fr/download/preview/engine/13202692','Nous développons des solutions numériques pour nos clients sur tous types de projets et supports. Du développement web à l\'infrastructure réseaux, nous gérons tous les pôles menant à votre réussite. Fort d\'une expérience de 15 ans dans le numérique, nous vous accompagnerons dans votre carrière.','https://puginarug.com/','2005-02-10',12345678985132,5,10);
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_sector`
--

DROP TABLE IF EXISTS `company_sector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_sector` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sector` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_sector`
--

LOCK TABLES `company_sector` WRITE;
/*!40000 ALTER TABLE `company_sector` DISABLE KEYS */;
INSERT INTO `company_sector` VALUES (1,'Technologie de l\'Information'),(2,'Santé'),(3,'Énergie'),(4,'Finance '),(5,'Automobile'),(6,'Alimentation et Boissons '),(7,'Aérospatiale et Défense'),(8,'Biotechnologie'),(9,'Industrie manufacturière'),(10,'Télécommunications');
/*!40000 ALTER TABLE `company_sector` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `degree`
--

DROP TABLE IF EXISTS `degree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `degree` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  `level` VARCHAR(80) NOT NULL,
  `starting_date` DATE NOT NULL,
  `completion_date` DATE DEFAULT NULL,
  `university` VARCHAR(80) DEFAULT NULL,
  `city` VARCHAR(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `degree`
--

LOCK TABLES `degree` WRITE;
/*!40000 ALTER TABLE `degree` DISABLE KEYS */;
INSERT INTO `degree` VALUES (1,'Licence en Génie Électrique et Informatique','Bac+3','2001-01-12','2004-06-08','Université de Paris','Paris'),(2,'Doctorat en Cybersécurité','Bac+8','2000-06-06','2008-06-11','Université Lyon 1 Claude Bernard','Lyon'),(3,'Master en Réalité Virtuelle','Bac+5','2003-07-05','2008-11-28','Université de Lille','Lille'),(4,'Licence en Gestion des Systèmes d\'Information','Bac+3','1999-06-21','2002-06-16','Sorbonne Université','Paris'),(5,'Doctorat en Intelligence Artificielle','Bac+8','2005-04-10','2013-02-26','Université Grenoble Alpes','Strasbourg'),(6,'Doctorat en Science des Données','Bac+8','2000-07-19','0208-03-25','Université de Strasbourg ','Carlton'),(7,'Master en Ingénierie Logicielle','Bac+5','2015-06-08','2020-10-23','Université Paris-Sud','Orsay'),(8,'Licence en Informatique','Bac+3','2004-12-10','2007-04-16','Aix-Marseille Université','Marseille'),(9,'Master en Développement Web','Bac+5','2012-04-19','2017-03-17','Université de Bordeaux','Bordeaux'),(10,'Licence en Réseaux et Sécurité','Bac+3','2003-03-15','2006-12-04','Université Pierre et Marie Curie (UPMC)','Paris'),(11,'Master en Robotique Avancée','Bac+5','2008-07-17','2013-12-04','Université Toulouse 1 Capitole','Toulouse'),(12,'Doctorat en Ingénierie des Logiciels Embarqués','Bac+8','2001-01-22','2009-09-04','Université Nice Sophia Antipolis','Nice');
/*!40000 ALTER TABLE `degree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experience`
--

DROP TABLE IF EXISTS `experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experience` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `start_date` DATE NOT NULL,
  `end_date` DATE DEFAULT NULL,
  `job_title` VARCHAR(50) NOT NULL,
  `company_name` VARCHAR(100) DEFAULT NULL,
  `city` VARCHAR(50) DEFAULT NULL,
  `country` VARCHAR(50) DEFAULT NULL,
  `description` TEXT NOT NULL,
  `candidate_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `candidate_experience` (`candidate_id`),
  CONSTRAINT `candidate_experience` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experience`
--

LOCK TABLES `experience` WRITE;
/*!40000 ALTER TABLE `experience` DISABLE KEYS */;
INSERT INTO `experience` VALUES (1,'2015-01-02','2023-12-31','Développeur Web & Web Mobile','Amazon','Paris','France','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras semper auctor neque vitae tempus quam pellentesque nec. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.',1),(2,'2015-01-02','2023-12-31','Développeur Web & Web Mobile','Google','Paris','France','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras semper auctor neque vitae tempus quam pellentesque nec. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.',2),(3,'2015-01-02','2023-12-31','Développeur Web & Web Mobile','Facebook','Paris','France','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras semper auctor neque vitae tempus quam pellentesque nec. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.',3),(4,'2015-01-02','2023-12-31','Développeur Web & Web Mobile','Youtube','Paris','France','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras semper auctor neque vitae tempus quam pellentesque nec. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.',4),(5,'2015-01-02','2023-12-31','Développeur Web & Web Mobile','Twitter','Paris','France','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras semper auctor neque vitae tempus quam pellentesque nec. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.',5),(6,'2024-01-02','2023-12-31','Développeur Web & Web Mobile','Samsung','Paris','France','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras semper auctor neque vitae tempus quam pellentesque nec. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.',7);
/*!40000 ALTER TABLE `experience` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job`
--

DROP TABLE IF EXISTS `job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `type` VARCHAR(30) NOT NULL,
  `description` TEXT NOT NULL,
  `hours_worked` INT NOT NULL,
  `created_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` TINYINT(1) NOT NULL,
  `salary` INT NOT NULL,
  `place` VARCHAR(10) NOT NULL,
  `sector` VARCHAR(100) NOT NULL,
  `location_id` INT NOT NULL,
  `company_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `job_location` (`location_id`),
  KEY `job_post_company` (`company_id`),
  CONSTRAINT `job_location` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`) ON DELETE CASCADE,
  CONSTRAINT `job_post_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job`
--

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;
INSERT INTO `job` VALUES (1,'Développeur Web Senior','Contrat à durée déterminée','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras semper auctor neque vitae tempus quam pellentesque nec. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.',35,'2024-01-30 16:07:26',1,100000,'Hybride','Développement',1,1),(2,'Développeur Web Mobile','Contrat à durée indéterminée','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras semper auctor neque vitae tempus quam pellentesque nec. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.',35,'2024-01-30 16:07:26',1,60000,'Hybride','Développement',2,2),(3,'Data Analyste','Stage','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras semper auctor neque vitae tempus quam pellentesque nec. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.',24,'2024-01-30 16:07:26',1,45000,'Sur site','Data',3,3),(4,'Testeur','Alternance','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras semper auctor neque vitae tempus quam pellentesque nec. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.',30,'2024-01-30 16:07:26',1,80000,'A distance','Cloud',4,4),(5,'DevOps','Contrat à durée déterminée','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras semper auctor neque vitae tempus quam pellentesque nec. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.',35,'2024-01-30 16:07:26',1,50000,'Hybride','Cloud Azure',5,5),(6,'Développeur Full Stack','Contrat à durée indéterminée','Lorem ipsum dolor sit amet, consectetur adipiscing elit...',35,'2024-01-30 16:07:26',1,55000,'Hybride','Technologie de l\'Information',1,1),(7,'Data Scientist','Contrat à durée indéterminée','Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',35,'2024-01-30 16:07:26',1,70000,'À distance','Santé',2,2),(8,'Ingénieur DevOps','Contrat à durée indéterminée','Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...',35,'2024-01-30 16:07:26',1,65000,'Sur site','Énergie',3,3),(9,'Analyste d\'affaires','Contrat à durée indéterminée','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore...',35,'2024-01-30 16:07:26',1,60000,'Hybride','Finance ',4,4),(10,'Chef de projet IT','Contrat à durée indéterminée','Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia...',35,'2024-01-30 16:07:26',1,75000,'À distance','Automobile',5,5),(11,'Architecte logiciel','Contrat à durée indéterminée','Deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus...',35,'2024-01-30 16:07:26',1,80000,'Sur site','Alimentation et Boissons ',1,1),(12,'Administrateur système','Contrat à durée indéterminée','Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit...',35,'2024-01-30 16:07:26',1,55000,'Hybride','Aérospatiale et Défense',2,2),(13,'Ingénieur sécurité','Contrat à durée indéterminée','Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt...',35,'2024-01-30 16:07:26',1,70000,'À distance','Biotechnologie',3,3),(14,'Testeur logiciel','Contrat à durée indéterminée','Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet...',35,'2024-01-30 16:07:26',1,50000,'Sur site','Industrie manufacturière',4,4),(15,'Ingénieur réseau','Contrat à durée indéterminée','Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt...',35,'2024-01-30 16:07:26',1,60000,'Hybride','Télécommunications',5,5),(16,'Spécialiste en sécurité','Contrat à durée indéterminée','Lorem ipsum dolor sit amet, consectetur adipiscing elit...',35,'2024-01-30 16:07:26',1,65000,'Hybride','Technologie de l\'Information',1,1),(17,'Ingénieur en logiciel embarqué','Contrat à durée indéterminée','Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',35,'2024-01-30 16:07:26',1,70000,'À distance','Santé',2,2),(18,'Gestionnaire de projet IT','Contrat à durée indéterminée','Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...',35,'2024-01-30 16:07:26',1,75000,'Sur site','Énergie',3,3),(19,'Analyste de données','Contrat à durée indéterminée','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore...',35,'2024-01-30 16:07:26',1,60000,'Hybride','Finance',4,4),(20,'Ingénieur en test logiciel','Contrat à durée indéterminée','Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia...',35,'2024-01-30 16:07:26',1,55000,'À distance','Automobile',5,5),(21,'Architecte de solutions','Contrat à durée indéterminée','Deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus...',35,'2024-01-30 16:07:26',1,80000,'Sur site','Alimentation et Boissons ',1,1),(22,'Administrateur de base de données','Contrat à durée indéterminée','Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit...',35,'2024-01-30 16:07:26',1,55000,'Hybride','Aérospatiale et Défense',2,2),(23,'Ingénieur en assurance qualité','Contrat à durée indéterminée','Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt...',35,'2024-01-30 16:07:26',1,60000,'À distance','Biotechnologie',3,3),(24,'Développeur Backend','Contrat à durée indéterminée','Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet...',35,'2024-01-30 16:07:26',1,65000,'Sur site','Industrie manufacturière',4,4),(25,'Développeur Frontend','Contrat à durée indéterminée','Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt...',35,'2024-01-30 16:07:26',1,60000,'Hybride','Télécommunications',5,5),(26,'Développeur Backend','Contrat à durée indéterminée','Lorem ipsum dolor sit amet, consectetur adipiscing elit...',35,'2024-01-30 16:07:26',1,65000,'À distance','Technologie de l\'Information',1,2),(27,'Ingénieur en logiciel embarqué','Contrat à durée indéterminée','Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',35,'2024-01-30 16:07:26',1,70000,'Sur site','Santé',2,3),(28,'Gestionnaire de projet IT','Contrat à durée indéterminée','Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...',35,'2024-01-30 16:07:26',1,75000,'Hybride','Énergie',3,4),(29,'Analyste de données','Contrat à durée indéterminée','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore...',35,'2024-01-30 16:07:26',1,60000,'À distance','Finance ',4,5),(30,'Ingénieur en test logiciel','Contrat à durée indéterminée','Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia...',35,'2024-01-30 16:07:26',1,55000,'Sur site','Automobile',5,1),(31,'Architecte de solutions','Contrat à durée indéterminée','Deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus...',35,'2024-01-30 16:07:26',1,80000,'Hybride','Alimentation et Boissons ',1,3),(32,'Administrateur de base de données','Contrat à durée indéterminée','Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit...',35,'2024-01-30 16:07:26',1,55000,'À distance','Aérospatiale et Défense',2,4),(33,'Ingénieur en assurance qualité','Contrat à durée indéterminée','Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt...',35,'2024-01-30 16:07:26',1,60000,'Sur site','Biotechnologie',3,5),(34,'Développeur Mobile','Contrat à durée indéterminée','Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet...',35,'2024-01-30 16:07:26',1,65000,'Hybride','Industrie manufacturière',4,1),(35,'Ingénieur réseau','Contrat à durée indéterminée','Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt...',35,'2024-01-30 16:07:26',1,60000,'À distance','Télécommunications',5,2),(36,'Spécialiste en sécurité','Contrat à durée indéterminée','Lorem ipsum dolor sit amet, consectetur adipiscing elit...',35,'2024-01-30 16:07:26',1,65000,'Sur site','Technologie de l\'Information',1,3),(37,'Ingénieur en logiciel embarqué','Contrat à durée indéterminée','Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',35,'2024-01-30 16:07:26',1,70000,'Hybride','Santé',2,4),(38,'Gestionnaire de projet IT','Contrat à durée indéterminée','Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...',35,'2024-01-30 16:07:26',1,75000,'À distance','Énergie',3,5),(39,'Analyste de données','Contrat à durée indéterminée','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore...',35,'2024-01-30 16:07:26',1,60000,'Sur site','Finance ',4,1),(40,'Ingénieur en test logiciel','Contrat à durée indéterminée','Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia...',35,'2024-01-30 16:07:26',1,55000,'Hybride','Automobile',5,2);
/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `additional_adress` VARCHAR(100) DEFAULT NULL,
  `number_adress` INT DEFAULT NULL,
  `number_attribute` VARCHAR(10) DEFAULT NULL,
  `address` VARCHAR(100) NOT NULL,
  `city` VARCHAR(50) NOT NULL,
  `state` VARCHAR(50) NOT NULL,
  `country` VARCHAR(50) NOT NULL,
  `zip` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Résidence',25,'bis','Rue de la paix','Nantes','Pays de la Loire','France','44000'),(2,'',1,'','Rue de l\'écorce écarlate','Paris','Ile-de-France','France','75016'),(3,'',107,'','Place Napoléon Bonaparte','Dreux','Centre-Val de Loire','France','28100'),(4,'',8,'ter','Avenue du Général Leclerc','Lyon','Auvergne-Rhône-Alpes','France','69000'),(5,'Bâtiment',10,'D','Rue de la palme d\'or','Lille','Hauts-de-France','France','59000');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `subject` VARCHAR(255) NOT NULL,
  `text` TEXT NOT NULL,
  `recieved_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `message_user` (`user_id`),
  CONSTRAINT `message_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,'Mise à jour du projet','Le projet est sur la bonne voie et nous respectons nos jalons.','2024-01-30 16:07:26',1),(2,'Compte-rendu de réunion','Ci-joint le compte-rendu de notre dernière réunion.','2024-01-30 16:07:26',2),(3,'Examen du budget','Nous devons examiner le budget pour le prochain trimestre.','2024-01-30 16:07:26',3),(4,'Nouvelle embauche','Veuillez accueillir notre nouveau membre de l\'équipe, John Doe.','2024-01-30 16:07:26',4),(5,'Mise à jour du logiciel','Une nouvelle version du logiciel est disponible.','2024-01-30 16:07:26',5),(6,'Rapport de ventes','Les ventes ont augmenté de 10% ce mois-ci.','2024-01-30 16:07:26',6),(7,'Stratégie marketing','Discutons de notre stratégie marketing pour le prochain trimestre.','2024-01-30 16:07:26',7),(8,'Retour des clients','Nous avons reçu des commentaires de nos clients.','2024-01-30 16:07:26',8),(9,'Lancement de produit','Notre nouveau produit sera lancé le mois prochain.','2024-01-30 16:07:26',9),(10,'Réunion d\'équipe','Notre prochaine réunion d\'équipe est prévue pour lundi.','2024-01-30 16:07:26',10),(11,'Calendrier des vacances','Veuillez trouver le calendrier des vacances en pièce jointe.','2024-01-30 16:07:26',11),(12,'Évaluation de performance','Il est temps pour nos évaluations de performance annuelles.','2024-01-30 16:07:26',12),(13,'Session de formation','Une nouvelle session de formation a été programmée.','2024-01-30 16:07:26',13),(14,'Bilan de fin d\'année','Examinons nos réalisations pour l\'année.','2024-01-30 16:07:26',1),(15,'Mise à jour de la politique','Nous avons mis à jour notre politique de confidentialité.','2024-01-30 16:07:26',2),(16,'Bug du logiciel','Nous avons identifié un bug dans le logiciel.','2024-01-30 16:07:26',3),(17,'Participation à la conférence','Veuillez confirmer votre participation à la conférence à venir.','2024-01-30 16:07:26',4),(18,'Arrêt du système','Le système sera en maintenance ce soir.','2024-01-30 16:07:26',5),(19,'Nouvelle fonctionnalité','Une nouvelle fonctionnalité a été ajoutée au logiciel.','2024-01-30 16:07:26',6),(20,'Réunion client','Une réunion avec le client a été programmée pour la semaine prochaine.','2024-01-30 16:07:26',7),(21,'Approbation de la facture','Veuillez approuver la facture jointe.','2024-01-30 16:07:26',8),(22,'Renouvellement du contrat','Notre contrat avec le client est à renouveler.','2024-01-30 16:07:26',9),(23,'Enquête auprès des employés','Veuillez remplir l\'enquête de satisfaction des employés jointe.','2024-01-30 16:07:26',10),(24,'Santé et sécurité','Veuillez consulter les directives de santé et de sécurité mises à jour.','2024-01-30 16:07:26',11),(25,'Déménagement du bureau','Notre bureau déménagera dans un nouveau lieu le mois prochain.','2024-01-30 16:07:26',12),(26,'Violation de données','Nous avons détecté une éventuelle violation de données.','2024-01-30 16:07:26',13),(27,'Mise à niveau du serveur','Le serveur sera mis à niveau ce week-end.','2024-01-30 16:07:26',1),(28,'Réinitialisation du mot de passe','Votre mot de passe a été réinitialisé. Veuillez en créer un nouveau.','2024-01-30 16:07:26',2),(29,'Rapport annuel','Le rapport annuel est maintenant disponible pour examen.','2024-01-30 16:07:26',3),(30,'Formation logicielle','Une session de formation logicielle a été programmée.','2024-01-30 16:07:26',4),(31,'Politique de vacances','Veuillez consulter la politique de vacances mise à jour.','2024-01-30 16:07:26',5),(32,'Date limite du projet','La date limite du projet a été avancée.','2024-01-30 16:07:26',6),(33,'Promotion d\'un employé','Félicitations pour votre promotion !','2024-01-30 16:07:26',7),(34,'Retour du client','Le client a donné son avis sur notre proposition.','2024-01-30 16:07:26',8),(35,'Coupes budgétaires','En raison de coupes budgétaires, nous devrons reporter certains projets.','2024-01-30 16:07:26',9),(36,'Fusion d\'entreprises','Notre entreprise va fusionner avec une autre entreprise.','2024-01-30 16:07:26',10),(37,'Licence logicielle','Notre licence logicielle expirera le mois prochain.','2024-01-30 16:07:26',11),(38,'Audit de sécurité','Un audit de sécurité a été programmé pour la semaine prochaine.','2024-01-30 16:07:26',12),(39,'Retraite de l\'entreprise','Veuillez confirmer votre présence à la retraite de l\'entreprise à venir.','2024-01-30 16:07:26',13),(40,'Retraite de l\'entreprise','Veuillez confirmer votre présence à la retraite de l\'entreprise à venir.','2024-01-30 16:07:26',1),(41,'Révision de la politique','Nous avons révisé notre politique de ressources humaines.','2024-01-30 16:07:26',2),(42,'Maintenance du système','Le système sera en maintenance pendant deux heures demain.','2024-01-30 16:07:26',3),(43,'Rapport financier','Le rapport financier du dernier trimestre est maintenant disponible.','2024-01-30 16:07:26',4),(44,'Mise à jour de sécurité','Une mise à jour de sécurité importante a été installée sur nos serveurs.','2024-01-30 16:07:26',5),(45,'Réunion du conseil','La prochaine réunion du conseil est prévue pour le mois prochain.','2024-01-30 16:07:26',6),(46,'Résultats de l\'enquête','Les résultats de l\'enquête auprès des employés sont maintenant disponibles.','2024-01-30 16:07:26',7),(47,'Plan de continuité des activités','Veuillez examiner le plan de continuité des activités mis à jour.','2024-01-30 16:07:26',8),(48,'Nouveau partenaire','Nous avons un nouveau partenaire commercial. Plus de détails à suivre.','2024-01-30 16:07:26',9),(49,'Changement de direction','Notre directeur général a décidé de démissionner. Un remplaçant sera annoncé prochainement.','2024-01-30 16:07:26',10);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `level` VARCHAR(50) NOT NULL,
  `candidate_id` INT NOT NULL,
  `job_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `skill_candidate` (`candidate_id`),
  KEY `skill_job` (`job_id`),
  CONSTRAINT `skill_candidate` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`) ON DELETE CASCADE,
  CONSTRAINT `skill_job` FOREIGN KEY (`job_id`) REFERENCES `job` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill`
--

LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
INSERT INTO `skill` VALUES (1,'HTML','Expert',12,1),(2,'CSS','Expert',11,2),(3,'JavaScript','Courant',3,3),(4,'Rust','Avancé',4,4),(5,'C++','Avancé',5,5),(6,'C#','Avancé',1,6);
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `is_active` TINYINT(1) NOT NULL,
  `contact_number` VARCHAR(20) NOT NULL,
  `sms_notification_active` TINYINT(1) NOT NULL,
  `email_notification_active` TINYINT(1) NOT NULL,
  `image` VARCHAR(255) DEFAULT NULL,
  `registration_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_type_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `user_type` (`user_type_id`),
  CONSTRAINT `user_type` FOREIGN KEY (`user_type_id`) REFERENCES `user_type` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Malissiarde@gmail.com','$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg',1,'0612345678',1,1,'https://images.media.io/pixpic-styles/IDphotowomen.png?task_id=1221506','2024-01-30 16:07:26',1),(2,'AmazingComputing@contact.com','$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg',1,'0612345678',1,1,'https://www.logogenie.fr/download/preview/engine/13202685','2024-01-30 16:07:26',2),(3,'ChenMitroshinov@gmail.com','$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg',1,'0612345678',1,1,'https://images.media.io/pixpic-styles/male_id_photo.png?task_id=1225012','2024-01-30 16:07:26',1),(4,'ConnyLedwidge@gmail.com','$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg',1,'0612345678',1,1,'https://images.media.io/pixpic-web/styles/20231107/male_LinkedIn.png','2024-01-30 16:07:26',1),(5,'MerleEvamy@gmail.com','$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg',1,'0612345678',1,1,'https://images.media.io/pixpic-styles/ProfilePicture.png?task_id=1221501','2024-01-30 16:07:26',1),(6,'Technicity@contact.com','$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg',1,'0612345678',1,1,'https://www.logogenie.fr/download/preview/engine/13203026','2024-01-30 16:07:26',2),(7,'ComputersCo@contact.com','$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg',1,'0612345678',1,1,'https://www.logogenie.fr/download/preview/engine/13202670','2024-01-30 16:07:26',2),(8,'TotoDev@contact.com','$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg',1,'0612345678',1,1,'https://www.logogenie.fr/download/preview/engine/13202679','2024-01-30 16:07:26',2),(9,'KattieTreppas@gmail.com','$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg',1,'0612345678',1,1,'https://images.media.io/pixpic-web/styles/20231107/female_Badge_Photo.png','2024-01-30 16:07:26',1),(10,'RollingDev@contact.com','$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg',1,'0612345678',1,1,'https://www.logogenie.fr/download/preview/engine/13202692','2024-01-30 16:07:26',2),(11,'FredericoPeyro@gmail.com','$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg',1,'0612345678',1,1,'https://images.media.io/pixpic-web/styles/20231107/male_Badge_Photo.png','2024-01-30 16:07:26',1),(12,'LeftyWestmore@gmail.com','$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg',1,'0612345678',1,1,'https://images.media.io/pixpic-styles/Graduationweb2.png?task_id=1221465','2024-01-30 16:07:26',1),(13,'PuffDablin@gmail.com','$argon2i$v=19$m=19,t=2,p=1$NUR2VkxTZ3ZoYjNGOWJ4Vw$arD06u+FgWuhKg',1,'0612345678',1,1,'https://images.media.io/pixpic-styles/profilepictureman.png?task_id=1221524','2024-01-30 16:07:26',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_type`
--

DROP TABLE IF EXISTS `user_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_type`
--

LOCK TABLES `user_type` WRITE;
/*!40000 ALTER TABLE `user_type` DISABLE KEYS */;
INSERT INTO `user_type` VALUES (1,'candidat'),(2,'entreprise'),(3,'administrateur');
/*!40000 ALTER TABLE `user_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'externatic_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-30 17:57:27
