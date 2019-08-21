export default function html5mode($locationProvider) {
  $locationProvider.html5Mode(true);
}

html5mode.$inject = ['$locationProvider'];