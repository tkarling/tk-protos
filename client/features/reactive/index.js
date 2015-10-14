import './reactive.scss';

import ReactiveController from './reactive.controller';

export default angular.module('app.reactive', [])
    .controller('ReactiveController', ReactiveController)
    .name;

