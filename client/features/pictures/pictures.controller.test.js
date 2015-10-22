import pictures from './index';

describe('Controller: Pictures', function() {
    let $controller;

    beforeEach(angular.mock.module(pictures));

    beforeEach(angular.mock.inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    it('test is initialized to Hello from PicturesController', function() {
        let ctrl = $controller('PicturesController');
        expect(ctrl.test).toBe('Hello from PicturesController');
    });
});
