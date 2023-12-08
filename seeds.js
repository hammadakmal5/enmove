// const mongoose = require('mongoose');
// const { Client, Assistant } = require('./models/enmove');

// ///////////// Database Connection SECTION ////////////////////
// mongoose
//   .connect('mongodb://127.0.0.1:27017/enmovedb')
//   .then(() => {
//     console.log('Database Connected...');
//   })
//   .catch((err) => {
//     console.log('OHH No Error! Database Connection Failed...');
//     console.log(err);
//   });

// // Creating instances
// const c = new Client({
//   fullname: 'Philip John',
//   email: 'philip@gmail.com',
//   password: 'reyw1@152',
//   address: '123, wall street journel',
//   phoneno: '+447368362863',
//   country: 'USA',
//   city: 'New Jersey',
//   postalcode: '1WQ23',
// });

// // Creating instances
// const a = new Assistant({
//   fullname: 'John',
//   email: 'philip@gmail.com',
//   password: 'weareyw1@152',
//   address: 'Ghaei iru eu sj',
//   phoneno: '+447334262863',
//   country: 'UK',
//   city: 'London',
//   postalcode: 'PQr32',
// });

// c.save()
//   .then(() => {
//     console.log('Seed Client Data saved...');
//   })
//   .catch((err) => {
//     console.log('OHH ERROR....');
//     console.log(err);
//   });

// a.save()
//   .then(() => {
//     console.log('Seed Assistant Data saved...');
//   })
//   .catch((err) => {
//     console.log('OHH ERROR....');
//     console.log(err);
//   });
