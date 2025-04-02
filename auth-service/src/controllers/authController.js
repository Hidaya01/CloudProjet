const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
};

// Inscription
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email déjà utilisé" });

    const user = await User.create({ username, email, password, role });
    res.status(201).json({ token: generateToken(user), user });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Connexion
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Utilisateur non trouvé" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Mot de passe incorrect" });

    //  });
  } catch (error) {
    console.error('Error in Post /login:', error);

    res.status(500).json({ message: "Erreur serveur" });
  }
};
// Get All Users (Admin Only)**
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error in get /users:', error);

    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Update User (Profile Update)
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Delete User (Admin Only)**
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Block a User**
exports.blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    user.isBlocked = true;
    await user.save();
    res.json({ message: "Utilisateur bloqué" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Unblock a User**
exports.unblockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    user.isBlocked = false;
    await user.save();
    res.json({ message: "Utilisateur débloqué" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Search Users by Name, Email, or Role**
exports.searchUsers = async (req, res) => {
  const { query } = req.query;
  console.log("query",query);
  try {
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { role: { $regex: query, $options: "i" } }
      ]
    });
    res.json(users);
    console.log("search results:",users);
  } catch (error) {
    console.error("aaaaaa",error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};