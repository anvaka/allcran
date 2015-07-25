var url = require('url');
var rp = require('request-promise');
var query = 'https://mran.revolutionanalytics.com/packagedata/allpackages.json';

module.exports = getPackages;

function getPackages() {
  return rp(query)
    .then(convertToPackagesList)
    .catch(reportError);
}

function convertToPackagesList(res) {
  return JSON.parse(res).data.map(toRequest);
}

function toRequest(x) {
  return 'https://mran.revolutionanalytics.com/packagedata/json/' + x.Pkg.toLowerCase() + '.json';
}

function reportError(err) {
  console.error(err);
  throw err;
}
