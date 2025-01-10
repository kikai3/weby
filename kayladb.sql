-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2024 at 12:12 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kayladb`
--

-- --------------------------------------------------------

--
-- Table structure for table `finished_tasks`
--

CREATE TABLE `finished_tasks` (
  `finishedTaskID` int(255) NOT NULL,
  `finishedTaskName` varchar(255) NOT NULL,
  `finishedTaskDescription` text NOT NULL,
  `finishedTaskCreatedTime` datetime NOT NULL,
  `finishedTaskMarkedDone` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `finished_tasks`
--

INSERT INTO `finished_tasks` (`finishedTaskID`, `finishedTaskName`, `finishedTaskDescription`, `finishedTaskCreatedTime`, `finishedTaskMarkedDone`) VALUES
(5, 'qwerty', 'qwerty', '2024-11-02 02:34:00', '2024-11-02 10:34:17'),
(6, 'DevvTask', 'sdfsddfsf', '2024-10-31 10:59:00', '2024-11-02 23:58:59');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `taskID` int(255) NOT NULL,
  `taskName` varchar(255) NOT NULL,
  `taskDescription` text NOT NULL,
  `taskCreatedTime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`taskID`, `taskName`, `taskDescription`, `taskCreatedTime`) VALUES
(12, 'erfrefref', 'ferfrefref', '2024-11-02 23:59:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `finished_tasks`
--
ALTER TABLE `finished_tasks`
  ADD PRIMARY KEY (`finishedTaskID`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`taskID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `finished_tasks`
--
ALTER TABLE `finished_tasks`
  MODIFY `finishedTaskID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `taskID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
