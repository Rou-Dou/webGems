    // server.js
    import * as functions from "./utils/setup/functions.js"
    import express from "express";
    const app = express()
    const port = 8080;

    app.use(express.static("public"));

    app.get("/getplayer", async (req, res) => {
      let response = await functions.getPlayer();
      response.then((r) => {
        console.log(r)
      });
    });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });