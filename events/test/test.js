var assert = require('assert');
const { generateBuildQueryParams } = require("../services.js");

describe('generate build', function() {
  it('should generate correct query params', function() {
    const dependencies = {
      "lit-element": "^2",
      "@adobe/lit-mobx": "^0.0.2",
    }
    const queryParams = generateBuildQueryParams({ dependencies });
    assert.equal(queryParams, "?packages=lit-element:^2,@adobe/lit-mobx:^0.0.2");
  });
});