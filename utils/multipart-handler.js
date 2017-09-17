const Busboy = require('busboy')

module.exports = function(cb) {
  return function(req, res, next) {
    var busboy = new Busboy({headers: req.headers});
    var responses = [];

    busboy.on('file', (field, file, fname, encoding, mime) => {
      if (p = cb(field, file, fname, encoding, mime)) {        
        responses.push(
          Promise.resolve(p)
            .then( (data) => {
              return {field, data};
            })
        )
      } else {
        file.resume();
      }    
    });

    busboy.on('finish', () => {    
      Promise.all(responses)
        .then( (resps) => res.json(resps) )
        .catch( (err) => next(err) )
    });
    req.pipe(busboy);
  }
}
