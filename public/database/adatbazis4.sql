-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Gép: localhost:3306
-- Létrehozás ideje: 2025. Már 19. 19:00
-- Kiszolgáló verziója: 8.4.3
-- PHP verzió: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `13c_suliujsag`
--
CREATE DATABASE IF NOT EXISTS `13c_suliujsag` DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_hungarian_ci;
USE `13c_suliujsag`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cikkek`
--

CREATE TABLE `cikkek` (
  `id` int NOT NULL,
  `cim` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `szoveg` text COLLATE utf8mb3_hungarian_ci NOT NULL,
  `diak_id` int NOT NULL,
  `datum` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `elfogadva` tinyint(1) NOT NULL DEFAULT '0',
  `elfogadta_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `cikkek`
--

INSERT INTO `cikkek` (`id`, `cim`, `szoveg`, `diak_id`, `datum`, `elfogadva`, `elfogadta_id`) VALUES
(2, 'Első Cikk', 'EZ AZ ELSŐ CIKK, AMI AZ ADATBÁZISBAN VAN JUHUUUUUUUUUUUUUU', 1, '2025-01-13 11:53:29', 1, 1),
(4, 'Próba', 'Innen feltöltve', 1, '2025-02-03 11:46:01', 1, NULL),
(5, 'Helo', 'Soma', 1, '2025-02-24 12:44:11', 1, NULL),
(6, 'Helo', 'Világ', 1, '2025-02-24 12:49:33', 1, NULL),
(7, 'Helo', 'Világ', 3, '2025-02-24 12:51:22', 1, NULL),
(8, 'cikkspam', 'asd', 1, '2025-03-03 12:06:06', 1, NULL),
(9, 'cikkspam', 'asd', 1, '2025-03-03 12:06:10', 1, NULL),
(10, 'cikkspam', 'asd', 1, '2025-03-03 12:06:12', 1, NULL),
(11, 'cikkspam', 'asd', 1, '2025-03-03 12:06:15', 1, NULL),
(12, 'cikkspam', 'asd', 1, '2025-03-03 12:06:17', 1, NULL),
(13, 'cikkspam', 'asd', 1, '2025-03-03 12:06:20', 1, NULL),
(14, 'cikkspam', 'asd', 1, '2025-03-03 12:06:23', 1, NULL),
(15, 'cikkspam', 'asd', 1, '2025-03-03 12:06:29', 1, NULL),
(16, 'cikkspam', 'asd', 1, '2025-03-03 12:06:33', 1, NULL),
(17, 'cikkspam', 'asd', 1, '2025-03-03 12:06:35', 1, NULL),
(18, 'asd', 'asddd', 1, '2025-03-03 12:08:30', 1, NULL),
(19, 'asd', 'asdasdasdasd', 1, '2025-03-03 12:50:13', 1, 2),
(20, 'asd', 'asdasdasdasd', 1, '2025-03-03 12:50:16', 1, 2),
(21, 'asd', 'asdasdasdasd', 1, '2025-03-03 12:50:18', 1, 2),
(22, 'asd', 'asdasdasdasd', 1, '2025-03-03 12:50:21', 1, 2),
(23, 'asd', 'asdasdasdasd', 1, '2025-03-03 12:50:23', 1, 2),
(24, 'GipszJakab', 'MarKolos', 1, '2025-03-03 12:53:54', 1, 2),
(26, 'Karcsijé', 'Tároj', 6, '2025-03-17 12:10:13', 1, 2),
(27, 'Ez itt a Lajcsikájé', 'Kedvenc cikem te vagy', 2, '2025-03-17 12:13:06', 1, 2),
(29, 'as', 'as', 2, '2025-03-19 16:47:26', 1, 2),
(33, 'asda', 'sd', 2, '2025-03-19 17:37:15', 1, 2),
(34, '1', '1', 2, '2025-03-19 18:41:15', 0, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cikk_kep`
--

CREATE TABLE `cikk_kep` (
  `cikk_id` int NOT NULL,
  `kep_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `diakok`
--

CREATE TABLE `diakok` (
  `id` int NOT NULL,
  `nev` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `evfolyam` varchar(20) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `iskola_id` int NOT NULL,
  `szak_id` int DEFAULT NULL,
  `felhasznalonev` varchar(50) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `jelszo` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `adminE` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `diakok`
--

INSERT INTO `diakok` (`id`, `nev`, `email`, `evfolyam`, `iskola_id`, `szak_id`, `felhasznalonev`, `jelszo`, `adminE`) VALUES
(1, 'Tivadari Soma', '13c-tivadari@ipari.vein.hu', '13', 1, 1, 'Somaaaalol', '$2y$10$WgVt2xJQTbGSP9t1yWvSL.HmMRBdJcEi287nbvl8hQQxzs8nbwrVu', 1),
(2, 'Szammer Ferenc', '13c-szammer@ipari.vein.hu', '13', 1, 1, 'Lajos', '$2y$10$WgVt2xJQTbGSP9t1yWvSL.HmMRBdJcEi287nbvl8hQQxzs8nbwrVu', 1),
(3, 'Gipsz Jakab', 'gipsz.jakab@vetesi.hu', '12', 2, 1, 'G_Jakab', '$2y$10$WgVt2xJQTbGSP9t1yWvSL.HmMRBdJcEi287nbvl8hQQxzs8nbwrVu', 0),
(4, 'Minden Áron', '11a-mindenAron@ipari.vein.hu', '11', 1, 2, 'M_Aron69', '$2y$10$Ufrp18nqf31uXVlR9g.jGOawFp0tWgy10vkusKy4qosMlF0NISJj2', 0),
(5, 'Asd Asdasd', 'asd@gmail.com', '9', 1, 1, 'Asdimasdi', '$2y$10$uNszpBtS0UCPdhxHyFcGpujMEUvDKnSKtK0aYcw6BWbQNOKbK/.Tu', 0),
(6, 'Teszt Károj', 'teszt@gmail.com', '11', 1, 2, 'Tároj', '$2y$10$WgVt2xJQTbGSP9t1yWvSL.HmMRBdJcEi287nbvl8hQQxzs8nbwrVu', 0),
(7, 'Teszt Jakab Sándor', '11g-teszt@ipari.vein.hu', '11', 1, 7, 'JakiSanyi', '$2y$10$ZFPRe65EU/PPaZcpi9WdFeMODpdH.I2ypjSFSr8aXwPC3jStQS3dS', 0),
(8, 'Szabó Ádám', '09c-szabo@ipari.vein.hu', '9', 1, 1, 'Sz_Adam12', '$2y$10$fwJQMEEpPye9Pu3RnQY/oud0OJUFHpxpGtcg805/aGMwloVdjykHG', 0),
(9, 'Asd Asd', '11c-asd@ipari.vein.hu', '11', 1, 1, 'aSd', '$2y$10$KvCx4.BlIBBEsALkz.zFbeVZQM7jaG/LBqYUIbegLKkB5QZr1okNe', 0);

--
-- Eseményindítók `diakok`
--
DELIMITER $$
CREATE TRIGGER `diakok_nagybetus_nev` BEFORE INSERT ON `diakok` FOR EACH ROW BEGIN
  SET NEW.nev = LOWER(NEW.nev);
  SET @szokoz_poz = LOCATE(' ', NEW.nev);
  SET @elozo_szokoz_poz = 0;

  WHILE @szokoz_poz > 0 DO
    SET NEW.nev = INSERT(NEW.nev, @elozo_szokoz_poz + 1, 1, UCASE(SUBSTRING(NEW.nev, @elozo_szokoz_poz + 1, 1)));
    SET @elozo_szokoz_poz = @szokoz_poz;
    SET @szokoz_poz = LOCATE(' ', NEW.nev, @elozo_szokoz_poz + 1);
  END WHILE;

  SET NEW.nev = INSERT(NEW.nev, @elozo_szokoz_poz + 1, 1, UCASE(SUBSTRING(NEW.nev, @elozo_szokoz_poz + 1, 1)));
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `diakok_nagybetus_nev_update` BEFORE UPDATE ON `diakok` FOR EACH ROW BEGIN
  SET NEW.nev = LOWER(NEW.nev);
  SET @szokoz_poz = LOCATE(' ', NEW.nev);
  SET @elozo_szokoz_poz = 0;

  WHILE @szokoz_poz > 0 DO
    SET NEW.nev = INSERT(NEW.nev, @elozo_szokoz_poz + 1, 1, UCASE(SUBSTRING(NEW.nev, @elozo_szokoz_poz + 1, 1)));
    SET @elozo_szokoz_poz = @szokoz_poz;
    SET @szokoz_poz = LOCATE(' ', NEW.nev, @elozo_szokoz_poz + 1);
  END WHILE;

  SET NEW.nev = INSERT(NEW.nev, @elozo_szokoz_poz + 1, 1, UCASE(SUBSTRING(NEW.nev, @elozo_szokoz_poz + 1, 1)));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `iskolak`
--

CREATE TABLE `iskolak` (
  `id` int NOT NULL,
  `nev` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `evfolyamDarab` int NOT NULL,
  `cim` varchar(255) COLLATE utf8mb3_hungarian_ci DEFAULT NULL,
  `telefon` varchar(20) COLLATE utf8mb3_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `iskolak`
--

INSERT INTO `iskolak` (`id`, `nev`, `evfolyamDarab`, `cim`, `telefon`) VALUES
(1, 'Veszprémi Szakképzési Centrum Ipari Technikum', 6, '8200. Veszprém, Iskola u. 4.', '+36301256604'),
(2, 'Vetési Albert Gimnázium', 4, '8200. Veszprém, Kitalált utca 5.', '+36301256604');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `iskola_szak`
--

CREATE TABLE `iskola_szak` (
  `iskola_id` int NOT NULL,
  `szak_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `iskola_szak`
--

INSERT INTO `iskola_szak` (`iskola_id`, `szak_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kepek`
--

CREATE TABLE `kepek` (
  `id` int NOT NULL,
  `kepNeve` varchar(255) COLLATE utf8mb3_hungarian_ci DEFAULT NULL,
  `kepMime` varchar(255) COLLATE utf8mb3_hungarian_ci DEFAULT NULL,
  `kepAdat` longblob,
  `feltoltesDatuma` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `elfogadva` tinyint DEFAULT NULL,
  `feltoltoId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szakok`
--

CREATE TABLE `szakok` (
  `id` int NOT NULL,
  `nev` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `szakJeloles` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `szakok`
--

INSERT INTO `szakok` (`id`, `nev`, `szakJeloles`) VALUES
(1, 'Szoftverfejlesztő és -tesztelő', 'C'),
(2, 'Vegyész technikus', 'A'),
(3, 'Környezetvédelmi technikus', 'B'),
(4, 'Gépgyártás-technológiai technikus', 'D'),
(5, 'Mechatronikai technikus', 'E'),
(6, 'Műanyag-feldolgozó technikus', 'F'),
(7, 'Kisgyermekgondozó, -nevelő', 'G');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `cikkek`
--
ALTER TABLE `cikkek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `diak_id` (`diak_id`),
  ADD KEY `fk_elfogadta` (`elfogadta_id`);

--
-- A tábla indexei `cikk_kep`
--
ALTER TABLE `cikk_kep`
  ADD PRIMARY KEY (`cikk_id`,`kep_id`),
  ADD KEY `kep_id` (`kep_id`),
  ADD KEY `cikk_id` (`cikk_id`);

--
-- A tábla indexei `diakok`
--
ALTER TABLE `diakok`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `felhasznalonev` (`felhasznalonev`),
  ADD KEY `iskola_id` (`iskola_id`),
  ADD KEY `szak_id` (`szak_id`);

--
-- A tábla indexei `iskolak`
--
ALTER TABLE `iskolak`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nev` (`nev`);

--
-- A tábla indexei `iskola_szak`
--
ALTER TABLE `iskola_szak`
  ADD PRIMARY KEY (`iskola_id`,`szak_id`),
  ADD KEY `szak_id` (`szak_id`);

--
-- A tábla indexei `kepek`
--
ALTER TABLE `kepek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `feltoltoId` (`feltoltoId`);

--
-- A tábla indexei `szakok`
--
ALTER TABLE `szakok`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nev` (`nev`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `cikkek`
--
ALTER TABLE `cikkek`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT a táblához `diakok`
--
ALTER TABLE `diakok`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `iskolak`
--
ALTER TABLE `iskolak`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `kepek`
--
ALTER TABLE `kepek`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `szakok`
--
ALTER TABLE `szakok`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `cikkek`
--
ALTER TABLE `cikkek`
  ADD CONSTRAINT `cikkek_ibfk_1` FOREIGN KEY (`diak_id`) REFERENCES `diakok` (`id`),
  ADD CONSTRAINT `fk_elfogadta` FOREIGN KEY (`elfogadta_id`) REFERENCES `diakok` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Megkötések a táblához `cikk_kep`
--
ALTER TABLE `cikk_kep`
  ADD CONSTRAINT `cikk_kep_ibfk_1` FOREIGN KEY (`cikk_id`) REFERENCES `cikkek` (`id`),
  ADD CONSTRAINT `cikk_kep_ibfk_2` FOREIGN KEY (`kep_id`) REFERENCES `kepek` (`id`);

--
-- Megkötések a táblához `diakok`
--
ALTER TABLE `diakok`
  ADD CONSTRAINT `diakok_ibfk_1` FOREIGN KEY (`iskola_id`) REFERENCES `iskolak` (`id`),
  ADD CONSTRAINT `diakok_ibfk_2` FOREIGN KEY (`szak_id`) REFERENCES `szakok` (`id`);

--
-- Megkötések a táblához `iskola_szak`
--
ALTER TABLE `iskola_szak`
  ADD CONSTRAINT `iskola_szak_ibfk_1` FOREIGN KEY (`iskola_id`) REFERENCES `iskolak` (`id`),
  ADD CONSTRAINT `iskola_szak_ibfk_2` FOREIGN KEY (`szak_id`) REFERENCES `szakok` (`id`);

--
-- Megkötések a táblához `kepek`
--
ALTER TABLE `kepek`
  ADD CONSTRAINT `kepek_ibfk_1` FOREIGN KEY (`feltoltoId`) REFERENCES `diakok` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
