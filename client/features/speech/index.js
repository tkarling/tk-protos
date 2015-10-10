import './speech.scss';

import SpeechController from './speech.controller';

export default angular.module('app.speech', [])
    .controller('SpeechController', SpeechController)
    .name;

