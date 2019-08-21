'use strict';

let vocabularies = {
  en: require('./vocabularies/en.json'),
  ru: require('./vocabularies/ru.json')
};

var helper = {};

/**
 *
 */

helper.isAllowedLanguage = function (lang) {
  return vocabularies[lang] !== undefined;
};

/**
 *
 */

helper.getVocabulary = function (lang) {
  return vocabularies[lang];
};

module.exports = helper;