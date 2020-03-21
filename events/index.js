const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { updateBuildStatus } = require("./services.js");

async function main() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.post("/events", (req, res) => {
    const { event, trigger } = req.body;

    if (trigger.name === "generate-build") {
      updateBuildStatus({ id: event.data.new.id, status: "RECIEVED" });
      setTimeout(() => {
        updateBuildStatus({ id: event.data.new.id, status: "COMPLETED" });
      }, 9000)
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
