import './pictures.scss';

import pictureDirectives from './pictures.directives';
import mPicturesService from './mpictures.service';
import PicturesController from './pictures.controller';

export default angular.module('app.pictures', [pictureDirectives, mPicturesService])
    .controller('PicturesController', PicturesController)
    .name;

