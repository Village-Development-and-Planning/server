var helpers = {};

helpers.getExtensionFromFileName = function (fileName) {
    var re = /(?:\.([^.]+))?$/;
    return re.exec(fileName)[1];
}

// Will remove all false values: undefined, null, 0, false, NaN and "" (empty string)
helpers.cleanArray = function (actual) {
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

module.exports = helpers;