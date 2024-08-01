-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 15, 2024 at 07:09 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myeve`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendee`
--

CREATE TABLE `attendee` (
  `attendeeId` int(11) NOT NULL,
  `eventId` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendee`
--

INSERT INTO `attendee` (`attendeeId`, `eventId`, `Name`, `phone`, `email`) VALUES
(1, 0, 'Lim Jie Liang', '83763748', '23010000@myrp.edu.sg'),
(9, 0, 'alice', '98765424', 'alice@email.com'),
(10, 0, 'Milk Tan', '99883344', 'Milk@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `eventId` int(100) NOT NULL,
  `image` varchar(1000) NOT NULL,
  `name` varchar(200) NOT NULL,
  `details` varchar(1000) NOT NULL,
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `venue` varchar(1000) NOT NULL,
  `price` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`eventId`, `image`, `name`, `details`, `date`, `start_time`, `end_time`, `venue`, `price`) VALUES
(1, 'National_Day.webp', 'National Day Parade 2024', 'NDP is a celebration that is celebrated every year', '2024-08-09', '16:00:00', '22:00:00', 'The Padang', 'Free'),
(5, 'Chingay.jpg', 'chingay', 'The festival will feature local works of art, music and dance performances, and colourful floats that have become an iconic part of the festival', '0000-00-00', '17:52:00', '19:52:00', 'F1 pit', '12'),
(8, 'River-Hongbao.jpg', 'River Hongbao', 'celebrate CNY', '2024-02-12', '08:30:00', '21:30:00', 'F1 pit', 'free');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendee`
--
ALTER TABLE `attendee`
  ADD PRIMARY KEY (`attendeeId`),
  ADD KEY `eventId` (`attendeeId`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`eventId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendee`
--
ALTER TABLE `attendee`
  MODIFY `attendeeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `eventId` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
