const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {type: String, require: true},
    date: {type: Date, require: true},
    content: {type: String,  require: true},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    published: {type: Boolean, require: true}
});

PostSchema
.virtual('url')
.get(function() {
    return `/catalog/post/${this._id}`;
});

module.exports = mongoose.model('Post', PostSchema);