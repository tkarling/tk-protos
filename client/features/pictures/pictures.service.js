import ngFileUpload from 'ng-file-upload';

class picturesService {
    constructor($http, Upload) {
        this.$http = $http;
        this.Upload = Upload;
        this.picsContainer = {};
    }

    setUrls() {
        var url = "/api";
        var idSelector = "?id=";
        var picIdSelector = "?picId=";

        this.baseUrl = url + this.picturesUri;
        this.baseUrlWId = this.baseUrl + idSelector;
        this.baseUrlWPicId = this.baseUrl + picIdSelector;
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

    savePic(pic) { // takes picData as input
        return this.$http.put(this.baseUrlWId + pic._id, pic);
    }
}

class mPicturesService extends picturesService {
    constructor($http, Upload) {
        super($http, Upload);
        var thumbnailUri = "/thumbnail?id=";
        var fullPicUri = "/fullPic?id=";
        this.picturesUri = "/pics";
        this.setUrls();
        this.thumbnailUrl = this.baseUrl + thumbnailUri;
        this.fullPicUrl = this.baseUrl + fullPicUri;
    }

    removePic(pic) { // takes picData as input
        return this.$http.delete(this.baseUrlWPicId + pic.picId);
    }

    removePicWithId(picId) { // takes picId as input
        return this.$http.delete(this.baseUrlWPicId + picId);
    }

}

class aPicturesService extends picturesService {
    constructor($http, Upload) {
        super($http, Upload);
        this.picturesUri = "/apics";
        this.setUrls();
    }

    removePic(pic) { // takes picData as input
        return this.$http.delete(this.baseUrlWId + pic._id);
    }

    //removePicWithId(id) { // takes picData _id as input
    //    return this.$http.delete(this.baseUrlWId + id);
    //}


}


export default angular.module('services.picturesService', ["ngFileUpload"])
    .service('mPicturesService', mPicturesService)
    .service('aPicturesService', aPicturesService)
    .name;
