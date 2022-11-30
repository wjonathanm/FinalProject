// const mongoose = require('mongoose');
// var crypto = require('crypto');
//
// const UserSchema = mongoose.Schema({
//     Id : {
//         type : String,
//         required :  true
//     },
//     hash : String,
//     salt : String
// });
// UserSchema.methods.setPassword = function (password) {
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64,`sha512`).toString(`hex`);
//
// };
// UserSchema.methods.validPassword = function (password){
//     var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString('hex');
//     return this.hash === hash;
// };
//
// const User = module.exports = mongoose.model('User', UserSchema);
const bcrypt = require('bcrypt');
const saltRounds = 10;
const plainText = "Hello World";
bcrypt.genSalt(saltRounds)
    .then(salt => {
        bcrypt.hash(plainText, salt)
            .then(hash => {
                console.log(hash);
            });
    });