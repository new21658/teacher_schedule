-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.28-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table teacher_schedules.courses
CREATE TABLE IF NOT EXISTS `courses` (
  `course_id` int(11) NOT NULL AUTO_INCREMENT,
  `subject_id` int(11) NOT NULL,
  `study_room_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `term_id` int(11) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `date` datetime NOT NULL,
  `student_group_id` int(11) NOT NULL,
  PRIMARY KEY (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table teacher_schedules.courses: ~0 rows (approximately)
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;

-- Dumping structure for table teacher_schedules.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table teacher_schedules.roles: ~2 rows (approximately)
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`role_id`, `role_name`) VALUES
	(1, 'อาจารย์'),
	(2, 'ผู้ดูแลระบบ');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

-- Dumping structure for table teacher_schedules.student_groups
CREATE TABLE IF NOT EXISTS `student_groups` (
  `student_group_id` int(2) unsigned NOT NULL AUTO_INCREMENT,
  `student_group_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `student_group_count` int(2) NOT NULL,
  `status` enum('A','D') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'A',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`student_group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table teacher_schedules.student_groups: ~5 rows (approximately)
/*!40000 ALTER TABLE `student_groups` DISABLE KEYS */;
INSERT INTO `student_groups` (`student_group_id`, `student_group_name`, `student_group_count`, `status`, `created_at`, `updated_at`) VALUES
	(1, 'ปรค.57-1', 30, 'A', '2018-03-21 14:59:12', '2018-03-22 10:56:28'),
	(2, 'ปรค.57-2', 32, 'A', '2018-03-21 14:59:12', '2018-03-21 14:59:12'),
	(3, 'ปรค.57-3', 29, 'A', '2018-03-21 14:59:12', '2018-03-21 14:59:12'),
	(4, 'ปรจ.57-1', 28, 'A', '2018-03-21 14:59:12', '2018-03-21 14:59:12'),
	(5, 'ปรพ.57-1', 20, 'A', '2018-03-21 14:59:12', '2018-03-21 14:59:12'),
	(6, 'ปจด.21-30', 23, 'A', '2018-03-21 15:00:09', '2018-03-21 15:07:59');
/*!40000 ALTER TABLE `student_groups` ENABLE KEYS */;

-- Dumping structure for table teacher_schedules.study_rooms
CREATE TABLE IF NOT EXISTS `study_rooms` (
  `study_room_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `study_room_code` int(11) NOT NULL,
  `study_room_location` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `study_room_type` enum('ห้องเรียน','ห้องแลป') COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('A','D') COLLATE utf8_unicode_ci DEFAULT 'A',
  PRIMARY KEY (`study_room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table teacher_schedules.study_rooms: ~4 rows (approximately)
/*!40000 ALTER TABLE `study_rooms` DISABLE KEYS */;
INSERT INTO `study_rooms` (`study_room_id`, `study_room_code`, `study_room_location`, `study_room_type`, `created_at`, `updated_at`, `status`) VALUES
	(1, 205, 'ตึก52', 'ห้องเรียน', '2018-03-20 14:19:23', '2018-03-20 14:19:23', 'A'),
	(2, 211, 'ตึก52', 'ห้องเรียน', '2018-03-20 14:19:25', '2018-03-20 14:19:25', 'A'),
	(3, 2222, 'ตึก20', 'ห้องแลป', '2018-03-20 14:19:27', '2018-03-20 14:22:52', 'A'),
	(4, 123, 'สวรรค์', 'ห้องเรียน', '2018-03-28 09:11:29', '2018-03-28 09:11:29', 'A');
/*!40000 ALTER TABLE `study_rooms` ENABLE KEYS */;

-- Dumping structure for table teacher_schedules.subjects
CREATE TABLE IF NOT EXISTS `subjects` (
  `subject_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `subject_code` int(11) NOT NULL,
  `subject_name` varchar(70) COLLATE utf8_unicode_ci NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('A','D') COLLATE utf8_unicode_ci DEFAULT 'A',
  PRIMARY KEY (`subject_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table teacher_schedules.subjects: ~2 rows (approximately)
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` (`subject_id`, `subject_code`, `subject_name`, `updated_at`, `created_at`, `status`) VALUES
	(1, 20003121, 'THAI LANGUAGE FOR TEACHERS', '2018-03-20 22:37:27', '2018-03-18 23:04:55', 'A'),
	(2, 20413110, 'SPECIAL PROJECT', '2018-03-18 23:04:55', '2018-03-18 23:04:55', 'A'),
	(3, 12345678, 'YYYY', '2018-03-20 09:30:18', '2018-03-19 22:34:29', 'A');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;

-- Dumping structure for table teacher_schedules.teachers
CREATE TABLE IF NOT EXISTS `teachers` (
  `teacher_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `teacher_code` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `teacher_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`teacher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table teacher_schedules.teachers: ~8 rows (approximately)
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` (`teacher_id`, `teacher_code`, `teacher_name`, `user_id`, `created_at`, `updated_at`) VALUES
	(1, 'DBM', 'ดวงกมล	โพธิ์นาค', 2, NULL, NULL),
	(2, 'KSK', 'กฤช	สินธนะกุล', NULL, NULL, NULL),
	(8, 'ONK', 'Onisuka', 12, '2018-03-19 15:55:04', '2018-03-19 15:55:04'),
	(11, 'xcv', 'xcv', 16, '2018-03-19 17:51:45', '2018-03-19 17:51:45'),
	(12, 'PVT', 'Puvanart', 17, '2018-03-21 10:53:59', '2018-03-21 10:53:59'),
	(13, 'PVN', 'Puvanart', 18, '2018-03-20 23:25:38', '2018-03-20 23:25:38'),
	(14, 'PPP', 'Puvanart', 19, '2018-03-20 23:35:51', '2018-03-20 23:35:51'),
	(15, 'PPP', 'Puvanart', 20, '2018-03-20 23:39:07', '2018-03-20 23:39:07'),
	(16, 'PVT', 'Puvanart', 21, '2018-03-21 10:52:18', '2018-03-21 10:52:18');
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;

-- Dumping structure for table teacher_schedules.teachers_subjects
CREATE TABLE IF NOT EXISTS `teachers_subjects` (
  `teachers_subjects_id` int(3) NOT NULL AUTO_INCREMENT,
  `teacher_id` int(5) NOT NULL,
  `subject_id` int(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`teachers_subjects_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table teacher_schedules.teachers_subjects: ~0 rows (approximately)
/*!40000 ALTER TABLE `teachers_subjects` DISABLE KEYS */;
/*!40000 ALTER TABLE `teachers_subjects` ENABLE KEYS */;

-- Dumping structure for table teacher_schedules.terms
CREATE TABLE IF NOT EXISTS `terms` (
  `term_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `term_year` date NOT NULL,
  `term` int(11) NOT NULL,
  `register_start` date DEFAULT NULL,
  `register_end` date DEFAULT NULL,
  `status` enum('A','D') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'A',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`term_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table teacher_schedules.terms: ~2 rows (approximately)
/*!40000 ALTER TABLE `terms` DISABLE KEYS */;
INSERT INTO `terms` (`term_id`, `term_year`, `term`, `register_start`, `register_end`, `status`, `created_at`, `updated_at`) VALUES
	(2, '2018-03-20', 1, '2018-03-20', '2018-06-20', 'A', NULL, '2018-03-21 10:34:31'),
	(4, '2018-01-01', 2, '2018-03-10', '2018-03-17', 'A', '2018-03-20 18:33:39', '2018-03-20 18:33:39'),
	(5, '2017-01-01', 2, '2018-03-08', '2018-04-07', 'A', '2018-03-20 18:34:08', '2018-03-21 10:34:32');
/*!40000 ALTER TABLE `terms` ENABLE KEYS */;

-- Dumping structure for table teacher_schedules.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `full_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `role_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `status` enum('A','D') COLLATE utf8_unicode_ci DEFAULT 'A',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table teacher_schedules.users: ~4 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`user_id`, `username`, `password`, `email`, `full_name`, `role_id`, `teacher_id`, `status`, `created_at`, `updated_at`) VALUES
	(12, 'teacher123', '$2a$10$e/Cpvq0TfgQFAMdLvCkTj.sUfUTJLpTtBQhQc4c0.m05W9e22s4zu', 'new_21658777@hotmail.com', 'Onisuka', 1, 0, 'A', '2018-03-19 14:01:45', '2018-03-20 22:37:22'),
	(13, 'root', '$2a$10$ySS.4nVvM41Gw1xFAOyfnO40ANubOZfvfFZrWziOZ2OGVdZxkbrt2', 'new11439@gmail.com', 'Puvanartvv', 2, 0, 'A', '2018-03-19 15:50:52', '2018-03-19 15:55:50'),
	(17, 'new21658', '$2a$10$7tFmkiKmcjG0/wIAXBT5BuoCuxV1iG0sEQKrqugeuT.MIIymrnFA2', 'new11439@gmail.com', 'Puvanart', 1, 12, 'A', '2018-03-19 18:11:14', '2018-03-21 10:58:35'),
	(21, 'user', '$2a$10$3q3Pgbp4UkBL7O/8kpmXM.Y9j8SQa5rlPgnIhIL8vr.zLrjCy8Eb2', 'new11439@gmail.com', 'Puvanart', 1, 16, 'A', '2018-03-20 23:53:07', '2018-03-22 10:58:44');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
