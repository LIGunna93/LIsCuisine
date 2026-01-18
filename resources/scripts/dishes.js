// dishes.js
// This file defines a route to get the list of dishes in JSON format
//initial code
  // send the menu as a simple HTML response
  // res.send(`
  //   <h1>Menu</h1>
  //   <h2>Main Dishes</h2>
  //   <ul>
  //     ${menu.MainDishes.map(dish => `
  //       <li>
  //         <strong>${dish.name}</strong> - $${dish.price}
  //         <p>${dish.description}</p>
  //       </li>
  //     `).join('')}
  //   </ul>
  //   <h2>Sides</h2>
  //   <ul>
  //     ${menu.Sides.map(side => `
  //       <li>
  //         <strong>${side.name}</strong> - $${side.price}
  //         <p>${side.description}</p>
  //       </li>
  //     `).join('')}
  //   </ul>
  // `);
//});
const siteBack = document.getElementsByTagName('html');
//siteBack.stlye.backgroundImage = url("https://images.unsplash.com/photo-1735190093631-d66ecd1bc433?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZCUyMGVuc2VtYmxlc3xlbnwwfHwwfHx8MA%3D%3D");

const dishList = document.getElementsByClassName('dishList');