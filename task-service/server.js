const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();
app.use(express.json())
const PORT =  3007;


// Utiliser une variable d'environnement pour MongoDB URI
const MONGO_URI = 'mongodb://localhost:27017/taskdb';

app.use(bodyParser.json());
app.use('/tasks', taskRoutes);
app.use('/comments', commentRoutes);

// Fonction pour se connecter à MongoDB
mongoose.connect(MONGO_URI, {
    
})
  .then(() => {
    console.log(`MongoDB Connected to ${MONGO_URI}`);
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB :', err);
  });

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
