-- Create Database
CREATE DATABASE IF NOT EXISTS `13c_suliujsag` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `13c_suliujsag`;

-- Create Tables
DROP TABLE IF EXISTS `adminok`;
CREATE TABLE `adminok` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `felhasznalonev` varchar(50) NOT NULL,
  `jelszo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `felhasznalonev` (`felhasznalonev`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

DROP TABLE IF EXISTS `diakok`;
CREATE TABLE `diakok` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nev` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `evfolyam` varchar(20) NOT NULL,
  `iskola_id` int(11) NOT NULL,
  `szak_id` int(11) DEFAULT NULL,
  `felhasznalonev` varchar(50) NOT NULL,
  `jelszo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `felhasznalonev` (`felhasznalonev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

DROP TABLE IF EXISTS `iskolak`;
CREATE TABLE `iskolak` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nev` varchar(255) NOT NULL,
  `evfolyamDarab` int(11) NOT NULL,
  `cim` varchar(255) DEFAULT NULL,
  `telefon` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nev` (`nev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

DROP TABLE IF EXISTS `szakok`;
CREATE TABLE `szakok` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nev` varchar(255) NOT NULL,
  `szakJeloles` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nev` (`nev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

DROP TABLE IF EXISTS `cikkek`;
CREATE TABLE `cikkek` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cim` varchar(255) NOT NULL,
  `szoveg` text NOT NULL,
  `diak_id` int(11) NOT NULL,
  `datum` datetime NOT NULL DEFAULT current_timestamp(),
  `elfogadva` tinyint(1) NOT NULL DEFAULT 0,
  `elfogadta_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

DROP TABLE IF EXISTS `kepek`;
CREATE TABLE `kepek` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `kepNeve` VARCHAR(255),
    `kepMime` VARCHAR(255),
    `kepAdat` LONGBLOB,
    `feltoltesDatuma` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `elfogadva` TINYINT,
    `feltoltoId` INT(11),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

DROP TABLE IF EXISTS `iskola_szak`;
CREATE TABLE `iskola_szak` (
  `iskola_id` int(11) NOT NULL,
  `szak_id` int(11) NOT NULL,
  PRIMARY KEY (`iskola_id`,`szak_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

DROP TABLE IF EXISTS `cikk_kep`;
CREATE TABLE `cikk_kep` (
  `cikk_id` int(11) NOT NULL,
  `kep_id` int(11) NOT NULL,
  PRIMARY KEY (`cikk_id`, `kep_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- Insert Initial Data
INSERT INTO `adminok` (`id`, `felhasznalonev`, `jelszo`, `email`) VALUES
(1, 'KisKacsa69', '1', '13c-szammer@ipari.vein.hu');

INSERT INTO `diakok` (`id`, `nev`, `email`, `evfolyam`, `iskola_id`, `szak_id`, `felhasznalonev`, `jelszo`) VALUES
(1, 'Tivadari Soma', '13c-tivadari@ipari.vein.hu', '13', 1, 1, 'Somaaaalol', '$2y$10$WgVt2xJQTbGSP9t1yWvSL.HmMRBdJcEi287nbvl8hQQxzs8nbwrVu'),
(2, 'Szammer Ferenc', '13c-szammer@ipari.vein.hu', '13', 1, 1, 'Lajos', '$2y$10$WgVt2xJQTbGSP9t1yWvSL.HmMRBdJcEi287nbvl8hQQxzs8nbwrVu'),
(3, 'Gipsz Jakab', 'gipsz.jakab@vetesi.hu', '12', 2, 1, 'G_Jakab', '$2y$10$WgVt2xJQTbGSP9t1yWvSL.HmMRBdJcEi287nbvl8hQQxzs8nbwrVu'),
(4, 'Minden Áron', '11a-mindenAron@ipari.vein.hu', '11', 1, 2, 'M_Aron69', '$2y$10$Ufrp18nqf31uXVlR9g.jGOawFp0tWgy10vkusKy4qosMlF0NISJj2'),
(5, 'Asd Asdasd', 'asd@gmail.com', '9', 1, 1, 'Asdimasdi', '$2y$10$uNszpBtS0UCPdhxHyFcGpujMEUvDKnSKtK0aYcw6BWbQNOKbK/.Tu'),
(6, 'Teszt Károj', 'teszt@gmail.com', '11', 1, 2, 'Tároj', '$2y$10$WgVt2xJQTbGSP9t1yWvSL.HmMRBdJcEi287nbvl8hQQxzs8nbwrVu');

INSERT INTO `iskolak` (`id`, `nev`, `evfolyamDarab`, `cim`, `telefon`) VALUES
(1, 'Veszprémi Szakképzési Centrum Ipari Technikum', 6, '8200. Veszprém, Iskola u. 4.', '+36301256604'),
(2, 'Vetési Albert Gimnázium', 4, '8200. Veszprém, Kitalált utca 5.', '+36301256604');

INSERT INTO `szakok` (`id`, `nev`, `szakJeloles`) VALUES
(1, 'Szoftverfejlesztő és -tesztelő', 'C'),
(2, 'Vegyész technikus', 'A'),
(3, 'Környezetvédelmi technikus', 'B'),
(4, 'Gépgyártás-technológiai technikus', 'D'),
(5, 'Mechatronikai technikus', 'E'),
(6, 'Műanyag-feldolgozó technikus', 'F'),
(7, 'Kisgyermekgondozó, -nevelő', 'G');

INSERT INTO `cikkek` (`id`, `cim`, `szoveg`, `diak_id`, `datum`, `elfogadva`, `elfogadta_id`) VALUES
(2, 'Első Cikk', 'EZ AZ ELSŐ CIKK, AMI AZ ADATBÁZISBAN VAN JUHUUUUUUUUUUUUUU', 1, '2025-01-13 11:53:29', 1, 1),
(4, 'Próba', 'Innen feltöltve', 1, '2025-02-03 11:46:01', 0, NULL),
(5, 'Helo', 'Soma', 1, '2025-02-24 12:44:11', 0, NULL),
(6, 'Helo', 'Világ', 1, '2025-02-24 12:49:33', 0, NULL),
(7, 'Helo', 'Világ', 3, '2025-02-24 12:51:22', 0, NULL),
(8, 'cikkspam', 'asd', 1, '2025-03-03 12:06:06', 0, NULL),
(9, 'cikkspam', 'asd', 1, '2025-03-03 12:06:10', 0, NULL),
(10, 'cikkspam', 'asd', 1, '2025-03-03 12:06:12', 0, NULL),
(11, 'cikkspam', 'asd', 1, '2025-03-03 12:06:15', 0, NULL),
(12, 'cikkspam', 'asd', 1, '2025-03-03 12:06:17', 0, NULL),
(13, 'cikkspam', 'asd', 1, '2025-03-03 12:06:20', 0, NULL),
(14, 'cikkspam', 'asd', 1, '2025-03-03 12:06:23', 0, NULL),
(15, 'cikkspam', 'asd', 1, '2025-03-03 12:06:29', 0, NULL),
(16, 'cikkspam', 'asd', 1, '2025-03-03 12:06:33', 0, NULL),
(17, 'cikkspam', 'asd', 1, '2025-03-03 12:06:35', 0, NULL),
(18, 'asd', 'asddd', 1, '2025-03-03 12:08:30', 0, NULL),
(19, 'asd', 'asdasdasdasd', 1, '2025-03-03 12:50:13', 0, NULL),
(20, 'asd', 'asdasdasdasd', 1, '2025-03-03 12:50:16', 0, NULL),
(21, 'asd', 'asdasdasdasd', 1, '2025-03-03 12:50:18', 0, NULL),
(22, 'asd', 'asdasdasdasd', 1, '2025-03-03 12:50:21', 0, NULL),
(23, 'asd', 'asdasdasdasd', 1, '2025-03-03 12:50:23', 0, NULL),
(24, 'GipszJakab', 'MarKolos', 1, '2025-03-03 12:53:54', 0, NULL);

INSERT INTO `iskola_szak` (`iskola_id`, `szak_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7);

-- Add Foreign Key Constraints
ALTER TABLE `diakok`
  ADD KEY `iskola_id` (`iskola_id`),
  ADD KEY `szak_id` (`szak_id`);

ALTER TABLE `cikkek`
  ADD KEY `diak_id` (`diak_id`);

ALTER TABLE `kepek`
  ADD KEY `feltoltoId` (`feltoltoId`);

ALTER TABLE `iskola_szak`
  ADD KEY `szak_id` (`szak_id`);

ALTER TABLE `cikk_kep`
  ADD KEY `kep_id` (`kep_id`);

ALTER TABLE `cikk_kep`
  ADD KEY `cikk_id` (`cikk_id`);

ALTER TABLE `diakok`
  ADD CONSTRAINT `diakok_ibfk_1` FOREIGN KEY (`iskola_id`) REFERENCES `iskolak` (`id`),
  ADD CONSTRAINT `diakok_ibfk_2` FOREIGN KEY (`szak_id`) REFERENCES `szakok` (`id`);

ALTER TABLE `cikkek`
  ADD CONSTRAINT `cikkek_ibfk_1` FOREIGN KEY (`diak_id`) REFERENCES `diakok` (`id`);

ALTER TABLE `kepek`
  ADD CONSTRAINT `kepek_ibfk_1` FOREIGN KEY (`feltoltoId`) REFERENCES `diakok` (`id`);

ALTER TABLE `iskola_szak`
  ADD CONSTRAINT `iskola_szak_ibfk_1` FOREIGN KEY (`iskola_id`) REFERENCES `iskolak` (`id`),
  ADD CONSTRAINT `iskola_szak_ibfk_2` FOREIGN KEY (`szak_id`) REFERENCES `szakok` (`id`);

ALTER TABLE `cikk_kep`
  ADD CONSTRAINT `cikk_kep_ibfk_1` FOREIGN KEY (`cikk_id`) REFERENCES `cikkek` (`id`),
  ADD CONSTRAINT `cikk_kep_ibfk_2` FOREIGN KEY (`kep_id`) REFERENCES `kepek` (`id`);

-- Add Triggers (Optional)
DROP TRIGGER IF EXISTS `diakok_nagybetus_nev`;
DELIMITER $$
CREATE TRIGGER `diakok_nagybetus_nev` BEFORE INSERT ON `diakok` FOR EACH ROW
BEGIN
  SET NEW.nev = LOWER(NEW.nev);
  SET @szokoz_poz = LOCATE(' ', NEW.nev);
  SET @elozo_szokoz_poz = 0;

  WHILE @szokoz_poz > 0 DO
    SET NEW.nev = INSERT(NEW.nev, @elozo_szokoz_poz + 1, 1, UCASE(SUBSTRING(NEW.nev, @elozo_szokoz_poz + 1, 1)));
    SET @elozo_szokoz_poz = @szokoz_poz;
    SET @szokoz_poz = LOCATE(' ', NEW.nev, @elozo_szokoz_poz + 1);
  END WHILE;

  SET NEW.nev = INSERT(NEW.nev, @elozo_szokoz_poz + 1, 1, UCASE(SUBSTRING(NEW.nev, @elozo_szokoz_poz + 1, 1)));
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS `diakok_nagybetus_nev_update`;
DELIMITER $$
CREATE TRIGGER `diakok_nagybetus_nev_update` BEFORE UPDATE ON `diakok` FOR EACH ROW
BEGIN
  SET NEW.nev = LOWER(NEW.nev);
  SET @szokoz_poz = LOCATE(' ', NEW.nev);
  SET @elozo_szokoz_poz = 0;

  WHILE @szokoz_poz > 0 DO
    SET NEW.nev = INSERT(NEW.nev, @elozo_szokoz_poz + 1, 1, UCASE(SUBSTRING(NEW.nev, @elozo_szokoz_poz + 1, 1)));
    SET @elozo_szokoz_poz = @szokoz_poz;
    SET @szokoz_poz = LOCATE(' ', NEW.nev, @elozo_szokoz_poz + 1);
  END WHILE;

  SET NEW.nev = INSERT(NEW.nev, @elozo_szokoz_poz + 1, 1, UCASE(SUBSTRING(NEW.nev, @elozo_szokoz_poz + 1, 1)));
END$$
DELIMITER ;