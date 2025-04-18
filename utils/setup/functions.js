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
        player = results[0].FirstName + " " + results[0].LastName
        console.log("Player: ", player)
    });

    connection.end();

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (player != "") {
                resolve(player)
            }
            else {
                reject("error")
            }
        }, 1500)
    });
}