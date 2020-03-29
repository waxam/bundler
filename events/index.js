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

  app.post("/events", async (req, res) => {
    const { event, trigger } = req.body;

    if (trigger.name === "generate-build") {
      updateBuildStatus({ id: event.data.new.id, status: "RECIEVED" });
      // const output = await generateBuild({ dependencies: event.data.new.dependencies });
      // updateBuildStatus({ id: event.data.new.id, status: "COMPLETED", output });
    }
    res.status(200);
    res.send("building...")
    //   res.status(200);
    //   res.send("ok");
    // } catch (error) {
    //   res.status(503);
    //   res.send("event trigger.name not defined.", error);
    // }

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
