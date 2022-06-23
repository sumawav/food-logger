const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Food = require('../../models/Food');
// @route   GET api/food
// @desc    Get all foods
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/food
// @desc    Create a food
// @access  Private
router.post(
    '/',
    [
        auth,
        [
            check('name', 'Food needs a name').not().isEmpty(),
            check('calories', 'Food needs calories').not().isEmpty(),
            check('protein', 'Protein required').not().isEmpty(),
            check('fat', 'Fat required').not().isEmpty(),
            check('carbohydrate', 'Carbohydrates required').not().isEmpty(),
            check('fiber', 'Fiber required').not().isEmpty(),
            check('sugar', 'Sugar required').not().isEmpty(),
            check('sodium', 'Sodium required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            name,
            calories,
            protein,
            fat,
            carbohydrate,
            fiber,
            sugar,
            sodium,
        } = req.body;

        const foodFields = {};
        foodFields.user = req.user.id;
        foodFields.name = name;
        foodFields.calories = calories;
        foodFields.protein = protein;
        foodFields.fat = fat;
        foodFields.carbohydrate = carbohydrate;
        foodFields.fiber = fiber;
        foodFields.sugar = sugar;
        foodFields.sodium = sodium;

        try {
            let food = new Food(foodFields);
            await food.save();
            res.json(food);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   DELETE api/food
// @desc    Delete a food
// @access  Private
router.delete('/:food_id', auth, async (req, res) => {
    try {
        await Food.findOneAndRemove({ _id: req.params.food_id });
        res.json({ msg: 'Food deleted' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;
