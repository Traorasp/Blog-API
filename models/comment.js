const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    date: {type: Date, require: true},
    comment: {type: String, require: true},
});

module.exports = mongoose.model('Comment', CommentSchema);