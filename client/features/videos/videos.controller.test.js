import videos from './index';

describe('Controller: Videos', function() {
    let $controller;

    beforeEach(angular.mock.module(videos));

    beforeEach(angular.mock.inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    it('test is initialized to Hello from VideosController', function() {
        let ctrl = $controller('VideosController');
        expect(ctrl.test).toBe('Hello from VideosController');
    });
});
