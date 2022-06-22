const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    // AKA "Winter Bulking", "Spring Cutting" , "Maintenance" etc.
    title: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    goalWeight: {
        type: Number,
    },
    macros: {
        protein: {
            type: Number,
        },
        fat: {
            type: Number,
        },
        carbohydrate: {
            type: Number,
        },
    },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
