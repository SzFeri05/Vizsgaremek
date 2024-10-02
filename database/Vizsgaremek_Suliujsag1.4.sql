CREATE TABLE `iskolak` (
  `iskID` integer PRIMARY KEY COMMENT 'Elsődleges kulcs',
  `iskNev` varchar(255) COMMENT 'Az intézmény teljes neve',
  `iskEmailVegzodes` varchar(255) COMMENT 'Az iskolai email címek végződsése, pl.: ''ipari.vein.hu'''
);

CREATE TABLE `diakok` (
  `diakID` integer PRIMARY KEY COMMENT 'Elsődleges kulcs',
  `diakFelhasznaloNev` varchar(255) COMMENT 'A diák által választott név',
  `diakTeljesNev` varchar(255) COMMENT 'A diák teljes neve',
  `diakOsztaly` varchar(255) COMMENT 'Az diák osztálya, pl.: ''13.C''',
  `diakEmail` varchar(255) COMMENT 'Diák iskolai email címe',
  `diakJelszo` varchar(255) COMMENT 'Diák jelszava',
  `diakIskolaID` integer COMMENT 'Az iskola id-je, ahova a diák jár'
);

CREATE TABLE `posztok` (
  `postID` integer PRIMARY KEY COMMENT 'Elsődleges kulcs',
  `postCim` varchar(255) COMMENT 'A poszt címe, kötelező!',
  `postSzoveg` text COMMENT 'A poszt szövege, kötelező!',
  `postVanKep` bool COMMENT 'Tartozik-e a poszthoz kép',
  `postKepElerhetoseg` text COMMENT 'Ha van kép, annak elérhetősége',
  `postLetrehozasDatuma` datetime COMMENT 'év-hónap-nap óra:perc:mp amikor a posztot létrehozta a diák',
  `postElfogadva` bool COMMENT 'A posztot elfogaadta-e az admin, vagy sem',
  `postDiakID` integer COMMENT 'A posztot kitevő diák id-ja'
);

ALTER TABLE `diakok` ADD FOREIGN KEY (`diakIskolaID`) REFERENCES `iskolak` (`iskID`);

ALTER TABLE `posztok` ADD FOREIGN KEY (`postDiakID`) REFERENCES `diakok` (`diakID`);
