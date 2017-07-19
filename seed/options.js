var Option = require('../data/models/Option');

function createOptions() {
    var options = [];

    for (var i = 0; i < 10; i++) {
        var o = new Option({
            type: "N/A",
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