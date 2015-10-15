export default class ReactiveController {
    constructor($scope, observeOnScope, uTest, reactiveService) {
        this.test = 'Hello from ReactiveController';

        if(uTest) {
            return;
        }

        this.setUpSearch($scope, observeOnScope, reactiveService);
    }

    setUpSearch($scope, observeOnScope, reactiveService) {
        $scope.$watch(() => {
            return this.name
        }, () => {
            $scope.name = this.name;
        });
        var searchResults = observeOnScope($scope, 'name').
            concatMap(change => {
                //console.log("change", change);
                return reactiveService.searchWikipedia(change.newValue);
            });

        searchResults.forEach(result => {
            //console.log("result", result);
            this.results = result;
        });
    }

}

ReactiveController.$inject = ['$scope', 'observeOnScope', 'uTest', 'reactiveService'];
