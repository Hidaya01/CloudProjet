const bcrypt = require('bcrypt');
const User = require('../models/User');

async function registerUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    return user.save();
}

async function authenticateUser(username, password) {
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        return user;
    } else {
        throw new Error('Invalid credentials');
    }
}

module.exports = { registerUser, authenticateUser };
