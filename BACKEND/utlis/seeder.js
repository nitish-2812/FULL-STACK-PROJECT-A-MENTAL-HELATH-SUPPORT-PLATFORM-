const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Resource = require('../models/Resource'); // Import the Resource model

// Load env vars
dotenv.config({ path: './.env' });

// Sample data
const resources = [
  { title: '10-Minute Guided Meditation for Stress', category: 'stress', type: 'video', link: 'https://www.youtube.com/watch?v=z6X5oEIg6Ak', imageUrl: 'https://images.unsplash.com/photo-1506126613408-4e61f3d3d30e' },
  { title: 'How to Stop Worrying', category: 'anxiety', type: 'video', link: 'https://www.youtube.com/watch?v=WWloIAQpMcQ', imageUrl: 'https://images.unsplash.com/photo-1616999489502-d3a38c7f4a2b' },
  { title: 'The secret of getting ahead is getting started.', category: 'motivation', type: 'quote', link: 'Mark Twain' },
  { title: 'Believe you can and you\'re halfway there.', category: 'motivation', type: 'quote', link: 'Theodore Roosevelt' },
  { title: 'Understanding the 5 Types of Anxiety Disorders', category: 'anxiety', type: 'article', link: 'Anxiety is more than just feeling stressed...', imageUrl: 'https://images.unsplash.com/photo-1583795310273-3d236a2a7a53' },
  { title: 'Effective Stress Management Strategies', category: 'stress', type: 'article', link: 'Learning to cope with stress in a healthy way...', imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b' }
];

// Connect to DB
mongoose.connect(process.env.MONGODB_URI);

// Import into DB
const importData = async () => {
  try {
    await Resource.deleteMany(); // Clear existing resources
    await Resource.insertMany(resources);
    console.log('✅ Data Imported...');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Resource.deleteMany();
    console.log('❌ Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}