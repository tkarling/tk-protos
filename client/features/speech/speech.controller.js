export default class SpeechController {
    constructor($scope, $timeout, uTest) {
        this.test = 'Hello from SpeechController';
        this.$scope = $scope;

        //console.log("annyang", annyang);
        this.language = 'en-US';
        this.debug = false;

        if (!uTest) {
            this.annyangSetup();
        }

        let originalPlaceholder = "what's up?";
        this.placeholder = originalPlaceholder;

        if (! ('webkitSpeechRecognition' in window) ) {
            console.log("no webkitSpeechRecognition");
        } else
        {
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

    annyangSetup () {
        if (annyang) {
            this.commands = {
                'add *val': (val) => {
                    this.addedText = val;
                    console.log("add command", val);
                    this.$scope.$apply();
                },
                'check number *val': (val) => {
                    this.checkNum = val;
                    console.log("check command", val);
                    this.$scope.$apply();
                },
                'remove number *val': (val) => {
                    this.removeNum = val;
                    console.log("remove command", val);
                    this.$scope.$apply();
                },
                'delete number *val': (val) => {
                    this.deleteNum = val;
                    console.log("delete command", val);
                    this.$scope.$apply();
                },
                'lisää *val': (val) => {
                    this.addedText = val;
                    console.log("add command", val);
                    this.$scope.$apply();
                },
                'tsekkaa numero *val': (val) => {
                    this.checkNum = val;
                    console.log("check command", val);
                    this.$scope.$apply();
                },
                'poista numero *val': (val) => {
                    this.removeNum = val;
                    console.log("remove command", val);
                    this.$scope.$apply();
                },
                'tuhoa numero *val': (val) => {
                    this.deleteNum = val;
                    console.log("delete command", val);
                    this.$scope.$apply();
                }


            }
            annyang.addCommands(this.commands);
            //annyang.debug();
            //annyang.setLanguage('fi');
            //annyang.start();
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

    annyangStart() {
        if(annyang) {
            annyang.start();
        }
    }

    annyangStop() {
        if(annyang) {
            annyang.abort();
        }
    }

    annyangPause() {
        if (annyang) {
            annyang.pause();
        }
    }

    annyangResume() {
        if (annyang) {
            annyang.resume();
        }
    }

    annyangSetLanguage() {
        if (annyang) {
            this.language = this.language || 'en-US';

            annyang.setLanguage(this.language);
        }
    }

    annyangToggleDebug(myDebug) {
        if (annyang) {
            console.log("setting debug", myDebug);
            annyang.debug(myDebug);
        }
    }


}

SpeechController.$inject = ['$scope', '$timeout', 'uTest'];
