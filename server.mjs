    // server.js
    import { getPlayer, generateNewSession, searchSession, log } from "./utils/setup/functions.mjs"
    import { getPlayerFromDb } from "./apiHandlers/handlers.mjs"
    import express from "express";
    import cors from "cors";
    const app = express();
    const port = 8080;
    let gameSessions;

    gameSessions = {Sessions: []};

    app.use(cors());
    app.use(express.static("public"));

    app.get("/api/getplayer", getPlayerFromDb)

    app.get("/api/getSessionToken", (req, res) => {
      generateNewSession()
      .then((value) => {
        gameSessions.Sessions.push(value);

        console.log("New Session: ", value);
        console.log(gameSessions);
        console.log("Session ID: ", value.sessionID);
        console.log("headshot ---->", value.headshot)
        
        res.status(200)
        res.set("Access-Control-Allow-Origin", "*");
        res.set("Access-Control-Allow-Methods", "GET");
        res.set("Content-Type", "text/plain");
        res.send(value.sessionID);
      })
    });

    app.get("/api/getSessionInfo:token", (req, res) => {
      const token = req.params.token.replace(":","").trim();
      const sessionInfo = searchSession(gameSessions.Sessions, token);

      console.log("the session info: ", sessionInfo);
      console.log("This is the session info value: ", sessionInfo);
      
      res.status(200)
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET");
      res.set("Content-Type", "application/json");
      res.send(sessionInfo);
    })

    app.get("/api/makeGuess/:token/:guess", (req, res) => {
      console.log("This is a guess")
      console.log("req token ---->", req.params.token)
      console.log("req guess ---->", req.params.guess)
      const token = req.params.token.replace(":", "").trim();
      const sessionInfo = searchSession(gameSessions.Sessions, token);
      const guess = req.params.guess

      res.status(200)

      if (guess === sessionInfo.answer) {
        res.send(true)
      }
      else res.send(false)
    })

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });