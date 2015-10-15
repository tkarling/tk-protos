export default class ReactiveController {
    constructor($scope, $http, observeOnScope, rx, uTest) {
        this.test = 'Hello from ReactiveController';

        if(uTest) {
            return;
        }

        function searchWikipedia (term) {
            return rx.Observable
                .fromPromise($http({
                    url: "http://en.wikipedia.org/w/api.php?&callback=JSON_CALLBACK",
                    method: "jsonp",
                    params: {
                        action: "opensearch",
                        search: term,
                        format: "json"
                    }
                }))
                .map(function(response){ return response.data[1]; });
        }

        //var results = searchWikipedia("terminator");
        //results.forEach(result => {
        //    console.log(result);
        //    this.results = result;
        //    $scope.$apply();
        //});

        $scope.$watch(() => {
            return this.name
        }, () => {
            $scope.name = this.name;
        });
        var searchResults = observeOnScope($scope, 'name').
            concatMap(change => {
                console.log("change", change);
                return searchWikipedia(change.newValue);
            });

        searchResults.forEach(result => {
            console.log("result", result);
            this.results = result;
        });

    }
}

ReactiveController.$inject = ['$scope', '$http', 'observeOnScope', 'rx', 'uTest'];
