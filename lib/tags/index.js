/**
 * A compiler to transform functionality expressed in tags into a Object.
 * 
 * @class TagsParser
 */
class TagsParser {
  /**
   * Creates an instance of TagsParser.
   * @param {String[]} tags 
   * 
   * @memberOf TagsParser
   */
  constructor(tags) {
    return {tags};
  }

  parse(tags) {
    return {tags};
  }
};

TagsParser.modules = [
  // require('./data/pre-fill'),
  // require('./data/auth'),
  // require('./core/scope'),
  // require('./core/pre'),
  // require('./core/post'),
  // require('./ui/grid'),
];

module.exports = TagsParser;
