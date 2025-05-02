USE testdb;

DROP TABLE IF EXISTS Players;

CREATE TABLE Players (
	PlayerName varchar(50), 
	MLBAMID varchar(10) NOT NULL,
    Team varchar(5), 
    STD_POS varchar(20), 
    FirstName varchar(50), 
    LastName varchar(50),
    Headshot varchar(255)
);
LOAD DATA INFILE "C:/ProgramData/MySQL/MySQL Server 8.4/Uploads/razzball.csv"
INTO TABLE Players
COLUMNS TERMINATED BY ','
LINES TERMINATED BY '\n';

SELECT * FROM Players
LIMIT 100