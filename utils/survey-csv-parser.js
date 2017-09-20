var Survey = require('../data/models/Survey');
var Question = require('../data/models/Question');
var Option = require('../data/models/Option');
var TreeParser = require('./tree-csv-parser');

class SurveyCSVParser extends TreeParser {
  constructor({surveyName}) {
    super({
      sectionField: 'Q.No',
      subField: 'Opt.No',
      subTextFields: ["Opt.Text.English", "Opt.Text.Tamil"],
    });
    this.survey = {
      name: surveyName,
      description: "Survey uploaded from CSV.",
      "Q.No": "",
    };
    this.on('nodeCompleted', this._onNodeCompleted.bind(this));
    this.on('finish', this._onSurveyFinish.bind(this));
    this.promise = new Promise((res, rej) => {this.res = res; this.rej = rej;});
  }

  _onNodeCompleted({node, parent}) {
    // 1. If parent is null, the survey object is the parent.
    if (parent == null) 
      parent = this.survey;
    parent.childrenPromises = parent.childrenPromises || [];
    parent.optionPromises = parent.optionPromises || [];

    // 2. Figure node type (Q or Opt) and create entity accordingly.
    if (node['Q.No'] == '') {
      parent.optionPromises.push(
        this._createOption(node).then(
          (e) => ({position: node['Opt.No'], option: e})
      ));
    } else {
      parent.childrenPromises.push(
        this._createQuestion(node).then(
          (e) => ({
            position: node['Q.No'].slice(
              (parent['Q.No'].length == 0) ? 0 : parent['Q.No'].length+1
            ),
            question: e,
          })          
      ))
    }
  }

  _createOption(node) {
    return Option.create({
      type: node['Opt.Type'] || 'GENERIC',
      text: this._createTextJson(node, "Opt.Text."),
    });
  }

  _createQuestion(node) {
    return Promise.all(node.childrenPromises || []).then((ch) => {
      return Promise.all(node.optionPromises || []).then((opts) => {
        return {options: opts, children: ch};
      });
    }).then((q) => {
      return Question.create(Object.assign(q, {
        text: this._createTextJson(node, "Q.Text."),
        type: node["Q.Type"] || "GENERIC",
        tags: this._createTagsList(node["Q.Tags"]),
        number: node["Q.No"],
        info: { question: node["Q.PreReq.Q"], option: node["Q.PreReq.Opt"] },
      }));
    });
  }

  _createTagsList(str) {
    return str.split(",").reduce((acc, e) => {
      if (e = e.trim())
        acc.push(e);
      return acc;
    }, [])
  }

  _createTextJson(node, prefix) {
    var tObj = {};
    var pLen = prefix.length;
    for (var k in node) {
      if (k.startsWith(prefix)) {
        tObj[k.slice(pLen).toLowerCase()] = node[k];
      }
    }
    return tObj;
  }

  _onSurveyFinish() {
    // Create the survey object.
    var node = this.survey;
    return Promise.all(node.childrenPromises || []).then((ch) => {
      return Object.assign(node, {questions: ch});
    }).then((s) => {
      return Survey.create(s)
    }).then((s) => {
      this.res({survey: s._id});
    })
  }
}
module.exports = SurveyCSVParser;