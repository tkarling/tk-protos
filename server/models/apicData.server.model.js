var mongoose = require('mongoose');

var schema = new mongoose.Schema ({
    bucketName: {
        type: String
    },
    name: {
        type: String
    },
    contentType: {
        type: String
    },
});

module.exports = mongoose.model('APicData', schema);

