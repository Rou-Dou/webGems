    // server.js
    import * as functions from "./utils/setup/functions.js"
    import express from "express";
    import cors from "cors";
    const app = express();
    const port = 8080;
    let gameSessions;

    gameSessions = {Sessions: []};
    functions.log("test log", 200);

    app.use(cors());
    app.use(express.static("public"));

    app.get("/getplayer", (req, res) => {
      const response = functions.getPlayer();
      console.log("this is a message: ", response);

      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET");
      res.set("Content-Type", "text/plain");
      res.send(response);
    });

    app.get("/getSessionToken", (req, res) => {
      functions.generateNewSession()
      .then((value) => {
        gameSessions.Sessions.push(value);

        console.log("New Session: ", value);
        console.log(gameSessions);
        console.log("Session ID: ", value.sessionID);
        console.log("headshot ---->", value.headshot)
  
        res.set("Access-Control-Allow-Origin", "*");
        res.set("Access-Control-Allow-Methods", "GET");
        res.set("Content-Type", "text/plain");
        res.send(value.sessionID);
      })
    });

    app.get("/getSessionInfo:token", (req, res) => {
      const token = req.params.token.replace(":","").trim();
      const sessionInfo = functions.searchSession(gameSessions.Sessions, token);

      console.log("the session info: ", sessionInfo);
      console.log("This is the session info value: ", sessionInfo);
      
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET");
      res.set("Content-Type", "application/json");
      res.send(sessionInfo);
    })

    app.get("/makeGuess/:token/:guess", (req, res) => {
      console.log("This is a guess")
      console.log("req token ---->", req.params.token)
      console.log("req guess ---->", req.params.guess)
      const token = req.params.token.replace(":", "").trim();
      const sessionInfo = functions.searchSession(gameSessions.Sessions, token);
      const guess = req.params.guess

      if (guess === sessionInfo.answer) {
        res.send(true)
      }
      else res.send(false)
    })

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });