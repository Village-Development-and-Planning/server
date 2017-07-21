function BaseController(modal) {
    this.modal = modal;
}

var proto = {};

// Returns a Query object
proto.getForID = function(id) {
    return this.modal.find({_id: id});
}

BaseController.prototype = proto;

module.exports = BaseController;