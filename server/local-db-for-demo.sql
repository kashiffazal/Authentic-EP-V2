-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2022 at 01:17 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `authentic_ep`
--

-- --------------------------------------------------------

--
-- Table structure for table `ep_client_form`
--

CREATE TABLE `ep_client_form` (
  `id` int(11) NOT NULL,
  `draft_code` text DEFAULT NULL,
  `first_name` text DEFAULT NULL,
  `last_name` text DEFAULT NULL,
  `dateOfBirth` text DEFAULT NULL,
  `bornCountry` text DEFAULT NULL,
  `gender` text DEFAULT NULL,
  `prefered_lang` text DEFAULT NULL,
  `interpreterReq` text DEFAULT NULL,
  `ndisNumber` text DEFAULT NULL,
  `street_address` text DEFAULT NULL,
  `suburb` text DEFAULT NULL,
  `state` text DEFAULT NULL,
  `postCode` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `contactNumber` text DEFAULT NULL,
  `ndisPlanDate` text DEFAULT NULL,
  `ndisEndDate` text DEFAULT NULL,
  `planMangName` text DEFAULT NULL,
  `planMangNumber` text DEFAULT NULL,
  `planMangEmail` text DEFAULT NULL,
  `emConPersonName` text DEFAULT NULL,
  `relationToParti` text DEFAULT NULL,
  `emContPersonNumber` text DEFAULT NULL,
  `livingArrang` text DEFAULT NULL,
  `livingArrangOther` text DEFAULT NULL,
  `guardianName` text DEFAULT NULL,
  `guardianDOB` text DEFAULT NULL,
  `guardianHomePhone` text DEFAULT NULL,
  `guardianMobNumber` text DEFAULT NULL,
  `guardianWorkPhone` text DEFAULT NULL,
  `guardianEmail` text DEFAULT NULL,
  `guardianAddress` text DEFAULT NULL,
  `guardianSubrub` text DEFAULT NULL,
  `guardianState` text DEFAULT NULL,
  `guardianPostcode` text DEFAULT NULL,
  `makeRefName` text DEFAULT NULL,
  `makeRefOrg` text DEFAULT NULL,
  `makeRefPosition` text DEFAULT NULL,
  `makeRefEmail` text DEFAULT NULL,
  `makeRefAddress` text DEFAULT NULL,
  `makeRefSubrub` text DEFAULT NULL,
  `makeRefState` text DEFAULT NULL,
  `makeRefPostCode` text DEFAULT NULL,
  `makeRefPhone` text DEFAULT NULL,
  `primaryDiagnos` text DEFAULT NULL,
  `secondaryDiagnos` text DEFAULT NULL,
  `services_json` text DEFAULT NULL,
  `services_ref_ids` text DEFAULT NULL,
  `services_desc` text DEFAULT NULL,
  `anyRisk` text DEFAULT NULL,
  `anyRiskSpecify` text DEFAULT NULL,
  `harmFromOther` text DEFAULT NULL,
  `harmFromOtherSpecify` text DEFAULT NULL,
  `harmToOther` text DEFAULT NULL,
  `harmToOtherSpecify` text DEFAULT NULL,
  `anyPet` text DEFAULT NULL,
  `anyPetSpecify` text DEFAULT NULL,
  `anyFireamers` text DEFAULT NULL,
  `anyFireamersSpecify` text DEFAULT NULL,
  `anyDrugHistory` text DEFAULT NULL,
  `anyDrugHistorySpecify` text DEFAULT NULL,
  `anyRishToKnow` text DEFAULT NULL,
  `anyRishToKnowSpecify` text DEFAULT NULL,
  `dateOfRef` text DEFAULT NULL,
  `hearing` text DEFAULT NULL,
  `hearingSpecify` text DEFAULT NULL,
  `speech` text DEFAULT NULL,
  `speechSpecify` text DEFAULT NULL,
  `ableToWrite` text DEFAULT NULL,
  `ableToWriteSpecify` text DEFAULT NULL,
  `englishSkill` text DEFAULT NULL,
  `englishSkillSpecify` text DEFAULT NULL,
  `willingToParticipate` text DEFAULT NULL,
  `willingToParticipateSpecity` text DEFAULT NULL,
  `orientation` text DEFAULT NULL,
  `orientationSpecify` text DEFAULT NULL,
  `acceptDiraction` text DEFAULT NULL,
  `acceptDiractionSpecific` text DEFAULT NULL,
  `shortMemory` text DEFAULT NULL,
  `shortMemorySpecify` text DEFAULT NULL,
  `walkUnaided` text DEFAULT NULL,
  `walkUnaidedSpecify` text DEFAULT NULL,
  `managesStairs` text DEFAULT NULL,
  `managesStairsSpecify` text DEFAULT NULL,
  `usesWalkingAid` text DEFAULT NULL,
  `usesWalkingAidSpecify` text DEFAULT NULL,
  `wheelshair` text DEFAULT NULL,
  `wheelshairSpecify` text DEFAULT NULL,
  `usesElecWheelChair` text DEFAULT NULL,
  `usesElecWheelChairSpecify` text DEFAULT NULL,
  `transferIndep` text DEFAULT NULL,
  `transferIndepSpecify` text DEFAULT NULL,
  `transferWithSuper` text DEFAULT NULL,
  `transferWithSuperSpecify` text DEFAULT NULL,
  `transferWithHoist` text DEFAULT NULL,
  `transferWithHoistSpecify` text DEFAULT NULL,
  `bedMobility` text DEFAULT NULL,
  `bedMobilitySpecify` text DEFAULT NULL,
  `showering` text DEFAULT NULL,
  `showeringSpecify` text DEFAULT NULL,
  `toileting` text DEFAULT NULL,
  `toiletingSpecify` text DEFAULT NULL,
  `grooming` text DEFAULT NULL,
  `groomingSpecify` text DEFAULT NULL,
  `repoInBed` text DEFAULT NULL,
  `repoInBedSpecify` text DEFAULT NULL,
  `repoInChair` text DEFAULT NULL,
  `repoInChairSpecify` text DEFAULT NULL,
  `mouthCare` text DEFAULT NULL,
  `mouthCareSpecify` text DEFAULT NULL,
  `eating` text DEFAULT NULL,
  `eatingSpecify` text DEFAULT NULL,
  `skinCare` text DEFAULT NULL,
  `skinCareSpecify` text DEFAULT NULL,
  `phyAggToSp` text DEFAULT NULL,
  `phyAggToSpSpecify` text DEFAULT NULL,
  `verAggToSp` text DEFAULT NULL,
  `verAggToSpSpecify` text DEFAULT NULL,
  `aggToClients` text DEFAULT NULL,
  `aggToClientsSpecify` text DEFAULT NULL,
  `aggWithObjects` text DEFAULT NULL,
  `aggWithObjectsSpecify` text DEFAULT NULL,
  `selfHarm` text DEFAULT NULL,
  `selfHarmSpecify` text DEFAULT NULL,
  `subAbuse` text DEFAULT NULL,
  `subAbuseSpecify` text DEFAULT NULL,
  `sexualAbuse` text DEFAULT NULL,
  `sexualAbuseSpecify` text DEFAULT NULL,
  `threatsToStaff` text DEFAULT NULL,
  `threatsToStaffSpecify` text DEFAULT NULL,
  `useEmotionToAcGols` text DEFAULT NULL,
  `useEmotionToAcGolsSpecify` text DEFAULT NULL,
  `sharingInformation` text DEFAULT NULL,
  `acknowledge` text DEFAULT NULL,
  `understandServices` text DEFAULT NULL,
  `relevantPrivacyLaws` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `inserted_date` text DEFAULT NULL,
  `inserted_time` text DEFAULT NULL,
  `inserted_by` text DEFAULT NULL,
  `updated_date` text DEFAULT NULL,
  `updated_time` text DEFAULT NULL,
  `updated_by` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ep_client_form`
--

INSERT INTO `ep_client_form` (`id`, `draft_code`, `first_name`, `last_name`, `dateOfBirth`, `bornCountry`, `gender`, `prefered_lang`, `interpreterReq`, `ndisNumber`, `street_address`, `suburb`, `state`, `postCode`, `email`, `contactNumber`, `ndisPlanDate`, `ndisEndDate`, `planMangName`, `planMangNumber`, `planMangEmail`, `emConPersonName`, `relationToParti`, `emContPersonNumber`, `livingArrang`, `livingArrangOther`, `guardianName`, `guardianDOB`, `guardianHomePhone`, `guardianMobNumber`, `guardianWorkPhone`, `guardianEmail`, `guardianAddress`, `guardianSubrub`, `guardianState`, `guardianPostcode`, `makeRefName`, `makeRefOrg`, `makeRefPosition`, `makeRefEmail`, `makeRefAddress`, `makeRefSubrub`, `makeRefState`, `makeRefPostCode`, `makeRefPhone`, `primaryDiagnos`, `secondaryDiagnos`, `services_json`, `services_ref_ids`, `services_desc`, `anyRisk`, `anyRiskSpecify`, `harmFromOther`, `harmFromOtherSpecify`, `harmToOther`, `harmToOtherSpecify`, `anyPet`, `anyPetSpecify`, `anyFireamers`, `anyFireamersSpecify`, `anyDrugHistory`, `anyDrugHistorySpecify`, `anyRishToKnow`, `anyRishToKnowSpecify`, `dateOfRef`, `hearing`, `hearingSpecify`, `speech`, `speechSpecify`, `ableToWrite`, `ableToWriteSpecify`, `englishSkill`, `englishSkillSpecify`, `willingToParticipate`, `willingToParticipateSpecity`, `orientation`, `orientationSpecify`, `acceptDiraction`, `acceptDiractionSpecific`, `shortMemory`, `shortMemorySpecify`, `walkUnaided`, `walkUnaidedSpecify`, `managesStairs`, `managesStairsSpecify`, `usesWalkingAid`, `usesWalkingAidSpecify`, `wheelshair`, `wheelshairSpecify`, `usesElecWheelChair`, `usesElecWheelChairSpecify`, `transferIndep`, `transferIndepSpecify`, `transferWithSuper`, `transferWithSuperSpecify`, `transferWithHoist`, `transferWithHoistSpecify`, `bedMobility`, `bedMobilitySpecify`, `showering`, `showeringSpecify`, `toileting`, `toiletingSpecify`, `grooming`, `groomingSpecify`, `repoInBed`, `repoInBedSpecify`, `repoInChair`, `repoInChairSpecify`, `mouthCare`, `mouthCareSpecify`, `eating`, `eatingSpecify`, `skinCare`, `skinCareSpecify`, `phyAggToSp`, `phyAggToSpSpecify`, `verAggToSp`, `verAggToSpSpecify`, `aggToClients`, `aggToClientsSpecify`, `aggWithObjects`, `aggWithObjectsSpecify`, `selfHarm`, `selfHarmSpecify`, `subAbuse`, `subAbuseSpecify`, `sexualAbuse`, `sexualAbuseSpecify`, `threatsToStaff`, `threatsToStaffSpecify`, `useEmotionToAcGols`, `useEmotionToAcGolsSpecify`, `sharingInformation`, `acknowledge`, `understandServices`, `relevantPrivacyLaws`, `status`, `inserted_date`, `inserted_time`, `inserted_by`, `updated_date`, `updated_time`, `updated_by`) VALUES
(100, '', 'Client', 'Demo 1', '04-01-1984', '16', '', '', '', '486037605', '46/332 Park Street South Melbourne, VIC 3205 Australia', 'South Melbourne', '2', '3205', 'N/A', '547931679', '27-10-2020', '27-10-2021', 'Maple Plan', '', 'planmanagerdemo@gmail.com', 'Helen Martin', '', '547931679', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '{\"services_ref_id\":{\"3\":\"3\",\"7\":\"7\",\"11\":\"11\"},\"services_desc\":{\"3\":\"fg hdfhg\",\"7\":\"dfhg \",\"11\":\"fgh dfhg\"}}', '3,7,11', 'fg hdfhg,dfhg ,fgh dfhg', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'true', '', 'active', NULL, NULL, NULL, '2022-01-05', '04:56:45 AM', '1'),
(101, '', 'Client', 'Demo 2', '08-10-1984', '16', '', '', '', '486037605', '1/35 Swallow St Port Melbourne VIC 3207', ' Port Melbourne', '2', '3207', 'N/A', '547931679', '08-04-2020', '08-04-2022', 'Maple Plan', '', 'planmanagerdemo@gmail.com', 'Sarah Vorasurayakarnt', '', '547931679', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '{\"services_ref_id\":{\"5\":\"5\"},\"services_desc\":{\"5\":\" fghdfhg\"}}', '5', ' fghdfhg', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'true', '', 'active', NULL, NULL, NULL, '2022-01-05', '04:56:21 AM', '1'),
(102, '', 'Client', 'Demo 3', '07-05-2064', '16', '', '', '', '486037605', '5/52 Alma Rd St. Kilda, Melbourne, VIC 3182 Australia', 'Melbourne', '2', '3182', 'rookledgemarc4@gmail.com', '547931679', '25-08-2021', '25-08-2023', 'My Plan Manager', '', 'planmanagerdemo@gmail.com', 'Carol Mackie', '', 'N/A', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '{\"services_ref_id\":{\"4\":\"4\",\"5\":\"5\"},\"services_desc\":{\"4\":\"fdfhg\",\"5\":\"dfhg d\"}}', '4,5', 'fdfhg,dfhg d', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'true', '', 'active', NULL, NULL, NULL, '2022-01-05', '04:56:01 AM', '1'),
(103, '', 'Client', 'Demo 4', '06-11-1991', '16', '', '', '', '486037605', '1 / 4 Essex Street Prahran, VIC 3181 Australia', 'Prahran', '2', '3181', 'deborahsay@hotmail.com', '547931679', '30-10-2021', '30-09-2023', 'Maple Plan', '', 'planmanagerdemo@gmail.com', 'K- Lusay', '', '547931679', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '{\"services_ref_id\":{\"2\":\"2\",\"4\":\"4\",\"7\":\"7\",\"10\":\"10\"},\"services_desc\":{\"2\":\"gsdfg\",\"4\":\"dsg\",\"7\":\" dsfgdsfg\",\"10\":\"s dgsdg\"}}', '2,4,7,10', 'gsdfg,dsg, dsfgdsfg,s dgsdg', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'true', '', 'active', NULL, NULL, NULL, '2022-01-05', '04:55:46 AM', '1'),
(104, '', 'Client', 'Demo 5', '23-06-1993', '16', '', '', '', '486037605', 'Unit 8/ 1435 High Street Glen Iris, VIC 3146 Australia', 'Glen Iris', '2', '3146', 'egmassey@yahoo.com.au', '547931679', '07-08-2021', '07-08-2022', 'Myintegra', '', 'planmanagerdemo@gmail.com', 'Jessie Massey', '', '547931679', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '{\"services_ref_id\":{\"6\":\"6\"},\"services_desc\":{\"6\":\"s dfgsdfg\"}}', '6', 's dfgsdfg', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'true', '', 'active', NULL, NULL, NULL, '2022-01-05', '04:55:25 AM', '1'),
(105, '', 'Client', 'Demo 6', '25-02-2068', '16', '', '', '', '486037605', '13 / 52 BARKLY ST St Kilda, VIC 3182 Australia', ' St Kilda,', '2', '3182', 'N/A', '547931679', '26-06-2021', '26-06-2022', 'Maple Plan', '', 'planmanagerdemo@gmail.com', 'Lanny Chng', '', '547931679', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '{\"services_ref_id\":{\"5\":\"5\",\"10\":\"10\"},\"services_desc\":{\"5\":\" dgdsfg sdfg\",\"10\":\"s dgsdfg\"}}', '5,10', ' dgdsfg sdfg,s dgsdfg', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'true', '', 'active', NULL, NULL, NULL, '2022-01-05', '04:55:06 AM', '1'),
(106, '', 'Client', 'Demo 7', '05-09-1976', '16', '', '', '', '486037605', 'C/O 166 Boundary Road North Melbourne, VIC 3051 Australia', 'North Melbourne', '2', '3051', 'N/A', '547931679', '18-10-2019', '17-10-2021', 'NDIA Managed.', '', 'planmanagerdemo@gmail.com', 'Nadia Aldi', '', '547931679', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '{\"services_ref_id\":{\"10\":\"10\",\"11\":\"11\"},\"services_desc\":{\"10\":\"s dfgsdfg\",\"11\":\"dg sdfg\"}}', '10,11', 's dfgsdfg,dg sdfg', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'true', '', 'active', NULL, NULL, NULL, '2022-01-05', '04:54:51 AM', '1'),
(107, '', 'Client', 'Demo 8', '27-10-1991', '16', '', '', '', '486037605', '14 June Street HIGHETT, VIC 3190 Australia', 'HIGHETT', '2', '3190', 'SirRy4nLol@gmail.com', '547931679', '09-03-2021', '09-03-2022', 'Moira', '', 'planmanagerdemo@gmail.com', 'Rebecca Steel', '', '547931679', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '{\"services_ref_id\":{\"2\":\"2\",\"5\":\"5\"},\"services_desc\":{\"2\":\"sdfdsaf\",\"5\":\"dhgdhg\"}}', '2,5', 'sdfdsaf,dhgdhg', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'true', '', 'in_active', NULL, NULL, NULL, '2022-01-01', '04:03:39 PM', '1'),
(108, '', 'Client', 'Demo 9', '20-05-1974', '16', '', '', '', '486037605', '4/334 Princes Street Port Melbourne, VIC 3207 Australia', 'Port Melbourne', '2', '3207', 'noemail@gmail.com', '547931679', '18-08-2020', '17-08-2023', 'Helen', '', 'planmanagerdemo@gmail.com', 'Jade', '', '547931679', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '{\"services_ref_id\":{\"2\":\"2\"},\"services_desc\":{\"2\":\"dsf gsdfg\"}}', '2', 'dsf gsdfg', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'true', '', 'active', NULL, NULL, NULL, '2022-01-05', '04:54:23 AM', '1'),
(109, '', 'Client', 'Demo 10', '01-01-1970', '16', '', '', '', '486037605', '12/230 Glenhuntly Rd Elsternwick VIC 3185', 'Elsternwick', '2', '3185', 'comptondale@gmail.com', '547931679', '01-09-2021', '01-09-2022', 'Maple Plan Pty Ltd', '', 'planmanagerdemo@gmail.com', 'Hazel Compton', '', '547931679', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '{\"services_ref_id\":{\"2\":\"2\",\"6\":\"6\"},\"services_desc\":{\"2\":\"f sdfg dfsd\",\"6\":\"fgsdfg\"}}', '2,6', 'f sdfg dfsd,fgsdfg', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'true', '', 'active', NULL, NULL, NULL, '2022-01-05', '04:54:06 AM', '1');

-- --------------------------------------------------------

--
-- Table structure for table `ep_client_note`
--

CREATE TABLE `ep_client_note` (
  `id` int(11) NOT NULL,
  `client_ref_id` text DEFAULT NULL,
  `note` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `inserted_date` text DEFAULT NULL,
  `inserted_time` text DEFAULT NULL,
  `inserted_by` text DEFAULT NULL,
  `updated_date` text DEFAULT NULL,
  `updated_time` text DEFAULT NULL,
  `updated_by` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ep_client_note`
--

INSERT INTO `ep_client_note` (`id`, `client_ref_id`, `note`, `status`, `inserted_date`, `inserted_time`, `inserted_by`, `updated_date`, `updated_time`, `updated_by`) VALUES
(1, '100', ' sdfasd fsdf asf f', 'active', '2021-11-20', '05:01:08 PM', '1', NULL, NULL, NULL),
(2, '109', 'sd fsasdf asdf asdf', 'active', '2021-11-20', '05:02:40 PM', '1', NULL, NULL, NULL),
(3, '107', 's saf asfd asdf af', 'active', '2021-11-20', '05:03:17 PM', '1', NULL, NULL, NULL),
(4, '107', 'sdfasdfasf', 'active', '2021-11-20', '05:03:46 PM', '1', NULL, NULL, NULL),
(5, '107', 'sgdsfg', 'active', '2021-11-20', '05:03:50 PM', '1', NULL, NULL, NULL),
(6, '107', '45', 'active', '2021-11-20', '05:03:53 PM', '1', NULL, NULL, NULL),
(7, '107', 'ffff', 'active', '2021-11-20', '05:15:18 PM', '43', NULL, NULL, NULL),
(8, '107', 'lklks fs09-05932-5mkjkj  jj----- ', 'active', '2021-11-20', '05:26:53 PM', '1', NULL, NULL, NULL),
(9, '107', 'lklks fs09-05932-5mkjkj  jj----- ', 'active', '2021-11-20', '05:27:42 PM', '40', NULL, NULL, NULL),
(10, '107', 'lklks fs09-05932-5mkjkj  jj----- ', 'active', '2021-11-20', '05:27:59 PM', '1', NULL, NULL, NULL),
(11, '101', 'aaa', 'active', '2021-11-20', '10:39:20 PM', '41', NULL, NULL, NULL),
(12, '107', 'fgdg', 'active', '2021-11-20', '11:02:35 PM', '1', NULL, NULL, NULL),
(13, '107', 'add', 'active', '2021-11-20', '11:23:38 PM', '1', NULL, NULL, NULL),
(14, '108', 'asdf 3r', 'active', '2021-11-20', '11:23:59 PM', '1', NULL, NULL, NULL),
(15, '107', 'this is as fa', 'active', '2021-11-20', '11:24:13 PM', '1', NULL, NULL, NULL),
(16, '101', 'uy', 'active', '2021-11-20', '11:38:56 PM', '1', NULL, NULL, NULL),
(17, '109', 'jhk', 'active', '2021-11-20', '11:41:44 PM', '1', NULL, NULL, NULL),
(18, '109', '35fgsfs fs f', 'active', '2021-11-20', '11:41:52 PM', '41', NULL, NULL, NULL),
(19, '111', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'active', '2021-11-20', '11:42:42 PM', '1', NULL, NULL, NULL),
(20, '111', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).', 'active', '2021-11-20', '11:47:58 PM', '1', NULL, NULL, NULL),
(21, '110', 'dsdfgsdf', 'active', '2021-11-21', '12:01:02 AM', '1', NULL, NULL, NULL),
(22, '103', 'This is sample', 'active', '2021-11-21', '05:12:56 PM', '1', NULL, NULL, NULL),
(23, '103', 'This is jhon sample note', 'active', '2021-11-21', '05:18:42 PM', '43', NULL, NULL, NULL),
(24, '104', 'ssdf asd f', 'active', '2021-11-21', '05:45:03 PM', '1', NULL, NULL, NULL),
(25, '104', 'sdas dfasf', 'active', '2021-11-21', '05:57:03 PM', '43', NULL, NULL, NULL),
(26, '20', 'sdfdf', 'active', '2021-11-21', '05:58:24 PM', '43', NULL, NULL, NULL),
(27, '20', 'aa', 'active', '2021-11-21', '06:25:23 PM', '44', NULL, NULL, NULL),
(28, '37', 'sss', 'active', '2021-11-21', '06:25:38 PM', '44', NULL, NULL, NULL),
(29, '88', 'kjh', 'active', '2021-11-21', '06:28:02 PM', '43', NULL, NULL, NULL),
(30, '20', 'sdfsf', 'active', '2021-12-31', '06:13:18 AM', '1', NULL, NULL, NULL),
(31, '103', '132131654', 'active', '2021-12-31', '06:16:08 AM', '1', NULL, NULL, NULL),
(32, '103', '1111111', 'active', '2021-12-31', '06:16:43 AM', '1', NULL, NULL, NULL),
(33, '109', 'ssdd', 'active', '2021-12-31', '06:17:41 AM', '1', NULL, NULL, NULL),
(34, '88', 'dd', 'active', '2021-12-31', '06:17:50 AM', '1', NULL, NULL, NULL),
(35, '88', 'dsd', 'active', '2021-12-31', '06:17:55 AM', '1', NULL, NULL, NULL),
(36, '103', 'explode the string at white spaces then loop through the result array and because each one is a string you can use $string[0] to get the first character then simply concatenate those. – ', 'active', '2022-01-03', '04:36:53 PM', '1', NULL, NULL, NULL),
(37, '37', 'Lets break down what you want in a logical way: You want every character from the string is at the beginning of a word. The best way to identify those characters is to look for those characters that are preceded by white space.', 'active', '2022-01-03', '04:37:28 PM', '1', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ep_client_progress_note`
--

CREATE TABLE `ep_client_progress_note` (
  `id` int(11) NOT NULL,
  `date` text DEFAULT NULL,
  `client_ref_id` text DEFAULT NULL,
  `time` text DEFAULT NULL,
  `note` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `inserted_date` text DEFAULT NULL,
  `inserted_time` text DEFAULT NULL,
  `inserted_by` text DEFAULT NULL,
  `updated_date` text DEFAULT NULL,
  `updated_time` text DEFAULT NULL,
  `updated_by` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ep_client_progress_note`
--

INSERT INTO `ep_client_progress_note` (`id`, `date`, `client_ref_id`, `time`, `note`, `status`, `inserted_date`, `inserted_time`, `inserted_by`, `updated_date`, `updated_time`, `updated_by`) VALUES
(1, 'Tue Nov 16 2021 21:59:55 GMT+0500', '105', '01:15 AM', 'd fasdf asdf asdf s gasfasdf af', 'active', '2021-11-19', '10:00:05 PM', '1', NULL, NULL, NULL),
(2, 'Sat Dec 25 2021 06:30:41 GMT+0500', '105', '05:45 AM', 'sd fsadf asf af', 'active', '2021-12-31', '06:30:45 AM', '1', NULL, NULL, NULL),
(3, 'Fri Dec 24 2021 06:31:12 GMT+0500', '108', '12:30 AM', '6756756', 'active', '2021-12-31', '06:31:19 AM', '1', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ep_document_generate`
--

CREATE TABLE `ep_document_generate` (
  `id` int(11) NOT NULL,
  `type` text DEFAULT NULL,
  `doc_ref_id` text DEFAULT NULL,
  `client_ref_id` text DEFAULT NULL,
  `spw_ref_id` text DEFAULT NULL,
  `file_name` text DEFAULT NULL,
  `folder_name` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `varDateOfFileClosed` text DEFAULT NULL,
  `varDocumentDate` text DEFAULT NULL,
  `varSupporterInvolvement` text DEFAULT NULL,
  `varCommunicationAndAccessibilityNeeds` text DEFAULT NULL,
  `varHealthWellbeingAndSafetyRequirements` text DEFAULT NULL,
  `varJointPlanningCaseCoordination` text DEFAULT NULL,
  `varConnectionIfApplication1` text DEFAULT NULL,
  `varConnectionIfApplication2` text DEFAULT NULL,
  `varConnectionDoesTheClient` text DEFAULT NULL,
  `varConnectionWhatBarrier` text DEFAULT NULL,
  `varPersonalGoals` text DEFAULT NULL,
  `varPersonalStrengths` text DEFAULT NULL,
  `varPersonalNeeds` text DEFAULT NULL,
  `varPersonalWishes` text DEFAULT NULL,
  `varPersonalHowCanSupportThings` text DEFAULT NULL,
  `varPersonalHowCanSupportClients` text DEFAULT NULL,
  `varServiceDeliveryDelivered` text DEFAULT NULL,
  `varServiceDeliverySupport` text DEFAULT NULL,
  `varServiceDeliveryReviewed` text DEFAULT NULL,
  `varServiceType` text DEFAULT NULL,
  `varCommenceDate` text DEFAULT NULL,
  `varForThePeriodFrom` text DEFAULT NULL,
  `varForThePeriodTo` text DEFAULT NULL,
  `varPayRatePerHour` text DEFAULT NULL,
  `varOrientationOn` text DEFAULT NULL,
  `inserted_date` text DEFAULT NULL,
  `inserted_time` text DEFAULT NULL,
  `inserted_by` text DEFAULT NULL,
  `updated_date` text DEFAULT NULL,
  `updated_time` text DEFAULT NULL,
  `updated_by` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ep_document_generate`
--

INSERT INTO `ep_document_generate` (`id`, `type`, `doc_ref_id`, `client_ref_id`, `spw_ref_id`, `file_name`, `folder_name`, `status`, `varDateOfFileClosed`, `varDocumentDate`, `varSupporterInvolvement`, `varCommunicationAndAccessibilityNeeds`, `varHealthWellbeingAndSafetyRequirements`, `varJointPlanningCaseCoordination`, `varConnectionIfApplication1`, `varConnectionIfApplication2`, `varConnectionDoesTheClient`, `varConnectionWhatBarrier`, `varPersonalGoals`, `varPersonalStrengths`, `varPersonalNeeds`, `varPersonalWishes`, `varPersonalHowCanSupportThings`, `varPersonalHowCanSupportClients`, `varServiceDeliveryDelivered`, `varServiceDeliverySupport`, `varServiceDeliveryReviewed`, `varServiceType`, `varCommenceDate`, `varForThePeriodFrom`, `varForThePeriodTo`, `varPayRatePerHour`, `varOrientationOn`, `inserted_date`, `inserted_time`, `inserted_by`, `updated_date`, `updated_time`, `updated_by`) VALUES
(1, 'client', '2', '104', NULL, '104-2022-01-05df4c.pdf', 'initialSupportAssessmentForm', 'active', NULL, 'Thu Jan 20 2022 04:51:33 GMT+0500', 'f sdfasd fa', 'sdf asdf as', 'dfas df', 'a sdfasdf', ' asdf asd', 'fasdf ', 'asdf asd', 'f sdfg sdf', 'sdf gsdfg', ' sdfgs df', 'dfg sdfg', 'g sdfgs', 'df sdfg', 'dsf gsdfg', 'dfg dfhg', 'dfh gdfhg', 'fgh dfhg', NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-05', '04:51:49 AM', '1', NULL, NULL, NULL),
(2, 'client', '3', '105', NULL, '105-2022-01-052ef2.pdf', 'serviceAgreement', 'active', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '10', 'Fri Jan 21 2022 04:57:25 GMT+0500', 'Fri Jan 21 2022 04:57:26 GMT+0500', 'Sat Jan 29 2022 04:57:28 GMT+0500', NULL, NULL, '2022-01-05', '04:57:31 AM', '1', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ep_document_list`
--

CREATE TABLE `ep_document_list` (
  `id` int(11) NOT NULL,
  `type` text DEFAULT NULL,
  `doc_name` text DEFAULT NULL,
  `take_data` text DEFAULT NULL,
  `take_date_modal_width` tinytext DEFAULT NULL,
  `status` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ep_document_list`
--

INSERT INTO `ep_document_list` (`id`, `type`, `doc_name`, `take_data`, `take_date_modal_width`, `status`) VALUES
(1, 'Client', 'Client File Checklist', 'true', '285', 'active'),
(2, 'Client', 'Initial Support Assessment Form', 'true', '890', 'active'),
(3, 'Client', 'Service Agreement', 'true', '480', 'active'),
(4, 'Support Worker', 'Casual (Award) Employment Contract', 'true', '285', 'active'),
(5, 'Support Worker', 'Employment Offer Letter', NULL, NULL, 'active'),
(6, 'Support Worker', 'New Employee Information', NULL, NULL, 'active'),
(7, 'Support Worker', 'Welcome Acceptance Letter', 'true', '285', 'active'),
(8, 'Support Worker', 'Position Description Disability Support Worker', NULL, NULL, 'active'),
(9, 'Support Worker', 'Staff Code of Conduct', NULL, NULL, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `ep_document_tracking`
--

CREATE TABLE `ep_document_tracking` (
  `id` int(11) NOT NULL,
  `type` text DEFAULT NULL,
  `client_ref_id` text DEFAULT NULL,
  `sp_ref_id` text DEFAULT NULL,
  `driving_license` text DEFAULT NULL,
  `medicare_care` text DEFAULT NULL,
  `police_check` text DEFAULT NULL,
  `car_insurance` text DEFAULT NULL,
  `passport` text DEFAULT NULL,
  `working_with_children_card` text DEFAULT NULL,
  `ndis_worker_screening_check` text DEFAULT NULL,
  `first_aid_certificate` text DEFAULT NULL,
  `manual_handling_certificate` text DEFAULT NULL,
  `food_handling_certificate` text DEFAULT NULL,
  `flu_vaccination_certificate` text DEFAULT NULL,
  `ndis_plan_expiry` text DEFAULT NULL,
  `dob_reminder` text DEFAULT NULL,
  `service_agreement_expiry` text DEFAULT NULL,
  `inserted_date` text DEFAULT NULL,
  `inserted_time` text DEFAULT NULL,
  `inserted_by` text DEFAULT NULL,
  `updated_date` text DEFAULT NULL,
  `updated_time` text DEFAULT NULL,
  `updated_by` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ep_document_tracking`
--

INSERT INTO `ep_document_tracking` (`id`, `type`, `client_ref_id`, `sp_ref_id`, `driving_license`, `medicare_care`, `police_check`, `car_insurance`, `passport`, `working_with_children_card`, `ndis_worker_screening_check`, `first_aid_certificate`, `manual_handling_certificate`, `food_handling_certificate`, `flu_vaccination_certificate`, `ndis_plan_expiry`, `dob_reminder`, `service_agreement_expiry`, `inserted_date`, `inserted_time`, `inserted_by`, `updated_date`, `updated_time`, `updated_by`) VALUES
(1, 'clients', '110', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '26-11-2021', NULL, '30-11-2021', '2021-11-22', '10:15:54 PM', '1', NULL, NULL, NULL),
(2, 'supportWorker', '', '184', '25-11-2021', '30-11-2021', '11-12-2021', '22-01-2022', '09-11-2021', '30-11-2021', '08-11-2021', '25-11-2021', '30-11-2021', '10-12-2021', '05-12-2021', NULL, NULL, NULL, '2021-11-22', '10:16:49 PM', '1', '2021-11-22', '10:20:32 PM', '1'),
(3, 'clients', '111', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23-11-2021', NULL, '24-11-2021', '2021-11-22', '10:35:29 PM', '1', NULL, NULL, NULL),
(4, 'clients', '111', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23-11-2021', NULL, '24-11-2021', '2021-11-22', '10:36:00 PM', '1', NULL, NULL, NULL),
(5, 'clients', '111', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23-11-2021', NULL, '24-11-2021', '2021-11-22', '10:36:15 PM', '1', NULL, NULL, NULL),
(6, 'clients', '111', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23-11-2021', NULL, '24-11-2021', '2021-11-22', '10:41:56 PM', '1', NULL, NULL, NULL),
(7, 'clients', '111', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23-11-2021', NULL, '24-11-2021', '2021-11-22', '10:43:01 PM', '1', NULL, NULL, NULL),
(8, 'clients', '111', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23-11-2021', NULL, '24-11-2021', '2021-11-22', '10:45:13 PM', '1', NULL, NULL, NULL),
(9, 'clients', '111', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23-11-2021', NULL, '24-11-2021', '2021-11-22', '10:48:17 PM', '1', NULL, NULL, NULL),
(10, 'clients', '111', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23-11-2021', NULL, '24-11-2021', '2021-11-22', '10:50:02 PM', '1', NULL, NULL, NULL),
(11, 'clients', '111', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23-11-2021', NULL, '24-11-2021', '2021-11-22', '10:52:21 PM', '1', NULL, NULL, NULL),
(12, 'clients', '111', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23-11-2021', NULL, '24-11-2021', '2021-11-22', '10:53:11 PM', '1', NULL, NULL, NULL),
(13, 'clients', '111', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23-11-2021', NULL, '24-11-2021', '2021-11-22', '10:53:22 PM', '1', NULL, NULL, NULL),
(14, 'clients', '111', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23-11-2021', NULL, '24-11-2021', '2021-11-22', '10:53:31 PM', '1', NULL, NULL, NULL),
(15, 'clients', '111', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23-11-2021', NULL, '24-11-2021', '2021-11-22', '11:52:48 PM', '1', NULL, NULL, NULL),
(16, 'supportWorker', '', '193', '23-12-2022', '08-01-2022', '23-12-2022', '23-12-2022', '23-12-2022', '23-12-2022', '23-12-2022', '23-12-2022', '23-12-2022', '23-12-2022', '23-12-2022', NULL, NULL, NULL, '2021-12-31', '06:41:12 AM', '1', NULL, NULL, NULL),
(17, 'clients', '108', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13-01-2022', NULL, '29-01-2022', '2022-01-01', '03:36:19 PM', '1', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ep_dropdown_country_list`
--

CREATE TABLE `ep_dropdown_country_list` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ep_dropdown_country_list`
--

INSERT INTO `ep_dropdown_country_list` (`id`, `name`) VALUES
(1, 'Aland Islands'),
(2, 'Afghanistan'),
(3, 'Akrotiri'),
(4, 'Albania'),
(5, 'Algeria'),
(6, 'American Samoa'),
(7, 'Andorra'),
(8, 'Angola'),
(9, 'Anguilla'),
(10, 'Antarctica'),
(11, 'Antigua and Barbuda'),
(12, 'Argentina'),
(13, 'Armenia'),
(14, 'Aruba'),
(15, 'Ashmore and Cartier Islands'),
(16, 'Australia'),
(17, 'Austria'),
(18, 'Azerbaijan'),
(19, 'Bahrain'),
(20, 'Bangladesh'),
(21, 'Barbados'),
(22, 'Bassas Da India'),
(23, 'Belarus'),
(24, 'Belgium'),
(25, 'Belize'),
(26, 'Benin'),
(27, 'Bermuda'),
(28, 'Bhutan'),
(29, 'Bolivia'),
(30, 'Bosnia and Herzegovina'),
(31, 'Botswana'),
(32, 'Bouvet Island'),
(33, 'Brazil'),
(34, 'British Indian Ocean Territory'),
(35, 'British Virgin Islands'),
(36, 'Brunei'),
(37, 'Bulgaria'),
(38, 'Burkina Faso'),
(39, 'Burma'),
(40, 'Burundi'),
(41, 'Cambodia'),
(42, 'Cameroon'),
(43, 'Canada'),
(44, 'Cape Verde'),
(45, 'Caribbean Netherlands'),
(46, 'Cayman Islands'),
(47, 'Central African Republic'),
(48, 'Chad'),
(49, 'Chile'),
(50, 'China'),
(51, 'Christmas Island'),
(52, 'Clipperton Island'),
(53, 'Cocos (Keeling) Islands'),
(54, 'Colombia'),
(55, 'Comoros'),
(56, 'Cook Islands'),
(57, 'Coral Sea Islands'),
(58, 'Costa Rica'),
(59, 'Croatia'),
(60, 'Cuba'),
(61, 'Curacao'),
(62, 'Cyprus'),
(63, 'Czech Republic'),
(64, 'Democratic Republic of the Congo'),
(65, 'Denmark'),
(66, 'Dhekelia'),
(67, 'Djibouti'),
(68, 'Dominica'),
(69, 'Dominican Republic'),
(70, 'Ecuador'),
(71, 'Egypt'),
(72, 'El Salvador'),
(73, 'Equatorial Guinea'),
(74, 'Eritrea'),
(75, 'Estonia'),
(76, 'Ethiopia'),
(77, 'Europa Island'),
(78, 'Falkland Islands (Islas Malvinas)'),
(79, 'Faroe Islands'),
(80, 'Federated States of Micronesia'),
(81, 'Fiji'),
(82, 'Finland'),
(83, 'France'),
(84, 'French Guiana'),
(85, 'French Polynesia'),
(86, 'French Southern and Antarctic Lands'),
(87, 'Gabon'),
(88, 'Gaza Strip'),
(89, 'Georgia'),
(90, 'Germany'),
(91, 'Ghana'),
(92, 'Gibraltar'),
(93, 'Glorioso Islands'),
(94, 'Greece'),
(95, 'Greenland'),
(96, 'Grenada'),
(97, 'Guadeloupe'),
(98, 'Guam'),
(99, 'Guatemala'),
(100, 'Guernsey'),
(101, 'Guinea'),
(102, 'Guinea-bissau'),
(103, 'Guyana'),
(104, 'Haiti'),
(105, 'Heard Island and Mcdonald Islands'),
(106, 'Holy See (Vatican City)'),
(107, 'Honduras'),
(108, 'Hong Kong'),
(109, 'Hungary'),
(110, 'Iceland'),
(111, 'India'),
(112, 'Indonesia'),
(113, 'Iran'),
(114, 'Iraq'),
(115, 'Ireland'),
(116, 'Isle of Man'),
(117, 'Israel'),
(118, 'Italy'),
(119, 'Jamaica'),
(120, 'Jan Mayen'),
(121, 'Japan'),
(122, 'Jersey'),
(123, 'Jordan'),
(124, 'Juan De Nova Island'),
(125, 'Kazakhstan'),
(126, 'Kenya'),
(127, 'Kiribati'),
(128, 'Kuwait'),
(129, 'Kyrgyzstan'),
(130, 'Laos'),
(131, 'Latvia'),
(132, 'Lebanon'),
(133, 'Lesotho'),
(134, 'Liberia'),
(135, 'Libya'),
(136, 'Liechtenstein'),
(137, 'Lithuania'),
(138, 'Luxembourg'),
(139, 'Macau'),
(140, 'Macedonia'),
(141, 'Madagascar'),
(142, 'Malawi'),
(143, 'Malaysia'),
(144, 'Maldives'),
(145, 'Mali'),
(146, 'Malta'),
(147, 'Marshall Islands'),
(148, 'Martinique'),
(149, 'Mauritania'),
(150, 'Mauritius'),
(151, 'Mayotte'),
(152, 'Mexico'),
(153, 'Moldova'),
(154, 'Monaco'),
(155, 'Mongolia'),
(156, 'Montenegro'),
(157, 'Montserrat'),
(158, 'Morocco'),
(159, 'Mozambique'),
(160, 'Myanmar'),
(161, 'Namibia'),
(162, 'Nauru'),
(163, 'Navassa Island'),
(164, 'Nepal'),
(165, 'Netherlands'),
(166, 'Netherlands Antilles'),
(167, 'New Caledonia'),
(168, 'New Zealand'),
(169, 'Nicaragua'),
(170, 'Niger'),
(171, 'Nigeria'),
(172, 'Niue'),
(173, 'Norfolk Island'),
(174, 'North Korea'),
(175, 'Northern Mariana Islands'),
(176, 'Norway'),
(177, 'Oman'),
(178, 'Pakistan'),
(179, 'Palau'),
(180, 'Palestine'),
(181, 'Panama'),
(182, 'Papua New Guinea'),
(183, 'Paracel Islands'),
(184, 'Paraguay'),
(185, 'Peru'),
(186, 'Philippines'),
(187, 'Pitcairn Islands'),
(188, 'Poland'),
(189, 'Portugal'),
(190, 'Puerto Rico'),
(191, 'Qatar'),
(192, 'Republic of the Congo'),
(193, 'Reunion'),
(194, 'Romania'),
(195, 'Russia'),
(196, 'Rwanda'),
(197, 'Saint BarthÃ©lemy'),
(198, 'Saint Helena'),
(199, 'Saint Kitts and Nevis'),
(200, 'Saint Lucia'),
(201, 'Saint Martin'),
(202, 'Saint Pierre and Miquelon'),
(203, 'Saint Vincent and the Grenadines'),
(204, 'Samoa'),
(205, 'San Marino'),
(206, 'Sao Tome and Principe'),
(207, 'Saudi Arabia'),
(208, 'Senegal'),
(209, 'Serbia'),
(210, 'Seychelles'),
(211, 'Sierra Leone'),
(212, 'Singapore'),
(213, 'Sint Maarten'),
(214, 'Slovakia'),
(215, 'Slovenia'),
(216, 'Solomon Islands'),
(217, 'Somalia'),
(218, 'South Africa'),
(219, 'South Georgia and the South Sandwich Islands'),
(220, 'South Korea'),
(221, 'South Sudan'),
(222, 'Spain'),
(223, 'Spratly Islands'),
(224, 'Sri Lanka'),
(225, 'Sudan'),
(226, 'Suriname'),
(227, 'Svalbard'),
(228, 'Swaziland'),
(229, 'Sweden'),
(230, 'Switzerland'),
(231, 'Syria'),
(232, 'Taiwan'),
(233, 'Tajikistan'),
(234, 'Tanzania'),
(235, 'Thailand'),
(236, 'The Bahamas'),
(237, 'The Gambia'),
(238, 'Timor-leste'),
(239, 'Togo'),
(240, 'Tokelau'),
(241, 'Tonga'),
(242, 'Trinidad and Tobago'),
(243, 'Tromelin Island'),
(244, 'Tunisia'),
(245, 'Turkey'),
(246, 'Turkmenistan'),
(247, 'Turks and Caicos Islands'),
(248, 'Tuvalu'),
(249, 'Uganda'),
(250, 'Ukraine'),
(251, 'United Arab Emirates'),
(252, 'United Kingdom'),
(253, 'United States'),
(254, 'Uruguay'),
(255, 'Uzbekistan'),
(256, 'Vanuatu'),
(257, 'Venezuela'),
(258, 'Vietnam'),
(259, 'Virgin Islands'),
(260, 'Wake Island'),
(261, 'Wallis and Futuna'),
(262, 'West Bank'),
(263, 'Western Sahara'),
(264, 'Yemen'),
(265, 'Zambia'),
(266, 'Zimbabwe'),
(267, 'Other');

-- --------------------------------------------------------

--
-- Table structure for table `ep_dropdown_general_list`
--

CREATE TABLE `ep_dropdown_general_list` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `list_name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ep_dropdown_general_list`
--

INSERT INTO `ep_dropdown_general_list` (`id`, `name`, `list_name`) VALUES
(1, 'Full-Time', 'job_time_list'),
(2, 'Part-Time', 'job_time_list'),
(3, 'Casual', 'job_time_list'),
(4, 'Contract', 'job_time_list');

-- --------------------------------------------------------

--
-- Table structure for table `ep_dropdown_languages_list`
--

CREATE TABLE `ep_dropdown_languages_list` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ep_dropdown_languages_list`
--

INSERT INTO `ep_dropdown_languages_list` (`id`, `name`) VALUES
(1, 'Aboriginal'),
(2, 'Arabic'),
(3, 'Bengali'),
(4, 'Burmese'),
(5, 'Cantonese'),
(6, 'French'),
(7, 'Greek'),
(8, 'Hindi'),
(9, 'Indonesian'),
(10, 'Italian'),
(11, 'Lao'),
(12, 'Lebanese Arabic'),
(13, 'Macedonian'),
(14, 'Malay'),
(15, 'Mandarin'),
(16, 'Oromo'),
(17, 'Punjabi'),
(18, 'Sinhalese'),
(19, 'Spanish'),
(20, 'Swahili'),
(21, 'Tagalog'),
(22, 'Tamil'),
(23, 'Thai'),
(24, 'Vietnamese'),
(25, 'Other');

-- --------------------------------------------------------

--
-- Table structure for table `ep_dropdown_states_list`
--

CREATE TABLE `ep_dropdown_states_list` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ep_dropdown_states_list`
--

INSERT INTO `ep_dropdown_states_list` (`id`, `name`) VALUES
(1, 'NSW'),
(2, 'VIC'),
(3, 'QLD'),
(4, 'WA'),
(5, 'SA'),
(6, 'NT');

-- --------------------------------------------------------

--
-- Table structure for table `ep_jobs`
--

CREATE TABLE `ep_jobs` (
  `id` int(11) NOT NULL,
  `title` text DEFAULT NULL,
  `position` text DEFAULT NULL,
  `timing_ref_id` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `inserted_date` text DEFAULT NULL,
  `inserted_time` text DEFAULT NULL,
  `inserted_by` text DEFAULT NULL,
  `updated_date` text DEFAULT NULL,
  `updated_time` text DEFAULT NULL,
  `updated_by` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ep_jobs`
--

INSERT INTO `ep_jobs` (`id`, `title`, `position`, `timing_ref_id`, `description`, `status`, `inserted_date`, `inserted_time`, `inserted_by`, `updated_date`, `updated_time`, `updated_by`) VALUES
(1, 'Sasdfasdf', 'asdfasdf', '1', 'asfsadf', 'active', '2021-12-31', '02:50:04 AM', '1', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ep_public_holidays_aust`
--

CREATE TABLE `ep_public_holidays_aust` (
  `id` int(11) NOT NULL,
  `date` text DEFAULT NULL,
  `name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ep_public_holidays_aust`
--

INSERT INTO `ep_public_holidays_aust` (`id`, `date`, `name`) VALUES
(1, '1 Jan', 'New Year\'s Day'),
(2, '26 Jan', 'Australia Day'),
(3, '8 Mar', 'Labour Day'),
(4, '2 Apr', 'Good Friday'),
(5, '3 Apr', 'Saturday before Easter Sunday'),
(6, '4 Apr', 'Easter Sunday'),
(7, '5 Apr', 'Easter Monday'),
(8, '25 Apr', 'Anzac Day'),
(9, '14 Jun', 'Queen\'s Birthday'),
(10, '2 Nov', 'Melbourne Cup'),
(11, '25 Dec', 'Christmas Day'),
(12, '26 Dec', 'Boxing Day'),
(13, '27 Dec', 'Additional public holiday for Christmas Day'),
(14, '28 Dec', 'Additional public holiday for Boxing Day');

-- --------------------------------------------------------

--
-- Table structure for table `ep_report_column_preset_data`
--

CREATE TABLE `ep_report_column_preset_data` (
  `id` int(11) NOT NULL,
  `preset_name` text DEFAULT NULL,
  `report_title_ref_id` text DEFAULT NULL,
  `columnRefIds` text DEFAULT NULL,
  `columnWidths` text DEFAULT NULL,
  `columnAlign` text DEFAULT NULL,
  `inserted_date` text DEFAULT NULL,
  `inserted_time` text DEFAULT NULL,
  `inserted_by` text DEFAULT NULL,
  `updated_date` text DEFAULT NULL,
  `updated_time` text DEFAULT NULL,
  `updated_by` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ep_report_column_preset_data`
--

INSERT INTO `ep_report_column_preset_data` (`id`, `preset_name`, `report_title_ref_id`, `columnRefIds`, `columnWidths`, `columnAlign`, `inserted_date`, `inserted_time`, `inserted_by`, `updated_date`, `updated_time`, `updated_by`) VALUES
(9, 'This is preset # 1', '1', '0,1,4,5,6,11,131', '10%,10%,10%,10%,10%,10%,40%', 'left,left,left,left,left,left,left', '2021-12-09', '10:51:26 PM', '1', '2021-12-10', '01:13:35 AM', '1');

-- --------------------------------------------------------

--
-- Table structure for table `ep_report_column_preset_title`
--

CREATE TABLE `ep_report_column_preset_title` (
  `id` int(11) NOT NULL,
  `report_title` text DEFAULT NULL,
  `report_main_table` text DEFAULT NULL,
  `date_col_name` text DEFAULT NULL,
  `possible_status` text DEFAULT NULL,
  `where_condition` text DEFAULT NULL,
  `col_data` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ep_report_column_preset_title`
--

INSERT INTO `ep_report_column_preset_title` (`id`, `report_title`, `report_main_table`, `date_col_name`, `possible_status`, `where_condition`, `col_data`) VALUES
(1, 'Client List', 'ep_client_form', 'inserted_date', '[{\"value\":\"active\",\"label\":\"Active\"},{\"value\":\"in_active\",\"label\":\"In Active\"}]', NULL, '[{ \"value\": \"0\", \"label\": \"Sr\", \"colName\": \"key\", \"sortType\": \"number\", \"type\": \"mutual\" },\r\n  { \"value\": \"1\", \"label\": \"Full Name\", \"colName\": \"full_name\", \"sortType\": \"string\", \"status\": \"empty\", \"requiredCol\": [\"first_name\", \"last_name\"], \"type\": \"mutual\" },\r\n  { \"value\": \"2\", \"label\": \"First Name\", \"colName\": \"first_name\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"3\", \"label\": \"Last Name\", \"colName\": \"last_name\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"4\", \"label\": \"Date of Birth\", \"colName\": \"dateOfBirth\", \"sortType\": \"date\", \"type\": \"mutual\" },\r\n  { \"value\": \"5\", \"label\": \"Place of Birth\", \"colName\": \"bornCountry\", \"sortType\": \"string\", \"status\": \"leftJoin\", \"leftJoinData\": [\"name\", \"ep_dropdown_country_list\"], \"type\": \"mutual\" },\r\n  { \"value\": \"6\", \"label\": \"Gender\", \"colName\": \"gender\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"7\", \"label\": \"Preferred Language\", \"colName\": \"prefered_lang\", \"sortType\": \"string\", \"type\": \"main\" },\r\n  { \"value\": \"8\", \"label\": \"Interpreter Required?\", \"colName\": \"interpreterReq\", \"sortType\": \"string\", \"type\": \"main\" },\r\n  { \"value\": \"9\", \"label\": \"NDIS Number\", \"colName\": \"ndisNumber\", \"sortType\": \"string\", \"type\": \"mobile\" },\r\n  { \"value\": \"10\", \"label\": \"Street Address\", \"colName\": \"street_address\", \"sortType\": \"string\", \"type\": \"mobile\" },\r\n  { \"value\": \"11\", \"label\": \"Suburb\", \"colName\": \"suburb\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"12\", \"label\": \"State\", \"colName\": \"state\", \"sortType\": \"string\", \"status\": \"leftJoin\", \"leftJoinData\": [\"name\", \"ep_dropdown_states_list\"], \"type\": \"mutual\" },\r\n  { \"value\": \"13\", \"label\": \"Post Code\", \"colName\": \"postCode\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"14\", \"label\": \"Email\", \"colName\": \"email\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"15\", \"label\": \"Contact Number\", \"colName\": \"contactNumber\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"16\", \"label\": \"NDIS Plan Date\", \"colName\": \"ndisPlanDate\", \"sortType\": \"date\", \"type\": \"mutual\" },\r\n  { \"value\": \"17\", \"label\": \"NDIS End Date\", \"colName\": \"ndisEndDate\", \"sortType\": \"date\", \"type\": \"main\" },\r\n  { \"value\": \"18\", \"label\": \"Plan Manager Name\", \"colName\": \"planMangName\", \"sortType\": \"string\", \"type\": \"main\" },\r\n  { \"value\": \"19\", \"label\": \"Plan Manager Contact Number\", \"colName\": \"planMangNumber\", \"sortType\": \"string\", \"type\": \"main\" },\r\n  { \"value\": \"20\", \"label\": \"Plan Manager Email\", \"colName\": \"planMangEmail\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"21\", \"label\": \"Emergency Contact Person Name\", \"colName\": \"emConPersonName\", \"sortType\": \"string\", \"status\": \"leftJoin\", \"leftJoinData\": [\"name\", \"bi_dropdown_list\"], \"type\": \"mutual\" },\r\n  { \"value\": \"22\", \"label\": \"Relationship to NDIS participant\", \"colName\": \"relationToParti\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"23\", \"label\": \"Contact Person Number\", \"colName\": \"emContPersonNumber\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"24\", \"label\": \"Living Arrangement\", \"colName\": \"livingArrang\", \"sortType\": \"string\", \"status\": \"leftJoin\", \"leftJoinData\": [\"packing_title\", \"bi_list_packing\"], \"type\": \"main\" },\r\n  { \"value\": \"25\", \"label\": \"Living Arrangement Other\", \"colName\": \"livingArrangOther\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"26\", \"label\": \"Guardian Name\", \"colName\": \"guardianName\", \"sortType\": \"string\", \"type\": \"main\" },\r\n  { \"value\": \"27\", \"label\": \"Guardian DOB\", \"colName\": \"guardianDOB\", \"sortType\": \"date\", \"type\": \"mutual\" },\r\n  { \"value\": \"28\", \"label\": \"Guardian Home Phone\", \"colName\": \"guardianHomePhone\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"29\", \"label\": \"Guardian Mobile Phone\", \"colName\": \"guardianMobNumber\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"30\", \"label\": \"Guardian Work Phone\", \"colName\": \"guardianWorkPhone\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"31\", \"label\": \"Guardian Email\", \"colName\": \"guardianEmail\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"32\", \"label\": \"Guardian Street Address\", \"colName\": \"guardianAddress\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"33\", \"label\": \"Guardian Suburb\", \"colName\": \"guardianSubrub\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"34\", \"label\": \"Guardian State\", \"colName\": \"guardianState\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"35\", \"label\": \"Guardian Post Code\", \"colName\": \"guardianPostcode\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"36\", \"label\": \"Referral Name\", \"colName\": \"makeRefName\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"37\", \"label\": \"Referral Organization\", \"colName\": \"makeRefOrg\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"38\", \"label\": \"Referral Position\", \"colName\": \"makeRefPosition\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"39\", \"label\": \"Referral Email\", \"colName\": \"makeRefEmail\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"40\", \"label\": \"Referral Street Address\", \"colName\": \"makeRefAddress\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"41\", \"label\": \"Referral Subrub\", \"colName\": \"statmakeRefSubrubus\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"42\", \"label\": \"Referral State\", \"colName\": \"makeRefState\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"43\", \"label\": \"Referral Postcode\", \"colName\": \"makeRefPostCode\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"44\", \"label\": \"Referral Phone\", \"colName\": \"makeRefPhone\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"45\", \"label\": \"Primary Diagnosis\", \"colName\": \"primaryDiagnos\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"46\", \"label\": \"Secondary Diagnosis\", \"colName\": \"secondaryDiagnos\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"47\", \"label\": \"Services\", \"colName\": \"services_ref_ids\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"48\", \"label\": \"Any risk of self-harm identified\", \"colName\": \"anyRisk\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"49\", \"label\": \"Any risk of self-harm identified - Please specify\", \"colName\": \"anyRiskSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"50\", \"label\": \"Harm from others Identified\", \"colName\": \"harmFromOther\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"51\", \"label\": \"Harm from others Identified - Please specify\", \"colName\": \"harmFromOtherSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"52\", \"label\": \"Harm to others identified\", \"colName\": \"harmToOther\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"53\", \"label\": \"Harm to others identified - Please specify\", \"colName\": \"harmToOtherSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"54\", \"label\": \"Any pets on the property\", \"colName\": \"anyPet\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"55\", \"label\": \"Any pets on the property - Please specify\", \"colName\": \"anyPetSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"56\", \"label\": \"Any firearms being stored in the property\", \"colName\": \"anyFireamers\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"57\", \"label\": \"Any firearms being stored in the property - Please specify\", \"colName\": \"anyFireamersSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"58\", \"label\": \"Any history or current of people using alcohol or drugs at the property\", \"colName\": \"anyDrugHistory\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"59\", \"label\": \"Any history or current of people using alcohol or drugs at the property - Please specify\", \"colName\": \"anyDrugHistorySpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"60\", \"label\": \"Any risk that support staff need to know\", \"colName\": \"anyRishToKnow\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"61\", \"label\": \"Any risk that support staff need to know - Please specify\", \"colName\": \"anyRishToKnowSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"62\", \"label\": \"Date of Referral\", \"colName\": \"dateOfRef\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"63\", \"label\": \"Hearing OK\", \"colName\": \"hearing\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"64\", \"label\": \"Hearing OK - Hazards identified & actions\", \"colName\": \"hearingSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"65\", \"label\": \"Speech OK\", \"colName\": \"speech\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"66\", \"label\": \"Speech OK - Hazards identified & actions\", \"colName\": \"speechSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"67\", \"label\": \"Able to write\", \"colName\": \"ableToWrite\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"68\", \"label\": \"Able to write - Hazards identified & actions\", \"colName\": \"ableToWriteSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"69\", \"label\": \"English language skills\", \"colName\": \"englishSkill\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"70\", \"label\": \"English language skills - Hazards identified & actions\", \"colName\": \"englishSkillSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"71\", \"label\": \"Willing to participate and assist in care\", \"colName\": \"willingToParticipate\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"72\", \"label\": \"willing to participate and assist in care - Hazards identified & actions\", \"colName\": \"willingToParticipateSpecity\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"73\", \"label\": \"Oriented in time and place\", \"colName\": \"orientation\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"74\", \"label\": \"Oriented in time and place - Hazards identified & actions\", \"colName\": \"orientationSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"75\", \"label\": \"Able to accept direction and instruction\", \"colName\": \"acceptDiraction\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"76\", \"label\": \"Able to accept direction and instruction - Hazards identified & actions\", \"colName\": \"acceptDiractionSpecific\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"77\", \"label\": \"Short-term memory issues\", \"colName\": \"shortMemory\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"78\", \"label\": \"Short-term memory issues - Hazards identified & actions\", \"colName\": \"shortMemorySpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"79\", \"label\": \"Walk unaided\", \"colName\": \"walkUnaided\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"80\", \"label\": \"Walk unaided - Hazards identified & actions\", \"colName\": \"walkUnaidedSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"81\", \"label\": \"Manages stairs unaided\", \"colName\": \"managesStairs\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"82\", \"label\": \"Manages stairs unaided - Hazards identified & actions\", \"colName\": \"managesStairsSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"83\", \"label\": \"Uses walking aid to walk\", \"colName\": \"usesWalkingAid\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"84\", \"label\": \"Uses walking aid to walk - Hazards identified & actions\", \"colName\": \"usesWalkingAidSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"85\", \"label\": \"Uses self-propelled wheelchairUses self-propelled wheelchair\", \"colName\": \"wheelshair\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"86\", \"label\": \"Uses self-propelled wheelchair - Hazards identified & actions\", \"colName\": \"wheelshairSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"87\", \"label\": \"Uses electric wheelchair/ scooter\", \"colName\": \"usesElecWheelChair\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"88\", \"label\": \"Uses electric wheelchair/ scooter - Hazards identified & actions\", \"colName\": \"usesElecWheelChairSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"89\", \"label\": \"Transfers independently\", \"colName\": \"transferIndep\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"90\", \"label\": \"Transfers independently - Hazards identified & actions\", \"colName\": \"transferIndepSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"91\", \"label\": \"Transfers with supervision\", \"colName\": \"transferWithSuper\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"92\", \"label\": \"Transfers with supervision - Hazards identified & actions\", \"colName\": \"transferWithSuperSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"93\", \"label\": \"Transfers with hoist\", \"colName\": \"transferWithHoist\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"94\", \"label\": \"Transfers with hoist - Hazards identified & actions\", \"colName\": \"transferWithHoistSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"95\", \"label\": \"Bed mobility\", \"colName\": \"bedMobility\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"96\", \"label\": \"Bed mobility - Hazards identified & actions\", \"colName\": \"bedMobilitySpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"97\", \"label\": \"Showering\", \"colName\": \"showering\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"98\", \"label\": \"Showering - Hazards identified & actions\", \"colName\": \"showeringSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"99\", \"label\": \"Toileting\", \"colName\": \"toileting\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"100\", \"label\": \"Toileting - Hazards identified & actions\", \"colName\": \"toiletingSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"101\", \"label\": \"Grooming\", \"colName\": \"grooming\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"102\", \"label\": \"Grooming - Hazards identified & actions\", \"colName\": \"groomingSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"103\", \"label\": \"Repositioning in bed\", \"colName\": \"repoInBed\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"104\", \"label\": \"Repositioning in bed - Hazards identified & actions\", \"colName\": \"repoInBedSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"105\", \"label\": \"Repositioning in chair\", \"colName\": \"repoInChair\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"106\", \"label\": \"Repositioning in chair - Hazards identified & actions\", \"colName\": \"repoInChairSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"107\", \"label\": \"Mouth care\", \"colName\": \"mouthCare\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"108\", \"label\": \"Mouth care - Hazards identified & actions\", \"colName\": \"mouthCareSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"109\", \"label\": \"Eating\", \"colName\": \"eating\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"110\", \"label\": \"Eating - Hazards identified & actions\", \"colName\": \"eatingSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"111\", \"label\": \"Skin care\", \"colName\": \"skinCare\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"112\", \"label\": \"Skin care - Hazards identified & actions\", \"colName\": \"skinCareSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"113\", \"label\": \"Physical aggression to support worker\", \"colName\": \"phyAggToSp\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"114\", \"label\": \"Physical aggression to support worker - Hazards identified & actions\", \"colName\": \"phyAggToSpSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"115\", \"label\": \"Verbal aggression to support worker\", \"colName\": \"status\", \"verAggToSp\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"116\", \"label\": \"Verbal aggression to support worker - Hazards identified & actions\", \"colName\": \"verAggToSpSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"117\", \"label\": \"Aggression to other clients\", \"colName\": \"aggToClients\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"118\", \"label\": \"Aggression to other clients - Hazards identified & actions\", \"colName\": \"aggToClientsSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"119\", \"label\": \"Aggression with/against objects\", \"colName\": \"aggWithObjects\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"120\", \"label\": \"Aggression with/against objects - Hazards identified & actions\", \"colName\": \"aggWithObjectsSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"121\", \"label\": \"Self-harm\", \"colName\": \"selfHarm\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"122\", \"label\": \"Self-harm - Hazards identified & actions\", \"colName\": \"selfHarmSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"123\", \"label\": \"Substance abuse\", \"colName\": \"subAbuse\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"124\", \"label\": \"Substance abuse - Hazards identified & actions\", \"colName\": \"subAbuseSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"125\", \"label\": \"Sexual abuse\", \"colName\": \"sexualAbuse\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"126\", \"label\": \"Sexual abuse - Hazards identified & actions\", \"colName\": \"sexualAbuseSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"127\", \"label\": \"Threats to staff in any way\", \"colName\": \"threatsToStaff\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"128\", \"label\": \"Threats to staff in any way - Hazards identified & actions\", \"colName\": \"threatsToStaffSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"129\", \"label\": \"Use of emotions to achieve goals\", \"colName\": \"useEmotionToAcGols\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"130\", \"label\": \"Use of emotions to achieve goals - Hazards identified & actions\", \"colName\": \"useEmotionToAcGolsSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"131\", \"label\": \"Status\", \"colName\": \"status\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"132\", \"label\": \"Inserted Date & Time\", \"colName\": \"inserted_date_time\", \"sortType\": \"date\", \"status\": \"empty\", \"requiredCol\": [\"inserted_date\", \"inserted_time\"], \"type\": \"mutual\" },\r\n  { \"value\": \"133\", \"label\": \"Inserted Date\", \"colName\": \"inserted_date\", \"sortType\": \"date\", \"type\": \"mutual\" },\r\n  { \"value\": \"134\", \"label\": \"Inserted Time\", \"colName\": \"inserted_time\", \"sortType\": \"number\", \"type\": \"mutual\" },\r\n  { \"value\": \"135\", \"label\": \"Inserted By\", \"colName\": \"inserted_by\", \"sortType\": \"string\", \"status\": \"leftJoin\", \"leftJoinData\": [\"first_name,last_name\", \"bi_users\"], \"type\": \"mutual\" },\r\n  { \"value\": \"136\", \"label\": \"Updated Date & Time\", \"colName\": \"updated_date_time\", \"sortType\": \"date\", \"status\": \"empty\", \"requiredCol\": [\"updated_date\", \"updated_time\"], \"type\": \"mutual\" },\r\n  { \"value\": \"137\", \"label\": \"Updated Date\", \"colName\": \"updated_date\", \"sortType\": \"date\", \"type\": \"mutual\" },\r\n  { \"value\": \"138\", \"label\": \"Updated Time\", \"colName\": \"updated_time\", \"sortType\": \"number\", \"type\": \"mutual\" },\r\n  { \"value\": \"139\", \"label\": \"Updated By\", \"colName\": \"updated_by\", \"sortType\": \"string\", \"status\": \"leftJoin\", \"leftJoinData\": [\"first_name,last_name\", \"bi_users\"], \"type\": \"mutual\" }]'),
(3, 'Support Worker List', 'ep_support_worker_form', 'inserted_date', '[{ \"value\": \"1\", \"label\": \"Applied\" },\r\n  { \"value\": \"2\", \"label\": \"Shortlisted\" },\r\n  { \"value\": \"3\", \"label\": \"Contacted\" },\r\n  { \"value\": \"4\", \"label\": \"Interviewed\" },\r\n  { \"value\": \"5\", \"label\": \"Hired\" },\r\n  { \"value\": \"6\", \"label\": \"Rejected\" },\r\n  { \"value\": \"7\", \"label\": \"On-Hold\" },\r\n  { \"value\": \"8\", \"label\": \"Delete\" }]', NULL, '[{ \"value\": \"0\", \"label\": \"Sr\", \"colName\": \"key\", \"sortType\": \"number\", \"type\": \"mutual\" },\r\n  { \"value\": \"1\", \"label\": \"Full Name\", \"colName\": \"full_name\", \"sortType\": \"string\", \"status\": \"empty\", \"requiredCol\": [\"first_name\", \"last_name\"], \"type\": \"mutual\" },\r\n  { \"value\": \"2\", \"label\": \"First Name\", \"colName\": \"first_name\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"3\", \"label\": \"Last Name\", \"colName\": \"last_name\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"4\", \"label\": \"Date of Birth\", \"colName\": \"dateOfBirth\", \"sortType\": \"date\", \"type\": \"mutual\" },\r\n  { \"value\": \"5\", \"label\": \"Place of Birth\", \"colName\": \"bornCountry\", \"sortType\": \"string\", \"status\": \"leftJoin\", \"leftJoinData\": [\"name\", \"ep_dropdown_country_list\"], \"type\": \"mutual\" },\r\n  { \"value\": \"6\", \"label\": \"Gender\", \"colName\": \"gender\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"7\", \"label\": \"Preferred Language\", \"colName\": \"prefered_lang\", \"sortType\": \"string\", \"type\": \"main\" },\r\n  { \"value\": \"8\", \"label\": \"Interpreter Required?\", \"colName\": \"interpreterReq\", \"sortType\": \"string\", \"type\": \"main\" },\r\n  { \"value\": \"9\", \"label\": \"NDIS Number\", \"colName\": \"ndisNumber\", \"sortType\": \"string\", \"type\": \"mobile\" },\r\n  { \"value\": \"10\", \"label\": \"Street Address\", \"colName\": \"street_address\", \"sortType\": \"string\", \"type\": \"mobile\" },\r\n  { \"value\": \"11\", \"label\": \"Suburb\", \"colName\": \"suburb\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"12\", \"label\": \"State\", \"colName\": \"state\", \"sortType\": \"string\", \"status\": \"leftJoin\", \"leftJoinData\": [\"name\", \"ep_dropdown_states_list\"], \"type\": \"mutual\" },\r\n  { \"value\": \"13\", \"label\": \"Post Code\", \"colName\": \"postCode\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"14\", \"label\": \"Email\", \"colName\": \"email\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"15\", \"label\": \"Contact Number\", \"colName\": \"contactNumber\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"16\", \"label\": \"NDIS Plan Date\", \"colName\": \"ndisPlanDate\", \"sortType\": \"date\", \"type\": \"mutual\" },\r\n  { \"value\": \"17\", \"label\": \"NDIS End Date\", \"colName\": \"ndisEndDate\", \"sortType\": \"date\", \"type\": \"main\" },\r\n  { \"value\": \"18\", \"label\": \"Plan Manager Name\", \"colName\": \"planMangName\", \"sortType\": \"string\", \"type\": \"main\" },\r\n  { \"value\": \"19\", \"label\": \"Plan Manager Contact Number\", \"colName\": \"planMangNumber\", \"sortType\": \"string\", \"type\": \"main\" },\r\n  { \"value\": \"20\", \"label\": \"Plan Manager Email\", \"colName\": \"planMangEmail\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"21\", \"label\": \"Emergency Contact Person Name\", \"colName\": \"emConPersonName\", \"sortType\": \"string\", \"status\": \"leftJoin\", \"leftJoinData\": [\"name\", \"bi_dropdown_list\"], \"type\": \"mutual\" },\r\n  { \"value\": \"22\", \"label\": \"Relationship to NDIS participant\", \"colName\": \"relationToParti\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"23\", \"label\": \"Contact Person Number\", \"colName\": \"emContPersonNumber\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"24\", \"label\": \"Living Arrangement\", \"colName\": \"livingArrang\", \"sortType\": \"string\", \"status\": \"leftJoin\", \"leftJoinData\": [\"packing_title\", \"bi_list_packing\"], \"type\": \"main\" },\r\n  { \"value\": \"25\", \"label\": \"Living Arrangement Other\", \"colName\": \"livingArrangOther\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"26\", \"label\": \"Guardian Name\", \"colName\": \"guardianName\", \"sortType\": \"string\", \"type\": \"main\" },\r\n  { \"value\": \"27\", \"label\": \"Guardian DOB\", \"colName\": \"guardianDOB\", \"sortType\": \"date\", \"type\": \"mutual\" },\r\n  { \"value\": \"28\", \"label\": \"Guardian Home Phone\", \"colName\": \"guardianHomePhone\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"29\", \"label\": \"Guardian Mobile Phone\", \"colName\": \"guardianMobNumber\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"30\", \"label\": \"Guardian Work Phone\", \"colName\": \"guardianWorkPhone\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"31\", \"label\": \"Guardian Email\", \"colName\": \"guardianEmail\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"32\", \"label\": \"Guardian Street Address\", \"colName\": \"guardianAddress\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"33\", \"label\": \"Guardian Suburb\", \"colName\": \"guardianSubrub\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"34\", \"label\": \"Guardian State\", \"colName\": \"guardianState\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"35\", \"label\": \"Guardian Post Code\", \"colName\": \"guardianPostcode\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"36\", \"label\": \"Referral Name\", \"colName\": \"makeRefName\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"37\", \"label\": \"Referral Organization\", \"colName\": \"makeRefOrg\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"38\", \"label\": \"Referral Position\", \"colName\": \"makeRefPosition\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"39\", \"label\": \"Referral Email\", \"colName\": \"makeRefEmail\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"40\", \"label\": \"Referral Street Address\", \"colName\": \"makeRefAddress\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"41\", \"label\": \"Referral Subrub\", \"colName\": \"statmakeRefSubrubus\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"42\", \"label\": \"Referral State\", \"colName\": \"makeRefState\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"43\", \"label\": \"Referral Postcode\", \"colName\": \"makeRefPostCode\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"44\", \"label\": \"Referral Phone\", \"colName\": \"makeRefPhone\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"45\", \"label\": \"Primary Diagnosis\", \"colName\": \"primaryDiagnos\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"46\", \"label\": \"Secondary Diagnosis\", \"colName\": \"secondaryDiagnos\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"47\", \"label\": \"Services\", \"colName\": \"services_ref_ids\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"48\", \"label\": \"Any risk of self-harm identified\", \"colName\": \"anyRisk\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"49\", \"label\": \"Any risk of self-harm identified - Please specify\", \"colName\": \"anyRiskSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"50\", \"label\": \"Harm from others Identified\", \"colName\": \"harmFromOther\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"51\", \"label\": \"Harm from others Identified - Please specify\", \"colName\": \"harmFromOtherSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"52\", \"label\": \"Harm to others identified\", \"colName\": \"harmToOther\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"53\", \"label\": \"Harm to others identified - Please specify\", \"colName\": \"harmToOtherSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"54\", \"label\": \"Any pets on the property\", \"colName\": \"anyPet\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"55\", \"label\": \"Any pets on the property - Please specify\", \"colName\": \"anyPetSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"56\", \"label\": \"Any firearms being stored in the property\", \"colName\": \"anyFireamers\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"57\", \"label\": \"Any firearms being stored in the property - Please specify\", \"colName\": \"anyFireamersSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"58\", \"label\": \"Any history or current of people using alcohol or drugs at the property\", \"colName\": \"anyDrugHistory\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"59\", \"label\": \"Any history or current of people using alcohol or drugs at the property - Please specify\", \"colName\": \"anyDrugHistorySpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"60\", \"label\": \"Any risk that support staff need to know\", \"colName\": \"anyRishToKnow\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"61\", \"label\": \"Any risk that support staff need to know - Please specify\", \"colName\": \"anyRishToKnowSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"62\", \"label\": \"Date of Referral\", \"colName\": \"dateOfRef\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"63\", \"label\": \"Hearing OK\", \"colName\": \"hearing\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"64\", \"label\": \"Hearing OK - Hazards identified & actions\", \"colName\": \"hearingSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"65\", \"label\": \"Speech OK\", \"colName\": \"speech\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"66\", \"label\": \"Speech OK - Hazards identified & actions\", \"colName\": \"speechSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"67\", \"label\": \"Able to write\", \"colName\": \"ableToWrite\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"68\", \"label\": \"Able to write - Hazards identified & actions\", \"colName\": \"ableToWriteSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"69\", \"label\": \"English language skills\", \"colName\": \"englishSkill\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"70\", \"label\": \"English language skills - Hazards identified & actions\", \"colName\": \"englishSkillSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"71\", \"label\": \"Willing to participate and assist in care\", \"colName\": \"willingToParticipate\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"72\", \"label\": \"willing to participate and assist in care - Hazards identified & actions\", \"colName\": \"willingToParticipateSpecity\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"73\", \"label\": \"Oriented in time and place\", \"colName\": \"orientation\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"74\", \"label\": \"Oriented in time and place - Hazards identified & actions\", \"colName\": \"orientationSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"75\", \"label\": \"Able to accept direction and instruction\", \"colName\": \"acceptDiraction\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"76\", \"label\": \"Able to accept direction and instruction - Hazards identified & actions\", \"colName\": \"acceptDiractionSpecific\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"77\", \"label\": \"Short-term memory issues\", \"colName\": \"shortMemory\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"78\", \"label\": \"Short-term memory issues - Hazards identified & actions\", \"colName\": \"shortMemorySpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"79\", \"label\": \"Walk unaided\", \"colName\": \"walkUnaided\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"80\", \"label\": \"Walk unaided - Hazards identified & actions\", \"colName\": \"walkUnaidedSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"81\", \"label\": \"Manages stairs unaided\", \"colName\": \"managesStairs\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"82\", \"label\": \"Manages stairs unaided - Hazards identified & actions\", \"colName\": \"managesStairsSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"83\", \"label\": \"Uses walking aid to walk\", \"colName\": \"usesWalkingAid\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"84\", \"label\": \"Uses walking aid to walk - Hazards identified & actions\", \"colName\": \"usesWalkingAidSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"85\", \"label\": \"Uses self-propelled wheelchairUses self-propelled wheelchair\", \"colName\": \"wheelshair\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"86\", \"label\": \"Uses self-propelled wheelchair - Hazards identified & actions\", \"colName\": \"wheelshairSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"87\", \"label\": \"Uses electric wheelchair/ scooter\", \"colName\": \"usesElecWheelChair\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"88\", \"label\": \"Uses electric wheelchair/ scooter - Hazards identified & actions\", \"colName\": \"usesElecWheelChairSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"89\", \"label\": \"Transfers independently\", \"colName\": \"transferIndep\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"90\", \"label\": \"Transfers independently - Hazards identified & actions\", \"colName\": \"transferIndepSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"91\", \"label\": \"Transfers with supervision\", \"colName\": \"transferWithSuper\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"92\", \"label\": \"Transfers with supervision - Hazards identified & actions\", \"colName\": \"transferWithSuperSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"93\", \"label\": \"Transfers with hoist\", \"colName\": \"transferWithHoist\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"94\", \"label\": \"Transfers with hoist - Hazards identified & actions\", \"colName\": \"transferWithHoistSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"95\", \"label\": \"Bed mobility\", \"colName\": \"bedMobility\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"96\", \"label\": \"Bed mobility - Hazards identified & actions\", \"colName\": \"bedMobilitySpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"97\", \"label\": \"Showering\", \"colName\": \"showering\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"98\", \"label\": \"Showering - Hazards identified & actions\", \"colName\": \"showeringSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"99\", \"label\": \"Toileting\", \"colName\": \"toileting\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"100\", \"label\": \"Toileting - Hazards identified & actions\", \"colName\": \"toiletingSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"101\", \"label\": \"Grooming\", \"colName\": \"grooming\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"102\", \"label\": \"Grooming - Hazards identified & actions\", \"colName\": \"groomingSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"103\", \"label\": \"Repositioning in bed\", \"colName\": \"repoInBed\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"104\", \"label\": \"Repositioning in bed - Hazards identified & actions\", \"colName\": \"repoInBedSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"105\", \"label\": \"Repositioning in chair\", \"colName\": \"repoInChair\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"106\", \"label\": \"Repositioning in chair - Hazards identified & actions\", \"colName\": \"repoInChairSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"107\", \"label\": \"Mouth care\", \"colName\": \"mouthCare\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"108\", \"label\": \"Mouth care - Hazards identified & actions\", \"colName\": \"mouthCareSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"109\", \"label\": \"Eating\", \"colName\": \"eating\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"110\", \"label\": \"Eating - Hazards identified & actions\", \"colName\": \"eatingSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"111\", \"label\": \"Skin care\", \"colName\": \"skinCare\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"112\", \"label\": \"Skin care - Hazards identified & actions\", \"colName\": \"skinCareSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"113\", \"label\": \"Physical aggression to support worker\", \"colName\": \"phyAggToSp\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"114\", \"label\": \"Physical aggression to support worker - Hazards identified & actions\", \"colName\": \"phyAggToSpSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"115\", \"label\": \"Verbal aggression to support worker\", \"colName\": \"status\", \"verAggToSp\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"116\", \"label\": \"Verbal aggression to support worker - Hazards identified & actions\", \"colName\": \"verAggToSpSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"117\", \"label\": \"Aggression to other clients\", \"colName\": \"aggToClients\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"118\", \"label\": \"Aggression to other clients - Hazards identified & actions\", \"colName\": \"aggToClientsSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"119\", \"label\": \"Aggression with/against objects\", \"colName\": \"aggWithObjects\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"120\", \"label\": \"Aggression with/against objects - Hazards identified & actions\", \"colName\": \"aggWithObjectsSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"121\", \"label\": \"Self-harm\", \"colName\": \"selfHarm\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"122\", \"label\": \"Self-harm - Hazards identified & actions\", \"colName\": \"selfHarmSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"123\", \"label\": \"Substance abuse\", \"colName\": \"subAbuse\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"124\", \"label\": \"Substance abuse - Hazards identified & actions\", \"colName\": \"subAbuseSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"125\", \"label\": \"Sexual abuse\", \"colName\": \"sexualAbuse\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"126\", \"label\": \"Sexual abuse - Hazards identified & actions\", \"colName\": \"sexualAbuseSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"127\", \"label\": \"Threats to staff in any way\", \"colName\": \"threatsToStaff\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"128\", \"label\": \"Threats to staff in any way - Hazards identified & actions\", \"colName\": \"threatsToStaffSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"129\", \"label\": \"Use of emotions to achieve goals\", \"colName\": \"useEmotionToAcGols\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"130\", \"label\": \"Use of emotions to achieve goals - Hazards identified & actions\", \"colName\": \"useEmotionToAcGolsSpecify\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"131\", \"label\": \"Status\", \"colName\": \"status\", \"sortType\": \"string\", \"type\": \"mutual\" },\r\n  { \"value\": \"132\", \"label\": \"Inserted Date & Time\", \"colName\": \"inserted_date_time\", \"sortType\": \"date\", \"status\": \"empty\", \"requiredCol\": [\"inserted_date\", \"inserted_time\"], \"type\": \"mutual\" },\r\n  { \"value\": \"133\", \"label\": \"Inserted Date\", \"colName\": \"inserted_date\", \"sortType\": \"date\", \"type\": \"mutual\" },\r\n  { \"value\": \"134\", \"label\": \"Inserted Time\", \"colName\": \"inserted_time\", \"sortType\": \"number\", \"type\": \"mutual\" },\r\n  { \"value\": \"135\", \"label\": \"Inserted By\", \"colName\": \"inserted_by\", \"sortType\": \"string\", \"status\": \"leftJoin\", \"leftJoinData\": [\"first_name,last_name\", \"bi_users\"], \"type\": \"mutual\" },\r\n  { \"value\": \"136\", \"label\": \"Updated Date & Time\", \"colName\": \"updated_date_time\", \"sortType\": \"date\", \"status\": \"empty\", \"requiredCol\": [\"updated_date\", \"updated_time\"], \"type\": \"mutual\" },\r\n  { \"value\": \"137\", \"label\": \"Updated Date\", \"colName\": \"updated_date\", \"sortType\": \"date\", \"type\": \"mutual\" },\r\n  { \"value\": \"138\", \"label\": \"Updated Time\", \"colName\": \"updated_time\", \"sortType\": \"number\", \"type\": \"mutual\" },\r\n  { \"value\": \"139\", \"label\": \"Updated By\", \"colName\": \"updated_by\", \"sortType\": \"string\", \"status\": \"leftJoin\", \"leftJoinData\": [\"first_name,last_name\", \"bi_users\"], \"type\": \"mutual\" }]');

-- --------------------------------------------------------

--
-- Table structure for table `ep_service_list`
--

CREATE TABLE `ep_service_list` (
  `id` int(11) NOT NULL,
  `code` text DEFAULT NULL,
  `name` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `inserted_date` text DEFAULT NULL,
  `inserted_time` text DEFAULT NULL,
  `inserted_by` text DEFAULT NULL,
  `updated_date` text DEFAULT NULL,
  `updated_time` text DEFAULT NULL,
  `updated_by` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ep_service_list`
--

INSERT INTO `ep_service_list` (`id`, `code`, `name`, `status`, `inserted_date`, `inserted_time`, `inserted_by`, `updated_date`, `updated_time`, `updated_by`) VALUES
(1, '0107', 'Assist-Personal Activities', 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(2, '0114', 'Community Nursing Care', 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(3, '0116', 'Innovative Community Participation', 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(4, '0120', 'Household Tasks', 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(5, '0125', 'Participate Community', 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(6, '0136', 'Group/Centre Activities', 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(7, '0128', 'Therapeutic Supports', 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(8, '0121', 'Interpret/Translate', 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(9, '001', 'Office Support', 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(10, '002', 'Admin Support', 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(11, '003', 'Accounting Support', 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(12, '004', 'IT & Marketing Support', 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(13, '005', 'Office Cleaning', 'active', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ep_service_plaining`
--

CREATE TABLE `ep_service_plaining` (
  `id` int(11) NOT NULL,
  `plaining_type` text DEFAULT NULL,
  `client_ref_id` text DEFAULT NULL,
  `service_ref_id` text DEFAULT NULL,
  `spw_ref_id` text DEFAULT NULL,
  `spw_partner_ref_id` text DEFAULT NULL,
  `frequency` text DEFAULT NULL,
  `service_day` text DEFAULT NULL,
  `service_date` text DEFAULT NULL,
  `service_start_time` text DEFAULT NULL,
  `service_end_time` text DEFAULT NULL,
  `meal_break_min` text DEFAULT NULL,
  `rest_break_min` text DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `emailStatus` text DEFAULT NULL,
  `last_done` text DEFAULT NULL,
  `inserted_date` text DEFAULT NULL,
  `inserted_time` text DEFAULT NULL,
  `inserted_by` text DEFAULT NULL,
  `updated_date` text DEFAULT NULL,
  `updated_time` text DEFAULT NULL,
  `updated_by` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ep_service_plaining`
--

INSERT INTO `ep_service_plaining` (`id`, `plaining_type`, `client_ref_id`, `service_ref_id`, `spw_ref_id`, `spw_partner_ref_id`, `frequency`, `service_day`, `service_date`, `service_start_time`, `service_end_time`, `meal_break_min`, `rest_break_min`, `remarks`, `status`, `emailStatus`, `last_done`, `inserted_date`, `inserted_time`, `inserted_by`, `updated_date`, `updated_time`, `updated_by`) VALUES
(1, '1', '101', '5', '193', '', 'Weekly', 'Friday', '', '06:00 PM', '10:30 PM', '', '', 'Further description will be provided by Ainan.', 'approve', 'true', '2021-11-26', '2021-11-08', '10:31:41 AM', '1', '2021-11-26', '07:52:47 PM', '43'),
(2, '1', '109', '5', '193', '', 'Weekly', 'Sunday', '', '12:00 PM', '10:00 PM', '', '', 'Community Participation', 'approve', 'true', NULL, '2021-11-08', '10:34:14 AM', '1', '2021-11-26', '07:27:13 PM', '1'),
(3, '1', '102', '5', '193', '', 'Weekly', 'Friday', '', '06:00 PM', '10:00 PM', '12', '5', 'd fasf', 'approve', 'true', NULL, '2021-11-17', '03:33:57 AM', '1', '2021-11-26', '07:22:10 PM', '1'),
(4, '1', '103', '5', '193', '', 'Weekly', 'Wednesday', '', '01:00 AM', '04:15 AM', '52', '78', 'hlkjlk', 'unapproved', NULL, NULL, '2021-12-31', '06:37:16 AM', '1', '2022-01-05', '04:41:48 AM', '1'),
(5, '2', '110', '7', '184', '182', 'On Client Request', NULL, '10-01-2022', '10:00 AM', '02:00 PM', '45', '78', 'dfs fa ', 'approve', 'true', NULL, '2022-01-03', '11:13:24 PM', '1', '2022-01-04', '12:07:52 AM', '1');

-- --------------------------------------------------------

--
-- Table structure for table `ep_service_timing`
--

CREATE TABLE `ep_service_timing` (
  `id` int(11) NOT NULL,
  `service_plaining_ref_id` text DEFAULT NULL,
  `service_ref_id` text DEFAULT NULL,
  `client_ref_id` text DEFAULT NULL,
  `spw_ref_id` text DEFAULT NULL,
  `spw2_ref_id` text DEFAULT NULL,
  `service_done_by_spw_ref_id` text DEFAULT NULL,
  `start_time_actual` text DEFAULT NULL,
  `end_time_actual` text DEFAULT NULL,
  `start_time` text DEFAULT NULL,
  `end_time` text DEFAULT NULL,
  `start_time_mod` text DEFAULT NULL,
  `end_time_mod` text DEFAULT NULL,
  `client_timesheet_ref_id` text DEFAULT NULL,
  `employee_timesheet_ref_id` text DEFAULT NULL,
  `timerData` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `inserted_date` text DEFAULT NULL,
  `inserted_time` text DEFAULT NULL,
  `inserted_by` text DEFAULT NULL,
  `updated_date` text DEFAULT NULL,
  `updated_time` text DEFAULT NULL,
  `updated_by` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ep_service_timing`
--

INSERT INTO `ep_service_timing` (`id`, `service_plaining_ref_id`, `service_ref_id`, `client_ref_id`, `spw_ref_id`, `spw2_ref_id`, `service_done_by_spw_ref_id`, `start_time_actual`, `end_time_actual`, `start_time`, `end_time`, `start_time_mod`, `end_time_mod`, `client_timesheet_ref_id`, `employee_timesheet_ref_id`, `timerData`, `status`, `inserted_date`, `inserted_time`, `inserted_by`, `updated_date`, `updated_time`, `updated_by`) VALUES
(1, '3', '5', '16', '193', '', '193', '12:00 AM', '06:00 AM', '03:40:51 AM', '03:41:04 AM', NULL, NULL, NULL, '1', '', 'unapprove', '2022-11-17', '03:40:51 AM', '43', '2021-11-17', '03:41:14 AM', '43'),
(2, '2', '5', '16', '193', '', '193', '12:00 AM', '06:00 AM', '03:41:22 AM', '03:42:31 AM', NULL, NULL, NULL, '1', '', 'unapprove', '2022-09-17', '03:41:22 AM', '43', '2021-11-17', '03:42:40 AM', '43'),
(3, '1', '5', '88', '182', '', '193', '12:00 AM', '06:00 AM', '03:42:52 AM', '03:42:55 AM', NULL, NULL, NULL, '1', '', 'unapprove', '2022-10-17', '03:42:52 AM', '43', '2021-11-17', '03:43:19 AM', '43'),
(4, '3', '5', '20', '193', '', '193', '06:00 PM', '11:00 PM', '05:58:13 PM', '05:58:42 PM', NULL, NULL, NULL, '1', '', 'unapprove', '2022-11-21', '05:58:14 PM', '43', '2021-11-21', '05:58:51 PM', '43'),
(7, '1', '5', '88', '187', '', '193', '06:00 PM', '10:30 PM', '07:51:29 PM', '07:52:38 PM', NULL, NULL, NULL, '1', '', 'unapprove', '2022-10-26', '07:51:29 PM', '43', '2021-11-26', '07:52:47 PM', '43');

-- --------------------------------------------------------

--
-- Table structure for table `ep_support_worker_form`
--

CREATE TABLE `ep_support_worker_form` (
  `id` int(11) NOT NULL,
  `draft_code` text DEFAULT NULL,
  `job_ref_id` text DEFAULT NULL,
  `first_name` text DEFAULT NULL,
  `last_name` text DEFAULT NULL,
  `emergency_mobile` text DEFAULT NULL,
  `emergency_email` text DEFAULT NULL,
  `street_address` text DEFAULT NULL,
  `suburb` text DEFAULT NULL,
  `state` text DEFAULT NULL,
  `postCode` text DEFAULT NULL,
  `country` text DEFAULT NULL,
  `mobile` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `skypeId` text DEFAULT NULL,
  `dateOfBirth` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `profileImg` text DEFAULT NULL,
  `emergency_first_name` text DEFAULT NULL,
  `emergency_last_name` text DEFAULT NULL,
  `emergency_relationship` text DEFAULT NULL,
  `emergency_address` text DEFAULT NULL,
  `emergency_suburb` text DEFAULT NULL,
  `emergency_state` text DEFAULT NULL,
  `emergency_postCode` text DEFAULT NULL,
  `emergency_country` text DEFAULT NULL,
  `firstHeardAboutYouFirst` text DEFAULT NULL,
  `firstHeardAboutYouFirstOthers` text DEFAULT NULL,
  `previouslyWorked` text DEFAULT NULL,
  `aboutExperience` text DEFAULT NULL,
  `currentlyWorking` text DEFAULT NULL,
  `currentClientFirstName` text DEFAULT NULL,
  `currentClientLastName` text DEFAULT NULL,
  `whyInterested` text DEFAULT NULL,
  `haveYouReceiveEmail` text DEFAULT NULL,
  `supportServices` text DEFAULT NULL,
  `specialisedSupportServices` text DEFAULT NULL,
  `secondaryEmploymentDeclaration` text DEFAULT NULL,
  `first_org_name` text DEFAULT NULL,
  `first_org_addr` text DEFAULT NULL,
  `first_org_suburb` text DEFAULT NULL,
  `first_org_state` text DEFAULT NULL,
  `first_org_post_code` text DEFAULT NULL,
  `first_org_country` text DEFAULT NULL,
  `second_org_name` text DEFAULT NULL,
  `second_org_addr` text DEFAULT NULL,
  `second_org_suburb` text DEFAULT NULL,
  `second_org_state` text DEFAULT NULL,
  `second_org_post_code` text DEFAULT NULL,
  `second_org_country` text DEFAULT NULL,
  `your_addr` text DEFAULT NULL,
  `your_suburb` text DEFAULT NULL,
  `your_state` text DEFAULT NULL,
  `your_post_code` text DEFAULT NULL,
  `your_country` text DEFAULT NULL,
  `your_email` text DEFAULT NULL,
  `your_mobile` text DEFAULT NULL,
  `hadAnyDisability` text DEFAULT NULL,
  `hadAnyDisabilityDetails` text DEFAULT NULL,
  `injury_disease` text DEFAULT NULL,
  `injury_disease_desc` text DEFAULT NULL,
  `reliableCar` text DEFAULT NULL,
  `hac_vic_driving_license` text DEFAULT NULL,
  `has_superannuation_ac` text DEFAULT NULL,
  `days_availibility_json` text DEFAULT NULL,
  `days_availibility_day` text DEFAULT NULL,
  `days_availibility_from` text DEFAULT NULL,
  `days_availibility_to` text DEFAULT NULL,
  `days_availibility_na` text DEFAULT NULL,
  `australianCitizen` text DEFAULT NULL,
  `haveVisa` text DEFAULT NULL,
  `dontHaveVisaDesc` text DEFAULT NULL,
  `visaClassSubClass` text DEFAULT NULL,
  `visaGrantNumber` text DEFAULT NULL,
  `visaExpDate` text DEFAULT NULL,
  `passportNumber` text DEFAULT NULL,
  `countryOfIssue` text DEFAULT NULL,
  `restrictionsOnVisa` text DEFAULT NULL,
  `passportIssueDate` text DEFAULT NULL,
  `passportExpDate` text DEFAULT NULL,
  `gender` text DEFAULT NULL,
  `genderSelfDesc` text DEFAULT NULL,
  `identify` text DEFAULT NULL,
  `culturally` text DEFAULT NULL,
  `wherYouBorn` text DEFAULT NULL,
  `bornCountry` text DEFAULT NULL,
  `otherBornCountry` text DEFAULT NULL,
  `isEnglishMain` text DEFAULT NULL,
  `otherLanguageSpeak` text DEFAULT NULL,
  `mainLanguage` text DEFAULT NULL,
  `otherMainLanguage` text DEFAULT NULL,
  `identifyAs` text DEFAULT NULL,
  `workExp` text DEFAULT NULL,
  `nameOfEmployer` text DEFAULT NULL,
  `exp_street_address` text DEFAULT NULL,
  `exp_suburb` text DEFAULT NULL,
  `exp_state` text DEFAULT NULL,
  `exp_postCode` text DEFAULT NULL,
  `exp_country` text DEFAULT NULL,
  `exp_last_street_address` text DEFAULT NULL,
  `exp_last_suburb` text DEFAULT NULL,
  `exp_last_state` text DEFAULT NULL,
  `exp_last_postCode` text DEFAULT NULL,
  `exp_last_country` text DEFAULT NULL,
  `currentWorkRole` text DEFAULT NULL,
  `currentWorkSkills` text DEFAULT NULL,
  `nameOfLastEmp` text DEFAULT NULL,
  `yearOfStopWorking` text DEFAULT NULL,
  `previousRole` text DEFAULT NULL,
  `previousSkills` text DEFAULT NULL,
  `isLocalReferences` text DEFAULT NULL,
  `localReferences_json` text DEFAULT NULL,
  `localReferences_contact_no` text DEFAULT NULL,
  `localReferences_email_address` text DEFAULT NULL,
  `localReferences_name_of_referee` text DEFAULT NULL,
  `localReferences_organisation` text DEFAULT NULL,
  `localReferences_position_held` text DEFAULT NULL,
  `criminal_declaration` text DEFAULT NULL,
  `criminal_declaration_desc` text DEFAULT NULL,
  `undertakenVolunteer` text DEFAULT NULL,
  `typeOfVolunteering` text DEFAULT NULL,
  `otherVolunteering` text DEFAULT NULL,
  `skillsOnVolunteering` text DEFAULT NULL,
  `relevantQualifications` text DEFAULT NULL,
  `typeOfQualification` text DEFAULT NULL,
  `otherQulification` text DEFAULT NULL,
  `qualCertificateName` text DEFAULT NULL,
  `qualCompleteYear` text DEFAULT NULL,
  `qualSchoolUniName` text DEFAULT NULL,
  `anotherQulification` text DEFAULT NULL,
  `anotherTypeOfQualification` text DEFAULT NULL,
  `anotherOtherQulification` text DEFAULT NULL,
  `anotherQualCertificateName` text DEFAULT NULL,
  `anotherQualCompleteYear` text DEFAULT NULL,
  `anotherQualSchoolUniName` text DEFAULT NULL,
  `haveResume` text DEFAULT NULL,
  `uploadCV` text DEFAULT NULL,
  `haveStudentIdCatd` text DEFAULT NULL,
  `uploadStudentIdCard` text DEFAULT NULL,
  `haveDrivingLicense` text DEFAULT NULL,
  `uploadDrivingLicenseFront` text DEFAULT NULL,
  `uploadDrivingLicenseBack` text DEFAULT NULL,
  `haveCarInsurance` text DEFAULT NULL,
  `uploadCarInsurance` text DEFAULT NULL,
  `havePassportCopy` text DEFAULT NULL,
  `uploadCopyOfPassportOne` text DEFAULT NULL,
  `uploadCopyOfPassportTwo` text DEFAULT NULL,
  `havePoliceCheck` text DEFAULT NULL,
  `uploadPoliceCheck` text DEFAULT NULL,
  `haveWorkChildrenCard` text DEFAULT NULL,
  `uploadWorkChildrenCardOne` text DEFAULT NULL,
  `uploadWorkChildrenCardTwo` text DEFAULT NULL,
  `haveFirstAidCertificate` text DEFAULT NULL,
  `uploadFirstAidCertificate` text DEFAULT NULL,
  `haveManualHandlingCertificate` text DEFAULT NULL,
  `uploadManualHandlingCertificate` text DEFAULT NULL,
  `haveFoodHandlingCertificate` text DEFAULT NULL,
  `uploadFoodHandlingCertificate` text DEFAULT NULL,
  `haveWorkingOrVisa` text DEFAULT NULL,
  `uploadWorkingOrVisa` text DEFAULT NULL,
  `haveNDISWorOriComCer` text DEFAULT NULL,
  `uploadNDISWorOriComCer` text DEFAULT NULL,
  `haveDiplomaOfNursing` text DEFAULT NULL,
  `uploadDiplomaOfNursing` text DEFAULT NULL,
  `haveCertificate3Disability` text DEFAULT NULL,
  `uploadCertificate3Disability` text DEFAULT NULL,
  `haveCertificate4Disability` text DEFAULT NULL,
  `uploadCertificate4Disability` text DEFAULT NULL,
  `haveCertificate4Diploma` text DEFAULT NULL,
  `uploadCertificate4Diploma` text DEFAULT NULL,
  `haveRelevantQulification` text DEFAULT NULL,
  `uploadCertificates` text DEFAULT NULL,
  `haveOtherDocuments` text DEFAULT NULL,
  `uploadOtherDocuments` text DEFAULT NULL,
  `confirmation` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `rejectReason` text DEFAULT NULL,
  `isTeamMember` text DEFAULT NULL,
  `teamPosition` text DEFAULT NULL,
  `teamStatus` text DEFAULT NULL,
  `inserted_date` text DEFAULT NULL,
  `inserted_time` text DEFAULT NULL,
  `inserted_by` text DEFAULT NULL,
  `updated_date` text DEFAULT NULL,
  `updated_time` text DEFAULT NULL,
  `updated_by` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ep_support_worker_form`
--

INSERT INTO `ep_support_worker_form` (`id`, `draft_code`, `job_ref_id`, `first_name`, `last_name`, `emergency_mobile`, `emergency_email`, `street_address`, `suburb`, `state`, `postCode`, `country`, `mobile`, `email`, `skypeId`, `dateOfBirth`, `description`, `profileImg`, `emergency_first_name`, `emergency_last_name`, `emergency_relationship`, `emergency_address`, `emergency_suburb`, `emergency_state`, `emergency_postCode`, `emergency_country`, `firstHeardAboutYouFirst`, `firstHeardAboutYouFirstOthers`, `previouslyWorked`, `aboutExperience`, `currentlyWorking`, `currentClientFirstName`, `currentClientLastName`, `whyInterested`, `haveYouReceiveEmail`, `supportServices`, `specialisedSupportServices`, `secondaryEmploymentDeclaration`, `first_org_name`, `first_org_addr`, `first_org_suburb`, `first_org_state`, `first_org_post_code`, `first_org_country`, `second_org_name`, `second_org_addr`, `second_org_suburb`, `second_org_state`, `second_org_post_code`, `second_org_country`, `your_addr`, `your_suburb`, `your_state`, `your_post_code`, `your_country`, `your_email`, `your_mobile`, `hadAnyDisability`, `hadAnyDisabilityDetails`, `injury_disease`, `injury_disease_desc`, `reliableCar`, `hac_vic_driving_license`, `has_superannuation_ac`, `days_availibility_json`, `days_availibility_day`, `days_availibility_from`, `days_availibility_to`, `days_availibility_na`, `australianCitizen`, `haveVisa`, `dontHaveVisaDesc`, `visaClassSubClass`, `visaGrantNumber`, `visaExpDate`, `passportNumber`, `countryOfIssue`, `restrictionsOnVisa`, `passportIssueDate`, `passportExpDate`, `gender`, `genderSelfDesc`, `identify`, `culturally`, `wherYouBorn`, `bornCountry`, `otherBornCountry`, `isEnglishMain`, `otherLanguageSpeak`, `mainLanguage`, `otherMainLanguage`, `identifyAs`, `workExp`, `nameOfEmployer`, `exp_street_address`, `exp_suburb`, `exp_state`, `exp_postCode`, `exp_country`, `exp_last_street_address`, `exp_last_suburb`, `exp_last_state`, `exp_last_postCode`, `exp_last_country`, `currentWorkRole`, `currentWorkSkills`, `nameOfLastEmp`, `yearOfStopWorking`, `previousRole`, `previousSkills`, `isLocalReferences`, `localReferences_json`, `localReferences_contact_no`, `localReferences_email_address`, `localReferences_name_of_referee`, `localReferences_organisation`, `localReferences_position_held`, `criminal_declaration`, `criminal_declaration_desc`, `undertakenVolunteer`, `typeOfVolunteering`, `otherVolunteering`, `skillsOnVolunteering`, `relevantQualifications`, `typeOfQualification`, `otherQulification`, `qualCertificateName`, `qualCompleteYear`, `qualSchoolUniName`, `anotherQulification`, `anotherTypeOfQualification`, `anotherOtherQulification`, `anotherQualCertificateName`, `anotherQualCompleteYear`, `anotherQualSchoolUniName`, `haveResume`, `uploadCV`, `haveStudentIdCatd`, `uploadStudentIdCard`, `haveDrivingLicense`, `uploadDrivingLicenseFront`, `uploadDrivingLicenseBack`, `haveCarInsurance`, `uploadCarInsurance`, `havePassportCopy`, `uploadCopyOfPassportOne`, `uploadCopyOfPassportTwo`, `havePoliceCheck`, `uploadPoliceCheck`, `haveWorkChildrenCard`, `uploadWorkChildrenCardOne`, `uploadWorkChildrenCardTwo`, `haveFirstAidCertificate`, `uploadFirstAidCertificate`, `haveManualHandlingCertificate`, `uploadManualHandlingCertificate`, `haveFoodHandlingCertificate`, `uploadFoodHandlingCertificate`, `haveWorkingOrVisa`, `uploadWorkingOrVisa`, `haveNDISWorOriComCer`, `uploadNDISWorOriComCer`, `haveDiplomaOfNursing`, `uploadDiplomaOfNursing`, `haveCertificate3Disability`, `uploadCertificate3Disability`, `haveCertificate4Disability`, `uploadCertificate4Disability`, `haveCertificate4Diploma`, `uploadCertificate4Diploma`, `haveRelevantQulification`, `uploadCertificates`, `haveOtherDocuments`, `uploadOtherDocuments`, `confirmation`, `status`, `rejectReason`, `isTeamMember`, `teamPosition`, `teamStatus`, `inserted_date`, `inserted_time`, `inserted_by`, `updated_date`, `updated_time`, `updated_by`) VALUES
(182, '', '1', 'Abid ddf', 'Ilyasfsdfg', '', '', 'Karachi', 'Karachi', '2', '74400', '16', '03152048416dfg', 'abidilyas786@gmail.com', '', '', NULL, NULL, '', '', '', '', '', '2', '', '16', '', '', '', '', '', '', '', '', '', 'Education / Training / Employment Support,Specialised Support Services,Personal Care', 'Anaphylaxis,Catheter or Condom Drainage,Shallow Suctioning', '', '', '', '', '2', '', '16', '', '', '', '2', '', '16', '', '', '2', '', '16', '', '', '', '', '', '', 'yes', 'yes', '', '{\"day\":{\"1\":\"Monday\",\"2\":\"Tuesday\",\"3\":\"Wednesday\",\"4\":\"Thursday\",\"5\":\"Friday\",\"6\":\"Saturday\",\"7\":\"Sunday\"},\"from\":{\"1\":\"8:20 AM\",\"2\":\"09:00 AM\",\"3\":\"-\",\"4\":\"9:20 AM\",\"5\":\"-\",\"6\":\"-\",\"7\":\"-\"},\"to\":{\"1\":\"11:00 PM\",\"2\":\"02:00 PM\",\"3\":\"-\",\"4\":\"02:00 PM\",\"5\":\"-\",\"6\":\"-\",\"7\":\"-\"},\"not_available\":{\"1\":false,\"2\":false,\"3\":true,\"4\":false,\"5\":true,\"6\":true,\"7\":true}}', 'Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday', '8:20 AM,09:00 AM,-,9:20 AM,-,-,-', '11:00 PM,02:00 PM,-,02:00 PM,-,-,-', ',,1,,1,1,1', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'yes', '{\"name_of_referee\":{\"1\":\"Kashif Fazal\"},\"email_address\":{\"1\":\"kashif@efsol.com.auu\"},\"organisation\":{\"1\":\"Yushin Technologies\"},\"contact_no\":{\"1\":\"342\"},\"position_held\":{\"1\":\"453\"}}', '342', 'kashif@efsol.com.auu', 'Kashif Fazal', 'Yushin Technologies', '453', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'yes', '182-cde3-size-chart-3.jpeg', 'yes', '182-c1d3-technicians_report.pdf', 'yes', '182-530c-about-us-after.pdf', '182-36af-about-us-before.pdf', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'true', '5', 'This is dmeosadfasf\ns fasf as fsa asf\nas fasf\n34234dfg s', NULL, NULL, NULL, '2021-01-27', '08:44:12 PM', '1', '2022-01-05', '04:19:37 AM', '1'),
(184, '', '', 'Zeeshan ', 'Aziz ', '03152048416', 'kashiffazal99@gmail.com', 'Karachi', 'Karachi', '2', '74400', '16', '03152048416', 'zeeshan.12527@gmail.com', '', '', NULL, NULL, 'Kashif', 'Fazal', 'Friends', 'Karachi dfsadf asdf asdf ', 'Karachi', '2', '74400', '16', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2', '', '16', '', '', '', '', '', '', 'no', 'no', 'no', '{\"day\":{\"1\":\"Monday\",\"2\":\"Tuesday\",\"3\":\"Wednesday\",\"4\":\"Thursday\",\"5\":\"Friday\",\"6\":\"Saturday\",\"7\":\"Sunday\"},\"from\":{\"1\":\"5:34 AM\",\"2\":\"12:00 AM\",\"3\":\"-\",\"4\":\"-\",\"5\":\"-\",\"6\":\"3:00 PM\",\"7\":\"4:00 PM\"},\"not_available\":{\"1\":false,\"2\":false,\"3\":true,\"4\":true,\"5\":true,\"6\":false,\"7\":false},\"to\":{\"1\":\"6:00 PM\",\"2\":\"5:00 AM\",\"3\":\"-\",\"4\":\"-\",\"5\":\"-\",\"6\":\"12:00 AM\",\"7\":\"12:00 AM\"}}', 'Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday', '5:34 AM,12:00 AM,-,-,-,3:00 PM,4:00 PM', '6:00 PM,5:00 AM,-,-,-,12:00 AM,12:00 AM', ',,1,1,1,,', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '[]', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'true', '5', NULL, NULL, NULL, NULL, '2021-02-04', '02:31:47 AM', '', '2022-01-05', '04:19:31 AM', '1'),
(187, '', '', 'Mohamed', 'Ainan', '', '', '', '', '2', '', '16', '03152048416', 'ainanshakiib@gmail.com', '', '', NULL, NULL, '', '', 'Friend', '', '', '2', '', '16', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2', '', '16', '', '', '', '2', '', '16', '', '', '2', '', '16', '', '', '', '', '', '', 'no', 'yes', 'no', '{\"day\":{\"1\":\"Monday\",\"2\":\"Tuesday\",\"3\":\"Wednesday\",\"4\":\"Thursday\",\"5\":\"Friday\",\"6\":\"Saturday\",\"7\":\"Sunday\"},\"from\":{\"1\":\"08:00 AM\",\"2\":\"-\",\"3\":\"09:00 AM\",\"4\":\"10:00 AM\",\"5\":\"08:00 AM\",\"6\":\"08:00 AM\",\"7\":\"10:00 AM\"},\"to\":{\"1\":\"05:00 PM\",\"2\":\"-\",\"3\":\"09:00 PM\",\"4\":\"12:00 PM\",\"5\":\"05:00 PM\",\"6\":\"03:00 PM\",\"7\":\"12:00 PM\"},\"not_available\":{\"1\":false,\"2\":false,\"3\":false,\"4\":false,\"5\":false,\"6\":false,\"7\":false}}', 'Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday', '08:00 AM,-,09:00 AM,10:00 AM,08:00 AM,08:00 AM,10:00 AM', '05:00 PM,-,09:00 PM,12:00 PM,05:00 PM,03:00 PM,12:00 PM', ',,,,,,', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '16', '', '', '', '', '', '', '', '', '', '', '2', '', '16', '', '', '2', '', '16', '', '', '', '', '', '', '', '[]', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'true', '5', NULL, NULL, NULL, NULL, '2021-02-17', '12:21:36 AM', '1', '2022-01-05', '04:19:24 AM', '1'),
(193, '', '1', 'Abid', 'SP', '', '', 'as', 'as', '2', '2323', '16', '1212', 'kashiffazal99@gmail.com', 'as', '12-03-1971', NULL, NULL, '2323', '2323', '2323', '2323', '2323', '2', '2323', '16', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2', '', '16', '', '', '', '2', '', '16', '', '', '2', '', '16', '', '', '', '', '', '', '', '', '', '{\"from\":{\"1\":\"10:00 AM\",\"2\":\"10:00 AM\",\"3\":\"12:00 AM\",\"4\":\"01:00 PM\",\"5\":\"10:00 AM\",\"6\":\"-\",\"7\":\"12:00 PM\"},\"to\":{\"1\":\"06:00 PM\",\"2\":\"06:00 PM\",\"3\":\"06:00 PM\",\"4\":\"11:00 PM\",\"5\":\"11:00 PM\",\"6\":\"-\",\"7\":\"11:00 PM\"},\"not_available\":{\"1\":false,\"2\":false,\"3\":false,\"4\":false,\"5\":false,\"6\":true,\"7\":false},\"day\":{\"1\":\"Monday\",\"2\":\"Tuesday\",\"3\":\"Wednesday\",\"4\":\"Thursday\",\"5\":\"Friday\",\"6\":\"Saturday\",\"7\":\"Sunday\"}}', 'Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday', '10:00 AM,10:00 AM,12:00 AM,01:00 PM,10:00 AM,-,12:00 PM', '06:00 PM,06:00 PM,06:00 PM,11:00 PM,11:00 PM,-,11:00 PM', ',,,,,1,', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '[]', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'true', '5', NULL, NULL, NULL, NULL, '2021-10-12', '02:58:19 PM', '', '2022-01-05', '05:06:40 AM', '1'),
(200, '', '2', 'Kashif', 'Fazal', '', '', 'Karachi', 'Karachi', '2', '74400', '16', '+923152048416', 'kashiffazal99@gmail.com', '', '', NULL, NULL, '', '', '', '', '', '2', '', '16', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '[]', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '[]', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'true', '1', NULL, NULL, NULL, NULL, '2021-12-30', '03:13:26 AM', '', '2022-01-05', '04:19:12 AM', '1'),
(210, NULL, NULL, 'Haris', 'Hassan', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'sad fsdf', '5d221-121fd-sp.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'sdf sdf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '3', NULL, NULL, 'asd,asd,asd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'true', 'CEO & Co-Founder', 'active', '2021-12-31', '03:43:14 AM', '1', NULL, NULL, NULL),
(211, 'QjFUbnhYS3RZTWxjNUlQQ3J3OTBuUT09', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, '2022-01-05', '05:06:39 AM', '', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ep_support_worker_status`
--

CREATE TABLE `ep_support_worker_status` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `icon` text DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ep_support_worker_status`
--

INSERT INTO `ep_support_worker_status` (`id`, `name`, `icon`, `description`) VALUES
(1, 'Applied', 'las la-file-alt', NULL),
(2, 'Shortlisted', 'las la-phone', NULL),
(3, 'Contacted', 'las la-list', NULL),
(4, 'Interviewed', 'las la-user-astronaut', NULL),
(5, 'Hired', 'las la-file-contract', NULL),
(6, 'Rejected', 'las la-hand-point-down', NULL),
(7, 'On-Hold', 'las la-hand-paper', NULL),
(8, 'Delete', 'las la-times-circle', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ep_timesheet_client`
--

CREATE TABLE `ep_timesheet_client` (
  `id` int(11) NOT NULL,
  `fortnightStartDate` text DEFAULT NULL,
  `fortnightEndDate` text DEFAULT NULL,
  `json` text DEFAULT NULL,
  `client_ref_id` text DEFAULT NULL,
  `date` text DEFAULT NULL,
  `start_time` text DEFAULT NULL,
  `finish_time` text DEFAULT NULL,
  `service_type` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `th` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `approved_by` text DEFAULT NULL,
  `inserted_date` text DEFAULT NULL,
  `inserted_time` text DEFAULT NULL,
  `inserted_by` text DEFAULT NULL,
  `updated_date` text DEFAULT NULL,
  `updated_time` text DEFAULT NULL,
  `updated_by` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ep_timesheet_employee`
--

CREATE TABLE `ep_timesheet_employee` (
  `id` int(11) NOT NULL,
  `fortnightStartDate` text DEFAULT NULL,
  `fortnightEndDate` text DEFAULT NULL,
  `json` text DEFAULT NULL,
  `client_ref_id` text DEFAULT NULL,
  `date` text DEFAULT NULL,
  `start_time` text DEFAULT NULL,
  `finish_time` text DEFAULT NULL,
  `service_type` text DEFAULT NULL,
  `mt` text DEFAULT NULL,
  `nh` text DEFAULT NULL,
  `wh` text DEFAULT NULL,
  `ph` text DEFAULT NULL,
  `eh` text DEFAULT NULL,
  `kt` text DEFAULT NULL,
  `th` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `approved_by` text DEFAULT NULL,
  `inserted_date` text DEFAULT NULL,
  `inserted_time` text DEFAULT NULL,
  `inserted_by` text DEFAULT NULL,
  `updated_date` text DEFAULT NULL,
  `updated_time` text DEFAULT NULL,
  `updated_by` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ep_timesheet_employee_ne`
--

CREATE TABLE `ep_timesheet_employee_ne` (
  `id` int(11) NOT NULL,
  `fortnightStartDate` text DEFAULT NULL,
  `fortnightEndDate` text DEFAULT NULL,
  `json` text DEFAULT NULL,
  `client_ref_id` text DEFAULT NULL,
  `date` text DEFAULT NULL,
  `start_time` text DEFAULT NULL,
  `end_time` text DEFAULT NULL,
  `normal_hour` text DEFAULT NULL,
  `weekend_hour_sat` text DEFAULT NULL,
  `weekend_hour_sun` text DEFAULT NULL,
  `public_holidays_hour` text DEFAULT NULL,
  `km_travel` text DEFAULT NULL,
  `service_type` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `approved_by` text DEFAULT NULL,
  `inserted_date` text DEFAULT NULL,
  `inserted_time` text DEFAULT NULL,
  `inserted_by` text DEFAULT NULL,
  `updated_date` text DEFAULT NULL,
  `updated_time` text DEFAULT NULL,
  `updated_by` text DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ep_timesheet_employee_ne`
--

INSERT INTO `ep_timesheet_employee_ne` (`id`, `fortnightStartDate`, `fortnightEndDate`, `json`, `client_ref_id`, `date`, `start_time`, `end_time`, `normal_hour`, `weekend_hour_sat`, `weekend_hour_sun`, `public_holidays_hour`, `km_travel`, `service_type`, `description`, `status`, `approved_by`, `inserted_date`, `inserted_time`, `inserted_by`, `updated_date`, `updated_time`, `updated_by`) VALUES
(1, '2021-11-15', '2021-11-28', '{\r\n  \"date\": {\r\n    \"1\": \"2021-11-16\",\r\n    \"2\": \"2021-11-17\",\r\n    \"3\": \"2021-11-17\",\r\n    \"4\": \"2021-11-17\",\r\n    \"5\": \"2021-11-17\",\r\n    \"6\": \"2021-11-17\",\r\n    \"7\": \"2021-11-17\",\r\n    \"8\": \"2021-11-17\",\r\n    \"9\": \"2021-11-21\",\r\n    \"10\": \"2021-11-26\",\r\n    \"11\": \"2021-11-26\",\r\n    \"12\": \"2021-11-26\"\r\n  },\r\n  \"normal_hour\": {\r\n    \"1\": 5.031944444444444,\r\n    \"2\": 14.303333333333333,\r\n    \"3\": 0.01361111111111111,\r\n    \"4\": 2.7847222222222223,\r\n    \"5\": 0.0125,\r\n    \"6\": 0.003611111111111111,\r\n    \"7\": 0.019166666666666665,\r\n    \"8\": 0.0008333333333333334,\r\n    \"9\": \"\",\r\n    \"10\": 1.405,\r\n    \"11\": 0.25,\r\n    \"12\": 0.019166666666666665\r\n  },\r\n  \"weekend_hour_sat\": {\r\n    \"1\": \"\",\r\n    \"2\": \"\",\r\n    \"3\": \"\",\r\n    \"4\": \"\",\r\n    \"5\": \"\",\r\n    \"6\": \"\",\r\n    \"7\": \"\",\r\n    \"8\": \"\",\r\n    \"9\": \"\",\r\n    \"10\": \"\",\r\n    \"11\": \"\",\r\n    \"12\": \"\"\r\n  },\r\n  \"weekend_hour_sun\": {\r\n    \"1\": \"\",\r\n    \"2\": \"\",\r\n    \"3\": \"\",\r\n    \"4\": \"\",\r\n    \"5\": \"\",\r\n    \"6\": \"\",\r\n    \"7\": \"\",\r\n    \"8\": \"\",\r\n    \"9\": 0.008055555555555555,\r\n    \"10\": \"\",\r\n    \"11\": \"\",\r\n    \"12\": \"\"\r\n  },\r\n  \"public_holidays_hour\": {\r\n    \"1\": \"\",\r\n    \"2\": \"\",\r\n    \"3\": \"\",\r\n    \"4\": \"\",\r\n    \"5\": \"\",\r\n    \"6\": \"\",\r\n    \"7\": \"\",\r\n    \"8\": \"\",\r\n    \"9\": \"\",\r\n    \"10\": \"\",\r\n    \"11\": \"\",\r\n    \"12\": \"\"\r\n  },\r\n  \"client_ref_id\": {\r\n    \"1\": \"108\",\r\n    \"2\": \"106\",\r\n    \"3\": \"106\",\r\n    \"4\": \"108\",\r\n    \"5\": \"106\",\r\n    \"6\": \"106\",\r\n    \"7\": \"106\",\r\n    \"8\": \"108\",\r\n    \"9\": \"102\",\r\n    \"10\": \"106\",\r\n    \"11\": \"108\",\r\n    \"12\": \"108\"\r\n  },\r\n  \"start_time\": {\r\n    \"1\": \"01:04:39 PM\",\r\n    \"2\": \"02:53:44 PM\",\r\n    \"3\": \"12:42:57 AM\",\r\n    \"4\": \"12:44:25 AM\",\r\n    \"5\": \"03:34:41 AM\",\r\n    \"6\": \"03:40:51 AM\",\r\n    \"7\": \"03:41:22 AM\",\r\n    \"8\": \"03:42:52 AM\",\r\n    \"9\": \"05:58:13 PM\",\r\n    \"10\": \"08:44:45 PM\",\r\n    \"11\": \"07:30:05 PM\",\r\n    \"12\": \"07:51:29 PM\"\r\n  },\r\n  \"end_time\": {\r\n    \"1\": \"06:06:34 PM\",\r\n    \"2\": \"12:35:32 AM\",\r\n    \"3\": \"12:43:46 AM\",\r\n    \"4\": \"03:31:30 AM\",\r\n    \"5\": \"03:35:26 AM\",\r\n    \"6\": \"03:41:04 AM\",\r\n    \"7\": \"03:42:31 AM\",\r\n    \"8\": \"03:42:55 AM\",\r\n    \"9\": \"05:58:42 PM\",\r\n    \"10\": \"07:20:27 PM\",\r\n    \"11\": \"07:45:05 PM\",\r\n    \"12\": \"07:52:38 PM\"\r\n  },\r\n  \"service_type\": {\r\n    \"1\": \"5\",\r\n    \"2\": \"5\",\r\n    \"3\": \"5\",\r\n    \"4\": \"5\",\r\n    \"5\": \"5\",\r\n    \"6\": \"5\",\r\n    \"7\": \"5\",\r\n    \"8\": \"5\",\r\n    \"9\": \"5\",\r\n    \"10\": \"5\",\r\n    \"11\": \"5\",\r\n    \"12\": \"5\"\r\n  },\r\n  \"km_travel\": {\r\n    \"1\": null,\r\n    \"2\": null,\r\n    \"3\": null,\r\n    \"4\": null,\r\n    \"5\": null,\r\n    \"6\": null,\r\n    \"7\": null,\r\n    \"8\": null,\r\n    \"9\": null,\r\n    \"10\": null,\r\n    \"11\": null,\r\n    \"12\": null\r\n  },\r\n  \"description\": {\r\n    \"1\": null,\r\n    \"2\": \"f asdf\",\r\n    \"3\": \"sdfsadf\",\r\n    \"4\": \"fdgsdg\",\r\n    \"5\": \"jh\",\r\n    \"6\": null,\r\n    \"7\": null,\r\n    \"8\": null,\r\n    \"9\": null,\r\n    \"10\": \"34\",\r\n    \"11\": \"wrw\",\r\n    \"12\": \"w4\"\r\n  }\r\n}\r\n', '108,106,106,108,106,106,106,108,102,106,108,108', '2021-11-16,2021-11-17,2021-11-17,2021-11-17,2021-11-17,2021-11-17,2021-11-17,2021-11-17,2021-11-21,2021-11-26,2021-11-26,2021-11-26', '01:04:39 PM,02:53:44 PM,12:42:57 AM,12:44:25 AM,03:34:41 AM,03:40:51 AM,03:41:22 AM,03:42:52 AM,05:58:13 PM,08:44:45 PM,07:30:05 PM,07:51:29 PM', '06:06:34 PM,12:35:32 AM,12:43:46 AM,03:31:30 AM,03:35:26 AM,03:41:04 AM,03:42:31 AM,03:42:55 AM,05:58:42 PM,07:20:27 PM,07:45:05 PM,07:52:38 PM', '5.0319444444444,14.303333333333,0.013611111111111,2.7847222222222,0.0125,0.0036111111111111,0.019166666666667,0.00083333333333333,,1.405,0.25,0.019166666666667', ',,,,,,,,,,,', ',,,,,,,,0.0080555555555556,,,', ',,,,,,,,,,,', ',,,,,,,,,,,', '5,5,5,5,5,5,5,5,5,5,5,5', ',f asdf,sdfsadf,fdgsdg,jh,,,,,34,wrw,w4', 'unapproved', NULL, '2021-11-16', '12:07:03 PM', '43', '2021-11-26', '07:52:47 PM', '43');

-- --------------------------------------------------------

--
-- Table structure for table `ep_users`
--

CREATE TABLE `ep_users` (
  `id` int(11) NOT NULL,
  `link_id` text DEFAULT NULL,
  `first_name` text DEFAULT NULL,
  `last_name` text DEFAULT NULL,
  `username` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `gender` text DEFAULT NULL,
  `contact_number` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `profileImage` text DEFAULT NULL,
  `role` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `approve_status` text DEFAULT NULL,
  `current_login` text DEFAULT NULL,
  `last_login` text DEFAULT NULL,
  `second_last_login` text DEFAULT NULL,
  `inserted_date` text DEFAULT NULL,
  `inserted_time` text DEFAULT NULL,
  `inserted_by` text DEFAULT NULL,
  `updated_date` text DEFAULT NULL,
  `updated_time` text DEFAULT NULL,
  `updated_by` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ep_users`
--

INSERT INTO `ep_users` (`id`, `link_id`, `first_name`, `last_name`, `username`, `password`, `gender`, `contact_number`, `email`, `profileImage`, `role`, `status`, `approve_status`, `current_login`, `last_login`, `second_last_login`, `inserted_date`, `inserted_time`, `inserted_by`, `updated_date`, `updated_time`, `updated_by`) VALUES
(1, NULL, 'Kashif', 'Fazal', 'kashiffazal99@gmail.com', '123456', 'Male', '0315-2048416', 'kashiffazal99@gmail.com', '1_9c6aeprofileImage.png', '1', '1', 'true', '2022-01-05, 04:41:15 AM', '2022-01-03, 04:35:57 PM', '2022-01-02, 07:24:04 PM', '25-11-2019', '2:54:12 AM', '1', '2022-01-05', '04:31:50 AM', '1'),
(40, '182', 'Abid', 'Ilyas', 'abidilyas786@gmail.com', 'm2nglp43', NULL, '545648754', 'abidilyas786@gmail.com', '40_4aaf7profileImage.png', '15', '1', 'true', '2022-01-05, 04:32:13 AM', '2021-10-12, 03:33:41 PM', '2021-09-07, 04:44:44 PM', '2021-06-07', '09:26:12 PM', '1', '2022-01-05', '04:37:28 AM', '40'),
(41, '187', 'Noman', 'Ahmed', 'ainanshakiib@gmail.com', 'zara007', NULL, '34545', 'noman@gmail.com', '41_e20afprofileImage.png', '15', '1', 'true', '2022-01-05, 04:37:46 AM', '2021-10-31, 05:05:48 PM', '2021-10-15, 05:15:18 PM', '2021-07-28', '07:47:31 AM', '1', '2022-01-05', '04:38:18 AM', '41'),
(42, '184', 'Zeeshan', 'Aziz', 'zeeshan.12527@gmail.com', 'chuski007', NULL, '465464', 'zeeshan@gmail.com', '42_ecb13profileImage.png', '15', '1', 'true', '2022-01-05, 04:38:33 AM', '', '', '2021-07-28', '11:54:31 AM', '1', '2022-01-05', '04:39:17 AM', '42'),
(43, '193', 'Abid', 'SP', 'abidsp', 'abid786', NULL, '34653465456', 'kashiffazal99@gmail.com', '43_8ebf6profileImage.png', '15', '1', 'true', '2022-01-05, 05:07:49 AM', '2022-01-05, 04:40:04 AM', '2022-01-03, 04:35:27 PM', '2021-10-12', '03:15:48 PM', '1', '2022-01-05', '05:07:15 AM', '1'),
(44, '', 'kashif', 'sample', 'kashiffazal', '123456', NULL, '234234', 'kashiffazal999@gmail.com', '44_84b3cprofileImage.png', '16', '1', 'true', '2022-01-05, 04:40:47 AM', '2021-11-21, 11:09:14 PM', '2021-11-21, 11:06:27 PM', '2021-11-21', '06:18:59 PM', '1', '2022-01-05', '04:41:08 AM', '44');

-- --------------------------------------------------------

--
-- Table structure for table `ep_users_permission_heads`
--

CREATE TABLE `ep_users_permission_heads` (
  `id` int(11) NOT NULL,
  `heads` text DEFAULT NULL,
  `abbr` text DEFAULT NULL,
  `sequence` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ep_users_permission_heads`
--

INSERT INTO `ep_users_permission_heads` (`id`, `heads`, `abbr`, `sequence`, `description`) VALUES
(1, 'Create Jobs', 'CJ', 1, 'Main access for SMTP including link on navigation (Default is view)'),
(2, 'Support Worker', 'SW', 2, 'Add new SMTP credentials'),
(3, 'Team Member', 'TM', 3, 'Edit SMTP'),
(4, 'Clients', 'CL', 4, 'Delete SMTP'),
(5, 'Client Timesheet', 'CT', 5, 'Main access for user management including link on navigation.'),
(6, 'Service Plaining', 'SP', 7, 'Allow to create users.'),
(7, 'User Profile', 'UP', 8, 'Can view all users created by him/her.'),
(8, 'User Management', 'UM', 9, 'Edit users created by him/her.'),
(9, 'Reset Password', 'RP', 10, 'Create user role.'),
(10, 'Employee Timesheet', 'ET', 6, 'Create user role.'),
(11, 'Document Generation', 'DG', 11, 'Generate client or Support worker document(s).'),
(12, 'Document Tracking', 'DT', 12, 'Document Tracking for Expiration.'),
(13, 'Reporting', 'RP', 13, 'Reporting of all data list');

-- --------------------------------------------------------

--
-- Table structure for table `ep_users_permission_list`
--

CREATE TABLE `ep_users_permission_list` (
  `id` int(11) NOT NULL,
  `permission` text DEFAULT NULL,
  `abbr` text DEFAULT NULL,
  `head_ref_id` text DEFAULT NULL,
  `head_index` text DEFAULT NULL,
  `sequence` text DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ep_users_permission_list`
--

INSERT INTO `ep_users_permission_list` (`id`, `permission`, `abbr`, `head_ref_id`, `head_index`, `sequence`, `description`) VALUES
(1, 'Add new Form', 'F', '1', '0', '1.1', NULL),
(2, 'Log', 'L', '1', '0', '1.2', NULL),
(3, 'Change Status', 'C', '1', '1', '1.2.1', NULL),
(4, 'Edit Job', 'E', '1', '1', '1.2.2', NULL),
(5, 'View Details', 'V', '1', '1', '1.2.3', NULL),
(6, 'Add new Form', 'F', '2', '0', '2.1', NULL),
(7, 'Logs', 'L', '2', '0', '2.2', NULL),
(8, 'Change Status', 'C', '2', '1', '2.2.1', NULL),
(9, 'Edit Form', 'E', '2', '1', '2.2.2', NULL),
(10, 'View Details', 'V', '2', '1', '2.2.3', NULL),
(11, 'Add New Member', 'F', '3', '0', '3.1', NULL),
(12, 'Active Log', 'AL', '3', '0', '3.2', NULL),
(13, 'Change Status', 'AC', '3', '1', '3.2.1', NULL),
(14, 'Edit Form', 'AE', '3', '1', '3.2.2', NULL),
(15, 'View Details', 'AV', '3', '1', '3.2.3', NULL),
(16, 'Deleted Log', 'DL', '3', '0', '3.3', NULL),
(17, 'Change Status', 'DC', '3', '1', '3.3.1', NULL),
(18, 'Edit Form', 'DE', '3', '1', '3.3.2', NULL),
(19, 'View Details', 'DV', '3', '1', '3.3.3', NULL),
(20, 'Add New Form', 'F', '4', '0', '4.1', NULL),
(21, 'Log', 'L', '4', '0', '4.2', NULL),
(22, 'Edit Form', 'E', '4', '0', '4.3', NULL),
(23, 'View Details', 'V', '4', '0', '4.4', NULL),
(24, 'Progress Note', 'P', '4', '0', '4.5', NULL),
(25, 'Add New Note', 'PF', '4', '1', '4.5.1', NULL),
(26, 'Edit Form', 'PE', '4', '1', '4.5.2', NULL),
(27, 'View Details', 'PV', '4', '1', '4.5.3', NULL),
(28, 'Add new Form', 'F', '5', '0', '5.1', NULL),
(29, 'Unapprove Log', 'UL', '5', '0', '5.2', NULL),
(30, 'Edit Form', 'UE', '5', '1', '5.2.1', NULL),
(31, 'Approve Log', 'AL', '5', '0', '5.3', NULL),
(32, 'Edit Form', 'AE', '5', '1', '5.3.1', NULL),
(33, 'View Details', 'AV', '5', '1', '5.3.2', NULL),
(34, 'Add new Form', 'F', '10', '0', '10.1', NULL),
(35, 'Unapprove Log', 'UL', '10', '0', '10.2', NULL),
(36, 'Edit Form', 'UF', '10', '1', '10.2.1', NULL),
(37, 'Approve Log', 'UL', '10', '0', '10.3', NULL),
(38, 'Edit Form', 'UE', '10', '1', '10.3.1', NULL),
(39, 'View Details', 'UV', '10', '1', '10.3.2', NULL),
(40, 'Add new Form', 'F', '6', '0', '6.1', NULL),
(41, 'Regular Unapprove Log', 'RUL', '6', '0', '6.2', NULL),
(42, 'Change Status', 'RUC', '6', '1', '6.2.1', NULL),
(43, 'Edit Form', 'RUE', '6', '1', '6.2.2', NULL),
(44, 'View Details', 'RUV', '6', '1', '6.2.3', NULL),
(45, 'Regular Approved Log', 'RAL', '6', '0', '6.3', NULL),
(46, 'Change Status', 'RAC', '6', '1', '6.3.1', NULL),
(47, 'View Details', 'RAV', '6', '1', '6.3.3', NULL),
(48, 'Regular On Hold Log', 'RHL', '6', '0', '6.4', NULL),
(49, 'Change Status', 'RHC', '6', '1', '6.4.1', NULL),
(50, 'Edit Form', 'RHE', '6', '1', '6.4.2', NULL),
(51, 'View Details', 'RHV', '6', '1', '6.4.3', NULL),
(52, 'Regular Delete Log', 'RDL', '6', '0', '6.5', NULL),
(53, 'Change Status', 'RDC', '6', '1', '6.5.1', NULL),
(54, 'Edit Form', 'RDE', '6', '1', '6.5.2', NULL),
(55, 'View Details', 'RDV', '6', '1', '6.5.3', NULL),
(56, 'Extra Unapprove Log', 'EUL', '6', '0', '6.6', NULL),
(57, 'Change Status', 'EUC', '6', '1', '6.6.1', NULL),
(58, 'Edit Form', 'EUE', '6', '1', '6.6.2', NULL),
(59, 'View Details', 'EUV', '6', '1', '6.6.3', NULL),
(60, 'Extra Approved Log', 'EAL', '6', '0', '6.7', NULL),
(61, 'Change Status', 'EAC', '6', '1', '6.7.1', NULL),
(62, 'View Details', 'EAV', '6', '1', '6.7.3', NULL),
(63, 'Extra On Hold Log', 'EHL', '6', '0', '6.8', NULL),
(64, 'Change Status', 'EHC', '6', '1', '6.8.1', NULL),
(65, 'Edit Form', 'EHE', '6', '1', '6.8.2', NULL),
(66, 'View Details', 'EHV', '6', '1', '6.8.3', NULL),
(67, 'Extra Delete Log', 'EDL', '6', '0', '6.9', NULL),
(68, 'Change Status', 'EDC', '6', '1', '6.9.1', NULL),
(69, 'Edit Form', 'EDE', '6', '1', '6.9.2', NULL),
(70, 'View Details', 'EDV', '6', '1', '6.9.3', NULL),
(71, 'Timer Unaprove Log', 'TUL', '6', '0', '6.10', NULL),
(72, 'Change Status', 'TUC', '6', '1', '6.10.1', NULL),
(73, 'Edit Time', 'TUE', '6', '1', '6.10.2', NULL),
(74, 'View Details', 'TUC', '6', '1', '6.10.3', NULL),
(75, 'Timer Approve Log', 'TAL', '6', '0', '6.11', NULL),
(76, 'Change Status', 'TAC', '6', '1', '6.11.1', NULL),
(77, 'Edit Time', 'TAE', '6', '1', '6.11.2', NULL),
(78, 'View Details', 'TAC', '6', '1', '6.11.3', NULL),
(79, 'View Profile', 'V', '7', '0', '7.1', NULL),
(80, 'Edit Profile', 'E', '7', '0', '7.2', NULL),
(81, 'Create New User', 'F', '8', '0', '8.1', NULL),
(82, 'User Log', 'L', '8', '0', '8.2', NULL),
(83, 'Change Status', 'C', '8', '1', '8.3', NULL),
(84, 'Edit Form', 'E', '8', '1', '8.4', NULL),
(85, 'View Details', 'V', '8', '1', '8.5', NULL),
(86, 'User Permission', 'P', '8', '0', '8.6', NULL),
(87, 'Reset Password', 'R', '9', '1', '9.1', NULL),
(88, 'View Rejected Reason', 'VR', '2', '1', '2.2.4', NULL),
(89, 'Edit Form', 'EAE', '6', '1', '6.7.2', NULL),
(90, 'Edit Form', 'RAE', '6', '1', '6.3.2', NULL),
(91, 'Edit Permission', 'PE', '8', '1', '8.6.1', NULL),
(92, 'Delete Permission', 'PD', '8', '1', '8.6.2', NULL),
(93, 'Timer Delete Log', 'TDL', '6', '0', '6.12', NULL),
(94, 'Change Status', 'TDL', '6', '0', '6.12.1', NULL),
(95, 'Edit Time', 'TDL', '6', '0', '6.12.2', NULL),
(96, 'View Details', 'TDL', '6', '0', '6.12.3', NULL),
(97, 'Document Generation', 'AGD', '11', '1', '11.1', NULL),
(98, 'Status Note', 'S', '4', '0', '4.6', NULL),
(99, 'Add New Note', 'F', '4', '1', '4.6', NULL),
(100, 'Add/Update Expiry Date', 'F', '12', '0', '12.1', NULL),
(101, 'View Expiry Date', 'V', '12', '0', '12.1', NULL),
(103, 'Set Preset', 'SP', '13', '0', '13.1', NULL),
(104, 'Preset Log', 'PL', '13', '0', '13.2', NULL),
(105, 'Generate Reports', 'GP', '13', '0', '13.3', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ep_users_role`
--

CREATE TABLE `ep_users_role` (
  `id` int(11) NOT NULL,
  `role` text DEFAULT NULL,
  `linkRole` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `permission_ref_ids` text DEFAULT NULL,
  `hideForOthers` text DEFAULT NULL,
  `inserted_date` text DEFAULT NULL,
  `inserted_time` text DEFAULT NULL,
  `inserted_by` text DEFAULT NULL,
  `updated_date` text DEFAULT NULL,
  `updated_time` text DEFAULT NULL,
  `updated_by` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ep_users_role`
--

INSERT INTO `ep_users_role` (`id`, `role`, `linkRole`, `description`, `permission_ref_ids`, `hideForOthers`, `inserted_date`, `inserted_time`, `inserted_by`, `updated_date`, `updated_time`, `updated_by`) VALUES
(1, 'Developer', NULL, 'Application developer', 'all', 'true', '2019-07-21', '04:34:15 PM', '1', '2021-05-20', '05:20:36 AM', '1'),
(2, 'Super Admin', NULL, 'Application super admin', 'all', 'true', '2019-07-21', '04:29:48 PM', '1', '2021-05-20', '05:21:03 AM', '1'),
(15, 'Support Worker/Cleaner', 'SPW', 'Support Worker/Cleaner ', '87,h-4,98,99,24,25,26,27,h-7,79,80', '', '2021-06-07', '09:25:42 PM', '1', '2022-01-02', '03:59:15 AM', '1'),
(16, 'Sample Role', NULL, ',lk', '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,h-1,h-10,h-12,h-2,h-3,h-4,h-5,h-6,h-7,h-8', '', '2021-11-21', '06:18:24 PM', '1', '2021-11-21', '11:09:05 PM', '1');

-- --------------------------------------------------------

--
-- Table structure for table `ep_users_status`
--

CREATE TABLE `ep_users_status` (
  `id` int(11) NOT NULL,
  `status` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `errorTitle` text NOT NULL,
  `errorMsg` text NOT NULL,
  `inserted_date` text DEFAULT NULL,
  `inserted_time` text DEFAULT NULL,
  `inserted_by` text DEFAULT NULL,
  `updated_date` text NOT NULL,
  `updated_time` text NOT NULL,
  `updated_by` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ep_users_status`
--

INSERT INTO `ep_users_status` (`id`, `status`, `description`, `errorTitle`, `errorMsg`, `inserted_date`, `inserted_time`, `inserted_by`, `updated_date`, `updated_time`, `updated_by`) VALUES
(1, 'Active', 'Active user', '', '', '20-07-2019', '01:13:45 PM', '1', '', '', ''),
(2, 'In Active', 'In active user', 'Inactive', 'Your account is not active.', '20-07-2019', '01:13:45 PM', '1', '', '', ''),
(3, 'Block', 'block user', 'Blocked', 'Your account is blocked.', '20-07-2019', '01:13:45 PM', '1', '', '', ''),
(4, 'Unverified Email', 'Unverified Email', 'Unverified Email', 'Your email is not verified.', '20-07-2019', '01:13:45 PM', '1', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ep_client_form`
--
ALTER TABLE `ep_client_form`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_client_note`
--
ALTER TABLE `ep_client_note`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_client_progress_note`
--
ALTER TABLE `ep_client_progress_note`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_document_generate`
--
ALTER TABLE `ep_document_generate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_document_list`
--
ALTER TABLE `ep_document_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_document_tracking`
--
ALTER TABLE `ep_document_tracking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_dropdown_country_list`
--
ALTER TABLE `ep_dropdown_country_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_dropdown_general_list`
--
ALTER TABLE `ep_dropdown_general_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_dropdown_languages_list`
--
ALTER TABLE `ep_dropdown_languages_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_dropdown_states_list`
--
ALTER TABLE `ep_dropdown_states_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_jobs`
--
ALTER TABLE `ep_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_public_holidays_aust`
--
ALTER TABLE `ep_public_holidays_aust`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_report_column_preset_data`
--
ALTER TABLE `ep_report_column_preset_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_report_column_preset_title`
--
ALTER TABLE `ep_report_column_preset_title`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_service_list`
--
ALTER TABLE `ep_service_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_service_plaining`
--
ALTER TABLE `ep_service_plaining`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_service_timing`
--
ALTER TABLE `ep_service_timing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_support_worker_form`
--
ALTER TABLE `ep_support_worker_form`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_support_worker_status`
--
ALTER TABLE `ep_support_worker_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_timesheet_client`
--
ALTER TABLE `ep_timesheet_client`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_timesheet_employee`
--
ALTER TABLE `ep_timesheet_employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_timesheet_employee_ne`
--
ALTER TABLE `ep_timesheet_employee_ne`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_users`
--
ALTER TABLE `ep_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_users_permission_heads`
--
ALTER TABLE `ep_users_permission_heads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_users_permission_list`
--
ALTER TABLE `ep_users_permission_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_users_role`
--
ALTER TABLE `ep_users_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_users_status`
--
ALTER TABLE `ep_users_status`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ep_client_form`
--
ALTER TABLE `ep_client_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT for table `ep_client_note`
--
ALTER TABLE `ep_client_note`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `ep_client_progress_note`
--
ALTER TABLE `ep_client_progress_note`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ep_document_generate`
--
ALTER TABLE `ep_document_generate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ep_document_list`
--
ALTER TABLE `ep_document_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `ep_document_tracking`
--
ALTER TABLE `ep_document_tracking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `ep_dropdown_country_list`
--
ALTER TABLE `ep_dropdown_country_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=268;

--
-- AUTO_INCREMENT for table `ep_dropdown_general_list`
--
ALTER TABLE `ep_dropdown_general_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ep_dropdown_languages_list`
--
ALTER TABLE `ep_dropdown_languages_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `ep_dropdown_states_list`
--
ALTER TABLE `ep_dropdown_states_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `ep_jobs`
--
ALTER TABLE `ep_jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ep_public_holidays_aust`
--
ALTER TABLE `ep_public_holidays_aust`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `ep_report_column_preset_data`
--
ALTER TABLE `ep_report_column_preset_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `ep_report_column_preset_title`
--
ALTER TABLE `ep_report_column_preset_title`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ep_service_list`
--
ALTER TABLE `ep_service_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `ep_service_plaining`
--
ALTER TABLE `ep_service_plaining`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `ep_service_timing`
--
ALTER TABLE `ep_service_timing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `ep_support_worker_form`
--
ALTER TABLE `ep_support_worker_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=212;

--
-- AUTO_INCREMENT for table `ep_support_worker_status`
--
ALTER TABLE `ep_support_worker_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `ep_timesheet_client`
--
ALTER TABLE `ep_timesheet_client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ep_timesheet_employee`
--
ALTER TABLE `ep_timesheet_employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ep_timesheet_employee_ne`
--
ALTER TABLE `ep_timesheet_employee_ne`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ep_users`
--
ALTER TABLE `ep_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `ep_users_permission_heads`
--
ALTER TABLE `ep_users_permission_heads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `ep_users_permission_list`
--
ALTER TABLE `ep_users_permission_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `ep_users_role`
--
ALTER TABLE `ep_users_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `ep_users_status`
--
ALTER TABLE `ep_users_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
