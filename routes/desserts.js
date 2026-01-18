const express = require('express');
const router = express.Router();

const menu = {
	Desserts: [
	{ id: 1, name: 'Beignet', price: 0.49, description: "Toasted bread topped with garlic and butter.", img: '../resources/images/keesha-s-kitchen-Yn065HfaXnE-unsplash.jpg', imgref: "https://unsplash.com/@keeshasskitchen", imgauth: "Keesha's Kitchen"},
	{ id: 2, name: 'Gulab-J', price: 0.49, description: "Toasted bread topped with garlic and butter.", img: '../resources/images/keesha-s-kitchen-Yn065HfaXnE-unsplash.jpg', imgref: "https://www.gettyimages.de/search/stack/851515826?family=creative&assettype=image", imgauth: "Keesha's Kitchen"},
	{ id: 3, name: 'Sweet Nuts', price: 0.49, description: "Toasted bread topped with garlic and butter.",  img: '../resources/images/gettyimages-carmnuts.jpg', imgref: "https://www.gettyimages.de/search/stack/851515826?family=creative&assettype=image", imgauth: "gettyimages"},
	{ id: 4, name: 'Pancake', price: 0.49, description: "The classic pancake. There are a thousand ways to make/bake a pancake - maybe more - here's my own. I call it semi-American and semi-EveryoneElse(some would call that American)", img: '../resources/images/m-draa-26NcU5Vkd5o-unsplash.jpg', imgref: "https://unsplash.com/@keeshasskitchen", imgauth: "Draa M"}
	]
}
router.use('/', (req, res, next) => {
	console.log('Log from the tasty section! At' + ' ' + new Date().toISOString());
	next();
})
router.get('/', (req, res) => {
//		res.send("All desserts live here..... soon =)")
		res.render('./desserts/desserts', { menu })
})

router.post('/', (req, res) => {
		res.send("Adding this dish to the desserts menu..... now! =)")
})

router.get('/:id', (req, res) => {
		res.send("Viewing the respective dessert with an ID of {id} =)")
})


router.get('/:id/edit', (req, res) => {
		res.send("EditPage for the respective dessert with an ID of {id} =)")
})

module.exports = router;