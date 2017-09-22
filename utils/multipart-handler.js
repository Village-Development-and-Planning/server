const Busboy = require('busboy')

module.exports = function(cb) {
  return function(req, res, next) {
    var busboy = new Busboy({headers: req.headers});
    var responses = [];
    var partNames = {};

    busboy.on('file', (field, file, fname, encoding, mime) => {
      if (partNames[field+"Name"])
        field = partNames[field+"Name"]
      if (p = cb(field, file, fname, encoding, mime)) {        
        responses.push(
          Promise.resolve(p)
            .then( (data) => {
              return {name: field, entity: data};
            })
            .catch(err => {
              file.resume();
              console.log(err);
              return {
                name: field, 
                error: err.message,
              };
            })
        );
      } else {
        file.resume();
      }    
    });

    busboy.on('field', (field, val) => {
      partNames[field] = val;
    })
    busboy.on('finish', () => {
      Promise.all(responses)
        .then( (resps) => res.json(resps) )
    });
    req.pipe(busboy);
  }
}
