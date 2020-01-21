"use strict";

const path = require("path");
const cp = require("child_process");
const fs = require("fs");
const Minio = require("minio");
var minioClient = new Minio.Client({
  endPoint: process.env.MINIO_URL,
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY
});

// write lock file for healthcheck
cp.spawn('touch', '/tmp/.lock');

module.exports = async (req, context) => {
  let err;
  const tmpId = uuid();
  const tmpDir = path.join("/tmp", "input", tmpId);

  // get body
  const body = req.body;
  const { packages } = req.query;
  console.log(req.body)

  // if (!packages) {
  //   context.status(422).succeed('asdf');
  // }

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
    dependencies = {...dependencies, ...dep}
  }

  // ensure tmp dir is there
  if (!fs.existsSync("/tmp/input")) {
    fs.mkdirSync("/tmp/input");
  }
  // write the input to a file
  fs.mkdirSync(tmpDir);
  // copy openwc package.json to tmp
  fs.copyFileSync(
    path.join(__dirname, "../", "openwc", "package.json"),
    path.join(tmpDir, "package.json")
  );
  fs.copyFileSync(
    path.join(__dirname, "../", "openwc", "rollup.config.js"),
    path.join(tmpDir, "rollup.config.js")
  );
  fs.copyFileSync(
    path.join(__dirname, "../", "openwc", "custom-elements.json"),
    path.join(tmpDir, "custom-elements.json")
  );
  fs.copyFileSync(
    path.join(__dirname, "../", "openwc", "index.html"),
    path.join(tmpDir, "index.html")
  );
  fs.copyFileSync(
    path.join(__dirname, "../", "openwc", "bundle.js"),
    path.join(tmpDir, "bundle.js")
  );
  // load base package.json
  let basePackage = JSON.parse(
    fs.readFileSync(path.join(tmpDir, "package.json"), "utf8")
  );

  const newPackage = Object.assign({}, basePackage, {
    dependencies
  });
  console.log(`writing new package.json for ${tmpId}`, newPackage);
  fs.writeFileSync(
    path.join(tmpDir, "package.json"),
    JSON.stringify(newPackage, null, 2)
  );

  console.log(`writing new bundle.js for ${tmpId}`);
  const importsBundle = `${packages
    .split(",")
    .map(i => `import("${i}"); `)}`.replace(",", "");
  fs.writeFileSync(path.join(tmpDir, "bundle.js"), importsBundle);
  // yarn install
  cp.spawnSync("yarn", {
    cwd: tmpDir
  });
  // run build
  cp.spawnSync("yarn", ["run", "build"], {
    cwd: tmpDir
  });
  // zip it
  cp.spawnSync("zip", ["-r", `dist-${tmpId}.zip`, "dist/"], {
    cwd: tmpDir
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
      path.join(tmpDir, `dist-${tmpId}.zip`)
    );
    url = await minioClient.presignedGetObject("bucket", tmpId, 24 * 60 * 60);
  } catch (error) {
    console.error(error);
  }

  const output = `${url}`;

  // return output
  context.status(200).succeed(output);
  // clean up tmp file
  fs.unlinkSync(tmpDir);
};

const uuid = () => {
  return "xxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};