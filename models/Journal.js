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
    entries: [
        {
            food: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'food',
            },
            servings: {
                type: Number,
                required: true,
            },
            mealNumber: {
                type: Number,
                required: true,
            },
        },
    ],
});

module.exports = Journal = mongoose.model('journal', JournalSchema);
