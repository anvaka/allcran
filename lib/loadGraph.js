var fs = require('fs');
var createGraph = require('ngraph.graph');
module.exports = loadGraph;

function loadGraph() {
  var content = fs.readFileSync(process.argv[2] || './cran_files.json');
  return convert(JSON.parse(content));
}

function convert(pkgs) {
  var nodeps = [];
  var graph = createGraph({uniqueLinkIds: false});
  pkgs.forEach(addToGraph);

  return graph;

  function addToGraph(pkg) {
    var name = prestine(pkg.name);
    if (!name) return;

    graph.addNode(name);
    var deps = pkg.imports || nodeps;
    for (var i = 0; i < deps.length; ++i) {
      var otherName = prestine(deps[i]);
      if (otherName && !graph.hasLink(name, otherName)) {
        graph.addLink(name, otherName);
      }
    }
  }
}

function prestine(name) {
  name = name.replace(/\(.*/g, '').replace(/\n/g, '');
  return name
}
