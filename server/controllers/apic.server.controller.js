var fs = require('fs');
var lwip = require('lwip');
//var Pic = require('../models/pic.server.model');
var APicData = require('../models/apicData.server.model');

// AWS definitions begin
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var myBucketName = 'tkprotobucket';
// AWS definitions end

var THUMBIMGID = 'thumb';

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
        //console.log("tmp_path", tmp_path, imgName, contentType, req.file);

        var newAPicData = new APicData;
        newAPicData.bucketName = myBucketName;
        newAPicData.name = imgName;
        newAPicData.contentType = contentType;
        newAPicData.save(function (derr, dataResult) {
            //console.log("after save", dataResult);
            if (derr) return res.status(500).send("save err" + derr);
            fs.readFile(tmp_path, function (err, data) {
                if (err) return res.status(500).send("readFile err" +err);
                var params = {
                    Bucket: myBucketName
                    , Key: dataResult._id + ""
                    , Body: data
                    , ContentType: contentType
                    , ACL: 'public-read'
                };
                s3.upload(params, function (serr, s3ImgData) {
                    //console.log("img s3.upload", serr, s3ImgData);
                    if (serr) return res.status(500).send("img upload err" + serr);
                    lwip.open(tmp_path, imgType, function (oerr, image) {
                        if (oerr) return res.status(500).send("lw open err" + oerr);
                        image.contain(150, 150, function (err, croppedImage) {
                            if (err) console.log("image.scale error", err);
                            image.crop(100, 100, function (err, croppedImage) {
                                if (err) console.log("image.crop error", err);
                                croppedImage.toBuffer(imgType, function (err, buffer) {
                                    if (err) console.log("toBuffer error", err);
                                    params.Key += THUMBIMGID;
                                    params.Body = buffer;
                                    s3.upload(params, function (serr, s3ThumbData) {
                                        //console.log("thumb s3.upload", serr, s3ThumbData);
                                        if (serr) return res.status(500).send("thumb upload err" + serr);
                                        fs.unlink(tmp_path, function (uerr) {
                                            if (uerr) console.log("error deleting tmp file", uerr);
                                        });
                                        res.send(dataResult);
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

    // updates based on APicData ID, NOT TESTED
    update: function (req, res) {
        //console.log("update", req.query.id, req.body);
        var id = req.query.id;
        var updatedObject = req.body;
        APicData.findByIdAndUpdate(id, updatedObject, {
            new: true
        }, function (err, result) {
            if (err) return res.status(500).send(err);
            else {
                //console.log("update result", result);
                res.send(result);
            }
        });
    },

    // deletes based on picName
    delete: function (req, res) {
        //console.log("delete query", req.query)
        var picNameQuery = req.query;
        var picName = req.query.name;

        var params = {
            Bucket: myBucketName
            , Key: picName
        };

        //console.log("delete pic", myBucketName, picName);
        s3.deleteObject(params, function (err, s3ImgData) {
            //console.log("s3.deleteObject", err, s3ImgData);
            if (err) return res.status(500).send(err);
            params.Key += THUMBIMGID;
            s3.deleteObject(params, function (terr, s3ThumbImgData) {
                if (terr) return res.status(500).send(terr);
                APicData.findOneAndRemove(picNameQuery, function (derr, result) {
                    //console.log("APicData.findOneAndRemove", derr, result);
                    if (derr) return res.status(500).send(derr);
                    else res.send(result);
                });
            });
        });

    }
};