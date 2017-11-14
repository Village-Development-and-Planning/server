import Mixin from '../lib/Mixin';

module.exports = (klass) => class extends klass {

  update() {
    this.renderer.renderPromise(
      this._validateId()
        .then(({_id}) => this.updateFromId({_id}))
    );
  }

  updateFromId({_id}) {
    let updateableAttributes;
    if (!(updateableAttributes = this._updateableAttributes())) {
      return Promise.reject({status: 405});
    } else {
      const updation = Object.keys(updateableAttributes).reduce(
        (acc, key) => {
          if (this.req.query[key]) {
            acc[key] = this.req.query[key];
          }
          return acc;
        },
        {},
      );
      return this.constructor.collection
        .findOneAndUpdate({_id}, updation, {new: true})
        .then((e) => e || Promise.reject({status: 404}));
    }
  }
  
});
