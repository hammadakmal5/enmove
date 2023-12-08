const mongoose = require('mongoose');

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

