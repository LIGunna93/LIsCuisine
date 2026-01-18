const express = require('express');
const router = express.Router();
const flash = require('connect-flash');
const Dish = require('../models/dish');
const Review = require('../models/review');
const Instruction = require('../models/instruction');
const Nutrition = require('../models/nutrition');
const categories = ['vegan', 'carne+', 'vegeterian'];
const units = ['kJ', 'kcal', 'g', 'mg'];

router.get('/', async (req, res) => {
    const { category } = req.query;
    const imgs = req.app.locals.imgData?.Dish || {}; // or req.imgData.Dish
    const dishes = category ? await Dish.find({ category }) : await Dish.find({});
    res.render('dishes/dishes', { dishes, category: category || 'All', imgs, msgs: { success: req.flash('success'), error: req.flash('error') } });
});

router.get('/new', async (req, res) => {
    res.render('dishes/new', { categories, success: req.query.success, error: req.query.error })
})

router.post('/', async (req, res) => {
    try {
        const dish = new Dish(req.body.dish);
        await dish.save();
        req.flash('successnew', 'Successfully added a new dish!');
        res.redirect(`dishes/${dish._id}`);
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
})

router.get('/:id', async (req, res,) => {
    const dish = await Dish.findById(req.params.id)
    .populate('reviews')
    .populate('instructions')
    .populate('nutritionals');
    res.render('dishes/show', { dish, units, msgs: { successedt: req.flash('successedt'), erroredt: req.flash('erroredt'), error0: req.flash('error0') } });
});

router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    const dish = await Dish.findById(id);//.populate('farm', 'name');
    res.render('dishes/edit', { dish, categories,  success: req.query.success, error: req.query.error })
    //   res.send(`Edit page for the respective main dish with an ID of ${id} =)`, { dish })
})

router.put('/:id/edit', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = { ...req.body.dish };
        
        //Filter out any keys that are empty strings or undefined. This ensures if a user leaves a field blank, it doesn't overwrite existing data
        Object.keys(updatedData).forEach(key => {
            if (updatedData[key] === "" || updatedData[key] === undefined) {
                delete updatedData[key];
            }
        });

        const dish = await Dish.findByIdAndUpdate(
            id,
            { $set: updatedData }, //only updates the fields provided in the request body
            { new: true, runValidators: true }
        );
        // consider .populate('farm', 'name'); for expanding referenced fields

        if (!dish) {
            req.flash('error0', 'Cannot find that dish!');
            res.redirect('/dishes');
        }
        // FIRST REQUIREMENT: Flash success message
        req.flash('successedt', 'Successfully updated dish!');
        // Redirect to the dish's show page after update
        res.redirect(`/dishes/${dish._id}`);
    } catch (e) {
        req.flash('erroredt', 'Error updating dish: ' + e.message);
        res.redirect(`/dishes/${req.params.id}/edit`);
    }
});

//if not using findByIdAndUpdate, then need to save after updating fields:
        // dish.name = req.body.dish.name;
        // dish.price = req.body.dish.price;
        // dish.description = req.body.dish.description;
        // dish.category = req.body.dish.category;
        //    await dish.save();

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Dish.findByIdAndDelete(id);
    res.redirect('/dishes');
});

//POST an instruction for a dish
router.post('/:id/instructions', async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id);
        const instruction = new Instruction(req.body.instruction);
        dish.instructions.push(instruction);
        await instruction.save();
        await dish.save();
        res.redirect(`/dishes/${dish._id}`);
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
});

//POST nutritional info for a dish
router.post('/:id/nutritionals', async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id);
        const nutrition = new Nutrition(req.body.nutrition);
        dish.nutritionals.push(nutrition);
        await nutrition.save();
        await dish.save();
        res.redirect(`/dishes/${dish._id}`);
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
});

//POST a review for a dish
router.post('/:id/reviews', async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id);
        const review = new Review(req.body.review);
        dish.reviews.push(review);
        await review.save();
        await dish.save();
        res.redirect(`/dishes/${dish._id}`);
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
});

//router.get('/:id/edit', (req, res) => {
//		res.send("EditPage for the respective main dish with an ID of {id} =)")
//})

module.exports = router;