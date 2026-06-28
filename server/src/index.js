const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const todoRoutes = require('./routes/todos');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------- Middleware ----------------
app.use(express.json());
app.use(morgan('dev'));

app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ---------------- Routes ----------------
app.get("/", (req, res) => {
  res.send("Todo API is running 🚀");
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/todos', todoRoutes);

// ---------------- Error Handler ----------------
app.use(errorHandler);

// ---------------- Start Server ----------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});