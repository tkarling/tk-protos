import angular from 'angular';
import uirouter from 'angular-ui-router';

import rx from 'rx-angular';


import './app.scss';
import routes from './app.routes';
import home from './features/home';
import stylists from './features/stylists';
import speech from './features/speech';
import videos from './features/videos';
import pictures from './features/pictures';
import reactive from './features/reactive';

angular.module('app', [uirouter, rx, videos, pictures, speech, reactive])
    .value("uTest", false)
    .config(routes);
