const express = require('express');
const app = express();
const os = require('os');
const port = 4000;
const cors = require('cors');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sathwikkadiyala:sathwik@cluster0.ekipjtb.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

app.use(cors());
app.use(express.static('public'));
const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  dnaSequence: String
});

// Create a model based on the schema
const UserModel = mongoose.model('User', userSchema);
app.post('/send-email', express.json(), async (req, res) => {
  const { email, username,dnaSequence } = req.body;

  try {const user = new UserModel({ email, username, dnaSequence });

  // Save the user document to MongoDB
  await user.save();

    await sendEmail(email,username, dnaSequence);
    res.json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email.' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

async function sendEmail(toEmail,username,  dnaSequence) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'alertscluster@gmail.com',
      pass: 'gzqqwpopdscjlptk',
    },
  });

  const mailOptions = {
    from: 'alertscluster@gmail.com',
    to: toEmail,
    subject: 'Your DNA Sequence',
    text: `Hello ${username} Your generated DNA sequence to authenticate as worker node is: ${dnaSequence}`,
  };

  await transporter.sendMail(mailOptions);
}
