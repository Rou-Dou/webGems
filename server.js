    // server.js
    const express = require('express');
    const app = express();
    const port = 443;

    app.use(express.static("public"));

    app.get("/getplayer", (req, res) => {
      let jsonFile = getPlayer();
      res.header("Content-Type", 'application/json');
      res.json(jsonFile);

    });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });

    // Get a random player from the player list
    function getPlayer() {
      const jsonFile = require("./players.json");
      let numPlayers = Object.keys(jsonFile.Name).length
      const randNum = Math.round(Math.random() * numPlayers)
      return jsonFile.Name[randNum]
    }