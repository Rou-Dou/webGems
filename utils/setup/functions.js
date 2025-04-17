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
        response = results;
        player = response[0].FirstName + " " + response[0].LastName


    });

    connection.end();

    return player

};