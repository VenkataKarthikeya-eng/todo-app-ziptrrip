const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const todoRoutes = require('./routes/todos');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

import cors from "cors";

app.use(cors({
  origin: "*"
}));

// --------------- Middleware ---------------

// Parse incoming JSON request bodies
app.use(express.json());

// Enable CORS for the frontend origin
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

// HTTP request logging
app.use(morgan('dev'));

// --------------- Routes ---------------

// Health-check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Todo CRUD routes
app.use('/api/todos', todoRoutes);

// --------------- Error Handling ---------------

// Centralized error-handling middleware (must be registered last)
app.use(errorHandler);

// --------------- Server Startup ---------------

app.listen(PORT, () => {
  console.log(`✅  Todo API server running on http://localhost:${PORT}`);
  console.log(`📋  Endpoints available at http://localhost:${PORT}/api/todos`);
});

app.get("/", (req, res) => {
  res.send("Todo API is running 🚀");
});

app.use("/api/todos", todoRoutes);