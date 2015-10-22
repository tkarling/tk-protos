import ngFileUpload from 'ng-file-upload';

class mPicturesService {
    constructor($http, Upload) {
        var url = "/api";
        var picturesUri = "/pics";
        var idSelector = "?id=";
        var picIdSelector = "?picId=";
        var thumbnailUri = "/thumbnail?id=";
        var fullPicUri = "/fullPic?id=";

        this.baseUrl = url + picturesUri;
        this.baseUrlWId = this.baseUrl + idSelector;
        this.baseUrlWPicId = this.baseUrl + picIdSelector;
        this.thumbnailUrl = this.baseUrl + thumbnailUri;
        this.fullPicUrl = this.baseUrl + fullPicUri;
        this.$http = $http;
        this.Upload = Upload;

        this.picsContainer = {};
    }

    getPicDatas() {
        return this.$http.get(this.baseUrl).then((response) => {
            this.picsContainer.pics = response.data;
            return this.picsContainer.pics;
        });
    }

    getPicData(fieldname, expectedValue) {
        var criteria = "?" + fieldname + "=" + expectedValue;
        return this.$http.get(this.baseUrl + criteria).then((response) => {
            var items = response.data;
            if(items.length > 0) {
                return items[0];
            }
            return null;
        });
    }

    addPic(pic) { // takes pic file w content as input
        return this.Upload.upload({
            url: this.baseUrl,
            file: pic
        });
    }

    removePic(pic) { // takes picData as input
        return this.$http.delete(this.baseUrlWPicId + pic.picId);
    }

    removePicWithId(picId) { // takes picId as input
        return this.$http.delete(this.baseUrlWPicId + picId);
    }

    savePic(pic) { // takes picData as input
        return this.$http.put(this.baseUrlWId + pic._id, pic);
    }
}

export default angular.module('services.mPicturesService', ["ngFileUpload"])
    .service('mPicturesService', mPicturesService)
    .name;
