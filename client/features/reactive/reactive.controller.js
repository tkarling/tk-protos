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
            //console.log("this.name", this.name);
            $scope.name = this.name;
        });
        var searchResults = observeOnScope($scope, 'name').
            map((change) => {
                //console.log("before", change);
                return this.name;
            }).
            //throttle(1000).   // does this skip last input??
            //map((search) => {
            //    console.log("after", search);
            //    return search;
            //}).
            distinctUntilChanged().
            concatMap(search => {
                //console.log("search", search, this.name);
                return reactiveService.searchWikipedia(this.name);
            });

        searchResults.forEach(result => {
            //console.log("result", result);
            this.results = result;
        });
    }

}

ReactiveController.$inject = ['$scope', 'observeOnScope', 'uTest', 'reactiveService'];
