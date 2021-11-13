const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 255
    },
    slug: {
        type: String,
        required: true,
        maxlength: 255,
    },
    published: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date
    },
    unpublishedAt: {
        type: Date
    },
    introduction: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    sectionId: {
        type: Schema.Types.ObjectId,
        ref: 'Section'
    }
},  {
    timestamps: true
});

module.exports = mongoose.model('Offer', offerSchema);