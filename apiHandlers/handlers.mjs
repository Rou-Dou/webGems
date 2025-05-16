import { getRandomPlayer, generateNewSession, searchSession } from "../utils/setup/functions.mjs";
import { players } from "../resources/resources.mjs";
import { gameSessions } from "../server.mjs";


// returns a random player object to be used for the session answer.
export function getPlayerFromDb (req, res) {
  getRandomPlayer(players);

  console.log("rand Player ---->", randPlayer);
  
  if (!response) res.status(500);
  else res.status(200);

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Content-Type", "text/plain");
  res.send(randPlayer);
}
// Generates a new session for the user and returns them the ID for their session.
export function getSessionToken (req, res) {
  generateNewSession()
  .then((data) => {
    gameSessions.Sessions.push(data);

    console.log("New Session: ", data);
    console.log(gameSessions);
    console.log("Session ID: ", data.sessionID);
    console.log("headshot ---->", data.headshot);
    
    res.status(200);
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Content-Type", "text/plain");
    res.send(data.sessionID);
  });
}

/* Retrieves a session object based on a provide session ID. Required to be executed before the user
can begin providing guesses.
*/
export function getSessionInfo (req, res) {
  const token = req.params.token.trim();
  const sessionInfo = searchSession(gameSessions.Sessions, token);

  console.log("the session info ----> ", sessionInfo);
  console.log("This is the session info value ----> ", sessionInfo);
  
  res.status(200);
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Content-Type", "application/json");
  res.send(sessionInfo);
  }

export function makeGuess (req, res) {
  console.log("This is a guess");
  console.log("req token ---->", req.params.token);
  console.log("req guess ---->", req.params.guess);
  const token = req.params.token;
  const sessionInfo = searchSession(gameSessions.Sessions, token);
  const guess = req.params.guess;

  res.status(200);

  if (guess === sessionInfo.answer) {
    res.send(true);
  }
  else res.send(false);
}