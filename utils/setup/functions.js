import jsonData from "../../players.json" with { type: "json"}
import { mysql } from "mysql";

export function getPlayer() {
    let connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Wgtfyghtf90)",
        database: "testdb"
    });

    connection.connect();

    connection.query('SELECT * FROM Players', function(error, results, fields) {
        if (error) throw error;
        console.log('Here is stuff', results)
    });

    connection.end();
};