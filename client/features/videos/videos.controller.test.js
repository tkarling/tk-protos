import videos from './index';

describe('Controller: Videos', function() {
    let $controller, $rootScope, $scope;

    beforeEach(angular.mock.module(videos));

    beforeEach(angular.mock.inject(function(_$controller_, _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
    }));

    it('test is initialized to Hello from VideosController', function() {
        let ctrl = $controller('VideosController', {
            $scope: $scope
        });
        expect(ctrl.test).toBe('Hello from VideosController');
    });
});
