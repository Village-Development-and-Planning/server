/**
 * Render helper
 */
export default class Renderer {
  constructor({res, next}) {
    this.res = res;
    this.next = next;
  }

  render(err, data) {
    if (err) {
      this.next(err);
    } else {
      this.res.json(data);
    }
  }

  renderTemplate(template, data) {
    this.res.render(template, data, this._renderCallback.bind(this));
  }

  _renderCallback(err, data) {
    console.log(data);
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
