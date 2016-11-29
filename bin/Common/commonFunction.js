/**
 * Created by WANGIV2 on 5/25/2015.
 */
var fs = require('fs');

exports.encodeImage = function (image) {
    //data:image/png;base64,
    image = image.substring(5, image.length);
    var images = image.split(";base64,");
    return {
        type: images[0],
        data: new Buffer(images[1], 'base64')
    }
};

exports.decodeImage = function (encodeImage) {
    //data:image/png;base64,
    var data = encodeImage.data.toString('base64');
    return "data:" + encodeImage.type + ";base64," + data;
};

exports.fiterValueCheck = function (value) {
    if (value == undefined || value == null || value.trim() == "") {
        return undefined;
    } else {
        return value.trim();
    }
};

//exports.getTemplateForms = function (path) {
//    fs.readdir(path, function(err,data){
//        if(err){
//            console.log(err);
//            return [];
//        }else{
//            var templateFormZipsArr = data;
//            var templateFormList = templateFormZipsArr.map(function (item, index) {
//                return item.replace('.zip','');
//            });
//            return templateFormList;
//        }
//    });
//};
