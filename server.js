    // server.js
    const express = require('express');
    const app = express();
    const port = 443;

    app.use(express.static("public"));

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });