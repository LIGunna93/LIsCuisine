const mongoose = require('mongoose');
const { Schema } = mongoose;

const nutritionSchema = new Schema({
    nutri_sec: { type: String, required: false, enum: ['Avg. Nährwerte', 'Vitamins & Minerals'] },
    unit_category: { type: String, uppercase: true, required: false, enum: ['/ portion', '/ 100 g'] },
    nutri_prop: { type: String, required: true },
    nutri_value: { type: Number, min: 0, max: 2000, required: true },
    unit: { type: String, required: true, enum: ['kJ', 'kcal', 'g', 'mg'] },
    added_info: { type: String, required: false },
//    author: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Nutrition = mongoose.model('Nutrition', nutritionSchema);

module.exports = Nutrition;