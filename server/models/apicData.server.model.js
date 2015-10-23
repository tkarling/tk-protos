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
    fullPicUrl: {
        type: String
    },
    thumbnailUrl: {
        type: String
    }
    //picId: {
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: "Pic",
    //    required: true
    //}
});

module.exports = mongoose.model('APicData', schema);

