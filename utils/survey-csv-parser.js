var Survey = require('../data/models/Survey');
var Question = require('../data/models/Question');
var Option = require('../data/models/Option');
var TreeParser = require('./tree-csv-parser');

class SurveyCSVParser extends TreeParser {
  constructor(opts) {

    opts.survey = Object.assign({
      name: 'Unnamed',
      description: 'Generic uploaded from CSV',
      question: 'Q',
      opt: 'Opt',
      default: 'English',
    }, opts.survey);

    opts.tree = Object.assign({
      sectionField: opts.survey.question + ".No",
    }, opts.tree);

    super({ csv: opts.csv, tree: opts.tree });


    this.surveyOpts = opts.survey;
    var 
      qNo = this.surveyOpts.question + ".No";
    this.survey = {
      name: this.surveyOpts.name,
      description: this.surveyOpts.description,
    };
    this.survey[qNo] = '';

    this.on('nodeCompleted', this._onNodeCompleted.bind(this));
    this.on('treeFinish', this._onSurveyFinish.bind(this));
    this.on('error', this._onError.bind(this));

    this.promise = new Promise((res, rej) => {this.res = res; this.rej = rej;});
  }

  _onNodeCompleted({node, parent}) {
    var 
      qNo = this.surveyOpts.question + ".No",
      optNo = this.surveyOpts.opt + ".No";      

    // 1. If parent is null, the survey object is the parent.
    if (parent == null) 
      parent = this.survey;
    this._createPromises(parent);

    // 2. Figure node type (Q or Opt) and create entity accordingly.
    if (!node[qNo] && node[optNo]) {
      parent.optionPromises.push(
        this._createOption(node).then(
          (e) => ({ position: node[optNo], option: e })
      ));
    } else if (node[qNo]) {
      parent.childrenPromises.push(
        this._createQuestion(node).then(
          (e) => ({
            position: node[qNo].slice(
              (parent[qNo].length == 0) ? 0 : parent[qNo].length+1
            ),
            question: e,
          })          
      ))
    }
  }

  _createPromises(parent) {
    parent.childrenPromises = parent.childrenPromises || [];
    parent.optionPromises = parent.optionPromises || [];    
  }

  _createOption(node) {
    var 
      optText = this.surveyOpts.opt + ".Text.",
      optType = this.surveyOpts.opt + ".Type";
    return Option.create({
      type: node[optType] || 'GENERIC',
      text: this._createTextJson(node, optText),
    });
  }

  _createQuestion(node) {
    var 
      qText = this.surveyOpts.question + ".Text.",
      qType = this.surveyOpts.question + ".Type",
      qTags = this.surveyOpts.question + ".Tags",
      qNo = this.surveyOpts.question + ".No",
      qPre = this.surveyOpts.question + ".PreReq";

    this._createPromises(node);
    return Promise.all(node.childrenPromises).then((ch) => {
      return Promise.all(node.optionPromises).then((opts) => {
        return {options: opts, children: ch};
      });
    }).then((q) => {
      return Question.create(Object.assign(q, {
        text: this._createTextJson(node, qText),
        type: node[qType] || "GENERIC",
        tags: this._createTagsList(node[qTags]),
        number: node[qNo],
        info: { question: node[qPre + '.Q'], option: node[qPre + '.Opt'] },
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
    this._createPromises(node);
    return Promise.all(node.childrenPromises).then((ch) => {
      return Object.assign(node, {questions: ch});
    }).then((s) => {
      return Survey.create(s)
    }).then((s) => {
      this.res({survey: s._id});
    }).catch((err) => {
      this.rej(err);
    });
  }

  _onError(err) {
    this.rej(err);
  }
}
module.exports = SurveyCSVParser;
