import './pictures.scss';

function selectPic(currentPic, newPic) {
    currentPic = currentPic || {};
    currentPic._id = newPic ? newPic._id: undefined;
    currentPic.name = newPic ? newPic.name: undefined;
    currentPic.picId = newPic ? newPic.picId: undefined;
    currentPic.progress = undefined;
    currentPic.errorMsg = undefined;
}


function pictureTools(mPicturesService) {
    return {
        restrict: 'E',

        scope: {
            deleteVisible: '=',
            currentPic: '='
        },

        template:
            '<div>' +
                '<button ng-if="! deleteVisible"' +
                    'class="mdl-button mdl-js-button mdl-button--icon mdl-button--fab mdl-button--colored"' +
                    'type="file" ngf-select="addPicture($file)"' +
                    'accept="image/*" ngf-max-size="4MB">' +
                    '<!--ngf-max-height="1000"-->' +
                    '<i class="material-icons">add</i>' +
                '</button>' +
                '<button class="mdl-button mdl-js-button mdl-button--icon mdl-button--fab mdl-button--colored"' +
                    'ng-click="deleteVisible = ! deleteVisible">' +
                    '<i class="material-icons">delete</i>' +
                '</button>' +
                '<span ng-if="errorMsg">{{errorMsg}}</span>' +
            '</div>',

        link: (scope, element, attrs) => {
            scope.addPicture = (pic) => {
                selectPic(scope.currentPic, undefined);
                return mPicturesService.addPic(pic)
                    .then((response) => {
                        selectPic(scope.currentPic, response.data);
                        mPicturesService.getPicDatas();
                    }, (error) => {
                        if (error.status > 0) {
                            console.log("addPic error: ", error);
                            scope.currentPic.errorMsg = error.status + ': ' + error.statusText;
                        }
                    }, (evt) => {
                        scope.currentPic.progress = Math.min(100, parseInt(100.0 *
                            evt.loaded / evt.total));
                    });
            }


        }
    }
}

function fullPicture(mPicturesService) {
    return {
        restrict: 'E',

        scope: {
            currentPic: '='
        },

        template:
            '<div>' +
                '<img ng-if="currentPic.picId" class="full-img"' +
                    'ng-src="{{fullPicUrl}}{{currentPic.picId}}"' +
                    'ng-click="selectPic(currentPic, undefined)"/>' +
            '</div>',

        link: (scope, element, attrs) => {
            scope.selectPic = selectPic;
            scope.fullPicUrl = mPicturesService.fullPicUrl;
        }
    }
}

function pictureGrid(mPicturesService) {
    return {
        restrict: 'E',

        scope: {
            deleteVisible: '=',
            currentPic: '='
        },

        template:
            '<div>' +
                '<div class="thumbnail-container"' +
                    '<div ng-repeat="pic in picsContainer.pics"' +
                    'ng-click="selectPic(currentPic, pic)">' +
                    '<img class="thumbnail-img" ng-src="{{thumbnailUrl}}{{pic.picId}}"/>' +
                    '<button ng-if="deleteVisible"' +
                        'class="small-delete-button mdl-button mdl-js-button mdl-button--icon mdl-button--accent"' +
                        'ng-click="removePic(pic, $event)">' +
                        '<i class="material-icons">delete</i>' +
                    '</button>' +
                '</div>' +
            '</div>',

        link: (scope, element, attrs) => {
            scope.selectPic = selectPic;
            scope.thumbnailUrl = mPicturesService.thumbnailUrl;

            mPicturesService.getPicDatas().then((pics) => {
                scope.picsContainer = mPicturesService.picsContainer;
            });


            scope.removePic = (pic, event) => {
                if(event){
                    event.stopPropagation();
                    event.preventDefault();
                }
                if(scope.currentPic.picId === pic.picId) {
                    selectPic(scope.currentPic, undefined);
                }
                return mPicturesService.removePic(pic).then((result) => {
                    mPicturesService.getPicDatas();
                });
            }
        }

    }
}


export default angular.module('directives.pictureDirectives', [])
    .directive('pictureTools', pictureTools)
    .directive('fullPicture', fullPicture)
    .directive('pictureGrid', pictureGrid)
    .name;