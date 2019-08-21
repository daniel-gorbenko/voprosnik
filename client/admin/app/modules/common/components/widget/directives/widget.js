/**
 *
 * @returns {{restrict: string, template: *, controller: *, controllerAs: string, scope: {data: string}, link: Function}}
 * @constructor
 */

export default function Widget(config) {
  return {
    restrict: 'E',
    template: require('../views/widget.html'),
    controller: 'WidgetController',
    controllerAs: 'vm',

    scope: {
      data: '=',
      onClose: '&',
      warnings: '='
    },

    link: function ($scope, $el, attrs) {

        var widgetId = $scope.data.widgetId;
        var blockId = $scope.data.blockId;
        var d = document;
        var w = window;

        function loadScript() {
          var s = document.createElement('script');

          s.type = 'text/javascript';
          s.async = true;
          /***
           * ATTENTION! DIFFERENT SRC
           */
          s.src = config.cdn.baseUrl + '/loader/:widgetId/:blockId'
            .replace(':widgetId', widgetId)
            .replace(':blockId', blockId);

          var ss = document.getElementsByTagName('script')[0];
          ss.parentNode.insertBefore(s, ss);
        }

        if(d.readyState == 'complete') {
          loadScript();
        } else {
          if(w.attachEvent) {
            w.attachEvent('onload', loadScript);
          } else {
            w.addEventListener('load', loadScript, false);
          }
        }
    }
  };
};

Widget.$inject = ['config'];