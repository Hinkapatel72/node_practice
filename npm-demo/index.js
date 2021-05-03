// ... Use third party node module in the application...
var _ = require('underscore'); //... check require function in this flow: core module -> File or Folder -> node modules

var result = _.contains([1, 2, 3], 4);
console.log(result);
