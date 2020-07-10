console.log(process.env.miniourl)
console.log(process.env.minioaccesskey)
console.log(process.env.miniosecretkey)
const Minio = require("minio");

const minioClient = new Minio.Client({
  endPoint: process.env.miniourl,
  port: 80,
  useSSL: false,
  accessKey: process.env.minioaccesskey,
  secretKey: process.env.miniosecretkey
});

module.exports.minioClient = minioClient;