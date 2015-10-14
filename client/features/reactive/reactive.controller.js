export default class ReactiveController {
    constructor($scope, observeOnScope, uTest) {
        this.test = 'Hello from ReactiveController';

        if(!uTest) {
            this.$watch = $scope.$watch.bind($scope);
            this.$watch(() => { return this.name}, () => {
                $scope.name = this.name;
            });

            observeOnScope(this, 'name').subscribe((change) => {
                this.observedChange = change;
                this.newValue = change.newValue;
                this.oldValue = change.oldValue;
            });

        }
    }
}

ReactiveController.$inject = ['$scope', 'observeOnScope', 'uTest'];
