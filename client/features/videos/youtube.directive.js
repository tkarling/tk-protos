//import './greeting.scss';

// inspired by http://stackoverflow.com/questions/20447867/create-a-youtube-angularjs-directive
function youtube($sce, $window) {
    return {
        restrict: 'E',
        scope: { code:'=' },
        replace: true,
        template:
            '<div style="height:400px;">' +
                '<iframe id="player" style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen>' +
                '</iframe>' +
            '</div>',
        link: function (scope, element) {
            var el = element[0];

            scope.$watch('code', function (newVal) {
                if (newVal) {
                    scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
                }
            });

     }
    };

}

export default angular.module('directives.youtube', [])
    .directive('youtube', youtube)
    .name;
