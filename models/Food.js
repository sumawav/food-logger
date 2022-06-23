const mongoose = require('mongoose');

const FoodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
    },
    calories: {
        type: Number,
        required: true,
    },
    protein: {
        type: Number,
        required: true,
    },
    fat: {
        type: Number,
        required: true,
    },
    carbohydrate: {
        type: Number,
        required: true,
    },
    fiber: {
        type: Number,
        required: true,
    },
    sugar: {
        type: Number,
        required: true,
    },
    sodium: {
        type: Number,
        required: true,
    },
});

module.exports = Food = mongoose.model('food', FoodSchema);
