const express = require('express');
const app = express();
const port = 10000;
const path = require('path');
const Colors = require('colors');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const dotenv = require('dotenv');

const dishRoutes = require('./routes/dishes');
const sideRoutes = require('./routes/sides');
const dessRoutes = require('./routes/desserts');

const imgData = require('./resources/images/imgdata.json'); // adjust path as needed
const { info } = require('console');
//const { db } = require('./models/dish');



//const Dish = require('./models/dish');


//Load environment variables
dotenv.config();
const user = process.env.MongoDB_USER;
const pass = process.env.MongoDB_PASSWORD;;

//MongoDB Connection
const encoded_pwd = encodeURIComponent(pass);


//DevPort
const dbURIo = `mongodb://127.0.0.1:28001/LIsCuisine`; //NOAUTH
//const dbURIa = `mongodb://${user}:${pass}@127.0.0.1:28001/LIsCuisine`; //AUTH
//Default Port
//const dbURIdef = `mongodb://${user}:${encoded_pwd}@127.0.0.1:27017/LIsCuisine?authSource=admin`;
mongoose.connect(dbURIo)
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
  })
  .catch(err => {
    console.error("OH NO MONGO CONNECTION ERROR!!!!")
    console.error("Connection error type:", err.name)
    console.error('Message:', err.message)
  })

//app use middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/resources', express.static(path.join(__dirname, 'resources')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const sessionOptions = {
  secret: 'seshkey',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 3, // 3 days from now
    maxAge: 1000 * 60 * 60 * 24 * 3 // 3 days
  }
};

//flash and session middleware
app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
  req.imgData = imgData;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

//Navigation Routes middleware
app.use('/dishes', dishRoutes);
app.use('/sides', sideRoutes);
app.use('/desserts', dessRoutes);

//App Route handlers

app.get('/', async (req, res) => {
  //include async function that awaits 5 seconds after the above 'res.send' message before sending the response to render home.ejs
  console.log("We have been pinged on the home page!!".bgCyan + "" + new Date().toLocaleString().red.bgGreen);
  //include async function that awaits 5 seconds after the above 'res.send' message before sending the response to render home.ejs
  await new Promise(resolve => setTimeout(resolve, 200));
  res.render('home.ejs');
});

app.get('/flash', function (req, res) {
  // Set a flash message by passing the key, followed by the value, to req.flash().
  //  req.flash('info', 'Flash is back!')
  req.flash('info', 'Flash is back!');
  res.redirect('/');
});

app.get('/showflash', function (req, res) {
  // Get an array of flash messages by passing the key to req.flash()
  const flashMessages = req.flash('info');
  console.log(flashMessages);
  res.send(flashMessages);
});
app.locals.imgData = imgData;

app.get('/viewcount', (req, res) => {
  req.session.views = (req.session.views || 0) + 1;
  res.send(`You have viewed this page ${req.session.views} times`);
})

//express-session user login logic
app.get('/login', (req, res) => {
  req.session.userID = 'user123';
  res.send('You are now logged in');
});

app.get('/logout', (req, res) => {
  req.session.userID = null;
  res.send('You are now logged out');
});

//Menu JSON and HTML Render Block

app.get('/menujson', (req, res) => {
  const menu = {
    MainDishes: [
      { id: 1, name: 'Patata Stir-Fry', price: 12.99, description: "Classic Italian pasta dish made with eggs, cheese, pancetta, and pepper." },
      { id: 2, name: 'Burger a la LI', price: 10.99, description: "Traditional pizza topped with fresh tomatoes, mozzarella cheese, and basil." },
      { id: 3, name: 'Duffle Bag Duck', price: 6.99, description: "Coffee-flavored Italian dessert made with ladyfingers and mascarpone cheese." },
      { id: 4, name: 'Patata Stir-Fry (carne)', price: 6.99, description: "Coffee-flavored Italian dessert made with ladyfingers and mascarpone cheese." },
      { id: 5, name: 'Trini-Koko Curry', price: 6.99, description: "Coffee-flavored Italian dessert made with ladyfingers and mascarpone cheese." },
      { id: 6, name: 'Duffle Bag Duck', price: 6.99, description: "Coffee-flavored Italian dessert made with ladyfingers and mascarpone cheese." },
      { id: 7, name: 'Croonian Pore', price: 6.99, description: "Coffee-flavored Italian dessert made with ladyfingers and mascarpone cheese." }
    ],
    Sides: [
      { id: 1, name: 'Garlic Bread', price: 4.99, description: "Toasted bread topped with garlic and olive oil or butter." },
      { id: 2, name: 'Caesar Salad', price: 5.99, description: "Salad of romaine lettuce and croutons dressed with lemon juice, olive oil, egg, Worcestershire sauce, anchovies, garlic, Dijon mustard, Parmesan cheese, and black pepper." },
      { id: 3, name: 'Minestrone Soup', price: 6.99, description: "Hearty Italian soup made with vegetables, often with the addition of pasta or rice." },
      { id: 4, name: 'Tiramisu', price: 7.99, description: "Coffee-flavored Italian dessert made with ladyfingers and mascarpone cheese." }
    ]
  };
  res.json(menu);
  res.send(`
     <h1>Menu</h1>
     <h2>Main Dishes</h2>
     <ul>
       ${menu.MainDishes.map(dish => `
         <li>
           <strong>${dish.name}</strong> - $${dish.price}
           <p>${dish.description}</p>
         </li>
       `).join('')}
     </ul>
     <h2>Sides</h2>
     <ul>
       ${menu.Sides.map(side => `
         <li>
           <strong>${side.name}</strong> - $${side.price}
           <p>${side.description}</p>
         </li>
       `).join('')}
     </ul>
   `);
  //});
});

//page not found error for all other routes
//app.all('*', (req, res, next) => {
//  next(new Error('Page Not Found', 404));
//});

//server listener
app.listen((port), () => {
  console.log(`LIs Cuisine Express Server listening at http://localhost:${port}`.bgBrightBlue);
});

app.use((req, res) => {
  res.status(404).send(`
    <div style="text-align: center; font-family: sans-serif; margin-top: 50px;">
      <h2>Lo sentimos, esta ruta no existe :-(</h2>
      <a href="/" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Go Home</a>
    </div>
  `);
});