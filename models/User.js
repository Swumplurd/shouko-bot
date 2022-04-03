const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: String,
        required: true,
    },
    user_avatar: {
        type: String,
        required: true,
    },
    waifu: {
        type: String,
    },
    waifu_history: {
        type: Array,
    }
});

module.exports = model('User', UserSchema);