-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 04, 2024 at 07:26 AM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `book_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
CREATE TABLE IF NOT EXISTS `author` (
  `author_id` int NOT NULL AUTO_INCREMENT,
  `author_name` varchar(255) NOT NULL,
  `biography` varchar(255) NOT NULL,
  `genre` varchar(255) NOT NULL,
  PRIMARY KEY (`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `author`
--

INSERT INTO `author` (`author_id`, `author_name`, `biography`, `genre`) VALUES
(1, 'yagnesh', 'good writer', 'thriller'),
(2, 'dhruval', 'good writer', 'fiction'),
(3, 'nikunj', 'good writer', 'poem'),
(4, 'jayesh', 'writer', 'comic'),
(5, 'J.K. Rowling', 'Joanne Rowling, better known by her pen name J.K. Rowling, is a British author.', 'Fantasy'),
(6, 'Stephen King', 'Stephen Edwin King is an American author of horror, supernatural fiction.', 'Horror'),
(7, 'J.R.R. Tolkien', 'John Ronald Reuel Tolkien was an English writer, poet, philologist.', 'Fantasy'),
(8, 'react', 'react author', 'react'),
(9, 'react', 'react author', 'react'),
(10, 'react', 'react author', 'react'),
(11, 'react', 'react author', 'react');

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
CREATE TABLE IF NOT EXISTS `book` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `published_year` int NOT NULL,
  `quantity_available` int NOT NULL,
  `author_id` int NOT NULL,
  `genre_id` int NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`book_id`, `title`, `description`, `published_year`, `quantity_available`, `author_id`, `genre_id`, `image`) VALUES
(1, 'react', 'savan', 2002, 1, 1, 1, '/public/assets/1712128847203.jpg'),
(2, 'The Catcher in the Rye', 'A novel by J.D. Salinger', 1951, 55, 5, 5, '/public/assets/1712128857353.jpg'),
(4, '1984', 'A dystopian novel by George Orwell', 1949, 40, 2, 2, '/public/assets/1712128662634.jpg'),
(5, 'js', 'javascript', 2003, 10, 1, 4, '/public/assets/1712128886603.jpg'),
(6, 'java', 'java oop', 2003, 5, 5, 4, '/public/assets/1712128903528.jpg'),
(7, 'c++', 'c plus plus', 2003, 6, 2, 4, ''),
(8, 'To the Lighthouse', 'A novel by Virginia Woolf', 1927, 35, 6, 1, ''),
(9, 'Brave New World', 'A dystopian novel by Aldous Huxley', 1932, 25, 8, 3, ''),
(10, 'The Lord of the Rings', 'A fantasy novel by J.R.R. Tolkien', 1954, 70, 7, 4, ''),
(11, 'Crime and Punishment', 'A novel by Fyodor Dostoevsky', 1866, 65, 1, 5, ''),
(12, 'Clean Code', 'A handbook of agile software craftsmanship by Robert C. Martin', 2008, 20, 2, 6, ''),
(13, 'Design Patterns: Elements of Reusable Object-Oriented Software', 'A book on software design patterns by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides', 1994, 25, 3, 6, ''),
(14, 'JavaScript: The Good Parts', 'A book on JavaScript programming by Douglas Crockford', 2008, 30, 4, 6, ''),
(15, 'Effective Java', 'A book on Java programming by Joshua Bloch', 2001, 35, 5, 6, ''),
(16, 'Python Crash Course', 'A hands-on, project-based introduction to programming by Eric Matthes', 2015, 40, 6, 6, ''),
(19, 'yash', 'YASH', 2002, 1, 1, 1, ''),
(20, 'book inlast page', 'book in last page', 2002, 2001, 3, 2, ''),
(23, 'book NOT to be deleted', 'book NOT to be deleted', 2331, 1, 1, 1, ''),
(24, 'del', 'asdas', 2006, 1, 4, 2, '');

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
CREATE TABLE IF NOT EXISTS `genre` (
  `genre_id` int NOT NULL,
  `book_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`genre_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`genre_id`, `book_id`, `name`) VALUES
(1, 0, 'thriller'),
(2, 0, 'fiction'),
(3, 0, 'poem'),
(4, 0, 'comic'),
(5, 0, 'horror'),
(6, 0, 'programming');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobile` int NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `mobile`, `image`) VALUES
(4, 'mail@mail.com', '$2b$10$fV8UcwPexO8HCmXH3eHAyufrtb.0lmRRC/uztJ4ZllPRuE7B5C3Im', 0, ''),
(5, 'savan@mail.com', '$2b$10$2Frz627uk/2z3moEqxJBXu7/OvcrKmsPKuwOxAp.JjXV03eAFilvm', 0, ''),
(6, 'hardik@mail.com', '$2b$10$.bOJFQ.ogU2LHHp20weCQ.rh3xE58YshngkbfPxPE/Ybl1pH7PRjW', 0, ''),
(10, 'test@test.com', '$2b$10$BoosuNLbaNoWi4bt6rqf.uak8KANoUlLDiSPe25gciMYmh7rJ9oVy', 2147483647, 'C:\\fakepath\\pexels-szymon-shields-16456833.jpg');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
