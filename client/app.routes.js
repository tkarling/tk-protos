routes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

export default function routes($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider
        .otherwise('/');

    $stateProvider
        //.state('home', {
        //    url: '/',
        //    template: require('./features/home/home.html'),
        //    controller: 'HomeController',
        //    controllerAs: 'home'
        //})
        //.state('stylists', {
        //    url: '/stylists',
        //    views: {
        //        main: {
        //            template: require('./features/stylists/stylists.html'),
        //            controller: 'StylistsController',
        //            controllerAs: 'stylists'
        //        }
        //    }
        //})
        .state('videos', {
            url: '/videos',
            template: require('./features/videos/videos.html'),
            controller: 'VideosController',
            controllerAs: 'videos'
        })
        .state('pictures', {
            url: '/',
            template: require('./features/pictures/pictures.html'),
            controller: 'PicturesController',
            controllerAs: 'pictures'
        })
        .state('speech', {
            url: '/speech',
            template: require('./features/speech/speech.html'),
            controller: 'SpeechController',
            controllerAs: 'speech'
        })
        .state('reactive', {
            url: '/reactive',
            template: require('./features/reactive/reactive.html'),
            controller: 'ReactiveController',
            controllerAs: 'reactive'
        })
}