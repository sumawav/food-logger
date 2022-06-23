const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
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
        default: () => Date.now(),
    },
    height: Number,
    weight: Number,
    goalWeight: Number,
    macros: {
        protein: Number,
        fat: Number,
        carbohydrate: Number,
    },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
