import './reactive.scss';

import reactiveService from './reactive.service';
import ReactiveController from './reactive.controller';

export default angular.module('app.reactive', [reactiveService])
    .controller('ReactiveController', ReactiveController)
    .name;

