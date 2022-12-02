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
const bcrypt = require("bcrypt")
const saltRounds = 10
const password = "Admin@123"

bcrypt
    .hash(password, saltRounds)
    .then(hash => {
        userHash = hash
        console.log('Hash ', hash)
        validateUser(hash)
    })
    .catch(err => console.error(err.message))

function validateUser(hash) {
    bcrypt
        .compare(password, hash)
        .then(res => {
            console.log(res) // return true
            console.log(hash)
            console.log(password)
        })
        .catch(err => console.error(err.message))
}