const express = require('express');
const router = express.Router();
const Side = require('../models/side');
const Review = require('../models/review');
const categories = ['carboriific', 'caesaresque', 'not-healthy', 'meal-like', 'soooup', 'notsure'];
//const menu = {
//	Sides: [
//	{ id: 1, name: 'Naan', price: 4.99, description: "Toasted bread topped with garlic and butter.", img: '../resources/images/natasha-levai-vypfll7xE-A-unsplash.jpg', imgref: 'https://unsplash.com/@natashashome?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText', imgauth: 'Natasha Levai'},
//    { id: 2, name: 'LIz Bunz', price: 5.99, description: "Easy money fullfillment bunz with insides as soft as baby butt cheeks(don't ask).", img: '../resources/images/jonas-kakaroto-Gxp7jA1qCLU-unsplash.jpg', imgref: "https://unsplash.com/@jkakaroto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText", imgauth: "Jonas Kakaroto"},
//	{ id: 2, name: 'Jas-Rice', price: 5.99, description: "Easy money fullfillment bunz with insides as soft as baby butt cheeks(don't ask).", img: '../resources/images/jonas-kakaroto-Gxp7jA1qCLU-unsplash.jpg', imgref: "https://unsplash.com/@jkakaroto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText", imgauth: "Jonas Kakaroto"},
//	{ id: 2, name: 'Charrata', price: 5.99, description: "Easy money fullfillment bunz with insides as soft as baby butt cheeks(don't ask).", img: '../resources/images/jonas-kakaroto-Gxp7jA1qCLU-unsplash.jpg', imgref: "https://unsplash.com/@jkakaroto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText", imgauth: "Jonas Kakaroto"}
//	]
//};

router.get('/', async (req, res) => {
	const { category } = req.query;
	const sides = category ? await Side.find({ category }) : await Side.find({});
	res.render('sides/sides', { sides, category: category || 'All', imgs: req.app.locals.imgData?.Side || {}, msgs: { success: req.flash('successnew'), error: req.flash('error') } });
});

router.get('/new', async (req, res) => {
	res.render('sides/new', { categories })
})

router.post('/', async (req, res) => {
	try {
		const side = new Side(req.body.side);
		await side.save();
		req.flash('successnew', 'Successfully added a new side!');
		res.redirect(`sides/${side._id}`);
	} catch (err) {
		console.error(err);
		req.flash('error', 'Error adding side: ' + err.message);
		res.status(400).send(err.message);
	}
})

router.get('/:id', async (req, res) => {
	const side = await Side.findById(req.params.id).populate('reviews');
	res.render('sides/show', { side, msgs: { successedt: req.flash('successedt'), erroredt: req.flash('erroredt'), error0: req.flash('error0') } });
})


router.get('/:id/edit', async (req, res) => {
	const { id } = req.params;
	const side = await Side.findById(id)
	res.render('sides/edit', { side, categories });
})

router.put('/:id/edit', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = { ...req.body.side };
        
        //Filter out any keys that are empty strings or undefined. This ensures if a user leaves a field blank, it doesn't overwrite existing data
        Object.keys(updatedData).forEach(key => {
            if (updatedData[key] === "" || updatedData[key] === undefined) {
                delete updatedData[key];
            }
        });

        const side = await Side.findByIdAndUpdate(
            id,
            { $set: updatedData }, //only updates the fields provided in the request body
            { new: true, runValidators: true }
        );
        // consider .populate('farm', 'name'); for expanding referenced fields

        if (!side) {
            req.flash('error0', 'Cannot find that side!');
            res.redirect('/sides');
        }
        // FIRST REQUIREMENT: Flash success message
        req.flash('successedt', 'Successfully updated side!');
        // Redirect to the side's show page after update
        res.redirect(`/sides/${side._id}`);
    } catch (e) {
        req.flash('erroredt', 'Error updating side: ' + e.message);
        res.redirect(`/sides/${req.params.id}/edit`);
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Side.findByIdAndDelete(id);
    res.redirect('/sides');
});

//POST a review for a side
router.post('/:id/reviews', async (req, res) => {
    try {
        const side = await Side.findById(req.params.id);
        const review = new Review(req.body.review);
        side.reviews.push(review);
        await review.save();
        await side.save();
        res.redirect(`/sides/${side._id}`);
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
});

module.exports = router;