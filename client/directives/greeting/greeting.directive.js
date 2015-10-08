import './greeting.scss';

function greeting() {
  return {
    restrict: 'E',
    scope: {
      name: '='
    },
    template: '<div class="greeting">Directive: Hello, {{name}}</div>'
  }
}

export default angular.module('directives.greeting', [])
  .directive('greeting', greeting)
  .name;
