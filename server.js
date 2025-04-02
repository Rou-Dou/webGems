    // server.js
    const express = require('express');
    const app = express();
    const port = 443;

    app.use(express.static("public"));

    app.get("/getplayer", (req, res) => {
      let player_json = getPlayer();
      json_file = JSON.stringify(player_json)
      res.header("Content-Type", 'application/json');
      res.json(json_file);

    });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });

    function getPlayer() {
      const json_file = require("./players.json");
      let json_parsed = JSON.parse(json_file);
      return player_json = json_parsed["Name"]

    }