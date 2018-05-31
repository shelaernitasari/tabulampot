var express = require('express');
var router = express.Router();
var Admin = require('../api/models/admin');
var mongoose = require('mongoose');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('insertadmin');
});

router.post('/', function (req, res, next){
    Admin.find({ username: req.body.username })
    .exec()
    .then(admin => {
        if(admin.length >= 1){
            return res.status(200).json({
                message: 'username sudah ada',
                status: '204'
            });
        }else{
            bcrypt.hash(req.body.password, 8, (err, hash) => {
                if(err){
                    res.status(500).json({
                        error: err
                    });
                }else{
                    const admin = new Admin({
                        _id: new mongoose.Types.ObjectId(),
                        username: req.body.username,
                        password: hash,
                        //foto: req.file.path
                        foto: BASE_URL + 'uploads/' + req.file.filename
                    });

                    admin.save()
                        .then(result => {
                            console.log(result);
                            res.status(200).json({
                                message: "Berhasil menambah admin",
                                createdMenu: result
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });

                        });
                }
            });
        }
    });

});

module.exports = router;