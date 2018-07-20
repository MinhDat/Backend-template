import mongoose from 'mongoose';


const Schema = mongoose.Schema;
const Images = new Schema({
    type: String,
    url: String,
    name: String,
    delete: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
}, { versionKey: false })