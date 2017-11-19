/**
 * Render helper
 */
export default class Renderer {
  constructor({res, next}) {
    this.res = res;
    this.next = next;
  }

  sendError(err) {
    if (!err.message) {
      if (err.status == '400') err.message = 'Bad request';
      if (err.status == '404') err.message = 'Not found';
      if (err.status == '405') err.message = 'Method not allowed';
    }
    this.next(err);
  }

  render(err, data) {
    if (err) {
      this.sendError(err);
    } else {
      this.res.json(data);
    }
  }

  renderTemplate(template, data) {
    this.res.render(template, data, this._renderCallback.bind(this));
  }

  _renderCallback(err, data) {
  }

  renderPromise(p) {
    return p
    .then((data) => {
      if (data && data.template) {
        const {json, template} = data;
        this.renderTemplate(template, json);
      } else {
        this.render(null, data);
      }
    })
    .catch((err) => this.render(err, {}));
  }
};
