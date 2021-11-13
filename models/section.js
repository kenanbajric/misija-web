const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    order: {
        type: String // razmisliti sta tacno moze biti order i implementirati
    },
    published: {
        type: Boolean,
        default: false
    },
    isOnFront: {
        type: Boolean,
        default: false
    },
    offers: [
        {
            offerId: {type: Schema.Types.ObjectId, ref:'Offer', required: false}
        }
    ]
},  {
    timestamps: true
});

module.exports = mongoose.model('Section', sectionSchema);