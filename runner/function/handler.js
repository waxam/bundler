"use strict";

const path = require("path");
const cp = require("child_process");
const fs = require("fs");
const Minio = require("minio");
const copydir = require("copy-dir");
const fetch = require("node-fetch");

var minioClient = new Minio.Client({
  endPoint: process.env.miniourl,
  port: 80,
  useSSL: false,
  accessKey: process.env.minioaccesskey,
  secretKey: process.env.miniosecretkey
});

// write lock file for healthcheck
cp.spawn("touch", ["/tmp/.lock"]);

module.exports = async (req, context) => {
  let err;
  const tmpId = uuid();
  const tmpDir = path.join("/tmp", "input", tmpId);

  // get body
  const { dependencies } = req.body;
  const { packages } = req.query;
  const { monitor } = req.query;
  const { id } = req.query;
  console.log('id:', id)

  if (dependencies) {
  }
  else if (!packages) {
    return context.status(422).succeed("No packages defined");
  } else if (!packages.length > 0) {
    return context.status(422).succeed("No packages defined");
  } else {
    let dependenciesArray = packages.split(",").map(i => {
      let object = {};
      let depArray = i.split(":");
      let depName = depArray[0];
      let depVersion = depArray[1] || "";
      object[depName] = depVersion;
      return object;
    });
    let dependencies = Object.assign({});
    for (let dep of dependenciesArray) {
      dependencies = { ...dependencies, ...dep };
    }
    console.log("dependencies:", dependencies);
    monitorLog({ id, message: `Dependencies received.`});

    // ensure tmp dir is there
    if (!fs.existsSync("/tmp/input")) {
      fs.mkdirSync("/tmp/input");
    }
    // write the input to a file
    fs.mkdirSync(tmpDir);
    // copy unbundled-webcomponents package.json to tmp

    fs.symlinkSync(
      path.join(__dirname, "../../", "unbundled-webcomponents", "assets"),
      path.join(tmpDir, "assets")
    );
    fs.mkdirSync(path.join(tmpDir, "dist"));
    fs.copyFileSync(
      path.join(__dirname, "../../", "unbundled-webcomponents", "dist", "app.js"),
      path.join(tmpDir, "dist", "app.js")
    );
    fs.copyFileSync(
      path.join(
        __dirname,
        "../../",
        "unbundled-webcomponents",
        "dist",
        "build.html"
      ),
      path.join(tmpDir, "dist", "build.html")
    );
    fs.symlinkSync(
      path.join(__dirname, "../../", "unbundled-webcomponents", "advanced.html"),
      path.join(tmpDir, "advanced.html")
    );
    fs.symlinkSync(
      path.join(__dirname, "../../", "unbundled-webcomponents", "build.js"),
      path.join(tmpDir, "build.js")
    );
    fs.symlinkSync(
      path.join(__dirname, "../../", "unbundled-webcomponents", "gulpfile.js"),
      path.join(tmpDir, "gulpfile.js")
    );
    fs.symlinkSync(
      path.join(__dirname, "../../", "unbundled-webcomponents", "index.html"),
      path.join(tmpDir, "index.html")
    );
    fs.copyFileSync(
      path.join(__dirname, "../../", "unbundled-webcomponents", "package.json"),
      path.join(tmpDir, "package.json")
    );
    fs.symlinkSync(
      path.join(__dirname, "../../", "unbundled-webcomponents", "polymer.json"),
      path.join(tmpDir, "polymer.json")
    );

    // load base package.json
    let basePackage = JSON.parse(
      fs.readFileSync(path.join(tmpDir, "package.json"), "utf8")
    );

    // merge dependencies
    dependencies = { ...dependencies, ...basePackage.dependencies };

    const newPackage = Object.assign({}, basePackage, {
      dependencies
    });
    console.log('newPackage:', newPackage)
    fs.writeFileSync(
      path.join(tmpDir, "package.json"),
      JSON.stringify(newPackage, null, 2)
    );

    console.log(`writing new bundle.js for ${tmpId}`);
    monitorLog({ id, message: `writing new bundle.js`, monitorUrl: monitor });
    const importsBundle = `${packages
      .split(",")
      .map(i => i.split(":")[0])
      .map(i => `import("${i}"); `)
    }`.split(",").join("");
    console.log('importsBundle:', importsBundle)
    fs.writeFileSync(path.join(tmpDir, "dist", "app.js"), importsBundle);

    // yarn install
    console.log("yarn start");
    monitorLog({ id, message: `Installing dependencies`, monitorUrl: monitor });
    await new Promise((res, rej) => {
      cp.spawn("yarn", ["install"], {
        cwd: tmpDir
      }).stdout.on("data", data => {
        console.log(data.toString());
        monitorLog({ id, message: `Installing dependencies: ${data.toString()};`, monitorUrl: monitor });
      }).on('close', () => {
        res()
      });
    });

    console.log("yarn build");
    await new Promise((res, rej) => {
      cp.spawn("yarn", ["run", "build"], {
        cwd: tmpDir
      }).stdout.on("data", data => {
        console.log(data.toString());
        monitorLog({ id, message: `Generating Build: ${data.toString()};`, monitorUrl: monitor });
      }).on('close', () => {
        res()
      });
    });

    console.log("remove node_modules directory");
    await new Promise((res, rej) => {
      cp.spawn("rm", ["-rf", "node_modules"], {
        cwd: tmpDir
      }).stdout.on("data", data => {
        console.log(data.toString());
      }).on('close', () => {
        res()
      });
    });

    console.log("zip it");
    await new Promise((res, rej) => {
      cp.spawn("zip", ["-r", `build-${tmpId}.zip`, "."], {
        cwd: tmpDir
      }).stdout.on("data", data => {
        console.log(data.toString());
        monitorLog({ id, message: `Packaging Build: ${data.toString()};`, monitorUrl: monitor });
      }).on('close', () => {
        res()
      });
    });

    let url = "";
    // send the files to minio
    try {
      if (!(await minioClient.bucketExists("bucket"))) {
        await minioClient.makeBucket("bucket");
      }
      await minioClient.fPutObject(
        "bucket",
        tmpId,
        path.join(tmpDir, `build-${tmpId}.zip`)
      );
      url = await minioClient.presignedGetObject("bucket", tmpId, 24 * 60 * 60);
    } catch (error) {
      console.error(error);
    }

    const output = `${url}`;

    // return output
    context.status(200).succeed(output);
  }
};

const uuid = () => {
  return "xxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const monitorLog = ({ id, message, monitorUrl}) => {
  if (monitorUrl) {
    fetch(monitorUrl, {
      method: "POST",
      body: JSON.stringify({
        type: "runner-monitor",
        id,
        data: message
      })
    }).then(res => res.text())
      .then(res => console.log(res))
  }
}