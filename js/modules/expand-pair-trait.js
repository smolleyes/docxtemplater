"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var traitName = "expandPair";

var mergeSort = require("../mergesort");

var _require = require("../doc-utils"),
    getLeft = _require.getLeft,
    getRight = _require.getRight;

var wrapper = require("../module-wrapper");

var _require2 = require("../traits"),
    getExpandToDefault = _require2.getExpandToDefault;

var _require3 = require("../errors"),
    getUnmatchedLoopException = _require3.getUnmatchedLoopException,
    getClosingTagNotMatchOpeningTag = _require3.getClosingTagNotMatchOpeningTag,
    throwLocationInvalid = _require3.throwLocationInvalid;

function getOpenCountChange(part) {
  switch (part.location) {
    case "start":
      return 1;

    case "end":
      return -1;

    default:
      throwLocationInvalid(part);
  }
}

function getPairs(traits) {
  var errors = [];
  var pairs = [];

  if (traits.length === 0) {
    return {
      pairs: pairs,
      errors: errors
    };
  }

  var countOpen = 1;

  var _traits = _slicedToArray(traits, 1),
      firstTrait = _traits[0];

  if (firstTrait.part.location === "start") {
    for (var i = 1; i < traits.length; i++) {
      var currentTrait = traits[i];
      countOpen += getOpenCountChange(currentTrait.part);

      if (countOpen === 0) {
        var _outer = getPairs(traits.slice(i + 1));

        if (currentTrait.part.value !== firstTrait.part.value && currentTrait.part.value !== "") {
          errors.push(getClosingTagNotMatchOpeningTag({
            tags: [firstTrait.part, currentTrait.part]
          }));
        } else {
          pairs = [[firstTrait, currentTrait]];
        }

        return {
          pairs: pairs.concat(_outer.pairs),
          errors: errors.concat(_outer.errors)
        };
      }
    }
  }

  var part = firstTrait.part;
  errors.push(getUnmatchedLoopException({
    part: part,
    location: part.location
  }));
  var outer = getPairs(traits.slice(1));
  return {
    pairs: outer.pairs,
    errors: errors.concat(outer.errors)
  };
}

var expandPairTrait = {
  name: "ExpandPairTrait",
  optionsTransformer: function optionsTransformer(options, docxtemplater) {
    this.expandTags = docxtemplater.fileTypeConfig.expandTags.concat(docxtemplater.options.paragraphLoop ? docxtemplater.fileTypeConfig.onParagraphLoop : []);
    return options;
  },
  postparse: function postparse(postparsed, _ref) {
    var _this = this;

    var getTraits = _ref.getTraits,
        postparse = _ref.postparse;
    var traits = getTraits(traitName, postparsed);
    traits = traits.map(function (trait) {
      return trait || [];
    });
    traits = mergeSort(traits);

    var _getPairs = getPairs(traits),
        pairs = _getPairs.pairs,
        errors = _getPairs.errors;

    var expandedPairs = pairs.map(function (pair) {
      var expandTo = pair[0].part.expandTo;

      if (expandTo === "auto") {
        var result = getExpandToDefault(postparsed, pair, _this.expandTags);

        if (result.error) {
          errors.push(result.error);
        }

        expandTo = result.value;
      }

      if (!expandTo) {
        return [pair[0].offset, pair[1].offset];
      }

      var left, right;

      try {
        left = getLeft(postparsed, expandTo, pair[0].offset);
      } catch (e) {
        errors.push(e);
      }

      try {
        right = getRight(postparsed, expandTo, pair[1].offset);
      } catch (e) {
        errors.push(e);
      }

      return [left, right];
    });
    var currentPairIndex = 0;
    var innerParts;
    var newParsed = postparsed.reduce(function (newParsed, part, i) {
      var inPair = currentPairIndex < pairs.length && expandedPairs[currentPairIndex][0] <= i;
      var pair = pairs[currentPairIndex];
      var expandedPair = expandedPairs[currentPairIndex];

      if (!inPair) {
        newParsed.push(part);
        return newParsed;
      }

      if (expandedPair[0] === i) {
        innerParts = [];
      }

      if (pair[0].offset !== i && pair[1].offset !== i) {
        innerParts.push(part);
      }

      if (expandedPair[1] === i) {
        var basePart = postparsed[pair[0].offset];
        basePart.subparsed = postparse(innerParts, {
          basePart: basePart
        });
        delete basePart.location;
        delete basePart.expandTo;
        newParsed.push(basePart);
        currentPairIndex++;
      }

      return newParsed;
    }, []);
    return {
      postparsed: newParsed,
      errors: errors
    };
  }
};

module.exports = function () {
  return wrapper(expandPairTrait);
};