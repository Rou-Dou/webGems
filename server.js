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
      const response = await functions.getPlayer()
      console.log("this is a message: ", response);
      res.set("Content-Type", "text/plain");
      res.send(response);
    });

    app.get("/getSessionToken", async (req, res) => {
      const newSession = await functions.generateNewSession();
      console.log("Created a new session: ", newSession);
      gameSessions.Sessions.push(newSession);
      console.log(gameSessions);
      res.set("Content-Type", "text/plain");
      res.send(newSession.sessionID);
      console.log("Session ID: ", newSession.sessionID);
    });

    app.get("/getSessionInfo:token", async (req, res) => {
      console.log("params: ", req.params.token)
      const sessionInfo = functions.searchSession(req.params.token);
      console.log("the session info: ", sessionInfo)
      let returnInfo = sessionInfo.then((value) => {
        console.log("This is the session info value: ", value)
        return value
      })
      console.log('returned info: ', returnInfo)
      res.set("Content-Type", "application/json");
      res.send(returnInfo);
      console.log("parsed info: ", returnInfo)
    }); 

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });