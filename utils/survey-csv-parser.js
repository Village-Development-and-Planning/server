const Survey = require('../data/models/Survey');
const Question = require('../data/models/Question');
const Option = require('../data/models/Option');
const TreeParser = require('./tree-csv-parser');

/* eslint "require-jsdoc": "warn" */
/* eslint "one-var": "off" */

/**
 * Tree based parser for questions provided in CSV for mapping/household survey.
 * 
 * @class SurveyCSVParser
 * @extends {TreeParser}
 */
class SurveyCSVParser extends TreeParser {
  /**
   * Creates an instance of SurveyCSVParser.
   * @param {any} opts 
   * 
   * @memberOf SurveyCSVParser
   */
  constructor(opts) {
    opts.survey = Object.assign({
      name: 'Unnamed',
      description: 'Generic uploaded from CSV',
      question: 'Q',
      opt: 'Opt',
      default: 'English',
    }, opts.survey);

    opts.tree = Object.assign({
      sectionField: opts.survey.question + '.No',
    }, opts.tree);

    super({csv: opts.csv, tree: opts.tree});


    this.surveyOpts = opts.survey;
    let
      qNo = this.surveyOpts.question + '.No';
    this.survey = {
      name: this.surveyOpts.name,
      description: this.surveyOpts.description,
    };
    this.survey[qNo] = '';

    this.on('nodeCompleted', this._onNodeCompleted.bind(this));
    this.on('error', this._onError.bind(this));

    this.promise = new Promise((res, rej) => {
      this.res = res; this.rej = rej;
    });
  }

  /**
   * 
   * 
   * @param {any} node, parent 
   * 
   * @memberOf SurveyCSVParser
   */
  _onNodeCompleted({node, parent}) {
    let qNo = this.surveyOpts.question + '.No';
    let optNo = this.surveyOpts.opt + '.No';

    // 1. If parent is null, the survey object is the parent.
    if (parent == null) {
      parent = this.survey;
    }
    this._createPromises(parent);

    // 2. Figure node type (Q or Opt) and create entity accordingly.
    if (!node[qNo] && node[optNo]) {
      parent.optionPromises.push(
        this._createOption(node).then(
          (e) => ({position: node[optNo], option: e})
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
        ));
    }
  }


  /**
   * Helper to create promises array on question/survey.
   * 
   * @param {any} parent 
   * 
   * @memberOf SurveyCSVParser
   */
  _createPromises(parent) {
    parent.childrenPromises = parent.childrenPromises || [];
    parent.optionPromises = parent.optionPromises || [];
  }

  /**
   * Private helper to create Option doc
   * 
   * @param {any} node 
   * @return {Promise.<Option>}
   * 
   * @memberOf SurveyCSVParser
   */
  _createOption(node) {
    let optText = this.surveyOpts.opt + '.Text.';
    let optType = this.surveyOpts.opt + '.Type';
    return Option.create({
      type: node[optType] || 'GENERIC',
      text: this._createTextJson(node, optText),
    });
  }


  /**
   * Private helper to create Question doc.
   * 
   * @param {any} node 
   * @return {Promise} Question doc.
   * 
   * @memberOf SurveyCSVParser
   */
  _createQuestion(node) {
    let
      qText = this.surveyOpts.question + '.Text.',
      qType = this.surveyOpts.question + '.Type',
      qTags = this.surveyOpts.question + '.Tags',
      qNo = this.surveyOpts.question + '.No',
      qPre = this.surveyOpts.question + '.PreReq.';
    let
      qPreQ = qPre + this.surveyOpts.question,
      qPreOpt = qPre + this.surveyOpts.opt;

    this._createPromises(node);
    return Promise.all(node.childrenPromises).then((ch) => {
      return Promise.all(node.optionPromises).then((opts) => {
        return {options: opts, children: ch};
      });
    }).then((q) => {
      return Question.create(Object.assign(q, {
        text: this._createTextJson(node, qText),
        type: node[qType] || 'GENERIC',
        tags: this._createTagsList(node[qTags]),
        number: node[qNo],
        info: {question: node[qPreQ], option: node[qPreOpt]},
      }));
    });
  }


  /**
   * Private helper
   * 
   * @param {any} str 
   * @return {[String]} tags
   * 
   * @memberOf SurveyCSVParser
   */
  _createTagsList(str) {
    return str.split(',').reduce((acc, e) => {
      if ((e = e.trim())) {
acc.push(e);
}
      return acc;
    }, []);
  }

  /**
   * Private helper to create Text sub-doc
   * 
   * @param {any} node 
   * @param {any} prefix 
   * @return {Promise.<Text>} Text doc
   * 
   * @memberOf SurveyCSVParser
   */
  _createTextJson(node, prefix) {
    let tObj = {};
    let pLen = prefix.length;
    for (let k in node) {
      if (k.startsWith(prefix)) {
        tObj[k.slice(pLen).toLowerCase()] = node[k];
      }
    }
    return tObj;
  }

  /**
   * Private 'finish' callback
   * 
   * @private
   * 
   * @memberOf SurveyCSVParser
   */
  _onFinish() {
    super._onFinish();
    // Create the survey object.
    let node = this.survey;
    this._createPromises(node);
    Promise.all(node.childrenPromises).then((ch) => {
      return Object.assign(node, {questions: ch});
    }).then((s) => {
      return Survey.create(s);
    }).then((s) => {
      this.res({survey: s._id});
    }).catch((err) => {
      this.rej(err);
    });
  }


  /**
   * Private 'error' callback
   * 
   * @param {any} err 
   * 
   * @memberOf SurveyCSVParser
   */
  _onError(err) {
    this.rej(err);
  }
}
module.exports = SurveyCSVParser;
