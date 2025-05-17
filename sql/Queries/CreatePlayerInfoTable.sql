USE testdb;

DROP TABLE IF EXISTS PlayerInfo;

CREATE TABLE PlayerInfo
SELECT Batting.*, Players.MLBAMID, Players.Headshot
FROM Players
LEFT JOIN Batting
ON Players.PlayerName = Batting.Player
WHERE PLAYER IS NOT NULL
ORDER BY WAR DESC;

SELECT "CreatePlayerInfoTable Complete";