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

module.exports = async (req, context) => {
  let err;
  const tmpId = uuid();
  const tmpDir = path.join("/tmp", "input", tmpId);

  // get body
  const body = req.body;
  const { packages } = req.query;

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
  const dependencies = packages
    .split(",")
    .map(i => i.trim())
    .reduce((total, current, index) => {
      let value;
      // if this is the first iteration then we set up the total object
      // looks dumb but it's a hack
      if (index === 1) {
        value = {};
        value[total] = "";
        value[current] = "";
      } else {
        value[current] = "";
      }
      return value;
    });
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
  const yarnInstallOutput = cp.spawnSync("yarn", {
    cwd: tmpDir
  });
  const buildOutput = cp.spawnSync("yarn", ["run", "build"], {
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
      path.join(tmpDir, "bundle.js")
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
