-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Jan 13. 12:14
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
-- Adatbázis: `13c_suliujsag`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `adminok`
--

CREATE TABLE `adminok` (
  `id` int(11) NOT NULL,
  `felhasznalonev` varchar(50) NOT NULL,
  `jelszo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `adminok`
--

INSERT INTO `adminok` (`id`, `felhasznalonev`, `jelszo`, `email`) VALUES
(1, 'KisKacsa69', '1', '13c-szammer@ipari.vein.hu');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cikkek`
--

CREATE TABLE `cikkek` (
  `id` int(11) NOT NULL,
  `cim` varchar(255) NOT NULL,
  `szoveg` text NOT NULL,
  `diak_id` int(11) NOT NULL,
  `datum` datetime NOT NULL DEFAULT current_timestamp(),
  `elfogadva` tinyint(1) NOT NULL DEFAULT 0,
  `elfogadta_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `cikkek`
--

INSERT INTO `cikkek` (`id`, `cim`, `szoveg`, `diak_id`, `datum`, `elfogadva`, `elfogadta_id`) VALUES
(2, 'Első Cikk', 'EZ AZ ELSŐ CIKK, AMI AZ ADATBÁZISBAN VAN JUHUUUUUUUUUUUUUU', 1, '2025-01-13 11:53:29', 1, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cikk_kep`
--

CREATE TABLE `cikk_kep` (
  `cikk_id` int(11) NOT NULL,
  `kep_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `cikk_kep`
--

INSERT INTO `cikk_kep` (`cikk_id`, `kep_id`) VALUES
(2, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `diakok`
--

CREATE TABLE `diakok` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `osztaly` varchar(20) NOT NULL,
  `iskola_id` int(11) NOT NULL,
  `szak_id` int(11) DEFAULT NULL,
  `felhasznalonev` varchar(50) NOT NULL,
  `jelszo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `diakok`
--

INSERT INTO `diakok` (`id`, `nev`, `email`, `osztaly`, `iskola_id`, `szak_id`, `felhasznalonev`, `jelszo`) VALUES
(1, 'Tivadari Soma', '13c-tivadari@ipari.vein.hu', '13.C', 1, 1, 'Somaaaalol', '1');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `iskolak`
--

CREATE TABLE `iskolak` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `evfolyamDarab` int(11) NOT NULL,
  `cim` varchar(255) DEFAULT NULL,
  `telefon` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `iskolak`
--

INSERT INTO `iskolak` (`id`, `nev`, `evfolyamDarab`, `cim`, `telefon`) VALUES
(1, 'Veszprémi Szakképzési Centrum Ipari Technikum', 6, '8200. Veszprém, Iskola u. 4.', '+36301256604');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `iskola_szak`
--

CREATE TABLE `iskola_szak` (
  `iskola_id` int(11) NOT NULL,
  `szak_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

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
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `leiras` text DEFAULT NULL,
  `feltolto_id` int(11) NOT NULL,
  `datum` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `kepek`
--

INSERT INTO `kepek` (`id`, `url`, `leiras`, `feltolto_id`, `datum`) VALUES
(1, 'randomURL', 'Ez a kép leírása', 1, '2025-01-13 11:53:54');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szakok`
--

CREATE TABLE `szakok` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `szakJeloles` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

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
-- A tábla indexei `adminok`
--
ALTER TABLE `adminok`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `felhasznalonev` (`felhasznalonev`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `cikkek`
--
ALTER TABLE `cikkek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `diak_id` (`diak_id`),
  ADD KEY `elfogadta_id` (`elfogadta_id`);

--
-- A tábla indexei `cikk_kep`
--
ALTER TABLE `cikk_kep`
  ADD PRIMARY KEY (`cikk_id`,`kep_id`),
  ADD KEY `kep_id` (`kep_id`);

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
  ADD KEY `feltolto_id` (`feltolto_id`);

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
-- AUTO_INCREMENT a táblához `adminok`
--
ALTER TABLE `adminok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `cikkek`
--
ALTER TABLE `cikkek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `diakok`
--
ALTER TABLE `diakok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `iskolak`
--
ALTER TABLE `iskolak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `kepek`
--
ALTER TABLE `kepek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `szakok`
--
ALTER TABLE `szakok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `cikkek`
--
ALTER TABLE `cikkek`
  ADD CONSTRAINT `cikkek_ibfk_1` FOREIGN KEY (`diak_id`) REFERENCES `diakok` (`id`),
  ADD CONSTRAINT `cikkek_ibfk_2` FOREIGN KEY (`elfogadta_id`) REFERENCES `adminok` (`id`);

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
  ADD CONSTRAINT `kepek_ibfk_1` FOREIGN KEY (`feltolto_id`) REFERENCES `diakok` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
