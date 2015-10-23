export default class PicturesController {
    constructor(mPicturesService, aPicturesService) {
        this.mPicturesService = mPicturesService;
        this.aPicturesService = aPicturesService;

        this.test = 'Hello from PicturesController';
        this.currentPic = {};
        this.currentAPic = {};
    }
}

//PicturesController.$inject = ['randomNames'];
