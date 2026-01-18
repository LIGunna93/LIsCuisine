const mongoose = require('mongoose');
const { Schema } = mongoose;


const sideSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Schema.Types.Decimal128, required: true },
    description: { type: String, required: false },
    category: {
        type: String,
        lowercase: true,
        enum: ['carboriific', 'caesaresque', 'not-healthy', 'meal-like', 'soooup', 'notsure']
    },
    prepTime: { type: Number, required: false },
    imgsrc: { type: String, required: false },
    imgref: { type: String, required: false },
    imgauth: { type: String, required: false },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
    //    chef: { type: Schema.Types.ObjectId, ref: 'Chefs' }
});


const Side = mongoose.model('Side', sideSchema);

module.exports = Side;