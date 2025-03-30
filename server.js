    // server.js
    const express = require('express');
    const app = express();
    const port = 443;

    app.use(express.static("public"));

    app.get("/test", (req, res) => {
      res.status(200)
    });

    app.get("/players", (req, res) => {
      const json_file = require("./players.json");
      res.header("Content-Type", 'application/json');
      res.json(json_file)
    })

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });