import './videos.scss';

import youtube from './youtube.directive.js'
import VideosController from './videos.controller';

export default angular.module('app.videos', [youtube])
    .controller('VideosController', VideosController)
    .name;

