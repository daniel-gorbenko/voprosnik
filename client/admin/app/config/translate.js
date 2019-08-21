/**
 * Settings for $http service
 */

export default function config($translateProvider) {
  $translateProvider
    .translations('en', require('../vocabularies/en.json'))
    .translations('ru', require('../vocabularies/ru.json'))

    .preferredLanguage(window.lang);

    console.log( window.lang);

}

config.$inject = ['$translateProvider'];