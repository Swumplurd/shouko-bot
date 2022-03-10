const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    user_id: {
        type: Number,
        required: true,
        unique: true
    },
    user: {
        type: String,
        required: true,
    },
    current_waifu: {
        type: String,
    },
    waifu_history: {
        type: Array,
    }
});

module.exports = model('User', UserSchema);