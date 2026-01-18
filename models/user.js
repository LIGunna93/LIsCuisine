const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    name: { type: String, required: true },
    pronouns: {
        type: String,
        lowercase: true,
        required: false,
        enum: ['he/him', 'she/her', 'them/they', 'sthelse', '--']
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
//    chef: { type: Schema.Types.ObjectId, ref: 'Chefs' }
});


const User = mongoose.model('User', userSchema);

module.exports = User;