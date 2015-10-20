export default class VideosController {
    constructor($scope, $rootScope, YT_event) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.YT_event = YT_event;

        this.test = 'Hello from VideosController';
        this.name = "moi";
        //this.code = 'oHg5SJYRHA0'; // Rick
        this.code = 'dNmu5NZG7sk'; // Atte

        this.yt = {
            width: 600,
            height: 480,
            videoid: "dNmu5NZG7sk",
            playerStatus: "NOT PLAYING"
        };

        this.updateWidth();

        this.$scope.$on(YT_event.STATUS_CHANGE, (event, data) => {
            //console.log("on status change", data);
            this.yt.playerStatus = data;
        });
    }

    sendControlEvent(ctrlEvent) {
        this.$scope.$broadcast(ctrlEvent);
    }

    updateWidth() {
        this.myStyle = {
            width: this.yt.width + 'px'
        };
    }

    setVideoId(id) {
        this.yt.videoid = id;
    }
}

VideosController.$inject = ['$scope', '$rootScope', 'YT_event'];
