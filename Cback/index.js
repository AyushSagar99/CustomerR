const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://saggarayush:27dQaNH1lbzzKlYp@cluster0.8rvr6mf.mongodb.net/Customer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const userSchema = new mongoose.Schema({
  userId: String,
  submissions: [
    {
      name: String,
      category: String,
      message: String,
    },
  ],
});

const User = mongoose.model('User', userSchema);

app.post('/api/submitForm', async (req, res) => {
  const { userId, name, category, message } = req.body;

  console.log('Received form data:', { userId, name, category, message });

  try {
    let user = await User.findOne({ userId });

    if (!user) {
      console.log('User not found, creating a new user');
      user = new User({ userId, submissions: [] });
    }

    user.submissions.push({ name, category, message });
    await user.save();

    console.log('Form data saved successfully:', user);

    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/userSubmissions/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.submissions);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
