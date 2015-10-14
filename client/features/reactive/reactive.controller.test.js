import reactive from './index';

describe('Controller: Reactive', function() {
    let $controller, $rootScope, $scope;

    beforeEach(angular.mock.module(reactive));

    beforeEach(angular.mock.inject(function(_$controller_, _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
    }));

    it('test is initialized to Hello from ReactiveController', function() {
        let ctrl = $controller('ReactiveController', {
            $scope: $scope,
            observeOnScope: () => "",
            rx: () => "",
            uTest: true
        });
        expect(ctrl.test).toBe('Hello from ReactiveController');
    });
});
