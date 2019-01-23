var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:  { type: String, required: true, trim: true },
    artist_info: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
    admin: { type: Boolean, default: false }
});

accountSchema.statics.create = function(username, password) {
    var account = new this({
        username,
        password
    });

    return account.save();
}

accountSchema.statics.findOneByUsername = function(username) {
    return this.findOne({ username });
}

accountSchema.methods.verify = function(password) {
    return this.password === password;
}

accountSchema.methods.verifyAdmin = function() {
    return this.admin;
}

accountSchema.methods.assignAdmin = function() {
    this.admin = true;
    return this.save();
}

module.exports = mongoose.model('account', accountSchema);