var Survey = require('../data/models/Survey');
var Surveyor = require('../data/models/Surveyor');

function getSurveyor(cb) {
    Survey
        .find()
        .select({
            _id: 1
        }).
        exec(function (err, ids) {
            if (err) {
                console.log('Error getting ids from Survey collection');
                cb(err);
            } else {
                var surveyor = new Surveyor({
                    name: 'Surveyor 1',
                    surveys: [{
                        position: "1",
                        survey: ids[0]
                    }]
                });
                cb(null, [surveyor]);
            }
        });
}

module.exports = getSurveyor;