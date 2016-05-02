angular.module('app.translations', [])

  .config(function ($translateProvider) {

  $translateProvider.translations('en', {
    TITLE: 'Hello',
    FOO: 'This is a paragraph.',
    BUTTON_LANG_EN: 'english',
    BUTTON_LANG_DE: 'german',
    RESULTS: 'Results'
  });
  $translateProvider.translations('de', {
    TITLE: 'Hallo',
    FOO: 'Dies ist ein Paragraph.',
    BUTTON_LANG_EN: 'englisch',
    BUTTON_LANG_DE: 'deutsch',
    RESULTS: 'Resultate'
  });
  $translateProvider.preferredLanguage('en');
  $translateProvider.fallbackLanguage("en");
});