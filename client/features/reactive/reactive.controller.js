export default class ReactiveController {
    constructor($scope, observeOnScope, uTest, reactiveService) {
        this.test = 'Hello from ReactiveController';

        if (uTest) {
            return;
        }

        this.setUpSearch($scope, observeOnScope, reactiveService);
    }

    setUpSearch($scope, observeOnScope, reactiveService) {
        $scope.$watch(() => {
            return this.name
        }, () => {
            //console.log("this.name", this.name);
            $scope.name = this.name;
        });
        var searchResults = observeOnScope($scope, 'name').
            sample(1000).
            map((change) => {
                //console.log("after", change);
                return this.name;
            }).
            distinctUntilChanged().
            concatMap(search => {
                //console.log("search", search, this.name);
                return reactiveService.searchWikipedia(this.name);
            });

        searchResults.
            safeApply($scope, result => {
                this.results = result;
            }).
            forEach(result => {
                //console.log("result", result);
            });
    }

}

ReactiveController.$inject = ['$scope', 'observeOnScope', 'uTest', 'reactiveService'];
