import './pictures.scss';

import pictureDirectives from './pictures.directives';
import picturesService from './pictures.service';
import PicturesController from './pictures.controller';

export default angular.module('app.pictures', [pictureDirectives, picturesService])
    .controller('PicturesController', PicturesController)
    .name;

