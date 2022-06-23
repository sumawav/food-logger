const mongoose = require('mongoose');

const JournalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    foods: [
        {
            food: {
                type: mongoose.Schema.Types.ObjectId,
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
