require('dotenv').config()


const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

///////////// Database Connection SECTION ////////////////////

const dbUrl = process.env.DB_URL;
//'mongodb://127.0.0.1:27017/enmovedb'
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log('Database Connected...');
  })
  .catch((err) => {
    console.log('OHH No Error! Database Connection Failed...');
    console.log(err);
  });

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// session
app.use(
  session({
    secret: 'keyboard cat',
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//////////////// Schema SECTION ///////////////////////
// Client schema
const clientSchema = new mongoose.Schema({
  fullname: {
    type: String,
    lowercase: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    lowercase: true,
    required: true,
  },
  phoneno: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    lowercase: true,
    required: true,
  },
  city: {
    type: String,
    lowercase: true,
    required: true,
  },
  postalcode: {
    type: String,
    lowercase: true,
    required: true,
  },
});

// Assistant schema
const AssistantSchema = new mongoose.Schema({
  fullname: {
    type: String,
    lowercase: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    lowercase: true,
    required: true,
  },
  phoneno: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    lowercase: true,
    required: true,
  },
  city: {
    type: String,
    lowercase: true,
    required: true,
  },
  postalcode: {
    type: String,
    lowercase: true,
    required: true,
  },
});

//////////////// Model SECTION ///////////////////////
// Client model
const Client = mongoose.model('Client', clientSchema);

// Assistant model
const Assistant = mongoose.model('Assistant', AssistantSchema);

//////////////// Middleware SECTION ///////////////////////
// const verify = (req, res, next) => {
//   const { email, password } = req.query;
//   if (email === 'admin@gmail.com' && password === 'admin123') {
//     next();
//   }
//   res.send('Sorry You need a email and Password.');
// };

//////////////// Route SECTION ///////////////////////
// home page route
app.get('/home', (req, res) => {
  res.render('home');
});

// get started route
app.get('/get/started', (req, res) => {
  res.render('get-started');
});

// client login route
app.get('/client/login', (req, res) => {
  res.render('client-login');
});

// post client login route
app.post('/client/login', async (req, res) => {
  const { email, password } = req.body;
  const client = await Client.findOne({ email });
  // Compare the password
  const validClient = await bcrypt.compare(password, client.password);

  if (validClient) {
    req.session.user_id = client._id;
     res.redirect('/client/dashboard');
    // res.send('Welcome Successfully logged in ....');
  } else {
     res.send('Try Again ....');
  }
});

// sign up client route
app.get('/client/signup', (req, res) => {
  res.render('client-signup');
});

// post method for client sign up data
app.post('/client/signup', async (req, res) => {
  const data = req.body;
  console.log(data);

  // for the hash
  const hash = await bcrypt.hash(data.clientPassword, 12);

  // Creating instances
  const c = new Client({
    fullname: data.clientName.toLowerCase(),
    email: data.clientEmail.toLowerCase(),
    password: hash,
    address: data.clientAddress.toLowerCase(),
    phoneno: data.clientPhoneNumber,
    country: data.clientCountry.toLowerCase(),
    city: data.clientCity.toLowerCase(),
    postalcode: data.clientPostalCode.toLowerCase(),
  });

  // save the data
  await c
    .save()
    .then(() => {
      console.log('client data saved');
      req.session.user_id = c._id;
      res.redirect('/client/login');
    })
    .catch((err) => {
      console.log('Data not saved...');
      console.log(err);
    });
});

// travel assistant login router
app.get('/assistant/login', (req, res) => {
  res.render('assistant-login');
});

// travel assistant post login route
app.post('/assistant/login', async (req, res) => {
  const { email, password } = req.body;
  const assistant = await Assistant.findOne({ email });
  // Compare the password
  const validAssistant = await bcrypt.compare(password, assistant.password);

  if (validAssistant) {
    req.session.user_id = assistant._id;
    res.redirect('/seller/dashboard');
  } else {
    res.send('Try Again ....');
  }
});

// post method for travel assistant data
app.post('/assistant', async (req, res) => {
  const data = req.body;
  console.log(data);

  // for the hash
  const hash = await bcrypt.hash(data.assistantPassword, 12);

  // Creating instances
  const assist = new Assistant({
    fullname: data.assistantName.toLowerCase(),
    email: data.assistantEmail.toLowerCase(),
    password: hash,
    address: data.assistantAddress.toLowerCase(),
    phoneno: data.assistantPhoneNumber,
    country: data.assistantCountry.toLowerCase(),
    city: data.assistantCity.toLowerCase(),
    postalcode: data.assistantPostalCode.toLowerCase(),
  });

  // save the data
  await assist
    .save()
    .then(() => {
      console.log('Travel Assistant data saved....');
      req.session.user_id = assist._id;
      res.redirect('/assistant/login');
    })
    .catch((err) => {
      console.log('Data not saved...');
      console.log(err);
    });
});

// travel assistant sign up route
app.get('/assistant/signup', (req, res) => {
  res.render('assistant-signup');
});

// create profile route
app.get('/createprofile', (req, res) => {
  res.render('profile');
});

// get the support local or international
app.get('/needsupport', (req, res) => {
  res.render('needsupport');
});

// instructions & documents informations
app.get('/instructions', (req, res) => {
  res.render('instructions');
});

// travel assistance docs to upload
app.get('/assistancedocs', (req, res) => {
  res.render('travelassistantdocs');
});

// route for client dashboard
app.get('/client/dashboard', (req, res) => {
  if (!req.session.user_id) {
    res.redirect('/client/login');
  } else {
    res.render('clientdashboard');
  }
});

// route for the client to logout
app.post('/client/signout', (req, res) => {
  req.session.user_id = null;
  res.redirect('/client/login');
});

// route for the seller
app.get('/seller/dashboard', (req, res) => {
  if (!req.session.user_id) {
    return res.redirect('/assistant/login');
  } else {
    res.render('sellerdashboard');
  }
});

// route for the assistant to signout
app.post('/assistant/signout', (req, res) => {
  req.session.user_id = null;
  res.redirect('/assistant/login');
});
// to handle the invalid path, make sure to put this at the end
app.get('*', (req, res) => {
  res.send(`Oops, I don't know about this path...`);
});

// Server
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
