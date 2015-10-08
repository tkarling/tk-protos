import 'bootstrap/dist/css/bootstrap.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './app.config';
import routes from './app.routes';
import home from './features/home';
import stylists from './features/stylists';
import videos from './features/videos';

angular.module('app', [uirouter, home, stylists, videos])
  .config(routing)
  .config(routes);
