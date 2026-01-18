const mongoose = require('mongoose');
const { Schema } = mongoose;

const instructionSchema = new Schema({

    visualsrc: {type: String, required: false },
    instruct: {type: String, required: true },
//    body: { type: String, required: true },
//    published: { type: Date, default: Date.now },
//    author: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Instruction = mongoose.model('Instruction', instructionSchema);

module.exports = Instruction;