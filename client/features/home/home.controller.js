export default class HomeController {
  constructor(randomNames) {
    this.test = 'Hello from HomeController';

    this.random = randomNames;
    this.name = 'World';
  }

  changeName() {
    this.name = 'angular-tips';
  }

  randomName() {
    this.name = this.random.getName();
  }
}

HomeController.$inject = ['randomNames'];
