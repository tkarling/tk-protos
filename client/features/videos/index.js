import './videos.scss';

import VideosController from './videos.controller';

export default angular.module('app.videos', [])
    .controller('VideosController', VideosController)
    .name;

