import './pictures.scss';

function selectPic(currentPic, newPic) {
    currentPic = currentPic || {};
    currentPic._id = newPic ? newPic._id: undefined;
    currentPic.name = newPic ? newPic.name: undefined;
    currentPic.picId = newPic ? newPic.picId: undefined;
    currentPic.progress = undefined;
    currentPic.errorMsg = undefined;
}


function pictureTools() {
    return {
        restrict: 'E',

        scope: {
            picsService: '=',
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
                //console.log("pic", pic);
                if(pic) {
                    selectPic(scope.currentPic, undefined);
                    return scope.picsService.addPic(pic)
                        .then((response) => {
                            selectPic(scope.currentPic, response.data);
                            scope.picsService.getPicDatas();
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
}

function fullPicture() {
    return {
        restrict: 'E',

        scope: {
            picsService: '=',
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
            scope.fullPicUrl = scope.picsService.fullPicUrl;
        }
    }
}

function pictureGrid() {
    return {
        restrict: 'E',

        scope: {
            picsService: '=',
            deleteVisible: '=',
            currentPic: '='
        },

        template:
            '<div>' +
                '<div class="thumbnail-container"' +
                    '<div ng-repeat="pic in picsContainer.pics"' +
                    'ng-click="selectPic(currentPic, pic)">' +
                    '<img class="thumbnail-img" ng-src="{{thumbnailUrl}}{{pic.picId}}"/>' +
                    '<input ng-if="! pic.picId" class="thumbnail-img" ng-model="pic.name" />' +
                    '<button ng-if="deleteVisible"' +
                        'class="small-delete-button mdl-button mdl-js-button mdl-button--icon mdl-button--accent"' +
                        'ng-click="removePic(pic, $event)">' +
                        '<i class="material-icons">delete</i>' +
                    '</button>' +
                '</div>' +
            '</div>',

        link: (scope, element, attrs) => {
            scope.selectPic = selectPic;
            scope.thumbnailUrl = scope.picsService.thumbnailUrl;

            scope.picsService.getPicDatas().then((pics) => {
                scope.picsContainer = scope.picsService.picsContainer;
            });


            scope.removePic = (pic, event) => {
                if(event){
                    event.stopPropagation();
                    event.preventDefault();
                }
                if(scope.currentPic.picId === pic.picId) {
                    selectPic(scope.currentPic, undefined);
                }
                return scope.picsService.removePic(pic).then((result) => {
                    scope.picsService.getPicDatas();
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