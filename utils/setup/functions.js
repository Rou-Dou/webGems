import mysql, { Connection } from "mysql2"

export async function getPlayer() {
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

    const myPromise = await new Promise((myResolve, myError) => {
        myResolve(player);
        myError("error");
    });

    return myPromise
};