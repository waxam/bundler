const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const { updateBuildStatus, generateBuild } = require("./services.js");

async function main() {
  const app = express();
  app.use(morgan('dev'));
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.text());

  app.post("/events", async (req, res) => {
    const { event, trigger } = req.body;

    if (trigger.name === "generate-build") {
      res.status(200);
      res.send("ok");
      updateBuildStatus({ id: event.data.new.id, status: "RECIEVED" });
      const output = await generateBuild({ dependencies: event.data.new.dependencies });
      updateBuildStatus({ id: event.data.new.id, status: "COMPLETED", output });
    }
    else {
      res.status(503);
      res.send("event trigger.name not defined.");
    }
  });

  app.post("/webhooks", async (req, res) => {
    console.log('req:', req.body)
    res.send('ok');
  })

  app.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000`);
  });
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {});
