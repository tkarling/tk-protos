var fs = require('fs');
var lwip = require('lwip');
//var Pic = require('../models/pic.server.model');
var APicData = require('../models/apicData.server.model');

// AWS definitions begin
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var myBucketName = 'tkprotobucket';
// AWS definitions end

var getImageType = function (contentType) {
    return contentType.substring(6, contentType.length);
}

var createPicImage = function (image, name, contentType) {
    return {data: image, name: name, contentType: contentType}
};

module.exports = {

    upload: function (req, res) {
        var tmp_path = req.file.path;
        var contentType = req.file.mimetype;
        var imgType = getImageType(contentType);
        var imgName = req.file.originalname;
        var thumbnailName = "tn_" + imgName;
        //console.log("tmp_path", tmp_path, imgName, thumbnailName, contentType, req.file);

        fs.readFile(tmp_path, function (err, data) {
            if (err) return res.status(500).send(err);
            var params = {
                Bucket: myBucketName
                , Key: imgName
                , Body: data
                , ContentType: contentType
                , ACL: 'public-read'
            };
            s3.upload(params, function (serr, s3ImgData) {
                //console.log("s3.upload", serr, s3ImgData);
                if (err) return res.status(500).send(err);
                lwip.open(tmp_path, imgType, function (oerr, image) {
                    if (oerr) return res.status(500).send(oerr);
                    image.contain(150, 150, function (err, croppedImage) {
                        if (err) console.log("image.scale error", err);
                        image.crop(100, 100, function (err, croppedImage) {
                            if (err) console.log("image.crop error", err);
                            croppedImage.toBuffer(imgType, function (err, buffer) {
                                if (err) console.log("toBuffer error", err);
                                params.Key = imgName + "thumb";
                                params.Body = buffer;
                                s3.upload(params, function (serr, s3ThumbData) {
                                    if (err) return res.status(500).send(err);
                                    fs.unlink(tmp_path, function (uerr) {
                                        if (uerr) console.log("error deleting tmp file", uerr);
                                    });

                                    var newAPicData = new APicData;
                                    newAPicData.bucketName = myBucketName;
                                    newAPicData.name = imgName;
                                    newAPicData.contentType = contentType;
                                    newAPicData.fullPicUrl = s3ImgData.Location;
                                    newAPicData.thumbnailUrl = s3ThumbData.Location;
                                    //newAPicData.picId = picsResult._id;
                                    newAPicData.save(function (derr, dataResult) {
                                        if (derr) return res.status(500).send(derr);
                                        else res.send(dataResult);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    },

    // reads based on all/ APicData Id
    read: function (req, res) {
        APicData.find(req.query)
            .exec(function (err, result) {
                if (err) return res.status(500).send(err);
                else res.send(result);
            });
    },

    //// reads based on picId
    //readFullPic: function (req, res, next) {
    //    Pic.findById(req.query.id, function (err, doc) {
    //        if (err) return next(err);
    //        if(doc && doc.img) {
    //            res.contentType(doc.img.contentType);
    //            res.send(doc.img.data);
    //        } else {
    //            console.log("readFullPic: NO FULLPIC", req.query.id, doc);
    //            return next(err);
    //        }
    //    });
    //},
    //
    //// reads based on picId
    //readThumbnail: function (req, res, next) {
    //    Pic.findById(req.query.id, function (err, doc) {
    //        //console.log("readThumbnail", doc);
    //        if (err) return next(err);
    //        if(doc && doc.thumbnail) {
    //            res.contentType(doc.thumbnail.contentType);
    //            res.send(doc.thumbnail.data);
    //        } else {
    //            console.log("readThumbnail: NO THUMBNAIL", req.query.id, doc);
    //            return next(err);
    //        }
    //
    //    });
    //},

    // updates based on APicData ID, NOT TESTETD
    update: function (req, res) {
        console.log("update", req.query.id, req.body);
        var id = req.query.id;
        var updatedObject = req.body;
        APicData.findByIdAndUpdate(id, updatedObject, {
            new: true
        }, function (err, result) {
            if (err) return res.status(500).send(err);
            else {
                console.log("update result", result);
                res.send(result);
            }
        });
    },

    // deletes based on picId === CHANGE TO APicData ID
    delete: function (req, res) {
        console.log("delete query", req.query)
        //var picIdQuery = req.query;
        var id = req.query.id;

        console.log("delete pic", id);
        //Pic.findByIdAndRemove(picId, function (perr, result) {
        //if (perr) return res.status(500).send(perr);
        APicData.findByIdAndRemove(id, function (derr, result) {
            console.log("APicData.findByIdAndRemove", derr, result);
            if (derr) return res.status(500).send(derr);
            else res.send(result);
        });
        //});

    }
};