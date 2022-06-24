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
                dataType: [/*'Foundation',*/ 'Branded'],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': FDC_API_KEY,
                },
            }
        );
        const { foods } = response.data;
        // return response.data; //souma debug
        return simplify(foods);
    } catch (err) {
        console.log(err);
    }
};

const getFood = async (fdcId) => {
    try {
        const response = await axios.get(
            `https://api.nal.usda.gov/fdc/v1/food/${fdcId}?format=abridged`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': FDC_API_KEY,
                },
            }
        );
        const foods = response.data;
        return foods; //souma debug
        return simplify(foods);
    } catch (err) {
        console.log(err.message);
    }
};
const simplify = (foods) => {
    return foods
        .map((e) => {
            const calories = e.foodNutrients.find((e) => e.nutrientId === 1008);
            const protein = e.foodNutrients.find((e) => e.nutrientId === 1003);
            const fat = e.foodNutrients.find((e) => e.nutrientId === 1004);
            const carbohydrate = e.foodNutrients.find(
                (e) => e.nutrientId === 1005
            );
            const fiber = e.foodNutrients.find((e) => e.nutrientId === 1079);
            const sugar = e.foodNutrients.find((e) => e.nutrientId === 1063);
            const sodium = e.foodNutrients.find((e) => e.nutrientId === 1093);
            // if (
            //     !calories ||
            //     !protein ||
            //     !fat ||
            //     !carbohydrate ||
            //     !fiber ||
            //     !sugar ||
            //     !sodium
            // ) {
            //     return null;
            // }
            return {
                fdcId: e.fdcId,
                name: e.description,
                calories: calories ? calories.value : null,
                protein: protein ? protein.value : null,
                fat: fat ? fat.value : null,
                carbohydrate: carbohydrate ? carbohydrate.value : null,
                fiber: fiber ? fiber.value : null,
                sugar: sugar ? sugar.value : null,
                sodium: sodium ? sodium.value : null,
            };
        })
        .filter((e) => e !== null);
};

exports.searchFoods = searchFoods;
exports.getFood = getFood;
