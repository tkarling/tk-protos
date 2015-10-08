routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            template: require('./features/home/home.html'),
            controller: 'HomeController',
            controllerAs: 'home'
        })
    .state('stylists', {
      url: '/stylists',
      template: require('./features/stylists/stylists.html'),
      controller: 'StylistsController',
      controllerAs: 'stylists'
    })
}