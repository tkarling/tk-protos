import './videos.scss';

import youtube from './youtube.directive.js'
import VideosController from './videos.controller';

export default angular.module('app.videos', [youtube])
    .constant('YT_event', {
        STOP: 0,
        PLAY: 1,
        PAUSE: 2,
        STATUS_CHANGE: 3
    })
    .controller('VideosController', VideosController)
    .name;

