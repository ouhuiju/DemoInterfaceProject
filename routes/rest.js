/**
 * Created by OUOK on 11/28/2016.
 */
var express = require('express');
var router = express.Router();
var returnVO = require('../bin/VO/returnVO');
var commonFunction = require('../bin/Common/commonFunction');
var fs = require('fs');
var path = require('path');
var mineType = require('mime-types');

router.post('/login', function (req, res, next) {
    var returnData = returnVO.new();
    returnData.success = true;
    var userName = req.body.userName;
    var password = req.body.password;

    if (userName == 'Okar' && password == '123456') {
        res.json(returnData);
    } else {
        returnData.success = false;
        returnData.errorMessage = 'userName or Password is not correct.';
        res.json(returnData);
    }
});

router.get('/list', function (req, res, next) {
    var returnData = returnVO.new();
    returnData.success = true;
    var listDataArr = [];
    for (var i = 0; i < 100; i++) {
        var content = {
            'title': 'test' + i,
            'editor': 'Okar' + i,
            'imageURL': 'http://ouok-w7.corp.oocl.com:8888/rest/photo?name=Smile'
        };
        listDataArr.push(content);
    }
    returnData.data = {'listData': listDataArr};
    res.json(returnData);
});

router.get('/detail', function (req, res, next) {
    var returnData = returnVO.new();
    returnData.success = true;

    var title = req.query.title;

    var content = {
        'title': title,
        'imageURL': 'http://ouok-w7.corp.oocl.com:8888/rest/photo?name=Smile',
        'detailContent': 'this is a title named ' + title + ' content. Edit by Okar.'
    };

    returnData.data = content;
    res.json(returnData);
});

router.get('/photo', function (req, res, next) {
    var name = req.query.name;
    var filePath = path.resolve('public/images/'+name+'.png');
    var data = fs.readFileSync(filePath);
    if (data && data.length > 0) {
        data = new Buffer(data).toString('base64');
        var base64Image = 'data:' + mineType.lookup(filePath) + ';base64,' + data;
        res.writeHead('200', {'Content-Type': commonFunction.encodeImage(base64Image).type});
        res.end(commonFunction.encodeImage(base64Image).data, 'binary');
    } else {
        res.writeHead('404', {'Content-Type': 'image/*'});
        res.end();
    }
});

module.exports = router;

