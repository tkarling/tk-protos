import './reactive.scss';

import drag from './drag.directives.js'
import reactiveService from './reactive.service';
import ReactiveController from './reactive.controller';

export default angular.module('app.reactive', [reactiveService, drag])
    .controller('ReactiveController', ReactiveController)
    .name;

