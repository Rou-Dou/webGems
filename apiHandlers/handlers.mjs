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
  const response = searchSession(gameSessions.Sessions, token);

  console.log("the session info ----> ", response.sessionObj);
  
  res.status(200);
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Content-Type", "application/json");
  res.json(response.sessionObj.sessionInfo);
}

export function makeGuess (req, res) {
  log("called makeGuess", 200)
  console.log("req token ---->", req.params.token);
  console.log("req guess ---->", req.params.guess);
  const token = req.params.token;
  const guess = req.params.guess;
  const response = searchSession(gameSessions.Sessions, token);

  console.log("Make Guess sessionObj object before processing ---->", response.sessionObj)

  res.status(200);

  const currentPlayerIndex = response.sessionObj.sessionStatus.curPlayer;
  const LastPlayer = currentPlayerIndex > 2;
  let returnStatus = null;

  response.sessionObj.sessionStatus.playerGuesses += 1
  const currentGuesses = response.sessionObj.sessionStatus.playerGuesses;

  if (guess === response.sessionObj.answer) {
    console.log("Hit!")
    returnStatus = true;
  }
  else if (currentGuesses == 3) {
    console.log("Struck out!");
    returnStatus = false
  }
  else {
    console.log("Swing and a miss!");
    returnStatus = false;
  }

  if (!LastPlayer && returnStatus == true || currentGuesses == 3) {
    response.sessionObj.sessionStatus.curPlayer += 1
    response.sessionObj.sessionStatus.playerGuesses = 0;
    response.sessionObj.sessionStatus.correctGuesses[currentPlayerIndex] = returnStatus;
  }

  if (LastPlayer && response.sessionObjsessionStatus.correctGuesses[currentPlayerIndex] != null) {
    console.log("last player")
    response.sessionObj.sessionStatus.active = false;
  }

  console.log("after modification ---->", response.sessionObj)

  res.send(returnStatus);
}

export function getPlayerList (req, res) {
  res.status(200)
  res.send(playerNames)
}