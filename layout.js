var graph = require('./lib/loadGraph.js')();
var layout = require('ngraph.offline.layout')(graph);

console.log('Starting layout');
layout.run();

var save = require('ngraph.tobinary');
save(graph, { outDir: './data' });

console.log('Done.');
console.log('Copy `links.bin`, `labels.bin` and positions.bin into vis folder');
