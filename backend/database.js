const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String
    });

const User = mongoose.model('User', userSchema);

exports.addNewUser = async function (name) {
    const User = mongoose.model('User', userSchema);
    const loggedInUser = new User({ name: name });
    await loggedInUser.save();
}

exports.getUser = async function (name) {
    const user = await User.find({ name: name });
    return user;
}