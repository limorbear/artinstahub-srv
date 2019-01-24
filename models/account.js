var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var config = require('../config');

var accountSchema = new Schema({
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:  { type: String, required: true, trim: true },
    artist_info: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
    admin: { type: Boolean, default: false }
});

accountSchema.statics.create = function(username, password) {
    var encryptedPassword = crypto.createHmac('sha1', config.secret)
                    .update(password)
                    .digest('base64');
    
    var account = new this({
        username,
        password: encryptedPassword
    });

    return account.save();
}

accountSchema.statics.findOneByUsername = function(username) {
    return this.findOne({ username });
}

accountSchema.methods.verify = function(password) {
    var encryptedPassword = crypto.createHmac('sha1', config.secret)
                    .update(password)
                    .digest('base64');

    return this.password === encryptedPassword;
}

accountSchema.methods.linkArtistInfo = (artist_id) => {
    this.artist_info = artist_id;
    return this.save();
}

accountSchema.methods.verifyAdmin = function() {
    return this.admin;
}

accountSchema.methods.assignAdmin = function() {
    this.admin = true;
    return this.save();
}

module.exports = mongoose.model('account', accountSchema);