const mongoose = require('mongoose');
const { Schema } = mongoose;


const dishSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Schema.Types.Decimal128, required: true },
    description: { type: String, required: false },
    category: {
        type: String,
        lowercase: true,
        enum: ['vegan', 'carne+', 'vegeterian', 'notsure']
    },
    prepTime: { type: Number, required: false },
    imgsrc: { type: String, required: false },
    imgref: { type: String, required: false },
    imgauth: { type: String, required: false },
    ingredients: { type: Array, required: false },
    difficulty: { type: Number, min: 1, max: 5, required: false },
    instructions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Instruction'
        }
    ],
    nutritionals: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Nutrition'
        }
    ],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    //
    //    chef: { type: Schema.Types.ObjectId, ref: 'Chefs' }
});


const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;