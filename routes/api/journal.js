const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Journal = require('../../models/Journal');
// @route   GET api/journal
// @desc    Get seven latest entries
// @access  Private
router.get('/', auth, (req, res) => {
    try {
        res.send('Journal route');
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/journal
// @desc    Creates a journal entry
// @access  Private
router.post('/', auth, async (req, res) => {
    const { year, month, day, log } = req.body;
    const journalFields = {};
    journalFields.user = req.user.id;
    if (!year || !month || !day) {
        let date = new Date();
        journalFields.year = date.getFullYear();
        journalFields.month = date.getMonth() + 1;
        journalFields.day = date.getDate();
    } else {
        journalFields.year = year;
        journalFields.month = month;
        journalFields.day = day;
    }
    try {
        let journal = await Journal.where('user')
            .equals(journalFields.user)
            .where('year')
            .equals(journalFields.year)
            .where('month')
            .equals(journalFields.month)
            .where('day')
            .equals(journalFields.day);

        if (journal[0]) {
            return res.json(journal[0]);
        }

        journal = new Journal(journalFields);
        await journal.save();
        res.json(journal);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/journal/:journal_id
// @desc    Add food to journal
// @access  Private
router.post(
    '/:journal_id',
    [
        auth,
        [
            check('mealNumber', 'Please select a meal number').not().isEmpty(),
            check('servings', 'Please enter the servings').not().isEmpty(),
            check('food', 'Please enter a food id').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { mealNumber, servings, food } = req.body;

        try {
            let journal = await Journal.findOne({ _id: req.params.journal_id });
            if (!journal) {
                return res.status(400).json({
                    errors: [{ msg: 'Journal not found' }],
                });
            }
            journal.foods.push({ mealNumber, servings, food });
            await journal.save();
            res.json(journal);
        } catch (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
