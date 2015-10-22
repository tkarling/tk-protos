class reactiveService {
    constructor($http, rx) {
        //console.log("hello from webService");

        this.$http = $http;
        this.rx = rx;

        //this.testSearchWikipedia();
    }

    searchWikipedia (term) {
        return this.rx.Observable
            .fromPromise(this.$http({
                url: "http://en.wikipedia.org/w/api.php?&callback=JSON_CALLBACK",
                method: "jsonp",
                params: {
                    action: "opensearch",
                    search: term,
                    format: "json"
                }
            }))
            .map(function(response){ return response.data[1]; });
    }


    // testing only
    testSearchWikipedia () {
        var results = this.searchWikipedia("terminator");
        results.forEach(result => {
            console.log("reactiveService: testSearchWikipedia", result);
        });
    }


}

export default angular.module('services.reactiveService', [])
    .service('reactiveService', reactiveService)
    .name;
