require('dotenv').config();
console.log('Connecting to database:', process.env.MONGODB_URI);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const moodRoutes = require('./routes/moods');
const resourceRoutes = require('./routes/resources');
const supportRoutes = require('./routes/support');
const adminResourceRoutes = require('./routes/admin/resources');
const adminUserRoutes = require('./routes/admin/users');
const adminPostRoutes = require('./routes/admin/posts');
const adminSupportRoutes = require('./routes/admin/support');
const adminAnalyticsRoutes = require('./routes/admin/analytics'); // ADDED THIS LINE

const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB error:', err));
  
app.get('/', (req, res) => res.send('🎉 Bloom Backend is running!'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/admin/resources', adminResourceRoutes);
app.use('/api/admin/users', adminUserRoutes);
app.use('/api/admin/posts', adminPostRoutes);
app.use('/api/admin/support', adminSupportRoutes);
app.use('/api/admin/analytics', adminAnalyticsRoutes); // ADDED THIS LINE

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});