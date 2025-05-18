    // server.js
  import { getPlayerFromDb, getSessionToken, getSessionInfo, makeGuess, getPlayerList} from "./apiHandlers/handlers.mjs"
  import express from "express";
  import cors from "cors";
  const app = express();
  const port = 8080;
  export let gameSessions;

  gameSessions = {Sessions: []};

  app.use(cors());
  app.use(express.static("public"));

  app.get("/api/getPlayerList", getPlayerList);

  app.get("/api/getplayer", getPlayerFromDb);

  app.get("/api/getSessionToken", getSessionToken);

  app.get("/api/getSessionInfo/:token", getSessionInfo);

  app.get("/api/makeGuess/:token/:guess", makeGuess);

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });