const mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
const usersSchema = new mongoose.Schema({
    firstName: { type: 'string', required: true, trim: true },
    lastName: { type: 'string', required: true, trim: true },
    username: { type: 'string', required: true, trim: true, unique: true },
    email: { type: 'string', required: true, trim: true, unique: true },
    password: { type: String, require: true },
    profilePic: { type: String, default: "/images/profilePic.jpeg" },
    likes: [{ type: ObjectId, ref: "Post" }],
}, { timestamps: true });

var User = mongoose.model('User', usersSchema);

module.exports = User;