var Option = require('../data/models/Option');

var OPTION_TYPES = ["Type1", "Type2", "Type3", "Type4", "Type5"];

function createOptions() {
    var options = [];

    for (var i = 0; i < 10; i++) {
        var o = new Option({
            type: OPTION_TYPES[i % OPTION_TYPES.length],
            text: {
                english: 'Option ' + i,
                tamil: 'விருப்பம் ' + i
            } 
        });

        options.push(o);
    }

    return options;
}

module.exports = createOptions();