import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Client = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    first_name: {
        type: String,
        default: ""
    },
    last_name: {
        type: String,
        default: ""
    },
    username: {
        type: String,
        default: ""
    },
    avatar: {
        url: {
            type: String,
            default: ""
        }
    },
    active: {
        type: Number,
        default: 1
    },
    keywords: {
        type: Array
    },
    deleted: {
        type: Number,
        default: 0
    },
    app_profile: {
        type: Schema.Types.ObjectId,
        required: true
    },
    created_time: {
        type: Date,
        default: Date.now,
        required: true
    },
    modified_time: {
        type: Date,
        default: Date.now,
        required: true
    },
    type: {
        type: Number
    }
}, { versionKey: false });

const ClientModel = mongoose.model('client', Client);

export default ClientModel