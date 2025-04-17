import mysql, { Connection } from "mysql2"

export function getPlayer() {
    let connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Wgtfyghtf90)",
        database: "testdb"
    });

    connection.connect();

    let player;

    connection.query('SELECT * FROM Players', function(error, results, fields) {
        if (error) throw error;
        console.log('Here is stuff', results, typeof results)
        player = results[0].FirstName + " " + results[0].LastName
        console.log(player)
    });

    connection.end();

    return player

};