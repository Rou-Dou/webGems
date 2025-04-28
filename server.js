    // server.js
    import * as functions from "./utils/setup/functions.js"
    import express from "express";
    import cors from "cors";
    const app = express();
    const port = 8080;
    let gameSessions;

    gameSessions = {Sessions: []}

    app.use(cors());
    app.use(express.static("public"));

    app.get("/getplayer", async (req, res) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET");
      const response = await functions.getPlayer()
      console.log("this is a message: ", response);
      res.set("Content-Type", "text/plain");
      res.send(response);
    });

    app.get("/getSessionToken", async (req, res) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET");
      const newSession = await functions.generateNewSession()
      .then((value) => {
        gameSessions.Sessions.push(value);
        console.log("New Session: ", value);
        console.log(gameSessions);
      });
      res.set("Content-Type", "text/plain");
      res.send(newSession.sessionID);
      console.log("Session ID: ", newSession.sessionID);
    });

    app.get("/getSessionInfo:token", async (req, res) => {
      res.set("Access-Control-Allow-Methods", "GET");
      res.set("Content-Type", "application/json");
      console.log("params: ", req.params.token)
      const sessionInfo = functions.searchSession(req.params.token);
      console.log("the session info: ", sessionInfo)
      let returnInfo = sessionInfo.then((value) => {
        console.log("This is the session info value: ", value)
        return value
      })
      console.log('returned info: ', returnInfo)
      res.set("Access-Control-Allow-Origin", "*");
      res.send(returnInfo);
      console.log("parsed info: ", returnInfo)
    }); 

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });