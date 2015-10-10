import speech from './index';

describe('Controller: Speech', function() {
    let $controller, $rootScope, $scope;

    beforeEach(angular.mock.module(speech));

    beforeEach(angular.mock.inject(function(_$controller_, _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
    }));

    it('test is initialized to Hello from SpeechController', function() {
        let ctrl = $controller('SpeechController',{
            $scope: $scope
        });
        expect(ctrl.test).toBe('Hello from SpeechController');
    });
});
