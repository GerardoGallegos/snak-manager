//
//  This module preprocess the test modules by jest
//

const babelJest = require('babel-jest')

module.exports = {
  // Removes requires styles
  process: function(src, filename) {
    return babelJest.process(src, filename)
    .replace(/require\(\s*\'[a-zA-Z0-9\/\.\_\-\!]*\.(css|scss|less|scss)\'\);/gm, '')
  }
}
