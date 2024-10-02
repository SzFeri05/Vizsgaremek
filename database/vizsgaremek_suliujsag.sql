-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Okt 02. 19:14
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `vizsgaremek_suliujsag`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `diakok`
--

CREATE TABLE `diakok` (
  `diakID` int(11) NOT NULL COMMENT 'Elsődleges kulcs',
  `diakFelhasznaloNev` varchar(255) DEFAULT NULL COMMENT 'A diák által választott név',
  `diakTeljesNev` varchar(255) DEFAULT NULL COMMENT 'A diák teljes neve',
  `diakOsztaly` varchar(255) DEFAULT NULL COMMENT 'Az diák osztálya, pl.: ''13.C''',
  `diakEmail` varchar(255) DEFAULT NULL COMMENT 'Diák iskolai email címe',
  `diakJelszo` varchar(255) DEFAULT NULL COMMENT 'Diák jelszava',
  `diakIskolaID` int(11) DEFAULT NULL COMMENT 'Az iskola id-je, ahova a diák jár'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `diakok`
--

INSERT INTO `diakok` (`diakID`, `diakFelhasznaloNev`, `diakTeljesNev`, `diakOsztaly`, `diakEmail`, `diakJelszo`, `diakIskolaID`) VALUES
(1, 'Somaaaalol', 'Tivadari Soma István', '13.C', '13c-tivadaro@ipari.vein.hu', 'Jelszo123', 1),
(2, 'TesztJakab', 'Teszt Jakab', '12.E', '12e-tjakab@teszt.iskola.hu', 'Jelszo123', 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `iskolak`
--

CREATE TABLE `iskolak` (
  `iskID` int(11) NOT NULL COMMENT 'Elsődleges kulcs',
  `iskNev` varchar(255) DEFAULT NULL COMMENT 'Az intézmény teljes neve',
  `iskEmailVegzodes` varchar(255) DEFAULT NULL COMMENT 'Az iskolai email címek végződsése, pl.: ''ipari.vein.hu'''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `iskolak`
--

INSERT INTO `iskolak` (`iskID`, `iskNev`, `iskEmailVegzodes`) VALUES
(1, 'Veszprémi Szakképzési Centrum Ipari Technikum', 'ipari.vein.hu'),
(2, 'Teszt Iskola', 'teszt.iskola.hu');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `posztok`
--

CREATE TABLE `posztok` (
  `postID` int(11) NOT NULL COMMENT 'Elsődleges kulcs',
  `postCim` varchar(255) NOT NULL COMMENT 'A poszt címe, kötelező!',
  `postSzoveg` text NOT NULL COMMENT 'A poszt szövege, kötelező!',
  `postVanKep` tinyint(1) DEFAULT NULL COMMENT 'Tartozik-e a poszthoz kép',
  `postKepElerhetoseg` text DEFAULT NULL COMMENT 'Ha van kép, annak elérhetősége',
  `postLetrehozasDatuma` datetime DEFAULT current_timestamp() COMMENT 'év-hónap-nap óra:perc:mp amikor a posztot létrehozta a diák',
  `postElfogadva` tinyint(1) DEFAULT NULL COMMENT 'A posztot elfogaadta-e az admin, vagy sem',
  `postDiakID` int(11) DEFAULT NULL COMMENT 'A posztot kitevő diák id-ja'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `posztok`
--

INSERT INTO `posztok` (`postID`, `postCim`, `postSzoveg`, `postVanKep`, `postKepElerhetoseg`, `postLetrehozasDatuma`, `postElfogadva`, `postDiakID`) VALUES
(1, 'Próba poszt cím', 'Ez egy nagyon hosszú szöveg, ami felettébb nagyon hosszú, de tényleg. Gigászi. Leviathán. Bizánci. Stb... Ez amúgy a poszt szovege', 0, NULL, '2024-10-02 16:56:20', 1, 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `diakok`
--
ALTER TABLE `diakok`
  ADD PRIMARY KEY (`diakID`),
  ADD KEY `diakIskolaID` (`diakIskolaID`);

--
-- A tábla indexei `iskolak`
--
ALTER TABLE `iskolak`
  ADD PRIMARY KEY (`iskID`);

--
-- A tábla indexei `posztok`
--
ALTER TABLE `posztok`
  ADD PRIMARY KEY (`postID`),
  ADD KEY `postDiakID` (`postDiakID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `diakok`
--
ALTER TABLE `diakok`
  MODIFY `diakID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Elsődleges kulcs', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `iskolak`
--
ALTER TABLE `iskolak`
  MODIFY `iskID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Elsődleges kulcs', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `posztok`
--
ALTER TABLE `posztok`
  MODIFY `postID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Elsődleges kulcs', AUTO_INCREMENT=2;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `diakok`
--
ALTER TABLE `diakok`
  ADD CONSTRAINT `diakok_ibfk_1` FOREIGN KEY (`diakIskolaID`) REFERENCES `iskolak` (`iskID`);

--
-- Megkötések a táblához `posztok`
--
ALTER TABLE `posztok`
  ADD CONSTRAINT `posztok_ibfk_1` FOREIGN KEY (`postDiakID`) REFERENCES `diakok` (`diakID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
