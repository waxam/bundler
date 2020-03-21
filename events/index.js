const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

async function main() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.post("/events", (req, res) => {
    const { event, trigger } = req.body;

    if (trigger.name === "generate-build") {
      // update build status
    }
    res.status(200);
    res.send("ok");
  });

  app.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000`);
  });
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {});
