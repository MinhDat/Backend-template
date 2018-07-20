import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ServicePackage = new Schema({
    title: {
        type: String,
        required: true
    },
    content: String,
    price: {
        type: String,
        required: true
    },
    month: Number,
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    }
}, { versionKey: false });

const ServicePackageModel = mongoose.model('servicePackage', ServicePackage);

export default ServicePackageModel;