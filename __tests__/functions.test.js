import { createConnection } from "net";
import { getPlayerFromDb } from "../apiHandlers/handlers.mjs";
import { getPlayer } from "../utils/setup/functions.mjs";
import { Connection } from "../node_modules/mysql2/typings/mysql/lib/Connection.d.ts"
import mysql from "mysql2"

const mockQueryResults = [
    {PlayerName: "John Doe", Headshot: "https://google.com"},
    {PlayerName: "Jane Doe", Headshot: "https://google.com"},
    {PlayerName: "Jeff Doe", Headshot: "https://google.com"}
];

const mockRes = {
    name: "John Doe",
    headshot: "https://google.com",
    status: jest.fn(),
    send: jest.fn(),
    set: jest.fn()
};

jest.mock('mysql2', () => ({
    createConnection: jest.fn({
        host: "localhost",
        user: "root",
        password: "password",
        database: "database"
    })
}))

jest.mock("../node_modules/mysql2/typings/mysql/lib/Connection.d.ts", () => ({
    connect: jest.fn(),
    query: jest.fn("SELECT * FROM db", () => mockQueryResults),
    end: jest.fn()
}))

jest.mock("../utils/setup/functions.mjs", () => ({
    getPlayer: jest.fn()
}))


describe('get player information', () => {
    it('should return code 200 and return player information from the database', () => {  

        getPlayerFromDb({}, mockRes)
        expect(getPlayer).toHaveBeenCalled()
        expect(Connection.query).toHaveBeenCalledWith("SELECT * FROM db")
        expect(mockRes.status).toHaveBeenLastCalledWith(200)
        expect(mockRes.send).toHaveBeenCalledWith(mockQueryResults[0])
    })

    it('should return 500 when response is falsey', () => {

        jest.replaceProperty(mockQueryResults[0], "PlayerName", "")

        getPlayerFromDb({}, mockRes)
        expect(mockRes.send).toHaveBeenCalledWith(null)
        expect(mockRes.status).toHaveBeenCalledWith(500)
    })

    it('check functions within getPlayer', async () => {
        await getPlayer();
        expect(mysql.createConnection).toHaveBeenCalled();
        expect(mysql.createConnection).toHaveBeenCalledWith({
            host: "localhost",
            user: "root",
            password: "password",
            database: "database"
        })
    })
});