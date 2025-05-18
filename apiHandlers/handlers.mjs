import { getRandomPlayer, generateNewSession, searchSession, log } from "../utils/setup/functions.mjs";
import { players, playerNames} from "../resources/resources.mjs";
import { gameSessions } from "../server.mjs";


// returns a random player object to be used for the session answer.
export function getPlayerFromDb (req, res) {
  let randPlayer = getRandomPlayer(players);

  console.log("rand Player ---->", randPlayer);
  
  if (!response) res.status(500);
  else res.status(200);

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Content-Type", "text/plain");
  res.json(randPlayer);
}
// Generates a new session for the user and returns them the ID for their session.
export function getSessionToken (req, res) {
  log("Called getSessionToken", 200)
  generateNewSession()
  .then((data) => {
    gameSessions.Sessions.push(data);
    console.log("Session ID: ", data.sessionInfo.sessionID);
    
    res.status(200);
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Content-Type", "text/plain");
    res.send(data.sessionInfo.sessionID);
  });
}

/* Retrieves a session object based on a provide session ID. Required to be executed before the user
can begin providing guesses.*/
export function getSessionInfo (req, res) {
  log("Called getSessionInfo", 200)
  const token = req.params.token.trim();
  const sessionObj = searchSession(gameSessions.Sessions, token);

  console.log("the session info ----> ", sessionObj);
  
  res.status(200);
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Content-Type", "application/json");
  res.json(sessionObj.sessionInfo);
}

export function makeGuess (req, res) {
  log("called makeGuess", 200)
  console.log("req token ---->", req.params.token);
  console.log("req guess ---->", req.params.guess);
  const token = req.params.token;
  const guess = req.params.guess;
  const sessionObj = searchSession(gameSessions.Sessions, token);

  res.status(200);

  if (guess === sessionObj.answer) {
    console.log("sending true")
    res.send(true);
  }
  else {
    console.log("sending false")
    res.send(false);
  }
}

export function getPlayerList (req, res) {
  res.status(200)
  res.send(playerNames)
}