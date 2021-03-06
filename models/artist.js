var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    img_url: String, //이미지와 각 캡션 값을 담은 오브젝트
    caption: String
})

var portfolioSchema = new Schema({
    type: Number, //포트폴리오 타입: 0=인스타그램작업계정, 1=별도웹사이트, 2=자체포트폴리오
    link: String, //포트폴리오 링크: 'type'의 value가 0이면 인스타그램 아이디, 1이면 URL, 2면 기입 X
    working_image: [imageSchema]
})

var artistSchema = new Schema({
    artist_id: { type: Number, required: true, unique: true },

    user_id: { type: String, required: true, unique: true, lowercase: true, trim: true },
    user_password: { type: String, required: true, trim: true },

    working_name: String,
    real_name: String, //본명, 공개/비공개 여부
    birth_year: Number, //생년, 공개/비공개 여부

    hakbeon: String, //학번
    dept: Number, //학과 코드

    card_image: imageSchema, //아티스트 카드 대표 이미지
    card_description: String, //아티스트 카드 대표 설명

    portfolio: portfolioSchema,
    
    tags: [String],

    secret: [Boolean]
});


artistSchema.statics.create = function (payload) {
    //console.log (payload)
    var artist = new this(payload);
    return artist.save();
};

artistSchema.statics.findAll = function () {
    return this.find({});
};

artistSchema.statics.findRandom = function (numberOfItems) {
    /*var count = this.count();
    var random = Math.floor(Math.random() * count);
    var result = this.findOne().skip(random);*/
    var result = this.findOne();
    console.log(result);
    return result;
};

module.exports = mongoose.model('artist', artistSchema);