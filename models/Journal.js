const mongoose = require('mongoose');

const JournalSchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
    },
    year: {
        type: Number,
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    day: {
        type: Number,
        required: true,
    },
    foods: [
        {
            food: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'food',
            },
            servings: Number,
            mealNumber: Number,
        },
    ],
});

module.exports = Journal = mongoose.model('journal', JournalSchema);
