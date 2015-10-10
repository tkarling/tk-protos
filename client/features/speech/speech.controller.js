export default class SpeechController {
    constructor($scope, $timeout) {
        this.test = 'Hello from SpeechController';

        //this.commands = {
        //    'new item *val': (val) => {
        //        this.todo = val;
        //        console.log(val);
        //        $scope.apply();
        //    }
        //}
        //annyang.addCommands(this.command);
        //annyang.debug();
        //annyang.start();


        let originalPlaceholder = "what's up?";
        this.placeholder = originalPlaceholder;

        if (! ('webkitSpeechRecognition' in window) ) {
            console.log("no webkitSpeechRecognition");
        } else {
            let talkPromptPlaceholder = "start talking";
            var patience = 6;

            // setup recognition
            this.finalTranscript = '';
            this.recognizing = false;
            var timeout;
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = true;

            function restartTimer(recognition) {
                timeout = $timeout(() => {
                    recognition.stop();
                }, patience * 1000);
            }

            this.recognition.onstart = () => {
                //console.log("onstart");
                $scope.$apply(() => {
                    this.placeholder = talkPromptPlaceholder;
                    this.recognizing = true;
                });
                restartTimer(this.recognition);
            };

            this.recognition.onend = () => {
                //console.log("onend");
                $timeout.cancel(timeout);
                $scope.$apply(() => {
                    this.placeholder = originalPlaceholder;
                    this.recognizing = false;
                });
            };

            this.recognition.onresult = (event) => {
                //console.log("onresult", event);
                $timeout.cancel(timeout);
                for (var i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        this.finalTranscript += event.results[i][0].transcript;
                    }
                }
                //console.log("this.finalTranscript", this.finalTranscript);
                $scope.$apply(() => {
                    this.speechText = this.finalTranscript;
                });
                restartTimer(this.recognition);
            };
        }
    }

    startListening() {
        if (('webkitSpeechRecognition' in window)) {
            if (this.recognizing) {
                this.recognition.stop();
                return;
            }
            this.speechText = this.finalTranscript = '';
            this.recognition.start();
        }
    }

}

SpeechController.$inject = ['$scope', '$timeout'];
