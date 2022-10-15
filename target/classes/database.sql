/*
SQLyog Community v13.1.5  (64 bit)
MySQL - 8.0.20 : Database - todo
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`todo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `todo`;

/*Table structure for table `login_details` */

DROP TABLE IF EXISTS `login_details`;

CREATE TABLE `login_details` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email_id` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createDate` datetime NOT NULL,
  `updateDate` datetime NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_id` (`email_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `login_details` */

insert  into `login_details`(`user_id`,`first_name`,`last_name`,`email_id`,`password`,`createDate`,`updateDate`) values 
(2,'Satish','Singh','satish@gmail.com','1234','2022-10-01 11:30:51','2022-10-01 11:30:54'),
(3,'Ram','Singh','Ram@gmail.com','123456','2022-10-01 13:31:45','2022-10-01 13:31:45'),
(4,'ff','dd','ddd!@.com','aaa','2022-10-01 13:32:43','2022-10-01 13:32:43'),
(5,'sdw','aa','dd@gmail.com','aa','2022-10-01 13:33:48','2022-10-01 13:33:48');

/*Table structure for table `notes` */

DROP TABLE IF EXISTS `notes`;

CREATE TABLE `notes` (
  `notesId` int NOT NULL AUTO_INCREMENT,
  `fk_user_id` int DEFAULT NULL,
  `notes` longtext NOT NULL,
  `createDate` datetime NOT NULL,
  `updateDate` datetime NOT NULL,
  `searchDate` date NOT NULL,
  PRIMARY KEY (`notesId`),
  KEY `fk_user_id` (`fk_user_id`),
  CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`fk_user_id`) REFERENCES `login_details` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `notes` */

insert  into `notes`(`notesId`,`fk_user_id`,`notes`,`createDate`,`updateDate`,`searchDate`) values 
(9,2,'aass','2022-09-24 23:50:48','2022-09-24 23:50:48','2022-09-24'),
(10,2,'gtttty','2022-09-24 23:53:46','2022-09-24 23:53:46','2022-09-24'),
(11,2,'6gff','2022-09-24 23:54:18','2022-09-24 23:54:18','2022-09-24'),
(12,2,'hdhdhdh','2022-09-24 23:55:31','2022-09-24 23:55:31','2022-09-24'),
(13,2,'hdhdhdhdddsee','2022-09-25 00:31:40','2022-09-25 00:31:40','2022-09-25'),
(14,2,'nbbb','2022-09-25 12:10:53','2022-09-25 12:10:53','2022-09-25'),
(15,2,'ss;s','2022-09-25 12:19:52','2022-09-25 12:19:52','2022-09-25'),
(16,2,'cxxaqqqq','2022-09-25 16:00:48','2022-09-25 16:00:48','2022-09-25'),
(17,2,'nnjnj','2022-09-26 21:25:07','2022-09-26 21:25:07','2022-09-26'),
(18,2,'sdss','2022-10-01 13:42:35','2022-10-01 13:42:35','2022-10-01');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
