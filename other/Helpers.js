var helpers = {};

helpers.getExtensionFromFileName = function(fileName) {
    var re = /(?:\.([^.]+))?$/;
    return re.exec(fileName)[1];
}

module.exports = helpers;