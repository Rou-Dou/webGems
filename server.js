    // server.js
    import * as functions from "./utils/setup/functions.js"
    import express from "express";
    const app = express()
    const port = 8080;

    app.use(express.static("public"));

    app.get("/getplayer", async (req, res) => {
      let response = await functions.getPlayer();
      res.setHeader("Content-Type", "text/plain")
      res.send(response)

    });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });