const axios = require('axios');
const config = require('config');
const FDC_API_KEY = config.get('FDC_API_key');

const searchFoods = async (query, pageNumber = 1, pageSize = 10) => {
    try {
        const response = await axios.post(
            'https://api.nal.usda.gov/fdc/v1/foods/search',
            {
                query,
                pageSize,
                pageNumber,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': FDC_API_KEY,
                },
            }
        );
        const { foods } = response.data;

        // return foods;

        return foods
            .map((e) => {
                const calories = e.foodNutrients.find(
                    (e) => e.nutrientId === 1008
                );
                const protein = e.foodNutrients.find(
                    (e) => e.nutrientId === 1003
                );
                const fat = e.foodNutrients.find((e) => e.nutrientId === 1004);
                const carbohydrate = e.foodNutrients.find(
                    (e) => e.nutrientId === 1005
                );
                const fiber = e.foodNutrients.find(
                    (e) => e.nutrientId === 1079
                );
                const sugar = e.foodNutrients.find(
                    (e) => e.nutrientId === 2000
                );
                const sodium = e.foodNutrients.find(
                    (e) => e.nutrientId === 1093
                );
                if (
                    !calories ||
                    !protein ||
                    !fat ||
                    !carbohydrate ||
                    !fiber ||
                    !sugar ||
                    !sodium
                ) {
                    return null;
                }
                return {
                    fdcId: e.fdcId,
                    name: e.description,
                    calories: calories.value,
                    protein: protein.value,
                    fat: fat.value,
                    carbohydrate: carbohydrate.value,
                    fiber: fiber.value,
                    sugar: sugar.value,
                    sodium: sodium.value,
                };
            })
            .filter((e) => e !== null);
    } catch (err) {
        console.log(err);
    }
};

module.exports = searchFoods;
