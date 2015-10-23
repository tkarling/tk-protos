var multer = require("multer");
var upload = multer({ dest: 'upload/'});

var aPicCtrl = require('../controllers/apic.server.controller.js');

var type = upload.single('file');
module.exports = function (app) {
    app.route('/api/apics')
        .get(aPicCtrl.read)
        .post(type, aPicCtrl.upload)
        .put(aPicCtrl.update)
        .delete(aPicCtrl.delete);

    //app.route('/api/pics/fullPic')
    //    .get(aPicCtrl.readFullPic)
    //
    //app.route('/api/pics/thumbnail')
    //    .get(aPicCtrl.readThumbnail)

    app.route('/api/apics/all')
        .get(aPicCtrl.read)
}
