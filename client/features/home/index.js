import './home.scss';

import angular from 'angular';

import HomeController from './home.controller';
import randomNames from '../../services/randomNames.service';
import greeting    from '../../directives/greeting/greeting.directive.js';

export default angular.module('app.home', [randomNames, greeting])
  .controller('HomeController', HomeController)
  .name;
