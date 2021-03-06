import tagsParser from '../tags';
import optTagsParser from '../tags/options';
import TreeParser from './tree-csv-parser';
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
    opts = opts || {};
    opts.survey = Object.assign({
      name: 'Unnamed',
      description: 'Created via CSV.',
      question: 'Q',
      opt: 'Opt',
      default: 'English',
    }, opts.survey);

    opts.tree = Object.assign({
      sectionField: opts.survey.question + '.No',
    }, opts.tree);

    super({csv: opts.csv, tree: opts.tree});

    this.surveyOpts = opts.survey;
    let qNo = this.surveyOpts.question + '.No';

    this.rootQuestion = {};
    this.rootQuestion[qNo] = '';

    this.on('nodeCompleted', this._onNodeCompleted.bind(this));
    this.on('nodePushed', this._onNodePushed.bind(this));
    this.on('error', this._onError.bind(this));

    this.promise = new Promise((res, rej) => {
      this.res = res; this.rej = rej;
    });

    this.warnings = [];
  }


  /**
   * Process tags from the stack and create template object.
   *
   * @param {any} stack
   *
   * @memberOf SurveyCSVParser
   */
  _onNodePushed(stack) {
    const qParsedTag = '_parsedTag';
    const qTags = this.surveyOpts.question + '.Tags';
    const qType = this.surveyOpts.question + '.Type';
    const qNo = this.surveyOpts.question + '.No';
    const optNo = this.surveyOpts.opt + '.No';
    const node = stack[stack.length - 1];
    let parent = null;
    if (stack.length > 1) {
      parent = stack[stack.length - 2];
    }
    if (!node[qNo] && node[optNo]) {
      node[qParsedTag] = optTagsParser(node[qTags]).then(
        ({output, warnings}) => {
          this.warnings = this.warnings.concat(warnings);
          return output;
        }
      );
    } else if (node[qNo]) {
      node[qParsedTag] = tagsParser(
        node[qType], node[qTags],
        parent && parent[qParsedTag]
      ).then(({output, warnings}) => {
        this.warnings = this.warnings.concat(warnings);
        return output;
      });
    }
  }

  /**
  *
  *
  * @param {CSVRowObject} node, parent
  *
  * @memberOf SurveyCSVParser
  */
  _onNodeCompleted({node, parent}) {
    const qNo = this.surveyOpts.question + '.No';
    const optNo = this.surveyOpts.opt + '.No';

    // 1. If parent is null, the survey object is the parent.
    if (parent == null) {
      parent = this.rootQuestion;
    }
    this._createPromises(parent);

    // 2. Figure node type (Q or Opt) and create entity accordingly.
    if (!node[qNo] && node[optNo]) {
      parent.optionPromises.push(
        this._createOption(node).then(
          (e) => ({position: node[optNo], option: e})
        )
      );
    } else if (node[qNo]) {
      parent.childrenPromises.push(
        this._createQuestion(node, parent).then(
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
  * @param {CSVRowObject} parent
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
    const optText = this.surveyOpts.opt + '.Text.';
    const optType = this.surveyOpts.opt + '.Type';
    const qParsedTag = '_parsedTag';

    return Promise.resolve(node[qParsedTag]).then(
      (opt) => Object.assign({
        type: node[optType] || 'GENERIC',
        text: this._createTextJson(node, optText),
      }, opt)
    );
  }


  /**
  * Private helper to create Question doc.
  *
  * @param {CSVRowObject} node
  * @return {Promise} Question doc.
  *
  * @memberOf SurveyCSVParser
  */
  _createQuestion(node) {
    const qText = this.surveyOpts.question + '.Text.';
    const qTags = this.surveyOpts.question + '.Tags';
    const qType = this.surveyOpts.question + '.Type';
    const qNo = this.surveyOpts.question + '.No';
    const qPre = this.surveyOpts.question + '.PreReq.';
    const qPreQ = qPre + this.surveyOpts.question;
    const qPreOpt = qPre + this.surveyOpts.opt;
    const qParsedTag = '_parsedTag';

    if (!node[qType]) {
      this.warnings.push(
        {message: `Missing ${qType} in ${qNo} ${node[qNo]}`}
      );
    }

    this._createPromises(node);
    return Promise.all(node.childrenPromises).then((ch) => {
      return Promise.all(node.optionPromises).then((opts) => {
        return {options: opts, children: ch};
      });
    }).then((q) => {
      return Promise.resolve(node[qParsedTag]).then(
        (flow) => q.flow = flow
      ).then(() => q);
    }).then((q) => {
      if (node[qPreQ]) {
        q.flow.pre.skipUnless = {
          question: node[qPreQ],
          option: node[qPreOpt],
        };
      }
      return Object.assign(q, {
        text: this._createTextJson(node, qText),
        type: node[qType] || 'GENERIC',
        tags: node[qTags],
        number: node[qNo],
      });
    });
  }


  /**
  * Private helper
  *
  * @param {String} str
  * @return {[String]} tags
  *
  * @memberOf SurveyCSVParser
  */

  /**
  * Private helper to create Text sub-doc
  *
  * @param {CSVRowObject} node
  * @param {String} prefix
  * @return {Text} Text sub-doc
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

    // Create the root Question object.
    Promise.all(this.rootQuestion.childrenPromises).then((ch) => {
      return {
        type: 'ROOT',
        options: [],
        children: ch,
        flow: require('../tags/question-default')('NONE', null),
      };
    }).then((q) => {
      this.res({root: q, warnings: this.warnings});
    }).catch((err) => {
      this.rej({error: err});
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

