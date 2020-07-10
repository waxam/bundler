const { minioClient } = require("../services.js")
const assert = require('assert');

describe('Minio', function() {
  it('it can upload to bucket', function() {
    try {
      if (!(await minioClient.bucketExists("bucket"))) {
        await minioClient.makeBucket("bucket");
      }
      await minioClient.fPutObject(
        "bucket",
        tmpId,
        path.join(tmpDir, `build-${tmpId}.zip`)
      );
      const url = await minioClient.presignedGetObject("bucket", tmpId, 24 * 60 * 60);
      console.log('url:', url);
      return url
    } catch (error) {
      console.error(error);
      return error;
    }
  });
});