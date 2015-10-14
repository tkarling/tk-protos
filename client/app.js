import angular from 'angular';
import uirouter from 'angular-ui-router';

import './app.scss';
import routes from './app.routes';
import home from './features/home';
import stylists from './features/stylists';
import speech from './features/speech';
import videos from './features/videos';

angular.module('app', [uirouter, home, stylists, videos, speech])
    .value("uTest", false)
    .config(routes);
