import { getPlayer } from "../utils/setup/functions.mjs"

export function getPlayerFromDb (req, res) {
      const response = getPlayer();

      if (!response) {
        res.status(500);
        res.send(response)
      }

      res.status(200)
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET");
      res.set("Content-Type", "text/plain");
      res.send(response);
}