const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Journal = require('../../models/Journal');
// @route   GET api/journal
// @desc    Get today's journal
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        let date = new Date();
        let journal = await Journal.findOne().byExactDay(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        );

        if (!journal) {
            return res.status(400).json({
                errors: [{ msg: 'Journal not found' }],
            });
        }
        res.json(journal);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/journal/meal
// @desc    Get today's food log organized by meal
// @access  Private
router.get('/meal', auth, async (req, res) => {
    try {
        let date = new Date();
        let journal = await Journal.findOne().byExactDay(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        );

        if (!journal) {
            return res.status(400).json({
                errors: [{ msg: 'Journal not found' }],
            });
        }
        res.json(journal.getEntriesByMeal());
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/journal/:journal_id
// @desc    Get journal by id
// @access  Private
router.get('/:journal_id', auth, async (req, res) => {
    try {
        let journal = await Journal.findOne().byJournalId(
            req.params.journal_id
        );

        if (!journal) {
            return res.status(400).json({
                errors: [{ msg: 'Journal not found' }],
            });
        }
        res.json(journal);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/journal/:journal_id/meal
// @desc    Get food log organized by meal
// @access  Private
router.get('/:journal_id/meal', auth, async (req, res) => {
    try {
        let journal = await Journal.findOne().byJournalId(
            req.params.journal_id
        );

        if (!journal) {
            return res.status(400).json({
                errors: [{ msg: 'Journal not found' }],
            });
        }
        const meals = await journal.getEntriesByMeal();

        res.json(meals);
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
        let journal = await Journal.findOne()
            .byUser(journalFields.user)
            .byExactDay(
                journalFields.year,
                journalFields.month,
                journalFields.day
            );

        if (journal) {
            return res.json(journal);
        }

        journal = new Journal(journalFields);
        await journal.save();
        res.json(journal);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/journal/:id
// @desc    Add food to journal by id
// @access  Private
router.post(
    '/:id',
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
            let journal = await Journal.findOne().byJournalId(req.params.id);
            if (!journal) {
                return res.status(400).json({
                    errors: [{ msg: 'Journal not found' }],
                });
            }
            journal.addEntry(mealNumber, servings, food);
            await journal.save();
            res.json(journal);
        } catch (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
    }
);

// @route   DELETE api/journal/:journal_id/:entry_id
// @desc    Delete food in journal by :entry_id
// @access  Private
router.delete('/:journal_id/:entry_id', auth, async (req, res) => {
    try {
        const journal = await Journal.findOne().byJournalId(
            req.params.journal_id
        );
        const entry = journal.getEntryById(req.params.entry_id);
        if (!entry) {
            return res.status(404).json({ msg: 'Not found' });
        }
        journal.removeEntryById(req.params.entry_id);
        await journal.save();
        res.json(journal);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;
