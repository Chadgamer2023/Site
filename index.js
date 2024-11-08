require('dotenv').config();  // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const netlifyExpress = require('netlify-express');
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('public'));  // Serve static files from the 'public' folder

// Define Fact Schema and Model
const factSchema = new mongoose.Schema({
  fact: String,
  category: String,
  language: String,
  source: { type: String, default: 'user' }  // Default source as 'user'
});

const Fact = mongoose.model('Fact', factSchema);

// API Documentation with Swagger (Optional)
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Random Fact API',
      version: '1.0.0',
      description: 'API for fetching and submitting random facts'
    },
    servers: [
      {
        url: 'https://boysrfapi.onrender.com', // Replace with your Render app URL
      }
    ]
  },
  apis: ['index.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
// 1. Get Random Fact
app.get('/api/facts/random', async (req, res) => {
  const { language = 'en' } = req.query;
  const count = await Fact.countDocuments({ language });
  const random = Math.floor(Math.random() * count);
  const fact = await Fact.findOne({ language }).skip(random);
  res.json(fact);
});

// 2. Submit a Fact
app.post('/api/facts', async (req, res) => {
  const { fact, category, language = 'en', source = 'user' } = req.body;

  if (!fact || !category) {
    return res.status(400).json({ error: 'Fact and category are required' });
  }

  const newFact = new Fact({
    fact,
    category,
    language,
    source
  });

  await newFact.save();
  res.status(201).json(newFact);
});

// Serve the API Documentation (apidocs.html)
app.get('/apidocs', (req, res) => {
  res.sendFile(__dirname + '/public/apidocs.html');
});

// Use netlify-express to handle requests
module.exports.handler = netlifyExpress({ app });
