    // server.js
    const express = require('express');
    const app = express();
    const port = 443;

    app.use(express.static("public"));

    app.get("/getplayer", (req, res) => {
      getPlayer();
      // res.header("Content-Type", 'application/json');
      // res.json(json_file);

    });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });

    function getPlayer() {
      const json_file = require("./players.json");
      let json_parsed = JSON.parse(json_file);

      for (let player of json_parsed.Name) {
        console.log(player)
      }
    }