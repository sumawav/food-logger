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

JournalSchema.methods.addEntry = function (mealNumber, servings, food) {
    this.entries.push({ mealNumber, servings, food });
};

JournalSchema.methods.removeEntryById = function (id) {
    const removeIndex = this.entries.map((entry) => entry._id).indexOf(id);
    this.entries.splice(removeIndex, 1);
};

JournalSchema.methods.getEntryById = function (id) {
    const entry = this.entries.find((entry) => entry.id === id);
    return entry;
};

JournalSchema.methods.getEntriesByMeal = function () {
    const uniqueMealNumbers = this.entries
        .map((e) => e.mealNumber)
        .filter(
            (mealNumber, index, mealNumberArray) =>
                mealNumberArray.indexOf(mealNumber) === index
        );

    const byMeal = {};

    uniqueMealNumbers.map((mealNumber) => {
        byMeal[mealNumber] = this.entries.filter(
            (e) => e.mealNumber === mealNumber
        );
    });

    return byMeal;
};

JournalSchema.query.byExactDay = function (year, month, day) {
    return this.where('year')
        .equals(year)
        .where('month')
        .equals(month)
        .where('day')
        .equals(day);
};

JournalSchema.query.byUser = function (user) {
    return this.where('user').equals(user);
};

JournalSchema.query.byJournalId = function (id) {
    return this.where('_id').equals(id);
};

module.exports = Journal = mongoose.model('journal', JournalSchema);
